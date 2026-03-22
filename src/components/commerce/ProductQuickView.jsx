import { Link } from 'react-router-dom';
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

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="lg"
      title={product.name}
      description={product.description}
    >
      <div className="grid gap-8 p-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="overflow-hidden rounded-[1.8rem] bg-black/5 dark:bg-white/5">
          <img src={product.images[0]} alt={product.name} className="h-full min-h-[22rem] w-full object-cover" />
        </div>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Badge tone="accent">{product.badge}</Badge>
            <RatingStars rating={product.rating} reviewCount={product.reviewCount} />
          </div>
          <div className="flex items-end gap-3">
            <p className="font-heading text-3xl font-semibold tracking-tight">
              {formatCurrency(product.price)}
            </p>
            <p className="text-sm text-slate-400 line-through">
              {formatCurrency(product.compareAtPrice)}
            </p>
          </div>
          <div className="grid gap-5">
            {product.variantGroups.map((group) => (
              <div key={group.name}>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-300">{group.label}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {group.options.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleVariantChange(group.name, option)}
                      className={`rounded-full border px-4 py-2 text-sm transition ${
                        variantSelection[group.name] === option
                          ? 'border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                          : 'border-black/8 bg-white/70 text-slate-600 hover:border-emerald-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-300'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <QuantityStepper value={quantity} onChange={setQuantity} />
          <div className="grid gap-3 sm:grid-cols-2">
            <Button onClick={handleAddToCart}>Add to cart</Button>
            <Button to={`/products/${product.slug}`} variant="secondary" onClick={onClose}>
              View details
            </Button>
          </div>
          <ul className="grid gap-2 text-sm text-slate-600 dark:text-slate-300">
            {product.highlights.map((highlight) => (
              <li key={highlight}>• {highlight}</li>
            ))}
          </ul>
          <Link
            to={`/products/${product.slug}`}
            onClick={onClose}
            className="inline-flex text-sm font-medium text-emerald-600 dark:text-emerald-300"
          >
            Open the full product page
          </Link>
        </div>
      </div>
    </Modal>
  );
}
