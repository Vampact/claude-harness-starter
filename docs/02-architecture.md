# 02 — Architecture: the `.claude/` layout

This document maps the pattern from [01-concepts.md](01-concepts.md) onto actual directories and files. It describes a *reference* layout — not a mandate. Adopt the parts that fit; the categories matter more than the exact folder names.

## The big picture

Claude Code reads configuration from a `.claude/` directory. At the user level this is `~/.claude/`; a project can also have its own `.claude/`. A harness-style setup organizes that directory like this:

```
~/.claude/
├── CLAUDE.md              # The router. Small. Loaded every session.
├── settings.json          # Harness config: hooks, permissions, env vars.
├── rules/
│   ├── common/            # Language/tech standards (not personal).
│   └── personal/
│       ├── critical/      # Absolute rules. Paired with hooks.
│       ├── workflow/      # Procedural rules. Loaded on trigger.
│       └── environment/   # Device/environment facts. Often per-machine.
├── hooks/                 # Deterministic guardrail scripts.
└── skills/                # Multi-step procedures, each self-contained.
```

Everything below explains the role of each piece.

## `CLAUDE.md` — the router

The one file loaded every session. Per [01-concepts.md](01-concepts.md), it holds **inline rules** (short, always-on) and **trigger lines** (pointers to external rules). Keep it lean: if it is growing past a screen or two, something inline should probably be an external file.

## `settings.json` — harness configuration

This is where the harness itself is wired, as opposed to where you write instructions to the model. It typically declares:

- **Hooks** — which script runs at which moment (`PreToolUse`, `PostToolUse`, `Stop`).
- **Permissions** — which tools/commands are pre-allowed so you are not prompted repeatedly.
- **Environment variables** — settings that shape the harness's behavior.

Treat this file carefully when installing into an existing setup: **merge, never overwrite** (see [INSTALL.md](../INSTALL.md) Step 5).

## `rules/` — the split rule library

The rules directory is where situational and heavy rules live, each loaded on demand via its trigger line in `CLAUDE.md`. It splits into two top-level groups.

### `rules/common/` — shared standards

Language- and technology-level standards that are not personal to you: coding style, testing conventions, security checklists. These are the kind of thing a whole team might share. They are "common" because they would look roughly the same for anyone working in that stack.

### `rules/personal/` — your rules, by how-often-they-apply

Your own rules, sorted into three categories by their nature:

#### `critical/` — absolute rules, paired with hooks

The lines that must never be crossed: never commit secrets, never write to a protected path, never push without confirmation. These are the rules where prose is not enough, so **each is paired with a hook** in `hooks/` that enforces it deterministically. Keeping them in their own category makes the rule-and-hook pairing explicit and easy to audit.

#### `workflow/` — procedural rules

Situational "how I do X" guidance: how you handle a particular kind of task, a process you follow, a convention with steps. Loaded on trigger, enforced by the model's cooperation (no hook). This is the largest category for most people.

#### `environment/` — device and environment facts

Facts about *where* you work: machine paths, host addresses, network drives, OS-specific shell quirks. **These only make sense if your config is synced across machines** — on a single machine, hardcoding a path into shared config is pointless. If you do sync, this is also the category most likely to differ per device, so it interacts closely with your `.gitignore` boundary (see below). See [03-customization-guide.md](03-customization-guide.md) for the multi-device decision.

## `hooks/` — deterministic guardrails

Scripts the harness runs automatically at defined moments. The three common trigger points:

- **`PreToolUse`** — runs *before* a tool call; can inspect and **block** it. This is where most guardrails live (e.g. refuse a write to a protected directory).
- **`PostToolUse`** — runs *after* a tool call; good for auto-formatting, follow-up checks.
- **`Stop`** — runs when a session ends; good for final verification.

Each `critical/` rule should have a matching hook here. A hook is the *guarantee* behind a rule's *request*.

## `skills/` — multi-step procedures

Each skill is a self-contained folder (typically with a `SKILL.md`) describing a repeatable, multi-step task. The model invokes a skill when that task comes up. Skills keep deep procedural know-how out of your rules and load it only when relevant.

## The sync boundary (for multi-device users)

If you sync `~/.claude/` across machines (see [03-customization-guide.md](03-customization-guide.md)), draw a clear line with `.gitignore`:

- **Shared** (synced): `CLAUDE.md`, `settings.json`, `rules/`, `hooks/`, `skills/` — the harness itself.
- **Per-device** (git-ignored): memory, local caches, anything machine-specific.

Without this line, one machine's local state pollutes another's. The categories above are designed to make this boundary natural: the harness is shared; per-device context is kept out.

## A note on naming

The folder names here (`critical`, `workflow`, `environment`) are a convention, not a requirement Claude Code enforces. What matters is the *separation*: absolute-and-enforced rules apart from procedural ones apart from environment facts. If different names fit how you think, use them — just keep the categories distinct so the rule-and-hook pairing and the sync boundary stay clear.

Next: [03-customization-guide.md](03-customization-guide.md) — how to decide which of these pieces you actually want.
