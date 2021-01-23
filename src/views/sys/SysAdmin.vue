<template>
  <div>
    <!-- 1、 -->
    <div style="display: flex;justify-content: center;margin-top: 10px;">
      <!-- 9、v-model="keywords" \ @click="doSearch">搜索 -->
      <el-input v-model="keywords" placeholder="通过用户名搜索用户..." prefix-icon="el-icon-search"
                style="width: 400px;margin-right: 10px;"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="doSearch">搜索</el-button>
    </div>
    <!-- 2、6、 -->
    <div class="admin-container">
      <el-card class="admin-card" v-for="(admin,index) in admins" :key="index">
        <div slot="header" class="clearfix">
          <span>{{ admin.name }}</span>
          <el-button style="float: right; padding: 3px 0;color:red;" type="text" icon="el-icon-delete"></el-button>
        </div>
        <div>
          <div class="img-container">
            <img :src="admin.userFace" :alt="admin.name" :title="admin.name" class="userFace-img">
          </div>
        </div>
        <div class="userinfo-container">
          <div>用户名：{{ admin.name }}</div>
          <div>手机号码：{{ admin.phone }}</div>
          <div>电话号码：{{ admin.telephone }}</div>
          <div>地址：{{ admin.address }}</div>
          <div>用户状态：
            <el-switch
                v-model="admin.enabled"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="启用"
                inactive-text="禁用">
            </el-switch>
          </div>
          <div>
            用户角色：
            <el-tag style="margin-right: 4px;" type="success" v-for="(role,index) in admin.roles" :key="index">
              {{ role.nameZh }}
            </el-tag>
            <!-- 3个点按钮 ... -->
            <el-button type="text" icon="el-icon-more"></el-button>
          </div>
          <div>备注：{{ admin.remark }}</div>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  name: "SysAdmin",
  data() {
    return {
      admins: [], // 3
      keywords: '' // 8、搜索关键字
    }
  },
  mounted() {
    this.initAdmins() // 5
  },
  methods: {
    // 10 搜索
    doSearch(){
      this.initAdmins()
    },
    // 4、获取所有操作员；11、加参数关键字
    initAdmins() {
      this.getRequest('/system/admin/?keywords='+this.keywords).then(resp => {
        if (resp) {
          this.admins = resp
        }
      })
    }
  }
}
</script>

<style>
/* 7 */
.admin-container {
  margin-top: 10px;
  display: flex;
  justify-content: space-around; /* 在弹性盒对象的 <div> 元素中的各项周围留有空白：*/
  flex-wrap: wrap; /* 自动换行 */
}

.admin-card {
  width: 350px;
  margin-bottom: 20px;
}

.userFace-img {
  width: 72px;
  height: 72px;
  border-radius: 72px;
}

/* 头像居中 */
.img-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

.userinfo-container {
  font-size: 12px;
  color: #3e9ef5;
}
</style>
