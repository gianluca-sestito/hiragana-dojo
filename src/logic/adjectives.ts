import { ADJECTIVES, ADJ_FORMS } from "../data/adjectives";
import type { Adjective, AdjForm } from "../data/adjectives";

export interface AdjExercise {
  key: string;
  type: "en2jp" | "jp2en" | "transform" | "classify";
  adj: Adjective;
  form: AdjForm;
  correct: string;
  prompt: string;
  promptSub?: string;
  options: string[];
  optionType: "jp" | "en";
}

export function conjugateAdj(adj: Adjective, formKey: string): string {
  if (adj.type === "i") {
    if (adj.pastStem && formKey === "past") return adj.pastStem + "です";
    if (formKey === "present") return adj.stem + "いです";
    if (formKey === "past") return adj.stem + "かったです";
  }
  if (formKey === "present") return adj.stem + "です";
  if (formKey === "past") return adj.stem + "でした";
  return adj.stem;
}

export function getAdjDict(adj: Adjective): string {
  if (adj.dict) return adj.dict;
  if (adj.type === "i") return adj.stem + "い";
  return adj.stem;
}

export function generateAdjExercise(
  recentKeys: string[],
  activeForms: string[],
  activeTypes: string[],
): AdjExercise | null {
  const forms = ADJ_FORMS.filter(f => activeForms.includes(f.key));
  let pool = ADJECTIVES.filter(a => activeTypes.includes(a.type));
  if (pool.length === 0) pool = ADJECTIVES;
  if (forms.length === 0) return null;

  let adj: Adjective, form: AdjForm, key: string;
  let attempts = 0;
  do {
    adj = pool[Math.floor(Math.random() * pool.length)];
    form = forms[Math.floor(Math.random() * forms.length)];
    key = adj.stem + form.key;
    attempts++;
  } while (recentKeys.includes(key) && attempts < 40);

  const conjugated = conjugateAdj(adj, form.key);

  function getSameTypeWrongs(n: number): string[] {
    return [...pool]
      .filter(a => a.stem !== adj.stem)
      .sort(() => Math.random() - 0.5)
      .slice(0, n)
      .map(a => conjugateAdj(a, form.key));
  }

  const types = ["en2jp", "jp2en", "transform", "classify"] as const;
  const type = types[Math.floor(Math.random() * types.length)];

  if (type === "en2jp") {
    const enPrompt = form.key === "past" ? "was " + adj.en : adj.en;
    const wrongs = new Set<string>();
    ADJ_FORMS.filter(f => f.key !== form.key).forEach(f => wrongs.add(conjugateAdj(adj, f.key)));
    getSameTypeWrongs(4).forEach(w => wrongs.add(w));
    const crossType = adj.type === "i"
      ? adj.stem + (form.key === "past" ? "でした" : "です")
      : adj.stem + (form.key === "past" ? "かったです" : "いです");
    wrongs.add(crossType);
    const wrongArr = [...wrongs].filter(w => w !== conjugated).sort(() => Math.random() - 0.5).slice(0, 3);
    return { type, adj, form, correct: conjugated, key, prompt: enPrompt,
      options: [...wrongArr, conjugated].sort(() => Math.random() - 0.5), optionType: "jp" };
  }

  if (type === "jp2en") {
    const correctEn = form.key === "past" ? "was " + adj.en : adj.en;
    const wrongEns = [...pool].filter(a => a.stem !== adj.stem).sort(() => Math.random() - 0.5).slice(0, 3)
      .map(a => form.key === "past" ? "was " + a.en : a.en);
    return { type, adj, form, correct: correctEn, key, prompt: conjugated,
      options: [...wrongEns, correctEn].sort(() => Math.random() - 0.5), optionType: "en" };
  }

  if (type === "transform") {
    const fromKey = form.key === "past" ? "present" : "past";
    const direction = form.key === "past" ? "→ past" : "→ present";
    const wrongs = new Set<string>();
    getSameTypeWrongs(3).forEach(w => wrongs.add(w));
    const crossType = adj.type === "i"
      ? adj.stem + (form.key === "past" ? "でした" : "です")
      : adj.stem + (form.key === "past" ? "かったです" : "いです");
    wrongs.add(crossType);
    const wrongArr = [...wrongs].filter(w => w !== conjugated).sort(() => Math.random() - 0.5).slice(0, 3);
    return { type, adj, form, correct: conjugated, key,
      prompt: conjugateAdj(adj, fromKey), promptSub: direction,
      options: [...wrongArr, conjugated].sort(() => Math.random() - 0.5), optionType: "jp" };
  }

  // classify
  const correctType = adj.type === "i" ? "い-adjective" : "な-adjective";
  return { type, adj, form, correct: correctType, key, prompt: getAdjDict(adj),
    options: ["い-adjective", "な-adjective"], optionType: "en" };
}
