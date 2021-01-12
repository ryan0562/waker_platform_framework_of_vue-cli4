<!--
 * @Description:
 * @Autor: Waker
 * @Date: 2020-06-22 17:37:43
 * @LastEditors: Waker
 * @LastEditTime: 2020-08-31 15:49:27
-->
<template>
  <section class="GpageFlex">
    <Gbreadcrumb />
    <!-- 筛选模块 -->
    <div class="GfilterModule">
      <a-form-model class="form" layout="inline" :model="form" labelAlign="right" :colon="false">
        <a-form-model-item label="企业用户">
          <a-select placeholder="请选择企业用户">
            <a-select-option value="jack">Jack</a-select-option>
            <a-select-option value="lucy">Lucy</a-select-option>
            <a-select-option value="disabled" disabled>Disabled</a-select-option>
            <a-select-option value="Yiminghe">yiminghe</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="缺陷发现人缺">
          <a-input v-model="form.fieldA" placeholder="input placeholder" />
        </a-form-model-item>
        <a-form-model-item label="发现日期">
          <a-input v-model="form.fieldB" placeholder="input placeholder" />
        </a-form-model-item>
        <a-form-model-item label="企业用户">
          <a-select>
            <a-select-option value="jack">Jack</a-select-option>
            <a-select-option value="lucy">Lucy</a-select-option>
            <a-select-option value="disabled" disabled>Disabled</a-select-option>
            <a-select-option value="Yiminghe">yiminghe</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="缺陷发现人">
          <a-input v-model="form.fieldA" placeholder="input placeholder" />
        </a-form-model-item>
        <a-form-model-item label="缺陷登记的人">
          <a-input v-model="form.fieldB" placeholder="input placeholder" />
        </a-form-model-item>
        <a-form-model-item class="btnBox">
          <a-button type="primary">查询</a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
    <!-- 列表模块 -->
    <div class="GlistModel flex-item flex">
      <!-- 列表模块 -- 按钮区 -->
      <div class="btnBox">
        <listModelBtn type="iconbianji">按钮</listModelBtn>
        <listModelBtn type="iconbianji">按钮</listModelBtn>
        <listModelBtn type="iconbianji" @click.native="openNotification">notification</listModelBtn>
        <listModelBtn type="iconshangchuan" @click.native="showUpload">上传</listModelBtn>
      </div>
      <!-- 列表区 -->
      <!--  -->
      <a-table
        :row-selection="rowSelection"
        :data-source="data"
        :pagination="false"
        class="tableCalc"
        :scroll="{y:'calc(100% - 40px)'}"
      >
        <a-table-column title="Address" data-index="address" align="right" />
        <a-table-column title="Tags" data-index="tags">
          <template slot-scope="tags">
            <a-tag
              v-for="tag in tags"
              :key="tag"
              :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
            >{{ tag.toUpperCase() }}</a-tag>
          </template>
        </a-table-column>
        <a-table-column class="action" title="操作" width="160px">
          <template slot-scope="text, record, index">
            <a-button type="link" @click="edit(text, record,index)">编辑</a-button>
            <a-button type="link" @click="edit(text, record,index)">详情</a-button>
            <a-button type="link" @click="edit(text, record,index)" class="red">删除</a-button>
          </template>
        </a-table-column>
      </a-table>
      <!-- 分页通用组件 -->
      <Gpagination :total="46" @change="pageChange" @showSizeChange="pageSizeChange" />
      <!-- 通用导入组件 -->
      <Gupload
        ref="Gupload"
        :templateUrl="upload.dowloadTemplateUrl"
        title="批量导入报价"
        :callback="getList"
        :uploadUrl="upload.uploadUrl"
        :errDownload="upload.errorUrl"
      ></Gupload>

    
    </div>
  </section>
</template>

<script>
// import Vue2Verify from '@/components/Gverify/Verify.vue'
// import Vue2Verify from 'waker_verify'
const data = [
  {
    key: '0',
    test: '测试标题',
    name: '测试',
    age: 22,
    address: '测试地址k',
    tags: ['nice', 'developer'],
  },
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
]

export default {
  name: 'userAccount',
  destroyed(){
    
  },
  components: {
    listModelBtn: () => import('@/components/Gbutton/listModelBtn.vue'),
    Gpagination: () => import('@/components/Gpagination'),
    Gbreadcrumb: () => import('@/components/Breadcrumb'),
    Gupload: () => import('@/components/Gupload/import'),
    // Vue2Verify,
  },
  data () {
    return {
      data: [],
      form: {},
      upload: {
        dowloadTemplateUrl: '/api/uploadFiles/车辆导入模板.xlsx',
        uploadUrl: '/api/uploadFiles/car/import/excel',
        errorUrl: '/api/uploadFiles/car/error/excel',
      },
    }
  },
  computed: {
    rowSelection () {
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
        },
        getCheckboxProps: record => ({
          props: {
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
          },
        }),
      }
    },
  },
  created () {
    this.getList()
  },
  methods: {
    verify (a, b, c, d) {
      console.log(a, b, c, d)
    },
    // 打开Notification 信息通知窗
    openNotification () {
      this.$notification.open({
        message: 'Notification Title',
        description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
        icon: <iconfont type='iconT-keshihuadaping' style="color:#f00;font-size:30px"></iconfont>,
      })
    },
    showUpload () {
      this.$refs.Gupload.showDialog = true
    },
    getList () {
      this.data = data
    },
    edit (text, record, index) {
      console.log(text)
      console.log(record)
      console.log(index)
    },
    pageChange (page, pageSize) {
      console.log(page, pageSize)
    },
    pageSizeChange (current, size) {
      console.log(current, size)
    },
  },
}
</script>

<style lang="less" scoped>
// @import '~@/style/theme.less';

.GpageFlex {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.flex-item {
  flex: 1;
  overflow: auto;
}
.flex {
  display: flex;
  flex-direction: column;
}
.tableCalc {
  ::v-deep {
    height: calc(100% - 93px);
    .ant-spin-nested-loading,
    .ant-spin-container,
    .ant-table,
    .ant-table-content,
    .ant-table-scroll {
      height: 100%;
    }
  }
}
</style>
