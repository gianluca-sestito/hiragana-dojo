import { NUMBERS } from "../data/numbers";
import type { JapaneseNumber } from "../data/numbers";

export interface NumberExercise {
  key: string;
  type: "num2jp" | "jp2num" | "en2jp" | "math";
  num: JapaneseNumber;
  correct: string;
  prompt: string;
  promptSub?: string;
  options: string[];
  optionType: "jp" | "en";
}

function getWrongs(correct: JapaneseNumber, n: number): JapaneseNumber[] {
  return [...NUMBERS].filter(x => x.n !== correct.n).sort(() => Math.random() - 0.5).slice(0, n);
}

export function generateNumberExercise(_recentKeys: string[]): NumberExercise {
  const types = ["num2jp", "jp2num", "en2jp", "math"] as const;
  const type = types[Math.floor(Math.random() * types.length)];

  if (type === "num2jp") {
    const num = NUMBERS[Math.floor(Math.random() * NUMBERS.length)];
    const key = "n2j" + num.n;
    const wrongs = getWrongs(num, 3).map(w => w.h);
    return { type, num, correct: num.h, key, prompt: String(num.n),
      promptSub: "What is this number in hiragana?",
      options: [...wrongs, num.h].sort(() => Math.random() - 0.5), optionType: "jp" };
  }

  if (type === "jp2num") {
    const num = NUMBERS[Math.floor(Math.random() * NUMBERS.length)];
    const key = "j2n" + num.n;
    const wrongs = getWrongs(num, 3).map(w => String(w.n));
    return { type, num, correct: String(num.n), key, prompt: num.h,
      options: [...wrongs, String(num.n)].sort(() => Math.random() - 0.5), optionType: "en" };
  }

  if (type === "en2jp") {
    const num = NUMBERS[Math.floor(Math.random() * NUMBERS.length)];
    const key = "e2j" + num.n;
    const wrongs = getWrongs(num, 3).map(w => w.h);
    return { type, num, correct: num.h, key, prompt: num.en,
      options: [...wrongs, num.h].sort(() => Math.random() - 0.5), optionType: "jp" };
  }

  // math
  let a: number, b: number, op: "+" | "-", result: number;
  let attempts = 0;
  do {
    a = Math.floor(Math.random() * 9) + 1;
    op = Math.random() > 0.5 ? "+" : "-";
    b = op === "+" ? Math.floor(Math.random() * (10 - a)) + 1 : Math.floor(Math.random() * (a - 1)) + 1;
    result = op === "+" ? a + b : a - b;
    attempts++;
  } while ((result < 1 || result > 10) && attempts < 20);

  if (result < 1 || result > 10) { result = 3; a = 1; b = 2; op = "+"; }

  const numA = NUMBERS.find(x => x.n === a)!;
  const numB = NUMBERS.find(x => x.n === b)!;
  const numR = NUMBERS.find(x => x.n === result)!;
  const key = "math" + a + op + b;
  const wrongs = getWrongs(numR, 3).map(w => w.h);

  return { type, num: numR, correct: numR.h, key,
    prompt: `${numA.h} ${op === "+" ? "＋" : "ー"} ${numB.h} ＝ ？`,
    promptSub: `${a} ${op} ${b} = ?`,
    options: [...wrongs, numR.h].sort(() => Math.random() - 0.5), optionType: "jp" };
}
