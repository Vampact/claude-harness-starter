# 04 — References

The harness pattern in this repo is **not** an original invention. It was assembled by reading the public writing below and working through it together with Claude — not derived from first principles. This page credits the sources honestly, split into two groups: the starting spark, and the material that actually shaped the structure.

## The starting spark

This is where the author first heard the term "harness engineering." It was a *prompt to start*, not the basis of the design — the author did not fully absorb it and then build from it. Instead they took the idea to Claude and asked "what is this, and how would I actually apply it?" The real grounding came from the sources in the next section.

- **["하네스 엔지니어링 15분 만에 이해시켜드립니다 | 개념, 핵심 원칙, AI 에이전트"](https://www.youtube.com/watch?v=MFZX1I_REyg)** (YouTube, Korean-language) — a 15-minute introduction to harness engineering concepts and core principles.

## The sources that shaped it

These are the articles and repositories Claude drew on to research and explain the pattern, and they are the primary references behind this repo. If you want to understand the thinking more deeply than this repo's docs go, start here.

- **["Effective harnesses for long-running agents"](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)** — Anthropic. How to structure agents to make consistent progress across multiple context windows (initializer + coding agent, feature lists, progress files, verification).

- **["Agent Harness Engineering"](https://addyosmani.com/blog/agent-harness-engineering/)** — Addy Osmani. Argues the scaffolding around a model, not the model alone, determines agent performance: "a decent model with a great harness beats a great model with a bad harness." Frames failures as harness problems to fix.

- **["Harness Engineering for Coding Agent Users"](https://martinfowler.com/articles/harness-engineering.html)** — Martin Fowler's site. Mental models for trusting AI-generated code via feedforward guides and feedback sensors across maintainability, architecture, and functionality.

- **["Harness Engineering Complete Guide: Build AI Agents the Claude Code Way"](https://claudecode-lab.com/en/blog/claude-code-harness-engineering/)** — ClaudeCodeLab. Designing operational scaffolding (policy, tools, permissions, verification) around a model rather than relying on prompts alone.

- **["Harness Engineering: The Missing Layer Behind AI Agents"](https://www.louisbouchard.ai/harness-engineering/)** — Louis Bouchard. Distinguishes prompt engineering, context engineering, and harness engineering; harness as the infrastructure around the model.

- **["The Anatomy of an Agent Harness"](https://blog.dailydoseofds.com/p/the-anatomy-of-an-agent-harness)** — Avi Chawla, Daily Dose of DS. Breaks down the machinery surrounding a model — orchestration loops, memory, context handling, error recovery, verification.

- **["Deep Dive: 12 Reusable Agentic Harness Design Patterns from Claude Code"](https://www.epsilla.com/blogs/2026-04-18-deep-dive-12-reusable-agentic-harness-design-patte)** — Epsilla. Twelve patterns across memory, workflow orchestration, tool permissions, and automation, including "deterministic middleware" wrapping probabilistic LLMs.

- **["From Harness to Enforcement: Designing Deterministic Guardrails for LLM Systems"](https://bh3r1th.medium.com/from-harness-to-enforcement-designing-deterministic-guardrails-for-llm-systems-6a9912ba7eba)** — Bharath. Treat LLM output as untrusted candidates needing verification; add deterministic enforcement at design time, CI, and runtime. This thinking informs the rule-and-hook pairing in this repo.

- **[awesome-harness-engineering](https://github.com/ai-boost/awesome-harness-engineering)** — a curated collection of harness-engineering resources, patterns, and templates. A good jumping-off point for going broader.

## Why credit it this way

Being open about this matters to the repo's philosophy. The whole pitch is that you build a harness *in conversation with Claude* — by asking, researching, and deciding together — rather than copying a finished artifact. This repo was built exactly that way. The honest version of "here's a harness starter" is "here's what I learned from these people, assembled with Claude's help, now go make your own."

All links above were verified live when this document was written. If one has since moved, the title should be enough to find it again.
