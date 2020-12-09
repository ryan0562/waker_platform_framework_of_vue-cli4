<template>
  <section>
    <a-modal
      :title="title"
      :visible.sync="showDialog"
      width="500px"
      @cancel="closeDL"
      :maskClosable="false"
    >
      <!-- 添加/修改 桩体信息 -->
      <a-form-model :model="importForm" ref="importForm" layout="inline" :colon="false">
        <!--如果不传递  templateUrl ，就不显示下载模板的提示-->
        <div v-if="templateUrl" class="downTemplate">
          <span class="link blue" @click="downTemplate()">
            <iconfont type="iconshangchuan" />下载导入模板
          </span>
          <div class="tip">提示：请先下载模板，按模板编辑要求编辑后即可导入</div>
        </div>
        <a-form-model-item id="ilabel" label="导入文件">
          <a-input class="fileInput" placeholder="文件名称" v-model="name" disabled></a-input>
          <!-- <a-upload
            accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            ref="upload"
            :action="$props.uploadUrl"
            :file-list="fileList"
            :show-file-list="false"
            :on-success="onSuccess"
            :on-error="onError"
            :data="data"
            with-credentials
            name="uploadFile"
            :on-change="onChange"
            :auto-upload="false"
          >
            <a-button slot="trigger" type="primary" size="small">选择</a-button>
          </a-upload>-->
          <a-upload
            accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            name="uploadFile"
            ref="upload"
            :before-upload="beforeUpload"
            :action="$props.uploadUrl"
            @change="onChange"
            :showUploadList="false"
            class="upload"
          >
            <a-button>请选择</a-button>
          </a-upload>
        </a-form-model-item>
      </a-form-model>
      <div slot="footer" class="dialog-footer">
        <a-button @click="closeDL">取消</a-button>
        <a-button type="primary" @click="submitUpload">确定</a-button>
      </div>
    </a-modal>
    <!-- 导入结果dialog组件 -->
    <ImportResultDialog ref="ImportResultDialog" :downUrl="$props.errDownload"></ImportResultDialog>
    <!--进度条组件-->
    <progressDialog ref="progressDialog"></progressDialog>
  </section>
</template>

<script>
import ImportResultDialog from './ImportResult.vue'
import progressDialog from './progress.vue'
import { axios } from '@/utils/axios/request'

export default {
  components: {
    ImportResultDialog,
    progressDialog,
  },
  // 上传地址，错误数据导出地址，模板下载地址，标题，回调函数
  props: {
    uploadUrl: {
      type: String,
      required: true,
    },
    errDownload: {
      type: String,
      required: true,
    },
    templateUrl: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    callback: {
      type: Function,
    },
  },
  data () {
    return {
      showDialog: false,
      name: '',
      fileList: [],
      importForm: {},
      data: { companyId: localStorage.getItem('companyId') },
    }
  },
  methods: {
    // 上传前
    beforeUpload (file, fileList) {
      if (fileList.length > 0) {
        this.fileList = [fileList[fileList.length - 1]]
        this.name = this.fileList[0].name
      }
      return false
    },
    // 下载模板
    downTemplate () {
      window.open(this.$props.templateUrl)
    },
    // 清空上传文件
    clearFiles () {
      this.fileList = []
      this.name = ''
      // this.$refs.upload.clearFiles()
    },
    // 文件状态改变触发
    onChange (file, fileList, event) {
      // switch (file.status) {
      //   // 上传中
      //   case 'uploading':
      //     break
      //   // 成功
      //   case 'done':
      //     this.onSuccess(file.response)
      //     break
      //   // 失败
      //   case 'error':
      //     this.onError()
      //     break
      // }
    },
    getHostName () {},
    // 上传
    submitUpload () {
      let formData = new FormData()

      formData.append('uploadFile', this.fileList[0])
      formData.append('userId', 47)
      formData.append('loginCompanyId', 36)
      this.$refs.progressDialog.visible = true
      this.$refs.progressDialog.progress()
      axios({
        url: this.uploadUrl,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: formData,
      })
        .then(res => {
          this.onSuccess(res)
        })
        .catch(err => {
          this.onError()
        })
        .finally(res => {
          this.clearFiles()
        })

      // if (this.fileList.length === 0) {
      //   this.$message.error('请选择上传文件')
      //   return
      // }
      // this.$refs.upload.submit()
      // this.$refs.progressDialog.visible = true
      // this.$refs.progressDialog.progress()
    },
    onSuccess (res) {
      if (res.success) {
        // this.$message.success('导入成功');
        this.$refs.ImportResultDialog.openImportResultDialog(res.data.map)

        this.$props.callback()
        this.showDialog = false
      } else {
        this.$message.error(res.message)
      }

      this.$refs.progressDialog.visible = false
    },
    onError () {
      this.$refs.progressDialog.visible = false
      this.$message.error('文件上传有误')
    },
    closeDL () {
      this.showDialog = false
    },
  },
  watch: {},
}
</script>

<style lang="less" scoped>
@import '~@/style/theme.less';
.downTemplate {
  margin-bottom: 16px;
  .link {
    line-height: 24px;
  }
  cursor: pointer;
  .iconfont {
    font-size: 24px;
  }
}
.tip {
  font-size: 12px;
  color: @text-color-secondary;
}
.fileInput {
  width: 210px;
}
.upload {
  margin-left: 12px;
}
</style>
