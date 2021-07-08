import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import Add from "../views/Add.vue";
import Edit from "../views/Edit.vue";
import Delete from "../views/Delete.vue";
import Login from "../views/Login.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/users/add",
    name: "add",
    component: Add,
  },
  {
    path: "/users/edit/:id",
    name: "edit",
    component: Edit,
  },
  {
    path: "/users/delete/:id",
    name: "delete",
    component: Delete,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
