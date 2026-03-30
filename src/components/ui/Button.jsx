import { Link } from 'react-router-dom';
import { Loader } from '../feedback/Loader';

const variantClasses = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
  accent: 'btn-accent',
  cart: 'btn-cart',
  buy: 'btn-buy',
  quickview: 'btn-quickview',
};

const sizeClasses = {
  sm: 'btn-sm',
  md: 'btn-md',
  lg: 'btn-lg',
  icon: 'btn-icon',
};

export function Button({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  loading = false,
  to,
  ...props
}) {
  const classes = [
    'btn',
    variantClasses[variant],
    sizeClasses[size],
    loading ? 'btn-loading' : '',
    className,
  ].filter(Boolean).join(' ');

  if (to) {
    return (
      <Link className={classes} to={to} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} disabled={loading} {...props}>
      {loading ? <Loader className="btn-loader" /> : null}
      {children}
    </button>
  );
}
