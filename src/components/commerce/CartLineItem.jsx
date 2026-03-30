import { Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { QuantityStepper } from '../ui/QuantityStepper';
import { formatCurrency, formatVariantSelection } from '../../utils/format';

export function CartLineItem({ item, onUpdateQty, onRemove }) {
  return (
    <div className="cart-item">
      <Link to={`/products/${item.slug}`} className="cart-item-img">
        <img src={item.image} alt={item.name} />
      </Link>
      <div className="cart-item-info">
        <div className="cart-item-header">
          <div>
            <Link to={`/products/${item.slug}`} className="cart-item-title">
              {item.name}
            </Link>
            <div className="cart-item-meta">
              <p>{item.category}</p>
              <p style={{marginTop: 'var(--s-1)'}}>
                {formatVariantSelection(item.variantSelection)}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onRemove(item.lineId)}
            className="cart-item-remove"
          >
            <Trash2 size={16} />
            <span>Remove</span>
          </button>
        </div>
        <div className="cart-item-actions">
          <QuantityStepper value={item.quantity} onChange={(quantity) => onUpdateQty(item.lineId, quantity)} />
          <div className="cart-item-price-info">
            <p className="cart-item-price">{formatCurrency(item.price)} each</p>
            <p className="cart-item-total">
              {formatCurrency(item.quantity * item.price)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
