<template>
  <div class="app-container">
    <el-row style="margin-bottom:20px;">
        <el-col :span="12">
            <el-button type="primary" size="small" @click="addClassFuc()">新建班级</el-button>
        </el-col>
        <el-col :span="6" :offset="6" style="text-align:right;">
            <el-input placeholder="请输入内容" v-model="searchName" size="small" style="width:150px;"></el-input>
            <el-button type="primary" size="small" @click="getListFuc()">搜索</el-button>
        </el-col>
    </el-row>
    <el-table ref="multipleTable" :data="formData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
    <el-table-column label="班级名称">
        <template slot-scope="scope">
            <el-tag size="small"  style="cursor:pointer;"  @click="classDetailFuc(scope.$index)">{{ scope.row.cname }}</el-tag>
        </template>
    </el-table-column>
    <el-table-column prop="teacherName" label="班主任/助教">
    </el-table-column>
    <el-table-column prop="cclassSize" label="成班人数" show-overflow-tooltip>
    </el-table-column>
    <el-table-column prop="totalStudent" label="实际招生" show-overflow-tooltip>
    </el-table-column>
    <el-table-column prop="cstartTime" label="开班日期"  :formatter="dateFormat" show-overflow-tooltip>
    </el-table-column>
    <el-table-column prop="cendTime" label="结班日期"  :formatter="dateFormat" show-overflow-tooltip>
    </el-table-column>
    <!-- <el-table-column prop="classroom" label="上课地点" show-overflow-tooltip>
    </el-table-column> -->
    <el-table-column prop="cstatus" label="状态">
      <template slot-scope="scope">
       <div v-if="scope.row.cstatus == '0'">开放</div>
       <div v-else>已结班</div>
      </template>
    </el-table-column>
    <el-table-column label="操作" show-overflow-tooltip width="260">
        <template slot-scope="scope">
        <el-button  @click="updateStatusFuc(scope.$index)" type="text" size="small" :disabled="scope.row.cstatus=='1'">结班</el-button>
        <el-button  @click="editClassFuc(scope.$index)" type="text" size="small">编辑</el-button>
        <el-button  @click="deleteClassFuc(scope.$index)" type="text" size="small">删除</el-button>
        <el-button type="text" size="small" @click="classAlbumFuc(scope.$index)">班级相册</el-button>
        <el-button type="text" size="small" @click="goToWork(scope.$index)">班级作业</el-button>
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
        cstatus:"3",
        start:1,
        formData: [],
        multipleSelection: [],
        courseData: [],
        studentId:0,
        institutionalId: this.$store.getters.orgid,
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
      changePage(index){
        this.start = index
        this.getListFuc()
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      addClassFuc(){
        this.$router.push({path: '/course/class/add', query : {type: 'add'}});
      },
      editClassFuc(index){
        let classesId = this.formData[index].cid
        this.$router.push({path: '/course/class/add', query : {id : classesId, type: 'modify'}});
      },
      classDetailFuc(index){
        let classesId = this.formData[index].cid
        let cname = this.formData[index].cname
        this.$router.push({path: '/course/class/detail', query : {id : classesId,cname:cname}});
      },
      classAlbumFuc(index){
        let classesId = this.formData[index].cid
        this.$router.push({path: '/course/class/album', query : {id : classesId}});
      },
      getListFuc(){
        this.loading = true
        this.$store.dispatch('classes/findClassesInstitutionalPage',{institutionalId: this.institutionalId,studentId:this.studentId,start:this.start,name:this.searchName}).then((response) => {
            this.formData = response.data
            this.pager.total = response.total
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
      },
      deleteClassFuc(index){
        this.$confirm('确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.loading = true
          let data = this.formData[index]
          this.$store.dispatch('classes/deleteClasses',{institutionalId: this.institutionalId, classesId: data.cid}).then((response) => {
            this.formData.splice(index, 1);
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '操作已取消'
          });
        });
      },
      updateStatusFuc(index){
        var title = '确认结班吗?'
        var cendTime = this.formData[index].cendTime
        if(new Date()< new Date(cendTime))
          title = '课程还未结束，确认结班吗?'
        this.$confirm(title, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.loading = true
          let data = this.formData[index]
          this.$store.dispatch('classes/updateCIdStatus',{institutionalId: this.institutionalId, classesId: data.cid}).then((response) => {
            this.getListFuc()

              // this.formData = response
              this.loading = false
            }).catch(() => {
              this.loading = false
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '操作已取消'
          });
        });
      },
      goToWork(index){
          let data = this.formData[index]
          this.$router.push({path: '/course/class/work', query:{cid: data.cid,cname:data.cname}});
      },
      dateFormat(row, column, cellValue, index){
          const daterc = row[column.property]
          if(daterc != null){
            return parseTime(daterc, '{y}-{m}-{d}')
          }
      },
    },
    created(){
      this.getListFuc()

    }
  }
</script>
