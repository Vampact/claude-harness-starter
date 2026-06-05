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

## 사용법

이 레포는 사람이 직접 정독하는 용도가 아닙니다. 주된 독자는 **Claude(LLM)** 입니다.

```
이 레포를 읽고 내 작업 스타일에 맞게 하네스를 설치해줘.
https://github.com/Vampact/claude-harness-starter
```

위 내용을 Claude Code(CLI 또는 데스크탑 앱)에 붙여넣으세요. Claude는 다음을 진행합니다.

1. 당신이 쓰는 언어를 감지하고, 이후 설치 대화를 그 언어로 진행합니다.
2. 사용 환경·기술 스택·작업 스타일을 파악합니다.
3. 모듈을 하나씩 제안하면서, 각 모듈이 무엇을 하는지·당신에게 맞는지 설명합니다.
4. 당신이 승인한 것만 설치하며, 빈칸은 직접 물어보고 채웁니다. 무조건 복붙하지 않습니다.

## 이게 뭔가요

**맞는 말:** 이건 학습형 설치기입니다. 목표는 설치를 끝냈을 때 자신이 선택하고 이해한 구성이 남는 것이지, 복사한 파일 더미가 아닙니다.

**틀린 말:** 설정 파일을 무작정 복사해 주는 도구가 아닙니다. "전부 복사" 경로는 의도적으로 없습니다. 모듈을 고르고 빈칸을 채우는 마찰 자체가 결과를 '내 것'으로 만드는 과정입니다.

## 하네스 패턴 한 문단 요약

`CLAUDE.md`는 매 세션 자동으로 읽어 들이므로 최대한 작게 유지해야 합니다. 짧고 항상 적용되는 규칙만 본문에 직접 두고, 분량이 크거나 상황에 따라 필요한 규칙은 `rules/` 파일로 분리합니다. `CLAUDE.md`는 각 규칙에 대한 **트리거 라인**만 유지하다가, 해당 상황이 오면 모델이 외부 파일을 필요할 때 읽어 들입니다. 절대 위반해서는 안 되는 절대 규칙에는 **훅(hooks)**을 붙여, 행동 규칙 하나만이 유일한 방어선이 되지 않도록 합니다. 깊고 다단계인 절차는 **스킬(skills)**로 만들어 둡니다. 결과적으로 세션당 토큰 소모가 줄고, 모델 집중력이 높아지며, 규칙은 필요한 순간에만 불러와집니다.

## 레포 구조

```
claude-harness-starter/
├── README.md                  # 지금 읽고 계신 파일
├── INSTALL.md                 # Claude가 따르는 설치 진행 지침
├── LICENSE
├── docs/
│   ├── 01-concepts.md         # 라우터 패턴의 이유; 본문 직접 vs 외부 분리
│   ├── 02-architecture.md     # .claude/ 구성과 각 디렉터리의 역할
│   ├── 03-customization-guide.md  # 의사결정 가이드 — 특정 취향을 강요하지 않음
│   └── 04-references.md       # 참고 자료
├── examples/                  # 빈칸 위주의 예시 (참고용, 복붙 금지)
└── templates/                 # 채워 넣을 빈 템플릿
```

## 다음 단계

- 처음 접하는 분은 [docs/01-concepts.md](docs/01-concepts.md)부터 시작하세요.
- 지금 바로 설치하고 싶다면, 레포 URL을 Claude에게 건네거나 [INSTALL.md](INSTALL.md)를 읽어 Claude가 무엇을 할지 미리 확인하세요.
- 설계 배경이 궁금하다면 [docs/02-architecture.md](docs/02-architecture.md)와 [docs/03-customization-guide.md](docs/03-customization-guide.md)를 참고하세요.

## 크레딧

이 레포는 하네스 아이디어를 독창적 창작물로 주장하지 않습니다. 이 패턴은 하네스 엔지니어링에 관한 공개 자료들에서 가져왔으며, 여기 담긴 구조는 그 자료들을 Claude와 함께 연구하면서 정리한 것으로, 처음부터 발명한 것이 아닙니다. 영향을 준 자료들은 [docs/04-references.md](docs/04-references.md)에 크레딧을 밝혔습니다. 이 자료를 자유롭게 가져다 원하는 대로 고치고, 자신의 것으로 만드세요.

## 라이선스

MIT — [LICENSE](LICENSE) 파일 참조. 저작자 표시 없이 자유롭게 사용·수정·재배포·빌드할 수 있습니다.

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
