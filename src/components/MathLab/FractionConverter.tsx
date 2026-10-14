import React, { useState } from 'react';
import { 
  convertFraction, 
  convertDecimal, 
  convertPercent, 
  ConversionResult 
} from '../../utils/mathEngine';
import { sound } from '../../utils/audio';
import { Percent, CheckCircle2, PieChart as PieIcon, ArrowRightLeft } from 'lucide-react';

export const FractionConverter: React.FC = () => {
  const [inputMode, setInputMode] = useState<'fraccion' | 'decimal' | 'porcentaje'>('fraccion');

  // Estados de entrada
  const [num, setNum] = useState<number>(3);
  const [den, setDen] = useState<number>(4);
  const [decimalInput, setDecimalInput] = useState<number>(0.75);
  const [percentInput, setPercentInput] = useState<number>(75);

  let result: ConversionResult;
  if (inputMode === 'fraccion') {
    result = convertFraction(num, den || 1);
  } else if (inputMode === 'decimal') {
    result = convertDecimal(decimalInput);
  } else {
    result = convertPercent(percentInput);
  }

  // Ángulo para el gráfico circular SVG (en grados y radianes)
  const normalizedPct = Math.max(0, Math.min(100, result.percent));
  const angle = (normalizedPct / 100) * 360;
  const rad = (angle * Math.PI) / 180;
  const x = 100 + 70 * Math.sin(rad);
  const y = 100 - 70 * Math.cos(rad);
  const largeArcFlag = angle > 180 ? 1 : 0;
  const pathData =
    normalizedPct >= 99.99
      ? 'M 100 30 A 70 70 0 1 1 99.99 30 Z'
      : normalizedPct <= 0.01
      ? 'M 100 100'
      : `M 100 100 L 100 30 A 70 70 0 ${largeArcFlag} 1 ${x} ${y} Z`;

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
      
      {/* Selector de modo de entrada */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-1.5 bg-slate-950/80 border border-slate-800 rounded-xl">
        <div className="flex items-center gap-1">
          <button
            onClick={() => { setInputMode('fraccion'); sound.playClick(); }}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              inputMode === 'fraccion'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Entrada: Fracción (a/b)
          </button>
          <button
            onClick={() => { setInputMode('decimal'); sound.playClick(); }}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              inputMode === 'decimal'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Entrada: Número Decimal
          </button>
          <button
            onClick={() => { setInputMode('porcentaje'); sound.playClick(); }}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              inputMode === 'porcentaje'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Entrada: Porcentaje (%)
          </button>
        </div>

        {/* Ejemplos rápidos */}
        <div className="flex items-center gap-2 text-xs text-slate-400 px-2">
          <span>Ejemplos:</span>
          <button
            onClick={() => {
              setInputMode('fraccion');
              setNum(3);
              setDen(8);
              sound.playClick();
            }}
            className="underline hover:text-cyan-400 cursor-pointer"
          >
            3/8
          </button>
          <span>·</span>
          <button
            onClick={() => {
              setInputMode('fraccion');
              setNum(12);
              setDen(16);
              sound.playClick();
            }}
            className="underline hover:text-cyan-400 cursor-pointer"
          >
            12/16
          </button>
          <span>·</span>
          <button
            onClick={() => {
              setInputMode('decimal');
              setDecimalInput(0.625);
              sound.playClick();
            }}
            className="underline hover:text-cyan-400 cursor-pointer"
          >
            0.625
          </button>
        </div>
      </div>

      {/* Formulario de Entrada */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        {inputMode === 'fraccion' && (
          <div className="space-y-3">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Ingresa el Numerador y Denominador
            </div>
            <div className="flex items-center gap-4 max-w-xs">
              <div className="flex-1">
                <label className="block text-xs font-mono text-slate-400 mb-1">Numerador</label>
                <input
                  type="number"
                  value={num}
                  onChange={(e) => setNum(Number(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-lg text-center outline-none focus:border-cyan-400"
                />
              </div>
              <span className="text-2xl font-bold text-slate-500 pt-5">/</span>
              <div className="flex-1">
                <label className="block text-xs font-mono text-slate-400 mb-1">Denominador</label>
                <input
                  type="number"
                  value={den}
                  onChange={(e) => setDen(Math.max(1, Number(e.target.value) || 1))}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-lg text-center outline-none focus:border-cyan-400"
                />
              </div>
            </div>
          </div>
        )}

        {inputMode === 'decimal' && (
          <div className="space-y-3 max-w-xs">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Ingresa el Valor Decimal
            </div>
            <input
              type="number"
              step="0.01"
              value={decimalInput}
              onChange={(e) => setDecimalInput(Number(e.target.value) || 0)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-lg outline-none focus:border-cyan-400"
            />
          </div>
        )}

        {inputMode === 'porcentaje' && (
          <div className="space-y-3 max-w-xs">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Ingresa el Porcentaje (%)
            </div>
            <div className="relative">
              <input
                type="number"
                step="0.5"
                value={percentInput}
                onChange={(e) => setPercentInput(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-lg outline-none focus:border-cyan-400 pr-10"
              />
              <span className="absolute right-3 top-2.5 font-bold text-cyan-400">%</span>
            </div>
          </div>
        )}
      </div>

      {/* Panel de Tres Representaciones Simultáneas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* 1. Fracción Irreducible */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-center space-y-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
            Fracción Irreducible
          </div>
          <div className="text-3xl font-mono font-extrabold text-white">
            {result.simplifiedNum}
            <span className="text-slate-500 mx-1">/</span>
            {result.simplifiedDen}
          </div>
          <div className="text-xs text-slate-400">
            {result.simplifiedDen === 1 ? 'Entero puro' : 'Términos primos relativos'}
          </div>
        </div>

        {/* 2. Decimal */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-center space-y-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-purple-400">
            Número Decimal
          </div>
          <div className="text-3xl font-mono font-extrabold text-white">
            {result.decimal}
          </div>
          <div className="text-xs text-slate-400">
            {result.isExactDecimal ? 'Decimal exacto (finito)' : 'Decimal periódico'}
          </div>
        </div>

        {/* 3. Porcentaje */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-center space-y-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-400">
            Porcentaje Equivalente
          </div>
          <div className="text-3xl font-mono font-extrabold text-white">
            {result.percent}%
          </div>
          <div className="text-xs text-slate-400">
            Proporción sobre base 100
          </div>
        </div>

      </div>

      {/* Representación Visual Gráfica (Pie Chart + Barra de Proporción) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 items-center">
        
        <div className="md:col-span-4 flex flex-col items-center justify-center">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Gráfico Circular de Fracción
          </div>
          <svg viewBox="0 0 200 200" className="w-40 h-40">
            {/* Fondo círculo completo */}
            <circle cx="100" cy="100" r="70" fill="rgba(15, 23, 42, 0.8)" stroke="#334155" strokeWidth="3" />
            {/* Porción activa de la fracción */}
            <path d={pathData} fill="rgba(6, 182, 212, 0.45)" stroke="#06B6D4" strokeWidth="2.5" />
            <circle cx="100" cy="100" r="4" fill="#FFFFFF" />
          </svg>
          <div className="text-xs font-mono text-cyan-400 font-bold mt-2">
            {normalizedPct.toFixed(1)}% del total
          </div>
        </div>

        <div className="md:col-span-8 space-y-4">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Escala Lineal Continua (0% — 100%)
          </div>

          <div className="space-y-1.5">
            <div className="w-full bg-slate-950 h-5 rounded-full overflow-hidden border border-slate-800 p-0.5">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 transition-all duration-300"
                style={{ width: `${Math.min(100, Math.max(0, result.percent))}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] font-mono text-slate-500">
              <span>0% (0)</span>
              <span>25% (1/4)</span>
              <span>50% (1/2)</span>
              <span>75% (3/4)</span>
              <span>100% (1)</span>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800">
            Visualizar las fracciones como sectores de un círculo o segmentos de una barra permite comprender intuitivamente que una fracción impropia (mayor que 1 o 100%) desborda la unidad fundamental.
          </p>
        </div>

      </div>

      {/* Procedimiento paso a paso */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-cyan-400" />
          <span>Procedimiento Aritmético Paso a Paso</span>
        </div>

        <div className="space-y-3">
          {result.steps.map((st) => (
            <div key={st.stepNumber} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="text-xs font-semibold text-cyan-400">{st.title}</div>
              <div className="font-mono text-xs bg-slate-900 text-amber-300 p-2 rounded border border-slate-800 inline-block">
                {st.expression}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {st.explanation}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
