// Modules
import Vue from "vue"

// Components
import App from "./App.vue"

// Routes
import router from "./router"

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
