<template>
  <!-- 头像上传 -->
  <div class="crop-con" v-if="showCrop">
    <div class="return row j-c a-c" @click="cropShow(false)">关闭</div>
    <vue-cropper ref="cropper" :img="option.img" :output-size="option.size" :output-type="option.outputType" :info="true" :full="option.full" :fixed="fixed" :fixed-number="fixedNumber" :can-move="option.canMove" :can-scale="option.canScale" :can-move-box="option.canMoveBox" :fixed-box="option.fixedBox" :original="option.original" :auto-crop="option.autoCrop" :auto-crop-width="option.autoCropWidth" :auto-crop-height="option.autoCropHeight" :center-box="option.centerBox" @real-time="realTime" :high="option.high" @img-load="imgLoad" mode="cover"></vue-cropper>
    <div class="bottom-button row j-a">
      <div class="selectImg col a-c j-c" @click="uploadImg">
        <span class="text">选择</span>
        <span class="text">图片</span>
      </div>
      <button @click="rotateLeft" class="btn col j-c a-c">
        <div class="word">左旋</div>
        <img class="" src="./left.png" alt="">
      </button>
      <button @click="rotateRight" class="btn">
        <div class="word">右旋</div>
        <img class="" src="./right.png" alt="">
      </button>
      <button @click="finish()" class="btn">
        <div class="word">上传</div>
        <img class="" src="./up.png" alt="">
      </button>
    </div>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
import axios from 'axios'
import { Toast } from 'vant';
var wx = require('weixin-js-sdk')
export default {
  name: "upImg",
  data() {
    return {
      fixed: true,
      //裁剪组件的基础配置option
      option: {
        img: require('./imgselect.png'),
        size: 1,
        full: false,
        outputType: 'png',
        canMove: true,
        fixedBox: true,
        original: false,
        canMoveBox: false,
        canScale: true,
        autoCrop: true,
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 300,
        // autoCropHeight: ,
        centerBox: false,
        high: true
      },
    }
  },
  props: {
    showCrop: Boolean,
    fixedNumber:Array
  },
  methods: {
    // 选择本地图片
    uploadImg() {
      // Toast.loading({
      //   message: '加载中...',
      //   forbidClick: true,
      //   duration: 0, // 持续展示 toast
      // });
      wx.ready(() => {
        wx.chooseImage({
          count: 1, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
          success: (res) => {
            // Toast.clear();
            this.upLoad(res.localIds[0])
          }
        })
      })
    },
    // 上传头像
    upLoad(localId) {
      wx.uploadImage({
        localId,
        success: (res) => {
          this._postMediaId(res.serverId)
        },
        fail: function () {
        }
      })
    },
    // 下载上传到微信的图片
    _postMediaId(id) {
      axios({
        method: "post",
        url: 'http://cdn.fuyulove.com/action/wxImgDownthird.ashx',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          media_id: id,
          sid: 660
        },
        transformRequest: [function (data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
      }).then((res) => {
        console.log(res);
        this.option.img = res.data.msg;
        // alert(res.data.msg)


      }).catch(function (error) {
        console.log(error);
      });


    },
    cropShow(flag) {
      this.$emit("cropShow", flag);
    },
    photoUp(flag) {
      this.$emit("photoUp", flag);
    },
    // 上传图片（点击上传按钮）
    finish() {
      this.$refs.cropper.getCropData((data) => {
        // console.log(data)
        Toast.loading({
          message: '上传中...',
          forbidClick: true,
          duration: 0, // 持续展示 toast
        });
        this.toBase64(data)
        this.cropShow(false)
      })
    },
    // 把base64转化为图片地址
    toBase64(meg) {
      axios({
        method: "post",
        url: 'http://cdn.fuyulove.com/Action/UploadImageChaiJian.ashx',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          image: meg,
        },
        transformRequest: [function (data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
      }).then((res) => {
        console.log(res);
        let photo = res.data
        console.log(photo)
        this.photoUp(photo)


      }).catch(function (error) {
        console.log(error);
      });

    },
    //  实时预览函数
    realTime(data) {
      console.log(data);
      this.previews = data;
    },
    rotateLeft() {
      this.$refs.cropper.rotateLeft()
    },
    rotateRight() {
      this.$refs.cropper.rotateRight()
    },

    imgLoad(msg) {
      console.log(msg)
    },

  },
  components: {
    VueCropper

  }
};
</script>

<style lang="stylus" scoped>
.crop-con
  position fixed
  top 0
  width 100%
  height 100%
  z-index 999
  .return
    position absolute
    right 20px
    top 20px
    padding 8px 16px
    background-color #686194
    border-radius 4px
    font-size 28px
    color #ffffff
    z-index 100
  .bottom-button
    position fixed
    bottom 110px
    padding 0 60px
    width 100%
    height 160px
    display flex
    align-items center
    .btn
      width 100px
      height 100px
      text-align center
      background #686194
      color white
      border-radius 50%
      font-size 25px
      .word
        white-space nowrap
        font-size 26px
      img
        width 40px
        height 40px
    .uploading
      width 100px
      height 100px
      line-height 100px
      text-align center
      background #ee7c88
      color white
      border-radius 50%
      font-size 25px
    .selectImg
      width 100px
      height 100px
      text-align center
      color white
      font-size 25px
      background #686194
      border-radius 50%
      position relative
      .text
        z-index 5
        white-space nowrap
      .uploads
        opacity 0
        position absolute
        top 0
        left 0
        z-index 99
        width 100%
        height 100%
        cursor pointer
</style>