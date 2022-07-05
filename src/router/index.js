import Vue from 'vue'
import VueRouter from 'vue-router'
// 在导入文件的时候，vue内置了@变量，表示src文件夹。导入的文件后缀是js或vue都是可以省略后缀的
import NowPlaying from '@/views/nowPlaying'
import CommingSoon from '@/views/commingSoon'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/films/nowPlaying'
  },
  {
    path: '/films',
    component: () => import('../components/FilmsNavbar.vue'),
    name: 'Films',
    children: [
      {
        path: 'nowPlaying',
        component: NowPlaying,
        name: 'NowPlaying'
      },
      {
        path: 'commingSoon',
        component: CommingSoon,
        name: 'CommingSoon'
      }
    ]
  },
  {
    path: '/detail/:id',
    component: () => import('../components/DetailInfo.vue'),
    name: 'Detail'
  },
  {
    path: '/my',
    component: () => import('../views/myHome.vue'),
    name: 'myHome'
  },
  {
    path: '/cinema',
    component: () => import('../views/cinemaList.vue'),
    name: 'Cinema'
  },
  {
    path: '/cinema/:id',
    component: () => import('../views/cinemaDetail.vue'),
    name: 'CinemaId'
  },
  {
    path: '/city',
    component: () => import('../components/citySelect.vue'),
    name: 'City'
  },
  {
    path: '/news',
    component: () => import('../views/newList.vue')
  }
]
// 解决底部导航不在当期页码报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch((err) => err)
}
const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

// 解决底部导航闪烁问题
router.beforeEach((to, from, next) => {
  console.log(to)
  // console.log(store.state.active);
  // 对to做判断
  if (to.path === '/' || to.path === '/films/nowPlaying' || to.path === '/films/commingSoon') {
    store.commit('setActive', 0)
  } else if (to.path === '/cinema') {
    store.commit('setActive', 1)
  } else if (to.path === '/news') {
    store.commit('setActive', 2)
  } else if (to.path === '/my') {
    store.commit('setActive', 3)
  }
  // if(to.path === '/my') {
  //   router.push({path: '/'})
  // } else
  next()
})
export default router
