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
    const timeoutId = window.setTimeout(() => setLoading(false), 800);
    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-content">
          <div className="section-eyebrow animate-fade-in" style={{margin: '0 auto var(--s-10)'}}>
            <Sparkles size={12} style={{marginRight: 'var(--s-2)'}} />
            Modern Kitchen Objects
          </div>
          
          <h1 className="animate-fade-in delay-100">
            Elevate your <span style={{color: 'var(--primary)'}}>countertop.</span>
          </h1>
          
          <p className="animate-fade-in delay-200" style={{maxWidth: '36rem', margin: '0 auto var(--s-12)', fontSize: '1.25rem', color: 'var(--muted)'}}>
            Kitch Me pairs architectural precision with warm materials to create 
            essential tools that bring calm to the heart of your home.
          </p>

          <div className="flex justify-center gap-4 animate-fade-in delay-300">
            <Button to="/products" size="lg" variant="primary">
              Shop Collection
              <ArrowRight size={20} style={{marginLeft: 'var(--s-2)'}} />
            </Button>
            <Button to="/products?category=Appliances" variant="secondary" size="lg">
              View Appliances
            </Button>
          </div>

          <div className="flex justify-center gap-12 animate-fade-in delay-300" style={{marginTop: 'var(--s-20)'}}>
            {[
              { label: '4.8 Rating', detail: 'Signature collection' },
              { label: 'Free Shipping', detail: 'Orders over $300' },
              { label: '30-Day Returns', detail: 'Premium assurance' }
            ].map((stat, idx) => (
              <div key={idx} style={{textAlign: 'left', borderLeft: '1px solid var(--border)', paddingLeft: 'var(--s-6)'}}>
                <p style={{fontSize: '1.25rem', fontWeight: '800'}}>{stat.label}</p>
                <p style={{fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)'}}>{stat.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container" style={{marginTop: 'var(--s-32)'}}>
        <SectionHeading 
          eyebrow="Featured Selection"
          title={<>Essentials for the <br /> modern chef.</>}
          action={<Button to="/products" variant="secondary">View All</Button>}
        />

        <div className="grid-responsive" style={{marginTop: 'var(--s-16)'}}>
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-4">
                  <div className="skeleton" style={{aspectRatio: '1/1', borderRadius: 'var(--r-2xl)'}}></div>
                  <div className="skeleton" style={{height: '1.5rem', width: '60%'}}></div>
                  <div className="skeleton" style={{height: '1rem', width: '100%'}}></div>
                </div>
              ))
            : featuredProducts.slice(0, 4).map((product) => (
                <ProductCard key={product.slug} product={product} onQuickView={setQuickViewProduct} />
              ))}
        </div>
      </section>

      {/* Category Grid */}
      <section className="container" style={{marginTop: 'var(--s-40)'}}>
        <div className="grid-responsive" style={{marginTop: 'var(--s-12)'}}>
          {categories.slice(0, 4).map((cat) => (
            <Link 
              key={cat.name}
              to={`/products?category=${encodeURIComponent(cat.name)}`}
              className="category-card"
              style={{height: '320px'}}
            >
              <img src={cat.image} alt={cat.name} />
              <div className="category-overlay">
                <h4 style={{fontSize: '1.25rem', fontWeight: '800'}}>{cat.name}</h4>
                <p style={{fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)'}}>{cat.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>


      {/* Philosophy Section */}
      <section className="container" style={{marginTop: 'var(--s-40)', paddingBottom: 'var(--s-40)'}}>
        <div className="glass-panel" style={{padding: 'var(--s-20)', background: 'var(--fg)', color: 'var(--bg)', borderRadius: 'var(--r-3xl)'}}>
          <div className="grid grid-2 items-center gap-16">
            <div className="flex flex-col gap-12">
              <h2 style={{fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', color: 'var(--bg)', lineHeight: 1.1}}>
                Considered tools <br /> for considered <i style={{color: 'var(--primary)'}}>living.</i>
              </h2>
              <div className="flex flex-col gap-8">
                 {highlights.map((item, i) => {
                   const Icon = item.icon;
                   return (
                     <div key={i} className="flex gap-6">
                        <div className="btn btn-icon" style={{background: 'rgba(255,255,255,0.1)', color: 'white', borderRadius: 'var(--r-xl)'}}>
                          <Icon size={24} />
                        </div>
                        <div>
                          <h4 style={{fontSize: '1.25rem', fontWeight: '800', color: 'white'}}>{item.title}</h4>
                          <p style={{marginTop: 'var(--s-2)', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6}}>{item.description}</p>
                        </div>
                     </div>
                   );
                 })}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4" style={{height: '100%'}}>
              {featuredProducts.slice(0, 4).map((product, i) => (
                <div key={i} style={{borderRadius: 'var(--r-xl)', overflow: 'hidden', aspectRatio: '1/1'}}>
                  <img 
                    src={product.images[0]} 
                    alt={`Philosophy ${i}`} 
                    style={{width: '100%', height: '100%', objectFit: 'cover', filter: i % 2 === 0 ? 'grayscale(1)' : 'none', opacity: 0.9}}
                  />
                </div>
              ))}
            </div>
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
