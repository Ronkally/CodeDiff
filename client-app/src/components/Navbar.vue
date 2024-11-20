<template>
    <nav class="navbar bg-dark  navbar-expand-lg bg-body-tertiary px-5" data-bs-theme="dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="/">CodeDiff</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="/">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/codereviews">Code Reviews</a>
                    </li>
                </ul>
            </div>
            <div class="d-flex align-content-end ">
                <div class="dropdown">
                    <a class="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        My Account
                    </a>

                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="/account">Account</a></li>
                        <li v-if="isAdmin"><a class="dropdown-item" href="/admin">Admin Panel</a></li>
                        <li><a class="dropdown-item" href="/logout">Logout</a></li>                        
                    </ul>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'Navbar'
}
</script>

<script setup>
import { useAuth } from '@/composables/useAuth';
const { isAdmin }  = useAuth();
</script>