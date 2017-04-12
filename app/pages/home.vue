<template>
  <div>
    <div class="weui-form-preview">
            <div class="weui-form-preview__hd">
                <label class="weui-form-preview__label">付款金额</label>
                <em class="weui-form-preview__value">¥2400.00</em>
            </div>
            <div class="weui-form-preview__bd" v-for="item in Items">
                <div class="weui-form-preview__item" v-for=" i in item">
                    <label class="weui-form-preview__label">商品{{i.length}}</label>
                    <span class="weui-form-preview__value">电动打蛋机</span>
                </div>

            </div>

        </div>
  </div>
</template>

<script>
import Vue from 'vue'


export default {
 beforeRouteEnter(to, from, next){
    next(vm =>{
      chrome.bookmarks.getTree(
        function(bookmarkTreeNodes) {
          console.log('书签列表0：',bookmarkTreeNodes)
          vm.Items = bookmarkTreeNodes
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

  }
}

</script>

<style lang="stylus" scoped>
  @import "styl/publics";

</style>
