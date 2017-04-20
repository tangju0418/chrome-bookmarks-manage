<template>
  <div class="page">
    <div class="mui-content">
      <div class="logo"></div>

        <div class="weui-cells weui-ells_form">
          <div class="weui-cell">
              <div class="weui-cell_hd"><label class="weui-label">账号</label></div>
              <div class="weui-cell_bd weui-cell_primary">
                  <input class="weui-input" type="text"  placeholder="用户名" v-model="model.Username">
                  <i class="weui-icon-warn v-invalid" v-show="submitted && isEmpty(model.Username)"></i>
              </div>
          </div>
          <div class="weui-cell">
              <div class="weui-cell_hd"><label class="weui-label">密码</label></div>
              <div class="weui-cell_bd weui-cell_primary">
                  <input id="password" class="weui-input" type="Password"  placeholder="请输入密码" v-model="model.Password">
                  <i class="weui-icon-warn v-invalid" v-show="submitted && isEmpty(model.Password)"></i>
              </div>
          </div>
        </div>
        <button href="javascript:;" class="weui-btn register weui-btn_primary" @click="submit">登录</button>

    </div>
    <!-- <loading v-if="load"></loading> -->
  </div>
</template>


<script>

import * as api from 'api'
import { isEmpty } from 'utils'
import {  errorMessageHandler, createError } from 'utils'


export default {
  beforeRouteEnter(to, from, next){
    next()
  },

  data: function() {
    return {
      model: {
        Username: '',
        Password: '',
      },

      submitted: false,
      load:false,
      showDownlad: false,
    }
  },

  computed: {

  },
  methods: {
    isEmpty,
    submit: function() {
      const vm = this
      vm.submitted = true
      if(!isEmpty(vm.model.Username) && !isEmpty(vm.model.Password)) {
        const clientId = `user`
        const clientSecret = 'web'
        const username = vm.model.Username
        const password = vm.model.Password
        vm.load = true
        api.accessToken(vm, clientId, clientSecret, username, password)
          .then(function(response) {
            if(response.data.Code == 0) {
              const access_token = response.data.Data.AccessToken
              const refresh_token = response.data.Data.RefreshToken
              const expires_in = response.data.Data.ExpiresIn
              //login(access_token)
              vm.$store.dispatch('login',access_token)
              vm.$router.replace('/home')
              vm.load = false
            } else {
              errorMessageHandler('登录',createError(1,response.data.Message))
              vm.load = false
            }

        })
      }
    },

  }
}

</script>

<style lang="stylus" scoped>
.page
  background #fff
  position fixed
  width 100%
  max-width 800px
  height 100%

  .mui-content
    background #fff
    margin-bottom 0
    padding-bottom 20px
    .logo
      width 90px
      height 90px
      background-repeat no-repeat
      background-size 100% 100%
      margin 0 auto
      margin-top 50px
      margin-bottom 30px

.weui-cells:before
  border-top none

.weui-cell:before
  left 0

.weui-cell_hd
  width 20%

.weui-cell_primary
  width 80%


</style>
