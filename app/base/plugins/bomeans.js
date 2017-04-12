import { requestPlus } from 'runtime'

const PLUGIN_ID = 'Bomeans';

function setup(bridge) {
  return {
    setRemoteDeviceAddress(ip) {
      return call(bridge, 'setRemoteDeviceAddress', [ip])
    },
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
    webGetTypeList() {
      return call(bridge, 'webGetTypeList', [])
    },
    webGetBrandList(typeId, start, number, language, brandName) {
      return call(bridge, 'webGetBrandList', [typeId, start, number, language, brandName])
    },
    webGetTopBrandList(typeId, start, number, language, brandName) {
      return call(bridge, 'webGetTopBrandList', [typeId, start, number, language, brandName])
    },
    webGetRemoteModelList(typeId, brandId) {
      return call(bridge, 'webGetRemoteModelList', [typeId, brandId])
    },
    createRemote(type, brand, model) {
      return call(bridge, 'createRemote', [type, brand, model])
    },
    createBigCombineRemote(type, brand, model) {
      return call(bridge, 'createBigCombineRemote', [type, brand, model])
    },
    createSmartPicker(type, brand, model) {
      return call(bridge, 'createSmartPicker', [type, brand, model])
    },
    getError() {
      return call(bridge, 'getError', [])
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
    if (plus.bomeans == null)
      plus.bomeans = setup(plus.bridge);
    return Promise.resolve(plus.bomeans);
  })
}
