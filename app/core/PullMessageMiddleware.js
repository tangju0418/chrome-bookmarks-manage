import ReconnectingWebSocket from 'reconnectingwebsocket'
import Setting from 'setting'
import store from 'app/store'
import { requestProfile } from 'runtime'
import { isEmpty, wrapError } from 'utils'
import weui from 'app_modules/weui/weui.min.js'

export default function (appCode, clientId, alias) {
  requestProfile().then(function (profile) {
    var category = profile.Alias.substring(1);
    listen(category);
  });
}

var messageDialog = null;

function listen(alias) {
  var appCode = store.state.startup.AppCode;
  var clientId = store.state.startup.ClientId;
  var category = alias;
  var url = `${Setting.pullUrl}?AppCode=${appCode}&ClientId=${clientId}&category=${category}`;

  var socket = new WebSocket(url);
  socket.debug = true;

  socket.onopen = function (e) {
    console.info('PullMessageMiddleware opened:', Setting.pullUrl);
    socket.send('pull');
  };
  socket.onclose = function (e) {
    console.info('PullMessageMiddleware closed');
  };
  socket.onmessage = function (e) {
    console.info('PullMessageMiddleware message:', e);

    try {
      handler(e.data);
    } catch (e) {
      console.error('PullMessageMiddleware message', wrapError(e));
    }
  };
  socket.onerror = function (e) {
    console.info('Error: ', e.data);
  };
}

function handler(data) {
  var entry = JSON.parse(data);
  var title = entry.Title;
  var content = entry.Content;

  if (isEmpty(entry.Title) || isEmpty(entry.Content)) {
    console.error('消息[Title, Content]为空');
    return;
  }

  if (messageDialog == null) {
    messageDialog = weui.alert(content, function() {
      messageDialog = null;
    },{title:title});
  } else {
    messageDialog.title = title;
    messageDialog.text = content;
  }
}
