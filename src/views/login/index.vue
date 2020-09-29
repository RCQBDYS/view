<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">登录</h3>
      </div>
      <el-form-item prop="userAccount">
        <span class="svg-container">
          <!--这里是图标的引用-->
          <svg-icon icon-class="email" />
        </span>
        <el-input
          ref="userAccount"
          v-model="loginForm.userAccount"
          placeholder="用户名"
          name="userAccount"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="passWord">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="passWord"
          v-model="loginForm.passWord"
          :type="passwordType"
          placeholder="密码"
          name="passWord"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <!--是否显示密码-->
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>

      <!--<div class="tips">
        <span style="margin-right:20px;">username: admin</span>
        <span> password: any</span>
      </div>-->

    </el-form>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { validUsername, validNumber, validAlphabets } from '@/utils/validate'

export default {
  name: 'Login',
  data() {
    // 这里是在前端部分对，表单内容提交的验证，对于用户名的验证规范、输入值、返回值
    const validateUsername = (rule, value, callback) => {
      validUsername(value).then(data => {
        const flag = data
        // console.log('flag = ' + flag)
        if (value.length === 0) {
          callback(new Error('账户不能为空'))
        } else if (!flag) {
          callback(new Error('账户不存在'))
        } else if (flag) {
          callback()
        }
      })
    }
    // 对于输入密码的验证
    const validatePassword = (rule, value, callback) => {
      const flag = validNumber(value)
      const flag2 = validAlphabets(value)
      console.log('密码验证' + flag + flag2)
      if (value.length === 0) {
        callback(new Error('密码不能为空'))
      } else if (value.length < 6) {
        callback(new Error('密码不少于六位'))
      } else if (validNumber(value)) {
        callback(new Error('密码必须由字母和数字组成'))
      } else if (validAlphabets(value)) {
        callback(new Error('密码必须由字母和数字组成'))
      } else {
        callback()
      }
    }
    // 当系统运行时，用户登出时，设置默认用户名以及默认密码
    return {
      loginForm: {
        userAccount: '672025',
        passWord: '672025'
      },
      loginRules: {
        userAccount: [{ required: true, trigger: 'blur', validator: validateUsername }],
        passWord: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
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
      // vue validate()方法对整个表单的数据进行验证，element-ui封装好的，调用validate（）校验
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // 当请求接口的时候，将loading改为true，请求之后将 loading该为false，从而实现loading的过度效果
          this.loading = true
          // 接口请求
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            // 请求成功之后跳转的路径
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

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
$bg:#2d3a4b;
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
}
</style>
