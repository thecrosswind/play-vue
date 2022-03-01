<template>
  <div class="login">
    <p>登录网易云</p>
    <van-form style="width:100%"
              @submit="onSubmit">
      <van-field v-model="phone"
                 name="手机号"
                 label="手机号"
                 placeholder="手机号"
                 :rules="[{ required: true, message: '请填写手机号' }]" />
      <van-field v-model="password"
                 type="password"
                 name="密码"
                 label="密码"
                 placeholder="密码"
                 :rules="[{ required: true, message: '请填写密码' }]" />
      <div style="margin: 16px;">
        <van-button round
                    block
                    type="info"
                    native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { Toast } from 'vant'
export default {
  data () {
    return {
      phone: '',
      password: ''
    }
  },
  mounted () {
    // Toast('错误提示')
    // this.getData()
  },
  methods: {
    async onSubmit () {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
      });
      const data = await this.$Network.get(1, { phone: this.phone, password: this.password })
      console.log(data, 'cscs')
      if (data.code == 200) {
        Toast('登录成功')
      } else {
        Toast(data.msg)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  // background-color: #2d434c;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
