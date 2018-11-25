import Vue from 'vue';
import Router from 'vue-router';

import HomePage from '../components/home/component.vue'

Vue.use(Router);

export function createRouter() {
  return new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({y: 0}),
    routes: [
      {path: '/', component: HomePage},
      {path: '/**', redirect: '/'}
    ]
  });
}
