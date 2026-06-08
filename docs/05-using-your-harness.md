# 05 — Using and maintaining your harness

The install is the beginning, not the end. This page covers the everyday operations after setup: confirming things actually work, adding a rule later, turning one off, and changing a hook. None of it requires this repo — your harness is just files in `~/.claude/`, and you edit them directly.

## Confirming it works

Two kinds of pieces, two ways to check them.

- **Triggered rules.** `CLAUDE.md` loads every session, but an external rule only loads when its trigger situation arises (that is the whole point — see [01-concepts.md](01-concepts.md)). To confirm one is wired, create its trigger situation and watch whether Claude behaves by the rule. If you are unsure, just ask Claude in-session: *"which of my rules apply right now, and why?"* — a router that is working will name the trigger lines it matched.
- **Hooks.** A hook is deterministic, so test it directly rather than trusting it. If you deployed one, you already ran the test recipe during install (see [INSTALL.md](../INSTALL.md), "Deploying a hook"). Re-run that same recipe any time you change the hook. In normal use, a `PreToolUse` guardrail like `protect-paths` simply blocks the action it guards — try a harmless version of the blocked action to see it fire.

## Adding a rule later

This is the common case, and it is two steps:

1. Write the rule in its own file under `rules/` (the [rule template](../templates/rule.md.template) gives the shape). Put it in the category that fits — `common/`, `personal/workflow/`, etc.
2. Add one trigger line to `CLAUDE.md` pointing at it.

That is the entire mechanism. If the rule needs deterministic enforcement (not just the model's cooperation), it belongs in `critical/` and needs a paired hook — follow the hook-deployment steps in [INSTALL.md](../INSTALL.md).

## Turning a rule off or removing it

- **Temporarily off:** delete just the trigger line in `CLAUDE.md`. The rule file stays on disk but is no longer loaded, so it costs nothing and is easy to restore. This is the lightest way to mute a rule you are unsure about.
- **Gone for good:** delete the rule file *and* its trigger line. If it had a paired hook, also remove the hook's entry from `settings.json` (and optionally the script from `hooks/`). A rule and its hook are a pair — removing one without the other leaves a half-wired guardrail.

## Changing a hook

Edit the script in `~/.claude/hooks/` directly. Two things to remember:

- **Re-test after editing.** A hook you changed is a hook you have not verified. Run the test recipe again before relying on it.
- **You usually do not need to touch `settings.json`.** As long as the file path and name are unchanged, the existing wiring still points at it. You only edit `settings.json` to change *which tools* the hook matches, add another hook, or remove it.

## Keeping the router small

Over time `CLAUDE.md` tends to grow — you add an inline rule here, a note there. When it creeps past a screen or two, that is the signal to move the heavier parts back out into `rules/` files and leave a trigger line behind. The router earns its keep by staying small; periodically pruning it back is normal maintenance, not a failure.

---

That is the whole maintenance surface. Everything here is editing files you own — adding, muting, removing, adjusting. The harness is meant to grow and shrink with you, so treat these as routine, not as special operations.
