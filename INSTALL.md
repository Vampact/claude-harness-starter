# INSTALL.md — Orchestration instructions for Claude

> **This file is addressed to Claude, not to a human.** If you are an LLM reading this because a user handed you this repo and asked you to install a harness setup, follow the flow below. If you are a human, this is a transparent description of what Claude will do on your behalf — you can read it to know what to expect.

Your job is **not** to dump files into the user's `~/.claude/`. Your job is to run a short, friendly interview, propose modules the user can understand, and install only what they agree to — filling in every placeholder by asking, never by guessing. The friction is the point: a setup the user chose and understands beats a pile of copied files.

This repo is intentionally **not** exhaustive or polished. The modules in `examples/` are seeds, not a complete catalog. Part of your job is to let the user know they can grow their own.

---

## Step 0 — Detect the user's language

Look at the language of the user's most recent messages and **run the entire install conversation in that language.** If they wrote to you in Korean, interview them in Korean; if Spanish, Spanish; and so on. The repo's documents are in English, but the conversation should meet the user where they are.

Do not announce this — just do it.

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

## Step 2 — Interview: environment and goals

Ask a small number of focused questions (an `AskUserQuestion`-style multiple-choice prompt works well — keep it to one screen). Cover:

- **Where do you run Claude Code?** CLI / desktop app / both / remote (SSH, devcontainer, etc.). This affects which hooks and shell assumptions make sense.
- **What do you work on?** Primary language/stack; solo vs team; mostly private vs public repos. This shapes which `rules/common/` examples are worth offering.
- **Folder habits.** Do you keep one work hub, make a fresh folder per project, or work mostly on remote machines? **Do not push any of these as correct** — just learn their style so your later proposals fit it.
- **Multiple devices?** Do you use Claude Code on two or more machines? If yes, a sync module becomes relevant (see Step 3, sync). If no, skip path/IP/device modules entirely — they are meaningless on a single machine.
- **Existing `~/.claude/` setup?** Do they already have a `CLAUDE.md`, `settings.json`, rules, or hooks? If yes, you must merge rather than overwrite (see Step 5).

Keep it conversational. You do not need every answer before proposing the first module — but you do need enough to avoid recommending something irrelevant.

---

## Step 3 — Propose modules one at a time, install only on consent

For each candidate module, present it in roughly this shape:

> **[Module name]** — *what it does.* In your case (because you said X), I'd **recommend / not recommend** this, because *reason*. Want to add it?

- **Agree →** install it, then fill its placeholders together (Step 4).
- **Decline →** skip it, move on. No pressure, no re-pitching.

Go in an order that respects dependencies. A reasonable default order:

1. **The router itself** (`CLAUDE.md`). This is the foundation — everything else hangs off it. Start from [examples/CLAUDE.md.example](examples/CLAUDE.md.example) and build a minimal router with the user.
2. **`rules/common/` examples** — language-agnostic standards (e.g. coding style). Offer the one or two that match their stack.
3. **`rules/personal/critical/` + a paired hook** — a deterministic guardrail. Explain *why* it needs a hook: behavior rules alone leak, so a `PreToolUse`/`Stop` hook is the real defense. Only offer guardrails the user actually wants enforced.
4. **`rules/personal/workflow/`** — procedural rules loaded on a trigger.
5. **`rules/personal/environment/`** — device/environment facts. **Gate this behind the multi-device answer and the sync prerequisite below.**
6. **A skill** — for any deep, multi-step procedure the user described.

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

## Step 4 — Fill placeholders by asking, never by guessing

Every example is deliberately full of placeholders (`<WORK_HUB>`, `<HOST_IP>`, `<USER>`, `<YOUR_PROJECT>`, etc.). When you install a module:

- Find each placeholder and **ask the user for the real value.**
- Never invent a path, hostname, or project name. Never copy a value from another user's example.
- If a placeholder does not apply to the user, remove that line rather than leaving the placeholder in.

This is what makes the install a customization and not a copy.

---

## Step 5 — Handle conflicts with existing config

If the user already has a `CLAUDE.md`, `settings.json`, or rules:

- **Do not overwrite.** Read the existing file first.
- Propose a **merge**: show what you would add and where, and let the user confirm.
- For `settings.json` specifically, merge keys carefully — never replace the whole file. Preserve their existing hooks, permissions, and env vars.
- If a genuine conflict exists (e.g. two rules contradict), surface it and let the user decide.

---

## Step 6 — Verify and summarize

After installing, give the user a clear picture of what changed:

- List every file you created or modified, with a one-line description of each.
- Note any placeholders still unfilled (there should be none, but check).
- Point out the trigger lines you added to `CLAUDE.md` so the user knows when each external rule will load.
- Suggest a first thing to try, so they see the harness working.

End by reminding them they can grow the setup later — new rules, hooks, and skills are all just files they (with your help) can add.

---

## A note on imperfect adherence

No model or environment will follow this flow perfectly, and that is expected. Aim for **reasonable adherence**, not mechanical compliance. The non-negotiables are: (1) install only what the user agreed to, (2) never overwrite existing config blindly, (3) fill placeholders by asking. Everything else is guidance you can adapt to the conversation.
