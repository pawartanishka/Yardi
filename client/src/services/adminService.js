import api from './api';

export const adminService = {
  getUsers: async (params) => {
    const res = await api.get('/admin/users', { params });
    return res.data;
  },

  getAnalytics: async () => {
    const res = await api.get('/admin/analytics');
    return res.data;
  },

  createDay: async (dayData) => {
    const res = await api.post('/admin/days', dayData);
    return res.data;
  },

  updateDay: async (dayId, dayData) => {
    const res = await api.put(`/admin/days/${dayId}`, dayData);
    return res.data;
  },

  deleteDay: async (dayId) => {
    const res = await api.delete(`/admin/days/${dayId}`);
    return res.data;
  },

  createActivity: async (activityData) => {
    const res = await api.post('/admin/activities', activityData);
    return res.data;
  },

  deleteActivity: async (activityId) => {
    const res = await api.delete(`/admin/activities/${activityId}`);
    return res.data;
  },

  createQuiz: async (quizData) => {
    const res = await api.post('/admin/quizzes', quizData);
    return res.data;
  },
};

export default adminService;
