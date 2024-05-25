import { createRouter, createWebHistory, RouteLocationNormalized, RouteRecordRaw } from "vue-router";
import authTokenCache from "@/cache/auth-token.cache.ts";
import Home from "@/pages/Home.vue";
import Products from "@/pages/Products.vue";
import NotFound from "@/pages/NotFound.vue";
import Login from "@/pages/Auth/Login.vue";
import Register from "@/pages/Auth/Register.vue";
import Default from "@/layouts/Default.vue";

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Main',
        component: Default,
        children: [
            {
                path: '',
                name: 'Home',
                component: Home,
            },
            {
                path: 'products',
                name: 'Products',
                component: Products,
            },
            {
                path: '/:catchAll(.*)',
                name: 'NotFound',
                component: NotFound,
            },
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to: RouteLocationNormalized, _: RouteLocationNormalized, next: Function) => {
    const publicPages = ['/login', '/register'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = authTokenCache.get();

    if (authRequired && !loggedIn) {
        return next('/login');
    }

    if(loggedIn && (to.path === '/login' || to.path === '/register')) {
        return next('/');
    }

    next();
});

export default router;