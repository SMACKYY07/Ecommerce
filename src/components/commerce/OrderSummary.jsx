import { Link } from 'react-router-dom';
import { formatCurrency, formatVariantSelection } from '../../utils/format';
import { Button } from '../ui/Button';

export function OrderSummary({ items, subtotal, shipping, tax, total, ctaLabel, ctaTo, onCtaClick }) {
  return (
    <aside className="order-summary">
      <div className="flex justify-between items-center" style={{marginBottom: 'var(--s-6)'}}>
        <h2 className="filter-title" style={{fontSize: '1.5rem'}}>Order summary</h2>
        <span style={{fontSize: '0.875rem', color: 'var(--muted)'}}>{items.length} items</span>
      </div>

      <div className="flex flex-col gap-4" style={{marginBottom: 'var(--s-8)'}}>
        {items.map((item) => (
          <div key={item.lineId} className="flex items-center gap-3">
            <div style={{width: '3rem', height: '3rem', borderRadius: 'var(--r-lg)', overflow: 'hidden', background: 'var(--bg-soft)'}}>
              <img src={item.image} alt={item.name} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
            </div>
            <div style={{flex: 1, minWidth: 0}}>
              <p style={{fontSize: '0.875rem', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{item.name}</p>
              <p style={{fontSize: '0.75rem', color: 'var(--muted)'}}>{item.quantity} × {formatVariantSelection(item.variantSelection)}</p>
            </div>
            <p style={{fontSize: '0.875rem', fontWeight: 600}}>{formatCurrency(item.quantity * item.price)}</p>
          </div>
        ))}
      </div>

      <div className="summary-row">
        <span className="summary-label">Subtotal</span>
        <span className="summary-value">{formatCurrency(subtotal)}</span>
      </div>
      <div className="summary-row">
        <span className="summary-label">Shipping</span>
        <span className="summary-value">{shipping === 0 ? 'Free' : formatCurrency(shipping)}</span>
      </div>
      <div className="summary-row">
        <span className="summary-label">Estimated tax</span>
        <span className="summary-value">{formatCurrency(tax)}</span>
      </div>
      <div className="summary-total-row">
        <span style={{fontWeight: 700}}>Total</span>
        <span className="summary-total">{formatCurrency(total)}</span>
      </div>

      <div style={{marginTop: 'var(--s-8)'}}>
        {ctaLabel && (
          ctaTo ? (
            <Button to={ctaTo} variant="primary" style={{width: '100%'}}>
              {ctaLabel}
            </Button>
          ) : (
            <Button onClick={onCtaClick} variant="primary" style={{width: '100%'}}>
              {ctaLabel}
            </Button>
          )
        )}
      </div>

      <p style={{marginTop: 'var(--s-4)', fontSize: '0.875rem', color: 'var(--muted)', textAlign: 'center'}}>
        Need something else? <Link to="/products" style={{color: 'var(--primary)', fontWeight: 600}}>Continue shopping</Link>
      </p>
    </aside>
  );
}
