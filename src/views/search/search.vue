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
        @search="isResultShow = true"
        @focus="isResultShow = false"
      />
    </form>

    <!-- 列表标签 -->
    <!-- 搜索结果 首先通过开关状态来判断是否显示搜索结果 -->
    <search-result v-if="isResultShow"></search-result>

    <!-- 联想列表 当搜索结果为展开时，再判断搜索框中是否有值，如果有内容则显示联想列表 -->
    <search-suggestion v-else-if="seachInput" :seachInput="seachInput" @search="onSearch"></search-suggestion>

    <!-- 搜索历史 除上面两种情况以外，展示历史 -->
    <search-history v-else></search-history>

  </div>
</template>

<script>
/*
  目标1： 配置搜索路由页面， 新建3个子组件（搜索历史，联想建议，搜索结果）
  目标2： 在home.vue的顶部导航中视同vant自带的to属性来实现声明式跳转
  目标3： 查阅文档，设置搜索页面顶部查询框，并将3个业务组件渲染到页面上
*/

/*
  目标4： 3个组件的切换逻辑
  // 先归纳目前手上有哪些东西： 输入框内容 历史列表 联想列表 结果列表
  // 如果结果列表数组中有值时？ => 显示查询结果 => 发现有时候通过关键字搜索出来的数组为[],但是也需要展示结果页面 => 将显示查询结果的组件通过一个开关变量来控制是否显示
  // 如果输入框中有值时， => 是联想建议
  // 其余情况显示搜索历史
  // 当输入框再次聚焦时，会关闭变量开关
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
      seachInput: '',
      isResultShow: false
    }
  },
  methods: {
    // 点击联想，搜索结果
    onSearch (item) {
      /*
        1.1 更新输入框内容
        1.2 开启搜索结果页面
      */
      this.seachInput = item
      this.isResultShow = true
    }
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
