export function Select({ label, error, className = '', children, ...props }) {
  return (
    <label className={`grid gap-2 ${className}`}>
      {label ? (
        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{label}</span>
      ) : null}
      <select
        className={`h-12 rounded-2xl border border-black/8 bg-white/90 px-4 text-sm text-slate-950 outline-none transition focus:border-emerald-500 dark:border-white/10 dark:bg-white/5 dark:text-white ${
          error ? 'border-rose-500 focus:border-rose-500' : ''
        }`}
        {...props}
      >
        {children}
      </select>
      {error ? <span className="text-sm text-rose-600 dark:text-rose-300">{error}</span> : null}
    </label>
  );
}
