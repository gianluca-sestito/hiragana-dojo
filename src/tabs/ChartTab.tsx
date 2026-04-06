import { useState } from "react";
import { S, C } from "../styles";
import { HIRAGANA_ROWS, ALL_HIRAGANA } from "../data/hiragana";
import type { HiraganaChar } from "../data/hiragana";
import type { CharStat } from "../logic/storage";

const GROUPS = [
  { key: "basic",      title: "Basic · 清音" },
  { key: "dakuon",     title: "Dakuon · 濁音 ゛" },
  { key: "handakuon",  title: "Handakuon · 半濁音 ゜" },
  { key: "yoon",       title: "Yōon · 拗音" },
] as const;

interface Props {
  stats: Record<string, CharStat>;
}

function charColor(s: CharStat | undefined): string {
  if (!s || s.total === 0) return "transparent";
  const ratio = s.correct / s.total;
  if (ratio >= 0.8) return "rgba(74,124,89,0.15)";
  if (ratio >= 0.5) return "rgba(212,168,67,0.15)";
  return "rgba(200,75,49,0.12)";
}

export default function ChartTab({ stats }: Props) {
  const [selected, setSelected] = useState<HiraganaChar | null>(null);

  return (
    <div style={S.chartWrap}>
      {GROUPS.map(group => {
        const rows = HIRAGANA_ROWS.filter(r => r.group === group.key);
        return (
          <div key={group.key} style={{ marginBottom: 16 }}>
            <div style={S.groupTitle}>{group.title}</div>
            <div style={S.grid}>
              <div style={S.gridHeaderRow}>
                <div style={S.rowLabel} />
                {group.key === "yoon"
                  ? ["ya", "yu", "yo"].map(v => <div key={v} style={S.colHead}>{v}</div>)
                  : ["a", "i", "u", "e", "o"].map(v => <div key={v} style={S.colHead}>{v}</div>)
                }
              </div>
              {rows.map((row, ri) => (
                <div key={ri} style={S.gridRow}>
                  <div style={S.rowLabel}>
                    {row.label === "vowels" ? "" : row.label === "nn" ? "n" : row.label}
                  </div>
                  {row.chars.map((c, ci) => (
                    <button
                      key={ci}
                      onClick={() => c.h && setSelected(selected?.h === c.h ? null : c)}
                      style={{
                        ...S.cell,
                        backgroundColor: c.h ? charColor(stats[c.h]) : "transparent",
                        cursor: c.h ? "pointer" : "default",
                        ...(selected?.h === c.h ? S.cellSelected : {}),
                      }}
                    >
                      {c.h && <span style={{ ...S.cellH, fontSize: group.key === "yoon" ? 14 : 18 }}>{c.h}</span>}
                      {c.h && <span style={S.cellR}>{c.r}</span>}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {(() => {
        const weak = ALL_HIRAGANA
          .filter(c => { const s = stats[c.h]; return s && s.total >= 3 && s.correct / s.total < 0.6; })
          .sort((a, b) => (stats[a.h].correct / stats[a.h].total) - (stats[b.h].correct / stats[b.h].total));
        if (weak.length === 0) return null;
        return (
          <div style={{ marginBottom: 16 }}>
            <div style={S.groupTitle}>Weak Chars · 苦手</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
              {weak.map(c => {
                const s = stats[c.h];
                const pct = Math.round(s.correct / s.total * 100);
                return (
                  <button
                    key={c.h}
                    onClick={() => setSelected(selected?.h === c.h ? null : c)}
                    style={{
                      ...S.cell,
                      flex: "none", width: 58, height: 58, aspectRatio: "unset",
                      backgroundColor: "rgba(200,75,49,0.06)",
                      border: `1px solid rgba(200,75,49,0.25)`,
                      ...(selected?.h === c.h ? S.cellSelected : {}),
                    }}
                  >
                    <span style={{ ...S.cellH, fontSize: c.h.length > 1 ? 14 : 18 }}>{c.h}</span>
                    <span style={{ ...S.cellR, color: C.accent, fontWeight: 600 }}>{pct}%</span>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })()}

      {selected && (
        <div style={S.charDetail}>
          <span style={S.detailH}>{selected.h}</span>
          <span style={S.detailR}>{selected.r}</span>
          {stats[selected.h] ? (
            <span style={S.detailStat}>
              {stats[selected.h].correct}/{stats[selected.h].total} correct
              ({Math.round(stats[selected.h].correct / stats[selected.h].total * 100)}%)
            </span>
          ) : (
            <span style={S.detailStat}>Not tested yet</span>
          )}
        </div>
      )}

      <div style={S.legend}>
        <span><span style={{ ...S.dot, backgroundColor: "rgba(74,124,89,0.3)" }} /> ≥80%</span>
        <span><span style={{ ...S.dot, backgroundColor: "rgba(212,168,67,0.3)" }} /> 50-79%</span>
        <span><span style={{ ...S.dot, backgroundColor: "rgba(200,75,49,0.25)" }} /> &lt;50%</span>
        <span><span style={{ ...S.dot, backgroundColor: "rgba(0,0,0,0.06)" }} /> Not tested</span>
      </div>
    </div>
  );
}
