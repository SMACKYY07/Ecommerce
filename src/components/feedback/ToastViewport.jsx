import { CheckCircle2, CircleAlert, Info, X } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

const TONE_STYLES = {
  success: {
    icon: CheckCircle2,
  },
  danger: {
    icon: CircleAlert,
  },
  neutral: {
    icon: Info,
  },
};

export function ToastViewport() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="toast-viewport">
      {toasts.map((toast) => {
        const Icon = (TONE_STYLES[toast.tone] || TONE_STYLES.neutral).icon;

        return (
          <div
            key={toast.id}
            className={`toast-item toast-${toast.tone || 'info'}`}
          >
            <div className="toast-icon-wrapper">
              <Icon size={16} />
            </div>
            <div style={{flex: 1}}>
              <p style={{fontSize: '0.875rem', fontWeight: 600}}>{toast.title}</p>
              {toast.description && (
                <p style={{marginTop: 'var(--s-1)', fontSize: '0.875rem', color: 'var(--muted)'}}>
                  {toast.description}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="btn-icon"
              style={{padding: 'var(--s-1)', color: 'var(--muted)'}}
              aria-label="Dismiss notification"
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
