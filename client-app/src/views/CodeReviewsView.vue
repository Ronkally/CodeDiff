<template>
    <Navbar />
    <div class="container mt-5">
        <h1>Code Reviews</h1>
        <a class="btn btn-primary my-3" href="/create-code-review">Create Code Review</a>
        <VueTableLite :is-slot-mode="true" :is-loading="table.isLoading" :columns="table.columns" :rows="table.rows"
            :total="table.totalRecordCount" :sortable="table.sortable" :messages="table.messages"
            @is-finished="table.isLoading = false" @row-clicked="redirectToCodeReview" class="hover">
            <template v-slot:isApproved="data">
                {{ data.value.isApproved ? 'Approved' : 'Pending' }}
            </template>
            <template v-slot:actions="data">
                <button class="btn btn-primary">View Code Review</button>
            </template>
        </VueTableLite>
    </div>
</template>

<script>
export default {
    name: 'CodeReviewsView',
}
</script>

<script setup>
import Navbar from '@/components/Navbar.vue';
import VueTableLite from "vue3-table-lite";
import { onMounted, reactive } from 'vue';
import api from '../services/api';
import { useRouter } from 'vue-router';

const router = useRouter();
const table = reactive({
    isLoading: false,
    columns: [
        {
            label: "Title",
            field: "title",
            width: "3%",
            sortable: true,
        },
        {
            label: "Created By",
            field: "author",
            width: "3%",
            sortable: true,
        },
        {
            label: "Status",
            field: "isApproved",
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

const redirectToCodeReview = (row) => {
    router.push('/codereview/'+row.id);
}

onMounted(async () => {
    table.isLoading = true;
    try {
        const response = await api.get('/code/pull-requests');
        table.rows = response.data;
        table.totalRecordCount = response.data.length;
    } catch (error) {
        console.error(error);
    } finally {
        table.isLoading = false;
    }
});
</script>

<style lang="css" scoped>
 .hover {
    cursor: pointer !important;
 }
</style>