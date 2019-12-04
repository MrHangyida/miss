<template>
  <div class="app-container">
    <el-row style="margin-bottom:20px;">
        <el-col :span="12">
            <el-button type="primary" size="small" @click="goToWork">布置作业</el-button>
        </el-col>
    </el-row>
      <el-table :data="workData" tooltip-effect="dark" style="width: 100%">
        <el-table-column prop="title" label="作业名称">
        </el-table-column>
        <el-table-column prop="dateTime" label="发布时间" :formatter="dateFormat" show-overflow-tooltip>
        </el-table-column>
       <!-- <el-table-column prop="reasonsAbsence" label="发送人数" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="reasonsAbsence" label="回收人数" show-overflow-tooltip>
        </el-table-column>-->
        <el-table-column prop="teacherName" label="发送人" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="goDetail(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    <el-pagination background layout="prev, pager, next"  :page-size="pager.page_size" :total="pager.total" style="margin-top: 20px;" @current-change="changePage">
    </el-pagination>
  </div>
</template>
<script>

import Dropzone from '@/components/Dropzone'
import Tinymce from '@/components/Tinymce'
import { parseTime } from '@/utils/index'

export default {
  components: { Dropzone , Tinymce },
  data() {
    return {
      institutionalId: this.$store.getters.orgid,
      classesId: 0,
      cname:'',
      workData: [],
      pager:{
        total: 0,
        start: 1,
        page_size: 30
      },
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$router.back(-1);
    },
    handleClick(tab, event) {
    },

    goToWork(){
        this.$router.push({path: '/course/work/sendtostudent', query : {cid : this.classesId,cname:this.cname}});
    },
    getWorkListFuc(){
        this.loading = true
        let data = {
          institutionalId: this.institutionalId,
          classesId: this.classesId,
          start:this.pager.start
        }
        this.$store.dispatch('work/findItemClassTaskById', data).then(response => {
          this.loading = false
          this.workData = response.data
          if(response.total >0)
            this.pager.total = response.total
        }).catch(() => {
          this.loading = false
        })
    },
    dateFormat(row, column, cellValue, index){
      //const daterc = row[column.property]
      if(cellValue){
        return parseTime(cellValue, '{y}-{m}-{d}')
      }
    },
    changePage(index){
      this.start = index
      this.getWorkListFuc()
    },
    goDetail(item){
        this.$router.push({path: '/course/work/reply', query : {id: item.id}});
    }
  },
  created(){
    this.classesId = this.$route.query.cid
    this.cname = this.$route.query.cname
    this.getWorkListFuc()
  }
}
</script>

<style>
.el-row{
  margin-top: 15px;
  line-height: 25px;
}
.el-row-title{
  color: #000000;
  text-align: left;
}
</style>

