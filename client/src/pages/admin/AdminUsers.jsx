import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  MoreVertical,
  Shield,
  Eye,
  ToggleLeft,
  ToggleRight,
  Mail,
  UserCheck
} from 'lucide-react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import { mockAdminStats } from '../../data/mockData';

export default function AdminUsers() {
  const [usersList, setUsersList] = useState(mockAdminStats.recentUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedUserModal, setSelectedUserModal] = useState(null);

  const filteredUsers = usersList.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept =
      selectedDepartment === 'all' || u.department === selectedDepartment;
    return matchesSearch && matchesDept;
  });

  const toggleUserStatus = (userId) => {
    setUsersList((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const newStatus = u.status === 'active' ? 'inactive' : 'active';
          return { ...u, status: newStatus };
        }
        return u;
      })
    );
  };

  const departments = ['all', ...new Set(usersList.map((u) => u.department))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            User & Learner Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage onboarding access, review milestones, and monitor cohort progress
          </p>
        </div>

        <div className="text-xs text-slate-500 font-semibold bg-white border border-slate-200 px-3 py-2 rounded-xl">
          Total Registered: <span className="font-bold text-slate-800">{usersList.length} Learners</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="text-xs rounded-xl border border-slate-200 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept === 'all' ? 'All Departments' : dept}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* User Table Card */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
                <th className="py-3.5 px-5">Name & Email</th>
                <th className="py-3.5 px-4">Department</th>
                <th className="py-3.5 px-4">Role</th>
                <th className="py-3.5 px-4">Current Milestone</th>
                <th className="py-3.5 px-4">Progress</th>
                <th className="py-3.5 px-4">XP</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-5">
                    <div className="font-bold text-slate-900">{user.name}</div>
                    <div className="text-[10px] text-slate-400 font-normal">{user.email}</div>
                  </td>
                  <td className="py-3.5 px-4">{user.department}</td>
                  <td className="py-3.5 px-4">
                    <Badge variant={user.role === 'admin' ? 'purple' : 'default'}>
                      {user.role}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-blue-600">
                    Day {user.currentDay} / 15
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-blue-600 h-full rounded-full"
                          style={{ width: `${user.progress}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-bold">{user.progress}%</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-purple-600">
                    {user.xp.toLocaleString()} XP
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge variant={user.status === 'completed' ? 'success' : user.status === 'active' ? 'primary' : 'danger'}>
                      {user.status}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedUserModal(user)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-slate-100 transition-colors"
                        title="View user details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleUserStatus(user.id)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          user.status === 'active'
                            ? 'text-emerald-600 hover:bg-emerald-50'
                            : 'text-slate-400 hover:bg-slate-100'
                        }`}
                        title="Toggle Active Status"
                      >
                        {user.status === 'active' ? (
                          <ToggleRight className="w-5 h-5" />
                        ) : (
                          <ToggleLeft className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* User Details Modal */}
      {selectedUserModal && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedUserModal(null)}
          title={`Learner Dossier: ${selectedUserModal.name}`}
          subtitle={selectedUserModal.email}
          maxWidth="max-w-md"
        >
          <div className="space-y-4">
            <div className="bg-slate-50 p-4 rounded-2xl space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Department</span>
                <span className="font-bold text-slate-800">{selectedUserModal.department}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Current Day</span>
                <span className="font-bold text-blue-600">Day {selectedUserModal.currentDay} of 15</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Overall Progress</span>
                <span className="font-bold text-slate-800">{selectedUserModal.progress}% Completed</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Total Experience</span>
                <span className="font-bold text-purple-600">{selectedUserModal.xp} XP</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Account Status</span>
                <Badge variant={selectedUserModal.status === 'active' ? 'primary' : 'default'}>
                  {selectedUserModal.status}
                </Badge>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button variant="outline" size="sm" onClick={() => setSelectedUserModal(null)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
