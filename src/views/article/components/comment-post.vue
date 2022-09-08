<template>
  <div class="post-comment">
    <!-- 评论的输入框内容 -->
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="优质评论将会被优先展示"
      show-word-limit
    />
    <!-- 发布按钮 -->
    <!-- 当输入框内容为空时，禁用发布按钮 -->
    <van-button
      class="post-btn"
      size="small"
      @click="onAddComment"
      :disabled="message.length === 0"
    >发布</van-button>
  </div>
</template>

<script>
/*
  通过最基本的表填提交操作，实现了评论内容的提交，但是有哪些地方是可以提升用户体验的呢？
  1. 当评论完成后，弹框应该收起
  2. 希望评论列表能够自动添加上当前的评论内容，而不需要刷新页面
  3. 弹出提示通知用户是否提交成功
*/
import { addCommentAPI } from '../../../api/index.js'
export default {
  name: 'CommentPost',
  // 接收数据
  // 与props写法一样，在inject中定义的属性，就是provide中发送过来参数
  // inject获取得到的参数，只能读取，不可修改
  inject: {
    articleIdG: {
      type: String,
      default: ''
    }
  },
  props: {
    targetId: { // 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
      type: String,
      default: ''
    },
    artId: {
      type: String,
      default: null
    }
    // null可以作为任何props传参中的默认值，即使你定义了这个数据的数据类型
    // 如果原本代码中需要这个变量扮演null这个角色时才可以设置
  },
  data () {
    return {
      message: ''
    }
  },

  mounted () {
    console.log('inject传递过来的id：', this.articleIdG)
  },

  methods: {
    // 发送评论请求
    async onAddComment () {
      try {
        // 1. 判空验证 - 当输入框内容为空时，禁用发布按钮
        if (this.message.trim().length <= 0) {
          this.$toast('评论内容不能为空')
          return
        }
        // 2. 调用接口提交表单
        // 问题： 当我们需要回复评论时，现在下面的这个this.targetId是不是需要赋值给art_id 属性？？？ 是1 不是2
        // 写代码时要遵循一个变量对应原则 => 1. 一个变量尽量对应一个数据类型； 2. 一个属性如果对应了一个变量的值时，那么不应该在其他情况下让该属性有其他变量来进行改写
        const res = await addCommentAPI({
          target: this.targetId, // 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
          content: this.message, // 评论内容
          art_id: this.artId // 文章id （如果target时评论id，才需要将文章id传递到art_id属性中）
        })
        console.log(res)
        // 3. 清空表单内容
        this.message = ''
        this.$toast('发布成功')
        // 4. 希望评论列表能够自动添加上当前的评论内容，而不需要刷新页面 - 将提交接口返回的评论对象放到评论列表的最上面
        // 5. 通知父组件关闭弹框
        this.$emit('post-success', res.data.data.new_obj)
      } catch (error) {
        console.log(error)
        this.$toast('发布失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.post-comment {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
