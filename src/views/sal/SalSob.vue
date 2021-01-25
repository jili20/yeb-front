<template>
  <div>
    <!-- 1-1 绘制表格 -->
    <div style="display: flex;justify-content: space-between;">
      <!-- 2-3 @click="showAddSalaryView" 点击打开 添加工资账套对话框 -->
      <el-button type="primary" icon="el-icon-plus" size="mini" @click="showAddSalaryView">添加工资账套</el-button>
      <!-- 5-3 刷新功能 直接绑定点击事件 调用获取所有数据方法 -->
      <el-button type="success" icon="el-icon-refresh" size="mini" @click="initSalaries"></el-button>
    </div>
    <div style="margin-top: 10px;">
      <el-table
          :data="salaries"
          stripe
          border>
        <!-- 多选框 type="selection" -->
        <el-table-column
            type="selection"
            width="40">
        </el-table-column>
        <el-table-column
            prop="name"
            label="账套名称"
            width="120">
        </el-table-column>
        <el-table-column
            prop="basicSalary"
            label="基本工资"
            width="70">
        </el-table-column>
        <el-table-column
            prop="trafficSalary"
            label="交通补助"
            width="70">
        </el-table-column>
        <el-table-column
            prop="lunchSalary"
            label="午餐补助"
            width="70">
        </el-table-column>
        <el-table-column
            prop="bonus"
            label="奖金"
            width="70">
        </el-table-column>
        <el-table-column
            prop="createDate"
            label="启用时间"
            width="100">
        </el-table-column>
        <!-- 多级表头：el-table-column 里面嵌套 el-table-column，就可以实现多级表头  -->
        <el-table-column
            label="养老金"
            align="center">
          <el-table-column
              prop="pensionPer"
              label="比率"
              width="70">
          </el-table-column>
          <el-table-column
              prop="pensionBase"
              label="基数"
              width="70">
          </el-table-column>
        </el-table-column>
        <!-- 多级表头 -->
        <el-table-column
            label="医疗保险"
            align="center">
          <el-table-column
              prop="medicalPer"
              label="比率"
              width="70">
          </el-table-column>
          <el-table-column
              prop="medicalBase"
              label="基数"
              width="70">
          </el-table-column>
        </el-table-column>
        <!-- 多级表头 -->
        <el-table-column
            label="公积金"
            align="center">
          <el-table-column
              prop="accumulationFundPer"
              label="比率"
              width="70">
          </el-table-column>
          <el-table-column
              prop="accumulationFundBase"
              label="基数"
              width="70">
          </el-table-column>
        </el-table-column>
        <el-table-column
            label="操作">
          <!-- 5-1 删除工资账套 拿到当前行数据 绑定点击事件 传行数据-->
          <template slot-scope="scope">
            <el-button type="primary" size="mini">编辑</el-button>
            <el-button type="danger" size="mini" @click="deleteSalary(scope.row)">删除</el-button>
          </template>
        </el-table-column>

      </el-table>
    </div>
    <!-- 2-1 添加工资账套对话框 -->
    <el-dialog
        title="添加工资账套"
        :visible.sync="dialogVisible"
        width="50%">
      <!-- 3-8 调整样式 -->
      <div style="display: flex;justify-content: space-around;align-items: center;">
        <!-- 3-1 添加步骤条 -->
        <!-- 3-5  :active="activeItemIndex" -->
        <el-steps direction="vertical" :active="activeItemIndex">
          <!-- 3-3 循环遍历数据 -->
          <el-step :title="itemName" v-for="(itemName,index) in salaryItemName" :key="index"></el-step>
        </el-steps>
        <!-- 3-4 循环遍历数据 -->
        <!-- 3-7 v-show="activeItemIndex = index" 与下标相等才展示 -->
        <!-- 4-2 修改各项的值 绑定和遍历-->
        <el-input v-model="salary[title]" :placeholder="'请输入'+salaryItemName[index]+'...'"
                  v-for="(value,title,index) in salary"
                  :key="index" v-show="activeItemIndex === index" style="width: 200px;"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <!-- 3-10 按钮判断根据索引显示 文字提示 -->
        <el-button @click="preStep">{{ activeItemIndex === 10 ? '取消' : '上一步' }}</el-button>
        <el-button type="primary" @click="nextStep">{{ activeItemIndex === 10 ? '完成' : '下一步' }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "SalSob",
  data() {
    return {
      dialogVisible: false, // 2-2 添加工资账套对话框
      salaries: [], // 1-2 定义数组
      activeItemIndex: 0, // 3-6 步骤条激活索引
      salaryItemName: [ // 3-2 步骤条数据对象
        '账套名称',
        '基本工资',
        '交通补助',
        '午餐补助',
        '奖金',
        '养老金比率',
        '养老金基数',
        '医疗保险比率',
        '医疗保险基数',
        '公积金比率',
        '公积金基数'
      ],
      // 4-1 定义工资账套数据
      salary: {
        name: '',
        basicSalary: 0,
        trafficSalary: 0,
        lunchSalary: 0,
        bonus: 0,
        pensionPer: 0.0,
        pensionBase: 0,
        medicalPer: 0.0,
        medicalBase: 0,
        accumulationFundPer: 0.0,
        accumulationFundBase: 0
      }
    }
  },
  mounted() {
    this.initSalaries()
  },
  methods: {
    // 5-2 删除工资账套
    deleteSalary(data) {
      this.$confirm('此操作将永久删除该[' + data.name + ']工资账套, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteRequest('/salary/sob/'+ data.id).then(resp=>{
          if (resp) {
            this.initSalaries()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    preStep() { // 3-13 上一步 取消
      if (this.activeItemIndex === 0) {
        return
      } else if (this.activeItemIndex === 10) {
        this.dialogVisible = false;
        return;
      }
      this.activeItemIndex--
    },
    nextStep() { // 3-12 下一步 完成
      if (this.activeItemIndex === 10) {
        // alert("ok")
        // console.log(this.salary)
        // 4-4 添加工资账套
        this.postRequest('/salary/sob/', this.salary).then(resp => {
          if (resp) {
            this.initSalaries()
            this.dialogVisible = false
          }
        })
        return
      }
      this.activeItemIndex++
    },
    // 2-4 点击打开添加工资账套对话框
    showAddSalaryView() {
      this.salary = { // 4-3 清空表单
        name: '',
        basicSalary: 0,
        trafficSalary: 0,
        lunchSalary: 0,
        bonus: 0,
        pensionPer: 0.0,
        pensionBase: 0,
        medicalPer: 0.0,
        medicalBase: 0,
        accumulationFundPer: 0.0,
        accumulationFundBase: 0
      }
      this.activeItemIndex = 0 // 3-14 步骤条索引从0开始
      this.dialogVisible = true;
    },
    // 1-3 初始化数据
    initSalaries() {
      this.getRequest('/salary/sob/').then(resp => {
        if (resp) {
          this.salaries = resp
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
