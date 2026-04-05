export interface JapaneseNumber {
  n: number;
  h: string;
  r: string;
  en: string;
  alt?: string;
}

export const NUMBERS: JapaneseNumber[] = [
  { n: 1,  h: "いち",   r: "ichi",  en: "one" },
  { n: 2,  h: "に",     r: "ni",    en: "two" },
  { n: 3,  h: "さん",   r: "san",   en: "three" },
  { n: 4,  h: "よん",   r: "yon",   en: "four",  alt: "し" },
  { n: 5,  h: "ご",     r: "go",    en: "five" },
  { n: 6,  h: "ろく",   r: "roku",  en: "six" },
  { n: 7,  h: "なな",   r: "nana",  en: "seven", alt: "しち" },
  { n: 8,  h: "はち",   r: "hachi", en: "eight" },
  { n: 9,  h: "きゅう", r: "kyuu",  en: "nine",  alt: "く" },
  { n: 10, h: "じゅう", r: "juu",   en: "ten" },
];
