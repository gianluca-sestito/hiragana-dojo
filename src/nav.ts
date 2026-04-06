export type View = "quiz" | "fill" | "read" | "verbs" | "adj" | "nums" | "speak" | "chart";

export const NAV: Array<{ view: View; emoji: string; label: string }> = [
  { view: "quiz",  emoji: "⚡", label: "Speed Quiz" },
  { view: "fill",  emoji: "🧩", label: "Fill In" },
  { view: "read",  emoji: "📖", label: "Reading" },
  { view: "verbs", emoji: "🔄", label: "Verbs" },
  { view: "adj",   emoji: "✨", label: "Adjectives" },
  { view: "nums",  emoji: "🔢", label: "Numbers" },
  { view: "speak", emoji: "🎤", label: "Speak" },
  { view: "chart", emoji: "📋", label: "Chart" },
];
