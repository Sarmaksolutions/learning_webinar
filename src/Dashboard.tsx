import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { onAuthStateChanged } from 'firebase/auth';

import SEO from './SEO';
import PageShell from './components/PageShell';

import {
  clearUserSession,
  createUserSession,
  getUserSession,
  saveUserSession,
  type UserSession,
} from './lib/auth';

import { auth } from './lib/firebase';
import { logoutFirebase } from './lib/firebaseAuth';

const Dashboard = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<UserSession | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user || !user.emailVerified) {
        clearUserSession();
        setSession(null);
        setAuthChecked(true);
        navigate('/login', { replace: true });
        return;
      }

      const email = user.email || '';
      const existingSession = getUserSession();

      const currentSession =
        existingSession &&
        existingSession.email?.toLowerCase() === email.toLowerCase()
          ? existingSession
          : createUserSession(
              '',
              user.displayName || 'Registered Learner',
            );

      currentSession.email = email;
      currentSession.name =
        user.displayName || currentSession.name || 'Registered Learner';

      saveUserSession(currentSession);
      setSession(currentSession);
      setAuthChecked(true);
    });

    return unsubscribe;
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await logoutFirebase();
    } catch (error) {
      console.error('Firebase logout failed:', error);
    } finally {
      clearUserSession();
      setSession(null);
      navigate('/login', { replace: true });
    }
  };

  if (!authChecked || !session) {
    return null;
  }

  const ongoingSessions = session.liveSessions.filter((item) =>
    /ongoing|in progress|live/i.test(item.status),
  );

  const upcomingFromSchedule = session.schedule.filter((item) =>
    /upcoming|scheduled/i.test(item.status),
  );

  const upcomingFromLive = session.liveSessions.filter((item) =>
    /upcoming|scheduled/i.test(item.status),
  );

  const upcomingSessions = [
    ...upcomingFromLive,
    ...upcomingFromSchedule,
  ].slice(0, 5);

  return (
    <PageShell
      title="Learner Dashboard"
      description="Your training schedule, live sessions, and quick navigation across the learning portal."
    >
      <SEO
        title="Learner Dashboard - SARMAK Learning Portal"
        description="Access your training schedule, materials, program progress, tools, and repository links after login."
        keywords="SARMAK learner dashboard, training schedule, learning resources"
      />

      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <span className="text-gold text-sm uppercase tracking-widest">
              Training Dashboard
            </span>

            <h2 className="mt-4 text-4xl font-black">
              Welcome back, {session.name}
            </h2>

            <p className="mt-4 text-white/70 max-w-3xl">
              You are enrolled in the {session.enrolledProgram}. Below are
              your ongoing and upcoming sessions.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              onClick={handleLogout}
              className="btn-outline w-full sm:w-auto"
            >
              Logout
            </button>

            <Link
              to="/"
              className="btn-primary w-full sm:w-auto inline-flex items-center gap-2"
            >
              Back to Registration
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-white/6 bg-white/3 p-6">
            <h3 className="text-2xl font-semibold">
              Ongoing Sessions
            </h3>

            <p className="mt-2 text-white/70">
              Sessions happening now or in progress.
            </p>

            <div className="mt-4 space-y-3">
              {ongoingSessions.length === 0 && (
                <div className="text-white/60">
                  No ongoing sessions at the moment.
                </div>
              )}

              {ongoingSessions.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg bg-white/5 p-3"
                >
                  <div>
                    <div className="font-medium">{item.title}</div>

                    <div className="text-sm text-white/70">
                      {item.host} — {item.time}
                    </div>
                  </div>

                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gold"
                  >
                    Join
                  </a>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-white/6 bg-white/3 p-6">
            <h3 className="text-2xl font-semibold">
              Upcoming Sessions
            </h3>

            <p className="mt-2 text-white/70">
              Next few scheduled sessions from your course.
            </p>

            <div className="mt-4 space-y-3">
              {upcomingSessions.length === 0 && (
                <div className="text-white/60">
                  No upcoming sessions scheduled.
                </div>
              )}

              {upcomingSessions.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg bg-white/5 p-3"
                >
                  <div>
                    <div className="font-medium">{item.title}</div>

                    <div className="text-sm text-white/70">
                      {item.date} • {item.time}
                    </div>
                  </div>

                  <Link to="/schedule" className="text-gold">
                    View
                  </Link>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </PageShell>
  );
};

export default Dashboard;