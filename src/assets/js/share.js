import Vue from 'vue'
import axios from 'axios'
var wx = require('weixin-js-sdk')
export default function wxShare() { 
  let link = 'http://jfmall.app.fuyulove.com/goods/index.html#' +  localStorage.getItem('fromUrl')
  axios.get('http://jfmall.app.fuyulove.com/connect/jssdk', {
      params: {
        url: location.href.split('#')[0],
        t: Math.random(),
      }
    })
    .then(res => {
      console.log('签名', res)
      config(res.data.data.data)
    })
    .catch(function (error) {
      console.log(error);
    });
  const config = (data) => {
    wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: data.appid, // 必填，公众号的唯一标识
      timestamp: data.timestamp, // 必填，生成签名的时间戳
      nonceStr: data.nonceStr, // 必填，生成签名的随机串
      signature: data.signature, // 必填，签名，见附录1
      jsApiList: [
        'getLocation',
        'onMenuShareAppMessage',
        'onMenuShareTimeline',
        'chooseImage',
        'uploadImage',
        'downloadImage',
        'previewImage',
        'startRecord',
        'stopRecord',
        'playVoice',
        'uploadVoice',
        'getLocalImgData',
        'openLocation'
      ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    })
    wx.ready(() => {
      wx.onMenuShareAppMessage({
        title: "殡企服务积分商城",
        link: link,
        desc: "存钱积分，积分当钱，你来就“兑”！",
        imgUrl: 'http://jfmall.app.fuyulove.com/goods/share.png',
      })
    })
    wx.onMenuShareTimeline({
      title: "殡企服务积分商城",
      link: link,
      desc: "存钱积分，积分当钱，你来就“兑”！",
      imgUrl: 'http://jfmall.app.fuyulove.com/goods/share.png',
    })
    wx.error(function () {})
  }


}
// 为Vue的原型对象添加该方法，则所有vue实例都能继承该方法
Vue.prototype.$wxShare = wxShare