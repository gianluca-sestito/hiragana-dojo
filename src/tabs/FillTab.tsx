import { useState, useEffect, useCallback } from "react";
import { S } from "../styles";
import { toRomaji } from "../logic/romaji";
import { FILL_POOL } from "../data/fill";
import type { FillExercise } from "../data/fill";
import { PlayButton } from "../components/PlayButton";

type Phase = "pick" | "correct" | "wrong";

export default function FillTab() {
  const [exercises, setExercises] = useState<FillExercise[] | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [phase, setPhase] = useState<Phase>("pick");
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [wrongRetry, setWrongRetry] = useState(false);
  const [showRomaji, setShowRomaji] = useState(false);

  function generate() {
    const shuffled = [...FILL_POOL]
      .sort(() => Math.random() - 0.5)
      .slice(0, 5)
      .map(ex => ({ ...ex, options: [...ex.options].sort(() => Math.random() - 0.5) }));
    setExercises(shuffled);
    setCurrentIdx(0);
    setScore(0);
    setCompleted(false);
    setSelected(null);
    setPhase("pick");
  }

  const handlePick = useCallback((option: string) => {
    if (phase !== "pick" || !exercises) return;
    setSelected(option);
    const ex = exercises[currentIdx];
    if (option === ex.answer) {
      setPhase("correct");
      setScore(s => s + 1);
      setWrongRetry(false);
    } else {
      setPhase("wrong");
      setWrongRetry(true);
    }
  }, [phase, exercises, currentIdx]);

  const handleNext = useCallback(() => {
    if (!exercises) return;
    if (phase === "wrong") {
      setSelected(null);
      setPhase("pick");
      return;
    }
    if (currentIdx < exercises.length - 1) {
      setCurrentIdx(i => i + 1);
      setSelected(null);
      setPhase("pick");
      setWrongRetry(false);
    } else {
      setCompleted(true);
    }
  }, [phase, exercises, currentIdx]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Enter" && phase !== "pick") { e.preventDefault(); handleNext(); return; }
      if (phase === "pick" && exercises && ["1", "2", "3", "4"].includes(e.key)) {
        const opt = exercises[currentIdx]?.options[parseInt(e.key) - 1];
        if (opt) handlePick(opt);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, exercises, currentIdx, handleNext, handlePick]);

  if (!exercises) {
    return (
      <div style={S.fillWrap}>
        <div style={S.fillHero}>
          <span style={{ fontSize: 42 }}>🧩</span>
          <h2 style={S.fillTitle}>Complete the sentence</h2>
          <p style={S.fillDesc}>Pick the correct hiragana to fill the blank. All in hiragana!</p>
          <button onClick={generate} style={S.fillStartBtn}>Start · はじめ</button>
        </div>
      </div>
    );
  }

  if (completed) {
    return (
      <div style={S.fillWrap}>
        <div style={S.fillHero}>
          <span style={{ fontSize: 42 }}>{score >= 4 ? "🎉" : score >= 2 ? "👍" : "💪"}</span>
          <h2 style={S.fillTitle}>Round complete!</h2>
          <div style={S.fillScoreBig}>{score}/{exercises.length}</div>
          <button onClick={generate} style={S.fillStartBtn}>New round · もういちど</button>
        </div>
      </div>
    );
  }

  const ex = exercises[currentIdx];
  const parts = ex.sentence.split("＿＿＿");
  const speakText = ex.sentence.replace("＿＿＿", phase === "correct" ? ex.answer : "　");

  return (
    <div style={S.fillWrap}>
      <div style={S.fillProgress}>
        <div style={{ ...S.fillProgressFill, width: `${(currentIdx / exercises.length) * 100}%` }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
        <div style={{ ...S.playRow }}>
          <div style={S.fillCounter}>{currentIdx + 1} / {exercises.length}</div>
          <PlayButton text={speakText} size="sm" />
        </div>
        <button
          onClick={() => setShowRomaji(v => !v)}
          style={{ ...S.romajiToggle, ...(showRomaji ? S.romajiToggleOn : {}) }}
        >
          <span style={{ fontSize: 11 }}>{showRomaji ? "◉" : "○"}</span> romaji
        </button>
      </div>

      <div style={{
        ...S.fillCard,
        ...(phase === "correct" ? S.fillCardCorrect : phase === "wrong" ? S.fillCardWrong : {}),
      }}>
        <div style={S.fillSentence}>
          {parts[0]}
          <span style={{
            ...S.fillBlank,
            ...(phase === "correct" ? S.fillBlankCorrect : phase === "wrong" ? S.fillBlankWrong : {}),
          }}>
            {phase === "correct" ? ex.answer : phase === "wrong" ? selected : "？？？"}
          </span>
          {parts[1] ?? ""}
        </div>

        {showRomaji && (
          <div style={S.romajiLine}>
            {toRomaji(parts[0])}
            <span style={{ fontWeight: 600 }}>
              {phase === "correct" ? toRomaji(ex.answer) : phase === "wrong" && selected ? toRomaji(selected) : "___"}
            </span>
            {toRomaji(parts[1] ?? "")}
          </div>
        )}

        {phase !== "pick" && <div style={S.fillTranslation}>{ex.translation}</div>}

        {phase === "wrong" && (
          <div style={S.fillWrongInfo}>
            <span>❌ Correct answer: <strong>{ex.answer}</strong></span>
            {ex.hint && <span style={S.fillHint}>({ex.hint})</span>}
          </div>
        )}
        {phase === "correct" && (
          <div style={S.fillCorrectInfo}>
            <span>✅ Correct!</span>
            {ex.hint && <span style={S.fillHint}>({ex.hint})</span>}
          </div>
        )}
        {wrongRetry && phase === "pick" && (
          <div style={S.fillRetryHint}>Try again — pick the right one!</div>
        )}
      </div>

      <div style={S.fillOptions}>
        {ex.options.map((opt, i) => {
          const isSelected = selected === opt;
          const isAnswer = opt === ex.answer;
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
                <span style={S.fillOptionText}>{opt}</span>
                {showRomaji && <span style={S.fillOptionRomaji}>{toRomaji(opt)}</span>}
              </span>
            </button>
          );
        })}
      </div>

      {phase !== "pick" && (
        <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "center", marginTop: 12 }}>
          <button onClick={handleNext} style={S.fillNextBtn}>
            {phase === "wrong" ? "Try again" : currentIdx < exercises.length - 1 ? "Next → つぎ" : "Results"}
          </button>
          <span style={S.fillEnterHint}>or Enter</span>
        </div>
      )}
    </div>
  );
}
