<template>
  <div class="comment-reply">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="暂无回复"
      fixed
    >
      <template #left>
        <van-icon name="cross" @click="$emit('close')"/>
      </template>
    </van-nav-bar>
    <!-- /导航栏 -->

    <!-- 内容区域 -->
    <div class="scroll-wrap">
      <!-- 文章评论 -->
      <comment-item :comment="comment"></comment-item>

      <!-- 评论回复区 -->
      <van-cell title="全部回复"></van-cell>

      <!-- sourceId="comment.com_id" com_id为评论id -->
      <comment-list ref="comment-list" :sourceId="comment.com_id" type="c"></comment-list>
    </div>

    <!-- 底部评论区 -->
    <div class="reply-bottom">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
        @click="isPostShow = true"
      >写评论</van-button>
    </div>

    <!-- 回复评论弹框 -->
    <!-- 当vant弹框组件不设置高度时，实际的高度会以内容的高度来自适应 -->
    <van-popup v-model="isPostShow" position="bottom">
      <!-- 提交的输入框让你来选择， 是直接卸载这里还是创建组件呢？- 答需要，因为回复评论的地方也需要用到这个功能 -->
      <comment-post :targetId="comment.com_id" :artId="$route.params.articleId" @post-success="onPostSuccess"></comment-post>
    </van-popup>
  </div>
</template>

<script>
/*
  目标1：发现评论回复列表的结构和功能与 文章评论的结构完全一致，唯一区别在于查询列表数组的接口参数有所不同
  1. 需要保证原本comment-list组件中的接口调用的数据逻辑不会发生改变 - 将原本的type=a设置为默认的父组件传参
  2. 在通过自定义属性的方式来修改部分的接口传参数据
*/
import CommentItem from './comment-item.vue'
import CommentList from './comment-list.vue'
import CommentPost from './comment-post.vue'
export default {
  name: 'CommentReply',
  components: {
    CommentItem,
    CommentList,
    CommentPost
  },
  props: {
    comment: {
      type: Object,
      default: () => ({})
    }
  },

  data () {
    return {
      isPostShow: false
    }
  },
  methods: {
    onPostSuccess (item) {
      // 在评论列表头部添加新的评论内容
      // 将comment-post组件传递过来的元素，添加到comment-list组件列表头部
      // 通过ref 和 $refs 来调用子组件的添加操作，给子组件的list变量添加新元素
      this.$refs['comment-list'].unshiftComment(item)
      // 关闭弹框
      this.isPostShow = false

      // 发现，这里的代码处理和文字详情中一模一样。 出现这种情况的原因就是组件复用时各个方法和逻辑实现了统一，所以在制作某些功能时，你会发现，刚把值穿进去了功能直接就实现了
    }
  }
}
</script>

<style lang="less" scoped>
.comment-reply {
  // 顶部导航的全局样式 - 会影响组件样式表
  .van-nav-bar {
    background-color: #FFF;
    :deep(.van-nav-bar__title) {
      color: #000;
    }
  }

  .scroll-wrap {
    position: fixed;
    top: 92px;
    bottom: 88px;
    left: 0;
    right: 0;
    overflow-y: auto;
  }

  .reply-bottom {
    // 1. 盒子在页面上的布局
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 88px;
    // 2. 盒子内部的布局
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px solid #d8d8d8;

    .comment-btn {
      width: 70%;
    }
  }
}
</style>
