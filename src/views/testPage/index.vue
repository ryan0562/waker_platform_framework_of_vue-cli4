<!--
 * @Description: 
 * @Autor: Waker
 * @Date: 2020-11-10 17:06:05
 * @LastEditors: Waker
 * @LastEditTime: 2020-11-10 20:27:17
-->
<template>
  <div class="home">
    <img alt="Vue logo" src="@/assets/logo.png" />
    <img alt="Vue logo" src="@public/logo1.png" />
    <div class="bg"></div>
    <iconfont type="iconshangchuan" />
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {
  },
};
</script>
<style lang="less">
.bg {
  width: 200px;
  height: 200px;
  margin: auto;
  background: url("~@public/logo1.png");
}
</style>
