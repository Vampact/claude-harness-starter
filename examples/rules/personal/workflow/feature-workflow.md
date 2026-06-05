# Feature workflow (workflow rule example)

> EXAMPLE FILE. This is a "workflow" rule: situational, procedural "how I do X"
> guidance. It is loaded on its trigger line and enforced by the model's
> cooperation (no hook needed). Adapt the steps to how you actually work.
> See docs/02-architecture.md for the workflow category.

## Trigger

Starting a new feature, bug fix, or non-trivial refactor.

## Steps

1. **Understand first.** Restate the goal in one sentence. Identify the files and
   modules involved before writing anything.

2. **Plan.** For anything non-trivial, outline the approach and the risks. Get
   agreement on the plan before implementing.

3. **Work in small steps.** Make focused changes. Prefer many small, reviewable
   edits over one large rewrite.

4. **Verify.** Prove the change works — run it, test it, observe the behavior.
   "I edited the code" is not the same as "it works."

5. **Review.** Re-read the diff for correctness and clarity before considering it
   done. Check for <YOUR_REVIEW_CRITERIA — e.g. error handling, edge cases, tests>.

6. **Commit.** Use a clear message describing the *why*, not just the *what*.

## Notes

- Distinguish a **question** ("could X be the cause?") from a **directive**
  ("fix X"). Analyze and propose for questions; only modify files on a directive.
- This is a starting template — reshape the steps to match <YOUR_PROCESS>.
