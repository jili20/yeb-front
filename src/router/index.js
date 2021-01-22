import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/views/Login";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login,
        hidden: true // 不会被循环遍历出来
    }
]

const router = new VueRouter({
    routes
})

export default router
