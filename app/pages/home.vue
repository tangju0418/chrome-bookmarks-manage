<template>
  <div>
    <header>
      <div class="search">
        <i class="weui-icon-search"></i>
        <input type="search" class="weui-search-bar__input" placeholder="搜索" v-model="message" @keyup.enter="query">
      </div>
      <router-link to="/register" class="signup">
        注册
      </router-link>
      <router-link to="/login" class="login">
        登录
      </router-link>
    </header>
    <div class="content">
      <bookmark :Items="Items" :queryMessage="queryMessage"></bookmark>
    </div>
    <!-- 弹窗 -->
    <div class="hide" v-show="detail" @click="close"></div>
    <div class="hide-off hide-off-flowers" v-show="detail">
      <div class="weui-cells weui-cells_form">
        <div class="weui-cell">
            <div class="weui-cell__hd"><label class="weui-label">名称</label></div>
            <div class="weui-cell__bd">
                <input class="weui-input" type="text" v-model="name">
            </div>
        </div>
      </div>
      <button class="weui-btn register weui-btn_primary">确认</button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import store from 'app/store'
import { post } from 'api'
import { isEmpty, back ,errorMessageHandler,createError,wrapError} from 'utils'
import weui from 'app_modules/weui/weui.min.js'

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
      message:'',
      queryMessage:'',
      detail:false,
      name:'',
      //模拟书签数据
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
    currentMark(){
      return store.state.currentmark.markbook
    },
  },
  methods: {
    isEmpty,
    query(){
      this.queryMessage = this.message
    },
    close(){
      this.detail = false
      store.dispatch('deletMarkbook')
    }
  },
  watch:{
    'currentMark':function(val){
      if(!isEmpty(val)){
        this.detail = true
        this.name = val.title
      }
    }
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
   .hide
    position fixed
    background-color #000
    z-index 1000
    top: 0
    right 0
    bottom 0
    left 0
    opacity 0.5
    max-width 100%
    margin 0 auto

  .hide-off
    left 0
    right 0
    top 24%
    width 500px
    height 300px
    z-index 1000
    margin 0 auto
    position fixed
    overflow hidden
    text-align center
    border-radius 10px
    background-color #fff
    .weui-cells
      margin 60px 0
      .weui-label
        color #888
    .weui-btn
      width 80%

</style>
