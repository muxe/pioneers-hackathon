import Vue from 'vue'
import App from './App.vue'
import VueMaterial from 'vue-material'
import VueRouter from 'vue-router'
import router from './router'

import 'vue-material/dist/vue-material.css'

Vue.use(VueMaterial)
Vue.use(VueRouter)

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
