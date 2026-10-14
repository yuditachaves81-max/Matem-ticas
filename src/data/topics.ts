import { TopicCategory } from '../types/math';

export const TOPICS_DATA: TopicCategory[] = [
  {
    id: 'aritmetica',
    title: 'Aritmética',
    shortDesc: 'Operaciones fundamentales, fracciones, porcentajes, razones y potencias.',
    difficultyLabel: 'Fundamental',
    difficulty: 'facil',
    iconName: 'Calculator',
    accentColor: '#06B6D4',
    lessonsCount: 3,
    featuredFormula: 'a^m · a^n = a^(m+n)',
    subtopics: ['Jerarquía de operaciones', 'Operaciones con fracciones', 'Porcentajes y descuentos', 'Leyes de los exponentes'],
    lessons: [
      {
        id: 'arit-1',
        topicId: 'aritmetica',
        title: 'Fracciones y Operaciones con Distinto Denominador',
        subtitle: 'Suma y resta aplicando el mínimo común múltiplo (MCM).',
        difficulty: 'facil',
        fundamentalConcept: 'Una fracción a/b representa a partes tomadas de una unidad dividida en b partes iguales. Al sumar fracciones con distinto denominador, no sumamos cosas del mismo tamaño, por lo que primero debemos homogenizarlas.',
        simpleExplanation: 'Imagina cortar una pizza en 4 rebanadas y otra en 6. Una rebanada de la primera es más grande que una de la segunda. Para poder sumarlas con justicia, debemos subdividir ambas pizzas en rebanadas del mismo tamaño (el mínimo común múltiplo de los denominadores).',
        relevantFormula: 'a/b + c/d = (a·d + b·c) / (b·d)',
        formulaDescription: 'Regla general de homogenización donde el denominador común es el producto o MCM de b y d.',
        workedExample: {
          problemStatement: 'Calcular la suma irreducible de: 2/3 + 3/4',
          steps: [
            {
              title: 'Paso 1: Hallar el mínimo común denominador',
              expression: 'MCM(3, 4) = 12',
              explanation: 'Buscamos el menor múltiplo positivo común entre 3 y 4. Como 3 y 4 son primos entre sí, su MCM es 3 × 4 = 12.'
            },
            {
              title: 'Paso 2: Convertir cada fracción a denominador 12',
              expression: '2/3 = (2 × 4) / (3 × 4) = 8/12\n3/4 = (3 × 3) / (4 × 3) = 9/12',
              explanation: 'Multiplicamos numerador y denominador por el factor correspondiente para no alterar el valor de la fracción.'
            },
            {
              title: 'Paso 3: Sumar los numeradores sobre el denominador común',
              expression: '(8 + 9) / 12 = 17/12',
              explanation: 'Ahora que ambas representan rebanadas del mismo calibre (doceavos), simplemente sumamos 8 + 9 = 17.'
            }
          ],
          finalResult: '17/12 (Fracción impropia equivalente a 1 entero y 5/12).'
        },
        practiceExercise: {
          question: '¿Cuál es el resultado simplificado de: 3/5 + 1/2?',
          formulaHint: 'MCM(5, 2) = 10',
          options: ['4/7', '11/10', '7/10', '5/10'],
          correctAnswer: '11/10',
          explanation: '3/5 = 6/10 y 1/2 = 5/10. Sumando: (6 + 5)/10 = 11/10.',
          hint: 'Convierte ambas fracciones a décimos.'
        },
        solutionExplanation: 'Al tener denominadores 5 y 2, el denominador común es 10. Multiplicamos la primera por 2 (6/10) y la segunda por 5 (5/10). La suma directa de numeradores es 6 + 5 = 11, dando 11/10.'
      },
      {
        id: 'arit-2',
        topicId: 'aritmetica',
        title: 'Porcentajes y Variaciones Relativas',
        subtitle: 'Cálculo de aumentos, descuentos sucesivos y tasas porcentuales.',
        difficulty: 'facil',
        fundamentalConcept: 'El porcentaje (%) expresa una proporción de una cantidad dividida en cien partes iguales. Representa la fracción x/100 o el decimal x · 0.01.',
        simpleExplanation: 'Calcular el 20% de un precio significa tomar 20 unidades por cada 100 del valor. Si algo cuesta 100€, el 20% son 20€.',
        relevantFormula: 'Valor Final = Valor Inicial · (1 ± r/100)',
        formulaDescription: 'Donde r es el porcentaje de incremento (+) o decremento (-).',
        workedExample: {
          problemStatement: 'Un artículo cuesta $80 y tiene un descuento del 15%. ¿Cuál es el precio final?',
          steps: [
            {
              title: 'Paso 1: Convertir el porcentaje a factor decimal',
              expression: '15% = 15 / 100 = 0.15',
              explanation: 'Dividimos la tasa entre cien para operar aritméticamente.'
            },
            {
              title: 'Paso 2: Calcular el monto del descuento',
              expression: 'Descuento = 80 × 0.15 = $12',
              explanation: 'Multiplicamos el valor base por la tasa de reducción.'
            },
            {
              title: 'Paso 3: Restar el descuento del precio original',
              expression: 'Precio Final = 80 - 12 = $68',
              explanation: 'También calculable directamente como: 80 × (1 - 0.15) = 80 × 0.85 = $68.'
            }
          ],
          finalResult: '$68'
        },
        practiceExercise: {
          question: 'Si una prenda de $50 recibe un 20% de descuento y luego un 10% adicional sobre el saldo, ¿cuál es el precio final?',
          options: ['$35', '$36', '$38', '$40'],
          correctAnswer: '$36',
          explanation: 'Primer descuento: $50 × 0.80 = $40. Segundo descuento: $40 × 0.90 = $36.',
          hint: 'Aplica los descuentos sucesivamente multiplicando por 0.8 y luego por 0.9.'
        },
        solutionExplanation: 'Los porcentajes sucesivos no se suman algebraicamente. Primero calculamos 50 · 0.80 = 40, y sobre ese nuevo monto descontamos el 10%, resultando 40 · 0.90 = 36.'
      }
    ]
  },
  {
    id: 'algebra',
    title: 'Álgebra',
    shortDesc: 'Ecuaciones lineales y cuadráticas, factorización y sistemas de ecuaciones.',
    difficultyLabel: 'Secundaria / Media',
    difficulty: 'intermedio',
    iconName: 'Variable',
    accentColor: '#8B5CF6',
    lessonsCount: 3,
    featuredFormula: 'x = (-b ± √(b² - 4ac)) / 2a',
    subtopics: ['Despeje de incógnitas', 'Factorización de polinomios', 'Fórmula general cuadrática', 'Sistemas 2x2'],
    lessons: [
      {
        id: 'alg-1',
        topicId: 'algebra',
        title: 'Ecuaciones Cuadráticas y la Fórmula General',
        subtitle: 'Resolución de ax² + bx + c = 0 e interpretación del discriminante.',
        difficulty: 'intermedio',
        fundamentalConcept: 'Una ecuación cuadrática es una ecuación polinómica de segundo grado. Sus soluciones corresponden a los puntos donde la parábola y = ax² + bx + c corta el eje horizontal x.',
        simpleExplanation: 'La fórmula cuadrática es como una llave universal que abre cualquier ecuación de segundo grado, usando únicamente sus tres coeficientes (a, b y c).',
        relevantFormula: 'x = (-b ± √(b² - 4ac)) / (2a)',
        formulaDescription: 'El término dentro de la raíz, Δ = b² - 4ac, se llama discriminante y revela la naturaleza de las raíces.',
        workedExample: {
          problemStatement: 'Resolver la ecuación: x² - 5x + 6 = 0',
          steps: [
            {
              title: 'Paso 1: Identificar los coeficientes a, b, c',
              expression: 'a = 1,  b = -5,  c = 6',
              explanation: 'El coeficiente que acompaña a x² es 1, el que acompaña a x es -5, y el término constante es 6.'
            },
            {
              title: 'Paso 2: Calcular el discriminante Δ = b² - 4ac',
              expression: 'Δ = (-5)² - 4(1)(6) = 25 - 24 = 1',
              explanation: 'Como Δ = 1 > 0, existen dos soluciones reales distintas y su raíz cuadrada es √1 = 1.'
            },
            {
              title: 'Paso 3: Aplicar la fórmula general',
              expression: 'x = (-(-5) ± 1) / (2·1) = (5 ± 1) / 2',
              explanation: 'Separamos la rama de suma (+) y la rama de resta (-).'
            },
            {
              title: 'Paso 4: Obtener las dos raíces',
              expression: 'x₁ = (5 + 1) / 2 = 6 / 2 = 3\nx₂ = (5 - 1) / 2 = 4 / 2 = 2',
              explanation: 'Ambas raíces son válidas. Factorizada, la ecuación es (x - 3)(x - 2) = 0.'
            }
          ],
          finalResult: 'x₁ = 3,  x₂ = 2'
        },
        practiceExercise: {
          question: '¿Cuáles son las soluciones reales de: x² - 4x - 5 = 0?',
          options: ['x = 5 y x = -1', 'x = 4 y x = -5', 'x = 2 y x = -2', 'x = 1 y x = -5'],
          correctAnswer: 'x = 5 y x = -1',
          explanation: 'Δ = (-4)² - 4(1)(-5) = 16 + 20 = 36. √36 = 6. x = (4 ± 6)/2 => x₁ = 5, x₂ = -1.',
          hint: 'El discriminante es 36, cuya raíz cuadrada exacta es 6.'
        },
        solutionExplanation: 'Con a = 1, b = -4, c = -5: Δ = 16 - 4(1)(-5) = 36. Aplicando la fórmula: x = (4 ± 6)/2. Obtenemos x₁ = 10/2 = 5 y x₂ = -2/2 = -1.'
      }
    ]
  },
  {
    id: 'geometria',
    title: 'Geometría',
    shortDesc: 'Figuras planas, volúmenes tridimensionales, Teorema de Pitágoras y ángulos.',
    difficultyLabel: 'Secundaria',
    difficulty: 'intermedio',
    iconName: 'Shapes',
    accentColor: '#10B981',
    lessonsCount: 2,
    featuredFormula: 'a² + b² = c²',
    subtopics: ['Teorema de Pitágoras', 'Áreas y perímetros 2D', 'Volumen de cuerpos redondos', 'Semejanza de triángulos'],
    lessons: [
      {
        id: 'geo-1',
        topicId: 'geometria',
        title: 'El Teorema de Pitágoras y Aplicaciones',
        subtitle: 'Relación fundamental entre los catetos y la hipotenusa en triángulos rectángulos.',
        difficulty: 'intermedio',
        fundamentalConcept: 'En todo triángulo rectángulo, el área del cuadrado construido sobre la hipotenusa (el lado opuesto al ángulo recto) es igual a la suma de las áreas de los cuadrados construidos sobre los dos catetos.',
        simpleExplanation: 'Si caminas hacia el este y luego hacia el norte, la distancia en línea recta de regreso al punto de partida es la hipotenusa, y siempre se puede calcular sumando los cuadrados de tus dos tramos y sacando la raíz cuadrada.',
        relevantFormula: 'c² = a² + b²  =>  c = √(a² + b²)',
        formulaDescription: 'Donde a y b son las longitudes de los catetos y c es la longitud de la hipotenusa.',
        workedExample: {
          problemStatement: 'Un triángulo rectángulo tiene catetos de 6 cm y 8 cm. Hallar la hipotenusa.',
          steps: [
            {
              title: 'Paso 1: Elevar al cuadrado ambos catetos',
              expression: 'a² = 6² = 36\nb² = 8² = 64',
              explanation: 'Calculamos el área de los cuadrados correspondientes a cada cateto.'
            },
            {
              title: 'Paso 2: Sumar ambas áreas',
              expression: 'c² = 36 + 64 = 100',
              explanation: 'De acuerdo al teorema, la suma de los catetos al cuadrado da la hipotenusa al cuadrado.'
            },
            {
              title: 'Paso 3: Extraer la raíz cuadrada principal',
              expression: 'c = √100 = 10 cm',
              explanation: 'Dado que una longitud debe ser positiva, tomamos la raíz positiva.'
            }
          ],
          finalResult: 'c = 10 cm'
        },
        practiceExercise: {
          question: 'Si una escalera de 5 metros se apoya en una pared con su base a 3 metros de ella, ¿a qué altura llega en la pared?',
          options: ['4 metros', '3.5 metros', '4.2 metros', '2 metros'],
          correctAnswer: '4 metros',
          explanation: 'h = √(5² - 3²) = √(25 - 9) = √16 = 4 metros.',
          hint: 'Despeja un cateto: b = √(c² - a²).'
        },
        solutionExplanation: 'La escalera es la hipotenusa (c = 5m) y la distancia a la pared es un cateto (a = 3m). La altura h es el otro cateto: h² = 5² - 3² = 25 - 9 = 16, por tanto h = 4 metros.'
      }
    ]
  },
  {
    id: 'trigonometria',
    title: 'Trigonometría',
    shortDesc: 'Razones trigonométricas, círculo unitario, identidades y resolución de triángulos.',
    difficultyLabel: 'Secundaria / Bachillerato',
    difficulty: 'intermedio',
    iconName: 'Compass',
    accentColor: '#F59E0B',
    lessonsCount: 2,
    featuredFormula: 'sen²(θ) + cos²(θ) = 1',
    subtopics: ['Seno, Coseno y Tangente', 'Círculo Unitario', 'Identidad Pitagórica', 'Ley de Senos y Cosenos'],
    lessons: [
      {
        id: 'trig-1',
        topicId: 'trigonometria',
        title: 'Razones Trigonométricas Fundamentales',
        subtitle: 'Definición de seno, coseno y tangente en el triángulo rectángulo.',
        difficulty: 'intermedio',
        fundamentalConcept: 'Las razones trigonométricas son cocientes invariantes entre los lados de un triángulo rectángulo que dependen exclusivamente del ángulo agudo θ considerado.',
        simpleExplanation: 'No importa el tamaño del triángulo: si tiene un ángulo de 30°, la razón entre el cateto opuesto y la hipotenusa siempre será exactamente 0.5 (1/2).',
        relevantFormula: 'sen(θ) = Opuesto/Hipotenusa, cos(θ) = Adyacente/Hipotenusa, tan(θ) = Opuesto/Adyacente',
        formulaDescription: 'Regla mnemotécnica clásica: SOH - CAH - TOA.',
        workedExample: {
          problemStatement: 'En un triángulo rectángulo con hipotenusa 13 cm y cateto adyacente al ángulo θ de 12 cm, calcular sen(θ), cos(θ) y tan(θ).',
          steps: [
            {
              title: 'Paso 1: Hallar el cateto opuesto mediante Pitágoras',
              expression: 'Opuesto = √(13² - 12²) = √(169 - 144) = √25 = 5 cm',
              explanation: 'Calculamos el cateto faltante necesario para evaluar el seno y la tangente.'
            },
            {
              title: 'Paso 2: Calcular el seno',
              expression: 'sen(θ) = 5 / 13 ≈ 0.3846',
              explanation: 'Cateto opuesto dividido entre la hipotenusa.'
            },
            {
              title: 'Paso 3: Calcular el coseno',
              expression: 'cos(θ) = 12 / 13 ≈ 0.9231',
              explanation: 'Cateto adyacente dividido entre la hipotenusa.'
            },
            {
              title: 'Paso 4: Calcular la tangente',
              expression: 'tan(θ) = 5 / 12 ≈ 0.4167',
              explanation: 'Cateto opuesto dividido entre el cateto adyacente.'
            }
          ],
          finalResult: 'sen(θ) = 5/13,  cos(θ) = 12/13,  tan(θ) = 5/12'
        },
        practiceExercise: {
          question: '¿Cuál es el valor exacto de tan(45°)?',
          options: ['0', '1', '√2 / 2', '√3'],
          correctAnswer: '1',
          explanation: 'En un triángulo rectángulo isósceles de 45°-45°, los dos catetos son iguales. Cateto Opuesto / Cateto Adyacente = x / x = 1.',
          hint: 'Recuerda que para 45°, ambos catetos tienen idéntica longitud.'
        },
        solutionExplanation: 'A 45 grados, el cateto opuesto y el adyacente tienen exactamente la misma longitud. Al dividirlos: tan(45°) = a / a = 1.'
      }
    ]
  },
  {
    id: 'funciones',
    title: 'Funciones y Gráficas',
    shortDesc: 'Funciones lineales, cuadráticas, polinomios, dominio, rango y transformaciones.',
    difficultyLabel: 'Secundaria / Bachillerato',
    difficulty: 'intermedio',
    iconName: 'LineChart',
    accentColor: '#EC4899',
    lessonsCount: 2,
    featuredFormula: 'f(x) = mx + b',
    subtopics: ['Pendiente e intersección', 'Parábolas y vértice', 'Dominio y rango', 'Comportamiento en los extremos'],
    lessons: [
      {
        id: 'func-1',
        topicId: 'funciones',
        title: 'Función Lineal: Pendiente y Ecuación Punto-Pendiente',
        subtitle: 'Comprensión geométrica de la tasa de variación constante m.',
        difficulty: 'intermedio',
        fundamentalConcept: 'Una función lineal describe una relación donde la tasa de cambio entre dos variables es constante. Su representación gráfica en el plano cartesiano es siempre una línea recta.',
        simpleExplanation: 'La pendiente m indica la inclinación: cuánto sube o baja la recta por cada paso que das hacia la derecha. La ordenada al origen b indica dónde cruza el eje vertical.',
        relevantFormula: 'y = mx + b   donde   m = (y₂ - y₁) / (x₂ - x₁)',
        formulaDescription: 'm es la pendiente (razón de cambio) y b es el corte con el eje vertical Y.',
        workedExample: {
          problemStatement: 'Hallar la ecuación de la recta que pasa por los puntos A(2, 3) y B(4, 7).',
          steps: [
            {
              title: 'Paso 1: Calcular la pendiente m',
              expression: 'm = (7 - 3) / (4 - 2) = 4 / 2 = 2',
              explanation: 'Dividimos el cambio vertical Δy = 7 - 3 entre el cambio horizontal Δx = 4 - 2.'
            },
            {
              title: 'Paso 2: Hallar el intercepto b',
              expression: 'y = mx + b  =>  3 = 2(2) + b  =>  3 = 4 + b  =>  b = 3 - 4 = -1',
              explanation: 'Sustituimos la pendiente m = 2 y las coordenadas del punto A(2, 3) para despejar b.'
            },
            {
              title: 'Paso 3: Escribir la ecuación general',
              expression: 'y = 2x - 1',
              explanation: 'Cada valor de x genera un valor de y multiplicándolo por 2 y restando 1.'
            }
          ],
          finalResult: 'f(x) = 2x - 1'
        },
        practiceExercise: {
          question: '¿Cuál es la pendiente de una recta que pasa por (1, 5) y (3, 11)?',
          options: ['2', '3', '4', '6'],
          correctAnswer: '3',
          explanation: 'm = (11 - 5) / (3 - 1) = 6 / 2 = 3.',
          hint: 'Aplica la fórmula de pendiente m = (y₂ - y₁) / (x₂ - x₁).'
        },
        solutionExplanation: 'El incremento vertical es 11 - 5 = 6 y el horizontal es 3 - 1 = 2. Dividiendo: 6 / 2 = 3.'
      }
    ]
  },
  {
    id: 'estadistica',
    title: 'Estadística y Probabilidad',
    shortDesc: 'Medidas de tendencia central, dispersión, diagramas y cálculo de probabilidades.',
    difficultyLabel: 'Secundaria / Bachillerato',
    difficulty: 'intermedio',
    iconName: 'BarChart2',
    accentColor: '#3B82F6',
    lessonsCount: 2,
    featuredFormula: 'P(A) = Casos Favorables / Casos Posibles',
    subtopics: ['Media, Mediana y Moda', 'Rango y Varianza', 'Regla de Laplace', 'Probabilidad de eventos independientes'],
    lessons: [
      {
        id: 'est-1',
        topicId: 'estadistica',
        title: 'Medidas de Tendencia Central: Media, Mediana y Moda',
        subtitle: 'Resumen descriptivo de conjuntos de datos y comparación de métricas.',
        difficulty: 'intermedio',
        fundamentalConcept: 'Las medidas de tendencia central son valores numéricos que señalan hacia el centro o valor típico de una distribución de datos.',
        simpleExplanation: 'La media es el promedio que todos conocemos; la mediana es el dato que queda exactamente en medio si los ordenas en fila; y la moda es el dato más repetido.',
        relevantFormula: 'x̄ = (Σ xᵢ) / n',
        formulaDescription: 'Suma de todos los valores dividida entre el número total de observaciones n.',
        workedExample: {
          problemStatement: 'Dado el conjunto de datos [4, 8, 6, 5, 3, 8, 8], hallar la media, mediana y moda.',
          steps: [
            {
              title: 'Paso 1: Ordenar los datos de menor a mayor',
              expression: 'Datos ordenados: [3, 4, 5, 6, 8, 8, 8]  (n = 7)',
              explanation: 'Ordenar es esencial para ubicar la mediana con precisión.'
            },
            {
              title: 'Paso 2: Calcular la Media aritmética (x̄)',
              expression: 'x̄ = (3 + 4 + 5 + 6 + 8 + 8 + 8) / 7 = 42 / 7 = 6',
              explanation: 'Sumamos todos los elementos y dividimos entre el total n = 7.'
            },
            {
              title: 'Paso 3: Identificar la Mediana (posición central)',
              expression: 'Posición = (7 + 1) / 2 = 4ª posición => Mediana = 6',
              explanation: 'El cuarto dato de la lista ordenada es 6, dejando 3 valores a la izquierda y 3 a la derecha.'
            },
            {
              title: 'Paso 4: Identificar la Moda (frecuencia máxima)',
              expression: 'El número 8 se repite 3 veces => Moda = 8',
              explanation: 'El 8 tiene la frecuencia absoluta más alta.'
            }
          ],
          finalResult: 'Media = 6,  Mediana = 6,  Moda = 8'
        },
        practiceExercise: {
          question: '¿Cuál es la mediana del conjunto de números: [12, 5, 9, 15, 3]?',
          options: ['5', '9', '12', '8.8'],
          correctAnswer: '9',
          explanation: 'Ordenados: [3, 5, 9, 12, 15]. El elemento central es 9.',
          hint: 'Recuerda ordenar los datos primero antes de elegir el del medio.'
        },
        solutionExplanation: 'Primero ordenamos los 5 números: 3, 5, 9, 12, 15. La posición del centro es la 3ª, correspondiente al número 9.'
      }
    ]
  },
  {
    id: 'calculo',
    title: 'Cálculo',
    shortDesc: 'Concepto intuitivo de límites, razón de cambio instantánea, derivadas e integrales.',
    difficultyLabel: 'Bachillerato / Introductorio',
    difficulty: 'avanzado',
    iconName: 'TrendingUp',
    accentColor: '#6366F1',
    lessonsCount: 2,
    featuredFormula: 'd/dx [xⁿ] = n · xⁿ⁻¹',
    subtopics: ['Concepto de límite', 'Derivada como pendiente tangente', 'Regla de la potencia', 'Integral como área bajo la curva'],
    lessons: [
      {
        id: 'calc-1',
        topicId: 'calculo',
        title: 'La Derivada y la Regla de la Potencia',
        subtitle: 'Tasa de variación instantánea y derivación algebraica de polinomios.',
        difficulty: 'avanzado',
        fundamentalConcept: 'La derivada de una función en un punto mide la rapidez con la que cambia el valor de dicha función según cambie el valor de su variable independiente. Geométricamente, es la pendiente de la recta tangente.',
        simpleExplanation: 'Si una función describe la distancia que recorre un coche en el tiempo, su derivada en cada segundo indica la velocidad exacta que marca el velocímetro en ese instante preciso.',
        relevantFormula: 'd/dx [xⁿ] = n · xⁿ⁻¹  y  d/dx [c · f(x)] = c · f\'(x)',
        formulaDescription: 'El exponente n baja a multiplicar como coeficiente y la variable queda elevada a n - 1.',
        workedExample: {
          problemStatement: 'Calcular la derivada de la función: f(x) = 3x⁴ - 5x² + 7x - 9',
          steps: [
            {
              title: 'Paso 1: Aplicar linealidad término a término',
              expression: 'd/dx [3x⁴] - d/dx [5x²] + d/dx [7x] - d/dx [9]',
              explanation: 'La derivada de una suma o resta es la suma o resta de las derivadas individuales.'
            },
            {
              title: 'Paso 2: Derivar cada término de potencia',
              expression: 'd/dx [3x⁴] = 3 · (4x³) = 12x³\nd/dx [5x²] = 5 · (2x¹) = 10x\nd/dx [7x] = 7 · (1x⁰) = 7',
              explanation: 'Multiplicamos el coeficiente existente por el exponente y restamos 1 a la potencia.'
            },
            {
              title: 'Paso 3: Derivar la constante pura',
              expression: 'd/dx [9] = 0',
              explanation: 'La derivada de cualquier número constante sin variable es siempre cero (su tasa de cambio es nula).'
            },
            {
              title: 'Paso 4: Reunir la función derivada',
              expression: 'f\'(x) = 12x³ - 10x + 7',
              explanation: 'Expresión final que evalúa la pendiente instantánea en cualquier punto x.'
            }
          ],
          finalResult: 'f\'(x) = 12x³ - 10x + 7'
        },
        practiceExercise: {
          question: '¿Cuál es la derivada de f(x) = 4x³ + 2x?',
          options: ['12x² + 2', '12x³ + 2', '7x² + 2', '12x² + 2x'],
          correctAnswer: '12x² + 2',
          explanation: 'd/dx [4x³] = 4·3x² = 12x². d/dx [2x] = 2·1 = 2. Sumando: 12x² + 2.',
          hint: 'Baja el exponente 3 a multiplicar por 4 y reduce la potencia a 2.'
        },
        solutionExplanation: 'Aplicando la regla de la potencia: el término 4x³ se convierte en 4 × 3 × x² = 12x², y el término 2x se convierte en 2 × 1 = 2. La suma es 12x² + 2.'
      }
    ]
  }
];
