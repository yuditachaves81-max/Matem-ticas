import React, { useState } from 'react';
import { generateRandomChallenge } from '../../data/challenges';
import { ChallengeQuestion, DifficultyLevel, TopicId } from '../../types/math';
import { sound } from '../../utils/audio';
import { Sparkles, HelpCircle, CheckCircle, AlertCircle, RefreshCw, ChevronRight } from 'lucide-react';

interface ExerciseGeneratorProps {
  onAwardXp: (amount: number) => void;
}

export const ExerciseGenerator: React.FC<ExerciseGeneratorProps> = ({ onAwardXp }) => {
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('intermedio');
  const [topicFilter, setTopicFilter] = useState<TopicId | 'todos'>('todos');
  
  const [exercise, setExercise] = useState<ChallengeQuestion>(() =>
    generateRandomChallenge('intermedio')
  );

  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [hasChecked, setHasChecked] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);

  const isCorrect = selectedOpt === exercise.correctOptionIndex;

  const handleGenerate = () => {
    sound.playClick();
    const filter = topicFilter === 'todos' ? undefined : topicFilter;
    setExercise(generateRandomChallenge(difficulty, filter));
    setSelectedOpt(null);
    setHasChecked(false);
    setShowHint(false);
  };

  const handleCheck = () => {
    if (selectedOpt === null) return;
    setHasChecked(true);
    if (isCorrect) {
      sound.playCorrect();
      onAwardXp(exercise.points);
    } else {
      sound.playWrong();
    }
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      
      {/* Controles de Configuración y Filtros */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Generador de Práctica Deliberada</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Configura el nivel y el tema para crear ejercicios matemáticos ilimitados.
            </p>
          </div>

          <button
            onClick={handleGenerate}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 transition-all shadow-md cursor-pointer active:scale-95 whitespace-nowrap"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Generar Otro Ejercicio</span>
          </button>
        </div>

        {/* Filtros de Tema y Dificultad */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              Dificultad
            </label>
            <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800">
              {(['facil', 'intermedio', 'avanzado'] as DifficultyLevel[]).map((dif) => (
                <button
                  key={dif}
                  onClick={() => {
                    setDifficulty(dif);
                    sound.playClick();
                  }}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg capitalize transition-colors cursor-pointer ${
                    difficulty === dif
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {dif}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              Área de Enfoque
            </label>
            <select
              value={topicFilter}
              onChange={(e) => {
                setTopicFilter(e.target.value as TopicId | 'todos');
                sound.playClick();
              }}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-medium outline-none focus:border-cyan-400 cursor-pointer"
            >
              <option value="todos">Todas las Áreas Matemáticas</option>
              <option value="aritmetica">Aritmética</option>
              <option value="algebra">Álgebra</option>
              <option value="geometria">Geometría</option>
              <option value="trigonometria">Trigonometría</option>
              <option value="funciones">Funciones</option>
              <option value="estadistica">Estadística</option>
              <option value="calculo">Cálculo</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tarjeta del Ejercicio Activo */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
        
        {/* Metadatos del ejercicio */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-cyan-400 font-semibold uppercase tracking-wider">
            <span>{exercise.topicName}</span>
            <span aria-hidden="true">·</span>
            <span className="capitalize text-slate-400 font-normal">{exercise.difficulty}</span>
          </div>

          <div className="font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-lg">
            +{exercise.points} XP
          </div>
        </div>

        {/* Enunciado del problema */}
        <div className="space-y-3">
          <h4 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
            {exercise.question}
          </h4>

          {exercise.latexFormula && (
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-center">
              <span className="font-mono text-cyan-300 font-semibold text-base">
                {exercise.latexFormula}
              </span>
            </div>
          )}
        </div>

        {/* Opciones de respuesta */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {exercise.options.map((option, idx) => {
            const isSelected = selectedOpt === idx;
            let style = 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-200';

            if (hasChecked) {
              if (idx === exercise.correctOptionIndex) {
                style = 'bg-emerald-950/60 border-emerald-500 text-emerald-200';
              } else if (isSelected && !isCorrect) {
                style = 'bg-rose-950/60 border-rose-500 text-rose-200';
              }
            } else if (isSelected) {
              style = 'bg-cyan-950/60 border-cyan-400 text-cyan-200';
            }

            return (
              <button
                key={idx}
                disabled={hasChecked}
                onClick={() => {
                  setSelectedOpt(idx);
                  sound.playClick();
                }}
                className={`p-4 rounded-xl border text-sm font-medium text-left transition-all cursor-pointer ${style}`}
              >
                <span className="font-mono text-slate-400 mr-2.5 font-bold">
                  {String.fromCharCode(65 + idx)}.
                </span>
                {option}
              </button>
            );
          })}
        </div>

        {/* Botón de Comprobación y Retroalimentación */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          {!hasChecked ? (
            <button
              disabled={selectedOpt === null}
              onClick={handleCheck}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-semibold text-xs text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md cursor-pointer"
            >
              Comprobar Respuesta
            </button>
          ) : (
            <div className="flex items-center gap-2">
              {isCorrect ? (
                <div className="flex items-center gap-2 text-sm font-semibold text-emerald-400">
                  <CheckCircle className="w-5 h-5" />
                  <span>¡Excelente resolución! Has ganado +{exercise.points} XP</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-sm font-semibold text-rose-400">
                  <AlertCircle className="w-5 h-5" />
                  <span>Respuesta incorrecta. Revisa el procedimiento abajo.</span>
                </div>
              )}
            </div>
          )}

          {hasChecked && (
            <button
              onClick={handleGenerate}
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
            >
              <span>Siguiente Ejercicio</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Explicación después de la respuesta */}
        {hasChecked && (
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2 animate-fade-in">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4" />
              <span>Procedimiento y Justificación</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              {exercise.explanation}
            </p>
          </div>
        )}

      </div>

    </div>
  );
};
