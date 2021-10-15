import { createWebHistory, createRouter } from "vue-router";
import Dashboard from "@/views/Dashboard.vue"
import Login from "@/views/Login.vue"
import Register from "@/views/Register.vue"
import Home from "@/views/Home.vue"
import Data from "@/views/Data.vue"
import DataDate from "@/views/DataDate.vue"
import Maps from "@/views/Maps.vue"
import Bar from "@/views/Bar.vue"
import Pie from "@/views/Pie.vue"
import Line from "@/views/Line.vue"

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/data",
    name: "Data",
    component: Data,
  },
  {
    path: "/dataDate",
    name: "DataDate",
    component: DataDate,
  },
  {
    path: "/maps",
    name: "Maps",
    component: Maps,
  },
  {
    path: "/bar",
    name: "Bar",
    component: Bar,
  },
  {
    path: "/pie",
    name: "Pie",
    component: Pie,
  },
  {
    path: "/line",
    name: "Line",
    component: Line,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;