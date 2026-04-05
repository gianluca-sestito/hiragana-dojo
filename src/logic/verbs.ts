import { VERBS, VERB_FORMS } from "../data/verbs";
import type { Verb, VerbForm } from "../data/verbs";

export interface VerbExercise {
  key: string;
  type: "en2jp" | "jp2en" | "jp2form" | "stem";
  verb: Verb;
  form: VerbForm;
  correct: string;
  prompt: string;
  options: string[];
  optionType: "jp" | "en";
}

function conjugate(verb: Verb, form: VerbForm): string {
  return verb.stem + form.suffix;
}

function getSimilarVerbs(verb: Verb, n: number): Verb[] {
  return [...VERBS]
    .filter(v => v.stem !== verb.stem)
    .map(v => ({
      ...v,
      _sim: v.stem.length === verb.stem.length ? 2
        : Math.abs(v.stem.length - verb.stem.length) === 1 ? 1
        : v.stem[0] === verb.stem[0] ? 1 : 0,
    }))
    .sort((a, b) => b._sim - a._sim || Math.random() - 0.5)
    .slice(0, n);
}

function makeEnPrompt(verb: Verb, form: VerbForm): string {
  return form.enPrefix + verb.en;
}

export function generateVerbExercise(
  recentKeys: string[],
  activeForms: string[],
): VerbExercise | null {
  const forms = VERB_FORMS.filter(f => activeForms.includes(f.key));
  if (forms.length === 0) return null;

  let verb: Verb, form: VerbForm, key: string;
  let attempts = 0;
  do {
    verb = VERBS[Math.floor(Math.random() * VERBS.length)];
    form = forms[Math.floor(Math.random() * forms.length)];
    key = verb.stem + form.key;
    attempts++;
  } while (recentKeys.includes(key) && attempts < 40);

  const conjugated = conjugate(verb, form);
  const types = ["en2jp", "jp2en", "jp2form", "stem"] as const;
  const type = types[Math.floor(Math.random() * types.length)];

  if (type === "en2jp") {
    const wrongs = new Set<string>();
    getSimilarVerbs(verb, 4).forEach(v => wrongs.add(conjugate(v, form)));
    forms.filter(f => f.key !== form.key).forEach(f => wrongs.add(conjugate(verb, f)));
    const wrongArr = [...wrongs].filter(w => w !== conjugated).sort(() => Math.random() - 0.5).slice(0, 3);
    return { type, verb, form, correct: conjugated, key, prompt: makeEnPrompt(verb, form),
      options: [...wrongArr, conjugated].sort(() => Math.random() - 0.5), optionType: "jp" };
  }

  if (type === "jp2en") {
    const wrongEns = getSimilarVerbs(verb, 3).map(v => makeEnPrompt(v, form));
    const correctEn = makeEnPrompt(verb, form);
    return { type, verb, form, correct: correctEn, key, prompt: conjugated,
      options: [...wrongEns, correctEn].sort(() => Math.random() - 0.5), optionType: "en" };
  }

  if (type === "jp2form") {
    const formLabels: Record<string, string> = {};
    VERB_FORMS.forEach(f => { formLabels[f.key] = f.label; });
    const correct = formLabels[form.key];
    let wrongForms = forms.filter(f => f.key !== form.key).map(f => formLabels[f.key]);
    if (wrongForms.length < 2) {
      wrongForms = [
        ...wrongForms,
        ...VERB_FORMS.filter(f => !activeForms.includes(f.key) && f.key !== form.key).map(f => f.label),
      ];
    }
    return { type, verb, form, correct, key, prompt: conjugated,
      options: [...wrongForms.slice(0, 3), correct].sort(() => Math.random() - 0.5), optionType: "en" };
  }

  // stem
  const wrongEns = getSimilarVerbs(verb, 3).map(v => v.en);
  return { type, verb, form, correct: verb.en, key, prompt: conjugated,
    options: [...wrongEns, verb.en].sort(() => Math.random() - 0.5), optionType: "en" };
}
