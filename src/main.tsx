import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './App';
import CourseDetails from './CourseDetails';
import Login from './Login';
import Dashboard from './Dashboard';
import Profile from './Profile';
import Schedule from './Schedule';
import Webinar from './Webinar';
import Materials from './Materials';
import Progress from './Progress';
import Tools from './Tools';
import Notifications from './Notifications';
import LiveSessions from './LiveSessions';
import BonusLearning from './BonusLearning';
import AiToolkit from './AiToolkit';
import Certifications from './Certifications';
import ReportBug from './ReportBug';
import PaymentSuccess from './PaymentSuccess';
import Payment from './Payment';

import { AuthProvider } from './lib/AuthContext';
import ProtectedRoute from './lib/ProtectedRoute';

import './index.css';

ReactDOM.createRoot(
  document.getElementById('root')!,
).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public pages */}
          <Route path="/" element={<App />} />
          <Route path="/course-details" element={<CourseDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/learning" element={<Login />} />

          {/* Payment pages */}
          <Route path="/payment" element={<Payment />} />
          <Route
            path="/payment-success"
            element={<PaymentSuccess />}
          />

          {/* Pages requiring a verified Firebase user */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/webinar" element={<Webinar />} />
            <Route path="/materials" element={<Materials />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/tools" element={<Tools />} />
            <Route
              path="/notifications"
              element={<Notifications />}
            />
            <Route
              path="/live-sessions"
              element={<LiveSessions />}
            />
            <Route
              path="/bonus-learning"
              element={<BonusLearning />}
            />
            <Route path="/ai-toolkit" element={<AiToolkit />} />
            <Route
              path="/certifications"
              element={<Certifications />}
            />
            <Route path="/report-bug" element={<ReportBug />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);