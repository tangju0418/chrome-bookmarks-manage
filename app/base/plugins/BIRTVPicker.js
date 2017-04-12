import { requestPlus } from 'runtime'

const PLUGIN_ID = 'BIRTVPicker';

function setup(bridge) {
  return {
    begin(key) {
      return call(bridge, 'begin', [key])
    },
    getNextKey(key) {
      return call(bridge, 'getNextKey', [key])
    },
    transmitIR(key) {
      return call(bridge, 'transmitIR', [key])
    },
    keyResult(key, option) {
      return call(bridge, 'keyResult', [key, option])
    },
    getPickerResult(key) {
      return call(bridge, 'getPickerResult', [key])
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
    if (plus.BIRTVPicker == null)
      plus.BIRTVPicker = setup(plus.bridge);

    return Promise.resolve(plus.BIRTVPicker);
  })
}
