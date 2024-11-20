<script setup>
import Navbar from '@/components/Navbar.vue';
import router from '@/router';
import api from '../services/api';
import { useToast } from "vue-toastification";
</script>

<template>
    <Navbar />
    <div class="container">
        <h1>Code Review Creation</h1>
        <p>Fill the fields below and create a new code review.</p>
        <div class="form-floating mb-3">
            <input v-model="title" type="text" class="form-control" placeholder="Input Code Review Title" :disabled="loading">
            <label for="floatingInput">Code Review Title</label>
        </div>
        <div class="form-floating mb-3">
            <input v-model="description" type="text" class="form-control" placeholder="Input Code Review Description" :disabled="loading">
            <label for="floatingInput">Code Review Description</label>
        </div>
        <div v-for="(rule, index) in rules" :key="index" class="mt-3">
            <div class="accordion" :id="'accordion' + index">
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse"
                            :data-bs-target="'#collapse' + index" aria-expanded="true" :aria-controls="'collapse' + index">
                            {{ rule.ruleName && rule.ruleSet ? rule.ruleSet + ' - ' + rule.ruleName : 'Rule ' + (index + 1) }}
                        </button>
                    </h2>
                    <div :id="'collapse' + index" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" v-model="rule.ruleSet"
                                    placeholder="Input Rule Set" :disabled="loading">
                                <label for="floatingInput">Rule Set</label>
                            </div>
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" v-model="rule.ruleName"
                                    placeholder="Input Rule Name" :disabled="loading">
                                <label for="floatingInput">Rule Name</label>
                            </div>
                            <div class="form-floating mb-3">
                                <textarea class="form-control" placeholder="Leave a comment here" v-model="rule.oldCode"
                                    style="height: 200px" :disabled="loading"></textarea>
                                <label for="floatingTextarea2">Old Code</label>
                            </div>
                            <div class="form-floating mb-3">
                                <textarea class="form-control" placeholder="Leave a comment here" v-model="rule.newCode"
                                    style="height: 200px" :disabled="loading"></textarea>
                                <label for="floatingTextarea2">New Code</label>
                            </div>
                            <h2 v-if="rule.oldCode && rule.newCode">Code Visualization</h2>
                            <Diff class="border rounded" v-if="rule.oldCode && rule.newCode" :mode="'split'" :theme="'light'" :language="'xml'"
                                :prev="rule.oldCode" :current="rule.newCode" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-3">
            <button class="btn btn-primary" @click="addField" :disabled="loading">Add Changes</button>
            <button class="btn btn-danger mx-3" @click="removeField" :disabled="loading">Remove Last Change</button>
            <button class="btn btn-success" @click="submit" :disabled="loading">Submit</button>
        </div>
    </div>
    <VueSpinnerHourglass v-if="loading" :size="100" :thickness="100" :color="'#42b883'" :speed="0.5" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);" />
</template>

<script>
export default {
    name: 'CodeReviewCreationView',
    data() {
        return {
            rules: [{ oldCode: '', newCode: '', ruleSet: '', ruleName: '' }],
            description: '',
            title: '',
            loading: false,
            toast: useToast()
        }
    },
    methods: {
        addField() {
            this.rules.push({ oldCode: '', newCode: '', ruleSet: '', ruleName: '' });
        },
        removeField() {
            if (this.rules.length > 1) {
                this.rules.pop();
            }
        },
        setLoading(value) {
            this.loading = value;
        },
        async submit() {
            const pullRequest = {
                title: this.title,
                description: this.description,
                changes: this.rules
            }
            this.setLoading(true);
            try {
                await api.post('/code/pull-requests', pullRequest);
                toast.success("Code Review Created!", {
                    timeout: 2000
                });
                router.push('/');
            } catch (error) {
                toast.error("Error while creating Code Review", {
                    timeout: 2000
                });
                console.error(error);
            } finally {
            this.setLoading(false);
            }
        }
    },

}
</script>