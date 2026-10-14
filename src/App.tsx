/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TopicExplorer } from './components/TopicExplorer';
import { MathLab } from './components/MathLab/MathLab';
import { ChallengeZone } from './components/ChallengeZone';
import { ProgressPanel } from './components/ProgressPanel';
import { LessonModal } from './components/LessonModal';
import { Footer } from './components/Footer';
import { UserProgress, Lesson, TopicId } from './types/math';
import { TOPICS_DATA } from './data/topics';
import { sound } from './utils/audio';

const STORAGE_KEY = 'mathverse_user_progress_v1';

const DEFAULT_PROGRESS: UserProgress = {
  xp: 0,
  level: 1,
  streak: 0,
  highestStreak: 0,
  exercisesSolved: 0,
  correctAnswers: 0,
  topicMastery: {
    aritmetica: 15,
    algebra: 10,
    geometria: 5,
    trigonometria: 0,
    funciones: 0,
    estadistica: 0,
    calculo: 0
  },
  unlockedBadges: [],
  activityHistory: [],
  soundEnabled: true,
  theme: 'dark'
};

export default function App() {
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return DEFAULT_PROGRESS;
  });

  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);

  // Guardar en localStorage ante cualquier cambio
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {}
  }, [progress]);

  // Sincronizar el estado del motor de sonido
  useEffect(() => {
    sound.setMuted(!progress.soundEnabled);
  }, [progress.soundEnabled]);

  // Comprobar y otorgar insignias automáticamente
  const checkBadges = (currentProgress: UserProgress) => {
    const newlyUnlocked: string[] = [];

    if (currentProgress.exercisesSolved >= 1 && !currentProgress.unlockedBadges.includes('primer-paso')) {
      newlyUnlocked.push('primer-paso');
    }
    if (currentProgress.highestStreak >= 3 && !currentProgress.unlockedBadges.includes('racha-fuego-3')) {
      newlyUnlocked.push('racha-fuego-3');
    }
    if (currentProgress.highestStreak >= 7 && !currentProgress.unlockedBadges.includes('racha-fuego-7')) {
      newlyUnlocked.push('racha-fuego-7');
    }
    if (currentProgress.xp >= 1000 && !currentProgress.unlockedBadges.includes('centurio-puntos')) {
      newlyUnlocked.push('centurio-puntos');
    }

    if (newlyUnlocked.length > 0) {
      sound.playBadgeUnlock();
      return [...currentProgress.unlockedBadges, ...newlyUnlocked];
    }
    return currentProgress.unlockedBadges;
  };

  // Otorgar XP y registrar actividad
  const handleAwardXp = (amount: number, topicId?: string, isCorrect: boolean = true) => {
    setProgress((prev) => {
      const newXp = prev.xp + amount;
      const newLevel = Math.max(1, Math.floor(newXp / 500) + 1);
      const newExercisesSolved = prev.exercisesSolved + 1;
      const newCorrectAnswers = isCorrect ? prev.correctAnswers + 1 : prev.correctAnswers;

      // Actualizar maestría del tema específico
      const updatedMastery = { ...prev.topicMastery };
      if (topicId && topicId in updatedMastery && isCorrect) {
        const tid = topicId as TopicId;
        updatedMastery[tid] = Math.min(100, (updatedMastery[tid] || 0) + 10);
      }

      // Nuevo registro de actividad
      const newActivity = {
        id: `act-${Date.now()}`,
        timestamp: Date.now(),
        type: topicId ? ('challenge' as const) : ('lab' as const),
        title: isCorrect ? `Ejercicio resuelto con éxito` : `Intento de ejercicio`,
        scoreGained: amount,
        success: isCorrect
      };

      const updatedProgress: UserProgress = {
        ...prev,
        xp: newXp,
        level: newLevel,
        exercisesSolved: newExercisesSolved,
        correctAnswers: newCorrectAnswers,
        topicMastery: updatedMastery,
        activityHistory: [newActivity, ...prev.activityHistory.slice(0, 19)]
      };

      updatedProgress.unlockedBadges = checkBadges(updatedProgress);
      return updatedProgress;
    });
  };

  // Actualizar racha
  const handleUpdateStreak = (newStreak: number) => {
    setProgress((prev) => {
      const highest = Math.max(prev.highestStreak, newStreak);
      const updated: UserProgress = {
        ...prev,
        streak: newStreak,
        highestStreak: highest
      };
      updated.unlockedBadges = checkBadges(updated);
      return updated;
    });
  };

  // Alternar tema oscuro / claro
  const handleToggleTheme = () => {
    sound.playClick();
    setProgress((prev) => ({
      ...prev,
      theme: prev.theme === 'dark' ? 'light' : 'dark'
    }));
  };

  // Alternar sonido
  const handleToggleSound = () => {
    setProgress((prev) => {
      const nextSound = !prev.soundEnabled;
      sound.setMuted(!nextSound);
      return { ...prev, soundEnabled: nextSound };
    });
  };

  // Navegación suave
  const handleNavigate = (sectionId: string) => {
    sound.playClick();
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Reiniciar progreso
  const handleResetProgress = () => {
    sound.playClick();
    localStorage.removeItem(STORAGE_KEY);
    setProgress({ ...DEFAULT_PROGRESS, theme: progress.theme, soundEnabled: progress.soundEnabled });
  };

  // Cargar datos de demostración
  const handleLoadDemoData = () => {
    sound.playStreak();
    const demoData: UserProgress = {
      xp: 1450,
      level: 3,
      streak: 5,
      highestStreak: 7,
      exercisesSolved: 18,
      correctAnswers: 16,
      topicMastery: {
        aritmetica: 85,
        algebra: 70,
        geometria: 55,
        trigonometria: 40,
        funciones: 30,
        estadistica: 45,
        calculo: 20
      },
      unlockedBadges: ['primer-paso', 'racha-fuego-3', 'racha-fuego-7', 'centurio-puntos', 'maestro-algebra'],
      activityHistory: [
        { id: '1', timestamp: Date.now() - 3600000, type: 'challenge', title: 'Desafío Álgebra Cuadrática', scoreGained: 200, success: true },
        { id: '2', timestamp: Date.now() - 7200000, type: 'lesson', title: 'Lección: Teorema de Pitágoras', scoreGained: 50, success: true },
        { id: '3', timestamp: Date.now() - 10800000, type: 'lab', title: 'Cálculo de volumen de Cono', scoreGained: 100, success: true }
      ],
      soundEnabled: progress.soundEnabled,
      theme: progress.theme
    };
    setProgress(demoData);
  };

  const isDark = progress.theme === 'dark';

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark 
        ? 'bg-[#0B1120] text-slate-100 selection:bg-cyan-500 selection:text-slate-950' 
        : 'bg-[#F8FAFC] text-slate-900 selection:bg-cyan-400 selection:text-slate-950 light-theme'
    }`}>
      
      {/* Barra de navegación superior con Top Bar Contract */}
      <Navbar
        theme={progress.theme}
        onToggleTheme={handleToggleTheme}
        soundEnabled={progress.soundEnabled}
        onToggleSound={handleToggleSound}
        currentStreak={progress.streak}
        xp={progress.xp}
        onNavigate={handleNavigate}
      />

      {/* Contenido principal */}
      <main>
        {/* Sección 1: Hero con animaciones de ecuaciones y llamados a la acción */}
        <Hero
          onStartLearning={() => handleNavigate('temas')}
          onStartChallenge={() => handleNavigate('desafios')}
          onExploreLab={() => handleNavigate('laboratorio')}
        />

        {/* Sección 2: Explorador de 7 Temas Curriculares */}
        <TopicExplorer
          onSelectLesson={(lesson) => setActiveLesson(lesson)}
          onOpenLabTool={() => handleNavigate('laboratorio')}
        />

        {/* Sección 3: Laboratorio Matemático Interactivo (6 Herramientas) */}
        <MathLab
          onAwardXp={(amt) => handleAwardXp(amt, undefined, true)}
        />

        {/* Sección 4: Zona de Desafíos Gamificados (Arcade Mode) */}
        <ChallengeZone
          currentStreak={progress.streak}
          onUpdateStreak={handleUpdateStreak}
          onAwardXp={(amt, topicId, isCorrect) => handleAwardXp(amt, topicId, isCorrect)}
        />

        {/* Sección 5: Panel de Progreso y Maestría */}
        <ProgressPanel
          progress={progress}
          onResetProgress={handleResetProgress}
          onLoadDemoData={handleLoadDemoData}
        />
      </main>

      {/* Pie de página con FAQ y nota educativa */}
      <Footer onNavigate={handleNavigate} />

      {/* Modal de Lección Guiada Paso a Paso */}
      <LessonModal
        lesson={activeLesson}
        onClose={() => setActiveLesson(null)}
        onCompleteExercise={(lessonId, isCorrect) => {
          if (isCorrect) {
            handleAwardXp(50, activeLesson?.topicId, true);
          }
        }}
      />

    </div>
  );
}
