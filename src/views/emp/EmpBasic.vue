<template>
  <div>
    <div style="display: flex;justify-content: space-between;">
      <!-- 1、 -->
      <!-- 20、搜索 v-model="empName" <el-input @keydown.enter.native="initEmps" 回车键调用初始化会员方法
           21、@click="initEmps">搜索</el-button>
           22、清空 clearable @clear="initEmps" -->
      <div style="margin-top: 10px;">
        <el-input style="width: 300px;margin-right: 10px;"
                  prefix-icon="el-icon-search"
                  v-model="empName"
                  placeholder="通过员工名进行搜索..."
                  @keydown.enter.native="initEmps"
                  clearable
                  @clear="initEmps"
        ></el-input>
        <el-button type="primary" icon="el-icon-search" @click="initEmps">搜索</el-button>
        <el-button type="primary"><i class="fa fa-angle-double-down" aria-hidden="true"></i>高级搜索</el-button>
      </div>
      <div>
        <el-button type="success"><i class="fa fa-level-up" aria-hidden="true"></i>&nbsp;导入数据</el-button>
        <el-button type="success"><i class="fa fa-level-down" aria-hidden="true"></i>&nbsp; 导出数据</el-button>
        <!-- 23-3、 @click="showAddEmpView" -->
        <el-button type="primary" icon="el-icon-plus" @click="showAddEmpView">添加员工</el-button>
      </div>
    </div>
    <div style="margin-top: 10px;">
      <!-- 2、表格；6、添加 loading -->
      <el-table
          :data="emps"
          v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          style="width: 100%" stripe border>
        <el-table-column
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column
            prop="name"
            label="姓名"
            align="left"
            fixed
            width="90">
        </el-table-column>
        <el-table-column
            prop="gender"
            label="性别"
            align="left"
            width="40">
        </el-table-column>
        <el-table-column
            prop="workId"
            label="工号"
            align="left"
            width="85">
        </el-table-column>
        <el-table-column
            prop="birthday"
            label="出生日期"
            align="left"
            width="95">
        </el-table-column>
        <el-table-column
            prop="idCard"
            label="身份证号"
            width="150">
        </el-table-column>
        <el-table-column
            prop="wedlock"
            label="婚姻状态"
            align="center"
            width="70">
        </el-table-column>
        <el-table-column
            prop="nation.name"
            label="民族"
            align="left"
            width="50">
        </el-table-column>
        <el-table-column
            prop="nativePlace"
            label="籍贯"
            align="center"
            width="80">
        </el-table-column>
        <el-table-column
            prop="politicsStatus.name"
            label="政治面貌"
            width="100">
        </el-table-column>
        <el-table-column
            prop="email"
            label="电子邮件"
            align="left"
            width="150">
        </el-table-column>
        <el-table-column
            prop="phone"
            label="电话号码"
            align="left"
            width="100">
        </el-table-column>
        <el-table-column
            prop="address"
            label="联系地址"
            align="center"
            width="220">
        </el-table-column>
        <el-table-column
            prop="department.name"
            label="所属部门"
            align="left"
            width="100">
        </el-table-column>
        <el-table-column
            prop="position.name"
            label="职位"
            width="100">
        </el-table-column>
        <el-table-column
            prop="joblevel.name"
            label="级别"
            width="100">
        </el-table-column>
        <el-table-column
            prop="engageForm"
            label="聘用形式"
            align="left"
            width="100">
        </el-table-column>
        <el-table-column
            prop="tiptopDegree"
            label="最高学历"
            align="center"
            width="80">
        </el-table-column>
        <el-table-column
            prop="school"
            label="毕业学校"
            align="left"
            width="150">
        </el-table-column>
        <el-table-column
            prop="specialty"
            label="所属专业"
            align="left"
            width="150">
        </el-table-column>
        <el-table-column
            prop="workState"
            label="在职状态"
            align="center"
            width="70">
        </el-table-column>
        <el-table-column
            prop="beginDate"
            label="入职日期"
            align="left"
            width="95">
        </el-table-column>
        <el-table-column
            prop="conversionTime"
            label="转正日期"
            align="left"
            width="95">
        </el-table-column>
        <el-table-column
            prop="beginContract"
            label="合同起始日期"
            align="left"
            width="95">
        </el-table-column>
        <el-table-column
            prop="endContract"
            label="合同截止日期"
            align="left"
            width="95">
        </el-table-column>
        <el-table-column
            label="合同期限"
            align="left"
            width="100">
          <template slot-scope="scope">
            <el-tag>{{ scope.row.contractTerm }}</el-tag>
            年
          </template>
        </el-table-column>
        <el-table-column
            label="操作"
            fixed="right"
            width="300">
          <template slot-scope="scope">
            <el-button style="padding: 3px;" size="mini">编辑</el-button>
            <el-button style="padding: 3px;" size="mini" type="primary" plain>查看高级资料</el-button>
            <el-button style="padding: 3px;" size="mini" type="danger">删除</el-button>
          </template>
        </el-table-column>


      </el-table>
      <!-- 10、分页 -->
      <div style="display: flex;justify-content: flex-end;margin-top: 10px;">
        <!-- 13、@current-change="currentChange" 当前页
             14、@size-change="sizeChange" 每页显示多少条 -->
        <el-pagination
            prev-text="上一页"
            next-text="下一页"
            @current-change="currentChange"
            @size-change="sizeChange"
            :page-sizes="[10,20,30,50,100]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total" background>
        </el-pagination>
      </div>
    </div>
    <!-- 23-1、开始- 添加员工弹框 -->
    <el-dialog
        title="添加员工"
        :visible.sync="dialogVisible"
        width="80%">
      <div>
        <!-- 23-6、<el-row  <el-form -->
        <el-form ref="empRef" :model="emp">
          <el-row>
            <el-col :span="6">
              <el-form-item label="姓名：" prop="name">
                <el-input v-model="emp.name" prefix-icon="el-icon-edit" placeholder="请输入员工姓名" size="mini"
                          style="width: 150px;"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="性别：" prop="gender">
                <el-radio-group v-model="emp.gender" style="margin-top: 8px;">
                  <el-radio label="男">男</el-radio>
                  <el-radio label="女">女</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="出生日期：" prop="birthday">
                <el-date-picker
                    v-model="emp.birthday"
                    type="date"
                    value-format="yyyy-MM-dd"
                    size="mini"
                    style="width: 150px;"
                    placeholder="出生日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="政治面貌：" prop="politicId">
                <el-select v-model="emp.politicId" placeholder="请选择政治面貌" size="mini" style="width: 200px;">
                  <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="民族：" prop="nationId">
                <el-select v-model="emp.nationId" placeholder="民族" size="mini" style="width: 150px;">
                  <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="籍贯：" prop="nativePlace">
                <el-input v-model="emp.nativePlace" placeholder="籍贯" prefix-icon="el-icon-edit" size="small"
                          style="width: 120px;"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="电子邮箱：" prop="email">
                <el-input v-model="emp.email" placeholder="请输入电子邮箱" prefix-icon="el-icon-message" size="mini"
                          style="width: 150px;"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="联系地址：" prop="address">
                <el-input v-model="emp.address" placeholder="请输入联系地址" prefix-icon="el-icon-edit" size="mini"
                          style="width: 200px;"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="职位：" prop="posId">
                <el-select v-model="emp.posId" placeholder="职位" size="mini" style="width: 150px;">
                  <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="职称：" prop="jobLevelId">
                <el-select v-model="emp.jobLevelId" placeholder="职称" size="mini" style="width: 150px;">
                  <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="所属部门：" prop="departmentId">
                <el-input v-model="emp.departmentId" placeholder="请输入部门" size="mini" style="width: 150px;"
                          prefix-icon="el-icon-edit"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="电话号码：" prop="phone">
                <el-input v-model="emp.phone" placeholder="请输入电话号码" size="mini" style="width: 200px;"
                          prefix-icon="el-icon-phone"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="工号：" prop="workId">
                <el-input v-model="emp.workId" placeholder="请输入工号" size="mini" style="width: 150px;"
                          prefix-icon="el-icon-edit"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="学历：" prop="tiptopDegree">
                <el-select v-model="emp.tiptopDegree" placeholder="职称" size="mini" style="width: 150px;">
                  <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="毕业院校：" prop="school">
                <el-input v-model="emp.school" placeholder="请输入学校" size="mini" style="width: 150px;" prefix-icon="el-icon-edit"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="专业名称：" prop="specialty">
                <el-input v-model="emp.specialty" placeholder="请输入专业名称" size="mini" style="width: 200px;" prefix-icon="el-icon-edit"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="入职日期：" prop="beginDate">
                <el-date-picker
                    v-model="emp.beginDate"
                    type="date"
                    value-format="yyyy-MM-dd"
                    size="mini"
                    style="width: 120px;"
                    placeholder="入职日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="转正日期：" prop="conversionTime">
                <el-date-picker
                    v-model="emp.conversionTime"
                    type="date"
                    value-format="yyyy-MM-dd"
                    size="mini"
                    style="width: 120px;"
                    placeholder="转正日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="合同起始日期：" prop="beginContract">
                <el-date-picker
                    v-model="emp.beginContract"
                    type="date"
                    value-format="yyyy-MM-dd"
                    size="mini"
                    style="width: 135px;"
                    placeholder="合同起始日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="合同截止日期：" prop="endContract">
                <el-date-picker
                    v-model="emp.endContract"
                    type="date"
                    value-format="yyyy-MM-dd"
                    size="mini"
                    style="width: 170px;"
                    placeholder="合同截止日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="身份证号码：" prop="idCard">
                <el-input v-model="emp.idCard" placeholder="请输入身份证号码"
                          size="mini" prefix-icon="el-icon-edit" style="width: 180px;"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="聘用形式：" prop="engageForm">
                <el-radio-group v-model="emp.engageForm" style="margin-top: 8px;">
                  <el-radio label="劳动合同">劳动合同</el-radio>
                  <el-radio label="劳务合同">劳务合同</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="婚姻状况：" prop="wedlock">
                <el-radio-group v-model="emp.wedlock" style="margin-top: 8px;">
                  <el-radio label="未婚">未婚</el-radio>
                  <el-radio label="已婚">已婚</el-radio>
                  <el-radio label="离异">离异</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "EmpBasic",
  data() {
    return {
      emps: [], // 3、获取所有员工（分页）
      loading: false, // 7、添加 loading
      total: 0, // 11 分页总条数
      currentPage: 1, // 14、默认显示第1页(currentPage 后端字段）
      size: 10, // 15、默认每页显示 10 条
      empName: '', // 18、搜索
      dialogVisible: true, // 23-2、添加员工弹框
      // 23-5、添加员工
      emp: {
        name: '',
        gender: '',
        birthday: '',
        idCard: '',
        wedlock: '',
        nationId: null,
        nativePlace: '',
        politicId: null,
        email: '',
        phone: '',
        address: '',
        departmentId: null,
        jobLevelId: null,
        posId: null,
        engageForm: '',
        tiptopDegree: '',
        specialty: '',
        school: '',
        beginDate: '',
        workState: '',
        workId: '',
        contractTerm: null,
        conversionTime: '',
        notworkDate: null,
        beginContract: '',
        endContract: '',
        workAge: null,
        salaryId: null
      },
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: ''
    }
  },
  mounted() {
    this.initEmps() // 5、获取所有员工（分页）
  },
  methods: {
    // 23-4、添加员点击事件
    showAddEmpView() {
      this.dialogVisible = true
    },
    // 15、分页 每页显示多少条 默认会把 size 传进来
    sizeChange(size) {
      this.size = size
      this.initEmps()
    },
    // 13、分页-当前页-currentPage 点击的时候自己会带过来
    currentChange(currentPage) {
      this.currentPage = currentPage // 16
      this.initEmps() // 18、调用方法

    },
    // 4、获取所有员工（分页）
    initEmps() {
      this.loading = true // 8、添加 loading
      // 17、添加分页参数 ?currentPage='+this.currentPage+'&size='+this.size
      // 19、添加用户名搜索参数 +'&name='+this.empName,传参 根据条件搜索，不传参查询所有
      this.getRequest('/employee/basic/?currentPage=' + this.currentPage + '&size=' + this.size + '&name=' + this.empName).then(resp => {
        // this.getRequest('/employee/basic/').then(resp => {
        this.loading = false // 9、关闭 loading
        if (resp) {
          this.emps = resp.data
          this.total = resp.total // 12、分页
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
