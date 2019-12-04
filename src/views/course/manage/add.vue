<template>
  <div class="app-container">
    <el-form :rules="rules" ref="formData" :model="formData" label-width="120px" size="small">
      <el-row>
      <el-col :span="12">
        <el-form-item label="课程大类" prop="courseLargeId">
          <el-select v-model="formData.courseLargeId" filterable placeholder="请选择">
            <el-option
              v-for="item in typeData"
              :key="item.couCatId"
              :label="item.couName"
              :value="item.couCatId">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-button type="primary" size="small" @click="dialogTypeFormVisible = true">新建课程大类</el-button>
      </el-col>
      </el-row>
      <el-row>
      <el-col :span="12">
        <el-form-item label="科目" prop="subjectId">
          <el-select v-model="formData.subjectId" filterable placeholder="请选择">
            <el-option
              v-for="item in subjectData"
              :key="item.subjectId"
              :label="item.name"
              :value="item.subjectId">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-button type="primary" size="small" @click="dialogSubjectFormVisible = true">新建科目</el-button>
      </el-col>
      </el-row>
      <el-row>
      <el-col :span="12">
        <el-form-item label="课程名称" prop="name" >
          <el-input v-model="formData.name" />
        </el-form-item>
      </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="学年" prop="schoolYear">
            <el-select v-model="formData.schoolYear" filterable placeholder="请选择">
              <el-option
                v-for="item in schoolYearData"
                :key="item.syId"
                :label="item.acadName"
                :value="item.acadName">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="1">
          <el-button type="primary" size="small" @click="schoolYearFormVisible = true">新建学年</el-button>
        </el-col>
      </el-row>
      <el-row>
      <el-col :span="12">
        <el-form-item label="学季" prop="schoolSeason">
          <el-select v-model="formData.schoolSeason" filterable placeholder="请选择">
            <el-option
              v-for="item in schoolSeasonData"
              :key="item.ssId"
              :label="item.seasName"
              :value="item.seasName">
            </el-option>
          </el-select>
        </el-form-item>
        </el-col>
        <el-col :span="11" :offset="1">
          <el-button type="primary" size="small" @click="schoolSeasonFormVisible = true">新建学季</el-button>
        </el-col>
      </el-row>
      <el-row style="margin-top:20px;">
      <el-col :span="12" style="text-align:center;">
        <el-button type="primary" size="small" @click="addCourseFuc()">{{button_name}}</el-button>
          <el-button type="primary" size="small" @click="onCancel()">取消</el-button>
      </el-col>
      </el-row>
    </el-form>

    <el-dialog title="新建课程大类" :visible.sync="dialogTypeFormVisible">
      <el-form :model="form_type">
        <el-form-item label="课程大类名称" >
          <el-input v-model="form_type.couName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTypeFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addTypeFuc()">确 定</el-button>
      </div>
    </el-dialog>


    <el-dialog title="新建科目" :visible.sync="dialogSubjectFormVisible">
      <el-form :model="form_subject">
        <el-form-item label="科目名称" >
          <el-input v-model="form_subject.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogSubjectFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSubjectFuc()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="新建学年" :visible.sync="schoolYearFormVisible">
      <el-form :model="form_schoolYear" ref="schoolYearForm" :rules="schoolYearRules">
        <el-form-item label="学年名称" prop="acadName">
          <el-input v-model="form_schoolYear.acadName" autocomplete="off" maxlength="4" minlength="4"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="schoolYearFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSchoolYearFuc()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="新建学季" :visible.sync="schoolSeasonFormVisible">
      <el-form :model="form_schoolSeason">
        <el-form-item label="学季名称" >
          <el-input v-model="form_schoolSeason.seasName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="schoolSeasonFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSchoolSeasonFuc()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>

import Dropzone from '@/components/Dropzone'

export default {

  components: { Dropzone },
  data() {
    const validateAcadName = (rule, value, callback) => {
        if (value >1998 && value < 3000) {
          callback()
        } else {
          callback(new Error('学年 1999 至 2999 之间'))
        }
      }
    return {
      formData: {
        campusId: '',
        subjectId: '',
        institutionalId: '',
        courseLargeId: '',
        schoolSeason: '',
        useYn: 'Y',
        name: '',
        schoolYear: '',
        accomplishment: 1
      },
      form_type: {
        couName: '',
        useYn: 'Y'
      },
      typeData: [],
      form_subject: {
        name: '',
        useYn: 'Y'
      },
      subjectData: [],
      form_schoolYear: {
        acadName: '',
        useYn: 'Y'
      },
      schoolYearData: [],
      form_schoolSeason: {
        seasName: '',
        useYn: 'Y'
      },
      schoolSeasonData: [],
      institutionalId: this.$store.getters.orgid,
      rules: {
        courseLargeId: [
           { required: true, message: '请选择课程大类', trigger: 'change' },
        ],
        subjectId: [
           { required: true, message: '请选择科目', trigger: 'change' },
        ],
        name: [
          {  max: 20, message: '最长20个字符', trigger: 'blur' },
           { required: true, message: '请输入课程名称', trigger: 'blur' },
        ],
        schoolYear: [
          { required: true, trigger: 'blur', validator: validateAcadName }
        ],
        schoolSeason: [
          { required: true, message: '学季不能为空', trigger: 'blur' }
        ],
      },
      schoolYearRules: {
        acadName: [
          { required: true, trigger: 'blur', validator: validateAcadName }
        ],
      },
      dialogTypeFormVisible: false,
      schoolYearFormVisible: false,
      schoolSeasonFormVisible: false,
      dialogSubjectFormVisible: false,
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
    addTypeFuc(){
      this.form_type.institutionalId = this.institutionalId
      this.loading = true
      this.$store.dispatch('course/addCourseCategoryMaster',this.form_type).then((response) => {
          this.loading = false
          this.getTypeList()
          this.dialogTypeFormVisible = false
          this.form_type = {
                            couName: '',
                            useYn: 'Y'
                          }
        }).catch(() => {
          this.loading = false
        })
    },
    addSubjectFuc(){
      this.form_subject.institutionalId = this.institutionalId
      this.loading = true

      this.$store.dispatch('course/addSubject',this.form_subject).then((response) => {
          this.loading = false
          this.getSubjectList()
          this.dialogSubjectFormVisible = false
          this.form_subject = {
                                name: '',
                                useYn: 'Y'
                              }
        }).catch(() => {
          this.loading = false
        })
    },
    addSchoolYearFuc(){
      this.$refs["schoolYearForm"].validate((valid) => {
        if (valid) {
          this.form_schoolYear.institutionalId = this.institutionalId
          this.loading = true

          this.$store.dispatch('course/addSchoolYear',this.form_schoolYear).then((response) => {
            this.loading = false
            this.getSchoolYearList()
            this.schoolYearFormVisible = false
            this.form_schoolYear = {
              acadName: '',
              useYn: 'Y'
            }
          }).catch(() => {
            this.loading = false
          })
        }else{
          console.log('error submit!!');
          return false;
        }
      })
    },
    addSchoolSeasonFuc(){
      this.form_schoolSeason.institutionalId = this.institutionalId
      this.loading = true

      this.$store.dispatch('course/addSchoolSeason',this.form_schoolSeason).then((response) => {
          this.loading = false
          this.getSchoolSeasonList()
          this.schoolSeasonFormVisible = false
          this.form_subject = {
                                seasName: '',
                                useYn: 'Y'
                              }
        }).catch(() => {
          this.loading = false
        })
    },
    getSubjectList(){
      this.$store.dispatch('course/findSubjectByInstitutionalId',{institutionalId: this.institutionalId}).then((response) => {
          this.loading = false
          this.subjectData = response.data
        }).catch(() => {
          this.loading = false
        })
    },
    getTypeList(){
      this.$store.dispatch('course/findAllCourseCategory',{institutionalId: this.institutionalId, couName: ''}).then((response) => {
          this.loading = false
          this.typeData = response.data
        }).catch(() => {
          this.loading = false
        })
    },
    getSchoolYearList(){
      this.$store.dispatch('course/findSchoolYearMasterByInstitutionalId',{institutionalId: this.institutionalId}).then((response) => {
        this.loading = false
        this.schoolYearData = response.data
      }).catch(() => {
        this.loading = false
      })
    },
    getSchoolSeasonList(){
      this.$store.dispatch('course/findSchoolSeasonMasterByInstitutionalId',{institutionalId: this.institutionalId}).then((response) => {
        this.loading = false
        this.schoolSeasonData = response.data
      }).catch(() => {
        this.loading = false
      })
    },
    addCourseFuc(){
		this.$refs["formData"].validate((valid) => {
		          if (valid) {
		               this.formData.campusId = this.institutionalId
		               this.formData.institutionalId = this.institutionalId
		               let path_url = 'course/addCourse'
		               if(this.$route.query.type == 'modify'){
		                 path_url = 'course/updateCourse'
		               }
		               this.$store.dispatch(path_url, this.formData).then((response) => {
		                 this.loading = false
		                 this.$router.push({ path: this.redirect || '/course/manage' })
		                 //this.typeData = response.data
		               }).catch(() => {
		                 this.loading = false
		               })
		          } else {
		            console.log('error submit!!');
		            return false;
		          }
		        });




    },

  },
  created(){
    this.getTypeList()
    this.getSubjectList()
    this.getSchoolYearList()
    this.getSchoolSeasonList()
    if(this.$route.query.type == 'modify'){
      this.formData = this.$route.query
      this.button_name = '确定修改'
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>
