import Vue from 'vue'
import VueRouter from 'vue-router'
import Navbar from '@/components/NavBar.vue'


Vue.use(VueRouter)

const routes = [{
        path: '/',
        component: Navbar,
        children: [{
                path: '',
                name: 'home',
                component: () =>
                    import ('../views/Home.vue'),
                beforeEnter(to, from, next) {
                    if (sessionStorage.getItem("Authorization") == null) {
                        next({ path: "/login" })
                    } else {
                        next();
                    }
                }
            },
            {
                path: '/patients',
                name: 'patients',
                component: () =>
                    import ('../views/Patients.vue'),
                beforeEnter(to, from, next) {
                    if (sessionStorage.getItem("Authorization") == null) {
                        next({ path: "/login" })
                    } else {
                        next();
                    }
                }

            },
            {
                path: '/providers',
                name: 'providers',
                component: () =>
                    import ('../views/Providers.vue'),
                beforeEnter(to, from, next) {
                    if (sessionStorage.getItem("Authorization") == null) {
                        next({ path: "/login" })
                    } else {
                        next();
                    }
                }
            },
            {
                path: '/settings',
                name: 'settings',
                component: () =>
                    import ('../views/Settings.vue'),
                beforeEnter(to, from, next) {
                    if (sessionStorage.getItem("Authorization") == null) {
                        next({ path: "/login" })
                    } else {
                        next();
                    }
                }
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () =>
            import ('../views/Login.vue')
    },
    {
        path: '/signup',
        name: 'signup',
        component: () =>
            import ('../views/SignUp.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router