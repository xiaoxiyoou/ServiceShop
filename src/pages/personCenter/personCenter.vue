<template>
  <div class="container col a-c">
    <div class="title row a-c">个人信息</div>
    <div class="input-wrap row a-c j-b" style="height:80px">
      <div class="input-name">用户头像</div>
      <img class="headImg" :src="info.headimgurl" @click=" cropShow(true)" alt="" />
    </div>
    <div class="input-wrap row a-c j-b">
      <div class="input-name">昵称</div>
      <div class="input-item row a-c">
        <input type="text" placeholder="点击添加" v-model="info.nickname" />
        <img class="arrow" src="./arrow_1.png" alt="" />
      </div>
    </div>
    <div class="input-wrap row a-c j-b">
      <div class="input-name">真实姓名</div>
      <div class="input-item row a-c">
        <input type="text" placeholder="点击添加" v-model="info.realname" />
        <img class="arrow" src="./arrow_1.png" alt="" />
      </div>
    </div>
    <div class="input-wrap row a-c j-b">
      <div class="input-name">绑定手机</div>
      <div class="input-item row a-c" @click="signIn">
        <input type="number" placeholder="点击添加" v-model="info.mobile" readonly="readonly" />
        <img class="arrow" src="./arrow_1.png" alt="" />
      </div>
    </div>
    <div class="input-wrap row a-c j-b">
      <div class="input-name">单位名称</div>
      <div class="input-item row a-c">
        <input type="text" placeholder="点击添加" v-model="info.companyname" />
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
    <div class="save col a-c j-c" @click="confirm(true)">保存</div>
    <upImg :showCrop="showCrop" @cropShow="cropShow" @photoUp="photoUp" />
  </div>

</template>
<script type="text/ecmascript-6">
import { userInfo, saveself } from 'api/index'
import { Toast } from 'vant';
import upImg from 'components/upImg/upImg'
export default {
  data() {
    return {
      info: '',
      showCrop: false,

    }
  },
  mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 0
    this._userInfo()
  },
  methods: {
    signIn() {
      this.$router.push({
        path: '/signIn',
        query: {
          sign: 2,
        }
      })
    },
    _saveself() {
      if (this.info.headimgurl == '') {
        Toast('请上传您的头像')
        return false
      } else if (this.info.nickname == '') {
        Toast('请输入您的昵称')
        return false
      } else if (this.info.realname == '') {
        Toast('请输入您的姓名')
        return false
      } else if (this.info.mobile == '') {
        Toast('请输入您的手机号')
        return false
      } else if (this.companyname == '') {
        Toast('请输入您的公司名称')
        return false
      } else {
        saveself({
          headimgurl: this.info.headimgurl,
          nickname: this.info.nickname,
          realname: this.info.realname,
          mobile: this.info.mobile,
          city: this.info.city,
          companyname: this.info.companyname,
        }).then(res => {
          console.log('修改', res)
          if (res.code == 0) {
            Toast('编辑成功')
          } else {
            Toast(res.msg)
          }
        })
      }

    },
    _userInfo() {
      userInfo({
      }).then(res => {
        console.log('个人信息', res)
        this.info = res.data.info

      })
    },
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
    cropShow(flag) {
      this.showCrop = flag
    },
    confirm(flag) {
      this.popShow = flag
      this._saveself()
    },
    // 选图
    photoUp(flag) {
      Toast.clear();
      this.info.headimgurl = flag
    },

  },
  components: {
    upImg
  }
}
</script>
<style scoped lang="stylus">
.container
  // position absolute
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
      width 100px
      height 100px
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
      width 115px
      height 115px
      border-radius 50%
      border 2px solid #ffffff
    .input-item
      input
        text-align right
        font-size 30px
        background-color #ffffff
      .arrow
        margin-left 16px
        width 14px
        height 26px
      .check
        font-size 30px
  .mar
    margin-top 65px
  .save
    width 680px
    height 90px
    background #686194
    border-radius 10px
    color #ffffff
    margin-top 20px
    margin-bottom 20px
</style>