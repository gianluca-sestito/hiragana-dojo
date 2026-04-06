import { useState, useEffect, useCallback } from "react";
import { S, C } from "../styles";
import { ANIME_WORDS, ANIME_DIALOGUES, ANIME_QUOTES } from "../data/anime";
import type { AnimeWord, AnimeDialogue, AnimeQuote } from "../data/anime";
import { toRomaji } from "../logic/romaji";
import { PlayButton } from "../components/PlayButton";

type Mode = null | "vocab" | "dialogue" | "quote";
type Phase = "pick" | "correct" | "wrong";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ── Vocab drill ───────────────────────────────────────────────────────────────

function VocabDrill({ onBack }: { onBack: () => void }) {
  const [deck, setDeck] = useState<AnimeWord[]>([]);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [phase, setPhase] = useState<Phase>("pick");
  const [score, setScore] = useState(0);
  const [showRomaji, setShowRomaji] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const d = shuffle(ANIME_WORDS).slice(0, 8).map(w => ({
      ...w,
      options: shuffle(w.options),
    }));
    setDeck(d);
  }, []);

  const word = deck[idx] ?? null;

  const handlePick = useCallback((opt: string) => {
    if (phase !== "pick" || !word) return;
    setSelected(opt);
    if (opt === word.text) {
      setPhase("correct");
      setScore(s => s + 1);
    } else {
      setPhase("wrong");
    }
  }, [phase, word]);

  const handleNext = useCallback(() => {
    if (phase === "wrong") {
      setSelected(null);
      setPhase("pick");
      return;
    }
    if (idx + 1 >= deck.length) {
      setDone(true);
    } else {
      setIdx(i => i + 1);
      setSelected(null);
      setPhase("pick");
    }
  }, [phase, idx, deck.length]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Enter" && phase !== "pick") { e.preventDefault(); handleNext(); return; }
      if (phase === "pick" && word && ["1","2","3","4"].includes(e.key)) {
        const opt = word.options[parseInt(e.key) - 1];
        if (opt) handlePick(opt);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, word, handlePick, handleNext]);

  if (!word) return null;

  if (done) {
    const pct = Math.round(score / deck.length * 100);
    return (
      <div style={S.animeWrap}>
        <div style={{ ...S.card, width: "100%", gap: 20 }}>
          <span style={{ fontSize: 48 }}>{pct >= 80 ? "🌸" : pct >= 50 ? "👍" : "💪"}</span>
          <div style={{ fontSize: 28, fontWeight: 700 }}>{score}/{deck.length}</div>
          <div style={{ fontSize: 15, color: pct >= 80 ? C.success : pct >= 50 ? C.warn : C.accent }}>
            {pct >= 80 ? "すごい！" : pct >= 50 ? "Keep practicing!" : "Don't give up!"}
          </div>
          <div style={S.actionsRow}>
            <button onClick={() => {
              const d = shuffle(ANIME_WORDS).slice(0, 8).map(w => ({ ...w, options: shuffle(w.options) }));
              setDeck(d); setIdx(0); setScore(0); setDone(false); setSelected(null); setPhase("pick");
            }} style={S.fillStartBtn}>↻ New round</button>
            <button onClick={onBack} style={S.actionBtn}>← Modes</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={S.animeWrap}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
        <button onClick={onBack} style={S.actionBtn}>← Modes</button>
        <span style={S.speakProgress}>{idx + 1} / {deck.length}</span>
        {score > 0 && <span style={S.sessionText}>{score}/{idx + (phase !== "pick" ? 1 : 0)}</span>}
      </div>

      {/* Progress */}
      <div style={{ ...S.fillProgress, width: "100%" }}>
        <div style={{ ...S.fillProgressFill, width: `${(idx / deck.length) * 100}%` }} />
      </div>

      {/* Romaji toggle */}
      <div style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
        <button
          onClick={() => setShowRomaji(v => !v)}
          style={{ ...S.romajiToggle, ...(showRomaji ? S.romajiToggleOn : {}) }}
        >
          <span style={{ fontSize: 11 }}>{showRomaji ? "◉" : "○"}</span> romaji
        </button>
      </div>

      {/* Card */}
      <div style={{
        ...S.fillCard,
        ...(phase === "correct" ? S.fillCardCorrect : phase === "wrong" ? S.fillCardWrong : {}),
      }}>
        {/* Context badge — shown after correct */}
        {phase === "correct" && (
          <div style={S.animeContextBadge}>{word.context}</div>
        )}

        {/* English prompt */}
        <div style={{ fontSize: 22, fontWeight: 600, textAlign: "center", color: C.ink, lineHeight: 1.4 }}>
          {word.en}
        </div>

        {/* Feedback */}
        {phase === "correct" && (
          <div style={S.fillCorrectInfo}>
            <span>✅</span>
            <span style={{ fontSize: 20 }}>{word.text}</span>
            {showRomaji && <span style={{ color: "#7C9AB5", fontSize: 14 }}>{toRomaji(word.text)}</span>}
          </div>
        )}
        {phase === "wrong" && (
          <div style={S.fillWrongInfo}>
            <span>❌ Answer: <strong>{word.text}</strong></span>
          </div>
        )}
      </div>

      {/* Options */}
      <div style={S.fillOptions}>
        {word.options.map((opt, i) => {
          const isSelected = selected === opt;
          const isAnswer = opt === word.text;
          const showResult = phase !== "pick";
          return (
            <button
              key={i}
              onClick={() => handlePick(opt)}
              disabled={phase !== "pick"}
              style={{
                ...S.fillOption,
                ...(showResult && isAnswer ? S.fillOptionCorrect : {}),
                ...(showResult && isSelected && !isAnswer ? S.fillOptionWrong : {}),
                ...(showResult ? { opacity: isAnswer || isSelected ? 1 : 0.4 } : {}),
              }}
            >
              <span style={S.fillOptionNum}>{i + 1}</span>
              <span style={S.fillOptionTextWrap}>
                <span style={{ ...S.fillOptionText, fontSize: 20 }}>{opt}</span>
                {showRomaji && <span style={S.fillOptionRomaji}>{toRomaji(opt)}</span>}
              </span>
            </button>
          );
        })}
      </div>

      {phase !== "pick" && (
        <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "center" }}>
          <button onClick={handleNext} style={S.fillNextBtn}>
            {phase === "wrong" ? "Try again" : idx < deck.length - 1 ? "Next →" : "Results"}
          </button>
          <span style={S.fillEnterHint}>or Enter</span>
        </div>
      )}
    </div>
  );
}

// ── Dialogue reader ───────────────────────────────────────────────────────────

function DialogueDrill({ onBack }: { onBack: () => void }) {
  const [scenario, setScenario] = useState<AnimeDialogue | null>(null);
  const [showRomaji, setShowRomaji] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [quizPick, setQuizPick] = useState<string | null>(null);
  const [quizPhase, setQuizPhase] = useState<Phase>("pick");

  // Even speakers get color A, odd speakers get color B
  const speakerMap = useCallback((speakers: string[]) => {
    const map: Record<string, "A" | "B"> = {};
    speakers.forEach(s => {
      if (!(s in map)) {
        map[s] = Object.keys(map).length % 2 === 0 ? "A" : "B";
      }
    });
    return map;
  }, []);

  function load(d: AnimeDialogue) {
    setScenario(d);
    setShowTranslation(false);
    setShowRomaji(false);
    setQuizPick(null);
    setQuizPhase("pick");
  }

  const handleQuizPick = useCallback((opt: string) => {
    if (quizPhase !== "pick" || !scenario) return;
    setQuizPick(opt);
    setQuizPhase(opt === scenario.answer ? "correct" : "wrong");
  }, [quizPhase, scenario]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!scenario) return;
      if (e.key === "t" || e.key === "T") setShowTranslation(v => !v);
      if (quizPhase === "pick" && ["1","2","3"].includes(e.key)) {
        const opt = scenario.options[parseInt(e.key) - 1];
        if (opt) handleQuizPick(opt);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [scenario, quizPhase, handleQuizPick]);

  if (!scenario) {
    return (
      <div style={S.animeWrap}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          <button onClick={onBack} style={S.actionBtn}>← Modes</button>
          <span style={{ fontSize: 16, fontWeight: 600 }}>💬 かいわ</span>
          <div style={{ width: 60 }} />
        </div>
        <p style={{ ...S.fillDesc, textAlign: "center" }}>
          Read a manga-style scene in hiragana and answer a comprehension question.
        </p>
        <div style={S.animeTopicGrid}>
          {ANIME_DIALOGUES.map(d => (
            <button key={d.id} onClick={() => load(d)} style={S.animeTopicBtn}>
              <span style={S.animeTitleJP}>{d.title}</span>
              <span style={S.animeTitleEN}>{d.titleEn}</span>
            </button>
          ))}
        </div>
        <button onClick={() => load(ANIME_DIALOGUES[Math.floor(Math.random() * ANIME_DIALOGUES.length)])} style={S.fillStartBtn}>
          🎲 Random scene
        </button>
      </div>
    );
  }

  const speakers = scenario.lines.map(l => l.speaker);
  const colors = speakerMap(speakers);
  const translationLines = scenario.translation.split("\n").filter(l => l.trim());

  return (
    <div style={S.animeWrap}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={S.animeTitleJP}>{scenario.title}</span>
          <PlayButton text={scenario.lines.map(l => l.text).join("。")} size="sm" />
        </div>
        <button
          onClick={() => setShowRomaji(v => !v)}
          style={{ ...S.romajiToggle, ...(showRomaji ? S.romajiToggleOn : {}) }}
        >
          <span style={{ fontSize: 11 }}>{showRomaji ? "◉" : "○"}</span> romaji
        </button>
      </div>

      {/* Manga panel */}
      <div style={S.animeDialogueCard}>
        {scenario.lines.map((line, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <div style={S.animeSpeakerRow}>
              <span style={colors[line.speaker] === "A" ? S.animeSpeakerPillA : S.animeSpeakerPillB}>
                {line.speaker}
              </span>
              <div style={{ display: "flex", flexDirection: "column", flex: 1, gap: 2 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={S.animeLineText}>{line.text}</span>
                  <PlayButton text={line.text} size="sm" />
                </div>
                {showRomaji && (
                  <div style={{ ...S.readLineRomaji, marginLeft: 2 }}>{toRomaji(line.text)}</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Translation */}
      <button
        onClick={() => setShowTranslation(v => !v)}
        style={{ ...S.readTransBtn, ...(showTranslation ? { borderStyle: "solid", backgroundColor: "rgba(124,154,181,0.06)" } : {}) }}
      >
        {showTranslation ? "Hide" : "Show"} translation (T)
      </button>
      {showTranslation && (
        <div style={S.readTransCard}>
          {translationLines.map((line, i) => (
            <div key={i} style={S.readTransLine}>{line}</div>
          ))}
        </div>
      )}

      {/* Comprehension question */}
      <div style={S.readQuizSection}>
        <div style={S.readQuizQ}>{scenario.question}</div>
        <div style={S.readQuizOptions}>
          {scenario.options.map((opt, i) => {
            const isPicked = quizPick === opt;
            const isAnswer = opt === scenario.answer;
            const showResult = quizPhase !== "pick";
            return (
              <button
                key={i}
                onClick={() => handleQuizPick(opt)}
                disabled={quizPhase !== "pick"}
                style={{
                  ...S.readQuizOpt,
                  ...(showResult && isAnswer ? S.fillOptionCorrect : {}),
                  ...(showResult && isPicked && !isAnswer ? S.fillOptionWrong : {}),
                  ...(showResult && !isAnswer && !isPicked ? { opacity: 0.4 } : {}),
                }}
              >
                <span style={S.fillOptionNum}>{i + 1}</span>
                <span>{opt}</span>
                {showRomaji && <span style={S.fillOptionRomaji}>{toRomaji(opt)}</span>}
              </button>
            );
          })}
        </div>
        {quizPhase === "correct" && <div style={S.fillCorrectInfo}>✅ Correct!</div>}
        {quizPhase === "wrong" && (
          <div style={S.fillWrongInfo}>❌ Answer: <strong>{scenario.answer}</strong></div>
        )}
      </div>

      <div style={S.readBottomRow}>
        <button onClick={() => setScenario(null)} style={S.actionBtn}>← Scenes</button>
        <button
          onClick={() => load(ANIME_DIALOGUES[Math.floor(Math.random() * ANIME_DIALOGUES.length)])}
          style={S.fillStartBtn}
        >🎲 New scene</button>
      </div>
    </div>
  );
}

// ── Quote fill ────────────────────────────────────────────────────────────────

function QuoteDrill({ onBack }: { onBack: () => void }) {
  const [deck, setDeck] = useState<AnimeQuote[]>([]);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [phase, setPhase] = useState<Phase>("pick");
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const d = shuffle(ANIME_QUOTES).slice(0, 6).map(q => ({
      ...q,
      options: shuffle(q.options),
    }));
    setDeck(d);
  }, []);

  const quote = deck[idx] ?? null;

  const handlePick = useCallback((opt: string) => {
    if (phase !== "pick" || !quote) return;
    setSelected(opt);
    if (opt === quote.blank) {
      setPhase("correct");
      setScore(s => s + 1);
    } else {
      setPhase("wrong");
    }
  }, [phase, quote]);

  const handleNext = useCallback(() => {
    if (phase === "wrong") {
      setSelected(null);
      setPhase("pick");
      return;
    }
    if (idx + 1 >= deck.length) {
      setDone(true);
    } else {
      setIdx(i => i + 1);
      setSelected(null);
      setPhase("pick");
    }
  }, [phase, idx, deck.length]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Enter" && phase !== "pick") { e.preventDefault(); handleNext(); return; }
      if (phase === "pick" && quote && ["1","2","3","4"].includes(e.key)) {
        const opt = quote.options[parseInt(e.key) - 1];
        if (opt) handlePick(opt);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, quote, handlePick, handleNext]);

  if (!quote) return null;

  if (done) {
    const pct = Math.round(score / deck.length * 100);
    return (
      <div style={S.animeWrap}>
        <div style={{ ...S.card, width: "100%", gap: 20 }}>
          <span style={{ fontSize: 48 }}>{pct >= 80 ? "✨" : pct >= 50 ? "👍" : "💪"}</span>
          <div style={{ fontSize: 28, fontWeight: 700 }}>{score}/{deck.length}</div>
          <div style={{ fontSize: 15, color: pct >= 80 ? C.success : pct >= 50 ? C.warn : C.accent }}>
            {pct >= 80 ? "名セリフ マスター！" : pct >= 50 ? "Keep going!" : "Practice makes perfect!"}
          </div>
          <div style={S.actionsRow}>
            <button onClick={() => {
              const d = shuffle(ANIME_QUOTES).slice(0, 6).map(q => ({ ...q, options: shuffle(q.options) }));
              setDeck(d); setIdx(0); setScore(0); setDone(false); setSelected(null); setPhase("pick");
            }} style={S.fillStartBtn}>↻ New round</button>
            <button onClick={onBack} style={S.actionBtn}>← Modes</button>
          </div>
        </div>
      </div>
    );
  }

  const parts = quote.blankedLine.split("＿＿＿");

  return (
    <div style={S.animeWrap}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
        <button onClick={onBack} style={S.actionBtn}>← Modes</button>
        <span style={S.speakProgress}>{idx + 1} / {deck.length}</span>
        {score > 0 && <span style={S.sessionText}>{score}/{idx + (phase !== "pick" ? 1 : 0)}</span>}
      </div>

      {/* Progress */}
      <div style={{ ...S.fillProgress, width: "100%" }}>
        <div style={{ ...S.fillProgressFill, width: `${(idx / deck.length) * 100}%` }} />
      </div>

      {/* Quote card */}
      <div style={{
        ...S.animeQuoteCard,
        ...(phase === "correct" ? S.fillCardCorrect : phase === "wrong" ? S.fillCardWrong : {}),
      }}>
        <span style={S.animeQuoteSource}>{quote.source}</span>

        {/* Sentence with blank */}
        <div style={S.animeQuoteSentence}>
          {parts[0]}
          <span style={{
            ...S.fillBlank,
            ...(phase === "correct" ? S.fillBlankCorrect : phase === "wrong" ? S.fillBlankWrong : {}),
          }}>
            {phase === "correct" ? quote.blank : phase === "wrong" ? selected : "＿＿"}
          </span>
          {parts[1] ?? ""}
        </div>

        {/* English always visible */}
        <div style={S.animeQuoteEn}>{quote.en}</div>

        {phase === "correct" && (
          <div style={S.fillCorrectInfo}>✅ Correct!</div>
        )}
        {phase === "wrong" && (
          <div style={S.fillWrongInfo}>❌ Answer: <strong>{quote.blank}</strong></div>
        )}
      </div>

      {/* Options */}
      <div style={S.fillOptions}>
        {quote.options.map((opt, i) => {
          const isSelected = selected === opt;
          const isAnswer = opt === quote.blank;
          const showResult = phase !== "pick";
          return (
            <button
              key={i}
              onClick={() => handlePick(opt)}
              disabled={phase !== "pick"}
              style={{
                ...S.fillOption,
                ...(showResult && isAnswer ? S.fillOptionCorrect : {}),
                ...(showResult && isSelected && !isAnswer ? S.fillOptionWrong : {}),
                ...(showResult ? { opacity: isAnswer || isSelected ? 1 : 0.4 } : {}),
              }}
            >
              <span style={S.fillOptionNum}>{i + 1}</span>
              <span style={{ ...S.fillOptionText, fontSize: 18 }}>{opt}</span>
            </button>
          );
        })}
      </div>

      {phase !== "pick" && (
        <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "center" }}>
          <button onClick={handleNext} style={S.fillNextBtn}>
            {phase === "wrong" ? "Try again" : idx < deck.length - 1 ? "Next →" : "Results"}
          </button>
          <span style={S.fillEnterHint}>or Enter</span>
        </div>
      )}
    </div>
  );
}

// ── Mode picker ───────────────────────────────────────────────────────────────

const MODES: Array<{
  id: Exclude<Mode, null>;
  emoji: string;
  label: string;
  labelJP: string;
  desc: string;
}> = [
  { id: "vocab",    emoji: "🗣",  label: "Anime Words",   labelJP: "アニメことば", desc: "Multiple-choice vocab from iconic anime themes" },
  { id: "dialogue", emoji: "💬", label: "Dialogue",       labelJP: "かいわ",       desc: "Read manga-style scenes and answer questions" },
  { id: "quote",    emoji: "✏️", label: "Famous Lines",   labelJP: "めいせりふ",   desc: "Fill in the blank in an anime-inspired quote" },
];

export default function AnimeTab() {
  const [mode, setMode] = useState<Mode>(null);

  if (mode === "vocab")    return <VocabDrill    onBack={() => setMode(null)} />;
  if (mode === "dialogue") return <DialogueDrill onBack={() => setMode(null)} />;
  if (mode === "quote")    return <QuoteDrill    onBack={() => setMode(null)} />;

  return (
    <div style={S.animeWrap}>
      <div style={{ ...S.speakHeader, width: "100%" }}>
        <span style={S.speakTitle}>🎌 Anime</span>
        <span style={S.speakSub}>Learn Japanese through anime themes. Choose a mode:</span>
      </div>
      <div style={S.animeCatGrid}>
        {MODES.map(m => (
          <button key={m.id} onClick={() => setMode(m.id)} style={S.animeCatBtn}>
            <span style={S.animeCatEmoji}>{m.emoji}</span>
            <span style={S.animeCatLabel}>{m.label}</span>
            <span style={S.animeCatLabelJP}>{m.labelJP}</span>
            <span style={S.animeCatDesc}>{m.desc}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
