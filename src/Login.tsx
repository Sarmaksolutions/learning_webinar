import { useEffect, useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';

import SEO from './SEO';
import Logo from './components/Logo';
import { useAuth } from './lib/AuthContext';
import {
  registerWithEmail,
  loginWithEmail,
  resetPassword,
} from './lib/firebaseAuth';

type Mode = 'login' | 'register';

const Login = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  const [mode, setMode] = useState<Mode>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user?.emailVerified) {
      navigate('/dashboard', { replace: true });
    }
  }, [loading, user, navigate]);

  const validateEmail = (value: string): boolean => {
    const normalizedEmail = value.trim();
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError('');
    setMessage('');

    const normalizedEmail = email.trim();

    if (!validateEmail(normalizedEmail)) {
      setError(
        'Please enter a valid email address, such as student@gmail.com.',
      );
      return;
    }

    if (mode === 'register' && !name.trim()) {
      setError('Please enter your full name.');
      return;
    }

    if (password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }

    setBusy(true);

    try {
      if (mode === 'register') {
        await registerWithEmail(
          name.trim(),
          normalizedEmail,
          password,
        );

        setPassword('');
        setMode('login');

        setMessage(
          'Account created successfully! Check your email and click the verification link before signing in.',
        );
      } else {
        const signedInUser = await loginWithEmail(
          normalizedEmail,
          password,
        );

        if (!signedInUser.emailVerified) {
          setError(
            'Please verify your email address before accessing the dashboard.',
          );
          return;
        }

        navigate('/dashboard', { replace: true });
      }
    } catch (err: unknown) {
      const firebaseError = err as {
        code?: string;
        message?: string;
      };

      const errorCode = firebaseError.code || '';

      const errorMessages: Record<string, string> = {
        'auth/invalid-email':
          'Please enter a valid email address, such as student@gmail.com.',

        'auth/email-already-in-use':
          'This email already has an account. Please sign in instead.',

        'auth/weak-password':
          'Please choose a stronger password with at least 6 characters.',

        'auth/invalid-credential':
          'Incorrect email or password. Please check your details.',

        'auth/user-not-found':
          'No account was found with this email. Please register first.',

        'auth/wrong-password':
          'Incorrect password. Please try again.',

        'auth/too-many-requests':
          'Too many attempts. Please wait before trying again.',

        'auth/network-request-failed':
          'Network error. Check your internet connection and try again.',

        'auth/operation-not-allowed':
          'Email/password sign-in is disabled. Enable it in Firebase Authentication settings.',

        'auth/invalid-api-key':
          'Firebase configuration is invalid. Check your .env.local file.',

        'auth/configuration-not-found':
          'Firebase Authentication is not configured correctly.',
      };

      setError(
        errorMessages[errorCode] ||
          firebaseError.message ||
          'Something went wrong. Please try again.',
      );
    } finally {
      setBusy(false);
    }
  };

  const handleResetPassword = async () => {
    setError('');
    setMessage('');

    const normalizedEmail = email.trim();

    if (!validateEmail(normalizedEmail)) {
      setError(
        'Enter a valid email address before resetting your password.',
      );
      return;
    }

    setBusy(true);

    try {
      await resetPassword(normalizedEmail);

      setMessage(
        'If an eligible account exists, Firebase will send a password-reset email. Please check your inbox and spam folder.',
      );
    } catch (err: unknown) {
      const firebaseError = err as {
        code?: string;
      };

      if (firebaseError.code === 'auth/invalid-email') {
        setError('Please enter a valid email address.');
      } else if (
        firebaseError.code === 'auth/network-request-failed'
      ) {
        setError(
          'Network error. Check your internet connection and try again.',
        );
      } else {
        setError(
          'Could not process your password-reset request. Please try again.',
        );
      }
    } finally {
      setBusy(false);
    }
  };

  const switchMode = () => {
    setMode((currentMode) =>
      currentMode === 'login' ? 'register' : 'login',
    );

    setError('');
    setMessage('');
    setPassword('');
  };

  return (
    <div className="brand-page min-h-screen text-white">
      <SEO
        title="Learner Login - SARMAK Learning Portal"
        description="Sign in or register with your email to access the SARMAK Learning Portal."
        keywords="SARMAK login, email authentication, learning dashboard"
      />

      <div className="max-w-4xl mx-auto px-6 py-24">
        <header className="mb-6 relative">
          <div className="flex items-center justify-center gap-3">
            <Logo className="h-12 w-auto" />

            <div className="hidden sm:block">
              <span className="text-xl font-bold tracking-wider">
                SARMAK{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-lime-300 to-emerald-500">
                  Learning Portal
                </span>
              </span>

              <span className="block text-xs text-[#f5a044] tracking-wide">
                Learn what industry needs
              </span>
            </div>
          </div>

          <Link
            to="/"
            className="absolute right-0 top-0 btn-outline items-center gap-2 hidden sm:inline-flex"
          >
            HOME <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/"
            aria-label="Back to home"
            className="absolute right-2 top-2 inline-flex items-center justify-center p-2 rounded-md bg-white/5 text-white/80 hover:bg-white/10 sm:hidden"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </header>

        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-2xl backdrop-blur-xl">
          <div className="mb-6">
            <span className="text-gold text-sm uppercase tracking-widest">
              Learner Login
            </span>

            <h1 className="mt-2 text-3xl font-black">
              {mode === 'login'
                ? 'Sign in with your email'
                : 'Create your learner account'}
            </h1>

            <p className="mt-2 text-white/70 max-w-2xl">
              {mode === 'login'
                ? 'Use your registered email and password to access your training schedule, materials, progress, and tools.'
                : 'Register with your email address to create your SARMAK Learning Portal account.'}
            </p>
          </div>

          {message && (
            <div
              role="status"
              className="mb-6 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-4 text-emerald-100"
            >
              {message}
            </div>
          )}

          {error && (
            <div
              role="alert"
              className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-red-100"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {mode === 'register' && (
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm text-white/70"
                >
                  Full Name
                </label>

                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                  disabled={busy}
                  className="mt-3 w-full rounded-3xl border border-white/10 bg-[#101214] px-4 py-3 text-white outline-none transition focus:border-gold"
                />
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm text-white/70"
              >
                Email Address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setEmail((current) => current.trim())}
                placeholder="student@example.com"
                required
                disabled={busy}
                autoCapitalize="none"
                spellCheck={false}
                className="mt-3 w-full rounded-3xl border border-white/10 bg-[#101214] px-4 py-3 text-white outline-none transition focus:border-gold"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm text-white/70"
              >
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                autoComplete={
                  mode === 'register'
                    ? 'new-password'
                    : 'current-password'
                }
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={
                  mode === 'register'
                    ? 'Create a password'
                    : 'Enter your password'
                }
                minLength={6}
                required
                disabled={busy}
                className="mt-3 w-full rounded-3xl border border-white/10 bg-[#101214] px-4 py-3 text-white outline-none transition focus:border-gold"
              />
            </div>

            <button
              className="btn-primary w-full inline-flex items-center justify-center gap-2 disabled:opacity-50"
              type="submit"
              disabled={busy || loading}
            >
              {busy
                ? 'Please wait...'
                : mode === 'login'
                  ? 'Sign In'
                  : 'Create Account'}

              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {mode === 'login' && (
            <button
              type="button"
              disabled={busy}
              onClick={handleResetPassword}
              className="mt-5 text-sm text-gold hover:text-white disabled:opacity-50"
            >
              Forgot password?
            </button>
          )}

          <p className="mt-6 text-sm text-white/60">
            {mode === 'login'
              ? "Don't have an account? "
              : 'Already registered? '}

            <button
              type="button"
              disabled={busy}
              onClick={switchMode}
              className="text-gold hover:text-white underline disabled:opacity-50"
            >
              {mode === 'login' ? 'Register' : 'Sign in'}
            </button>
          </p>

          <p className="mt-4 text-sm text-white/60">
            <Link to="/" className="text-gold hover:text-white">
              Back to home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;