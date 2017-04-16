import Vue from 'vue'
import { CURRENTMARK } from '../types'
import { DELETMARK } from '../types'

const state = {
  markbook:''
}

const mutations = {
  [CURRENTMARK](state, arg) {
    state.markbook = arg
  },
  [DELETMARK](state) {
    state.markbook = ''
  }
}

export default {
  state,
  mutations
}
