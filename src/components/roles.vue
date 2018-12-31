<template>
 <div>
  <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item><a href="/rights">权限管理</a></el-breadcrumb-item>
  <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button type="success" plain @click="addUser">添加角色</el-button>
    <el-table :data="rolesList">
      <el-table-column type="expand">
      <template slot-scope="{row}">
        <el-row class="l1" v-for="l1 in row.children" :key="l1.id">
          <el-col :span="4">
            <el-tag closable @close="delAssign(row,l1.id)">{{l1.authName}}</el-tag>
             <i class="el-icon-arrow-right"></i>
          </el-col>
          <el-col :span="20">
            <el-row v-for="l2 in l1.children" class="l2" :key="l2.id">
              <el-col :span="4">
                <el-tag closable @close="delAssign(row,l2.id)" type="success">{{l2.authName}}</el-tag>
                 <i class="el-icon-arrow-right"></i>
                </el-col>
              <el-col :span="20">
                <el-tag class="l3" @close="delAssign(row,l3.id)" closable type="danger" v-for="l3 in l2.children" :key="l3.id">{{l3.authName}}</el-tag>
                </el-col>
            </el-row>
          </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index"></el-table-column>
      <el-table-column label="角色名称" prop="roleName"></el-table-column>
      <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="{row}">
          <el-button type="primary" plain icon="el-icon-edit" @click="editUser(row)" circle size="mini"></el-button>
          <el-button type="danger" icon="el-icon-delete" @click="delUser(row.id)" circle size="mini"></el-button>
          <el-button type="success" icon="el-icon-check" @click="showAssign(row)" plain size="mini">分配权限</el-button>
           </template>
        </el-table-column>
      </el-table>
      <!--模态框-->
      <el-dialog
      title="分配权限"
       :visible.sync="AssigndialogVisible"
       width="40%">
       <el-tree :data="assignList"
                :props="defaultProps"
                default-expand-all
                show-checkbox
                ref="tree"
                node-key="id"></el-tree>
         <span slot="footer" class="dialog-footer">
         <el-button @click="AssigndialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addAssign">确 定</el-button>
       </span>
      </el-dialog>
      <!--添加角色-->
      <el-dialog
       title="添加角色"
       :visible.sync="addDialogVisible"
       width="40%">
       <el-form :data="formList" ref="form" label-width="80px" :rules="rules">
        <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="formList.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
        <el-input v-model="formList.roleDesc"></el-input>
        </el-form-item>
         </el-form>
        <span slot="footer" class="dialog-footer">
         <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addData(formList)">确 定</el-button>
        </span>
      </el-dialog>
      <!--编辑角色-->
      <el-dialog
       title="修改角色"
       :visible.sync="editDialogVisible"
       width="40%">
       <el-form :data="formData" ref="form" label-width="80px" :rules="rules">
        <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="formData.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
        <el-input v-model="formData.roleDesc"></el-input>
        </el-form-item>
         </el-form>
        <span slot="footer" class="dialog-footer">
         <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editData(formData)">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rolesList: [],
      assignList: [],
      formList: {
        roleName: '',
        roleDesc: ''
      },
      formData: {
        roleName: '',
        roleDesc: ''
      },
      AssigndialogVisible: false,
      editDialogVisible: false,
      addDialogVisible: false,
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      clickId: '',
      editId: '',
      rules: {
        roleName: [
          { required: true, message: '用户名不能为空', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    async getRolesList() {
      let res = await this.axios.get(`roles`)
      console.log(res)
      if (res.meta.status === 200) {
        this.rolesList = res.data
      }
    },
    async showAssign(row) {
      this.AssigndialogVisible = true
      console.log(row)
      let res = await this.axios.get(`rights/tree`)
      this.assignList = res.data
      let ids = []
      row.children.forEach(l1 => {
        l1.children.forEach(l2 => {
          l2.children.forEach(l3 => {
            ids.push(l3.id)
          })
        })
      })
      this.$refs.tree.setCheckedKeys(ids)
      this.clickId = row.id
    },
    async delAssign(role, id) {
      let res = await this.axios.delete(`roles/${role.id}/rights/${id}`)
      // console.log(res)
      if (res.meta.status === 200) {
        this.$message.success('删除权限成功')
        role.children = res.data
      }
    },
    async addAssign() {
      let arr = this.$refs.tree.getCheckedKeys()
      arr = arr.concat(this.$refs.tree.getHalfCheckedKeys()).join()
      // console.log(arr)
      let res = await this.axios.post(`roles/${this.clickId}/rights`, {rids: arr})
      console.log(res)
      if (res.meta.status === 200) {
        this.$message.success('权限分配成功')
        this.AssigndialogVisible = false
        this.getRolesList()
      }
    },
    async delUser(id) {
      try {
        await this.$confirm('你确定要删除该用户吗?', '温馨提示', {
          type: 'warning'
        })
        let res = await this.axios.delete(`roles/${id}`)
        console.log(res)
        if (res.meta.status === 200) {
          this.$message.success('删除角色成功')
          this.getRolesList()
        }
      } catch (e) {
        this.$message('取消删除角色')
      }
    },
    async addUser() {
      this.addDialogVisible = true
    },
    async addData(role) {
      await this.$refs.form.validate()
      let res = await this.axios.post(`roles`, {
        roleName: role.roleName,
        roleDesc: role.roleDesc
      })
      console.log(res)
      if (res.meta.status === 201) {
        this.$message.success('恭喜你操作成功')
        this.$refs.form.resetFields()
        this.addDialogVisible = false
        this.getRolesList()
      }
    },
    editUser(role) {
      this.editDialogVisible = true
      this.formData.roleName = role.roleName
      this.formData.roleDesc = role.roleDesc
      this.editId = role.id
    },
    async editData(role) {
      let res = await this.axios.put(`roles/${this.editId}`, {
        roleName: role.roleName,
        roleDesc: role.roleDesc
      })
      console.log(res)
      if (res.meta.status === 200) {
        this.editDialogVisible = false
        this.$message.success('修改角色信息成功')
        this.getRolesList()
      }
    }
  },
  created() {
    this.getRolesList()
  }
}
</script>

<style lang="less" scoped>
.l1 {
  padding: 5px 0;
}
// .l2 {
  // margin-bottom: 5px;
// }
.l3 {
  margin-right: 5px;
  margin-bottom: 5px;
}
</style>
