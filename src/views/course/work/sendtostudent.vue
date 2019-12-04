<template>
  <div class="app-container">
    <el-form :rules="rules" ref="formData" :model="formData" label-width="120px" size="small">
      <el-row>
        <el-col :span="12">
        <el-form-item label="作业名称" prop="ansName">
          <el-input v-model="formData.ansName" />
        </el-form-item>
      </el-col>
      <el-col :span="12" style="padding-left: 20px;">
          <el-button type="primary" size="small" @click="getWorkListFuc">查找作业库</el-button>
      </el-col>
      </el-row>
        <el-form-item label="发送对象" prop="classesId">
          <span v-model="formData.classesId">{{this.cname}}</span>
        </el-form-item>
        <el-form-item label="作业内容" prop="ansQuestion">
        <el-tabs v-model="activeName">
            <el-tab-pane label="自定义" name="first">
                <div>
                <tinymce v-model="formData.ansQuestion" :height="500" :width="800"/>
                </div>
                <div class="editor-content" v-html="content" style="display:none;">
                </div>
            </el-tab-pane>
            <!--<el-tab-pane label="作业库" name="second">
            </el-tab-pane>-->
        </el-tabs>
        </el-form-item>

      <el-row style="margin-top:20px;">
      <el-col :span="12" style="text-align:center;">
        <el-button type="primary" size="small" @click="sendToStudentFuc()">发送</el-button>
        <el-button type="primary" size="small" @click="onCancel()">取消</el-button>
      </el-col>
      </el-row>
    </el-form>

    <el-dialog :visible.sync="dialogFormVisible" style="height:500px">
      <el-row style="margin-bottom: 15px;">
        <el-col :span="12">
          <el-input placeholder="请输入内容" v-model="searchName"size="small"/>
      </el-col>
      <el-col :span="12" style="padding-left: 20px;text-align:right;">
          <el-button type="primary" size="small" @click="getWorkListFuc()">搜索</el-button>
      </el-col>
      </el-row>
        <el-table :data="workData" tooltip-effect="dark" style="width: 100%">
          <el-table-column label="作业名称" prop="ansName">
          </el-table-column>
          <el-table-column prop="userName" label="发布人">
          </el-table-column>
          <el-table-column prop="sendTime" label="发布时间" show-overflow-tooltip>
            <template slot-scope="scope">
              {{scope.row.mdfDtm.substr(0,10)}}
          </template>
          </el-table-column>
          <el-table-column>
              <template slot-scope="scope">
              <el-button @click="workDetailFuc(scope.row)" type="text" size="small">预览</el-button>
              <el-button @click="checkWorkFuc(scope.row)" type="text" size="small">选择</el-button>
            </template>
          </el-table-column>
        </el-table>
    </el-dialog>
  </div>
</template>
<script>

import Dropzone from '@/components/Dropzone'
import Tinymce from '@/components/Tinymce'

export default {
  components: { Dropzone , Tinymce },
  data() {
    return {
      start:1,
      formData: {
        ansQuestion: '',
        ansName: '',
        classesId: ""
      },
      institutionalId: this.$store.getters.orgid,
      activeName: 'first',
      classesData:[],
      rules: {
        ansName: [
          { required: true, message: '请输入作业名称', trigger: 'blur' }
        ],
        ansQuestion: [
          { required: true, message: '请输入作业内容', trigger: 'blur' },
          { min: 5, message: '长度至少5 个字符', trigger: 'blur' }
        ],
        classesId:[
          { required: true, message: '发送班级不能为空', trigger: 'change' },
        ],
      },
      dialogFormVisible: false,
      content: '请输入作业内容',
      workData: [],
      cid:'',
      cname:'',
      searchName: ''
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$router.back(-1);
    },
    addWorkFuc(){
      this.$store.dispatch('work/addTask', this.formData).then((response) => {
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
    },
    getClassListFuc(){
        this.loading = true
        this.$store.dispatch('classes/findClassesInstitutionalPage',{institutionalId: this.institutionalId,start:this.start,studentId:'0',name:""}).then((response) => {
            this.classesData = response.data
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
    },
    getWorkListFuc(){
      this.$store.dispatch('work/findTaskPage',{institutionalId: this.institutionalId, courseId:0, ansName:this.searchName,start:this.start}).then((response) => {
          this.dialogFormVisible = true;
          this.workData = response.data
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
    },
    workDetailFuc(data){
        let routeUrl = this.$router.resolve({path: '/course/work/detail', query : {id : data.id, courseId: data.courseId, type: 'detail'}})
        window.open(routeUrl .href, '_blank')
    },
    checkWorkFuc(data){
      var _this = this
      this.$store.dispatch('work/findTaskByIdAndCourseId',{courseId: data.courseId, id: data.id}).then((response) => {
          //this.formData = response.data
          _this.formData.ansName = response.data.ansName
          _this.formData.ansQuestion = response.data.ansQuestion
          _this.content = response.data.ansQuestion
          console.log(_this.formData)
          _this.dialogFormVisible = false
          _this.loading = false
        }).catch(() => {
          _this.loading = false
        })
    },
    sendToStudentFuc(){
      console.log(this.formData)
      this.$refs['formData'].validate((valid) => {
                if (valid) {
                  let data = {
                    title: this.formData.ansName,
                    question: this.formData.ansQuestion,
                    institutionalId: this.institutionalId,
                    classesId: this.formData.classesId,
                  }
                   this.$store.dispatch('work/addItemClassTask', data).then((response) => {
                      if(response.code == 1){
                        this.$message({ message: response.mess, type: 'success' })
                        this.$router.push({ path: this.redirect || '/course/class/work' , query:{cid: this.cid,cname:this.cname}})
                      }
                      else
                        this.$message({ message: response.mess})
                      this.loading = false
                    }).catch(() => {
                      this.loading = false
                    })
                } else {
                  this.$message.error('请填写内容后重试');
                  return false;
                }
              });

    }
  },
  created(){
    this.cid = this.$route.query.cid
    this.formData.classesId = this.$route.query.cid
    this.cname = this.$route.query.cname
    this.getClassListFuc()
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
.editor-content{
  margin-top: 20px;
}
</style>
