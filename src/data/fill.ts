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
  // anime-themed vocab sentences
  { sentence: "かれの ＿＿＿ は とても おおきい。",  answer: "ゆめ",     options: ["ゆめ", "みず", "いぬ", "あした"],         translation: "His dream is very big.",                  hint: "dream" },
  { sentence: "わたしたちは ＿＿＿ だ。",            answer: "なかま",   options: ["なかま", "ほん", "さむい", "みせ"],        translation: "We are comrades.",                        hint: "comrades / friends" },
  { sentence: "ふたりの ＿＿＿ は きれない。",       answer: "きずな",   options: ["きずな", "かわ", "おいしい", "でんしゃ"],  translation: "The bond between the two cannot be broken.", hint: "bond / tie" },
  { sentence: "かれには つよい ＿＿＿ がある。",     answer: "ちから",   options: ["ちから", "りんご", "あおい", "えき"],      translation: "He has great strength.",                   hint: "power / strength" },
  { sentence: "＿＿＿ があれば なんでも できる。",   answer: "ゆうき",   options: ["ゆうき", "てんき", "ねこ", "やすい"],      translation: "If you have courage, you can do anything.", hint: "courage / bravery" },
  { sentence: "たいせつな ＿＿＿ を まもりたい。",   answer: "なかま",   options: ["なかま", "うみ", "たかい", "よむ"],        translation: "I want to protect my precious friends.",   hint: "comrades / friends" },
  { sentence: "かれの ＿＿＿ は やさしい。",         answer: "こころ",   options: ["こころ", "くつ", "あつい", "かう"],        translation: "His heart is gentle.",                     hint: "heart / mind / soul" },
  { sentence: "＿＿＿ を あきらめてはいけない。",    answer: "きぼう",   options: ["きぼう", "かぎ", "ねむい", "のむ"],        translation: "You must not give up hope.",               hint: "hope" },
  { sentence: "あのひとの ＿＿＿ が きこえた。",    answer: "こえ",     options: ["こえ", "ほし", "おいしい", "でんしゃ"],    translation: "I heard that person's voice.",             hint: "voice" },
  { sentence: "あのなつの ＿＿＿ は わすれない。",  answer: "おもいで", options: ["おもいで", "さかな", "あかい", "みせ"],    translation: "I won't forget the memories of that summer.", hint: "memories" },

  // Numbers lesson: days of the week
  { sentence: "きょうは ＿＿＿ です。",                    answer: "もくようび",   options: ["もくようび", "げつようび", "どようび", "すいようび"],   translation: "Today is Thursday.",                    hint: "木曜日 = Thursday" },
  { sentence: "＿＿＿ は がっこうが やすみです。",          answer: "にちようび",   options: ["にちようび", "かようび", "きんようび", "もくようび"],   translation: "School is off on Sunday.",              hint: "日曜日 = Sunday" },
  { sentence: "つぎの ＿＿＿ に えいがを みます。",         answer: "きんようび",   options: ["きんようび", "げつようび", "にちようび", "かようび"],   translation: "I'll watch a movie next Friday.",       hint: "金曜日 = Friday" },
  { sentence: "＿＿＿ から しごとが はじまります。",         answer: "げつようび",   options: ["げつようび", "どようび", "すいようび", "きんようび"],   translation: "Work starts from Monday.",              hint: "月曜日 = Monday" },

  // Numbers lesson: time words
  { sentence: "＿＿＿ ともだちに あいます。",                answer: "あした",       options: ["あした", "きのう", "まえ", "つぎ"],                    translation: "I'll meet my friend tomorrow.",         hint: "tomorrow" },
  { sentence: "＿＿＿ えいがを みました。",                  answer: "きのう",       options: ["きのう", "あした", "きょう", "まえ"],                  translation: "I watched a movie yesterday.",          hint: "yesterday" },
  { sentence: "＿＿＿ は いい てんきです。",                 answer: "きょう",       options: ["きょう", "きのう", "あした", "つぎ"],                  translation: "The weather is nice today.",            hint: "today" },

  // Numbers lesson: counters
  { sentence: "すしを ＿＿＿ おねがいします。",              answer: "ふたつ",       options: ["ふたつ", "ふたり", "みっつ", "さんにん"],              translation: "Two sushi please.",                    hint: "2 things (generic counter)" },
  { sentence: "ここに ＿＿＿ います。",                      answer: "ふたり",       options: ["ふたり", "ふたつ", "ひとつ", "さんにん"],              translation: "There are two people here.",            hint: "2 people" },
  { sentence: "りんごを ＿＿＿ かいました。",                answer: "みっつ",       options: ["みっつ", "みんな", "さんにん", "さんじ"],              translation: "I bought three apples.",               hint: "3 things" },
  { sentence: "きょうしつに がくせいが ＿＿＿ います。",      answer: "さんにん",     options: ["さんにん", "みっつ", "さんじ", "よにん"],              translation: "There are three students in class.",   hint: "3 people (～にん)" },

  // Numbers lesson: key vocabulary
  { sentence: "しごとが おおくて ＿＿＿ です。",             answer: "いそがしい",   options: ["いそがしい", "だいじょうぶ", "おいしい", "さむい"],     translation: "I have lots of work and I'm busy.",    hint: "busy = いそがしい" },
  { sentence: "けがは ＿＿＿ ですか？",                      answer: "だいじょうぶ", options: ["だいじょうぶ", "いそがしい", "たのしい", "むずかしい"], translation: "Is the injury okay?",                  hint: "okay / fine" },

  // Numbers lesson: あまり grammar
  { sentence: "わたしは ＿＿＿ べんきょうしない。",           answer: "あまり",       options: ["あまり", "ぜんぜん", "とても", "すごく"],              translation: "I don't study very much.",             hint: "not very much (soft negation)" },
  { sentence: "さいきん ＿＿＿ いそがしくない。",             answer: "あまり",       options: ["あまり", "ぜんぜん", "たいへん", "とても"],            translation: "I haven't been very busy lately.",     hint: "あまり + negative — milder than ぜんぜん" },
  { sentence: "＿＿＿ やさしい ひとですね。",                 answer: "あまりにも",   options: ["あまりにも", "あまり", "ぜんぜん", "すこし"],           translation: "What an excessively kind person.",     hint: "あまりにも + affirmative = too/excessively" },
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
