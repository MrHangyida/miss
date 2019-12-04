<template>
  <div class="app-container">
    <el-row>
        <el-col :span="12">
            <el-button type="primary" size="small"  @click="dialogFormVisible = true">新建课程大类</el-button>
            <el-button type="primary" size="small">批量导入</el-button>
        </el-col>
    </el-row>
    <el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%">
    <el-table-column label="课程大类名称" width="200" prop="course">
    </el-table-column>
    <el-table-column prop="classname" label="包含课程" width="300">
    </el-table-column>
    <el-table-column prop="begin_time" label="添加时间" show-overflow-tooltip>
    </el-table-column>
    <el-table-column label="操作" show-overflow-tooltip>
        <template slot-scope="scope">
        <el-button  @click="dialogFormVisible = true" type="text" size="small">编辑</el-button>
        <el-button type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination background layout="prev, pager, next" :total="1000" style="margin-top: 20px;">
  </el-pagination>

    <el-dialog title="课程大类" :visible.sync="dialogFormVisible">
      <el-form :model="form_add_parent">
        <el-form-item label="课程大类名称" :label-width="formLabelWidth">
          <el-input v-model="form_add_parent.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="包含课程" :label-width="formLabelWidth">
          <el-input v-model="form_add_parent.relation" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        dialogFormVisible: false,
        tableData3: [{
          course: '初一数学课',
          classname: '初一数学1班',
          num1: 20,
          num2: 18,
          school: '全部',
          classtype: '数学',
          begin_time: '2019-02-10',
          end_time:'2019-12-21',
          status: '已开班'
        },{
          course: '初一数学课',
          classname: '初一数学1班',
          num1: 20,
          num2: 18,
          school: '全部',
          classtype: '数学',
          begin_time: '2019-02-10',
          end_time:'2019-12-21',
          status: '已开班'
        },{
          course: '初一数学课',
          classname: '初一数学1班',
          num1: 20,
          num2: 18,
          school: '全部',
          classtype: '数学',
          begin_time: '2019-02-10',
          end_time:'2019-12-21',
          status: '已开班'
        },{
          course: '初一数学课',
          classname: '初一数学1班',
          num1: 20,
          num2: 18,
          school: '全部',
          classtype: '数学',
          begin_time: '2019-02-10',
          end_time:'2019-12-21',
          status: '已开班'
        },{
          course: '初一数学课',
          classname: '初一数学1班',
          num1: 20,
          num2: 18,
          school: '全部',
          classtype: '数学',
          begin_time: '2019-02-10',
          end_time:'2019-12-21',
          status: '已开班'
        }],
        multipleSelection: [],
        form_add_parent : {
          name: '王小虎',
          relation: '上海',
          mobile: '普陀区'
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
      }
    }
  }
</script>