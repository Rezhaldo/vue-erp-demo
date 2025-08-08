import { createRouter, createWebHistory } from "vue-router";
import { authenticationRoutes } from "./modules/authentication";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        ...authenticationRoutes,
        { path: "/:pathMatch(.*)*", redirect: "/authentication/login" },
    ],
});

export default router;
