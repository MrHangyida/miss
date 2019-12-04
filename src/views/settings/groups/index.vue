<template>
  <div class="app-container">
    <el-row style="margin-bottom:20px;">
        <el-col :span="24">
            <el-button type="primary" size="small" @click="addDeptFuc()">添加部门</el-button>
        </el-col>
    </el-row>
    <el-table ref="multipleTable" :data="groupData" tooltip-effect="dark" style="width: 100%">
    <el-table-column prop="deptName" label="部门">
    </el-table-column>
    <el-table-column label="员工数量" show-overflow-tooltip>
        <template slot-scope="scope">
            <el-tag size="small" @click="">{{ scope.row.users }}</el-tag>
        </template>
    </el-table-column>
    <el-table-column prop="updateTime" label="更新时间"  :formatter="dateFormat" show-overflow-tooltip>
    </el-table-column>
    <el-table-column label="操作" show-overflow-tooltip>
        <template slot-scope="scope">
        <el-button  @click="editDeptFuc(scope.row)" type="text" size="small" >编辑</el-button>
        <el-button type="text" size="small" @click="delDeptInfo(scope.row, scope.$index)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog title="新建部门" :visible.sync="dialogFormVisible">
      <el-form ref="addForm" :model="form_add_parent" :rules="rules">
        <el-form-item label="部门名称" prop="deptName">
          <el-input v-model="form_add_parent.deptName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="部门描述" prop="remarks">
          <el-input v-model="form_add_parent.remarks" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelSaveDeptInfo">取 消</el-button>
        <el-button type="primary" @click="saveDeptInfo()">确 定</el-button>
      </div>
    </el-dialog>


  <el-pagination background layout="prev, pager, next"  :page-size="pager.page_size" :total="pager.total" style="margin-top: 20px;" @current-change="changePage">
  </el-pagination>
  </div>
</template>

<script>

import { parseTime } from '@/utils/index'

  export default {
    data() {
      return {
        dialogFormVisible: false,
        form_add_parent: {},
        groupData: [],
        pages: {
          pageNumber:1,
          rowCount: 10,
          orgId: 0
        },
        orgId: this.$store.getters.orgid,
        type: 'add',
        rules: {
          deptName: [{ required: true, trigger: 'blur', message: '部门名称不能为空'}],
          remarks: [
            { required: true, trigger: 'blur', message: '部门描述不能为空'},
            { max: 20, message: '长度不能超过20个字', trigger: 'blur' }
            ]
        },
        pager: {
          total: 10,
          page_size: 30,
          current_page: 1,
          orgId: this.$store.getters.orgid
        }
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
        this.pager.current_page = index
        this.getDeptList()
      },
      cancelSaveDeptInfo(){
        this.dialogFormVisible = false;
        this.$refs['addForm'].resetFields();
      },
      saveDeptInfo(){

      this.$refs.addForm.validate(valid => {
        if (valid) {
          if(this.type == 'modify'){
            this.updateDeptInfo()
          }
          else{
            this.loading = true
            this.form_add_parent.orgId = this.orgId
            this.$store.dispatch('manage/saveDept', this.form_add_parent).then(() => {
              this.loading = false
              this.dialogFormVisible = false
              this.$refs['addForm'].resetFields();
              this.getDeptList()
            }).catch(() => {
              this.loading = false
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
      },
      getDeptList(){
          this.loading = true
          let data = {
            orgId: this.pager.orgId,
            rowCount: this.pager.page_size,
            pageNumber: this.pager.current_page
          }
          this.$store.dispatch('manage/findDeptByPage', data).then(response => {
            this.groupData = response.data
            this.pager.total = response.total
            this.loading = false
            this.dialogFormVisible = false
          }).catch(() => {
            this.loading = false
          })
      },
      delDeptInfo(data,index){
        
         if(data.users > 0){
            this.$confirm('该部门下还有员工没有移除该部门，请移除后执行删除操作', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: false,
              showCancelButton: false,
              type: 'warning'
            });
            return;
        }
        this.$confirm('是否删除此部门信息 ？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.loading = true
          this.$store.dispatch('manage/removeDept', data).then(response => {
            this.loading = false
            this.groupData.splice(index, 1)
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
      updateDeptInfo(deptdata){
          this.loading = true
          this.$store.dispatch('manage/updateDept', this.form_add_parent).then(response => {
            this.loading = false
            this.dialogFormVisible = false
          }).catch(() => {
            this.loading = false
          })
      },
      editDeptFuc(deptdata){
        this.form_add_parent = deptdata
        this.form_add_parent.updateTime = new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate()
        this.dialogFormVisible = true
        this.type = 'modify'
      },
      addDeptFuc(){
        this.type = 'add'
        this.dialogFormVisible = true

      },
      dateFormat(row, column, cellValue, index){
          const daterc = row[column.property]
          if(daterc != null){
            return parseTime(daterc, '{y}-{m}-{d}')
          }
      },
    },
    created() {
      this.getDeptList()
    }
  }
</script>
