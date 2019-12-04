<template>
  <div class="app-container">
    <el-form :rules="rules" ref="formData" :model="formData" label-width="120px" size="small">
      <div class="tag-style" style="margin-bottom:30px;width:100%;">班级信息</div>
      <el-row>
        <el-col :span="12">
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
        <el-form-item label="班级名称" prop="cName">
          <el-input v-model="formData.cName" />
        </el-form-item>
        <el-form-item label="开班时间" prop="cStartTime">
          <el-col :span="11">
            <el-date-picker v-model="formData.cStartTime" type="date" placeholder="开班时间" style="width: 100%;" />
          </el-col>
        </el-form-item>

        <el-form-item label="结班时间"  prop="cEndTime">
          <el-col :span="11">
            <el-date-picker v-model="formData.cEndTime" type="date" placeholder="结班时间" style="width: 100%;" />
          </el-col>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="班主任/助教" prop="headteacherId">
          <el-select v-model="formData.headteacherId" placeholder="请选择" style="width:30%">
              <el-option v-for="item in teacherData" :key="item.id" :label="item.userName" :value="item.userId">
              </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="成班人数" prop="cClassSize">
          <el-input v-model="formData.cClassSize" />
        </el-form-item>
      </el-col>
      </el-row>

      <el-row class="tag-style">
        <el-col :span="12">排课表</el-col>
        <el-col :span="12"><el-button type="primary" class="tag-style-button" size="small" @click="dialogFormVisible = true">添加课时</el-button></el-col>
      </el-row>
      <el-table :data="timeData" style="width:62%">
        <el-table-column fixed prop="repeatModeDes" label="重复方式" >
        </el-table-column>
        <el-table-column fixed prop="subName" label="科目" >
        </el-table-column>
        <el-table-column fixed prop="attendClassDtm"  label="上课日期" >
        </el-table-column>
        <el-table-column fixed prop="startTime" label="上课时间" >
          <template slot-scope="scope">
            {{scope.row.startTime}}-{{scope.row.endTime}}
          </template>
        </el-table-column>
        <el-table-column fixed prop="teacherName" label="任课老师" >
        </el-table-column>
        <el-table-column fixed prop="classroom" label="教室" >
        </el-table-column>
        <el-table-column fixed="left" label="操作" >
          <template slot-scope="scope"><el-button @click.native.prevent="editRow(scope.$index, timeData)" type="text" size="small">
            编辑
          </el-button>
            <el-button @click.native.prevent="deleteRow(scope.$index, timeData)" type="text" size="small">
            删除
          </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row style="margin-top:20px;">
      <el-col :span="24" style="text-align:center;">
        <el-button type="primary" size="small" @click="addClassFuc()">确定</el-button>
          <el-button type="primary" size="small" @click="onCancel()">取消</el-button>
      </el-col>
      </el-row>
    </el-form>

    <el-dialog title="添加课时" :visible.sync="dialogFormVisible">
      <el-form :model="form_add_time">
        <el-form-item label="重复方式" :label-width="formLabelWidth">
            <el-select v-model="form_add_time.repeatStatus"  style="width: 30%;" placeholder="重复方式" @change="changeRepeat($event)">
              <el-option v-for="item in repeatData" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="form_add_time.repeatMode" style="width: 25%;" multiple placeholder="重复" @change="debug($event)">
              <el-option v-for="item in repeatCData" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        </el-form-item>
        <el-form-item label="科目" label-width="100px">
            <el-select v-model="form_add_time.subjectId" placeholder="请选择">
               <el-option
              v-for="item in subjectData"
              :key="item.subjectId"
              :label="item.name"
              :value="item.subjectId">
            </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="上课日期" :label-width="formLabelWidth" v-show="form_add_time.repeatStatus=='10' ? true:false ">
          <el-date-picker v-model="form_add_time.attendClassDtm" style="width:30%" type="date" placeholder="上课日期" />
        </el-form-item>
        <el-form-item label="上课时间" :label-width="formLabelWidth">
          <el-time-select placeholder="起始时间" v-model="form_add_time.startTime" :picker-options="{start: '06:00',step: '00:15',end: '24:00'}">
          </el-time-select>
          <el-time-select placeholder="结束时间" v-model="form_add_time.endTime" :picker-options="{start: '06:00',step: '00:15',end: '24:00'}">
          </el-time-select>
        </el-form-item>
        <el-form-item label="任课老师" :label-width="formLabelWidth">
            <el-select v-model="form_add_time.teacherId" placeholder="请选择" style="width:30%">
            <el-option v-for="item in teacherData" :key="item.id" :label="item.userName" :value="item.userId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="教室" :label-width="formLabelWidth">
          <el-input v-model="form_add_time.classroom" style="width:55%"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addTimeFuc()">确 定</el-button>
      </div>
  </el-dialog>

  </div>
</template>
<script>

import Dropzone from '@/components/Dropzone'

export default {
  components: { Dropzone },
  data() {
    return {
      formData: {
        cClassSize: '',
        cName: '',
        cStatus: 0,
        cStartTime: '',
        cEndTime: '',
        headteacherId: null,
        courseId: null,
        campusId: this.$store.getters.orgid,
        institutionalId: this.$store.getters.orgid,
        classHourList: []
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        courseId: [
          { required: true, message: '请选择课程', trigger: 'change' }
        ],
        cName: [
          { required: true, message: '班级名称', trigger: 'blur' }
        ],
        cStartTime: [
          { required: true, message: '请输入开班时间', trigger: 'change' }
        ],
        cEndTime: [
          { required: true, message: '请输入结班时间', trigger: 'change' }
        ],
        headteacherId:[
          { required: true, message: '请选择班主任/助教', trigger: 'change' }
        ],
        cClassSize:[
          { required: true, message: '请输入成班人数', trigger: 'blur' }
        ],
      },
      timeData: [],
      teacherData: [],
      dialogFormVisible: false,
      courseData:[],
      form_add_time:{
        repeatModeDes: '',
        repeatStatus: '',
        repeatMode: [],
        repeatWeek: '',
        repeatMonth: '',
        subjectId: null,
        classesId: null,
        teacherId: null,
        classroom: '',
        attendClassDtm: '',
        startTime: '',
        endTime: '',
        institutionalId: this.$store.getters.orgid
      },
      institutionalId: this.$store.getters.orgid,
      formLabelWidth: '100px',
      repeatData: [{value: 10, label: '自定义'}, {value: 20, label: '每周'},{value: 30, label: '每月'}],
      repeatCData:[],
      allRpeatCData: [[{value: 10, label: '自定义'}],[
        {value: '002', label: '周一'}, {value: '003', label: '周二'},{value: '004', label: '周三'},{value: '005', label: '周四'},{value: '006', label: '周五'},{value: '007', label: '周六'},{value: '001', label: '周日'}
      ],[
        {value: '01',label: '1号'},{value: '02',label: '2号'},{value: '03',label: '3号'},{value: '04',label: '4号'},{value: '05',label: '5号'},
        {value: '06',label: '6号'},{value: '07',label: '7号'},{value: '08',label: '8号'},{value: '09',label: '9号'},{value: '10',label: '10号'},
        {value: '11',label: '11号'},{value: '12',label: '12号'},{value: '13',label: '13号'},{value: '14',label: '14号'}, {value: '15',label: '15号'},
        {value: '16',label: '16号'},{value: '17',label: '17号'}, {value: '18',label: '18号'},{value: '19',label: '19号'}, {value: '20',label: '20号'},
        {value: '21',label: '21号'},{value: '22',label: '22号'},{value: '23',label: '23号'},{value: '24',label: '24号'}, {value: '25',label: '25号'},
        {value: '26',label: '26号'},{value: '27',label: '27号'}, {value: '28',label: '28号'},{value: '29',label: '29号'}, {value: '30',label: '30号'}, {value: '31',label: '31号'}
      ]
      ],
      subjectData: [],
      edit_row: false,
      teacherPager: {
        pageNumber:1,
        rowCount: 1000,
        orgId: this.$store.getters.orgid
      },
      classesId: 0
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    debug(a){
      console.log(this.form_add_time.repeatMode)
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
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    editRow(index, rows){
      this.edit_row = true
      this.form_add_time = rows[index]
      this.form_add_time.attendClassDtm = this.form_add_time.attendClassDtm
      this.dialogFormVisible = true
    },
    previewFuc() {
      this.$router.push({path: '/student/detail', params : {id : 1}});
    },
    addClassFuc(){
          this.$refs["formData"].validate((valid) => {
                    if (valid) {
                       if(this.timeData.length==0){
                              this.$message.error('请添加课时');
                       }else{
                      if(this.$route.query.type == 'modify'){
                        this.editClassFuc()
                        return
                      }
                      this.formData.classHourList = this.timeData
                      this.loading = true
                      this.$store.dispatch('classes/addClasses', this.formData).then((response) => {
                          this.loading = false
                          this.$router.push({path: '/course/class'});
                        }).catch(() => {
                          this.loading = false
                        })
                        }
                    } else {
                      this.$message.error('请填写内容后重试');
                      return false;
                    }
                  });

    },
    getCourseListFuc(){
        this.loading = true
        let data = {
            institutionalId: this.institutionalId,
            campusId: this.institutionalId,
            accomplishment: '',
            name: '',
            start:1,
        }
        this.$store.dispatch('course/findCoursePage', data).then(response => {
          this.loading = false
          this.courseData = response.data
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
    addTimeFuc(){
      var timeinfo = this.form_add_time
      this.subjectData.map(item=>{
        if(item.subjectId==timeinfo.subjectId){
          timeinfo.subName = item.name
        }
      })
      this.teacherData.map(item=>{
        if(item.userId==timeinfo.teacherId){
          timeinfo.teacherName = item.userName
        }
      })
      var repeatmode = timeinfo.repeatMode
      timeinfo.repeatMode = timeinfo.repeatMode.join('|')
      if(timeinfo.attendClassDtm !=""){
        var attendClassDtm = timeinfo.attendClassDtm
        var month = new Date(attendClassDtm).getMonth()+1
        var day = new Date(attendClassDtm).getDate()
        if(month < 10) month = '0' + month
        if(day < 10 ) day = '0' + day
        timeinfo.attendClassDtm = new Date(attendClassDtm).getFullYear() + '-' + month+ '-' + day
      }

      for(var item in this.repeatData){
        if(this.repeatData[item].value == timeinfo.repeatStatus){
          timeinfo.repeatModeDes = this.repeatData[item].label
          break
        }
      }
      //上课日期反显逻辑
      if(timeinfo.repeatStatus == 20 || timeinfo.repeatStatus == 30){
        var repeatdate = []
        if(timeinfo.repeatStatus == 20)
          repeatdate = this.allRpeatCData[1]
        else
          repeatdate = this.allRpeatCData[2]

        var repeatmodeldes = ''
        for(var index in repeatmode){
          repeatdate.map(item=>{
            if(item.value==repeatmode[index]){
              repeatmodeldes +=  item.label + ' '
            }
          })
        }
        timeinfo.attendClassDtm = repeatmodeldes
      }

      if(this.edit_row == false){
        this.timeData.push(timeinfo)
        this.form_add_time = {
          repeatModeDes: '',
          repeatStatus: '',
          repeatMode: '',
          repeatWeek: '',
          repeatMonth: '',
          subjectId: null,
          classesId: null,
          teacherId: null,
          classroom: '',
          attendClassDtm: '',
          startTime: '',
          endTime: '',
          institutionalId: this.$store.getters.orgid
        }
      }

      this.dialogFormVisible = false

    },
    changeRepeat(type){
      let datas = []
      var key = 0
      switch(type){
        case 10:
          key = 0
        break;
        case 20:
          key = 1
        break;
        case 30:
          key = 2
        break;
      }

      //this.form_add_time.repeate = ''
     // this.form_add_time.repeatModeDtm = this.repeatData[type].label
      for (var val of this.allRpeatCData[key]) {
          datas.push({label: val.label,value: val.value})
      }
      this.repeatCData = datas
      this.form_add_time.repeatMode = []
    },
    getUserList(){
        this.loading = true
        this.$store.dispatch('manage/findUserByPage', this.teacherPager).then(response => {
          this.loading = false
          this.teacherData = response.data
        }).catch(() => {
          this.loading = false
        })
    },
    editClassFuc(){
      this.formData.classHourList = this.timeData
      this.formData.cStartTime = new Date(this.formData.cStartTime)
      this.formData.cEndTime = new Date(this.formData.cEndTime)
      this.formData.classesId = this.classesId
      this.loading = true
      this.$store.dispatch('classes/updateClasses', this.formData).then((response) => {
        if(response.code == 1){
          this.$message({ message: response.mess, type: 'success' })
          this.$router.push({path: '/course/class'});
        }
        else
          this.$message({ message: response.mess})

          this.loading = false
        }).catch(() => {
          this.loading = false
        })
    },
    classInfoFuc(){
      this.loading = true
      let data = {
          institutionalId: this.formData.institutionalId,
          classesId: this.classesId
      }
      this.$store.dispatch('classes/findClassesByClassesIdAndInId', data).then((response) => {
          this.loading = false
          var _this = this
          this.formData.courseId = response.data.courseId
          this.formData.headteacherId = response.data.headteacherId
          this.formData.cName = response.data.cname
          this.formData.cClassSize = response.data.cclassSize
          this.formData.cStartTime = response.data.cstartTime
          this.formData.cEndTime = response.data.cendTime
          this.formData.classHourList = response.data.classHourList
          this.timeData = response.data.classHourList
          this.timeData = this.timeData.map(function(item){
            var modedes = '自定义'
            var subName = ''
            _this.subjectData.map(itm=>{
              if(itm.subjectId==item.subjectId){
                subName = itm.name
              }
            })
            item.repeatStatus = 10
            item.repeatModeDes = modedes
            item.subName = subName
            item.attendClassDtm = item.dateStr
            item.startTime = item.startTimeStr.split(' ')[1].substr(0,5)
            item.endTime = item.endTimeStr.split(' ')[1].substr(0,5)
            return item
          });
        }).catch(() => {
          this.loading = false
        })
    },
  },
  watch:{

  'form_add_time.repeatMode':function(val,oldval){
          console.log(typeof(val)+val+"aaa")
        },//键路径必须加上引号
  },
  created(){
    this.getUserList()
    this.getCourseListFuc()
    this.getSubjectList()
    if(this.$route.query.type == 'modify'){
      this.classesId = this.$route.query.id
      this.classInfoFuc()

    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>
