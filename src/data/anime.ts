// ── Anime section data ────────────────────────────────────────────────────────

export interface AnimeWord {
  text: string;      // hiragana word
  en: string;        // English meaning
  context: string;   // cultural flavour (e.g. "used in Naruto")
  options: string[]; // 4 multiple-choice options (including correct)
}

export interface AnimeDialogue {
  id: string;
  title: string;     // Japanese title
  titleEn: string;   // English title
  lines: Array<{ speaker: string; text: string }>;
  translation: string;
  question: string;
  options: string[];
  answer: string;
}

export interface AnimeQuote {
  hiragana: string;    // full quote in hiragana
  en: string;          // English translation
  source: string;      // stylistic origin / theme
  blank: string;       // the word to fill in
  blankedLine: string; // quote with ＿＿＿ substituted
  options: string[];   // 4 choices including correct
}

// ── Vocab pool ────────────────────────────────────────────────────────────────

export const ANIME_WORDS: AnimeWord[] = [
  { text: "なかま",      en: "comrades / friends",        context: "One Piece — Luffy's bonds",        options: ["なかま", "てき", "せんせい", "たべもの"] },
  { text: "ゆめ",        en: "dream",                     context: "Naruto — chasing your dream",      options: ["ゆめ", "かぜ", "みち", "そら"] },
  { text: "たたかい",    en: "battle / fight",             context: "Dragon Ball Z — legendary battles", options: ["たたかい", "あそび", "きもち", "やすみ"] },
  { text: "きずな",      en: "bond / tie",                 context: "Naruto Shippūden — bonds of the heart", options: ["きずな", "こたえ", "みらい", "ちから"] },
  { text: "ちから",      en: "power / strength",           context: "many shōnen anime",                options: ["ちから", "こころ", "めいわく", "そだち"] },
  { text: "こころ",      en: "heart / mind / soul",        context: "Fullmetal Alchemist",              options: ["こころ", "あたま", "ゆうき", "てきど"] },
  { text: "ゆうき",      en: "courage / bravery",          context: "My Hero Academia",                 options: ["ゆうき", "おびえ", "なかま", "ためい"] },
  { text: "みらい",      en: "future",                     context: "Steins;Gate — protecting the future", options: ["みらい", "むかし", "いま", "あした"] },
  { text: "まほう",      en: "magic / spell",              context: "Sailor Moon / Cardcaptor Sakura",  options: ["まほう", "ふしぎ", "かがく", "かがみ"] },
  { text: "へんしん",    en: "transformation",             context: "Sailor Moon — transform!",         options: ["へんしん", "ひっこし", "たびだち", "そうさ"] },
  { text: "さくら",      en: "cherry blossom",             context: "ubiquitous in anime openings",     options: ["さくら", "もみじ", "たんぽぽ", "あじさい"] },
  { text: "おにいちゃん", en: "older brother (familiar)",   context: "many sibling scenes in anime",     options: ["おにいちゃん", "おとうと", "いもうと", "おかあさん"] },
  { text: "まけない",    en: "won't lose / won't give up", context: "classic shōnen battle cry",        options: ["まけない", "わからない", "たべない", "みえない"] },
  { text: "たいせつ",    en: "important / precious",       context: "Anohana — precious memories",      options: ["たいせつ", "ふつう", "きれい", "ゆっくり"] },
  { text: "なみだ",      en: "tears",                      context: "Clannad / Anohana — emotional scenes", options: ["なみだ", "えがお", "こえ", "むね"] },
  { text: "えがお",      en: "smiling face",               context: "slice-of-life anime",              options: ["えがお", "なみだ", "こわい", "しずか"] },
  { text: "まもる",      en: "to protect",                 context: "Bleach — protect what matters",    options: ["まもる", "はしる", "のむ", "おどる"] },
  { text: "むかし",      en: "long ago / the past",        context: "Studio Ghibli — story openings",   options: ["むかし", "いま", "みらい", "まいにち"] },
  { text: "ふしぎ",      en: "mysterious / strange",       context: "Spirited Away / Ghibli worlds",    options: ["ふしぎ", "ふつう", "きれい", "あたらしい"] },
  { text: "かみ",        en: "god / spirit / deity",       context: "Noragami / Ghibli nature spirits", options: ["かみ", "あく", "にんげん", "けいさつ"] },
  { text: "しゅぎょう",  en: "training / discipline",      context: "Naruto / Demon Slayer — the path", options: ["しゅぎょう", "やすみ", "あそび", "たびたび"] },
  { text: "けっしん",    en: "determination / resolve",    context: "My Hero Academia — never give up", options: ["けっしん", "まよい", "おそれ", "わすれ"] },
  { text: "いのち",      en: "life",                       context: "Demon Slayer — the weight of life", options: ["いのち", "からだ", "こころ", "かおり"] },
  { text: "もののけ",    en: "forest spirit / creature",   context: "Princess Mononoke",                options: ["もののけ", "ひとだま", "おばけ", "かいぶつ"] },
  { text: "きせき",      en: "miracle",                    context: "Angel Beats — miraculous moments", options: ["きせき", "しっぱい", "まちがい", "のぞみ"] },
  { text: "おもいで",    en: "memories",                   context: "Grave of the Fireflies / Ghibli",  options: ["おもいで", "ゆめ", "みらい", "きぼう"] },
  { text: "きぼう",      en: "hope",                       context: "Neon Genesis Evangelion themes",   options: ["きぼう", "ぜつぼう", "なみだ", "ふしぎ"] },
  { text: "こえ",        en: "voice",                      context: "A Silent Voice — the power of voice", options: ["こえ", "おと", "おんがく", "ことば"] },
  { text: "おんせん",    en: "hot spring",                 context: "Spirited Away — the spirit bathhouse", options: ["おんせん", "うみ", "やま", "かわ"] },
  { text: "さだめ",      en: "fate / destiny",             context: "Berserk / Fate series — destiny",  options: ["さだめ", "じゆう", "えらび", "みち"] },
];

// ── Dialogue pool ─────────────────────────────────────────────────────────────

export const ANIME_DIALOGUES: AnimeDialogue[] = [
  {
    id: "forest",
    title: "もりのなかで",
    titleEn: "In the Forest",
    lines: [
      { speaker: "はると", text: "このもりは ふしぎだね。" },
      { speaker: "みつき", text: "うん、おおきな きが いっぱい あるよ。" },
      { speaker: "はると", text: "なにか こえが きこえる。" },
      { speaker: "みつき", text: "もしかして、かみさまが いるのかも。" },
    ],
    translation: "\"This forest is mysterious.\"\n\"Yeah, there are lots of big trees.\"\n\"I can hear some kind of voice.\"\n\"Maybe there's a spirit here.\"",
    question: "What does Haruto hear?",
    options: ["こえ", "おんがく", "かぜ"],
    answer: "こえ",
  },
  {
    id: "training",
    title: "しゅぎょうのひ",
    titleEn: "Training Day",
    lines: [
      { speaker: "せんせい", text: "きょうも れんしゅうを するぞ。" },
      { speaker: "たろう",   text: "はい！まけません！" },
      { speaker: "せんせい", text: "ゆうきが あれば、なんでも できる。" },
      { speaker: "たろう",   text: "わかりました。がんばります！" },
    ],
    translation: "\"We train again today.\"\n\"Yes! I won't lose!\"\n\"If you have courage, you can do anything.\"\n\"I understand. I'll do my best!\"",
    question: "What does the teacher say you need?",
    options: ["ゆうき", "ちから", "たいせつ"],
    answer: "ゆうき",
  },
  {
    id: "memory",
    title: "むかしのこと",
    titleEn: "Memories of the Past",
    lines: [
      { speaker: "さくら", text: "ねえ、あのなつのことを おぼえてる？" },
      { speaker: "けんじ", text: "うん、よく おぼえてるよ。なつかしいな。" },
      { speaker: "さくら", text: "あのとき、みんなで かわで あそんだね。" },
      { speaker: "けんじ", text: "そうだね。あのおもいでは たいせつだよ。" },
    ],
    translation: "\"Hey, do you remember that summer?\"\n\"Yeah, I remember it well. How nostalgic.\"\n\"Back then we all played at the river.\"\n\"Yeah. Those memories are precious.\"",
    question: "Where did they play together?",
    options: ["かわ", "うみ", "もり"],
    answer: "かわ",
  },
  {
    id: "dream",
    title: "ゆめのはなし",
    titleEn: "Talking About Dreams",
    lines: [
      { speaker: "りく",  text: "おまえの ゆめは なんだ？" },
      { speaker: "あおい", text: "わたしは せかいを たびしたい！" },
      { speaker: "りく",  text: "すごいな。ぼくは いしゃに なりたい。" },
      { speaker: "あおい", text: "ぜったい、ゆめを あきらめないでね。" },
    ],
    translation: "\"What's your dream?\"\n\"I want to travel the world!\"\n\"Amazing. I want to become a doctor.\"\n\"Definitely don't give up on your dream.\"",
    question: "What does Aoi want to do?",
    options: ["たびする", "うたう", "かく"],
    answer: "たびする",
  },
  {
    id: "protect",
    title: "まもりたいもの",
    titleEn: "What I Want to Protect",
    lines: [
      { speaker: "ひろ",  text: "どうして そんなに つよく なりたいの？" },
      { speaker: "まい",  text: "たいせつな なかまを まもりたいから。" },
      { speaker: "ひろ",  text: "そうか。ぼくも いっしょに まもるよ。" },
      { speaker: "まい",  text: "ありがとう。いっしょに がんばろう！" },
    ],
    translation: "\"Why do you want to become so strong?\"\n\"Because I want to protect my precious friends.\"\n\"I see. I'll protect them with you.\"\n\"Thank you. Let's do our best together!\"",
    question: "Why does Mai want to become strong?",
    options: ["なかまを まもる", "しあいに かつ", "めいよを える"],
    answer: "なかまを まもる",
  },
  {
    id: "hotspring",
    title: "おんせんのよる",
    titleEn: "Evening at the Hot Spring",
    lines: [
      { speaker: "ゆき",  text: "このおんせん、とても きもちいいね。" },
      { speaker: "はな",  text: "うん！そとの そらが きれいだよ。" },
      { speaker: "ゆき",  text: "ほし が いっぱい みえる。" },
      { speaker: "はな",  text: "こんな よるは ずっと つづけばいいな。" },
    ],
    translation: "\"This hot spring feels so good.\"\n\"Yeah! The sky outside is beautiful.\"\n\"You can see lots of stars.\"\n\"I wish a night like this could go on forever.\"",
    question: "What does Hana say is beautiful?",
    options: ["そら", "みず", "やま"],
    answer: "そら",
  },
];

// ── Quote pool ────────────────────────────────────────────────────────────────

export const ANIME_QUOTES: AnimeQuote[] = [
  {
    hiragana: "なかまを まもるために、ぼくは つよく なる。",
    en: "I'll grow stronger to protect my friends.",
    source: "shōnen spirit",
    blank: "まもる",
    blankedLine: "なかまを ＿＿＿ために、ぼくは つよく なる。",
    options: ["まもる", "たべる", "わすれる", "ねる"],
  },
  {
    hiragana: "ゆめを あきらめない。",
    en: "I won't give up on my dream.",
    source: "classic shōnen",
    blank: "ゆめ",
    blankedLine: "＿＿＿を あきらめない。",
    options: ["ゆめ", "いのち", "とも", "みず"],
  },
  {
    hiragana: "むかし むかし、ふしぎな まちが ありました。",
    en: "Long, long ago, there was a mysterious town.",
    source: "Ghibli-style opening",
    blank: "ふしぎ",
    blankedLine: "むかし むかし、＿＿＿な まちが ありました。",
    options: ["ふしぎ", "しずか", "ちいさ", "きれい"],
  },
  {
    hiragana: "ぼくが まもる。ぜったいに まけない。",
    en: "I will protect you. I absolutely will not lose.",
    source: "battle shōnen",
    blank: "まもる",
    blankedLine: "ぼくが ＿＿＿。ぜったいに まけない。",
    options: ["まもる", "おどる", "やすむ", "たつ"],
  },
  {
    hiragana: "このきずなは ぜったいに きれない。",
    en: "This bond can never be broken.",
    source: "friendship arc",
    blank: "きずな",
    blankedLine: "この＿＿＿は ぜったいに きれない。",
    options: ["きずな", "ゆめ", "ちから", "こえ"],
  },
  {
    hiragana: "おもいでは いつも こころに いきている。",
    en: "Memories always live on in the heart.",
    source: "emotional Ghibli",
    blank: "こころ",
    blankedLine: "おもいでは いつも ＿＿＿に いきている。",
    options: ["こころ", "あたま", "むね", "め"],
  },
  {
    hiragana: "きせきは じぶんの ちからで おこす。",
    en: "You create miracles with your own power.",
    source: "sports anime",
    blank: "きせき",
    blankedLine: "＿＿＿は じぶんの ちからで おこす。",
    options: ["きせき", "しっぱい", "かぜ", "やすみ"],
  },
  {
    hiragana: "こわくても、まえに すすむ。それが ゆうきだ。",
    en: "Even when afraid, you press forward. That is courage.",
    source: "My Hero Academia spirit",
    blank: "ゆうき",
    blankedLine: "こわくても、まえに すすむ。それが ＿＿＿だ。",
    options: ["ゆうき", "いのち", "さだめ", "まほう"],
  },
  {
    hiragana: "みらいは じぶんで えらぶ もの。",
    en: "The future is something you choose for yourself.",
    source: "Steins;Gate theme",
    blank: "みらい",
    blankedLine: "＿＿＿は じぶんで えらぶ もの。",
    options: ["みらい", "むかし", "いま", "さだめ"],
  },
  {
    hiragana: "たとえ よるが ながくても、かならず あさは くる。",
    en: "Even if the night is long, morning will surely come.",
    source: "hopeful drama",
    blank: "あさ",
    blankedLine: "たとえ よるが ながくても、かならず ＿＿＿は くる。",
    options: ["あさ", "よる", "かぜ", "はる"],
  },
  {
    hiragana: "なみだは よわさじゃない。こころの ことばだ。",
    en: "Tears are not weakness. They are the language of the heart.",
    source: "emotional anime",
    blank: "なみだ",
    blankedLine: "＿＿＿は よわさじゃない。こころの ことばだ。",
    options: ["なみだ", "えがお", "こえ", "いのち"],
  },
  {
    hiragana: "しゅぎょうに おわりは ない。",
    en: "There is no end to training.",
    source: "martial arts anime",
    blank: "しゅぎょう",
    blankedLine: "＿＿＿に おわりは ない。",
    options: ["しゅぎょう", "たびたび", "あそび", "やすみ"],
  },
];
