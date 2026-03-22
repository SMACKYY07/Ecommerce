import { ShoppingBag } from 'lucide-react';
import { CartLineItem } from '../components/commerce/CartLineItem';
import { OrderSummary } from '../components/commerce/OrderSummary';
import { EmptyState } from '../components/ui/EmptyState';
import { SectionHeading } from '../components/ui/SectionHeading';
import { useCart } from '../hooks/useCart';
import { formatCurrency } from '../utils/format';

export function CartPage() {
  const { items, subtotal, shipping, tax, total, compareAtSubtotal, updateQty, removeItem } = useCart();

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <SectionHeading
        eyebrow="Cart"
        title="Review your selections before checkout"
        description="Variant-aware line items, editable quantities, and a persistent summary panel."
      />

      {items.length === 0 ? (
        <div className="mt-10">
          <EmptyState
            icon={ShoppingBag}
            title="Your cart is empty"
            description="Add a few pieces to see shipping, taxes, and the full checkout flow."
            actionLabel="Browse products"
            actionTo="/products"
          />
        </div>
      ) : (
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-5">
            {items.map((item) => (
              <CartLineItem
                key={item.lineId}
                item={item}
                onUpdateQty={updateQty}
                onRemove={removeItem}
              />
            ))}
            <div className="rounded-[2rem] border border-black/5 bg-white/80 p-6 text-sm leading-7 text-slate-600 shadow-[0_18px_50px_rgba(15,23,42,0.05)] dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
              <p className="font-semibold text-slate-950 dark:text-white">
                You are saving {formatCurrency(compareAtSubtotal - subtotal)} compared with the list price.
              </p>
              <p className="mt-2">
                Shipping is free once the subtotal crosses $300. Taxes are calculated at a flat
                demo rate for this frontend-only build.
              </p>
            </div>
          </div>
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <OrderSummary
              items={items}
              subtotal={subtotal}
              shipping={shipping}
              tax={tax}
              total={total}
              ctaLabel="Continue to checkout"
              ctaTo="/checkout"
            />
          </div>
        </div>
      )}
    </section>
  );
}
