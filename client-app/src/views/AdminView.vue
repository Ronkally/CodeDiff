<template>
    <Navbar />
    <div class="container mt-5">
        <h1>Users Management</h1>
        <a class="btn btn-primary my-3" href="/admin/create-user">Create new user</a>
        <VueTableLite :is-slot-mode="true" :is-loading="table.isLoading" :columns="table.columns" :rows="table.rows"
            :total="table.totalRecordCount" :sortable="table.sortable" :messages="table.messages"
            @is-finished="table.isLoading = false" class="hover">
            <template v-slot:isApproved="data">
                {{ data.value.isApproved ? 'Approved' : 'Pending' }}
            </template>
            <template v-slot:actions="data">
                <button class="btn btn-primary" @click="redirectToEdit(data.value)">Update</button>
                <button class="btn btn-danger m-2" data-bs-toggle="modal" data-bs-target="#deleteModal" @click="setUserToDelete(data.value)">Delete</button>
            </template>
        </VueTableLite>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Are you sure you want to delete this user?</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    This user will not longer have access to the system
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
                    <button type="button" @click="deleteUser" data-bs-dismiss="modal" class="btn btn-danger">Yes</button>
                </div>
            </div>
        </div>
    </div>

    <VueSpinnerHourglass v-if="loading" :size="100" :thickness="100" :color="'#42b883'" :speed="0.5"
    style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);" />
</template>

<script>
export default {
    name: 'AdminView',
}
</script>

<script setup>
import Navbar from '@/components/Navbar.vue';
import VueTableLite from "vue3-table-lite";
import { onMounted, reactive, ref } from 'vue';
import api from '../services/api';
import { useRouter } from 'vue-router';
import { useToast } from "vue-toastification";

const toast = useToast();
const loading = ref(false); 
const userToDelete = ref(null);

const router = useRouter();
const table = reactive({
    isLoading: false,
    columns: [
        {
            label: "Id",
            field: "id",
            width: "1%",
            sortable: true,
        },
        {
            label: "FullName",
            field: "name",
            width: "3%",
            sortable: true,
        },
        {
            label: "Email",
            field: "email",
            width: "3%",
            sortable: true,
        },
        {
            label: "Roles",
            field: "roles",
            width: "1%",
            sortable: true,
        },
        {
            label: "Actions",
            field: "actions",
            width: "1%",
            sortable: false,
        },
    ],
    rows: [],
    totalRecordCount: 0,
    sortable: {
        order: "id",
        sort: "asc",
    },
});

const setUserToDelete = (row) => {
    userToDelete.value = row;
}

const deleteUser = async () => {
    try {
        loading.value = true;
        await api.delete('/admin/user/' + userToDelete.value.id);
        table.rows = table.rows.filter(row => row.id !== userToDelete.value.id);
    } catch (error) {
        console.error(error);
    }
    finally {
        loading.value = false;
        toast.success("User deleted successfully!", {
            timeout: 2000
        });
    }
}

const redirectToEdit = (row) => {
    router.push('/admin/edit-user/' + row.id);
}

const redirectToCodeReview = (row) => {
    router.push('/codereview/' + row.id);
}

onMounted(async () => {
    table.loading = true;
    loading.value = true;
    try {
        const response = await api.get('/admin/user');
        table.rows = response.data;
        table.totalRecordCount = response.data.length;
    } catch (error) {
        console.error(error);
    } finally {
        table.isLoading = false;
        loading.value = false;
    }
});
</script>