<template>
  <div class="container col a-c">
    <div class="swiper-wrapper col a-c">
      <van-swipe :autoplay="3000" indicator-color="#686194">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img :src="image" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="mid-wrap row j-b">
      <div class="mid-item" @click="integral" >
        <img class="mid-img" src="./block_1.png" alt="" />
        <div class="mid-title">当前积分</div>
        <div class="mid-des row a-c">365200 <img class="" src="./arrow.png" alt="" /></div>
      </div>
      <div class="mid-item" @click="getCard">
        <img class="mid-img" src="./block_2.png" alt="" />
        <div class="mid-how">如何获得？</div>
        <div class="mid-way">进货储值卡得积分</div>
      </div>
    </div>
    <div class="bar"></div>
    <!-- 导航栏 -->
    <div class="grid-wrap">
      <div class="grid-title row a-c j-b">
        <div class="grid-title-left row a-c">
          <div class="vertical"></div>
          <div class="grid-title-text">享服务</div>
        </div>
        <div class="grid-title-right row a-c">
          <div class="grid-more">查看更多</div>
          <img class="more-img" src="./arrow_s.png" alt="" />
        </div>
      </div>
      <div class="grid-list row a-c j-b">
        <div class="grid-item col a-c j-c">
          <img class="grid-item-img" src="./nav_1.png" alt="" />
          <div class="grid-item-text">VI设计</div>
        </div>
        <div class="grid-item col a-c j-c">
          <img class="grid-item-img" src="./nav_2.png" alt="" />
          <div class="grid-item-text">软件开发</div>
        </div>
        <div class="grid-item col a-c j-c">
          <img class="grid-item-img" src="./nav_3.png" alt="" />
          <div class="grid-item-text">视频包装</div>
        </div>
        <div class="grid-item col a-c j-c">
          <img class="grid-item-img" src="./nav_4.png" alt="" />
          <div class="grid-item-text">导师咨询</div>
        </div>
        <div class="grid-item col a-c j-c">
          <img class="grid-item-img" src="./nav_5.png" alt="" />
          <div class="grid-item-text">销售用品</div>
        </div>
      </div>
    </div>
    <div class="bar"></div>
    <div class="grid-wrap">
      <div class="grid-title row a-c j-b">
        <div class="grid-title-left row a-c">
          <div class="vertical"></div>
          <div class="grid-title-text">猜你喜欢</div>
        </div>
      </div>
      <div class="goods-wrap row j-b f-w">
        <div class="goods-item">
          <img class="goods-img" src="./img_url.png" alt="">
          <div class="goods-title">网站建设定制开发</div>
          <div class="goods-value"><span>2000</span> 积分</div>
        </div>
        <div class="goods-item">
          <img class="goods-img" src="./img_url.png" alt="">
          <div class="goods-title">网站建设定制开发</div>
          <div class="goods-value"><span>2000</span> 积分</div>
        </div>
        <div class="goods-item">
          <img class="goods-img" src="./img_url.png" alt="">
          <div class="goods-title">网站建设定制开发</div>
          <div class="goods-value"><span>2000</span> 积分</div>
        </div>

      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { Toast } from 'vant';
export default {
  data() {
    return {
      show: true,
      images: [
        require('./swiper.png'),
        require('./swiper.png')
      ],


    }
  },
  created() {
    Toast.loading({
      forbidClick: true
    })
  },
  mounted() {



  },
  beforeDestroy() {
  },
  destroy() {
  },
  methods: {
    getCard() {
      this.$router.push({
        path: '/getCard',
      })
    },
    integral() {
      this.$router.push({
        path: '/integral',
      })
    },


  },
  components: {

  }
}
</script>
<style scoped lang="stylus">
.container
  top 0px
  width 100%
  height 100%
  .swiper-wrapper
    width 100%
    .van-swipe
      width 92.8%
      margin-top 10.5px
      margin-bottom 10px
      border-radius 5px
      height 111px
      overflow hidden
    .van-swipe-item
      img
        width 100%
        height 111px
        overflow hidden
  .mid-wrap
    width 696px
    height 194px
    margin-top 10px
    margin-bottom 40px
    .mid-item
      width 341px
      color #ffffff
      position relative
      z-index 1
      .mid-img
        width 341px
        position absolute
        height 194px
        border-radius 5px
      .mid-title
        position relative
        z-index 1
        margin-top 35px
        margin-left 12px
        font-size 25px
      .mid-des
        position relative
        z-index 1
        margin-left 12px
        font-size 50px
        img
          width 22px
          margin-left 5px
      .mid-how
        position relative
        margin-top 35px
        margin-left 12px
        z-index 1
        font-size 29px
      .mid-way
        position relative
        z-index 1
        font-size 22px
        margin-left 12px
        margin-top 8px
  .bar
    width 100%
    height 18px
    background-color #f2f2f2
  .grid-wrap
    width 100%
    .grid-title
      padding 0 38px 0 20px
      height 79px
      .grid-title-left
        .vertical
          width 7px
          height 33px
          background-color #686194
        .grid-title-text
          font-size 30px
          color #2d2d2d
          font-weight 700
          margin-left 10px
      .grid-title-right
        .grid-more
          color #8a898a
          font-size 22px
        .more-img
          width 10px
    .grid-list
      padding 0 35px
      height 177px
      border-top 1px solid #f2f2f2
      .grid-item
        .grid-item-img
          width 64px
        .grid-item-text
          font-size 23px
          color #2d2d2d
          margin-top 17px
    .goods-wrap
      background-color #f2f2f2
      padding 30px
      .goods-item
        width 336px
        height 441px
        background-color #ffffff
        border-radius 10px
        overflow hidden
        margin-bottom 20px
        .goods-img
          width 100%
        .goods-title
          font-size 25px
          margin-left 16px
          margin-top 10px
        .goods-value
          color #b93662
          font-size 24px
          margin-left 16px
          margin-top 10px
          span
            font-size 33px
</style>