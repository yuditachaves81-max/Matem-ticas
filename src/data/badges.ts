import { Badge } from '../types/math';

export const INITIAL_BADGES: Badge[] = [
  {
    id: 'primer-paso',
    title: 'Primer Destello',
    description: 'Resuelve tu primer ejercicio con éxito en cualquier sección.',
    icon: 'Sparkles',
    unlocked: false,
    category: 'challenge'
  },
  {
    id: 'racha-fuego-3',
    title: 'En Llamas',
    description: 'Alcanza una racha de 3 respuestas correctas consecutivas.',
    icon: 'Flame',
    unlocked: false,
    category: 'streak'
  },
  {
    id: 'racha-fuego-7',
    title: 'Imparable',
    description: 'Consigue una racha épica de 7 respuestas correctas sin fallar.',
    icon: 'Zap',
    unlocked: false,
    category: 'streak'
  },
  {
    id: 'maestro-algebra',
    title: 'Mente Algebraica',
    description: 'Resuelve una ecuación cuadrática o sistema 2x2 en el laboratorio.',
    icon: 'Variable',
    unlocked: false,
    category: 'lab'
  },
  {
    id: 'explorador-3d',
    title: 'Arquitecto Espacial',
    description: 'Modifica parámetros geométricos tridimensionales en el laboratorio.',
    icon: 'Shapes',
    unlocked: false,
    category: 'lab'
  },
  {
    id: 'centurio-puntos',
    title: 'Mil Puntos de Saber',
    description: 'Acumula más de 1,000 puntos XP en tu trayectoria matemática.',
    icon: 'Award',
    unlocked: false,
    category: 'mastery'
  },
  {
    id: 'graficador-pro',
    title: 'Cartógrafo de Curvas',
    description: 'Traza y analiza una función matemática en el graficador interactivo.',
    icon: 'LineChart',
    unlocked: false,
    category: 'lab'
  },
  {
    id: 'sabio-fracciones',
    title: 'Fracción Irreducible',
    description: 'Convierte y simplifica fracciones en el conversor universal.',
    icon: 'Percent',
    unlocked: false,
    category: 'lab'
  }
];
