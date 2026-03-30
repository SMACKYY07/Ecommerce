import { RotateCcw, ShieldCheck, Truck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ProductCard } from '../components/commerce/ProductCard';
import { ProductGallery } from '../components/commerce/ProductGallery';
import { ProductQuickView } from '../components/commerce/ProductQuickView';
import { RatingStars } from '../components/commerce/RatingStars';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { QuantityStepper } from '../components/ui/QuantityStepper';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Skeleton } from '../components/ui/Skeleton';
import { getDefaultVariantSelection, getProductBySlug, getProductReviews, getRelatedProducts } from '../data/catalog';
import { useCart } from '../hooks/useCart';
import { useToast } from '../hooks/useToast';
import { formatCurrency } from '../utils/format';

const assuranceItems = [
  {
    icon: Truck,
    title: 'Tracked delivery',
    description: 'Packed for safe transit with doorstep tracking on every order.',
  },
  {
    icon: RotateCcw,
    title: '30-day returns',
    description: 'Easy returns for products that are not the right fit for your space.',
  },
  {
    icon: ShieldCheck,
    title: 'Warranty support',
    description: 'Every core product includes a visible demo warranty in its specs.',
  },
];

export function ProductDetailsPage() {
  const { slug } = useParams();
  const product = getProductBySlug(slug);

  if (!product) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-[2.2rem] border border-black/5 bg-white/80 p-10 text-center dark:border-white/10 dark:bg-white/5">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500">
            Product unavailable
          </p>
          <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight text-slate-950 dark:text-white">
            This item could not be found.
          </h1>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
            The catalog route is still active. Head back to the collection to keep browsing.
          </p>
          <Button to="/products" className="mt-8">
            Back to products
          </Button>
        </div>
      </section>
    );
  }

  return <ProductDetailsContent key={slug} product={product} />;
}

function ProductDetailsContent({ product }) {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { pushToast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [variantSelection, setVariantSelection] = useState(() => getDefaultVariantSelection(product));

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setLoading(false), 360);
    return () => window.clearTimeout(timeoutId);
  }, []);

  const relatedProducts = getRelatedProducts(product);
  const reviews = getProductReviews(product);

  function updateVariant(groupName, option) {
    setVariantSelection((currentSelection) => ({
      ...currentSelection,
      [groupName]: option,
    }));
  }

  function handleAddToCart() {
    addItem(product, variantSelection, quantity);
    pushToast({
      title: `${product.name} added to cart`,
      description: 'Your custom selection was saved.',
      tone: 'success',
    });
  }

  function handleBuyNow() {
    addItem(product, variantSelection, quantity);
    pushToast({
      title: 'Selection saved',
      description: 'Taking you to checkout now.',
      tone: 'success',
    });
    navigate('/checkout');
  }

  return (
    <div className="container" style={{paddingTop: 'var(--s-16)'}}>
      <div style={{fontSize: '0.875rem', color: 'var(--muted)', marginBottom: 'var(--s-8)'}}>
        <Link to="/">Home</Link> / <Link to="/products">Products</Link> / <span style={{color: 'var(--fg)'}}>{product.name}</span>
      </div>

      <div className="details-grid">
        {loading ? (
          <div className="skeleton" style={{gridColumn: '1 / -1', height: '34rem', borderRadius: 'var(--r-3xl)'}}></div>
        ) : (
          <>
            <ProductGallery images={product.images} alt={product.name} />

            <div className="details-info">
              <div className="flex flex-col gap-4">
                <div className="flex gap-2">
                  <Badge tone={product.featured ? 'inverted' : 'accent'}>{product.badge}</Badge>
                  {product.isNew && <Badge tone="accent">New</Badge>}
                </div>
                <h1 className="details-title">{product.name}</h1>
                <div className="flex items-center gap-6">
                  <span className="details-price">{formatCurrency(product.price)}</span>
                  {product.compareAtPrice > product.price && (
                    <span style={{textDecoration: 'line-through', color: 'var(--muted)', fontSize: '1.25rem'}}>
                      {formatCurrency(product.compareAtPrice)}
                    </span>
                  )}
                  <RatingStars rating={product.rating} reviewCount={product.reviewCount} />
                </div>
                <p style={{fontSize: '1.125rem', color: 'var(--muted)', lineHeight: 1.6}}>
                  {product.description}
                </p>
              </div>

              <div className="glass-panel flex flex-col gap-10" style={{padding: 'var(--s-8)'}}>
                {product.variantGroups.map((group) => (
                  <div key={group.name} className="details-variant-group">
                    <div className="flex justify-between items-center">
                      <span className="filter-title">{group.label}</span>
                      <span style={{fontSize: '0.875rem', color: 'var(--muted)'}}>{variantSelection[group.name]}</span>
                    </div>
                    <div className="details-variant-chips">
                      {group.options.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => updateVariant(group.name, option)}
                          className={`variant-chip ${variantSelection[group.name] === option ? 'active' : ''}`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                
                <div className="flex flex-col gap-6">
                  <div>
                    <span className="filter-title">Quantity</span>
                    <div style={{marginTop: 'var(--s-3)'}}>
                      <QuantityStepper value={quantity} onChange={setQuantity} />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Button variant="primary" style={{flex: 1}} onClick={handleAddToCart}>
                      Add to cart
                    </Button>
                    <Button variant="buy" style={{flex: 1}} onClick={handleBuyNow}>
                      Buy now
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid grid-3 gap-4">
                {assuranceItems.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="glass-panel" style={{padding: 'var(--s-4)', textAlign: 'center'}}>
                      <div className="flex justify-center" style={{color: 'var(--primary)', marginBottom: 'var(--s-3)'}}>
                        <Icon size={20} />
                      </div>
                      <h4 style={{fontSize: '0.875rem', fontWeight: 700}}>{item.title}</h4>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Specs Section */}
      <section style={{marginTop: 'var(--s-24)'}}>
        <SectionHeading title="Product Details" eyebrow="Specifications" />
        <div className="grid grid-2 gap-12" style={{marginTop: 'var(--s-12)'}}>
          <div className="flex flex-col gap-6">
            <h3 className="filter-title">Technical Specifications</h3>
            <div className="flex flex-col gap-4">
              {Object.entries(product.specs).map(([k, v]) => (
                <div key={k} className="flex justify-between" style={{paddingBottom: 'var(--s-3)', borderBottom: '1px solid var(--border)'}}>
                  <span style={{color: 'var(--muted)'}}>{k}</span>
                  <span style={{fontWeight: 600}}>{v}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <h3 className="filter-title">Key Highlights</h3>
            <ul className="flex flex-col gap-4">
              {product.highlights.map((h, i) => (
                <li key={i} style={{fontSize: '0.875rem', color: 'var(--muted)', display: 'flex', gap: 'var(--s-3)'}}>
                  <span style={{color: 'var(--primary)'}}>•</span> {h}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <ProductQuickView
        product={quickViewProduct}
        open={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}

