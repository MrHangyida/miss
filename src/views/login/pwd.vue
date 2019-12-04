<template>
  <div class="app-container">
   <div class="title-container">
        <h3 class="title">
            <img class="pic-logo" src="@/assets/images/logo.png" alt="logo">
        </h3>
      </div>
    <el-form :rules="rules"  ref="pwdForm" :model="formData" label-width="120px" size="small">
      <el-row>
        <el-col :span="12" :offset="6">
        <el-form-item label="手机号" prop="phone">
          <el-row>
          <el-col :span="18"><el-input v-model="formData.phone" /></el-col>
          <el-col :span="5" :offset="1"><el-button type="primary" size="small" @click="getCheckcode();">获取验证码</el-button></el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="formData.code" />
        </el-form-item>
        <el-form-item label="设置密码" prop="password">
          <el-input v-model="formData.password" type="password"  show-password/>
        </el-form-item>
        <el-form-item label="再次输入密码" prop="repwd">
          <el-input v-model="formData.repwd" type="password"  show-password/>
        </el-form-item>
      </el-col>
      </el-row>
      <el-row style="margin-top:20px;">
      <el-col :span="12" :offset="6" style="text-align:center;">
        <el-button type="primary" size="small" style="width:200px;" @click="onSubmit();">修改密码</el-button>
      </el-col>
      </el-row>
    </el-form>
    <Footer/>
  </div>
</template>
<script>
import { validPhone } from '@/utils/validate'
import Footer from '@/layout/components/Footer.vue'

export default {
  components: {
    Footer
  },
  data() {
    const validatePhone = (rule, value, callback) => {
       if (!validPhone(value)){
          callback(new Error('请输入电话号码'))
      }else  if (!validPhone(value)){
        callback(new Error('请输入正确的11位手机号码'))
      }else {
          callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if(this.password == '' || this.repwd == ''){
        callback(new Error('密码不能为空'))
      }
      else if (this.password != this.repwd){
          callback(new Error('两次输入的密码必须相同'))
      }else {
          callback()
      }
    }
    return {
      formData: {
        phone: '',
        password: '',
        repwd: '',
        code: ''
      },
      rules: {
        phone: [{ required: true, trigger: 'blur', validator: validatePhone}],
        code: [{ required: true, trigger: 'blur', message: '验证码不能为空'}],
        password: [{ required: true, trigger: 'blur', validator: validatePassword}],
        repwd: [{ required: true, trigger: 'blur', validator: validatePassword}]
      },
      dialogFormVisible: false,
    }
  },
  methods: {
    onSubmit() {
      this.$refs.pwdForm.validate(valid => {
        if (valid) {
          this.$store.dispatch('user/retrievePassword', this.formData).then(() => {
            this.$router.push({ path: '/login' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getCheckcode() {
      this.$store.dispatch('user/sendUserUpdateCode', this.formData).then(() => {
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}

  .title-container {
    width: 100%;
    text-align: center;
  }
  .pic-logo {
    width: 100px;
    height: auto;
  }
</style>

