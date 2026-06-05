# Coding style (common rule example)

> EXAMPLE FILE. This is a "common" rule — a language/tech standard that is not
> personal to you and could be shared with a team. Adapt it to <YOUR_STACK>,
> trim what you disagree with, and keep it loaded via a trigger line in CLAUDE.md.
> See docs/02-architecture.md for what "common" rules are.

## Principles

- **Clarity over cleverness.** Prefer the simplest solution that works.
- **Small, focused units.** Functions do one thing; files stay cohesive.
- **Explicit error handling.** Do not silently swallow errors.
- **Validate at boundaries.** Never trust external input (API responses, user
  input, file contents) without checking it.

## Conventions for <YOUR_STACK>

> Replace this section with the concrete conventions of your language/framework.

- Naming: <YOUR_NAMING_CONVENTION — e.g. camelCase for variables, PascalCase for types>.
- Formatting: enforced by <YOUR_FORMATTER — e.g. prettier / black / gofmt>.
- Linting: <YOUR_LINTER>.

## Review checklist

Before considering a change done:

- [ ] Reads clearly; names say what they mean.
- [ ] Errors handled, not swallowed.
- [ ] No hardcoded secrets or environment-specific values.
- [ ] Tests cover the new behavior.
