import { ReactNode } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from './Logo';

interface PageShellProps {
  title: string;
  description: string;
  children: ReactNode;
}

const navItems = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/course-details', label: 'Full Course Details' },
  { to: '/profile', label: 'Profile' },
  { to: '/schedule', label: 'Schedule' },
  { to: '/webinar', label: 'Webinar' },
  { to: '/materials', label: 'Materials' },
  { to: '/ai-toolkit', label: 'AI Tool Kit' },
  { to: '/certifications', label: 'Certifications' },
  { to: '/progress', label: 'Progress' },
  { to: '/tools', label: 'Tools' },
  { to: '/notifications', label: 'Notifications' },
  { to: '/live-sessions', label: 'Live Sessions' },
  { to: '/bonus-learning', label: 'Bonus Learning' },
  { to: '/report-bug', label: 'Report a Bug' },
];

export default function PageShell({ title, description, children }: PageShellProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#111315] to-[#0d0e10] text-white">
      <header className="border-b border-white/10 bg-[#111315]/95 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link to="/" className="flex items-center gap-3">
            <Logo className="h-12 w-auto" />
            <div className="hidden sm:block">
              <p className="text-base font-bold tracking-wider">SARMAK Learning Portal</p>
              <p className="text-[10px] uppercase text-gold font-mono tracking-widest">INNOVATE. TRANSFORM. EXCEL.</p>
            </div>
          </Link>

          <nav className="flex flex-wrap items-center gap-3 text-sm text-white/70">
            <Link to="/dashboard" className="hover:text-gold transition-colors">Dashboard</Link>
            <Link to="/course-details" className="hover:text-gold transition-colors">Course Details</Link>
            <Link to="/profile" className="hover:text-gold transition-colors">Profile</Link>
            <Link to="/login" className="hover:text-gold transition-colors">Login</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-24 lg:grid lg:grid-cols-[280px_1fr] gap-10">
        <aside className="hidden xl:block sticky top-28 self-start rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">Your Learning Portal</p>
            <h2 className="mt-4 text-xl font-semibold text-white">Quick Navigation</h2>
            <nav className="mt-6 space-y-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `block rounded-3xl px-4 py-3 text-sm transition ${
                      isActive
                        ? 'bg-gold/10 text-gold shadow-inner shadow-gold/10'
                        : 'text-white/70 hover:bg-white/5 hover:text-gold'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </aside>

        <div>
          <div className="mb-10 text-center xl:text-left">
            <span className="text-gold text-sm uppercase tracking-widest">Learner Experience</span>
            <h1 className="mt-4 text-4xl font-black sm:text-5xl lg:text-6xl">{title}</h1>
            <p className="mx-auto mt-4 max-w-3xl text-white/70 text-lg xl:mx-0">{description}</p>
          </div>
          {children}
        </div>
      </main>

      <footer className="border-t border-white/10 bg-black/60 text-white/70">
        <div className="max-w-7xl mx-auto px-6 py-12 grid gap-10 lg:grid-cols-[1.35fr_0.65fr]">
          <div>
            <p className="text-sm text-white/80 font-semibold">Need help?</p>
            <p className="mt-3 text-sm text-white/60 leading-relaxed">
              Reach out to our support team for onboarding, schedule help, or training questions.
            </p>
            <div className="mt-6 space-y-3 text-sm">
              <p>Phone: <a href="tel:+919240233140" className="text-gold hover:text-white">+91 92402 33140</a></p>
              <p>WhatsApp: <a href="https://wa.me/+918910125705" className="text-gold hover:text-white">+91 89101 25705</a></p>
              <p>Email: <a href="mailto:support@sarmak.in" className="text-gold hover:text-white">support@sarmak.in</a></p>
            </div>
          </div>
          <div className="space-y-3 text-sm text-white/60">
            <p className="font-semibold text-white/80">Quick links</p>
            <Link to="/" className="block hover:text-gold transition-colors">Home</Link>
            <Link to="/course-details" className="block hover:text-gold transition-colors">Course Details</Link>
            <Link to="/profile" className="block hover:text-gold transition-colors">Profile</Link>
            <Link to="/dashboard" className="block hover:text-gold transition-colors">Dashboard</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
