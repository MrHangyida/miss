<template>
  <el-form :model="nameid" status-icon :rules="rules" label-position='left' ref="forms" label-width="80px" class="demo-ruleForm">
    <div class="titlesp">
       <p>孩子信息</p>
      <span></span>
     </div>
    <div class="padding20">
      <el-form-item label="姓名" prop="rName">
        <el-input type="text" v-model="nameid.rName" auto-complete="off" style="width: 80%;"></el-input>
      </el-form-item>
      <span class="myline"></span>
    </div>
    <div class="padding20">
      <el-form-item label="性别" prop="rSexLable">
        <el-radio-group v-model="nameid.rSexLable">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <span class="myline"></span>
    </div>
    <div class="padding20">
      <el-form-item label="出生日期" prop="rBirthday" label-width="104px">
        <div class="content_item">
          <el-input type="text" @focus="birthdayClick"  v-model="nameid.rBirthday" auto-complete="off"
            style="width: 80%;" placeholder="请选择生日"></el-input>
          <!-- <input style="border: none !important;" type="text" readonly autocomplete="off" v-model="nameid.birthday"
            placeholder="请选择生日" /> -->
        </div>
      </el-form-item>
      <span class="myline"></span>
    </div>

    <div class="padding20">
       <el-form-item label="学段" prop="rPeriod">
         <el-select v-model="nameid.rPeriod" placeholder="学段" @change="changePeriod($event)">
           <el-option v-for="item in periodData" :key="item.value" :label="item.label" :value="item.value">
           </el-option>
         </el-select>
       </el-form-item>
      <span class="myline"></span>
    </div>
    <div class="padding20">
       <el-form-item label="年级" prop="rGrade">
         <el-select v-model="nameid.rGrade" placeholder="年级" @change="changerGrade($event)">
           <el-option v-for="item in gradeData" :key="item.value" :label="item.label" :value="item.value">
           </el-option>
         </el-select>
       </el-form-item>
      <span class="myline"></span>
    </div>
    <div class="padding20">
            <el-form-item label="头像">
              <el-upload
              class="avatar-uploader"
              action="https://v0.api.upyun.com/"
              :show-file-list="false"
              :before-upload="beforeAvatarUpload"
              ref="upload"
              :http-request="onUpload"
              >
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            </el-form-item>
      <span class="myline"></span>
    </div>
    <div class="padding20">
      <el-form-item label="孩子所在班级" prop="kidsclass" label-width="107px">
        <el-select v-model="nameid.kidsclass" placeholder="请选择" style="width: 70%;">
          <el-option v-for="item in classList" :key="item.cId" :label="item.cName" :value="item.cId">
          </el-option>
        </el-select>
      </el-form-item>
    </div>
  </el-form>
</template>

<script>
  import crypto from 'crypto'
  export default {
    components: {
    },
    data() {
      return {
        classList:[],
        flag:false,
        periodData:[
          { value: 0, label: '幼儿园' },
          { value: 1, label: '小学' },
          { value: 2, label: '初中' },
          { value: 3, label: '高中' }
        ],
        gradeData:[],
        allGradeData:[
          [{label: '小班' },{label: '中班' },{label: '大班' }],
          [{label: '一年级' },{ label: '二年级' },{ label: '三年级' },{ label: '四年级' },{ label: '五年级' },{ label: '六年级' }],
          [{label: '初一' },{label: '初二' },{label: '初三' }],
          [{label: '高一' },{label: '高二' },{label: '高三' }]
        ],
         dialogFormVisible: false,
         imageUrl: '',
        codename: '验证码',
        radio: 0,
        options: [{
          value: '选项1',
          label: '父亲'
        }, {
          value: '选项2',
          label: '母亲'
        }],
        value: '',
        ruleForm2: {
          birthday: "",
          name: '',
          distinction: '',
          kidsclass: ''
        },
        rules: {
          rName: [{ required: true, message: '请输入学生名称', trigger: 'blur' },
                   {  min:2,max: 10, message: '长度在 10 个字符', trigger: 'blur' }
          ],
         // rBirthday: [{ required: true, message: '请选择出生日期', trigger: 'change' }],
          rPeriod: [{ required: true, message: '请选择学段', trigger: 'blur' }],
          rSex: [{ required: true, message: '请选择性别', trigger: 'change' }],
          rGrade: [{ required: true, message: '请选择班级', trigger: 'change' }],
          kidsclass: [{ required: true, message: '请选择班级', trigger: 'change' }],
        },
      }
    },
    props: ['nameid'],
    watch: {

    },
    created() {

    },
    mounted() {
  this.getclasslist()

    },
    methods: {
      pickPic(rest) { /*选择照片成功后回调函数*/
        setTimeout(function() {
          Indicator.close();
        }, 200)
        let that = this;
        let fickedFile = rest.file; // 选中的文件对象
        rest && that.imgList.push(rest.path)
        console.log(rest);
        //... 上传图片逻辑
      },
      deletePic(rest) {
        let that = this;
        let index = that.imgList.indexOf(rest);
        that.imgList.splice(rest, 1)
      },
      birthdayClick() {
        var that = this
        this.$picker.show({
          type: 'datePicker',
          date: '1990-01-01',
          endTime: '2100-01-01', //截至时间
          startTime: '1930-01-01', //开始时间
          onOk: (date) => {
            that.nameid.rBirthday = date+""; // birthday就是所需字段，在data 里定义下
          }
        })
      },
      successpicuter(response, file, fileList){
        console.log(file,fileList)
      },
      submit() {
        this.$refs["forms"].validate((valid) => {
          if (valid) {
                this.flag = true
          } else {
            console.log('error submit!!');
             this.flag = false
            return false;
          }
        });
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
      this.$store.dispatch('upyun/uploadStudentAvatar', {imagefile: param.file, orgId:18}).then((response) => {
        this.imageUrl = URL.createObjectURL(param.file);
        var md5 = crypto.createHash("md5");
        md5.update(param.file.name);
        var name = md5.digest('hex');
        this.nameid.cdn = response + name
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
    },
    changePeriod(prov){
      let datas = []
      this.nameid.rGrade = ''
      this.nameid.rPeriod = this.periodData[prov].label
      for (var val of this.allGradeData[prov]) {
          datas.push({label: val.label,value: val.label})
      }
      this.gradeData = datas
    },
    changerGrade(prov){
       this.nameid.rGrade = prov
         console.log( this.nameid.rGrade)
    },
    getclasslist(){
           this.$store.dispatch('H5api/getfindclasslist', {institutionalId:18}).then((response) => {
              this.classList = response.data
             
        }).catch(() => {
         
          this.loading = false
        })
    }
    }
  }
</script>

<style>
  .padding20 {
    padding: 0 0 15px 0;
  }

  .avatar-uploader .el-upload {
      border: 1px #d9d9d9;
      border-radius: 20px;
      background-color: #d9d9d9;
      width: 34px;
      height: 34px;
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
  .el-upload-list--picture-card .el-upload-list__item{
        overflow: hidden;
        background-color: #fff;
        border-radius:20px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
         width: 34px;
         height: 34px;
        margin: 0 8px 8px 0;
        display: inline-block;
  }
  .titlesp{
    position: relative;
    padding: 27px;
  }
  .titlesp p{
  color: #3D52F8;
      z-index: 21112;
      position: absolute;
      left: 0;
      top: 0px;
  }
  .titlesp span{
      width: 74px;
      height: 7px;
      background: #FDDF3C;
      position: absolute;
      left: 0;
      z-index: 1;
      top: 27px;
  }
</style>
