<template>
  <transition name="showHeader">
    <div class="header">
      <logo />
      <user-menu></user-menu>
    </div>
  </transition>
</template>

<script>
import UserMenu from '../UserMenu'
import SMenu from '../Menu/'
import Logo from '../Logo'
// import { mixin } from '@/utils/mixin'

export default {
  name: 'GlobalHeader',
  components: {
    UserMenu,
    SMenu,
    Logo,
  },
  // mixins: [mixin],
  props: {
    mode: {
      type: String,
      // sidemenu, topmenu
      default: 'sidemenu',
    },
    menus: {
      type: Array,
      required: true,
    },
    theme: {
      type: String,
      required: false,
      default: 'dark',
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false,
    },
    device: {
      type: String,
      required: false,
      default: 'desktop',
    },
  },
  data () {
    return {
      oldScrollTop: 0,
    }
  },
  mounted () {
    document.addEventListener('scroll', this.handleScroll, { passive: true })
  },
  methods: {
    handleScroll () {
      if (!this.autoHideHeader) {
        return
      }

      const scrollTop = document.body.scrollTop + document.documentElement.scrollTop
      if (!this.ticking) {
        this.ticking = true
        requestAnimationFrame(() => {
          if (this.oldScrollTop > scrollTop) {
            this.visible = true
          } else if (scrollTop > 300 && this.visible) {
            this.visible = false
          } else if (scrollTop < 300 && !this.visible) {
            this.visible = true
          }
          this.oldScrollTop = scrollTop
          this.ticking = false
        })
      }
    },
  },
  beforeDestroy () {
    document.body.removeEventListener('scroll', this.handleScroll, true)
  },
}
</script>

<style lang="less" scoped>
@import '~@/style/theme.less';
.header {
  height: 48px;
  line-height: 48px;
  position: relative;
  z-index: @ant-global-header-zindex;
  background: @primary-color;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  color: #fff;
}

.showHeader-enter-active {
  transition: all 0.25s ease;
}
.showHeader-leave-active {
  transition: all 0.5s ease;
}
.showHeader-enter,
.showHeader-leave-to {
  opacity: 0;
}

.logo {
  position: relative;
  display: inline-block;
  padding-left: 24px;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  ::v-deep {
    svg {
      height: 32px;
      width: 32px;
      vertical-align: middle;
    }
    h1 {
      color: #fff;
      font-size: 20px;
      margin: 0 0 0 12px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      font-weight: 600;
      vertical-align: middle;
      display: inline;
      color: #000;
    }
  }
}
</style>
