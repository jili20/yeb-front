import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const now = new Date();

// 导入 Vuex
const store = new Vuex.Store({
    state:{
        routes:[],
        sessions:[{
            id:1,
            user:{
                name:'示例介绍',
                img:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2871119264,233376496&fm=26&gp=0.jpg'
            },
            messages:[{
                content:'Hello，这是一个基于Vue + Vuex + Webpack构建的简单chat示例，聊天记录保存在localStorge, 有什么问题可以通过Github Issue问我。',
                date:now
            },{
                content:'项目地址(原作者): https://github.com/coffcer/vue-chat',
                date:now
            },{
                content:'本项目地址(重构): https://github.com/is-liyiwei',
                date:now
            }]
        },{
            id:2,
            user:{
                name:'webpack',
                img:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwx2.sinaimg.cn%2Fmw690%2F5301ff11ly1gb58jx3jllj20p00p0wh8.jpg&refer=http%3A%2F%2Fwx2.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613833868&t=f8c9590fba2943a762fd7248481da017'
            },
            messages:[{
                content:'Hi，我是webpack哦',
                date:now
            }]
        }],
        currentSessionId:1,
        filterKey:''
    },
    mutations:{ // 与 state 同步执行；可以改变 state 对应的值的方法
        // 初始化路由
        initRoutes(state,data){
            state.routes = data
        },
        changeCurrentSessionId (state,id) {
            state.currentSessionId = id;
        },
        addMessage (state,msg) {
            state.sessions[state.currentSessionId-1].messages.push({
                content:msg,
                date: new Date(),
                self:true
            })
        },
        INIT_DATA (state) {
            let data = localStorage.getItem('vue-chat-session');
            //console.log(data)
            if (data) {
                state.sessions = JSON.parse(data);
            }
        }
    },
    // 异步执行
    actions:{
        initData (context) {
            context.commit('INIT_DATA')
        }
    }
})

store.watch(function (state) {
    return state.sessions
},function (val) {
    console.log('CHANGE: ', val);
    localStorage.setItem('vue-chat-session', JSON.stringify(val));
},{
    deep:true/*这个貌似是开启watch监测的判断,官方说明也比较模糊*/
})


export default store;
