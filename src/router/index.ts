import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/skills",
      name: "skillIndex",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/skills/SkillIndex.vue"),
    },
    {
      path: "/skills/create",
      name: "skillCreate",
      component: () => import("../views/skills/SkillCreate.vue"),
    },
    {
      path: "/skills/:id/edit",
      name: "skillEdit",
      component: () => import("../views/skills/SkillEdit.vue"),
    },
  ],
});

export default router;
