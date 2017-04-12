import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import * as actions from './actions'
// import { toastInitialState, toastMutations } from './mutations/toast.js'
// import { startupInitialState, startupMutations } from './mutations/startup'
// import { profileInitialState, profileMutations } from './mutations/profile'

import toast from './mutations/toast'
import startup from './mutations/startup'
import profile from './mutations/profile'

import { localStoragePlugin } from './plugin'
import Setting from 'setting'

Vue.use(Vuex)

const plugin = [localStoragePlugin]
if(hosting.isDevelopment)
  plugin.push(createLogger())

export default new Vuex.Store({
  // state: {
  //   // toast: toastInitialState,
  //   // startup: startupInitialState,
  //   profile: profileInitialState,
  // },
  // mutations: [
  //   //startupMutations,
  //   profileMutations,
  // ],
  actions,
  modules: {
    toast,
    startup,
    profile
  },
  strict: !hosting.isDevelopment,
  plugin: plugin
})
