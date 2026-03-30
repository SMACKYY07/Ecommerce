export function Skeleton({ className = '' }) {
  return <div className={`skeleton ${className}`} style={{borderRadius: 'var(--r-xl)', minHeight: '1rem'}} />;
}
