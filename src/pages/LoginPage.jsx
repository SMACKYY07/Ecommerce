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
    <div className="auth-container">
      <div className="auth-sidebar">
        <div className="auth-sidebar-gradient" />
        <div className="auth-sidebar-content">
          <p className="checkout-section-title" style={{color: 'rgba(255,255,255,0.5)'}}>Welcome Back</p>
          <h1 className="details-title" style={{color: 'white', marginTop: 'var(--s-8)', fontSize: '3.5rem'}}>
            Continue your <br /><span style={{color: 'var(--primary)', fontStyle: 'italic'}}>culinary</span> journey.
          </h1>
          <p style={{marginTop: 'var(--s-8)', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, maxWidth: '320px'}}>
            Sign in to access your saved collections and a streamlined checkout experience.
          </p>
        </div>
        <div className="auth-sidebar-footer">
          <p style={{fontSize: '0.625rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)', fontStyle: 'italic'}}>Demo Access</p>
          <p style={{marginTop: 'var(--s-4)', fontSize: '1.125rem', fontWeight: 500}}>Authentication is simulated to demonstrate the premium checkout flow.</p>
        </div>
      </div>
      
      <div className="auth-content">
        <div className="auth-form-container">
          <p className="checkout-section-title">Login</p>
          <h2 style={{marginTop: 'var(--s-6)', fontSize: '2.5rem', fontWeight: 800, color: 'var(--fg)'}}>Sign In</h2>
          <p style={{marginTop: 'var(--s-4)', fontSize: '0.875rem', color: 'var(--muted)'}}>
            Access your Kitch Me account.
          </p>

          <form onSubmit={handleSubmit} style={{marginTop: 'var(--s-12)', display: 'grid', gap: 'var(--s-6)'}}>
            <Input
              label="Email Address"
              type="email"
              value={values.email}
              onChange={(event) => updateField('email', event.target.value)}
              error={errors.email}
              placeholder="julian@studio.com"
            />
            <Input
              label="Password"
              type="password"
              value={values.password}
              onChange={(event) => updateField('password', event.target.value)}
              error={errors.password}
              placeholder="••••••••"
            />
            <Button type="submit" variant="primary" loading={submitting} style={{width: '100%', marginTop: 'var(--s-4)', height: '3.5rem'}}>
              {submitting ? 'Verifying' : 'Sign In'}
            </Button>
          </form>

          <p style={{marginTop: 'var(--s-8)', textAlign: 'center', fontSize: '0.875rem', color: 'var(--muted)'}}>
            Don't have an account?{' '}
            <Link to={`/signup${searchParams.toString() ? `?${searchParams.toString()}` : ''}`} style={{fontWeight: 700, color: 'var(--fg)', textDecoration: 'none'}}>
              Join Now
            </Link>
          </p>
          
          <div style={{marginTop: 'var(--s-12)', display: 'flex', justifyContent: 'center'}}>
            <Link to="/" style={{display: 'inline-flex', alignItems: 'center', gap: 'var(--s-2)', fontSize: '0.625rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--muted)', textDecoration: 'none'}}>
              Back to Storefront
              <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
