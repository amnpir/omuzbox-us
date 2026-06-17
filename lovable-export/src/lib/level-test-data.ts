import type { Lang } from "@/lib/lang";

export type TestMode = "quick" | "standard" | "extended";
export type CefrLevel = "A1" | "A2" | "B1" | "B2" | "C1";

export const MODE_CONFIG: Record<
  TestMode,
  { questions: number; time: { en: string; ru: string }; label: { en: string; ru: string } }
> = {
  quick: {
    questions: 5,
    time: { en: "5 min", ru: "5 мин" },
    label: { en: "Quick check", ru: "Быстрый" },
  },
  standard: {
    questions: 10,
    time: { en: "15 min", ru: "15 мин" },
    label: { en: "Standard", ru: "Стандарт" },
  },
  extended: {
    questions: 15,
    time: { en: "25 min", ru: "25 мин" },
    label: { en: "Extended", ru: "Расширенный" },
  },
};

type Bilingual = { en: string; ru: string };

export interface LevelQuestion {
  id: string;
  prompt: Bilingual;
  options: Array<{ text: Bilingual }>;
  correctIndex: number;
  /** Question difficulty 1=A1 … 5=C1 */
  difficulty: number;
}

export const QUESTION_BANK: LevelQuestion[] = [
  {
    id: "q1",
    prompt: { en: "Choose the correct word: I ___ a student.", ru: "Выберите слово: I ___ a student." },
    options: [
      { text: { en: "am", ru: "am" } },
      { text: { en: "is", ru: "is" } },
      { text: { en: "are", ru: "are" } },
      { text: { en: "be", ru: "be" } },
    ],
    correctIndex: 0,
    difficulty: 1,
  },
  {
    id: "q2",
    prompt: { en: "She ___ to work every day.", ru: "She ___ to work every day." },
    options: [
      { text: { en: "go", ru: "go" } },
      { text: { en: "goes", ru: "goes" } },
      { text: { en: "going", ru: "going" } },
      { text: { en: "gone", ru: "gone" } },
    ],
    correctIndex: 1,
    difficulty: 2,
  },
  {
    id: "q3",
    prompt: { en: "I have ___ finished my homework.", ru: "I have ___ finished my homework." },
    options: [
      { text: { en: "yet", ru: "yet" } },
      { text: { en: "already", ru: "already" } },
      { text: { en: "since", ru: "since" } },
      { text: { en: "ever", ru: "ever" } },
    ],
    correctIndex: 1,
    difficulty: 3,
  },
  {
    id: "q4",
    prompt: { en: "If I ___ more time, I would travel more.", ru: "If I ___ more time, I would travel more." },
    options: [
      { text: { en: "have", ru: "have" } },
      { text: { en: "had", ru: "had" } },
      { text: { en: "will have", ru: "will have" } },
      { text: { en: "would have", ru: "would have" } },
    ],
    correctIndex: 1,
    difficulty: 4,
  },
  {
    id: "q5",
    prompt: { en: "The meeting was ___ than we expected.", ru: "The meeting was ___ than we expected." },
    options: [
      { text: { en: "more long", ru: "more long" } },
      { text: { en: "longer", ru: "longer" } },
      { text: { en: "most long", ru: "most long" } },
      { text: { en: "longest", ru: "longest" } },
    ],
    correctIndex: 1,
    difficulty: 3,
  },
  {
    id: "q6",
    prompt: { en: "By next year, she ___ her degree.", ru: "By next year, she ___ her degree." },
    options: [
      { text: { en: "will finish", ru: "will finish" } },
      { text: { en: "finishes", ru: "finishes" } },
      { text: { en: "will have finished", ru: "will have finished" } },
      { text: { en: "is finishing", ru: "is finishing" } },
    ],
    correctIndex: 2,
    difficulty: 4,
  },
  {
    id: "q7",
    prompt: { en: "He asked me where I ___.", ru: "He asked me where I ___." },
    options: [
      { text: { en: "live", ru: "live" } },
      { text: { en: "lived", ru: "lived" } },
      { text: { en: "am living", ru: "am living" } },
      { text: { en: "was living", ru: "was living" } },
    ],
    correctIndex: 1,
    difficulty: 3,
  },
  {
    id: "q8",
    prompt: { en: "I'd rather you ___ smoke here.", ru: "I'd rather you ___ smoke here." },
    options: [
      { text: { en: "don't", ru: "don't" } },
      { text: { en: "not", ru: "not" } },
      { text: { en: "didn't", ru: "didn't" } },
      { text: { en: "won't", ru: "won't" } },
    ],
    correctIndex: 2,
    difficulty: 4,
  },
  {
    id: "q9",
    prompt: { en: "The report needs to be ___ by Friday.", ru: "The report needs to be ___ by Friday." },
    options: [
      { text: { en: "submit", ru: "submit" } },
      { text: { en: "submitted", ru: "submitted" } },
      { text: { en: "submitting", ru: "submitting" } },
      { text: { en: "submits", ru: "submits" } },
    ],
    correctIndex: 1,
    difficulty: 3,
  },
  {
    id: "q10",
    prompt: { en: "Not only ___ late, but he also forgot the documents.", ru: "Not only ___ late, but he also forgot the documents." },
    options: [
      { text: { en: "he was", ru: "he was" } },
      { text: { en: "was he", ru: "was he" } },
      { text: { en: "he is", ru: "he is" } },
      { text: { en: "is he", ru: "is he" } },
    ],
    correctIndex: 1,
    difficulty: 5,
  },
  {
    id: "q11",
    prompt: { en: "She's the person ___ I trust most.", ru: "She's the person ___ I trust most." },
    options: [
      { text: { en: "who", ru: "who" } },
      { text: { en: "which", ru: "which" } },
      { text: { en: "whom", ru: "whom" } },
      { text: { en: "whose", ru: "whose" } },
    ],
    correctIndex: 2,
    difficulty: 4,
  },
  {
    id: "q12",
    prompt: { en: "Hardly ___ when the phone rang.", ru: "Hardly ___ when the phone rang." },
    options: [
      { text: { en: "I had arrived", ru: "I had arrived" } },
      { text: { en: "had I arrived", ru: "had I arrived" } },
      { text: { en: "I arrived", ru: "I arrived" } },
      { text: { en: "did I arrive", ru: "did I arrive" } },
    ],
    correctIndex: 1,
    difficulty: 5,
  },
  {
    id: "q13",
    prompt: { en: "The proposal was met with ___ skepticism.", ru: "The proposal was met with ___ skepticism." },
    options: [
      { text: { en: "considerable", ru: "considerable" } },
      { text: { en: "considerably", ru: "considerably" } },
      { text: { en: "considering", ru: "considering" } },
      { text: { en: "considered", ru: "considered" } },
    ],
    correctIndex: 0,
    difficulty: 4,
  },
  {
    id: "q14",
    prompt: { en: "Had I known, I ___ you sooner.", ru: "Had I known, I ___ you sooner." },
    options: [
      { text: { en: "would call", ru: "would call" } },
      { text: { en: "would have called", ru: "would have called" } },
      { text: { en: "called", ru: "called" } },
      { text: { en: "had called", ru: "had called" } },
    ],
    correctIndex: 1,
    difficulty: 5,
  },
  {
    id: "q15",
    prompt: { en: "The findings are ___ to those of earlier studies.", ru: "The findings are ___ to those of earlier studies." },
    options: [
      { text: { en: "comparable", ru: "comparable" } },
      { text: { en: "comparing", ru: "comparing" } },
      { text: { en: "compared", ru: "compared" } },
      { text: { en: "comparison", ru: "comparison" } },
    ],
    correctIndex: 0,
    difficulty: 5,
  },
];

export function pickQuestions(mode: TestMode): LevelQuestion[] {
  return QUESTION_BANK.slice(0, MODE_CONFIG[mode].questions);
}

export function computeScore(questions: LevelQuestion[], answers: number[]): number {
  let earned = 0;
  let max = 0;
  questions.forEach((q, i) => {
    max += q.difficulty;
    if (answers[i] === q.correctIndex) earned += q.difficulty;
  });
  return max === 0 ? 0 : earned / max;
}

export function scoreToCefr(ratio: number): CefrLevel {
  if (ratio < 0.35) return "A1";
  if (ratio < 0.5) return "A2";
  if (ratio < 0.65) return "B1";
  if (ratio < 0.8) return "B2";
  return "C1";
}

export function cefrDescription(level: CefrLevel, lang: Lang): string {
  const map: Record<CefrLevel, Bilingual> = {
    A1: {
      en: "Beginner — you understand basic phrases and can introduce yourself.",
      ru: "Начальный — понимаете простые фразы, можете представиться.",
    },
    A2: {
      en: "Elementary — you handle everyday situations and simple conversations.",
      ru: "Элементарный — справляетесь с повседневными ситуациями.",
    },
    B1: {
      en: "Intermediate — you discuss familiar topics and travel with confidence.",
      ru: "Средний — обсуждаете знакомые темы, путешествуете с уверенностью.",
    },
    B2: {
      en: "Upper intermediate — you work, study, and debate complex topics in English.",
      ru: "Выше среднего — работаете, учитесь и обсуждаете сложные темы.",
    },
    C1: {
      en: "Advanced — you use English flexibly for professional and academic goals.",
      ru: "Продвинутый — гибко используете английский в работе и учёбе.",
    },
  };
  return lang === "RU" ? map[level].ru : map[level].en;
}

export function tBi(lang: Lang, text: Bilingual) {
  return lang === "RU" ? text.ru : text.en;
}
