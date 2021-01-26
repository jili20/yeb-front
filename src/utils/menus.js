import {getRequest} from "@/utils/api";

// 菜单请求工具类

// router 路由； store Vuex
export const initMenu = (router, store) => {
    // 如果有数据，初始化路由菜单
    if (store.state.routes.length > 0) {
        return;
    }

    getRequest('/system/config/menu').then(data => {
        // 如果数据存在 格式化路由
        if (data) {
            // 格式化好路由
            let fmtRoutes = formatRoutes(data)
            // 添加到 router
            router.addRoutes(fmtRoutes)
            // 将数据存入 Vuex
            store.commit('initRoutes',fmtRoutes)
            // 连接 WebSocket
            store.dispatch('connect')
        }
    })
}

export const formatRoutes = (routes) => {
    let fmtRoutes = []
    routes.forEach(router => {
        let {
            path,
            component,
            name,
            iconCls,
            children
        } = router;
        // 如果有 children 并且类型是数组
        if (children && children instanceof Array) {
            // 递归
            children = formatRoutes(children)
        }
        // 单独对某一个路由格式化 component
        let fmRouter = {
            path: path,
            name: name,
            iconCls: iconCls,
            children: children,
            component(resolve) {
                // 判断组件以什么开头，到对应的目录去找
                if (component.startsWith('Home')) {
                    require(['@/views/' + component + '.vue'], resolve);
                }else if (component.startsWith('Emp')) {
                    require(['@/views/emp/' + component + '.vue'], resolve);
                }else if (component.startsWith('Per')) {
                    require(['@/views/per/' + component + '.vue'], resolve);
                }else if (component.startsWith('Sal')) {
                    require(['@/views/sal/' + component + '.vue'], resolve);
                }else if (component.startsWith('Sta')) {
                    require(['@/views/sta/' + component + '.vue'], resolve);
                }else if (component.startsWith('Sys')) {
                    require(['@/views/sys/' + component + '.vue'], resolve);
                }
            }
        }
        fmtRoutes.push(fmRouter)
    })
    return fmtRoutes
}
