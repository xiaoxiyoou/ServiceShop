<template>
  <div class="container">
    <div class="nav-wrap row">
      <div class="nav-item nav-item-hover col a-c j-c">全部(4)</div>
      <div class="nav-item col a-c j-c">进行中的(4)</div>
      <div class="nav-item col a-c j-c">已完成(4)</div>
    </div>
    <div class="list-wrap">
      <div class="list-cont">
        <div class="list-top row j-b a-c">
          <div class="list-time">2020-07-31 12:32:12</div>
          <div class="list-delet">删除</div>
        </div>
        <div class="list-btm row">
          <img class="list-img" src="./img_url.png" alt="" />
          <div class="list-item col j-b">
            <div class="list-name">企业宣传品拍摄剪辑成片</div>
            <div class="list-com row j-b">
              <div class="list-value"><span>6万</span>积分</div>
              <div class="list-status_1">已完成</div>
            </div>
          </div>
        </div>
      </div>
      <div class="list-cont">
        <div class="list-top row j-b a-c">
          <div class="list-time">2020-07-31 12:32:12</div>
          <div class="list-delet">删除</div>
        </div>
        <div class="list-btm row">
          <img class="list-img" src="./img_url.png" alt="" />
          <div class="list-item col j-b">
            <div class="list-name">企业宣传品拍摄剪辑成片企业宣传品拍摄剪辑成片企业宣传品拍摄剪辑成片</div>
            <div class="list-com row j-b">
              <div class="list-value"><span>6万</span>积分</div>
              <div class="list-status_2">进行中的</div>
            </div>
          </div>
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
  top 0px
  width 100%
  height 100%
  bottom 0
  .nav-wrap
    width 100%
    height 91px
    font-size 27px
    border-bottom 1px solid #f5f5f5
    .nav-item
      width 33%
    .nav-item-hover
      color #696198
      border-bottom 3px solid #696198
  .list-wrap
    .list-cont
      padding 0 41px 0 44px
      border-bottom 24px solid #f2f2f2
      .list-top
        height 83px
        color #333333
        font-size 27px
      .list-btm
        margin-bottom 37px
        .list-img
          width 185px
          height 185px
        .list-item
          margin-left 21px
          width 450px
        .list-name
          font-size 30px
          color #111111
          overflow hidden
          display -webkit-box
          -webkit-box-orient vertical
          -webkit-line-clamp 2
          text-overflow ellipsis
        .list-com
          .list-value
            color #b93662
            font-size 22px
            span
              font-size 33px
          .list-status_1
            color #696198
            font-size 27px
          .list-status_2
            color #138900
            font-size 27px
</style>