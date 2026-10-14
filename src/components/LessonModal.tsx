import React, { useState } from 'react';
import { X, CheckCircle, AlertCircle, HelpCircle, ChevronRight, Award, Lightbulb } from 'lucide-react';
import { Lesson } from '../types/math';
import { sound } from '../utils/audio';

interface LessonModalProps {
  lesson: Lesson | null;
  onClose: () => void;
  onCompleteExercise: (lessonId: string, isCorrect: boolean) => void;
}

export const LessonModal: React.FC<LessonModalProps> = ({
  lesson,
  onClose,
  onCompleteExercise
}) => {
  if (!lesson) return null;

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showFullSolution, setShowFullSolution] = useState<boolean>(false);

  const isCorrect = selectedOption === lesson.practiceExercise.correctAnswer;

  const handleSubmit = () => {
    if (!selectedOption) return;
    setHasSubmitted(true);
    if (isCorrect) {
      sound.playCorrect();
      onCompleteExercise(lesson.id, true);
    } else {
      sound.playWrong();
      onCompleteExercise(lesson.id, false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="lesson-title"
        className="relative w-full max-w-3xl rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Encabezado del Modal */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90 sticky top-0 z-10 backdrop-blur-md">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
              Aprende paso a paso · {lesson.topicId.toUpperCase()}
            </div>
            <h2 id="lesson-title" className="text-xl font-bold text-white tracking-tight">
              {lesson.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar lección"
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contenido con Scroll */}
        <div className="overflow-y-auto p-6 space-y-8 divide-y divide-slate-800/80 text-slate-200">
          
          {/* 1. Concepto Fundamental */}
          <section className="space-y-2">
            <div className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
              1. Concepto Fundamental
            </div>
            <p className="text-slate-200 leading-relaxed text-sm sm:text-base">
              {lesson.fundamentalConcept}
            </p>
          </section>

          {/* 2. Explicación Sencilla */}
          <section className="pt-6 space-y-2">
            <div className="text-xs font-semibold tracking-wider text-cyan-400 uppercase flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-cyan-400" />
              <span>2. Explicación Sencilla e Intuitiva</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base bg-cyan-950/20 border border-cyan-800/30 rounded-xl p-4">
              {lesson.simpleExplanation}
            </p>
          </section>

          {/* 3. Fórmula Relevante */}
          <section className="pt-6 space-y-3">
            <div className="text-xs font-semibold tracking-wider text-purple-400 uppercase">
              3. Fórmula Relevante
            </div>
            <div className="bg-slate-950 border border-purple-800/40 rounded-xl p-4 text-center">
              <div className="text-lg sm:text-xl font-mono font-semibold text-purple-300 tracking-wide">
                {lesson.relevantFormula}
              </div>
              <div className="text-xs text-slate-400 mt-2 font-sans">
                {lesson.formulaDescription}
              </div>
            </div>
          </section>

          {/* 4. Ejemplo Resuelto Paso a Paso */}
          <section className="pt-6 space-y-4">
            <div className="text-xs font-semibold tracking-wider text-indigo-400 uppercase">
              4. Ejemplo Resuelto Paso a Paso
            </div>
            
            <div className="text-sm font-medium text-slate-200 bg-slate-800/50 p-3 rounded-lg border border-slate-700/60">
              <span className="text-slate-400 font-normal">Problema: </span>
              {lesson.workedExample.problemStatement}
            </div>

            <div className="space-y-3">
              {lesson.workedExample.steps.map((st, i) => (
                <div key={i} className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 space-y-2">
                  <div className="text-xs font-semibold text-cyan-400">{st.title}</div>
                  {st.expression && (
                    <div className="font-mono text-sm bg-slate-900/90 text-amber-300 px-3 py-1.5 rounded-lg border border-slate-800 inline-block">
                      {st.expression}
                    </div>
                  )}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {st.explanation}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-emerald-300 text-sm font-semibold flex items-center justify-between">
              <span>Resultado final comprobado:</span>
              <span className="font-mono">{lesson.workedExample.finalResult}</span>
            </div>
          </section>

          {/* 5. Ejercicio para Practicar */}
          <section className="pt-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-xs font-semibold tracking-wider text-amber-400 uppercase">
                5. Ejercicio para Practicar
              </div>
              <button
                onClick={() => setShowHint(!showHint)}
                className="text-xs text-slate-400 hover:text-amber-400 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>{showHint ? 'Ocultar pista' : 'Ver pista'}</span>
              </button>
            </div>

            <div className="bg-slate-800/70 border border-slate-700/80 rounded-xl p-4 space-y-3">
              <p className="font-medium text-white text-sm sm:text-base">
                {lesson.practiceExercise.question}
              </p>

              {showHint && (
                <div className="text-xs bg-amber-950/30 text-amber-300 border border-amber-800/40 p-2.5 rounded-lg animate-fade-in">
                  💡 Pista: {lesson.practiceExercise.hint}
                </div>
              )}

              {/* Opciones interactivas */}
              {lesson.practiceExercise.options && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  {lesson.practiceExercise.options.map((option, idx) => {
                    const isSelected = selectedOption === option;
                    let optionStyle = 'bg-slate-900 border-slate-700 hover:border-cyan-500 text-slate-200';
                    
                    if (hasSubmitted) {
                      if (option === lesson.practiceExercise.correctAnswer) {
                        optionStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200';
                      } else if (isSelected && !isCorrect) {
                        optionStyle = 'bg-rose-950/60 border-rose-500 text-rose-200';
                      }
                    } else if (isSelected) {
                      optionStyle = 'bg-cyan-950/60 border-cyan-400 text-cyan-200 shadow-sm';
                    }

                    return (
                      <button
                        key={idx}
                        disabled={hasSubmitted}
                        onClick={() => setSelectedOption(option)}
                        className={`text-left p-3 rounded-xl border text-sm font-medium transition-all cursor-pointer ${optionStyle}`}
                      >
                        <span className="font-mono mr-2 text-slate-400">{String.fromCharCode(65 + idx)}.</span>
                        {option}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Botón de Comprobación */}
              <div className="pt-2 flex items-center justify-between">
                {!hasSubmitted ? (
                  <button
                    disabled={!selectedOption}
                    onClick={handleSubmit}
                    className="px-5 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 hover:from-cyan-300 hover:to-sky-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md cursor-pointer"
                  >
                    Comprobar respuesta
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    {isCorrect ? (
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                        <CheckCircle className="w-4 h-4" />
                        <span>¡Excelente! +50 XP obtenidos</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-400">
                        <AlertCircle className="w-4 h-4" />
                        <span>Respuesta incorrecta</span>
                      </div>
                    )}
                  </div>
                )}

                {hasSubmitted && (
                  <button
                    onClick={() => setShowFullSolution(!showFullSolution)}
                    className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
                  >
                    <span>{showFullSolution ? 'Ocultar solución' : 'Ver solución explicada'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </section>

          {/* 6. Solución Explicada (Requerida por el Prompt) */}
          {(showFullSolution || (hasSubmitted && !isCorrect)) && (
            <section className="pt-6 space-y-2 animate-fade-in">
              <div className="text-xs font-semibold tracking-wider text-emerald-400 uppercase flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4" />
                <span>6. Solución Explicada al Detalle</span>
              </div>
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                {lesson.solutionExplanation}
              </div>
            </section>
          )}

        </div>

        {/* Pie de modal */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-900/90 flex items-center justify-between">
          <div className="text-xs text-slate-400">
            Dificultad: <span className="font-semibold text-slate-200 capitalize">{lesson.difficulty}</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            Finalizar Lección
          </button>
        </div>
      </div>
    </div>
  );
};
