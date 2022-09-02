// api接口统一导出文件

import { login, getSmsCode, getUserInfo, getUserChannels } from './user.js'
import { getArticles } from './article.js'
import { getAllChannels } from './channel.js'

export const loginAPI = login
export const getSmsCodeAPI = getSmsCode
export const getUserInfoAPI = getUserInfo
export const getUserChannelsAPI = getUserChannels
export const getArticlesAPI = getArticles
export const getAllChannelsAPI = getAllChannels
