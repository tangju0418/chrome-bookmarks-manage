<template>
  <div>
    <header>
      <router-link to="/register" class="signup">
        注册
      </router-link>
      <router-link to="/login" class="login">
        登录
      </router-link>

    </header>
    <div class="content">
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

      <bookmark :information="information"></bookmark>

      <!-- <div class="weui-form-preview">
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
      </div> -->
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
