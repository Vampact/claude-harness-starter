# Protect paths (critical rule example — paired with a hook)

> EXAMPLE FILE. This is a "critical" rule: an absolute line that must never be
> crossed. Prose alone is a request the model usually honors — but "usually" is
> not "always," so this rule is PAIRED WITH A HOOK that enforces it
> deterministically. See examples/hooks/protect-paths.example.js for the hook,
> and docs/01-concepts.md for why rules and hooks come in pairs.

## The rule

Never create, modify, or delete files under these protected locations:

- `<PROTECTED_PATH_1>`  (e.g. a config/secrets directory)
- `<PROTECTED_PATH_2>`  (e.g. a directory that must stay manually managed)

If a task seems to require writing there, **stop and ask the user first.** Do not
work around it (for example, do not use a shell command to bypass the file tools).

## Why this exists

Accidental writes to these locations have caused real damage before — leaked
private files, corrupted state that could not be recovered. The cost of the rare
miss is high and sometimes irreversible, which is exactly the case where behavior
alone is not enough and a hook is justified.

## How it is enforced

The paired `PreToolUse` hook inspects every `Write`/`Edit` target and **blocks**
the operation if it falls under a protected path — regardless of what the model
intended. The rule above tells the model *why* to cooperate; the hook *guarantees*
the outcome even if the model slips.

> Note: a hook covers the file tools it is wired to. If you also want to close
> the shell-command bypass, extend the hook to inspect those commands too. No
> guardrail is perfectly airtight — pair the rule and hook to cover the paths
> that matter most to you.
