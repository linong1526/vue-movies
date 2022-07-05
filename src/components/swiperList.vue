
<template>
<div>
  <div class="cell-background">
      <van-cell class="cellmargin-top" value="演职人员"/>
    <swiper class="swiper swiper-container" :options="swiperOption">
      <swiper-slide v-for="item in swiperData.actors" :key="item.name">
        <van-image
            width="100"
            height="100"
            :src="item.avatarAddress"
          />
          <div class="actors-name">{{item.name}}</div>
          <div class="actors-role">{{item.role}}</div>
      </swiper-slide>
    </swiper>
  </div>
  <div class="cell-background" v-if="swiperData.photos">
    <van-cell class="cellmargin-top" title="剧照" is-link :value="'全部'+'('+swiperData.photos.length+')'" @click="lookPhotos"/>
    <swiper class="swiper swiper-container" :options="swiperOption">
      <swiper-slide v-for="item in swiperData.photos" :key="item">
        <van-image
            width="100"
            height="100"
            :src="item"
          />
          <div class="actors-name">{{item.name}}</div>
          <div class="actors-role">{{item.role}}</div>
      </swiper-slide>
    </swiper>
  </div>
  <!-- 图片弹框 -->
  <van-popup v-model="show" closeable close-icon-position="top-left" :overlay="false" :style="{ height: '100%',width:'100%' }">
    <van-nav-bar v-if="swiperData.photos" :title="'剧照'+'('+swiperData.photos.length+')'"/>
    <van-row gutter="2" justify="center">
      <van-col  span="8"  v-for="item in swiperData.photos" :key="item">
        <van-image
        class="photo-context"
        height="100x"
        width="100%"
        :src="item"
        />
      </van-col>
    </van-row>
  </van-popup>
</div>

</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

export default {
  name: 'swiper-example-multiple-slides-per-biew',
  title: 'Multiple slides per view',
  components: {
    Swiper,
    SwiperSlide
  },
  props: {
    swiperData: {
      type: Object,
      default () {
        return { }
      }
    }
  },
  created () {
    if (this.swiperData.photos) {
      this.photosLength = this.swiperData.photos.length
    }
    console.log('swiperData', this.swiperData)
  },
  data () {
    return {
      swiperOption: {
        slidesPerView: 3,
        // spaceBetween: 30, // 图片与图片之间的距离
        spaceBetween: 10,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      },
      show: false,
      photosLength: 0

    }
  },
  methods: {
    lookPhotos () {
      this.show = true
    }
  }
}
</script>

<style lang="scss" scoped>
  // @import './base.scss';
  .swiper-container{
    background-color: #fff;
    text-align: center;
    margin: 0;
    padding: 0;;
    >>> .swiper-slide{
      margin-right: 20px;
    }
  }
  .cell-background{
    background-color: #f4f4f4;
    padding-top: 11px;
  }
  .cellmargin-top{
    // top: -45px;
    overflow: inherit;
  }
  .van-cell__value,.van-cell__value--alone{
      overflow: inherit;
  }
  .actors-name{
    padding-top: 10px;
    font-size: 12px;
    color: #191a1b;
    // width: 85px;
    height: 18px;
    display: block;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .actors-role{
    font-size: 10px;
    color: #797d82;
    // width: 85px;
    height: 18px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .van-row {
    border-bottom: 1px solid #ededed;
    /* padding: 15px 15px 15px 0; */
    padding:0px;
    background-color: #fff;
  }
  .photo-context {
    width: calc(33.33333vw - 1px);
    height: calc(33.33333vw - 1px);
    // margin-bottom: 1.5px;
    background-size: 80px;
    background-position: 50%;
    background-repeat: no-repeat;
    // margin-right: 1.5px;
    background-image: url(https://assets.maizuo.com/h5/v5/public/app/img/sdyx_padding.97b3b2c7.png);
}
</style>
