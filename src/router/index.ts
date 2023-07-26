import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import { ROUTE_NAME } from "./routeName";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: ROUTE_NAME.HOME,
      component: HomePage
    },
    {
      path: "/contact/:id",
      name: ROUTE_NAME.CONTACT_ID,
      component: () => import("@/pages/ContactPage.vue")
    }
  ]
});

export default router;
