export interface JapaneseNumber {
  n: number;
  kanji: string;
  h: string;
  r: string;
  en: string;
  alt?: string;
}

export const NUMBERS: JapaneseNumber[] = [
  { n: 1,  kanji: "一", h: "いち",   r: "ichi",  en: "one" },
  { n: 2,  kanji: "二", h: "に",     r: "ni",    en: "two" },
  { n: 3,  kanji: "三", h: "さん",   r: "san",   en: "three" },
  { n: 4,  kanji: "四", h: "よん",   r: "yon",   en: "four",  alt: "し" },
  { n: 5,  kanji: "五", h: "ご",     r: "go",    en: "five" },
  { n: 6,  kanji: "六", h: "ろく",   r: "roku",  en: "six" },
  { n: 7,  kanji: "七", h: "なな",   r: "nana",  en: "seven", alt: "しち" },
  { n: 8,  kanji: "八", h: "はち",   r: "hachi", en: "eight" },
  { n: 9,  kanji: "九", h: "きゅう", r: "kyuu",  en: "nine",  alt: "く" },
  { n: 10, kanji: "十", h: "じゅう", r: "juu",   en: "ten" },
];

export interface DayEntry {
  kanji: string;
  h: string;
  r: string;
  en: string;
}

export const DAYS: DayEntry[] = [
  { kanji: "月曜日", h: "げつようび", r: "getsuyoubi", en: "Monday" },
  { kanji: "火曜日", h: "かようび",   r: "kayoubi",    en: "Tuesday" },
  { kanji: "水曜日", h: "すいようび", r: "suiyoubi",   en: "Wednesday" },
  { kanji: "木曜日", h: "もくようび", r: "mokuyoubi",  en: "Thursday" },
  { kanji: "金曜日", h: "きんようび", r: "kinyoubi",   en: "Friday" },
  { kanji: "土曜日", h: "どようび",   r: "doyoubi",    en: "Saturday" },
  { kanji: "日曜日", h: "にちようび", r: "nichiyoubi", en: "Sunday" },
];

export interface CounterEntry {
  n: number;
  people: string;
  peopleR: string;
  object: string;
  objectR: string;
  note?: string;
}

export const COUNTERS: CounterEntry[] = [
  { n: 1,  people: "ひとり",     peopleR: "hitori",    object: "ひとつ",   objectR: "hitotsu",   note: "irregular" },
  { n: 2,  people: "ふたり",     peopleR: "futari",    object: "ふたつ",   objectR: "futatsu",   note: "irregular" },
  { n: 3,  people: "さんにん",   peopleR: "sannin",    object: "みっつ",   objectR: "mittsu" },
  { n: 4,  people: "よにん",     peopleR: "yonin",     object: "よっつ",   objectR: "yottsu" },
  { n: 5,  people: "ごにん",     peopleR: "gonin",     object: "いつつ",   objectR: "itsutsu" },
  { n: 6,  people: "ろくにん",   peopleR: "rokunin",   object: "むっつ",   objectR: "muttsu" },
  { n: 7,  people: "しちにん",   peopleR: "shichinin", object: "ななつ",   objectR: "nanatsu" },
  { n: 8,  people: "はちにん",   peopleR: "hachinin",  object: "やっつ",   objectR: "yattsu" },
  { n: 9,  people: "きゅうにん", peopleR: "kyuunin",   object: "ここのつ", objectR: "kokonotsu" },
  { n: 10, people: "じゅうにん", peopleR: "juunin",    object: "とお",     objectR: "too" },
];
