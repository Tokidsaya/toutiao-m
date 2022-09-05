<template>
  <div class="search-container">
    <!-- 在van-search标签外层嵌套form标签，且action属性不能为空，即可在ios的输入法中显示搜索按钮 -->
    <form action="/">
      <van-search
        v-model="seachInput"
        background="rgb(50, 150, 250)"
        placeholder="请输入搜索关键词"
        show-action
        @cancel="$router.back()"
      />
    </form>

    <!-- 列表标签 -->
    <!-- 搜索历史 -->
    <search-history></search-history>

    <!-- 联想列表 -->
    <search-suggestion></search-suggestion>

    <!-- 搜索结果 -->
    <search-result></search-result>
  </div>
</template>

<script>
/*
  目标1： 配置搜索路由页面， 新建3个子组件（搜索历史，联想建议，搜索结果）
  目标2： 在home.vue的顶部导航中视同vant自带的to属性来实现声明式跳转
  目标3： 查阅文档，设置搜索页面顶部查询框，并将3个业务组件渲染到页面上
*/
import SearchHistory from './components/search-history.vue'
import SearchResult from './components/search-result.vue'
import SearchSuggestion from './components/search-suggestion.vue'
export default {
  name: 'SearchIndex',
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggestion
  },

  data () {
    return {
      seachInput: ''
    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.search-container {
  .van-search__action{
    color: white;
  }
}
</style>
