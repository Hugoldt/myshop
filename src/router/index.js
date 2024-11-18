import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import axios from 'axios';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/admin',
      name: 'Admin',
      component: () => import('../views/AdminView.vue'),
      children: [
        {
          path: '/products',
          name: 'Products',
          component: () => import('../views/Products.vue'),
        },
        {
          path: '/categories',
          name: 'Categories',
          component: () => import('../views/Categories.vue'),
        },
        {
          path: '/users',
          name: 'Users',
          component: () => import('../views/Users.vue'),
        },
      ],
      meta: { requiresAuth: true },
    },
      {
        path: '/products/:id',
        name: 'product-details',
        component: () => import('../components/ProductDetails.vue'),
      }
  ]
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = checkAuthentication();
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !isAuthenticated) {
    alert("Access unauthorized")
    next('/login'); 
  } else {
    next(); 
  }
});

function checkAuthentication() {
  const token = axios.defaults.headers.common['Authorization'];
  if (token && token.startsWith('Bearer ')) {
    const tokenValue = token.split(' ')[1];
    return true;
  }
  return false; 
}


export default router
