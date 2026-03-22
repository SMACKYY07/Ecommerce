import { Button } from './Button';

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionTo,
}) {
  return (
    <div className="rounded-[2rem] border border-dashed border-black/10 bg-white/60 px-6 py-14 text-center shadow-[0_20px_60px_rgba(15,23,42,0.06)] dark:border-white/10 dark:bg-white/5">
      {Icon ? (
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300">
          <Icon className="h-6 w-6" />
        </div>
      ) : null}
      <h2 className="mt-5 font-heading text-2xl font-semibold tracking-tight">{title}</h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-600 dark:text-slate-300">
        {description}
      </p>
      {actionLabel && actionTo ? (
        <Button to={actionTo} className="mt-6">
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}
