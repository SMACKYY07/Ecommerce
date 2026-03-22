import { cn } from '../../utils/cn';

export function Input({
  label,
  error,
  className = '',
  inputClassName = '',
  description,
  ...props
}) {
  return (
    <label className={cn('grid gap-2', className)}>
      {label ? (
        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{label}</span>
      ) : null}
      <input
        className={cn(
          'h-12 rounded-2xl border border-black/8 bg-white/90 px-4 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 dark:border-white/10 dark:bg-white/5 dark:text-white',
          error && 'border-rose-500 focus:border-rose-500',
          inputClassName,
        )}
        {...props}
      />
      {error ? (
        <span className="text-sm text-rose-600 dark:text-rose-300">{error}</span>
      ) : description ? (
        <span className="text-sm text-slate-500 dark:text-slate-400">{description}</span>
      ) : null}
    </label>
  );
}
