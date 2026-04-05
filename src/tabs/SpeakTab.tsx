import { useState, useRef, useEffect } from "react";
import { S, C } from "../styles";
import { SPEAK_CATEGORIES } from "../data/speak";
import type { SpeakItem, SpeakCategory } from "../data/speak";
import { toRomaji } from "../logic/romaji";
import { normalizeTranscript } from "../logic/normalizeJapanese";
import { PlayButton } from "../components/PlayButton";
import { useSpeechRecognition } from "../logic/useSpeechRecognition";
import type { CSSProperties } from "react";

// ── helpers ──────────────────────────────────────────────────────────────────

function normalize(s: string) {
  return s.replace(/\s+/g, "").toLowerCase();
}

function levenshtein(a: string, b: string): number {
  const m = a.length, n = b.length;
  const dp: number[] = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) {
    let prev = dp[0];
    dp[0] = i;
    for (let j = 1; j <= n; j++) {
      const tmp = dp[j];
      dp[j] = a[i - 1] === b[j - 1] ? prev : 1 + Math.min(prev, dp[j], dp[j - 1]);
      prev = tmp;
    }
  }
  return dp[n];
}

function similarity(a: string, b: string): number {
  if (!a.length && !b.length) return 1;
  return 1 - levenshtein(a, b) / Math.max(a.length, b.length);
}

const MATCH_THRESHOLD = 0.85;

function matchesVoice(target: string, alts: string[]): boolean {
  const t = normalize(target);
  return alts.some(a => {
    if (normalize(a) === t) return true;
    const n = normalizeTranscript(a);
    return n === t || n.includes(t) || similarity(n, t) >= MATCH_THRESHOLD;
  });
}

function matchesTyped(target: string, input: string): boolean {
  const expected = normalize(toRomaji(target));
  const given = normalize(input);
  return given === expected;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ── component ─────────────────────────────────────────────────────────────────

type Phase = "idle" | "correct" | "wrong";

export default function SpeakTab() {
  const [category, setCategory] = useState<SpeakCategory | null>(null);
  const [items, setItems] = useState<SpeakItem[]>([]);
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");
  const [input, setInput] = useState("");
  const [heardText, setHeardText] = useState<string | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [hintVisible, setHintVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { listening, interimText, supported: micSupported, start: startMic, stop: stopMic, onResult } = useSpeechRecognition();

  const item = items[index] ?? null;

  // Stop mic when phase leaves idle
  useEffect(() => {
    if (phase !== "idle") stopMic();
  }, [phase, stopMic]);

  // Focus input when advancing
  useEffect(() => {
    if (phase === "idle") setTimeout(() => inputRef.current?.focus(), 50);
  }, [index, phase]);

  // Register voice result handler
  onResult(({ alts }) => {
    if (!item || phase !== "idle") return;
    if (matchesVoice(item.text, alts)) {
      setScore(s => ({ correct: s.correct + 1, total: s.total + 1 }));
      setPhase("correct");
    } else {
      // Keep mic alive — just show what was heard, no penalty
      setHeardText(alts[0] ?? "?");
    }
  });

  function startCategory(cat: SpeakCategory) {
    setCategory(cat);
    setItems(shuffle(cat.items).slice(0, Math.min(20, cat.items.length)));
    setIndex(0);
    setPhase("idle");
    setInput("");
    setHeardText(null);
    setScore({ correct: 0, total: 0 });
    setHintVisible(false);
  }

  function next() {
    stopMic();
    if (index + 1 >= items.length) {
      // Done — show summary by resetting to category screen with score stored
      setPhase("idle");
      setIndex(items.length); // sentinel: all done
      return;
    }
    setIndex(i => i + 1);
    setPhase("idle");
    setInput("");
    setHeardText(null);
    setHintVisible(false);
  }

  function handleTypeSubmit() {
    if (!input.trim() || phase !== "idle" || !item) return;
    if (matchesTyped(item.text, input.trim())) {
      setScore(s => ({ correct: s.correct + 1, total: s.total + 1 }));
      setPhase("correct");
    } else {
      setScore(s => ({ ...s, total: s.total + 1 }));
      setPhase("wrong");
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key !== "Enter") return;
    e.preventDefault();
    if (phase !== "idle") next();
    else handleTypeSubmit();
  }

  function handleMicToggle() {
    if (phase !== "idle") return;
    if (listening) {
      stopMic();
    } else {
      setHeardText(null);
      startMic();
    }
  }

  // ── category picker ──────────────────────────────────────────────────────

  if (!category) {
    return (
      <div style={S.speakWrap}>
        <div style={S.speakHeader}>
          <span style={S.speakTitle}>🎤 Speak</span>
          <span style={S.speakSub}>Say it aloud — or type the romaji. Choose a category:</span>
        </div>
        <div style={S.speakCatGrid}>
          {SPEAK_CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => startCategory(cat)} style={S.speakCatBtn}>
              <span style={S.speakCatEmoji}>{cat.emoji}</span>
              <span style={S.speakCatLabel}>{cat.label}</span>
              <span style={S.speakCatDesc}>{cat.desc}</span>
              <span style={S.speakCatCount}>{cat.items.length} items · 20 per round</span>
            </button>
          ))}
        </div>
        {!micSupported && (
          <div style={S.speakNoMic}>
            Microphone not supported in this browser — text input will still work.
          </div>
        )}
      </div>
    );
  }

  // ── all done screen ──────────────────────────────────────────────────────

  if (index >= items.length) {
    const pct = Math.round(score.correct / score.total * 100);
    return (
      <div style={S.speakWrap}>
        <div style={{ ...S.card, width: "100%", gap: 20 }}>
          <span style={{ fontSize: 48 }}>🎉</span>
          <div style={{ fontSize: 28, fontWeight: 700 }}>{score.correct}/{score.total}</div>
          <div style={{ fontSize: 15, color: pct >= 80 ? C.success : pct >= 50 ? C.warn : C.accent }}>
            {pct >= 80 ? "Great work!" : pct >= 50 ? "Keep practicing!" : "Keep going!"}
          </div>
          <div style={S.actionsRow}>
            <button onClick={() => startCategory(category)} style={S.fillStartBtn}>↻ Try again</button>
            <button onClick={() => setCategory(null)} style={S.actionBtn}>← Categories</button>
          </div>
        </div>
      </div>
    );
  }

  // ── drill screen ─────────────────────────────────────────────────────────

  const progress = index / items.length;

  return (
    <div style={S.speakWrap}>
      {/* Header row */}
      <div style={S.speakDrillHeader}>
        <button onClick={() => { stopMic(); setCategory(null); }} style={S.actionBtn}>← {category.label}</button>
        <span style={S.speakProgress}>{index + 1} / {items.length}</span>
        {score.total > 0 && (
          <span style={S.sessionText}>{score.correct}/{score.total}</span>
        )}
      </div>

      {/* Progress bar */}
      <div style={{ ...S.fillProgress, width: "100%" }}>
        <div style={{ ...S.fillProgressFill, width: `${progress * 100}%` }} />
      </div>

      {/* Card */}
      <div style={{
        ...S.card,
        width: "100%",
        ...(phase === "correct" ? S.cardCorrect : phase === "wrong" ? S.cardWrong : {}),
      }}>
        {/* Main hiragana */}
        <div style={S.speakItemText}>{item.text}</div>

        {/* Hint — hidden by default */}
        {hintVisible
          ? <div style={S.speakItemHint}>{item.hint}</div>
          : <button onClick={() => setHintVisible(true)} style={S.speakHintBtn}>show hint</button>
        }

        {/* TTS button */}
        <PlayButton text={item.text} />

        {/* Result banners */}
        {phase === "correct" && (
          <div style={S.correctBanner}>
            <span style={{ fontSize: 20 }}>✅</span>
            <span style={{ ...S.correctText, fontSize: 16 }}>{toRomaji(item.text)}</span>
          </div>
        )}
        {phase === "wrong" && (
          <div style={S.wrongSection}>
            <div style={S.wrongBanner}>
              <span style={{ fontSize: 20 }}>❌</span>
              <span>Expected romaji:</span>
            </div>
            <div style={{ ...S.wrongAnswer, fontSize: 24 }}>{toRomaji(item.text)}</div>
          </div>
        )}

        {/* Mic */}
        {micSupported && (
          <div style={S.speakMicRow}>
            <MicButton listening={listening} disabled={phase !== "idle"} onToggle={handleMicToggle} />
            {listening && !interimText && <span style={S.speakListening}>Listening…</span>}
            {interimText && <span style={S.speakInterim}>{interimText}</span>}
            {!listening && heardText && phase === "idle" && (
              <span style={S.speakHeard}>Heard: {heardText} — try again</span>
            )}
            {!listening && !heardText && phase === "idle" && (
              <span style={S.speakMicHint}>tap & speak</span>
            )}
          </div>
        )}

        {/* Or divider */}
        <div style={S.speakOrRow}>
          <div style={S.speakOrLine} />
          <span style={S.speakOrText}>or type romaji</span>
          <div style={S.speakOrLine} />
        </div>

        {/* Text input */}
        <div style={S.inputRow}>
          <input
            ref={inputRef}
            value={input}
            onChange={e => { if (phase === "idle") setInput(e.target.value); }}
            onKeyDown={handleKeyDown}
            placeholder={phase !== "idle" ? "Enter → next…" : "romaji…"}
            style={{
              ...S.input,
              ...(phase === "correct" ? S.inputDone : {}),
              ...(phase === "wrong" ? S.inputForce : {}),
            }}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
          />
          {phase === "idle" ? (
            <button
              onClick={handleTypeSubmit}
              disabled={!input.trim()}
              style={{ ...S.submitBtn, opacity: input.trim() ? 1 : 0.4 }}
            >確認</button>
          ) : (
            <button onClick={next} style={S.submitBtn}>→</button>
          )}
        </div>
        {phase !== "idle" && <div style={S.enterHint}>press Enter for next</div>}
      </div>
    </div>
  );
}

// ── mic button ────────────────────────────────────────────────────────────────

function MicButton({ listening, disabled, onToggle }: { listening: boolean; disabled: boolean; onToggle: () => void }) {
  const style: CSSProperties = {
    width: 72,
    height: 72,
    borderRadius: "50%",
    border: `2px solid ${listening ? C.accent : C.border}`,
    backgroundColor: listening ? "rgba(200,75,49,0.08)" : C.white,
    color: listening ? C.accent : C.inkSoft,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: disabled ? "default" : "pointer",
    opacity: disabled ? 0.4 : 1,
    transition: "all 0.2s ease",
    animation: listening ? "micPulse 1.2s ease-in-out infinite" : "none",
    pointerEvents: disabled ? "none" : "auto",
    padding: 0,
  };
  return (
    <button onClick={onToggle} style={style} title={listening ? "Stop" : "Speak"}>
      <MicIcon size={26} active={listening} />
    </button>
  );
}

function MicIcon({ size, active }: { size: number; active: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="2" width="6" height="11" rx="3" />
      <path d="M5 10a7 7 0 0 0 14 0" />
      <line x1="12" y1="19" x2="12" y2="22" />
      <line x1="8" y1="22" x2="16" y2="22" />
      {active && <circle cx="12" cy="7.5" r="1" fill="currentColor" />}
    </svg>
  );
}
