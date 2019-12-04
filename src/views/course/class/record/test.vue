<template>
  <div class="app-container">

    <el-form ref="testData" :rules="rules" :model="testData" label-width="120px" size="small">
    <el-form-item label="测试名称" prop="examName">
        <el-input v-model="testData.examName" placeholder="测试名称" size="small" style="width:600px;"></el-input>
    </el-form-item>
    <el-form-item label="测试成绩" prop="studentList">
        <el-table :data="testData.classExamList" tooltip-effect="dark" style="width:600px">
            <el-table-column prop="studentId" label="学号">
            </el-table-column>
            <el-table-column prop="studentName" label="姓名" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="score" label="成绩" show-overflow-tooltip>
                <template slot-scope="scope">
                <input v-model="scope.row.score" size="small"/>
                </template>
            </el-table-column>
        </el-table>
    </el-form-item>
  </el-form>
      <el-row style="margin-top:20px;width: 800px">
      <el-col :span="24" style="text-align:center;">
        <el-button type="primary" size="small" @click="addTestFuc()">提交</el-button>
        <el-button type="primary" size="small" @click="onCancel()">取消</el-button>
      </el-col>
      </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        testData: {
            examName: '',
            classExamList: []
        },
        institutionalId: this.$store.getters.orgid,
        studentName: '',
        classInfo: {
            classHourId: 0,
            classesId: 0
        },
        rules: {
          examName: [
            { required: true, message: '请输入测试名称', trigger: 'blur' }
          ],
          studentId: [
            { required: true, message: '请输入学号', trigger: 'blur' }
          ],
          studentName: [
            { required: true, message: '班级名称', trigger: 'blur' }
          ],
        },
      }

    },

    methods: {
        onCancel() {
            this.$router.back(-1);
        },
        getTestStudentListFuc(){
           this.loading = true
            let data = {
                institutionalId: this.institutionalId,
                classesId: this.classInfo.classesId,
                classHourId: this.classInfo.classHourId
            }
            this.$store.dispatch('classes/findStudentByClassesIdAndClassHourId', data).then(response => {
            this.loading = false
            this.testData.classExamList = response.data
            }).catch(() => {
            this.loading = false
            })
        },
        addTestFuc(){
          if(this.testData.classExamList == null || this.testData.classExamList.length==0){
              this.$message.error('给学生报名后重试！');
              return;
          }
           this.$refs["testData"].validate((valid) => {
                    if (valid) {
                     let data = {
                         institutionalId: this.institutionalId,
                         classesId: this.classInfo.classesId,
                         classHourId: this.classInfo.classHourId,
                         examName: this.testData.examName,
                         classExamList: this.testData.classExamList
                         }
                     this.$store.dispatch('classes/addClassExam', data).then((response) => {
                         this.loading = false
                         this.classInfo.type = 'test'
                          this.$router.push({ path: this.redirect || '/course/class/record' , query: this.classInfo})
                         }).catch(() => {
                         this.loading = false
                     })
                    } else {
                      this.$message.error('请填写内容后重试');
                    }
                  });

        }
    },
    created(){
        this.classInfo = this.$route.query
        this.getTestStudentListFuc()

    }
  }
</script>
