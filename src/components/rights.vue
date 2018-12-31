<template>
 <div>
  <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item><a href="/rights">权限管理</a></el-breadcrumb-item>
  <el-breadcrumb-item>权限列表</el-breadcrumb-item>
</el-breadcrumb>
<el-table :data="rightList">
  <el-table-column type="index"></el-table-column>
  <el-table-column label="权限名称" prop="authName"></el-table-column>
  <el-table-column label="路径" prop="path"></el-table-column>
  <el-table-column label="层级" prop="level">
   <template slot-scope="{row}">
         <span v-if="row.level==='0'">一级</span>
         <span v-else-if="row.level==='1'">二级</span>
         <span v-else>三级</span>
       </template>
     </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rightList: []
    }
  },
  methods: {
    async getAssgnData() {
      let res = await this.axios.get('/rights/list')
      console.log(res)
      if (res.meta.status === 200) {
        this.rightList = res.data
      }
    }
  },
  created() {
    this.getAssgnData()
  }
}
</script>

<style>

</style>
