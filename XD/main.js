// Modules
import Vue from "vue";
import VueSocketIO from "vue-socket.io";
import SocketIO from "socket.io-client";

// Components
import App from "./App.vue";

// Routes
import router from "./router";

// Stores
import store from "./stores/store";

Vue.config.productionTip = false

Vue.use(require("vue-cookies"));
Vue.use(new VueSocketIO({
  debug: true,
  connection: SocketIO(process.env.VUE_APP_API_ENDPOINT)
}));

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
