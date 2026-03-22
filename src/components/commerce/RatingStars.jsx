import { Star } from 'lucide-react';

export function RatingStars({ rating, reviewCount, compact = false }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1 text-amber-400">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            className={`h-3.5 w-3.5 ${index < Math.round(rating) ? 'fill-current' : ''}`}
          />
        ))}
      </div>
      <span className={`text-sm text-slate-500 dark:text-slate-400 ${compact ? 'hidden xl:inline' : ''}`}>
        {rating.toFixed(1)} · {reviewCount}
      </span>
    </div>
  );
}
