<template>
  <div class="channel-edit">
    <!-- 频道标题 -->
    <van-cell :border="false">
      <!-- 左侧标题 -->
      <template #title>
        <div>我的频道</div>
      </template>

      <!-- 右侧按钮 -->
      <template #default>
        <van-button
          class="edit-btn"
          plain
          round
          type="danger"
          size="mini"
          @click="isEditShow = !isEditShow"
        >
          {{ isEditShow ? '完成' : '编辑' }}
        </van-button>
      </template>
    </van-cell>

    <!-- 内容区域 -->
    <van-grid :gutter="10">
      <van-grid-item
        class="channel-item"
        v-for="(channel, index) in myChannels"
        :key="index"
        @click="onMyChannelClick(channel, index)"
      >
        <template #text>
          <span class="text" :class="{ active: active === index }">{{ channel.name }}</span>
        </template>

        <template #icon>
          <van-icon v-show="isEditShow && index !== 0" name="close" />
        </template>
      </van-grid-item>
    </van-grid>

    <!-- 频道推荐 -->
    <van-cell :border="false">
      <!-- 左侧标题 -->
      <template #title>
        <div>频道推荐</div>
      </template>
    </van-cell>

    <!-- 内容区域 -->
    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item
        :text="channel.name"
        class="channel-item"
        v-for="(channel, index) in recommendChannels"
        :key="index"
        icon="plus"
        @click="onAddChannel(channel)"
      />
    </van-grid>
  </div>
</template>

<script>
/*
  目标1：通过首页的频道列表中的数据展示到编辑频道弹出层中
  1. 将父组件中的channels频道列表传递给子组件
  2. 通过props获取数据后，遍历到页面上
*/

/*
  目标2：在编辑遮罩中，展示首页当前选中的频道
  1. 将父组件中<van-tabs>上绑定的当前选中索引变量active，传递给遮罩层
  2. 在子组件中设置动态样式（class style）去区别当前首页显示的频道
  当设置动态class发现，无法影响ui组件中的某一个小元素样式，那么想办法将该小元素以插槽的形式显式的提取出来，再设置动态class
*/

/*
  目标3：获取并展示所有频道接口
  获取：
  1. 查阅接口文档，并封装对应的接口，在index.js输出
  2. 通过分析，为了最大的保证用户体验，见获取全部频道的数据方法写在home.vue父组件中
  3. 在父组件中将全部频道数据传递给子组件
  展示：
  1. 通过计算属性 => 推荐频道 = 频道总数 - 我的频道 => 得到一个推荐频道的计算属性
  2. 把该计算属性数组遍历到推荐频道的页面上去

  使用lodash方法类库的步骤
  1. npm i lodash
  2. 在main.js中全局引入，并设置实例方法
  3. 可以通过this.$xxx的形式进行组件中的使用
*/

/*
  目标4：添加频道
  1. 给推荐频道中的每一个小频道绑定点击事件
  2. 通过点击事件将当前的频道元素对象通过push的方式添加到我的频道中

  为什么我们还没有做删除，但是频道推荐中的内容就自动减少了？ - 通过计算属性，可以自动的进行推荐频道的内容删除
*/

/*
  目标5： 编辑频道的操作
  切换编辑与跳转状态
  1. 创建一个状态变量，通过改变了来影响 删除图标、编辑/完成按钮 的展示
  2. 给编辑/完成 按钮绑定点击事件 来实现状态变量的切换
  3. 我的频道中，推荐 不可以出现删除图标

  切换频道逻辑
  1. 给我的频道中的每一个小频道绑定点击事件
  2. 通过判断状态值isEditShow的当前模式为false时，则进行跳转切换操作
  3. 通过$emit()的方式触发父组件的自定义事件，来实现active状态的切换
  4. 主动的关闭编辑频道弹框遮罩

  删除频道逻辑
*/
export default {
  name: 'ChannelEdit',
  props: {
    myChannels: {
      type: Array,
      default: () => []
    },
    active: {
      type: Number,
      default: 0
    },
    allChannels: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      myChannelsClone: this.myChannels,
      isEditShow: false // 控制编辑状态
    }
  },

  computed: {
    // 推荐频道
    // 计算属性会观察方法内部所依赖的数据，如果依赖数据发生变化，则计算属性重新计算
    recommendChannels () {
      // // 通过filter过滤操作，来筛选符合条件的数据 （在全部频道中，但不在我的频道列表的数据）
      // const tempList = this.allChannels.filter(channel => {
      //   // 通过查询数组的方法find / findIndex，遍历我的频道列表，看看有没有对应的频道内容
      //   const index = this.myChannels.findIndex(myChannel => {
      //     return myChannel.id === channel.id
      //   })

      //   // 如果index返回为-1。表示全部数据中有该元素，但我的频道中没有该元素 => 当index = -1 时，就是推荐频道的元素
      //   return index === -1
      // })
      // return tempList

      // differenceBy可能返回的数据是一个伪数组，那么建议对返回的数组做一次真数组处理
      // 参数1： 需要进行过滤的数组 => 大数组
      // 参数2： 需要删除参数1数组的部分 => 小数组
      // 参数3： 参数1与参数2 中的每个元素直接是通过哪个属性进行比较的
      return [...this.$_.differenceBy(this.allChannels, this.myChannels, 'id')]
    }
  },

  methods: {
    // 添加我的频道
    onAddChannel (channel) {
      // 不可以直接修改父组件传递过来的参数，所以需要在data中拷贝一份，大家都去修改堆内存中的数据
      this.myChannelsClone.push(channel)
    },

    // 我的频道点击事件
    onMyChannelClick (channel, index) {
      if (this.isEditShow) {
        // 在编辑状态下删除频道
      } else {
        // 在非编辑状态下，切换平道操作
        this.$emit('updateActive', index)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.channel-edit {
  .van-cell__title {
    color: #333;
    font-size: 32px;
    line-height: 58px;
    height: 100%;
  }

  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }

  .channel-item {
    width: 160px;
    height: 85px;

    :deep(.van-grid-item__content) {
      background-color: #f5f5f6;
      // 设置属性让文本一行展示不自动提行
      white-space: nowrap;
      .text, .van-grid-item__text {
        color: #222;
        font-size: 28px;
        margin-top: 0;
      }

      // 高亮频道样式
      .active {
        color: red;
      }

      // 去除插槽父元素的相对定位
      .van-grid-item__icon-wrapper {
        position: unset;
      }

      // 图标的位置展示
      .van-icon-close {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }

  // 专门针对频道推荐设置+的布局
  .recommend-grid {
    :deep(.van-grid-item__content) {
      flex-direction: row;
      .van-icon-plus {
        font-size: 28px;
        margin-right: 6px;
      }
    }
  }
}
</style>
