export interface HiraganaChar {
  h: string;
  r: string;
}

export interface HiraganaRow {
  label: string;
  group: "basic" | "dakuon" | "handakuon";
  chars: HiraganaChar[];
}

export const HIRAGANA_ROWS: HiraganaRow[] = [
  { label: "vowels", group: "basic", chars: [
    { h: "あ", r: "a" }, { h: "い", r: "i" }, { h: "う", r: "u" }, { h: "え", r: "e" }, { h: "お", r: "o" }
  ]},
  { label: "k", group: "basic", chars: [
    { h: "か", r: "ka" }, { h: "き", r: "ki" }, { h: "く", r: "ku" }, { h: "け", r: "ke" }, { h: "こ", r: "ko" }
  ]},
  { label: "s", group: "basic", chars: [
    { h: "さ", r: "sa" }, { h: "し", r: "shi" }, { h: "す", r: "su" }, { h: "せ", r: "se" }, { h: "そ", r: "so" }
  ]},
  { label: "t", group: "basic", chars: [
    { h: "た", r: "ta" }, { h: "ち", r: "chi" }, { h: "つ", r: "tsu" }, { h: "て", r: "te" }, { h: "と", r: "to" }
  ]},
  { label: "n", group: "basic", chars: [
    { h: "な", r: "na" }, { h: "に", r: "ni" }, { h: "ぬ", r: "nu" }, { h: "ね", r: "ne" }, { h: "の", r: "no" }
  ]},
  { label: "h", group: "basic", chars: [
    { h: "は", r: "ha" }, { h: "ひ", r: "hi" }, { h: "ふ", r: "fu" }, { h: "へ", r: "he" }, { h: "ほ", r: "ho" }
  ]},
  { label: "m", group: "basic", chars: [
    { h: "ま", r: "ma" }, { h: "み", r: "mi" }, { h: "む", r: "mu" }, { h: "め", r: "me" }, { h: "も", r: "mo" }
  ]},
  { label: "y", group: "basic", chars: [
    { h: "や", r: "ya" }, { h: "", r: "" }, { h: "ゆ", r: "yu" }, { h: "", r: "" }, { h: "よ", r: "yo" }
  ]},
  { label: "r", group: "basic", chars: [
    { h: "ら", r: "ra" }, { h: "り", r: "ri" }, { h: "る", r: "ru" }, { h: "れ", r: "re" }, { h: "ろ", r: "ro" }
  ]},
  { label: "w", group: "basic", chars: [
    { h: "わ", r: "wa" }, { h: "", r: "" }, { h: "", r: "" }, { h: "", r: "" }, { h: "を", r: "wo" }
  ]},
  { label: "nn", group: "basic", chars: [
    { h: "ん", r: "n" }, { h: "", r: "" }, { h: "", r: "" }, { h: "", r: "" }, { h: "", r: "" }
  ]},
  { label: "g", group: "dakuon", chars: [
    { h: "が", r: "ga" }, { h: "ぎ", r: "gi" }, { h: "ぐ", r: "gu" }, { h: "げ", r: "ge" }, { h: "ご", r: "go" }
  ]},
  { label: "z", group: "dakuon", chars: [
    { h: "ざ", r: "za" }, { h: "じ", r: "ji" }, { h: "ず", r: "zu" }, { h: "ぜ", r: "ze" }, { h: "ぞ", r: "zo" }
  ]},
  { label: "d", group: "dakuon", chars: [
    { h: "だ", r: "da" }, { h: "ぢ", r: "ji" }, { h: "づ", r: "zu" }, { h: "で", r: "de" }, { h: "ど", r: "do" }
  ]},
  { label: "b", group: "dakuon", chars: [
    { h: "ば", r: "ba" }, { h: "び", r: "bi" }, { h: "ぶ", r: "bu" }, { h: "べ", r: "be" }, { h: "ぼ", r: "bo" }
  ]},
  { label: "p", group: "handakuon", chars: [
    { h: "ぱ", r: "pa" }, { h: "ぴ", r: "pi" }, { h: "ぷ", r: "pu" }, { h: "ぺ", r: "pe" }, { h: "ぽ", r: "po" }
  ]},
];

export const ALL_HIRAGANA: HiraganaChar[] = HIRAGANA_ROWS.flatMap(r => r.chars).filter(c => c.h !== "");

export const H2R: Record<string, string> = (() => {
  const map: Record<string, string> = {};
  ALL_HIRAGANA.forEach(c => { map[c.h] = c.r; });
  Object.assign(map, {
    "っ": "(tsu)", "ゃ": "ya", "ゅ": "yu", "ょ": "yo",
    "ー": "—", "。": ".", "、": ",", "　": " ", "！": "!", "？": "?", "＿": "_",
  });
  return map;
})();
