# ひらがな道場 — Hiragana Dōjō

A Japanese hiragana practice app built with React, TypeScript, and Vite. No backend — everything runs in the browser and persists in `localStorage`.

## Features

- **⚡ Speed** — type the romaji for each hiragana character; wrong answers get re-queued with spaced repetition
- **🧩 Fill** — pick the correct hiragana word to complete a sentence
- **📖 Read** — short hiragana scenarios with comprehension questions
- **🔄 Verbs** — conjugation drills (dictionary, masu, te, nai, ta forms)
- **✨ Adjectives** — i-adjective and na-adjective conjugation drills
- **🔢 Numbers** — hiragana number drills including simple arithmetic
- **🎤 Speak** — speak Japanese out loud and get scored via the Web Speech API
- **📋 Chart** — progress overview across all hiragana characters

## Speak tab

The Speak tab uses the browser's `SpeechRecognition` API (`ja-JP`) to evaluate spoken Japanese. It covers three categories, with 20 items picked at random each round:

| Category | Pool |
|---|---|
| 📝 Vocabulary | 100 common nouns (animals, food, places, objects, nature…) |
| 🔢 Numbers | 23 entries from 1 to 1000 |
| 💬 Phrases | 52 everyday phrases and greetings |

STT results are normalized from kanji to hiragana before comparison, and a Levenshtein similarity threshold (0.85) accepts near-correct pronunciations. Works best in Chrome/Edge; mic permission is required on first use.

## Getting started

```bash
bun install
bun run dev
```

## Scripts

| Command | Description |
|---|---|
| `bun run dev` | Start dev server |
| `bun run build` | Production build |
| `bun run preview` | Preview production build |
| `bun run lint` | Run ESLint |
| `bun run typecheck` | Run TypeScript type check |

## Stack

- [React 18](https://react.dev/) with hooks
- [TypeScript](https://www.typescriptlang.org/) (strict mode)
- [Vite](https://vitejs.dev/) + [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react)
- [Bun](https://bun.sh/) as package manager and runtime
- ESLint with `@typescript-eslint` and `eslint-plugin-react-hooks`
- Web Speech API for TTS and STT (no external dependencies)
