// 用户相关接口
import { request } from '../utils/request.js'
// 主动引入store状态管理器
// import store from '../store/index.js'

/**
 * 用户登录
 *
 * @params mobile 手机号
 * @params code 验证码
 */
export const login = data => request({
  method: 'POST',
  url: '/v1_0/authorizations',
  data
})

/**
 * 发送验证码
 *
 * @params mobile 手机号
 */
export const getSmsCode = mobile => request({
  method: 'GET',
  url: `/v1_0/sms/codes/${mobile}`
})

/**
 * 获取用户本人信息
 *
 */
export const getUserInfo = () => request({
  method: 'GET',
  url: '/v1_0/user'
  // headers: {
  //   // token的数据格式注意，Bearer 后面有个空格
  //   Authorization: `Bearer ${store.state.user.token}`
  // }
})

/**
 * 获取用户频道列表
 *
 */
export const getUserChannels = () => request({
  method: 'GET',
  // url: '/v1_0/channels'
  url: '/v1_0/user/channels'
})
