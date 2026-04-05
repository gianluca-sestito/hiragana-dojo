import { useState, useRef, useEffect, useCallback } from "react";
import { S, C, font } from "../styles";
import { NUMBERS } from "../data/numbers";
import type { JapaneseNumber } from "../data/numbers";
import { PlayButton } from "../components/PlayButton";
import { useSpeech } from "../logic/useSpeech";

type Mode = "cards" | "type";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function acceptedRomaji(n: JapaneseNumber): string[] {
  const out = [n.r.toLowerCase()];
  if (n.r === "kyuu") out.push("kyu");
  if (n.r === "juu") out.push("ju");
  if (n.alt) out.push(n.alt.toLowerCase()); // e.g. "shi", "shichi", "ku"
  return out;
}

// ── Flashcard mode ───────────────────────────────────────────────────────────

function CardMode() {
  const [deck] = useState(() => shuffle(NUMBERS));
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const { speak } = useSpeech();

  const card = deck[idx];

  function flip() {
    if (!flipped) {
      setFlipped(true);
      speak(card.h);
    }
  }

  function next() {
    setIdx(i => (i + 1) % deck.length);
    setFlipped(false);
  }

  function prev() {
    setIdx(i => (i - 1 + deck.length) % deck.length);
    setFlipped(false);
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === " " || e.key === "Enter") { e.preventDefault(); flipped ? next() : flip(); }
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flipped, card]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, width: "100%" }}>
      {/* Progress + nav */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
        <button onClick={prev} style={S.actionBtn}>←</button>
        <span style={{ fontSize: 12, color: C.inkMuted, fontFamily: font }}>{idx + 1} / {deck.length}</span>
        <button onClick={next} style={S.actionBtn}>→</button>
      </div>

      {/* Card */}
      <div
        onClick={flip}
        style={{
          backgroundColor: C.white,
          borderRadius: 24,
          border: `1.5px solid ${flipped ? C.border : C.border}`,
          width: "100%",
          minHeight: 220,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          cursor: flipped ? "default" : "pointer",
          transition: "box-shadow 0.15s",
          boxShadow: flipped ? "none" : "0 2px 12px rgba(44,36,32,0.06)",
          padding: "32px 24px",
          userSelect: "none",
        }}
      >
        {/* Front: digit */}
        <div style={{
          fontSize: 96,
          fontWeight: 700,
          fontFamily: "'DM Serif Display', serif",
          color: C.accent,
          lineHeight: 1,
        }}>
          {card.n}
        </div>

        {/* Back: Japanese info */}
        {flipped ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, animation: "fadeIn 0.2s ease" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 52, fontWeight: 500, fontFamily: "'Noto Sans JP', sans-serif" }}>
                {card.h}
              </span>
              <PlayButton text={card.h} size="sm" />
            </div>
            <span style={{ fontSize: 16, color: C.inkSoft, fontFamily: "'Outfit', sans-serif", letterSpacing: "0.04em" }}>
              {card.r}
              {card.alt && <span style={{ color: C.inkMuted, fontSize: 13 }}> · also: {card.alt}</span>}
            </span>
            <span style={{ fontSize: 13, color: C.inkMuted }}>{card.en}</span>
          </div>
        ) : (
          <span style={{ fontSize: 12, color: C.inkMuted, fontStyle: "italic" }}>tap to reveal</span>
        )}
      </div>

      {flipped && (
        <button onClick={next} style={{ ...S.fillNextBtn, animation: "fadeIn 0.2s ease" }}>
          Next → {idx + 1 < deck.length ? deck[idx + 1].n : deck[0].n}
        </button>
      )}

      <span style={{ fontSize: 11, color: C.inkMuted, fontStyle: "italic" }}>
        space / enter to flip · ← → to navigate
      </span>
    </div>
  );
}

// ── Type mode ────────────────────────────────────────────────────────────────

function TypeMode() {
  const [deck] = useState(() => shuffle(NUMBERS));
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState("");
  const [phase, setPhase] = useState<"typing" | "correct" | "wrong">("typing");
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const inputRef = useRef<HTMLInputElement>(null);

  const card = deck[idx];

  useEffect(() => {
    if (phase === "typing") inputRef.current?.focus();
  }, [phase, idx]);

  function next() {
    setIdx(i => (i + 1) % deck.length);
    setInput("");
    setPhase("typing");
  }

  function handleSubmit() {
    if (!input.trim()) return;
    if (phase === "typing") {
      const correct = acceptedRomaji(card).includes(input.trim().toLowerCase());
      setScore(s => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }));
      setPhase(correct ? "correct" : "wrong");
    } else {
      next();
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key !== "Enter") return;
    e.preventDefault();
    if (phase !== "typing") next();
    else handleSubmit();
  }

  const isWrong = phase === "wrong";
  const isCorrect = phase === "correct";

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, width: "100%" }}>
      {/* Score */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
        <span style={{ fontSize: 12, color: C.inkMuted, fontFamily: font }}>
          {idx + 1} / {deck.length}
        </span>
        {score.total > 0 && (
          <span style={{ ...S.sessionText, fontSize: 12 }}>
            {score.correct}/{score.total} — {Math.round(score.correct / score.total * 100)}%
          </span>
        )}
      </div>

      {/* Card */}
      <div style={{
        ...S.fillCard,
        ...(isCorrect ? S.fillCardCorrect : isWrong ? S.fillCardWrong : {}),
        minHeight: 180,
        justifyContent: "center",
      }}>
        <div style={{
          fontSize: 96,
          fontWeight: 700,
          fontFamily: "'DM Serif Display', serif",
          color: C.accent,
          lineHeight: 1,
        }}>
          {card.n}
        </div>

        {/* Feedback */}
        {isCorrect && (
          <div style={{ ...S.fillCorrectInfo, animation: "fadeIn 0.2s ease", flexDirection: "column", gap: 4 }}>
            <span>✅ {card.h} — {card.r}</span>
            <PlayButton text={card.h} size="sm" />
          </div>
        )}
        {isWrong && (
          <div style={{ ...S.fillWrongInfo, animation: "shakeSm 0.3s ease", flexDirection: "column", gap: 4 }}>
            <span>❌ {card.h} ({card.r}){card.alt ? ` · also ${card.alt}` : ""}</span>
            <PlayButton text={card.h} size="sm" />
          </div>
        )}
      </div>

      {/* Input */}
      <div style={S.inputRow}>
        <input
          ref={inputRef}
          value={input}
          onChange={e => { if (phase === "typing") setInput(e.target.value); }}
          onKeyDown={handleKeyDown}
          placeholder={phase !== "typing" ? "Enter → next..." : "romaji..."}
          style={{
            ...S.input,
            ...(isCorrect ? S.inputDone : {}),
            ...(isWrong ? S.inputForce : {}),
          }}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
        />
        {phase === "typing" && (
          <button
            onClick={handleSubmit}
            disabled={!input.trim()}
            style={{ ...S.submitBtn, opacity: input.trim() ? 1 : 0.4 }}
          >確認</button>
        )}
      </div>
      {phase !== "typing" && <span style={S.enterHint}>press Enter for next</span>}

      <button onClick={() => { setScore({ correct: 0, total: 0 }); setIdx(0); setInput(""); setPhase("typing"); }} style={S.actionBtn}>
        ↻ Reset
      </button>
    </div>
  );
}

// ── Root ─────────────────────────────────────────────────────────────────────

export default function NumsTab() {
  const [mode, setMode] = useState<Mode>("cards");

  return (
    <div style={S.fillWrap}>
      {/* Mode toggle */}
      <div style={{ display: "flex", gap: 6 }}>
        <button
          onClick={() => setMode("cards")}
          style={{ ...S.verbFormBtn, ...(mode === "cards" ? S.verbFormBtnOn : {}) }}
        >
          Cards
        </button>
        <button
          onClick={() => setMode("type")}
          style={{ ...S.verbFormBtn, ...(mode === "type" ? S.verbFormBtnOn : {}) }}
        >
          Type
        </button>
      </div>

      {mode === "cards" ? <CardMode /> : <TypeMode />}
    </div>
  );
}
