import Vue from 'vue'
import App from './App.vue'
// index文件可以被快捷路径忽略
import router from './router/index.js'
import store from './store/index.js'

// 引入icon
import './styles/icon.less'

// 导入vant
import Vant from 'vant'

// 加载Vant全局样式
import 'vant/lib/index.css'

// 加载动态设置 REM 基准值
// 在js代码中应该吧所有的import引入模块的代码放在文件的最上方
import 'amfe-flexible'
import VueRouter from 'vue-router'

// 注册使用Vant组件库
Vue.use(Vant)
// 加载全局样式
// import './styles/index.less'

Vue.config.productionTip = false

Vue.use(VueRouter)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
