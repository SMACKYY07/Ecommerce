import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import { consumeReturnTo, getReturnTo } from '../utils/storage';
import { validateSignup } from '../utils/validation';

export function SignupPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, signup } = useAuth();
  const { pushToast } = useToast();
  const [values, setValues] = useState({ name: '', email: '', password: '' });
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
    const nextErrors = validateSignup(values);

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    setSubmitting(true);

    window.setTimeout(() => {
      signup(values);
      pushToast({
        title: 'Account created',
        description: 'You can now proceed through the demo checkout flow.',
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
          <p className="checkout-section-title" style={{color: 'rgba(255,255,255,0.5)'}}>Membership</p>
          <h1 className="details-title" style={{color: 'white', marginTop: 'var(--s-8)', fontSize: '3.5rem'}}>
            Designed for <br /><span style={{color: 'var(--primary)', fontStyle: 'italic'}}>considered</span> curation.
          </h1>
          <p style={{marginTop: 'var(--s-8)', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, maxWidth: '320px'}}>
            Join a community of enthusiasts who value architectural precision and quiet materials in the kitchen.
          </p>
        </div>
        <div className="auth-sidebar-footer">
          <p style={{fontSize: '0.625rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)', fontStyle: 'italic'}}>Exclusive Access</p>
          <p style={{marginTop: 'var(--s-4)', fontSize: '1.125rem', fontWeight: 500}}>Early drops, studio stories, and seamless multi-device cart syncing.</p>
        </div>
      </div>
      
      <div className="auth-content">
        <div className="auth-form-container">
          <p className="checkout-section-title">Get Started</p>
          <h2 style={{marginTop: 'var(--s-6)', fontSize: '2.5rem', fontWeight: 800, color: 'var(--fg)'}}>Create Account</h2>
          <p style={{marginTop: 'var(--s-4)', fontSize: '0.875rem', color: 'var(--muted)'}}>
            Enter your details below to join the Kitch Me Collective.
          </p>

          <form onSubmit={handleSubmit} style={{marginTop: 'var(--s-12)', display: 'grid', gap: 'var(--s-6)'}}>
            <Input
              label="Full Name"
              value={values.name}
              onChange={(event) => updateField('name', event.target.value)}
              error={errors.name}
              placeholder="E.g. Julian Carter"
            />
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
              {submitting ? 'Creating' : 'Sign Up'}
            </Button>
          </form>

          <p style={{marginTop: 'var(--s-8)', textAlign: 'center', fontSize: '0.875rem', color: 'var(--muted)'}}>
            Already a member?{' '}
            <Link to={`/login${searchParams.toString() ? `?${searchParams.toString()}` : ''}`} style={{fontWeight: 700, color: 'var(--fg)', textDecoration: 'none'}}>
              Sign In
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
