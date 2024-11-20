import { useAuthStore } from '../stores/auth';

export const useAuth = () => {
  const authStore = useAuthStore();

  const login = async (email, password) => {
    await authStore.login(email, password);
  };

  const register = async (email, password, nombre) => {
    await authStore.register(email, password, nombre);
  };

  const logout = () => {
    authStore.logout();
  };

  return {
    token: authStore.token,
    isAuthenticated: authStore.isAuthenticated,
    isApprover: authStore.isApprover,
    isAdmin: authStore.isAdmin,
    login,
    register,
    logout,
  };
};