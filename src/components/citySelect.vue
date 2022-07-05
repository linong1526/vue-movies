<template>
    <div>
      <!-- 地理位置 -->
      <iframe id="geoPage" width=0 height=0 frameborder=0 style="display:none;" scrolling="no" src="https://apis.map.qq.com/tools/geolocation?key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp"></iframe>
      <van-sticky>
        <van-nav-bar>
          <template #left>
            <van-icon name="cross"  size="20" color="#1c1d1e" @click="goback"/>
          </template>
          <template #title>
            <span>当前城市-</span>
          </template>
        </van-nav-bar>
      </van-sticky>
      <van-search
        v-model="keywords"
        show-action
        placeholder="输入城市名或拼音"
        @input="search"
        @search="onSearch"
        @cancel="onCancel"
      />
        <div v-if="keywords">
            <van-list>
            <van-cell v-for="item in searchCity" :key="item.cityId" :title="item.name" @click="selectCity(item)" />
            </van-list>
        </div>
        <div v-else>
            <van-index-bar :index-list="indexList">
            <!-- 所在城市 -->
            <van-index-anchor><span class="custom-title">你所在的城市</span></van-index-anchor>
            <van-row class="custom-row">
              <van-col span="6" class="custom-col">{{opp?opp:'定位失败'}}</van-col>
            </van-row>
            <!-- 热门城市 -->
            <van-index-anchor><span class="custom-title">热门城市</span></van-index-anchor>
              <van-row class="custom-row" gutter="20" type="flex" justify="space-around">
              <van-col span="4" class="custom-col" v-for="item in hotList" :key="item.pinyin"><span @click="selectCity(item)">{{item.name}}</span></van-col>
            </van-row>
            <!-- 字母索引列表 -->
            <div v-for="item in indexList" :key="item">
                <van-index-anchor class="custom-anchor" :index="item">{{item}}</van-index-anchor>
                <van-cell v-for="v in city[item]" :key="v.cityId" :title="v.name" @click="selectCity(v)" />
            </div>
            </van-index-bar>
        </div>
    </div>
</template>

<script>
import { city } from '@/config/http'
import { Toast } from 'vant'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      indexList: [1, 2, 3, 4],
      city: {},
      keywords: '',
      cities: [],
      searchCity: [],
      opp: '',
      hotList: []
    }
  },
  computed: {
    // ...mapState(['cityId'])
  },
  created () {
    // console.log(this.$store.state.cityId);
    this.$http.get(city)
      .then(res => {
        this.cities = res.data.cities
        // 遍历数据
        const arr = res.data.cities.map(item => item.pinyin.slice(0, 1).toUpperCase())
        // console.log(arr);
        const s = new Set(arr)
        const brr = []
        s.forEach(item => {
          // console.log(item);
          brr.push(item)
        })
        brr.sort()
        this.indexList = brr

        console.log(res.data.cities, this.indexList)

        // 根据indexList整理city数据
        // 遍历indexList
        this.indexList.forEach(item => {
          // 根据item从所有数据中找到对应的城市数组
          this.city[item] = res.data.cities.filter(v => {
            return v.pinyin.slice(0, 1).toUpperCase() === item
          })
          // this.city[item]
        })

        // 热门城市
        const hostarr = res.data.cities.filter(item => item.isHot === 1)
        this.hotList = hostarr
        console.log('hostarr', hostarr)
      })
  },
  mounted () {
    this.Tmap()
  },
  methods: {
    // 将导入的vuex中定义的好的修改数据的方法放到当前实例中
    // ...mapMutations(['edit']),
    // fn(num) {
    //     // this.$store.commit('edit')
    //     // console.log(this.edit);
    //     this.edit(num, 111)
    // }

    ...mapMutations(['setCity']),
    selectCity (v) {
      console.log(v)
      // 获取到了要修改的数据了，将这个数据赋值给state中的city
      // 要修改state中的数据，就要在store中定义mutations
      this.setCity(v)
      // 跳转到首页
      this.$router.push({ path: '/' })
    },
    search () {
      // 通过keywords从所有数据中筛选出需要显示的数据
      this.searchCity = this.cities.filter(item => item.pinyin.includes(this.keywords) || item.name.includes(this.keywords))
    },
    onSearch (val) {
      Toast(val)
    },
    onCancel () {
      Toast('取消')
    },
    goback () {
      this.$router.back()
    },
    Tmap () { // 获取地理位置
      window.addEventListener('message', function (event) {
        const loc = event.data
        // console.log('loc', loc)
        this.opp = loc.city
        // console.log('opp', this.opp) // 显示你当前位置
      }, false)
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-row{
  background-color:#fff;
  border-bottom: 1px solid #ededed;
  padding: 15px 15px 15px 15px;
  .custom-col{
    margin-top:10px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    // text-align: center;
    background-color: #f4f4f4;
  }
}
  .custom-title{
    background-color: transparent;
    color: #797d82;
    font-size: 13px;
    height: 30px;
    line-height: 30px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .custom-anchor {
    background-color: #f4f4f4;
    color: #797d82;
    // padding: 0 0 0 15px;
    height: 30px;
    line-height: 30px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

</style>
