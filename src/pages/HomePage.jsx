import { ArrowRight, BadgeCheck, PackageCheck, Sparkles, Star, Truck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { categories, featuredProducts } from '../data/catalog';
import { ProductCard } from '../components/commerce/ProductCard';
import { ProductQuickView } from '../components/commerce/ProductQuickView';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Skeleton } from '../components/ui/Skeleton';

const highlights = [
  {
    icon: PackageCheck,
    title: 'Purpose-built collection',
    description: 'A tightly edited assortment that favors tactile finishes and everyday usefulness.',
  },
  {
    icon: Truck,
    title: 'Fast, tracked delivery',
    description: 'Free shipping over $300 with packaging designed for safe arrival and quick setup.',
  },
  {
    icon: BadgeCheck,
    title: 'Premium materials',
    description: 'Brass, hardwood, stainless steel, and soft textiles chosen for visible longevity.',
  },
];

const testimonials = [
  {
    quote:
      'It feels like someone applied D2C discipline to kitchenware instead of flooding the page with noise.',
    name: 'Clara Watts',
    role: 'Interior stylist',
  },
  {
    quote:
      'The browsing experience is calm, the product mix is focused, and the details feel much more premium than typical demo stores.',
    name: 'Ethan Moss',
    role: 'Home renovator',
  },
];

export function HomePage() {
  const [loading, setLoading] = useState(true);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setLoading(false), 480);
    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <>
      <section className="mx-auto grid max-w-7xl gap-10 px-4 pt-10 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:pt-14">
        <div className="flex flex-col justify-center">
          <Badge tone="accent">Modern kitchen objects</Badge>
          <h1 className="mt-6 max-w-3xl font-heading text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
            Premium essentials that bring calm to the counter.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">
            Aurel Kitchen pairs warm materials, quiet proportions, and responsive performance
            across a refined collection of cooktops, cookware, prep tools, and pantry storage.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button to="/products" size="lg">
              Shop the collection
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button to="/products?category=Cooktops" variant="secondary" size="lg">
              Explore cooktops
            </Button>
          </div>
          <div className="mt-10 grid max-w-xl gap-4 sm:grid-cols-3">
            {[
              { label: '4.8 average rating', detail: 'Across the demo catalog' },
              { label: 'Free shipping $300+', detail: 'Fast tracked delivery' },
              { label: '30-day returns', detail: 'For a low-friction checkout' },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-[1.5rem] border border-black/5 bg-white/70 p-4 shadow-[0_18px_50px_rgba(15,23,42,0.05)] dark:border-white/10 dark:bg-white/5"
              >
                <p className="font-semibold">{item.label}</p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="relative overflow-hidden rounded-[2.2rem] border border-black/5 bg-white/75 p-4 shadow-[0_24px_70px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-white/5 sm:row-span-2">
            <img
              src={featuredProducts[0].images[0]}
              alt={featuredProducts[0].name}
              className="h-full min-h-[28rem] w-full rounded-[1.7rem] object-cover"
            />
            <div className="absolute inset-x-8 bottom-8 rounded-[1.5rem] border border-white/30 bg-slate-950/75 p-5 text-white backdrop-blur">
              <p className="text-xs uppercase tracking-[0.24em] text-white/60">Signature drop</p>
              <p className="mt-2 font-heading text-2xl font-semibold tracking-tight">
                {featuredProducts[0].name}
              </p>
              <p className="mt-2 text-sm text-white/70">{featuredProducts[0].description}</p>
            </div>
          </div>
          {featuredProducts.slice(1, 3).map((product) => (
            <div
              key={product.slug}
              className="overflow-hidden rounded-[2rem] border border-black/5 bg-white/75 p-4 shadow-[0_20px_60px_rgba(15,23,42,0.07)] dark:border-white/10 dark:bg-white/5"
            >
              <img src={product.images[0]} alt={product.name} className="h-48 w-full rounded-[1.5rem] object-cover" />
              <div className="mt-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500">
                    {product.category}
                  </p>
                  <p className="mt-1 font-heading text-xl font-semibold tracking-tight">{product.name}</p>
                </div>
                <div className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-700 dark:text-emerald-300">
                  <Star className="h-3.5 w-3.5 fill-current" />
                  {product.rating}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Featured now"
          title="The essentials customers reach for first"
          description="Clean silhouettes, useful details, and a product mix built to make a premium storefront feel focused rather than crowded."
          action={
            <Button to="/products" variant="secondary">
              View all products
            </Button>
          }
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {loading
            ? Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-[2rem] border border-black/5 bg-white/80 p-4 dark:border-white/10 dark:bg-white/5"
                >
                  <Skeleton className="h-72 w-full rounded-[1.6rem]" />
                  <Skeleton className="mt-4 h-6 w-2/3" />
                  <Skeleton className="mt-3 h-4 w-full" />
                  <Skeleton className="mt-2 h-4 w-3/4" />
                  <Skeleton className="mt-6 h-11 w-full rounded-full" />
                </div>
              ))
            : featuredProducts.slice(0, 4).map((product) => (
                <ProductCard key={product.slug} product={product} onQuickView={setQuickViewProduct} />
              ))}
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Shop by category"
          title="Designed around how modern kitchens actually get used"
          description="From statement appliances to subtle storage, each category stays visually tight and easy to browse."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {categories.slice(0, 4).map((category) => (
            <Link
              key={category.name}
              to={`/products?category=${encodeURIComponent(category.name)}`}
              className="group overflow-hidden rounded-[2rem] border border-black/5 bg-white/80 shadow-[0_20px_60px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(15,23,42,0.12)] dark:border-white/10 dark:bg-white/5"
            >
              <img
                src={category.image}
                alt={category.name}
                className="h-56 w-full object-cover transition duration-500 group-hover:scale-[1.04]"
              />
              <div className="p-5">
                <p className="text-sm uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500">
                  {category.name}
                </p>
                <p className="mt-2 font-heading text-2xl font-semibold tracking-tight">{category.title}</p>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[2.4rem] border border-black/5 bg-slate-950 px-6 py-10 text-white shadow-[0_28px_100px_rgba(15,23,42,0.18)] dark:border-white/10 dark:bg-gradient-to-r dark:from-slate-950 dark:to-slate-900 sm:px-10">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-white/50">Limited seasonal edit</p>
              <h2 className="mt-4 font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
                Save up to 18% on countertop appliances and curated pantry sets.
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
                The demo collection is tuned for premium contrast: neutral surfaces, emerald accents,
                and a focused range of products that still gives the catalog enough depth to feel real.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button to="/products?category=Appliances" className="bg-white text-slate-950 hover:bg-emerald-300">
                  Browse appliances
                </Button>
                <Button to="/products?category=Storage" variant="secondary" className="border-white/20 bg-white/5 text-white hover:border-emerald-300 hover:text-emerald-300">
                  Explore pantry storage
                </Button>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {highlights.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 backdrop-blur"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/12 text-emerald-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="mt-4 font-semibold">{item.title}</p>
                    <p className="mt-2 text-sm leading-6 text-white/65">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why it lands"
          title="Brand cues inspired by premium D2C storefronts"
          description="Minimal surfaces, rounded cards, softened shadows, and clear product hierarchy keep the experience polished across mobile and desktop."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="grid gap-5">
            {highlights.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="rounded-[2rem] border border-black/5 bg-white/80 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] dark:border-white/10 dark:bg-white/5"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 font-heading text-2xl font-semibold tracking-tight">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
          <div className="grid gap-5">
            {testimonials.map((testimonial) => (
              <article
                key={testimonial.name}
                className="rounded-[2rem] border border-black/5 bg-white/80 p-8 shadow-[0_18px_50px_rgba(15,23,42,0.06)] dark:border-white/10 dark:bg-white/5"
              >
                <Sparkles className="h-6 w-6 text-emerald-600 dark:text-emerald-300" />
                <p className="mt-5 font-heading text-2xl font-semibold leading-10 tracking-tight">
                  “{testimonial.quote}”
                </p>
                <div className="mt-6">
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{testimonial.role}</p>
                </div>
              </article>
            ))}
          </div>
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
