import Vue from 'vue'
import VueRouter from 'vue-router'

// 同一个路由多次添加不被允许
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}
const routes = [{
    path: '/',
    redirect: '/login'
  },
  {
    path: '/index',
    name: 'index',
    component: resolve => require(['pages/index/index'], resolve),
    meta: {
      title: '服务商城',
      requireAuth: true,
    }
  },
  {
    path: '/login',
    name: 'login',
    component: resolve => require(['pages/login/login'], resolve),
    meta: {
      title: '服务商城',
    }
  },
  {
    path: '/getCard',
    name: 'getCard',
    component: resolve => require(['pages/getCard/getCard'], resolve),
    meta: {
      title: '进货储值卡',
    }
  },
  {
    path: '/integral',
    name: 'integral',
    component: resolve => require(['pages/integral/integral'], resolve),
    meta: {
      title: '积分明细',
    }
  },




]
Vue.use(VueRouter)
const router = new VueRouter({

  routes
})
export default router