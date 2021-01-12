<!--
 * @Description:
 * @Autor: Waker
 * @Date: 2020-05-19 16:37:04
 * @LastEditors: Waker
 * @LastEditTime: 2020-06-29 13:35:29
-->
<template>
  <div class="pageAuto">
    <slot>
      <keep-alive :include="keepAliveIncludes" >
        <router-view ref="content"/>
      </keep-alive>
      <!-- <router-view v-else ref="content" /> -->
    </slot>
  </div>
</template>

<script>
export default {
  name: "PageView",
  data() {
    return {
      // keepAliveIncludes:[]
    };
  },
  mounted() {
    // console.log(this.$refs.content)
    
  },
  computed: {
    'keepAliveIncludes'() {
      const arr = Object.values(this.$store.state.keepAliveIncludes)
      return Array.from(new Set(arr))
    },
  }
  

};
</script>

<style lang="less" scoped>
.pageAuto {
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 24px;
  overflow: auto;
}
</style>
