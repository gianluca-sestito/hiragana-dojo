export interface HiraganaChar {
  h: string;
  r: string;
}

export interface HiraganaRow {
  label: string;
  group: "basic" | "dakuon" | "handakuon" | "yoon";
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
  { label: "k", group: "yoon", chars: [
    { h: "きゃ", r: "kya" }, { h: "きゅ", r: "kyu" }, { h: "きょ", r: "kyo" }
  ]},
  { label: "s", group: "yoon", chars: [
    { h: "しゃ", r: "sha" }, { h: "しゅ", r: "shu" }, { h: "しょ", r: "sho" }
  ]},
  { label: "t", group: "yoon", chars: [
    { h: "ちゃ", r: "cha" }, { h: "ちゅ", r: "chu" }, { h: "ちょ", r: "cho" }
  ]},
  { label: "n", group: "yoon", chars: [
    { h: "にゃ", r: "nya" }, { h: "にゅ", r: "nyu" }, { h: "にょ", r: "nyo" }
  ]},
  { label: "h", group: "yoon", chars: [
    { h: "ひゃ", r: "hya" }, { h: "ひゅ", r: "hyu" }, { h: "ひょ", r: "hyo" }
  ]},
  { label: "m", group: "yoon", chars: [
    { h: "みゃ", r: "mya" }, { h: "みゅ", r: "myu" }, { h: "みょ", r: "myo" }
  ]},
  { label: "r", group: "yoon", chars: [
    { h: "りゃ", r: "rya" }, { h: "りゅ", r: "ryu" }, { h: "りょ", r: "ryo" }
  ]},
  { label: "g", group: "yoon", chars: [
    { h: "ぎゃ", r: "gya" }, { h: "ぎゅ", r: "gyu" }, { h: "ぎょ", r: "gyo" }
  ]},
  { label: "j", group: "yoon", chars: [
    { h: "じゃ", r: "ja" }, { h: "じゅ", r: "ju" }, { h: "じょ", r: "jo" }
  ]},
  { label: "b", group: "yoon", chars: [
    { h: "びゃ", r: "bya" }, { h: "びゅ", r: "byu" }, { h: "びょ", r: "byo" }
  ]},
  { label: "p", group: "yoon", chars: [
    { h: "ぴゃ", r: "pya" }, { h: "ぴゅ", r: "pyu" }, { h: "ぴょ", r: "pyo" }
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
