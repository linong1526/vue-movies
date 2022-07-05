<template>
    <div>
      <div :class="{top: true, xuanfu: xuanfu}">
          <!-- <h2 :class="{title: title}">电影</h2>
          <div @click="gocity" :class="{title: title, city: true}">
              <span>广州</span>
              <i class="iconfont icon-xiajiantou"></i>
          </div> -->
          <van-nav-bar :class="{title: title}" title="电影">
            <template #left>
              <span @click="gocity" >{{$store.state.city}}<van-icon name="arrow-down" color="#2c3e50" style="padding-left:3px"/></span>
            </template>
          </van-nav-bar>
          <van-tabs color="#ff5f16" title-active-color="#ff5f16">
              <van-tab  title="正在热映" :to="{path: '/films/nowPlaying'}"></van-tab>
              <van-tab  title="即将上映" :to="{path: '/films/commingSoon'}"></van-tab>
          </van-tabs>
      </div>
      <router-view></router-view>
    </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0,
      xuanfu: false,
      title: true
    }
  },
  mounted () {
    window.onscroll = () => {
      // 获取滚动过的距离
      const t = document.documentElement.scrollTop || document.body.scrollTop
      // 判断
      if (t >= 250) {
        this.xuanfu = true
        this.title = false
      } else {
        this.xuanfu = false
        this.title = true
      }
    }
  },
  methods: {
    gocity () {
      // 跳转到城市页面
      this.$router.push({ path: '/city' })
    }
  }
}
</script>

<style lang="scss">
    .top{
        position: relative;
        h2{
            text-align: center;
        }
        .city{
            position: absolute;
            left: 0;
            top: 0;
        }
        .title{
            display: none;
        }
    }
    .xuanfu{
        position: fixed;
        left: 0;
        top: 0;
        z-index: 5;
        background-color: #fff;
        width: 100%;
    }
</style>
