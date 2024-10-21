<template>
    <div v-if="isAuthenticated">
      <slot />
    </div>
    <div v-else>
      <p>Autenticación requerida para acceder a esta página.</p>
      <router-link to="/login">Ir al Login</router-link>
    </div>
  </template>
  
  <script>
  import { computed } from 'vue';
  import { useAuthStore } from '../stores/auth';
  
  export default {
    name: 'ProtectedRoute',
    setup() {
      const authStore = useAuthStore();
      const isAuthenticated = computed(() => authStore.isAuthenticated);
  
      return {
        isAuthenticated,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Estilos específicos del componente */
  </style>