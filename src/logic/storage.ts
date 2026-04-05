export interface CharStat {
  correct: number;
  total: number;
}

export interface AppData {
  stats: Record<string, CharStat>;
  totalAnswered: number;
  totalCorrect: number;
  bestStreak: number;
}

export const DEFAULT_DATA: AppData = {
  stats: {},
  totalAnswered: 0,
  totalCorrect: 0,
  bestStreak: 0,
};

const STORAGE_KEY = "hiragana-dojo-v2";

export function loadData(): AppData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AppData) : null;
  } catch {
    return null;
  }
}

export function saveData(data: AppData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // quota exceeded or private browsing — silently ignore
  }
}
