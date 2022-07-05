const {
  defineConfig
} = require('@vue/cli-service')
const {
  VantResolver
} = require('unplugin-vue-components/resolvers')
const ComponentsPlugin = require('unplugin-vue-components/webpack')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  configureWebpack: {
    plugins: [
      ComponentsPlugin({
        resolvers: [VantResolver()]
      })
    ]
  },
  // 配置当前项目的服务器 - devServer
  devServer: {
    // open - 自动打开浏览器
    // open: true, // 默认地址：  0.0.0.0:3000 - 要打开的是localhost:3000
    open: 'http://localhost:3000',
    // port - 指定端口号
    port: 3000,
    // 配置服务器代理
    proxy: {
      '/api': {
        target: 'https://api.iynn.cn/film/api/v1', // 目标地址，
        changeOrigin: true,
        // 路径重写 - 实际上请求的目标地址是target + 键
        // pathRewrite: {
        //   '/api/getNowPlayingFilmList': ''
        // }

        pathRewrite: {
          '/api': ''
        }
      }
    }
  }
})

/*
npm下载，有些参数：
  -g   --global
  --save   -S(项目依赖)    强制性的让下载的插件记录在package.json中，且记录在dependencies中，以后我们通过npm i安装的时候，安装的就是这一项中的内容
  --save-dev   -D   强制性的让下载的插件记录在package.json中，且记录在devDependencies(开发依赖)，将来通过npm i安装的时候会忽略这一项

  vant使用步骤：
  1.下载vant
  2.下载提示的插件
  3.配置插件
  4.使用
    导入标签模块
    导入vue
    Vue.use(标签模块)
    复制标签到模板中
    查看API文档，修改标签

  请求数据通过axios进行请求，避免每个子组件中都需要导入axios，就将axios在根实例导入，挂载到vue的原型上，每个vue实例都可以默认使用原型上的方法了

  因为请求要跨域，所以配置proxy代理，在vue.config.js中配置
  配置代理：
  proxy: {
      '/api': {
        target: 'https://api.iynn.cn/film/api/v1', // 目标地址，
        changeOrigin: true,

        pathRewrite: {
          '/api': ''
        }
      }
    }

  为了让请求路径写的简单，我们去封装了请求地址的文件;
  const head = '/api'
  module.exports = {
      'now': head + 'getNowPlayingFilmList',
      'soon': head + 'getComingSoonFilmList'
  }
  以后导入了，就可以使用一个简单的单词，代表请求的路径了

  请求响应回来的内容，永远都是 res.data才是我们最终想要的数据，这个机制是axios提供的，为了方便我们直接获取到响应的数据，对axios做配置 - 响应拦截器
  axios.interceptors.response.use(function (response) {
      // 对响应数据做点什么
      return response.data;
      // 这里的response表示默认响应的内容，要其中的data就返回 response.data，每次响应回来的数据，我们在then执行之前，会先执行这里的代码，接收到的数据，就是response.data
  }, function (error) {
      // 对响应错误做点什么
      return Promise.reject(error);
  });

  es6：
  数据类型：
    map
    set
    symbol
    数组  - 解构/展开/合并/方法
    字符串 - 模板字符串/字符串方法
    对象 - 简写/解构
  函数 - 箭头函数
  类 - class
  promise -
  async/await
  for of

  深浅拷贝：做一个新数据，不要跟原数据使用同一个内存地址
    引用数据 - 数组/对象/函数

  浅：整个新数据的内存地址跟整个原数据的内存地址不同，但是其中的引用数据类型还使用同一个内存地址
  var obj = {
    name: '张三',
    wife: {
      name: '翠花'
    }
  }

  var pbj = {
    name: '张三',
    wife: {
      name: '翠花'
    }
  }
  深：整个数据和其中的引用类型都是不同的内存地址

*/
