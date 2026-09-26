import React, { useState } from 'react';
import {
  Calendar,
  Plus,
  Edit,
  Trash2,
  Lock,
  Unlock,
  Sparkles,
  Clock,
  CheckCircle2,
  Save,
  X
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import { useJourney } from '../../context/JourneyContext';

export default function AdminJourney() {
  const { days, setDays } = useJourney();
  const [editingDay, setEditingDay] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // New day form state
  const [dayNumber, setDayNumber] = useState(days.length + 1);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('45 mins');
  const [xp, setXp] = useState(350);

  const handleEditClick = (day) => {
    setEditingDay({ ...day });
  };

  const handleSaveEdit = () => {
    setDays((prev) =>
      prev.map((d) => (d.id === editingDay.id ? editingDay : d))
    );
    setEditingDay(null);
  };

  const handleToggleLock = (dayId) => {
    setDays((prev) =>
      prev.map((d) => {
        if (d.id === dayId) {
          const newStatus = d.status === 'locked' ? 'available' : 'locked';
          return { ...d, status: newStatus };
        }
        return d;
      })
    );
  };

  const handleDeleteDay = (dayId) => {
    if (window.confirm('Are you sure you want to delete this milestone?')) {
      setDays((prev) => prev.filter((d) => d.id !== dayId));
    }
  };

  const handleCreateDay = (e) => {
    e.preventDefault();
    const newDay = {
      id: `day-${dayNumber}`,
      dayNumber: Number(dayNumber),
      title,
      description,
      estimatedTime,
      xp: Number(xp),
      status: 'locked',
      activitiesCount: 4,
      completedCount: 0,
      order: Number(dayNumber),
    };

    setDays((prev) => [...prev, newDay]);
    setIsCreateModalOpen(false);
    setTitle('');
    setDescription('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            15-Day Journey Architecture
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Configure daily curriculum, milestone titles, duration, and XP rewards
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={Plus}
          onClick={() => {
            setDayNumber(days.length + 1);
            setIsCreateModalOpen(true);
          }}
        >
          Add Milestone Day
        </Button>
      </div>

      {/* Days Table Card */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
                <th className="py-3.5 px-5">Day #</th>
                <th className="py-3.5 px-4">Milestone Title & Description</th>
                <th className="py-3.5 px-4">Duration</th>
                <th className="py-3.5 px-4">XP Reward</th>
                <th className="py-3.5 px-4">Default Status</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {days.map((day) => (
                <tr key={day.id || day.dayNumber} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-5 font-bold text-blue-600">
                    Day {day.dayNumber}
                  </td>
                  <td className="py-3.5 px-4 max-w-md">
                    <div className="font-bold text-slate-900">{day.title}</div>
                    <div className="text-[10px] text-slate-400 line-clamp-1">{day.description}</div>
                  </td>
                  <td className="py-3.5 px-4">{day.estimatedTime}</td>
                  <td className="py-3.5 px-4 font-bold text-purple-600">+{day.xp} XP</td>
                  <td className="py-3.5 px-4">
                    <Badge variant={day.status === 'completed' ? 'success' : day.status === 'current' ? 'primary' : day.status === 'available' ? 'warning' : 'default'}>
                      {day.status}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleToggleLock(day.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-slate-100 transition-colors"
                        title="Toggle Lock/Unlock"
                      >
                        {day.status === 'locked' ? (
                          <Lock className="w-4 h-4 text-slate-400" />
                        ) : (
                          <Unlock className="w-4 h-4 text-emerald-600" />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleEditClick(day)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-slate-100 transition-colors"
                        title="Edit day details"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteDay(day.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-slate-100 transition-colors"
                        title="Delete milestone"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Edit Day Modal */}
      {editingDay && (
        <Modal
          isOpen={true}
          onClose={() => setEditingDay(null)}
          title={`Edit Day ${editingDay.dayNumber} Milestone`}
          maxWidth="max-w-lg"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Title</label>
              <input
                type="text"
                value={editingDay.title}
                onChange={(e) => setEditingDay({ ...editingDay, title: e.target.value })}
                className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
              <textarea
                rows={3}
                value={editingDay.description}
                onChange={(e) => setEditingDay({ ...editingDay, description: e.target.value })}
                className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Est. Duration</label>
                <input
                  type="text"
                  value={editingDay.estimatedTime}
                  onChange={(e) => setEditingDay({ ...editingDay, estimatedTime: e.target.value })}
                  className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">XP Points</label>
                <input
                  type="number"
                  value={editingDay.xp}
                  onChange={(e) => setEditingDay({ ...editingDay, xp: Number(e.target.value) })}
                  className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-300"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <Button variant="ghost" size="sm" onClick={() => setEditingDay(null)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" icon={Save} onClick={handleSaveEdit}>
                Save Changes
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Create Day Modal */}
      {isCreateModalOpen && (
        <Modal
          isOpen={true}
          onClose={() => setIsCreateModalOpen(false)}
          title="Create New Milestone Day"
          maxWidth="max-w-lg"
        >
          <form onSubmit={handleCreateDay} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Day Number</label>
                <input
                  type="number"
                  value={dayNumber}
                  onChange={(e) => setDayNumber(e.target.value)}
                  className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-300"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">XP Reward</label>
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
              <label className="block text-xs font-bold text-slate-700 mb-1">Milestone Title</label>
              <input
                type="text"
                placeholder="e.g. Workplace Security & Compliance"
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
                placeholder="Overview of this day's learning goals..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Estimated Duration</label>
              <input
                type="text"
                value={estimatedTime}
                onChange={(e) => setEstimatedTime(e.target.value)}
                className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-300"
                required
              />
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <Button variant="ghost" size="sm" onClick={() => setIsCreateModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm" icon={Plus}>
                Create Milestone
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
