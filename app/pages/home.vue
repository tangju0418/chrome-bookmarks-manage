<template>
  <div>
    <header>
      <div class="search">
        <i class="weui-icon-search"></i>
        <input type="search" class="weui-search-bar__input" id="searchInput" placeholder="搜索" required="">
      </div>
      <router-link to="/register" class="signup">
        注册
      </router-link>
      <router-link to="/login" class="login">
        登录
      </router-link>
    </header>
    <div class="content">
      <bookmark :information="Items"></bookmark>
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
          console.log('bookmarkTreeNodes',bookmarkTreeNodes[0].children)
          vm.Items = bookmarkTreeNodes[0].children
        });
      })
  },
  data: function() {
    return {
      Items:[],
      information:[
        {
          children:[
            {children:[
              {
                children:[{
                  children:[],
                  url:'muke',
                  title:'慕课网'
                },{
                  children:[],
                  url:'w3c',
                  title:'W3C'
                }],
                title:'资料'
              },
              {children:[],
              url:'baidu',
              title:'百度'
              },{
              children:[],
              url:'fanyi',
              title:'翻译'
              }
            ],
            title:'常用'
            },{
            children:[
              {children:[],
              url:'vue',
              title:'vue'
              },{
              children:[],
              url:'meui',
              title:'meui'
              }
            ],
            title:'工作'
            }
          ],
          title:'书签'
        },
        {
          children:[],
          title:'其它书签'
        }
      ],
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
  header
    height 40px
    background -webkit-linear-gradient(left top, #47cfb9, #b8d950)
    background linear-gradient(left top, #47cfb9, #b8d950)
    .login,.signup
      padding 8px
      font-size 14px
      float right
    .login
      color blue
    .signup
      margin-right 30px
      color #333
    .search
      width 400px
      max-width 40%
      float left
      background #fff
      height 24px
      margin 8px 15px
      border-radius 5px
      .weui-icon-search
        float left
        padding 0 5px
      .weui-search-bar__input
        height 24px
        border none
        width 90%
        float left
        outline none

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
