<template>
  <div class="container" v-wechat-title="title">
    <!-- <img class="banner" v-if="goodInfo.imgurl" :src="goodInfo.imgurl" alt="" /> -->
    <van-swipe v-if="images.length" class="banner" :autoplay="3000" indicator-color="#b93662">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img class="swipe-img" :src="image" />
      </van-swipe-item>
    </van-swipe>
    <img class="banner" v-else src="./banner.png" alt="" />
    <div class="title">{{goodInfo.title}}</div>
    <div class="des-wrap row a-c ">
      <div class="value"><span>{{goodInfo.integral}}</span>积分</div>
      <div class="num">{{goodInfo.price}}元</div>
      <div class="tip">不支持退换</div>
    </div>
    <div class="bar" ref="nav"></div>
    <div class="nav-wrap row a-c" :class="searchBarFixed == true ? 'isFixed' :''">
      <div class="nav-item row a-c j-c" :class="{'navtHover':isActive == index}" v-for="(item,index) in navList" :key="index" @click="activeNav(index)">{{item.name}}</div>
    </div>
    <div class="nav-wrap row a-c" style="border-bottom:1px solid #ffffff" v-if="searchBarFixed"></div>
    <div id="searchBar"></div>
    <div class="content" v-html="goodInfo.contents"></div>
    <div class="goodstitle row a-c j-c" ref="goodstitle">相关推荐</div>
    <div class="goodstitleTip" v-if="!dataList.length">暂无推荐，敬请期待~</div>
    <div class="goods-wrap row j-b f-w">
      <div class="goods-item" v-for="(item,index) in dataList" :key="index" @click="serviceDetail(item.id,item.cat_id)">
        <img class="goods-img" :src="item.imgurl" v-if="item.imgurl" alt="">
        <img class="goods-img" src="./../../assets/img/noMsg.png" v-else alt="">
        <div class="goods-title">{{item.title}}</div>
        <div class="row a-c">
          <div class="goods-value"><span>{{item.integral}}</span> 积分</div>
          <div class="goods-num">{{item.price}}元</div>
        </div>
      </div>
    </div>
    <div class="btm-wrap row j-b a-c">
      <div class="left ">
        <span class="total">合计：</span>
        <span class="value">{{goodInfo.integral}}</span>
        <span class="num">积分</span>
      </div>
      <div class="mid-wrap col j-c a-c" @click="home">
        <img class="mid-img" src="./../../assets/img/home.png" alt="" />
        <div class="mid">商城首页</div>
      </div>
      <div class="right row j-c a-c" @click="showPopup">立即兑换</div>
    </div>
    <!-- 购买弹出框 -->
    <van-popup v-model="show" class="pop-wrap col a-c j-c">
      <img class="pop-img" src="./pop.png" alt="" />
      <div class="pop-des row a-c">本次兑换消耗<div>{{goodInfo.integral}}积分</div>
      </div>
      <div class="pop-tip  a-c">（因商品特殊，不支持退换，请谨慎选择）</div>
      <div class="pop-btm-wrap row">
        <div class="cancel row a-c j-c" @click="cancel">取消</div>
        <div class="confirm row a-c j-c" @click="_buy">确定</div>
      </div>

    </van-popup>
  </div>

</template>
<script type="text/ecmascript-6">
import { detail, list, userInfo, buy } from 'api/index'
import { shareConfig } from 'assets/js/shareConfig.js'
import { Toast } from 'vant';
export default {
  data() {
    return {
      title: "",
      searchBarFixed: false,
      show: false,
      isActive: 0,
      navList: [
        {
          name: '商品详情',
        },

        {
          name: '相关推荐',
        }
      ],
      info: '',
      goodInfo: '',
      dataList: [],
      images: []


    }
  },
  mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 0
    this._detail()
    this._list()
    this._userInfo()
    this.$nextTick(() => {
      window.addEventListener('scroll', this.handleScroll)
    })

  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  destroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    _buy() {
      buy({
        id: this.$route.query.id
      }).then(res => {
        console.log('购买', res)
        if (res.code == 0) {
          this.$router.push({
            path: '/result',
            query: {
              orderid: res.data.orderid,
              integral: res.data.integral,
            }
          })
        } else {
          Toast(res.msg)
        }

      })
    },

    _userInfo() {
      userInfo({
      }).then(res => {
        console.log('个人信息', res)
        this.info = res.data.info

      })
    },
    // 滑动定位
    handleScroll() {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      var offsetTop = document.querySelector('#searchBar').offsetTop - 90
      // console.log(scrollTop)
      // console.log(offsetTop)
      if (scrollTop > offsetTop) {
        this.searchBarFixed = true
      } else {
        this.searchBarFixed = false
      }

    },
    _detail() {
      detail({
        id: this.$route.query.id
      }).then(res => {
        console.log('详情', res)
        this.goodInfo = res.data.info
        if (this.goodInfo.imglist) {
          this.images = this.goodInfo.imglist.split('|')
          this.images = this.images.filter(function (s) {
            return s && s.trim();
          });
        }
        this.title = this.goodInfo.title
        shareConfig(this.goodInfo.title, 'http://jfmall.app.fuyulove.com/goods/index.html#/serviceDetail?id=' + this.$route.query.id + '&catid=' + this.$route.query.catid, "存钱积分，积分当钱，你来就“兑”！", this.goodInfo.imgurl)

      })
    },
    _list() {
      list({
        page: 1,
        size: 4,
        catid: this.$route.query.catid,
        goodsid: this.$route.query.id,
        recom: 1
      }).then(res => {
        console.log('列表接口', res)
        this.dataList = res.data.list
      })

    },
    serviceDetail(flag, catid) {
      this.$router.replace({
        path: '/serviceDetail',
        query: {
          id: flag,
          catid: catid
        }
      })
    },
    // 购买
    showPopup() {
      if (this.info.status == 1) {
        this.show = true;
      } else {
        this.$router.push({
          path: '/signIn',
          query: {
            sign: 1,
          }
        })
      }
    },
    home() {
      this.$router.push({
        path: '/index',
      })
    },
    // 点击取消
    cancel() {
      this.show = false;
    },
    // 切换导航栏
    activeNav(flag) {
      console.log(flag)
      this.isActive = flag
      if (flag == 0) {
        this.$refs.nav.scrollIntoView({
          behavior: "smooth",
          block: "start"  // 上边框与视窗顶部平齐。默认值
        });
      }
      if (flag == 1) {
        this.$refs.goodstitle.scrollIntoView({
          behavior: "smooth",
          block: "start"  // 上边框与视窗顶部平齐。默认值
        });
      }
    },


  },
  components: {
  }
}
</script>
<style scoped lang="stylus">
>>>.swipe-img
  height 420px
  width 100%
.container
  position absolute
  top 0px
  width 100%
  height 100%
  bottom 0
  .banner
    width 100%
    height 420px
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
    .num
      text-decoration line-through
      color #c6c6c6
      margin-left 10px
      margin-top 20px
      font-size 24px
    .tip
      color #bdbdbd
      position absolute
      right 30px
      font-size 25px
  .bar
    height 20px
    width 100%
    background #f5f5f5
  .isFixed
    position fixed
    background-color #Fff
    top 0
    z-index 999
  .nav-wrap
    width 100%
    height 92px
    border-bottom 1px solid #f5f5f5
    .nav-item
      width 50%
      font-size 28px
      color #414141
    .navtHover
      color #696198
      font-weight 700
      font-size 32px
  .content
    padding 10px 10px 0px
    font-size 30px
    >>>img
      width 100%
      display block
    >>>video
      width 100%
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
      width 354px
      // height 100%
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
    .mid-wrap
      width 155px
      height 100%
      border-left 1px solid #ededed
      .mid-img
        width 32px
      .mid
        font-size 25px
        color #555658
    .right
      width 240px
      background #696198
      height 100%
      color #ffffff
      font-size 33px
  .pop-wrap
    width 511px
    border-radius 10px
    overflow hidden
    .pop-img
      width 100%
    .pop-des
      color #969696
      font-size 40px
      margin-top 65px
      div
        color #696198
    .pop-tip
      color #969696
      font-size 25px
      margin-top 10px
    .pop-btm-wrap
      width 100%
      height 87px
      margin-top 57px
      border-top 2px solid #f2f2f2
      background-color #686194
      .cancel
        width 50%
        color #969696
        height 100%
        background #ffffff
      .confirm
        width 50%
        background #686194
        color #ffffff
        height 100%
  .goodstitle
    text-align center
    height 50px
    height 90px
  .goodstitleTip
    padding-left 30px
    margin-top 30px
    font-size 28px
    color #666666
  .goods-wrap
    padding 30px 30px 0px
    top 90px
    margin-bottom 250px
    padding-bottom 100px
    .goods-item
      width 336px
      height 441px
      background-color #ffffff
      border-radius 10px
      overflow hidden
      box-shadow 1px 1px 10px #f2f2f2
      margin-bottom 20px
      .goods-img
        width 100%
        height 331px
        display block
      .goods-title
        font-size 25px
        margin-left 16px
        margin-top 10px
        overflow hidden
        display -webkit-box
        -webkit-box-orient vertical
        -webkit-line-clamp 1
        text-overflow ellipsis
      .goods-value
        color #b93662
        font-size 24px
        margin-left 16px
        margin-top 10px
        span
          font-size 33px
      .goods-num
        text-decoration line-through
        color #c6c6c6
        margin-left 10px
        font-size 24px
        margin-top 15px
</style>