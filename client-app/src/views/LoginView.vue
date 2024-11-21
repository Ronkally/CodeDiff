<template>
  <div class="d-flex align-items-center" style="height: 100vh;">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-6 mx-auto p-5 rounded border shadow">
          <h2>Log in</h2>
          <form @submit.prevent="handleSubmit">
            <div>
              <label class="form-label">Email:</label>
              <input :disabled="loading" class="form-control" type="email" v-model="email" required />
            </div>
            <div>
              <label form="form-label">Password:</label>
              <input :disabled="loading" class="form-control" type="password" v-model="password" required />
            </div>
            <button type="submit" :disabled="loading" class="btn btn-primary mt-3">Log in</button>
          </form>
          <p v-if="error" style="color: red;">{{ error }}</p>
        </div>
      </div>
    </div>
  </div>
  <VueSpinnerHourglass v-if="loading" :size="100" :thickness="100" :color="'#42b883'" :speed="0.5" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);" />
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth';
import { useToast } from "vue-toastification";

export default {
  name: 'Login',
  setup() {
    const email = ref('');
    const password = ref('');
    const error = ref('');
    const loading = ref(false);
    const { login } = useAuth();
    const router = useRouter();
    const toast = useToast();

    const handleSubmit = async () => {
      loading.value = true;
      error.value = '';
      try {
        await login(email.value, password.value);
        toast.success("Login Succesful", {
          timeout: 2000
        });
        router.push('/');
      } catch (err) {
        error.value = err.response?.data?.mensaje || 'Error al iniciar sesión';
        toast.error("Please check your credentials", {
          timeout: 2000
        });
      } finally {
        loading.value = false;
      }
    };

    return {
      email,
      password,
      error,
      loading,
      handleSubmit,
    };
  }
};
</script>