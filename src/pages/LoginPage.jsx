import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import { consumeReturnTo, getReturnTo } from '../utils/storage';
import { validateLogin } from '../utils/validation';

export function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, login } = useAuth();
  const { pushToast } = useToast();
  const [values, setValues] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const returnTo = searchParams.get('returnTo') || getReturnTo() || '/';

  if (user) {
    return <Navigate to={returnTo} replace />;
  }

  function updateField(name, value) {
    setValues((currentValues) => ({ ...currentValues, [name]: value }));
    setErrors((currentErrors) => ({ ...currentErrors, [name]: '' }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validateLogin(values);

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    setSubmitting(true);

    window.setTimeout(() => {
      login(values);
      pushToast({
        title: 'Welcome back',
        description: 'Your demo account is ready and checkout is unlocked.',
        tone: 'success',
      });
      setSubmitting(false);
      navigate(consumeReturnTo(returnTo));
    }, 350);
  }

  return (
    <div className="grid w-full max-w-6xl overflow-hidden rounded-[2.5rem] border border-black/5 bg-white/80 shadow-[0_32px_100px_rgba(15,23,42,0.12)] dark:border-white/10 dark:bg-slate-950/75 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="hidden flex-col justify-between bg-slate-950 p-10 text-white lg:flex">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-white/50">Aurel Kitchen</p>
          <h1 className="mt-6 font-heading text-5xl font-semibold tracking-tight">
            Sign in to continue from cart to checkout.
          </h1>
          <p className="mt-5 max-w-md text-sm leading-7 text-white/70">
            Browsing stays public. Authentication is only used to preserve the premium checkout
            flow and demonstrate routed access control.
          </p>
        </div>
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-white/60">Demo credentials</p>
          <p className="mt-3 font-semibold">Use any valid email and an 8+ character password.</p>
        </div>
      </div>
      <div className="p-6 sm:p-8 lg:p-10">
        <p className="text-xs uppercase tracking-[0.28em] text-emerald-600 dark:text-emerald-300">
          Login
        </p>
        <h2 className="mt-4 font-heading text-4xl font-semibold tracking-tight">Welcome back</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
          Sign in to access checkout and keep your saved selections moving through the purchase flow.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
          <Input
            label="Email"
            type="email"
            value={values.email}
            onChange={(event) => updateField('email', event.target.value)}
            error={errors.email}
            placeholder="name@example.com"
          />
          <Input
            label="Password"
            type="password"
            value={values.password}
            onChange={(event) => updateField('password', event.target.value)}
            error={errors.password}
            placeholder="At least 8 characters"
          />
          <Button type="submit" loading={submitting} className="mt-2 w-full">
            {submitting ? 'Signing in' : 'Sign in'}
          </Button>
        </form>

        <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
          New here?{' '}
          <Link to={`/signup${searchParams.toString() ? `?${searchParams.toString()}` : ''}`} className="font-medium text-emerald-600 dark:text-emerald-300">
            Create an account
          </Link>
        </p>
        <Link to="/" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-950 dark:text-slate-300 dark:hover:text-white">
          Back to storefront
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
