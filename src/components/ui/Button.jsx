import { Link } from 'react-router-dom';
import { Loader } from '../feedback/Loader';
import { cn } from '../../utils/cn';

const variantStyles = {
  primary:
    'bg-slate-950 text-white shadow-[0_16px_40px_rgba(15,23,42,0.18)] hover:bg-emerald-600 hover:shadow-[0_16px_40px_rgba(16,185,129,0.22)] dark:bg-white dark:text-slate-950 dark:hover:bg-emerald-300',
  secondary:
    'border border-black/8 bg-white/80 text-slate-950 hover:border-emerald-500 hover:text-emerald-600 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-emerald-400 dark:hover:text-emerald-300',
  ghost:
    'text-slate-600 hover:bg-black/5 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white',
  danger:
    'bg-rose-600 text-white hover:bg-rose-700 dark:bg-rose-500 dark:hover:bg-rose-400',
};

const sizeStyles = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-sm',
  icon: 'h-11 w-11',
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
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-full font-medium transition duration-200 disabled:cursor-not-allowed disabled:opacity-60',
    variantStyles[variant],
    sizeStyles[size],
    className,
  );

  if (to) {
    return (
      <Link className={classes} to={to} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {loading ? <Loader className="h-4 w-4" /> : null}
      {children}
    </button>
  );
}
