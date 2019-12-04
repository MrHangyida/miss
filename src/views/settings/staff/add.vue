<template>
  <div class="app-container">
    <el-form :rules="rules" ref="formData" :model="formData" label-width="120px" size="small">
      <div class="tag-style" style="margin-bottom:30px;width:100%;">基本信息</div>
      <el-row>
        <el-col :span="12">
        <el-form-item label="姓名" prop="userName" >
          <el-input v-model="formData.userName" />
        </el-form-item>
        <el-form-item label="性别"  prop="sex">
          <el-radio-group v-model="formData.sex">
            <el-radio label="男" />
            <el-radio label="女" />
          </el-radio-group>
        </el-form-item>

        <el-form-item label="出生日期" prop="birthday">
          <el-col :span="11">
            <el-date-picker v-model="formData.birthday" type="date" placeholder="出生日期" style="width: 100%;" />
          </el-col>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="formData.age" />
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="formData.phone" />
        </el-form-item>

        <el-form-item label="照片"   prop="photo">
          <el-upload
          class="avatar-uploader"
          action="https://v0.api.upyun.com/"
          :show-file-list="false"
          :before-upload="beforeAvatarUpload"
          ref="upload"
          :http-request="onUpload"
          @on-change="upload"
          >
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        </el-form-item>
        <el-form-item label="所属部门" prop="deptId">
          <el-select v-model="formData.deptId" placeholder="选择部门" style="width:30%">
              <el-option v-for="item in deptData" :key="item.id" :label="item.deptName" :value="item.deptId">
              </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label=""  prop="teacherFlag">
          <el-checkbox v-model="formData.teacherFlag">该员工为老师,允许登陆教师端小程序</el-checkbox>
        </el-form-item>
        <el-form-item v-if="formData.teacherFlag" label="账号"  prop="loginName" >
          <el-input v-model="formData.loginName" />
        </el-form-item>
        <el-form-item  v-if="formData.teacherFlag" label="密码" prop="password">
          <el-input v-model="formData.password" :disabled="inputDisabled"/>
        </el-form-item>
       <!-- <el-form-item label="职务权限">
          <el-input v-model="formData.name" />
        </el-form-item> -->
      </el-col>
      </el-row>
      <el-row style="margin-top:20px;">
      <el-col :span="12" style="text-align:center;">
        <el-button type="primary" size="small" class="el-button_fc8433" @click="onSubmit()">确定</el-button>
        <el-button type="primary" size="small" class="el-button_fc8433" @click="onCancel()">取消</el-button>
      </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>

import Dropzone from '@/components/Dropzone'
import crypto from 'crypto'
import { validPhone } from '@/utils/validate'

export default {
  components: { Dropzone },
  data() {
      var valiIcon = (rule, value, callback) => {
         if (!this.formData.photo) {
           callback(new Error('请上传图片'));
         } else {
           callback();
        }
        }
      let valiPwd = (rule, value, callback) => {
         if (value&&value.length>5&&value.length<15) {
           callback();
         } else {
           callback(new Error('请填写密码,且长度在6-15之间'));
        }
        }
      const valiPhone = (rule, value, callback) => {
        if (!validPhone(value)){
          callback(new Error('请输入正确的11位手机号码'))
        }else {
          callback()
      }
    }
    return {
      formData: {
        userName: '',
        sex: '',
        birthday: '',
        age: '',
        phone: '',
        photo: '',
        orgId: '',
        deptId: '',
        loginName: '',
        password: '',
        roleIdSet: 1,
        operatorId: '',
        userId: '',
        teacherFlag:false
      },
      rules: {
        userName: [{ required: true, message: '请输入用户名', trigger: 'blur' },
          {  min:2,max: 10, message: '长度在 10 个字符', trigger: 'blur' }
        ],
        sex:[ { required: true, message: '请选择性别', trigger: 'change' }],
        birthday:[ { required: true, message: '请选择日期', trigger: 'change' }],
        age: [ { required: true, message: '请输入年龄', trigger: 'blur' }, {
          pattern: /^(?:[1-9][0-9]?|1[01][0-9]|120)$/,
          message: '请输入正确年龄'
        }],
        deptId: [ { required: true, message: '请选择所属部门', trigger: 'change' }],
        phone:[{ required: true, validator: valiPhone, trigger: 'blur' }],
        loginName:[
          { required: true, message: '请输入账号', trigger: 'blur' },
           // { min:20, max: 20, message: '长度在 20 个字符', trigger: 'blur' }
          ],
        password:[
          { required: true, validator: valiPwd, trigger: 'blur' },
          // { min: 8, max: 8, message: '长度在 8 个字符', trigger: 'blur' }
          ],
           photo:[
             {required:true, validator: valiIcon, trigger: 'change' }
             // { min: 8, max: 8, message: '长度在 8 个字符', trigger: 'blur' }
             ],
      },
      imageUrl: '',
      deptData:[],
      orgId: this.$store.getters.orgid,
      pages: {
          pageNumber:1,
          rowCount: 10,
          orgId: 0
      },
      inputDisabled:false
    }
  },
  methods: {
    onSubmit() {
      this.formData.orgId = this.orgId
      let data ={...this.formData}
      data.teacherFlag=0;
      if(this.formData.teacherFlag){
        data.teacherFlag=1;
      }
      if(data.teacherFlag==0){
          data.loginName = data.phone;
          data.password = '123456'
      }
      this.$refs.formData.validate(valid => {
        if (valid) {
          this.loading = true
          let path ='';
          if((this.$route.query.userId > 0)){
            path = 'manage/updatePlainUser'
          }
          else{
            path = 'manage/savePlainUser'
          }
          this.$store.dispatch(path , data).then(() => {

            this.$router.push({ path: this.redirect || '/settings/staff' })
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
    onCancel() {
      this.$router.back(-1);

    },
    dropzoneS(file) {
      this.$message({ message: 'Upload success', type: 'success' })
    },
    dropzoneR(file) {
      this.$message({ message: 'Delete success', type: 'success' })
    },

    beforeAvatarUpload(file) {
      const isImage = (file.type === 'image/jpeg' || file.type ==='image/png');
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isImage) {
        this.$message.error('上传头像图片只能是 JPG或PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isImage && isLt2M;
    },
    onUpload(param){
      this.$store.dispatch('upyun/uploadTeacherAvatar', {imagefile: param.file, orgId: this.orgId}).then((response) => {
        this.imageUrl = URL.createObjectURL(param.file);
        var md5 = crypto.createHash("md5");
        md5.update(param.file.name);
        var name = md5.digest('hex');
        this.formData.photo = response + name
          this.loading = false

        }).catch(() => {
          this.loading = false
        })
    },
    upload(file, fileList){

       // this.$refs.formData.validateField(valid => {
       //        if (valid) {
       //            console.log('vue 图片上传钩子函数')
       //        }else{
       //          console.log("buxing")
       //        }
       //    })
    },
    getDeptFuc(){
      this.loading = true
      this.pages.orgId = this.orgId
      this.$store.dispatch('manage/findDeptByPage', this.pages).then(response => {
        this.deptData = response.data
        this.loading = false
        this.dialogFormVisible = false
      }).catch(() => {
        this.loading = false
      })
    },
    getUserDetailFuc(){
      this.loading = true
      this.$store.dispatch('manage/findUserByUserId', {userId: this.$route.query.userId}).then(response => {
       if(response.data.teacherFlag==1){
         response.data.teacherFlag=true;
       }
        this.formData = response.data

        if((this.$route.query.userId > 0)){
          this.formData.password = "******";
          this.inputDisabled=true;
        }

        if(this.formData.sex == 1)
          this.formData.sex = '男'
        else
          this.formData.sex = '女'
        this.imageUrl = this.$store.getters.upyun_url+this.formData.photo
        this.loading = false
        this.dialogFormVisible = false
      }).catch(() => {
        this.loading = false
      })
    }
  },
  mounted() {
    if(this.$route.query.userId > 0){
      this.getUserDetailFuc()
    }
    this.getDeptFuc()
  }
}

</script>

<style scoped>
.line{
  text-align: center;
}
</style>


<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
