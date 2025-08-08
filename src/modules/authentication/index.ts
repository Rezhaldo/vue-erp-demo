import type { RouteRecordRaw } from 'vue-router';
import { LoginPage } from './pages/login';

export const authenticationRoutes: RouteRecordRaw[] = [
  {
    path: '/authentication',
    redirect: '/authentication/login',
    children: [{
        path: 'login',
        name: 'Login',
        component: LoginPage,
    }]
  }
]