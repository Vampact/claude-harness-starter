# 03 — Customization guide: deciding what you actually want

The harness is a set of *options*, not a prescription. This guide walks the decisions so you (with Claude's help during install) pick what fits **your** way of working. Nothing here is a default you must accept.

A principle runs through the whole guide: **where there is a genuine matter of taste, this repo refuses to pick for you.** It names the choices and their tradeoffs, then leaves the call to you.

## Decision 1 — How small should `CLAUDE.md` be?

Everyone agrees the router should be smaller than a kitchen-sink `CLAUDE.md`. How small is taste.

- **Minimalist:** only a language/tone line plus a handful of trigger lines. Everything else is external. Maximum token savings, maximum indirection.
- **Pragmatic:** a few genuinely-always-on rules inline, the rest external. Slightly larger, but you spend less time chasing files for the rules you hit constantly.

Pick by feel. You can always move a rule out later when it starts feeling heavy.

## Decision 2 — Folder and workspace habits

How you organize your *work* (as opposed to your `.claude/` config) is purely personal. Common styles:

- **Single work hub** — one root directory holds all projects.
- **Fresh folder per project** — each project is its own isolated directory.
- **Remote-first** — most work happens on remote machines (SSH, devcontainers).

> **This repo takes no side here.** Some setups out there hardcode one of these as a strict rule — e.g. "all work must live under one hub directory." That is one person's preference, not a best practice. If a folder discipline helps you, adopt it as *your* rule; if not, skip it. It is offered as one option among several, never as the default.

If you do want a folder rule enforced (not just suggested), that is a candidate for a `critical/` rule paired with a hook — see Decision 5.

## Decision 3 — Single device or multiple?

This is the pivot that unlocks a whole branch of modules.

- **Single device.** Skip everything about paths, IPs, hostnames, and device-specific environment. Hardcoding a path into your config buys you nothing when there is only one machine. Keep your setup lean.
- **Multiple devices.** Now config-sharing becomes worth doing — and *only now* do environment facts (paths, hosts) earn their place. But syncing is a prerequisite, not an afterthought. See Decision 4 first.

## Decision 4 — If multiple devices: how to sync `~/.claude/`?

Putting paths or IPs into `~/.claude/` only pays off if that config actually travels between your machines. So **decide sync before environment modules.** Options, none forced:

| Method | Good when | Tradeoffs |
|---|---|---|
| **Private Git repo** (GitHub/GitLab) | You are comfortable with git; want history and rollback | Manual pull/push; must keep secrets out of the repo |
| **Cloud drive** (Dropbox, iCloud, etc.) | You want automatic, no-think syncing | Sync conflicts on simultaneous edits; less control |
| **dotfiles manager** (chezmoi, etc.) | You already manage dotfiles this way | Another tool to learn |

### The critical part: the `.gitignore` (or ignore) boundary

Whichever method you choose, the most important decision is **what you share versus what stays per-device.**

- **Share** (sync): `CLAUDE.md`, `settings.json`, `rules/`, `hooks/`, `skills/` — the harness itself.
- **Keep per-device** (ignore): memory, local caches, machine-specific state.

Draw this line explicitly. Without it, one machine's local memory or cache rides along to another machine and pollutes it. The whole point of syncing is to share the *harness* while letting each machine keep its *own* local context.

### Then, and only then: environment modules

Once sync is set up with a clean boundary, environment facts become useful. **Always store them as placeholders** — `<WORK_HUB>`, `<HOST_IP>`, `<USER>` — and fill them per machine. Never commit a real path or IP into shared config as a literal; treat them as values the install conversation fills in.

## Decision 5 — Which absolute rules deserve a hook?

`critical/` rules are the ones you want *enforced*, not merely requested. Each pairs with a hook (see [02-architecture.md](02-architecture.md)). Candidates differ per person, but typical ones:

- Block writes to a protected directory.
- Block commits/pushes that contain secrets.
- Require confirmation before irreversible actions (force-push, mass-delete).

Only add a guardrail for something you genuinely want stopped. A hook that fires on something you actually do often becomes noise you will disable. Start with one or two that match real risks in your workflow.

## Decision 6 — Log integrity (optional)

Some users want their conversation logs preserved **verbatim** — original text, no summarization — for searchability and auditability. If that matters to you, the harness can include a rule (and a helper) that preserves raw session text rather than a model-reconstructed summary.

If it does not matter to you, skip it. It is genuinely optional, and the verbatim-preservation tooling tends to be environment-specific, so it is offered only on request — not pushed as a default.

## What this repo deliberately leaves out

A few things from the original setup this pattern came from were **personal quirks with little general value**, so they are not offered as defaults:

- **Session-title conventions** (e.g. proposing a title in a specific language at session start) — too specific to one person's habit.
- **A single mandated work-hub directory** — offered as one taste in Decision 2, never as the rule.

If you happen to want any of these, you can still build them as your own rule — see below. They are excluded as *defaults*, not forbidden.

## Growing your own modules

This repo's examples are seeds, not a complete catalog. The moment you want a behavior that no example covers, that is your cue to write a new rule, hook, or skill. The first one is the steepest part of the curve; once you have written one, the next is much easier. A harness is meant to grow with you — the goal of installing this is to leave you *able to extend it*, not dependent on this repo.

Next: [04-references.md](04-references.md) — where these ideas came from.
