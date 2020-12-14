<template>
  <div class="user-wrapper">
    <span class="header-menu" @click="toSaasManager">
      <iconfont type="iconnbeifen7" />
      <span>管理中心</span>
    </span>
    <span class="header-menu" @click="appNavigation">
      <iconfont type="iconnbeifen6" />
      <span>应用导航</span>
    </span>
    <a-dropdown>
      <span class="action">
        <a-avatar class="avatar" :src="$store.state.user.info.avatar" />
        <span>{{ $store.state.user.info.realname }}</span>
        <iconfont type="iconzhankai" />
      </span>
      <a-menu slot="overlay" class="user-dropdown-menu-wrapper">
        <a-menu-item key="0">
          <router-link :to="{ name: 'center' }">
            <iconfont type="user" />
            <span>个人中心</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="1">
          <router-link :to="{ name: 'settings' }">
            <iconfont type="setting" />
            <span>账户设置</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="2" disabled>
          <iconfont type="setting" />
          <span>测试</span>
        </a-menu-item>
        <a-menu-divider />
        <a-menu-item key="3">
          <a href="javascript:;" @click="handleLogout">
            <iconfont type="logout" />
            <span>退出登录</span>
          </a>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>

<script>
import NoticeIcon from '@/components/NoticeIcon'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'UserMenu',
  components: {
    NoticeIcon,
  },
  computed: {
    // ...mapGetters(['nickname', 'avatar']),
  },
  methods: {
    ...mapActions(['Logout']),
    toSaasManager () {
      this.$message.success('前往saas管理中心')
    },
    appNavigation () {
      this.$message.success('应用导航')
    },
    handleLogout () {
      this.$confirm({
        title: '提示',
        content: '真的要注销登录吗 ?',
        onOk: () => {
          return this.Logout({})
            .then(() => {})
            .catch(err => {
              this.$message.error({
                title: '错误',
                description: err.message,
              })
            })
        },
        onCancel () {},
      })
    },
  },
}
</script>
<style lang="less" scoped>
.user-wrapper {
  float: right;
  height: 100%;
  padding-right: 10px;
}

.header-menu,
.action {
  float: left;
  cursor: pointer;
  padding: 0 12px;
  transition: all 0.3s;
  height: 100%;
  font-size: 14px;
  font-weight: 400;
  padding: 0 16px;
  border-left: 1px solid rgba(10, 24, 51, 0.1);
  vertical-align: top;
  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
  .iconfont {
    font-size: 24px;
    margin-right: 4px;
  }
  .avatar {
    height: 30px;
    width: 30px;
    vertical-align: middle;
    margin-right: 10px;
  }
}
</style>
