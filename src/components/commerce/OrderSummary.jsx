import { Link } from 'react-router-dom';
import { formatCurrency, formatVariantSelection } from '../../utils/format';
import { Button } from '../ui/Button';

export function OrderSummary({ items, subtotal, shipping, tax, total, ctaLabel, ctaTo, onCtaClick }) {
  return (
    <aside className="rounded-[2rem] border border-black/5 bg-white/80 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-white/5">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-2xl font-semibold tracking-tight">Order summary</h2>
        <span className="text-sm text-slate-500 dark:text-slate-400">{items.length} lines</span>
      </div>

      <div className="mt-6 space-y-4">
        {items.map((item) => (
          <div key={item.lineId} className="flex items-center gap-3">
            <img src={item.image} alt={item.name} className="h-16 w-16 rounded-2xl object-cover" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{item.name}</p>
              <p className="truncate text-sm text-slate-500 dark:text-slate-400">
                {item.quantity} × {formatVariantSelection(item.variantSelection)}
              </p>
            </div>
            <p className="text-sm font-medium">{formatCurrency(item.quantity * item.price)}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-3 border-t border-black/5 pt-5 text-sm dark:border-white/10">
        <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
          <span>Shipping</span>
          <span>{shipping === 0 ? 'Free' : formatCurrency(shipping)}</span>
        </div>
        <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
          <span>Estimated tax</span>
          <span>{formatCurrency(tax)}</span>
        </div>
        <div className="flex items-center justify-between border-t border-black/5 pt-4 font-semibold text-slate-950 dark:border-white/10 dark:text-white">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>

      {ctaLabel ? (
        ctaTo ? (
          <Button to={ctaTo} className="mt-6 w-full">
            {ctaLabel}
          </Button>
        ) : (
          <Button onClick={onCtaClick} className="mt-6 w-full">
            {ctaLabel}
          </Button>
        )
      ) : null}

      <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
        Need something else? <Link to="/products" className="text-emerald-600 dark:text-emerald-300">Continue shopping</Link>
      </p>
    </aside>
  );
}
