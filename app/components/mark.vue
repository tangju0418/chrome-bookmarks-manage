<template>
  <div>

    <ul v-for="info in information">
     <!--  {{info|json}} -->
      <div v-if="isEmpty(info.url)">
        <p class="underline">{{info.title}}
          <a class="weui-btn weui-btn_plain-primary wran">删除</a>
          <a class="weui-btn weui-btn_plain-primary">修改</a>
          <a class="weui-btn weui-btn weui-btn_plain-default">添加</a>
        </p>

        <bookmark v-if="!isEmpty(info.children)" :information="info.children"></bookmark>
      </div>
      <li v-if="!isEmpty(info.url)">{{info.title}}
        <a class="weui-btn weui-btn_plain-primary wran">删除</a>
        <a class="weui-btn weui-btn_plain-primary">修改</a>
      </li>

    </ul>

  </div>
</template>

<script>
import Vue from 'vue'
import { isEmpty } from 'utils'

export default {
  props: ['information'],
  data: function() {
    return {
      Items:[],

    }
  },

  computed: {

  },
  methods: {
    isEmpty,

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
