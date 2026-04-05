import { useState } from "react";
import { S } from "../styles";
import { HIRAGANA_ROWS } from "../data/hiragana";
import type { HiraganaChar } from "../data/hiragana";
import type { CharStat } from "../logic/storage";

const GROUPS = [
  { key: "basic",      title: "Basic · 清音" },
  { key: "dakuon",     title: "Dakuon · 濁音 ゛" },
  { key: "handakuon",  title: "Handakuon · 半濁音 ゜" },
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
                {["a", "i", "u", "e", "o"].map(v => (
                  <div key={v} style={S.colHead}>{v}</div>
                ))}
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
                      {c.h && <span style={S.cellH}>{c.h}</span>}
                      {c.h && <span style={S.cellR}>{c.r}</span>}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        );
      })}

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
