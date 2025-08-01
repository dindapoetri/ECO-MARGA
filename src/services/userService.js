import { api } from './api';

export const userService = {
  getProfile: api.user.getProfile,
  updateProfile: api.user.updateProfile,
  getStats: api.user.getStats
};