import React, { useState } from 'react';
import { 
  solveLinearEquation, 
  solveQuadraticEquation, 
  solveSystem2x2, 
  EquationSolution 
} from '../../utils/mathEngine';
import { sound } from '../../utils/audio';
import { CheckCircle2, ChevronRight, HelpCircle, Sparkles } from 'lucide-react';

export const EquationSolver: React.FC = () => {
  const [eqType, setEqType] = useState<'lineal' | 'cuadratica' | 'sistema2x2'>('cuadratica');

  // Coeficientes lineales: ax + b = cx + d
  const [linA, setLinA] = useState<number>(3);
  const [linB, setLinB] = useState<number>(-7);
  const [linC, setLinC] = useState<number>(1);
  const [linD, setLinD] = useState<number>(9);

  // Coeficientes cuadráticos: ax² + bx + c = 0
  const [quadA, setQuadA] = useState<number>(1);
  const [quadB, setQuadB] = useState<number>(-5);
  const [quadC, setQuadC] = useState<number>(6);

  // Coeficientes sistema 2x2
  const [sysA1, setSysA1] = useState<number>(2);
  const [sysB1, setSysB1] = useState<number>(1);
  const [sysC1, setSysC1] = useState<number>(7);
  const [sysA2, setSysA2] = useState<number>(1);
  const [sysB2, setSysB2] = useState<number>(-1);
  const [sysC2, setSysC2] = useState<number>(2);

  // Solución calculada en vivo
  let solution: EquationSolution;
  if (eqType === 'lineal') {
    solution = solveLinearEquation(linA, linB, linC, linD);
  } else if (eqType === 'cuadratica') {
    solution = solveQuadraticEquation(quadA, quadB, quadC);
  } else {
    solution = solveSystem2x2(sysA1, sysB1, sysC1, sysA2, sysB2, sysC2);
  }

  // Preajustes rápidos para el estudiante
  const loadPreset = (presetName: string) => {
    sound.playClick();
    if (presetName === 'quad-facil') {
      setEqType('cuadratica');
      setQuadA(1);
      setQuadB(-5);
      setQuadC(6);
    } else if (presetName === 'quad-doble') {
      setEqType('cuadratica');
      setQuadA(1);
      setQuadB(-6);
      setQuadC(9);
    } else if (presetName === 'quad-compleja') {
      setEqType('cuadratica');
      setQuadA(1);
      setQuadB(2);
      setQuadC(5);
    } else if (presetName === 'lineal-despeje') {
      setEqType('lineal');
      setLinA(5);
      setLinB(-8);
      setLinC(2);
      setLinD(13);
    } else if (presetName === 'sys-interseccion') {
      setEqType('sistema2x2');
      setSysA1(3);
      setSysB1(2);
      setSysC1(12);
      setSysA2(1);
      setSysB2(-1);
      setSysC2(1);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Selector de tipo de ecuación (Segmented control) */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-1.5 bg-slate-950/80 border border-slate-800 rounded-xl">
        <div className="flex items-center gap-1">
          <button
            onClick={() => { setEqType('lineal'); sound.playClick(); }}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              eqType === 'lineal'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Ecuación Lineal (1° Grado)
          </button>
          <button
            onClick={() => { setEqType('cuadratica'); sound.playClick(); }}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              eqType === 'cuadratica'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Ecuación Cuadrática (2° Grado)
          </button>
          <button
            onClick={() => { setEqType('sistema2x2'); sound.playClick(); }}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              eqType === 'sistema2x2'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Sistema Lineal 2x2 (Cramer)
          </button>
        </div>

        {/* Ejemplos predeterminados */}
        <div className="flex items-center gap-1.5 text-xs text-slate-400 px-2">
          <span>Ejemplos:</span>
          {eqType === 'cuadratica' && (
            <>
              <button onClick={() => loadPreset('quad-facil')} className="underline hover:text-cyan-400 cursor-pointer">x²-5x+6</button>
              <span>·</span>
              <button onClick={() => loadPreset('quad-doble')} className="underline hover:text-cyan-400 cursor-pointer">(x-3)²</button>
              <span>·</span>
              <button onClick={() => loadPreset('quad-compleja')} className="underline hover:text-cyan-400 cursor-pointer">Complejas</button>
            </>
          )}
          {eqType === 'lineal' && (
            <button onClick={() => loadPreset('lineal-despeje')} className="underline hover:text-cyan-400 cursor-pointer">5x-8 = 2x+13</button>
          )}
          {eqType === 'sistema2x2' && (
            <button onClick={() => loadPreset('sys-interseccion')} className="underline hover:text-cyan-400 cursor-pointer">3x+2y=12, x-y=1</button>
          )}
        </div>
      </div>

      {/* Panel de Entrada de Parámetros */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Entrada de Coeficientes
        </div>

        {/* Formulario según tipo */}
        {eqType === 'lineal' && (
          <div className="space-y-4">
            <div className="text-xs text-slate-400">
              Forma canónica: <span className="font-mono text-cyan-300">a·x + b = c·x + d</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Coeficiente a</label>
                <input
                  type="number"
                  value={linA}
                  onChange={(e) => setLinA(Number(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-sm focus:border-cyan-400 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Término b</label>
                <input
                  type="number"
                  value={linB}
                  onChange={(e) => setLinB(Number(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-sm focus:border-cyan-400 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Coeficiente c</label>
                <input
                  type="number"
                  value={linC}
                  onChange={(e) => setLinC(Number(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-sm focus:border-cyan-400 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Término d</label>
                <input
                  type="number"
                  value={linD}
                  onChange={(e) => setLinD(Number(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-sm focus:border-cyan-400 outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {eqType === 'cuadratica' && (
          <div className="space-y-4">
            <div className="text-xs text-slate-400">
              Forma general: <span className="font-mono text-cyan-300">a·x² + b·x + c = 0</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Coeficiente a (término cuadrático)</label>
                <input
                  type="number"
                  value={quadA}
                  onChange={(e) => setQuadA(Number(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-sm focus:border-cyan-400 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Coeficiente b (término lineal)</label>
                <input
                  type="number"
                  value={quadB}
                  onChange={(e) => setQuadB(Number(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-sm focus:border-cyan-400 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Término independiente c</label>
                <input
                  type="number"
                  value={quadC}
                  onChange={(e) => setQuadC(Number(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-sm focus:border-cyan-400 outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {eqType === 'sistema2x2' && (
          <div className="space-y-4">
            <div className="text-xs text-slate-400">
              Sistema lineal de dos ecuaciones con dos incógnitas:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Ecuación 1 */}
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="text-xs font-semibold text-cyan-400">Ecuación 1: a₁·x + b₁·y = c₁</div>
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="number"
                    placeholder="a1"
                    value={sysA1}
                    onChange={(e) => setSysA1(Number(e.target.value) || 0)}
                    className="px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-white font-mono text-sm"
                  />
                  <input
                    type="number"
                    placeholder="b1"
                    value={sysB1}
                    onChange={(e) => setSysB1(Number(e.target.value) || 0)}
                    className="px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-white font-mono text-sm"
                  />
                  <input
                    type="number"
                    placeholder="c1"
                    value={sysC1}
                    onChange={(e) => setSysC1(Number(e.target.value) || 0)}
                    className="px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-white font-mono text-sm"
                  />
                </div>
              </div>

              {/* Ecuación 2 */}
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="text-xs font-semibold text-cyan-400">Ecuación 2: a₂·x + b₂·y = c₂</div>
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="number"
                    placeholder="a2"
                    value={sysA2}
                    onChange={(e) => setSysA2(Number(e.target.value) || 0)}
                    className="px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-white font-mono text-sm"
                  />
                  <input
                    type="number"
                    placeholder="b2"
                    value={sysB2}
                    onChange={(e) => setSysB2(Number(e.target.value) || 0)}
                    className="px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-white font-mono text-sm"
                  />
                  <input
                    type="number"
                    placeholder="c2"
                    value={sysC2}
                    onChange={(e) => setSysC2(Number(e.target.value) || 0)}
                    className="px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-white font-mono text-sm"
                  />
                </div>
              </div>

            </div>
          </div>
        )}

      </div>

      {/* Resultados destacados en vivo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {solution.results.map((res, i) => (
          <div key={i} className="bg-gradient-to-br from-slate-900 to-slate-950 border border-cyan-500/30 rounded-xl p-4 shadow-md">
            <div className="text-xs text-cyan-400 font-medium mb-1">{res.label}</div>
            <div className="text-xl font-mono font-bold text-white tracking-wide">{res.value}</div>
          </div>
        ))}

        {solution.vertex && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <div className="text-xs text-indigo-400 font-medium mb-1">Vértice de la parábola V(h, k)</div>
            <div className="text-lg font-mono font-bold text-slate-200">
              ({solution.vertex.x}, {solution.vertex.y})
            </div>
          </div>
        )}

        {solution.factorization && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <div className="text-xs text-purple-400 font-medium mb-1">Forma Factorizada</div>
            <div className="text-lg font-mono font-bold text-slate-200">
              {solution.factorization}
            </div>
          </div>
        )}
      </div>

      {/* Desglose Pedagógico Paso a Paso */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <span>Procedimiento Deductivo Paso a Paso</span>
          </div>
          <span className="text-xs text-slate-400">
            {solution.steps.length} etapas justificadas
          </span>
        </div>

        <div className="space-y-3 pt-2">
          {solution.steps.map((step) => (
            <div 
              key={step.stepNumber}
              className="bg-slate-950 border border-slate-800/90 rounded-xl p-4 space-y-2 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
                <span className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-800 flex items-center justify-center text-[10px]">
                  {step.stepNumber}
                </span>
                <span>{step.title}</span>
              </div>

              {step.expression && (
                <pre className="font-mono text-sm bg-slate-900 text-amber-300 p-2.5 rounded-lg border border-slate-800 overflow-x-auto whitespace-pre-wrap">
                  {step.expression}
                </pre>
              )}

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {step.explanation}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
