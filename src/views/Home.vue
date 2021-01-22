<template>
  <div>
    <el-container>
      <el-header class="homeHeader">
        <div class="title">云E办</div>
        <el-dropdown class="userInfo" @command="commandHandler">
          <span class="el-dropdown-link">
            {{ user.name }}<i><img :src="user.userFace"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="userinfo">个人中心</el-dropdown-item>
            <el-dropdown-item command="setting">设置</el-dropdown-item>
            <el-dropdown-item command="logout">注销登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-container>
        <el-aside width="200px">

          <!-- 1、添加 router  -->
          <el-menu router unique-opened>
            <!-- 2、循环整个路由组件，不展示 hidden: true 的路由组件 -->
            <el-submenu :index="index +''" v-for="(item,index) in routes"
                        :key="index" v-if="!item.hidden">
              <template slot="title"><i :class="item.iconCls" style="color: black;margin-right: 5px"></i>
                <span>{{ item.name }}</span>
              </template>
              <!-- 3、循环遍历子路由 -->
              <el-menu-item :index="children.path"
                            v-for="(children,index) in item.children" :key="index">{{ children.name }}
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <!-- 面包屑导航区域 -->
          <el-breadcrumb separator-class="el-icon-arrow-right"
                         v-if="this.$router.currentRoute.path!=='/home'">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ this.$router.currentRoute.name }}</el-breadcrumb-item>
          </el-breadcrumb>
          <div class="homeWelcome" v-if="this.$router.currentRoute.path==='/home'">
            欢迎来到云E办系统！
          </div>
          <!-- 路由点位符 -->
          <router-view class="homeRouterView"/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  name: 'Home',
  data() {
    return {
      // 获取用户信息，将字符串转对象
      user: JSON.parse(window.sessionStorage.getItem('user'))
    }
  },
  computed: {
    // 从 vuex 获取 routes
    routes() {
      return this.$store.state.routes
    }
  },
  methods: {
    // 注销登录
    commandHandler(command) {
      if (command === 'logout') {
        // 弹框提示用户是否要删除
        this.$confirm('此操作将注销登录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 注销登录
          this.postRequest('/logout')
          // 清空用户信息
          window.sessionStorage.removeItem('tokenStr')
          window.sessionStorage.removeItem('user')
          // 路由替换到登录页面
          this.$router.replace('/')
          // 清空菜单信息；在src/utils/menus.js 中初始化菜单信息
          this.$store.commit('initRoutes', [])
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消注销登录'
          });
        });
      }
    }
  }
}
</script>
<style scoped>
.homeHeader {
  background: #3e9ef5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  box-sizing: border-box;

}

.homeHeader .title {
  font-size: 30px;
  /*font-family: 微软雅黑;*/
  font-family: 华文楷体;
  color: white;
}

.homeHeader .userInfo {
  cursor: pointer;
}

.el-dropdown-link img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-left: 8px;
}
.homeWelcome{
  text-align: center;
  font-size: 30px;
  font-family:华文楷体;
  color: #409ef4;
  padding-top: 50px;
}
.homeRouterView{
  margin-top: 10px;
}
</style>
