import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import App from 'app/startup/index.vue'
import store from './store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/popup',
    component: require('app/pages/popup.vue')
  },
  {
    path: '/home',
    component: require('app/pages/home.vue')
  },
  {
    path: '/login',
    component: require('app/pages/login.vue')
  },
  {
    path: '/register',
    component: require('app/pages/register.vue')
  },
  {
    path: '*',
    redirect: '/popup'
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
