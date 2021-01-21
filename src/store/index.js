import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 导入 Vuex
export default new Vuex.Store({
    state:{
        routes:[]
    },
    mutations:{ // 与 state 同步执行；可以改变 state 对应的值的方法
        // 初始化路由
        initRoutes(state,data){
            state.routes = data
        }
    },
    // 异步执行
    actions:{}
})
