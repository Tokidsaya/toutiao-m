// 频道相关接口模块
import { request } from '../utils/request.js'

/**
 * 获取所有频道列表
 */
export const getAllChannels = () => request({
  method: 'GET',
  url: '/v1_0/channels'
})
