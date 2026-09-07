import { FormEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './components/Logo';
import SEO from './components/SEO';

const Webinar = () => {
  const [phoneError, setPhoneError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (document.querySelector('script[src="https://sdk.cashfree.com/js/v3/cashfree.js"]')) return;

    const script = document.createElement('script');
    script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const enteredPhone = String(form.get('phone') || '').trim();
    const phone = enteredPhone.replace(/\D/g, '').replace(/^91(?=[6-9]\d{9}$)/, '');

    if (phone.length !== 10 || !/^[6-9]/.test(phone)) {
      setPhoneError('Please enter a valid 10-digit Indian WhatsApp number.');
      return;
    }

    setPhoneError('');
    setIsProcessing(true);
    sessionStorage.setItem('webinar_registration', JSON.stringify({
      name: form.get('name'),
      email: form.get('email'),
      phone,
    }));

    try {
      const response = await fetch('/.netlify/functions/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: String(form.get('name') || '').trim(),
          email: String(form.get('email') || '').trim(),
          phone,
          course: 'webinar',
        }),
      });
      const responseText = await response.text();
      let result: { payment_session_id?: string; mode?: string; error?: string };
      try {
        result = JSON.parse(responseText);
      } catch {
        throw new Error(`Payment service returned an invalid response (${response.status}). Start the app with Netlify Dev.`);
      }
      if (!response.ok || !result.payment_session_id) {
        throw new Error(result.error || 'Unable to create Cashfree payment.');
      }

      const cashfree = (window as typeof window & {
        Cashfree?: (options: { mode: 'sandbox' | 'production' }) => {
          checkout: (options: { paymentSessionId: string; redirectTarget: '_self' }) => Promise<void>;
        };
      }).Cashfree?.({ mode: result.mode === 'production' ? 'production' : 'sandbox' });

      if (!cashfree) {
        throw new Error('Cashfree checkout is still loading. Please try again.');
      }

      await cashfree.checkout({
        paymentSessionId: result.payment_session_id,
        redirectTarget: '_self',
      });
    } catch (error) {
      setPhoneError(error instanceof Error ? error.message : 'Unable to start payment.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1c1d1b] to-[#0d0e10] text-white overflow-hidden">
      <SEO title="SARMAK Webinar Workshop" description="Register for the SARMAK From Worried to Hired online workshop." keywords="SARMAK webinar, online workshop, career workshop" />

      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1c1d1b]/95 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <Logo className="h-12 w-auto transition-transform duration-300 hover:scale-105" />
            <div className="hidden sm:block">
              <span className="text-xl font-bold tracking-wider">SARMAK <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-lime-300 to-emerald-500">Learning Portal</span></span>
              <span className="block text-xs text-gold font-mono tracking-widest">INNOVATE. TRANSFORM. EXCEL.</span>
            </div>
          </Link>
          <Link to="/login" className="btn-outline text-sm inline-flex items-center gap-2">Login</Link>
        </div>
      </nav>

      <main className="webinar-page pt-28 pb-20">
        <div className="webinar-shell">
          <div className="webinar-content webinar-reveal">
          <section className="webinar-copy">
            <p className="webinar-eyebrow">From Worried to Hired</p>
            <h2>WORKSHOP</h2>
            <p className="webinar-description">Build 5 in 1 Smart Journey. Save Time. Scale Business.</p>
            <div className="webinar-gold-line" />
            <h3>REGISTER NOW</h3>
            <p className="webinar-limited">Limited Seats Available!</p>

            <form onSubmit={handleSubmit} className="webinar-form">
              <label htmlFor="webinar-name">Name <span>*</span></label>
              <input id="webinar-name" name="name" type="text" placeholder="Enter your full name" required />

              <label htmlFor="webinar-email">Email <span>*</span></label>
              <input id="webinar-email" name="email" type="email" placeholder="Enter your email address" required />

              <label htmlFor="webinar-phone">WhatsApp Number <span>*</span></label>
              <input
                id="webinar-phone"
                name="phone"
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                pattern="[6-9][0-9]{9}"
                maxLength={14}
                placeholder="9876543210"
                required
              />
              {phoneError && <p className="webinar-phone-error">{phoneError}</p>}

              <button type="submit" disabled={isProcessing} className="webinar-pay-button disabled:opacity-60 disabled:cursor-not-allowed">
                {isProcessing ? 'OPENING CASHFREE...' : 'REGISTER NOW - INR 9'}
              </button>
            </form>

            <p className="webinar-secure">Secure Payment &nbsp; | &nbsp; Instant Confirmation</p>
            <div className="webinar-benefits">
              <div><strong>5000+</strong><span>Professionals Trained</span></div>
              <div><strong>★</strong><span>Expert Industry Trainers</span></div>
              <div><strong>♧</strong><span>Lifetime Community Support</span></div>
            </div>
          </section>

          <section className="webinar-poster-section webinar-float">
            <div className="webinar-poster-card webinar-shimmer">
              <img src="/webinar/poster.jpg" alt="SARMAK workshop poster" />
            </div>
          </section>
          </div>
        </div>
      </main>

      <footer className="bg-black/50 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <a href="https://learn.sarmak.in" className="flex items-center gap-3 mb-6 inline-flex">
                <Logo className="h-14 w-auto" />
                <div><span className="text-2xl font-bold text-white tracking-wider block">SARMAK</span><span className="text-xs text-gold font-mono tracking-widest">INNOVATE. TRANSFORM. EXCEL.</span></div>
              </a>
              <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-sm">SARMAK is a group of technology enthusiasts driven by passion and commitment to revolutionize businesses through innovative IT solutions and AI-powered services.</p>
              <div className="space-y-3 text-sm text-white/60">
                <a href="mailto:info@sarmak.in" className="flex items-center gap-3 hover:text-gold transition-colors"><span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gold/10 text-gold">@</span>info@sarmak.in</a>
                <a href="tel:+919764000745" className="flex items-center gap-3 hover:text-gold transition-colors"><span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gold/10 text-gold">📞</span>+91 97640 00745</a>
                <div className="flex items-start gap-3 text-white/60"><span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gold/10 text-gold">📍</span>Joyville, Meridian-1302, Hinjewadi, Pune MH 411057, India</div>
              </div>
            </div>
            <div><h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">Quick Links</h4><ul className="space-y-3 text-sm"><li><a href="https://sarmak.in" className="text-white/60 hover:text-gold transition-colors">Home</a></li><li><a href="https://sarmak.in/about" className="text-white/60 hover:text-gold transition-colors">About Us</a></li><li><a href="https://sarmak.in/services/learning-with-sarmak" className="text-white/60 hover:text-gold transition-colors">Learning with SARMAK</a></li><li><a href="https://sarmak.in/contact" className="text-white/60 hover:text-gold transition-colors">Contact</a></li></ul></div>
            <div><h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">Services</h4><ul className="space-y-3 text-sm"><li><a href="https://sarmak.in/services/ai" className="text-white/60 hover:text-gold transition-colors">AI Solutions</a></li><li><a href="https://sarmak.in/services/cloud" className="text-white/60 hover:text-gold transition-colors">Cloud Services</a></li><li><a href="https://sarmak.in/services/database" className="text-white/60 hover:text-gold transition-colors">Database Services</a></li><li><a href="https://sarmak.in/services/devops" className="text-white/60 hover:text-gold transition-colors">DevOps</a></li></ul></div>
            <div><h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">Resources</h4><ul className="space-y-3 text-sm"><li><a href="https://sarmak.in/blog" className="text-white/60 hover:text-gold transition-colors">Blog</a></li><li><a href="https://sarmak.in/resources" className="text-white/60 hover:text-gold transition-colors">Resources</a></li><li><a href="https://sarmak.in/faq" className="text-white/60 hover:text-gold transition-colors">FAQ</a></li><li><a href="https://sarmak.in/service-plans" className="text-white/60 hover:text-gold transition-colors">Service Plans</a></li></ul></div>
          </div>
          <div className="border-t border-white/5 pt-6 mt-12"><div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40"><p>© {new Date().getFullYear()} SARMAK. All rights reserved.</p><div className="flex flex-wrap items-center gap-6"><a href="https://sarmak.in/privacy-policy" className="hover:text-gold transition-colors">Privacy Policy</a><a href="https://sarmak.in/terms-of-service" className="hover:text-gold transition-colors">Terms of Service</a></div><div className="flex items-center gap-3"><a href="https://www.linkedin.com/company/sarmak-solutions" target="_blank" rel="noreferrer" className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-gold hover:text-[#1c1d1b] transition-all duration-300">in</a><a href="https://x.com/SarmakSolutions" target="_blank" rel="noreferrer" className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-gold hover:text-[#1c1d1b] transition-all duration-300">x</a><a href="https://www.instagram.com/sarmaksolutions/" target="_blank" rel="noreferrer" className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-gold hover:text-[#1c1d1b] transition-all duration-300">ig</a></div></div></div>
        </div>
      </footer>
      </div>
  );
};

export default Webinar; 