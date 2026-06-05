#!/usr/bin/env node
// =============================================================================
// protect-paths.example.js  —  PreToolUse hook (EXAMPLE)
//
// PURPOSE
//   The deterministic guardrail paired with the critical rule
//   examples/rules/personal/critical/protect-paths.md. The rule asks the model
//   not to write to protected paths; THIS hook guarantees it by blocking the
//   tool call before it runs, no matter what the model intended.
//
// HOW HOOKS WORK (in brief)
//   Claude Code can run a script at defined moments. A PreToolUse hook runs
//   BEFORE a tool executes. It receives a JSON payload on stdin describing the
//   tool call. To BLOCK the call, exit with a non-zero status (exit 2) and write
//   an explanation to stderr — the model sees that message and the tool is not
//   run. To ALLOW it, exit 0. This script is wired up in settings.json (see the
//   snippet at the bottom).
//
// THIS IS AN EXAMPLE
//   Replace the <PLACEHOLDER> paths with your own. Adapt the matched tools and
//   the path-matching logic to your needs. Test it before relying on it.
// =============================================================================

const fs = require("fs");
const path = require("path");

// ---- Configure your protected paths here -----------------------------------
// Use absolute paths. Anything at or under these locations is blocked for write.
const PROTECTED_PATHS = [
  // Replace with YOUR real absolute paths before use (and before testing).
  "<PROTECTED_PATH_1>", // e.g. "/home/alice/.config/secrets"  or  "C:/Users/alice/secrets"
  "<PROTECTED_PATH_2>", // e.g. "/home/alice/important-do-not-touch"
];

// ---- Read the hook payload from stdin ---------------------------------------
let raw = "";
try {
  raw = fs.readFileSync(0, "utf8"); // fd 0 = stdin
} catch {
  // No input: nothing to inspect. Fail OPEN (allow) so we never wedge the tool.
  process.exit(0);
}

let payload;
try {
  payload = JSON.parse(raw);
} catch {
  // Unparseable payload: fail open. A guardrail that crashes the harness on
  // every call is worse than one that occasionally misses — but log it so the
  // user notices a real problem.
  process.stderr.write("[protect-paths] could not parse hook payload; allowing.\n");
  process.exit(0);
}

// The exact shape of the payload can vary by tool/version. Pull the likely
// fields defensively rather than assuming one structure.
const toolName = payload.tool_name || payload.tool || "";
const input = payload.tool_input || payload.input || {};
const targetPath = input.file_path || input.path || "";

// Only the file-writing tools are relevant to this guardrail.
const WRITE_TOOLS = ["Write", "Edit", "MultiEdit", "NotebookEdit"];
if (!WRITE_TOOLS.includes(toolName) || !targetPath) {
  process.exit(0); // not a write we care about
}

// ---- Decide: is the target under a protected path? --------------------------
function isUnder(child, parent) {
  if (!parent || parent.startsWith("<")) return false; // unfilled placeholder
  const rel = path.relative(path.resolve(parent), path.resolve(child));
  // Inside parent iff the relative path doesn't climb out (..) and isn't absolute.
  return rel === "" || (!rel.startsWith("..") && !path.isAbsolute(rel));
}

const blocked = PROTECTED_PATHS.some((p) => isUnder(targetPath, p));

if (blocked) {
  // exit 2 + stderr message = BLOCK. The model receives this explanation.
  process.stderr.write(
    `[protect-paths] BLOCKED write to a protected path: ${targetPath}\n` +
      `If this is intentional, ask the user before proceeding.\n`
  );
  process.exit(2);
}

// Not protected: allow.
process.exit(0);

// =============================================================================
// WIRING IT UP (settings.json)
//   Add an entry like this so the hook runs before the file tools. Adjust the
//   command/path to where you place this file.
//
//   {
//     "hooks": {
//       "PreToolUse": [
//         {
//           "matcher": "Write|Edit|MultiEdit|NotebookEdit",
//           "hooks": [
//             { "type": "command", "command": "node ~/.claude/hooks/protect-paths.js" }
//           ]
//         }
//       ]
//     }
//   }
//
// NOTE: a PreToolUse hook on the file tools does not, by itself, cover a write
// performed via a shell command. If you want to close that gap too, add a
// matcher for the shell tool and inspect its command string. No single hook is
// perfectly airtight — cover the paths that matter most to you.
// =============================================================================
//
// HOW TO TEST (before you trust it with anything irreversible)
//   A PreToolUse hook just reads a JSON payload on stdin and acts via its exit
//   code, so you can test it from a shell by piping a sample payload in.
//
//   IMPORTANT — fill PROTECTED_PATHS above with REAL paths FIRST. This hook
//   treats any path starting with "<" as inert, so testing against an unfilled
//   <PLACEHOLDER> will falsely ALLOW (exit 0) and give you false confidence.
//   In the payloads below, replace /REAL/PROTECTED/PATH with the actual value
//   you put in PROTECTED_PATHS.
//
//   bash / zsh / Git Bash:
//     # expect BLOCK -> exit 2, message on stderr
//     echo '{"tool_name":"Write","tool_input":{"file_path":"/REAL/PROTECTED/PATH/x.txt"}}' | node protect-paths.js ; echo "exit=$?"
//     # expect ALLOW -> no output, exit 0
//     echo '{"tool_name":"Write","tool_input":{"file_path":"/tmp/ok.txt"}}' | node protect-paths.js ; echo "exit=$?"
//     # expect ALLOW -> exit 0 (non-write tool, even on a protected path)
//     echo '{"tool_name":"Read","tool_input":{"file_path":"/REAL/PROTECTED/PATH/x.txt"}}' | node protect-paths.js ; echo "exit=$?"
//
//   PowerShell 7 (Windows) — single-quote the JSON, read exit via $LASTEXITCODE:
//     # expect BLOCK -> exit 2
//     '{"tool_name":"Write","tool_input":{"file_path":"C:/REAL/PROTECTED/PATH/x.txt"}}' | node protect-paths.js ; "exit=$LASTEXITCODE"
//     # expect ALLOW -> exit 0
//     '{"tool_name":"Write","tool_input":{"file_path":"C:/Temp/ok.txt"}}' | node protect-paths.js ; "exit=$LASTEXITCODE"
//
//   If the BLOCK case does not exit 2, do NOT wire this hook up yet — fix it first.
// =============================================================================
