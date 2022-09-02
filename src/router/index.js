import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/', // 根路由 - 当直接访问根路径时，就可以看到首页的组件
    component: () => import('../views/layout/layout.vue'),
    // 设置当前layout的4个子路由
    redirect: '/home', // 在首次进入layout组件时，需要重定向到首页子路由
    children: [
      {
        path: 'home', // 首页
        component: () => import('../views/home/home.vue')
      },
      {
        path: 'qa', // 问答
        component: () => import('../views/qa/qa.vue')
      },
      {
        path: 'video', // 视频
        component: () => import('../views/video/video.vue')
      },
      {
        path: 'my', // 个人中心
        component: () => import('../views/my/my.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('../views/login/login.vue')
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   // 通过在component属性中使用箭头函数的形式加载组件的文件资源。实现按需加载的功能，只有在使用到该路由时，才会进行组件文件的加载。 作用： 能够提高第一次开启页面时的加载效率
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
