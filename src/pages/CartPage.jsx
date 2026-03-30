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
    <div className="container" style={{paddingTop: 'var(--s-16)', paddingBottom: 'var(--s-24)'}}>
      <SectionHeading
        eyebrow="Cart"
        title="Review your selections"
        description="Variant-aware line items, editable quantities, and a persistent summary panel."
      />

      {items.length === 0 ? (
        <div style={{marginTop: 'var(--s-10)'}}>
          <EmptyState
            icon={ShoppingBag}
            title="Your cart is empty"
            description="Add a few pieces to see shipping, taxes, and the full checkout flow."
            actionLabel="Browse products"
            actionTo="/products"
          />
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {items.map((item) => (
              <CartLineItem
                key={item.lineId}
                item={item}
                onUpdateQty={updateQty}
                onRemove={removeItem}
              />
            ))}
            <div className="glass-panel" style={{padding: 'var(--s-8)', fontSize: '0.875rem', lineHeight: 1.6}}>
              <p style={{fontWeight: 700, color: 'var(--primary)'}}>
                You are saving {formatCurrency(compareAtSubtotal - subtotal)} compared with the list price.
              </p>
              <p style={{marginTop: 'var(--s-3)', color: 'var(--muted)'}}>
                Shipping is free once the subtotal crosses $300. Taxes are calculated at a flat
                demo rate for this frontend-only build.
              </p>
            </div>
          </div>
          <div>
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
    </div>
  );
}
