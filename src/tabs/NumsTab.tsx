import { useState, useEffect, useCallback } from "react";
import { S } from "../styles";
import { toRomaji } from "../logic/romaji";
import { useDrill } from "../logic/useDrill";
import { generateNumberExercise } from "../logic/numbers";
import { NUMBERS } from "../data/numbers";
import type { NumberExercise } from "../logic/numbers";

const TYPE_LABELS: Record<NumberExercise["type"], string> = {
  num2jp: "Number → Hiragana", jp2num: "Hiragana → Number",
  en2jp: "English → Hiragana", math: "Math!",
};

export default function NumsTab() {
  const [showRef, setShowRef] = useState(true);

  const generate = useCallback(
    (recentKeys: string[]) => {
      let ex: NumberExercise;
      let attempts = 0;
      do { ex = generateNumberExercise(recentKeys); attempts++; }
      while (recentKeys.includes(ex.key) && attempts < 15);
      return ex;
    },
    [],
  );

  const { exercise, selected, phase, score, showRomaji, setShowRomaji, wrongRetry, retryCount, handlePick, handleNext, reset } =
    useDrill<NumberExercise>(generate, 6);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!exercise) return;
      if (e.key === "Enter" && phase !== "pick") { e.preventDefault(); handleNext(); }
      if (phase === "pick" && ["1", "2", "3", "4"].includes(e.key)) {
        const opt = exercise.options[parseInt(e.key) - 1];
        if (opt) handlePick(opt);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [exercise, phase, handleNext, handlePick]);

  if (!exercise) return null;

  const isOptionsJP = exercise.optionType === "jp";
  const feedbackText = `${exercise.num.n} = ${exercise.num.h} (${exercise.num.r}) — ${exercise.num.en}${exercise.num.alt ? " · also: " + exercise.num.alt : ""}`;

  return (
    <div style={S.fillWrap}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
        <div style={S.sessionRow}>
          {score.total > 0 && (
            <span style={S.sessionText}>
              {score.correct}/{score.total} — {Math.round(score.correct / score.total * 100)}%
            </span>
          )}
        </div>
        <button onClick={() => setShowRomaji(!showRomaji)}
          style={{ ...S.romajiToggle, ...(showRomaji ? S.romajiToggleOn : {}) }}>
          <span style={{ fontSize: 11 }}>{showRomaji ? "◉" : "○"}</span> romaji
        </button>
      </div>

      <div style={{
        ...S.fillCard,
        ...(phase === "correct" ? S.fillCardCorrect : phase === "wrong" ? S.fillCardWrong : {}),
      }}>
        <span style={S.verbTypeTag}>{TYPE_LABELS[exercise.type]}</span>

        <div style={{
          fontSize: exercise.type === "jp2num" || exercise.type === "math" ? 32 : 48,
          fontWeight: exercise.type === "num2jp" ? 700 : 500,
          textAlign: "center", color: "#2C2420", lineHeight: 1.3,
          fontFamily: exercise.type === "num2jp" ? "'DM Serif Display', serif" : "'Noto Sans JP', sans-serif",
        }}>
          {exercise.prompt}
        </div>
        {exercise.promptSub && <div style={{ fontSize: 12, color: "#7A706A", marginTop: 2 }}>{exercise.promptSub}</div>}
        {exercise.type === "jp2num" && showRomaji && (
          <div style={S.romajiLine}>{toRomaji(exercise.prompt)}</div>
        )}

        {phase === "correct" && (
          <div style={S.verbFeedback}>
            <span style={{ fontSize: 18 }}>✅</span>
            <span style={S.verbFeedbackText}>{feedbackText}</span>
          </div>
        )}
        {phase === "wrong" && (
          <div style={S.verbFeedbackWrong}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 18 }}>❌</span>
              <span style={{ color: "#C84B31", fontSize: 14 }}>You picked: {selected}</span>
            </div>
            <div style={S.verbFeedbackCorrectLine}>
              <span>Correct:</span>
              <strong>{feedbackText}</strong>
            </div>
          </div>
        )}
        {wrongRetry && phase === "pick" && <div style={S.fillRetryHint}>Try again!</div>}
      </div>

      <div style={S.fillOptions}>
        {exercise.options.map((opt, i) => {
          const isSelected = selected === opt;
          const isAnswer = opt === exercise.correct;
          const showResult = phase !== "pick";
          return (
            <button key={i} onClick={() => handlePick(opt)} disabled={phase !== "pick"}
              style={{
                ...S.fillOption,
                ...(showResult && isAnswer ? S.fillOptionCorrect : {}),
                ...(showResult && isSelected && !isAnswer ? S.fillOptionWrong : {}),
                ...(showResult ? { opacity: isAnswer || isSelected ? 1 : 0.4 } : {}),
              }}>
              <span style={S.fillOptionNum}>{i + 1}</span>
              <span style={S.fillOptionTextWrap}>
                <span style={S.fillOptionText}>{opt}</span>
                {isOptionsJP && showRomaji && <span style={S.fillOptionRomaji}>{toRomaji(opt)}</span>}
              </span>
            </button>
          );
        })}
      </div>

      {phase !== "pick" && (
        <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "center", marginTop: 12 }}>
          <button onClick={handleNext} style={S.fillNextBtn}>
            {phase === "wrong" ? "Try again" : "Next → つぎ"}
          </button>
          <span style={S.fillEnterHint}>or Enter</span>
        </div>
      )}

      {retryCount > 0 && <div style={S.retryInfo}>🔄 {retryCount} coming back soon</div>}

      <button onClick={() => setShowRef(v => !v)} style={{ ...S.readTransBtn, marginTop: 12 }}>
        {showRef ? "Hide" : "Show"} reference
      </button>
      {showRef && (
        <div style={S.numRefGrid}>
          {NUMBERS.map(n => (
            <div key={n.n} style={S.numRefItem}>
              <span style={S.numRefDigit}>{n.n}</span>
              <span style={S.numRefH}>{n.h}</span>
              <span style={S.numRefR}>{n.r}</span>
              {n.alt && <span style={S.numRefAlt}>{n.alt}</span>}
            </div>
          ))}
        </div>
      )}

      <button onClick={reset} style={{ ...S.actionBtn, marginTop: 8 }}>↻ Reset</button>
    </div>
  );
}
