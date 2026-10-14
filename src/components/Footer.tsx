import React, { useState } from 'react';
import { Compass, HelpCircle, Mail, BookOpen, ExternalLink, ChevronDown, ChevronUp, X } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [showFaqModal, setShowFaqModal] = useState<boolean>(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: '¿Cómo calcula MathVerse las soluciones en el laboratorio?',
      a: 'MathVerse utiliza un motor analítico determinista escrito en TypeScript puro. Ejecuta el algoritmo de Euclides para MCD, la fórmula resolvente cuadrática de Bhaskara para discriminantes y raíces, y la regla de Cramer para sistemas de ecuaciones 2x2, desglosando cada paso algebraico con su justificación didáctica.'
    },
    {
      q: '¿Se requiere conexión a Internet o una cuenta de usuario?',
      a: 'No. MathVerse está diseñada para operar completamente en el navegador con soporte sin conexión. Todo el progreso de insignias, rachas y niveles se guarda automáticamente en el almacenamiento local (localStorage) de tu dispositivo.'
    },
    {
      q: '¿Qué niveles educativos cubre la plataforma?',
      a: 'El currículo está adaptado para educación secundaria y bachillerato (aproximadamente de 12 a 18 años), así como para estudiantes universitarios que cursan materias de pre-cálculo y fundamentos matemáticos.'
    },
    {
      q: '¿Cómo funciona el modo Arcade de la zona de desafíos?',
      a: 'Cada respuesta correcta consecutiva incrementa tu multiplicador de racha (1.5x a partir de 3 aciertos, 2x a partir de 5 y 3x a partir de 8). Puedes jugar con temporizador contrarreloj o desactivarlo para resolver a tu propio ritmo.'
    }
  ];

  return (
    <>
      <footer className="border-t border-slate-800 bg-slate-950 text-slate-400 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            
            {/* Columna Marca & Propósito */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-2.5 text-white">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20">
                  <Compass className="w-4 h-4" />
                </div>
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-cyan-400 to-indigo-300 bg-clip-text text-transparent">
                  MathVerse
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
                Plataforma interactiva abierta dedicada a transformar la enseñanza de las matemáticas mediante laboratorios dinámicos, deducción paso a paso y retos gamificados.
              </p>
              <div className="text-xs text-slate-400">
                Construido para estudiantes y apasionados del universo matemático.
              </div>
            </div>

            {/* Columna Navegación Rápida */}
            <div className="space-y-3">
              <div className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
                Plataforma
              </div>
              <ul className="space-y-2 text-xs">
                <li>
                  <button onClick={() => onNavigate('inicio')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                    Inicio
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('temas')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                    Temas Curriculares
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('laboratorio')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                    Laboratorio Interactivo
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('desafios')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                    Zona de Desafíos Arcade
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('progreso')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                    Panel de Progreso
                  </button>
                </li>
              </ul>
            </div>

            {/* Columna Herramientas */}
            <div className="space-y-3">
              <div className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
                Herramientas Lab
              </div>
              <ul className="space-y-2 text-xs">
                <li>Resolutor de Ecuaciones</li>
                <li>Geometría y Volúmenes 3D</li>
                <li>Graficador de Funciones</li>
                <li>Calculadora Científica</li>
                <li>Conversor de Fracciones</li>
                <li>Generador de Práctica</li>
              </ul>
            </div>

            {/* Columna Ayuda & Contacto */}
            <div className="space-y-3">
              <div className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
                Soporte & Ayuda
              </div>
              <ul className="space-y-2 text-xs">
                <li>
                  <button 
                    onClick={() => setShowFaqModal(true)} 
                    className="hover:text-cyan-400 transition-colors flex items-center gap-1 cursor-pointer text-cyan-400"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Preguntas Frecuentes (FAQ)</span>
                  </button>
                </li>
                <li>
                  <span className="text-slate-400">Contacto Educativo:</span>
                  <div className="font-mono text-slate-300 mt-0.5">soporte@mathverse.edu</div>
                </li>
                <li>
                  <span className="text-slate-400">Licencia de Código:</span>
                  <div className="text-slate-300">Educativa de Código Abierto (MIT)</div>
                </li>
              </ul>
            </div>

          </div>

          {/* Barra de Copyright y Nota de Propósito Educativo */}
          <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div>
              © 2026 MathVerse · Diseñado para la exploración y el aprendizaje activo de las matemáticas.
            </div>
            <div className="text-slate-400">
              Precisión de cálculo rigurosa · Sin recopilación de datos de terceros
            </div>
          </div>

        </div>
      </footer>

      {/* Modal de Preguntas Frecuentes (FAQ) */}
      {showFaqModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[85vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2 text-white font-bold text-lg">
                <HelpCircle className="w-5 h-5 text-cyan-400" />
                <span>Preguntas Frecuentes (FAQ)</span>
              </div>
              <button
                onClick={() => setShowFaqModal(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div key={idx} className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden">
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full p-4 text-left flex items-center justify-between text-sm font-semibold text-white hover:text-cyan-400 transition-colors cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-cyan-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />}
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-900 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="text-right pt-2">
              <button
                onClick={() => setShowFaqModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
