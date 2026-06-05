# 01 — Concepts: why the router pattern

This document explains the *idea* behind the harness. If you understand this page, the rest of the repo is just mechanics.

## The problem

`CLAUDE.md` is loaded into context at the start of **every** session, automatically. That makes it the obvious place to put your instructions — so people put everything there. Coding standards, commit conventions, project quirks, "always do X," "never do Y," device paths, tool preferences. Over months it grows into a wall of text.

Two things go wrong as it grows:

1. **Token cost compounds.** Every session pays to load the whole file, every time — even the rules irrelevant to today's task. In long sessions this re-loads repeatedly.
2. **Attention dilutes.** A model reading 2,000 lines of mixed-priority instructions treats the critical "never force-push" the same as the trivial "prefer tabs." The signal you care about most is buried in noise.

The instinct to fix this — "just write less" — is wrong. You do not have fewer rules; you have the same rules, badly arranged.

## The insight: not every rule needs to be loaded all the time

Most rules are **situational**. "How to write a database migration" only matters when you are writing a migration. "How file transfers work between my two machines" only matters during a file transfer. Loading these every session is pure waste — they are noise 99% of the time and signal 1% of the time.

A few rules genuinely are **always-on**: your language preference, your core tone, a short list of absolute prohibitions. Those are cheap and belong inline.

So split rules by **how often they apply**, not by topic.

## The pattern: `CLAUDE.md` as a router

Keep `CLAUDE.md` small. It holds two kinds of things:

1. **Inline rules** — short, always-on, cheap to carry every session.
2. **Trigger lines** — one-line pointers to heavier rules that live in external files.

A trigger line looks like this:

```
## Database migrations
> Trigger: writing or reviewing a DB migration, schema change, or data backfill.
> Read: rules/workflow/db-migrations.md
```

`CLAUDE.md` carries only that pointer. The full migration guide — which might be 200 lines — sits in `rules/workflow/db-migrations.md` and is **not loaded** until the model, recognizing it is about to write a migration, reads it on demand.

The router is a table of contents with a "load when relevant" rule attached to each entry.

## Why this works

- **Tokens:** every session carries the small router plus the few always-on rules. The heavy files load only in the sessions that need them.
- **Attention:** when the migration guide *does* load, it loads alone, into a session already about migrations. The model reads 200 focused lines instead of hunting them out of 2,000 mixed ones.
- **Maintainability:** rules become files you can edit, move, and reason about individually, instead of paragraphs wedged into one ever-growing document.

## Inline vs external: how to decide

Put a rule **inline** in `CLAUDE.md` when:

- It applies to essentially every session (language, tone, a hard prohibition).
- It is short — a line or two.

Move a rule to an **external file** (with a trigger line) when:

- It only applies in specific situations.
- It is long, or has steps, examples, or tables.
- It is something you reference occasionally, not constantly.

When unsure, lean external. The cost of a trigger line is tiny; the cost of a bloated `CLAUDE.md` is paid every session.

## When behavior is not enough: pairing with hooks

Some rules are not advice — they are **lines that must never be crossed.** "Never commit secrets." "Never write to this protected directory." "Never push to main without confirmation."

A rule written in prose is a *request*. The model usually honors it, but "usually" is not "always," and for a destructive or irreversible action, the rare miss is the one that hurts. For those, behavior alone is not a sufficient defense.

This is where **hooks** come in. A hook is deterministic code the harness runs at a defined moment — before a tool call (`PreToolUse`), or when a session ends (`Stop`). It can inspect what is about to happen and block it. A `PreToolUse` hook can refuse a `Write` to a protected path no matter what the model intended.

The pattern: **pair your absolute rules with hooks.** The rule explains the *why* to the model (so it cooperates); the hook enforces the *what* regardless (so a slip cannot leak through). Rules persuade; hooks guarantee. You want both for anything that truly matters.

This is why the harness sorts rules into categories — see [02-architecture.md](02-architecture.md) — with the "absolute, hook-paired" ones kept separate from ordinary procedural guidance.

## Skills: for deep procedures

When something is a *procedure* — a repeatable, multi-step task with its own method ("how I run a full release," "how I triage a flaky test") — it is bigger than a rule. That belongs in a **skill**: a self-contained package of instructions the model invokes for that task. Skills keep multi-step know-how out of your rules and let it load only when that task is actually happening.

## Summary

- `CLAUDE.md` loads every session — so keep it small.
- Split rules by **how often they apply**, not by topic.
- Always-on, short → inline. Situational or heavy → external file + a trigger line.
- The model reads external files **on demand**, when the trigger situation arises.
- Absolute rules → pair with **hooks**, because prose is a request and code is a guarantee.
- Multi-step procedures → **skills**.

Next: [02-architecture.md](02-architecture.md) shows how these pieces are laid out on disk.
