import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import { useAuthStore } from '../stores/auth';
import CodeReviewCreationView from '@/views/CodeReviewCreationView.vue';
import CodeReviewView from '@/views/CodeReviewView.vue';
import CodeReviewsView from '@/views/CodeReviewsView.vue';
import AdminView from '@/views/AdminView.vue';
import AdminUpsertView from '@/views/AdminUpsertView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/create-code-review',
      name: 'CreateCodeReview',
      component: CodeReviewCreationView,
      meta: { requiresAuth: true },
    },
    {
      name: "CodeReviewsView", 
      path: "/codereviews", 
      component: CodeReviewsView,
      meta: { requiresAuth: true },
      props: true  
    },
    {
      name: "CodeReview", 
      path: "/codereview/:id", 
      component: CodeReviewView,
      meta: { requiresAuth: true },
      props: true  
    },
    {
      name: "AdminView", 
      path: "/admin", 
      component: AdminView,
      meta: { requiresAuth: true },
      props: true  
    },
    {
      name: "CreateUser", 
      path: "/admin/create-user", 
      component: AdminUpsertView,
      meta: { requiresAuth: true },
    },
    {
      name: "EditUser", 
      path: "/admin/edit-user/:id", 
      component: AdminUpsertView,
      meta: { requiresAuth: true },
      props: true
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView 
    },
    {
      path: '/logout',
      name: 'logout',
      beforeEnter (to, from, next) {
        const authStore = useAuthStore();
        authStore.logout();
        next({ name: 'Login' });
      }
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router
