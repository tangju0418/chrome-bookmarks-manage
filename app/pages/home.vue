<template>
  <div id="homePage">
    <header>
      <div class="search">
        <i class="weui-icon-search"></i>
        <input type="search" class="weui-search-bar__input" placeholder="搜索" v-model="message" @keyup.enter="query">
      </div>
      <router-link v-if="hasNoToken" to="/register" class="signup">
        注册
      </router-link>
      <router-link v-if="hasNoToken" to="/login" class="login">
        登录
      </router-link>
      <router-link v-else to="/logout" class="logout">
        注销
      </router-link>
    </header>
    <div class="content">
      <bookmark :Items="Items" :queryMessage="queryMessage"></bookmark>
    </div>
    <!-- 弹窗 -->
    <div class="hide" v-show="detail" @click="close"></div>
    <div class="hide-off hide-off-flowers" v-show="detail">
      <div class="weui-cells weui-cells_form">
        <div class="weui-cell" v-if="showdetail">
            <div class="weui-cell__hd"><label class="weui-label">名称</label></div>
            <div class="weui-cell__bd">
                <input class="weui-input" type="text" v-model="name">
            </div>
        </div>
        <div class="weui-cell" v-else>
            <div class="weui-cell__hd"><label class="weui-label">移动至</label></div>
            <div class="weui-cell__bd">
                <select class="weui-input" v-model="folderId">
                  <option value="-1" disabled>请选择文件夹</option>
                  <option v-for="i in folder" :value="i.id">{{i.title}}</option>
                </select>
            </div>
        </div>
      </div>
      <button v-if="showdetail" class="weui-btn register weui-btn_primary" @click="updateMark">确认修改</button>
      <button v-else class="weui-btn register weui-btn_primary" @click="showdetail = true">修改</button>
       <button v-if="showdetail" class="weui-btn register weui-btn_primary" @click="showdetail = false">移动</button>
       <button v-else class="weui-btn register weui-btn_primary" @click="moveMark">确认移动</button>
      <a class="weui-btn weui-btn_plain-primary wran" @click="deleteMark">删除</a>
    </div>

    <div class="hide" v-show="showMessage"></div>
    <div class="hide-off show-message" v-show="showMessage">
      <p class="title" v-if="!isEmpty(title)">{{title}}</p>
      <p class="content">{{message}}</p>
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
      vm.getBookMarks()
    })
  },
  data: function() {
    return {
      message:'',
      queryMessage:'',
      detail:false,
      name:'',
      folderId:'-1',
      showdetail:true,
      folder:[],
      hasNoToken:false,
      showMessage:false,
      title:'',
      message:'',
      //模拟书签数据
      information:[
        {
          children:[
            {children:[
              {
                children:[{
                  url:'muke',
                  title:'慕课网'
                },{
                  url:'w3c',
                  title:'W3C'
                }],
                title:'资料'
              },
              {
              url:'baidu',
              title:'百度'
              },{
              url:'fanyi',
              title:'翻译'
              }
            ],
            title:'常用'
            },{
            children:[
              {
              url:'vue',
              title:'vue'
              },{
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
    Items(){
      return store.state.bookmarks.Items
    },
    currentMark(){
      return store.state.currentmark.markbook
    },
  },
  methods: {
    isEmpty,
    getBookMarks(){
      chrome.bookmarks.getTree(
      function(bookmarkTreeNodes) {
        console.log('bookmarkTreeNodes',bookmarkTreeNodes)
        store.dispatch('setMarkbookItem',bookmarkTreeNodes)
      });
    },
    query(){
      this.queryMessage = this.message
    },
    close(){
      this.detail = false
      this.showdetail = true
      this.folderId = '-1'
      store.dispatch('deletMarkbook')
    },
    closeMessage(){
      const vm = this
      setTimeout(function(){
        vm.showMessage = false
        vm.title = ''
        vm.message = ''
      },1500)
    },
    updateMark(){
      const vm = this
      let id = vm.currentMark.id
      let title = vm.name
      try{
        chrome.bookmarks.update(id,{title:title},function(){
          vm.getBookMarks()
          vm.close()
          vm.showMessage = true
          vm.message = '修改成功'
          vm.closeMessage()
        })
      }catch(e){
        vm.showMessage = true
        vm.title="修改书签"
        vm.message = e.message
        vm.closeMessage()
      }
    },
    deleteMark(){
      const vm = this
      let id = vm.currentMark.id
      if(isEmpty(vm.currentMark.children)){
        try{
          chrome.bookmarks.remove(id,function(){
            vm.getBookMarks()
            vm.close()
            vm.showMessage = true
            vm.message = '删除成功'
            vm.closeMessage()
          })
        }catch(e){
          vm.showMessage = true
          vm.title="删除书签"
          vm.message = e.message
        }

      }else{
        try{
          chrome.bookmarks.removeTree(id,function(){
            vm.getBookMarks()
            vm.close()
            vm.showMessage = true
            vm.message = '删除成功'
            vm.closeMessage()
          })
        }catch(e){
          vm.showMessage = true
          vm.title="删除书签"
          vm.message = e.message
        }
      }
    },
    moveMark(){
      const vm = this
      vm.showdetail = false
      let id = vm.currentMark.id
      let parentId = vm.folderId
      if(parentId == '-1'){
        alert('请选择文件夹')
      }
      try{
        chrome.bookmarks.move(id,{parentId:parentId},function(){
          vm.getBookMarks()
          vm.close()
          vm.showMessage = true
          vm.message = '移动成功'
          vm.closeMessage()
        })
      }catch(e){
        vm.showMessage = true
        vm.title="移动书签"
        vm.message = e.message
      }
    },
    getFolder(items){
      const vm = this
      for (var i = 0; i < items.length; i++) {
        if('children' in items[i]){
          vm.folder.push( items[i] )
          if(!isEmpty(items[i].children)){
            vm.getFolder(items[i].children)
          }
        }
      }
    },


  },
  watch:{
    'currentMark':function(val){
      if(!isEmpty(val)){
        this.detail = true
        this.name = val.title
      }
    },
    'Items':function(val){
      this.getFolder(val[0].children)
    }
  },
  mounted () {
    let page = document.getElementById('homePage').parentNode
    page.style.position = 'fixed'
  }
}

</script>

<style lang="stylus" scoped>
  @import "styl/publics";
  header
    height 40px
    background -webkit-linear-gradient(left top, #47cfb9, #b8d950)
    background linear-gradient(left top, #47cfb9, #b8d950)
    .login,.signup,.logout
      padding 8px
      font-size 14px
      float right
    .login
      color blue
      &:active
        color #b70a0a
    .signup
      margin-right 30px
      color #333
      &:active
        color #b70a0a
    .logout
      margin-right 30px
      color #b70a0a
      &:active
        color blue
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
        max-width 6%
        padding 0 2%
      .weui-search-bar__input
        height 24px
        border none
        width 88%
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
    width 50%
    height 360px
    z-index 1000
    margin 0 auto
    position fixed
    overflow hidden
    text-align center
    border-radius 10px
    background-color #fff
    .weui-cells
      margin 50px 0
      .weui-label
        color #888
    .weui-btn
      width 80%
  .show-message
    top 30%
    width 300px
    height 300px
    .title
      font-size 24px
      margin-top 40px
      color #333
    .content
      font-size 24px
      margin-top 80px
      color #6c8030
  .wran
    border 1px solid #E64340
    color #E64340
    &:active
      border 1px solid #e48987
      color #e48987
</style>
