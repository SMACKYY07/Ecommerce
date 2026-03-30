export function Textarea({ label, error, className = '', ...props }) {
  return (
    <label className={className} style={{display: 'grid', gap: 'var(--s-2)'}}>
      {label && (
        <span style={{fontSize: '0.875rem', fontWeight: 600, color: 'var(--fg)'}}>{label}</span>
      )}
      <textarea
        className="textarea-base"
        style={error ? {borderColor: 'var(--error)'} : {}}
        {...props}
      />
      {error && <span style={{fontSize: '0.75rem', color: 'var(--error)'}}>{error}</span>}
    </label>
  );
}
