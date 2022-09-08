<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="个人信息"
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <!-- 个人信息（单元格） -->
    <van-cell title="头像" is-link class="photo-cell">
      <template #default>
        <van-image
          class="avatar"
          round
          fit="cover"
          :src="user.photo"
        />
      </template>
    </van-cell>
    <van-cell title="昵称" is-link :value="user.name" />
    <van-cell title="性别" is-link :value="user.gender === 0 ? '男' : '女'" />
    <van-cell title="生日" is-link :value="user.birthday" />
  </div>
</template>

<script>
/*
  目标1： 生产个人信息页面并跳转
  1. 创建user-prefile组件
  2. 在router规则数组中设置对应路由
  3. my.vue中的编辑信息按钮上实现路由跳转
*/

/*
  目标：制作昵称， 性别， 生日功能
  1. 都需要用到van-popup弹出层
  2. 昵称使用表单提交的规范化3步骤就能完成
  3. 性别使用van-picker组件实现，注意ui组件与实际数据的管理，培养你们阅读文档的能力
  4. 生日使用van-datetime-picker组件实现，和性别相似，数据较复杂
*/
import { getUserProfileAPI } from '../../api/index.js'
export default {
  name: 'UserProfile',
  data () {
    return {
      user: {} // 个人信息
    }
  },

  created () {
    // 获取用户基本信息
    this.loadProfile()
  },

  methods: {
    // 获取用户基本信息
    async loadProfile () {
      try {
        const res = await getUserProfileAPI()
        this.user = res.data.data
        console.log(res)
      } catch (error) {
        console.log(error)
        this.$toast('数据获取失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .user-profile {
    .page-nav-bar {
      // /deep/
      :deep(.van-icon-arrow-left) {
        color: #fff;
      }
    }

    .avatar {
      width: 60px;
      height: 60px;
    }

    .photo-cell {
      display: flex;
      align-items: center;
      .van-cell__value {
        display: flex;
        align-items: center;
        flex-direction: row-reverse;
      }
    }
  }
</style>
