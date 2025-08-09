import MainLayout from '../../layout/MainLayout.vue';
import { CartPage } from './pages/cart-list';

export const cartRoutes = [
  {
    path: "/cart",
    component: MainLayout,
    children: [
      { path: "", name: "cart", component: CartPage },
    ],
  },
];