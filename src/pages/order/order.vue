<template>
  <div class="container">
    <div class="title-wrap row  a-c">
      <img class="correct" src="./correct.png" alt="" />
      <div class="text">{{title}}</div>
    </div>
    <div class="good-wrap row a-c" @click="serviceDetail(orderInfo.goods_id,orderInfo.cat_id)">
      <img class="banner" v-if="orderInfo.imgurl" :src="orderInfo.imgurl" alt="" />
      <img class="banner" v-else src="./../../assets/img/noMsg.png" alt="" />
      <div class="des-wrap">
        <div class="des">{{orderInfo.goodsname}}</div>
        <div class="value"><span>{{orderInfo.integral}}</span>积分</div>
      </div>
    </div>
    <div class="number row a-c">订单编号：{{orderInfo.ordernumber}}0</div>
    <div class="time row a-c">下单时间：{{orderInfo.createdate}}</div>
    <div class="share col a-c j-c" @click="shareIntegral(true)">分享给好友</div>
    <share :qrcodeCon="qrcodeCon" @parentEvent="shareIntegral(false)" />
  </div>

</template>
<script type="text/ecmascript-6">
import share from 'components/share/share'
import { shareConfig } from 'assets/js/shareConfig.js'
import { orderShow } from 'api/index'
export default {
  data() {
    return {
      qrcodeCon: false,
      orderInfo: '',
      title: "兑换成功"


    }
  },
  mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 0
    this._orderShow()
    if (this.$route.query.flag == 1) {
      this.title = "订单详情 "
    }
  },
  methods: {
    shareIntegral(flag) {
      this.qrcodeCon = flag
    },
    _orderShow() {
      orderShow({
        orderid: this.$route.query.orderid
      }).then(res => {
        console.log('订单详情', res)
        this.orderInfo = res.data.info
        shareConfig('您的好友已兑换' + this.orderInfo.goodsname,  'http://jfmall.app.fuyulove.com/goods/index.html#/serviceDetail?id=' + res.data.info.goods_id+'&catid='+res.data.info.cat_id, "存钱积分，积分当钱，你来就“兑”！", this.orderInfo.imgurl)
        // shareConfig('您的好友已兑换' + this.orderInfo.goodsname, 'http://jfmall.app.fuyulove.com/goods/index.html#/order?orderid=' + this.$route.query.orderid, '点开查看吧~', 'http://jfmall.app.fuyulove.com/goods/share.png')


      })
    },
    serviceDetail(flag, catid) {
      this.$router.push({
        path: '/serviceDetail',
        query: {
          id: flag,
          catid: catid
        }
      })
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
      height 185px
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