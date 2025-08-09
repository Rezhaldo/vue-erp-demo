import { createRouter, createWebHistory } from "vue-router";
import { authenticationRoutes } from "./modules/authentication";
import { cartRoutes } from './modules/cart';
import { dashboardRoutes } from "./modules/dashboard";
import { orderRoutes } from './modules/order';
import { productdRoutes } from "./modules/products";
import { shopRoutes } from "./modules/shop";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        ...authenticationRoutes,
        ...dashboardRoutes,
        ...productdRoutes,
        ...shopRoutes,
        ...cartRoutes,
        ...orderRoutes,
        { path: "/:pathMatch(.*)*", redirect: "/authentication/login" },
    ],
});

export default router;
