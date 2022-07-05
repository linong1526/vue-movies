<template>
<div>
  <van-nav-bar fixed placeholder safe-area-inset-top title="影院" left-text="返回" left-arrow >
    <template #right>
      <van-icon name="search" size="18"  color="#2c3e50"/>
    </template>
    <template #left>
      <span @click="goCity">{{$store.state.city}}<van-icon name="arrow-down" color="#2c3e50" /></span>
    </template>
  </van-nav-bar>
  <van-dropdown-menu active-color="#ff5f16">
    <van-dropdown-item :title="cityvalue" ref="item" @change="changeCity">
      <van-row gutter="20" type="flex" justify="space-between">
        <van-col span="6" v-for="item in cityoption" :key="item.value" class="city-margin">
          <van-button plain :type="item.typeColor" size="small" @click="onConfirm">{{item.text}}</van-button>
        </van-col>
      </van-row>
    </van-dropdown-item>
    <van-dropdown-item v-model="value" :options="option" />
    <van-dropdown-item v-model="distancevalue" :options="distanceoption" />
  </van-dropdown-menu>

  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <van-row gutter="20" v-for="item in cinemasLlist" :key="item.id" class="cell-container" @click="goCinemadetail(item.cinemaId)">
      <van-col span="18">
        <router-link :to="{path: '/cinema/'+item.cinemaId}">
          <span class="custom-title">{{item.name}}</span>
          <span class="custom-label">{{item.address}}</span>
        </router-link>
      </van-col>
      <van-col span="6">
        <span class="custom-price"><i>￥</i>{{item.latitude.toFixed(1)}}<i>起</i></span>
        <span class="custom-content">{{item.Distance?item.Distance.toFixed(1) + 'km':'距离未知'}}</span>
      </van-col>
    </van-row>
  </van-list>

</div>
</template>

<script>
import { cinema } from '../config/http.js'
export default {
  data () {
    return {
      loading: false,
      finished: false,
      cinemasLlist: [],
      pageNum: 1,
      // test
      value: 0,
      switch1: false,
      switch2: false,
      option: [
        { text: 'App订票', value: 0 },
        { text: '前台兑换', value: 1 }
      ],
      // typeColor: 'default',
      cityvalue: '全城',
      cityoption: [],
      // cityoption: [
      //   { text: '全城', value: 0, typeColor: 'warning' },
      //   { text: '越秀区', value: 1, typeColor: 'default' },
      //   { text: '海珠区', value: 3, typeColor: 'default' },
      //   { text: '天河区', value: 4, typeColor: 'default' },
      //   { text: '荔湾区', value: 5, typeColor: 'default' },
      //   { text: '番禺区', value: 6, typeColor: 'default' },
      //   { text: '白云区', value: 7, typeColor: 'default' },
      //   { text: '花都区', value: 8, typeColor: 'default' },
      //   { text: '黄埔区', value: 9, typeColor: 'default' },
      //   { text: '南沙区', value: 1, typeColor: 'default' },
      //   { text: '萝岗区', value: 1, typeColor: 'default' },
      //   { text: '从化区', value: 1, typeColor: 'default' },
      //   { text: '增城区', value: 1, typeColor: 'default' }
      // ],
      distancevalue: 0,
      distanceoption: [
        { text: '最近去过', value: 0 },
        { text: '离我最近', value: 1 }
      ],
      cityoption2: []
    }
  },
  created () {
    const { name } = this.$route
    if (name === 'Cinema') {
      this.getCinema()
      this.districtName()
    }
  },
  methods: {
    unique (arr) {
      const newArr = []
      for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
          if (arr[i] === arr[j]) {
            ++i
          }
        }
        newArr.push(arr[i])
      }
      return newArr
    },
    onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      // setTimeout(() => {
      //   for (let i = 0; i < 10; i++) {
      //     this.cinemasLlist.push(this.cinemasLlist.length + 1)
      //   }

      //   // 加载状态结束
      //   this.loading = false

      //   // 数据全部加载完成
      //   if (this.cinemasLlist.length >= 40) {
      //     this.finished = true
      //   }
      // }, 1000)
      this.pageNum++
      this.getCinema()
    },
    getCinema () {
      this.$http.get(cinema + '?pageNum=' + this.pageNum + '&cityId=' + this.$store.state.cityId)
        .then(res => {
          // this.cinemasLlist = res.data.cinemas
          console.log('getCinema', res)
          if (res.data.cinemas.length === 0) {
            this.finished = true
          } else {
            res.data.cinemas.forEach((item) => {
              this.cinemasLlist.push(item)
            })
          }
        })
      // 加载状态结束
      this.loading = false
    },
    districtName () {
      this.$http.get(cinema + `?cityId=${this.$store.state.cityId}&pageSize=999`).then(res => {
      // console.log('res.data', res.data)
        const cityoption = res.data.cinemas
        cityoption.forEach(item => {
        // console.log(item)
          this.cityoption.push({ text: '全城', value: '000000', typeColor: 'warning' })
          this.cityoption.push({ text: item.district.name, value: item.district.districtId, typeColor: 'default' })
        })
        /* 对象数组去重 获取城市/区/县 */
        const deWeightThree = () => {
          const map = new Map()
          for (const item of this.cityoption) {
            if (!map.has(item.text)) {
              map.set(item.text, item)
            }
          }
          return [...map.values()]
        }
        const newArr3 = deWeightThree()
        this.cityoption = [...newArr3]
        // console.log('%c%s', 'color:red;', '方法三：es6,newArr3', newArr3)
        // console.log('this.cityoption2', newArr3)
      })
    },
    goCity () {
      this.$router.push('/city')
    },
    onConfirm (val) {
      const { target } = val
      this.cityvalue = target.innerText
      console.log('onConfirm', val)
      // console.log('onConfirm', val.target.innerText)
      this.cityoption.forEach((item) => {
        if (item.text === this.cityvalue) {
          item.typeColor = 'warning'
        } else {
          item.typeColor = 'default'
        }
      })
      this.$refs.item.toggle() // 不传值默认false
    },
    changeCity (val) {
      console.log('changeCity', val)
    },
    goCinemadetail (id) {
      // console.log('goCinemadetail', id)
      this.$router.push('/cinema/' + id)
    }
  }
}
</script>
<style lang="scss" scoped>
.van-row {
  border-bottom: 1px solid #ededed;
  padding: 15px 15px 15px 15px;
  background-color: #fafafa;
  .city-margin{
    margin-top:10px;
  }
}

.cell-container span{
  display: block;
  max-width: 80%;
  padding-left: 10px;
}
.custom-title{
  color: #191a1b;
  font-size: 15px;
  margin-right: 4px;
  vertical-align: middle;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.custom-label{
  color: #797d82;
  font-size: 12px;
  margin-top: 5px;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.custom-price{
  color: #ff5f16;
  vertical-align: middle;
  i{
    font-size: 10px;
  }
}
.custom-content{
  width: 100%;
  color: #797d82;
  font-size: 12px;
  margin-top: 5px;
}
</style>
