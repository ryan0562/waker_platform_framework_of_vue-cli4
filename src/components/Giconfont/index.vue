<template>
  <i :class="['iconfont', type]" v-bind="$attrs"></i>
</template>

<script>

export default {
  name: "iconfont",
  props: {
    type: {
      type: String,
      default: '',
      required: true,
    },
  },
}
</script>
<style lang="less" scoped>
.iconfont {
  display: inline-block;
  vertical-align: top;
}
</style>
