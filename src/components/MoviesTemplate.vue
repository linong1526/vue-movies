<template>
    <div>
        <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多电影了"
        @load="onLoad"
        >
        <van-row v-for="item in movieList" :key="item.filmId">
            <van-col span="20">
              <van-card>
                  <template #title>
                      <p class="title">{{item.name ? item.name :''}}<van-tag>{{item.filmType?item.filmType.name:''}}</van-tag></p>
                      <p v-show="item.grade">观众评分<span class="grade">{{item.grade}}</span></p>
                  </template>
                  <template #desc>
                    <p class="desc">主演：{{item.actors | actors}}</p>
                    <div v-if="dataMovies.type === 'now'">
                      <span class="desc pandding-right">{{item.nation }}</span>|
                      <span class="desc">{{item.runtime }}分钟</span>
                    </div>
                      <div v-else>
                      <p class="desc">上映时间：{{item.premiereAt | time(chDays)}}</p>
                    </div>
                  </template>
                  <template #thumb>
                    <router-link :to="{path: '/detail/'+item.filmId}">
                        <img class="movieimg" :src="item.poster" alt="">
                    </router-link>
                </template>
                  <!-- <template #thumb>
                      <img class="movieimg" :src="item.poster" alt="">
                  </template> -->
              </van-card>
              </van-col>
            <van-col span="4">
              <van-button v-if="dataMovies.type === 'now'" class="button" size="mini" plain type="warning">购票</van-button>
              <van-button v-if="item.isPresale===true&&dataMovies.type === 'soon'" class="button" size="mini" plain type="warning">预约</van-button>
            </van-col>
        </van-row>
        </van-list>
    </div>
</template>
<script>
import { now, soon } from '../config/http.js'
export default {
  props: {
    // dataMovies: {
    //   type: Object,
    //   default () {
    //     return {}
    //   }
    // }
  },
  data () {
    return {
      movieList: [],
      chDays: '日一二三四五六',
      pageNum: 1,
      loading: false,
      finished: false,
      dataMovies: {
        type: ''
        // now: true,
        // soon: false
      }
    }
  },
  created () {
    const { name } = this.$route
    if (name === 'NowPlaying') {
      this.dataMovies.type = 'now'
    } else if (name === 'CommingSoon') {
      this.dataMovies.type = 'soon'
    }
  },
  methods: {
    // 这个事件一刷新页面就能触发 - 将第一次请求就放在这个事件中
    onLoad () {
      let params = ''
      if (this.dataMovies.type === 'now') {
        params = now
      } else if (this.dataMovies.type === 'soon') {
        params = soon
      }
      this.$http.get(params + '?pageNum=' + this.pageNum + '&cityId=' + this.$store.state.cityId)
        .then(res => {
          console.log(this.movieList)
          if (this.movieList.length >= res.data.total) {
            this.finished = true
          } else {
            this.movieList.push(...res.data.films)
            this.pageNum++
          }

          this.loading = false
        })
    },
    detail (id) {
      this.$router.push('/film/' + id)
    }
  },
  filters: {
    actors: function (data) {
      // console.log(data);
      // let arr = data.map(item => item.name)
      // console.log(arr);
      // console.log(111, data);
      if (!data) {
        return ''
      }
      return data.map(item => item.name).join(' ')
    },
    time: function (time, params) {
      // console.log(this);
      // console.log(111, time);
      const date = new Date(time * 1000)
      // console.log(222, date.getTime());
      // console.log(date.getDay());
      const day = params[date.getDay()]
      const d = date.getMonth() + 1 + '月' + date.getDate() + '日'
      return '周' + day + ' ' + d
    }
  }
}
</script>

<style lang="scss">
    $width: 66px;
    .movieimg{
        width: $width;
    }
    // .van-row{
    //   text-align: center;
    // }
    .title{
        height: 22px;
        font-size: 16px;
        line-height: 22px;
        color: #191a1b;
        margin-right: 5px;
        overflow: hidden;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        white-space: nowrap;
        .van-tag{
            font-size: 9px;
            color: #fff;
            background-color: #d2d6dc;
            height: 14px;
            line-height: 14px;
            padding: 0 2px;
            border-radius: 2px;
            margin-left: 5px;
        }
    }
    .desc{
        font-size: 13px;
        margin-top: 4px;
        color: #797d82;
        overflow: hidden;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
    }
    p{
        padding: 0;
        margin: 0;
    }
    .button{
      margin:25px auto;
    }
    .grade{
      color: #ffb232;
      font-size: 14px;
      margin-left:5px;
    }
    .van-row{
      border-bottom: 1px solid #ededed;
      padding: 15px 15px 15px 0;
      background-color: #fafafa;
    }
    .pandding-right{
      padding-right:5px
    }
</style>
