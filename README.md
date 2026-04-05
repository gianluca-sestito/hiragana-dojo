# ひらがな道場 — Hiragana Dōjō

A Japanese hiragana practice app built with React, TypeScript, and Vite.

## Features

- **Speed quiz** — type the romaji for each hiragana character; wrong answers get re-queued automatically
- **Fill in the blank** — pick the correct hiragana to complete a sentence
- **Read** — short hiragana scenarios with comprehension questions
- **Verbs** — conjugation drills (dictionary, masu, te, nai, ta forms)
- **Adjectives** — i-adjective and na-adjective conjugation drills
- **Numbers** — hiragana number drills including simple arithmetic
- **Chart** — progress overview across all hiragana characters

Progress and stats are persisted in `localStorage`.

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
