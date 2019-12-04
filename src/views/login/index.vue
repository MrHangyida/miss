<template>
  <div class="login-container"  v-if="isReload">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">
            <img class="pic-logo" src="@/assets/images/logo.png" alt="logo">
        </h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="用户名"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>

      <div class="tips">
        <el-button type="text" style="margin-right:20px;" @click="go2Reg()">注册</el-button>
        <el-button type="text"  @click="go2Pwd()">忘记密码</el-button>
      </div>

    </el-form>
    <Footer/>
    <div class="fotter">
      <el-row>
        <el-col :span="24"><div class="grid-content bg-purple-dark">京ICP备19040199号-1 <img src="http://video.sgj.xyz/icon.png" alt="" style="position:relative; top:5px;"> </div></el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import Footer from '@/layout/components/Footer.vue'

export default {
  name: 'Login',
  components: {
    Footer
  },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: '',
        grant_type: 'password'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur' , message: '用户名不能为空'}],
        password: [{ required: true, trigger: 'blur', message: '密码不能为空'}]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      // 默认不显示页面内容,防止vuex中存在脏数据
      isReload: false
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        //此方法可能在登陆的时候会出现重定向后丢失参数
        //this.redirect = route.query && route.query.redirect
        //所以直接使用fullPath里面的路径
        if(route.path=="/login"&&route.fullPath&&route.fullPath.indexOf("?redirect=")){
          try{
            this.redirect =decodeURIComponent(route.fullPath.split("?redirect=")[1])
          }catch (e) {
            console.log(e);
            this.redirect = route.query && route.query.redirect
          }
        }else{
          this.redirect = route.query && route.query.redirect
        }
      },
      immediate: true
    }
  },
  created() {
    if (this.$store.getters.token||this.$store.getters.orgid) { // 判断是否已经刷新
      return window.location.reload()
    }
    // 正式显示页面内容
    this.isReload = true
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then((res) => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch((e) => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    go2Reg() {
      this.$router.push({path: '/reg', params : {id : 1}});
    },
    go2Pwd() {
      this.$router.push({path: '/pwd', params : {id : 1}});
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

//$bg:#283443;
$bg:#eee;
$light_gray:#000;
$cursor: #000;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
//$bg:#2d3a4b;
$bg:#fff;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    text-align: right;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .pic-logo {
    width: 100px;
    height: auto;
  }
  .fotter{
    width: 100%;
    position: fixed;
    bottom: 50px;
    text-align: center;
    color: #666666;
    width: 100%;
  }
}
</style>
