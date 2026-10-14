export type TopicId = 
  | 'aritmetica'
  | 'algebra'
  | 'geometria'
  | 'trigonometria'
  | 'funciones'
  | 'estadistica'
  | 'calculo';

export type DifficultyLevel = 'facil' | 'intermedio' | 'avanzado';

export interface StepExplanation {
  title: string;
  expression?: string;
  explanation: string;
}

export interface PracticeExercise {
  question: string;
  formulaHint?: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  hint: string;
}

export interface Lesson {
  id: string;
  topicId: TopicId;
  title: string;
  subtitle: string;
  difficulty: DifficultyLevel;
  // Prompt required structure:
  // 1. Concepto fundamental
  fundamentalConcept: string;
  // 2. Explicación sencilla
  simpleExplanation: string;
  // 3. Fórmula relevante
  relevantFormula: string;
  formulaDescription: string;
  // 4. Ejemplo resuelto paso a paso
  workedExample: {
    problemStatement: string;
    steps: StepExplanation[];
    finalResult: string;
  };
  // 5. Ejercicio para practicar
  practiceExercise: PracticeExercise;
  // 6. Solución explicada
  solutionExplanation: string;
}

export interface TopicCategory {
  id: TopicId;
  title: string;
  shortDesc: string;
  difficultyLabel: string;
  difficulty: DifficultyLevel;
  iconName: string;
  accentColor: string;
  lessonsCount: number;
  featuredFormula: string;
  subtopics: string[];
  lessons: Lesson[];
}

export interface ChallengeQuestion {
  id: string;
  topicId: TopicId;
  topicName: string;
  difficulty: DifficultyLevel;
  question: string;
  latexFormula?: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  points: number;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  category: 'challenge' | 'lab' | 'streak' | 'mastery';
}

export interface ActivityRecord {
  id: string;
  timestamp: number;
  type: 'challenge' | 'lesson' | 'lab';
  title: string;
  scoreGained?: number;
  success: boolean;
}

export interface UserProgress {
  xp: number;
  level: number;
  streak: number;
  highestStreak: number;
  exercisesSolved: number;
  correctAnswers: number;
  topicMastery: Record<TopicId, number>; // 0 to 100
  unlockedBadges: string[];
  activityHistory: ActivityRecord[];
  soundEnabled: boolean;
  theme: 'dark' | 'light';
}
