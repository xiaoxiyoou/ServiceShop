<template>
  <div class="container col a-c">
    <img class="logo" src="./logo.png" alt="">
    <div class="phone-wrap row a-c">
      <img class="phone-img" src="./phone.png"  alt="" />
      <input type="number" placeholder="请输入手机号码" />
      <div class="phone-btn row a-c j-c">发送验证码</div>
    </div>
    <div class="phone-wrap row a-c">
      <img class="phone-img" src="./msg.png"  alt="" />
      <input type="number" placeholder="请输入短信验证码" />
    </div>
    <div class="band row a-c">
      <img class="select" src="./select.png" alt=""/>
      <div class="band-text">同步绑定微信</div>
    </div>
    <div class="btm row a-c j-c" @click="personCenter">立即绑定</div>
  </div>

</template>
<script type="text/ecmascript-6">
export default {
  data() {
    return {


    }
  },
  mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 0

  },
  methods: {
     personCenter() {
      this.$router.push({
        path: '/personCenter',
      })
    },

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
    margin-bottom  139px
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
    margin-top  28px
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