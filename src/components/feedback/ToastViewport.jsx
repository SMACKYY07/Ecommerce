import { CheckCircle2, CircleAlert, Info, X } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import { cn } from '../../utils/cn';

const TONE_STYLES = {
  success: {
    icon: CheckCircle2,
    className:
      'border-emerald-400/40 bg-white/90 text-slate-950 dark:border-emerald-500/40 dark:bg-slate-950/90 dark:text-white',
  },
  danger: {
    icon: CircleAlert,
    className:
      'border-rose-400/40 bg-white/90 text-slate-950 dark:border-rose-500/40 dark:bg-slate-950/90 dark:text-white',
  },
  neutral: {
    icon: Info,
    className:
      'border-black/10 bg-white/90 text-slate-950 dark:border-white/10 dark:bg-slate-950/90 dark:text-white',
  },
};

export function ToastViewport() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-[120] mx-auto flex max-w-7xl flex-col items-end gap-3 px-4 sm:px-6 lg:px-8">
      {toasts.map((toast) => {
        const toneStyle = TONE_STYLES[toast.tone] || TONE_STYLES.neutral;
        const Icon = toneStyle.icon;

        return (
          <div
            key={toast.id}
            className={cn(
              'pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-2xl border px-4 py-3 shadow-[0_24px_80px_rgba(15,23,42,0.16)] backdrop-blur-xl toast-enter',
              toneStyle.className,
            )}
          >
            <div className="mt-0.5 rounded-full bg-emerald-500/10 p-2 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300">
              <Icon className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">{toast.title}</p>
              {toast.description ? (
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{toast.description}</p>
              ) : null}
            </div>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="rounded-full p-1 text-slate-400 transition hover:bg-black/5 hover:text-slate-700 dark:hover:bg-white/5 dark:hover:text-white"
              aria-label="Dismiss notification"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
