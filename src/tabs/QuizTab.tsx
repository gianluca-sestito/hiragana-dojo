import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { S, weakDot } from "../styles";
import { isCorrectRomaji } from "../logic/romaji";
import { pickNextChar } from "../logic/quiz";
import { ALL_HIRAGANA } from "../data/hiragana";
import type { AppData } from "../logic/storage";
import { PlayButton } from "../components/PlayButton";

interface Props {
  data: AppData;
  update: (updates: Partial<AppData>) => void;
}

export default function QuizTab({ data, update }: Props) {
  const [quizChar, setQuizChar] = useState(() => pickNextChar(data.stats, [], false));
  const [input, setInput] = useState("");
  const [phase, setPhase] = useState<"answer" | "wrong" | "correct">("answer");
  const [sessionScore, setSessionScore] = useState({ correct: 0, total: 0 });
  const [weakOnly, setWeakOnly] = useState(false);
  const [streak, setStreak] = useState(() => data.currentStreak ?? 0);
  const [streakPop, setStreakPop] = useState(false);

  const [retryCount, setRetryCount] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const recentRef = useRef<string[]>([]);
  const retryQueueRef = useRef<Array<{ char: typeof quizChar; due: number }>>([]);
  const totalRef = useRef(0);

  const weakCount = useMemo(
    () => ALL_HIRAGANA.filter(c => {
      const s = data.stats[c.h];
      return s && s.total >= 2 && s.correct / s.total < 0.7;
    }).length,
    [data.stats],
  );

  useEffect(() => {
    if (phase === "answer") inputRef.current?.focus();
  }, [phase, quizChar]);

  useEffect(() => {
    if (!streakPop) return;
    const id = setTimeout(() => setStreakPop(false), 400);
    return () => clearTimeout(id);
  }, [streakPop]);

  const nextChar = useCallback(() => {
    const queue = retryQueueRef.current;
    let next;
    if (queue.length > 0 && queue[0].due <= totalRef.current + 1) {
      next = queue.shift()!.char;
    } else {
      next = pickNextChar(data.stats, recentRef.current, weakOnly);
    }
    recentRef.current = [...recentRef.current, next.h].slice(-5);
    setRetryCount(retryQueueRef.current.length);
    setQuizChar(next);
    setInput("");
    setPhase("answer");
  }, [data.stats, weakOnly]);

  function handleSubmit() {
    if (!input.trim()) return;

    if (phase === "answer") {
      const correct = isCorrectRomaji(quizChar, input);
      const stats = { ...data.stats };
      if (!stats[quizChar.h]) stats[quizChar.h] = { correct: 0, total: 0 };
      stats[quizChar.h].total += 1;
      if (correct) stats[quizChar.h].correct += 1;
      setSessionScore(s => {
        const newTotal = s.total + 1;
        totalRef.current = newTotal;
        return { correct: s.correct + (correct ? 1 : 0), total: newTotal };
      });

      if (correct) {
        const newStreak = streak + 1;
        setStreak(newStreak);
        setStreakPop(true);
        const best = Math.max(newStreak, data.bestStreak ?? 0);
        update({ stats, totalAnswered: data.totalAnswered + 1, totalCorrect: data.totalCorrect + 1, bestStreak: best, currentStreak: newStreak });
        setPhase("correct");
      } else {
        setStreak(0);
        update({ stats, totalAnswered: data.totalAnswered + 1, currentStreak: 0 });
        const delay = 2 + Math.floor(Math.random() * 2);
        retryQueueRef.current.push({ char: quizChar, due: totalRef.current + delay });
        setRetryCount(retryQueueRef.current.length);
        setPhase("wrong");
        setInput("");
      }
    } else if (phase === "wrong") {
      if (isCorrectRomaji(quizChar, input)) {
        nextChar();
      } else {
        setInput("");
      }
    } else if (phase === "correct") {
      nextChar();
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key !== "Enter") return;
    e.preventDefault();
    if (phase === "correct") nextChar();
    else handleSubmit();
  }

  function resetSession() {
    setSessionScore({ correct: 0, total: 0 });
    totalRef.current = 0;
    setStreak(0);
    update({ currentStreak: 0 });
    recentRef.current = [];
    retryQueueRef.current = [];
    setRetryCount(0);
    nextChar();
  }

  function resetAllStats() {
    update({ stats: {}, totalAnswered: 0, totalCorrect: 0, bestStreak: 0, currentStreak: 0 });
    setStreak(0);
    resetSession();
  }

  const streakStyle = streak >= 20 ? S.streakLegendary
    : streak >= 10 ? S.streakFire
    : streak >= 5 ? S.streakHot
    : S.streakWarm;

  return (
    <div style={S.quizWrap}>
      <div style={S.toggleRow}>
        <button
          onClick={() => setWeakOnly(v => !v)}
          style={{ ...S.weakToggle, ...(weakOnly ? S.weakToggleOn : {}) }}
        >
          <span style={weakDot(weakOnly)} />
          Weak only {weakCount > 0 ? `(${weakCount})` : ""}
        </button>
        {weakOnly && weakCount === 0 && (
          <span style={S.weakEmpty}>No weak characters yet — keep going!</span>
        )}
      </div>

      <div style={S.streakArea}>
        {streak > 0 && (
          <div style={{
            ...S.streakDisplay,
            ...streakStyle,
            ...(streakPop && streak < 10 ? S.streakPop : {}),
          }}>
            <span style={S.streakEmoji}>
              {streak >= 20 ? "💥" : streak >= 10 ? "🔥🔥🔥" : streak >= 5 ? "🔥🔥" : "🔥"}
            </span>
            <span style={S.streakNumber}>{streak}</span>
            {streak >= 20 && <span style={S.streakLabel}>UNSTOPPABLE</span>}
            {streak >= 10 && streak < 20 && <span style={S.streakLabel}>ON FIRE</span>}
            {streak >= 5 && streak < 10 && <span style={S.streakLabel}>COMBO</span>}
          </div>
        )}
        <div style={S.sessionRow}>
          {sessionScore.total > 0 && (
            <span style={S.sessionText}>
              {sessionScore.correct}/{sessionScore.total} — {Math.round(sessionScore.correct / sessionScore.total * 100)}%
            </span>
          )}
          {(data.bestStreak ?? 0) > 0 && (
            <span style={S.bestStreak}>best: {data.bestStreak} 🔥</span>
          )}
        </div>
      </div>

      <div style={{ ...S.card, ...(phase === "wrong" ? S.cardWrong : phase === "correct" ? S.cardCorrect : {}) }}>
        <div style={S.charBig}>{quizChar.h}</div>
        <PlayButton text={quizChar.h} />

        {phase === "correct" && (
          <div style={S.correctBanner}>
            <span style={{ fontSize: 20 }}>✅</span>
            <span style={S.correctText}>{quizChar.r}</span>
            {streak === data.bestStreak && streak > 1 && (
              <span style={S.newBest}>NEW BEST!</span>
            )}
          </div>
        )}

        {phase === "wrong" && (
          <div style={S.wrongSection}>
            <div style={S.wrongBanner}>
              <span style={{ fontSize: 20 }}>❌</span>
              <span>The answer is:</span>
            </div>
            <div style={S.wrongAnswer}>{quizChar.r}</div>
            <div style={S.wrongInstruction}>Type it correctly to continue</div>
          </div>
        )}

        <div style={S.inputRow}>
          <input
            ref={inputRef}
            value={input}
            onChange={e => { if (phase !== "correct") setInput(e.target.value); }}
            onKeyDown={handleKeyDown}
            placeholder={
              phase === "correct" ? "Enter → next..."
              : phase === "wrong" ? `Type: ${quizChar.r}`
              : "romaji..."
            }
            style={{
              ...S.input,
              ...(phase === "correct" ? S.inputDone : {}),
              ...(phase === "wrong" ? S.inputForce : {}),
            }}
            autoFocus
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
          />
          {phase === "answer" && (
            <button
              onClick={handleSubmit}
              disabled={!input.trim()}
              style={{ ...S.submitBtn, opacity: input.trim() ? 1 : 0.4 }}
            >確認</button>
          )}
        </div>

        {phase === "correct" && <div style={S.enterHint}>press Enter for next</div>}
      </div>

      {retryCount > 0 && (
        <div style={S.retryInfo}>
          🔄 {retryCount} character{retryCount > 1 ? "s" : ""} coming back soon
        </div>
      )}

      <div style={S.actionsRow}>
        <button onClick={resetSession} style={S.actionBtn}>↻ Reset score</button>
        <button onClick={resetAllStats} style={S.actionBtnDanger}>🗑 Clear all stats</button>
      </div>
    </div>
  );
}
