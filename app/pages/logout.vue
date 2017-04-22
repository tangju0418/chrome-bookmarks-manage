<template>
  <div></div>
</template>

<script>

import Vue from 'vue'
import store from 'app/store'
import Setting from 'setting'


export default {
  beforeRouteEnter(to, from, next){
    store.dispatch('logout')
    if(to.query.page == 'home'){
      next({ path: '/home' })
    }

    console.log('logout')
  },

}

</script>
