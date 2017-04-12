import Vue from 'vue'
import { STARTUP } from '../types'
import { isEmpty } from 'utils'
import aguid from 'app/base/aguid'

const KEY_ACCESS_TOKEN = 'MENU.STARTUP.ACCESS_TOKEN'
const KEY_REFRESH_TOKEN = 'STARTUP.REFRESH_TOKEN'
const KEY_CLIENT_ID = 'STARTUP.CLIENT_ID'

const state = {
  AppCode: 'THOFF',
  ClientId: localStorage == null ? aguid()
    : isEmpty(localStorage.getItem(KEY_CLIENT_ID))
      ? aguid() : localStorage.getItem(KEY_CLIENT_ID),
  Mode: 'any',
  AccessToken: localStorage == null ? '' : localStorage.getItem(KEY_ACCESS_TOKEN),
}

const mutations = {
  [STARTUP](state, args) {
    ({
      ClientId:state.ClientId = state.ClientId,
      Mode:state.Mode = state.Mode,
      AccessToken:state.AccessToken = state.AccessToken
    } = args)

    if(localStorage != null) {
      if(state.AccessToken == null)
        localStorage.removeItem(KEY_ACCESS_TOKEN)
      else
        localStorage.setItem(KEY_ACCESS_TOKEN, state.AccessToken)


      if(state.ClientId == null)
        localStorage.removeItem(KEY_CLIENT_ID)
      else
        localStorage.setItem(KEY_CLIENT_ID, state.ClientId)
    }
  },
}

export default {
  state,
  mutations
}
