import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import App from 'app/startup/index.vue'
import store from './store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    component: require('app/pages/home.vue')
  },

  {
    path: '*',
    redirect: '/home'
  }
]

const router = new VueRouter({
  routes
})

const app = new Vue({
  router,
  store,
  render: h => h(App)

}).$mount('#app')
