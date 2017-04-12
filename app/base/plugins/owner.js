import { requestPlus } from 'runtime'

const PLUGIN_ID = 'Owner';

function setup(bridge) {
  return {
    versionName() {
      return call(bridge, 'versionName', [])
    },
    versionCode() {
      return call(bridge, 'versionCode', [])
    },
    bundle() {
      return call(bridge, 'bundle', [])
    },
    deviceName() {
      return call(bridge, 'deviceName', [])
    },
    deviceVersion() {
      return call(bridge, 'deviceVersion', [])
    },
    bindAlias(alias) {
      return call(bridge, 'bindAlias', [alias])
    },
    unbindAlias(alias) {
      return call(bridge, 'unbindAlias', [alias])
    },
    bindTags(tags) {
      return call(bridge, 'bindTags', [tags])
    },
    setBadge(badge) {
      return call(bridge, 'setBadge', [badge])
    },
    getSSID() {
      return call(bridge, 'getSSID', [])
    }
  }
}

function call(bridge, method, args) {
  return new Promise(function (resolve, reject) {
    var callbackID = bridge.callbackId(
      function (data) { console.log(method, args, data); resolve(JSON.parse(data)); },
      function (error) { console.log(method, args, error); reject(JSON.parse(error)); }
    );
    bridge.exec(PLUGIN_ID, method, [callbackID].concat(args));
  });
}

export default function () {
  return requestPlus().then(function (plus) {
    if (plus.owner == null)
      plus.owner = setup(plus.bridge);
    return Promise.resolve(plus.owner);
  })
}
