import Vue from 'vue'
import store from 'app/store'
import { isEmpty, back, wrapError,errorMessageHandler ,createError, combinePath} from 'utils'
import { isNative, isAuth } from 'app/store/getters'
import { requestPlus,requestProfile } from 'runtime'
import requireOwner from 'app/base/plugins/owner'
import Setting from 'setting'
import weui from 'app_modules/weui/weui.min.js'

export default function(options) {
  if(options==null) options = {}
  return handleCheckUpdate(options);
}

function handleCheckUpdate(options) {
  return checkUpdate()
    .then(function(data){
      console.log('handleCheckUpdate', data);
      return new Promise(function(resolve, reject) {
        weui.alert(data.changeContent, function() {
          requestPlus().then(function(result) {
            plus.runtime.openURL( data.url);
          })
          resolve();
        },{title:data.changeTitle});
      })
    })
}

function checkUpdate() {
  var owner, versionCode;
  return requireOwner()
    .then(function (result) {
      owner = result;
      return owner.versionCode();
    })
    .then(function(code) {
      versionCode = code.data;
      return requestPlus();
    })
    .then(function (plus) {
      var native = plus.os.name.toLowerCase();
      var filename = `com.jiaedian.thingsoffice.${native}.json`;
      var url = combinePath(Setting.updateAppsUrl, filename);

      var resource = Vue.resource(url);
      return resource.get()
    })
    .then(function (response) {
      if (response.status == 200) {
        var data = response.data;
        console.info('data.build > versionCode', data.build, versionCode)
        if (data.build > versionCode) {
          return Promise.resolve(data);
        } else
          return Promise.reject(createError('no_update', '没有更新'));
      } else {
        return Promise.reject(createError('network_error', '网络错误'));
      }
    })
}
