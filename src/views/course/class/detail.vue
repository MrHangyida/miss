<template>
  <div class="app-container">
      <div class="tag-style" style="margin-bottom:30px;width:100%;">课程表</div>
    <el-table ref="multipleTable" :data="classData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
    <el-table-column prop="classDate" label="上课日期" show-overflow-tooltip >
    </el-table-column>
    <el-table-column prop="classTime" label="上课时间" show-overflow-tooltip >
    </el-table-column>
    <el-table-column prop="teacherName" label="任课老师" show-overflow-tooltip>
    </el-table-column>
    <el-table-column prop="classroom" label="上课地点" show-overflow-tooltip>
    </el-table-column>
    <el-table-column label="操作" show-overflow-tooltip>
        <template slot-scope="scope">
        <el-button  @click="sendNoticeFuc(scope.row)" type="text" size="small">发送上课通知</el-button>
        <el-button  @click="sendRecordFuc(scope.row)" type="text" size="small">课堂记录</el-button>
        <el-button  @click="showUpdateTimeFuc(scope.row, scope.$index)" type="text" size="small">课程调整</el-button>
      </template>
    </el-table-column>
  </el-table>
      <div class="tag-style" style="margin-bottom:30px;width:100%;">学生信息</div>
    <el-table ref="multipleTable" :data="studentData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
    <el-table-column prop="rname" label="姓名" >
        <template slot-scope="scope">
            <span>{{ scope.row.rname }}</span>
        </template>
    </el-table-column>
    <el-table-column prop="rsex" label="性别" show-overflow-tooltip >
      <template slot-scope="scope">
        <span v-if="scope.row.rsex==2">女</span>
         <span v-else>男</span>
      </template>
    </el-table-column>
    <el-table-column prop="parentList" label="第一联系人" show-overflow-tooltip >
      <template slot-scope="scope">
        <div v-if="scope.row.parentList!=null">{{scope.row.parentList[0].pname}} {{scope.row.parentList[0].pphone}}</div>
      </template>
    </el-table-column>
    <el-table-column prop="parentList" label="第二联系人" show-overflow-tooltip >
      <template slot-scope="scope">
        <div v-if="scope.row.parentList!=null && scope.row.parentList.length>1">{{scope.row.parentList[1].pname}} {{scope.row.parentList[1].pphone}}</div>
      </template>
    </el-table-column>
  </el-table>


    <el-dialog title="课程调整" :visible.sync="dialogFormVisible">
      <el-form :model="form_edit_time">
        <el-form-item label="上课日期" >
          <el-date-picker v-model="form_edit_time.attendClassDtm" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" type="date" placeholder="上课日期" />
        </el-form-item>
        <el-form-item label="上课时间" :label-width="formLabelWidth">
          <el-time-select placeholder="起始时间" v-model="form_edit_time.startTime" :picker-options="{start: '08:30',step: '00:15',end: '18:30'}">
          </el-time-select>
          <el-time-select placeholder="结束时间" v-model="form_edit_time.endTime" :picker-options="{start: '08:30',step: '00:15',end: '18:30'}">
          </el-time-select>
        </el-form-item>
        <el-form-item label="任课老师" :label-width="formLabelWidth">
            <el-select v-model="form_edit_time.teacherId" placeholder="请选择" style="width:30%">
            <el-option v-for="item in teacherData" :key="item.id" :label="item.userName" :value="item.userId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="教室" :label-width="formLabelWidth">
          <el-input v-model="form_edit_time.classroom"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editTimeFuc()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        classData: [],
        studentData: [],
        multipleSelection: [],
        classesId: "",
        cname: "",
        institutionalId: this.$store.getters.orgid,
        dialogFormVisible: false,
        form_edit_time:{
          index: "",
          classHourId: "",
          classesId: "",
          teacherId: "",
          classroom: '',
          attendClassDtm: '',
          startTime: '',
          endTime: '',
          institutionalId: this.$store.getters.orgid
        },
        teacherData: [],
      teacherPager: {
        pageNumber:1,
        rowCount: 1000,
        orgId: this.$store.getters.orgid
      },
      formLabelWidth: '100'
      }
    },

    methods: {
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      sendNoticeFuc(item){
        let data = {
          classTime: item.classDate + ' ' + item.classTime,
          classAddress: item.classroom,
          cname: this.cname,
          teacherName: item.teacherName,
          classHourId: item.classHourId,
          classesId: item.classesId
        }
        this.$router.push({path: '/course/class/notice', query : data});
      },
      sendRecordFuc(item){
        let data = {
          classHourId: item.classHourId,
          classesId: item.classesId
        }
        this.$router.push({path: '/course/class/record', query : data});
      },
      getDetailFuc() {
        this.loading = true
        this.$store.dispatch('classes/findClassesHoursDetails',{institutionalId: this.institutionalId, classesId: this.classesId,start:1}).then((response) => {
            this.classData = response.data
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        this.$store.dispatch('classes/findClassesStudentDetails',{institutionalId: this.institutionalId, classesId: this.classesId}).then((response) => {
            this.studentData = response.data
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
      },
    editTimeFuc(){
      var _this = this
      this.form_edit_time.classesId = this.classesId
      let timeinfo = this.form_edit_time
      this.$store.dispatch('classes/updateClassHourByClassesId', timeinfo).then((response) => {

        let month = new Date(timeinfo.attendClassDtm).getMonth()+1
        let day = new Date(timeinfo.attendClassDtm).getDate()
        if(month < 10) month = '0' + month
        if(day < 10 ) day = '0' + day
        _this.classData[_this.form_edit_time.index].classDate = new Date(timeinfo.attendClassDtm).getFullYear() + '-' + month+ '-' + day
        _this.classData[_this.form_edit_time.index].classTime = _this.form_edit_time.startTime + '-' + _this.form_edit_time.endTime
        let teacherName = ''
        for(let item in _this.teacherData){
          if(_this.teacherData[item].userId == _this.form_edit_time.teacherId){
            teacherName = _this.teacherData[item].userName
            break
          }
        }
        _this.classData[_this.form_edit_time.index].teacherName = teacherName
        _this.classData[_this.form_edit_time.index].classroom = _this.form_edit_time.classroom
        console.log(_this.classData[_this.form_edit_time.index])
        this.loading = false

        _this.form_edit_time={
              index: "",
              classHourId: "",
              classesId: "",
              teacherId: "",
              classroom: '',
              attendClassDtm: '',
              startTime: '',
              endTime: '',
              institutionalId: this.$store.getters.orgid
        }
        _this.dialogFormVisible = false
        }).catch(() => {
          _this.loading = false
        })
    },
    showUpdateTimeFuc(item, index){
        this.form_edit_time.classHourId = item.classHourId
        this.form_edit_time.attendClassDtm = item.classDate
        var times = item.classTime.split('-')
        this.form_edit_time.startTime = times[0]
        this.form_edit_time.endTime = times[1]
        this.form_edit_time.index = index
        this.form_edit_time.teacherId = item.teacherId
        this.form_edit_time.classroom = item.classroom
        this.dialogFormVisible = true
    },
    getUserList(){
        this.loading = true
        this.$store.dispatch('manage/findUserByPage', this.teacherPager).then(response => {
          this.loading = false
          this.teacherData = response.data
        }).catch(() => {
          this.loading = false
        })
    }
    },
    created(){
      this.classesId = this.$route.query.id
      this.cname = this.$route.query.cname
      this.getUserList()
      this.getDetailFuc()
    }
  }
</script>
