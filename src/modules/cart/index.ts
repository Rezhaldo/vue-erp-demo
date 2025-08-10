import MainLayout from "../../layout/MainLayout.vue";
import { CartPage } from "./pages/cart-list";
import { CheckoutPage } from "./pages/check-out";

export const cartRoutes = [
  {
    path: "/cart",
    component: MainLayout,
    children: [
      { path: "", name: "cart", component: CartPage },
      { path: "checkout", name: "checkout", component: CheckoutPage },
    ],
  },
];
