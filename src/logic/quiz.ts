import { ALL_HIRAGANA } from "../data/hiragana";
import type { HiraganaChar } from "../data/hiragana";
import type { CharStat } from "./storage";

export function pickNextChar(
  stats: Record<string, CharStat>,
  recent: string[],
  weakOnly: boolean,
): HiraganaChar {
  let pool = ALL_HIRAGANA;

  if (weakOnly) {
    const weak = pool.filter(c => {
      const s = stats[c.h];
      return s && s.total >= 2 && s.correct / s.total < 0.7;
    });
    if (weak.length > 0) pool = weak;
  }

  const testedCounts = pool.map(c => stats[c.h]?.total ?? 0).filter(t => t > 0);
  const avgTests = testedCounts.length > 0
    ? testedCounts.reduce((a, b) => a + b, 0) / testedCounts.length
    : 0;

  const weighted = pool.map(c => {
    const s = stats[c.h];
    if (!s || s.total === 0) return { char: c, weight: 4 };
    const accuracy = s.correct / s.total;
    const errorW = (1 - accuracy) * 3;
    const freqBoost = avgTests > 0
      ? Math.max(0, Math.min(1.5, (avgTests - s.total) / avgTests * 1.5))
      : 0;
    return { char: c, weight: 2.0 + errorW + freqBoost };
  });

  const candidates = weighted.filter(w => !recent.includes(w.char.h));
  const final = candidates.length > 0 ? candidates : weighted;

  const total = final.reduce((s, w) => s + w.weight, 0);
  let rand = Math.random() * total;
  for (const w of final) {
    rand -= w.weight;
    if (rand <= 0) return w.char;
  }
  return final[0].char;
}
