import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';

import routes from './routes';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory;

  const router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  router.beforeEach((to, from, next) => {
    if (from.query) {
      const { urlReferrer } = from.query;
      if (urlReferrer && !to?.query?.scrollTo) {
        const url = new URL(
          decodeURIComponent(String(urlReferrer)),
          window.location.origin + window.location.pathname
        );
        const scrollTo = url.searchParams.get('scrollTo');
        if (scrollTo && to.path === url.pathname) {
          to.query.scrollTo = scrollTo;
        }
      }
    }
    next();
  });

  return router;
});
