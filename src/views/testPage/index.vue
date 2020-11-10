<!--
 * @Description: 
 * @Autor: Waker
 * @Date: 2020-11-10 17:06:05
 * @LastEditors: Waker
 * @LastEditTime: 2020-11-10 20:54:09
-->
<template>
  <div class="home">
    <img alt="Vue logo" src="@public/logo1.png" />
    <div class="bg"></div>
    <iconfont type="iconshangchuan" />
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  created() {
    console.log(process.env.NODE_ENV)
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
