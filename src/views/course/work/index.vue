<template>
  <div class="app-container">
    <el-row style="margin-bottom:20px;">
        <el-col :span="12">
            <el-button type="primary" size="small" @click="addCourseWorkFuc()">新建作业</el-button>
        </el-col>
        <el-col :span="6" :offset="6" style="text-align:right;">
            <el-input placeholder="请输入内容" v-model="searchName" size="small" style="width:150px;"></el-input>
            <el-button type="primary" size="small" @click="getListFuc()">搜索</el-button>
        </el-col>
    </el-row>
    <el-table ref="multipleTable" :data="formData" tooltip-effect="dark" style="width: 100%">
    <el-table-column label="作业名称">
        <template slot-scope="scope">
            <el-tag size="small" style="cursor:pointer;"  @click="workDetailFuc(scope.row)">{{ scope.row.ansName }}</el-tag>
        </template>
    </el-table-column>
    <el-table-column prop="courseName" label="所属课程">
    </el-table-column>
    <el-table-column prop="ansStatus" label="状态" show-overflow-tooltip>
        <template slot-scope="scope">
          <div v-if="scope.row.ansStatus==0">已撤回</div>
          <div v-if="scope.row.ansStatus==1">已发布</div>
        </template>
    </el-table-column>
    <el-table-column prop="userName" label="编辑" show-overflow-tooltip>
    </el-table-column>
    <el-table-column label="操作" show-overflow-tooltip>
        <template slot-scope="scope">
        <el-button v-if="scope.row.ansStatus==0" @click="releaseWorkFuc(scope.$index, scope.row)" type="text" size="small">发布</el-button>
        <el-button v-if="scope.row.ansStatus==1" @click="recallWorkFuc(scope.$index, scope.row)" type="text" size="small">撤回</el-button>
        <el-button  @click="editWorkFuc(scope.row)" type="text" size="small">编辑</el-button>
        <el-button @click="deleteWorkFuc(scope.$index,scope.row)" type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination background layout="prev, pager, next" :page-size="pager.page_size" :total="pager.total" style="margin-top: 20px;" @current-change="changePage">
  </el-pagination>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        formData: [],
        multipleSelection: [],
        institutionalId: this.$store.getters.orgid,
        searchName: '',
        start:'1',
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
        // this.pager.current_page = index
        this.start = index
        this.getListFuc()
      },
      addCourseWorkFuc(){
        this.$router.push({path: '/course/work/add'});
      },
      workDetailFuc(data){
        let routeUrl = this.$router.resolve({path: '/course/work/detail', query : {id : data.id, courseId: data.courseId, type: 'detail'}})
        window.open(routeUrl .href, '_blank')
      },
      getListFuc(){
        this.$store.dispatch('work/findTaskPage',{institutionalId: this.institutionalId, courseId:0, ansName: this.searchName,start:this.start}).then((response) => {
            this.formData = response.data
            this.pager.total = response.total
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
      },
      releaseWorkFuc(index, data){
        this.$store.dispatch('work/addItemTask',{courseId: data.courseId, ansId: data.id}).then((response) => {
            this.formData[index].ansStatus = 1
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
      },
      recallWorkFuc(index, data){
        this.$store.dispatch('work/deleteItemTaskByIdAndCourseId',{courseId: data.courseId, ansId: data.id, useYn: 'N'}).then((response) => {
             if(response.code == 0){
                this.$message(response.mess)
             }
             this.formData[index].ansStatus = 0
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
      },
      deleteWorkFuc(index, data){
        this.$confirm('确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('work/deleteTaskByIdAndCourseId',{courseId: data.courseId, id: data.id, useYn: 'N'}).then((response) => {
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
      editWorkFuc(data){
        this.$router.push({path: '/course/work/add', query : {id : data.id, courseId: data.courseId, type: 'edit'}});
      }
    },
    created(){
      this.getListFuc()
    }
  }
</script>
