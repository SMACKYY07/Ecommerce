import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

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
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`modal-content ${className}`}
        style={{maxWidth: sizeStyles[size] || '600px'}}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="modal-close"
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        <div style={{padding: 'var(--s-6) var(--s-8)', borderBottom: '1px solid var(--border)'}}>
          {title && <h2 className="details-title" style={{fontSize: '1.5rem', marginBottom: 'var(--s-1)'}}>{title}</h2>}
          {description && <p style={{fontSize: '0.875rem', color: 'var(--muted)'}}>{description}</p>}
        </div>

        <div style={{padding: 'var(--s-8)', maxHeight: 'calc(90vh - 100px)', overflowY: 'auto'}}>
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
}
