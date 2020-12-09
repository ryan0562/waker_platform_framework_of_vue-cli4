<!--
 * @Description:
 * @Autor: Waker
 * @Date: 2020-05-19 16:37:04
 * @LastEditors: Waker
 * @LastEditTime: 2020-06-10 18:08:13
-->
<template>
 <!-- isDesktop() ? null : 'shadow', -->
 <!-- , fixSiderbar ? 'ant-fixed-sidemenu' : null  -->
  <a-layout-sider
    :class="['sider', theme]"
    width="176px"
    collapsedWidth="48"
    :collapsible="collapsible"
    v-model="collapsed"
    :trigger="null"
  >
    <s-menu
      :collapsed="collapsed" 
      :menu="menus"
      :theme="theme"
      :mode="mode"
      @select="onSelect"
      style="padding: 16px 0px;"
    ></s-menu>
    <!-- <iconfont class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="toggle" /> -->

    <iconfont
      class="trigger"
      :type="collapsed ? 'iconzhankai1' : 'iconxiangzuoshouqi1'"
      @click.native="toggle()"
    />
  </a-layout-sider>
</template>

<script>
import SMenu from './index'
// import { mixin, mixinDevice } from '@/utils/mixin'

export default {
  name: 'SideMenu',
  components: { SMenu },
  // mixins: [mixin, mixinDevice],
  props: {
    mode: {
      type: String,
      required: false,
      default: 'inline',
    },
    theme: {
      type: String,
      required: false,
      default: 'dark',
    },
    collapsible: {
      type: Boolean,
      required: false,
      default: false,
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false,
    },
    menus: {
      type: Array,
      required: true,
    },
  },
  methods: {
    onSelect (obj) {
      this.$emit('menuSelect', obj)
    },
    toggle () {
      this.$emit('toggle')
    },
  },
}
</script>
<style lang="less" scoped>
@import '~@/style/theme.less';

.sider {
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
  position: relative;
  z-index: @ant-global-sider-zindex;
  padding-bottom: 64px;
  ::v-deep .ant-layout-sider-children {
    overflow-x: hidden;
    overflow-y: auto;
  }
  ::v-deep .ant-menu-inline-collapsed {
    width: 100%;
    .ant-menu-submenu-title {
      padding: 0 !important;
      text-align: center;
    }
  }
}
.trigger {
  color: rgba(255, 255, 255, 0.65);
  width: 100%;
  position: absolute;
  bottom: 0;
  font-size: 24px;
  line-height: 64px;
  text-align: center;
  cursor: pointer;
  transition: color 0.3s;
  background: #001529;
}
</style>
