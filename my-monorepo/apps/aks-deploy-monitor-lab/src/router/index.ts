import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Dictionary  from '../views/Dictionary.vue';
import Monitor  from '../views/Monitor.vue';
import Deploy from '../views/Deploy.vue';
import Configure from '../views/Configure.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/configure',
      name: 'Configure',
      component: Configure,
    },
    {
      path: '/deploy',
      name: 'Deploy',
      component: Deploy,
    },
    {
      path: '/monitor',
      name: 'Monitor',
      component: Monitor,
    },
    {
      path: '/dictionary',
      name: 'dictionary',
      component: Dictionary,
    },
  ],
});

export default router;
