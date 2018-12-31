<template>
 <div class="users">
 <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item to="/users">用户管理</el-breadcrumb-item>
  <el-breadcrumb-item>用户列表</el-breadcrumb-item>
  </el-breadcrumb>
  <div style="margin-top: 15px;">
  <el-input placeholder="请输入内容" v-model="query" class="input-with-select">
    <el-button slot="append" @click="searchUser" icon="el-icon-search"></el-button>
  </el-input>
   <el-button type="success" plain @click="showmodel">添加用户</el-button>
</div>
 <el-table
      :data="dataList"
      style="width: 100%">
      <el-table-column
        prop="username"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="180">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话">
      </el-table-column>
       <el-table-column
        prop="mg_state"
        label="状态">
        <template slot-scope="scope">
        <el-switch
     @change="editStatus(scope.row)"
     v-model="scope.row.mg_state"
     active-color="#13ce66"
     inactive-color="#ff4949">
       </el-switch>
       </template>
      </el-table-column>
       <el-table-column
        label="操作">
        <template slot-scope="scope">
        <el-button type="primary" icon="el-icon-edit" @click="editUsers(scope.row)" size="mini" plain circle></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            plain
            circle
            @click="delUser(scope.row.id)"
          ></el-button>
          <el-button type="success" icon="el-icon-check" size="mini" plain round>分配角色</el-button>
        </template>
      </el-table-column>
    </el-table>
      <div class="block">
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[2, 4, 6, 8, 10]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
  <el-dialog
  title="添加用户"
  :visible.sync="dialogVisible"
  width="40%">
  <el-form :model="form" :rules="rules" ref="form" label-width="80px" class="demo-ruleForm">
  <el-form-item label="用户名" prop="username">
    <el-input  v-model="form.username" placeholder="请输入用户名"></el-input>
  </el-form-item>
    <el-form-item label="密码" prop="password">
    <el-input  v-model="form.password"  placeholder="请输入密码" type="password"></el-input>
  </el-form-item>
  <el-form-item label="邮箱" prop="email">
    <el-input  v-model="form.email"   ></el-input>
  </el-form-item>
  <el-form-item label="电话" prop="mobile">
    <el-input  v-model="form.mobile"></el-input>
  </el-form-item>
</el-form>
 <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editData">确 定</el-button>
 </span>
</el-dialog>
<el-dialog
  title="修改用户"
  :visible.sync="editUser"
  width="40%">
  <el-form :model="edits" :rules="rules" ref="editse" label-width="80px" class="demo-ruleForm">
 <el-form-item label="用户名">
          <el-tag type="info">{{edits.username}}</el-tag>
  </el-form-item>
  <el-form-item label="邮箱" prop="email">
    <el-input  v-model="edits.email"   ></el-input>
  </el-form-item>
  <el-form-item label="电话" prop="mobile">
    <el-input  v-model="edits.mobile"></el-input>
  </el-form-item>
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="editUser = false">取 消</el-button>
    <el-button type="primary" @click="editqd">确 定</el-button>
  </span>
</el-dialog>
    </div>
</template>

<script>
export default {
  data() {
    return {
      dataList: [],
      query: '',
      currentPage: 1,
      pageSize: 2,
      total: 0,
      dialogVisible: false,
      editUser: false,
      form: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      edits: {
        username: '',
        id: '',
        email: '',
        mobile: ''
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'change' },
          { min: 3, max: 9, message: '长度在 3 到 9 个字符', trigger: 'change' }
        ],
        password: [
          {required: true, message: '密码不能为空', trigger: 'change'},
          {min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'change'}
        ],
        email: [
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        mobile: [
          {pattern: /1\d{10}$/, message: '请输入正确手机号', trigger: 'blur'}
        ]
      }
    }
  },
  created() {
    this.getListData()
  },
  methods: {
    async getListData() {
      let res = await this.axios({
        method: 'get',
        url: 'users',
        params: {
          query: this.query,
          pagenum: this.currentPage,
          pagesize: this.pageSize
        }
      })
      let {meta: {status}, data: {users, total}} = res
      // console.log(res)
      if (status === 200) {
        this.dataList = users
        this.total = total
      }
    },
    handleCurrentChange(val) {
      // console.log(val)
      this.currentPage = val
      this.getListData()
    },
    handleSizeChange(val) {
      // console.log(val)
      this.pageSize = val
      this.getListData()
    },
    async editStatus(data) {
      // console.log(data)
      let res = await this.axios({
        method: 'put',
        url: `users/${data.id}/state/${data.mg_state}`
      })
      // console.log(res)
      if (res.meta.status === 200) {
        this.$message.success('修改状态成功')
      }
    },
    async delUser(id) {
      try {
        // 弹出一个确认框
        await this.$confirm('你确定要删除该用户吗?', '温馨提示', {
          type: 'warning'
        })
        let res = await this.axios({
          method: 'delete',
          url: `users/${id}`
        })
        console.log(res)
        if (res.meta.status === 200) {
          this.$message.success('删除成功')
          if (this.dataList.length <= 1 && this.currentPage > 1) {
            this.currentPage--
          }
          this.getListData()
        } else {
          this.$message.error('删除失败')
        }
      } catch (e) {
        this.$message.info('取消删除')
      }
    },
    searchUser() {
      this.getListData()
    },
    showmodel() {
      this.dialogVisible = true
    },
    async editData() {
      await this.$refs.form.validate()
      let res = await this.axios({
        method: 'post',
        url: 'users',
        data: this.form
      })
      console.log(res)
      if (res.meta.status === 201) {
        this.$refs.form.resetFields()
        this.dialogVisible = false
        this.$message.success('添加用户成功')
        this.total++
        this.currentPage = Math.ceil(this.total / this.pageSize)
        this.getListData()
      }
    },
    editUsers(users) {
      this.editUser = true
      this.edits.username = users.username
      this.edits.id = users.id
      this.edits.mobile = users.mobile
      this.edits.email = users.email
    },
    editqd() {
      this.$refs.editse.validate(() => {
        this.axios({
          method: 'put',
          url: `users/${this.edits.id}`,
          data: {
            email: this.edits.email,
            mobile: this.edits.mobile
          }
        }).then(res => {
          if (res.meta.status === 200) {
            this.editUser = false
            this.getListData()
          }
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
 .el-breadcrumb{
   height: 40px;
  line-height: 40px;
 }
 .input-with-select {
  width: 300px;
  margin-bottom: 5px;
}
</style>
