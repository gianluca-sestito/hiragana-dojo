import { useState, useRef, useCallback, useEffect } from "react";

export interface DrillExercise {
  key: string;
  correct: string;
  options: string[];
  optionType: "jp" | "en";
}

export interface DrillState<T extends DrillExercise> {
  exercise: T | null;
  selected: string | null;
  phase: "pick" | "correct" | "wrong";
  score: { correct: number; total: number };
  showRomaji: boolean;
  setShowRomaji: (v: boolean) => void;
  wrongRetry: boolean;
  retryCount: number;
  handlePick: (option: string) => void;
  handleNext: () => void;
  reset: () => void;
}

export function useDrill<T extends DrillExercise>(
  generate: (recentKeys: string[]) => T | null,
  recentLimit = 10,
): DrillState<T> {
  const [exercise, setExercise] = useState<T | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [phase, setPhase] = useState<"pick" | "correct" | "wrong">("pick");
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [showRomaji, setShowRomaji] = useState(false);
  const [wrongRetry, setWrongRetry] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const recentRef = useRef<string[]>([]);
  const retryQueueRef = useRef<Array<{ exercise: T; due: number }>>([]);
  // Use a ref for total so next() can read the latest value without being in deps
  const totalRef = useRef(0);

  const next = useCallback(() => {
    const queue = retryQueueRef.current;
    if (queue.length > 0 && queue[0].due <= totalRef.current + 1) {
      const entry = queue.shift()!;
      setExercise(entry.exercise);
    } else {
      const ex = generate(recentRef.current);
      if (!ex) return;
      recentRef.current = [...recentRef.current, ex.key].slice(-recentLimit);
      setExercise(ex);
    }
    setSelected(null);
    setPhase("pick");
    setWrongRetry(false);
    setRetryCount(queue.length);
  }, [generate, recentLimit]);

  useEffect(() => {
    next();
    // Run once on mount — `next` is stable (generate/recentLimit don't change)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePick = useCallback((option: string) => {
    if (phase !== "pick" || !exercise) return;
    setSelected(option);
    if (option === exercise.correct) {
      setPhase("correct");
      setScore(s => {
        totalRef.current = s.total + 1;
        return { correct: s.correct + 1, total: s.total + 1 };
      });
    } else {
      setPhase("wrong");
      setScore(s => {
        const newTotal = s.total + 1;
        totalRef.current = newTotal;
        const delay = 2 + Math.floor(Math.random() * 2);
        retryQueueRef.current.push({ exercise, due: newTotal + delay });
        return { ...s, total: newTotal };
      });
    }
  }, [phase, exercise]);

  const handleNext = useCallback(() => {
    if (phase === "wrong") {
      setSelected(null);
      setPhase("pick");
      setWrongRetry(true);
      return;
    }
    next();
  }, [phase, next]);

  const reset = useCallback(() => {
    setScore({ correct: 0, total: 0 });
    totalRef.current = 0;
    recentRef.current = [];
    retryQueueRef.current = [];
    setRetryCount(0);
    next();
  }, [next]);

  return { exercise, selected, phase, score, showRomaji, setShowRomaji, wrongRetry, retryCount, handlePick, handleNext, reset };
}
