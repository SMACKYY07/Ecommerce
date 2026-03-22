import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';

const sizeStyles = {
  md: 'max-w-2xl',
  lg: 'max-w-5xl',
  xl: 'max-w-6xl',
};

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  size = 'md',
  variant = 'dialog',
  className = '',
}) {
  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function handleEscape(event) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/55 backdrop-blur-sm"
        aria-label="Close dialog"
      />

      <div
        className={cn(
          'relative z-10 w-full overflow-hidden rounded-[2rem] border border-black/8 bg-[var(--color-card)] shadow-[0_32px_120px_rgba(15,23,42,0.32)] dark:border-white/10',
          variant === 'drawer'
            ? 'ml-auto max-h-[calc(100vh-2rem)] max-w-xl'
            : `max-h-[calc(100vh-2rem)] ${sizeStyles[size]}`,
          className,
        )}
      >
        <div className="flex items-start justify-between border-b border-black/5 px-6 py-5 dark:border-white/10">
          <div>
            {title ? <h2 className="font-heading text-2xl font-semibold tracking-tight">{title}</h2> : null}
            {description ? (
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{description}</p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-slate-400 transition hover:bg-black/5 hover:text-slate-900 dark:hover:bg-white/5 dark:hover:text-white"
            aria-label="Close dialog"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="max-h-[calc(100vh-8rem)] overflow-y-auto">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
