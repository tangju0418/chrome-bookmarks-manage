import { createError } from 'utils'
import store from 'app/store'
import requireOwner from 'app/base/plugins/owner'

export function requestApp() {
  return {
    then(resolve) {
      return resolve(document.getElementById('app'))
    }
  };
}

export function requestRouter() {
  return {
    then(resolve) {
      return resolve($router)
    }
  };
}

export function requestStorage(session=false) {
  return {
    then(resolve) {
      if(session)
        return resolve(sessionStorage)
      else
        return resolve(localStorage)
    }
  };
}

export function requestToken() {
  return new Promise(function (resolve, reject) {
    var getter = function () {
      if (store.state.auth.access_token == null)
        resolve(store.state.startup.AccessToken);
      else
        setTimeout(getter, 10);
    }
    getter();
  });
}

export function requestPlus() {
  var NA = window.navigator;
  var UA = window.navigator.userAgent.toLowerCase();
  function test(needle) {
    return needle.test(UA);
  }

  var isAndroid = test(/android|htc/) || /linux/i.test(NA.platform + "");
  var isIPad = !isAndroid && test(/ipad/);
  var isIPhone = !isAndroid && test(/ipod|iphone/);
  var isIOS = isIPad || isIPhone;
  var isWinPhone = test(/windows phone/);
  var isWeixin = test(/micromessenger/);
  var isPC = !isAndroid && !isIOS && !isWinPhone;

  if(isPC)
    return Promise.reject(createError('plus_not_supported', '设备不支持!'));

  return new Promise(function (resolve, reject) {
    var waitCount = 0;
    var getter = function () {
      waitCount++
      if (window.plus != null)
        resolve(window.plus);
      else if (waitCount > 100 || window.plus_not_supported) {
        window.plus_not_supported = true
        reject(createError('plus_not_supported', '设备不支持!'));
      }
      else
        setTimeout(getter, 50);
    }
    getter();
  });
}

export function requestNative() {
  return requireOwner()
    .then(function (owner) {
      return owner.deviceName();
    })
    .then(function (result) {
      var deviceName = result.data;
      deviceName = deviceName.toLowerCase();
      var ios = deviceName.indexOf('ios')>-1 || deviceName.indexOf('iphone')>-1;
      var android = !ios;
      return Promise.resolve({ ios, android })
    });
}

export function requestProfile() {
  return new Promise(function(resolve, reject) {
    var count=0;
    var getter = function() {
      if(store.state.profile.Id!='')
        resolve(store.state.profile);
      else {
        count++;
        if(count<600)
          setTimeout(getter, 100);
        else
          reject(createError('profile_not_ready','profile数据不存在'));
      }
    }
    getter();
  })
}
