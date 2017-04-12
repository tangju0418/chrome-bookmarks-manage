import Vue from 'vue'
import { createError } from 'utils'
import Setting from 'setting'

export function combine(path) {
  return path.substr(0,1) == '/' ? Setting.apiPath + path : Setting.apiPath + '/' + path;
}

export function accessToken(context, ClientId, ClientSecret, Username, Password) {
  const form = { ClientId, ClientSecret,  Username, Password }
  return context.$http.post(Setting.apiPath + '/passport/get-token', form)
}

export function getToken(context, url) {
  return context.$http.get(url)
}

export function get(api) {
  return new Promise(function(resolve, reject) {
    Vue.http.get(combine(api)).then(function (response) {
      if(response.data.Code == 0) {
        resolve(response.data.Data, response.data.Message)
      } else {
        console.error('post', api, response)
        reject(createError(response.data.Code, response.data.Message))
      }
    }).catch(function(error){
      console.error('error', api, error)
      reject(createError(-1, 'error'))
    })
  })
}


export function post(api, data) {
  return new Promise(function(resolve, reject) {
    Vue.http.post(combine(api), data).then(function (response) {
      if(response.data.Code == 0) {
        resolve(response.data.Data, response.data.Message)
      } else {
        console.error('post', api, response)
        reject(createError(response.data.Code, response.data.Message, response.data.Data))
      }
    }).catch(function(error){
      console.error('error', api, error)
      reject(createError(-1, 'error'))
    })
  })
}

