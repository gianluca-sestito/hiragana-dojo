import { useSpeech } from "../logic/useSpeech";
import { C } from "../styles";

interface Props {
  text: string;
  size?: "sm" | "md";
}

function SpeakerIcon({ px, active }: { px: number; active: boolean }) {
  return (
    <svg width={px} height={px} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      {active && <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />}
    </svg>
  );
}

export function PlayButton({ text, size = "md" }: Props) {
  const { speak, speaking } = useSpeech();
  const dim = size === "sm" ? 30 : 36;
  const iconPx = size === "sm" ? 13 : 15;

  const style: React.CSSProperties = {
    width: dim,
    height: dim,
    borderRadius: "50%",
    border: `1.5px solid ${speaking ? C.accent : C.border}`,
    backgroundColor: speaking ? "rgba(200,75,49,0.06)" : C.white,
    color: speaking ? C.accent : C.inkMuted,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    cursor: "pointer",
    transition: "all 0.15s ease",
    animation: speaking ? "pulse 1s ease-in-out infinite" : "none",
    padding: 0,
  };

  return (
    <button
      onClick={() => speak(text)}
      style={style}
      title={speaking ? "Stop" : "Listen"}
      aria-label={speaking ? "Stop audio" : "Play audio"}
    >
      <SpeakerIcon px={iconPx} active={speaking} />
    </button>
  );
}
