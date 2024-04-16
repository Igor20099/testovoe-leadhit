import { createRouter, createWebHistory } from "vue-router";
import AuthPage from '../pages/AuthPage.vue'
import AnalyticsPage from '../pages/AnalyticsPage.vue'


const routes = [
  { path: "/", component: AuthPage, },
  {path:'/analytics' ,component: AnalyticsPage }

];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;