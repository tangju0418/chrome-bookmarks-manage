import { isDemo } from 'app/store/getters'
import { requestRouter } from 'runtime'
import weui from 'app_modules/weui/weui.min.js'

export function wrapError(error, message) {
  if(message==null)message=error.message;
  return createError(error.name, message)
}

export function createError(name, message, data=[]) {
  return { name, message, data }
}

/*
console.log('var value =>', isEmpty(value))                   //true
console.log('var value = "" =>', isEmpty(value))              //true
console.log('var value = "   " =>', isEmpty(value))           //true
console.log('var value = {} =>', isEmpty(value))              //true
console.log("var value = { name: 'jm' } =>", isEmpty(value))  //false
console.log('var value = [] =>', isEmpty(value))              //true
console.log('var value = [1] =>', isEmpty(value))             //false
*/
export const isEmpty = function (value) {
  return value == null || value == '' ||
    (typeof value === 'string' && value.trim() == '') ||
    (typeof value === 'object' && !hasProperty(value)) ||
    (typeof value === 'array' && value.length == 0)
}

export function time() {
  return new Date().getTime()
}

function hasProperty(obj) {
  var hasProp = false
  for (var prop in obj) {
    hasProp = true
    break
  }
  return hasProp
}

/*
  var user = { id: 0, name: '', age:0 }
  var data1 = { age: 28, abc: 'abc' }
  var data2 = { id: 100, name: 'jm' }

  clone(user, data1, data2)
  //user = { id: 100, name: 'jm', age: 28}
  //not set abc
*/
export function clone(target, ...sources) {
  for (const source of sources) {
    for (const p in source)
      if (target.hasOwnProperty(p))
        target[p] = source[p]
  }
}

export function back() {
  window.history.back()
}

export function combinePath(path1, path2) {
  return path2.substr(0,1) == '/' ? path1 + path2 : path1 + '/' + path2;
}

export function rootUrl(url) {
  const reg = /[^#!]*#!/
  const match = reg.exec(url)
  return match[0]
}

export function rootPath(url) {
  const reg = /([^#!]*)\/#!/
  const match = reg.exec(url)
  return match[1]
}

export function errorMessageHandler(title, error, confirmCallback) {
  console.log('errorMessageHandler', title, error);

  if (error.name == 401) {
    if (isDemo()) {
      requestRouter().then(function (router) {
        router.replace('/demo/closed')
      });

      return;
    }
    else
      requestRouter().then(function (router) {
        router.replace('/login')
      });
  }

  if (error.message.includes("Cannot read property") || error.message.includes("undefined is not an object"))
    weui.toast('无网络连接', 1500)
  else{
    weui.alert(error.message, function(){
      confirmCallback()
    }, {title:title});
  }

}
