<template>
  <div style="width: 500px">
    <!-- 1 -->
    <el-input
        placeholder="请输入部门名称进行搜索..."
        prefix-icon="el-icon-search"
        v-model="filterText">
    </el-input>
    <!-- 9、:expand-on-click-node="false" 点击小三角箭头才会展开
            :default-expand-all="false"	设置默认不展开所有节点 -->
    <el-tree
        :data="deps"
        :props="defaultProps"
        default-expand-all
        :filter-node-method="filterNode"
        :expand-on-click-node="false"
        ref="tree">
      <!-- 7、label: 'name' -->
      <!-- 8、style="display: flex;justify-content: space-between;width: 100% 父容器宽度" 让添加和删除按键居右 -->
      <span class="custom-tree-node" slot-scope="{ node, data }"
            style="display: flex;justify-content: space-between;width: 100%">
        <span>{{ data.name }}</span>
        <span>
          <el-button
              plain
              type="primary"
              size="mini"
              class="depBtn"
              @click="() => showAddDep(data)">
            添加部门
          </el-button>
          <!-- 10、showAddDep(data)  deleteDep(data)  data 后端传过来的完整的 json 对象 -->
          <el-button
              plain
              type="danger"
              size="mini"
              class="depBtn"
              @click="() => deleteDep(data)">
            删除部门
          </el-button>
        </span>
      </span>
    </el-tree>
    <!-- 13、对话弹框 -->
    <el-dialog
        title="添加部门"
        :visible.sync="dialogVisible"
        width="30%">
      <!-- 16 -->
      <div>
        <table>
          <tr>
            <td>
              <el-tag>上级部门</el-tag>
            </td>
            <td>{{ pname }}</td>
          </tr>
          <tr>
            <td>
              <el-tag>部门名称</el-tag>
            </td>
            <td>
              <el-input v-model="dep.name" placeholder="请输入部门名称..." size="small"></el-input>
            </td>
          </tr>
        </table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <!-- 18、确定添加按钮绑定事件 @click="doAddDep" -->
        <el-button type="primary" @click="doAddDep">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "DepMana",
  data() {
    return { // 2
      filterText: '',
      deps: [], // 所有部门整个数组
      defaultProps: { // 2 关联子部门
        children: 'children',
        label: 'name'
      },
      dialogVisible: false, // 14
      dep: { // 15、添加部门数据象
        name: '',
        parentId: -1,
        isParent: ''
      },
      pname: '' // 15、上级部门名称
    }
  },
  watch: {
    // 4、观察者事件，监控输入框的值(框架方法）
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  mounted() {
    this.initDeps()  // 6、调用获取所有部门方法
  },
  methods: {
    // 删除部门调用的方法
    removeDepFromDeps(p, deps, id) {
      for (let i = 0; i < deps.length; i++) {
        let d = deps[i]
        if (d.id === id) {
          deps.splice(i, 1)
          if (deps.length === 0) {
            p.isParent = false
          }
          return;
        } else {
          this.removeDepFromDeps(d, d.children, id)
        }

      }

    },
    // 12、删除部门
    deleteDep(data) {
      // console.log(data)
      if (data.isParent) {
        this.$message.error('父部门删除失败！')
      } else {
        this.$confirm('此操作将永久删除该[' + data.name + ']部门, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteRequest('/system/basic/department/' + data.id).then(resp => {
            if (resp) {
              this.removeDepFromDeps(null, this.deps, data.id)
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    },
    // 20、添加完部门 初始化 清空数据
    initDep() {
      this.dep = {
        name: '',
        parentId: -1
      }
      this.pname = ''
    },
    // 22、 递归查询所有部门信息，deps 查询到的整个数组，dep 添加的部门
    addDep2Deps(deps, dep) {
      for (let i = 0; i < deps.length; i++) {
        let d = deps[i] // 父部门
        if (d.id === dep.parentId) {
          d.children = d.children.concat(dep) // 把 dep 加为 d 的子部门
          if (d.children.length > 0) {
            d.isParent = true
          }
          return;
        } else {
          this.addDep2Deps(d.children, dep) // 递归调用此方法 以查询结果为条件 继续查询子部门
        }
      }
    },
    // 19、确认添加部门
    doAddDep() {
      this.postRequest('/system/basic/department/', this.dep).then(resp => {
        if (resp) {
          // console.log(resp)
          this.dialogVisible = false // 关闭对话框
          this.addDep2Deps(this.deps, resp.data) // 23、【无效】手动插入部门 显示添加后的数据
          this.initDep() // 21、调用初始化方法 清空数据
        }
      })
    },
    // 11、17、添加部门弹框
    showAddDep(data) {
      // console.log(data)
      this.dep.parentId = data.id
      this.pname = data.name
      this.dialogVisible = true
    },

    // 5、获取所有部门
    initDeps() {
      this.getRequest('/system/basic/department/').then(resp => {
        if (resp) {
          this.deps = resp
        }
      })
    },
    // 3、事件(框架方法）
    filterNode(value, data) { // data 整行数据
      if (!value) return true; // true 节点可以展示，false 节点隐藏
      return data.name.indexOf(value) !== -1; // label: 'name'
    }
  }
}
</script>

<style scoped>
/* 8 */
.depBtn {
  padding: 2px;
}

</style>
