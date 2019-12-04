<template>
  <div class="app-container">
    <el-row style="margin-bottom:20px;">
        <el-col :span="12">
            <el-button type="primary" size="small" @click="addStudentFuc()">添加学生</el-button>
        </el-col>
        <el-col :span="12" style="text-align:right;">
            <el-input placeholder="请输入内容" v-model="param" size="small" style="width:150px;"></el-input>
            <el-button type="primary" size="small" @click="getListFuc()">搜索</el-button>
        </el-col>
    </el-row>
    <el-table :data="formData" tooltip-effect="dark" style="width: 100%">
    <el-table-column label="学号" width="120" prop="rid">
    </el-table-column>
    <el-table-column label="姓名">
        <template slot-scope="scope">
            <el-tag size="small" style="cursor:pointer;" @click="studentDetailFuc(scope.$index)">{{ scope.row.rname }}</el-tag>
        </template>
    </el-table-column>
    <el-table-column prop="rsex" label="性别" show-overflow-tooltip>
        <template slot-scope="scope">
          <div v-if="scope.row.rsex==1">男</div>
          <div v-if="scope.row.rsex==2">女</div>
        </template>
    </el-table-column>
    <el-table-column prop="rage" label="年龄" show-overflow-tooltip>
    </el-table-column>
    <el-table-column prop="rperiod" label="学段" show-overflow-tooltip>
    </el-table-column>
    <el-table-column prop="rgrade" label="年级" show-overflow-tooltip>
    </el-table-column>
    <el-table-column label="操作" show-overflow-tooltip>
        <template slot-scope="scope">
        <el-button  @click="editStudentFuc(scope.$index)" type="text" size="small">编辑</el-button>
        <el-button  @click="deleteStudentFuc(scope.$index)" type="text" size="small">删除</el-button>
        <el-button type="text" size="small" @click="assignStudentFuc(scope.row)">报名</el-button>
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
        param:"",
        formData: [],
        multipleSelection: [],
        start:'1',
        pager:{
          total: 0,
          page_size:30
        },
        institutionalId: this.$store.getters.orgid
      }
    },

    methods: {
      changePage(a){
        this.start = a
        this.getListFuc()
      },
      addStudentFuc(){
        this.$router.push({path: '/student/add'});
      },
      editStudentFuc(index){
        let data = this.formData[index]
        data.type = "modify"
        this.$router.push({path: '/student/add', query : data});
      },
      studentDetailFuc(index){
        let studentId = this.formData[index].rid
        this.$router.push({path: '/student/detail', query : {type: 'detail', studentId: studentId}});
      },
      deleteStudentFuc(index){
        let data = this.formData[index]

        this.$confirm('是否删除此学生信息?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.loading = true
          this.$store.dispatch('student/deleteStudentRemarksByRId', data).then(() => {
            this.$message({
                type: 'info',
                message: '删除成功'
            });
            this.loading = false
            this.formData.splice(index, 1);
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
      assignStudentFuc(data){
        this.$router.push({path: '/student/assign', query : {id : data.rid}});
      },
      getListFuc(){
        this.loading = true
        this.$store.dispatch('student/findStudentRemarksByCondition',{institutionalId:this.institutionalId,start:this.start,param:this.param}).then((response) => {
            this.formData = response.data.remarksList
            if(response.data==null){
              this.formData = []
            }

            this.pager.total = response.data.total
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
      }
    },
    created() {
      this.getListFuc()
    }
  }
</script>
