<template>
    <div>
        <Navbar />
        <div class="container mt-5">
            <h1 class="text-center">{{ isEditing ? 'Edit' : 'Create' }} User</h1>
            <form @submit.prevent="upsert" class="border rounded shadow p-5 mt-3">
                <div class="mb-3">
                    <label for="name" class="form-label">Name</label>
                    <input type="text" class="form-control" id="name" v-model="user.name" required>
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" class="form-control" id="email" v-model="user.email" required>
                </div>
                <div class="mb-3" v-if="!isEditing">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" id="password" v-model="user.password" required>
                </div>
                <div class="mb-3 form-check">
                    <input  type="checkbox" class="form-check-input" id="isAdmin" v-model="user.isAdmin">
                    <label class="form-check-label" for="isAdmin">Is Admin</label>
                </div>
                <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="isApprover" v-model="user.isApprover">
                    <label class="form-check-label" for="isApprover">Is Approver</label>
                </div>
                <button type="submit" class="btn btn-primary">{{ isEditing ? 'Edit' : 'Create' }} User</button>
            </form>
        </div>
    </div>
    <VueSpinnerHourglass v-if="loading" :size="100" :thickness="100" :color="'#42b883'" :speed="0.5"
    style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);" />
</template>

<script setup>
import Navbar from '@/components/Navbar.vue';
import { onMounted } from 'vue';
import api from '../services/api';
import { ref, defineProps } from 'vue';
import { useToast } from "vue-toastification";
import { useRouter } from 'vue-router';

const props = defineProps({
    id: {
        type: String,
        required: false
    }
});

const loading = ref(false); 
const isEditing = ref(false);

const user = ref({
    id: null,
    name: null,
    email: null,
    password: null,
    isAdmin: false,
    isApprover: false
});

const toast = useToast();
const router = useRouter();

const upsert = async () => {
    loading.value = true;
    try {
        if (isEditing.value) {
            await api.put(`admin/user/${props.id}`, user.value);
            if (user.status === 400 || user.status === 500) {
                toast.error('Error updating user');
            } else {
                toast.success('User updated successfully');
                router.push('/admin');
            }
        } else {
            const usercreated = await api.post('admin/user', user.value);
            if (usercreated.status === 400) {
                toast.error('User already exists');
            }
            else if (usercreated.status === 401 || usercreated.status === 500) {
                toast.error('Error creating user');
            }
             else {
                toast.success('User created successfully');
                router.push('/admin');
            }
        }
    } catch (error) {
        console.error(error);
    } finally {
        loading.value = false;
    }
}

onMounted(async () => {
    if (props.id) {
        isEditing.value = true;
    }

    if (isEditing.value) {
        loading.value = true;
        try {
            const userdb = await api.get(`admin/user/${props.id}`);
            user.value = userdb.data;
            console.log(user.value);
            
        } catch (error) {
            console.error(error);
        } finally {
            loading.value = false;
        }
    }
})


</script>