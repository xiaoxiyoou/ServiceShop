<template>
  <div class="container col a-c">
    <img class="sign" :src="sign" alt="" />
    <div class="status">恭喜您，兑换成功</div>
    <div class="tip">消耗<span>{{integral}}</span>积分</div>
    <div class="point">此为服务类商品，1-3个工作日将有客服人员</div>
    <div class="point">与您联系，请保持通讯畅通，谢谢！</div>
    <div class="btm row a-c j-c" @click="order">查看订单</div>
    <div class="ad-wrap" v-for="(item,index) in advList" :key="index" @click="advLink(item.link)">
      <img class="ad" :src="item.imgurl" alt="" />
    </div>
  </div>

</template>
<script type="text/ecmascript-6">
import { getAdver } from 'api/index'
export default {
  data() {
    return {
      sign: require('./success.png'),
      integral: this.$route.query.integral,
      advList: []


    }
  },
  mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 0
    this._getAdver()

  },
  methods: {
    _getAdver() {
      getAdver({
        type: 1
      }).then(res => {
        console.log('广告', res)
        this.advList = res.data.list

      })
    },
    //查看订单
    order() {
      this.$router.push({
        path: '/order',
        query: {
          orderid: this.$route.query.orderid,
        }
      })
    },
    // 查看广告
    advLink(link) {
      window.location.href = link

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
  .sign
    width 148px
    height 148px
    margin-top 74px
  .status
    color #333333
    font-size 32px
    margin-top 20px
    font-weight 700
  .tip
    color #333333
    margin-top 20px
    font-size 27px
    margin-bottom 46px
    span
      color #686194
  .point
    color #fe8678
    font-size 32px
    line-height 48px
  .btm
    width 330px
    height 88px
    border-radius 44px
    color #4f4683
    font-size 32px
    border 2px solid #4f4683
    margin-top 58px
    margin-bottom 58px
  .ad-wrap
    width 686px
    position relative
    margin-top 16px
    .ad
      width 100%
      border-radius 5px
    .des1
      position absolute
      z-index 1
      left 29px
      top 72px
      color #ffffff
      font-size 33px
      font-style oblique
      font-weight 700
      letter-spacing 2px
    .des2
      position absolute
      z-index 1
      left 29px
      top 121px
      font-size 24px
      color #ffffff
      letter-spacing 1px
    .btn
      position absolute
      right 59px
      top 69px
      width 130px
</style>