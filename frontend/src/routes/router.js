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
import CreateAdmin from "../pages/CreateAdmin.vue";
import MoreDetails from "../pages/MoreDetails.vue";
import GoogleSignIn from "../pages/GoogleSignIn.vue";
import EnterEmail from "../pages/EnterEmail.vue";
import Default from "../views/Default.vue";
import DashboardView from "../views/DashboardView.vue";

const routes = [
  /*  {
    path: "/",
    component: Default,
    children: [
      {
        path: "/",
        component: Home,
      },
      {
        path: "/login",
        component: Login,
      },
      {
        path: "/register",
        component: Register,
      },
      {
        path: "/googlesignin",
        component: GoogleSignIn,
      },
    ],
  },
  {
    path: "/",
    component: DashboardView,
    children: [
      {
        path: "/myaccount",
        component: MyAccount,
      },
      {
        path: "/edit",
        component: UserEdit,
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
        path: "/createadmin",
        component: CreateAdmin,
      },

      {
        path: "/adminuseredit/:userId",
        name: "Admin",
        component: AdminUserEdit,
        props: true,
      },
      {
        path: "/moredetails/:userId",
        name: "dashboard",
        component: MoreDetails,
        props: true,
      },
      {
        path: "/:pathMatch(.*)*",
        component: NotFound,
      },
    ],
  }, */

  {
    path: "/",
    component: Home,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/enteremail",
    component: EnterEmail,
  },
  {
    path: "/register",
    component: Register,
  },

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
    path: "/createadmin",
    component: CreateAdmin,
  },
  {
    path: "/googlesignin",
    component: GoogleSignIn,
  },
  {
    path: "/adminuseredit/:userId",
    name: "Admin",
    component: AdminUserEdit,
    props: true,
  },
  {
    path: "/moredetails/:userId",
    name: "dashboard",
    component: MoreDetails,
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
