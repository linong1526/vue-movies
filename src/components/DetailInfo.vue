<template>
<div>
          <!-- <van-icon  class="icon-style " name="arrow-left"  color="#1c1d1e"/> -->
    <van-sticky>
      <van-nav-bar :title="detail.name" left-text="返回" left-arrow>
        <template #left>
          <van-icon  class="icon-style " name="arrow-left"  color="#1c1d1e" @click="goback"/>
        </template>
      </van-nav-bar>
    </van-sticky>
    <div class="head-container">
      <van-icon  class="icon-style2" name="arrow-left"  color="#1c1d1e" @click="goback"/>
      <div class="padding">
        <van-image
        class="head-img"
        :src="detail.poster"
      />
      </div>
    </div>
    <!-- 滑动组件 -->
    <!-- <div class="swiper-container"> -->
      <div class="swiper-list-container">
        <div>
        <van-card>
          <template #title>
            <van-row type="flex" justify="space-between">
              <van-col span="18">
                <p class="title">{{detail.name ? detail.name :''}}<van-tag>{{detail.filmType ? detail.filmType.name : ''}}</van-tag></p>
              </van-col>
              <van-col span="4" class="grade" v-if="detail.grade">
                <p ><i>{{detail.grade}}<span class="grade12">分</span></i></p>
              </van-col>
            </van-row>
          </template>
          <template #desc>
            <p class="grey-text">{{detail.category}}</p>
            <div>
              <p class="grey-text">{{detail.premiereAt | time(chDays)}}上映</p>
            </div>
            <div class="grey-text">
              <span class="pandding-right">{{detail.nation }}</span>|<span class="desc">{{detail.runtime }}分钟</span>
            </div>
            <div class="card-desc1" :class="{'card-desc':cardDesc}">
              <div class="word-break grey-text">
                <span >{{detail.synopsis}}</span>
              </div>
          </div>
          </template>
        </van-card>
        <div v-show="active" class="show-toggle"></div>
        </div>
        <van-nav-bar >
          <template #title>
            <van-icon name="arrow-down" color="#c2c5c9" v-show="!active" @click="showToggle"/>
            <van-icon name="arrow-up" color="#c2c5c9" v-show="active" @click="showToggle"/>
          </template>
        </van-nav-bar>
        <swiper-list :swiper-data="detail"></swiper-list>
      </div>
    <!-- 底部选票 -->
    <van-tabbar fixed :placeholder="false">
      <van-button color="#ff5f16" block>选座购票</van-button>
    </van-tabbar>
</div>
</template>
<script>
import { detail } from '../config/http.js'
import swiperList from './swiperList.vue'
export default {
  components: {
    swiperList
  },
  filters: {
    // actors: function (data) {
    //   if (!data) {
    //     return ''
    //   }
    //   return data.map(item => item.name).join(' ')
    // },
    time: function (time, params) {
      // console.log(this);
      // console.log(111, time);
      const date = new Date(time * 1000)
      // console.log(222, date.getTime());
      // console.log(date.getDay());
      // console.log('date', date.getFullYear())
      // const day = params[date.getDay()]
      const d = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
      return d
    }
  },
  data () {
    return {
      detail: { },
      chDays: '日一二三四五六',
      active: false,
      cardDesc: true
    }
  },
  created () {
    console.log(2222, this.$route)
    // 当前路径的一个对象，包含了当前路径的很多信息
    if (this.$route.params) {
      const { id } = this.$route.params
      this.getDetail(id)
    }
  },
  methods: {
    getDetail (id) {
      this.$http.get(detail + '?filmId=' + id)
        .then(res => {
          console.log(res)
          this.detail = res.data.film
        })
    },
    showToggle () {
      this.active = !this.active

      this.cardDesc = !this.cardDesc
      console.log(this.active, this.cardDesc)
    },
    goback () {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss">
.title_background{
    position: absolute;
    top:0px;
    left: 0px;
    background-color: hsla(0,0%,100%,0);
    color: transparent;
    -webkit-transition: all .3s ease;
    -o-transition: all .3s ease;
    transition: all .3s ease;
    width: 100vw;
    height: 44px;
    z-index: 1;
}
[class*=van-hairline]::after{
border: none;
}
.van-nav-bar {
    // position: relative;
    z-index: 0;
    // line-height: 22px;
    // text-align: center;
    // background-color: #fff;
    // -webkit-user-select: none;
    // user-select: none;
}

.icon-style {
  background-color: #f3f3f3;
  opacity: 0.3;
  border-radius: 50%;
  font-size: 24px;
}
.head-container{
    position: relative;
    top: -46px;
    background-color: transparent;
    .padding{
      height: 56vw;
      overflow: hidden;
      .head-img{
        width: 100%;
        height: 400px;
      }
    }
    .icon-style2 {
      position: absolute;
      background-color: #f3f3f3;
      opacity: 0.3;
      border-radius: 50%;
      font-size: 24px;
      z-index: 65;
      top: 9px;
      left: 16px;
      }
}
.swiper-container{
  // position: absolute;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    /* overflow: hidden; */
    list-style: none;
    padding: 0;
    z-index: 1;
    background-color: #fff;
}
.swiper-list-container{
  position: relative;
  background-color: #fff;
  height: 100%;
  .icon-nav{
    top:-5px;
    background-color: transparent;
  }
  .van-card{
    background: #fff;
    width: 100%;
    .van-row {
      border: none;
      padding:0px;
      background-color: #fff;
    }
    .margin-top4{
      margin-top:4px
    }
    .grade{
      color: #ffb232;
      font-size: 18px;
      margin-left:5px;
      .grade12{
        font-size: 10px;
      }
    }
  }
  .card-desc1{
    height: 100%;;
    overflow: hidden;
    transition: height .5s ease;
    -moz-transition:height .5s ease; /* Firefox 4 */
    -webkit-transition:height .5s ease; /* Safari and Chrome */
    -o-transition:height .5s ease; /* Opera */
    .word-break{
      word-break:break-all;
      font-size: 13px;
      margin-top: 4px;
      color: #797d82;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 100%;
    }
  }
  .card-desc{
    height: 38px;
  }
  .show-toggle{
    top: -36px;
    position: relative;
  }
}
.grey-text {
    font-size: 13px;
    color: #797d82;
    margin-top: 4px;
}
.van-tabbar{
  height: 44px;
}
</style>
