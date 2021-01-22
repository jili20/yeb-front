<template>
  <div>
    <div>
      <el-input
          size="small"
          class="addPosInput"
          placeholder="请选择日期"
          suffix-icon="el-icon-plus"
          @keydown.enter.native="addPosition"
          v-model="pos.name">
      </el-input>
      <el-button size="small" icon="el-icon-plus" type="primary" @click="addPosition">添加</el-button>
    </div>
    <div class="posManaMain">
      <el-table
          border
          stripe
          size="small"
          :data="positions"
          style="width: 70%"
          @selection-change="handleSelectionChange">
        <el-table-column
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column
            prop="id"
            label="编号"
            width="55">
        </el-table-column>
        <el-table-column
            prop="name"
            label="职位"
            width="120">
        </el-table-column>
        <el-table-column
            prop="createDate"
            label="创建时间"
            width="200">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
                size="mini"
                @click="showEditView(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- :disabled 不禁用条件为勾选中，没勾选中为禁用。 -->
    <el-button size="small" style="margin-top: 8px" type="danger"
               :disabled="this.multipleSelection.length===0" @click="deleteMany">批量删除
    </el-button>
    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%">
      <div>
        <el-tag>职位名称</el-tag>
        <el-input v-model="updatePos.name" size="small" class="updatePosInput"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="doUpdate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "PosMana",
  data() {
    return {
      pos: { // 查询添加职位数据
        name: ''
      },
      positions: [],
      dialogVisible: false,
      updatePos: { // 更新职位数据
        name: ''
      },
      multipleSelection: [] // 批量删除勾选的对象
    }
  },
  mounted() {
    // 调用获取后端接口所有职位数据方法
    this.initPositions()
  },
  methods: {
    // 批量删除请求
    deleteMany() {
      this.$confirm('此操作将永久删除[' + this.multipleSelection.length + ']条职位, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ids = '?'
        this.multipleSelection.forEach(item => {
          ids += 'ids=' + item.id + '&'
        })
        this.deleteRequest('/system/basic/pos/' + ids).then(resp => {
          if (resp) {
            this.initPositions()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 批量删除(取值）
    handleSelectionChange(val) {
      this.multipleSelection = val
      // console.log(val)
    },
    // 编辑职位
    doUpdate() {
      this.putRequest('/system/basic/pos/', this.updatePos).then(resp => {
        if (resp) {
          this.initPositions() // 刷新数据列表
          this.dialogVisible = false // 关闭对话框
        }
      })
    },
    // 编辑职位对话框
    showEditView(index, data) {
      Object.assign(this.updatePos, data) // 回显数据,数据拷贝
      // this.updatePos = data // 回显数据 有bug
      this.updatePos.createDate = ''
      this.dialogVisible = true // 显示编辑框
    },
    // 添加职位
    addPosition() {
      if (this.pos.name) {
        this.postRequest('/system/basic/pos/', this.pos).then(resp => {
          if (resp) {
            this.initPositions()
            this.pos.name = ''
          }
        })

      } else {
        this.$message.error('职位名称不能为空！')
      }
    },
    // 删除职位
    handleDelete(index, data) {
      this.$confirm('此操作将永久删除[' + data.name + ']职位, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteRequest(' /system/basic/pos/' + data.id).then(resp => {
          if (resp) {
            this.initPositions()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 获取后端接口所有职位数据
    initPositions() {
      this.getRequest('/system/basic/pos/').then(resp => {
        if (resp) {
          this.positions = resp
        }
      })
    }
  }
}
</script>

<style scoped>
/*添加职位输入框*/
.addPosInput {
  width: 300px;
  margin-right: 8px;
}

/*所有数据表格*/
.posManaMain {
  margin-top: 10px;
}

/*编号职位输入框*/
.updatePosInput {
  width: 200px;
  margin-left: 8px;
}
</style>
