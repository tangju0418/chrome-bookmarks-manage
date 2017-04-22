<template>
  <div id="page">
    <div class="mui-content" v-show="!showMessage">
      <p>合并</p>
      <p @click="logout">注销</p>
      <p @click="toHome">选项</p>
    </div>
    <div v-show="showMessage" style="padding:20px;color:#6c8030;font-size:18px">{{message}}</div>
  </div>
</template>


<script>

import * as api from 'api'
import { isEmpty } from 'utils'
import store from 'app/store'
import {  errorMessageHandler, createError } from 'utils'


export default {
  beforeRouteEnter(to, from, next){
    next(vm =>{
      let searchItem = window.location.search.substring(1).split('&')
      let page = searchItem[0]
      if(page=='page=click' ){
        next('/home')
      }
    })
  },
  data: function() {
    return {
      showMessage:''
    }
  },

  computed: {

  },
  methods: {
    isEmpty,
    toHome(){
      var url = chrome.extension.getURL('app.html')
      let Url = url+'?page=click'
      chrome.tabs.create({ url: Url });
    },
    logout(){
      const vm = this
      store.dispatch('logout')
      vm.message = '注销成功'
      vm.showMessage = true
      setTimeout(function(){
        vm.showMessage = false
      },1500)
    }

  },
  mounted () {
    let page = document.getElementById('page').parentNode
    page.style.position = 'relative'
  }
}

</script>

<style lang="stylus" scoped>
#page
  width 80px
  background-color #fff
  height auto
  text-align center
  p
    font-size 14px
    color #333
    line-height 30px
    border-top 1px solid #b8d950
    cursor pointer
    &:first-child
      border-top none
    &:hover
      background-color #bef7ee
    &:active
      background-color #ccc
</style>
