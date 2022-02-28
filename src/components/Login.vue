<template>
  <div class="login">
    <div class="box">cs</div>
  </div>
</template>

<script>
import axios from 'axios'
import { Toast } from "vant";
export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  mounted () {
    Toast('错误提示')
  },
  methods: {
    reset () {
      // console.log(this.$refs)
    },
    login () {
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  background-color: #2d434c;
  overflow: hidden;
  .box {
    width: 100%;
    height: 50px;
    padding: 10px 0;
  }
}
</style>
