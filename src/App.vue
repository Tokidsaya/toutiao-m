<template>
  <div id="app">
    <!-- 登录页面，layout -->
    <router-view></router-view>
  </div>
</template>

<script>
// import { loginAPI } from './api/index.js'

export default {
  name: 'App',

  methods: {
    // async await try catch
    // async login () {
    //   try {
    //     const res = await loginAPI()
    //     console.log(res)
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }
  }
}
</script>

<style lang="less" scoped>
.demo {
  width: 400px;
  padding: 20px;
  border: 1px solid red;
}
</style>
