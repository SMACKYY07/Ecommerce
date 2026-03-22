export function Textarea({ label, error, className = '', ...props }) {
  return (
    <label className={`grid gap-2 ${className}`}>
      {label ? (
        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{label}</span>
      ) : null}
      <textarea
        className={`min-h-28 rounded-2xl border border-black/8 bg-white/90 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-emerald-500 dark:border-white/10 dark:bg-white/5 dark:text-white ${
          error ? 'border-rose-500 focus:border-rose-500' : ''
        }`}
        {...props}
      />
      {error ? <span className="text-sm text-rose-600 dark:text-rose-300">{error}</span> : null}
    </label>
  );
}
