<!--
 * @Description:
 * @Autor: Waker
 * @Date: 2020-05-19 16:37:04
 * @LastEditors: Waker
 * @LastEditTime: 2020-06-10 15:40:31
-->
<template>
  <div class="logo">
    <img src="@public/logo.png" alt="logo" />
    <span class="logo-title">{{ '企业SaaS能源应用中心' }}</span>
    <span
      class="logo-subTitle"
      v-if="$route.meta.headerSubTitle"
    >{{ $route.meta.headerSubTitle }}</span>
  </div>
</template>

<script>
export default {
  props: {},
  data () {
    return {}
  },
  created () {},
}
</script>
<style lang="less" scoped>
.logo-title {
  margin-left: 10px;
  font-size: 16px;
}
.logo-subTitle {
  border-left: 1px solid #fff;
  margin-left: 10px;
  font-size: 16px;
  padding-left: 10px;
}
</style>
