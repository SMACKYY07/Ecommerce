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
          <h1 className="mt-4 font-heading text-4xl font-semibold tracking-tight">
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
    <>
      <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8 lg:pt-14">
        <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/products">Products</Link>
          <span>/</span>
          <Link to={`/products?category=${encodeURIComponent(product.category)}`}>{product.category}</Link>
          <span>/</span>
          <span className="text-slate-950 dark:text-white">{product.name}</span>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          {loading ? (
            <>
              <Skeleton className="min-h-[34rem] rounded-[2.2rem]" />
              <div className="grid gap-4">
                <Skeleton className="h-6 w-28" />
                <Skeleton className="h-14 w-3/4" />
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-12 w-full rounded-full" />
                <Skeleton className="h-12 w-full rounded-full" />
              </div>
            </>
          ) : (
            <>
              <ProductGallery images={product.images} alt={product.name} />

              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Badge tone={product.featured ? 'inverted' : 'accent'}>{product.badge}</Badge>
                    {product.isNew ? <Badge tone="accent">New</Badge> : null}
                  </div>
                  <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
                    {product.name}
                  </h1>
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="font-heading text-3xl font-semibold tracking-tight">
                      {formatCurrency(product.price)}
                    </p>
                    <p className="text-lg text-slate-400 line-through">
                      {formatCurrency(product.compareAtPrice)}
                    </p>
                    <RatingStars rating={product.rating} reviewCount={product.reviewCount} />
                  </div>
                  <p className="max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">
                    {product.description}
                  </p>
                </div>

                <div className="grid gap-6 rounded-[2rem] border border-black/5 bg-white/75 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)] dark:border-white/10 dark:bg-white/5">
                  {product.variantGroups.map((group) => (
                    <div key={group.name}>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500">
                          {group.label}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {variantSelection[group.name]}
                        </p>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {group.options.map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => updateVariant(group.name, option)}
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
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500">
                        Quantity
                      </p>
                      <div className="mt-3">
                        <QuantityStepper value={quantity} onChange={setQuantity} />
                      </div>
                    </div>
                    <div className="grid w-full gap-3 sm:max-w-md sm:grid-cols-2">
                      <Button onClick={handleAddToCart}>Add to cart</Button>
                      <Button variant="secondary" onClick={handleBuyNow}>
                        Buy now
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  {assuranceItems.map((item) => {
                    const Icon = item.icon;

                    return (
                      <article
                        key={item.title}
                        className="rounded-[1.8rem] border border-black/5 bg-white/70 p-5 dark:border-white/10 dark:bg-white/5"
                      >
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300">
                          <Icon className="h-5 w-5" />
                        </div>
                        <h2 className="mt-4 font-semibold">{item.title}</h2>
                        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                          {item.description}
                        </p>
                      </article>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="rounded-[2rem] border border-black/5 bg-white/80 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)] dark:border-white/10 dark:bg-white/5">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-emerald-600 dark:text-emerald-300">
              Specifications
            </p>
            <div className="mt-5 grid gap-4">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="rounded-[1.35rem] bg-black/[0.03] px-4 py-4 dark:bg-white/5">
                  <p className="text-sm text-slate-500 dark:text-slate-400">{key}</p>
                  <p className="mt-1 font-medium">{value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[2rem] border border-black/5 bg-white/80 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)] dark:border-white/10 dark:bg-white/5">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-emerald-600 dark:text-emerald-300">
              Included details
            </p>
            <ul className="mt-5 grid gap-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
              {product.highlights.map((highlight) => (
                <li key={highlight} className="rounded-[1.35rem] bg-black/[0.03] px-4 py-4 dark:bg-white/5">
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Reviews"
          title="What customers notice first"
          description={`Generated social proof for the ${product.name} detail view.`}
        />
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {reviews.map((review) => (
            <article
              key={review.name}
              className="rounded-[2rem] border border-black/5 bg-white/80 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)] dark:border-white/10 dark:bg-white/5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-sm font-semibold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
                    {review.avatar}
                  </div>
                  <div>
                    <p className="font-semibold">{review.name}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{review.role}</p>
                  </div>
                </div>
                <p className="text-sm text-slate-400">{review.date}</p>
              </div>
              <div className="mt-4">
                <RatingStars rating={review.rating} reviewCount={product.reviewCount} />
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{review.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Related"
          title={`More from ${product.category}`}
          description="The same premium card system powers related discovery across the PDP."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {relatedProducts.map((relatedProduct) => (
            <ProductCard
              key={relatedProduct.slug}
              product={relatedProduct}
              onQuickView={setQuickViewProduct}
            />
          ))}
        </div>
      </section>

      <ProductQuickView
        product={quickViewProduct}
        open={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
      />
    </>
  );
}
