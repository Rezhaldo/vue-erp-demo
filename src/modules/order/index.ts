import MainLayout from '../../layout/MainLayout.vue';
import { OrderPage } from './pages/order-list';

export const orderRoutes = [
  {
    path: "/order",
    component: MainLayout,
    children: [
      { path: "", name: "order", component: OrderPage },
    ],
  },
];