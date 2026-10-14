import React, { useState } from 'react';
import { 
  Calculator, 
  Variable, 
  Shapes, 
  Compass, 
  LineChart, 
  BarChart2, 
  TrendingUp, 
  ArrowRight, 
  BookOpen,
  Sparkles
} from 'lucide-react';
import { TOPICS_DATA } from '../data/topics';
import { Lesson, TopicCategory } from '../types/math';

interface TopicExplorerProps {
  onSelectLesson: (lesson: Lesson) => void;
  onOpenLabTool: (toolId: string) => void;
}

export const TopicExplorer: React.FC<TopicExplorerProps> = ({
  onSelectLesson,
  onOpenLabTool
}) => {
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);

  // Mapeo seguro de iconos
  const renderIcon = (name: string, color: string) => {
    const props = { className: 'w-6 h-6', style: { color } };
    switch (name) {
      case 'Calculator': return <Calculator {...props} />;
      case 'Variable': return <Variable {...props} />;
      case 'Shapes': return <Shapes {...props} />;
      case 'Compass': return <Compass {...props} />;
      case 'LineChart': return <LineChart {...props} />;
      case 'BarChart2': return <BarChart2 {...props} />;
      case 'TrendingUp': return <TrendingUp {...props} />;
      default: return <Sparkles {...props} />;
    }
  };

  return (
    <section id="temas" className="py-16 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera de la sección */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-cyan-400 uppercase mb-2">
            <span>Currículo Estructurado</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-400 font-normal">7 Áreas del Saber Matemático</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Explorador de Temas Matemáticos
          </h2>
          <p className="mt-3 text-base text-slate-300 leading-relaxed">
            Domina desde las operaciones aritméticas esenciales hasta las herramientas fundamentales del cálculo, con lecciones paso a paso y demostraciones didácticas.
          </p>
        </div>

        {/* Cuadrícula de 7 tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TOPICS_DATA.map((topic, index) => {
            const isExpanded = selectedTopicId === topic.id;

            return (
              <div
                key={topic.id}
                className="group relative rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all duration-300 flex flex-col justify-between p-6 shadow-lg hover:shadow-cyan-500/5 hover:-translate-y-1"
              >
                {/* Cabecera de la tarjeta */}
                <div className="space-y-4">
                  
                  {/* Fila superior: Icono y Dificultad sin píldora estática slop */}
                  <div className="flex items-center justify-between">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center bg-slate-800/90 border border-slate-700/60"
                      style={{ boxShadow: `0 0 20px ${topic.accentColor}15` }}
                    >
                      {renderIcon(topic.iconName, topic.accentColor)}
                    </div>

                    {/* Metadatos con separadores limpios */}
                    <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                      <span>Nivel</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-slate-200 capitalize font-medium">{topic.difficultyLabel}</span>
                    </div>
                  </div>

                  {/* Título de la categoría y orden editorial humano */}
                  <div>
                    <div className="text-xs font-mono text-slate-500 mb-1">
                      0{index + 1}. Módulo
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {topic.title}
                    </h3>
                  </div>

                  {/* Descripción breve */}
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {topic.shortDesc}
                  </p>

                  {/* Fórmula destacada */}
                  <div className="bg-slate-950/70 border border-slate-800 rounded-lg p-2.5 text-center">
                    <span className="text-xs text-slate-400 font-sans block mb-1">Fórmula clave:</span>
                    <span className="text-sm font-mono font-medium text-cyan-300">
                      {topic.featuredFormula}
                    </span>
                  </div>

                  {/* Subtemas abordados */}
                  <div className="space-y-1.5 pt-1">
                    <div className="text-xs font-semibold text-slate-400">Contenidos clave:</div>
                    <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
                      {topic.subtopics.slice(0, 3).map((st, i) => (
                        <li key={i} className="truncate">{st}</li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* Pie de la tarjeta: Botón de exploración */}
                <div className="pt-6 mt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                  <span className="text-xs text-slate-400">
                    {topic.lessons.length} {topic.lessons.length === 1 ? 'lección guiada' : 'lecciones guiadas'}
                  </span>

                  <button
                    onClick={() => {
                      if (topic.lessons.length > 0) {
                        onSelectLesson(topic.lessons[0]);
                      }
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-all cursor-pointer shadow-sm active:scale-95"
                  >
                    <span>Explorar lección</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
