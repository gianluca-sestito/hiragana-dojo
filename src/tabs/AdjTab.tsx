import { useState, useEffect, useCallback } from "react";
import { S } from "../styles";
import { toRomaji } from "../logic/romaji";
import { useDrill } from "../logic/useDrill";
import { generateAdjExercise, getAdjDict } from "../logic/adjectives";
import { ADJ_FORMS } from "../data/adjectives";
import type { AdjExercise } from "../logic/adjectives";

const TYPE_LABELS: Record<AdjExercise["type"], string> = {
  en2jp: "Translate →", jp2en: "← Meaning", transform: "Transform", classify: "Classify",
};

function useToggleSet(initial: string[]) {
  const [active, setActive] = useState(initial);
  const toggle = useCallback((key: string) => {
    setActive(prev => {
      if (prev.includes(key)) return prev.length > 1 ? prev.filter(k => k !== key) : prev;
      return [...prev, key];
    });
  }, []);
  return [active, toggle] as const;
}

export default function AdjTab() {
  const [activeForms, toggleForm] = useToggleSet(ADJ_FORMS.map(f => f.key));
  const [activeTypes, toggleType] = useToggleSet(["i", "na"]);

  const generate = useCallback(
    (recentKeys: string[]) => generateAdjExercise(recentKeys, activeForms, activeTypes),
    [activeForms, activeTypes],
  );

  const { exercise, selected, phase, score, showRomaji, setShowRomaji, wrongRetry, retryCount, handlePick, handleNext, reset } =
    useDrill<AdjExercise>(generate, 8);

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

  const isPromptJP = exercise.type !== "en2jp";
  const isOptionsJP = exercise.optionType === "jp";
  const adjTypeLabel = exercise.adj.type === "i" ? "い-adj" : "な-adj";

  const fullCorrectDisplay = exercise.type === "en2jp"
    ? `${exercise.correct} (${toRomaji(exercise.correct)}) — ${adjTypeLabel}`
    : exercise.type === "jp2en"
    ? `${exercise.correct} — ${exercise.prompt} (${toRomaji(exercise.prompt)})`
    : exercise.type === "transform"
    ? `${exercise.correct} (${toRomaji(exercise.correct)}) — ${exercise.adj.en}`
    : `${exercise.correct} — ${getAdjDict(exercise.adj)} = ${exercise.adj.en}`;

  return (
    <div style={S.fillWrap}>
      <div style={S.verbFormRow}>
        <button onClick={() => toggleType("i")}
          style={{ ...S.adjTypeBtn, ...(activeTypes.includes("i") ? S.adjTypeBtnIOn : {}) }}>
          い adj
        </button>
        <button onClick={() => toggleType("na")}
          style={{ ...S.adjTypeBtn, ...(activeTypes.includes("na") ? S.adjTypeBtnNaOn : {}) }}>
          な adj
        </button>
        <span style={{ color: "#D4CBC0" }}>|</span>
        {ADJ_FORMS.map(f => (
          <button key={f.key} onClick={() => toggleForm(f.key)}
            style={{ ...S.verbFormBtn, ...(activeForms.includes(f.key) ? S.verbFormBtnOn : {}) }}>
            {f.label}
          </button>
        ))}
      </div>

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

        {isPromptJP ? (
          <div style={{ textAlign: "center" }}>
            <div style={S.verbPromptJP}>{exercise.prompt}</div>
            {showRomaji && <div style={S.romajiLine}>{toRomaji(exercise.prompt)}</div>}
            {exercise.promptSub && <div style={S.adjTransformHint}>{exercise.promptSub}</div>}
          </div>
        ) : (
          <div style={S.verbPrompt}>{exercise.prompt}</div>
        )}

        {phase === "correct" && (
          <div style={S.verbFeedback}>
            <span style={{ fontSize: 18 }}>✅</span>
            <span style={S.verbFeedbackText}>{fullCorrectDisplay}</span>
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
              <strong>{fullCorrectDisplay}</strong>
            </div>
          </div>
        )}
        {wrongRetry && phase === "pick" && <div style={S.fillRetryHint}>Try again!</div>}
      </div>

      <div style={exercise.options.length <= 2 ? S.adjOptionsSmall : S.fillOptions}>
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

      <div style={S.adjRefCard}>
        <div style={S.adjRefTitle}>Quick reference</div>
        <div style={S.adjRefRow}>
          <span style={S.adjRefLabel}>い adj:</span>
          <span>おいしい → おいし<strong>かった</strong>です</span>
        </div>
        <div style={S.adjRefRow}>
          <span style={S.adjRefLabel}>な adj:</span>
          <span>しずかです → しずか<strong>でした</strong></span>
        </div>
      </div>

      <button onClick={reset} style={{ ...S.actionBtn, marginTop: 8 }}>↻ Reset</button>
    </div>
  );
}
