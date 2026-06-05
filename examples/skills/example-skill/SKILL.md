---
name: example-skill
description: >
  EXAMPLE skill. Replace this description with a precise trigger for YOUR
  procedure — the description is what Claude matches on to decide when to invoke
  the skill, so make it specific (e.g. "Use when cutting a release: bumps
  version, updates changelog, tags, and pushes"). Vague descriptions trigger at
  the wrong times or not at all.
---

# <YOUR_SKILL_NAME>

> EXAMPLE FILE. A skill packages a repeatable, multi-step PROCEDURE — something
> bigger than a single rule. Claude invokes it when a task matches the
> `description` above. Keep the steps concrete and ordered.
> See docs/01-concepts.md (the "Skills" section) for when a procedure deserves
> to be a skill rather than a rule.

## When to use

Describe the exact situation this skill is for: `<WHEN_THIS_APPLIES>`.

## Prerequisites

List anything that must be true or available before running: `<PREREQUISITES>`.

## Steps

1. `<STEP_1 — what to do, and how to know it worked>`
2. `<STEP_2>`
3. `<STEP_3>`
4. Verify the outcome: `<HOW_TO_VERIFY_SUCCESS>`.

## Failure handling

What to do if a step fails: `<RECOVERY_OR_ROLLBACK>`. Do not silently continue
past a failed step.

## Notes

- Keep this skill self-contained: a reader (human or model) should be able to run
  it without hunting for context elsewhere.
- If the procedure grows additional supporting files (scripts, templates), put
  them alongside this `SKILL.md` in the same folder.
