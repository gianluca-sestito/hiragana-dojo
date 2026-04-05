import { useState, useRef, useCallback } from "react";

const SpeechAPI =
  typeof window !== "undefined"
    ? (window.SpeechRecognition ?? (window as unknown as { webkitSpeechRecognition?: new () => SpeechRecognition }).webkitSpeechRecognition)
    : undefined;

export interface SpeechResult {
  alts: string[];   // all alternatives for the final result
}

export interface SpeechRecognitionHook {
  listening: boolean;
  interimText: string;
  supported: boolean;
  start: () => void;
  stop: () => void;
  onResult: (cb: (r: SpeechResult) => void) => void;
}

export function useSpeechRecognition(): SpeechRecognitionHook {
  const [listening, setListening] = useState(false);
  const [interimText, setInterimText] = useState("");
  const recRef = useRef<SpeechRecognition | null>(null);
  const keepAliveRef = useRef(false);
  const callbackRef = useRef<((r: SpeechResult) => void) | null>(null);

  const supported = !!SpeechAPI;

  const onResult = useCallback((cb: (r: SpeechResult) => void) => {
    callbackRef.current = cb;
  }, []);

  const createRec = useCallback(() => {
    if (!SpeechAPI) return null;
    const rec = new SpeechAPI();
    rec.lang = "ja-JP";
    rec.interimResults = true;
    rec.maxAlternatives = 5;
    rec.continuous = false;

    rec.onstart = () => setListening(true);

    rec.onresult = (e: SpeechRecognitionEvent) => {
      const last = e.results[e.results.length - 1];
      if (!last.isFinal) {
        setInterimText(last[0].transcript);
        return;
      }
      setInterimText("");
      const alts: string[] = [];
      for (let j = 0; j < last.length; j++) alts.push(last[j].transcript.trim());
      callbackRef.current?.({ alts });
    };

    rec.onerror = (e: SpeechRecognitionErrorEvent) => {
      // "no-speech" just means it heard nothing — restart silently
      if (e.error === "no-speech" && keepAliveRef.current) return;
      keepAliveRef.current = false;
      setListening(false);
      setInterimText("");
      recRef.current = null;
    };

    rec.onend = () => {
      recRef.current = null;
      if (keepAliveRef.current) {
        // Restart immediately so user doesn't have to re-tap
        const next = createRec();
        if (next) {
          recRef.current = next;
          try { next.start(); } catch { /* already started */ }
        }
      } else {
        setListening(false);
        setInterimText("");
      }
    };

    return rec;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const start = useCallback(() => {
    if (!SpeechAPI) return;
    keepAliveRef.current = true;
    recRef.current?.stop();
    const rec = createRec();
    if (rec) {
      recRef.current = rec;
      rec.start();
    }
  }, [createRec]);

  const stop = useCallback(() => {
    keepAliveRef.current = false;
    recRef.current?.stop();
    recRef.current = null;
    setListening(false);
    setInterimText("");
  }, []);

  return { listening, interimText, supported, start, stop, onResult };
}
