import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/app-layout.vue'),
    children: [
      {
        name: 'home',
        path: '',
        component: () => import('pages/home-page.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/error-not-found.vue'),
  },
];

export default routes;
