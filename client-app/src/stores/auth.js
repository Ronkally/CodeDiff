import { defineStore } from 'pinia';
import api from '../services/api';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token'),
  }),
  actions: {
    async login(email, password) {
      try {
        const response = await api.post('/auth/login', { email, password });
        this.token = response.data.token;
        this.isAuthenticated = true;
        localStorage.setItem('token', response.data.token);
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
    },
  },
});