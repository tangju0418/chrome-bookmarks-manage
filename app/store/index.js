import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import * as actions from './actions'

import toast from './mutations/toast'
import startup from './mutations/startup'
import profile from './mutations/profile'
import currentmark from './mutations/currentmark'

import { localStoragePlugin } from './plugin'
import Setting from 'setting'

Vue.use(Vuex)

const plugin = [localStoragePlugin]
if(hosting.isDevelopment)
  plugin.push(createLogger())

export default new Vuex.Store({
  actions,
  modules: {
    toast,
    startup,
    profile,
    currentmark
  },
  strict: !hosting.isDevelopment,
  plugin: plugin
})
