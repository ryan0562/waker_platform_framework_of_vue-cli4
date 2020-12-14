<template>
  <a-layout class="layout">
    <!-- layout header -->
    <global-header :menus="menus" :collapsed="collapsed" />
    <a-layout>
      <side-menu mode="inline" :menus="menus" :collapsed="collapsed" :collapsible="true" @toggle="toggle"></side-menu>
      <a-layout-content class="workSpace">
        <transition name="page-transition">
          <router-view />
        </transition>
      </a-layout-content>

    </a-layout>
  </a-layout>

</template>

<script>
import SideMenu from "@/components/Menu/SideMenu";
import GlobalHeader from "@/components/GlobalHeader";
import { permissionRouterList } from "@/router/list";

export default {
  name: "BasicLayout",
  components: {
    SideMenu,
    GlobalHeader,
  },
  data() {
    return {
      // production: config.production,
      collapsed: false,
      menus: [],
    };
  },
  created() {
    this.menus = this.$store.state.user.menu;
  },

  methods: {
    toggle() {
      this.collapsed = !this.collapsed;
    },
  },
};
</script>

<style lang="less">
/*
 * The following styles are auto-applied to elements with
 * transition="page-transition" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the page transition by editing
 * these styles.
 */
.workSpace {
  position: relative;
}
.page-transition-enter {
  opacity: 0;
}

.page-transition-leave-active {
  opacity: 0;
}

.page-transition-enter .page-transition-container,
.page-transition-leave-active .page-transition-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
