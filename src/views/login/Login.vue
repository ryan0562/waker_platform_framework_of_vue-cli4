<template>
  <div class="wrap">
    <div class="logo">
      <div class="logo-img"></div>
      <span>企业SaaS能源应用中心</span>
    </div>
    <div class="login-box" v-if="!selectEnterPrise">
      <div class="toggle-box">
        <a-tooltip placement="left" v-show="loginType === 'captcha'" title="密码登录">
          <img src="./assets/computer.png" v-show="loginType === 'captcha'" alt="密码登录" class="toggle-icon"
            @click="toggleLoginType">
        </a-tooltip>
        <a-tooltip placement="left" v-show="loginType === 'password'" title="验证码登录">
          <img src="./assets/phone.png" v-show="loginType === 'password'" alt="验证码登录" class="toggle-icon"
            @click="toggleLoginType">
        </a-tooltip>
        <div class="mask"></div>
      </div>
      <p class="welcome">欢迎登录</p>
      <div class="divider"></div>
      <!-- 密码登录 -->
      <a-form-model ref="passwordForm" :model="passwordForm" :rules="passwordFormRules"
        v-show="loginType === 'password'">
        <a-form-model-item prop="user">
          <a-input placeholder="请输入帐号" v-model="passwordForm.user" allowClear autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item prop="pwd">
          <a-input type="password" v-model="passwordForm.pwd" placeholder="请输入密码" allowClear autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item prop="captcha">
          <a-input placeholder="请输入图片验证码" v-model="passwordForm.captcha" allowClear autocomplete="off"
            @pressEnter="login">
            <img :src="imageCaptchaSrc" alt="图片验证码" slot="addonAfter" @click="refreshImgCaptcha">
          </a-input>
        </a-form-model-item>
      </a-form-model>
      <!-- 验证码登录 -->
      <a-form-model ref="captchaForm" :model="captchaForm" :rules="captchaFormRules" v-show="loginType === 'captcha'">
        <a-form-model-item prop="phone">
          <a-input placeholder="请输入手机号" v-model="captchaForm.phone" allowClear autocomplete="off" :maxLength="11" />
        </a-form-model-item>
        <a-form-model-item prop="captcha">
          <a-input placeholder="请输入验证码" v-model="captchaForm.captcha" allowClear autocomplete="off" @pressEnter="login">
            <a-button type="link" size="small" slot="addonAfter" class="btn-getCaptcha" :disabled="loading"
              @click="getSMSCaptcha" v-text="this.btnText || '获取验证码'"></a-button>
          </a-input>
        </a-form-model-item>
      </a-form-model>
      <div class="forgetPwd">
        <span @click="toForget">忘记密码</span>
      </div>
      <a-button type="primary" class="btn-login" @click="login">登录</a-button>
      <p class="footer-link">登录代表您已同意<a href="#" @click="openAgreement(1)">《用户协议》</a> 和 <a href="#"
          @click="openAgreement(2)">《隐私政策》</a></p>
    </div>
    <!-- <SelectEnterprise :enterpriseList="enterpriseList" @returnToLogin="returnToLogin" v-else/> -->
    <div class="footer">@中恒电气股份有限公司</div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import SelectEnterprise from "./SelectEnterprise";
import { getSmsCpatcha } from "@/api/login";

export default {
  name: "Login",
  components: {
    // SelectEnterprise,
  },
  data() {
    return {
      loginType: "password",
      loading: false,
      btnText: "",
      timer: null,
      selectEnterPrise: false,
      enterpriseList: [],
      imageCaptchaSrc: "",
      passwordForm: {
        user: "",
        pwd: "",
        captcha: "",
      },
      captchaForm: {
        phone: "",
        captcha: "",
      },
      passwordFormRules: {
        user: [{ required: true, message: "请输入帐号", trigger: "blur" }],
        pwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
      captchaFormRules: {
        phone: [
          { required: true, message: "请输入手机号" },
          {
            pattern: this.$regExp.phone,
            message: "请输入正确的手机号",
            trigger: "blur",
          },
        ],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
    };
  },
  computed: {
    // ...mapGetters(['token']),
  },
  methods: {
    ...mapActions(["Login"]),
    toggleLoginType() {
      this.loginType = this.loginType === "password" ? "captcha" : "password";
    },
    refreshImgCaptcha() {
      this.imageCaptchaSrc = `/api/sso/captcha/img?${Date.now()}`;
    },
    clockTask(sec) {
      if (sec === 0) {
        this.btnText = "";
        this.loading = false;
        clearTimeout(this.timer);
        return;
      }
      this.btnText = `${sec}秒后重新获取`;
      this.timer = setTimeout(() => {
        this.clockTask(sec - 1);
      }, 1000);
    },
    getSMSCaptcha() {
      this.$refs.captchaForm.validateField("phone", (error) => {
        if (error) return;
        getSmsCpatcha({
          phone: this.captchaForm.phone,
        }).then((res) => {
          this.loading = true;
          this.clockTask(60);
        });
      });
    },
    login() {
      const { Login } = this;
      const { phone, captcha } = this.captchaForm;
      const { user, pwd, captcha: imgCaptcha } = this.passwordForm;
      this.$refs[`${this.loginType}Form`].validate((valid) => {
        if (!valid) return;
        if (this.loginType === "password") {
          const imageCodeId = this.$cookies.get("imgCodeToken");
          Login({
            type: "img",
            userName: user,
            password: pwd,
            imageCode: imgCaptcha,
            imageCodeId,
            clientType: "web",
            platformType: "saas",
          })
            .then((res) => this.loginSuccess(res))
            .catch((err) => this.requestFailed(err))
            .finally(() => {
              // state.loginBtn = false
            });
        } else if (this.loginType === "captcha") {
          Login({
            type: "sms",
            phone,
            smsCode: captcha,
            clientType: "web",
            platformType: "saas",
          })
            .then((res) => this.loginSuccess(res))
            .catch((err) => this.requestFailed(err))
            .finally(() => {
              // state.loginBtn = false
            });
        }
      });
    },
    loginSuccess(res) {
      // this.$router.push({ path: '/' })
      location.href = location.origin
    },
    requestFailed(err) {
      
      this.$notification["error"]({
        message: "错误",
        description: (err || {}).message || "请求出现错误，请稍后再试",
        duration: 4,
      });
    },
    toForget() {
      this.$router.push({ path: "/forget" });
    },
    returnToLogin() {
      this.selectEnterPrise = false;
    },
    openAgreement(type) {
      const url = type === 1 ? "/user agreement.pdf" : "/privacy policy.pdf";
      window.open(url);
    },
  },
  created() {
    if (this.$route.query.haveLogin === true) {
      this.loginSuccess();
    }
    this.refreshImgCaptcha();
  },
  berforeDestory() {
    clearTimeout(this.timer);
  },
};
</script>

<style lang="less" scoped>
@import "./style.less";
</style>
