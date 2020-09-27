<template>
  <div class="container"></div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios'
export default {
  data() {
    return {
      redirect: '',
      sid: ''
    }
  },
  mounted() {
    this._getCode()
  },
  methods: {
    _getCode() {
      let uid = this.getUrlParam('uid')
      this.sid = 660
      if (uid === '' || uid === undefined || uid === null) {
        this.GetCode(this.sid)
      } else {
        this.GetOpenId(uid, this.sid)
      }
    },
    //  拉取授权
    GetCode: function (sid) {
      let redirectUrl = window.location.href
      let url = 'http://jfmall.app.fuyulove.com/connect/Authorize?sid=' + sid + '&redirect_uri=' + redirectUrl;
      window.location.href = url
    },
    // 获取个人信息
    GetOpenId(uid, sid) {
      axios.get('http://passport.fuyulove.com/sns/getoken', {
        method: 'get',
        params: {
          uid: uid,
          sid: sid
        }
      }).then((res) => {
        console.log('登录', res);
        var userid = res.data.data.userid
        var openid = res.data.data.openid
        var token = res.data.data.token

        this.$cookies.set('userid', userid)
        localStorage.setItem('userid', userid)
        localStorage.setItem('token', token)
        localStorage.setItem('openid', openid)
        if (localStorage.getItem('fromUrl')) {
          this.$router.replace({
            path: localStorage.getItem('fromUrl')
          })
        } else {
          this.$router.replace({
            path: '/index'
          })

        }
      })


    },
    // 获取参数
    getUrlParam(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return decodeURI(r[2]);
      return null;
    },
    // getCaption(obj) {
    //   var index = obj.lastIndexOf("=");
    //   obj = obj.substring(index + 1, obj.length);
    //   return obj;
    // }



  }
}
</script>

<style scoped>
</style>
