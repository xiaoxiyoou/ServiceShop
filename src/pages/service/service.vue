<template>
  <div class="container">
    <img class="banner" src="./banner.png" alt="" />
    <form action="/">
      <van-search v-model="value" background="#f2f2f2" placeholder="搜索" @search="onSearch" @cancel="onCancel" />
    </form>
    <!-- <div class="input-wrap row">
      <img class="input-img" src="./search.png" alt=""/>
      <input type="search" placeholder="搜索">
    </div> -->
    <!-- 导航栏 -->
    <div class="grid-wrap">
      <!-- <div class="grid-title row a-c j-b">
        <div class="grid-title-left row a-c">
          <div class="vertical"></div>
          <div class="grid-title-text">享服务</div>
        </div>
        <div class="grid-title-right row a-c" @click="service">
          <div class="grid-more">查看更多</div>
          <img class="more-img" src="./arrow_s.png" alt="" />
        </div>
      </div> -->
      <div class="grid-list row a-c j-b" @click="serviceList">
        <div class="grid-item col a-c j-c">
          <img class="grid-item-img" src="./../../assets/img/nav_1.png" alt="" />
          <div class="grid-item-text">VI设计</div>
        </div>
        <div class="grid-item col a-c j-c">
          <img class="grid-item-img" src="./../../assets/img/nav_2.png" alt="" />
          <div class="grid-item-text">软件开发</div>
        </div>
        <div class="grid-item col a-c j-c">
          <img class="grid-item-img" src="./../../assets/img/nav_3.png" alt="" />
          <div class="grid-item-text">视频包装</div>
        </div>
        <div class="grid-item col a-c j-c">
          <img class="grid-item-img" src="./../../assets/img/nav_4.png" alt="" />
          <div class="grid-item-text">导师咨询</div>
        </div>
        <div class="grid-item col a-c j-c">
          <img class="grid-item-img" src="./../../assets/img/nav_5.png" alt="" />
          <div class="grid-item-text">销售用品</div>
        </div>
      </div>
    </div>
    <div class="bar"></div>
    <div class="grid-wrap">
      <div class="grid-title row a-c j-b">
        <div class="grid-title-left row a-c">
          <div class="vertical"></div>
          <div class="grid-title-text">为你推荐</div>
        </div>
      </div>
      <div class="block-wrap row j-b">
        <img class="block" src="./block_1.png" alt="" />
        <img class="block" src="./block_2.png" alt="" />
        <img class="block" src="./block_3.png" alt="" />
      </div>
    </div>
    <div class="bar"></div>
    <div class="grid-wrap">
      <div class="grid-title row a-c j-b">
        <div class="grid-title-left row a-c">
          <div class="vertical"></div>
          <div class="grid-title-text">5千积分以下</div>
        </div>
      </div>
      <div class="goods-wrap row j-b f-w" @click="serviceDetail(1)">
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
    <div class="grid-wrap">
      <div class="grid-title row a-c j-b">
        <div class="grid-title-left row a-c">
          <div class="vertical"></div>
          <div class="grid-title-text">5千-1万积分</div>
        </div>
      </div>
      <div class="goods-wrap row j-b f-w" @click="serviceDetail(1)">
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
    <div class="grid-wrap">
      <div class="grid-title row a-c j-b">
        <div class="grid-title-left row a-c">
          <div class="vertical"></div>
          <div class="grid-title-text">1万积分以上</div>
        </div>
      </div>
      <div class="goods-wrap row j-b f-w" @click="serviceDetail(1)">
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
    <div class="bar"></div>
    <div class="bar"></div>

  </div>

</template>
<script type="text/ecmascript-6">
import { Toast } from 'vant';

export default {
  data() {
    return {

      value: '',
    }
  },
  mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 0

  },
  methods: {
      serviceDetail(flag) {
      this.$router.push({
        path: '/serviceDetail',
        query: {
          id: flag,
        }
      })
    },
    onSearch(val) {
      Toast(val);
    },
    onCancel() {
      Toast('取消');
    },
    serviceList() {
      this.$router.push({
        path: '/serviceList',
      })
    }

  },
  components: {
  }
}
</script>
<style scoped lang="stylus">
>>>.van-search__content
  background #ffffff
  border-radius 5px
.container
  position absolute
  top 0px
  width 100%
  height 100%
  bottom 0
  .banner
    width 100%
    height 320px
    display block
  // .input-wrap
  // .input-img
  // width 24px
  .bar
    width 100%
    height 18px
    background-color #f2f2f2
  .grid-wrap
    width 100%
    .grid-title
      padding 0 38px 0 20px
      height 90px
      border-bottom 1px solid #f2f2f2
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
      padding 30px 30px 0px
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
    .block-wrap
      padding 23px 30px 35px
      .block
        width 216px
</style>