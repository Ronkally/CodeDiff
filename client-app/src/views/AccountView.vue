<template>
    <Navbar />
    <div class="container">
        <div id="app" class="container my-4">
            <div class="card">
                <div class="card-header text-center">
                    <h4 class="mb-0">Account Information </h4>
                </div>
                <div class="card-body">
                    <div class="row mb-3">
                        <div class="col-md-8">
                            <h5 class="my-3"><strong>Name: </strong>{{ user.name }}</h5>
                            <p><strong>Email:</strong> {{ user.email }}</p>
                            <p><strong>Roles:</strong> {{ user.isApprover ? 'Approver' : ""}}{{ user.isApprover && user.isAdmin ? ", " : "" }}{{  user.isAdmin ? 'Admin' : ""  }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue';
const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

</script>