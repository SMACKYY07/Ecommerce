export function SectionHeading({ eyebrow, title, description, action }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-600 dark:text-emerald-300">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
        {description ? (
          <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{description}</p>
        ) : null}
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
}
