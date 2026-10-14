import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { STATIC_CHALLENGES, generateRandomChallenge } from '../data/challenges';
import { ChallengeQuestion, DifficultyLevel } from '../types/math';
import { sound } from '../utils/audio';
import { 
  Swords, 
  Flame, 
  Timer, 
  Award, 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  Play, 
  RotateCcw,
  Volume2,
  Zap
} from 'lucide-react';

interface ChallengeZoneProps {
  currentStreak: number;
  onUpdateStreak: (newStreak: number) => void;
  onAwardXp: (amount: number, topicId: string, isCorrect: boolean) => void;
}

export const ChallengeZone: React.FC<ChallengeZoneProps> = ({
  currentStreak,
  onUpdateStreak,
  onAwardXp
}) => {
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('intermedio');
  const [timerEnabled, setTimerEnabled] = useState<boolean>(true);
  const [timeLeft, setTimeLeft] = useState<number>(45);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [sessionScore, setSessionScore] = useState<number>(0);
  const [sessionQuestionsAnswered, setSessionQuestionsAnswered] = useState<number>(0);
  const [sessionCorrectCount, setSessionCorrectCount] = useState<number>(0);

  const [currentQuestion, setCurrentQuestion] = useState<ChallengeQuestion | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Iniciar o reiniciar partida Arcade
  const startGame = () => {
    sound.playStreak();
    setIsPlaying(true);
    setSessionScore(0);
    setSessionQuestionsAnswered(0);
    setSessionCorrectCount(0);
    loadNextQuestion();
  };

  const loadNextQuestion = () => {
    const q = generateRandomChallenge(difficulty);
    setCurrentQuestion(q);
    setSelectedOption(null);
    setHasAnswered(false);
    setTimeLeft(difficulty === 'facil' ? 50 : difficulty === 'intermedio' ? 40 : 30);
  };

  // Manejo del temporizador
  useEffect(() => {
    if (!isPlaying || !timerEnabled || hasAnswered) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 5 && prev > 1) {
          sound.playTick();
        }
        if (prev <= 1) {
          // Tiempo agotado = respuesta incorrecta
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, timerEnabled, hasAnswered, currentQuestion]);

  const handleTimeOut = () => {
    if (hasAnswered) return;
    setHasAnswered(true);
    sound.playWrong();
    onUpdateStreak(0);
    if (currentQuestion) {
      onAwardXp(0, currentQuestion.topicId, false);
    }
  };

  const handleSelectAnswer = (optionIdx: number) => {
    if (hasAnswered || !currentQuestion) return;
    setSelectedOption(optionIdx);
    setHasAnswered(true);

    const isCorrect = optionIdx === currentQuestion.correctOptionIndex;
    setSessionQuestionsAnswered((prev) => prev + 1);

    if (isCorrect) {
      const nextStreak = currentStreak + 1;
      onUpdateStreak(nextStreak);
      setSessionCorrectCount((prev) => prev + 1);

      // Multiplicador de racha: 1x, 1.5x (racha>=3), 2x (racha>=5), 3x (racha>=8)
      let multiplier = 1;
      if (nextStreak >= 8) multiplier = 3;
      else if (nextStreak >= 5) multiplier = 2;
      else if (nextStreak >= 3) multiplier = 1.5;

      const earnedPoints = Math.round(currentQuestion.points * multiplier);
      setSessionScore((prev) => prev + earnedPoints);

      sound.playCorrect();
      if (nextStreak === 3 || nextStreak === 5 || nextStreak === 10) {
        sound.playStreak();
        try {
          confetti({
            particleCount: 60,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch {}
      }

      onAwardXp(earnedPoints, currentQuestion.topicId, true);
    } else {
      sound.playWrong();
      onUpdateStreak(0);
      onAwardXp(0, currentQuestion.topicId, false);
    }
  };

  return (
    <section id="desafios" className="py-16 sm:py-20 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera de la Zona de Desafíos */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-400 uppercase mb-2">
              <Swords className="w-4 h-4 text-amber-400" />
              <span>Zona Arcade de Desafíos</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-400 font-normal">Supera tus límites</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Desafíos Matemáticos Gamificados
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-300">
              Pon a prueba tu agilidad mental, mantén tu racha de respuestas correctas y desbloquea multiplicadores de experiencia.
            </p>
          </div>

          {/* Marcadores de Racha y Puntos en Vivo */}
          <div className="flex items-center gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-3 shrink-0">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Flame className="w-5 h-5 fill-amber-400" />
              <div>
                <div className="text-[10px] uppercase font-semibold text-slate-400">Racha</div>
                <div className="text-lg font-mono font-bold">{currentStreak}x</div>
              </div>
            </div>

            <div className="px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <div className="text-[10px] uppercase font-semibold text-slate-400">Puntos Sesión</div>
              <div className="text-lg font-mono font-bold text-white">{sessionScore}</div>
            </div>
          </div>
        </div>

        {/* Panel Principal del Juego */}
        {!isPlaying ? (
          /* Pantalla Pre-Juego: Configuración */
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 text-center space-y-8 shadow-2xl">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-500 to-indigo-600 flex items-center justify-center mx-auto text-white shadow-xl shadow-amber-500/20">
              <Swords className="w-10 h-10" />
            </div>

            <div className="space-y-3 max-w-lg mx-auto">
              <h3 className="text-2xl font-extrabold text-white">¿Listo para el desafío?</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Selecciona la dificultad de las preguntas y activa el temporizador para experimentar la presión contrarreloj del modo Arcade.
              </p>
            </div>

            {/* Ajustes de Partida */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto text-left">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                  Nivel de Dificultad
                </label>
                <div className="grid grid-cols-3 gap-1">
                  {(['facil', 'intermedio', 'avanzado'] as DifficultyLevel[]).map((dif) => (
                    <button
                      key={dif}
                      onClick={() => { setDifficulty(dif); sound.playClick(); }}
                      className={`py-2 text-xs font-semibold rounded-lg capitalize transition-colors cursor-pointer ${
                        difficulty === dif
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {dif}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                  Temporizador Arcade
                </label>
                <button
                  onClick={() => { setTimerEnabled(!timerEnabled); sound.playClick(); }}
                  className={`w-full py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-between border cursor-pointer ${
                    timerEnabled
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                      : 'bg-slate-900 text-slate-400 border-slate-800'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <Timer className="w-4 h-4" />
                    <span>{timerEnabled ? 'Activado (Contrarreloj)' : 'Desactivado (Libre)'}</span>
                  </span>
                  <span className="font-mono text-[11px]">{timerEnabled ? 'SI' : 'NO'}</span>
                </button>
              </div>
            </div>

            <button
              onClick={startGame}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-base text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 transition-all shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 cursor-pointer active:scale-95"
            >
              <Play className="w-5 h-5 fill-slate-950" />
              <span>Comenzar Ronda Arcade</span>
            </button>
          </div>
        ) : (
          /* Pantalla Durante el Juego */
          currentQuestion && (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative animate-fade-in">
              
              {/* Barra superior de estado de la pregunta */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
                  <span className="uppercase tracking-wider">{currentQuestion.topicName}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-slate-400 font-normal capitalize">{currentQuestion.difficulty}</span>
                </div>

                {/* Temporizador con advertencia de color */}
                {timerEnabled && (
                  <div className={`flex items-center gap-1.5 px-3 py-1 rounded-xl font-mono font-bold text-sm border ${
                    timeLeft <= 8 
                      ? 'bg-rose-500/20 text-rose-400 border-rose-500/40 animate-pulse' 
                      : 'bg-slate-950 text-cyan-400 border-slate-800'
                  }`}>
                    <Timer className="w-4 h-4" />
                    <span>{timeLeft}s</span>
                  </div>
                )}
              </div>

              {/* Pregunta del Desafío */}
              <div className="space-y-4 py-2">
                <h3 className="text-xl sm:text-2xl font-bold text-white leading-relaxed">
                  {currentQuestion.question}
                </h3>

                {currentQuestion.latexFormula && (
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-center">
                    <span className="font-mono text-cyan-300 font-semibold text-base sm:text-lg">
                      {currentQuestion.latexFormula}
                    </span>
                  </div>
                )}
              </div>

              {/* Opciones de Selección Múltiple */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {currentQuestion.options.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === currentQuestion.correctOptionIndex;

                  let cardStyle = 'bg-slate-950 border-slate-800 hover:border-cyan-500 text-slate-200';

                  if (hasAnswered) {
                    if (isCorrect) {
                      cardStyle = 'bg-emerald-950/70 border-emerald-500 text-emerald-200';
                    } else if (isSelected && !isCorrect) {
                      cardStyle = 'bg-rose-950/70 border-rose-500 text-rose-200';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={hasAnswered}
                      onClick={() => handleSelectAnswer(idx)}
                      className={`p-4 rounded-2xl border text-sm sm:text-base font-medium text-left transition-all cursor-pointer flex items-center justify-between ${cardStyle}`}
                    >
                      <div>
                        <span className="font-mono text-slate-500 mr-2.5 font-bold">
                          {String.fromCharCode(65 + idx)}.
                        </span>
                        <span>{option}</span>
                      </div>
                      
                      {hasAnswered && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      )}
                      {hasAnswered && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Tarjeta de Retroalimentación Inmediata con Explicación Completa */}
              {hasAnswered && (
                <div className="space-y-4 pt-4 border-t border-slate-800 animate-fade-in">
                  <div className={`p-4 rounded-2xl border flex items-start gap-3 ${
                    selectedOption === currentQuestion.correctOptionIndex
                      ? 'bg-emerald-950/30 border-emerald-800/40 text-emerald-300'
                      : 'bg-rose-950/30 border-rose-800/40 text-rose-300'
                  }`}>
                    {selectedOption === currentQuestion.correctOptionIndex ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-400 mt-0.5 shrink-0" />
                    )}
                    <div>
                      <div className="font-bold text-sm">
                        {selectedOption === currentQuestion.correctOptionIndex
                          ? `¡Respuesta correcta! (+${currentQuestion.points} puntos base)`
                          : 'Respuesta incorrecta o tiempo finalizado.'}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                        {currentQuestion.explanation}
                      </p>
                    </div>
                  </div>

                  {/* Botones de Acción Posterior */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={() => setIsPlaying(false)}
                      className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white bg-slate-950 hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
                    >
                      Pausar Sesión
                    </button>

                    <button
                      onClick={loadNextQuestion}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 transition-all shadow-md cursor-pointer"
                    >
                      <span>Siguiente Desafío</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

            </div>
          )
        )}

      </div>
    </section>
  );
};
