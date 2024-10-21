<template>
  <div class="d-flex align-items-center" style="height: 100vh;">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-6 mx-auto p-5 rounded border shadow">
          <h2>Iniciar Sesión</h2>
          <form @submit.prevent="handleSubmit">
            <div>
              <label class="form-label">Email:</label>
              <input class="form-control" type="email" v-model="email" required />
            </div>
            <div>
              <label form="form-label">Contraseña:</label>
              <input class="form-control" type="password" v-model="password" required />
            </div>
            <button type="submit" class="btn btn-primary mt-3">Iniciar Sesión</button>
          </form>
          <p v-if="error" style="color: red;">{{ error }}</p>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { ref } from 'vue';
import { useAuth } from '../composables/useAuth';
import { useRouter } from 'vue-router';

export default {
  name: 'Login',
  setup() {
    const email = ref('');
    const password = ref('');
    const error = ref('');
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async () => {
      try {
        await login(email.value, password.value);
        router.push('/');
      } catch (err) {
        error.value = err.response?.data?.mensaje || 'Error al iniciar sesión';
      }
    };

    return {
      email,
      password,
      error,
      handleSubmit,
    };
  },
};
</script>

<style scoped>
/* Estilos específicos de la vista */
</style>