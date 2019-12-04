<template>
  <div class="app-container" style="background:#FFF;">
   <div class="title-container">
        <h3 class="title">
            <img class="pic-logo" src="@/assets/images/logo.png" alt="logo">
        </h3>
      </div>
    <el-form :rules="rules" ref="regForm" :model="regForm" label-width="120px" size="small" :label-position="labelPosition">
      <el-row>
        <el-col :span="12" :offset="6">
        <el-form-item label="机构名称" prop="organName" >
          <el-input v-model="regForm.organName" />
        </el-form-item>
        <el-form-item label="您的姓名" prop="personName" >
          <el-input v-model="regForm.personName" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone" >
          <el-row>
          <el-col :span="18"><el-input v-model="regForm.phone" /></el-col>
          <el-col :span="5" :offset="1"><el-button type="primary" size="small" @click="getCheckcode()">获取验证码</el-button></el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="验证码" prop="code" >
          <el-input v-model="regForm.code" />
        </el-form-item>
        <el-form-item label="设置密码" prop="password" >
          <el-input v-model="regForm.password" type="password" show-password/>
        </el-form-item>
        <el-form-item label="再次输入密码"  prop="repassword" >
          <el-input v-model="regForm.repassword" type="password"  show-password/>
        </el-form-item>
      </el-col>
      </el-row>
      <el-row style="margin-top:20px;">
      <el-col :span="12" :offset="6" style="text-align:center;">
        <el-button type="primary" size="small" style="width:200px;" @click="onSubmit()">注册</el-button>
      </el-col>
      </el-row>
    </el-form>
    <Footer/>
  </div>
</template>
<script>

import Dropzone from '@/components/Dropzone'
import { validPhone } from '@/utils/validate'
import Footer from '@/layout/components/Footer.vue'

export default {
  components: { Dropzone,Footer },
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
      if(!value){
        callback(new Error('密码不能为空'))
      }
      else if (value != this.regForm.repassword){
          callback(new Error('两次输入的密码必须相同'))
      }else {
          callback()
      }
    }
    const validatePassword1 = (rule, value, callback) => {
      if(!value){
        callback(new Error('再次输入密码不能为空'))
      }
      else if (this.regForm.password != value){
          callback(new Error('两次输入的密码必须相同'))
      }else {
          callback()
      }
    }
    return {
      labelPosition:"left",
      regForm: {
        organName: '',
        personName: '',
        phone: '',
        code: '',
        password: '',
        repassword: ''
      },
      rules: {
        organName: [{ required: true, trigger: 'blur', message: '机构名称不能为空'}],
        personName: [{ required: true, trigger: 'blur', message: '姓名不能为空'}],
        phone: [{ required: true, trigger: 'blur', validator: validatePhone, message: '请填写正确的手机号'}],
        code: [{ required: true, trigger: 'blur', message: '验证码不能为空'}],
        password: [{ required: true, trigger: 'blur',message: '密码不能为空'}],
        repassword: [{ required: true, trigger: 'blur', message: '重复密码不能为空'}]
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.regForm.validate(valid => {
        if (valid) {
          if(this.regForm.repassword!=this.regForm.password){
            this.$message.error("两次密码不一致")
          }
          this.loading = true
          this.$store.dispatch('user/reg', this.regForm).then(() => {
            this.$router.push({ path: '/login' })
            this.loading = false
          }).catch((e) => {
            if(e.response&&e.response.data&&e.response.data.mess){
              this.$message.error(e.response.data.mess)
            }
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getCheckcode() {
      this.$store.dispatch('user/getCheckCode', this.regForm).then(() => {
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

