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
  {
    path: '/service',
    name: 'service',
    component: resolve => require(['pages/service/service'], resolve),
    meta: {
      title: '享服务',
    }
  },
  {
    path: '/serviceList',
    name: 'serviceList',
    component: resolve => require(['pages/serviceList/serviceList'], resolve),
    meta: {
      title: '更多享服务',
    }
  },
  {
    path: '/serviceDetail',
    name: 'serviceDetail',
    component: resolve => require(['pages/serviceDetail/serviceDetail'], resolve),
    meta: {
      title: '商品详情',
    }
  },
  {
    path: '/result',
    name: 'result',
    component: resolve => require(['pages/result/result'], resolve),
    meta: {
      title: '兑换失败',
    }
  },
  {
    path: '/order',
    name: 'order',
    component: resolve => require(['pages/order/order'], resolve),
    meta: {
      title: '查看订单',
    }
  },
  {
    path: '/signIn',
    name: 'signIn',
    component: resolve => require(['pages/signIn/signIn'], resolve),
    meta: {
      title: '账号登录',
    }
  },
  {
    path: '/personCenter',
    name: 'personCenter',
    component: resolve => require(['pages/personCenter/personCenter'], resolve),
    meta: {
      title: '个人中心',
    }
  },
  {
    path: '/orderList',
    name: 'orderList',
    component: resolve => require(['pages/orderList/orderList'], resolve),
    meta: {
      title: '查看订单',
    }
  },



]
Vue.use(VueRouter)
const router = new VueRouter({

  routes
})
export default router