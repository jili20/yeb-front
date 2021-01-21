import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/views/Login";
import Home from "@/views/Home";
import Test1 from "@/views/Test1";
import Test2 from "@/views/Test2";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login,
        hidden: true // 不会被循环遍历出来
    },
    {
        path: '/home',
        name: '导航一',
        component: Home,
        // 创建子路由，之后页面就跳转到 Home 页面内
        children: [
            {
                path: '/test1',
                name: '选项1',
                component: Test1
            },
            {
                path: '/test2',
                name: '选项2',
                component: Test2
            }
        ]
    }
]

const router = new VueRouter({
    routes
})

export default router
