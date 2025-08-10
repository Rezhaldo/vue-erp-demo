import MainLayout from "../../layout/MainLayout.vue";
import { ShopPage } from "./pages/shop-list";

export const shopRoutes = [
  {
    path: "/shop",
    component: MainLayout,
    children: [{ path: "", name: "shop", component: ShopPage }],
  },
];
