import { requestPlus } from 'runtime'

const PLUGIN_ID = 'Yoosee';

function setup(bridge) {
  return {
    p2pConnectWithId(userId, code1, code2) {
      return call(bridge, 'p2pConnectWithId', [userId, code1, code2])
    },
    startFinder(ssid, password, authMode) {
      return call(bridge, 'startFinder', [ssid, password, authMode])
    },
    stopFinder() {
      return call(bridge, 'stopFinder', [])
    },
    setInitPasswordWithIp(ip, password) {
      return call(bridge, 'setInitPasswordWithIp', [ip, password])
    },
    showMonitor(deviceId, devicePwd) {
      return call(bridge, 'showMonitor', [deviceId, devicePwd])
    },
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
    if (plus.Yoosee == null)
      plus.Yoosee = setup(plus.bridge);
    return Promise.resolve(plus.Yoosee);
  })
}
