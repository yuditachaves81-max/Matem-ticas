import React, { useState } from 'react';
import { 
  Variable, 
  Shapes, 
  LineChart, 
  Calculator, 
  Sparkles, 
  Percent, 
  Compass
} from 'lucide-react';
import { EquationSolver } from './EquationSolver';
import { GeometryLab } from './GeometryLab';
import { FunctionGrapher } from './FunctionGrapher';
import { ScientificCalculator } from './ScientificCalculator';
import { ExerciseGenerator } from './ExerciseGenerator';
import { FractionConverter } from './FractionConverter';
import { sound } from '../../utils/audio';

interface MathLabProps {
  initialTool?: string;
  onAwardXp: (amount: number) => void;
}

export const MathLab: React.FC<MathLabProps> = ({ initialTool = 'resolutor', onAwardXp }) => {
  const [activeTab, setActiveTab] = useState<string>(initialTool);

  const tools = [
    { id: 'resolutor', name: 'Resolutor de Ecuaciones', icon: Variable, desc: 'Paso a paso lineal, cuadrática y sistemas 2x2' },
    { id: 'geometria', name: 'Geometría 2D / 3D', icon: Shapes, desc: 'Áreas, perímetros, volúmenes y diagramas SVG' },
    { id: 'graficador', name: 'Graficador de Funciones', icon: LineChart, desc: 'Plano cartesiano interactivo con zoom y raíces' },
    { id: 'calculadora', name: 'Calculadora Científica', icon: Calculator, desc: 'Trigonometría, potencias, memoria e historial' },
    { id: 'ejercicios', name: 'Generador de Ejercicios', icon: Sparkles, desc: 'Práctica infinita con soluciones guiadas' },
    { id: 'conversor', name: 'Conversor Universal', icon: Percent, desc: 'Fracciones irreducibles, decimales y porcentajes' }
  ];

  return (
    <section id="laboratorio" className="py-16 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera del Laboratorio */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-cyan-400 uppercase mb-2">
            <Compass className="w-4 h-4 text-cyan-400" />
            <span>Laboratorio Matemático Interactivo</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-400 font-normal">Experimentación en Tiempo Real</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Herramientas de Exploración Numérica
          </h2>
          <p className="mt-3 text-base text-slate-300 leading-relaxed">
            Manipula variables, visualiza curvas en el plano, inspecciona figuras tridimensionales y desglosa ecuaciones algebraicas con justificaciones deductivas reales.
          </p>
        </div>

        {/* Pestañas de Navegación de Herramientas (Segmented Control Accesible) */}
        <div className="flex flex-nowrap overflow-x-auto pb-2 gap-2 mb-8 border-b border-slate-800 no-scrollbar">
          {tools.map((tool) => {
            const Icon = tool.icon;
            const isActive = activeTab === tool.id;

            return (
              <button
                key={tool.id}
                onClick={() => {
                  setActiveTab(tool.id);
                  sound.playClick();
                }}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer border shrink-0 ${
                  isActive
                    ? 'bg-slate-900 text-cyan-300 border-cyan-500/40 shadow-lg shadow-cyan-500/10'
                    : 'bg-slate-950/60 text-slate-400 border-slate-800/80 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                <span>{tool.name}</span>
              </button>
            );
          })}
        </div>

        {/* Contenedor Activo de la Herramienta */}
        <div className="min-h-[500px]">
          {activeTab === 'resolutor' && <EquationSolver />}
          {activeTab === 'geometria' && <GeometryLab />}
          {activeTab === 'graficador' && <FunctionGrapher />}
          {activeTab === 'calculadora' && <ScientificCalculator />}
          {activeTab === 'ejercicios' && <ExerciseGenerator onAwardXp={onAwardXp} />}
          {activeTab === 'conversor' && <FractionConverter />}
        </div>

      </div>
    </section>
  );
};
