<template>
  <div class="app-container">
    <el-row style="margin-bottom:20px;">
        <el-col :span="12">
            <el-button type="primary" size="small" @click="addStaffFuc()">新建员工</el-button>
        </el-col>
        <el-col :span="6" :offset="6" style="text-align:right;">
            <el-input placeholder="按姓名搜索" v-model="searchName" size="small" style="width:150px;"></el-input>
            <el-button type="primary" size="small" @click="getUserList()">搜索</el-button>
        </el-col>
    </el-row>
    <el-table ref="multipleTable" :data="userInfo" tooltip-effect="dark" style="width: 100%">
    <el-table-column prop="userName" label="姓名" >
    </el-table-column>
    <el-table-column prop="sex" label="性别" >
      <template slot-scope="scope">
          <div v-if="scope.row.sex==1">男</div>
          <div v-if="scope.row.sex==2">女</div>
        </template>
    </el-table-column> show-overflow-tooltip>
    <el-table-column prop="phone" label="电话"   show-overflow-tooltip>
    </el-table-column>
   <!-- <el-table-column prop="roleIdSet" label="职务权限" show-overflow-tooltip>
    </el-table-column> -->
    <el-table-column prop="loginName" label="账号" show-overflow-tooltip>
    </el-table-column>
    <el-table-column prop="updatePerName" label="操作人" show-overflow-tooltip>
    </el-table-column>
    <el-table-column label="操作" show-overflow-tooltip>
        <template slot-scope="scope">
        <el-button  type="text" size="small" @click="editDetailFuc(scope.row);">编辑</el-button>
        <el-button type="text" size="small" @click="deleteStaffFuc(scope.row, scope.$index)">删除</el-button>
        <el-button type="text" size="small" @click="resetPwdFuc(scope.row, scope.$index)">重置密码</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination background layout="prev, pager, next"  :page-size="pager.page_size" :total="pager.total" style="margin-top: 20px;" @current-change="changePage">
  </el-pagination>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        userInfo: [{
           userName: '1',
            sex: '',
            birthday: '',
            age: '1',
            phone: '1',
            photo: '',
            orgId: '',
            deptId: '',
            loginName: '',
            password: '',
            roleIdSet: '',
            operatorId: '',
            userId: '1'
        }],
        searchName: '',
        pager: {
          total: 0,
          page_size: 30,
          current_page: 1,
          orgId: this.$store.getters.orgid
        },
      }
    },

    methods: {
      addStaffFuc(){
        this.$router.push({path: '/settings/staff/add'});
      },
      editDetailFuc(data){
        this.$router.push({path: '/settings/staff/add', query :{userId: data.userId}});
      },
      deleteStaffFuc(data,index){
        this.$confirm('是否删除此员工信息?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.loading = true
          this.$store.dispatch('manage/removeUserByUserId', data).then(() => {
            this.$message({
                type: 'info',
                message: '删除成功'
            });

            this.userInfo.splice(index, 1);
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
      getUserList(){
          this.loading = true
           let data = {
            userName: this.searchName,
            orgId: this.pager.orgId,
            rowCount: 30,
            pageNumber: this.pager.current_page
          }
          this.$store.dispatch('manage/findUserByPage', data).then(response => {
            this.loading = false
            this.userInfo = response.data
            if(response.data.length == 0)
              this.pager.total = 100
            else
              this.pager.total = response.total
          }).catch(() => {
            this.loading = false
          })
      },
      resetPwdFuc(data){
        this.$confirm('是否重置密码?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.loading = true
          this.$store.dispatch('manage/resetPassByUserId', data).then(() => {
            this.$message({
                type: 'info',
                message: '重置密码成功'
            });

            this.userInfo.splice(index, 1);
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消重置'
          });
        });
      },
      changePage(index){
        this.pager.current_page = index
        this.getUserList()
      }
    },
    created() {
      this.getUserList()
    }
  }
</script>
