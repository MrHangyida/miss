<template>
  <div class="app-container">
    <el-row style="margin-bottom:20px;">
        <el-col :span="12">
            <el-button type="primary" size="small" @click="updateDutyFuc()">一键签到</el-button>
        </el-col>
        <!--<el-col :span="6" :offset="6" style="text-align:right;">
            <el-input v-model="studentName" placeholder="按名称或学号进行搜索" size="small" style="width:150px;"></el-input>
            <el-button type="primary" size="small">搜索</el-button>
        </el-col>-->
    </el-row>
    <el-table :data="signData" tooltip-effect="dark" style="width: 100%">
    <el-table-column prop="studentId" label="学号">
    </el-table-column>
    <el-table-column prop="rName" label="姓名" show-overflow-tooltip>
    </el-table-column>
    <el-table-column prop="firstPhone" label="联系方式1" show-overflow-tooltip>
    </el-table-column>
    <el-table-column prop="secondPhone" label="联系方式2" show-overflow-tooltip>
    </el-table-column>
    <el-table-column prop="duty_yn" label="签到" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-switch v-model="scope.row.duty_yn"  active-color="#13ce66" inactive-color="#cccccc" @change="changeSwitch(scope.row)">
          </el-switch>
        </template>
    </el-table-column>
    <el-table-column prop="reasonsAbsence" label="缺勤原因" show-overflow-tooltip>
        <template slot-scope="scope" v-if="scope.row.duty_yn==false">
          <input v-model="scope.row.reasonsAbsence" size="small"/>
        </template>
    </el-table-column>
  </el-table>

    <!--<div class="tag-style" style="margin-bottom:30px;width:100%;">上传图片</div>
    <el-row>
        <el-upload
            class="avatar-uploader"
            action="https://v0.api.upyun.com/xql-test-oss/wxapp/demo/"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
            ref="upload"
            :http-request="onUpload"
            >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
    </el-row>-->

    <div class="tag-style" style="margin-bottom:30px;width:100%;"></div>
      <el-row style="margin-top:20px;">
      <el-col :span="24" style="text-align:center;">
        <el-button type="primary" size="small" @click="updateDutyByStudentFuc()">提交签到表</el-button>
        <el-button type="primary" size="small" @click="onCancel()">取消</el-button>
      </el-col>
      </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        formData: [],
        signData: [],
        institutionalId: this.$store.getters.orgid,
        studentName: '',
        imageUrl: '',
        classInfo: {
            classHourId: 0,
            classesId: 0
        }
      }

    },

    methods: {
        onCancel() {
            this.$router.back(-1);
        },
        getListFuc(){
            this.loading = true
            let data = {
                institutionalId: this.institutionalId,
                classesId: this.classesId,
                studentName: ''
            }
            this.$store.dispatch('classes/findClassesStudentByClassesId', data).then((response) => {
                this.formData = response.data
                this.loading = false
            }).catch(() => {
                this.loading = false
            })
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        onUpload(param){
            this.$store.dispatch('upyun/upload', param.file).then((response) => {
                this.imageUrl = URL.createObjectURL(param.file);
                this.formData.cdn = param.file.name
                this.loading = false
                }).catch(() => {
                this.loading = false
            })
        },
        updateDutyFuc(){
            for(var item in this.signData){
                this.signData[item].dutyYn = 'Y'
                this.signData[item].duty_yn = true
            }
           /* let data = {
                institutionalId: this.institutionalId,
                classesId: this.classInfo.classesId,
                classHourId: this.classInfo.classHourId,
                classHourStudentSignList: this.signData
                }
            this.$store.dispatch('classes/updateDuty', data).then((response) => {
                this.$message(response.mess)
               this.$router.push({path: '/course/class/detail', query : {id : this.classInfo.classesId}});
                this.loading = false
                }).catch(() => {
                this.loading = false
            })*/
        },
        updateDutyByStudentFuc(){
             let data = {
                institutionalId: this.institutionalId,
                classesId: this.classInfo.classesId,
                classHourId: this.classInfo.classHourId,
                classHourStudentSignList: this.signData
            }
            this.$store.dispatch('classes/updateDutyByStudentId', data).then((response) => {
               this.$router.push({path: '/course/class/detail', query : {id : this.classInfo.classesId}});
                this.$message(response.mess)

                this.loading = false
                }).catch(() => {
                this.loading = false
            })
        },
        getCourseListFuc(){
            this.loading = true
            let data = {
                institutionalId: this.institutionalId,
                classesId: this.classInfo.classesId,
                classHourId: this.classInfo.classHourId,
                studentName: this.studentName
            }
            this.$store.dispatch('classes/findClassesStudentByClassesId', data).then(response => {
            this.loading = false
            this.signData = response.data
            for(var item in this.signData){
                this.signData[item].dutyYn = 'N'
                this.signData[item].duty_yn = false
                this.signData[item].reasonsAbsence = ''
            }
            }).catch(() => {
            this.loading = false
            })
        },
        changeSwitch(data){
            if(data.duty_yn == true)
                data.dutyYn = 'Y'
            else
                data.dutyYn = 'N'
        },
    },
    created(){
        this.classInfo = this.$route.query
        this.getCourseListFuc()
    }
  }
</script>
