<template>
  <a-layout :class="['layout']">
    <!-- layout header -->
    <global-header
      :menus="menus"
      :collapsed="collapsed"
    />
    <a-layout >
      <side-menu
        mode="inline"
        :menus="menus"
        :collapsed="collapsed"
        :collapsible="true"
        @toggle="toggle"
      ></side-menu>

      <!-- <a-layout-content class="workSpace">
        <transition name="page-transition">
          <route-view />
        </transition>
      </a-layout-content> -->

    </a-layout>
  </a-layout>

</template>

<script>
// import { triggerWindowResizeEvent } from '@/utils/util'
import { mapState, mapActions } from 'vuex'
// import { mixin, mixinDevice } from '@/utils/mixin'
// import config from '@/config/defaultSettings'

// import RouteView from './RouteView'
import SideMenu from '@/components/Menu/SideMenu'
import GlobalHeader from '@/components/GlobalHeader'
// import SettingDrawer from '@/components/SettingDrawer'
// import { convertRoutes } from '@/utils/routeConvert'
import { permissionRouterList } from '@/router/list'

export default {
  name: 'BasicLayout',
  // mixins: [mixin, mixinDevice],
  components: {
    // RouteView,
    SideMenu,
    GlobalHeader,
    // SettingDrawer
  },
  data () {
    return {
      // production: config.production,
      collapsed: false,
      menus: [],
    }
  },
  computed: {
    ...mapState({
      // 动态主路由
      mainMenu: state => state.user.menu,
    }),
  },
  // watch: {
  //   sidebarOpened (val) {
  //     this.collapsed = !val
  //   },
  // },
  created () {
    // 动态路由
    // const routes = this.mainMenu
    // 静态路由
    // const routes = (permissionRouterList.find(item => item.path === '/'))
    this.menus = this.mainMenu.children
  },
 
  methods: {
    toggle () {
      this.collapsed = !this.collapsed
    },
  
  },
}
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
