import React, { useState } from 'react';
import { sound } from '../../utils/audio';
import { cleanRound } from '../../utils/mathEngine';
import { Delete, History, RotateCcw } from 'lucide-react';

export const ScientificCalculator: React.FC = () => {
  const [display, setDisplay] = useState<string>('0');
  const [expression, setExpression] = useState<string>('');
  const [memory, setMemory] = useState<number>(0);
  const [angleMode, setAngleMode] = useState<'deg' | 'rad'>('deg');
  const [history, setHistory] = useState<{ expr: string; result: string }[]>([]);

  const handleNumber = (digit: string) => {
    sound.playClick();
    setDisplay((prev) => (prev === '0' || prev === 'Error' ? digit : prev + digit));
  };

  const handleDecimal = () => {
    sound.playClick();
    if (!display.includes('.')) {
      setDisplay((prev) => prev + '.');
    }
  };

  const handleClear = () => {
    sound.playClick();
    setDisplay('0');
    setExpression('');
  };

  const handleDelete = () => {
    sound.playClick();
    setDisplay((prev) => {
      if (prev.length <= 1 || prev === 'Error') return '0';
      return prev.slice(0, -1);
    });
  };

  const evaluateExpressionSafe = (exprStr: string): number => {
    // Normalizar operadores para JS Math
    let sanitized = exprStr
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/π/g, 'Math.PI')
      .replace(/e\b/g, 'Math.E')
      .replace(/\^/g, '**');

    // Manejar trigonometría considerando grados (DEG) o radianes (RAD)
    if (angleMode === 'deg') {
      sanitized = sanitized.replace(/sin\(([^)]+)\)/g, 'Math.sin(($1) * Math.PI / 180)');
      sanitized = sanitized.replace(/cos\(([^)]+)\)/g, 'Math.cos(($1) * Math.PI / 180)');
      sanitized = sanitized.replace(/tan\(([^)]+)\)/g, 'Math.tan(($1) * Math.PI / 180)');
    } else {
      sanitized = sanitized.replace(/sin\(/g, 'Math.sin(');
      sanitized = sanitized.replace(/cos\(/g, 'Math.cos(');
      sanitized = sanitized.replace(/tan\(/g, 'Math.tan(');
    }

    sanitized = sanitized.replace(/sqrt\(/g, 'Math.sqrt(');
    sanitized = sanitized.replace(/ln\(/g, 'Math.log(');
    sanitized = sanitized.replace(/log\(/g, 'Math.log10(');

    const fn = new Function(`try { return ${sanitized}; } catch(e) { return NaN; }`);
    const res = fn();
    return typeof res === 'number' && !isNaN(res) && isFinite(res) ? res : NaN;
  };

  const handleEquals = () => {
    sound.playClick();
    const fullExpr = expression ? `${expression} ${display}` : display;
    const result = evaluateExpressionSafe(fullExpr);

    if (isNaN(result)) {
      setDisplay('Error');
      sound.playWrong();
    } else {
      const rounded = cleanRound(result, 6);
      sound.playCorrect();
      setHistory((prev) => [{ expr: fullExpr, result: `${rounded}` }, ...prev.slice(0, 7)]);
      setDisplay(`${rounded}`);
      setExpression('');
    }
  };

  const handleBinaryOp = (op: string) => {
    sound.playClick();
    if (expression && display === '0') {
      setExpression(`${expression.slice(0, -1)} ${op}`);
    } else {
      setExpression(`${expression ? `${expression} ${display}` : display} ${op}`);
      setDisplay('0');
    }
  };

  // Operaciones inmediatas unarias
  const handleUnaryOp = (op: 'sqrt' | 'sqr' | 'sin' | 'cos' | 'tan' | 'ln' | 'log' | 'inv' | 'fact') => {
    sound.playClick();
    const val = parseFloat(display);
    if (isNaN(val)) return;

    let res = 0;
    if (op === 'sqrt') {
      res = Math.sqrt(val);
    } else if (op === 'sqr') {
      res = val * val;
    } else if (op === 'inv') {
      res = val !== 0 ? 1 / val : NaN;
    } else if (op === 'sin') {
      res = angleMode === 'deg' ? Math.sin((val * Math.PI) / 180) : Math.sin(val);
    } else if (op === 'cos') {
      res = angleMode === 'deg' ? Math.cos((val * Math.PI) / 180) : Math.cos(val);
    } else if (op === 'tan') {
      res = angleMode === 'deg' ? Math.tan((val * Math.PI) / 180) : Math.tan(val);
    } else if (op === 'ln') {
      res = Math.log(val);
    } else if (op === 'log') {
      res = Math.log10(val);
    } else if (op === 'fact') {
      if (val < 0 || val > 170 || Math.floor(val) !== val) {
        res = NaN;
      } else {
        let f = 1;
        for (let i = 2; i <= val; i++) f *= i;
        res = f;
      }
    }

    if (isNaN(res)) {
      setDisplay('Error');
      sound.playWrong();
    } else {
      setDisplay(`${cleanRound(res, 6)}`);
    }
  };

  // Funciones de memoria
  const handleMemory = (action: 'MC' | 'MR' | 'M+' | 'M-') => {
    sound.playClick();
    const currentVal = parseFloat(display) || 0;
    if (action === 'MC') setMemory(0);
    else if (action === 'MR') setDisplay(`${cleanRound(memory, 6)}`);
    else if (action === 'M+') setMemory((prev) => prev + currentVal);
    else if (action === 'M-') setMemory((prev) => prev - currentVal);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in items-start">
      
      {/* Cuerpo principal de la calculadora */}
      <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
        
        {/* Pantalla digital */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 text-right space-y-1 shadow-inner">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setAngleMode((prev) => (prev === 'deg' ? 'rad' : 'deg'))}
                className="px-2 py-0.5 rounded bg-slate-800 text-cyan-400 font-bold hover:bg-slate-700 cursor-pointer"
              >
                {angleMode.toUpperCase()}
              </button>
              {memory !== 0 && <span className="text-amber-400 font-semibold">M</span>}
            </div>
            <div className="truncate max-w-[200px] sm:max-w-xs">{expression || '\u00A0'}</div>
          </div>
          <div className="text-3xl sm:text-4xl font-mono font-bold text-white tracking-tight overflow-x-auto whitespace-nowrap">
            {display}
          </div>
        </div>

        {/* Fila de Memoria y Ángulos */}
        <div className="grid grid-cols-4 gap-2 text-xs font-mono">
          <button onClick={() => handleMemory('MC')} className="py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800">MC</button>
          <button onClick={() => handleMemory('MR')} className="py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800">MR</button>
          <button onClick={() => handleMemory('M+')} className="py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800">M+</button>
          <button onClick={() => handleMemory('M-')} className="py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800">M-</button>
        </div>

        {/* Teclado Científico */}
        <div className="grid grid-cols-5 gap-2.5">
          
          {/* Fila 1 */}
          <button onClick={() => handleUnaryOp('sin')} className="btn-calc-sci">sin</button>
          <button onClick={() => handleUnaryOp('cos')} className="btn-calc-sci">cos</button>
          <button onClick={() => handleUnaryOp('tan')} className="btn-calc-sci">tan</button>
          <button onClick={handleClear} className="btn-calc-danger">C</button>
          <button onClick={handleDelete} className="btn-calc-action"><Delete className="w-4 h-4 mx-auto" /></button>

          {/* Fila 2 */}
          <button onClick={() => handleUnaryOp('ln')} className="btn-calc-sci">ln</button>
          <button onClick={() => handleUnaryOp('log')} className="btn-calc-sci">log</button>
          <button onClick={() => handleUnaryOp('sqrt')} className="btn-calc-sci">√x</button>
          <button onClick={() => handleBinaryOp('^')} className="btn-calc-sci">xʸ</button>
          <button onClick={() => handleBinaryOp('÷')} className="btn-calc-op">÷</button>

          {/* Fila 3 */}
          <button onClick={() => handleUnaryOp('sqr')} className="btn-calc-sci">x²</button>
          <button onClick={() => handleNumber('7')} className="btn-calc-num">7</button>
          <button onClick={() => handleNumber('8')} className="btn-calc-num">8</button>
          <button onClick={() => handleNumber('9')} className="btn-calc-num">9</button>
          <button onClick={() => handleBinaryOp('×')} className="btn-calc-op">×</button>

          {/* Fila 4 */}
          <button onClick={() => handleUnaryOp('inv')} className="btn-calc-sci">1/x</button>
          <button onClick={() => handleNumber('4')} className="btn-calc-num">4</button>
          <button onClick={() => handleNumber('5')} className="btn-calc-num">5</button>
          <button onClick={() => handleNumber('6')} className="btn-calc-num">6</button>
          <button onClick={() => handleBinaryOp('-')} className="btn-calc-op">-</button>

          {/* Fila 5 */}
          <button onClick={() => handleUnaryOp('fact')} className="btn-calc-sci">n!</button>
          <button onClick={() => handleNumber('1')} className="btn-calc-num">1</button>
          <button onClick={() => handleNumber('2')} className="btn-calc-num">2</button>
          <button onClick={() => handleNumber('3')} className="btn-calc-num">3</button>
          <button onClick={() => handleBinaryOp('+')} className="btn-calc-op">+</button>

          {/* Fila 6 */}
          <button onClick={() => { sound.playClick(); setDisplay(`${Math.PI}`); }} className="btn-calc-sci">π</button>
          <button onClick={() => { sound.playClick(); setDisplay(`${Math.E}`); }} className="btn-calc-sci">e</button>
          <button onClick={() => handleNumber('0')} className="btn-calc-num">0</button>
          <button onClick={handleDecimal} className="btn-calc-num">.</button>
          <button onClick={handleEquals} className="btn-calc-equal">=</button>

        </div>
      </div>

      {/* Historial de cálculos */}
      <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider">
          <div className="flex items-center gap-1.5">
            <History className="w-4 h-4 text-cyan-400" />
            <span>Historial de Operaciones</span>
          </div>
          {history.length > 0 && (
            <button
              onClick={() => setHistory([])}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Limpiar
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <div className="py-12 text-center text-xs text-slate-500">
            Los resultados calculados se registrarán aquí para reutilizarlos en cualquier momento.
          </div>
        ) : (
          <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
            {history.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDisplay(item.result);
                  sound.playClick();
                }}
                className="w-full text-left p-3 rounded-xl bg-slate-950 border border-slate-800/80 hover:border-cyan-500/50 transition-colors group cursor-pointer"
              >
                <div className="text-xs font-mono text-slate-400 group-hover:text-slate-300 truncate">
                  {item.expr} =
                </div>
                <div className="text-sm font-mono font-bold text-white group-hover:text-cyan-400">
                  {item.result}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
