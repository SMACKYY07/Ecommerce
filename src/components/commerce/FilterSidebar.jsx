import { PRICE_FILTERS, RATING_FILTERS, categories } from '../../data/catalog';
import { Button } from '../ui/Button';
import { cn } from '../../utils/cn';

export function FilterSidebar({ filters, onChange, onReset, onClose }) {
  return (
    <div className="grid gap-8 px-6 py-6">
      <div>
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-xl font-semibold tracking-tight">Filter collection</h2>
          <button
            type="button"
            onClick={onReset}
            className="text-sm font-medium text-slate-500 transition hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
          >
            Reset
          </button>
        </div>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Refine by category, price, and rating.
        </p>
      </div>

      <section>
        <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500">
          Category
        </h3>
        <div className="mt-4 grid gap-2">
          <button
            type="button"
            onClick={() => onChange('category', 'all')}
            className={cn(
              'rounded-2xl px-4 py-3 text-left text-sm font-medium transition',
              filters.category === 'all'
                ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950'
                : 'bg-black/4 text-slate-600 hover:bg-black/6 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/7',
            )}
          >
            All categories
          </button>
          {categories.map((category) => (
            <button
              key={category.name}
              type="button"
              onClick={() => onChange('category', category.name)}
              className={cn(
                'rounded-2xl px-4 py-3 text-left text-sm font-medium transition',
                filters.category === category.name
                  ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950'
                  : 'bg-black/4 text-slate-600 hover:bg-black/6 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/7',
              )}
            >
              {category.name}
            </button>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500">
          Price
        </h3>
        <div className="mt-4 grid gap-2">
          {PRICE_FILTERS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange('price', option.value)}
              className={cn(
                'rounded-2xl px-4 py-3 text-left text-sm font-medium transition',
                filters.price === option.value
                  ? 'bg-emerald-500/12 text-emerald-700 dark:bg-emerald-500/18 dark:text-emerald-300'
                  : 'bg-black/4 text-slate-600 hover:bg-black/6 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/7',
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500">
          Rating
        </h3>
        <div className="mt-4 grid gap-2">
          {RATING_FILTERS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange('rating', option.value)}
              className={cn(
                'rounded-2xl px-4 py-3 text-left text-sm font-medium transition',
                filters.rating === option.value
                  ? 'bg-emerald-500/12 text-emerald-700 dark:bg-emerald-500/18 dark:text-emerald-300'
                  : 'bg-black/4 text-slate-600 hover:bg-black/6 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/7',
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </section>

      {onClose ? (
        <Button variant="secondary" onClick={onClose}>
          Apply filters
        </Button>
      ) : null}
    </div>
  );
}
