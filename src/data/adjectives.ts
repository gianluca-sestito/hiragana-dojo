export interface Adjective {
  type: "i" | "na";
  stem: string;
  en: string;
  dict?: string;
  pastStem?: string;
}

export interface AdjForm {
  key: string;
  label: string;
}

export const ADJECTIVES: Adjective[] = [
  { type: "i",  stem: "おいし",  en: "delicious" },
  { type: "i",  stem: "たか",    en: "expensive / tall" },
  { type: "i",  stem: "やす",    en: "cheap" },
  { type: "i",  stem: "おおき",  en: "big" },
  { type: "i",  stem: "ちいさ",  en: "small" },
  { type: "i",  stem: "あつ",    en: "hot" },
  { type: "i",  stem: "さむ",    en: "cold (weather)" },
  { type: "i",  stem: "つめた",  en: "cold (touch)" },
  { type: "i",  stem: "あたらし", en: "new" },
  { type: "i",  stem: "ふる",    en: "old (things)" },
  { type: "i",  stem: "いそがし", en: "busy" },
  { type: "i",  stem: "たのし",  en: "fun / enjoyable" },
  { type: "i",  stem: "うれし",  en: "happy" },
  { type: "i",  stem: "かなし",  en: "sad" },
  { type: "i",  stem: "むずかし", en: "difficult" },
  { type: "i",  stem: "やさし",  en: "easy / kind" },
  { type: "i",  stem: "はや",    en: "fast / early" },
  { type: "i",  stem: "おそ",    en: "slow / late" },
  { type: "i",  stem: "なが",    en: "long" },
  { type: "i",  stem: "みじか",  en: "short" },
  { type: "i",  stem: "ひろ",    en: "wide / spacious" },
  { type: "i",  stem: "せま",    en: "narrow / cramped" },
  { type: "i",  stem: "つよ",    en: "strong" },
  { type: "i",  stem: "よわ",    en: "weak" },
  { type: "i",  stem: "わる",    en: "bad" },
  { type: "i",  stem: "い",      en: "good", dict: "いい", pastStem: "よかった" },
  { type: "na", stem: "きれい",  en: "beautiful / clean" },
  { type: "na", stem: "しずか",  en: "quiet" },
  { type: "na", stem: "げんき",  en: "healthy / energetic" },
  { type: "na", stem: "すき",    en: "favorite" },
  { type: "na", stem: "きらい",  en: "disliked / hated" },
  { type: "na", stem: "じょうず", en: "skillful" },
  { type: "na", stem: "へた",    en: "unskillful" },
  { type: "na", stem: "ひま",    en: "free (time)" },
  { type: "na", stem: "たいへん", en: "tough / hard" },
  { type: "na", stem: "にぎやか", en: "lively" },
  { type: "na", stem: "ゆうめい", en: "famous" },
  { type: "na", stem: "しんせつ", en: "kind / helpful" },
  { type: "na", stem: "べんり",  en: "convenient" },
  { type: "na", stem: "ふべん",  en: "inconvenient" },
  { type: "na", stem: "だいじ",  en: "important" },
  { type: "na", stem: "かんたん", en: "easy / simple" },
];

export const ADJ_FORMS: AdjForm[] = [
  { key: "present", label: "Present" },
  { key: "past",    label: "Past" },
];
