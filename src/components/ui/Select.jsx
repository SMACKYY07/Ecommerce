export function Select({ label, error, className = '', children, ...props }) {
  return (
    <label className={className} style={{display: 'grid', gap: 'var(--s-2)'}}>
      {label && (
        <span style={{fontSize: '0.875rem', fontWeight: 600, color: 'var(--fg)'}}>{label}</span>
      )}
      <div className="select-wrapper">
        <select
          className="select-base"
          style={error ? {borderColor: 'var(--error)'} : {}}
          {...props}
        >
          {children}
        </select>
      </div>
      {error && <span style={{fontSize: '0.75rem', color: 'var(--error)'}}>{error}</span>}
    </label>
  );
}
