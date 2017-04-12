import { requestPlus } from 'runtime'

const PLUGIN_ID = 'Mediatek';

function setup(bridge) {
  return {
    wifi2IrIsConnect() {
      return call(bridge, 'wifi2IrIsConnect', [])
    },
    startWifiToIRConnectToAP(ssid, password, authMode) {
      //authMode: Open,WPA,WPAPSK,WPANone,WPA2,WPA2PSK,WPA1WPA2,WPA1PSKWPA2PSK
      return call(bridge, 'startWifiToIRConnectToAP', [ssid, password, authMode])
    },
    stopWifiToIRConnect() {
      return call(bridge, 'stopWifiToIRConnect', [])
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
    if (plus.Mediatek == null)
      plus.Mediatek = setup(plus.bridge);

    return Promise.resolve(plus.Mediatek);
  })
}
