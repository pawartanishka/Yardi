import api from './api';

export const journeyService = {
  getAllDays: async () => {
    const res = await api.get('/journey');
    return res.data;
  },

  getDayDetails: async (dayId) => {
    const res = await api.get(`/journey/${dayId}`);
    return res.data;
  },

  getActivity: async (activityId) => {
    const res = await api.get(`/activities/${activityId}`);
    return res.data;
  },

  completeActivity: async (activityId) => {
    const res = await api.post(`/activities/${activityId}/complete`);
    return res.data;
  },

  submitQuiz: async (quizId, answers) => {
    const res = await api.post(`/quizzes/${quizId}/submit`, { answers });
    return res.data;
  },

  getBadges: async () => {
    const res = await api.get('/badges/me');
    return res.data;
  },

  getNotifications: async () => {
    const res = await api.get('/notifications');
    return res.data;
  },

  markNotificationRead: async (notifId) => {
    const res = await api.put(`/notifications/${notifId}/read`);
    return res.data;
  },
};

export default journeyService;
