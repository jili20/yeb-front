<template>
  <div>
    <el-table
        size="mini"
        :data="emps"
        stripe
        border>
      <el-table-column
          align="left"
          type="selection"
          width="55">
      </el-table-column>
      <el-table-column
          prop="name"
          label="姓名"
          align="left"
          fixed
          width="120">
      </el-table-column>
      <el-table-column
          prop="workId"
          label="工号"
          align="left"
          width="120">
      </el-table-column>
      <el-table-column
          prop="email"
          label="邮箱地址"
          align="left"
          width="200">
      </el-table-column>
      <el-table-column
          prop="phone"
          label="电话号码"
          align="left"
          width="120">
      </el-table-column>
      <el-table-column
          prop="department.name"
          label="所属部门"
          align="left"
          width="120">
      </el-table-column>
      <el-table-column
          label="工资账套"
          align="center">
        <template slot-scope="scope">
          <el-tooltip placement="right" v-if="scope.row.salary">
            <div slot="content">
              <table>
                <tr>
                  <td>基本工资</td>
                  <td>{{ scope.row.salary.basicSalary }}</td>
                </tr>
                <tr>
                  <td>交通补助</td>
                  <td>{{ scope.row.salary.trafficSalary }}</td>
                </tr>
                <tr>
                  <td>午餐补助</td>
                  <td>{{ scope.row.salary.lunchSalary }}</td>
                </tr>
                <tr>
                  <td>奖金</td>
                  <td>{{ scope.row.salary.bonus }}</td>
                </tr>
                <tr>
                  <td>养老金比率</td>
                  <td>{{ scope.row.salary.pensionPer }}</td>
                </tr>
                <tr>
                  <td>养老金基数</td>
                  <td>{{ scope.row.salary.pensionBase }}</td>
                </tr>
                <tr>
                  <td>医疗保险比率</td>
                  <td>{{ scope.row.salary.medicalPer }}</td>
                </tr>
                <tr>
                  <td>医疗保险基数</td>
                  <td>{{ scope.row.salary.medicalBase }}</td>
                </tr>
                <tr>
                  <td>公积金比率</td>
                  <td>{{ scope.row.salary.accumulationFundPer }}</td>
                </tr>
                <tr>
                  <td>公积金基数</td>
                  <td>{{ scope.row.salary.accumulationFundBase }}</td>
                </tr>
              </table>
            </div>
            <el-tag>{{ scope.row.salary.name }}</el-tag>
          </el-tooltip>
          <el-tag v-else>暂未设置</el-tag>
        </template>
      </el-table-column>
      <!-- 2-1 编辑工资账套 -->
      <el-table-column
          label="操作"
          align="center">
        <template slot-scope="scope">
          <!-- 2-5 当前员工的工资账套 @show="showPop(scope.row.salary)" show	显示时触发 -->
          <!-- 2-9 @hide="hidePop(scope.row)" hide	隐藏时触发 -->
          <el-popover
              size="mini"
              @show="showPop(scope.row.salary)"
              @hide="hidePop(scope.row)"
              placement="right"
              title="编辑工资账套"
              width="200"
              trigger="click">
            <div>
              <!-- 2-6  v-model="currentSalary" -->
              <el-select v-model="currentSalary" placeholder="请选择">
                <el-option
                    size="mini"
                    v-for="item in salaries"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                </el-option>
              </el-select>
            </div>
            <el-button slot="reference" type="danger">修改工资账套</el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <!-- 1-1 分页组件 -->
    <div style="display: flex;justify-content: flex-end;margin-top: 5px;">
      <el-pagination
          @size-change="sizeChange"
          @current-change="currentChange"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total" background>
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: "SalSobCfg",
  data() {
    return {
      emps: [],
      salaries: [], // 2-2 工资账套数组
      currentPage: 1, // 1-2 当前页
      size: 10, // 1-2 每页显示条数
      total: 0, // 1-2 分页
      currentSalary: null // 2-7 当前员工工资账套
    }
  },
  mounted() {
    this.initEmps()
    this.initSalaries() // 2-4 初始化 获取所有工资账套
  },
  methods: {
    // 2-10
    hidePop(data) { // 隐藏时触发
      // 当前员工工资账套存在 并且不等于当前的 才更新
      if (this.currentSalary && this.currentSalary!==data.salary.id) {
        this.putRequest('/salary/sobcfg/?eid=' + data.id + '&sid=' + this.currentSalary).then(resp => {
          if (resp) {
            this.initEmps()
          }
        });
      }
    },
    // 2-8 员工工资账套
    showPop(data) { // 显示时触发
      if (data) {
        this.currentSalary = data.id;
      } else {
        this.currentSalary = null
      }
    },
    // 2-3 获取所有工资账套
    initSalaries() {
      this.getRequest('/salary/sobcfg/salaries').then(resp => {
        if (resp) {
          this.salaries = resp
        }
      })
    },
    // 1-3 分页-当前页
    currentChange(page) {
      this.currentPage = page
      this.initEmps()
    },
    // 1-4 分页-每页显示数量
    sizeChange(size) {
      this.size = size
      this.initEmps()
    },
    // 获取所有数据
    initEmps() {
      this.getRequest('/salary/sobcfg/?currentPage=' + this.currentPage + '&size=' + this.size).then(resp => {
        if (resp) {
          this.emps = resp.data
          this.total = resp.total
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
