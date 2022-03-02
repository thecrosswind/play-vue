<template>
  <div>
    <van-swipe style="height:200px"
               :autoplay="3000">
      <van-swipe-item v-for="(item, index) in images"
                      :key="index">
        <van-image height="200"
                   :src="item.imageUrl" />
      </van-swipe-item>
    </van-swipe>

  </div>
</template>

<script>
export default {
  data () {
    return {
      task: "00",
      images: [
        // 'https://img01.yzcdn.cn/vant/apple-1.jpg',
        // 'https://img01.yzcdn.cn/vant/apple-2.jpg',
      ],
    }
  },
  mounted () {
    this.getBanner()
  },
  methods: {
    async getBanner () {
      const data = await this.$Network.get(6)
      this.images = data.banners || []
      console.log(data, '23123')
    },
    async  getUser () {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
      });
      const data = await this.$Network.get('5')
      Toast.clear()
    },
    creat () {
      if (this.task.trim().length === 0) {
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
