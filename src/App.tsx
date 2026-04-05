import { useState, useCallback } from "react";
import { CSS, S } from "./styles";
import { loadData, saveData, DEFAULT_DATA } from "./logic/storage";
import type { AppData } from "./logic/storage";
import QuizTab from "./tabs/QuizTab";
import ChartTab from "./tabs/ChartTab";
import FillTab from "./tabs/FillTab";
import ReadTab from "./tabs/ReadTab";
import VerbsTab from "./tabs/VerbsTab";
import AdjTab from "./tabs/AdjTab";
import NumsTab from "./tabs/NumsTab";
import SpeakTab from "./tabs/SpeakTab";

type View = "quiz" | "fill" | "read" | "verbs" | "adj" | "nums" | "speak" | "chart";

const NAV: Array<{ view: View; label: string }> = [
  { view: "quiz",  label: "⚡ Speed" },
  { view: "fill",  label: "🧩 Fill" },
  { view: "read",  label: "📖 Read" },
  { view: "verbs", label: "🔄 Verbs" },
  { view: "adj",   label: "✨ Adj" },
  { view: "nums",  label: "🔢 Nums" },
  { view: "speak", label: "🎤 Speak" },
  { view: "chart", label: "📋 Chart" },
];

export default function App() {
  const [view, setView] = useState<View>("quiz");
  const [data, setData] = useState<AppData>(() => {
    const saved = loadData();
    return saved ? { ...DEFAULT_DATA, ...saved } : DEFAULT_DATA;
  });
  const loaded = true; // data is loaded synchronously from localStorage

  const update = useCallback((updates: Partial<AppData>) => {
    setData(prev => {
      const next = { ...prev, ...updates };
      saveData(next);
      return next;
    });
  }, []);

  if (!loaded) return (
    <div style={S.loadingWrap}>
      <div style={S.loadingChar}>ひ</div>
      <div style={S.loadingText}>Loading...</div>
    </div>
  );

  const accuracy = data.totalAnswered > 0
    ? Math.round(data.totalCorrect / data.totalAnswered * 100)
    : 0;

  return (
    <div style={S.root}>
      <style>{CSS}</style>
      <div style={S.bgGrain} />

      <header style={S.header}>
        <div style={S.headerLeft}>
          <span style={S.logo}>ひらがな道場</span>
          <span style={S.logoSub}>hiragana dōjō</span>
        </div>
        <div style={S.headerRight}>
          <div style={S.stat}>
            <span style={S.statN}>{data.totalAnswered}</span>
            <span style={S.statL}>total</span>
          </div>
          <div style={S.stat}>
            <span style={S.statN}>{accuracy}%</span>
            <span style={S.statL}>accuracy</span>
          </div>
        </div>
      </header>

      <div style={S.viewToggle}>
        {NAV.map(({ view: v, label }) => (
          <button key={v} onClick={() => setView(v)}
            style={{ ...S.viewBtn, ...(view === v ? S.viewBtnActive : {}) }}>
            {label}
          </button>
        ))}
      </div>

      <main style={S.main}>
        {view === "quiz"  && <QuizTab data={data} update={update} />}
        {view === "fill"  && <FillTab />}
        {view === "read"  && <ReadTab />}
        {view === "verbs" && <VerbsTab />}
        {view === "adj"   && <AdjTab />}
        {view === "nums"  && <NumsTab />}
        {view === "speak" && <SpeakTab />}
        {view === "chart" && <ChartTab stats={data.stats} />}
      </main>
    </div>
  );
}
