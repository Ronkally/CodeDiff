<template>
    <Navbar />
    <div class="container mt-5">
        <div v-if="codeReview">
            <div class="card">
                <h5 class="card-header text-center">{{ codeReview.title }}</h5>
                <div class="card-body">
                    <h5 class="card-title">Created by: {{ codeReview.author.name }}</h5>
                    <h5 class="card-title">Status: {{ isApproved ? 'Approved by ' + approver.name : 'Not Reviewed' }}</h5>
                    <h5 class="card-title">Description:</h5>
                    <p class="card-text">{{ codeReview.description }}</p>
                    <div v-for="(change, index) in codeReview.changes" class="mt-3">
                        <div class="accordion" :id="index">
                            <div class="accordion-item">
                                <h5 class="accordion-header">
                                    <button class="accordion-button" type="button" data-bs-toggle="collapse"
                                        :data-bs-target="'#collapse' + index" aria-expanded="true"
                                        :aria-controls="'collapse' + index">
                                        {{ change.change.ruleSet + ' - ' + change.change.ruleName }}
                                    </button>
                                    <div :id="'collapse' + index" :class="`accordion-collapse collapse ${ index === 0 ? 'show' : '' }`"
                                        data-bs-parent="#accordionExample">
                                        <Diff v-if="change.change.oldCode && change.change.newCode" :mode="'split'"
                                            :theme="'light'" :language="'xml'" :prev="change.change.oldCode"
                                            :current="change.change.newCode" />
                                    </div>
                                </h5>
                            </div>
                        </div>
                    </div>
                    <div v-if="isAdmin || isApprover" class="d-flex justify-content-center mt-3">
                        <button :disabled="isApproved" class="btn btn-success" @click="approveCodeReview">Approve Code Review</button>
                    </div>
                </div>
            </div>
        </div>
        <div v-else-if="!codeReview && !loading">
            <p>Code review not found</p>
        </div>
    </div>
    <VueSpinnerHourglass v-if="loading" :size="100" :thickness="100" :color="'#42b883'" :speed="0.5"
        style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);" />
</template>

<script>
export default {
    name: 'CodeReview',
}
</script>

<script setup>
import Navbar from '@/components/Navbar.vue';
import { ref, onMounted } from 'vue';
import api from '../services/api';
import { useToast } from "vue-toastification";
import { useAuth } from '@/composables/useAuth';

const { isAdmin, isApprover } = useAuth();

const props = defineProps({
    id: {
        type: String,
        required: true
    }
})

const codeReview = ref(null);
const loading = ref(false);
const isApproved = ref(false);
const toast = useToast();
const approver = ref(null);

onMounted(async () => {
    try {
        loading.value = true;
        const changes = await api.get(`/code/pull-requests/${props.id}`);
        codeReview.value = changes.data.pullRequest;
        isApproved.value = changes.data.pullRequest.isApproved;
        approver.value = changes.data.pullRequest.approver;
    } catch (error) {
        console.error(error);
    } finally {
        loading.value = false;
    }
});

const approveCodeReview = async () => {
    try {
        loading.value = true;
        await api.put(`/code/pull-requests/${props.id}`);
        isApproved.value = true;
        approver.value = JSON.parse(localStorage.getItem('user'));
        toast.success("Code Review Approved!", {
          timeout: 2000
        });
    } catch (error) {
        console.error(error);
    } finally {
        loading.value = false;
    }
}
</script>
