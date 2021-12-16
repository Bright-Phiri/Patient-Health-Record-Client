import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [{
        path: "/",
        name: "Home",
        component: Home,
        beforeEnter(to, from, next) {
            if (sessionStorage.getItem("Authorization") == null) {
                next({ path: "/login" })
            } else {
                next();
            }
        }
    },
    {
        path: "/addpatient",
        name: "add",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ("../views/AddPatient.vue"),
        beforeEnter(to, from, next) {
            if (sessionStorage.getItem("Authorization") == null) {
                next({ path: "/login" })
            } else {
                next();
            }
        }
    }, {
        path: "/viewpatients",
        name: "view",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ("../views/ViewPatients.vue"),
        beforeEnter(to, from, next) {
            if (sessionStorage.getItem("Authorization") == null) {
                next({ path: "/login" })
            } else {
                next();
            }
        }
    },
    {
        path: "/viewproviders",
        name: "providers",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ("../views/ViewProviders.vue"),
        beforeEnter(to, from, next) {
            if (sessionStorage.getItem("Authorization") == null) {
                next({ path: "/login" })
            } else {
                next();
            }
        }
    }, {
        path: "/login",
        name: "login",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ("../views/Login.vue"),
    },
    {
        path: "/signup",
        name: "signup",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ("../views/SignUp.vue"),
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;