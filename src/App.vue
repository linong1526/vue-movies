<template>
  <div id="app">
    <router-view></router-view>
    <!-- 放底部组件名称 -->
    <moive-footer v-show="$route.name ==='NowPlaying' || $route.name === 'CommingSoon' ||  $route.name === 'Cinema' ||  $route.name === 'myHome'"></moive-footer>
  </div>
</template>

<script>
import footer from '@/components/Footer'
export default {
  components: {
    'moive-footer': footer
  },
  created () {
    if (!this.$store.state.city || !this.$store.state.cityId) {
      this.$router.push({ path: '/city' })
    }
  }
}
</script>

<style lang="scss">
</style>
