import { Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { QuantityStepper } from '../ui/QuantityStepper';
import { formatCurrency, formatVariantSelection } from '../../utils/format';

export function CartLineItem({ item, onUpdateQty, onRemove }) {
  return (
    <div className="grid gap-4 rounded-[1.75rem] border border-black/5 bg-white/80 p-4 shadow-[0_20px_50px_rgba(15,23,42,0.06)] dark:border-white/10 dark:bg-white/5 sm:grid-cols-[112px_1fr]">
      <Link to={`/products/${item.slug}`} className="overflow-hidden rounded-[1.25rem] bg-black/5 dark:bg-white/5">
        <img src={item.image} alt={item.name} className="h-28 w-full object-cover sm:h-full" />
      </Link>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Link to={`/products/${item.slug}`} className="font-heading text-xl font-semibold tracking-tight">
              {item.name}
            </Link>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.category}</p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              {formatVariantSelection(item.variantSelection)}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onRemove(item.lineId)}
            className="inline-flex items-center gap-2 self-start text-sm text-slate-400 transition hover:text-rose-500"
          >
            <Trash2 className="h-4 w-4" />
            Remove
          </button>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <QuantityStepper value={item.quantity} onChange={(quantity) => onUpdateQty(item.lineId, quantity)} />
          <div className="text-right">
            <p className="text-sm text-slate-500 dark:text-slate-400">{formatCurrency(item.price)} each</p>
            <p className="font-heading text-2xl font-semibold tracking-tight">
              {formatCurrency(item.quantity * item.price)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
