import { Heart, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
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
  const isWishlisted = has(product.id);

  function handleAddToCart() {
    addItem(product, getDefaultVariantSelection(product), 1);
    pushToast({
      title: `${product.name} added to cart`,
      description: 'Saved with the default configuration.',
      tone: 'success',
    });
  }

  function handleToggleWishlist() {
    toggle(product.id);
    pushToast({
      title: isWishlisted ? `${product.name} removed from wishlist` : `${product.name} saved`,
      tone: 'neutral',
    });
  }

  return (
    <article className="group overflow-hidden rounded-[2rem] border border-black/5 bg-white/80 shadow-[0_18px_60px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_80px_rgba(15,23,42,0.14)] dark:border-white/10 dark:bg-white/5">
      <div className="relative overflow-hidden">
        <Link to={`/products/${product.slug}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-72 w-full object-cover transition duration-500 group-hover:scale-[1.04]"
          />
        </Link>
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
          <Badge tone={product.featured ? 'inverted' : 'accent'}>{product.badge}</Badge>
          <button
            type="button"
            onClick={handleToggleWishlist}
            className={`inline-flex h-11 w-11 items-center justify-center rounded-full backdrop-blur transition ${
              isWishlisted
                ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20'
                : 'bg-white/85 text-slate-700 hover:text-rose-500 dark:bg-slate-950/70 dark:text-white'
            }`}
            aria-label="Toggle wishlist"
          >
            <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>
      <div className="space-y-4 p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500">
              {product.category}
            </p>
            <Link to={`/products/${product.slug}`} className="mt-2 block font-heading text-2xl font-semibold tracking-tight">
              {product.name}
            </Link>
          </div>
          <RatingStars rating={product.rating} reviewCount={product.reviewCount} compact />
        </div>
        <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">{product.description}</p>
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="font-heading text-2xl font-semibold tracking-tight">{formatCurrency(product.price)}</p>
            <p className="text-sm text-slate-400 line-through">{formatCurrency(product.compareAtPrice)}</p>
          </div>
          <div className="hidden translate-y-2 items-center gap-2 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:flex">
            <Button variant="secondary" size="sm" onClick={() => onQuickView(product)}>
              Quick view
            </Button>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
          <Button variant="secondary" onClick={() => onQuickView(product)} className="sm:hidden">
            Quick view
          </Button>
          <Button onClick={handleAddToCart} className="sm:min-w-[11rem]">
            <ShoppingBag className="h-4 w-4" />
            Add to cart
          </Button>
        </div>
      </div>
    </article>
  );
}
