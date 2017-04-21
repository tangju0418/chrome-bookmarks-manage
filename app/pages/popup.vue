<template>
  <div id="page">
    <div class="mui-content">
      <p>合并</p>
      <p>注销</p>
      <p @click="toHome">选项</p>
    </div>
  </div>
</template>


<script>

import * as api from 'api'
import { isEmpty } from 'utils'
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
