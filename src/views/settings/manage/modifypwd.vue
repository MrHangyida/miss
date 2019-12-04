<template>
  <div class="app-container">
    <el-form :rules="rules"  ref="pwdForm" :model="formData" label-width="120px" size="small">
      <el-row>
        <el-col :span="12" :offset="3">
        <el-form-item label="当前密码" prop="org_pwd">
          <el-input v-model="formData.org_pwd" type="password"  show-password/>
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
  </div>
</template>
<script>
import { validPhone } from '@/utils/validate'

export default {
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
        userName: this.$store.getters.name,
        org_pwd: '',
        password: '',
        repwd: ''
      },
      rules: {
        org_pwd: [{ required: true, trigger: 'blur', validator: validatePassword}],
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
          this.$store.dispatch('user/updatePassByNameAndPass', this.formData).then(() => {
            this.$router.push({ path: '/' })
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

