import { Star } from 'lucide-react';

export function RatingStars({ rating, reviewCount, compact = false }) {
  return (
    <div className="rating-stars">
      <div className="stars-list">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            size={14}
            className={index < Math.round(rating) ? 'star-filled' : ''}
          />
        ))}
      </div>
      <span style={{fontSize: '0.875rem', color: 'var(--muted)'}}>
        {rating.toFixed(1)} · {reviewCount}
      </span>
    </div>
  );
}
