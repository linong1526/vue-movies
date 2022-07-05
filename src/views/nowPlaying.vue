<template>
    <div>
    <movies-template></movies-template>
    </div>
</template>

<script>
import MoviesTemplate from '../components/MoviesTemplate.vue'
export default {
  components: { MoviesTemplate },
  data () {
    return {
    }
  },
  created () {
    console.log('7777', this.$route)
  },
  methods: {
    // 这个事件一刷新页面就能触发 - 将第一次请求就放在这个事件中
  }
}

</script>

<style lang="scss">
</style>
