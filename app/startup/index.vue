<template>
  <div class="page">
    <router-view
      keep-alive
      transition
      transition-mode="out-in">
    </router-view>
  </div>
</template>

<script>

import Vue from 'vue'
import httpInterceptor from './httpIntercept'
import store from 'app/store'
import { isAuth, isDemo } from 'app/store/getters'
import { isEmpty, wrapError } from 'utils'
import * as filters from './filters'
import { requestPlus, requestNative, requestStorage, requestProfile } from 'runtime'
import requireOwner from 'app/base/plugins/owner'
import Setting from 'setting'
import { bindTags, bindAlias } from 'app/base/push'
import aguid from 'app/base/aguid'
import UpdateCoreMiddleware from 'app/core/UpdateCoreMiddleware'
import UpdateAppsMiddleware from 'app/core/UpdateAppsMiddleware'
import PullMessageMiddleware from 'app/core/PullMessageMiddleware'
import weui from 'app_modules/weui/weui.min.js'
// import { bootstrap, configuration, login } from 'app/store/actions'


Vue.component('bookmark', require('app/components/mark.vue'))


Vue.use(require('vue-resource'))

Vue.filter('datetime', filters.datetime)
Vue.http.interceptors.push(httpInterceptor)


export default {
  computed: {
  },

  data: function() {
    return {

    }
  },

  methods: {

  },

  mounted: function () {
    this.$nextTick(function () {
  //ready: function() {

    //routeRule(this.$router);

      const { mode, token, expires } = this.$route.query
      console.log('query...', mode, token, expires)

      if(!isEmpty(mode)) {
        this.$store.dispatch('configuration',{ Mode: mode})
      }

      if(isDemo()) {
        var now = Math.round(new Date().getTime()/1000)
        if(isEmpty(token) || isEmpty(expires) || expires < now) {
          this.$router.replace('/demo/closed')
        } else {
          //login(token)
          this.$store.dispatch('login',token)
          PullMessageMiddleware();
          this.$router.replace('/')
        }
      }
      this.$store.dispatch('bootstrap'); //本系统初始化
      //基座适配
      requestPlus().then(function(plus){
        setIosStyle();
        pushHandler(plus);
        bindPushTags()
        checkUpdate(plus);
        backButton(plus);
      })
      .catch(function(error){
        console.error('基座适配', wrapError(error))
      });
  //}
    })
  },
}

function backButton(plus) {
  let first = null
  plus.key.addEventListener('backbutton',function(){
    if (!first) {
      first = new Date().getTime();
      weui.toast('再按退出应用', 1500)
      setTimeout(function() {
        first = null;
      }, 1000);
    } else {
      if (new Date().getTime() - first < 1000) {
        plus.runtime.quit();
      }
    }
  })
}

//路由规则全局设置

function routeRule(router){
  router.beforeEach(({ path }, from, next) => {
    const anonymousPaths = [
      '/login',
      '/home' //有closed页面后去掉home
    ];

    function anonymous() {
      for(var i=0;i<anonymousPaths.length;i++) {
        //console.log('anonymous', path, anonymousPaths[i])
        if(path.indexOf(anonymousPaths[i])>-1)
          return true;
      }
      return false;
    }
    if(anonymous())
      next()
    else if(isAuth())
      next()
    else
      return next({ path: '/home' })  //有closed页面后去掉home
  })

}

//ios系统时给body添加ios属性

function setIosStyle() {
  requestNative().then(function(native) {
    console.log('appNative',native)
    if(native.ios)
      $("body").attr('class','ios')
  });
}

//更新
function checkUpdate(plus) {
  UpdateCoreMiddleware()
    .catch(function(error){
      console.error('检查更新', wrapError(error))
      //如果没有内核更新，则检查客户端更新
      UpdateAppsMiddleware().catch(function(error2) {
        console.error('UpdateAppsMiddleware', wrapError(error2));
      })
    });
}

function bindPushTags() {
  bindTags(Setting.envTag).catch(function(error){
    console.error('bindPushTags', wrapError(error))
  })
}

//准备接收推通通知
function pushHandler(plus) {
  console.log('plusready', plus.runtime.arguments);

  document.addEventListener("newintent", function() {
      console.log('newintent', plus.runtime.arguments)
  });
  plus.push.addEventListener("click", function(msg) {
    console.log('click', msg)
    requireOwner().then(function(owner){
      owner.setBadge(0)
    })
  }, false);
  plus.push.addEventListener("receive", function(msg) {
    console.log('receive', msg)
  }, false);
}

</script>

<style lang="stylus">
@import "../pages/styl/publics";
@import "../pages/styl/public";

</style>
