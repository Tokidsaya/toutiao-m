<template>
  <div id="app">
    <!-- 路由器出口 -->
    <router-view />
    <h1>黑马头条</h1>
    <i class="toutiao toutiao-shouye"></i>
    <van-button type="default">默认按钮</van-button>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>

    <van-cell-group>
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" label="描述信息" />
    </van-cell-group>
    <div class="box">Hello World</div>
  </div>
</template>

<script>
import { loginAPI } from './api/index.js'
export default {
  methods: {
    // async await try catch
    async login () {
      try {
        const res = await loginAPI()
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.box{
  width: 400px;
  height: 100px;
  padding: 20px;
  background-color: pink;
}
</style>
