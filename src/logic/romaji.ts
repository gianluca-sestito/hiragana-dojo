import { H2R } from "../data/hiragana";
import type { HiraganaChar } from "../data/hiragana";

export function toRomaji(str: string): string {
  let result = "";
  for (const ch of str) {
    if (H2R[ch]) result += H2R[ch];
    else if (ch === " " || ch === "　") result += " ";
    else result += ch;
  }
  return result;
}

const ROMAJI_ALTS: Record<string, string[]> = {
  "shi": ["si"], "chi": ["ti"], "tsu": ["tu"], "fu": ["hu"],
  "ji": ["zi"], "zu": ["du", "dzu"], "wo": ["o"],
  "sha": ["sya"], "shu": ["syu"], "sho": ["syo"],
  "cha": ["tya", "cya"], "chu": ["tyu", "cyu"], "cho": ["tyo", "cyo"],
  "ja": ["jya", "zya"], "ju": ["jyu", "zyu"], "jo": ["jyo", "zyo"],
};

export function isCorrectRomaji(char: HiraganaChar, input: string): boolean {
  const given = input.trim().toLowerCase();
  if (given === char.r) return true;
  if (ROMAJI_ALTS[char.r]?.includes(given)) return true;
  if (char.h === "ぢ" && ["di", "dji"].includes(given)) return true;
  if (char.h === "づ" && ["du", "dzu"].includes(given)) return true;
  return false;
}
