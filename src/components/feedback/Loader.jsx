export function Loader({ className = '' }) {
  return (
    <span
      className={`btn-loader ${className}`}
      aria-hidden="true"
    />
  );
}
