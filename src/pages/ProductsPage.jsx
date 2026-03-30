import { SlidersHorizontal } from 'lucide-react';
import { startTransition, useDeferredValue, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FilterSidebar } from '../components/commerce/FilterSidebar';
import { ProductCard } from '../components/commerce/ProductCard';
import { ProductQuickView } from '../components/commerce/ProductQuickView';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import { Modal } from '../components/ui/Modal';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Select } from '../components/ui/Select';
import { Skeleton } from '../components/ui/Skeleton';
import { SORT_OPTIONS, categories, filterProducts } from '../data/catalog';

function readFilters(searchParams) {
  return {
    q: searchParams.get('q') || '',
    category: searchParams.get('category') || 'all',
    price: searchParams.get('price') || 'all',
    rating: searchParams.get('rating') || 'all',
    sort: searchParams.get('sort') || 'featured',
  };
}

export function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const filters = readFilters(searchParams);
  const deferredQuery = useDeferredValue(filters.q);
  const products = filterProducts({ ...filters, query: deferredQuery });
  const filterSignature = [filters.q, filters.category, filters.price, filters.rating, filters.sort].join('|');

  function setFilter(name, value) {
    startTransition(() => {
      const nextParams = new URLSearchParams(searchParams);
      if (!value || value === 'all' || (name === 'sort' && value === 'featured')) {
        nextParams.delete(name);
      } else {
        nextParams.set(name, value);
      }
      setSearchParams(nextParams);
    });
  }

  function resetFilters() {
    const nextParams = new URLSearchParams();
    if (filters.q) {
      nextParams.set('q', filters.q);
    }
    setSearchParams(nextParams);
  }

  return (
    <div className="container" style={{paddingTop: 'var(--s-20)'}}>
      <SectionHeading
        eyebrow="Catalog"
        title={filters.q ? `Results for “${filters.q}”` : 'Premium kitchen collection'}
        description="A full listing view with URL-synced search and layered filtering."
      />

      <div className="products-layout">
        <aside className="hidden-mobile">
          <div className="glass-panel" style={{padding: 'var(--s-6)', position: 'sticky', top: '7rem'}}>
            <FilterSidebar filters={filters} onChange={setFilter} onReset={resetFilters} />
          </div>
        </aside>

        <div className="flex flex-col gap-6">
          <div className="glass-panel flex justify-between items-center" style={{padding: 'var(--s-4)'}}>
            <Button variant="secondary" className="mobile-only" onClick={() => setFilterDrawerOpen(true)}>
              <SlidersHorizontal size={16} /> Filters
            </Button>
            <p style={{fontSize: '0.875rem', color: 'var(--muted)'}}>
              {products.length} results {filters.q ? `for “${filters.q}”` : ''}
            </p>
            <div style={{minWidth: '12rem'}}>
              <Select
                label="Sort"
                value={filters.sort}
                onChange={(e) => setFilter('sort', e.target.value)}
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </Select>
            </div>
          </div>

          <ProductsGrid
            key={filterSignature}
            products={products}
            onQuickView={setQuickViewProduct}
          />
        </div>
      </div>

      {filterDrawerOpen && (
        <Modal
          open={filterDrawerOpen}
          onClose={() => setFilterDrawerOpen(false)}
          title="Filters"
        >
          <FilterSidebar filters={filters} onChange={setFilter} onReset={resetFilters} />
        </Modal>
      )}

      <ProductQuickView
        product={quickViewProduct}
        open={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}

function ProductsGrid({ products, onQuickView }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setLoading(false), 300);
    return () => window.clearTimeout(timeoutId);
  }, []);

  if (loading) {
    return (
      <div className="products-grid">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="skeleton" style={{height: '24rem', borderRadius: 'var(--r-2xl)'}}></div>
        ))}
      </div>
    );
  }

  if (!products.length) {
    return (
      <EmptyState
        title="No items found"
        description="Try adjusting your filters or search term."
        actionLabel="Reset All"
        actionTo="/products"
      />
    );
  }

  return (
    <div className="products-grid">
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} onQuickView={onQuickView} />
      ))}
    </div>
  );
}
