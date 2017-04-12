import Vue from 'vue'
import { post, get } from 'api'
import { isAuth } from './getters'
import * as types from './types'
import aguid from 'app/base/aguid'
import { createError, isEmpty, wrapError } from 'utils'
import { requestStorage, requestPlus } from 'runtime'
import { bindTags, bindAlias } from 'app/base/push'

export function bootstrap(state) {
    if (isAuth()) {
      return Promise.all([renewProfile(state)])
        .then(function (results) {
          console.log('bootstrap', 'BootstrapFinished')

          requestPlus().then(function(plus){
            bindAlias(state.state.profile.Alias).catch(function(error){
              console.log('bindPushAlias', wrapError(error))
            });
          });

          //preformPullMessage()

        function pullHandler() {

        }
      })
    } else {
      return requestPlus().then(function(plus){
        bindAlias(state.state.startup.ClientId);
      });
    }
}


export function renewProfile(state) {
  return post('/account/info')
    .then(function (data) {
      state.commit(types.PROFILE, data)
      return Promise.resolve(data)
    })
}

export function configuration ( state , args)  {
  state.commit(types.STARTUP, args)
}

export function toast({ commit }, message, success = true) {
  if (success)
    commit(types.TOAST, { success: message, negative: '' })
  else
    commit(types.TOAST, { success: '', negative: message })

  setTimeout(function () {
    commit(types.TOAST, { success: '', negative: '' })
  }, 10000)
}

export function login(state,access_token) {
  configuration(state,{
    AccessToken: access_token,
  })
  bootstrap(state)
}

export function logout (state){
  configuration(state,{ AccessToken: null, ClientId: aguid() })
  state.commit(types.CLEAN_PROFILE)
  bootstrap(state)
}

