<template>
  <div class="container col a-c">
    <img class="logo" src="./logo.png" alt="">
    <div class="phone-wrap row a-c">
      <img class="phone-img" src="./phone.png" alt="" />
      <input type="number" v-model="phoneNum" placeholder="请输入手机号码" />
      <div class="phone-btn row a-c j-c" v-if="disabled " @click="_getSendCode">发送验证码</div>
      <div class="phone-btn row a-c j-c" v-else> {{ time }}秒后重试</div>
    </div>
    <div class="phone-wrap row a-c">
      <img class="phone-img" src="./msg.png" alt="" />
      <input type="number" v-model="pwd" placeholder="请输入短信验证码" />
    </div>
    <!-- <div class="band row a-c">
      <img class="select" src="./select.png" alt="" />
      <div class="band-text">同步绑定微信</div>
    </div> -->
    <div class="btm row a-c j-c" @click="_submitPersonInfo">立即绑定</div>
  </div>

</template>
<script type="text/ecmascript-6">
import { getSendCode, sendPhoneBound } from 'api/index'
import { Toast } from 'vant';
export default {
  data() {
    return {
      phoneNum: '',
      pwd: '',
      time: 60,
      disabled: true

    }
  },
  mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 0

  },
  methods: {

    _getSendCode() {

      if (!this.phoneNum) {
        Toast('请输入手机号')
        return false;
      }
      const myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!myreg.test(this.phoneNum)) {
        Toast('手机号格式错误')
        return false;
      }
      this.disabled = false
      let timer = setInterval(() => {
        this.time--
        if (this.time === 0) {
          clearInterval(timer)
          this.disabled = true
          this.time = 60
        }
      }, 1000)
      getSendCode({
        mobile: this.phoneNum
      }).then(res => {
        console.log('发送验证码请求', res);
        Toast('验证码已发送')

      })


    },
    _submitPersonInfo() {
      const myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!this.phoneNum) {
        Toast('手机号不能为空')
        return false;
      } else if (!myreg.test(this.phoneNum)) {
        Toast('手机号格式错误')
        return false;
      } else if (!this.pwd) {
        Toast('验证码不能为空')
        return false;
      } else {
        // 点击确定
        sendPhoneBound({
          mobile: this.phoneNum,
          code: this.pwd
        }).then(res => {
          console.log(res)
          if (res.code === 0) {
            Toast('绑定成功')
            if (this.$route.query.sign == 1) {
              this.$router.go(-1)
            } else if (this.$route.query.sign == 2) {
              this.$router.replace({
                path: '/personCenter',
              })
            } else if (this.$route.query.sign == 3) {
              this.$router.replace({
                path: '/integral',
              })
            }
          } else {
            Toast(res.msg)
          }
        })
      }
    }

  },
  components: {
  }
}
</script>
<style scoped lang="stylus">
.container
  position absolute
  top 0px
  width 100%
  height 100%
  bottom 0
  .logo
    width 149px
    height 149px
    margin-top 103px
    margin-bottom 139px
  .phone-wrap
    width 690px
    border-bottom 1px solid #cccccc
    padding-bottom 30px
    padding-top 40px
    position relative
    .phone-img
      width 50px
      height 50px
      margin-right 30px
    input
      font-size 30px
    .phone-btn
      width 178px
      height 54px
      border-radius 27px
      background #686194
      color #ffffff
      font-size 26px
      position absolute
      right 0
  .band
    width 100%
    padding-left 28px
    margin-top 28px
    .select
      width 28px
      height 28px
      margin-right 10px
    .band-text
      font-size 24px
      color #333333
  .btm
    width 584px
    height 78px
    background #686194
    border-radius 39px
    color #ffffff
    font-size 36px
    margin-top 89px
</style>