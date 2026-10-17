import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import SEO from './SEO';
import Logo from './components/Logo';
import { createUserSession, getUserSession, saveUserSession, sendOtp, verifyOtp } from './lib/auth';

const Login = () => {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'mobile' | 'otp'>('mobile');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (getUserSession()) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleSendOtp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    if (!name.trim()) {
      setError('Please enter your full name before continuing.');
      return;
    }
    const cleaned = mobile.replace(/\D/g, '');
    if (cleaned.length < 10) {
      setError('Enter a valid 10-digit mobile number.');
      return;
    }

    if (!sendOtp(cleaned)) {
      setError('Unable to send OTP. Check your phone number and try again.');
      return;
    }

    setMobile(cleaned);
    setStep('otp');
    setMessage('OTP sent successfully. Use 123456 to sign in.');
  };

  const handleVerify = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    if (!verifyOtp(otp)) {
      setError('Invalid OTP. Enter 123456 to continue.');
      return;
    }

    saveUserSession(createUserSession(mobile, name.trim()));
    navigate('/dashboard');
  };

  return (
    <div className="brand-page min-h-screen text-white">
      <SEO
        title="Learner Login - SARMAK Learning Portal"
        description="Login with your mobile number and OTP to access schedules, training materials and your learning dashboard."
        keywords="SARMAK login, OTP login, learning dashboard"
      />
      <div className="max-w-4xl mx-auto px-6 py-24">
        <header className="mb-6 relative">
          <div className="flex items-center justify-center gap-3">
            <Logo className="h-12 w-auto" />
            <div className="hidden sm:block">
              <span className="text-xl font-bold tracking-wider">SARMAK <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-lime-300 to-emerald-500">Learning Portal</span></span>
              <span className="block text-xs text-[#f5a044] tracking-wide">Learn what industry needs</span>
            </div>
          </div>
          <Link to="/" className="absolute right-0 top-0 btn-outline inline-flex items-center gap-2 hidden sm:inline-flex">
            HOME
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/" className="absolute right-2 top-2 inline-flex items-center justify-center p-2 rounded-md bg-white/5 text-white/80 hover:bg-white/10 sm:hidden">
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </header>
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-2xl backdrop-blur-xl">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <span className="text-gold text-sm uppercase tracking-widest">Learner Login</span>
              <h1 className="mt-2 text-3xl font-black">Sign in with your mobile number</h1>
              <p className="mt-2 text-white/70 max-w-2xl">
                Registered learners can log in via OTP to view training schedule, materials, progress, tools, repository links, and more.
              </p>
            </div>
           {/*} <div>
              <Link to="/" className="btn-outline inline-flex items-center gap-2">
                HOME
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div> */}
          </div>

          {message && (
            <div className="mb-6 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-4 text-emerald-100">
              {message}
            </div>
          )}

          {error && (
            <div className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-red-100">
              {error}
            </div>
          )}

          {step === 'mobile' ? (
            <form onSubmit={handleSendOtp} className="space-y-6">
              <div>
                <label className="block text-sm text-white/70">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="mt-3 w-full rounded-3xl border border-white/10 bg-[#101214] px-4 py-3 text-white outline-none transition focus:border-gold"
                />
              </div>
              <div>
                <label className="block text-sm text-white/70">Mobile Number</label>
                <input
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="mt-3 w-full rounded-3xl border border-white/10 bg-[#101214] px-4 py-3 text-white outline-none transition focus:border-gold"
                />
              </div>
              <button className="btn-primary w-full inline-flex items-center justify-center gap-2" type="submit">
                Send OTP
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerify} className="space-y-6">
              <div>
                <label className="block text-sm text-white/70">One-Time Password</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="123456"
                  className="mt-3 w-full rounded-3xl border border-white/10 bg-[#101214] px-4 py-3 text-white outline-none transition focus:border-gold"
                />
              </div>
              <button className="btn-primary w-full inline-flex items-center justify-center gap-2" type="submit">
                Verify & Login
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setStep('mobile');
                  setOtp('');
                  setMessage('');
                }}
                className="btn-outline w-full"
              >
                Use a different number
              </button>
            </form>
          )}

          <p className="mt-6 text-sm text-white/60">
            This is a demo OTP flow. Enter <strong>123456</strong> to sign in.
          </p>

          <p className="mt-4 text-sm text-white/60">
            Not registered yet? <Link to="/" className="text-gold hover:text-white">Register for free training</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
