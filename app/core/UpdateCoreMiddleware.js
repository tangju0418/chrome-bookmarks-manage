import Vue from 'vue'
import store from 'app/store'
import { isEmpty, back, wrapError,errorMessageHandler ,createError} from 'utils'
import { isNative, isAuth } from 'app/store/getters'
import { requestPlus,requestProfile } from 'runtime'
import requireOwner from 'app/base/plugins/owner'
import Setting from 'setting'
import weui from 'app_modules/weui/weui.min.js'

export default function(options) {
  if(options==null) options = {}
  if(options.uid==null) options.uid = '';

  if(isAuth()) {
    return requestProfile().then(function(profile) {
      options.uid = profile.Username
      return handleCheckUpdate(options);
    })
  } else
    return handleCheckUpdate(options);
}

function handleCheckUpdate(options) {
  return checkUpdate(options)
    .then(function (url) {
      return downloadUpdate(url);
    })
    .then(function (path) {
      return installUpdate(path);
    })
    .then(function(){
      return new Promise(function(resolve, reject) {
        weui.alert('重启应用以完成更新，点击确定自动重启。', function() {
          requestPlus().then(function(plus){
            plus.runtime.restart();
          })
          resolve();
        },{title:'数据更新'});
      })
    });
}

function runVersion() {
  return requestPlus().then(function (plus) {
    return new Promise(function (resolve, reject) {
      plus.runtime.getProperty(plus.runtime.appid, function (info) {
        resolve(info.version);
      });
    });
  });
}

function checkUpdate(options) {
  var owner, versionName, versionCode, bundle, deviceName, deviceVersion;
  return requireOwner()
    .then(function (result) {
      owner = result;
      return owner.versionName();
    })
    .then(function (result) {
      versionName = result.data;
      return owner.versionCode();
    })
    .then(function (result) {
      versionCode = result.data;
      return owner.bundle();
    })
    .then(function (result) {
      bundle = result.data;
      return owner.deviceName()
    })
    .then(function (result) {
      deviceName = result.data;
      return owner.deviceVersion()
    })
    .then(function (result) {
      deviceVersion = result.data;
      return runVersion()
    })
    .then(function (version) {
      var native = plus.os.name.toLowerCase()
      var resource = Vue.resource(Setting.updateCoreUrl)
      var data = {
        name: 'com.jiaedian.thingsoffice',
        platform: native,
        vesion: versionName,
        basever: version,
        uid: options.uid,
      };
      return resource.get(data)

    })
    .then(function (response) {
      if (response.status == 200) {
        var url = response.data;
        if (!isEmpty(url)) {
          return Promise.resolve(url);
        } else
          return Promise.reject(createError('no_update', '没有更新'));
      } else {
        return Promise.reject(createError('network_error', '网络错误'));
      }
    })
}

function downloadUpdate(url) {
  return requestPlus().then(function (plus) {
    return new Promise(function (resolve, reject) {
      plus.downloader.createDownload(url, { filename: "_doc/update/" },
        function (d, status) {
          if (status == 200) {
            console.log("下载成功：" + d.filename);
            resolve(d.filename);
          } else {
            reject(createError('network_error', '下载失败'));
          }
        }).start();
    });
  });
}

function installUpdate(path) {
  return new Promise(function (resolve, reject) {
    requestPlus().then(function (plus) {
      plus.runtime.install(path, {}, function () {
        console.log("安装成功");
        resolve(true);
      }, function (e) {
        console.log(e);
        reject(createError('install_error', '安装失败'));
      });
    });
  });
}
