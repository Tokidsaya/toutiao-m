// 全局封装axios请求模块
import axios from 'axios'

// axios.defaults.baseURL = 'http://toutiao.itheima.net/'

// 如果一个项目中存在多个基本url的配置时，该如何设置baseURL呢？
// axios.create() 通过axios实例创建基本请求对象
export const request = axios.create({
  baseURL: 'http://toutiao.itheima.net/'
})

// export const request2 = axios.create({
//   baseURL: 'http://toutiao2222.itheima.net/'
// })

export default axios
