<template>
  <div>
    <el-container>
      <el-header>Header</el-header>
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
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  name: 'Home',
  computed: {
    // 从 vuex 获取 routes
    routes() {
      return this.$store.state.routes
    }
  }
}
</script>
<style lang="less" scoped>
</style>
