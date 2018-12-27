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
   <el-button type="success" plain>添加用户</el-button>
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
        <el-button type="primary" icon="el-icon-edit" size="mini" plain circle></el-button>
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
    </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      dataList: [],
      query: '',
      currentPage: 1,
      pageSize: 2,
      total: 0,
      baseURL: 'http://localhost:8888/api/private/v1/'
    }
  },
  created() {
    this.getListData()
  },
  methods: {
    getListData() {
      axios({
        method: 'get',
        url: this.baseURL + 'users',
        params: {
          query: this.query,
          pagenum: this.currentPage,
          pagesize: this.pageSize
        },
        headers: {
          Authorization: localStorage.getItem('token')
        }
      }).then(res => {
        // console.log(res.data)
        if (res.data.meta.status === 200) {
          this.dataList = res.data.data.users
          this.total = res.data.data.total
        }
      })
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
    editStatus(data) {
      // console.log(data)
      axios({
        method: 'put',
        url: this.baseURL + `users/${data.id}/state/${data.mg_state}`,
        headers: {
          Authorization: localStorage.getItem('token')
        }
      }).then(res => {
        // console.log(res.data)
        if (res.data.meta.status === 200) {
          this.$message.success('修改成功')
        }
      })
    },
    delUser(id) {
      this.$confirm('确定删除该用户?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios({
          method: 'delete',
          url: this.baseURL + `users/${id}`,
          headers: {
            Authorization: localStorage.getItem('token')
          }
        }).then(res => {
          console.log(res.data)
          if (res.data.meta.status === 200) {
            this.$message.success('删除成功')
            if (this.dataList.length <= 1 && this.currentPage > 1) {
              this.currentPage--
            }
            this.getListData()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })         
      })    
    },
    searchUser() {
      this.getListData()
    }
  }
}
</script>

<style lang="less" scoped>
 .el-breadcrumb{
   height: 40px;
  line-height: 40px;
 }
 .el-input {
  width: 300px;
  margin-bottom: 5px;
}
</style>
