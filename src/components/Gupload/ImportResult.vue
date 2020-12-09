<!--
 * @Description:
 * @Autor: Waker
 * @Date: 2020-06-29 16:17:29
 * @LastEditors: Waker
 * @LastEditTime: 2020-07-16 16:50:49
-->
<template>
  <div>
    <a-modal width="560px" :visible.sync="resultDialog">
      <div slot="title" class="saasDialogTit">{{ resultInfo.fail == 0?"导入成功":"导入结果提示" }}</div>
      <div v-if="resultInfo.fail == 0">共成功导入{{ resultInfo.success }}条记录</div>
      <div v-else>共成功导入{{ resultInfo.success }}条记录，{{ resultInfo.fail }}条记录导入失败。可下载失败数据文档，修改后再次导入</div>
      <div slot="footer" class="dialog-footer">
        <span
          v-if="resultInfo.fail"
          class="button-operater underline left"
          @click="downloadFailExcel"
        >下载失败数据文档</span>
        <a-button type="primary" @click="resultDialog = false">确定</a-button>
      </div>
    </a-modal>
  </div>
</template>
<script>
export default {
  props: {
    downUrl: {
      type: String,
    },
  },
  data () {
    return {
      resultDialog: false,
      resultInfo: {
        fail: 0,
        success: 0,
      },
    }
  },
  mounted: function () {},
  methods: {
    openImportResultDialog (info) {
      this.resultInfo = info
      this.resultDialog = true
    },
    downloadFailExcel () {
      window.open(this.downUrl)
    },
  },
}
</script>
<style scoped>
</style>
