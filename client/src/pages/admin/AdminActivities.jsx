import React, { useState } from 'react';
import {
  CheckSquare,
  Plus,
  PlayCircle,
  BookOpen,
  HelpCircle,
  Sparkles,
  Edit3,
  Trash2,
  Edit,
  Clock,
  Filter
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import { mockDayActivities } from '../../data/mockData';

export default function AdminActivities() {
  const [activitiesMap, setActivitiesMap] = useState(mockDayActivities);
  const [selectedDay, setSelectedDay] = useState('day-5');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('video');
  const [duration, setDuration] = useState('15 mins');
  const [xp, setXp] = useState(80);
  const [isRequired, setIsRequired] = useState(true);

  const activities = activitiesMap[selectedDay] || [];

  const handleCreateActivity = (e) => {
    e.preventDefault();
    const newAct = {
      id: `act-${Date.now()}`,
      dayId: selectedDay,
      title,
      description,
      type,
      duration,
      xp: Number(xp),
      order: activities.length + 1,
      isRequired,
      status: 'pending',
    };

    setActivitiesMap((prev) => ({
      ...prev,
      [selectedDay]: [...(prev[selectedDay] || []), newAct],
    }));

    setIsModalOpen(false);
    setTitle('');
    setDescription('');
  };

  const handleDeleteActivity = (actId) => {
    if (window.confirm('Delete this activity module?')) {
      setActivitiesMap((prev) => ({
        ...prev,
        [selectedDay]: prev[selectedDay].filter((a) => a.id !== actId),
      }));
    }
  };

  const getTypeIcon = (t) => {
    switch (t) {
      case 'video':
        return <PlayCircle className="w-4 h-4 text-blue-600" />;
      case 'reading':
        return <BookOpen className="w-4 h-4 text-indigo-600" />;
      case 'quiz':
        return <HelpCircle className="w-4 h-4 text-purple-600" />;
      case 'challenge':
        return <Sparkles className="w-4 h-4 text-amber-600" />;
      case 'reflection':
        return <Edit3 className="w-4 h-4 text-emerald-600" />;
      default:
        return <CheckSquare className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Activity & Curriculum Master
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Author and assign learning modules, videos, articles, and interactive tasks to specific journey days
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={Plus}
          onClick={() => setIsModalOpen(true)}
        >
          Add New Activity
        </Button>
      </div>

      {/* Filter by Day */}
      <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-slate-200/80">
        <Filter className="w-4 h-4 text-slate-400" />
        <span className="text-xs font-bold text-slate-700">Select Milestone:</span>
        <select
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
          className="text-xs font-semibold rounded-xl border border-slate-200 py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
        >
          <option value="day-1">Day 1: Welcome to YARDI</option>
          <option value="day-2">Day 2: Understanding the Organization</option>
          <option value="day-3">Day 3: Culture & Values</option>
          <option value="day-4">Day 4: People & Teams</option>
          <option value="day-5">Day 5: Communication & Collaboration</option>
          <option value="day-6">Day 6: Workplace Tools</option>
        </select>
      </div>

      {/* Activities Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
                <th className="py-3.5 px-5">Type</th>
                <th className="py-3.5 px-4">Activity Title</th>
                <th className="py-3.5 px-4">Est. Time</th>
                <th className="py-3.5 px-4">XP Reward</th>
                <th className="py-3.5 px-4">Requirement</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {activities.map((act) => (
                <tr key={act.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(act.type)}
                      <span className="font-bold capitalize">{act.type}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 max-w-sm">
                    <div className="font-bold text-slate-900">{act.title}</div>
                    <div className="text-[10px] text-slate-400 line-clamp-1">{act.description}</div>
                  </td>
                  <td className="py-3.5 px-4">{act.duration}</td>
                  <td className="py-3.5 px-4 font-bold text-purple-600">+{act.xp} XP</td>
                  <td className="py-3.5 px-4">
                    <Badge variant={act.isRequired ? 'primary' : 'default'}>
                      {act.isRequired ? 'Mandatory' : 'Optional'}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <button
                      type="button"
                      onClick={() => handleDeleteActivity(act.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-slate-100 transition-colors"
                      title="Delete activity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Create Activity Modal */}
      {isModalOpen && (
        <Modal
          isOpen={true}
          onClose={() => setIsModalOpen(false)}
          title="Create New Learning Activity"
          maxWidth="max-w-lg"
        >
          <form onSubmit={handleCreateActivity} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Target Day</label>
              <select
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
                className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-300"
              >
                <option value="day-1">Day 1: Welcome to YARDI</option>
                <option value="day-2">Day 2: Understanding the Organization</option>
                <option value="day-3">Day 3: Culture & Values</option>
                <option value="day-4">Day 4: People & Teams</option>
                <option value="day-5">Day 5: Communication & Collaboration</option>
                <option value="day-6">Day 6: Workplace Tools</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-300 capitalize"
                >
                  <option value="video">Video</option>
                  <option value="reading">Reading</option>
                  <option value="quiz">Quiz</option>
                  <option value="challenge">Challenge</option>
                  <option value="reflection">Reflection</option>
                  <option value="checklist">Checklist</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">XP Points</label>
                <input
                  type="number"
                  value={xp}
                  onChange={(e) => setXp(e.target.value)}
                  className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-300"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Title</label>
              <input
                type="text"
                placeholder="e.g. Asynchronous Communication SOP"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
              <textarea
                rows={3}
                placeholder="Overview of the module..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Duration</label>
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-300"
                  required
                />
              </div>

              <div className="flex items-center pt-5">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                  <input
                    type="checkbox"
                    checked={isRequired}
                    onChange={(e) => setIsRequired(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <span>Mandatory for Day Completion</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm" icon={Plus}>
                Save Activity
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
