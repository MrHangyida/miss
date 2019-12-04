<template>
  <div class="app-container">
    <el-tag style="margin-bottom:30px;width:100%;">二年级英语夏令营 培训信息</el-tag>
    <el-table :data="dataList" style="width: 100%">
        <el-table-column fixed prop="relation" label="科目" >
        </el-table-column>
        <el-table-column fixed prop="mobile" label="开课日期" >
        </el-table-column>
        <el-table-column fixed prop="mobile" label="上课时间" >
        </el-table-column>
        <el-table-column fixed prop="mobile" label="状态" >
        </el-table-column>
        <el-table-column fixed prop="mobile" label="考勤" >
        </el-table-column>
        <el-table-column fixed prop="mobile" label="测试" >
        </el-table-column>
        <el-table-column fixed prop="mobile" label="课后作业" >
        </el-table-column>
        <el-table-column fixed prop="mobile" label="图像" >
        </el-table-column>
        <el-table-column fixed prop="mobile" label="影音" >
        </el-table-column>
      </el-table>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        dataList: [{
          name: '王小虎',
          relation: '上海',
          mobile: '普陀区'
        }, {
          name: '王小虎',
          relation: '上海',
          mobile: '普陀区'
        }],
      }
    }
  }
</script>

<style>
.basic-info{
  margin-bottom:10px;
}
</style>
