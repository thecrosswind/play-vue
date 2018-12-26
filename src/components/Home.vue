<template>
 <el-container  class="home">
    <el-header>
      <div class="logo"></div>
      <div class="title">
        <h1>电商管理系统</h1>
      </div>
      <div class="logout">
        <span>欢迎光临</span>
        <a href="javascript:;" @click="logout">退出</a>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
        localStorage.removeItem('token')
        this.$router.push('/login')
      })
    }
  }
}
</script>

<style lang="less" scoped>
   .home {
     height: 100%;
     .el-header {
     height: 60px;
     background-color: #B3C1CD;
     display: flex;
     .logo {
      width: 180px;
      background-image: url('~@/assets/logo.png');
      background-position: center center;
      background-size: contain;
      background-repeat: no-repeat;
      }
      .title {
         flex: 1;
         h1 {
         text-align: center;
         line-height: 60px;
         color: #fff;
         font-size: 32px;
         }
      }
      .logout {
        width: 180px;
        font-weight: 700;
        text-align: right;
        line-height: 60px;
         a{
           color: orange;
         }
      }
     }
     .el-aside {
    background-color: #545C64;
     }
     .el-main {
     background-color: #D4DFE4;
     }
   }
</style>
