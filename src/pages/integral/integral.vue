<template>
  <div class="container ">
    <img class="banner" src="./banner.png" alt="" />
    <div class="date-wrap row a-c j-e ">
      <div class="date-text">2019年7月</div>
      <img class="triangle" src="./triangle.png" alt="" />
    </div>
    <div class="values">+50</div>
    <div class="tip">共有1000积分将于2020-12-31过期</div>
    <div class="mid-wrap row a-c j-c">
      <div class="mid-cont row a-c">
        <div class="mid-item col a-c j-c" style="border-right:2px solid #b6b6b6">
          <div class="mid-text">获得积分</div>
          <div class="mid-num" style="color:#686194">+50</div>
        </div>
        <div class="mid-item col a-c j-c">
          <div class="mid-text">获得积分</div>
          <div class="mid-num" style="color:#b6b6b6">+50</div>
        </div>
      </div>
    </div>
    <div class="record-wrap">
      <div class="record-cont">
        <div class="date">2019-07-09</div>
        <div class="record-item row j-b a-c">
          <div class="record-name">充值换积分</div>
          <div class="record-num">+ 200</div>
        </div>
        <div class="record-item row j-b a-c">
          <div class="record-name">充值换积分</div>
          <div class="record-num">+ 200</div>
        </div>
      </div>
      <div class="record-cont">
        <div class="date">2019-07-09</div>
        <div class="record-item row j-b a-c">
          <div class="record-name">充值换积分</div>
          <div class="record-num">+ 200</div>
        </div>
        <div class="record-item row j-b a-c">
          <div class="record-name">充值换积分</div>
          <div class="record-num">+ 200</div>
        </div>
      </div>
      <div class="record-cont">
        <div class="date">2019-07-09</div>
        <div class="record-item row j-b a-c">
          <div class="record-name">充值换积分</div>
          <div class="record-num">+ 200</div>
        </div>
        <div class="record-item row j-b a-c">
          <div class="record-name">充值换积分</div>
          <div class="record-num">+ 200</div>
        </div>
      </div>
      <div class="record-cont">
        <div class="date">2019-07-09</div>
        <div class="record-item row j-b a-c">
          <div class="record-name">充值换积分</div>
          <div class="record-num">+ 200</div>
        </div>
        <div class="record-item row j-b a-c">
          <div class="record-name">充值换积分</div>
          <div class="record-num">+ 200</div>
        </div>
      </div>
      <div class="record-cont">
        <div class="date">2019-07-09</div>
        <div class="record-item row j-b a-c">
          <div class="record-name">充值换积分</div>
          <div class="record-num">+ 200</div>
        </div>
        <div class="record-item row j-b a-c">
          <div class="record-name">充值换积分</div>
          <div class="record-num">+ 200</div>
        </div>
      </div>
    </div>
  </div>

</template>
<script type="text/ecmascript-6">
export default {
  data() {
    return {


    }
  },
  mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 0

  },
  methods: {

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
  .record-wrap
    .record-cont
      .date
        padding 42px 25px 17px
        background-color #f2f2f2
      .record-item
        padding 0 25px
        background-color #ffffff
        height 106px
</style>