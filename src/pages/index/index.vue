<template>
  <div class="container col a-c" v-if="showPage">
    <div class="head-wrap row a-c ">
      <img class="headImg" :src="info.headimgurl" alt="">
      <div>
        <div class="headName">{{info.nickname}}</div>
        <div class="integral" v-if=" parseInt(info.status)">当前积分:{{info.integral}}</div>
        <div class="integral" v-else>请先绑定手机号</div>
      </div>
      <div class="headbtn headbtnHover row a-c j-c" v-if=" parseInt(info.status)" @click="signIn">个人中心</div>
      <div class="headbtn row a-c j-c" v-else @click="band">绑定手机号</div>
    </div>
    <!-- <div class="swiper-wrapper col a-c">
      <van-swipe :autoplay="3000" indicator-color="#686194">
        <van-swipe-item v-for="(item, index) in bannerList" :key="index">
          <img :src="item.imgurl" @click="onClick(item.link)" />
        </van-swipe-item>
      </van-swipe>
    </div> -->
    <!-- <div class="mid-wrap row j-b">
      <div class="mid-item" @click="integral">
        <img class="mid-img" src="./block_1.png" alt="" />
        <div class="mid-title">当前积分</div>
        <div class="mid-des row a-c">{{info.integral}} <img class="" src="./arrow.png" alt="" /></div>
      </div>
      <div class="mid-item" @click="getCard">
        <img class="mid-img" src="./block_2.png" alt="" />
        <div class="mid-how">如何获得？</div>
        <div class="mid-way">进货储值卡得积分</div>
      </div>
    </div> -->
    <div class="bar"></div>
    <!-- 导航栏 -->
    <div class="grid-wrap">
      <div class="grid-title row a-c j-b" @click="service">
        <div class="grid-title-left row a-c">
          <div class="vertical"></div>
          <div class="grid-title-text">积分尊享服务</div>
        </div>
        <div class="grid-title-right row a-c">
          <div class="grid-more">查看更多</div>
          <img class="more-img" src="./arrow_s.png" alt="" />
        </div>
      </div>
      <div class="grid-list row a-c j-b">
        <div class="grid-item col a-c j-c" v-for="(item,index) in cateList" :key="index" @click="serviceList(0,item.id,item.name)">
          <img class="grid-item-img" :src="item.icon" alt="" />
          <div class="grid-item-text">{{item.name}}</div>
        </div>
      </div>
    </div>
    <div class="bar"></div>
    <div class="grid-wrap">
      <div class="grid-title row a-c j-b" @click="service">
        <div class="grid-title-left row a-c">
          <div class="vertical"></div>
          <div class="grid-title-text">现可采购用品</div>
        </div>
      </div>
      <img class="join" @click="join" :src="wareAdv.imgurl" alt="">
      <div class="logo-wrap row j-b">
        <div class="logo-cont col a-c j-c" v-for="(item,index) in wareData" :key="index" @click="wareList(item.id,index)">
          <img class="logo" :src="item.icon" alt="" />
          <div class="logo-title">{{item.name}}</div>
          <div class="logo-des">{{item.intro}}</div>
        </div>
      </div>
    </div>
    <div class="bar"></div>
    <div class="grid-wrap">
      <div class="grid-title row a-c j-b">
        <div class="grid-title-left row a-c">
          <div class="vertical"></div>
          <div class="grid-title-text">全部服务</div>
        </div>
      </div>
      <van-list v-model="loading" :finished="finished" :finished-text="finishedtext" @load="onLoad">
        <div class="goods-wrap row j-b f-w">
          <div class="goods-item" v-for="(item,index) in dataList" :key="index" @click="serviceDetail(item.id,item.cat_id)">
            <div class="goods-catetitle row a-c j-c" :style="{'background':item.color}">{{item.catname}}</div>
            <img class="goods-img" :src="item.imgurl" v-if="item.imgurl" alt="" :style="{'border':'6px solid ' + item.color}">
            <!-- <img class="goods-img" :src="item.imgurl" v-if="item.imgurl" alt=""> -->
            <img class="goods-img" src="./../../assets/img/noMsg.png" v-else alt="">
            <div class="goods-title">{{item.title}}</div>
            <div class="row a-c">
              <div class="goods-value"><span>{{item.integral}}</span> 积分</div>
              <div class="goods-num">{{item.price}}元</div>
            </div>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { cate, list, userInfo, wareCate } from 'api/index'
import { getAdver } from 'api/index'
export default {
  data() {
    return {
      color: "#666294",
      info: '',
      showPage: false,
      images: [
        require('./swiper.png'),
        require('./swiper.png')
      ],
      bannerList: [],
      cateList: [],
      // 下拉加载
      dataList: [],
      finishedtext: '',
      loading: false,
      finished: false,
      page: 1,
      size: 6,
      count: '',
      listStatus: true,
      onLoadtatus: false,
      wareData: [],
      wareAdv: [],


    }
  },
  created() {
    this._cate()
    this._list()
    this._userInfo()
    this._getAdver()
    this._wareCate()
    this._getAdver2()
  },
  mounted() {




  },
  beforeDestroy() {
  },
  destroy() {
  },
  methods: {
    onClick(link) {
      console.log(link)
      window.location.href = link
    },
    _wareCate() {
      wareCate({
      }).then(res => {
        console.log('采购', res)
        this.wareData = res.data.cate

      })
    },
    _getAdver() {
      getAdver({
        type: 0
      }).then(res => {
        console.log('广告', res)
        this.bannerList = res.data.list
        this.showPage = true

      })
    },
    _getAdver2() {
      getAdver({
        type: 2
      }).then(res => {
        console.log('采购广告', res)
        this.wareAdv = res.data.list[0]

      })
    },
    _userInfo() {
      userInfo({
      }).then(res => {
        console.log('个人信息', res)
        this.info = res.data.info
        localStorage.setItem("realname", this.info.realname)
        localStorage.setItem("mobile", this.info.mobile)

      })
    },
    onLoad() {
      if (this.onLoadtatus) {
        setTimeout(() => {
          // 加载状态结束
          this._list()
          this.loading = false;
          if (this.dataList.length >= this.count) {
            this.finished = true;
          }
        }, 1000);

      }
    },

    _list() {
      this.onLoadtatus = true
      if (this.listStatus) {
        this.listStatus = false
        list({
          page: this.page,
          size: this.size,
          catid: this.$route.query.id
        }).then(res => {
          console.log('列表接口', res)
          this.dataList = this.dataList.concat(res.data.list)
          this.count = res.data.count
          this.page = res.data.page
          this.listStatus = true
          if (this.count == 0) {
            this.noinfoShow = true
            this.finishedtext = ''
          } else {
            this.noinfoShow = false
            this.finishedtext = '没有更多数据了'
          }

        })
      }

    },
    _cate() {
      cate({
      }).then(res => {
        console.log('分类接口', res)
        this.cateList = res.data.cate

      })

    },

    serviceList(searid, catid, dropName) {
      if (searid) {
        localStorage.setItem('drop2Name', dropName)
        localStorage.setItem('drop1Name', "")
      }
      if (catid) {
        localStorage.setItem('drop1Name', dropName)
        localStorage.setItem('drop2Name', "")
      }
      this.$router.push({
        path: '/serviceList',
        query: {
          searid: searid,
          catid: catid,
        }
      })

    },
    signIn() {
      this.$router.push({
        path: '/personCenter',
      })
    },
    join() {
      this.$router.push({
        path: '/join',
      })
    },
    band() {
      this.$router.push({
        path: '/signIn',
        query: {
          sign: 2,
        }
      })
    },
    wareList(id, active) {
      this.$router.push({
        path: '/wareList',
        query: {
          brand: id,
          active: active
        }
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
    // 享服务
    service() {

      this.$router.push({
        path: '/service',
      })
    },
    // 如何获得
    getCard() {
      this.$router.push({
        path: '/getCard',
      })
    },
    //积分
    integral() {
      if (this.info.status == 1) {
        this.$router.push({
          path: '/integral',
        })
      } else {
        this.$router.push({
          path: '/signIn',
          query: {
            sign: 3,
          }
        })
      }
    },


  },
  components: {

  }
}
</script>
<style scoped lang="stylus">
>>>.van-list__finished-text
  background-color #f2f2f2
.container
  top 0px
  width 100%
  height 100%
  .head-wrap
    height 121px
    width 696px
    position relative
    .headImg
      width 70px
      height 70px
      border-radius 50%
    .headName
      color #292929
      font-size 28px
      margin-left 20px
    .integral
      color #8a898a
      font-size 22px
      margin-left 20px
      margin-top 10px
    .headbtn
      position absolute
      right 0
      width 136px
      height 44px
      border-radius 22px
      color #ffffff
      font-size 24px
      background-color #E00000
    .headbtnHover
      background #686194
  .swiper-wrapper
    width 100%
    .van-swipe
      width 92.8%
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
      border-bottom 1px solid #f2f2f2
      height 90px
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
          margin-left 8px
    .join
      width 696px
      margin 0 auto
      display block
      border-radius 10px
      margin-top 21px
    .logo-wrap
      padding 0 45px
      width 100%
      margin-top 19px
      margin-bottom 35px
      .logo-cont
        .logo
          width 145px
        .logo-title
          font-size 29px
          color #2d2d2d
          font-weight 700
        .logo-des
          font-size 23px
          color #8a898a
    .grid-list
      padding 0 35px
      height 177px
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
        // border-radius 10px
        overflow hidden
        margin-bottom 20px
        position relative
        .goods-catetitle
          position absolute
          left 6px
          top 6px
          width 140px
          height 50px
          font-weight 700
          font-size 28px
          color #ffffff
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