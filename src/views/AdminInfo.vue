<template>
  <div>
    <el-card class="box-card" style="width: 400px;">
      <div slot="header" class="clearfix">
        <span>{{ admin.name }}</span>
      </div>
      <div>
        <div>
          <div style="display: flex;justify-content: center;">
            <img title="点击修改用户头像" :src="admin.userFace" style="height: 100px;width: 100px;border-radius: 50px;" alt="">
          </div>
          <div>电话号码：
            <el-tag>{{ admin.telephone }}</el-tag>
          </div>
          <div>手机号码：
            <el-tag>{{ admin.phone }}</el-tag>
          </div>
          <div>居住地址：
            <el-tag>{{ admin.address }}</el-tag>
          </div>
          <div>用户标签：
            <el-tag type="success" v-for="(r,index) in admin.roles" :key="index">{{ r.nameZh }}</el-tag>
          </div>
        </div>
        <div style="display: flex;justify-content: space-around;margin-top: 10px;">
          <el-button type="primary" size="mini">修改信息</el-button>
          <el-button type="danger" size="mini">修改密码</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  name: "AdminInfo",
  data() {
    return {
      admin: null
    }
  },
  mounted() {
    this.initAdmin()
  },
  methods: {
    initAdmin() {
      this.getRequest('/admin/info').then(resp => {
        if (resp) {
          this.admin = resp
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
