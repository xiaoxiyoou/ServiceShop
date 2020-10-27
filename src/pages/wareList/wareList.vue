<template>
  <div class="container">
    <div class="swiper-wrapper col a-c">
      <van-swipe :autoplay="3000" indicator-color="#686194">
        <van-swipe-item v-for="(item, index) in bannerList" :key="index">
          <img :src="item.imgurl" @click="onClick(item.link)" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <van-tabs v-model="active" sticky title-active-color="#686194" color="#686194" @click="wareItem()">
      <van-tab v-for="(item,index) in wareData" :title="item.name" :key="index">
      </van-tab>
    </van-tabs>
    <div class="grid-wrap">
      <van-list v-model="loading" :finished="finished" :finished-text="finishedtext" @load="onLoad">
        <div class="goods-wrap row j-b f-w">
          <div class="goods-item" v-for="(item,index) in dataList" :key="index">
            <img class="goods-img" :src="item.imgurl" v-if="item.imgurl" alt="">
            <img class="goods-img" src="./../../assets/img/noMsg.png" v-else alt="">
            <div class="goods-title">{{item.title}}</div>
            <div class="goodsbtm row a-c j-b">
              <div class="goods-value">{{item.specific}} </div>
              <div class="goods-num">{{item.describe}}</div>
            </div>
          </div>
        </div>
        <noMessage :noinfoShow="noinfoShow" />
      </van-list>
    </div>
    <div class="btm row a-c j-c" @click="quiry()">点击了解更多产品</div>
    <van-popup class="Inquirypopup col a-c" closeable close-icon="close" v-model="popupshow">
      <img class="popimg" src="./pop.png">
      <input type="text" v-model="name" placeholder="请输入您的姓名">
      <input type="number" v-model="mobile" placeholder="请输入您的电话号码">
      <div class="btn col a-c j-c" @click="popBtn">提交</div>
      <div class="tip">请填写您的联系方式以便为您安排专员服务</div>
    </van-popup>
  </div>

</template>
<script type="text/ecmascript-6">
import noMessage from 'components/noMessage/noMessage'
import { wareList, wareCate, Inquiry } from 'api/index'
import { Toast } from 'vant'
export default {
  data() {
    return {
      popupshow: false,
      wareData: [],
      active: 1,
      noinfoShow: false,
      // 下拉加载
      dataList: [],
      finishedtext: '',
      loading: false,
      finished: false,
      page: 1,
      size: 10,
      count: '',
      listStatus: true,
      onLoadtatus: false,
      brandId: "",
      bannerList: [{ imgurl: require("./banner_2.png") }, { imgurl: require("./banner_3.png") }, { imgurl: require("./banner_1.png") }],
      wareId: [],
      name: localStorage.getItem("realname") || "",
      mobile: localStorage.getItem("mobile") || "",
      company: "",
      waresid: "",
      waresname: "",


    }
  },
  mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 0
    this.brandId = this.$route.query.brand
    this.active = parseInt(this.$route.query.active) + 1
    this._list()
    this._wareCate()

  },
  methods: {
    quiry() {

      this.popupshow = true
    },
    popBtn() {
      const myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!this.name) {
        Toast('请输入您的姓名')
        return false
      } else if (!this.mobile) {
        Toast('输入您的手机号码')
        return false
      } else if (!myreg.test(this.mobile)) {
        Toast('手机号格式错误')
        return false
      } else {
        this._Inquiry()
      }

    },
    _Inquiry() {
      Inquiry({
        name: this.name,
        mobile: this.mobile,
        company: this.company,
        waresid: this.waresid,
        waresname: this.waresname,
      }).then(res => {
        console.log('询价', res)
        if (res.code == 0) {
          Toast("申请成功，请耐心等待我们与您联系")
          this.popupshow = false
        } else {
          Toast(res.msg)
        }


      })
    },
    // 切换
    wareItem() {
      this.loadState()
      this.brandId = this.wareId[this.active]
      this._list()
    },
    _wareCate() {
      wareCate({
      }).then(res => {
        console.log('采购', res)
        this.wareData = res.data.cate
        this.wareData.unshift({ name: "全部", id: 0 })
        this.wareId = this.wareData.map(function (item) {
          return item.id;
        });

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
        wareList({
          page: this.page,
          size: this.size,
          brand: this.brandId
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
            this.finishedtext = '更多产品请咨询客服'
          }

        })
      }

    },
    // 清除下拉加载状态
    loadState() {
      this.dataList = []
      this.page = 1
      this.finished = false
      this.loading = false

    },


  },
  components: {
    noMessage
  }
}
</script>
<style scoped lang="stylus">
>>>.van-tab--active
  font-weight 700
>>>.van-list__finished-text
  background-color #f2f2f2
.container
  position absolute
  background-color #f2f2f2
  top 0px
  width 100%
  height 100%
  bottom 0
  .swiper-wrapper
    width 100%
    height 325px
    .van-swipe
      width 100%
      height 325px
      overflow hidden
    .van-swipe-item
      img
        width 100%
        height auto
        overflow hidden
  .grid-wrap
    width 100%
    .grid-title
      padding 0 38px 0 20px
      background-color #ffffff
      height 90px
      border-bottom 1px solid #f2f2f2
      position fixed
      top 0
      width 100%
      z-index 10
      .grid-title-left
        width 50%
        .vertical
          width 7px
          height 33px
          background-color #686194
        .grid-title-text
          font-size 30px
          color #2d2d2d
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
    .grid-drop
      position fixed
      top 90px
      background-color #ffffff
      width 100%
      .drop-mask
        position fixed
        background-color rgba(0, 0, 0, 0.3)
        width 100%
        height 100%
        z-index 100
      .drop-item
        height 77px
        margin-left 28px
        padding-right 28px
        border-bottom 1px solid #f5f5f5
        font-size 27px
        color #7a7a7a
    .bar
      height 90px
      width 100%
    .goods-wrap
      background-color #f2f2f2
      padding 30px 30px 0px
      // position relative
      top 90px
      .goods-item
        width 336px
        height 441px
        background-color #ffffff
        border-radius 10px
        overflow hidden
        margin-bottom 20px
        .goods-img
          width 100%
          height 331px
          display block
        .goods-title
          font-size 28px
          margin-left 16px
          margin-top 10px
          overflow hidden
          display -webkit-box
          -webkit-box-orient vertical
          -webkit-line-clamp 1
          text-overflow ellipsis
        .goodsbtm
          padding 0 16px
          .goods-value
            color #929292
            font-size 24px
            margin-top 10px
            span
              font-size 33px
          .goods-num
            color #929292
            margin-left 10px
            font-size 24px
            margin-top 15px
  .btm
    position fixed
    height 90px
    color #ffffff
    bottom 0
    width 100%
    background rgb(104, 97, 148)
  .Inquirypopup
    width 560px
    border-radius 10px
    overflow hidden
    .popimg
      width 100%
    input
      width 500px
      border-radius 10px
      height 70px
      border 2px solid rgb(104, 97, 148)
      margin-top 20px
      padding 10px
      font-size 28px
    .btn
      width 500px
      height 70px
      background rgb(104, 97, 148)
      border-radius 5px
      color #ffffff
      margin-top 20px
      letter-spacing 14px
    .tip
      color #929292
      font-size 25px
      margin 20px auto 30px
</style>