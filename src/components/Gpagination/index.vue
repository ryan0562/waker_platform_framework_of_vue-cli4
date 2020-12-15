<!--
 * @Description:
 * @Autor: Waker
 * @Date: 2020-06-22 17:37:43
 * @LastEditors: Waker
 * @LastEditTime: 2020-06-29 13:22:09
-->
<template>
  <section class="Gpagination clearfix">
    <div class="al">
      <div>共{{ total }}条</div>
      <div>第{{ pageBi }}页</div>
      <div>
        每页
        <a-select v-model="pagination.pageSize" @change="changePageSize">
          <a-select-option v-for="item in pageSizeArr" :value="item" :key="item">{{ item }}</a-select-option>
        </a-select>条
      </div>
    </div>
    <div class="ar">
      <a-pagination
        v-model="pagination.page"
        v-bind="$attrs"
        show-quick-jumper
        :pageSize.sync="pagination.pageSize"
        :locale="locale"
        :total="total"
        @change="pageChange"
        ref="pagination"
      />
      <!-- <a-button @click="goTo">确定</a-button> -->
    </div>
  </section>
</template>

<script>
export default {
  props: {
    // 每页条数集合
    pageSizeArr: {
      type: Array,
      default: function () {
        return this.$map.pagination.pageSizeArr
      },
    },
    // 每页条数
    pageSize: {
      type: Number,
      default: function () {
        return this.$map.pagination.pageSize
      },
    },
    // 总列数
    total: {
      type: Number,
      default: 0,
    },
  },
  data () {
    return {
      pagination: {
        page: 1,
        pageSize: null,
      },
      locale: {
        jump_to: '第',
      },
    }
  },
  created () {
    this.init()
    console.log(this)
  },
  computed: {
    // 第xx页
    pageBi () {
      return `${this.pagination.page}/${Math.ceil(this.total / this.pagination.pageSize)}`
    },
  },
  methods: {
    goTo () {
      console.log(this.$refs.pagination)
    },
    // 修改列表触发
    pageChange (page, pageSize) {
      this.$emit('change', page, pageSize)
    },
    // 选择单页列表数
    changePageSize (val) {
      this.pagination.pageSize = Number(val)
      this.pagination.page = 1
      this.$emit('showSizeChange', this.pagination.pageSize, this.pageSizeArr)
    },
    // 初始化数据
    init () {
      this.pagination.pageSize = this.pageSize
    },
  },
}
</script>

<style lang="less" scoped>
// @import '~@/style/theme.less';
.Gpagination {
  margin-top: 17px;
}
.ant-pagination{
    display: inline-block;
    vertical-align: top;
    // margin-right: 45px;
}
.al {
  float: left;
  .ant-select {
    width: 80px;
    margin: 0 8px;
  }
  & > div {
    display: inline-block;
    margin-right: 20px;
  }
}
.ar {
  float: right;
}
</style>
