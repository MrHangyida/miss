<template>
  <div class="app-container" v-loading="loading">
    <el-row style="margin-bottom:20px;">
        <el-col :span="12">
            <el-button type="primary" size="small" @click="addActivityFuc()">新建活动</el-button>
        </el-col>
        <el-col :span="6" :offset="6" style="text-align:right;">
            <el-input placeholder="按名称搜索" v-model="searchName" size="small" style="width:150px;"></el-input>
            <el-button type="primary" size="small" @click="activityListFuc()">搜索</el-button>
        </el-col>
    </el-row>
    <el-table ref="multipleTable" :data="activityData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
    <el-table-column  label="活动名称" width="120">
        <template slot-scope="scope">
            <el-tag size="small"  style="cursor:pointer;" @click="activityDetailFuc(scope.row)">{{ scope.row.activityName }}</el-tag>
        </template>
    </el-table-column>
    <el-table-column prop="isPublic" label="范围">
        <template slot-scope="scope">
        <div v-if="scope.row.isPublic ==1">公开活动</div>
        <div v-else>内部活动</div>
      </template>
    </el-table-column>
    <el-table-column prop="actType" label="活动类型"  show-overflow-tooltip>
    </el-table-column>
    <el-table-column prop="startTime" label="开始时间" :formatter="dateFormat" show-overflow-tooltip>
    </el-table-column>
    <el-table-column prop="endTime" label="结束时间" :formatter="dateFormat"  show-overflow-tooltip>
    </el-table-column>
    <el-table-column prop="numberOfPeople" label="计划人数" show-overflow-tooltip>
    </el-table-column>
    <el-table-column prop="signCount" label="报名人数" show-overflow-tooltip>
    </el-table-column>
    <el-table-column prop="status" label="状态" show-overflow-tooltip>
      <template slot-scope="scope">
          <el-switch v-model="scope.row.status"  active-color="#13ce66" inactive-color="#cccccc" @change="changeSwitch(scope.row)">
          </el-switch>
        </template>
    </el-table-column>
    <el-table-column label="操作" show-overflow-tooltip>
        <template slot-scope="scope">
        <el-button  @click="editActivityFuc(scope.row)" type="text" size="small">编辑</el-button>
        <el-button @click="delActivityFuc(scope.$index, scope.row)" type="text" size="small">删除</el-button>
        <el-button @click="dialogFormVisibleHandler(scope.row)" type="text" size="small">延期</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination background layout="prev, pager, next" :page-size="pager.page_size" :total="pager.total" style="margin-top: 20px;"  @current-change="changePage">
  </el-pagination>
   <el-dialog title="活动延期" :visible.sync="dialogFormVisible">
      <el-date-picker v-model="extension_time" type="date" :picker-options="pickerOptions" placeholder="选择要延期结束的具体时间" style="width: 100%"/>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="extensionFuc()" v-text="btnText"></el-button>
      </div>
  </el-dialog>
  </div>
</template>

<script>

import { parseTime } from '@/utils/index'
import global from './common.vue'
  export default {
    data() {
      return {
        loading:false,
        clickFlag:true,
        activityData: [],
        multipleSelection: [],
        institutionalId: this.$store.getters.orgid,
        searchName: '',
        pager:{
          total: 1,
          page_size: 10,
          current_page: 1
        },
        extension_time: '',
        dialogFormVisible: false,
        currRow:null,
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < (new Date(global.getEndTime()).getTime()> new Date().getTime()?new Date(global.getEndTime()).getTime():new Date().getTime());
          }
        },
        btnText:"申请延期"
      }
    },
    watch:{
      extension_time(val){
        if(val==this.currRow.endTime){
          this.btnText="申请延期";
        }else{
          this.btnText="确认延期";
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
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      addActivityFuc(){
        this.$router.push({path: '/activity/add'});
      },
      editActivityFuc(data){
        this.$router.push({path: '/activity/add', query : {activityId : data.activityId, type: 'modify'}});
      },
      activityDetailFuc(data){
        this.$router.push({path: '/activity/detail', query : {activityId : data.activityId,review:data.review,type: 'detail'}});
      },
      activityListFuc(){
        let data = {
          currentOrgId: this.institutionalId,
          rowCount: this.pager.page_size,
          pageNumber: this.pager.current_page,
          activityName: this.searchName
        }
         this.$store.dispatch('activity/findActivityByPage', data).then((response) => {
           this.activityData = response.data
           for(let key in this.activityData){
              if(this.activityData[key].isStart == 1){
                this.activityData[key].status = true
              }
              else{
                this.activityData[key].status = false
              }
            }
            this.pager.total = response.total
            console.log(this.pager)
            this.loading = false
          }).catch(() => {
            this.loading = false
          })

      },
      delActivityFuc(index, data){
        this.$confirm('是否删除此活动信息?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('activity/removeActivityByActivityId', {activityId: data.activityId}).then((response) => {
            this.activityListFuc();
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
      dialogFormVisibleHandler(row){
        this.dialogFormVisible = true;
        this.currRow = row;
        this.extension_time=row.endTime;
        global.setEndTime(row.endTime);
      },
      extensionFuc(data){
         this.$store.dispatch('activity/extension', {activityId: this.currRow.activityId, time: this.extension_time}).then((response) => {
            this.activityListFuc()
            this.dialogFormVisible = false
            this.loading = false
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
      updateActivityStatusFuc(data){
        this.loading = true
        let isStart = 0
        if(data.status == true){
          isStart = 1
        }

        this.$store.dispatch('activity/updateIsStartByActivityId',{activityId: data.activityId, isStart: isStart}).then((response) => {
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
      },
      changeSwitch(data){
        let _this=this;
        if(_this.clickFlag){
          this.updateActivityStatusFuc(data);
          _this.clickFlag=false;
          setTimeout(()=>{_this.clickFlag=true;},1500)
        }else{
          this.$message({
            type: 'warning',
            message: '请勿频繁操作'
          });
        }
      },
      changePage(index){
        this.pager.current_page = index
        this.activityListFuc()
      }
    },
    created() {
      this.activityListFuc()
    }
  }
</script>
