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
  .weui-form-preview__hd
    background-color #f3f3f3
</style>
