import base64 from 'base64-lite'
import store from 'app/store'
import { isEmpty } from 'utils'
import { isAuth, isDemo } from 'app/store/getters'
import { requestRouter } from 'runtime'

export default function (request, next) {
  console.debug('REQUEST %s %s: %o', request.method, request.url, request)
  request.headers.set('ClientId', store.state.startup.ClientId);

    let token
    if(isAuth()) {
      token = store.state.startup.AccessToken
      request.headers.set('Authorization', `Bearer ${token}`);
    }

    console.debug('NEW REQUEST %o', request)

    next(function(response){
      httpResponse(response);
    })
}

function httpResponse(response){
  if(response.data != null && response.data.Code != 0)
    console.warn('RESPONSE', response.url, response)
  else
    console.debug('RESPONSE', response.url, response)

  let renew = false
  let url = response.url

  if(response.status == 401) {
    this.$store.dispatch('logout')
  }

  //如果不是200状态，重构为200状态
  if (response.status != 200) {
    errorResponseHandler(response);
    if(response.status == 401){
      response.data = {
        Code: response.status,
        Message: '没有权限'
      }
    }else{
      response.data = {
        Code: response.status,
        Message: response.statusText
      }
    }
    response.ok = true
    response.status = 200
    response.statusText = 'OK'
    renew = true
  }

  if(response.data.Code == 7){
    let data = response.data.Data
    let message = data.map(i => i.Value).toString()
    response.data.Message = message
  }

  if (renew)
    console.warn('NEW RESPONSE', response)

}

function errorResponseHandler(response) {
  console.log('errorResponseHandler', response);

  if(response.status == 401){
    if (isDemo())
      requestRouter().then(function (router) {
        this.$router.replace('/demo/closed')
      });
  }
}
