<template>
  <div class="app-container">
    <el-row style="margin-bottom: 15px;">
        <el-col :span="12">
            <el-button type="primary" size="small" @click="assignFuc()">提交</el-button>
            <el-button type="primary" size="small" @click="onCancel()">取消</el-button>
        </el-col>
        <el-col :span="6" :offset="6" style="text-align:right;">
            <el-input placeholder="请输入内容" v-model="searchName" size="small" style="width:150px;"></el-input>
            <el-button type="primary" size="small" @click="getClassList">搜索</el-button>
        </el-col>
    </el-row>
    <el-table ref="multipleTable" :data="classData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
    <el-table-column type="selection" width="55">
    </el-table-column>
    <el-table-column label="课程名称"  prop="courseName">
    </el-table-column>
    <el-table-column prop="cName" label="班级名称">
    </el-table-column>
    <el-table-column prop="totalStudent" label="招生人数" show-overflow-tooltip>
    </el-table-column>
    <el-table-column prop="cClassSize" label="开班人数" show-overflow-tooltip>
    </el-table-column>
    <el-table-column prop="subjectName" label="科目" show-overflow-tooltip>
    </el-table-column>
    <el-table-column prop="cStartTime" label="开班时间" :formatter="dateFormat" >
    </el-table-column>
    <el-table-column prop="cEndTime" label="结束时间" :formatter="dateFormat" >
    </el-table-column>
    <el-table-column prop="cstatus" label="状态" show-overflow-tooltip>
      <template slot-scope="scope">
          <div v-if="scope.row.cStatus == 0">开放</div>
          <div v-else>已结班</div>
        </template>
    </el-table-column>
  </el-table>
 
  <el-pagination background layout="prev, pager, next" :page-size="pager.page_size" :total="pager.total" style="margin-top: 20px;" @current-change="changePage">
  </el-pagination>
  </div>
</template>

<script>
  import { parseTime } from '@/utils/index'
  export default {
    data() {
      return {
        cstatus:2,
        classData: [],
        multipleSelection: [],
        institutionalId: this.$store.getters.orgid,
        cids: '',
        studentId: "0",
        searchName: '',
        pager:{
          total: 0,
          page_size: 30,
          current_page: 1
        },

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
        this.cids = ''
        for(var key in this.multipleSelection){
          this.cids += this.multipleSelection[key].cId + ','
        }
        this.cids = this.cids.slice(0, this.cids.length-1)
      },
      changePage(index){
        this.pager.current_page = index
        this.getClassList()
      },
      getClassList(){
        this.loading = true
        let data = {
            institutionalId: this.institutionalId,
            start: this.pager.current_page,
            count: this.pager.page_size,
            total: this.pager.total,
            studentId:this.studentId,
            name: this.searchName
        }
        this.$store.dispatch('classes/findClassesStudentPageByInId', data).then((response) => {
            this.classData = response.data
            this.pager.total = response.total
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
      },
      assignFuc(){
        this.loading = true
        let data = {
            institutionalId: this.institutionalId,
            studentId: this.studentId,
            classesIds: this.cids
        }
        data.classesIds = data.classesIds.replace(/,/g, ';')
        this.$store.dispatch('classes/studentSignUpByCId', data).then((response) => {
            this.loading = false
            this.$router.push({path: '/student/list'});
          }).catch(() => {
            this.loading = false
          })
      },
      onSubmit(){

      },
      onCancel() {
        this.$router.back(-1);
      },
      dateFormat(row, column, cellValue, index){
          const daterc = row[column.property]
          if(daterc != null){
            return parseTime(daterc, '{y}-{m}-{d}')
          }
      },
    },
    created(){
       this.studentId = this.$route.query.id
      this.getClassList()
    }
  }
</script>
