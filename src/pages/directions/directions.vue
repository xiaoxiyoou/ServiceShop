<template>
  <div class="container">
    <div class="des" style="margin-bottom:10px">服务商城说明</div>
    <div class="des">1、服务商城内商品仅限于积分购买。</div>
    <div class="des">2、商品一经兑换不退不换，不可折现。</div>
    <div class="des">3、自兑换之日起，积分有效期为2年，由于商品为服务类，部分服务顺序将按积分兑换先后安排，先到先得，敬请谅解。</div>
    <div class="des">4、孝子部落保留最终解释权。</div>
    <div class="des" style="margin-top:10px">客服电话：<a :href="'tel:' + telPhone" style="color:#111111">13125418768</a></div>
  </div>

</template>
<script type="text/ecmascript-6">
export default {
  data() {
    return {
      telPhone:13125418768


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
  top 0px
  width 100%
  height 100%
  bottom 0
  padding 30px
  font-size 28px
  .des
    line-height 50px
</style>