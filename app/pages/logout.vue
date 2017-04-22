<template>
  <div></div>
</template>

<script>

import Vue from 'vue'
import store from 'app/store'

export default {
  beforeRouteEnter(to, from, next){
    store.dispatch('logout')
    next({ path: '/home' })
    console.log('logout')
  },

}

</script>
