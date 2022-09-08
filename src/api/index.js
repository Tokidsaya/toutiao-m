// api接口统一导出文件

import { login, getSmsCode, getUserInfo, getUserChannels } from './user.js'
import { getArticles, getArticleById } from './article.js'
import { getAllChannels, addUserChannel, deleteUserChannel } from './channel.js'
import { getSearchSuggestions, getSearchResult } from './search.js'

export const loginAPI = login
export const getSmsCodeAPI = getSmsCode
export const getUserInfoAPI = getUserInfo
export const getUserChannelsAPI = getUserChannels
export const getArticlesAPI = getArticles
export const getAllChannelsAPI = getAllChannels
export const addUserChannelAPI = addUserChannel
export const deleteUserChannelAPI = deleteUserChannel
export const getSearchSuggestionsAPI = getSearchSuggestions
export const getSearchResultAPI = getSearchResult
export const getArticleByIdAPI = getArticleById
