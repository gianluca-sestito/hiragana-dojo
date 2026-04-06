import { S, C } from "../styles";
import { NAV } from "../nav";
import type { View } from "../nav";

interface SidebarProps {
  view: View;
  onSelect: (v: View) => void;
  totalAnswered: number;
  accuracy: number;
}

export default function Sidebar({ view, onSelect, totalAnswered, accuracy }: SidebarProps) {
  return (
    <aside style={S.sidebar}>
      <div style={S.sidebarLogoArea}>
        <span style={S.logo}>ひらがな道場</span>
        <div style={{ marginTop: 2 }}>
          <span style={S.logoSub}>hiragana dōjō</span>
        </div>
      </div>

      <nav style={S.sidebarNav}>
        {NAV.map(({ view: v, emoji, label }) => (
          <button
            key={v}
            onClick={() => onSelect(v)}
            style={{ ...S.sidebarNavBtn, ...(view === v ? S.sidebarNavBtnActive : {}) }}
          >
            <span style={{ width: 22, textAlign: "center", flexShrink: 0 }}>{emoji}</span>
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <div style={S.sidebarStats}>
        <div style={S.stat}>
          <span style={S.statN}>{totalAnswered}</span>
          <span style={S.statL}>total</span>
        </div>
        <div style={{ width: 1, backgroundColor: C.border, alignSelf: "stretch" }} />
        <div style={S.stat}>
          <span style={S.statN}>{accuracy}%</span>
          <span style={S.statL}>accuracy</span>
        </div>
      </div>
    </aside>
  );
}
