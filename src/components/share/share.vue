<template>
  <!-- 点击分享 -->
  <div class="qrcodeCon" v-if="qrcodeCon">
    <div class="code_mask" @click.stop="codeCon(false)"></div>
    <img class="qrcodeImg" src="./shareTip.png" alt="" @click.stop="codeCon(false)">
  </div>
</template>

<script>
export default {
  name: "share",
  props: {
    qrcodeCon: Boolean
  },
  methods: {
    codeCon: function () {
      this.$emit('parentEvent', false)
    }
  }
};
</script>

<style scoped >
.code_mask {
  width: 100%;
  height: 100%;
  background-color: #000;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
  opacity: 0.7;
}
.qrcodeImg {
  position: fixed;
  top: 15%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  width: 6.75rem;
  height: 2.71rem;
}
</style>
