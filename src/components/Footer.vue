<template>
    <div>
        <!-- <div v-show="$store.state.showFooter"> -->
          <van-tabbar v-model="active"  active-color="#ff5f16" @change="tab">
        <van-tabbar-item replace>
            <van-icon slot="icon" class="iconfont icon-dianying" />
            <span>电影</span>
        </van-tabbar-item>
        <van-tabbar-item>
            <van-icon slot="icon" class="iconfont icon-yingyuan"/>
            <span>影院</span>
        </van-tabbar-item>
        <van-tabbar-item>
            <!-- <van-icon slot="icon" class="iconfont icon-wode" /> -->
            <van-icon slot="icon" class="iconfont icon-xiaoxi" />
            <span>资讯</span>
        </van-tabbar-item>
        <van-tabbar-item>
            <!-- <van-icon slot="icon" class="iconfont icon-wode1" /> -->
            <van-icon slot="icon" class="iconfont icon-wode" />
            <span>我的</span>
        </van-tabbar-item>
        </van-tabbar>
        <!-- </div> -->
    </div>
</template>

<script>
// import { mapState } from 'vuex'
export default {
  data () {
    return {
      active: 0,
      url: ['/', '/cinema', '/news', '/my']
    }
  },
  created () {
    this.active = this.$store.state.active
  },
  watch: {
    '$store.state.active': function () {
      this.active = this.$store.state.active
    }
  },
  // computed: {
  //   ...mapState(['active'])
  // },
  methods: {
    tab () {
      // this.router.push('/')
      // console.log(this.active);
      this.$router.push(this.url[this.active])
    }
  }
}
</script>

<style>
.moivefooter{
  margin-top: 50px;
}
</style>
