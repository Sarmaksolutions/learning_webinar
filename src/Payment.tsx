import { useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, CreditCard, CheckCircle } from 'lucide-react';
import Logo from './components/Logo';
import { FormEvent, useEffect, useState } from 'react';

export default function Payment() {
  const [searchParams] = useSearchParams();
  const courseType = searchParams.get('course');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [cashfreeReady, setCashfreeReady] = useState(false);

  useEffect(() => {
    const existingScript = document.querySelector('script[src="https://sdk.cashfree.com/js/v3/cashfree.js"]');
    if (existingScript && (window as typeof window & { Cashfree?: unknown }).Cashfree) {
      setCashfreeReady(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
    script.async = true;
    script.onload = () => setCashfreeReady(true);
    script.onerror = () => setPaymentError('Cashfree could not load. Check your internet connection and refresh the page.');
    document.body.appendChild(script);
  }, []);

  const courseDetails = courseType === 'college'
    ? { name: 'College Students Program (4 Weeks)', price: '₹499', features: ['Full 4-Week Curriculum Access', 'Hands-on Lab Environments', 'Mentorship & Community Access', 'Completion Certificate'] }
    : courseType === 'advance'
      ? { name: 'Advance Course: AI in IT Infrastructure (6 Hours)', price: '₹1,999', features: ['6-Hour Intensive Video & Live Sessions', 'Enterprise Architecture Blueprints', 'AI Tooling Sandbox Access', 'Advanced Completion Certificate'] }
      : courseType === 'webinar'
        ? { name: 'From Worried to Hired Workshop', price: '₹9', features: ['Live online workshop access', 'Expert industry trainers', 'Lifetime community support', 'Instant registration confirmation'] }
      : null;

  const handlePayment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);
    setPaymentError('');

    if (!cashfreeReady) {
      setPaymentError('Payment gateway is still loading. Please try again.');
      setIsProcessing(false);
      return;
    }

    const form = new FormData(e.currentTarget);
    try {
      const response = await fetch('/.netlify/functions/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: String(form.get('name') || '').trim(),
          email: String(form.get('email') || '').trim(),
          phone: String(form.get('phone') || '').trim(),
          course: courseType,
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.payment_session_id) {
        throw new Error(result.error || 'Unable to start Cashfree checkout.');
      }

      const cashfree = (window as typeof window & {
        Cashfree?: (options: { mode: string }) => { checkout: (options: { paymentSessionId: string, redirectTarget: string }) => Promise<void> };
      }).Cashfree?.({ mode: result.mode === 'production' ? 'production' : 'sandbox' });
      if (!cashfree) throw new Error('Cashfree checkout is unavailable. Refresh the page and try again.');
      await cashfree.checkout({ paymentSessionId: result.payment_session_id, redirectTarget: '_self' });
    } catch (error) {
      setPaymentError(error instanceof Error ? error.message : 'Unable to start Cashfree payment.');
      setIsProcessing(false);
    }
  };

  if (!courseDetails) {
    return (
      <div className="min-h-screen bg-[#1c1d1b] text-white flex items-center justify-center p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Invalid Course Selection</h2>
          <Link to="/" className="btn-primary inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1c1d1b] to-[#0d0e10] text-white">
      <nav className="border-b border-white/10 bg-[#1c1d1b]/95 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <Logo className="h-10 w-auto transition-transform duration-300 group-hover:scale-105" />
            <span className="text-lg font-bold tracking-wider">SARMAK <span className="text-gold">Secure Checkout</span></span>
          </Link>
          <Link to="/" className="text-sm text-white/70 hover:text-gold transition-colors flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Courses
          </Link>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12">
          
          {/* Payment Form */}
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <CreditCard className="w-6 h-6 text-emerald-400" /> Payment Details
            </h2>
            <form onSubmit={handlePayment} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-white/70 mb-2">Full Name</label>
                    <input required name="name" type="text" className="w-full rounded-xl border border-white/10 bg-[#111314] px-4 py-3 text-white outline-none focus:border-emerald-400 transition" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm text-white/70 mb-2">Email Address</label>
                    <input required name="email" type="email" className="w-full rounded-xl border border-white/10 bg-[#111314] px-4 py-3 text-white outline-none focus:border-emerald-400 transition" placeholder="john@example.com" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm text-white/70 mb-2">WhatsApp Number</label>
                <input required name="phone" type="tel" inputMode="numeric" className="w-full rounded-xl border border-white/10 bg-[#111314] px-4 py-3 text-white outline-none focus:border-emerald-400 transition" placeholder="9876543210" />
              </div>

              <button 
                type="submit" 
                disabled={isProcessing}
                className="w-full btn-primary text-lg inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
              >
                {isProcessing ? 'Processing...' : `Pay ${courseDetails.price} Securely`}
                <ShieldCheck className="w-5 h-5" />
              </button>

              {paymentError && <p className="text-sm text-red-300 text-center">{paymentError}</p>}
              
              <p className="text-xs text-center text-white/40 flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4" /> 256-bit SSL Encrypted & Secure Payment
              </p>
            </form>
          </div>

          {/* Order Summary */}
          <div className="rounded-3xl border border-gold/20 bg-gold/5 backdrop-blur-xl p-8 h-fit">
            <h3 className="text-xl font-bold mb-6 text-gold">Order Summary</h3>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-start">
                <span className="text-white/80 font-semibold">{courseDetails.name}</span>
                <span className="text-white font-bold">{courseDetails.price}</span>
              </div>
              <div className="border-t border-white/10 pt-4 space-y-3">
                {courseDetails.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-white/70">
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t border-white/10 pt-4 flex justify-between items-center">
              <span className="text-lg font-bold">Total</span>
              <span className="text-2xl font-black text-gold">{courseDetails.price}</span>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}