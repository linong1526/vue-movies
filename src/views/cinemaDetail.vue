<template>
<div>
  <div class="icon-nav">
    <van-icon  class="icon-style2" name="arrow-left"  color="#1c1d1e" @click="goback"/>
  </div>
  <div class="show-container">
    <!-- 影院基本信息start -->
    <van-sticky>
      <van-nav-bar :title="cinemaInfo.name" class="nav-container"></van-nav-bar>
    </van-sticky>
    <van-row gutter="5" class="tag" @click="showTag">
        <van-col v-for="item in cinemaInfo.services" :key="item.value" class="tag-col">
          <van-button plain type="warning" size="mini" @click="onConfirm">{{item.name}}</van-button>
        </van-col>
        <van-col span="2"><van-icon name="arrow" /></van-col>
    </van-row>
    <van-row gutter="5" class="custom-location">
      <van-col span="2" offset="1">
      <van-icon name="location-o" color="#7d8186"/>
      </van-col>
      <van-col span="18" class="address">
        <span>{{cinemaInfo.address}}</span>
      </van-col>
      <van-col>
          <van-icon name="phone-o" color="#7d8186"/>
      </van-col>
    </van-row>
    <!-- 影院基本信息end -->

    <!-- API https://github.com/surmon-china/vue-awesome-swiper/tree/v4.1.1 -->
    <div class="film-bg-container">
    <swiper
    ref="mySwiper"
    class="swiper swiper-container"
    :options="swiperOption"
    @click-slide="handleClickSlide"
    >
      <swiper-slide v-for="item in filmsDetail" :key="item.filmId" >
        <van-image
          height="130px"
          :src="item.poster"
        />
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <div class="custom-swiper-bg" :style="{backgroundImage:`url(${bgImg})`}"></div>
    </div>
  </div>
    <van-row gutter="5" type="flex" justify="space-around" class="custom-row-films">
          <van-col class="custom-col"  span="22">
            <div class="custom-grade">
              <span>{{filmsData.name}}</span><span class="grade">{{filmsData.grade}}<i>分</i></span>
            </div>
            <div class="custom-category">
              <span>{{filmsData?filmsData.category:''}}</span><span>|</span>
              <span>{{filmsData?filmsData.runtime+'分钟' :''}}</span><span>|</span>
              <span>{{filmsData?filmsData.director:''}}</span><span>|</span>
              <span v-for="item in filmsData.actors" :key="item.name">
              {{item.name}}
              </span>
            </div>
          </van-col>
          <van-col span="2" class="custom-arrow">
            <router-link :to="{path: '/detail/'+filmsData.filmId}">
            <van-icon name="arrow" />
            </router-link>
          </van-col>
    </van-row>
    <van-tabs v-model="active" sticky color="#ff5f16" title-active-color="#ff5f16" @change="changeTab">
      <van-tab v-for="index in filmsData.showDate" :key="index" >
        <template #title>
          <div >
          {{index | time(chDays)}}
          </div>
        </template>
        <div class="totime-container">
          <van-row  v-for="item in filmsTimes" :key="item.id" class="custom-toTime">
            <van-col span="6" class="left">
              <p class="start-at">{{item.showAt | timestampToTime()}}</p>
              <p class="end-at">{{item.endAt | timestampToTime()}} 散场</p>
            </van-col>
            <van-col span="10" class="middle">
              <span class="language">{{item.filmLanguage}}</span>
              <span>{{item.imagery}}</span>
            </van-col>
            <van-col span="4" class="right">
              <p>￥{{item.salePrice}}</p>
            </van-col>
            <van-col span="4">
              <van-button class="button" size="mini" plain type="warning">购票</van-button>
            </van-col>
          </van-row>
        </div>
      </van-tab>
    </van-tabs>

  <!-- tag 弹框 -->
  <van-popup v-model="show"  position="top" :overlay="false" closeable close-icon-position="top-left" :style="{ height: '100%'}">
    <van-nav-bar :title="cinemaInfo.name"/>
    <van-row gutter="2" type="flex" justify="space-around" v-for="item in cinemaInfo.services" :key="item.value" class="popup-tag">
        <van-col span="4">
          <van-button plain type="warning" size="mini">{{item.name}}</van-button>
        </van-col>
        <van-col span="18">
          <span>{{item.description}}</span>
        </van-col>
      </van-row>
  </van-popup>
</div>
</template>
<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import { info, films, times } from '../config/http.js'
export default {
  name: 'swiper-example-centered-auto',
  title: 'Centered slides + Auto slides per view',
  components: {
    Swiper,
    SwiperSlide
  },
  filters: {
    actors: function (data) {
      if (!data) {
        return ''
      }
      return data.map(item => item.name).join(' ')
    },
    time: function (time, params) {
      const date = new Date(time * 1000)
      // console.log(222, date.getTime());
      // console.log(date.getDay())
      // console.log('date', date)
      const day = params[date.getDay()]
      const d = date.getMonth() + 1 + '月' + date.getDate() + '日'
      return '周' + day + ' ' + d
    },
    timestampToTime: function (timestamp) {
      timestamp = timestamp || null
      const date = new Date(timestamp * 1000)// 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      // const Y = date.getFullYear() + '-'
      // const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      // const D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
      // const h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
      // const m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
      // const s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      const h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
      const m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
      return h + m
    }
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.$swiper
    }
  },
  created () {
    if (this.$route.params) {
      const { id } = this.$route.params
      this.getDetail(id)
      this.getFilmsDetail(id)
    }
  },
  mounted () {
    console.log('Current Swiper instance object', this.swiper)
    // this.swiper.slideTo(3, 1000, true)
    this.handleClickSlide(3)
  },
  data () {
    return {
      // swiper data
      swiperOption: {
        // slidesPerView: 'auto', // 可见图片张数
        slidesPerView: 4,
        centeredSlides: true, // 默认选中中间一张
        spaceBetween: 5, // 在slide之间设置距离 也可以是百分比 10%
        pagination: { // 小圆点
          el: '.swiper-pagination',
          clickable: true
        }
      },
      bgImg: '',
      cinemaInfo: {}, // 影院基本信息
      filmsDetail: [], // 影院排片
      filmsTimes: [], // 影院场次
      filmsData: {}, // 轮播图下的信息
      filmsShow: [], // 电影排场
      show: false,
      active: 0,
      imgIndex: 0,
      chDays: '日一二三四五六'
    }
  },
  methods: {
    goback () {
      this.$router.back()
    },
    getDetail (id) {
      this.$http.get(info + '?cinemaId=' + id)
        .then(res => {
          this.cinemaInfo = res.data.cinema
        })
    },
    getFilmsDetail (id) {
      this.$http.get(films + '?cinemaId=' + id)
        .then(res => {
          console.log('filmsDetail', res)
          this.filmsDetail = res.data.films
          const indexArr = Object.keys(this.filmsDetail)
          // console.log('indexArr', indexArr) // 下标
          const index = Math.round(indexArr.length / 2)
          // console.log('index', index) // 下标取整
          this.imgIndex = index
          this.filmsData = res.data.films[0]
          const { filmId, poster } = this.filmsData
          this.bgImg = poster
          const { id: cinemaId } = this.$route.params
          this.getFilmsTimes(cinemaId, filmId)
        })
    },
    getFilmsTimes (cinemaId, filmId, date) {
      this.$http.get(times + '?cinemaId=' + cinemaId + '&filmId=' + filmId + '&date=' + date)
        .then(res => {
          // this.filmsTimes = res
          const result = res.data || res.data.schedules
          this.filmsTimes = result.schedules
        })
    },
    onConfirm () {

    },
    showTag () {
      this.show = true
    },
    changeTab (val) {
      this.filmsData.showDate.forEach((item, index) => {
        if (index === val) {
          const { id: cinemaId } = this.$route.params
          const { filmId } = this.filmsData
          this.getFilmsTimes(cinemaId, filmId, item)
        }
      })
    },
    handleClickSlide (index) {
      // this.swiper.activeIndex = val
      const { id } = this.$route.params
      const cinemaId = id
      this.filmsDetail.forEach((item, index2) => {
        // console.log('item', item, 'index2', index2)
        if (index === index2) {
          const filmsData = item
          this.filmsData = filmsData
          /* 背景图 */
          this.bgImg = item.poster
          // console.log('handleClickSlide-bgImg', this.bgImg)
          this.getFilmsTimes(cinemaId, item.filmId)
        }
      })
      /* data中的数据改变，数据无法渲染，页面视图无变化，强制更新 */
      this.$forceUpdate()
      // console.log('  this.filmsData', this.filmsData)
      this.swiper.slideTo(index, 1000, false)
    },
    // 获取某天零点时刻
    formatTime (timestamp) {
      const time = new Date(timestamp)
      const stTime = timestamp - time.getHours() * 60 * 60 * 1000 - time.getMinutes() * 60 * 1000 - time.getSeconds() * 1000 - time.getMilliseconds()
      return stTime
    }
  }
}
</script>
<style lang="scss" scoped>
// Demo Swiper styles
@import '@/assets/css/base.scss';
/* 轮播背景虚拟化 */
.film-bg-container{
  position: relative;
  overflow: hidden;
  padding: 15px 0px;
.custom-swiper-bg{
  width: 100%;
  height: 130px;
  position:absolute;
  top:0px;
  left:0px;
  transition: 300ms;
  filter: blur(30px);
  -webkit-filter: blur(30px);
}
}
  // vuetemplate css

  /* nav导航 */
  .icon-nav{
    display: block;
    height: 46px;
    .icon-style2 {
      background-color: #f3f3f3;
      opacity: 0.3;
      border-radius: 50%;
      font-size: 24px;
      z-index: 999;
      position: fixed;
      left: 16px;
      top: 16px;
    }
  }
      .icon-style3 {
      background-color: #f3f3f3;
      opacity: 0.3;
      border-radius: 50%;
      font-size: 24px;
      z-index: 1;
      left: 16px;
      top: 16px;
    }
    .nav-container{
    background-color:#fff;
  }
  /* 标签tag */
  .tag{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    font-size: 15px;
    color: #ffb232;
    overflow: hidden;
    position: relative;
    padding: 5px 0 15px;
    background-color: #fff;
    .tag-col{
      margin-right: 5px;
    }
  }
  /* 地址 */
  .custom-location{
    // border-bottom: 1px solid #ededed;
    // padding: 15px 15px 15px 0;
    border-bottom: none;
    background-color:#fff;
  }
  /* 弹框tag */
  .popup-tag{
    font-size: 12px;
    color: #797d82;
  }
  .address{
    font-size: 12px;
    height: 20px;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    position: relative;
    color: #191a1b;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  /* 轮播下的信息style */
  .custom-row-films{
    width: 100%;
    background: #fff;
    height: 80px;
    padding: 15px 0;
    position: relative;
    text-align: center;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;
    .custom-col{
      text-align: center;
      overflow: hidden;
      -o-text-overflow: ellipsis;
      text-overflow: ellipsis;
      white-space: nowrap;
      .custom-grade{
        margin-bottom: 10px;
        text-align: center;
        line-height: 18px;
        .grade{
          font-size: 16px;
          font-style: italic;
          color: #ffb232;
          i{
            font-size: 10px;
            color: #ffb232;
          }
        }
      }
      .custom-category{
        text-align: center;
        height: 18px;
        color: #797d82;
        font-size: 13px;
        padding: 0 12%;
        overflow: hidden;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .custom-arrow{
      line-height: 40px;
    }
  }
  /* 场次style */
  .custom-toTime{
    height: 74px;
    padding: 15px 15px;
    position: relative;
    background: #fff;
    text-align: center;
    .left{
      width: 84px;
      .start-at{
        font-size: 15px;
        color: #191a1b;
      }
      .end-at{
        font-size: 13px;
        color: #797d82;
        margin-top: 2px;
      }
    }
    .middle{
      .language{
        font-size: 15px;
        color: #191a1b;
      }
    }
    .right{
      line-height: 25px;
      color: #ff5f16;
    }
    .button {
    margin: 0;
    padding: 0px 10px;
    color: #ff5f16;
    /* margin: 25px auto; */
  }
  }
</style>
