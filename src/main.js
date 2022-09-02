import Vue from 'vue'
import App from './App.vue'
// 动态设置rem加载 - 在js代码中应该把所有的import引入模块的代码放到文件的最上方
import 'amfe-flexible'

// index 文件可以被快捷路径所忽略
// index命名的文件对于功能可读性来说是非常差的
import router from './router/index.js'
import store from './store/index.js'

// 引入icon字体图标
import './styles/icon.less'

// 全部引入vant
import Vant from 'vant'
import 'vant/lib/index.css'

// 全局样式
// 全局样式一定要写在组件样式表的下面，其目的是为了保证全局样式可以影响组件样式
import './styles/index.less'

// 引入时间处理模块
import './utils/dayjs'

// 引入lodash
import _ from 'lodash'
// 构建lodash的全局方法
Vue.prototype.$_ = _

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
