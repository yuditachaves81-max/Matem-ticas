import React, { useState, useRef, useEffect } from 'react';
import { evaluateMathFunction, cleanRound } from '../../utils/mathEngine';
import { sound } from '../../utils/audio';
import { ZoomIn, ZoomOut, RotateCcw, LineChart, Sparkles } from 'lucide-react';

export const FunctionGrapher: React.FC = () => {
  const [expr, setExpr] = useState<string>('x^2 - 4');
  const [xMin, setXMin] = useState<number>(-8);
  const [xMax, setXMax] = useState<number>(8);
  const [yMin, setYMin] = useState<number>(-6);
  const [yMax, setYMax] = useState<number>(6);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number; fVal: number } | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const presets = [
    { label: 'Parábola', fn: 'x^2 - 4' },
    { label: 'Seno', fn: 'sin(x)' },
    { label: 'Recta', fn: '2*x - 3' },
    { label: 'Cúbica', fn: 'x^3 - 3*x' },
    { label: 'Racional', fn: '1 / x' },
    { label: 'Gaussiana', fn: 'e^(-x^2)' }
  ];

  // Dibujado del plano cartesiano y la función
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = (canvas.width = canvas.parentElement?.clientWidth || 700);
    const height = (canvas.height = 420);

    ctx.clearRect(0, 0, width, height);

    // Transformación de coordenadas de mundo a pantalla
    const toScreenX = (wx: number) => ((wx - xMin) / (xMax - xMin)) * width;
    const toScreenY = (wy: number) => height - ((wy - yMin) / (yMax - yMin)) * height;
    const toWorldX = (sx: number) => xMin + (sx / width) * (xMax - xMin);

    // Cuadrícula sutil
    ctx.strokeStyle = 'rgba(51, 65, 85, 0.4)';
    ctx.lineWidth = 1;
    ctx.setLineDash([2, 4]);

    const xStep = Math.pow(10, Math.floor(Math.log10(xMax - xMin))) / 2 || 1;
    const startX = Math.floor(xMin / xStep) * xStep;
    for (let wx = startX; wx <= xMax; wx += xStep) {
      const sx = toScreenX(wx);
      ctx.beginPath();
      ctx.moveTo(sx, 0);
      ctx.lineTo(sx, height);
      ctx.stroke();
    }

    const yStep = Math.pow(10, Math.floor(Math.log10(yMax - yMin))) / 2 || 1;
    const startY = Math.floor(yMin / yStep) * yStep;
    for (let wy = startY; wy <= yMax; wy += yStep) {
      const sy = toScreenY(wy);
      ctx.beginPath();
      ctx.moveTo(0, sy);
      ctx.lineTo(width, sy);
      ctx.stroke();
    }
    ctx.setLineDash([]);

    // Ejes cartesianos principales X e Y
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.8)';
    ctx.lineWidth = 1.5;

    // Eje X (y = 0)
    const originY = toScreenY(0);
    if (originY >= 0 && originY <= height) {
      ctx.beginPath();
      ctx.moveTo(0, originY);
      ctx.lineTo(width, originY);
      ctx.stroke();
    }

    // Eje Y (x = 0)
    const originX = toScreenX(0);
    if (originX >= 0 && originX <= width) {
      ctx.beginPath();
      ctx.moveTo(originX, 0);
      ctx.lineTo(originX, height);
      ctx.stroke();
    }

    // Etiquetas numéricas de los ejes
    ctx.font = "10px 'JetBrains Mono', monospace";
    ctx.fillStyle = 'rgba(148, 163, 184, 0.8)';
    for (let wx = startX; wx <= xMax; wx += xStep * 2) {
      if (Math.abs(wx) > 1e-4) {
        const sx = toScreenX(wx);
        ctx.fillText(cleanRound(wx, 1).toString(), sx - 8, Math.min(height - 6, Math.max(14, originY + 14)));
      }
    }
    for (let wy = startY; wy <= yMax; wy += yStep * 2) {
      if (Math.abs(wy) > 1e-4) {
        const sy = toScreenY(wy);
        ctx.fillText(cleanRound(wy, 1).toString(), Math.min(width - 24, Math.max(6, originX + 6)), sy + 4);
      }
    }

    // Trazo de la curva f(x)
    ctx.beginPath();
    ctx.strokeStyle = '#06B6D4'; // Cyan 500
    ctx.lineWidth = 2.5;

    let isDrawing = false;
    const stepPx = 1.5;

    for (let px = 0; px <= width; px += stepPx) {
      const wx = toWorldX(px);
      const wy = evaluateMathFunction(expr, wx);

      if (isNaN(wy) || !isFinite(wy) || wy < yMin * 2 || wy > yMax * 2) {
        isDrawing = false;
        continue;
      }

      const py = toScreenY(wy);

      if (!isDrawing) {
        ctx.moveTo(px, py);
        isDrawing = true;
      } else {
        ctx.lineTo(px, py);
      }
    }
    ctx.stroke();

    // Dibujar punto del cursor si está activo
    if (cursorPos) {
      const cx = toScreenX(cursorPos.x);
      const cy = toScreenY(cursorPos.fVal);

      if (cx >= 0 && cx <= width && cy >= 0 && cy <= height) {
        ctx.beginPath();
        ctx.arc(cx, cy, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#F59E0B'; // Amber
        ctx.fill();
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Líneas punteadas a los ejes
        ctx.setLineDash([3, 3]);
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.5)';
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx, originY);
        ctx.moveTo(cx, cy);
        ctx.lineTo(originX, cy);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    }

  }, [expr, xMin, xMax, yMin, yMax, cursorPos]);

  // Manejo de interacción de cursor
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const sx = e.clientX - rect.left;
    const sy = e.clientY - rect.top;

    const wx = xMin + (sx / canvas.width) * (xMax - xMin);
    const wy = yMax - (sy / canvas.height) * (yMax - yMin);
    const fVal = evaluateMathFunction(expr, wx);

    setCursorPos({ x: cleanRound(wx, 2), y: cleanRound(wy, 2), fVal: cleanRound(fVal, 3) });
  };

  const handleMouseLeave = () => {
    setCursorPos(null);
  };

  const handleZoom = (factor: number) => {
    sound.playClick();
    setXMin((prev) => prev * factor);
    setXMax((prev) => prev * factor);
    setYMin((prev) => prev * factor);
    setYMax((prev) => prev * factor);
  };

  const handleReset = () => {
    sound.playClick();
    setXMin(-8);
    setXMax(8);
    setYMin(-6);
    setYMax(6);
  };

  // Cálculo de cortes aproximados
  const yIntercept = cleanRound(evaluateMathFunction(expr, 0), 3);

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Barra de entrada de función y preajustes */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          
          {/* Input de la función */}
          <div className="flex-1 w-full space-y-1">
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Expresión Matemática f(x)
            </label>
            <div className="flex items-center gap-2 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 focus-within:border-cyan-400">
              <span className="font-mono text-cyan-400 font-bold text-sm">f(x) =</span>
              <input
                type="text"
                value={expr}
                onChange={(e) => setExpr(e.target.value)}
                placeholder="x^2 - 4, sin(x), 2*x + 1..."
                className="w-full bg-transparent text-white font-mono text-sm outline-none"
              />
            </div>
          </div>

          {/* Botones de zoom y reset */}
          <div className="flex items-center gap-1.5 self-end sm:self-auto pt-4 sm:pt-0">
            <button
              onClick={() => handleZoom(0.8)}
              title="Acercar (Zoom In)"
              className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl border border-slate-700 transition-colors cursor-pointer"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleZoom(1.25)}
              title="Alejar (Zoom Out)"
              className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl border border-slate-700 transition-colors cursor-pointer"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={handleReset}
              title="Restablecer plano estándar"
              className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl border border-slate-700 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Preajustes rápidos de funciones */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs text-slate-400">Funciones ejemplo:</span>
          {presets.map((p, i) => (
            <button
              key={i}
              onClick={() => {
                setExpr(p.fn);
                sound.playClick();
              }}
              className={`px-2.5 py-1 text-xs rounded-lg border font-mono transition-colors cursor-pointer ${
                expr === p.fn
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                  : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Escenario del Canvas Interactivo */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 overflow-hidden relative shadow-xl">
        <canvas
          ref={canvasRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="w-full h-[420px] rounded-xl bg-slate-950 cursor-crosshair"
          title="Haz clic o mueve el cursor para inspeccionar valores de f(x)"
        />

        {/* Badge flotante de coordenadas del cursor */}
        <div className="absolute bottom-6 left-6 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-xl px-4 py-2 font-mono text-xs text-slate-200 shadow-lg">
          {cursorPos ? (
            <div className="flex items-center gap-3">
              <span>x: <strong className="text-cyan-400">{cursorPos.x}</strong></span>
              <span>·</span>
              <span>f(x): <strong className="text-amber-400">{isNaN(cursorPos.fVal) ? 'Indefinido' : cursorPos.fVal}</strong></span>
            </div>
          ) : (
            <span className="text-slate-400">Mueve el cursor sobre la gráfica para rastrear f(x)</span>
          )}
        </div>

        {/* Análisis analítico básico de la función */}
        <div className="absolute top-6 right-6 hidden sm:flex items-center gap-3 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-xl px-3 py-1.5 text-xs text-slate-300 font-mono">
          <span>Corte eje Y (x=0): <strong className="text-cyan-400">{isNaN(yIntercept) ? 'No existe' : `(0, ${yIntercept})`}</strong></span>
        </div>
      </div>

    </div>
  );
};
