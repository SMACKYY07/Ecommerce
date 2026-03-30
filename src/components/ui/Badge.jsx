const toneClasses = {
  neutral: 'badge-neutral',
  accent: 'badge-accent',
  success: 'badge-success',
};

export function Badge({ children, className = '', tone = 'neutral' }) {
  return (
    <span className={`badge ${toneClasses[tone]} ${className}`}>
      {children}
    </span>
  );
}
