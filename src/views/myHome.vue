<template>
    <div>
      <div class="container">
        <van-grid class="avatr" :border="false">
        <van-grid-item class="avatr-item">
          <van-image
          class="avtar-icon"
          slot="icon"
            round
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
          />
        </van-grid-item>
        <van-grid-item class="avatr-item">
          <span>123******10</span>
        </van-grid-item>
        </van-grid>
      </div>

      <van-grid clickable :column-num="2">
        <van-grid-item text="电影订单" to="/">
        <van-icon slot="icon" class="iconfont icon-youhuiquan"  color="#ffc82f"/>
        </van-grid-item>
        <van-grid-item icon="search" text="商品订单" url="/vant/mobile.html" >
          <van-icon slot="icon" class="iconfont icon-dingdan_dingdanliebiao"  color="#c6da5c"/>
        </van-grid-item>
      </van-grid>
      <van-cell-group>
        <van-cell is-link to="index">
            <div slot="title">
              <van-icon slot="icon" class="iconsize iconfont icon-shouchequan"  color="#ff8462"/>
              卖座券
            </div>
          </van-cell>
          <van-cell is-link to="index">
            <div slot="title">
              <van-icon slot="icon" class="iconfont icon-hongbao2"  color="#baa27a"/>
              组合红包
            </div>
          </van-cell>
          <van-cell is-link to="index"  value="￥0">
            <div slot="title">
              <van-icon slot="icon" class="iconfont icon-yue"  color="#ffb232"/>
            余额
            </div>
          </van-cell>
          <van-cell is-link to="index">
            <div slot="title">
              <van-icon slot="icon" class="iconfont icon-kefuzixunhui"  color="#6294b9"/>
              帮助与客服
            </div>
          </van-cell>
          <van-cell is-link to="index">
            <div slot="title">
              <van-icon slot="icon" class="iconfont icon-shezhi"  color="#bbcd58"/>
              设置
            </div>
          </van-cell>
      </van-cell-group>
    </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  created () {
    // console.log('7777', this.$route)
  },
  methods: {
  }
}

</script>

<style lang="scss">
.container{
  height: 200px;
  width:375px ;
  .avatr{
    text-align: center;
    margin-top: -44px;
    height: 200px;
    padding-left: 22px;
    padding-top: 40px;
    background: url(../assets/images/bg.a5bdd690.png);
    background-size: cover;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    color: #fff;
  }
  .avatr-item{
    .avtar-icon{
      width: 63px;
      height: 63px;
      // border-radius: 35px;
      // margin-right: 20px;
      border: 2px solid #fff;
    }
    .van-grid-item__content{
      background-color: inherit;
    }
  }

}
.iconsize{
  height: 20px;
  width: 20px;
}
</style>
