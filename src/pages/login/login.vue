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

      this.sid = 659
      console.log('uid', uid)
      console.log('sid', this.sid)
      if (uid === '' || uid === undefined || uid === null) {
        this.GetCode(this.sid)
      } else {
        this.GetOpenId(uid, this.sid)
      }
    },

    GetCode: function (sid) {
      // let redirectUrl = 'http://192.168.8.151:8080/wisdom/#' + this.$cookies.get('fromUrl')
      // let redirectUrl = 'http://b.fuyulove.com/wisdom/#' + this.$cookies.get('fromUrl')
      let redirectUrl = window.location.href
      let url = 'http://passport.fuyulove.com/connect/authorize?sid=' + sid + '&redirect_uri=' + redirectUrl;
      window.location.href = url
    },

    GetOpenId(uid, sid) {
      axios.get('http://passport.fuyulove.com/sns/getoken', {
        method: 'get',
        params: {
          uid: uid,
          sid: sid
        }
      }).then((res) => {
        console.log('登陆', res);
        var userid = res.data.data.userid
        var openid = res.data.data.openid
        var token = res.data.data.token

        this.$cookies.set('userid', userid)
        localStorage.setItem('userid', userid)
        localStorage.setItem('token', token)
        localStorage.setItem('openid', openid)
        // console.log(localStorage.getItem('fromUrl'))
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
    getUrlParam(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return decodeURI(r[2]);
      return null;
    },
    getCaption(obj) {
      var index = obj.lastIndexOf("=");
      obj = obj.substring(index + 1, obj.length);
      return obj;
    }



  }
}
</script>

<style scoped>
</style>
