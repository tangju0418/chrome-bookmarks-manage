import Vue from 'vue'
import { BOOKMARKS } from '../types'

const state = {
  Items:[]
}

const mutations = {
  [BOOKMARKS](state, arg) {
    state.Items = arg
  }
}

export default {
  state,
  mutations
}
