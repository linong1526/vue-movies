// 导入vuex
import vuex from "vuex"
// 导入vue
import Vue from 'vue'
// vue使用vuex
Vue.use(vuex)

// 封装获取cookie的函数
function getCookie(key) {
    let cookies = document.cookie
    if(!cookies) {
        return null
    }
    cookies = cookies.split('; ')
    let city = null
    cookies.forEach(item => {
        let brr = item.split('=')
        if(brr[0] === key) {
            city = brr[1]
        }
    })
    if(!city) {
        return null
    }
    return city
}

// 配置vuex
const store = new vuex.Store({
    // 在配置的时候需要使用特定的键，来指定我们要定义的共享数据
    state: {
        // 数据 - 数据不允许直接修改
        cityId: getCookie('cityId'),
        city: getCookie('city'),
        showFooter: true,
        active: 0
    },
    // 用来修改state中的数据的键
    mutations: {
        // 修改数据的方法 - 能且仅能接收一个参数
        // edit(state, arg) {
        //     console.log(arg);
        //     state.cityId = 666
        // }

        setCity(state, v) {
            let date = new Date()
            date.setTime(date.getTime() - 7.5*3600*1000)
            document.cookie = `city=${v.name};expires=${date};path=/`
            document.cookie = `cityId=${v.cityId};expires=${date};path=/`
            state.city = v.name
            state.cityId = v.cityId
        },
        showFooter(state) {
            state.showFooter = false
        },
        setActive(state, index) {
            state.active = index
        }
    }
})

// 导出
export default store