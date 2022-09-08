// 评论相关接口模块
import { request } from '../utils/request.js'

/**
 * 获取文章评论列表
 *
 * @params type 评论类型 a文章评论或者c评论回复
 * @params source 源id，文章id或评论id
 * @params offset 翻页偏移量， 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
 * @params limit 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
 */
export const getComments = params => request({
  method: 'GET',
  url: '/v1_0/comments',
  params
})

/**
 * 评论点赞
 *
 * @params targetId 评论id
 */
export const addCommentLike = targetId => {
  return request({
    method: 'POST',
    url: '/v1_0/comment/likings',
    data: {
      target: targetId
    }
  })
}

/**
 * 取消评论点赞
 *
 * @params targetId 评论id
 */
export const deleteCommentLike = targetId => {
  return request({
    method: 'DELETE',
    url: `/v1_0/comment/likings/${targetId}`
  })
}

/**
 * 发布文章评论 或 评论回复
 *
 * @params  target 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
 * @params content 评论内容
 * @params art_id 文章id （如果target时评论id，才需要将文章id传递到art_id属性中）
 */
export const addComment = data => request({
  method: 'POST',
  url: '/v1_0/comments',
  data
})
