import MainLayout from '../../layout/MainLayout.vue';
import { DashboardPage } from './pages/dashboard-page';

export const dashboardRoutes = [
  {
    path: "/dashboard",
    component: MainLayout,
    children: [
      { path: "", name: "dashboard", component: DashboardPage },
      // add more pages here
    ],
  },
];