import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Building,
  Users,
  Eye,
  EyeOff,
  Check,
  Lock,
  Mail,
  User,
  ArrowRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { AppMode, UserAccount } from '../types';
import { loginUser, registerUser, DEMO_USERS } from '../utils/auth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: UserAccount) => void;
  initialMode?: 'login' | 'register';
  initialRole?: AppMode;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onAuthSuccess,
  initialMode = 'login',
  initialRole = 'organizer',
}) => {
  const [tab, setTab] = useState<'login' | 'register'>(initialMode);
  const [selectedRole, setSelectedRole] = useState<AppMode>(initialRole);

  // Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [organization, setOrganization] = useState('');
  const [collegeOrCompany, setCollegeOrCompany] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Error and Loading
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleResetForm = () => {
    setErrorMessage(null);
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setOrganization('');
    setCollegeOrCompany('');
  };

  const handleSwitchTab = (newTab: 'login' | 'register') => {
    setTab(newTab);
    setErrorMessage(null);
  };

  // Quick 1-Click Demo Login
  const handleQuickDemo = (demoIndex: number) => {
    const demo = DEMO_USERS[demoIndex];
    if (!demo) return;
    setIsLoading(true);
    setTimeout(() => {
      const res = loginUser(demo.email, demo.password || 'password123');
      setIsLoading(false);
      if (res.success && res.user) {
        onAuthSuccess(res.user);
        onClose();
      }
    }, 400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (tab === 'register') {
      if (!name.trim()) {
        setErrorMessage('Please enter your full name.');
        return;
      }
      if (!email.trim() || !email.includes('@')) {
        setErrorMessage('Please provide a valid email address.');
        return;
      }
      if (password.length < 6) {
        setErrorMessage('Password must be at least 6 characters.');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match.');
        return;
      }

      setIsLoading(true);
      setTimeout(() => {
        const res = registerUser({
          name,
          email,
          password,
          role: selectedRole,
          organization: selectedRole === 'organizer' ? organization : undefined,
          collegeOrCompany: collegeOrCompany,
        });
        setIsLoading(false);

        if (res.success && res.user) {
          onAuthSuccess(res.user);
          onClose();
        } else {
          setErrorMessage(res.error || 'Registration failed.');
        }
      }, 500);
    } else {
      // Login
      if (!email.trim() || !password) {
        setErrorMessage('Please enter your email and password.');
        return;
      }

      setIsLoading(true);
      setTimeout(() => {
        const res = loginUser(email, password);
        setIsLoading(false);

        if (res.success && res.user) {
          onAuthSuccess(res.user);
          onClose();
        } else {
          setErrorMessage(res.error || 'Invalid credentials.');
        }
      }, 500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div
        className="w-full max-w-lg rounded-3xl border border-rose-500/30 bg-slate-900 shadow-2xl p-6 sm:p-8 relative overflow-hidden text-slate-100 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow decoration */}
        <div className="absolute top-0 right-0 w-80 h-32 bg-gradient-to-bl from-rose-500/20 via-pink-500/10 to-amber-500/10 blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="text-center pb-5 border-b border-slate-800/80">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-300 bg-rose-950/60 border border-rose-800/50 px-3 py-1 rounded-full mb-2">
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            <span>AI Content Studio Accounts</span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            {tab === 'login' ? 'Welcome Back!' : 'Create Your Account'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {tab === 'login'
              ? 'Sign in to access your saved events, campaigns, and experience posts.'
              : 'Select your role and start creating professional event content in seconds.'}
          </p>
        </div>

        {/* Segmented Switch: Login vs Register */}
        <div className="my-5 p-1 bg-slate-950 border border-slate-800 rounded-2xl flex items-center">
          <button
            type="button"
            onClick={() => handleSwitchTab('login')}
            className={`w-1/2 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              tab === 'login'
                ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => handleSwitchTab('register')}
            className={`w-1/2 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              tab === 'register'
                ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Register
          </button>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-rose-950/80 border border-rose-800/70 text-rose-200 text-xs flex items-center justify-between">
            <span>{errorMessage}</span>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-rose-300 hover:text-white ml-2 text-xs font-bold"
            >
              ✕
            </button>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* REGISTRATION ROLE SELECTOR CARDS */}
          {tab === 'register' && (
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-300">
                Choose Your Role *
              </label>
              <div className="grid grid-cols-2 gap-3">
                {/* Option 1: Event Organizer */}
                <button
                  type="button"
                  onClick={() => setSelectedRole('organizer')}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    selectedRole === 'organizer'
                      ? 'border-rose-500 bg-rose-950/40 text-white shadow-md shadow-rose-500/20'
                      : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1.5">
                    <Building className="w-5 h-5 text-rose-400" />
                    {selectedRole === 'organizer' && (
                      <span className="w-2 h-2 rounded-full bg-rose-500" />
                    )}
                  </div>
                  <div className="font-extrabold text-xs text-white">Event Organizer</div>
                  <div className="text-[10px] text-slate-400 mt-0.5 leading-snug">
                    I conduct events & need promotional content.
                  </div>
                </button>

                {/* Option 2: Attendee / User */}
                <button
                  type="button"
                  onClick={() => setSelectedRole('participant')}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    selectedRole === 'participant'
                      ? 'border-blue-500 bg-blue-950/40 text-white shadow-md shadow-blue-500/20'
                      : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1.5">
                    <Users className="w-5 h-5 text-blue-400" />
                    {selectedRole === 'participant' && (
                      <span className="w-2 h-2 rounded-full bg-blue-500" />
                    )}
                  </div>
                  <div className="font-extrabold text-xs text-white">User / Attendee</div>
                  <div className="text-[10px] text-slate-400 mt-0.5 leading-snug">
                    I attend events & share experience posts.
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Full Name for Registration */}
          {tab === 'register' && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rohan Sharma"
                  className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>
          )}

          {/* Email Address */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com or name@college.edu"
                className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
              />
            </div>
          </div>

          {/* Organization / College details for Registration based on chosen role */}
          {tab === 'register' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {selectedRole === 'organizer' ? (
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Organization / Committee / Club Name
                  </label>
                  <input
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="e.g. Student Council, AI Innovation Club"
                    className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                  />
                </div>
              ) : (
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    College / Department / Company
                  </label>
                  <input
                    type="text"
                    value={collegeOrCompany}
                    onChange={(e) => setCollegeOrCompany(e.target.value)}
                    placeholder="e.g. Computer Science & Engineering"
                    className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                  />
                </div>
              )}
            </div>
          )}

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-slate-300">
                Password *
              </label>
              {tab === 'login' && (
                <button
                  type="button"
                  onClick={() => alert('Demo passwords for pre-seeded accounts: "password123"')}
                  className="text-[11px] text-rose-400 hover:underline cursor-pointer"
                >
                  Forgot password?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-10 py-2.5 text-xs sm:text-sm bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-300"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Confirm Password (Register only) */}
          {tab === 'register' && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Confirm Password *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>
          )}

          {/* Submit Action Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 font-bold text-sm text-white bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-600 rounded-xl shadow-lg shadow-rose-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>
                    {tab === 'login'
                      ? 'Sign In to Studio'
                      : `Register as ${selectedRole === 'organizer' ? 'Organizer' : 'User'}`}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* 1-Click Demo Accounts (Fast Testing) */}
        {tab === 'login' && (
          <div className="mt-6 pt-5 border-t border-slate-800">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Quick 1-Click Demo Logins:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo(0)}
                className="p-2.5 rounded-xl border border-rose-500/30 bg-rose-950/30 hover:bg-rose-950/60 text-left transition-colors cursor-pointer group"
              >
                <div className="text-xs font-bold text-white group-hover:text-rose-300 flex items-center justify-between">
                  <span>Rohan Sharma</span>
                  <span className="text-[10px] text-rose-400 font-mono">🏢 Organizer</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">organizer@aicontent.studio</div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo(1)}
                className="p-2.5 rounded-xl border border-blue-500/30 bg-blue-950/30 hover:bg-blue-950/60 text-left transition-colors cursor-pointer group"
              >
                <div className="text-xs font-bold text-white group-hover:text-blue-300 flex items-center justify-between">
                  <span>Priya Sharma</span>
                  <span className="text-[10px] text-blue-400 font-mono">🎓 Attendee</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">user@aicontent.studio</div>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
