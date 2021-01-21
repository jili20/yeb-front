<template>
  <div>
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">

          <!-- 1、添加 router  -->
          <el-menu router>
            <!-- 2、循环整个路由组件，不展示 hidden: true 的路由组件 -->
            <el-submenu index="1" v-for="(item,index) in this.$router.options.routes"
                        :key="index" v-if="!item.hidden">
              <template slot="title"><i class="el-icon-location"></i>
                <span>{{ item.name }}</span>
              </template>
              <!-- 3、循环遍历子路由 -->
              <el-menu-item :index="children.path"
                            v-for="(children,indexj) in item.children">{{ children.name }}
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
}
</script>
<style lang="less" scoped>
</style>
