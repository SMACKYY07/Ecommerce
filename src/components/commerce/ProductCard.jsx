import { Heart, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { getDefaultVariantSelection } from '../../data/catalog';
import { useCart } from '../../hooks/useCart';
import { useToast } from '../../hooks/useToast';
import { useWishlist } from '../../hooks/useWishlist';
import { formatCurrency } from '../../utils/format';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { RatingStars } from './RatingStars';

export function ProductCard({ product, onQuickView }) {
  const { addItem } = useCart();
  const { toggle, has } = useWishlist();
  const { pushToast } = useToast();
  const navigate = useNavigate();
  const isWishlisted = has(product.id);

  function handleAddToCart() {
    addItem(product, getDefaultVariantSelection(product), 1);
    pushToast({
      title: `${product.name} added to cart`,
      description: 'Saved with the default configuration.',
      tone: 'success',
    });
  }

  function handleLogout() {
    logout();
    setMobileMenuOpen(false);
  }

  return (
    <article className="glass-panel" style={{overflow: 'hidden', padding: 0, maxWidth: '320px', margin: '0 auto'}}>
      <div style={{position: 'relative', overflow: 'hidden'}}>
        <Link to={`/products/${product.slug}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            style={{width: '100%', height: '12rem', objectFit: 'cover'}}
          />
        </Link>
        <div style={{position: 'absolute', top: 'var(--s-4)', left: 'var(--s-4)', right: 'var(--s-4)', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Badge tone={product.featured ? 'accent' : 'neutral'}>{product.badge}</Badge>
          <button
            type="button"
            onClick={() => toggle(product.id)}
            className="btn btn-icon"
            style={{
              background: isWishlisted ? 'var(--primary)' : 'rgba(255,255,255,0.8)',
              color: isWishlisted ? 'white' : 'var(--fg)',
              backdropFilter: 'blur(8px)',
              borderRadius: '9999px'
            }}
          >
            <Heart size={18} fill={isWishlisted ? 'white' : 'none'} />
          </button>
        </div>
      </div>
      
      <div style={{padding: 'var(--s-6)', display: 'flex', flexDirection: 'column', gap: 'var(--s-4)'}}>
        <div className="flex justify-between items-center">
          <div>
            <span style={{fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--muted)'}}>
              {product.category}
            </span>
            <Link to={`/products/${product.slug}`} style={{display: 'block', marginTop: 'var(--s-2)', fontWeight: '700', fontSize: '1.25rem'}}>
              {product.name}
            </Link>
          </div>
          <RatingStars rating={product.rating} reviewCount={product.reviewCount} compact />
        </div>

        <div className="flex items-end justify-between">
          <div>
            {product.compareAtPrice > product.price && (
              <span style={{fontSize: '0.875rem', color: 'var(--muted)', textDecoration: 'line-through'}}>
                {formatCurrency(product.compareAtPrice)}
              </span>
            )}
            <p style={{fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary)'}}>
              {formatCurrency(product.price)}
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={() => onQuickView(product)}>
            View
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button variant="cart" onClick={handleAddToCart} size="md">
            Add
          </Button>
          <Button variant="buy" onClick={() => navigate('/checkout')} size="md">
            Buy
          </Button>
        </div>
      </div>
    </article>
  );
}
