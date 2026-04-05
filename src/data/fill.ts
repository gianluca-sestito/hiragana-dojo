export interface FillExercise {
  sentence: string;
  answer: string;
  options: string[];
  translation: string;
  hint: string;
}

export interface ReadScenario {
  id: string;
  title: string;
  text: string;
  translation: string;
  question: string;
  options: string[];
  answer: string;
}

export const FILL_POOL: FillExercise[] = [
  { sentence: "わたしは ＿＿＿ がすきです。",       answer: "ねこ",     options: ["ねこ", "つくえ", "あした", "はやい"],     translation: "I like cats.",                            hint: "cat" },
  { sentence: "あしたは ＿＿＿ にいきます。",       answer: "がっこう", options: ["おいしい", "がっこう", "さかな", "あかい"], translation: "Tomorrow I will go to school.",           hint: "school" },
  { sentence: "この りんごは ＿＿＿ です。",        answer: "おいしい", options: ["みず", "おいしい", "ともだち", "よむ"],    translation: "This apple is delicious.",                hint: "delicious" },
  { sentence: "＿＿＿ をのみます。",               answer: "みず",     options: ["ほん", "いぬ", "みず", "おおきい"],       translation: "I drink water.",                          hint: "water" },
  { sentence: "かのじょは ＿＿＿ です。",           answer: "せんせい", options: ["たべる", "せんせい", "きのう", "あおい"],  translation: "She is a teacher.",                       hint: "teacher" },
  { sentence: "いぬは ＿＿＿ で あそびます。",      answer: "こうえん", options: ["こうえん", "さかな", "あおい", "たかい"], translation: "The dog plays in the park.",               hint: "park" },
  { sentence: "わたしは まいあさ ＿＿＿ をたべます。", answer: "ごはん",  options: ["ごはん", "くるま", "しずか", "はしる"],   translation: "I eat rice every morning.",                hint: "rice / meal" },
  { sentence: "あには ＿＿＿ がじょうずです。",      answer: "りょうり", options: ["りょうり", "あめ", "ちいさい", "いく"],   translation: "My older brother is good at cooking.",     hint: "cooking" },
  { sentence: "そとは ＿＿＿ です。",               answer: "さむい",   options: ["さむい", "ねこ", "えき", "かう"],         translation: "It is cold outside.",                     hint: "cold" },
  { sentence: "きょうは ＿＿＿ にのります。",        answer: "でんしゃ", options: ["でんしゃ", "おいしい", "ねる", "しろい"], translation: "Today I will ride the train.",             hint: "train" },
  { sentence: "ともだちと ＿＿＿ をみます。",        answer: "えいが",   options: ["えいが", "たかい", "はしる", "いぬ"],     translation: "I watch a movie with my friend.",         hint: "movie" },
  { sentence: "へやに ＿＿＿ があります。",          answer: "つくえ",   options: ["つくえ", "あつい", "およぐ", "あか"],     translation: "There is a desk in the room.",            hint: "desk" },
  { sentence: "かあさんは ＿＿＿ をかいました。",    answer: "ほん",     options: ["ほん", "はやい", "ねこ", "うみ"],         translation: "Mom bought a book.",                      hint: "book" },
  { sentence: "なつは ＿＿＿ がすきです。",          answer: "うみ",     options: ["うみ", "さむい", "かく", "えき"],         translation: "I like the sea in summer.",                hint: "sea" },
  { sentence: "このみせは ＿＿＿ です。",            answer: "やすい",   options: ["やすい", "ねこ", "でんしゃ", "たべる"],   translation: "This shop is cheap.",                     hint: "cheap" },
  { sentence: "わたしは ＿＿＿ でべんきょうします。", answer: "としょかん", options: ["としょかん", "あつい", "あるく", "しろ"], translation: "I study at the library.",                 hint: "library" },
  { sentence: "いもうとは ＿＿＿ がすきです。",      answer: "おんがく", options: ["おんがく", "たかい", "あさ", "のむ"],     translation: "My younger sister likes music.",           hint: "music" },
  { sentence: "あさ ＿＿＿ をのみます。",            answer: "おちゃ",   options: ["おちゃ", "しずか", "いく", "あおい"],     translation: "I drink tea in the morning.",              hint: "tea" },
  { sentence: "きのう ＿＿＿ にいきました。",        answer: "びょういん", options: ["びょういん", "おいしい", "ねむい", "かう"], translation: "Yesterday I went to the hospital.",       hint: "hospital" },
  { sentence: "そのこは ＿＿＿ です。",              answer: "げんき",   options: ["げんき", "たべる", "でんしゃ", "なが"],   translation: "That child is energetic.",                hint: "energetic" },
];

export const READ_SCENARIOS: ReadScenario[] = [
  {
    id: "daily",
    title: "あさごはん",
    text: "けさ、わたしは はやく おきました。\nだいどころで たまごを つくりました。\nおいしい あさごはんを たべました。\nそして、がっこうに いきました。",
    translation: "This morning, I woke up early.\nI made eggs in the kitchen.\nI ate a delicious breakfast.\nThen, I went to school.",
    question: "What did the person make?",
    options: ["たまご", "さかな", "おにぎり"],
    answer: "たまご",
  },
  {
    id: "food",
    title: "レストラン",
    text: "きのう、ともだちと レストランに いきました。\nわたしは ラーメンを たべました。\nともだちは すしを たべました。\nとても おいしかったです。",
    translation: "Yesterday, I went to a restaurant with a friend.\nI ate ramen.\nMy friend ate sushi.\nIt was very delicious.",
    question: "What did the person eat?",
    options: ["らーめん", "すし", "さかな"],
    answer: "らーめん",
  },
  {
    id: "animals",
    title: "どうぶつえん",
    text: "きょう、かぞくと どうぶつえんに いきました。\nおおきい ぞうを みました。\nかわいい うさぎも いました。\nこどもたちは とても よろこびました。",
    translation: "Today, I went to the zoo with my family.\nI saw a big elephant.\nThere were also cute rabbits.\nThe children were very happy.",
    question: "What animal did they see first?",
    options: ["ぞう", "うさぎ", "ねこ"],
    answer: "ぞう",
  },
  {
    id: "school",
    title: "がっこう",
    text: "わたしは まいにち がっこうに いきます。\nにほんごを べんきょうします。\nともだちと おひるごはんを たべます。\nごごは すうがくの じゅぎょうが あります。",
    translation: "I go to school every day.\nI study Japanese.\nI eat lunch with my friends.\nIn the afternoon, I have a math class.",
    question: "What does the person study?",
    options: ["にほんご", "すうがく", "えいご"],
    answer: "にほんご",
  },
  {
    id: "shopping",
    title: "おかいもの",
    text: "かあさんと いっしょに スーパーに いきました。\nやさいと くだものを かいました。\nりんごが とても やすかったです。\nいえに かえって りょうりを つくりました。",
    translation: "I went to the supermarket with my mother.\nWe bought vegetables and fruit.\nThe apples were very cheap.\nWe went home and cooked.",
    question: "What was cheap?",
    options: ["りんご", "やさい", "みず"],
    answer: "りんご",
  },
  {
    id: "weather",
    title: "はれのひ",
    text: "きょうは いい てんきです。\nそとは あたたかくて きもちが いいです。\nこうえんで さんぽを しました。\nはなが きれいに さいていました。",
    translation: "Today the weather is nice.\nIt is warm and pleasant outside.\nI took a walk in the park.\nThe flowers were blooming beautifully.",
    question: "Where did the person walk?",
    options: ["こうえん", "がっこう", "うみ"],
    answer: "こうえん",
  },
  {
    id: "friends",
    title: "ともだち",
    text: "きのう、ともだちの いえに いきました。\nいっしょに おんがくを ききました。\nばんごはんも いっしょに たべました。\nとても たのしかったです。",
    translation: "Yesterday, I went to my friend's house.\nWe listened to music together.\nWe also ate dinner together.\nIt was a lot of fun.",
    question: "What did they listen to?",
    options: ["おんがく", "ラジオ", "テレビ"],
    answer: "おんがく",
  },
  {
    id: "travel",
    title: "でんしゃのたび",
    text: "あさ、えきに いきました。\nでんしゃに のって とおくの まちに いきました。\nうみを みながら べんとうを たべました。\nゆうがた、いえに かえりました。",
    translation: "In the morning, I went to the station.\nI took the train to a faraway town.\nI ate a bento box while looking at the sea.\nIn the evening, I returned home.",
    question: "What did the person eat on the train?",
    options: ["べんとう", "おにぎり", "ラーメン"],
    answer: "べんとう",
  },
];

export const READ_TOPIC_LABELS: Record<string, string> = {
  daily:    "🌅 Daily life",
  food:     "🍙 Food",
  animals:  "🐱 Animals",
  school:   "📚 School",
  shopping: "🛍️ Shopping",
  weather:  "☀️ Weather",
  friends:  "👫 Friends",
  travel:   "🚃 Travel",
};
