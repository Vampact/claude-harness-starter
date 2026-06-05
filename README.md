# claude-harness-starter

> **한국어**
> Claude Code를 쓰면서 규칙·훅·스킬을 점점 늘려가다 보면, `CLAUDE.md` 하나에 모든 게 쌓여 토큰을 잡아먹고 모델의 주의력이 흩어집니다. 이 레포는 그 문제를 푸는 **"하네스(harness)" 구조**를 처음 접하는 사람도 쓸 수 있게 정리한 **설치 오케스트레이터 + 예시 자료집**입니다.
>
> **쓰는 법은 간단합니다. 이 레포 주소를 Claude에게 던지고 "이거 보고 내 환경에 맞게 설치해줘"라고 말하세요.** Claude가 이 레포를 읽고, 당신의 환경과 목표를 물어본 뒤, 동의한 모듈만 골라 설치해 줍니다. 그 과정에서 당신은 구조를 자연스럽게 이해하게 됩니다.

---

> **English**
> As you add rules, hooks, and skills to Claude Code, everything piles into a single `CLAUDE.md` — burning tokens and scattering the model's attention. This repo packages the **"harness" pattern** that solves this into an **install orchestrator + example library** that even newcomers can use.
>
> **Usage is simple: hand this repo's URL to Claude and say "read this and install it for my setup."** Claude reads the repo, interviews you about your environment and goals, and installs only the modules you agree to — and you understand the structure as you go.

---

## How to use this repo

You are not really meant to read this repo yourself. Its primary reader is **Claude (an LLM)**.

```
Read https://github.com/Vampact/claude-harness-starter and help me
install a harness setup tailored to how I work.
```

Paste that into Claude Code (CLI or desktop app). Claude will:

1. Detect the language you are writing in and run the rest of the install conversation in it.
2. Interview you about your environment, stack, and working style.
3. Propose modules one at a time — explaining what each does and whether it fits your case.
4. Install only what you approve, filling in placeholders by asking you, never by blind copy-paste.

## What this is (and is not)

**It is** a teaching installer. The goal is that you finish with a setup you understand and chose, not a pile of files you copied.

**It is not** a one-click dotfiles dump. There is no "just copy everything" path on purpose — the friction of choosing and filling placeholders is what makes the result yours.

## The harness pattern in one paragraph

`CLAUDE.md` is auto-loaded every session, so keep it small: only short, always-on rules stay inline. Heavier or situational rules move into `rules/` files. `CLAUDE.md` keeps just a **trigger line** for each; when that situation arises, the model reads the external file on demand. Deterministic guardrails (the rules that must never be violated) get paired with **hooks** so behavior alone is not the only defense. Deep, multi-step procedures live as **skills**. The result: fewer tokens spent per session, sharper model focus, and rules that load exactly when relevant.

## Repository layout

```
claude-harness-starter/
├── README.md                  # You are here
├── INSTALL.md                 # The orchestration instructions Claude follows
├── LICENSE
├── docs/
│   ├── 01-concepts.md         # Why the router pattern; inline vs external
│   ├── 02-architecture.md     # The .claude/ layout and each directory's role
│   ├── 03-customization-guide.md  # Decision guide — no taste forced on you
│   └── 04-references.md       # Further reading
├── examples/                  # Placeholder-heavy examples (cite, don't copy)
└── templates/                 # Empty skeletons to fill in
```

## Where to go next

- New to the idea? Start with [docs/01-concepts.md](docs/01-concepts.md).
- Want to install now? Hand the repo URL to Claude, or read [INSTALL.md](INSTALL.md) to see what Claude will do.
- Curious about the design? See [docs/02-architecture.md](docs/02-architecture.md) and [docs/03-customization-guide.md](docs/03-customization-guide.md).

## Credits & prior art

This repo does not claim the harness idea as original. The pattern is drawn from a body of public writing on harness engineering, and the structure here was figured out by researching those sources together with Claude — not invented from scratch. The sources that shaped it are credited in [docs/04-references.md](docs/04-references.md). Take any of it, change it however you like, and make it yours.

## License

MIT — see [LICENSE](LICENSE). You are free to use, modify, redistribute, and build on this however you want, no attribution required.
