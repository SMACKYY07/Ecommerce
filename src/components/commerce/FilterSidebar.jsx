import { PRICE_FILTERS, RATING_FILTERS, categories } from '../../data/catalog';
import { Button } from '../ui/Button';

export function FilterSidebar({ filters, onChange, onReset, onClose }) {
  return (
    <div className="filter-section">
      <div className="flex justify-between items-center">
        <h3 className="filter-title">Filters</h3>
        <button onClick={onReset} style={{fontSize: '11px', color: 'var(--primary)', fontWeight: '700', textTransform: 'uppercase', background: 'none', border: 'none', cursor: 'pointer'}}>
          Reset
        </button>
      </div>

      <div className="filter-group">
        <span className="filter-title" style={{fontSize: '10px', color: 'var(--muted)'}}>Category</span>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => onChange('category', 'all')}
            className={`filter-item ${filters.category === 'all' ? 'active' : ''}`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => onChange('category', cat.name)}
              className={`filter-item ${filters.category === cat.name ? 'active' : ''}`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <span className="filter-title" style={{fontSize: '10px', color: 'var(--muted)'}}>Price Range</span>
        <div className="flex flex-col gap-2">
          {PRICE_FILTERS.map((option) => (
            <button
              key={option.value}
              onClick={() => onChange('price', option.value)}
              className={`filter-item ${filters.price === option.value ? 'active' : ''}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <span className="filter-title" style={{fontSize: '10px', color: 'var(--muted)'}}>Customer Rating</span>
        <div className="flex flex-col gap-2">
          {RATING_FILTERS.map((option) => (
            <button
              key={option.value}
              onClick={() => onChange('rating', option.value)}
              className={`filter-item ${filters.rating === option.value ? 'active' : ''}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {onClose && (
        <Button onClick={onClose} variant="primary" style={{marginTop: 'var(--s-4)'}}>
          Apply Filters
        </Button>
      )}
    </div>
  );
}
