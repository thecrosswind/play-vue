<template>
  <header class="header">
    <h1>start</h1>
    <div class="box">
      users:<input
        type="text"
        placeholder="请输入用户名"
        autofocus
        v-model="task"
        @keydown.enter="creat"
      />
      password:<input type="password" name="" id="" placeholder="请输入密码" />
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      task:"00",
    }
  },
    methods:{
    creat(){
      if(this.task.trim().length===0){
        alert("用户名不能为空")
        return;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  height: 100%;
  background: skyblue repeat;
  overflow: hidden;
  h1 {
    width: 100px;
    height: 100px;
    background: pink;
  }
  .box {
    width: 300px;
    height: 300px;
    background: orange repeat;
  }
}
</style>
