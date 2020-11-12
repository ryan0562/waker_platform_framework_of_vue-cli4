<!--
 * @Description: 
 * @Autor: Waker
 * @Date: 2020-11-10 17:06:05
 * @LastEditors: Waker
 * @LastEditTime: 2020-11-12 15:16:08
-->
<template>
  <div class="icon">
    <!-- <iconfont type="iconshangchuan" /> -->
    <a-button type="dashed">Dashed</a-button>
    <a-slider id="test" :default-value="30"/>
  </div>
</template>

<script>
export default {
  name: "icon",
  components: {},
  created() {
    console.log(process.env.NODE_ENV);
  },
};
</script>
<style lang="less" scoped>
.icon {
  font-size: 100px;
}
</style>
