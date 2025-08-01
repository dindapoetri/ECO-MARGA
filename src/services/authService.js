import { api } from "./api";

export const authService = {
  login: api.auth.login,
  register: api.auth.register,
  logout: api.auth.logout,
  verifyToken: api.auth.verifyToken,
};
