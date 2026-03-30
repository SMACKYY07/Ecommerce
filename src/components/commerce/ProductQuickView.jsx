import { Link, useNavigate } from 'react-router-dom';
import { getDefaultVariantSelection } from '../../data/catalog';
import { useCart } from '../../hooks/useCart';
import { useToast } from '../../hooks/useToast';
import { formatCurrency } from '../../utils/format';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { QuantityStepper } from '../ui/QuantityStepper';
import { RatingStars } from './RatingStars';
import { useState } from 'react';

export function ProductQuickView({ product, open, onClose }) {
  if (!product) {
    return null;
  }

  return <ProductQuickViewPanel key={product.slug} product={product} open={open} onClose={onClose} />;
}

function ProductQuickViewPanel({ product, open, onClose }) {
  const { addItem } = useCart();
  const { pushToast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [variantSelection, setVariantSelection] = useState(
    product ? getDefaultVariantSelection(product) : {},
  );

  function handleVariantChange(name, value) {
    setVariantSelection((currentSelection) => ({
      ...currentSelection,
      [name]: value,
    }));
  }

  function handleAddToCart() {
    addItem(product, variantSelection, quantity);
    pushToast({
      title: `${product.name} added to cart`,
      description: 'Your selection is saved in the cart drawer state.',
      tone: 'success',
    });
    onClose();
  }

  const navigate = useNavigate();
  function handleBuyNow() {
    addItem(product, variantSelection, quantity);
    onClose();
    navigate('/checkout');
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="lg"
      title={product.name}
      description={product.description}
    >
      <div className="grid grid-2 gap-8" style={{padding: 'var(--s-6)'}}>
        <div style={{overflow: 'hidden', borderRadius: 'var(--r-2xl)', background: 'var(--bg-soft)'}}>
          <img src={product.images[0]} alt={product.name} style={{width: '100%', height: '100%', minHeight: '22rem', objectFit: 'cover'}} />
        </div>
        <div style={{display: 'flex', flexDirection: 'column', gap: 'var(--s-6)'}}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <Badge tone="accent">{product.badge}</Badge>
            <RatingStars rating={product.rating} reviewCount={product.reviewCount} />
          </div>
          <div style={{display: 'flex', flexDirection: 'column', gap: 'var(--s-1)'}}>
            <p style={{fontSize: '0.875rem', fontWeight: 500, color: 'var(--muted)', textDecoration: 'line-through'}}>
              {formatCurrency(product.compareAtPrice)}
            </p>
            <div style={{display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--s-3)'}}>
              <p className="details-price">
                {formatCurrency(product.price)}
              </p>
              <Badge tone="accent" style={{backgroundColor: 'hsla(0, 84%, 60%, 0.1)', color: 'hsl(0, 84%, 60%)', border: 'none', padding: '2px 8px', fontSize: '0.75rem'}}>
                {Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)}% OFF
              </Badge>
            </div>
          </div>
          <div style={{display: 'grid', gap: 'var(--s-5)'}}>
            {product.variantGroups.map((group) => (
              <div key={group.name}>
                <p style={{fontSize: '0.875rem', fontWeight: 500, color: 'var(--muted)'}}>{group.label}</p>
                <div style={{marginTop: 'var(--s-3)', display: 'flex', flexWrap: 'wrap', gap: 'var(--s-2)'}}>
                  {group.options.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleVariantChange(group.name, option)}
                      className={`variant-btn ${variantSelection[group.name] === option ? 'active' : ''}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <QuantityStepper value={quantity} onChange={setQuantity} />
          <div className="grid grid-2 gap-3" style={{marginTop: 'var(--s-2)'}}>
            <Button variant="primary" onClick={handleAddToCart} style={{width: '100%'}}>
              Add to cart
            </Button>
            <Button variant="secondary" onClick={handleBuyNow} style={{width: '100%'}}>
              Buy now
            </Button>
          </div>
          <ul style={{display: 'grid', gap: 'var(--s-2)', fontSize: '0.875rem', color: 'var(--muted)', listStyle: 'none', padding: 0}}>
            {product.highlights.map((highlight) => (
              <li key={highlight}>• {highlight}</li>
            ))}
          </ul>
          <Link
            to={`/products/${product.slug}`}
            onClick={onClose}
            style={{fontSize: '0.875rem', fontWeight: 600, color: 'var(--primary)', textDecoration: 'none'}}
          >
            Open the full product page
          </Link>
        </div>
      </div>
    </Modal>
  );
}
