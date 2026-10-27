import React, { useState, useEffect } from 'react';
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
  Layers,
  AlertCircle
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

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setPhone(user.phone || '');
      setBio(user.bio || '');
    }
  }, [user]);

  const earnedBadgesCount = badges.filter((b) => b.earned).length;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSavedSuccess(false);

    const res = await updateProfile({ name, phone, bio });
    setSaving(false);

    if (res.success) {
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } else {
      setError(res.error || 'Failed to update profile.');
    }
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
            name={user?.name || 'User'}
            size="xl"
            status="online"
            className="ring-4 ring-blue-50"
          />

          <div className="space-y-2 flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                {user?.name || 'New Learner'}
              </h2>
              <Badge variant="primary">
                {user?.role === 'admin' ? 'System Administrator' : 'Incoming Employee'}
              </Badge>
            </div>

            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              {user?.department || 'Cloud Real Estate Solutions'} • Employee ID: <span className="font-mono font-bold text-slate-700">{user?.employeeId || 'Pending'}</span>
            </p>

            {user?.bio && (
              <p className="text-xs text-slate-600 max-w-xl italic">
                "{user.bio}"
              </p>
            )}

            {/* Quick stats mini ribbon */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-3 text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-blue-600 bg-blue-50 px-2.5 py-1 rounded-xl">
                <Layers className="w-3.5 h-3.5" />
                Day {user?.currentDay || 1} of 15
              </span>
              <span className="flex items-center gap-1.5 text-purple-600 bg-purple-50 px-2.5 py-1 rounded-xl">
                <Sparkles className="w-3.5 h-3.5" />
                {(user?.xp || 0).toLocaleString()} XP
              </span>
              <span className="flex items-center gap-1.5 text-amber-600 bg-amber-50 px-2.5 py-1 rounded-xl">
                <Flame className="w-3.5 h-3.5" />
                {user?.currentStreak || 0} Day Streak
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
            <p className="text-xs text-slate-500">Update your contact information for the team directory</p>
          </div>
          {savedSuccess && (
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Saved to Server
            </span>
          )}
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Full Legal Name
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
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Corporate Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-100 text-slate-500 cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Assigned Department
              </label>
              <div className="relative">
                <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={user?.department || 'Cloud Real Estate Solutions'}
                  disabled
                  className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-100 text-slate-500 cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Primary Phone Number
              </label>
              <input
                type="text"
                placeholder="+1 (555) 000-0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Professional Bio & Focus Areas
            </label>
            <textarea
              rows={3}
              placeholder="Tell your squad about your background, interests, and engineering focus..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              variant="primary"
              size="md"
              icon={Save}
              loading={saving}
            >
              Save Profile Changes
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
