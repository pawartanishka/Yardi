import React, { useState } from 'react';
import {
  User,
  Mail,
  Building,
  Briefcase,
  Calendar,
  Shield,
  Save,
  CheckCircle2,
  Sparkles,
  Flame,
  Trophy,
  Layers
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useJourney } from '../../context/JourneyContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Avatar from '../../components/common/Avatar';
import Badge from '../../components/common/Badge';

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const { badges } = useJourney();

  const [name, setName] = useState(user?.name || 'Alex Rivera');
  const [phone, setPhone] = useState(user?.phone || '+1 (555) 234-8921');
  const [bio, setBio] = useState(
    user?.bio || 'Incoming Software Engineer passionate about enterprise cloud applications and scalable distributed systems.'
  );
  const [savedSuccess, setSavedSuccess] = useState(false);

  const earnedBadgesCount = badges.filter((b) => b.earned).length;

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile({ name, phone, bio });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Learner Profile
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Manage your onboarding contact details and review your pre-joining credentials
        </p>
      </div>

      {/* Top Profile Summary Card */}
      <Card className="p-6 sm:p-8 bg-white shadow-soft">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          <Avatar
            src={user?.profileImage}
            name={user?.name || 'Alex Rivera'}
            size="xl"
            status="online"
            className="ring-4 ring-blue-50"
          />

          <div className="space-y-2 flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                {user?.name || 'Alex Rivera'}
              </h2>
              <Badge variant="primary">
                {user?.role === 'admin' ? 'System Administrator' : 'Incoming Employee'}
              </Badge>
            </div>

            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              {user?.department || 'Cloud Real Estate Solutions'} • Employee ID: <span className="font-mono font-bold text-slate-700">{user?.employeeId || 'YAR-84920'}</span>
            </p>

            <p className="text-xs text-slate-600 max-w-xl italic">
              "{bio}"
            </p>

            {/* Quick stats mini ribbon */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-3 text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-blue-600 bg-blue-50 px-2.5 py-1 rounded-xl">
                <Layers className="w-3.5 h-3.5" />
                Day {user?.currentDay || 5} of 15
              </span>
              <span className="flex items-center gap-1.5 text-purple-600 bg-purple-50 px-2.5 py-1 rounded-xl">
                <Sparkles className="w-3.5 h-3.5" />
                {(user?.xp || 1450).toLocaleString()} XP
              </span>
              <span className="flex items-center gap-1.5 text-amber-600 bg-amber-50 px-2.5 py-1 rounded-xl">
                <Flame className="w-3.5 h-3.5" />
                {user?.currentStreak || 5} Day Streak
              </span>
              <span className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-xl">
                <Trophy className="w-3.5 h-3.5" />
                {earnedBadgesCount} Badges
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Profile Details Edit Form */}
      <Card className="p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">Personal & Role Information</h3>
            <p className="text-xs text-slate-500">Update your contact information for Day 1 orientation</p>
          </div>
          {savedSuccess && (
            <span className="text-xs text-emerald-600 font-bold flex items-center gap-1 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
              <CheckCircle2 className="w-4 h-4" />
              Saved Successfully
            </span>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Official Email (Read-Only)
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  value={user?.email || 'alex.rivera@yardi.com'}
                  disabled
                  className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Department
              </label>
              <div className="relative">
                <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={user?.department || 'Cloud Solutions'}
                  disabled
                  className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Official Joining Date
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={user?.joiningDate || 'October 12, 2026'}
                  disabled
                  className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Contact Phone Number
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              About Me / Bio
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <Button
              type="submit"
              variant="primary"
              size="md"
              icon={Save}
            >
              Save Profile Changes
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
