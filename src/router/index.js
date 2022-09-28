import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Chat from "../views/Chat.vue";
import Signin from "../views/Signin.vue";
import Signup from "../views/Signup.vue"
import Admin from "../views/Admin.vue"

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
