import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Compass,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Shield,
  Sparkles,
  CheckCircle2,
  Calendar,
  Layers
} from 'lucide-react';
import Button from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const res = await login(email, password);
    if (res.success) {
      if (res.user?.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } else {
      setError(res.error || 'Invalid credentials');
    }
  };

  const handleDemoUser = async () => {
    setEmail('user@yardi.com');
    setPassword('User@123');
    const res = await login('user@yardi.com', 'User@123');
    if (res.success) navigate('/dashboard');
  };

  const handleDemoAdmin = async () => {
    setEmail('admin@yardi.com');
    setPassword('Admin@123');
    const res = await login('admin@yardi.com', 'Admin@123');
    if (res.success) navigate('/admin');
  };

  return (
    <div className="min-h-screen w-full flex bg-slate-50">
      {/* Left side: Premium Branding & Value Prop */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white p-12 flex-col justify-between overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-1/4 -left-12 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -right-12 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Brand header */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-blue-600 flex items-center justify-center shadow-glow">
            <Compass className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-blue-400 tracking-wider text-sm">YARDI</span>
              <span className="text-[10px] bg-blue-500/20 text-blue-300 font-semibold px-2 py-0.5 rounded-full border border-blue-400/20">
                Enterprise
              </span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white">LaunchPad</h1>
          </div>
        </div>

        {/* Center Motivational Content */}
        <div className="relative z-10 space-y-6 max-w-lg">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-semibold backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>15-Day Structured Pre-Joining Experience</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight">
            Your journey starts here.
          </h2>

          <p className="text-base text-slate-300 leading-relaxed">
            Complete your 15-Day LaunchPad journey, master squad workflows, earn achievement badges, and get completely primed for your first day.
          </p>

          {/* Value props bullet list */}
          <div className="space-y-3 pt-4">
            <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-200">
              <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </span>
              <span>15 curated daily milestones tailored to your engineering squad</span>
            </div>
            <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-200">
              <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </span>
              <span>Interactive scenario dilemmas, video guides, and knowledge checks</span>
            </div>
            <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-200">
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </span>
              <span>Real-time streak tracker, XP leveling, and achievement badges</span>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="relative z-10 text-xs text-slate-400 flex items-center justify-between border-t border-slate-800/80 pt-6">
          <span>© 2026 Yardi Systems, Inc.</span>
          <span className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-blue-400" />
            SOC-2 Type II Certified
          </span>
        </div>
      </div>

      {/* Right side: Login Form */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-12">
        <div className="w-full max-w-md mx-auto space-y-8">
          {/* Mobile Header */}
          <div className="lg:hidden flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-glow">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-blue-600 tracking-wider text-xs">YARDI</span>
              <h2 className="text-lg font-bold text-slate-900">LaunchPad</h2>
            </div>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Welcome Back
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Please enter your pre-joining credentials to resume your journey.
            </p>
          </div>

          {/* Quick Demo Login Triggers */}
          <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-blue-900 uppercase tracking-wider">
                Quick Demo Access:
              </span>
              <span className="text-[10px] text-blue-600 font-medium">One-click sign-in</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleDemoUser}
                className="px-3 py-2 rounded-xl bg-white border border-blue-200 hover:border-blue-400 hover:shadow-xs text-xs font-bold text-blue-700 transition-all text-left"
              >
                <div>Learner Demo</div>
                <div className="text-[10px] text-slate-400 font-normal">user@yardi.com</div>
              </button>
              <button
                type="button"
                onClick={handleDemoAdmin}
                className="px-3 py-2 rounded-xl bg-white border border-purple-200 hover:border-purple-400 hover:shadow-xs text-xs font-bold text-purple-700 transition-all text-left"
              >
                <div>Admin Demo</div>
                <div className="text-[10px] text-slate-400 font-normal">admin@yardi.com</div>
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Corporate or Personal Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  placeholder="name@yardi.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-700">Password</label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-xs sm:text-sm pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-1 text-slate-400 hover:text-slate-600 absolute right-3 top-2.5"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-600 font-medium">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                />
                <span>Remember me on this device</span>
              </label>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              loading={loading}
              icon={ArrowRight}
              iconPosition="right"
            >
              Sign In to LaunchPad
            </Button>
          </form>

          {/* Account setup option */}
          <div className="text-center text-xs text-slate-500">
            Received your offer letter?{' '}
            <Link
              to="/register"
              className="font-bold text-blue-600 hover:text-blue-700 underline underline-offset-2"
            >
              Activate Pre-Joining Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
