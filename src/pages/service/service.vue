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
      <div class="grid-list row a-c j-b">
        <div class="grid-item col a-c j-c" v-for="(item,index) in cateList" :key="index" @click="serviceList(0,item.id,item.name)">
          <img class="grid-item-img" :src="item.icon" alt="" />
          <div class="grid-item-text">{{item.name}}</div>
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
        <img class="block" src="./block_1.png" alt="" @click="serviceList(1,0,'5千积分以下')" />
        <img class="block" src="./block_2.png" alt="" @click="serviceList(1,0,'5千-2万积分')" />
        <img class="block" src="./block_3.png" alt="" @click="serviceList(1,0,'2万积分以上')"/>
      </div>
    </div>
    <div class="bar"></div>
    <div class="grid-wrap" ref="block1" v-for="(itemOut,index) in searList" :key="index">
      <div class="grid-title row a-c j-b">
        <div class="grid-title-left row a-c">
          <div class="vertical"></div>
          <div class="grid-title-text">{{itemOut.name}}</div>
        </div>
        <div class="grid-title-right row a-c" @click="serviceList(itemOut.id,0,itemOut.name)">
          <div class="grid-more">查看更多</div>
          <img class="more-img" src="./arrow_s.png" alt="" />
        </div>
      </div>
      <div class="goods-wrap row j-b f-w" v-if="dataList[itemOut.id]">
        <div class="goods-item" v-for="(item,index) in dataList[itemOut.id]" :key="index" @click="serviceDetail(item.id,item.cat_id)">
          <img class="goods-img" :src="item.imgurl" v-if="item.imgurl" alt="">
          <img class="goods-img" src="./../../assets/img/noMsg.png" v-else alt="">
          <div class="goods-title">{{item.title}}</div>
         <div class="row a-c">
              <div class="goods-value"><span>{{item.integral}}</span> 积分</div>
              <div class="goods-num">{{item.price}}元</div>
            </div>
        </div>
      </div>
    </div>

    <div class="bar"></div>
    <div class="bar"></div>

  </div>

</template>
<script type="text/ecmascript-6">
import { Toast } from 'vant';
import { cate, sear, list } from 'api/index'
export default {
  data() {
    return {
      value: '',
      searList: [],
      cateList: [],
      dataList: [],
    }
  },
  mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 0
    this._cate()

    this.$nextTick(() => {

      this._sear()

    })
  },
  methods: {
    _list(id) {
      list({
        page: 1,
        size: 4,
        sear: id
      }).then(res => {
        console.log('列表接口', res)
        this.dataList[id] = res.data.list
        console.log(this.dataList)
        this.$forceUpdate() //强制刷新

      })

    },
    _sear() {
      sear({
      }).then(res => {
        console.log('获取商品积分区间', res)
        this.searList = res.data.sear
        let searId = this.searList.map(function (item) {
          return item.id;
        });
        console.log(searId)
        for (let id of searId) {
          this._list(id)
        }
      })
    },
    _cate() {
      cate({
      }).then(res => {
        console.log('分类接口', res)
        this.cateList = res.data.cate
      })
    },
    serviceDetail(flag) {
      this.$router.push({
        path: '/serviceDetail',
        query: {
          id: flag,
        }
      })
    },
    onSearch(val) {
      // Toast(val);
      sessionStorage.setItem("serchValue",val)
      this.$router.push({
        path: '/searchList',
      
      })
    },
    onCancel() {
      Toast('');
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
          margin-left 8px
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
          margin-top 10px
    .block-wrap
      padding 23px 30px 35px
      .block
        width 216px
</style>