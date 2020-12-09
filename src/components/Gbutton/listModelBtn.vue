<!--
 * @Description:
 * @Autor: Waker
 * @Date: 2020-06-22 17:37:43
 * @LastEditors: Waker
 * @LastEditTime: 2020-06-23 16:51:32
-->
<template>
  <a-button type="link" class="listModeBtn">
    <iconfont :type="type" />
    <slot></slot>
  </a-button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: '',
    },
  },
  components: {},
  data () {
    return {}
  },
  created () {},
  methods: {},
}
</script>

<style lang="less" scoped>
@import '~@/style/theme.less';
.iconfont {
    font-size: 24px;
}
.listModeBtn{
  line-height: 24px;
  color: rgba(0, 0, 0, 0.65);
  border-radius: 3px;
  font-size: 14px;
  padding-left:10px;
  &:hover {
      color:@hover-color;
      border:1px solid @hover-color
  }
  &:active {
      color:@active-color;
      border:1px solid @active-color

  }
}
</style>
