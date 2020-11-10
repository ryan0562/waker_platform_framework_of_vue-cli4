<!--
 * @Description: 
 * @Autor: Waker
 * @Date: 2020-11-10 20:17:54
 * @LastEditors: Waker
 * @LastEditTime: 2020-11-10 20:19:01
-->
<template>
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="`#${type}`"></use>
  </svg>
</template>

<script>
export default {
  name: "Iconfont",
  props: {
    type: {
      type: String,
      default: "",
      required: true,
    },
  },
};
</script>
<style lang="less" scoped>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
