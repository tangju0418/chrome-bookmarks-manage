import { requestPlus } from 'runtime'

const PLUGIN_ID = 'BIRRemote';

function setup(bridge) {
  return {
    getAllKeys(key) {
      return call(bridge, 'getAllKeys', [key])
    },
    transmitIR(key, keyID, option) {
      return call(bridge, 'transmitIR', [key, keyID, option])
    },
    beginTransmitIR(key, keyId) {
      return call(bridge, 'beginTransmitIR', [key, keyId])
    },
    endTransmitIR(key) {
      return call(bridge, 'endTransmitIR', [key])
    },
    getModuleName(key) {
      return call(bridge, 'getModuleName', [key])
    },
    getBrandName(key) {
      return call(bridge, 'getBrandName', [key])
    },
    setRepeatCount(key, count) {
      return call(bridge, 'setRepeatCount', [key, count])
    },
    getRepeatCount(key) {
      return call(bridge, 'getRepeatCount', [key])
    },
    getActiveKeys(key) {
      return call(bridge, 'getActiveKeys', [key])
    },
    getKeyOption(key, keyId) {
      return call(bridge, 'getKeyOption', [key])
    },
    getGuiFeature(key) {
      return call(bridge, 'getGuiFeature', [key])
    },
    getTimerKeys(key) {
      return call(bridge, 'getTimerKeys', [key])
    },
    setOffTime(key, hour, minute, sec) {
      return call(bridge, 'setOffTime', [key, hour, minute, sec])
    },
    setOnTime(key, hour, minute, sec) {
      return call(bridge, 'setOnTime', [key, hour, minute, sec])
    },
    getACStoreDatas(key) {
      return call(bridge, 'getACStoreDatas', [key])
    },
    restoreACStoreDatas(key) {
      return call(bridge, 'restoreACStoreDatas', [key, items])
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
    if (plus.BIRRemote == null)
      plus.BIRRemote = setup(plus.bridge);

    return Promise.resolve(plus.BIRRemote);
  })
}
