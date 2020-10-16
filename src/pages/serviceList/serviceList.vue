<template>
  <div class="container">
    <div class="grid-wrap">
      <div class="grid-title row a-c j-b">
        <div class="grid-title-left row a-c j-c" style="border-right:1px solid #b8b8b8" @click="grid1">
          <div class="grid-title-text">{{drop1Name}}</div>
        </div>
        <div class="grid-title-left row a-c j-c" @click="grid2">
          <div class="grid-title-text">{{drop2Name}}</div>
        </div>

      </div>
      <!-- 下拉 -->
      <div class="grid-drop" v-if="drop1">
        <div class="drop-item row a-c j-b" v-for="(item,index) in cateList" :key="index" @click="drop(item.name,item.id,index,1)">
          <div class="drop-name">{{item.name}}</div>
          <div class="" :class="{'check':isActive1 == index}"></div>
        </div>
        <div class="drop-mask" @click="maskClose"></div>
      </div>
      <!-- 下拉 -->
      <div class="grid-drop" v-if="drop2">
        <div class="drop-item row a-c j-b" v-for="(item,index) in searList" :key="index" @click="drop(item.name,item.id,index,2)">
          <div class="drop-name">{{item.name}}</div>
          <div class="" :class="{'check':isActive2 == index}"></div>
        </div>
        <div class="drop-mask" @click="maskClose"></div>
      </div>
      <div class="bar"></div>
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
import { list, cate, sear } from 'api/index'
export default {
  data() {
    return {

      drop1: false,
      drop2: false,


      searList: [
        {
          describe: "",
          flag: "1",
          icon: "http://jfmall.app.fuyulove.com/images/nav_1.png",
          id: "0",
          imglist: "",
          imgurl: "",
          keyword: "",
          name: "筛选积分",
          partid: "0",
          remark: "",
          sort: "1",
          type: "0"
        },
      ],
      cateList: [
        {
          describe: "",
          flag: "1",
          icon: "http://jfmall.app.fuyulove.com/images/nav_1.png",
          id: "0",
          imglist: "",
          imgurl: "",
          keyword: "",
          name: "筛选品项",
          partid: "0",
          remark: "",
          sort: "1",
          type: "0"
        },
      ],
      isActive1: 0,
      isActive2: 0,
      drop1Name: localStorage.getItem("drop1Name") || "筛选品项",
      drop2Name: localStorage.getItem("drop2Name") || "筛选积分",
      catid: this.$route.query.catid,
      searid: this.$route.query.searid,
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
    this._cate()
    this._sear()

  },
  methods: {
    maskClose() {
      this.drop1 = false
      this.drop2 = false
    },
    _sear() {
      sear({
      }).then(res => {
        console.log('获取商品积分区间', res)
        this.searList = this.searList.concat(res.data.sear)
        let searId = this.searList.map(function (item) {
          return item.id;
        });
        let searIndex = searId.indexOf(this.$route.query.searid)
        if (searIndex > 0) {
          this.isActive2 = searIndex
        }
      })
    },
    _cate() {
      cate({
      }).then(res => {
        console.log('分类接口', res)
        this.cateList = this.cateList.concat(res.data.cate)
        let cateId = this.cateList.map(function (item) {
          return item.id;
        });
        let cateIndex = cateId.indexOf(this.$route.query.catid)
        if (cateIndex > 0) {
          this.isActive1 = cateIndex
        }

      })

    },
    // 点击左侧筛选
    grid1() {
      this.drop1 = true
      this.drop2 = false
    },
    // 点击右侧筛选
    grid2() {
      this.drop2 = true
      this.drop1 = false
    },
    // 点击下拉中的某一项
    drop(dropName, id, index, flag) {
      this.drop1 = false
      this.drop2 = false
      if (flag == 1) {
        this.isActive1 = index
        this.catid = id
        this.drop1Name = dropName
      }
      if (flag == 2) {
        this.isActive2 = index
        this.searid = id
        this.drop2Name = dropName
      }
      this.loadState()

      this._list()
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
          catid: this.catid,
          sear: this.searid
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
        .check
          background-image url('./check.png')
          width 27px
          height 18px
          background-size 100% 100%
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