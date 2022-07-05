import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from '@/config/axios'
import store from '@/store'
import '@/assets/font/iconfont.css'
import {
  Card,
  List,
  Tab,
  Tabs,
  Tabbar,
  TabbarItem,
  Grid,
  GridItem,
  Col,
  Row,
  Sticky,
  Panel,
  DropdownMenu,
  DropdownItem,
  Search,
  IndexBar,
  IndexAnchor,
  Toast
} from 'vant'

import VueAwesomeSwiper from 'vue-awesome-swiper'
// import 'swipe/wiper-bundle.css' // 如引入出错 更改版本为npm install swiper@5.4.5
// import 'swiper/css/swiper.css'
Vue.use(VueAwesomeSwiper /* { default options with global component } */ )

Vue.config.productionTip = false
Vue.prototype.$http = axios

Vue.use(Card)
Vue.use(List)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(Col)
Vue.use(Row)
Vue.use(Sticky)
Vue.use(Panel)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Search)
Vue.use(IndexBar)
Vue.use(IndexAnchor)
Vue.use(Toast)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
