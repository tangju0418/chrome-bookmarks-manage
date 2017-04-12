import store from './index'
import { isEmpty } from 'utils'

export function isAuth() {
  return !isEmpty(store.state.startup.AccessToken)
}

/* 是否ios app */
export function isIOS() {
  return store.state.startup.Mode === 'ios'
}

/* 是否android app */
export function isAndroid() {
  return store.state.startup.Mode == 'android'
}

export function isNative() {
  return isIOS() || isAndroid()
}

/* 是否运行在微信公众号 */
export function isWechat() {
  return store.state.startup.Mode == 'wechat'
}

/* 体验模式 */
export function isDemo() {
  return store.state.startup.Mode == 'demo'
}
