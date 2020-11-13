<template>
  <div class="login-box">
    <p class="welcome">选择企业...</p>
    <ul class="enterprise-ul">
      <li
        v-for="(item, index) in enterpriseList"
        :key="item.id"
        :title="item.name"
        :class="selectedId === item.id ? 'active' : ''"
        @click="onSelect(item.id)"
        @mouseenter="onHover(index)"
        @mouseleave="onBlur()">
        <iconfont type="iconnbeifen1" style="float: left; font-size: 24px; margin-top: 3px"/>
        <span class="enterprise-name">{{ item.name }}</span>
        <iconfont type="iconqiyexuanzhong" style="float: right; font-size:24px; margin-top: 3px" v-show="index === hoverIndex || selectedId === item.id"/>
      </li>
    </ul>
    <a-button type="primary" class="btn-login" @click="login">进入</a-button>
    <div class="btn-return" @click="returnLogin">
      <span>返回登录</span>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  props: {
    enterpriseList: {
      type: Array,
      required: true,
    },
  },
  data () {
    return {
      hoverIndex: '',
      selectedId: '',
    }
  },
  computed: {
    ...mapGetters(['token']),
  },
  methods: {
    ...mapActions(['SetCompanyId', 'GetCanUseSystemList']),
    onHover (hoverIndex) {
      this.hoverIndex = hoverIndex
    },
    onBlur () {
      this.hoverIndex = ''
    },
    onSelect (id) {
      this.selectedId = id
    },
    login () {
      this.SetCompanyId(this.selectedId).then(res => {
        this.GetCanUseSystemList(this.selectedId).then(res => {
          const appIds = (this.$map.appList || []).map(item => item.id)
          const canUseAppList = res.dataList.filter(item => appIds.includes(item.id))
          if (canUseAppList.length === 1) {
            const appId = canUseAppList[0].id
            if (process.env.NODE_ENV === 'development') {
              window.location.replace(`${(this.$map.devSystemUrlMap || {})[appId]}/?token=${this.token}&companyId=${this.selectedId}`)
            } else {
              window.location.replace(`${canUseAppList[0].frontpath}/?token=${this.token}&companyId=${this.selectedId}`)
            }
          } else {
            this.$router.push('/')
          }
        })
      })
    },
    returnLogin () {
      this.$emit('returnToLogin')
    },
  },
  mounted () {
    this.selectedId = this.enterpriseList[0].id
  },
}
</script>
<style lang="less" scoped>
@import './style.less';

.login-box {
  padding: 36px 32px 20px!important;
  .welcome {
    margin-bottom: 24px !important;
  }
  .enterprise-ul {
    width: 272px;
    list-style: none;
    padding: 0px;
    li {
      width: 100%;
      height: 30px;
      line-height: 30px;
      padding: 0 8px;
      background: #F2F2F2;
      margin-top: 2px;
      margin-right: 0;
      font-size: 14px;
      font-weight: 400;
      color: #000;
      cursor: pointer;
      &.active,
      &:hover {
        color: #fff;
        background-color: #3377FF;
      }
      >.enterprise-name {
        display: inline-block;
        width: 208px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .btn-login {
    margin-top: 26px !important;
  }
  .btn-return {
    margin-top: 16px;
    font-size: 12px;
    font-weight: 400;
    text-align: center;
    &>span {
      cursor: pointer;
    }
  }
}
</style>
