export function Input({
  label,
  error,
  className = '',
  inputClassName = '',
  description,
  ...props
}) {
  return (
    <label className={`input-wrapper ${className}`}>
      {label && <span className="input-label">{label}</span>}
      <input
        className={`input ${error ? 'input-error' : ''} ${inputClassName}`}
        {...props}
      />
      {error ? (
        <span className="input-error-text">{error}</span>
      ) : description ? (
        <span className="input-description">{description}</span>
      ) : null}
    </label>
  );
}
