// 文章接口模块
import { request } from '../utils/request.js'

/**
 * 获取频道文章列表
 *
 */
export const getArticles = params => request({
  method: 'GET',
  url: '/v1_0/articles',
  params
})

/**
 * 获取文章详情
 *
 * @params articleId 文章id
 */
export const getArticleById = articleId => request({
  method: 'GET',
  url: `/v1_0/articles/${articleId}`
})
