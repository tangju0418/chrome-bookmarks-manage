import Vue from 'vue'
import { TOAST } from '../types'

const state = {
  success: '',
  negative: '',
}

const mutations = {
  [TOAST](state, args) {
    ({
      success: state.success = state.success,
      negative: state.negative = state.negative,
    } = args)
  }
}

export default {
  state,
  mutations
}
