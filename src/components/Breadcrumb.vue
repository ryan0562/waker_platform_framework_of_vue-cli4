<template>
  <a-breadcrumb class="Gbreadcrumb">
    <a-breadcrumb-item v-for="(item, index) in breadList" :key="item.name">
      <!-- && index != 1 -->
      <router-link v-if="item.name != name" :to="{ path: item.path === '' ? '/' : item.path }">
        {{ item.meta.title }}</router-link>
      <span v-else>{{ item.meta.title }}</span>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      breadList: [],
    };
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb() {
      this.breadList = [];
      this.name = this.$route.name;
      this.$route.matched.forEach((item) => {
        this.breadList.push(item);
      });
    },
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    },
  },
};
</script>

<style scoped>
.Gbreadcrumb {
  margin: -10px 0 15px 0;
}
</style>
