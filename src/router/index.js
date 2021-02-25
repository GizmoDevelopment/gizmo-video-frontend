// Modules
import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter);

const routes = [
  {
    path: "/shows/:showId",
    name: "Player",
    props: true,
    component: () => import("../views/Player")
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;