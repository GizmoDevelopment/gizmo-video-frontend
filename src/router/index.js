// Modules
import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter);

const routes = [
  {
    path: "/shows",
    name: "ShowList",
    component: () => import("../views/ShowList")
  },
  {
    path: "/shows/:showId",
    props: true,
    name: "Show",
    component: () => import("../views/Show")
  },
  {
    path: "/rooms",
    name: "RoomList",
    component: () => import("../views/RoomList")
  },
  {
    path: "/rooms/:roomId",
    props: true,
    name: "Room",
    component: () => import("../views/Room")
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;