<!--
 * @Description: 
 * @Autor: Waker
 * @Date: 2020-11-12 19:56:26
 * @LastEditors: Waker
 * @LastEditTime: 2020-11-13 11:15:14
-->

<template>
  <div class="icon">
    <button @click="testDeBounce">防抖</button>
    <button @click="testThrottle">节流</button>
  </div>
</template>

<script>
import { debounce, throttle } from "@/utils/debounce";
export default {
  name: "icon",
  data() {
    return {
      text: "测试",
    };
  },
  components: {},
  created() {},
  methods: {
    testThrottle: throttle(function (e) {
      this.getText("v");
    }, 1000),
    testDeBounce: debounce(function (e) {
      this.getText("c");
    }),
    getText(a) {
      debugger;
      console.log(this.text);
      console.log(a);
    },
  },
};
</script>
<style lang="less" scoped>
</style>
