<template>
  <div class="container">
    <div class="grid-wrap">
      <van-list v-model="loading" :finished="finished" :finished-text="finishedtext" @load="onLoad">
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
        <noMessage :noinfoShow="noinfoShow" />
      </van-list>
    </div>
  </div>

</template>
<script type="text/ecmascript-6">
import noMessage from 'components/noMessage/noMessage'
import { list } from 'api/index'
export default {
  data() {
    return {
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


    }
  },
  mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 0
    this._list()


  },
  methods: {



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
          // catid:0,
          // sear: 0,
          key: sessionStorage.getItem("serchValue")
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
    // 清除下拉加载状态
    loadState() {
      this.dataList = []
      this.page = 1
      this.finished = false
      this.loading = false

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
    noMessage
  }
}
</script>
<style scoped lang="stylus">
>>>.van-list__finished-text
  background-color #f2f2f2
.container
  position absolute
  background-color #f2f2f2
  top 0px
  width 100%
  height 100%
  bottom 0
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