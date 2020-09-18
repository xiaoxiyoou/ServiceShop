<template>
  <div class="container col a-c">
    <!-- <img class="bg" src="./bg.png" alt=""> -->
    <!-- <div class="head-wrap col a-c j-c">
      <div class="headText">林小小</div>
    </div> -->
    <div class="title row a-c">个人信息</div>
    <div class="input-wrap row a-c j-b" style="height:77px">
      <div class="input-name">用户头像</div>
      <img class="headImg" src="./headImg.png" alt="">
      <!-- <div class="input-item row a-c">
        <input type="number" placeholder="点击修改" />
        <img class="arrow" src="./arrow_1.png" alt="" />
      </div> -->
    </div>
    <div class="input-wrap row a-c j-b">
      <div class="input-name">昵称</div>
      <div class="input-item row a-c">
        <input type="number" placeholder="点击修改" />
        <img class="arrow" src="./arrow_1.png" alt="" />
      </div>
    </div>
   <div class="input-wrap row a-c j-b">
      <div class="input-name">真实姓名</div>
      <div class="input-item row a-c">
        <input type="number" placeholder="点击修改" />
        <img class="arrow" src="./arrow_1.png" alt="" />
      </div>
    </div>
    <div class="input-wrap row a-c j-b">
      <div class="input-name">绑定手机</div>
      <div class="input-item row a-c">
        <input type="number" placeholder="点击修改" />
        <img class="arrow" src="./arrow_1.png" alt="" />
      </div>
    </div>
    <div class="input-wrap row a-c j-b">
      <div class="input-name">单位名称</div>
      <div class="input-item row a-c">
        <input type="number" placeholder="点击修改" />
        <img class="arrow" src="./arrow_1.png" alt="" />
      </div>
    </div>
    <div class="title row a-c">订单信息</div>
    <div class="input-wrap  row a-c j-b">
      <div class="input-name">订单详情</div>
      <div class="input-item row a-c" @click="orderList">
        <div class="check">点击查看</div>
        <img class="arrow" src="./arrow_2.png" alt="" />
      </div>
    </div>
    <div class="title row a-c">积分信息</div>
    <div class="input-wrap  row a-c j-b">
      <div class="input-name">当前积分</div>
      <div class="input-item row a-c" @click="integral">
        <div class="check">查看明细</div>
        <img class="arrow" src="./arrow_2.png" alt="" />
      </div>
    </div>
    <div class="input-wrap row a-c j-b">
      <div class="input-name">积分获取</div>
      <div class="input-item row a-c" @click="getCard">
        <div class="check">查看明细</div>
        <img class="arrow" src="./arrow_2.png" alt="" />
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
    orderList() {
      this.$router.push({
        path: '/orderList',
      })
    },
    integral() {
      this.$router.push({
        path: '/integral',
      })
    },
    getCard() {
      this.$router.push({
        path: '/getCard',
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
  top 0px
  width 100%
  height 100%
  background-color #f5f5f5
  bottom 0
  .title
    height 87px
    color #6f6f6f
    font-size 31px
    background f5f5f5
    width 100%
    padding-left 33px
  .bg
    width 100%
    position absolute
  .head-wrap
    position relative
    margin-top 89px
    z-index 1
    .headImg
      width 140px
      height 140px
      border-radius 50%
      border 2px solid #ffffff
    .headText
      font-size 30px
      margin-top 10px
      color #000000
      margin-bottom 31px
  .input-wrap
    height 107px
    width 100%
    padding-left 33px
    padding-right 28px
    border-bottom 1px solid #e5e5e5
    background #ffffff
    .input-name
      color #000000
      font-size 31px
    .headImg
      width 140px
      height 140px
      border-radius 50%
      border 2px solid #ffffff
    .input-item
      input
        text-align right
        font-size 30px
      .arrow
        margin-left 16px
        width 14px
        height 26px
      .check
        font-size 30px
  .mar
    margin-top 65px
</style>