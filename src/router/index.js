import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
const Chat = () => import("../views/Chat.vue");
const Signin = () => import("../views/Signin.vue");
const Signup = () => import("../views/Signup.vue");
const Admin = () => import("../views/Admin.vue");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login
  },
  {
    path: "/chat",
    name: "Chat",
    component: Chat,
    props: true,
    // prevent user going to chat view without logging in
    beforeEnter: (to, from, next) => {
      if (to.params.name) {
        next();
      } else {
        next({ name: "Login" });
      }
    }
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
