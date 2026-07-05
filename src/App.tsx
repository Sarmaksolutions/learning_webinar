import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Star, Users, Zap, BookOpen, Trophy, CheckCircle } from 'lucide-react';
import Logo from './components/Logo';

export default function LearningLanding() {
  const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();

  const form = e.currentTarget;
  const formData = new FormData(form);

  try {
    await fetch(
      "https://script.google.com/macros/s/AKfycbz2LF4UPeqobcLPaKZNtj6m4SXvR2L5Ey2uYFtmCwrwlvBuashAwQGB4yKf14pz639v/exec",
      {
        method: "POST",
        mode: "no-cors",
        body: formData,
      }
    );

    alert("Registration submitted successfully!");
    form.reset();
  } catch (error) {
    console.error(error);
    alert("Failed to submit registration.");
  }
};
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1c1d1b] to-[#0d0e10] text-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1c1d1b]/95 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo className="h-12 w-auto transition-transform duration-300 hover:scale-105" />
            <div className="hidden sm:block">
              <span className="text-xl font-bold tracking-wider">SARMAK <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-lime-300 to-emerald-500">Learning Portal</span></span>
              <span className="block text-xs text-gold font-mono tracking-widest">INNOVATE. TRANSFORM. EXCEL.</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://sarmak.in" className="text-sm text-white/80 hover:text-gold transition-colors">
              Back to SARMAK →
            </a>
            <Link to="/course-details" className="text-sm text-white/80 hover:text-gold transition-colors">
              Course Details
            </Link>
            <Link to="/profile" className="text-sm text-white/80 hover:text-gold transition-colors">
              Profile
            </Link>
            <a href="/login" className="btn-outline text-sm inline-flex items-center gap-2">
              Login
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section with Blinking Offer */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 bg-emerald-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-64 h-64 bg-green-500 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          {/* Blinking Limited Offer Banner */}
          <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold blink">
            <Sparkles className="w-5 h-5 text-[#1c1d1b]" />
            <span className="font-bold text-[#1c1d1b] text-sm uppercase tracking-widest">🎯 Limited Time Offer — Only 30 Seats!</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            Launch Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-lime-300 to-emerald-500">IT Career</span> in 4 Weeks
          </h1>

          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-10">
            Free training. Expert mentorship. Real projects. Ready for industry in just 28 days.
          </p>

          {/* Massive CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a
              href="#register"
              className="btn-primary text-lg inline-flex items-center gap-2"
            >
              <span className="blink">🚀 Register Now (Free)</span>
              <ArrowRight className="w-5 h-5" />
            </a>
            <Link
              to="/course-details"
              className="btn-outline text-lg inline-flex items-center gap-2"
            >
              Learn More
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/login"
              className="btn-outline text-lg inline-flex items-center gap-2"
            >
              Learner Login
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto">
            {[
              { label: 'Students', value: 'Limited Seats' },
              { label: 'Free', value: '₹0' },
              { label: 'Days', value: '28' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl bg-white/10 backdrop-blur p-4">
                <div className="text-2xl font-bold text-emerald-400">{stat.value}</div>
                <div className="text-xs text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form Section */}
      <section id="register" className="py-20 bg-black/60 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
              <div className="space-y-6">
                <span className="text-gold text-sm font-medium uppercase tracking-widest">Secure your seat</span>
                <h2 className="text-4xl md:text-5xl font-black">Register for the free SARMAK training</h2>
                <p className="text-white/70 text-lg max-w-xl">
Submit your details and we'll reserve your seat. Your registration will be securely recorded and our team will contact you with the next steps.
                </p>
                <ul className="grid gap-3 text-white/80">
                  {['Free training for fresh graduates', 'Limited 30 seats only', 'Resume review + mentor matching', 'Industry-ready curriculum'].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 text-emerald-400">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <form
  onSubmit={handleSubmit}
  className="space-y-5 bg-[#0f1113] rounded-3xl border border-white/10 p-8"
>


                <div>
                  <label className="text-sm font-medium text-white/70">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Enter your full name"
                    className="mt-2 w-full rounded-3xl border border-white/10 bg-[#111314] px-4 py-3 text-white outline-none transition focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-white/70">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="you@example.com"
                    className="mt-2 w-full rounded-3xl border border-white/10 bg-[#111314] px-4 py-3 text-white outline-none transition focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-white/70">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+91 98765 43210"
                    className="mt-2 w-full rounded-3xl border border-white/10 bg-[#111314] px-4 py-3 text-white outline-none transition focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-white/70">College / University</label>
                  <input
                    type="text"
                    name="college"
                    placeholder="Your college or university"
                    className="mt-2 w-full rounded-3xl border border-white/10 bg-[#111314] px-4 py-3 text-white outline-none transition focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-white/70">Primary Interest</label>
                  <select
                    name="interest"
                    className="mt-2 w-full rounded-3xl border border-white/10 bg-[#111314] px-4 py-3 text-white outline-none transition focus:border-emerald-400"
                  >
                    <option value="">Choose one</option>
                    <option value="AI & Agents">AI & Agents</option>
                    <option value="DevOps & Containers">DevOps & Containers</option>
                    <option value="Databases & SQL">Databases & SQL</option>
                    <option value="Linux & Infrastructure">Linux & Infrastructure</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full inline-flex items-center justify-center gap-2 text-lg"
                >
                  Submit Registration
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Blinking Offers Section */}
      <section className="py-16 bg-black/50 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: '💎 Early Bird Bonus',
                desc: 'Free resume review + LinkedIn optimization',
                blink: true,
              },
              {
                title: '🎁  Rewards',
                desc: 'Get aditonal surprises during training for your IT journey',
                blink: true,
              },
              {
                title: '🏆 Premium Mentorship',
                desc: 'Mentors with more than 12 years of hands on experience in the industry',
                blink: true,
              },
            ].map((offer, idx) => (
              <div
                key={idx}
                className={`glass-card p-6 ${offer.blink ? 'blink' : ''}`}
              >
                <div className="text-3xl mb-3">{offer.title.split(' ')[0]}</div>
                <h3 className="text-lg font-bold mb-2">{offer.title}</h3>
                <p className="text-white/70 text-sm">{offer.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Modules */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">What You'll Learn</h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Get ready to join your IT journey and crack interviews by gaining industry level knowledge in all fields . 
              Master industry-critical skills through hands-on labs and real projects ,
              Be the first choice by your choice .
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                week: 'Week 1',
                title: 'Databases & SQL',
                icon: <BookOpen className="w-8 h-8" />,
                items: ['Relational DB Design', 'SQL Queries', 'NoSQL Intro', 'Hands-on Project'],
              },
              {
                week: 'Week 2',
                title: 'Linux & Infrastructure',
                icon: <Zap className="w-8 h-8" />,
                items: ['Linux Fundamentals', 'Shell Scripting', 'System Admin', 'Lab Exercises'],
              },
              {
                week: 'Week 3',
                title: 'DevOps & Containers',
                icon: <Users className="w-8 h-8" />,
                items: ['Git & GitHub', 'CI/CD Pipelines', 'Docker', 'Production Deploy'],
              },
              {
                week: 'Week 4',
                title: 'AI & Agents',
                icon: <Trophy className="w-8 h-8" />,
                items: ['AI Fundamentals', 'LLM Basics', 'Prompt Engineering', 'Capstone Project'],
              },
            ].map((module, idx) => (
              <div key={idx} className="glass-card p-8 hover:translate-y-[-8px] transition-transform">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-sm text-emerald-400 font-bold mb-1">{module.week}</div>
                    <h3 className="text-2xl font-bold">{module.title}</h3>
                  </div>
                  <div className="text-emerald-400">{module.icon}</div>
                </div>
                <ul className="space-y-3">
                  {module.items.map((item, i) => (
                    <li key={i} className="flex gap-3 text-white/80">
                      <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hot Deal Flash Offer */}
      <section className="py-20 bg-gradient-to-r -emerald-600 to-green-600 relative overflow-hiddenfrom">
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute inset-0 animate-pulse"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-black/30">
            <Sparkles className="w-5 h-5 animate-spin" />
            <span className="text-sm font-bold uppercase">⚡ Flash Deal Alert</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-emerald-400">
            First 30 Registrations Get<br className="hidden md:block" /> Additonal Resume Review + LinkedIn Optimization
          </h2>
         {/* <p className="text-xl text-black/80 mb-8 max-w-2xl mx-auto">
            Plus: Free 1-on-1 industry mentor matching worth ₹25,000
          </p> */}
          <a
            href="/#register"
            className="btn-primary inline-flex items-center gap-2 text-lg"
          >
            Claim Your Spot Now
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-black text-center mb-16">Success Stories</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Arjun Singh',
                role: 'Now Senior DevOps Engineer',
                text: 'This program was a game-changer. Got job offer 2 weeks after completion!',
                rating: 5,
              },
              {
                name: 'Priya Sharma',
                role: 'AI Specialist at TechCorp',
                text: 'The mentors were incredible. Real-world projects gave me actual portfolio pieces.',
                rating: 5,
              },
              {
                name: 'Rohan Patel',
                role: 'Full Stack Developer',
                text: 'Best free training I could ask for. Career accelerator certificate helped me land interviews.',
                rating: 5,
              },
            ].map((testimonial, idx) => (
              <div key={idx} className="glass-card p-8">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-emerald-400 text-emerald-400" />
                  ))}
                </div>
                <p className="text-white/90 mb-4 leading-relaxed">"{testimonial.text}"</p>
                <div>
                  <div className="font-bold">{testimonial.name}</div>
                  <div className="text-sm text-white/60">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-black/50">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-black text-center mb-16">Common Questions</h2>
          <div className="space-y-6">
            {[
              {
                q: 'Is this really free?',
                a: 'Yes, 100% free. No hidden charges. We believe in making quality education accessible.',
              },
              {
                q: 'Do I need prior experience?',
                a: 'No. We start from basics. Fresh graduates welcome. Beginners ideal.',
              },
              {
                q: 'What if I can\'t join full-time?',
                a: 'Flexible schedule. 4-6 hours/day. Recorded sessions available. Catch up anytime.',
              },
              {
                q: 'Will I get a job after?',
                a: 'We offer job-ready training + resume support + industry mentor connections. Success depends on your effort.',
              },
              {
                q: 'Can I defer my enrollment?',
                a: 'Yes. Register now, join any upcoming batch. Limited seats, so early registration recommended.',
              },
            ].map((faq, idx) => (
              <details key={idx} className="glass-card p-6 cursor-pointer group">
                <summary className="font-bold text-lg flex justify-between items-center">
                  {faq.q}
                  <span className="text-emerald-400 group-open:rotate-180 transition-transform">
                    ↓
                  </span>
                </summary>
                <p className="text-white/70 mt-4">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-emerald-500 rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Your Future Starts Here
          </h2>
          <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
            Don't wait. Limited seats. Only 30 spots. Next batch fills up in days.
          </p>
          <a
            href="/#register"
            className="btn-primary text-xl inline-flex items-center gap-2"
          >
            🎯 Secure Your Spot (Free)
            <ArrowRight className="w-6 h-6" />
          </a>
          <p className="text-white/50 text-sm mt-8">
            No credit card required • Results guaranteed • 28 days to career transformation
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/50 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <a href="https://sarmak.in" className="flex items-center gap-3 mb-6 inline-flex">
                <Logo className="h-14 w-auto" />
                <div>
                  <span className="text-2xl font-bold text-white tracking-wider block">SARMAK</span>
                  <span className="text-xs text-gold font-mono tracking-widest">INNOVATE. TRANSFORM. EXCEL.</span>
                </div>
              </a>
              <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-sm">
                SARMAK is a group of technology enthusiasts driven by passion and commitment to revolutionize businesses through innovative IT solutions and AI-powered services.
              </p>
              <div className="space-y-3 text-sm text-white/60">
                <a href="mailto:info@sarmak.in" className="flex items-center gap-3 hover:text-gold transition-colors">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gold/10 text-gold">@</span>
                  info@sarmak.in
                </a>
                <a href="tel:+919764000745" className="flex items-center gap-3 hover:text-gold transition-colors">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gold/10 text-gold">📞</span>
                  +91 97640 00745
                </a>
                <div className="flex items-start gap-3 text-white/60">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gold/10 text-gold">📍</span>
                  Joyville, Meridian-1302, Hinjewadi, Pune MH 411057, India
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">Quick Links</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="https://sarmak.in" className="text-white/60 hover:text-gold transition-colors">Home</a></li>
                <li><a href="https://sarmak.in/about" className="text-white/60 hover:text-gold transition-colors">About Us</a></li>
                <li><a href="https://sarmak.in/services/learning-with-sarmak" className="text-white/60 hover:text-gold transition-colors">Learning with SARMAK</a></li>
                <li><a href="https://sarmak.in/contact" className="text-white/60 hover:text-gold transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">Services</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="https://sarmak.in/services/ai" className="text-white/60 hover:text-gold transition-colors">AI Solutions</a></li>
                <li><a href="https://sarmak.in/services/cloud" className="text-white/60 hover:text-gold transition-colors">Cloud Services</a></li>
                <li><a href="https://sarmak.in/services/database" className="text-white/60 hover:text-gold transition-colors">Database Services</a></li>
                <li><a href="https://sarmak.in/services/devops" className="text-white/60 hover:text-gold transition-colors">DevOps</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">Resources</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="https://sarmak.in/blog" className="text-white/60 hover:text-gold transition-colors">Blog</a></li>
                <li><a href="https://sarmak.in/resources" className="text-white/60 hover:text-gold transition-colors">Resources</a></li>
                <li><a href="https://sarmak.in/faq" className="text-white/60 hover:text-gold transition-colors">FAQ</a></li>
                <li><a href="https://sarmak.in/service-plans" className="text-white/60 hover:text-gold transition-colors">Service Plans</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40">
              <p>© {new Date().getFullYear()} SARMAK. All rights reserved.</p>
              <div className="flex flex-wrap items-center gap-6">
                <a href="https://sarmak.in/privacy-policy" className="hover:text-gold transition-colors">Privacy Policy</a>
                <a href="https://sarmak.in/terms-of-service" className="hover:text-gold transition-colors">Terms of Service</a>
              </div>
              <div className="flex items-center gap-3">
                <a href="https://www.linkedin.com/company/sarmak-solutions" target="_blank" rel="noreferrer" className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-gold hover:text-[#1c1d1b] transition-all duration-300">in</a>
                <a href="https://x.com/SarmakSolutions" target="_blank" rel="noreferrer" className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-gold hover:text-[#1c1d1b] transition-all duration-300">x</a>
                <a href="https://www.instagram.com/sarmaksolutions/" target="_blank" rel="noreferrer" className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-gold hover:text-[#1c1d1b] transition-all duration-300">ig</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
