import React from 'react';
import { UserProgress, Badge } from '../types/math';
import { INITIAL_BADGES } from '../data/badges';
import { 
  Award, 
  Flame, 
  Zap, 
  CheckCircle, 
  Target, 
  RotateCcw, 
  ShieldCheck, 
  Sparkles, 
  TrendingUp,
  Clock
} from 'lucide-react';
import { sound } from '../utils/audio';

interface ProgressPanelProps {
  progress: UserProgress;
  onResetProgress: () => void;
  onLoadDemoData: () => void;
}

export const ProgressPanel: React.FC<ProgressPanelProps> = ({
  progress,
  onResetProgress,
  onLoadDemoData
}) => {
  // Cálculo de XP necesario para el próximo nivel: nivel actual * 500 XP
  const xpForNextLevel = progress.level * 500;
  const currentLevelProgress = Math.min(100, Math.round((progress.xp % 500) / 5));

  const totalExercises = progress.exercisesSolved;
  const accuracy = totalExercises > 0 
    ? Math.round((progress.correctAnswers / totalExercises) * 100) 
    : 100;

  // Temas y nombres legibles
  const topicsInfo = [
    { id: 'aritmetica', name: 'Aritmética' },
    { id: 'algebra', name: 'Álgebra' },
    { id: 'geometria', name: 'Geometría' },
    { id: 'trigonometria', name: 'Trigonometría' },
    { id: 'funciones', name: 'Funciones' },
    { id: 'estadistica', name: 'Estadística' },
    { id: 'calculo', name: 'Cálculo' }
  ];

  return (
    <section id="progreso" className="py-16 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Cabecera del Panel */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-cyan-400 uppercase mb-2">
              <Target className="w-4 h-4 text-cyan-400" />
              <span>Panel de Progreso y Maestría</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-400 font-normal">Estadísticas de Aprendizaje</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Tu Trayectoria en MathVerse
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-300">
              Visualiza tus temas dominados, insignias desbloqueadas y rendimiento general en desafíos y lecciones.
            </p>
          </div>

          {/* Botones de gestión de datos */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                onLoadDemoData();
                sound.playClick();
              }}
              className="px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl transition-colors cursor-pointer"
            >
              Cargar Demostración
            </button>
            <button
              onClick={() => {
                if (confirm('¿Deseas reiniciar tu progreso en este dispositivo?')) {
                  onResetProgress();
                }
              }}
              className="px-3.5 py-2 text-xs font-semibold text-rose-400 hover:text-rose-300 bg-rose-950/20 hover:bg-rose-950/40 border border-rose-900/40 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reiniciar</span>
            </button>
          </div>
        </div>

        {/* Tarjetas Principales de Métricas (KPIs) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          {/* Nivel Actual */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold uppercase tracking-wider">Rango / Nivel</span>
              <Award className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-3xl font-extrabold text-white font-mono">
              Nivel {progress.level}
            </div>
            {/* Barra de progreso al siguiente nivel */}
            <div className="space-y-1">
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full"
                  style={{ width: `${currentLevelProgress}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>{progress.xp} XP</span>
                <span>{xpForNextLevel} XP</span>
              </div>
            </div>
          </div>

          {/* Ejercicios Resueltos */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold uppercase tracking-wider">Ejercicios Resueltos</span>
              <CheckCircle className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-extrabold text-white font-mono">
              {progress.exercisesSolved}
            </div>
            <div className="text-xs text-slate-400">
              {progress.correctAnswers} respuestas correctas
            </div>
          </div>

          {/* Precisión % */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold uppercase tracking-wider">Precisión General</span>
              <TrendingUp className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-3xl font-extrabold text-white font-mono">
              {accuracy}%
            </div>
            <div className="text-xs text-slate-400">
              Tasa de acierto global
            </div>
          </div>

          {/* Racha Máxima */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold uppercase tracking-wider">Racha Récord</span>
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
            </div>
            <div className="text-3xl font-extrabold text-amber-400 font-mono">
              {progress.highestStreak}x
            </div>
            <div className="text-xs text-slate-400">
              Respuestas consecutivas sin fallar
            </div>
          </div>

        </div>

        {/* Sección: Dominio de Temas & Historial Reciente */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Dominio por Temas (7 categorías) */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Target className="w-4 h-4 text-cyan-400" />
                <span>Dominio por Categorías Curriculares</span>
              </h3>
              <span className="text-xs text-slate-400 font-mono">7 Temas</span>
            </div>

            <div className="space-y-4">
              {topicsInfo.map((topic) => {
                const mastery = progress.topicMastery[topic.id as keyof typeof progress.topicMastery] || 0;
                return (
                  <div key={topic.id} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-slate-200">{topic.name}</span>
                      <span className="font-mono font-bold text-cyan-400">{mastery}%</span>
                    </div>
                    <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full transition-all duration-500"
                        style={{ width: `${mastery}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Historial de Actividad Reciente */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-400" />
                <span>Actividad Reciente</span>
              </h3>
              <span className="text-xs text-slate-400 font-mono">Últimas acciones</span>
            </div>

            {progress.activityHistory.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-500">
                Aún no has registrado actividad. ¡Prueba un ejercicio en el Laboratorio o la Zona de Desafíos!
              </div>
            ) : (
              <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
                {progress.activityHistory.slice(0, 6).map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div className="space-y-0.5">
                      <div className="font-semibold text-slate-200">{item.title}</div>
                      <div className="text-[11px] text-slate-400 capitalize">{item.type}</div>
                    </div>
                    <div className="text-right">
                      {item.scoreGained ? (
                        <span className="font-mono font-bold text-emerald-400">+{item.scoreGained} XP</span>
                      ) : (
                        <span className="text-slate-500">Completado</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Vitrina de Insignias y Logros */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <span>Insignias y Trofeos Matemáticos</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Desbloquea logros explorando el laboratorio y manteniendo rachas en los desafíos.
              </p>
            </div>
            <div className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-xl">
              {progress.unlockedBadges.length} / {INITIAL_BADGES.length} Desbloqueadas
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {INITIAL_BADGES.map((badge) => {
              const isUnlocked = progress.unlockedBadges.includes(badge.id);

              return (
                <div
                  key={badge.id}
                  className={`p-4 rounded-2xl border transition-all duration-200 space-y-2 ${
                    isUnlocked
                      ? 'bg-slate-950/90 border-amber-500/40 shadow-lg shadow-amber-500/5'
                      : 'bg-slate-950/40 border-slate-800/80 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      isUnlocked 
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' 
                        : 'bg-slate-800 text-slate-500'
                    }`}>
                      <Award className="w-5 h-5" />
                    </div>

                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                      {isUnlocked ? 'Desbloqueado' : 'Bloqueado'}
                    </span>
                  </div>

                  <div className="text-sm font-bold text-white">{badge.title}</div>
                  <p className="text-xs text-slate-400 leading-relaxed">{badge.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Nota de Privacidad y Almacenamiento Local (Requerimiento explícito del Prompt) */}
        <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center gap-3 text-xs text-slate-400">
          <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
          <span>
            <strong>Privacidad de Datos:</strong> Toda tu actividad, insignias y progreso se almacenan únicamente en el almacenamiento local de tu navegador (localStorage). No se transmiten datos personales ni se requiere crear una cuenta externa.
          </span>
        </div>

      </div>
    </section>
  );
};
