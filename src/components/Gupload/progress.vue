<!--
 * @Description:
 * @Autor: Waker
 * @Date: 2020-06-29 16:17:29
 * @LastEditors: Waker
 * @LastEditTime: 2020-07-08 10:27:12
-->
<template>
  <div>
    <!-- 进度条 -->
    <a-modal
      title="导入"
      :visible.sync="visible"
      width="500px"
      :maskClosable="false"
      :footer="null"
      :closable="false"
    >
      <!-- <el-progress :percentage="this.percentage"></el-progress>
      <p style="margin-top:10px;">{{ progresName }}</p>-->
      <a-spin tip="上传中，请稍后…" class="spin"></a-spin>
    </a-modal>
  </div>
</template>
<script>
export default {
  data () {
    return {
      visible: false,
      percentage: 0, // 进度条
      progresName: '上传中',
    }
  },
  methods: {
    progress () {
      this.percentage = 0
      var meinterval = setInterval(() => {
        if (this.percentage > 80) {
          this.percentage = 100
          this.progresName = '上传完成，正在处理，请稍后...'
          clearInterval(meinterval)
          return
        }
        this.percentage = this.percentage + Math.floor(Math.random() * 10)
      }, 300)

      // this.dialog.alertDialog = true;
    },
  },
}
</script>
<style scoped>
.spin {
  margin: 50px auto;
  display: block;
}
</style>
