export interface Verb {
  stem: string;
  en: string;
}

export interface VerbForm {
  key: string;
  label: string;
  suffix: string;
  enPrefix: string;
}

export const VERBS: Verb[] = [
  { stem: "たべ", en: "eat" },
  { stem: "のみ", en: "drink" },
  { stem: "ね", en: "sleep" },
  { stem: "おき", en: "wake up" },
  { stem: "あるき", en: "walk" },
  { stem: "はしり", en: "run" },
  { stem: "およぎ", en: "swim" },
  { stem: "すわり", en: "sit" },
  { stem: "たち", en: "stand" },
  { stem: "やすみ", en: "rest" },
  { stem: "はなし", en: "speak" },
  { stem: "きき", en: "listen" },
  { stem: "よみ", en: "read" },
  { stem: "かき", en: "write" },
  { stem: "おしえ", en: "teach" },
  { stem: "ならい", en: "learn" },
  { stem: "こたえ", en: "answer" },
  { stem: "よび", en: "call" },
  { stem: "わらい", en: "laugh" },
  { stem: "なき", en: "cry" },
  { stem: "いき", en: "go" },
  { stem: "き", en: "come" },
  { stem: "かえり", en: "return" },
  { stem: "のり", en: "ride" },
  { stem: "おり", en: "get off" },
  { stem: "とび", en: "fly / jump" },
  { stem: "はいり", en: "enter" },
  { stem: "で", en: "leave / exit" },
  { stem: "わたり", en: "cross" },
  { stem: "とおり", en: "pass through" },
  { stem: "かい", en: "buy" },
  { stem: "うり", en: "sell" },
  { stem: "もち", en: "hold / carry" },
  { stem: "おき", en: "put / place" },
  { stem: "とり", en: "take" },
  { stem: "おくり", en: "send" },
  { stem: "もらい", en: "receive" },
  { stem: "あげ", en: "give" },
  { stem: "つかい", en: "use" },
  { stem: "さがし", en: "search" },
  { stem: "し", en: "do" },
  { stem: "つくり", en: "make" },
  { stem: "なおし", en: "fix / repair" },
  { stem: "はたらき", en: "work" },
  { stem: "べんきょうし", en: "study" },
  { stem: "れんしゅうし", en: "practice" },
  { stem: "てつだい", en: "help" },
  { stem: "み", en: "see / watch" },
  { stem: "かんじ", en: "feel" },
  { stem: "おもい", en: "think" },
  { stem: "しり", en: "know" },
  { stem: "わすれ", en: "forget" },
  { stem: "おぼえ", en: "remember" },
  { stem: "すき", en: "like" },
  { stem: "あい", en: "meet" },
  { stem: "まち", en: "wait" },
  { stem: "あそび", en: "play / hang out" },
  { stem: "うたい", en: "sing" },
  { stem: "おどり", en: "dance" },
  { stem: "あらい", en: "wash" },
  { stem: "きり", en: "cut" },
  { stem: "あけ", en: "open" },
  { stem: "しめ", en: "close" },
  { stem: "つけ", en: "turn on" },
  { stem: "けし", en: "turn off / erase" },
  { stem: "きがえ", en: "change clothes" },
  { stem: "そうじし", en: "clean" },
];

export const VERB_FORMS: VerbForm[] = [
  { key: "present", label: "Present · いま", suffix: "ます",         enPrefix: "" },
  { key: "neg",     label: "Negative · ない", suffix: "ません",       enPrefix: "not " },
  { key: "past",    label: "Past · かこ",     suffix: "ました",       enPrefix: "(past) " },
  { key: "negpast", label: "Neg. Past · かこ", suffix: "ませんでした", enPrefix: "didn't " },
  { key: "tai",     label: "Want · たい",      suffix: "たい",        enPrefix: "want to " },
];
