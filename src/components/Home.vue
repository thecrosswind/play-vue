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
      <el-aside width="200px">
    <el-menu
      default-active="1-1"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>用户管理</span>
        </template>
          <el-menu-item index="/users">
              <i class="el-icon-menu"></i>
              <span slot="title">用户列表</span>
            </el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>权限管理</span>
        </template>
          <el-menu-item index="/roles">
              <i class="el-icon-menu"></i>
              <span slot="title">角色列表</span>
            </el-menu-item>
             <el-menu-item index="/rights">
              <i class="el-icon-menu"></i>
              <span slot="title">权限列表</span>
            </el-menu-item>
      </el-submenu>
    </el-menu>
      </el-aside>
      <el-main><router-view/></el-main>
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
      .el-submenu {
      width: 200px;
    }
     }
     .el-main {
     background-color: #D4DFE4;
     }
   }
</style>
