import Vue from 'vue'
import Vuex from 'vuex'
import {getRequest} from "@/utils/api";
import SockJS from 'sockjs-client' // 2-1 在线聊天-导入下载的在线聊天依赖
import Stomp from 'stompjs' // 2-1 在线聊天-导入下载的在线聊天依赖
import {Notification} from 'element-ui';

Vue.use(Vuex)
const now = new Date();

// 导入 Vuex
const store = new Vuex.Store({
    state: {
        routes: [],
        sessions: {},
        // sessions: [],
        // 1-1 用来接收后端接口返回的数据
        admins: [],
        currentAdmin: JSON.parse(window.sessionStorage.getItem('user')), // 当前用户
        currentSession: null,
        // currentSession: -1,
        filterKey: '',
        stomp: null, // 2-2 在线聊天-定义对象
        idDot: {} // 未读消息 对象
    },
    mutations: { // 与 state 同步执行；可以改变 state 对应的值的方法
        // 初始化路由
        initRoutes(state, data) {
            state.routes = data
        },
        changecurrentSession(state, currentSession) {
            state.currentSession = currentSession;
            // 已读消息 小红点消失
            Vue.set(state.idDot, state.currentAdmin.username + '#' + state.currentSession.username, false)
        },
        addMessage(state, msg) {
            let mss = state.sessions[state.currentAdmin.username + '#' + msg.to]
            if (!mss) {
                // state.sessions[state.currentAdmin.username + '#' + msg.to] = []
                Vue.set(state.sessions, state.currentAdmin.username + '#' + msg.to, [])
            }
            state.sessions[state.currentAdmin.username + '#' + msg.to].push
            ({
                content: msg.content,
                date: new Date(),
                self: !msg.notSelf // 不是自己
            })
        },
        INIT_DATA(state) {
            // 1-2 注释这一段 浏览器本地的历史聊天记录
            let data = localStorage.getItem('vue-chat-session');
            //console.log(data)
            if (data) {
                state.sessions = JSON.parse(data);
            }
        },
        // 1-3 初始化数据
        INIT_ADMINS(state, data) {
            state.admins = data
        }
    },
    // 异步执行
    actions: {
        // 2-3 在线聊天; context 上下文
        connect(context) {
            context.state.stomp = Stomp.over(new SockJS('/ws/ep')) // 连接端点
            let token = window.sessionStorage.getItem('tokenStr')
            context.state.stomp.connect({'Auth-Token': token}, success => { // 把 token 放进去
                context.state.stomp.subscribe('/user/queue/chat', msg => { // 订阅消息频道
                    // console.log(msg.body)
                    let receiveMsg = JSON.parse(msg.body)
                    // 有消息发来，右下角 弹框提示
                    if (!context.state.currentSession || receiveMsg.from !== context.state.currentSession.username) {
                        Notification.info({
                            title: '【' + receiveMsg.formNickName + '】发来一条消息',
                            message: receiveMsg.content.length > 10 ? receiveMsg.content.substr(0, 10) : receiveMsg.content,
                            position: 'bottom-right'
                        })
                        // 有未读消息 展示小红点
                        Vue.set(context.state.idDot, context.state.currentAdmin.username + '#' + receiveMsg.from, true)
                    }
                    receiveMsg.notSelf = true;
                    receiveMsg.to = receiveMsg.from
                    context.commit('addMessage', receiveMsg) // 接收
                })
            }, error => {
            })
        },
        initData(context) {
            context.commit('INIT_DATA')
            // 1-4 调用接口获取数据
            getRequest('/chat/admin').then(resp => {
                if (resp) {
                    context.commit('INIT_ADMINS', resp)
                }
            })
        }
    }
})

store.watch(function (state) {
    return state.sessions
}, function (val) {
    console.log('CHANGE: ', val);
    localStorage.setItem('vue-chat-session', JSON.stringify(val));
}, {
    deep: true/*这个貌似是开启watch监测的判断,官方说明也比较模糊*/
})


export default store;
