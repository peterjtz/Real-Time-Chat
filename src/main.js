import Vue from "vue";
import VueChatScroll from "vue-chat-scroll";
import App from "./App.vue";
import router from "./router";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

Vue.config.productionTip = false;
Vue.use(VueChatScroll);

import GAuth from "vue-google-oauth2"
const gauthOption = {
  clientId: '700820581586-agku6mb1ep5lmf6ulq9g15vflheb6bhq.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account',
  fetch_basic_profile: true
}
Vue.use(GAuth, gauthOption);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
