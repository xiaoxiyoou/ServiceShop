<template>
  <div class="container">
    <div class="grid-wrap">
      <div class="grid-title row a-c j-b">
        <div class="grid-title-left row a-c j-c" style="border-right:1px solid #b8b8b8">
          <div class="grid-title-text">全部</div>
        </div>
        <van-dropdown-menu active-color="#686194">
          <!-- <van-dropdown-item v-model="value1" :options="option1" /> -->
          <van-dropdown-item v-model="value2" :options="option2" />
        </van-dropdown-menu>
      </div>
      <div class="bar"></div>
      <van-list v-model="loading" :finished="finished" :finished-text="finishedtext" @load="onLoad" >
        <div class="goods-wrap row j-b f-w" @click="serviceDetail(1)">
          <div class="goods-item" v-for="(item,index) in dataList" :key="index">
            <img class="goods-img" :src="item.imgurl" v-if="item.imgurl" alt="">
            <img class="goods-img" src="./noMsg.png" v-else alt="">
            <div class="goods-title">{{item.title}}</div>
            <div class="goods-value"><span>{{item.integral}}</span> 积分</div>
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
      value1: 0,
      value2: 'a',
      option1: [
        { text: '全部商品', value: 0 },
        { text: '新款商品', value: 1 },
        { text: '活动商品', value: 2 },
      ],
      option2: [
        { text: '默认排序', value: 'a' },
        { text: '好评排序', value: 'b' },
        { text: '销量排序', value: 'c' },
      ],
      dataList: [],
      noinfoShow: false,
      // 下拉加载
      finishedtext: '',
      loading: false,
      finished: false,
      page: 1,
      size: 5,
      count: '',
      listStatus: true,
      onLoadtatus: false


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
    // 清除下拉加载状态
    loadState() {
      this.list = []
      this.page = 1
      this.finished = false
      this.loading = false

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
    serviceDetail(flag) {
      this.$router.push({
        path: '/serviceDetail',
        query: {
          id: flag,
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
 background-color #f5f5f5
>>>.van-dropdown-menu
  width 50%
  height 1.2rem
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