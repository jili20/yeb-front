<template>
  <div>
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="部门管理" name="DepMana"><DepMana/></el-tab-pane>
      <el-tab-pane label="职位管理" name="PosMana"><PosMana/></el-tab-pane>
      <el-tab-pane label="职称管理" name="JobLevelMana"><JobLevelMana/></el-tab-pane>
      <el-tab-pane label="奖惩规则" name="EcMana"><EcMana/></el-tab-pane>
      <el-tab-pane label="权限组" name="PositionMana"><PositionMana/></el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import DepMana from "@/components/sys/basic/DepMana";  // 部门管理
import EcMana from "@/components/sys/basic/EcMana"; // 奖惩规则
import JobLevelMana from "@/components/sys/basic/JobLevelMana"; // 职称管理
import PositionMana from "@/components/sys/basic/PositionMana"; // 权限组
import PosMana from "@/components/sys/basic/PosMana"; // 职位管理

export default {
  name: "SysBasic",
  components:{
    JobLevelMana,
    DepMana,
    EcMana,
    PositionMana,
    PosMana
  },
  data() {
    return {
      activeName: 'PositionMana' // 激活项
    }
  },
  methods: {}
}
</script>

<style scoped>

</style>
