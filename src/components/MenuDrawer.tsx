import { useState, useEffect } from "react";
import { S } from "../styles";
import { NAV } from "../nav";
import type { View } from "../nav";

interface MenuDrawerProps {
  open: boolean;
  onClose: () => void;
  view: View;
  onSelect: (v: View) => void;
}

const ANIM_MS = 220;

export default function MenuDrawer({ open, onClose, view, onSelect }: MenuDrawerProps) {
  const [visible, setVisible] = useState(open);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (open) {
      setVisible(true);
      setClosing(false);
    } else if (visible) {
      setClosing(true);
      const t = setTimeout(() => { setVisible(false); setClosing(false); }, ANIM_MS);
      return () => clearTimeout(t);
    }
  }, [open]);

  if (!visible) return null;

  const drawerStyle = {
    ...S.menuDrawer,
    animation: `${closing ? "slideOutLeft" : "slideInLeft"} ${ANIM_MS}ms ease`,
  };

  const overlayStyle = {
    ...S.menuOverlay,
    animation: `${closing ? "fadeOverlay" : "fadeOverlay"} ${closing ? ANIM_MS + "ms ease reverse" : "0.18s ease"}`,
  };

  return (
    <>
      <div style={overlayStyle} onClick={onClose} aria-hidden="true" />
      <div style={drawerStyle}>
        <div style={S.menuDrawerHeader}>
          <div>
            <span style={S.logo}>ひらがな道場</span>
            <div style={{ marginTop: 2 }}>
              <span style={S.logoSub}>hiragana dōjō</span>
            </div>
          </div>
          <button style={S.menuCloseBtn} onClick={onClose} aria-label="Close menu">✕</button>
        </div>

        <nav style={S.menuDrawerNav}>
          {NAV.map(({ view: v, emoji, label }) => (
            <button
              key={v}
              onClick={() => onSelect(v)}
              style={{ ...S.menuDrawerNavBtn, ...(view === v ? S.sidebarNavBtnActive : {}) }}
            >
              <span style={{ width: 26, textAlign: "center", flexShrink: 0, fontSize: 18 }}>{emoji}</span>
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}
