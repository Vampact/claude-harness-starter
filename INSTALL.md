# INSTALL.md — Orchestration instructions for Claude

> **This file is addressed to Claude, not to a human.** If you are an LLM reading this because a user handed you this repo and asked you to install a harness setup, follow the flow below. If you are a human, this is a transparent description of what Claude will do on your behalf — you can read it to know what to expect.

Your job is **not** to dump files into the user's `~/.claude/`. Your job is to run a short, friendly interview, propose modules the user can understand, and install only what they agree to — filling in every placeholder by asking, never by guessing. The friction is the point: a setup the user chose and understands beats a pile of copied files.

This repo is intentionally **not** exhaustive or polished. The modules in `examples/` are seeds, not a complete catalog. Part of your job is to let the user know they can grow their own.

---

## Step 0 — Detect the conversation language (and don't confuse it with a rule)

Look at the language of the user's most recent messages and **run the entire install conversation in that language.** If they wrote to you in Korean, interview them in Korean; if Spanish, Spanish. Do not announce this — just do it.

**Important distinction:** the language you *converse* in is **not** necessarily the always-on language rule you will write into their `CLAUDE.md` (the `<YOUR_LANGUAGE>` placeholder in the router example). A user might message you in English now but want Claude to always reply to them in Korean — or vice versa. **Do not infer the `<YOUR_LANGUAGE>` rule from the message language. Ask for it explicitly** when you build the router (Step 3).

---

## Step 1 — Orient yourself

Before talking to the user, read enough of this repo to give grounded advice:

- [README.md](README.md) — the one-paragraph pitch.
- [docs/01-concepts.md](docs/01-concepts.md) — why the router pattern exists.
- [docs/02-architecture.md](docs/02-architecture.md) — the `.claude/` layout.
- [docs/03-customization-guide.md](docs/03-customization-guide.md) — the decision branches (this is your interview script's backbone).
- Skim [examples/](examples/) so you can describe each module concretely.

If anything in those docs conflicts with what the user tells you about their setup, **trust the user.**

---

## Step 2 — Locate the install target and inspect existing config

Before interviewing, settle two practical facts. A real install fails at the "last mile" when these are skipped.

1. **Where is `~/.claude/`?** It is the user-level Claude Code config directory in the user's home folder (`~/.claude/` on macOS/Linux, `%USERPROFILE%\.claude\` on Windows). Confirm the actual path on this machine — do not assume.
2. **What is already there?** **Inspect the directory yourself** — list `~/.claude/` and read any existing `CLAUDE.md`, `settings.json`, `rules/`, and `hooks/`. Do not rely solely on the user's memory of what they have. If the directory does not exist at all, that is fine — this is a brand-new user; you will create it during install, starting clean (no merge concerns).

There is a real tension here — be consent-driven and not nosy, versus verify before you overwrite. Resolve it this way: **you may read existing config to avoid destroying it, but you still install nothing without consent.** Reading to protect is not the same as writing without permission. If the user said "I have nothing" but you find a `settings.json`, surface that gently and switch to merge mode (Step 6).

---

## Step 3 — Interview: environment and goals

Ask a small number of focused questions. A single one-screen, multiple-choice prompt (`AskUserQuestion`-style) works well **for this interview step** — it gathers context in one pass. (Note: this batch style is for the interview only. Module *proposals* in Step 4 go one at a time — do not dump all modules into one multiple-choice screen.)

Cover:

- **Always-on language.** What language should Claude reply in by default? (This fills `<YOUR_LANGUAGE>` — ask, per Step 0; don't infer it.)
- **Where do you run Claude Code?** CLI / desktop app / both / remote (SSH, devcontainer, etc.). Affects which hooks and shell assumptions make sense.
- **What do you work on?** Primary language/stack; solo vs team; mostly private vs public repos. Shapes which `rules/common/` examples are worth offering.
- **Folder habits.** One work hub, fresh folder per project, or remote-first? **Do not push any of these as correct** — just learn their style so your later proposals fit it.
- **Multiple devices?** Two or more machines? If yes, a sync module becomes relevant (see Step 4, sync). If no, skip path/IP/device modules entirely — they are meaningless on a single machine.
- **Existing setup** — you already inspected this in Step 2; confirm with the user and flag anything you'll need to merge.

Keep it conversational. You do not need every answer before proposing the first module — but you do need enough to avoid recommending something irrelevant.

---

## Step 4 — Propose modules one at a time, install only on consent

For each candidate module, present it **individually** (not batched) in roughly this shape:

> **[Module name]** — *what it does.* In your case (because you said X), I'd **recommend / not recommend** this, because *reason*. Want to add it?

- **Agree →** install it, then fill its placeholders together (Step 5), and **deploy it correctly** (see the hook-deployment notes below where relevant).
- **Decline →** skip it, move on. No pressure, no re-pitching.

Go in an order that respects dependencies. A reasonable default order:

1. **The router itself** (`CLAUDE.md`). The foundation — everything else hangs off it. Build a minimal router *with* the user from [examples/CLAUDE.md.example](examples/CLAUDE.md.example). Ask for the `<YOUR_LANGUAGE>` and tone values here.
2. **`rules/common/` examples** — language-agnostic standards (e.g. coding style). Offer the one or two that match their stack.
3. **`rules/personal/critical/` + a paired hook** — a deterministic guardrail. Explain *why* it needs a hook: behavior rules alone leak, so a `PreToolUse`/`Stop` hook is the real defense. **Deploying a hook has mechanical steps — see "Deploying a hook" below.** Only offer guardrails the user actually wants enforced.
4. **`rules/personal/workflow/`** — procedural rules loaded on a trigger.
5. **`rules/personal/environment/`** — device/environment facts. **Gate this behind the multi-device answer and the sync prerequisite below.**
6. **A skill** — for any deep, multi-step procedure the user described. Deploy it by placing the folder at `~/.claude/skills/<skill-name>/SKILL.md`; the YAML front-matter `description` is what Claude matches on to invoke it, so make it a precise trigger. No `settings.json` entry is needed — the folder location plus front matter is the wiring (see docs/02-architecture.md).

### Deploying a hook (do not skip these steps)

A hook is not "installed" just by copying a rule. To make it actually run, **in this order**:

1. **Copy the script** from `examples/hooks/<name>.example.js` into the user's `~/.claude/hooks/`, and **rename it to drop `.example`** (e.g. `protect-paths.js`). The example filename is not the runtime filename.
2. **Fill the hook's own real values FIRST.** Many hooks have internal placeholders (e.g. `protect-paths.js` has a `PROTECTED_PATHS` list of `<PROTECTED_PATH_1>` tokens). Ask the user and replace these with real values *before* testing. This ordering matters: the example hook deliberately treats any path still starting with `<` as inert, so a test against an unfilled placeholder will **falsely pass (allow)** and give false confidence.
3. **Confirm the runtime exists.** The example hooks are Node.js — verify `node` is installed and on PATH (`node --version`). If the user has no Node, the hook cannot run; say so rather than wiring a dead hook.
4. **Test it before trusting it.** A guardrail you never verified is not a guardrail. Using the now-filled real paths, follow the test recipe at the bottom of [examples/hooks/protect-paths.example.js](examples/hooks/protect-paths.example.js): pipe a sample payload and confirm it blocks (exit 2) a protected path and allows (exit 0) a normal one. The recipe shows both a bash/Git-Bash and a PowerShell 7 form — use the one matching the user's shell.
5. **Wire it into `settings.json`** *last, after the test passes* — see "Editing `settings.json`" below. The `command` must point at the deployed path (`~/.claude/hooks/protect-paths.js`), not the repo's `examples/` copy.

### Editing `settings.json`

`settings.json` is where hooks, permissions, and env vars are wired. Use [examples/settings.json.example](examples/settings.json.example) and [templates/settings.json.template](templates/settings.json.template) as the shape.

- It is **strict JSON** — no comments, no trailing commas. A file that fails to parse disables your config.
- If the user already has a `settings.json`, **merge keys; never replace the whole file.** Preserve their existing `hooks`, `permissions`, and `env`. Add your hook entry into the existing `PreToolUse` array rather than overwriting it.

### The sync prerequisite (important)

Putting paths, IPs, or device-specific facts into `~/.claude/` only makes sense if that config is **synced across machines.** On a single machine, a hardcoded path or IP is pointless.

So: **if the user uses multiple devices, propose a sync method before any path/IP/environment module.** Offer options without forcing one:

- A **private Git repo** (GitHub/GitLab) holding `~/.claude/`.
- A **cloud drive** (Dropbox, iCloud, etc.).
- A **dotfiles manager** (chezmoi, etc.).

The key pattern to teach, whichever they pick: **draw a line with `.gitignore` between what is shared (settings, rules, hooks) and what stays per-device (memory, local caches).** Shared config syncs; per-device context does not. Without that line, one machine's memory pollutes another's.

If the user is on a single device or declines sync, **do not offer the path/IP/environment modules at all.**

### Offering to create new modules (mention only — do not auto-generate)

The examples here will not cover everything. When a user wants a behavior that no existing module provides, **tell them it can be built** as a new rule, hook, or skill — but only as a possibility. Do not auto-generate it unless they ask.

A useful thing to say: *"This doesn't exist as a module yet, but we could write it as a [rule/hook/skill]. The first one is the hardest; once you've made one, the second is much easier."* The goal is to leave the user able to extend the harness themselves, not dependent on this repo.

---

## Step 5 — Fill placeholders by asking, never by guessing

Every example is deliberately full of placeholders (`<WORK_HUB>`, `<HOST_IP>`, `<USER>`, `<YOUR_PROJECT>`, etc.). When you install a module:

- Find each placeholder and **ask the user for the real value.**
- Never invent a path, hostname, or project name. Never copy a value from another user's example.
- If a placeholder does not apply to the user, remove that line rather than leaving the placeholder in.

This is what makes the install a customization and not a copy.

---

## Step 6 — Handle conflicts with existing config

You already inspected the existing config in Step 2. When something is already there:

- **Do not overwrite.** You have already read the existing file.
- Propose a **merge**: show what you would add and where, and let the user confirm.
- For `settings.json` specifically, merge keys carefully — never replace the whole file. Preserve their existing hooks, permissions, and env vars.
- If a genuine conflict exists (e.g. two rules contradict), surface it and let the user decide.

---

## Step 7 — Verify and summarize

After installing, give the user a clear picture of what changed:

- List every file you created or modified, with a one-line description of each.
- Confirm any hooks you deployed are wired into `settings.json` with the correct deployed path, and were tested (Step 4).
- Note any placeholders still unfilled (there should be none, but check).
- Point out the trigger lines you added to `CLAUDE.md` so the user knows when each external rule will load.
- Suggest a first thing to try, so they see the harness working.

End by reminding them they can grow the setup later — new rules, hooks, and skills are all just files they (with your help) can add.

---

## A note on imperfect adherence

No model or environment will follow this flow perfectly, and that is expected. Aim for **reasonable adherence**, not mechanical compliance. The non-negotiables are: (1) install only what the user agreed to, (2) never overwrite existing config blindly — inspect first, (3) fill placeholders by asking, (4) when you deploy a hook, actually make it runnable (copy, rename, wire, test). Everything else is guidance you can adapt to the conversation.
