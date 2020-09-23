<template>
  <div class="container ">
    <img class="banner" src="./banner.png" alt="" />
    <div class="date-wrap row a-c j-e " @click="changeTime">
      <div class="date-text">{{now | moment  }}</div>
      <img class="triangle" src="./triangle.png" alt="" />
    </div>
    <div class="values">{{parseInt(scoreInfo.sr) + parseInt(scoreInfo.zc)}}</div>
    <div class="tip">{{scoreInfo.tip}}</div>
    <div class="mid-wrap row a-c j-c">
      <div class="mid-cont row a-c">
        <div class="mid-item col a-c j-c" style="border-right:1px solid #b6b6b6" @click="getInter(0)">
          <div class="mid-text">获得积分</div>
          <div class="mid-num" :class="{'textHover':isActive }">+{{scoreInfo.sr}}</div>
        </div>
        <div class="mid-item col a-c j-c" @click="getInter(1)">
          <div class="mid-text">支出积分</div>
          <div class="mid-num" :class="{'textHover':!isActive }">{{scoreInfo.zc}}</div>
        </div>
      </div>
    </div>
    <!-- 空状态 -->
    <img v-if="tipShow && !isActive" class="tips" src="./tips.png" alt="" />
    <div v-if="tipShow && !isActive" class="exchange row a-c j-c" @click="service">兑换好礼</div>
    <div v-if="tipShow && isActive" class=" row a-c j-c" @click="service">暂无数据</div>
    <!-- 列表 -->
    <div class="record-wrap">
      <div class="record-cont" v-for="(item,index) in dataList" :key="index">
        <div class="date">{{item.date }}</div>
        <div class="record-item row j-b a-c" v-for="(itemLits,index) in item.item" :key="index">
          <div class="record-name">{{itemLits.title}}</div>
          <div class="record-num">{{itemLits.integral}}</div>
        </div>
      </div>
    </div>
    <van-popup v-model="datetime" position="bottom" :columns-placeholder="['请选择', '请选择', '请选择']" :style="{ height: '40%' }">
      <van-datetime-picker v-if="datetime" v-model="currentDate" :formatter="formatter" type="year-month" :min-date="minDate" :max-date="maxDate" @confirm="confirm" @cancel="cancel" />
    </van-popup>
  </div>

</template>
<script type="text/ecmascript-6">
import { score, scorelist } from 'api/index'
export default {
  data() {
    return {
      datetime: false,
      minDate: new Date(1790, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      now: new Date(),
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      state: 0,
      dataList: [],
      tipShow: false,
      isActive: true,
      scoreInfo: ""

    }
  },
  mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 0

    this._score()
    this._scorelist()

  },
  methods: {
    // 切换积分
    getInter(state) {
      this.state = state
      this.isActive = !this.isActive
      this._scorelist()
    },
    _score() {
      score({
        year: this.year,
        month: this.month,
      }).then(res => {
        console.log('积分', res)

        this.scoreInfo = res.data

      })
    },
    _scorelist() {
      scorelist({
        year: this.year,
        month: this.month,
        state: this.state
      }).then(res => {
        console.log('积分列表', res)
        this.dataList = res.data.data
        if (this.dataList.length == 0) {
          this.tipShow = true
        } else {
          this.tipShow = false
        }


      })
    },
    formatter(type, val) {
      if (type === 'year') {
        return `${val}年`;
      } else if (type === 'month') {
        return `${val}月`;
      }
      return val;
    },
    confirm(val) {
      this.year = val.getFullYear()
      this.month = val.getMonth() + 1
      this.datetime = false
      this.now = val
      this._scorelist()
    },
    cancel() {
      this.datetime = false

    },
    changeTime() {
      this.datetime = true
    },
    service() {
      this.$router.push({
        path: '/service',
      })
    },
  },
  components: {
  }
}
</script>
<style scoped lang="stylus">
.container
  position absolute
  background-color #f2f2f2
  top 0px
  width 100%
  height 100%
  bottom 0
  .banner
    width 100%
    position absolute
  .date-wrap
    position relative
    color #ffffff
    font-size 25px
    margin-top 32px
    margin-right 42px
    .triangle
      width 24px
      height 16px
      margin-left 5px
  .values
    position relative
    color #ffffff
    font-size 83px
    text-align center
  .tip
    position relative
    color #ffffff
    font-size 23px
    text-align center
    margin-top 20px
  .mid-wrap
    text-align center
    .mid-cont
      width 696px
      position relative
      height 177px
      background-color #ffffff
      border-radius 10px
      margin-top 30px
      z-index 1
      .mid-item
        width 50%
        height 90px
        .mid-text
          color #6e6e6e
          font-size 24px
        .mid-num
          font-size 50px
          margin-top 20px
          color #b6b6b6
        .textHover
          color #686194
  .record-wrap
    padding-bottom 200px
    background-color #f2f2f2
    .record-cont
      .date
        padding 42px 25px 17px
        color #333333
        font-size 28px
        background-color #f2f2f2
      .record-item
        padding 0 25px
        background-color #ffffff
        height 106px
        border-bottom 1px solid #f5f5f5
        .record-name
          font-size 30px
          color #000000
        .record-num
          font-size 24px
          color #666666
  .tips
    margin 100px auto 30px
    display block
    width 50%
  .exchange
    text-align center
    width 181px
    color #ffffff
    font-size 33px
    margin 0 auto
    height 58px
    border-radius 23px
    background #686194
</style>