<template>
  <div>
    <div class="weui-form-preview"  v-for="item in Items">
      <div class="weui-form-preview__hd">
          <label class="weui-form-preview__label">{{item.title}}</label>
          <em class="weui-form-preview__value">¥2400.00</em>
      </div>
      <div class="weui-form-preview__bd"  v-for=" i in item.children">
          <div class="weui-form-preview__item">
              <label class="weui-form-preview__label" v-if="!isEmpty(i)">{{i.title}}</label>
              <span class="weui-form-preview__value">电动打蛋机</span>
          </div>

      </div>

    </div>
    <div class="weui-form-preview">
      <div class="weui-form-preview__hd" style="background-color:#ccc">
          <label class="weui-form-preview__label">书签</label>
          <a class="weui-btn weui-btn_plain-primary wran">删除</a>
          <a class="weui-btn weui-btn_plain-primary">修改</a>
          <a class="weui-btn weui-btn weui-btn_plain-default">添加</a>
      </div>
      <div v-for=" i in 2">
        <div class="weui-form-preview__hd" >
          <label class="weui-form-preview__label" style="text-indent:2rem">常用</label>
          <a class="weui-btn weui-btn_plain-primary wran">删除</a>
          <a class="weui-btn weui-btn_plain-primary">修改</a>
          <a class="weui-btn weui-btn weui-btn_plain-default">添加</a>
        </div>
        <div class="weui-form-preview__bd"  v-for=" j in 2">
            <div class="weui-form-preview__item">
                <label class="weui-form-preview__label" style="text-indent:2rem">百度</label>
                <a class="weui-btn weui-btn_plain-primary wran">删除</a>
                <a class="weui-btn weui-btn_plain-primary">修改</a>
            </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Vue from 'vue'
import { isEmpty } from 'utils'

export default {
 beforeRouteEnter(to, from, next){
    next(vm =>{
      chrome.bookmarks.getTree(
        function(bookmarkTreeNodes) {
          console.log('书签列表0：',bookmarkTreeNodes[0].children)
          vm.Items = bookmarkTreeNodes[0].children
        });
      })
  },
  data: function() {
    return {
      Items:[]
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
  @import "styl/publics";
  .weui-btn
    width 100px
    font-size 14px
    float right
    margin-left 10px
  .wran
    border 1px solid #E64340
    color #E64340
    &:active
      border 1px solid #e48987
      color #e48987
  .weui-btn+.weui-btn
    margin-top 0

  .weui-form-preview__hd
    background-color #f3f3f3
    height 30px
    .weui-btn
      line-height 30px

  .weui-form-preview__bd
    border-bottom 1px solid #f3f3f3
    padding 5px 15px
    height 30px
    .weui-form-preview__item
      margin-left 15px
    .weui-btn
      line-height 30px

</style>
