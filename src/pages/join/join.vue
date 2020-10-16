<template>
  <div class="container col a-c">
    <img class="join-img" :src="wareAdv.imgurl" alt="" />
    <div class="title">姓名<span>*</span></div>
    <input type="text" placeholder="请输入您的姓名" v-model="name">
    <div class="title">手机号码<span>*</span></div>
    <input type="number" placeholder="输入您的手机号码" v-model="mobile">
    <div class="title">合作产品<span>*</span></div>
    <input type="text" placeholder="请输入合作产品" v-model="brand">
    <div class="title">备注<span></span></div>
    <input type="text" placeholder="请填写备注" v-model="remark">
    <div class="btn col a-c j-c" @click="submit">提交</div>
    <div class="tip">请填写您的联系方式以便为您安排专员服务</div>
  </div>
</template>
<script type="text/ecmascript-6">
import { joinSubmit, getAdver } from 'api/index'
import { Toast } from 'vant'
export default {
  data() {
    return {
      name: "",
      mobile: "",
      brand: "",
      remark: "",
      wareAdv: [],


    }
  },
  mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 0
    this._getAdver2()

  },
  methods: {
    _getAdver2() {
      getAdver({
        type: 2
      }).then(res => {
        console.log('采购广告', res)
        this.wareAdv = res.data.list[0]

      })
    },
    submit() {
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
      } else if (!this.brand) {
        Toast('请输入合作产品')
        return false
      } else {
        this._joinSubmit()
      }
    },
    _joinSubmit() {
      joinSubmit({
        name: this.name,
        mobile: this.mobile,
        brand: this.brand,
        remark: this.remark,
      }).then(res => {
        console.log('招募申请', res)
        if (res.code == 0) {
          Toast("申请成功，请耐心等待我们与您联系")
        } else {
          Toast(res.msg)
        }

      })
    },

  },
  components: {
  }
}
</script>
<style scoped lang="stylus">
.container
  .join-img
    width 697px
    border-radius 10px
    margin-top 28px
  .title
    width 703px
    color #666666
    font-size 24px
    margin-top 34px
    span
      color #fb6868
      font-size 28px
  input
    width 703px
    height 88px
    border-radius 6px
    border 2px solid #686194
    padding 0 28px
    font-family 28px
    color #333333
    margin-top 21px
  .btn
    width 703px
    height 88px
    border-radius 8px
    background #686194
    color #ffffff
    font-size 32px
    letter-spacing 14px
    margin-top 47px
  .tip
    font-size 28px
    color #686194
    margin-top 19px
</style>