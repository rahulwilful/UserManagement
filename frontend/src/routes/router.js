import { createWebHistory, createRouter } from "vue-router";
import Login from "../pages/Login.vue"; // Make sure the import path is correct
import Register from "../pages/Register.vue";
import Home from "../pages/Home.vue";
import MyAccount from "../pages/MyAccount.vue";
import Edit from "../pages/Edit.vue";
import NotFound from "../pages/NotFound.vue";
import Dashboard from "../pages/Dashboard.vue";
import Admin from "../pages/Admin.vue";
import AdminUserEdit from "../pages/AdminUserEdit.vue";

const routes = [
  {
    path: "/login",
    component: Login, // Use 'component' instead of 'components'
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/",
    component: Home,
  },
  {
    path: "/myaccount",
    component: MyAccount,
  },
  {
    path: "/edit",
    component: Edit,
  },
  {
    path: "/dashboard",
    component: Dashboard,
  },
  {
    path: "/admin",
    component: Admin,
  },
  {
    path: "/adminuseredit/:userId",
    name: "Admin",
    component: AdminUserEdit,
    props: true,
  },
  {
    path: "/:pathMatch(.*)*",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
