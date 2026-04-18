import { useState, useRef, useEffect } from "react";
import { S, C, font } from "../styles";
import { NUMBERS, DAYS, COUNTERS } from "../data/numbers";
import type { JapaneseNumber, CounterEntry } from "../data/numbers";
import { PlayButton } from "../components/PlayButton";
import { useSpeech } from "../logic/useSpeech";

type Section = "numbers" | "days" | "counters";
type Mode = "cards" | "type" | "kanji";

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
  if (n.alt) out.push(n.alt.toLowerCase());
  return out;
}

// ── Number Flashcard mode ─────────────────────────────────────────────────────

function NumberCardMode() {
  const [deck] = useState(() => shuffle(NUMBERS));
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const { speak } = useSpeech();

  const card = deck[idx];

  function flip() {
    if (!flipped) { setFlipped(true); speak(card.h); }
  }
  function next() { setIdx(i => (i + 1) % deck.length); setFlipped(false); }
  function prev() { setIdx(i => (i - 1 + deck.length) % deck.length); setFlipped(false); }

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
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
        <button onClick={prev} style={S.actionBtn}>←</button>
        <span style={{ fontSize: 12, color: C.inkMuted, fontFamily: font }}>{idx + 1} / {deck.length}</span>
        <button onClick={next} style={S.actionBtn}>→</button>
      </div>
      <div
        onClick={flip}
        style={{
          backgroundColor: C.white, borderRadius: 24, border: `1.5px solid ${C.border}`,
          width: "100%", minHeight: 220, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: 10,
          cursor: flipped ? "default" : "pointer", transition: "box-shadow 0.15s",
          boxShadow: flipped ? "none" : "0 2px 12px rgba(44,36,32,0.06)",
          padding: "32px 24px", userSelect: "none",
        }}
      >
        <div style={{ fontSize: 96, fontWeight: 700, fontFamily: "'DM Serif Display', serif", color: C.accent, lineHeight: 1 }}>
          {card.n}
        </div>
        {flipped ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, animation: "fadeIn 0.2s ease" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 52, fontWeight: 500, fontFamily: "'Noto Sans JP', sans-serif" }}>{card.h}</span>
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
      <span style={{ fontSize: 11, color: C.inkMuted, fontStyle: "italic" }}>space / enter to flip · ← → to navigate</span>
    </div>
  );
}

// ── Number Type mode ──────────────────────────────────────────────────────────

function NumberTypeMode() {
  const [deck] = useState(() => shuffle(NUMBERS));
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState("");
  const [phase, setPhase] = useState<"typing" | "correct" | "wrong">("typing");
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const inputRef = useRef<HTMLInputElement>(null);

  const card = deck[idx];

  useEffect(() => { if (phase === "typing") inputRef.current?.focus(); }, [phase, idx]);

  function next() { setIdx(i => (i + 1) % deck.length); setInput(""); setPhase("typing"); }

  function handleSubmit() {
    if (!input.trim()) return;
    if (phase === "typing") {
      const correct = acceptedRomaji(card).includes(input.trim().toLowerCase());
      setScore(s => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }));
      setPhase(correct ? "correct" : "wrong");
    } else { next(); }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key !== "Enter") return;
    e.preventDefault();
    if (phase !== "typing") next();
    else handleSubmit();
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
        <span style={{ fontSize: 12, color: C.inkMuted, fontFamily: font }}>{idx + 1} / {deck.length}</span>
        {score.total > 0 && (
          <span style={{ ...S.sessionText, fontSize: 12 }}>{score.correct}/{score.total} — {Math.round(score.correct / score.total * 100)}%</span>
        )}
      </div>
      <div style={{ ...S.fillCard, ...(phase === "correct" ? S.fillCardCorrect : phase === "wrong" ? S.fillCardWrong : {}), minHeight: 180, justifyContent: "center" }}>
        <div style={{ fontSize: 96, fontWeight: 700, fontFamily: "'DM Serif Display', serif", color: C.accent, lineHeight: 1 }}>{card.n}</div>
        {phase === "correct" && (
          <div style={{ ...S.fillCorrectInfo, animation: "fadeIn 0.2s ease", flexDirection: "column", gap: 4 }}>
            <span>✅ {card.h} — {card.r}</span>
            <PlayButton text={card.h} size="sm" />
          </div>
        )}
        {phase === "wrong" && (
          <div style={{ ...S.fillWrongInfo, animation: "shakeSm 0.3s ease", flexDirection: "column", gap: 4 }}>
            <span>❌ {card.h} ({card.r}){card.alt ? ` · also ${card.alt}` : ""}</span>
            <PlayButton text={card.h} size="sm" />
          </div>
        )}
      </div>
      <div style={S.inputRow}>
        <input
          ref={inputRef}
          value={input}
          onChange={e => { if (phase === "typing") setInput(e.target.value); }}
          onKeyDown={handleKeyDown}
          placeholder={phase !== "typing" ? "Enter → next..." : "romaji..."}
          style={{ ...S.input, ...(phase === "correct" ? S.inputDone : {}), ...(phase === "wrong" ? S.inputForce : {}) }}
          autoComplete="off" autoCapitalize="off" spellCheck={false}
        />
        {phase === "typing" && (
          <button onClick={handleSubmit} disabled={!input.trim()} style={{ ...S.submitBtn, opacity: input.trim() ? 1 : 0.4 }}>確認</button>
        )}
      </div>
      {phase !== "typing" && <span style={S.enterHint}>press Enter for next</span>}
      <button onClick={() => { setScore({ correct: 0, total: 0 }); setIdx(0); setInput(""); setPhase("typing"); }} style={S.actionBtn}>↻ Reset</button>
    </div>
  );
}

// ── Days Flashcard mode ───────────────────────────────────────────────────────

function DayCardMode() {
  const [deck] = useState(() => shuffle(DAYS));
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const { speak } = useSpeech();

  const card = deck[idx];

  function flip() { if (!flipped) { setFlipped(true); speak(card.h); } }
  function next() { setIdx(i => (i + 1) % deck.length); setFlipped(false); }
  function prev() { setIdx(i => (i - 1 + deck.length) % deck.length); setFlipped(false); }

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
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
        <button onClick={prev} style={S.actionBtn}>←</button>
        <span style={{ fontSize: 12, color: C.inkMuted, fontFamily: font }}>{idx + 1} / {deck.length}</span>
        <button onClick={next} style={S.actionBtn}>→</button>
      </div>
      <div
        onClick={flip}
        style={{
          backgroundColor: C.white, borderRadius: 24, border: `1.5px solid ${C.border}`,
          width: "100%", minHeight: 220, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: 10,
          cursor: flipped ? "default" : "pointer", transition: "box-shadow 0.15s",
          boxShadow: flipped ? "none" : "0 2px 12px rgba(44,36,32,0.06)",
          padding: "32px 24px", userSelect: "none",
        }}
      >
        <div style={{ fontSize: 48, fontWeight: 700, fontFamily: "'Noto Sans JP', sans-serif", color: C.accent, lineHeight: 1.2 }}>
          {card.kanji}
        </div>
        {flipped ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, animation: "fadeIn 0.2s ease" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 36, fontWeight: 500, fontFamily: "'Noto Sans JP', sans-serif" }}>{card.h}</span>
              <PlayButton text={card.h} size="sm" />
            </div>
            <span style={{ fontSize: 16, color: C.inkSoft, fontFamily: "'Outfit', sans-serif", letterSpacing: "0.04em" }}>{card.r}</span>
            <span style={{ fontSize: 13, color: C.inkMuted }}>{card.en}</span>
          </div>
        ) : (
          <span style={{ fontSize: 12, color: C.inkMuted, fontStyle: "italic" }}>tap to reveal</span>
        )}
      </div>
      {flipped && (
        <button onClick={next} style={{ ...S.fillNextBtn, animation: "fadeIn 0.2s ease" }}>
          Next →
        </button>
      )}
      <span style={{ fontSize: 11, color: C.inkMuted, fontStyle: "italic" }}>space / enter to flip · ← → to navigate</span>
    </div>
  );
}

// ── Days Type mode ────────────────────────────────────────────────────────────

function DayTypeMode() {
  const [deck] = useState(() => shuffle(DAYS));
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState("");
  const [phase, setPhase] = useState<"typing" | "correct" | "wrong">("typing");
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const inputRef = useRef<HTMLInputElement>(null);

  const card = deck[idx];

  useEffect(() => { if (phase === "typing") inputRef.current?.focus(); }, [phase, idx]);

  function next() { setIdx(i => (i + 1) % deck.length); setInput(""); setPhase("typing"); }

  function handleSubmit() {
    if (!input.trim()) return;
    if (phase === "typing") {
      const correct = input.trim().toLowerCase() === card.r.toLowerCase();
      setScore(s => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }));
      setPhase(correct ? "correct" : "wrong");
    } else { next(); }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key !== "Enter") return;
    e.preventDefault();
    if (phase !== "typing") next();
    else handleSubmit();
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
        <span style={{ fontSize: 12, color: C.inkMuted, fontFamily: font }}>{idx + 1} / {deck.length}</span>
        {score.total > 0 && (
          <span style={{ ...S.sessionText, fontSize: 12 }}>{score.correct}/{score.total} — {Math.round(score.correct / score.total * 100)}%</span>
        )}
      </div>
      <div style={{ ...S.fillCard, ...(phase === "correct" ? S.fillCardCorrect : phase === "wrong" ? S.fillCardWrong : {}), minHeight: 180, justifyContent: "center", gap: 8 }}>
        <div style={{ fontSize: 18, color: C.inkMuted, fontFamily: font }}>how do you read</div>
        <div style={{ fontSize: 48, fontWeight: 700, fontFamily: "'Noto Sans JP', sans-serif", color: C.accent }}>{card.kanji}</div>
        <div style={{ fontSize: 14, color: C.inkSoft }}>{card.en}</div>
        {phase === "correct" && (
          <div style={{ ...S.fillCorrectInfo, animation: "fadeIn 0.2s ease", flexDirection: "column", gap: 4 }}>
            <span>✅ {card.h} — {card.r}</span>
            <PlayButton text={card.h} size="sm" />
          </div>
        )}
        {phase === "wrong" && (
          <div style={{ ...S.fillWrongInfo, animation: "shakeSm 0.3s ease", flexDirection: "column", gap: 4 }}>
            <span>❌ {card.h} ({card.r})</span>
            <PlayButton text={card.h} size="sm" />
          </div>
        )}
      </div>
      <div style={S.inputRow}>
        <input
          ref={inputRef}
          value={input}
          onChange={e => { if (phase === "typing") setInput(e.target.value); }}
          onKeyDown={handleKeyDown}
          placeholder={phase !== "typing" ? "Enter → next..." : "romaji..."}
          style={{ ...S.input, ...(phase === "correct" ? S.inputDone : {}), ...(phase === "wrong" ? S.inputForce : {}) }}
          autoComplete="off" autoCapitalize="off" spellCheck={false}
        />
        {phase === "typing" && (
          <button onClick={handleSubmit} disabled={!input.trim()} style={{ ...S.submitBtn, opacity: input.trim() ? 1 : 0.4 }}>確認</button>
        )}
      </div>
      {phase !== "typing" && <span style={S.enterHint}>press Enter for next</span>}
      <button onClick={() => { setScore({ correct: 0, total: 0 }); setIdx(0); setInput(""); setPhase("typing"); }} style={S.actionBtn}>↻ Reset</button>
    </div>
  );
}

// ── Day Kanji reading drill ───────────────────────────────────────────────────

function DayKanjiMode() {
  const [deck] = useState(() => shuffle(DAYS));
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [input, setInput] = useState("");
  const [phase, setPhase] = useState<"idle" | "correct" | "wrong">("idle");
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const inputRef = useRef<HTMLInputElement>(null);
  const { speak } = useSpeech();

  const card = deck[idx];

  useEffect(() => { if (!flipped) inputRef.current?.focus(); }, [flipped, idx]);

  function next() { setIdx(i => (i + 1) % deck.length); setInput(""); setPhase("idle"); setFlipped(false); }

  function handleSubmit() {
    if (!input.trim() || flipped) return;
    const correct = input.trim().toLowerCase() === card.r.toLowerCase();
    setScore(s => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }));
    setPhase(correct ? "correct" : "wrong");
    setFlipped(true);
    if (correct) speak(card.h);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key !== "Enter") return;
    e.preventDefault();
    if (flipped) next();
    else handleSubmit();
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
        <span style={{ fontSize: 12, color: C.inkMuted, fontFamily: font }}>{idx + 1} / {deck.length}</span>
        {score.total > 0 && (
          <span style={{ ...S.sessionText, fontSize: 12 }}>{score.correct}/{score.total} — {Math.round(score.correct / score.total * 100)}%</span>
        )}
      </div>
      <div style={{
        ...S.fillCard,
        ...(phase === "correct" ? S.fillCardCorrect : phase === "wrong" ? S.fillCardWrong : {}),
        minHeight: 200, justifyContent: "center", gap: 12,
      }}>
        <div style={{ fontSize: 52, fontWeight: 700, fontFamily: "'Noto Sans JP', sans-serif", color: C.accent, lineHeight: 1.2 }}>
          {card.kanji}
        </div>
        {flipped && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, animation: "fadeIn 0.2s ease" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 28, fontFamily: "'Noto Sans JP', sans-serif" }}>{card.h}</span>
              <PlayButton text={card.h} size="sm" />
            </div>
            <span style={{ fontSize: 14, color: C.inkSoft }}>{card.r}</span>
            <span style={{ fontSize: 13, color: C.inkMuted }}>{card.en}</span>
            {phase === "correct" && <span style={{ ...S.fillCorrectInfo, marginTop: 4 }}>✅ correct</span>}
            {phase === "wrong"   && <span style={{ ...S.fillWrongInfo,   marginTop: 4 }}>❌ your answer: {input}</span>}
          </div>
        )}
      </div>
      <div style={S.inputRow}>
        <input
          ref={inputRef}
          value={input}
          onChange={e => { if (!flipped) setInput(e.target.value); }}
          onKeyDown={handleKeyDown}
          placeholder={flipped ? "Enter → next..." : "type the romaji reading..."}
          style={{ ...S.input, ...(phase === "correct" ? S.inputDone : {}), ...(phase === "wrong" ? S.inputForce : {}) }}
          autoComplete="off" autoCapitalize="off" spellCheck={false}
        />
        {!flipped && (
          <button onClick={handleSubmit} disabled={!input.trim()} style={{ ...S.submitBtn, opacity: input.trim() ? 1 : 0.4 }}>確認</button>
        )}
      </div>
      {flipped && <span style={S.enterHint}>press Enter for next</span>}
      <button onClick={() => { setScore({ correct: 0, total: 0 }); setIdx(0); setInput(""); setPhase("idle"); setFlipped(false); }} style={S.actionBtn}>↻ Reset</button>
    </div>
  );
}

// ── Counters Flashcard mode ───────────────────────────────────────────────────

type CounterFace = { n: number; kind: "people" | "object"; entry: CounterEntry };

function buildCounterDeck(): CounterFace[] {
  const faces: CounterFace[] = COUNTERS.flatMap(e => [
    { n: e.n, kind: "people" as const, entry: e },
    { n: e.n, kind: "object" as const, entry: e },
  ]);
  return shuffle(faces);
}

function CounterCardMode() {
  const [deck] = useState(() => buildCounterDeck());
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const { speak } = useSpeech();

  const face = deck[idx];
  const isPeople = face.kind === "people";
  const h = isPeople ? face.entry.people : face.entry.object;
  const r = isPeople ? face.entry.peopleR : face.entry.objectR;

  function flip() { if (!flipped) { setFlipped(true); speak(h); } }
  function next() { setIdx(i => (i + 1) % deck.length); setFlipped(false); }
  function prev() { setIdx(i => (i - 1 + deck.length) % deck.length); setFlipped(false); }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === " " || e.key === "Enter") { e.preventDefault(); flipped ? next() : flip(); }
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flipped, face]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, width: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
        <button onClick={prev} style={S.actionBtn}>←</button>
        <span style={{ fontSize: 12, color: C.inkMuted, fontFamily: font }}>{idx + 1} / {deck.length}</span>
        <button onClick={next} style={S.actionBtn}>→</button>
      </div>
      <div
        onClick={flip}
        style={{
          backgroundColor: C.white, borderRadius: 24, border: `1.5px solid ${C.border}`,
          width: "100%", minHeight: 220, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: 10,
          cursor: flipped ? "default" : "pointer", transition: "box-shadow 0.15s",
          boxShadow: flipped ? "none" : "0 2px 12px rgba(44,36,32,0.06)",
          padding: "32px 24px", userSelect: "none",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <span style={{ fontSize: 80, fontWeight: 700, fontFamily: "'DM Serif Display', serif", color: C.accent, lineHeight: 1 }}>{face.n}</span>
          <span style={{
            fontSize: 13, fontFamily: font, fontWeight: 600, padding: "3px 8px", borderRadius: 8,
            backgroundColor: isPeople ? "rgba(74,124,89,0.1)" : "rgba(200,75,49,0.08)",
            color: isPeople ? C.success : C.accent,
          }}>
            {isPeople ? "people" : "things"}
          </span>
        </div>
        {flipped ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, animation: "fadeIn 0.2s ease" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 44, fontWeight: 500, fontFamily: "'Noto Sans JP', sans-serif" }}>{h}</span>
              <PlayButton text={h} size="sm" />
            </div>
            <span style={{ fontSize: 16, color: C.inkSoft, fontFamily: "'Outfit', sans-serif" }}>{r}</span>
            {face.entry.note && <span style={{ fontSize: 12, color: C.inkMuted }}>⚠ {face.entry.note}</span>}
          </div>
        ) : (
          <span style={{ fontSize: 12, color: C.inkMuted, fontStyle: "italic" }}>tap to reveal</span>
        )}
      </div>
      {flipped && (
        <button onClick={next} style={{ ...S.fillNextBtn, animation: "fadeIn 0.2s ease" }}>Next →</button>
      )}
      <span style={{ fontSize: 11, color: C.inkMuted, fontStyle: "italic" }}>space / enter to flip · ← → to navigate</span>
    </div>
  );
}

// ── Counters Quiz mode (multiple choice) ─────────────────────────────────────

type CounterQuizItem = {
  prompt: string;
  answer: string;
  options: string[];
  romaji: string;
};

function buildCounterQuiz(): CounterQuizItem[] {
  return shuffle(
    COUNTERS.flatMap(entry => [
      {
        prompt: `${entry.n} people`,
        answer: entry.people,
        options: shuffle([
          entry.people,
          entry.object,
          // two distractors from adjacent entries
          ...[COUNTERS[(entry.n) % 10], COUNTERS[(entry.n + 1) % 10]]
            .map(e => entry.n % 2 === 0 ? e.people : e.object),
        ]).slice(0, 4),
        romaji: entry.peopleR,
      },
      {
        prompt: `${entry.n} thing${entry.n > 1 ? "s" : ""}`,
        answer: entry.object,
        options: shuffle([
          entry.object,
          entry.people,
          ...[COUNTERS[(entry.n) % 10], COUNTERS[(entry.n + 1) % 10]]
            .map(e => entry.n % 2 === 0 ? e.object : e.people),
        ]).slice(0, 4),
        romaji: entry.objectR,
      },
    ])
  );
}

function CounterQuizMode() {
  const [deck] = useState(() => buildCounterQuiz());
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [phase, setPhase] = useState<"pick" | "correct" | "wrong">("pick");
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const { speak } = useSpeech();

  const item = deck[idx];

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Enter" && phase !== "pick") { e.preventDefault(); advance(); return; }
      if (phase === "pick" && ["1","2","3","4"].includes(e.key)) {
        const opt = item.options[parseInt(e.key) - 1];
        if (opt) pick(opt);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, item]);

  function pick(opt: string) {
    if (phase !== "pick") return;
    setSelected(opt);
    const correct = opt === item.answer;
    setScore(s => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }));
    setPhase(correct ? "correct" : "wrong");
    if (correct) speak(item.answer);
  }

  function advance() { setIdx(i => (i + 1) % deck.length); setSelected(null); setPhase("pick"); }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
        <span style={{ fontSize: 12, color: C.inkMuted, fontFamily: font }}>{idx + 1} / {deck.length}</span>
        {score.total > 0 && (
          <span style={{ ...S.sessionText, fontSize: 12 }}>{score.correct}/{score.total} — {Math.round(score.correct / score.total * 100)}%</span>
        )}
      </div>

      <div style={{
        ...S.fillCard,
        ...(phase === "correct" ? S.fillCardCorrect : phase === "wrong" ? S.fillCardWrong : {}),
        minHeight: 140, justifyContent: "center", gap: 8,
      }}>
        <div style={{ fontSize: 16, color: C.inkMuted, fontFamily: font }}>how do you count</div>
        <div style={{ fontSize: 42, fontWeight: 700, fontFamily: "'DM Serif Display', serif", color: C.accent }}>{item.prompt}</div>
        {phase === "correct" && (
          <div style={{ ...S.fillCorrectInfo, animation: "fadeIn 0.2s ease" }}>
            <span>✅ {item.answer} — {item.romaji}</span>
          </div>
        )}
        {phase === "wrong" && (
          <div style={{ ...S.fillWrongInfo, animation: "shakeSm 0.3s ease" }}>
            <span>❌ {item.answer} ({item.romaji})</span>
          </div>
        )}
      </div>

      <div style={S.fillOptions}>
        {item.options.map((opt, i) => {
          const isSelected = selected === opt;
          const isAnswer = opt === item.answer;
          const showResult = phase !== "pick";
          return (
            <button
              key={i}
              onClick={() => pick(opt)}
              disabled={phase !== "pick"}
              style={{
                ...S.fillOption,
                ...(showResult && isAnswer ? S.fillOptionCorrect : {}),
                ...(showResult && isSelected && !isAnswer ? S.fillOptionWrong : {}),
                ...(showResult ? { opacity: isAnswer || isSelected ? 1 : 0.4 } : {}),
              }}
            >
              <span style={S.fillOptionNum}>{i + 1}</span>
              <span style={S.fillOptionText}>{opt}</span>
            </button>
          );
        })}
      </div>

      {phase !== "pick" && (
        <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "center" }}>
          <button onClick={advance} style={S.fillNextBtn}>
            {idx < deck.length - 1 ? "Next → つぎ" : "↻ Again"}
          </button>
          <span style={S.fillEnterHint}>or Enter</span>
        </div>
      )}
    </div>
  );
}

// ── Kanji reading drill (numbers) ────────────────────────────────────────────

function KanjiMode() {
  const [deck] = useState(() => shuffle(NUMBERS));
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [input, setInput] = useState("");
  const [phase, setPhase] = useState<"idle" | "correct" | "wrong">("idle");
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const inputRef = useRef<HTMLInputElement>(null);
  const { speak } = useSpeech();

  const card = deck[idx];

  useEffect(() => { if (!flipped) inputRef.current?.focus(); }, [flipped, idx]);

  function next() { setIdx(i => (i + 1) % deck.length); setInput(""); setPhase("idle"); setFlipped(false); }

  function handleSubmit() {
    if (!input.trim() || flipped) return;
    const correct = acceptedRomaji(card).includes(input.trim().toLowerCase());
    setScore(s => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }));
    setPhase(correct ? "correct" : "wrong");
    setFlipped(true);
    if (correct) speak(card.h);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key !== "Enter") return;
    e.preventDefault();
    if (flipped) next();
    else handleSubmit();
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
        <span style={{ fontSize: 12, color: C.inkMuted, fontFamily: font }}>{idx + 1} / {deck.length}</span>
        {score.total > 0 && (
          <span style={{ ...S.sessionText, fontSize: 12 }}>{score.correct}/{score.total} — {Math.round(score.correct / score.total * 100)}%</span>
        )}
      </div>

      <div style={{
        ...S.fillCard,
        ...(phase === "correct" ? S.fillCardCorrect : phase === "wrong" ? S.fillCardWrong : {}),
        minHeight: 220, justifyContent: "center", gap: 12,
      }}>
        {/* Kanji prompt */}
        <div style={{ fontSize: 100, fontWeight: 700, fontFamily: "'Noto Sans JP', sans-serif", color: C.accent, lineHeight: 1 }}>
          {card.kanji}
        </div>

        {/* Revealed info */}
        {flipped && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, animation: "fadeIn 0.2s ease" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 32, fontFamily: "'Noto Sans JP', sans-serif" }}>{card.h}</span>
              <PlayButton text={card.h} size="sm" />
            </div>
            <span style={{ fontSize: 15, color: C.inkSoft }}>{card.r}{card.alt ? ` · also ${card.alt}` : ""}</span>
            <span style={{ fontSize: 13, color: C.inkMuted }}>{card.n} — {card.en}</span>
            {phase === "correct" && <span style={{ ...S.fillCorrectInfo, marginTop: 4 }}>✅ correct</span>}
            {phase === "wrong"   && <span style={{ ...S.fillWrongInfo,   marginTop: 4 }}>❌ your answer: {input}</span>}
          </div>
        )}
      </div>

      <div style={S.inputRow}>
        <input
          ref={inputRef}
          value={input}
          onChange={e => { if (!flipped) setInput(e.target.value); }}
          onKeyDown={handleKeyDown}
          placeholder={flipped ? "Enter → next..." : "type the romaji reading..."}
          style={{ ...S.input, ...(phase === "correct" ? S.inputDone : {}), ...(phase === "wrong" ? S.inputForce : {}) }}
          autoComplete="off" autoCapitalize="off" spellCheck={false}
        />
        {!flipped && (
          <button onClick={handleSubmit} disabled={!input.trim()} style={{ ...S.submitBtn, opacity: input.trim() ? 1 : 0.4 }}>確認</button>
        )}
      </div>
      {flipped && <span style={S.enterHint}>press Enter for next</span>}
      <button onClick={() => { setScore({ correct: 0, total: 0 }); setIdx(0); setInput(""); setPhase("idle"); setFlipped(false); }} style={S.actionBtn}>↻ Reset</button>
    </div>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────────

export default function NumsTab() {
  const [section, setSection] = useState<Section>("numbers");
  const [mode, setMode] = useState<Mode>("cards");

  function setSection_(s: Section) { setSection(s); setMode("cards"); }

  const sectionLabel: Record<Section, string> = {
    numbers: "Numbers",
    days: "Days",
    counters: "Counters",
  };

  return (
    <div style={S.fillWrap}>
      {/* Section selector */}
      <div style={{ display: "flex", gap: 6 }}>
        {(["numbers", "days", "counters"] as Section[]).map(s => (
          <button
            key={s}
            onClick={() => setSection_(s)}
            style={{ ...S.verbFormBtn, ...(section === s ? S.verbFormBtnOn : {}) }}
          >
            {sectionLabel[s]}
          </button>
        ))}
      </div>

      {/* Mode selector */}
      <div style={{ display: "flex", gap: 6 }}>
        <button onClick={() => setMode("cards")} style={{ ...S.verbFormBtn, ...(mode === "cards" ? S.verbFormBtnOn : {}), fontSize: 11 }}>
          Cards
        </button>
        <button onClick={() => setMode("type")} style={{ ...S.verbFormBtn, ...(mode === "type" ? S.verbFormBtnOn : {}), fontSize: 11 }}>
          {section === "counters" ? "Quiz" : "Type"}
        </button>
        {section === "numbers" && (
          <button onClick={() => setMode("kanji")} style={{ ...S.verbFormBtn, ...(mode === "kanji" ? S.verbFormBtnOn : {}), fontSize: 11 }}>
            漢字
          </button>
        )}
        {section === "days" && (
          <button onClick={() => setMode("kanji")} style={{ ...S.verbFormBtn, ...(mode === "kanji" ? S.verbFormBtnOn : {}), fontSize: 11 }}>
            漢字
          </button>
        )}
      </div>

      {section === "numbers"  && mode === "cards" && <NumberCardMode key="nc" />}
      {section === "numbers"  && mode === "type"  && <NumberTypeMode key="nt" />}
      {section === "numbers"  && mode === "kanji" && <KanjiMode      key="nk" />}
      {section === "days"     && mode === "cards" && <DayCardMode    key="dc" />}
      {section === "days"     && mode === "type"  && <DayTypeMode    key="dt" />}
      {section === "days"     && mode === "kanji" && <DayKanjiMode   key="dk" />}
      {section === "counters" && mode === "cards" && <CounterCardMode key="cc" />}
      {section === "counters" && mode === "type"  && <CounterQuizMode key="cq" />}
    </div>
  );
}
