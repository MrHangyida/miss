<template>
  <div class="app-container">
    <el-form :rules="rules" ref="formData" :model="formData" label-width="120px" size="small">
      <div class="tag-style" style="margin-bottom:30px;width:100%;">基本信息</div>

      <el-row>
        <el-col :span="12">
        <el-form-item label="logo" prop="logo">
          <el-upload
          class="avatar-uploader"
          action="https://v0.api.upyun.com/xql-test-oss/wxapp/demo/"
          :show-file-list="false"
          :before-upload="beforeAvatarUpload"
          ref="upload"
          :http-request="onUpload"
          >
          <img v-if="logo" :src="logo" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="机构名称" prop="orgName">
          <el-input v-model="formData.orgName" />
        </el-form-item>
        <el-form-item label="机构简称" prop="nickName">
          <el-input v-model="formData.nickName" />
        </el-form-item>
        <el-form-item label="机构简介" prop="remarks">
          <el-input type="textarea" v-model="formData.remarks" />
        </el-form-item>
        <el-form-item label="企业地址" prop="address">
          <el-input v-model="formData.address" />
        </el-form-item>
      </el-col>
      </el-row>

      <div class="tag-style" style="margin-bottom:30px;width:100%;">企业联系人</div>
      <el-row>
        <el-col :span="12">
        <el-form-item label="联系人姓名" prop="personName">
          <el-input v-model="formData.personName" />
        </el-form-item>
        <el-form-item label="联系电话" prop="personPhone">
          <el-input v-model="formData.personPhone" />
        </el-form-item>
      </el-col>
      </el-row>
      <el-row style="margin-top:20px;">
      <el-col :span="12" style="text-align:center;">
        <el-button type="primary" size="small" class="el-button_fc8433" @click="onSubmit()">提交</el-button>
        <!-- <el-button type="primary" size="small" class="el-button_fc8433" @click="onCancel()">推广</el-button> -->
        <el-button type="primary" size="small" class="el-button_fc8433" @click="dialogFormVisible=true">推广</el-button>
      </el-col>
      </el-row>
    </el-form>

    <el-dialog width="20%" :visible.sync="dialogFormVisible"  @opened="qrcode()">
      <div style="margin: 0 auto; width: 132px; ">
        <div id="qrCode" ref="qrcodeRef"></div>
      </div>
      <br/>
      <br/>
      <div style="text-align: center">打开微信扫一扫，查看推广页面</div>
    </el-dialog>
  </div>
</template>
<script>
import Dropzone from '@/components/Dropzone'
import { validPhone } from '@/utils/validate'
import crypto from 'crypto'
import QRCode from 'qrcodejs2'

export default {
  components: { Dropzone },
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
    return {
      dialogFormVisible:false,
      genFlag:false,
      url:'http://edu.sgj.xyz/#/spread',
      formData: {
        logo: '',
        orgName: '',
        nickName: '',
        remarks: '',
        address: '',
        personName: '',
        personPhone:'',
        orgId: this.$store.getters.orgid
      },
      rules: {
        logo: [{ required: true, trigger: 'blur', message: '机构logo不能为空' }],
        orgName: [{ required: true, trigger: 'blur', message: '机构名称不能为空' }],
        nickName: [{ required: true, trigger: 'blur', message: '机构简称不能为空'}],
        remarks: [{ required: true, trigger: 'blur', message: '机构简介不能为空'}],
        address: [{ required: true, trigger: 'blur', message: '企业地址不能为空'}],
        personName: [{ required: true, trigger: 'blur', message: '联系人不能为空'}],
        personPhone: [{ required: true, trigger: 'blur', validator: validatePhone, message: '请填写正确的手机号'}]
      },
      logo: ''
    }
  },
  methods: {
    qrcode () {
      this.loading=true;
      let url=this.url;
      if(!this.genFlag&&url){
        let qrcodeObj = new QRCode(this.$refs.qrcodeRef, {
          width: 132,
          height: 132,
          text: url, // 二维码地址
          colorDark : "#000",
          colorLight : "#fff",
        });
        this.genFlag=true;
      }
    },
    onCancel() {
      this.$router.back(-1);
    },
    onSubmit() {
      var that = this
        that.$refs.formData.validate(valid => {
        if (valid) {
          that.loading = true
          that.$store.dispatch('manage/updateOrg', that.formData).then(() => {
            this.loading = false
              this.$message({
                      message: '恭喜你，修改组织机构成功',
                      type: 'success'
                    });
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getInfoFuc(){
      this.loading = true
        this.$store.dispatch('manage/findOrganById', this.formData).then((response) => {
          this.loading = false
          this.formData = response.data
          if(response.data.logo != null && response.data.logo != '')
            this.logo =  this.$store.getters.upyun_url + response.data.logo
        }).catch(() => {
          this.loading = false
        })
    },
    dropzoneS(file) {
      this.$message({ message: 'Upload success', type: 'success' })
    },
    dropzoneR(file) {
      this.$message({ message: 'Delete success', type: 'success' })
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const jsPNG = file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !jsPNG) {
        this.$message.error('上传头像只能是jpg 或者 png 图片!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return (isJPG || jsPNG) && isLt2M;
    },
    onUpload(param){
      this.$store.dispatch('upyun/upload', {imagefile: param.file, orgId: this.formData.orgId}).then((response) => {
        this.logo = URL.createObjectURL(param.file);
        var md5 = crypto.createHash("md5");
        md5.update(param.file.name);
        var name = md5.digest('hex');
        this.formData.logo = response + name
        this.loading = false
        }).catch(() => {
          this.loading = false
        })
    }
  },
  created(){
    this.getInfoFuc()
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
