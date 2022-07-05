# 组件化swiper轮播

## 第一步
下载
```ssh
npm install swiper@5.4.5
npm i swiper vue-awesome-swiper@4.1.1
```
> vue-awesome-swiper根据不同的swiper版本也对应有不同的版本，主要有三个版本：

> Vue-Awesome-Swiper - v2.6.7 对应 Swiper3

> Vue-Awesome-Swiper - v3.1.3 对应 Swiper4

> Vue-Awesome-Swiper - v4.1.1 对应 Swiper6（截止2020/08/10）

## 第二步导入main.js,全局注册
```js 
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
Vue.use(VueAwesomeSwiper)
```
## 第三步 局部引入 xxxx.vue 
```js
import { swiper, swiperSlide } from "vue-awesome-swiper"
import "swiper/css/swiper.css"
export default {
  components: {
    swiper,
    swiperSlide
  }
}

```
**具体配置请看第四步，如下:**
## 第四步vue-awesome-swiper模板引入
[组件模板前往》](https://v1.github.surmon.me/vue-awesome-swiper/)
![](https://i0.hdslb.com/bfs/album/79648ef4c712a110368c89def1a85ae8667c462c.png)
[swiper中文API前往] (https://www.swiper.com.cn/api/)


## 第五步样式问题
1. 显示的模板不是你想要的，可以自定义样式
2. 样式不起效果，可在[swiperdemo](https://www.swiper.com.cn/demo/index.html)找到对应的案例,右键鼠标查看源码
，复制style的样式放在你使用的文件样式 

![](https://i0.hdslb.com/bfs/album/2bac6c5808aae5a917da78ec4bb0e7df64117d4b.png)
![](https://i0.hdslb.com/bfs/album/ba0a290b663d2423f7e90bdff47d17001a084395.png)

## 第六步 API的使用
[vue-awesome-swiper-API的使用](https://github.com/surmon-china/vue-awesome-swiper/tree/v4.1.1)