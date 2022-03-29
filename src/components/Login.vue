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
      <!-- <van-field v-model="sms"
                 center
                 clearable
                 label="短信验证码"
                 placeholder="请输入短信验证码">
        <template #button>
          <van-button size="small"
                      type="primary">发送验证码</van-button>
        </template>
      </van-field> -->
      <!-- <div style="margin: 16px;">
        <van-button size="small"
                    @click="send"
                    type="primary">{{time ? `${time}秒` : '发送验证码'}}</van-button>
      </div> -->
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
      password: '',
      sms: '',
      time: ''
    }
  },
  mounted () {
    // Toast('错误提示')
    // this.getData()
  },
  methods: {
    async  send () {
      if (!this.phone) Toast('请先填写手机号')
      if (this.time) return
      const data = this.$Network.get(2, { phone: this.phone })
      this.time = 60
      const css = setInterval(() => {
        this.time == 1 && clearInterval(css)
        --this.time
      }, 1000)
      // console.log('12312')
    },
    async onSubmit () {
      const { phone, sms } = this
      // 验证码登录
      // if (this.phone && this.sms) {
      //   let data = await this.$Network.get(3, { phone, captcha: sms })
      //   // console.log(data, '123123')
      //   if (data.data == true) {
      //     const res = await this.$Network.get(4, { captcha: sms, phone, password: '' })
      //     console.log(res, '23232')
      //   }
      // }
      // 密码登录
      if (!this.phone) return Toast('请输入手机号')
      if (!this.password) return Toast('请输入密码')
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
      });
      const data = await this.$Network.get(1, { phone: this.phone, password: this.password })
      console.log(data, 'cscs')
      if (data.code == 200) {
        Toast('登录成功')
        this.$router.push('/Layout')
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
