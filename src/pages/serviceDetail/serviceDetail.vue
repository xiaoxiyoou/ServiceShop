<template>
  <div class="container">
    <img class="banner" src="./banner.png" alt="" />
    <div class="title">网站建设 定制开发专业、时效</div>
    <div class="des-wrap row a-c j-b">
      <div class="value"><span>6万</span>积分</div>
      <div class="tip">不支持退换</div>
    </div>
    <div class="bar"></div>
    <div class="nav-wrap row a-c">
      <div class="nav-item row a-c j-c" :class="{'navtHover':isActive == index}" v-for="(item,index) in navList" :key="index" @click="activeNav(index)">{{item.name}}</div>
    </div>
    <img class="banner" src="./banner.png" alt="" />
    <div class="btm-wrap row j-b a-c">
      <div class="left ">
        <span class="total">合计：</span>
        <span class="value">6万</span>
        <span class="num">积分</span>
      </div>
      <div class="right row j-c a-c" @click="showPopup">立即兑换</div>
    </div>
    <!-- 购买弹出框 -->
    <van-popup v-model="show" class="pop-wrap col a-c j-c">
      <img class="pop-img" src="./pop.png" alt="" />
      <div class="pop-des row a-c">本次兑换消耗<div>12231积分</div>
      </div>
      <div class="pop-btm-wrap row">
        <div class="cancel row a-c j-c">取消</div>
        <div class="confirm row a-c j-c" @click="result">确定</div>
      </div>

    </van-popup>
  </div>

</template>
<script type="text/ecmascript-6">
export default {
  data() {
    return {
      show: false,
      isActive: 0,
      navList: [
        {
          name: '商品详情',
        }, {
          name: '商品介绍',
        }, {
          name: '相关推荐',
        }
      ]


    }
  },
  mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 0

  },
  methods: {
    // 购买
    showPopup() {
      this.show = true;
    },
    // 切换导航栏
    activeNav(flag) {
      console.log(flag)
      this.isActive = flag
    },
    //确认购买
    result() {
      this.$router.push({
        path: '/result',

      })
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
  .banner
    width 100%
  .title
    padding 15px 32px 5px
    color #111111
    font-size 32px
  .des-wrap
    padding 10px 32px 5px
    .value
      color #b93662
      font-size 30px
      span
        font-size 53px
    .tip
      color #bdbdbd
      font-size 25px
  .bar
    height 20px
    width 100%
    background #f5f5f5
  .nav-wrap
    height 92px
    .nav-item
      width 33%
      font-size 28px
      color #414141
    .navtHover
      color #696198
      font-weight 700
      font-size 32px
  .btm-wrap
    position fixed
    z-index 10
    height 102px
    bottom 0
    width 100%
    border-top 1px solid #f2f2f2
    background #ffffff
    .left
      margin-left 33px
      .total
        font-size 25px
        color #3c3c3c
      .num
        color #b93662
        font-size 25px
      .value
        color #b93662
        font-size 40px
        font-weight 700
    .right
      width 240px
      background #696198
      height 100%
      color #ffffff
      font-size 33px
  .pop-wrap
    width 511px
    border-radius 10px
    .pop-img
      width 100%
    .pop-des
      color #969696
      font-size 40px
      margin-top 65px
      div
        color #696198
    .pop-btm-wrap
      width 100%
      height 87px
      margin-top 87px
      border-top 1px solid #f2f2f2
      .cancel
        width 50%
        color #969696
      .confirm
        width 50%
        background #686194
        color #ffffff
</style>