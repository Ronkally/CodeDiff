import { defineStore } from 'pinia';
import api from '../services/api';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: localStorage.getItem('user') || null,
    isAuthenticated: !!localStorage.getItem('token'),
    isAdmin: !!localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).isAdmin : false,
    isApprover: !!localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).isApprover : false
  }),
  actions: {
    async login(email, password) {
      try {
        const response = await api.post('/auth/login', { email, password });
        this.token = response.data.token;
        this.user = response.data.user;
        this.isAuthenticated = true;
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        this.isAdmin = JSON.stringify(response.data.user.isAdmin);
        this.isApprover = JSON.stringify(response.data.user.isApprover);
      } catch (error) {
        throw error;
      }
    },
    async register(email, password, nombre) {
      try {
        const response = await api.post('/auth/register', { email, password, nombre });
        this.token = response.data.token;
        this.isAuthenticated = true;
        localStorage.setItem('token', response.data.token);
      } catch (error) {
        throw error;
      }
    },
    logout() {
      this.token = null;
      this.isAuthenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
});