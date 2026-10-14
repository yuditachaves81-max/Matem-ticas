import { ChallengeQuestion, DifficultyLevel, TopicId } from '../types/math';

export const STATIC_CHALLENGES: ChallengeQuestion[] = [
  // Aritmética
  {
    id: 'ch-ari-1',
    topicId: 'aritmetica',
    topicName: 'Aritmética',
    difficulty: 'facil',
    question: '¿Cuál es el resultado de la operación: 24 - 4 × 5 + 6 ÷ 2?',
    latexFormula: '24 - 4 \\times 5 + 6 \\div 2',
    options: ['7', '10', '13', '15'],
    correctOptionIndex: 0,
    explanation: 'Por jerarquía de operaciones: primero multiplicaciones y divisiones (4×5 = 20, 6÷2 = 3). Luego sumas y restas: 24 - 20 + 3 = 4 + 3 = 7.',
    points: 100
  },
  {
    id: 'ch-ari-2',
    topicId: 'aritmetica',
    topicName: 'Aritmética',
    difficulty: 'facil',
    question: 'Si un pantalón de $60 tiene un 25% de descuento, ¿cuál es el monto a pagar?',
    options: ['$45', '$48', '$50', '$52'],
    correctOptionIndex: 0,
    explanation: 'El 25% de 60 es 60 × 0.25 = 15. Restando del valor original: 60 - 15 = $45 (o 60 × 0.75 = 45).',
    points: 100
  },
  {
    id: 'ch-ari-3',
    topicId: 'aritmetica',
    topicName: 'Aritmética',
    difficulty: 'intermedio',
    question: '¿A qué fracción irreducible equivale la suma: 5/6 + 3/8?',
    latexFormula: '\\frac{5}{6} + \\frac{3}{8}',
    options: ['29/24', '8/14', '19/16', '31/24'],
    correctOptionIndex: 0,
    explanation: 'MCM(6, 8) = 24. 5/6 = 20/24 y 3/8 = 9/24. Sumando: (20 + 9)/24 = 29/24.',
    points: 150
  },
  {
    id: 'ch-ari-4',
    topicId: 'aritmetica',
    topicName: 'Aritmética',
    difficulty: 'avanzado',
    question: 'Simplifica la expresión de potencias: (2⁴ · 2⁻² · 3³) / (2 · 3²)',
    latexFormula: '\\frac{2^4 \\cdot 2^{-2} \\cdot 3^3}{2 \\cdot 3^2}',
    options: ['6', '12', '18', '24'],
    correctOptionIndex: 0,
    explanation: 'En base 2: 2^(4 - 2) / 2¹ = 2² / 2¹ = 2¹ = 2. En base 3: 3³ / 3² = 3¹. Multiplicando: 2 × 3 = 6.',
    points: 200
  },

  // Álgebra
  {
    id: 'ch-alg-1',
    topicId: 'algebra',
    topicName: 'Álgebra',
    difficulty: 'facil',
    question: 'Despeja la incógnita x en la ecuación lineal: 3x - 7 = 14',
    latexFormula: '3x - 7 = 14',
    options: ['x = 7', 'x = 8', 'x = 6', 'x = 21'],
    correctOptionIndex: 0,
    explanation: 'Sumamos 7 a ambos lados: 3x = 14 + 7 = 21. Dividimos entre 3: x = 21 / 3 = 7.',
    points: 100
  },
  {
    id: 'ch-alg-2',
    topicId: 'algebra',
    topicName: 'Álgebra',
    difficulty: 'intermedio',
    question: '¿Cuáles son las soluciones de la ecuación cuadrática: x² - 7x + 10 = 0?',
    latexFormula: 'x^2 - 7x + 10 = 0',
    options: ['x = 2 y x = 5', 'x = -2 y x = -5', 'x = 1 y x = 10', 'x = 3 y x = 4'],
    correctOptionIndex: 0,
    explanation: 'Factorizando: buscamos dos números que multiplicados den +10 y sumados den -7: son -2 y -5. (x - 2)(x - 5) = 0 => x = 2 y x = 5.',
    points: 150
  },
  {
    id: 'ch-alg-3',
    topicId: 'algebra',
    topicName: 'Álgebra',
    difficulty: 'intermedio',
    question: 'En el sistema { 2x + y = 7 , x - y = 2 }, ¿cuál es el valor de x?',
    latexFormula: '\\begin{cases} 2x + y = 7 \\\\ x - y = 2 \\end{cases}',
    options: ['x = 3', 'x = 2', 'x = 4', 'x = 5'],
    correctOptionIndex: 0,
    explanation: 'Sumando ambas ecuaciones miembro a miembro: (2x + y) + (x - y) = 7 + 2 => 3x = 9 => x = 3 (y en consecuencia y = 1).',
    points: 150
  },
  {
    id: 'ch-alg-4',
    topicId: 'algebra',
    topicName: 'Álgebra',
    difficulty: 'avanzado',
    question: 'Si el discriminante de ax² + bx + c = 0 es exactamente cero (Δ = 0), ¿qué propiedad tienen sus raíces?',
    options: [
      'Tiene una raíz real doble',
      'Tiene dos raíces reales distintas',
      'Tiene dos raíces imaginarias puras',
      'No tiene soluciones numéricas'
    ],
    correctOptionIndex: 0,
    explanation: 'Cuando Δ = b² - 4ac = 0, la raíz cuadrada de cero es 0, haciendo que x = (-b ± 0)/2a = -b/2a. Hay una única solución real doble y la parábola es tangente al eje x.',
    points: 200
  },

  // Geometría
  {
    id: 'ch-geo-1',
    topicId: 'geometria',
    topicName: 'Geometría',
    difficulty: 'facil',
    question: '¿Cuál es el área de un triángulo con base de 12 cm y altura de 5 cm?',
    latexFormula: 'A = \\frac{b \\cdot h}{2}',
    options: ['30 cm²', '60 cm²', '25 cm²', '17 cm²'],
    correctOptionIndex: 0,
    explanation: 'Área = (base × altura) / 2 = (12 × 5) / 2 = 60 / 2 = 30 cm².',
    points: 100
  },
  {
    id: 'ch-geo-2',
    topicId: 'geometria',
    topicName: 'Geometría',
    difficulty: 'intermedio',
    question: 'En un triángulo rectángulo, los catetos miden 9 cm y 12 cm. ¿Cuánto mide la hipotenusa?',
    latexFormula: 'c = \\sqrt{a^2 + b^2}',
    options: ['15 cm', '16 cm', '18 cm', '21 cm'],
    correctOptionIndex: 0,
    explanation: 'Por Teorema de Pitágoras: c = √(9² + 12²) = √(81 + 144) = √225 = 15 cm (terna pitagórica 3-4-5 multiplicada por 3).',
    points: 150
  },
  {
    id: 'ch-geo-3',
    topicId: 'geometria',
    topicName: 'Geometría',
    difficulty: 'avanzado',
    question: 'Un cono tiene radio de base r = 3 cm y altura h = 4 cm. ¿Cuál es su generatriz g?',
    latexFormula: 'g = \\sqrt{r^2 + h^2}',
    options: ['5 cm', '6 cm', '7 cm', '25 cm'],
    correctOptionIndex: 0,
    explanation: 'El radio y la altura forman los catetos del triángulo generador: g = √(3² + 4²) = √(9 + 16) = √25 = 5 cm.',
    points: 200
  },

  // Trigonometría
  {
    id: 'ch-trig-1',
    topicId: 'trigonometria',
    topicName: 'Trigonometría',
    difficulty: 'facil',
    question: '¿Cuál es el valor de sen(30°)?',
    options: ['1/2 (0.5)', '√3 / 2', '√2 / 2', '1'],
    correctOptionIndex: 0,
    explanation: 'El seno de 30° es exactamente 1/2. En el círculo unitario, a 30° la coordenada vertical y es 0.5.',
    points: 100
  },
  {
    id: 'ch-trig-2',
    topicId: 'trigonometria',
    topicName: 'Trigonometría',
    difficulty: 'intermedio',
    question: 'Si sen(θ) = 3/5 en el primer cuadrante, ¿cuál es el valor de cos(θ)?',
    latexFormula: '\\cos(\\theta) = \\sqrt{1 - \\operatorname{sen}^2(\\theta)}',
    options: ['4/5', '2/5', '3/4', '1/5'],
    correctOptionIndex: 0,
    explanation: 'Por la identidad pitagórica sen²θ + cos²θ = 1: cos(θ) = √(1 - (3/5)²) = √(1 - 9/25) = √(16/25) = 4/5.',
    points: 150
  },
  {
    id: 'ch-trig-3',
    topicId: 'trigonometria',
    topicName: 'Trigonometría',
    difficulty: 'avanzado',
    question: '¿A qué equivale la identidad trigonométrica: (1 - cos²(x)) / sen(x)?',
    options: ['sen(x)', 'cos(x)', 'tan(x)', '1'],
    correctOptionIndex: 0,
    explanation: 'Dado que 1 - cos²(x) = sen²(x), al dividir entre sen(x) obtenemos sen²(x) / sen(x) = sen(x).',
    points: 200
  },

  // Funciones
  {
    id: 'ch-func-1',
    topicId: 'funciones',
    topicName: 'Funciones',
    difficulty: 'facil',
    question: 'En la función lineal f(x) = -3x + 8, ¿cuál es la pendiente (m)?',
    options: ['-3', '8', '3', '-8'],
    correctOptionIndex: 0,
    explanation: 'En la forma canónica f(x) = mx + b, el coeficiente m que acompaña a la variable independiente x es la pendiente; aquí m = -3.',
    points: 100
  },
  {
    id: 'ch-func-2',
    topicId: 'funciones',
    topicName: 'Funciones',
    difficulty: 'intermedio',
    question: '¿En qué coordenadas se encuentra el vértice de la parábola f(x) = (x - 4)² + 3?',
    options: ['(4, 3)', '(-4, 3)', '(4, -3)', '(-4, -3)'],
    correctOptionIndex: 0,
    explanation: 'La forma canónica del vértice es f(x) = a(x - h)² + k, donde el vértice es V(h, k). Con h = 4 y k = 3, el vértice es (4, 3).',
    points: 150
  },

  // Estadística
  {
    id: 'ch-est-1',
    topicId: 'estadistica',
    topicName: 'Estadística',
    difficulty: 'facil',
    question: '¿Cuál es la media aritmética de los números: 8, 12, 14, 10 y 6?',
    options: ['10', '9.5', '11', '12'],
    correctOptionIndex: 0,
    explanation: 'Suma de los valores = 8 + 12 + 14 + 10 + 6 = 50. Como hay 5 observaciones: 50 / 5 = 10.',
    points: 100
  },
  {
    id: 'ch-est-2',
    topicId: 'estadistica',
    topicName: 'Estadística',
    difficulty: 'intermedio',
    question: 'Al lanzar dos dados legales de 6 caras, ¿cuál es la probabilidad de que la suma sea exactamente 7?',
    options: ['6/36 (1/6)', '5/36', '7/36', '1/12'],
    correctOptionIndex: 0,
    explanation: 'Existen 36 combinaciones posibles. Las sumas iguales a 7 son: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) = 6 combinaciones. P = 6/36 = 1/6.',
    points: 150
  },

  // Cálculo
  {
    id: 'ch-calc-1',
    topicId: 'calculo',
    topicName: 'Cálculo',
    difficulty: 'avanzado',
    question: '¿Cuál es la derivada de la función f(x) = 5x³ - 2x² + 7?',
    latexFormula: 'f\'(x) = \\frac{d}{dx}[5x^3 - 2x^2 + 7]',
    options: ['15x² - 4x', '15x³ - 4x', '10x² - 2x', '15x² - 4x + 7'],
    correctOptionIndex: 0,
    explanation: 'Por la regla de la potencia: d/dx[5x³] = 15x², d/dx[-2x²] = -4x y la constante d/dx[7] = 0. f\'(x) = 15x² - 4x.',
    points: 200
  }
];

/**
 * Generador procedural dinámico de retos matemáticos para práctica infinita
 */
export function generateRandomChallenge(difficulty: DifficultyLevel, topicFilter?: TopicId): ChallengeQuestion {
  // Si hay preguntas estáticas que cumplen los filtros, las mezclamos con ejercicios algorítmicos
  const filtered = STATIC_CHALLENGES.filter(
    (c) => (!topicFilter || c.topicId === topicFilter) && c.difficulty === difficulty
  );

  if (Math.random() > 0.4 && filtered.length > 0) {
    const randomIndex = Math.floor(Math.random() * filtered.length);
    return filtered[randomIndex];
  }

  // Generación algorítmica de ecuación lineal o aritmética
  const a = Math.floor(Math.random() * 8) + 2;
  const x = Math.floor(Math.random() * 12) + 1;
  const b = Math.floor(Math.random() * 20) + 1;
  const c = a * x + b;

  const fakeOptions = [
    `${x}`,
    `${x + 1}`,
    `${Math.max(1, x - 2)}`,
    `${x + 3}`
  ].sort(() => Math.random() - 0.5);

  const correctIndex = fakeOptions.indexOf(`${x}`);

  return {
    id: `dynamic-${Date.now()}-${Math.random()}`,
    topicId: 'algebra',
    topicName: 'Álgebra Dinámica',
    difficulty,
    question: `Resuelve para x en la ecuación: ${a}x + ${b} = ${c}`,
    latexFormula: `${a}x + ${b} = ${c}`,
    options: fakeOptions.map((opt) => `x = ${opt}`),
    correctOptionIndex: correctIndex,
    explanation: `Restamos ${b} en ambos lados: ${a}x = ${c - b}. Luego dividimos entre ${a}: x = ${c - b} / ${a} = ${x}.`,
    points: difficulty === 'facil' ? 100 : difficulty === 'intermedio' ? 150 : 200
  };
}
