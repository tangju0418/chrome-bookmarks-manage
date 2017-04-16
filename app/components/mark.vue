<template>
  <div>
    <ul v-for="item in Items">
      <div v-if="isEmpty(item.url)">
        <p class="underline">{{item.title}}
          <a class="weui-btn weui-btn_plain-primary wran">删除</a>
          <a class="weui-btn weui-btn_plain-primary" @click="update(item)">修改</a>
        </p>

        <bookmark v-if="!isEmpty(item.children)" :Items="item.children" :queryMessage="isMatched(item.title) ? '' : queryMessage"></bookmark>
      </div>
      <li v-if="!isEmpty(item.url) && isMatched(item.title)">{{item.title}}
        <a class="weui-btn weui-btn_plain-primary wran">删除</a>
        <a class="weui-btn weui-btn_plain-primary" @click="update(item)">修改</a>
      </li>
      <span v-if="!isEmpty(item.url) && !isMatched(item.title)"></span>
    </ul>
  </div>
</template>

<script>
import Vue from 'vue'
import store from 'app/store'
import { post } from 'api'
import { isEmpty, back ,errorMessageHandler,createError,wrapError} from 'utils'
import weui from 'app_modules/weui/weui.min.js'

export default {
  props: ['Items','queryMessage'],
  data: function() {
    return {

    }
  },

  computed: {

  },
  methods: {
    isEmpty,
    isMatched(title){
      if(String(title).indexOf(this.queryMessage) == -1){
        return false
      }
      return true
    },
    update(mark){
      store.dispatch('setMarkbook',mark)
    }
  }
}

</script>

<style lang="stylus" scoped>
  @import "../pages/styl/publics";

  .weui-btn
    width 80px
    font-size 12px
    float right
    margin-left 10px
    height 24px
    line-height 24px
    margin-top 3px
  .wran
    border 1px solid #E64340
    margin-right 15px
    color #E64340
    &:active
      border 1px solid #e48987
      color #e48987

  ul,li
    margin-left 20px
    line-height 30px
  .underline,li
    border-bottom 1px solid #ccc
    font-size 14px

</style>
