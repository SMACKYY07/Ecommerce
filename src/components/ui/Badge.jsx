import { cn } from '../../utils/cn';

const toneStyles = {
  neutral: 'bg-black/5 text-slate-700 dark:bg-white/10 dark:text-slate-200',
  accent: 'bg-emerald-500/12 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300',
  inverted: 'bg-slate-950 text-white dark:bg-white dark:text-slate-950',
};

export function Badge({ children, className = '', tone = 'neutral' }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]',
        toneStyles[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
