import { cn } from '../../utils/cn';

export function Skeleton({ className = '' }) {
  return <div className={cn('animate-pulse rounded-2xl bg-black/6 dark:bg-white/8', className)} />;
}
