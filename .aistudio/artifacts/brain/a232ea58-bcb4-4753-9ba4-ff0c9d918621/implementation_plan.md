# MathVerse — Explora el Universo de las Matemáticas

Plataforma educativa web interactiva, moderna y rigurosa diseñada para transformar el aprendizaje de las matemáticas en una experiencia fascinante, intuitiva y gamificada. Enfocada en educación secundaria y preuniversitaria, integra un laboratorio interactivo con cálculo en tiempo real, lecciones guiadas paso a paso, y una zona de desafíos arcade con retroalimentación inmediata.

## Decisiones Críticas y Preferencias Confirmadas

> [!IMPORTANT]
> Decisiones confirmadas a través del proceso de aclaración interactiva:

- **Nivel Educativo Principal**: Matemáticas de secundaria y bachillerato (Aritmética, Álgebra, Geometría Euclidiana/Analítica, Trigonometría, Funciones y Gráficas, Estadística y Probabilidad, e Introducción al Cálculo).
- **Herramientas de Máxima Profundidad en el Laboratorio**: 
  1. *Resolutor de Ecuaciones Paso a Paso*: Ecuaciones lineales, cuadráticas (fórmula general y factorización) y sistemas 2x2 con desglose algebraico real y justificación en cada paso.
  2. *Explorador Geométrico Interactivo*: Figuras 2D (círculo, triángulos, polígonos) y 3D (cilindro, cono, esfera, prismas) con sliders paramétricos en vivo, renderizado vectorial SVG dinámico y cálculo simultáneo de perímetro, área y volumen.
- **Estilo de la Zona de Desafíos**: Modo Arcade con contador de racha (streak), multiplicador de puntos, temporizador opcional con presión gradual, efectos de sonido procedurales mediante Web Audio API (con botón de silencio accesible), insignias desbloqueables y explicaciones completas tras cada intento.

---

## 1. Visión General y Concepto Central

- **Propósito**: Eliminar la frustración y la abstracción vacía en el aprendizaje matemático ofreciendo visualizaciones dinámicas, manipulaciones paramétricas en tiempo real y práctica deliberada con recompensas tangibles.
- **Público Objetivo**: Estudiantes de educación secundaria (12-18 años), estudiantes de primeros semestres preuniversitarios, docentes que buscan demostraciones visuales interactivas y entusiastas de las matemáticas.
- **Valor Diferencial**: No es una maqueta estática. Todos los cálculos, gráficos, resoluciones paso a paso y desafíos se ejecutan de forma determinista y real en el navegador, con retroalimentación inmediata, soporte sin conexión y persistencia local de logros.

---

## 2. Experiencia de Usuario y Diseño Visual

### Identidad Visual y Paleta (Anti-AI Slop & Educación)
- **Tema Oscuro (Cosmos Matemático)**: Fondo dominante azul marino profundo (`#0B1120`, `#0F172A`) con superficies de tarjeta en pizarra suave (`#1E293B`), bordes nítidos de 1px (`#334155`) y acentos energéticos controlados:
  - Cian eléctrico (`#06B6D4` / `#22D3EE`) para geometría, funciones y foco primario.
  - Púrpura cósmico (`#8B5CF6` / `#A855F7`) para álgebra, fórmulas y transiciones.
  - Ámbar dorado (`#F59E0B` / `#FBBF24`) para rachas, logros e hitos en la zona arcade.
- **Tema Claro (Laboratorio Diurno)**: Fondo blanco nítido / gris suave (`#F8FAFC`), tarjetas en blanco puro con bordes sutiles (`#E2E8F0`) y textos en alto contraste (`#0F172A`).
- **Disciplina Visual**:
  - Sin píldoras estáticas decorativas amontonadas en encabezados; metadatos formateados con separadores limpios (`·` o `/`).
  - Sin encabezados con sintaxis de código mecánico (`// 01_ALGEBRA`). Se utiliza titulación editorial humana (`01. Álgebra y Ecuaciones`).
  - Sin botones fantasma ni datos simulados vacíos.
  - Tipografía matemática limpia con fuentes de visualización legibles (`Plus Jakarta Sans` y `JetBrains Mono / KaTeX style` para expresiones numéricas).

### Top Bar Contract (3 Zonas Estrictas)
1. **Zona 1 (Marca)**: `MathVerse` con isotipo de brújula/órbita matemática en una sola línea.
2. **Zona 2 (Navegación Principal)**: Enlaces directos a las secciones: `Inicio`, `Temas`, `Laboratorio`, `Desafíos`, `Lecciones`, `Progreso`.
3. **Zona 3 (Acción y Utilidades)**: Selector de Modo Oscuro/Claro y Botón de Inicio Rápido a Desafío / Laboratorio.

### Flujo de Navegación del Usuario
```
[ Página de Inicio: Hero con Ecuaciones Animadas + Selector Rápido ]
    │
    ├──► [ Explorador de 7 Temas ] ──► [ Modal / Vista de Lección con Ejemplo Paso a Paso ]
    │
    ├──► [ Laboratorio Matemático (6 Pestañas Interactivas) ]
    │       ├── 1. Resolutor de Ecuaciones (Paso a paso lineal, cuadrática, 2x2)
    │       ├── 2. Explorador Geométrico (Sliders SVG 2D/3D con áreas/volúmenes)
    │       ├── 3. Graficador de Funciones (Canvas interactivo: polinómica, trigonométrica, racional)
    │       ├── 4. Calculadora Científica (Operaciones, trigonometría, potencias, factorial, memoria)
    │       ├── 5. Generador de Ejercicios (Filtro por tema, dificultad y solución guiada)
    │       └── 6. Conversor Universal (Fracción ↔ Decimal ↔ Porcentaje con visualización de torta/barra)
    │
    ├──► [ Zona de Desafíos Arcade ]
    │       ├── Modos: Contrarreloj (60s), Racha Infinita (Supervivencia), Práctica sin Tiempo
    │       ├── Selector de Dificultades: Fácil, Medio, Difícil
    │       └── Retroalimentación con sonido, explicación matemática y actualización de XP
    │
    └──► [ Panel de Progreso y Logros ]
            ├── Resumen de XP, Nivel, Racha récord, Ejercicios resueltos
            ├── Gráfico radar/progreso de los 7 temas dominados
            └── Vitrina de 8 Insignias matemáticas desbloqueables (guardadas en localStorage)
```

---

## 3. Decisiones de Producto y Arquitectura de Estado

1. **Motor Matemático Nativo en TypeScript**:
   - Implementación pura de parser y evaluador para resolución de ecuaciones paso a paso (raíces reales y complejas, discriminante $\Delta = b^2 - 4ac$, despeje algebraico explícito).
   - Graficador sobre HTML5 Canvas de alto rendimiento con renderizado a 60 FPS, soporte de cuadrícula cartesiana con ejes calibrados, zoom, paneo y muestreo adaptativo de curvas.
2. **Audio Sintetizado con Web Audio API**:
   - Efectos sonoros procedurales para aciertos (acordes arpegiados mayores), fallos (tono suave descendente), combos (tonos ascendentes) y desbloqueo de medallas.
   - Control global de volumen y silencio inmediato (`Mute`) guardado en preferencias.
3. **Persistencia Local Segura**:
   - Todo el progreso (ejercicios resueltos, historial reciente de desafíos, rachas, estadísticas por tema e insignias) se almacena en `localStorage` con estructura validada y botón para reiniciar o exportar/demostración.

---

## 4. Arquitectura de Componentes y Flujo de Datos

```
┌────────────────────────────────────────────────────────────────────────┐
│                              App.tsx                                   │
│  - ThemeContext (Dark / Light)                                         │
│  - UserProgressState (XP, Nivel, Historial, Logros, Racha)             │
│  - AudioService (Web Audio API sound triggers)                         │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
    ┌──────────────────────┬────────┴──────────────┬─────────────────────┐
    ▼                      ▼                       ▼                     ▼
┌──────────────┐   ┌───────────────┐       ┌───────────────┐     ┌──────────────┐
│  Navbar.tsx  │   │   Hero.tsx    │       │ TopicGrid.tsx │     │  LessonModal │
│ (3-Zone Bar) │   │ (Interactive) │       │ (7 Temas Cur) │     │ (Paso a Paso)│
└──────────────┘   └───────────────┘       └───────────────┘     └──────────────┘
    │
    ├──────────────────────┬───────────────────────┐
    ▼                      ▼                       ▼
┌──────────────────┐ ┌───────────────────┐ ┌────────────────────┐
│ MathLab.tsx      │ │ ChallengeZone.tsx │ │ ProgressPanel.tsx  │
│ - EquationSolver │ │ - Arcade Quiz     │ │ - Stats & Mastery  │
│ - GeometryLab    │ │ - Timer Engine    │ │ - Badge Showcase   │
│ - FunctionGrapher│ │ - Streak Multiplier││ - Reset / Demo Data │
│ - SciCalculator  │ │ - Step Breakdown  │ └────────────────────┘
│ - ExerciseGen    │ └───────────────────┘
│ - FractionConvert│
└──────────────────┘
```

---

## Plan de Verificación

1. **Verificación de Cálculos**:
   - Resolutor: Validar $2x + 5 = 15 \Rightarrow x=5$, cuadrática $x^2 - 5x + 6 = 0 \Rightarrow x=2, 3$, discriminante negativo $x^2 + x + 1 = 0 \Rightarrow$ raíces complejas o sin solución real en $\mathbb{R}$.
   - Geometría: Triángulo base $\times$ altura $/ 2$, Pitágoras, círculo $\pi r^2$, esfera $\frac{4}{3}\pi r^3$.
   - Conversor: $3/4 = 0.75 = 75\%$, simplificación de fracciones irreducibles (MCD).
2. **Interactividad**:
   - Graficador de funciones: Probar $f(x) = x^2 - 4$, $\sin(x)$, $2x + 1$, zoom in/out y cursor de rastreo de coordenadas.
   - Desafíos: Comprobar temporizador, cálculo de puntos con combo, racha y guardado de insignias.
   - Lecciones guiadas: Validar el flujo de concepto $\to$ fórmula $\to$ ejemplo resuelto $\to$ ejercicio de práctica con validación.
3. **Diseño y Rendimiento**:
   - Alternancia instantánea de modo claro y oscuro sin saltos de color.
   - Diseño adaptable en móviles (375px), tablets (768px) y escritorios (1440px).
   - Ejecución de `compile_applet` para garantizar cero errores de tipos TypeScript y cero dependencias faltantes.
