import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App.tsx'
import CourseDetails from './CourseDetails.tsx'
import Login from './Login.tsx'
import Dashboard from './Dashboard.tsx'
import Profile from './Profile.tsx'
import Schedule from './Schedule.tsx'
import Materials from './Materials.tsx'
import Progress from './Progress.tsx'
import Tools from './Tools.tsx'
import Notifications from './Notifications.tsx'
import LiveSessions from './LiveSessions.tsx'
import BonusLearning from './BonusLearning.tsx'
import AiToolkit from './AiToolkit.tsx'
import Certifications from './Certifications.tsx'
import ReportBug from './ReportBug.tsx'
import './index.css'
import Webinar from './Webinar.tsx';
import PaymentSuccess from './PaymentSuccess.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/course-details" element={<CourseDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/webinar" element={<Webinar />} />
        <Route path="/payment-success"element={<PaymentSuccess />}/>
        <Route path="/materials" element={<Materials />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/live-sessions" element={<LiveSessions />} />
        <Route path="/bonus-learning" element={<BonusLearning />} />
        <Route path="/ai-toolkit" element={<AiToolkit />} />
        <Route path="/certifications" element={<Certifications />} />
        <Route path="/report-bug" element={<ReportBug />} />
        <Route path="/login" element={<Login />} />
        <Route path="/learning" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
