<template>
  <div class="app-container">
    <div class="tag-style" style="margin-bottom:30px;width:100%;">基本信息</div>

    <el-row class="basic-info">
        <el-col :span="6">课程名称：<span style="font-size: 14px; color:#333333;">{{name}}</span> </el-col>
        <el-col :span="6">课程大类：<span style="font-size: 14px; color:#333333;">{{courselargename}}</span> </el-col>
    </el-row>
    <el-row class="basic-info">
        <el-col :span="6">科目：<span style="font-size: 14px; color:#333333;">{{subjectname}} </span> </el-col>
        <el-col :span="6">学年：<span style="font-size: 14px; color:#333333;">{{schoolYear}}</span> </el-col>
        <el-col :span="6">学季：<span style="font-size: 14px; color:#333333;">{{schoolSeason}}</span> </el-col>
    </el-row>

    <div class="tag-style" style="margin-top: 30px;">
    <el-col :span="6">开班情况</el-col>
    <el-col :span="12" style="margin-top: -5px; text-align:right;">
      <el-date-picker v-model="conditions.cStartTime" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" type="date"  size="small" placeholder="开课日期"  /> -
      <el-date-picker v-model="conditions.cEndTime" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" type="date" size="small" placeholder="结课日期"  />
    </el-col>
    <el-col :span="6" style="margin-top: -5px; text-align:right;">
      <el-input placeholder="请输入内容" size="small" style="width:150px;" v-model="conditions.name"></el-input>
      <el-button type="primary" class="tag-style-button" size="small" @click="getClassesCourse()">搜索</el-button>
    </el-col>
    </div>
    <el-table :data="formData" style="width: 100%">
        <el-table-column fixed label="班级名称">
          <template slot-scope="scope">
            <el-tag size="small" @click="classDetailFuc(scope.$index)">{{ scope.row.cname }}</el-tag>
        </template>
        </el-table-column>
        <el-table-column fixed prop="cstartTime" label="开课日期" :formatter="dateFormat">
        </el-table-column>
        <el-table-column fixed prop="cendTime" label="结课日期" :formatter="dateFormat">
        </el-table-column>
        <el-table-column fixed prop="totalStudent" label="学生人数">
        </el-table-column>
        <el-table-column fixed prop="teacherName" label="班主任/助教">
        </el-table-column>
      </el-table>
  </div>
</template>

<script>
  import { parseTime } from '@/utils/index'
  export default {
    data() {
      return {
        courselargename:"",
        subjectname:"",
        name: '',
        schoolYear: '',
        schoolSeason: '',
        courseId: '',
        subjectId: '',
        formData: [],
        conditions: {
          institutionalId: this.$store.getters.orgid,
          courseId: 0,
          cStartTime: '',
          cEndTime: '',
          campusId: this.$store.getters.orgid,
          name: ''
        }
      }
    },
    methods: {
        go2Training() {
            this.$router.push({path: '/student/training', params : {id : 1}});
        },
        getClassesCourse() {
          this.loading = true
          this.$store.dispatch('course/findClassesCourseDetails', this.conditions).then(response => {
            this.loading = false
            this.formData = response.data
            if(response.data.length == 0)
              this.pager.total = 100
            else
              this.pager.total = response.data.total
          }).catch(() => {
            this.loading = false
          })
        },
        dateFormat(row, column, cellValue, index){
            const daterc = row[column.property]
            if(daterc != null){
              return parseTime(daterc, '{y}-{m}-{d}')
            }
        },
      classDetailFuc(index){
        let classesId = this.formData[index].cid
        let cname = this.formData[index].cname
        this.$router.push({path: '/course/class/detail', query : {id : classesId,cname:cname}});
      },
    },
    created(){
      this.name = this.$route.query.name
      this.schoolYear = this.$route.query.schoolYear
      this.schoolSeason = this.$route.query.schoolSeason
      this.courseId = this.$route.query.courseId
	    this.courselargename = this.$route.query.courselargename
      this.subjectId = this.$route.query.subjectId
	  this.subjectname = this.$route.query.subjectname
      this.conditions.courseId = this.$route.query.courseId
      this.getClassesCourse()
    }
  }
</script>

<style>
.basic-info{
  margin-bottom:10px;
}
</style>
