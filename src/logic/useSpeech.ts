import { useState, useCallback, useRef, useEffect } from "react";

// Priority list: best → acceptable. First match wins.
const VOICE_PRIORITY = [
  "Google 日本語",       // Chrome on desktop — most natural
  "Kyoko",              // macOS enhanced (must be downloaded in System Settings)
  "O-ren",              // macOS alternative
  "Microsoft Haruka",   // Windows
  "Microsoft Ayumi",    // Windows alternative
];

function pickVoice(): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis.getVoices();
  for (const name of VOICE_PRIORITY) {
    const v = voices.find(v => v.name.includes(name));
    if (v) return v;
  }
  // Fall back to any Japanese voice
  return voices.find(v => v.lang.startsWith("ja")) ?? null;
}

export function useSpeech() {
  const [speaking, setSpeaking] = useState(false);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);

  // Voices load asynchronously — grab the best one once they're ready
  useEffect(() => {
    function loadVoice() { voiceRef.current = pickVoice(); }
    loadVoice();
    window.speechSynthesis.addEventListener("voiceschanged", loadVoice);
    return () => window.speechSynthesis.removeEventListener("voiceschanged", loadVoice);
  }, []);

  const speak = useCallback((text: string) => {
    if (!window.speechSynthesis) return;

    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "ja-JP";
    u.rate = 0.85;
    if (voiceRef.current) u.voice = voiceRef.current;
    u.onstart = () => setSpeaking(true);
    u.onend = () => setSpeaking(false);
    u.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(u);
  }, [speaking]);

  return { speak, speaking };
}
