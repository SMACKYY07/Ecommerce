import { Minus, Plus } from 'lucide-react';

export function QuantityStepper({ value, onChange, min = 1 }) {
  return (
    <div className="inline-flex items-center rounded-full border border-black/8 bg-white/80 p-1 dark:border-white/10 dark:bg-white/5">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-600 transition hover:bg-black/5 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white"
        aria-label="Decrease quantity"
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className="min-w-10 text-center text-sm font-medium">{value}</span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-600 transition hover:bg-black/5 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white"
        aria-label="Increase quantity"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}
