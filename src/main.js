import Vue from 'vue'
import App from './App.vue'
import 'assets/js/vant'
import 'assets/js/noScaling'
import share from 'assets/js/share'
import 'assets/css/reset.css'
import 'amfe-flexible'
import store from './store/index'
import axios from 'axios'
import router from './router'
import LyTab from 'ly-tab'
Vue.use(LyTab)
import vueSwiper from 'vue-awesome-swiper'
Vue.use(vueSwiper);
import VueCookies from 'vue-cookies'
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$cookies = VueCookies
import "../node_modules/swiper/css/swiper.css"
import moment from 'moment'
Vue.prototype.$moment = 'moment'
import VueWechatTitle from 'vue-wechat-title'
Vue.use(VueWechatTitle)
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if (to.meta.requireAuth) {
    let fromUrl = VueCookies.get('fromUrl', to.fullPath)
    if (!fromUrl) {
      localStorage.setItem('fromUrl', to.fullPath)
    }
    if (localStorage.getItem('userid') != "undefined" && localStorage.getItem('userid') != null && localStorage.getItem('userid') != '' && localStorage.getItem('userid')) {
      share()
      next();
    } else {
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
})
Vue.filter('moment', function (value, formatString) {
  if (value) {
    formatString = formatString || 'YYYY年MM月';
    return moment(value).format(formatString);
  }
})
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')