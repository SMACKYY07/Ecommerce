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
    <>
      <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8 lg:pt-14">
        <div className="rounded-[2.4rem] border border-black/5 bg-white/75 px-6 py-10 shadow-[0_24px_70px_rgba(15,23,42,0.06)] dark:border-white/10 dark:bg-white/5 sm:px-8">
          <SectionHeading
            eyebrow="Catalog"
            title={filters.q ? `Results for “${filters.q}”` : 'Premium kitchen collection'}
            description="A full listing view with URL-synced search, layered filtering, and sort controls designed for desktop and mobile."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-[1.6rem] border border-black/5 bg-black/[0.03] p-4 dark:border-white/10 dark:bg-white/5">
              <p className="text-sm text-slate-500 dark:text-slate-400">Products</p>
              <p className="mt-2 font-heading text-3xl font-semibold tracking-tight">{products.length}</p>
            </div>
            <div className="rounded-[1.6rem] border border-black/5 bg-black/[0.03] p-4 dark:border-white/10 dark:bg-white/5">
              <p className="text-sm text-slate-500 dark:text-slate-400">Categories</p>
              <p className="mt-2 font-heading text-3xl font-semibold tracking-tight">{categories.length}</p>
            </div>
            <div className="rounded-[1.6rem] border border-black/5 bg-black/[0.03] p-4 dark:border-white/10 dark:bg-white/5">
              <p className="text-sm text-slate-500 dark:text-slate-400">Filtered by</p>
              <p className="mt-2 font-heading text-3xl font-semibold tracking-tight capitalize">
                {filters.category === 'all' ? 'All' : filters.category}
              </p>
            </div>
            <div className="rounded-[1.6rem] border border-black/5 bg-black/[0.03] p-4 dark:border-white/10 dark:bg-white/5">
              <p className="text-sm text-slate-500 dark:text-slate-400">Sort</p>
              <p className="mt-2 font-heading text-3xl font-semibold tracking-tight">
                {SORT_OPTIONS.find((option) => option.value === filters.sort)?.label || 'Featured'}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[320px_1fr] lg:px-8">
        <aside className="hidden h-fit lg:sticky lg:top-28 lg:block">
          <div className="rounded-[2rem] border border-black/5 bg-white/80 shadow-[0_20px_60px_rgba(15,23,42,0.06)] dark:border-white/10 dark:bg-white/5">
            <FilterSidebar filters={filters} onChange={setFilter} onReset={resetFilters} />
          </div>
        </aside>

        <div className="space-y-6">
          <div className="flex flex-col gap-4 rounded-[2rem] border border-black/5 bg-white/80 p-4 shadow-[0_18px_50px_rgba(15,23,42,0.05)] dark:border-white/10 dark:bg-white/5 sm:flex-row sm:items-center sm:justify-between">
            <Button variant="secondary" className="lg:hidden" onClick={() => setFilterDrawerOpen(true)}>
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {products.length} results {filters.q ? `for “${filters.q}”` : 'across the collection'}
            </p>
            <div className="sm:min-w-[16rem]">
              <Select
                label="Sort by"
                value={filters.sort}
                onChange={(event) => setFilter('sort', event.target.value)}
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
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
      </section>

      <Modal
        open={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        variant="drawer"
        title="Filters"
        description="Refine the catalog on smaller screens without leaving the page."
      >
        <FilterSidebar
          filters={filters}
          onChange={setFilter}
          onReset={resetFilters}
          onClose={() => setFilterDrawerOpen(false)}
        />
      </Modal>

      <ProductQuickView
        product={quickViewProduct}
        open={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
      />
    </>
  );
}

function ProductsGrid({ products, onQuickView }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setLoading(false), 280);
    return () => window.clearTimeout(timeoutId);
  }, []);

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-[2rem] border border-black/5 bg-white/80 p-4 dark:border-white/10 dark:bg-white/5"
          >
            <Skeleton className="h-72 w-full rounded-[1.6rem]" />
            <Skeleton className="mt-4 h-5 w-1/3" />
            <Skeleton className="mt-3 h-7 w-2/3" />
            <Skeleton className="mt-3 h-4 w-full" />
            <Skeleton className="mt-2 h-4 w-3/4" />
            <Skeleton className="mt-6 h-11 w-full rounded-full" />
          </div>
        ))}
      </div>
    );
  }

  if (!products.length) {
    return (
      <EmptyState
        icon={SlidersHorizontal}
        title="No products match these filters"
        description="Try widening the price range or clearing the category and rating filters."
        actionLabel="Reset filters"
        actionTo="/products"
      />
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} onQuickView={onQuickView} />
      ))}
    </div>
  );
}
