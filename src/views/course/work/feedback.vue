<template>
  <div class="app-container">
    <el-tag style="margin-bottom:30px;width:100%;">作业名称：初一数学作业</el-tag>
    <div>
        今天的作业内容是：
        将古诗词300首默写其中的5首，要求可以背诵
    </div>
    <el-tag style="margin-bottom:30px;width:100%;">学生作业</el-tag>

    <el-form :rules="rules" ref="form" :model="form" label-width="120px" size="small">
      <el-table :data="tableData4" style="width: 100%">
        <el-table-column fixed prop="relation" label="孩子信息" width="200">
        </el-table-column>
      </el-table>
    </el-form>
  </div>
</template>
<script>
  export default {
    data() {
      return {
          tableData4: [{
          name: '二年级英语夏令营',
          relation: '上海',
          mobile: '普陀区'
        }, {
          name: '二年级英语夏令营',
          relation: '上海',
          mobile: '普陀区'
        }],
        multipleSelection: []
      }
    },
    methods: {
        go2Training() {
            this.$router.push({path: '/student/training', params : {id : 1}});
        }
    }
  }
</script>

<style>
.basic-info{
  margin-bottom:10px;
}
</style>