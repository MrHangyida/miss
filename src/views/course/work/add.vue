<template>
  <div class="app-container">
    <el-form :rules="rules" ref="formData" :model="formData" label-width="120px" size="small">
      <el-row>
        <el-col :span="12">
        <el-form-item label="作业名称" prop="ansName">
          <el-input v-model="formData.ansName" />
        </el-form-item>
      </el-col>
      </el-row>
      <el-form-item label="选择课程" prop="courseId">
          <el-select v-model="formData.courseId" filterable placeholder="请选择">
            <el-option
              v-for="item in courseData"
              :key="item.courseId"
              :label="item.name"
              :value="item.courseId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作业内容" prop="ansQuestion">
        <el-tabs v-model="formData.ansQuestion"  @tab-click="handleClick" >
            <!--<el-tab-pane label="出题" name="first">
                <el-button type="primary" size="small">1</el-button>
            </el-tab-pane>-->
            <!--<el-tab-pane label="自定义" name="second">-->
                <div>
                <tinymce v-model="formData.ansQuestion" :height="500" :width="800"/>
                </div>
                <div class="editor-content" v-html="content" style="display:none;">
                </div>
            <!--</el-tab-pane>-->
            <!--<el-tab-pane label="上传" name="third">
                <el-button type="primary" size="small">3</el-button>
            </el-tab-pane>-->
        </el-tabs>
        </el-form-item>
      <el-row style="margin-top:20px;">
      <el-col :span="12" style="text-align:center;">
        <el-button type="primary" size="small" @click="addWorkFuc()">{{button_name}}</el-button>
        <el-button type="primary" size="small" @click="workDetailFuc()">预览</el-button>
        <el-button type="primary" size="small" @click="onCancel()">取消</el-button>
      </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>

import Dropzone from '@/components/Dropzone'
import Tinymce from '@/components/Tinymce'

export default {
  components: { Dropzone , Tinymce },
  data() {
    return {
      formData: {
        ansQuestion: " ",
        ansName: '',
        courseId: '',
        teacherId: 1,
        ansStatus: 1,
        institutionalId: this.$store.getters.orgid
      },
      courseData:[],
      rules: {
        ansName: [
          { required: true, message: '请输入作业名称', trigger: 'blur' }
        ],
        ansQuestion: [
          { required: true, message: '请输入作业内容', trigger: 'blur' },
          { min: 5, message: '长度至少5 个字符', trigger: 'blur' }
        ],
        courseId:[
           { required: true, message: '请选择课程', trigger: 'change' },
        ]
      },
      dialogFormVisible: false,
      content: '请输入作业内容',
      button_name: '确定添加'
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$router.back(-1);
    },
    handleClick(tab, event) {
        console.log(tab, event);
    },
    workDetailFuc(){
      this.formData.type = 'preview'
      let routeUrl = this.$router.resolve({path: '/course/work/detail', query : this.formData})
      window.open(routeUrl .href, '_blank')
    },
    addWorkFuc(){
     this.$refs["formData"].validate((valid) => {
               if (valid) {
                if(this.$route.query.type == 'edit'){
                  this.editWorkFuc()
                  return
                 }
                  this.$store.dispatch('work/addTask', this.formData).then((response) => {
                      this.loading = false
                        console.log(response)
                      if(response.code == 1){
                        this.$message({ message: response.mess, type: 'success' })
                        this.$router.push({ path: this.redirect || '/course/work' })
                      }
                      else
                        this.$message({ message: response.mess})
                    }).catch(() => {
                      this.loading = false
                    })
               } else {
                 return false;
               }
             });

    },
    editWorkFuc(){
      let data = this.formData
      data.id = this.$route.query.id
      this.$store.dispatch('work/updateTask', data).then((response) => {
          this.loading = false
          this.$router.push({ path: this.redirect || '/course/work' })
        }).catch(() => {
          this.loading = false
        })
    },
    getCourseListFuc(){
        this.loading = true
        this.$store.dispatch('course/findCoursePage', {institutionalId: this.formData.institutionalId,start:1, campusId: this.formData.institutionalId}).then(response => {
          this.loading = false
          this.courseData = response.data
        }).catch((e) => {
          console.log(e)
          this.loading = false
        })
    },
    getWorkDetailFuc(data){
      this.$store.dispatch('work/findTaskByIdAndCourseId',{courseId: data.courseId, id: data.id}).then((response) => {
          this.formData = response.data
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
    }
  },
  created(){
    this.getCourseListFuc()
     if(this.$route.query.type == 'edit'){
        this.getWorkDetailFuc(this.$route.query)
        this.button_name = '确定修改'
      }
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
