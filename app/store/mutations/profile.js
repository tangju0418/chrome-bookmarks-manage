import Vue from 'vue'
import { PROFILE, CLEAN_PROFILE } from '../types'

const state = {
  Id: '',
  Username: '',
  Name: '',
  UserType: '',
  Alias: '',
}

const mutations = {
  [PROFILE](state, args) {
    ({
      Id:state.Id = state.Id,
      Username:state.Username = state.Username,
      Name:state.Name = state.Name,
      UserType:state.UserType = state.UserType,
      Alias:state.Alias = state.Alias
    } = args)
  },

  [CLEAN_PROFILE](state) {
    state.Id = ''
    state.Username='',
    state.Name = '',
    state.UserType = '',
    state.Alias = ''
  }
}


export default {
  state,
  mutations
}
