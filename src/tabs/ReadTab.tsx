import { useState, useEffect, useCallback } from "react";
import { S } from "../styles";
import { toRomaji } from "../logic/romaji";
import { READ_SCENARIOS, READ_TOPIC_LABELS } from "../data/fill";
import type { ReadScenario } from "../data/fill";
import { PlayButton } from "../components/PlayButton";

type QuizPhase = "idle" | "correct" | "wrong";

export default function ReadTab() {
  const [scenario, setScenario] = useState<ReadScenario | null>(null);
  const [showRomaji, setShowRomaji] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [quizPick, setQuizPick] = useState<string | null>(null);
  const [quizPhase, setQuizPhase] = useState<QuizPhase>("idle");

  function load(topicId: string | null) {
    // eslint-disable-next-line react-hooks/purity
    const idx = Math.floor(Math.random() * READ_SCENARIOS.length);
    const s = topicId
      ? (READ_SCENARIOS.find(x => x.id === topicId) ?? READ_SCENARIOS[0])
      : READ_SCENARIOS[idx];
    setScenario(s);
    setShowTranslation(false);
    setQuizPick(null);
    setQuizPhase("idle");
  }

  const handleQuizPick = useCallback((opt: string) => {
    if (quizPhase !== "idle" || !scenario) return;
    setQuizPick(opt);
    setQuizPhase(opt === scenario.answer ? "correct" : "wrong");
  }, [quizPhase, scenario]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!scenario) return;
      if (e.key === "t" || e.key === "T") setShowTranslation(v => !v);
      if (quizPhase === "idle" && ["1", "2", "3"].includes(e.key)) {
        const opt = scenario.options[parseInt(e.key) - 1];
        if (opt) handleQuizPick(opt);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [scenario, quizPhase, handleQuizPick]);

  if (!scenario) {
    return (
      <div style={S.readWrap}>
        <div style={S.fillHero}>
          <span style={{ fontSize: 42 }}>📖</span>
          <h2 style={S.fillTitle}>Read · よむ</h2>
          <p style={S.fillDesc}>
            Read short hiragana scenarios, then answer a comprehension question.
          </p>
        </div>
        <div style={S.readTopics}>
          {READ_SCENARIOS.map(t => (
            <button key={t.id} onClick={() => load(t.id)} style={S.readTopicBtn}>
              {READ_TOPIC_LABELS[t.id]}
            </button>
          ))}
        </div>
        <button onClick={() => load(null)} style={{ ...S.fillStartBtn, marginTop: 4 }}>
          🎲 Random topic
        </button>
      </div>
    );
  }

  const textLines = scenario.text.split("\n").filter(l => l.trim());
  const translationLines = scenario.translation.split("\n").filter(l => l.trim());

  return (
    <div style={S.readWrap}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
        <div style={S.playRow}>
          <span style={S.readTitle}>{scenario.title}</span>
          <PlayButton text={scenario.text} size="sm" />
        </div>
        <button
          onClick={() => setShowRomaji(v => !v)}
          style={{ ...S.romajiToggle, ...(showRomaji ? S.romajiToggleOn : {}) }}
        >
          <span style={{ fontSize: 11 }}>{showRomaji ? "◉" : "○"}</span> romaji
        </button>
      </div>

      <div style={S.readCard}>
        {textLines.map((line, i) => (
          <div key={i} style={S.readLine}>
            <div style={S.readLineJp}>{line}</div>
            {showRomaji && <div style={S.readLineRomaji}>{toRomaji(line)}</div>}
          </div>
        ))}
      </div>

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

      {scenario.question && (
        <div style={S.readQuizSection}>
          <div style={S.readQuizQ}>{scenario.question}</div>
          <div style={S.readQuizOptions}>
            {scenario.options.map((opt, i) => {
              const isPicked = quizPick === opt;
              const isAnswer = opt === scenario.answer;
              const showResult = quizPhase !== "idle";
              return (
                <button
                  key={i}
                  onClick={() => handleQuizPick(opt)}
                  disabled={quizPhase !== "idle"}
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
      )}

      <div style={S.readBottomRow}>
        <button onClick={() => setScenario(null)} style={S.actionBtn}>← Topics</button>
        <button onClick={() => load(null)} style={S.fillStartBtn}>🎲 New scenario</button>
      </div>
    </div>
  );
}
