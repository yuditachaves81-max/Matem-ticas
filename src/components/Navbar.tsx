import React from 'react';
import { Compass, Moon, Sun, Volume2, VolumeX, Menu, X, Flame } from 'lucide-react';

interface NavbarProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  currentStreak: number;
  xp: number;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  onToggleTheme,
  soundEnabled,
  onToggleSound,
  currentStreak,
  xp,
  onNavigate
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md border-b transition-colors duration-200 bg-slate-950/85 border-slate-800/80 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zona 1: Marca en una sola línea */}
        <a 
          href="#inicio" 
          onClick={(e) => { e.preventDefault(); handleNavClick('inicio'); }}
          className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20">
            <Compass className="w-5 h-5 animate-spin-slow" />
          </div>
          <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
            MathVerse
          </span>
        </a>

        {/* Zona 2: 5 enlaces de navegación en una línea */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => handleNavClick('inicio')}
            className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Inicio
          </button>
          <button
            onClick={() => handleNavClick('temas')}
            className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Temas
          </button>
          <button
            onClick={() => handleNavClick('laboratorio')}
            className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Laboratorio
          </button>
          <button
            onClick={() => handleNavClick('desafios')}
            className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Desafíos
          </button>
          <button
            onClick={() => handleNavClick('progreso')}
            className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Progreso
          </button>
        </nav>

        {/* Zona 3: Indicador de racha, audio, tema y acción principal */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Indicador de racha sutil */}
          {currentStreak > 0 && (
            <div 
              title={`Racha activa: ${currentStreak} aciertos`}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/30 whitespace-nowrap"
            >
              <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400 animate-pulse" />
              <span>{currentStreak}</span>
            </div>
          )}

          {/* XP acumulado */}
          <div 
            title="Puntos de experiencia acumulados"
            className="hidden sm:flex items-center px-2.5 py-1 rounded-lg text-xs font-mono font-medium bg-indigo-950/60 text-indigo-300 border border-indigo-700/40"
          >
            <span>{xp} XP</span>
          </div>

          {/* Botón Silencio / Sonido */}
          <button
            onClick={onToggleSound}
            aria-label={soundEnabled ? 'Silenciar sonidos' : 'Activar sonidos'}
            title={soundEnabled ? 'Silenciar audio arcade' : 'Activar audio arcade'}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>

          {/* Botón Modo Oscuro / Claro */}
          <button
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            title={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-indigo-400" />}
          </button>

          {/* Botón primario de acción */}
          <button
            onClick={() => handleNavClick('desafios')}
            className="hidden lg:inline-flex items-center px-3.5 py-1.5 text-xs font-semibold rounded-lg text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 transition-all shadow-sm shadow-cyan-400/20 whitespace-nowrap cursor-pointer"
          >
            Jugar Reto
          </button>

          {/* Toggle menú móvil */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir menú de navegación"
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Menú desplegable para móviles */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950/95 px-4 pt-2 pb-4 space-y-1">
          <button
            onClick={() => handleNavClick('inicio')}
            className="w-full text-left px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800 rounded-lg"
          >
            Inicio
          </button>
          <button
            onClick={() => handleNavClick('temas')}
            className="w-full text-left px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800 rounded-lg"
          >
            Temas Curriculares
          </button>
          <button
            onClick={() => handleNavClick('laboratorio')}
            className="w-full text-left px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800 rounded-lg"
          >
            Laboratorio Matemático
          </button>
          <button
            onClick={() => handleNavClick('desafios')}
            className="w-full text-left px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800 rounded-lg"
          >
            Zona de Desafíos Arcade
          </button>
          <button
            onClick={() => handleNavClick('progreso')}
            className="w-full text-left px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800 rounded-lg"
          >
            Mi Progreso y Logros
          </button>
        </div>
      )}
    </header>
  );
};
