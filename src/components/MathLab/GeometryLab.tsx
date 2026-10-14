import React, { useState } from 'react';
import { computeGeometryShape, ShapeGeometryData } from '../../utils/mathEngine';
import { sound } from '../../utils/audio';
import { Box, Circle, Triangle, Layers, CheckCircle2 } from 'lucide-react';

export const GeometryLab: React.FC = () => {
  const [selectedShape, setSelectedShape] = useState<string>('cilindro');
  const [params, setParams] = useState<Record<string, number>>({
    r: 4,
    h: 10,
    b: 8,
    a: 6,
    c: 7
  });

  const handleParamChange = (key: string, val: number) => {
    setParams((prev) => ({ ...prev, [key]: val }));
  };

  const shapeData: ShapeGeometryData = computeGeometryShape(selectedShape, params);

  const shapesList = [
    { id: 'circulo', name: 'Círculo (2D)', dim: '2D' },
    { id: 'triangulo', name: 'Triángulo (2D)', dim: '2D' },
    { id: 'cilindro', name: 'Cilindro (3D)', dim: '3D' },
    { id: 'esfera', name: 'Esfera (3D)', dim: '3D' },
    { id: 'cono', name: 'Cono Recto (3D)', dim: '3D' }
  ];

  // Renderizado vectorial reactivo del diagrama
  const renderShapeDiagram = () => {
    const r = params.r || 4;
    const h = params.h || 10;
    const b = params.b || 8;

    if (selectedShape === 'circulo') {
      const scaleRadius = Math.min(80, Math.max(25, r * 4.5));
      return (
        <svg viewBox="0 0 240 220" className="w-full h-56 max-w-sm mx-auto">
          <circle cx="120" cy="110" r={scaleRadius} fill="rgba(6, 182, 212, 0.15)" stroke="#06B6D4" strokeWidth="2.5" />
          <line x1="120" y1="110" x2={120 + scaleRadius} y2="110" stroke="#38BDF8" strokeWidth="2" strokeDasharray="4 2" />
          <circle cx="120" cy="110" r="3.5" fill="#38BDF8" />
          <text x={120 + scaleRadius / 2} y="102" fill="#E0F2FE" fontSize="12" textAnchor="middle" fontFamily="JetBrains Mono">
            r = {r} cm
          </text>
        </svg>
      );
    }

    if (selectedShape === 'triangulo') {
      const basePx = Math.min(180, Math.max(60, b * 9));
      const heightPx = Math.min(120, Math.max(40, h * 6.5));
      const leftX = 120 - basePx / 2;
      const rightX = 120 + basePx / 2;
      const topX = 120;
      const bottomY = 160;
      const topY = 160 - heightPx;

      return (
        <svg viewBox="0 0 240 220" className="w-full h-56 max-w-sm mx-auto">
          <polygon
            points={`${leftX},${bottomY} ${rightX},${bottomY} ${topX},${topY}`}
            fill="rgba(16, 185, 129, 0.15)"
            stroke="#10B981"
            strokeWidth="2.5"
          />
          {/* Altura punteada */}
          <line x1={topX} y1={topY} x2={topX} y2={bottomY} stroke="#34D399" strokeWidth="1.5" strokeDasharray="3 3" />
          <text x={topX + 10} y={topY + heightPx / 2} fill="#D1FAE5" fontSize="11" fontFamily="JetBrains Mono">
            h = {h} cm
          </text>
          <text x="120" y={bottomY + 18} fill="#D1FAE5" fontSize="11" textAnchor="middle" fontFamily="JetBrains Mono">
            base = {b} cm
          </text>
        </svg>
      );
    }

    if (selectedShape === 'cilindro') {
      const radPx = Math.min(55, Math.max(22, r * 3.8));
      const hPx = Math.min(100, Math.max(40, h * 4.2));
      const topCy = 110 - hPx / 2;
      const botCy = 110 + hPx / 2;

      return (
        <svg viewBox="0 0 240 220" className="w-full h-56 max-w-sm mx-auto">
          {/* Base inferior elipse */}
          <ellipse cx="120" cy={botCy} rx={radPx} ry={radPx * 0.35} fill="rgba(139, 92, 246, 0.25)" stroke="#A855F7" strokeWidth="2" />
          {/* Paredes laterales */}
          <line x1={120 - radPx} y1={topCy} x2={120 - radPx} y2={botCy} stroke="#A855F7" strokeWidth="2" />
          <line x1={120 + radPx} y1={topCy} x2={120 + radPx} y2={botCy} stroke="#A855F7" strokeWidth="2" />
          {/* Tapa superior elipse */}
          <ellipse cx="120" cy={topCy} rx={radPx} ry={radPx * 0.35} fill="rgba(139, 92, 246, 0.45)" stroke="#C084FC" strokeWidth="2" />
          {/* Acotaciones */}
          <line x1={120} y1={topCy} x2={120 + radPx} y2={topCy} stroke="#E9D5FF" strokeWidth="1.5" strokeDasharray="2 2" />
          <text x={120 + radPx / 2} y={topCy - 6} fill="#E9D5FF" fontSize="11" textAnchor="middle" fontFamily="JetBrains Mono">
            r = {r}
          </text>
          <line x1={120 + radPx + 14} y1={topCy} x2={120 + radPx + 14} y2={botCy} stroke="#E9D5FF" strokeWidth="1" />
          <text x={120 + radPx + 20} y={110} fill="#E9D5FF" fontSize="11" dominantBaseline="middle" fontFamily="JetBrains Mono">
            h = {h}
          </text>
        </svg>
      );
    }

    if (selectedShape === 'esfera') {
      const radPx = Math.min(75, Math.max(30, r * 5));
      return (
        <svg viewBox="0 0 240 220" className="w-full h-56 max-w-sm mx-auto">
          <circle cx="120" cy="110" r={radPx} fill="rgba(56, 189, 248, 0.15)" stroke="#38BDF8" strokeWidth="2.5" />
          {/* Ecuador elíptico */}
          <ellipse cx="120" cy="110" rx={radPx} ry={radPx * 0.32} fill="none" stroke="#7DD3FC" strokeWidth="1.5" strokeDasharray="4 2" />
          <line x1="120" y1="110" x2={120 + radPx} y2="110" stroke="#BAE6FD" strokeWidth="2" strokeDasharray="3 2" />
          <circle cx="120" cy="110" r="3.5" fill="#38BDF8" />
          <text x={120 + radPx / 2} y="102" fill="#F0F9FF" fontSize="12" textAnchor="middle" fontFamily="JetBrains Mono">
            r = {r} cm
          </text>
        </svg>
      );
    }

    // Cono
    const radPx = Math.min(55, Math.max(22, r * 3.8));
    const hPx = Math.min(105, Math.max(45, h * 4.5));
    const topCy = 110 - hPx / 2;
    const botCy = 110 + hPx / 2;

    return (
      <svg viewBox="0 0 240 220" className="w-full h-56 max-w-sm mx-auto">
        <ellipse cx="120" cy={botCy} rx={radPx} ry={radPx * 0.35} fill="rgba(245, 158, 11, 0.2)" stroke="#F59E0B" strokeWidth="2" />
        <line x1={120} y1={topCy} x2={120 - radPx} y2={botCy} stroke="#F59E0B" strokeWidth="2" />
        <line x1={120} y1={topCy} x2={120 + radPx} y2={botCy} stroke="#F59E0B" strokeWidth="2" />
        <line x1={120} y1={topCy} x2={120} y2={botCy} stroke="#FDE68A" strokeWidth="1.5" strokeDasharray="3 3" />
        <text x="128" y={110} fill="#FDE68A" fontSize="11" fontFamily="JetBrains Mono">
          h = {h}
        </text>
        <line x1={120} y1={botCy} x2={120 + radPx} y2={botCy} stroke="#FDE68A" strokeWidth="1.5" strokeDasharray="2 2" />
        <text x={120 + radPx / 2} y={botCy + 14} fill="#FDE68A" fontSize="10" textAnchor="middle" fontFamily="JetBrains Mono">
          r = {r}
        </text>
      </svg>
    );
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Selector de figura geométrica */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-slate-950/80 border border-slate-800 rounded-xl">
        {shapesList.map((shape) => (
          <button
            key={shape.id}
            onClick={() => {
              setSelectedShape(shape.id);
              sound.playClick();
            }}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              selectedShape === shape.id
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {shape.name}
          </button>
        ))}
      </div>

      {/* Grid: Controles de Parámetros + Visualizador SVG Reactivo */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Parámetros con sliders en tiempo real */}
        <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Dimensiones y Parámetros
              </h3>
              <span className="text-xs font-mono text-cyan-400">Dimensión {shapeData.dimension}</span>
            </div>

            <div className="space-y-4">
              {shapeData.parameters.map((param) => (
                <div key={param.key} className="space-y-1.5 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-300">{param.label}</span>
                    <span className="font-mono font-bold text-cyan-400">
                      {param.value} {param.unit}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={param.min}
                    max={param.max}
                    step={param.step}
                    value={param.value}
                    onChange={(e) => handleParamChange(param.key, Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>{param.min} {param.unit}</span>
                    <span>{param.max} {param.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fórmulas matemáticas aplicadas */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Fórmulas Aplicadas
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
              {shapeData.formulas.map((f, i) => (
                <div key={i} className="text-slate-300">
                  <span className="text-cyan-400">{f.label}:</span> {f.formula}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Visualizador Vectorial SVG Reactivo */}
        <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between items-center">
          <div className="w-full flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Diagrama Paramétrico en Escala
            </span>
            <span className="text-xs font-mono text-emerald-400">Cálculo Vectorial</span>
          </div>

          <div className="w-full py-4 flex items-center justify-center">
            {renderShapeDiagram()}
          </div>

          {/* Métricas calculadas en vivo */}
          <div className="w-full grid grid-cols-2 gap-3 pt-2">
            {shapeData.metrics.map((m, idx) => (
              <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400">{m.label}</div>
                <div className="text-lg font-mono font-bold text-white">
                  {m.value} <span className="text-xs font-normal text-cyan-400">{m.unit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Procedimiento explicativo de los cálculos */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-cyan-400" />
          <span>Deducción Geométrica de Resultados</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {shapeData.steps.map((st) => (
            <div key={st.stepNumber} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="text-xs font-semibold text-cyan-400">{st.title}</div>
              <div className="font-mono text-xs bg-slate-900 text-amber-300 p-2 rounded border border-slate-800">
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
