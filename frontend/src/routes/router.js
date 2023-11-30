import { createWebHistory, createRouter } from "vue-router";
import Login from "../pages/Login.vue"; // Make sure the import path is correct
import Register from "../pages/Register.vue";
import Home from "../pages/Home.vue";
import MyAccount from "../pages/MyAccount.vue";
import UserEdit from "../pages/UserEdit.vue";
import NotFound from "../pages/NotFound.vue";
import Dashboard from "../pages/Dashboard.vue";
import ManageUsers from "../pages/ManageUsers.vue";
import AdminUserEdit from "../pages/AdminUserEdit.vue";
import CreateAdmin from "../pages/CreateAdmin.vue";
import MoreDetails from "../pages/MoreDetails.vue";
import GoogleSignIn from "../pages/GoogleSignIn.vue";
import ForgotPassword from "../pages/ForgotPassword.vue";
import ResetPassword from "../pages/ResetPassword.vue";
import DefaultView from "../views/DefaultView.vue";
import DashboardView from "../views/DashboardView.vue";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/forgotpassword",
    component: ForgotPassword,
  },
  {
    path: "/resetpassword/:email/:paramsotp",
    name: "EnterEmail",
    component: ResetPassword,
    props: (route) => ({
      email: route.params.email,
      paramsotp: parseInt(route.params.paramsotp),
    }),
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/register",
    component: Register,
  },

  {
    path: "/myaccount",
    component: MyAccount,
  },
  {
    path: "/useredit",
    component: UserEdit,
  },
  /*  {
    path: "/dashboard",
    component: Dashboard,
  }, */
  {
    path: "/manageusers",
    component: ManageUsers,
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
  /*   {
    path: "/moredetails/:userId",
    name: "dashboard",
    component: MoreDetails,
    props: true,
  }, */
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

/* {
    path: "/",
    component: DefaultView,
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
      {
        path: "/forgotpassword",
        component: ForgotPassword,
      },
      {
        path: "/resetpassword/:email/:paramsotp",
        name: "EnterEmail",
        component: ResetPassword,
        props: (route) => ({
          email: route.params.email,
          paramsotp: parseInt(route.params.paramsotp),
        }),
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
