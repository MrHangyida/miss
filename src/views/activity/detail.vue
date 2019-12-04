<template>
  <div class="app-container">
    <el-row style="margin-bottom:20px;">
        <el-col :span="12">
            <el-button type="primary" size="small" @click="exportFuc()">导出数据</el-button>
        </el-col>
    </el-row>
    <el-table ref="multipleTable" :data="activityData" tooltip-effect="dark" style="width: 100%">

    <el-table-column v-for="item in titles" :prop="item" :label="item"  show-overflow-tooltip>
    </el-table-column>
    <!--<el-table-column prop="ticketId" label="套票编号" show-overflow-tooltip>
    </el-table-column>-->
    <el-table-column prop="signUpTime" label="报名时间" :formatter="dateFormat"  show-overflow-tooltip>
    </el-table-column>
    <el-table-column v-if="review==1" prop="status" label="审核状态" show-overflow-tooltip>
      <template slot-scope="scope">
          <el-switch v-model="scope.row.status"  active-color="#13ce66" inactive-color="#cccccc" @change="changeStatusFuc(scope.row)">
          </el-switch>
        </template>
    </el-table-column>
  </el-table>
  <el-pagination background layout="prev, pager, next" :page-size="pager.page_size" :total="pager.total" @current-change="changePage" style="margin-top: 20px;">
  </el-pagination>
  </div>
</template>

<script>

import { parseTime } from '@/utils/index'

  export default {
    data() {
      return {
        activityId: 0,
        review: 1,
        activityData: [],
        institutionalId: this.$store.getters.orgid,
        pager:{
          total: 0,
          page_size: 30,
          current_page: 1
        },
        titles: [
          '姓名',
          '性别',
          '电话'
        ]
      }
    },

    methods: {
      changePage(index){
        this.pager.current_page = index
        this.getActivityUsersFuc()
      },
      getActivityUsersFuc(){
        let data = {
          rowCount: this.pager.page_size,
          pageNumber: this.pager.current_page,
          activityId: this.activityId
        }
         this.$store.dispatch('activity/findSignUpByActivityId', data).then((response) => {
           this.activityData = response.data
           if(response.total > 0){
              let answer = JSON.parse(this.activityData[0].answer)
              let titleData = []
              for(var item in answer){
                titleData.push(item)
              }
              this.titles = titleData
              //将answer值转成data值
              for(var item in this.activityData){
                let answer = JSON.parse(this.activityData[item].answer)
                for(var title in answer){
                  this.activityData[item][title] = answer[title]
                }
                if(this.activityData[item].approvalStatus == 1)
                  this.activityData[item].status = true
                else
                  this.activityData[item].status = false
              }
           }
            this.pager.total = response.total
            this.loading = false
          }).catch(() => {
            this.loading = false
          })

      },
      exportFuc(){
          this.$store.dispatch('activity/exportSignIn', {activityId: this.activityId}).then((response) => {
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
      changeStatusFuc(data){
          let approvalStatus = 2
          if(data.status == true)
            approvalStatus = 1
          this.$store.dispatch('activity/approvalSignMess', {signMessId: data.signMessId, approvalStatus: approvalStatus}).then((response) => {
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
      },
    },
    created() {
        if(this.$route.query.type == 'detail'){
        this.activityId = this.$route.query.activityId
        this.review = this.$route.query.review
        this.getActivityUsersFuc()
        }
    }
  }
</script>
