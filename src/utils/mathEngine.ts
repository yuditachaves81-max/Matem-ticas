/**
 * Motor de Cálculo Matemático y Procedimientos Paso a Paso para MathVerse.
 * Realiza cálculos exactos, evaluaciones numéricas y deducciones didácticas.
 */

export interface StepRecord {
  stepNumber: number;
  title: string;
  expression: string;
  explanation: string;
}

export interface EquationSolution {
  type: 'lineal' | 'cuadratica' | 'sistema2x2';
  equationDisplay: string;
  steps: StepRecord[];
  results: { label: string; value: string }[];
  discriminant?: number;
  vertex?: { x: number; y: number };
  factorization?: string;
  isReal: boolean;
}

// Máximo Común Divisor (Algoritmo de Euclides)
export function gcd(a: number, b: number): number {
  a = Math.abs(Math.round(a));
  b = Math.abs(Math.round(b));
  while (b !== 0) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a || 1;
}

// Mínimo Común Múltiplo
export function lcm(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return Math.abs(a * b) / gcd(a, b);
}

// Redondeo pedagógico limpio
export function cleanRound(num: number, decimals: number = 4): number {
  if (Math.abs(num - Math.round(num)) < 1e-9) return Math.round(num);
  return Number(num.toFixed(decimals));
}

// Formateo de número a fracción si es racional cercano
export function toFractionString(decimal: number, maxDenominator: number = 1000): string {
  if (Math.abs(decimal - Math.round(decimal)) < 1e-7) {
    return `${Math.round(decimal)}`;
  }
  const sign = decimal < 0 ? -1 : 1;
  const absDec = Math.abs(decimal);

  let bestNum = 1;
  let bestDen = 1;
  let bestError = Math.abs(absDec - 1);

  for (let den = 1; den <= maxDenominator; den++) {
    const num = Math.round(absDec * den);
    const error = Math.abs(absDec - num / den);
    if (error < bestError) {
      bestNum = num;
      bestDen = den;
      bestError = error;
      if (error < 1e-7) break;
    }
  }

  if (bestError < 1e-5 && bestDen > 1) {
    return `${sign * bestNum}/${bestDen}`;
  }
  return `${cleanRound(decimal, 4)}`;
}

/**
 * 1. Resolutor de Ecuaciones Lineales: a*x + b = c*x + d
 */
export function solveLinearEquation(a: number, b: number, c: number = 0, d: number = 0): EquationSolution {
  const steps: StepRecord[] = [];
  const leftSide = `${a !== 1 ? (a === -1 ? '-' : a) : ''}x ${b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`}`;
  const rightSide = c !== 0 ? `${c !== 1 ? (c === -1 ? '-' : c) : ''}x ${d >= 0 ? `+ ${d}` : `- ${Math.abs(d)}`}` : `${d}`;
  const equationDisplay = `${leftSide} = ${rightSide}`;

  steps.push({
    stepNumber: 1,
    title: 'Ecuación original planteada',
    expression: equationDisplay,
    explanation: 'Identificamos los términos que contienen a la variable x y los términos constantes independientes.'
  });

  const netA = a - c;
  const netB = d - b;

  if (c !== 0) {
    steps.push({
      stepNumber: 2,
      title: 'Agrupar términos con la variable en el miembro izquierdo',
      expression: `${netA}x + ${b} = ${d}`,
      explanation: `Restamos ${c}x en ambos miembros de la ecuación para reunir la variable en un solo lado.`
    });
  }

  steps.push({
    stepNumber: steps.length + 1,
    title: 'Mover términos constantes al miembro derecho',
    expression: `${netA}x = ${netB}`,
    explanation: `Restamos ${b} en ambos lados para aislar el término con la incógnita (${d} - (${b}) = ${netB}).`
  });

  if (Math.abs(netA) < 1e-9) {
    if (Math.abs(netB) < 1e-9) {
      steps.push({
        stepNumber: steps.length + 1,
        title: 'Identidad infinita (0 = 0)',
        expression: '0 = 0',
        explanation: 'Cualquier número real es solución; la ecuación tiene infinitas soluciones (identidad).'
      });
      return {
        type: 'lineal',
        equationDisplay,
        steps,
        results: [{ label: 'Solución', value: 'x ∈ ℝ (Infinitas soluciones)' }],
        isReal: true
      };
    } else {
      steps.push({
        stepNumber: steps.length + 1,
        title: 'Contradicción algebraica (0 ≠ k)',
        expression: `0 ≠ ${netB}`,
        explanation: 'La igualdad resultante es imposible; no existe ningún número x que satisfaga la ecuación.'
      });
      return {
        type: 'lineal',
        equationDisplay,
        steps,
        results: [{ label: 'Solución', value: 'Sin solución (Ecuación incompatible)' }],
        isReal: false
      };
    }
  }

  const solution = netB / netA;
  const fracStr = toFractionString(solution);

  steps.push({
    stepNumber: steps.length + 1,
    title: 'Despejar la incógnita dividiendo entre el coeficiente',
    expression: `x = ${netB} / ${netA}${fracStr !== `${cleanRound(solution)}` ? ` = ${fracStr}` : ''} = ${cleanRound(solution)}`,
    explanation: `Dividimos ambos lados entre el coeficiente ${netA} para obtener el valor final de x.`
  });

  steps.push({
    stepNumber: steps.length + 1,
    title: 'Comprobación de la solución',
    expression: `${a}(${cleanRound(solution)}) + ${b} = ${cleanRound(a * solution + b)} = ${cleanRound(c * solution + d)}`,
    explanation: 'Sustituyendo el valor obtenido en ambos miembros confirmamos que la igualdad se cumple perfectamente.'
  });

  return {
    type: 'lineal',
    equationDisplay,
    steps,
    results: [
      { label: 'Valor de x', value: `${cleanRound(solution)}` },
      ...(fracStr.includes('/') ? [{ label: 'Forma fraccionaria', value: fracStr }] : [])
    ],
    isReal: true
  };
}

/**
 * 2. Resolutor de Ecuaciones Cuadráticas: ax² + bx + c = 0
 */
export function solveQuadraticEquation(a: number, b: number, c: number): EquationSolution {
  if (Math.abs(a) < 1e-9) {
    return solveLinearEquation(b, c, 0, 0);
  }

  const bSign = b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`;
  const cSign = c >= 0 ? `+ ${c}` : `- ${Math.abs(c)}`;
  const equationDisplay = `${a !== 1 ? (a === -1 ? '-' : a) : ''}x² ${bSign}x ${cSign} = 0`;

  const steps: StepRecord[] = [];

  steps.push({
    stepNumber: 1,
    title: 'Identificar coeficientes de la forma general ax² + bx + c = 0',
    expression: `a = ${a},  b = ${b},  c = ${c}`,
    explanation: 'Reconocemos los coeficientes del término cuadrático (a), lineal (b) e independiente (c).'
  });

  // Discriminante: Δ = b² - 4ac
  const delta = b * b - 4 * a * c;
  steps.push({
    stepNumber: 2,
    title: 'Calcular el Discriminante (Δ = b² - 4ac)',
    expression: `Δ = (${b})² - 4·(${a})·(${c}) = ${b * b} - (${4 * a * c}) = ${delta}`,
    explanation: delta > 0
      ? 'Como Δ > 0, la ecuación posee DOS soluciones reales distintas.'
      : delta === 0
      ? 'Como Δ = 0, la ecuación posee UNA raíz real doble (las dos soluciones coinciden).'
      : 'Como Δ < 0, la ecuación NO tiene soluciones en los números reales; tiene dos raíces complejas conjugadas.'
  });

  // Vértice de la parábola
  const vx = -b / (2 * a);
  const vy = a * vx * vx + b * vx + c;

  steps.push({
    stepNumber: 3,
    title: 'Aplicar la Fórmula General Cuadrática',
    expression: `x = (-b ± √Δ) / (2a) = (-(${b}) ± √(${delta})) / (2·${a})`,
    explanation: 'Sustituimos los coeficientes y el discriminante calculado en la fórmula resolvente de Bhaskara.'
  });

  if (delta >= 0) {
    const sqrtDelta = Math.sqrt(delta);
    const x1 = (-b + sqrtDelta) / (2 * a);
    const x2 = (-b - sqrtDelta) / (2 * a);

    const x1Frac = toFractionString(x1);
    const x2Frac = toFractionString(x2);

    steps.push({
      stepNumber: 4,
      title: 'Evaluar las dos ramas (suma y resta)',
      expression: delta === 0 
        ? `x = -(${b}) / ${2 * a} = ${cleanRound(x1)}` 
        : `x₁ = (-(${b}) + ${cleanRound(sqrtDelta, 3)}) / ${2 * a} = ${cleanRound(x1)}\nx₂ = (-(${b}) - ${cleanRound(sqrtDelta, 3)}) / ${2 * a} = ${cleanRound(x2)}`,
      explanation: delta === 0
        ? 'Al ser la raíz cuadrada de cero, solo existe un valor único para x.'
        : 'Separamos la rama positiva y la rama negativa para obtener los dos puntos donde la parábola corta al eje horizontal X.'
    });

    const isFactorizable = Math.abs(sqrtDelta - Math.round(sqrtDelta)) < 1e-7;
    let factorization: string | undefined = undefined;
    if (isFactorizable) {
      const root1Str = x1 >= 0 ? `- ${cleanRound(x1)}` : `+ ${Math.abs(cleanRound(x1))}`;
      const root2Str = x2 >= 0 ? `- ${cleanRound(x2)}` : `+ ${Math.abs(cleanRound(x2))}`;
      factorization = a === 1 ? `(x ${root1Str})(x ${root2Str}) = 0` : `${a}(x ${root1Str})(x ${root2Str}) = 0`;
      
      steps.push({
        stepNumber: 5,
        title: 'Forma factorizada del polinomio',
        expression: factorization,
        explanation: 'Dado que las raíces son racionales exactas, podemos expresar la ecuación cuadrática como producto de binomios lineales.'
      });
    }

    return {
      type: 'cuadratica',
      equationDisplay,
      steps,
      results: delta === 0
        ? [{ label: 'Raíz doble x', value: `${cleanRound(x1)}` }]
        : [
            { label: 'Primera raíz (x₁)', value: `${cleanRound(x1)} ${x1Frac.includes('/') ? `(${x1Frac})` : ''}` },
            { label: 'Segunda raíz (x₂)', value: `${cleanRound(x2)} ${x2Frac.includes('/') ? `(${x2Frac})` : ''}` }
          ],
      discriminant: delta,
      vertex: { x: cleanRound(vx), y: cleanRound(vy) },
      factorization,
      isReal: true
    };
  } else {
    // Raíces complejas conjugadas: p ± qi
    const realPart = -b / (2 * a);
    const imagPart = Math.sqrt(-delta) / (2 * Math.abs(a));

    steps.push({
      stepNumber: 4,
      title: 'Extracción de la unidad imaginaria (i = √-1)',
      expression: `√(${delta}) = √(${Math.abs(delta)}) · i = ${cleanRound(Math.sqrt(-delta), 3)}i`,
      explanation: 'No existen números reales cuyo cuadrado sea negativo. Introducimos el número imaginario i para expresar las soluciones en el cuerpo complejo ℂ.'
    });

    const rootComplex1 = `${cleanRound(realPart)} + ${cleanRound(imagPart)}i`;
    const rootComplex2 = `${cleanRound(realPart)} - ${cleanRound(imagPart)}i`;

    steps.push({
      stepNumber: 5,
      title: 'Soluciones complejas conjugadas',
      expression: `x₁ = ${rootComplex1}\nx₂ = ${rootComplex2}`,
      explanation: 'La parábola no intersecta el eje real X; su vértice queda por encima (si abre hacia arriba) o por debajo (si abre hacia abajo).'
    });

    return {
      type: 'cuadratica',
      equationDisplay,
      steps,
      results: [
        { label: 'x₁ (Compleja)', value: rootComplex1 },
        { label: 'x₂ (Compleja)', value: rootComplex2 }
      ],
      discriminant: delta,
      vertex: { x: cleanRound(vx), y: cleanRound(vy) },
      isReal: false
    };
  }
}

/**
 * 3. Resolutor de Sistema Lineal 2x2:
 * a1*x + b1*y = c1
 * a2*x + b2*y = c2
 */
export function solveSystem2x2(
  a1: number, b1: number, c1: number,
  a2: number, b2: number, c2: number
): EquationSolution {
  const eq1 = `${a1}x ${b1 >= 0 ? `+ ${b1}` : `- ${Math.abs(b1)}`}y = ${c1}`;
  const eq2 = `${a2}x ${b2 >= 0 ? `+ ${b2}` : `- ${Math.abs(b2)}`}y = ${c2}`;
  const equationDisplay = `(1) ${eq1}\n(2) ${eq2}`;

  const steps: StepRecord[] = [];

  steps.push({
    stepNumber: 1,
    title: 'Planteamiento del sistema de ecuaciones 2x2',
    expression: equationDisplay,
    explanation: 'Disponemos de dos ecuaciones lineales con dos incógnitas (x e y). Utilizaremos la Regla de Determinantes de Cramer por su claridad analítica.'
  });

  // Determinante principal Δ = a1*b2 - a2*b1
  const delta = a1 * b2 - a2 * b1;
  steps.push({
    stepNumber: 2,
    title: 'Calcular el determinante del sistema (Δ)',
    expression: `Δ = | ${a1}  ${b1} |\n    | ${a2}  ${b2} | = (${a1})·(${b2}) - (${a2})·(${b1}) = ${a1 * b2} - (${a2 * b1}) = ${delta}`,
    explanation: delta !== 0 
      ? 'Como el determinante Δ ≠ 0, el sistema es Compatible Determinado y posee una solución única (las rectas se intersectan en un único punto).'
      : 'Como Δ = 0, las rectas son paralelas (coincidentes o disjuntas).'
  });

  // Determinante para x: Δx = c1*b2 - c2*b1
  const deltaX = c1 * b2 - c2 * b1;
  // Determinante para y: Δy = a1*c2 - a2*c1
  const deltaY = a1 * c2 - a2 * c1;

  if (Math.abs(delta) < 1e-9) {
    if (Math.abs(deltaX) < 1e-9 && Math.abs(deltaY) < 1e-9) {
      steps.push({
        stepNumber: 3,
        title: 'Sistema Compatible Indeterminado',
        expression: 'Δ = 0, Δx = 0, Δy = 0',
        explanation: 'Ambas ecuaciones representan la misma recta geométrica. Existen infinitos pares (x, y) que satisfacen el sistema.'
      });
      return {
        type: 'sistema2x2',
        equationDisplay,
        steps,
        results: [{ label: 'Solución', value: 'Infinitas soluciones (Rectas coincidentes)' }],
        isReal: true
      };
    } else {
      steps.push({
        stepNumber: 3,
        title: 'Sistema Incompatible',
        expression: `Δ = 0, pero Δx = ${deltaX} ≠ 0`,
        explanation: 'Las dos rectas son paralelas y nunca se tocan. No existe ningún par (x, y) que cumpla ambas ecuaciones simultáneamente.'
      });
      return {
        type: 'sistema2x2',
        equationDisplay,
        steps,
        results: [{ label: 'Solución', value: 'Sin solución (Rectas paralelas disjuntas)' }],
        isReal: false
      };
    }
  }

  steps.push({
    stepNumber: 3,
    title: 'Calcular el determinante de la variable x (Δx)',
    expression: `Δx = | ${c1}  ${b1} |\n     | ${c2}  ${b2} | = (${c1})·(${b2}) - (${c2})·(${b1}) = ${deltaX}`,
    explanation: 'Reemplazamos la columna de coeficientes de x por los términos independientes.'
  });

  steps.push({
    stepNumber: 4,
    title: 'Calcular el determinante de la variable y (Δy)',
    expression: `Δy = | ${a1}  ${c1} |\n     | ${a2}  ${c2} | = (${a1})·(${c2}) - (${a2})·(${c1}) = ${deltaY}`,
    explanation: 'Reemplazamos la columna de coeficientes de y por los términos independientes.'
  });

  const xVal = deltaX / delta;
  const yVal = deltaY / delta;
  const xFrac = toFractionString(xVal);
  const yFrac = toFractionString(yVal);

  steps.push({
    stepNumber: 5,
    title: 'Despejar las soluciones: x = Δx / Δ,  y = Δy / Δ',
    expression: `x = ${deltaX} / ${delta} = ${cleanRound(xVal)}\ny = ${deltaY} / ${delta} = ${cleanRound(yVal)}`,
    explanation: `El punto de intersección de las dos rectas en el plano cartesiano es P(${cleanRound(xVal)}, ${cleanRound(yVal)}).`
  });

  return {
    type: 'sistema2x2',
    equationDisplay,
    steps,
    results: [
      { label: 'Valor de x', value: `${cleanRound(xVal)} ${xFrac.includes('/') ? `(${xFrac})` : ''}` },
      { label: 'Valor de y', value: `${cleanRound(yVal)} ${yFrac.includes('/') ? `(${yFrac})` : ''}` },
      { label: 'Punto de Intersección P(x, y)', value: `(${cleanRound(xVal)}, ${cleanRound(yVal)})` }
    ],
    isReal: true
  };
}

/**
 * 4. Geometría 2D y 3D: Cálculos exactos y fórmulas
 */
export interface ShapeGeometryData {
  id: string;
  name: string;
  dimension: '2D' | '3D';
  parameters: { key: string; label: string; value: number; min: number; max: number; step: number; unit: string }[];
  formulas: { label: string; formula: string }[];
  metrics: { label: string; value: string; unit: string }[];
  steps: StepRecord[];
}

export function computeGeometryShape(shapeId: string, params: Record<string, number>): ShapeGeometryData {
  switch (shapeId) {
    case 'circulo': {
      const r = Math.max(0.1, params.r || 5);
      const perimetro = 2 * Math.PI * r;
      const area = Math.PI * r * r;
      const diametro = 2 * r;
      return {
        id: 'circulo',
        name: 'Círculo',
        dimension: '2D',
        parameters: [
          { key: 'r', label: 'Radio (r)', value: r, min: 0.5, max: 20, step: 0.5, unit: 'cm' }
        ],
        formulas: [
          { label: 'Diámetro', formula: 'D = 2 · r' },
          { label: 'Perímetro (Circunferencia)', formula: 'P = 2 · π · r' },
          { label: 'Área', formula: 'A = π · r²' }
        ],
        metrics: [
          { label: 'Radio', value: `${cleanRound(r, 2)}`, unit: 'cm' },
          { label: 'Diámetro', value: `${cleanRound(diametro, 2)}`, unit: 'cm' },
          { label: 'Perímetro', value: `${cleanRound(perimetro, 3)}`, unit: 'cm' },
          { label: 'Área', value: `${cleanRound(area, 3)}`, unit: 'cm²' }
        ],
        steps: [
          {
            stepNumber: 1,
            title: 'Cálculo del Perímetro',
            expression: `P = 2 · π · (${r}) = ${cleanRound(perimetro, 3)} cm`,
            explanation: 'Multiplicamos el doble del radio por la constante pi (π ≈ 3.14159).'
          },
          {
            stepNumber: 2,
            title: 'Cálculo del Área',
            expression: `A = π · (${r})² = π · ${r * r} = ${cleanRound(area, 3)} cm²`,
            explanation: 'Elevamos el radio al cuadrado y multiplicamos por pi.'
          }
        ]
      };
    }

    case 'triangulo': {
      const base = Math.max(0.1, params.b || 8);
      const h = Math.max(0.1, params.h || 6);
      const ladoA = Math.max(0.1, params.a || 6);
      const ladoC = Math.max(0.1, params.c || 7);
      const area = (base * h) / 2;
      const perimetro = base + ladoA + ladoC;
      return {
        id: 'triangulo',
        name: 'Triángulo',
        dimension: '2D',
        parameters: [
          { key: 'b', label: 'Base (b)', value: base, min: 1, max: 20, step: 0.5, unit: 'cm' },
          { key: 'h', label: 'Altura (h)', value: h, min: 1, max: 20, step: 0.5, unit: 'cm' },
          { key: 'a', label: 'Lado a', value: ladoA, min: 1, max: 20, step: 0.5, unit: 'cm' },
          { key: 'c', label: 'Lado c', value: ladoC, min: 1, max: 20, step: 0.5, unit: 'cm' }
        ],
        formulas: [
          { label: 'Área', formula: 'A = (b · h) / 2' },
          { label: 'Perímetro', formula: 'P = a + b + c' }
        ],
        metrics: [
          { label: 'Área', value: `${cleanRound(area, 2)}`, unit: 'cm²' },
          { label: 'Perímetro', value: `${cleanRound(perimetro, 2)}`, unit: 'cm' }
        ],
        steps: [
          {
            stepNumber: 1,
            title: 'Cálculo del Área por base y altura',
            expression: `A = (${base} · ${h}) / 2 = ${base * h} / 2 = ${cleanRound(area, 2)} cm²`,
            explanation: 'Todo triángulo ocupa exactamente la mitad del área de un paralelogramo con su misma base y altura.'
          },
          {
            stepNumber: 2,
            title: 'Suma de longitudes de los tres lados',
            expression: `P = ${ladoA} + ${base} + ${ladoC} = ${cleanRound(perimetro, 2)} cm`,
            explanation: 'El perímetro corresponde al contorno exterior total del polígono de 3 lados.'
          }
        ]
      };
    }

    case 'cilindro': {
      const r = Math.max(0.1, params.r || 4);
      const h = Math.max(0.1, params.h || 10);
      const areaBase = Math.PI * r * r;
      const areaLateral = 2 * Math.PI * r * h;
      const areaTotal = 2 * areaBase + areaLateral;
      const volumen = areaBase * h;
      return {
        id: 'cilindro',
        name: 'Cilindro',
        dimension: '3D',
        parameters: [
          { key: 'r', label: 'Radio base (r)', value: r, min: 1, max: 15, step: 0.5, unit: 'cm' },
          { key: 'h', label: 'Altura (h)', value: h, min: 1, max: 25, step: 0.5, unit: 'cm' }
        ],
        formulas: [
          { label: 'Área de la base', formula: 'Ab = π · r²' },
          { label: 'Área lateral', formula: 'Al = 2 · π · r · h' },
          { label: 'Área total', formula: 'At = 2·Ab + Al' },
          { label: 'Volumen', formula: 'V = π · r² · h' }
        ],
        metrics: [
          { label: 'Volumen', value: `${cleanRound(volumen, 2)}`, unit: 'cm³' },
          { label: 'Área Total', value: `${cleanRound(areaTotal, 2)}`, unit: 'cm²' },
          { label: 'Área Lateral', value: `${cleanRound(areaLateral, 2)}`, unit: 'cm²' },
          { label: 'Área Base', value: `${cleanRound(areaBase, 2)}`, unit: 'cm²' }
        ],
        steps: [
          {
            stepNumber: 1,
            title: 'Cálculo del Volumen',
            expression: `V = π · (${r})² · ${h} = π · ${r * r} · ${h} = ${cleanRound(volumen, 2)} cm³`,
            explanation: 'El volumen es el producto del área del círculo base por la altura del prisma circular.'
          },
          {
            stepNumber: 2,
            title: 'Cálculo del Área Superficial Total',
            expression: `At = 2·(π·${r}²) + (2·π·${r}·${h}) = ${cleanRound(areaTotal, 2)} cm²`,
            explanation: 'Suma de las dos tapas circulares planas y el manto rectangular enrollado.'
          }
        ]
      };
    }

    case 'esfera': {
      const r = Math.max(0.1, params.r || 5);
      const area = 4 * Math.PI * r * r;
      const volumen = (4 / 3) * Math.PI * Math.pow(r, 3);
      return {
        id: 'esfera',
        name: 'Esfera',
        dimension: '3D',
        parameters: [
          { key: 'r', label: 'Radio (r)', value: r, min: 1, max: 15, step: 0.5, unit: 'cm' }
        ],
        formulas: [
          { label: 'Área superficial', formula: 'A = 4 · π · r²' },
          { label: 'Volumen', formula: 'V = (4/3) · π · r³' }
        ],
        metrics: [
          { label: 'Volumen', value: `${cleanRound(volumen, 2)}`, unit: 'cm³' },
          { label: 'Área Superficial', value: `${cleanRound(area, 2)}`, unit: 'cm²' }
        ],
        steps: [
          {
            stepNumber: 1,
            title: 'Volumen de la Esfera (Arquímedes)',
            expression: `V = (4/3) · π · (${r})³ = (4/3) · π · ${r * r * r} = ${cleanRound(volumen, 2)} cm³`,
            explanation: 'Demostrado por Arquímedes, el volumen de una esfera es dos tercios del cilindro que la circunscribe.'
          },
          {
            stepNumber: 2,
            title: 'Área de la Superficie Esférica',
            expression: `A = 4 · π · (${r})² = 4 · π · ${r * r} = ${cleanRound(area, 2)} cm²`,
            explanation: 'Equivale exactamente a 4 veces el área de su círculo máximo ecuatorial.'
          }
        ]
      };
    }

    default: {
      // Cono
      const r = Math.max(0.1, params.r || 4);
      const h = Math.max(0.1, params.h || 9);
      const generatriz = Math.sqrt(r * r + h * h);
      const areaBase = Math.PI * r * r;
      const areaLateral = Math.PI * r * generatriz;
      const areaTotal = areaBase + areaLateral;
      const volumen = (1 / 3) * Math.PI * r * r * h;
      return {
        id: 'cono',
        name: 'Cono Circular Recto',
        dimension: '3D',
        parameters: [
          { key: 'r', label: 'Radio base (r)', value: r, min: 1, max: 15, step: 0.5, unit: 'cm' },
          { key: 'h', label: 'Altura (h)', value: h, min: 1, max: 20, step: 0.5, unit: 'cm' }
        ],
        formulas: [
          { label: 'Generatriz (Pitágoras)', formula: 'g = √(r² + h²)' },
          { label: 'Volumen', formula: 'V = (1/3) · π · r² · h' },
          { label: 'Área lateral', formula: 'Al = π · r · g' },
          { label: 'Área total', formula: 'At = π·r² + π·r·g' }
        ],
        metrics: [
          { label: 'Generatriz (g)', value: `${cleanRound(generatriz, 2)}`, unit: 'cm' },
          { label: 'Volumen', value: `${cleanRound(volumen, 2)}`, unit: 'cm³' },
          { label: 'Área Total', value: `${cleanRound(areaTotal, 2)}`, unit: 'cm²' }
        ],
        steps: [
          {
            stepNumber: 1,
            title: 'Cálculo de la Generatriz por Teorema de Pitágoras',
            expression: `g = √(${r}² + ${h}²) = √(${r*r} + ${h*h}) = √(${r*r + h*h}) = ${cleanRound(generatriz, 2)} cm`,
            explanation: 'El radio y la altura forman los catetos de un triángulo rectángulo; la generatriz es la hipotenusa.'
          },
          {
            stepNumber: 2,
            title: 'Cálculo del Volumen',
            expression: `V = (1/3) · π · (${r})² · ${h} = ${cleanRound(volumen, 2)} cm³`,
            explanation: 'El volumen del cono es exactamente un tercio del volumen del cilindro de igual radio y altura.'
          }
        ]
      };
    }
  }
}

/**
 * 5. Conversor Universal: Fracciones ↔ Decimales ↔ Porcentajes
 */
export interface ConversionResult {
  numerator: number;
  denominator: number;
  decimal: number;
  percent: number;
  isExactDecimal: boolean;
  simplifiedNum: number;
  simplifiedDen: number;
  steps: StepRecord[];
}

export function convertFraction(numerator: number, denominator: number): ConversionResult {
  if (denominator === 0) denominator = 1;
  const divisor = gcd(numerator, denominator);
  const simpNum = numerator / divisor;
  const simpDen = denominator / divisor;

  const decimalVal = numerator / denominator;
  const percentVal = decimalVal * 100;

  // Verificamos si los factores primos del denominador simplificado son solo 2 y 5 (decimal exacto)
  let tempDen = Math.abs(simpDen);
  while (tempDen % 2 === 0) tempDen /= 2;
  while (tempDen % 5 === 0) tempDen /= 5;
  const isExactDecimal = tempDen === 1;

  const steps: StepRecord[] = [];

  steps.push({
    stepNumber: 1,
    title: 'Simplificación de la Fracción a Términos Irreducibles',
    expression: divisor > 1 
      ? `${numerator}/${denominator} = (${numerator} ÷ ${divisor}) / (${denominator} ÷ ${divisor}) = ${simpNum}/${simpDen}`
      : `${numerator}/${denominator} ya es una fracción irreducible (MCD = 1).`,
    explanation: `Calculamos el Máximo Común Divisor entre ${numerator} y ${denominator} mediante el algoritmo de Euclides (MCD = ${divisor}).`
  });

  steps.push({
    stepNumber: 2,
    title: 'Conversión a Número Decimal',
    expression: `${simpNum} ÷ ${simpDen} = ${cleanRound(decimalVal, 6)}${!isExactDecimal ? '...' : ''}`,
    explanation: isExactDecimal
      ? 'La división es finita (decimal exacto) porque el denominador solo contiene factores primos 2 y 5.'
      : 'La división no termina en residuo cero; resulta en un número decimal periódico.'
  });

  steps.push({
    stepNumber: 3,
    title: 'Conversión a Porcentaje',
    expression: `${cleanRound(decimalVal, 4)} × 100% = ${cleanRound(percentVal, 4)}%`,
    explanation: 'Multiplicamos el valor decimal por 100 para representarlo como partes por cada 100 unidades.'
  });

  return {
    numerator,
    denominator,
    decimal: cleanRound(decimalVal, 6),
    percent: cleanRound(percentVal, 4),
    isExactDecimal,
    simplifiedNum: simpNum,
    simplifiedDen: simpDen,
    steps
  };
}

export function convertDecimal(dec: number): ConversionResult {
  const decStr = dec.toString();
  const decimalPlaces = decStr.includes('.') ? decStr.split('.')[1].length : 0;
  const denominator = Math.pow(10, decimalPlaces);
  const numerator = Math.round(dec * denominator);
  return convertFraction(numerator, denominator);
}

export function convertPercent(pct: number): ConversionResult {
  return convertDecimal(pct / 100);
}

/**
 * 6. Evaluador seguro de funciones matemáticas f(x) para el graficador y calculadora
 */
export function evaluateMathFunction(fnStr: string, x: number): number {
  try {
    // Normalización de expresiones para sintaxis segura
    let expr = fnStr.toLowerCase().trim();
    expr = expr.replace(/\^/g, '**');
    expr = expr.replace(/sin\(/g, 'Math.sin(');
    expr = expr.replace(/cos\(/g, 'Math.cos(');
    expr = expr.replace(/tan\(/g, 'Math.tan(');
    expr = expr.replace(/sqrt\(/g, 'Math.sqrt(');
    expr = expr.replace(/abs\(/g, 'Math.abs(');
    expr = expr.replace(/ln\(/g, 'Math.log(');
    expr = expr.replace(/log\(/g, 'Math.log10(');
    expr = expr.replace(/pi/g, 'Math.PI');
    expr = expr.replace(/e\b/g, 'Math.E');

    // Manejar coeficientes implícitos como 2x -> 2*x
    expr = expr.replace(/(\d)x/g, '$1*x');
    expr = expr.replace(/x(\d)/g, 'x*$1');
    expr = expr.replace(/\)x/g, ')*x');
    expr = expr.replace(/x\(/g, 'x*(');

    // Evaluación segura mediante constructor Function aislado
    const fn = new Function('x', 'Math', `try { return ${expr}; } catch(e) { return NaN; }`);
    const res = fn(x, Math);
    if (typeof res === 'number' && !isNaN(res) && isFinite(res)) {
      return res;
    }
    return NaN;
  } catch {
    return NaN;
  }
}
