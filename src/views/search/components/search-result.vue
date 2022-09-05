<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item" :title="item" />
    </van-list>
  </div>
</template>

<script>
/*
  目标： 通过搜索框的内容进行接口数据的调用渲染搜索结果列表
  1. 从父组件中拿到搜索框内容 props
  2. 开启页面时调用接口获取数据 onLoad, van-list组件的load事件在页面渲染初期会自动调用一次
  3. onLoad方法中，有着怎么的处理数据步骤
  // 通过article-list.vue中的相似处理代码，集成到这个页面上
    1. 调用接口请求数据
    2. 通过push的形式将请求来的数据插入到列表的最后面（不是赋值不是赋值不是赋值）
    3. 将列表加载状态loading改变为false表示加载结束
    4. 判断数据是否加载完成，如果完成了则将finished改为true，如果没完成，那么向下翻页
*/
export default {
  name: 'SearchResult',
  data () {
    return {
      list: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }

        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 1000)
    }
  }
}
</script>

<style scoped lang="less"></style>
