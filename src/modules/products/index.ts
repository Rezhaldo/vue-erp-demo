import MainLayout from '../../layout/MainLayout.vue';
import { ProductPage } from './pages/product-page/';

export const productdRoutes = [
  {
    path: "/products",
    component: MainLayout,
    children: [
      { path: "", name: "products", component: ProductPage },
    ],
  },
];