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
        <!-- 26-1、导出数据 @click="exportData" -->
        <el-button type="success" @click="exportData"><i class="fa fa-level-down" aria-hidden="true"></i>&nbsp; 导出数据
        </el-button>
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
            <!-- 25-4 给编辑按钮绑定点击事件 @click="showEmpView(scope.row)" -->
            <el-button style="padding: 3px;" size="mini" @click="showEmpView(scope.row)">编辑</el-button>
            <el-button style="padding: 3px;" size="mini" type="primary" plain>查看高级资料</el-button>
            <!-- 24-1 删除员工 @click="deleteEmp(scope.row)" -->
            <el-button style="padding: 3px;" size="mini" type="danger" @click="deleteEmp(scope.row)">删除</el-button>
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
    <!-- 25-1 编辑员工 将添加员工弹框标题改为变量 根据条件显示是添加还是编辑 :title="title"  -->
    <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        width="80%">
      <div>
        <!-- 23-6、<el-row  <el-form -->
        <!-- 23-28 数据校验对象 :rules="empRules" ，每项属性对应 prop="posId" -->
        <el-form ref="empRef" :model="emp" :rules="empRules">
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
              <!-- 23-10、 添加员工 给每项赋值 -->
              <el-form-item label="政治面貌：" prop="politicId">
                <el-select v-model="emp.politicId" placeholder="请选择政治面貌" size="mini" style="width: 200px;">
                  <el-option
                      v-for="item in politicsstatus"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
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
                      v-for="item in nations"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
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
                      v-for="item in positions"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="职称：" prop="jobLevelId">
                <el-select v-model="emp.jobLevelId" placeholder="职称" size="mini" style="width: 150px;">
                  <el-option
                      v-for="item in joblevels"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <!-- 23-15  -->
              <el-form-item label="所属部门：" prop="departmentId">
                <!-- 23-17 manual 手动弹出框 -->
                <el-popover
                    placement="bottom"
                    title="请选择部门"
                    width="200"
                    trigger="manual"
                    v-model="visible">
                  <!-- 23-20 添加树形控件 default-expand-all	是否默认展开所有节点 ，节点点击事件 @node-click="handleNodeClick" -->
                  <el-tree :data="allDeps"
                           :props="defaultProps"
                           default-expand-all
                           @node-click="handleNodeClick"></el-tree>
                  <!-- node-click	节点被点击时的回调 共三个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身。 -->
                  <!-- 自定义点击事件 -->
                  <div slot="reference"
                       style="width:150px;display: inline-flex;
                       border-radius: 5px;border: 1px solid #dedede;height: 28px;cursor: pointer;align-items: center;
                       font-size: 12px;padding-left: 8px;box-sizing: border-box;"
                       @click="showDepView">{{ inputDepName }}
                  </div><!-- 23-25 回显数据 {{inputDepName}} -->
                </el-popover>
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
                          prefix-icon="el-icon-edit" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <!-- 23-14 数据在 data 中写死的 -->
              <el-form-item label="学历：" prop="tiptopDegree">
                <el-select v-model="emp.tiptopDegree" placeholder="职称" size="mini" style="width: 150px;">
                  <el-option
                      v-for="item in tiptopDegrees"
                      :key="item"
                      :label="item"
                      :value="item">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="毕业院校：" prop="school">
                <el-input v-model="emp.school" placeholder="请输入学校" size="mini" style="width: 150px;"
                          prefix-icon="el-icon-edit"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="专业名称：" prop="specialty">
                <el-input v-model="emp.specialty" placeholder="请输入专业名称" size="mini" style="width: 200px;"
                          prefix-icon="el-icon-edit"></el-input>
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
        <!-- 23-26 @click="doAddEmp"-->
        <el-button type="primary" @click="doAddEmp">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "EmpBasic",
  data() {
    return {
      title: '', // 25-2 添加编辑员工弹框动态标题
      emps: [], // 3、获取所有员工（分页）
      loading: false, // 7、添加 loading
      total: 0, // 11 分页总条数
      currentPage: 1, // 14、默认显示第1页(currentPage 后端字段）
      size: 10, // 15、默认每页显示 10 条
      empName: '', // 18、搜索
      dialogVisible: false, // 23-2、添加员工弹框
      nations: [],   // 23-7 添加员工 民族
      joblevels: [], // 23-7 职称
      politicsstatus: [], // 23-7 政治面貌
      positions: [],  // 23-7 职位
      department: [], // 部门
      // 23-13、学历
      tiptopDegrees: ['博士', '硕士', '本科', '大专', '高中', '初中', '小学', '其它'],
      // 23-5、添加员工
      emp: {
        id: null,
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
        workState: '在职',
        workId: '',
        contractTerm: null,
        conversionTime: '',
        notworkDate: null,
        beginContract: '',
        endContract: '',
        workAge: null,
        salaryId: null
      },
      visible: false, // 23-18 弹出框
      // 23-21 树形控件
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      allDeps: [], // 23-21 树形控件 绑定 所属部门 数据对象
      inputDepName: '',// 23-23 回显部门数据
      // 23-30 表单数据校验

      empRules: {
        name: [{required: true, message: '请输入员工名', trigger: 'blur'}],
        gender: [{required: true, message: '请输入员工性别', trigger: 'blur'}],
        birthday: [{required: true, message: '请输入出生日期', trigger: 'blur'}],
        idCard: [{required: true, message: '请输入身份证号码', trigger: 'blur'},
          {
            pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
            message: '身份证号码不正确', trigger: 'blur'
          }],
        wedlock: [{required: true, message: '请输入婚姻状况', trigger: 'blur'}],
        nationId: [{required: true, message: '请输入民族', trigger: 'blur'}],
        nativePlace: [{required: true, message: '请输入籍贯', trigger: 'blur'}],
        politicId: [{required: true, message: '请输入政治面貌', trigger: 'blur'}],
        email: [{required: true, message: '请输入邮箱地址', trigger: 'blur'},
          {type: 'email', message: '邮箱地址格式不正确', trigger: 'blur'}],
        phone: [{required: true, message: '请输入电话号码', trigger: 'blur'},
          {
            pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,
            message: '请输入合法手机号码', trigger: 'blur'
          }],

        address: [{required: true, message: '请输入地址', trigger: 'blur'}],
        departmentId: [{required: true, message: '请输入部门名称', trigger: 'blur'}],
        jobLevelId: [{required: true, message: '请输入职称', trigger: 'blur'}],
        posId: [{required: true, message: '请输入职位', trigger: 'blur'}],
        engageForm: [{required: true, message: '请输入聘用形式', trigger: 'blur'}],
        tiptopDegree: [{required: true, message: '请输入学历', trigger: 'blur'}],
        specialty: [{required: true, message: '请输入专业', trigger: 'blur'}],
        school: [{required: true, message: '请输入毕业院校', trigger: 'blur'}],
        beginDate: [{required: true, message: '请输入入职日期', trigger: 'blur'}],
        workState: [{required: true, message: '请输入工作状态', trigger: 'blur'}],
        workId: [{required: true, message: '请输入工号', trigger: 'blur'}],
        contractTerm: [{required: true, message: '请输入合同期限', trigger: 'blur'}],
        conversionTime: [{required: true, message: '请输入转正日期', trigger: 'blur'}],
        notworkDate: [{required: true, message: '请输入离职日期', trigger: 'blur'}],
        beginContract: [{required: true, message: '请输入合同起始日期', trigger: 'blur'}],
        endContract: [{required: true, message: '请输入合同结束日期', trigger: 'blur'}],
        workAge: [{required: true, message: '请输入工龄', trigger: 'blur'}]

      }

    }
  },
  mounted() {
    this.initEmps() // 5、获取所有员工（分页）
    this.initData() // 23-9 添加员工
  },
  methods: {
    // 26-2 下载请求
    exportData() {
      this.downloadRequest('/employee/basic/export')
    },
    // 25-5 编辑员工按钮 点击事件
    showEmpView(data) {
      this.title = '编辑员工信息'
      this.emp = data // 回显数据
      this.inputDepName = data.department.name // 25-7 回显部门信息
      this.initPositions() // 25-9 初始化职位信息
      this.dialogVisible = true
    },
    // 24-2 删除员工
    deleteEmp(data) {
      this.$confirm('此操作将永久删除该员工' + data.name + ', 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteRequest('/employee/basic/' + data.id).then(resp => {
          if (resp) {
            this.initEmps()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 23-27 确定添加员工
    // 25-10 添加或编辑员工 有id编辑员工 没有id添加员工
    // 添加和编辑这里就请求方式不一样 putRequest postRequest ，其它的都一样
    doAddEmp() {
      if (this.emp.id) {
        // 有 id 编辑员工
        this.$refs['empRef'].validate(valid => {
          if (valid) {
            this.putRequest('/employee/basic/', this.emp).then(resp => {
              if (resp) {
                this.dialogVisible = false
                this.initEmps()
              }
            })
          }
        })
      } else {
        // 没有id 添加员工
        // empRef 表单中定义的引用对象 ref="empRef"
        this.$refs['empRef'].validate(valid => {
          if (valid) {
            this.postRequest('/employee/basic/', this.emp).then(resp => {
              if (resp) {
                this.dialogVisible = false
                this.initEmps()
              }
            })
          }
        })
      }
    },
    // 23-22、24 树控件节点点击事件
    handleNodeClick(data) {
      this.inputDepName = data.name
      this.emp.departmentId = data.id
      this.visible = !this.visible // 关闭弹框
    },
    // 23-16 添加员工 所属部门
    showDepView() {
      this.visible = !this.visible // 23-19 弹出框

    },
    // 23-13 添加员工 获取最大号
    getMaxWorkID() {
      this.getRequest('/employee/basic/maxWorkID').then(resp => {
        if (resp) {
          this.emp.workId = resp.obj
        }
      })
    },
    // 23-11、 添加员工 获取职位 有可能变动 打开对话框的时候调用此方法
    initPositions() {
      this.getRequest('/employee/basic/Positions').then(resp => {
        if (resp) {
          this.positions = resp
        }
      })
    },
    // 23-8、添加员工 不怎么变动的数据。放 sessionStorage ，就不用怎么去查
    initData() {
      // 获取民族数据:先从 sessionStorage 里取，取不到再调用接口获取数据
      if (!window.sessionStorage.getItem("nations")) {
        this.getRequest('/employee/basic/nations').then(resp => {
          this.nations = resp
          // 存到 sessionStorage 里,把对象转字符串
          window.sessionStorage.setItem('nations', JSON.stringify(resp))
        })
      } else {
        // 从 sessionStorage 获取，字符串转对象
        this.nations = JSON.parse(window.sessionStorage.getItem('nations'))
      }
      // 获取职称
      if (!window.sessionStorage.getItem('joblevels')) {
        this.getRequest('/employee/basic/joblevels').then(resp => {
          if (resp) {
            this.joblevels = resp
            window.sessionStorage.setItem('joblevels', JSON.stringify(resp))
          }
        })
      } else {
        // 从 sessionStorage 获取，字符串转对象
        this.joblevels = JSON.parse(window.sessionStorage.getItem('joblevels'))
      }
      // 获取政治面貌
      if (!window.sessionStorage.getItem('politicsstatus')) {
        this.getRequest('/employee/basic/politicsStatus').then(resp => {
          if (resp) {
            this.politicsstatus = resp
            window.sessionStorage.setItem('politicsstatus', JSON.stringify(resp))
          }
        })
      } else {
        // 从 sessionStorage 获取，字符串转对象
        this.politicsstatus = JSON.parse(window.sessionStorage.getItem('politicsstatus'))
      }
      // 23-22 树形控件 绑定 所属部门 数据对象
      if (!window.sessionStorage.getItem('allDeps')) {
        this.getRequest('/employee/basic/deps').then(resp => {
          if (resp) {
            this.allDeps = resp
            window.sessionStorage.setItem('allDeps', JSON.parse(resp))
          }
        })
      } else {
        this.allDeps = window.sessionStorage.getItem('allDeps')
      }
    },
    // 23-4、添加员点击事件
    showAddEmpView() {
      // 25-6 清空表单
      this.emp = {
        id: null,
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
        workState: '在职',
        workId: '',
        contractTerm: null,
        conversionTime: '',
        notworkDate: null,
        beginContract: '',
        endContract: '',
        workAge: null,
        salaryId: null
      }
      this.inputDepName = '' // 25-8 清空部门信息
      this.title = '添加员工' // 25-3 点击添加员工按钮时，弹出框标题为 添加员工
      this.getMaxWorkID() // 23-14 获取最大工号
      this.initPositions() // 23-12 获取职位
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
