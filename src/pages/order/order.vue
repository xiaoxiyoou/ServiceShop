<template>
  <div class="container">
    <div class="title-wrap row  a-c">
      <img class="correct" src="./correct.png" alt="" />
      <div class="text">兑换成功</div>
    </div>
    <div class="good-wrap row a-c">
      <img class="banner" src="./banner.png" alt="" />
      <div class="des-wrap">
        <div class="des">企业宣传品拍摄剪辑成片</div>
        <div class="value"><span>2000</span>积分</div>
      </div>
    </div>
    <div class="number row a-c">订单编号：1234567891012345678910</div>
    <div class="time row a-c">下单时间：2020-07-31 12:32:12</div>
    <div class="share col a-c j-c" @click="shareIntegral(true)">分享给好友</div>
    <share :qrcodeCon="qrcodeCon" @parentEvent="shareIntegral(false)" />
  </div>

</template>
<script type="text/ecmascript-6">
import share from 'components/share/share'
import { shareConfig } from 'assets/js/shareConfig.js'
export default {
  data() {
    return {
      qrcodeCon: false,


    }
  },
  mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 0
    shareConfig('您的好友已获得企业宣传品拍摄剪辑成片服务', 'http://union.app.jzb768.com/#/giveIntegral?id=' + localStorage.getItem('shopId'), '点开查看吧~', 'http://wx.app.jzb768.com/picture/share.jpg')

  },
  methods: {
    shareIntegral(flag) {
      this.qrcodeCon = flag
    },

  },
  components: {
    share
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
  .title-wrap
    padding 0 41px
    height 113px
    .correct
      width 56px
      height 56px
    .text
      font-size 32px
      color #333333
      font-weight 700
      margin-left 10px
  .good-wrap
    height 235px
    background #e5e5e5
    padding 0 40px
    .banner
      width 185px
    .des-wrap
      margin-left 21px
      .des
        font-size 30px
        color #111111
      .value
        font-size 25px
        margin-top 49px
        color #b93662
        span
          font-size 33px
  .number
    height 105px
    margin-left 40px
    border-bottom 1px solid #f2f2f2
    color #333333
    font-size 27px
  .time
    height 105px
    margin-left 40px
    border-bottom 1px solid #f2f2f2
    color #333333
    font-size 27px
  .share
    width 330px
    height 88px
    border-radius 44px
    border 2px solid #4f4683
    color #4f4683
    margin 0 auto
    margin-top 50px
    font-size 32px
</style>