// 用户相关接口
import { request } from '../utils/request.js'
/*
*用户登录
*/
export const login = data => request({
  method: 'post',
  url: '/login',
  data
})
