<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <!-- 内容区域 -->
    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading
          color="#3296fa"
          vertical
        >加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="article.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <!-- 左侧图标插槽 -->
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <!-- 标题插槽 -->
          <div slot="title" class="user-name">{{ article.aut_name }}</div>
          <!-- 描述信息插槽 -->
          <div slot="label" class="publish-date">{{ article.pubdate | relativeTime }}</div>
          <!-- 右侧默认插槽 -->
          <van-button
            class="follow-btn"
            type="info"
            slot="default"
            color="#3296fa"
            round
            size="small"
            icon="plus"
          >关注</van-button>
          <!-- <van-button
            class="follow-btn"
            round
            size="small"
          >已关注</van-button> -->
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div ref="article-content" class="article-content markdown-body" v-html="article.content"></div>

        <van-divider>正文结束</van-divider>
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errStatus === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="loadArticleInfo">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
      >写评论</van-button>

      <!-- 评论数量展示 -->
      <van-icon
        name="comment-o"
        badge="123"
        color="#777"
      />

      <!-- 关注文章 -->
      <van-icon
        color="#777"
        name="star-o"
      />

      <!-- 点赞文章 -->
      <van-icon
        color="#777"
        name="good-job-o"
      />

      <!-- 转发文章 -->
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- /底部区域 -->
  </div>
</template>

<script>
/*
  $router => 路由的跳转功能 .back .push
  $route => 获取路由参数的方法 .query .params
*/
/*
  目标1： 处理加载内容 - 加载状态、文章内容、错误提示
  1. 创建一个loading状态变量，来控制当前页面数据的加载
  2. 通过article文章详情对象中的任意一个属性的存在来判断接口数据是否请求成功， 如article.title
  3. 如果没有请求成功，那么通过catch报错信息中返回的error.response.status是否等于404来确定到底显示哪一个错误提示盒子
  4. 请求错误时，的点击重试按钮设置点击事件重新调用 loadArticleInfo 方法
*/

/*
  目标2：文章详情正文的样式结构
  场景：发现在后端返回的正文富文本中，每一个不同要素的标签都有统一的一些列类名来表现。
  在正常的工作当中，应该根据产品经理提出的样式规范，来通过这些设置好的类名进行样式布局，一般情况下这种富文本结构样式的自定义配置单人可能会需要5~10个工作日才能完成

  我们发现这种正文部分其实与mackdown文件非常相似，可以考虑看看网上有没有对应mackdown文本现成的样式表，直接拿到当前页面上来使用（可能别人的样式表中的class类名与我们后端设计的类名不同，需要做单独处理 - 一般单人需要1~2个工作日）

  使用方式：
  1. 需要给当前组件中设置样式内容的父标签配置上专属的样式名称 markdown-body
  2. 在组件中局部引入样式表 @import
  3. 因为 .postcssrc.js 配置文件影响了全局样式的px比例问题，所以需要去忽略第三方提供的样式类型
*/

/*
  目标3：查看文章中的大图
  1. 我们明确了使用vant 组件中的图片预览ImagePreview， 通过其中的images数组属性来放置所有的文本图片路径，通过startPosition索引属性，来设置当前展开的图片
  2. 等待获取文章详情后所有的dom渲染完成后，去通过ref和$refs去页面上找到文章正文的父标签
  3. 找到之后，通过获取该父组件内部所有img标签的方式来返回图片列表（$refs元素对象.querySelectorAll('img')）
  4. 拿到的数组结构是伪数组，需要用[...伪数组]的形式进行真数组的转化
  5. 然后将该数组中的src图片路径转化为 ImagePreview组件中 images里的路径数组

  通过2-5步，就已经完成了images数组结构

  6. 为每一张图片绑定点击事件，该点击事件的逻辑部分（showImage示例方法）
  7. 通过图片当前所在数组的索引设置startPosition属性
*/
import { getArticleByIdAPI } from '../../api/index.js'
import { ImagePreview } from 'vant'
export default {
  name: 'ArticleIndex',
  props: {
    // 在路由规则数组中设置了porps：true时，就可以在组件的props属性中获取路由传递过来的参数了
    articleId: { // 文章id
      type: String,
      default: ''
    }
  },
  data () {
    return {
      article: {}, // 文章详情参数
      loading: true, // 刚进入页面时，默认开启加载状态，当请求接口完成后会主动关闭
      errStatus: 0 // 请求失败时的状态码，默认为0，主要是去判断是否是404
    }
  },

  created () {
    // 调用获取文章详情方法
    this.loadArticleInfo()
  },

  methods: {
    // 查看大图示例方法
    showImage () {
      ImagePreview({
        images: [
          'https://img01.yzcdn.cn/vant/apple-1.jpg',
          'https://img01.yzcdn.cn/vant/apple-2.jpg'
        ],
        startPosition: 1
      })
    },
    // 获取文章详情
    async loadArticleInfo () {
      // 开启加载状态
      this.loading = true
      try {
        const res = await getArticleByIdAPI(this.articleId)
        this.article = res.data.data
        console.log(this.article)

        // 2. 等待获取文章详情后所有的dom渲染完成后，去通过ref和$refs去页面上找到文章正文的父标签
        // 发现nextTick失效了，其实是因为v-html这个指令的印象
        // this.$nextTick(() => {
        //   console.log(this.$refs['article-content'])
        // })
        // 用setTimeout将其异步化
        setTimeout(() => {
          // console.log(this.$refs['article-content'])
          // 将展示大图的功能单独用方法提取出来
          this.previewImage()
        }, 0)
      } catch (error) {
        console.log(error)
        // 请求失败是，判断现在已哪种错误提示框展示
        // 在错误处理时，不一定所有error都有response属性，所以要在获取status之前去检查判断一下response属性是否存在
        if (error.response && error.response.status === 404) {
          this.errStatus = 404
        }
        this.$toast('获取文章详情失败')
      }

      // 无论成功还是失败，都需要关闭loading状态
      this.loading = false
    },

    // 查看大图的设置
    previewImage () {
      // 因为后端的缘故，导致有很多文章没有图片，或者是图片损坏，我们在`article-item.vue`跳转到这个文章详情页时，固定它的文章id为 7817
      // 3. 找到之后，通过获取该父组件内部所有img标签的方式来返回图片列表（$refs元素对象.querySelectorAll('img')）
      const articleContent = this.$refs['article-content']
      let imgs = articleContent.querySelectorAll('img')
      // 将伪数组转化为真数组
      imgs = [...imgs]
      console.log(imgs)
      // 5. 然后将该数组中的src图片路径转化为 ImagePreview组件中 images里的路径数组
      const imageSrcList = imgs.map(img => img.src)
      console.log(imageSrcList)
      // 6. 为每一张图片所在的dom元素 绑定点击事件，该点击事件的逻辑部分（showImage示例方法）
      imgs.forEach((img, index) => {
        // 每一个img都是一个dom元素
        img.onclick = () => {
          ImagePreview({
            images: imageSrcList, // 预览突破的合集部分，可以用作切换图片
            // 7. 通过图片当前所在数组的索引设置startPosition属性
            startPosition: index // 当前第一次打开的图片索引，从0开始计算
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
  @import './css/github-markdown.css';

  .article-container {
    .page-nav-bar {
      // /deep/
      :deep(.van-icon-arrow-left) {
        color: #fff;
      }
    }

    .main-wrap {
      padding-top: 92px;
      padding-bottom: 88px;
      overflow-y: scroll;
      background-color: #fff;
    }
    .article-detail {
      .article-title {
        font-size: 40px;
        padding: 50px 32px;
        margin: 0;
        color: #3a3a3a;
      }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
