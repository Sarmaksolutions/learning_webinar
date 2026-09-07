import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, Zap, Lock, CheckCircle, ArrowRight, 
  Calendar, FileText, TrendingUp, Shield, Sparkles 
} from 'lucide-react';
import { getUserSession, UserSession } from './lib/auth';
import Logo from './components/Logo';
import SEO from './components/SEO';

type CourseType = 'college' | 'advance' | null;

const courseData = {
  college: {
    title: 'College Students Program',
    subtitle: 'Foundation to Industry-Ready in 4 Weeks',
    description: 'Designed specifically for college students and fresh graduates. Bridges the gap between academic learning and industry expectations with hands-on labs, real-world projects, and expert mentorship.',
    icon: <BookOpen className="w-8 h-8 text-emerald-400" />,
    color: 'from-emerald-500/20 to-teal-500/20',
    borderColor: 'border-emerald-500/30',
    details: {
      curriculum: ['Week 1: Databases & SQL Fundamentals', 'Week 2: Linux & Infrastructure Basics', 'Week 3: DevOps & Containerization Intro', 'Week 4: AI & Agents Capstone Project'],
      schedule: ['Mon/Wed: Live Theory Sessions (6:00 PM)', 'Fri: Hands-on Lab Workshops (6:00 PM)', 'Sat: Mentor Q&A and Project Review (11:00 AM)'],
      materials: ['SQL Cheat Sheet & Practice DB', 'Linux Command Line Handbook', 'Docker Basics for Students', 'Resume Building Template'],
      tools: ['GitHub Student Developer Pack', 'Free Cloud Credits (AWS/Azure)', 'Notion Workspace for Notes', 'Discord Community Access']
    }
  },
  advance: {
    title: 'Advance Course',
    subtitle: 'Master Enterprise IT & AI Infrastructure',
    description: 'An intensive, advanced track for working professionals or experienced learners. Dive deep into enterprise-grade infrastructure, advanced DevOps pipelines, AI agent deployment, and cloud architecture.',
    icon: <Zap className="w-8 h-8 text-gold" />,
    color: 'from-gold/20 to-amber-500/20',
    borderColor: 'border-gold/30',
    details: {
      curriculum: ['Week 1: Advanced Cloud Architecture & Security', 'Week 2: CI/CD Pipelines & Kubernetes Orchestration', 'Week 3: Enterprise AI Agent Deployment', 'Week 4: Scalable Infrastructure & Monitoring'],
      schedule: ['Tue/Thu: Advanced Concept Deep Dives (8:00 PM)', 'Sat: Live Architecture Review & Debugging (10:00 AM)', 'Sun: Optional 1-on-1 Mentorship Slots'],
      materials: ['Enterprise Architecture Blueprints', 'Kubernetes Production Checklist', 'AI Security & Compliance Guide', 'Advanced Terraform Modules'],
      tools: ['Enterprise GitHub/GitLab Access', 'Premium Cloud Sandbox Environments', 'Advanced Monitoring Dashboards (Grafana)', 'Private Slack Channel with Senior Engineers']
    }
  }
};

export default function CourseDetails() {
  const [selectedCourse, setSelectedCourse] = useState<CourseType>(null);
  const [session, setSession] = useState<UserSession | null>(null);

  useEffect(() => {
    const user = getUserSession();
    setSession(user);
  }, []);

  const handleCourseSelect = (course: CourseType) => {
    setSelectedCourse(course);
    setTimeout(() => {
      const element = document.getElementById('course-details-section');
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1c1d1b] to-[#0d0e10] text-white">
      <SEO 
        title="Course Details - SARMAK Learning Portal" 
        description="Explore our College Students Program and Advance IT Infrastructure Course. Login to access detailed curriculum, schedules, materials, and tools."
        keywords="SARMAK courses, IT infrastructure training, college student IT course, advanced DevOps course, AI training, Sarmak Learning"
      />
      
      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#1c1d1b]/95 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <Logo className="h-10 w-auto transition-transform duration-300 group-hover:scale-105" />
            <div className="hidden sm:block">
              <span className="text-lg font-bold tracking-wider">SARMAK <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-lime-300">Learning</span></span>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            {session ? (
              <>
                <span className="text-sm text-white/70 hidden sm:block">Welcome, {session.name}</span>
                <Link to="/dashboard" className="btn-primary text-sm">Dashboard</Link>
              </>
            ) : (
              <Link to="/login" className="btn-outline text-sm inline-flex items-center gap-2">
                Login
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-sm font-bold uppercase tracking-widest mb-6">
            <Sparkles className="w-4 h-4" /> Choose Your Learning Path
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            Tailored IT Infrastructure <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-lime-300 to-emerald-500">Training Programs</span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Select the program that matches your current level. Login to unlock full curriculum details, schedules, and exclusive resources.
          </p>
        </div>

        {/* Course Selection Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {(['college', 'advance'] as CourseType[]).map((courseKey) => {
            const course = courseData[courseKey!];
            const isSelected = selectedCourse === courseKey;
            return (
              <button
                key={courseKey}
                onClick={() => handleCourseSelect(courseKey)}
                className={`relative group text-left rounded-3xl border p-8 transition-all duration-500 ease-out backdrop-blur-xl overflow-hidden
                  ${isSelected 
                    ? `${course.borderColor} bg-gradient-to-br ${course.color} shadow-2xl shadow-emerald-500/10 scale-[1.02]` 
                    : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10 hover:scale-[1.01]'
                  }`}
              >
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  {course.icon}
                </div>
                <div className="relative z-10">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 transition-colors duration-300
                    ${isSelected ? 'bg-white/20' : 'bg-white/5'}`}>
                    {course.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{course.title}</h3>
                  <p className="text-gold font-semibold mb-4">{course.subtitle}</p>
                  <p className="text-white/70 text-sm leading-relaxed mb-6">{course.description}</p>
                  
                  <div className="flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all">
                    <span>{isSelected ? 'Selected' : 'View Details'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
                
                {isSelected && (
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gold flex items-center justify-center animate-bounce-in">
                    <CheckCircle className="w-5 h-5 text-[#1c1d1b]" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Course Details Section */}
        {selectedCourse && (
          <div id="course-details-section" className="animate-fade-in-up">
            {!session ? (
              <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-12 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent pointer-events-none" />
                <div className="relative z-10 max-w-2xl mx-auto">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gold/10 flex items-center justify-center">
                    <Lock className="w-10 h-10 text-gold" />
                  </div>
                  <h3 className="text-3xl font-black mb-4">Unlock Full Course Details</h3>
                  <p className="text-white/70 mb-8 text-lg">
                    Login with your learner ID to access the complete curriculum, weekly schedule, exclusive training materials, and specialized tools for the <span className="text-gold font-semibold">{courseData[selectedCourse].title}</span>.
                  </p>
                  <Link 
                    to="/login" 
                    className="btn-primary text-lg inline-flex items-center gap-2 pulse-glow"
                  >
                    Login to Access Details
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <p className="mt-6 text-sm text-white/50">
                    Don't have an account? <Link to="/" className="text-gold hover:underline">Register for free</Link>
                  </p>
                </div>
              </div>
            ) : (
              <CourseTabs courseKey={selectedCourse} data={courseData[selectedCourse]} />
            )}
          </div>
        )}
      </main>
    </div>
  );
}

// Sub-component for Tabs
function CourseTabs({ courseKey, data }: { courseKey: CourseType, data: any }) {
  const [activeTab, setActiveTab] = useState<'curriculum' | 'schedule' | 'materials' | 'tools'>('curriculum');

  const tabs = [
    { id: 'curriculum', label: 'Curriculum', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'schedule', label: 'Schedule', icon: <Calendar className="w-4 h-4" /> },
    { id: 'materials', label: 'Materials', icon: <FileText className="w-4 h-4" /> },
    { id: 'tools', label: 'Tools & Resources', icon: <TrendingUp className="w-4 h-4" /> },
  ];

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden animate-fade-in">
      <div className="flex overflow-x-auto border-b border-white/10 scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold whitespace-nowrap transition-all duration-300 border-b-2
              ${activeTab === tab.id 
                ? 'border-gold text-gold bg-gold/5' 
                : 'border-transparent text-white/60 hover:text-white hover:bg-white/5'
              }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-8 md:p-12 min-h-[400px]">
        {activeTab === 'curriculum' && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Shield className="w-6 h-6 text-emerald-400" /> 
              {courseKey === 'college' ? 'Foundation Curriculum' : 'Advanced Curriculum'}
            </h3>
            <div className="grid gap-4">
              {data.details.curriculum.map((item: string, idx: number) => (
                <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-emerald-500/30 transition-colors">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-sm">
                    {idx + 1}
                  </div>
                  <p className="text-white/90 pt-1">{item}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'schedule' && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Calendar className="w-6 h-6 text-gold" /> Weekly Schedule
            </h3>
            <div className="grid gap-4">
              {data.details.schedule.map((item: string, idx: number) => (
                <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-gold/30 transition-colors">
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-gold" />
                  <p className="text-white/90">{item}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'materials' && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <FileText className="w-6 h-6 text-emerald-400" /> Training Materials
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {data.details.materials.map((item: string, idx: number) => (
                <div key={idx} className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                    <FileText className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-white/90 group-hover:text-gold transition-colors">{item}</p>
                    <p className="text-xs text-white/50">Click to download</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'tools' && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-gold" /> Tools & Resources
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {data.details.tools.map((item: string, idx: number) => (
                <div key={idx} className="flex items-start gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-gold/30 transition-colors">
                  <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <p className="text-white/90">{item}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}