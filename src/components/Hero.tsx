import React, { useEffect, useRef } from 'react';
import { ArrowRight, Sparkles, Swords, Compass, Layers, Zap } from 'lucide-react';

interface HeroProps {
  onStartLearning: () => void;
  onStartChallenge: () => void;
  onExploreLab: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onStartLearning,
  onStartChallenge,
  onExploreLab
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Partículas y símbolos matemáticos flotantes
    const formulas = [
      'e^{i\\pi} + 1 = 0',
      'a^2 + b^2 = c^2',
      'f\'(x) = \\lim \\frac{\\Delta y}{\\Delta x}',
      '\\int_a^b f(x)dx',
      '\\Delta = b^2 - 4ac',
      '\\sum_{n=1}^\\infty \\frac{1}{n^2} = \\frac{\\pi^2}{6}',
      '\\Phi \\approx 1.618',
      'sen^2(\\theta) + cos^2(\\theta) = 1',
      'P(A|B) = \\frac{P(B|A)P(A)}{P(B)}'
    ];

    const symbols = formulas.map((text, i) => ({
      text,
      x: (width / 5) * (i % 4 + 0.5) + (Math.random() * 40 - 20),
      y: (height / 4) * (Math.floor(i / 3) + 0.5) + (Math.random() * 40 - 20),
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      opacity: 0.25 + Math.random() * 0.4,
      size: 11 + Math.random() * 4
    }));

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // 1. Dibujar onda sinusoidal decorativa
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.25)';
      ctx.lineWidth = 2;
      for (let x = 0; x < width; x += 3) {
        const y = height * 0.5 + Math.sin(x * 0.015 + time) * 35 + Math.cos(x * 0.008 - time * 0.5) * 15;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Segunda onda armónica
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.2)';
      ctx.lineWidth = 1.5;
      for (let x = 0; x < width; x += 3) {
        const y = height * 0.55 + Math.cos(x * 0.012 - time * 0.8) * 40;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // 2. Dibujar poliedro / dodecágono geométrico rotativo en el centro
      const centerX = width * 0.5;
      const centerY = height * 0.48;
      const radius = Math.min(width, height) * 0.28;

      // Círculo base con marcas angulares
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.18)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Vértices poligonales con rotación
      const points = 8;
      const polyCoords: { x: number; y: number }[] = [];

      for (let i = 0; i < points; i++) {
        const angle = (i * 2 * Math.PI) / points + time * 0.3;
        const px = centerX + Math.cos(angle) * radius;
        const py = centerY + Math.sin(angle) * radius;
        polyCoords.push({ x: px, y: py });

        // Nodos brillantes
        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 === 0 ? 'rgba(34, 211, 238, 0.8)' : 'rgba(168, 85, 247, 0.8)';
        ctx.fill();
      }

      // Conexiones de malla estelar geométrica
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(147, 197, 253, 0.15)';
      ctx.lineWidth = 1;
      for (let i = 0; i < points; i++) {
        for (let j = i + 1; j < points; j++) {
          if ((j - i) % 2 === 1 || j - i === 2) {
            ctx.moveTo(polyCoords[i].x, polyCoords[i].y);
            ctx.lineTo(polyCoords[j].x, polyCoords[j].y);
          }
        }
      }
      ctx.stroke();

      // Eje de coordenadas cartesiano sutil
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.12)';
      ctx.setLineDash([4, 4]);
      ctx.moveTo(centerX - radius * 1.3, centerY);
      ctx.lineTo(centerX + radius * 1.3, centerY);
      ctx.moveTo(centerX, centerY - radius * 1.3);
      ctx.lineTo(centerX, centerY + radius * 1.3);
      ctx.stroke();
      ctx.setLineDash([]);

      // 3. Renderizar fórmulas matemáticas flotantes
      symbols.forEach((sym) => {
        sym.x += sym.vx;
        sym.y += sym.vy;

        if (sym.x < 20 || sym.x > width - 100) sym.vx *= -1;
        if (sym.y < 30 || sym.y > height - 30) sym.vy *= -1;

        ctx.font = `${sym.size}px 'JetBrains Mono', monospace`;
        ctx.fillStyle = `rgba(186, 230, 253, ${sym.opacity})`;
        ctx.fillText(sym.text, sym.x, sym.y);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section id="inicio" className="relative overflow-hidden pt-12 pb-20 lg:pt-16 lg:pb-28">
      {/* Fondo degradado espacial profundo */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,165,233,0.15),rgba(15,23,42,0))]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Columna de Texto y Llamados a la Acción */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Kicker editorial limpio (sin cápsulas estáticas AI slop) */}
            <div className="flex items-center justify-center lg:justify-start gap-2 text-xs font-semibold tracking-wider text-cyan-400 uppercase">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Explora el Universo de las Matemáticas</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-400 font-normal">Educación Secundaria & Bachillerato</span>
            </div>

            {/* Título Principal Requerido por el Prompt */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Las matemáticas{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
                nunca fueron tan fascinantes.
              </span>
            </h1>

            {/* Subtítulo Requerido por el Prompt */}
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Aprende, experimenta y supera tus límites. Descubre el poder de las matemáticas a través de experiencias interactivas.
            </p>

            {/* Dos Botones Destacados del Prompt */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onStartLearning}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 transition-all duration-200 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 cursor-pointer active:scale-95"
              >
                <span>Comenzar a aprender</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onStartChallenge}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-white bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 hover:border-slate-600 transition-all duration-200 shadow-md cursor-pointer active:scale-95"
              >
                <Swords className="w-4 h-4 text-amber-400" />
                <span>Resolver un desafío</span>
              </button>
            </div>

            {/* Fila de Credenciales y Capacidades Didácticas (Claim-to-Proof Adjacency) */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-left">
              <div>
                <div className="text-2xl font-extrabold text-white font-mono">7</div>
                <div className="text-xs text-slate-400 font-medium">Temas Curriculares</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-cyan-400 font-mono">6</div>
                <div className="text-xs text-slate-400 font-medium">Herramientas en Laboratorio</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-indigo-400 font-mono">100%</div>
                <div className="text-xs text-slate-400 font-medium">Cálculos Reales en Vivo</div>
              </div>
            </div>

          </div>

          {/* Columna Ilustración Interactiva Animada */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none aspect-square sm:aspect-[4/3] rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800/80 shadow-2xl p-4 overflow-hidden group">
              
              {/* Canvas Dinámico */}
              <canvas
                ref={canvasRef}
                className="w-full h-full rounded-xl cursor-crosshair"
                title="Laboratorio visual dinámico interactivo"
              />

              {/* Acceso Rápido Flotante al Laboratorio */}
              <div className="absolute bottom-4 left-4 right-4 bg-slate-900/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-3 flex items-center justify-between transition-transform duration-200">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                    <Compass className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">Laboratorio Interactivo</div>
                    <div className="text-[11px] text-slate-400">Resolutor paso a paso y gráficas</div>
                  </div>
                </div>
                <button
                  onClick={onExploreLab}
                  className="px-3 py-1.5 text-xs font-medium text-cyan-300 hover:text-white bg-cyan-500/20 hover:bg-cyan-500/30 rounded-lg transition-colors cursor-pointer"
                >
                  Abrir Lab
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
