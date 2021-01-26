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
          <!-- 1-3 @click="showUpdateAdminInfoView" -->
          <el-button type="primary" size="mini" @click="showUpdateAdminInfoView">修改信息</el-button>
          <el-button type="danger" size="mini">修改密码</el-button>
        </div>
      </div>
    </el-card>
    <!-- 1-1 编辑用户信息 -->
    <el-dialog
        title="编辑用户信息"
        :visible.sync="dialogVisible"
        width="30%">
      <div>
        <table>
          <tr>
            <td>用户昵称：</td>
            <td>
              <!-- 1-5 重新给每项赋值 admin2 -->
              <el-input v-model="admin2.name"></el-input>
            </td>
          </tr>
          <tr>
            <td>电话号码：</td>
            <td>
              <el-input v-model="admin2.telephone"></el-input>
            </td>
          </tr>
          <tr>
            <td>手机号码：</td>
            <td>
              <el-input v-model="admin2.phone"></el-input>
            </td>
          </tr>
          <tr>
            <td>用户地址：</td>
            <td>
              <el-input v-model="admin2.address"></el-input>
            </td>
          </tr>
        </table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <!-- 1-8 @click="updateAdminInfo" -->
        <el-button type="primary" @click="updateAdminInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "AdminInfo",
  data() {
    return {
      admin: null,
      admin2: null, // 1-5 编辑的对象
      dialogVisible: false // 1-2 编辑用户信息
    }
  },
  mounted() {
    this.initAdmin()
  },
  methods: {
    // 1-9 更新用户
    updateAdminInfo() {
      this.putRequest('/admin/info', this.admin2).then(resp => {
        if (resp) {
          this.dialogVisible = false
          this.initAdmin()
        }
      })
    },
    // 1-4 编辑用户信息弹框
    showUpdateAdminInfoView() {
      this.dialogVisible = true
    },
    initAdmin() {
      this.getRequest('/admin/info').then(resp => {
        if (resp) {
          this.admin = resp
          this.admin2 = Object.assign({}, this.admin) // 1-6 对象拷贝给 admin2
          window.sessionStorage.setItem('user', JSON.stringify(resp))
          this.$store.commit('INIT_ADMIN', resp)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
