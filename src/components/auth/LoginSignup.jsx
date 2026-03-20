import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function LoginSignup() {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const { login, signup } = useAuth();

  const onChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = (event) => {
    event.preventDefault();
    setError('');
    try {
      if (mode === 'login') {
        login({ email: form.email.trim(), password: form.password });
      } else {
        signup({ name: form.name.trim(), email: form.email.trim(), password: form.password });
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-950 px-4">
      <div className="w-full max-w-md rounded-3xl border border-white/20 bg-white/10 p-7 backdrop-blur-xl shadow-2xl">
        <h1 className="text-3xl font-bold text-white text-center">{mode === 'login' ? 'Welcome back!' : 'Create your account'}</h1>
        <p className="text-sm text-white/80 mt-2 text-center">
          {mode === 'login'
            ? 'Login to continue to KITCH ME store'
            : 'Sign up and discover kitchen essentials'}
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-sm font-medium text-white/90">Name</label>
              <input
                name="name"
                value={form.name}
                onChange={onChange}
                className="mt-1 w-full rounded-xl border border-white/30 bg-white/10 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-white/90">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              className="mt-1 w-full rounded-xl border border-white/30 bg-white/10 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/90">Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={onChange}
              className="mt-1 w-full rounded-xl border border-white/30 bg-white/10 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          {error && <p className="text-center text-sm text-red-300">{error}</p>}

          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-2 font-semibold text-white hover:opacity-95 transition"
          >
            {mode === 'login' ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-white/80">
          {mode === 'login' ? (
            <>
              New here?{' '}
              <button onClick={() => setMode('signup')} className="font-semibold text-cyan-300 hover:text-white">
                Create an account
              </button>
            </>
          ) : (
            <>
              Already registered?{' '}
              <button onClick={() => setMode('login')} className="font-semibold text-cyan-300 hover:text-white">
                Sign in
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
