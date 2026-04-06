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
import AnimeTab from "./tabs/AnimeTab";
import Sidebar from "./components/Sidebar";
import MenuDrawer from "./components/MenuDrawer";
import { useMediaQuery } from "./components/useMediaQuery";
import type { View } from "./nav";

export default function App() {
  const [view, setView] = useState<View>("quiz");
  const [menuOpen, setMenuOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

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
    <div style={S.appShell}>
      <style>{CSS}</style>
      <div style={S.bgGrain} />

      {isDesktop && (
        <Sidebar
          view={view}
          onSelect={setView}
          totalAnswered={data.totalAnswered}
          accuracy={accuracy}
        />
      )}

      <div style={S.contentCol}>
        {!isDesktop && (
          <header style={S.mobileHeader}>
            <button
              style={S.hamburgerBtn}
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
            >
              <span style={S.hamburgerLine} />
              <span style={S.hamburgerLine} />
              <span style={S.hamburgerLine} />
            </button>
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
                <span style={S.statL}>acc</span>
              </div>
            </div>
          </header>
        )}

        <main style={S.main}>
          {view === "quiz"  && <QuizTab data={data} update={update} />}
          {view === "fill"  && <FillTab />}
          {view === "read"  && <ReadTab />}
          {view === "verbs" && <VerbsTab />}
          {view === "adj"   && <AdjTab />}
          {view === "nums"  && <NumsTab />}
          {view === "speak" && <SpeakTab />}
          {view === "anime" && <AnimeTab />}
          {view === "chart" && <ChartTab stats={data.stats} />}
        </main>
      </div>

      {!isDesktop && (
        <MenuDrawer
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
          view={view}
          onSelect={(v) => { setView(v); setMenuOpen(false); }}
        />
      )}
    </div>
  );
}
