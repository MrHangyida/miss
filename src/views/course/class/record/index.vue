<template>
  <div class="app-container">
    <el-tabs type="border-card" ref="tabs" style="height: 800px" v-model="activeName">
    <el-tab-pane label="签到" name="qd">
    <el-row style="margin-bottom:20px;">
        <el-col :span="12">
            <el-button type="primary" size="small" @click="goToSign">录入签到</el-button>
        </el-col>
    </el-row>
      <el-table :data="signData" tooltip-effect="dark" style="width: 100%">
        <el-table-column prop="studentId" label="学号">
        </el-table-column>
        <el-table-column prop="studentName" label="姓名" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="dutyYn" label="考勤" show-overflow-tooltip>
          <template slot-scope="scope">
          <div v-if="scope.row.dutyYn=='Y'">出勤</div>
          <div v-else>缺勤</div>
        </template>
        </el-table-column>
        <el-table-column prop="reasonsAbsence" label="缺勤原因" show-overflow-tooltip>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="测试"  name="cs">
      <el-row style="margin-bottom:20px;">
        <el-col :span="12">
            <el-button type="primary" size="small" @click="goToTest">添加测试</el-button>
        </el-col>
      </el-row>
      <el-table :data="testData" tooltip-effect="dark" style="width: 100%">
        <el-table-column prop="examName" label="测试名称">
        </el-table-column>
        <el-table-column prop="classSize" label="班级人数" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="personSize" label="参与人数" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="sumScore" label="总数" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="avgScore" label="平均分" show-overflow-tooltip>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <!--<el-tab-pane label="课后作业">
    <el-row style="margin-bottom:20px;">
        <el-col :span="12">
            <el-button type="primary" size="small" @click="goToWork">布置作业</el-button>
        </el-col>
      </el-row>
      <el-table :data="signData" tooltip-effect="dark" style="width: 100%">
        <el-table-column prop="teacherName" label="学号">
        </el-table-column>
        <el-table-column prop="cstartTime" label="姓名" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="cendTime" label="操作" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="num1" label="作业得分" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="num1" label="老师评语" show-overflow-tooltip>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="班级动态">
    <el-row>
        <el-col :span="12">
            <el-button type="primary" size="small" @click="goToDynamic">发动态</el-button>
        </el-col>
      </el-row>
      <el-table :data="dynamicData" tooltip-effect="dark" style="width: 100%">
        <el-table-column>
         <template slot-scope="scope">
         <el-row class="demo-avatar demo-basic">
          <el-col :span="1">
            <img :src="circleUrl" width="40" height="40"></img>
          </el-col>
          <el-col :span="2" style="padding-top: 10px;">
          {{scope.row.name}}
          </el-col>
        </el-row>
         <el-row class="demo-avatar demo-basic">
          <el-col :span="12" class="el-row-title">
          {{scope.row.title}}
          </el-col>
          <el-col :span="12" style="text-align: right;">
          {{scope.row.sendTime}}
          </el-col>
        </el-row>
        <el-row>
        {{scope.row.content}}
        </el-row>
        <el-row>
        {{scope.row.image}}
        </el-row>
        <el-row>
        <el-col :span="12" style="text-align: left;">
          {{scope.row.address}}
          </el-col>
          <el-col :span="12" style="text-align: right;">
          点赞：{{scope.row.zanCount}}
          评论：{{scope.row.replyCount}}
          </el-col>
        </el-row>
      </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>-->
  </el-tabs>
  </div>
</template>
<script>

import Dropzone from '@/components/Dropzone'
import Tinymce from '@/components/Tinymce'

export default {
  components: { Dropzone , Tinymce },
  data() {
    return {
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      institutionalId: this.$store.getters.orgid,
      signData: [],
      testData: [],
      workData: [],
      dynamicData: [
        {
          name: '王富贵',
          title: '我们班的学生就是优秀',
          sendTime: '2019-09-12 12:12:12',
          address: '飘亮广场',
          zanCount: '10',
          replyCount: '100',
          content: '今天起，3800多封北京大学本科录取通知书将陆续抵达全国各地。去年，清华大学的立体“二校门”通知书让无数学子羡慕不已，今年，北京大学全新改版的“大学堂”牌匾通知书经验登场。随北大本科生录取通知书已统计出的，还有来自不同时代的七位“北大新生”亲笔写就的七封信，将为莘莘学子送上来自北大的期许和祝愿。'
          },
        {
          name: '王富贵',
          title: '我们班的学生就是优秀',
          sendTime: '2019-09-12 12:12:12',
          address: '飘亮广场',
          zanCount: '10',
          replyCount: '100',
          content: '今天起，3800多封北京大学本科录取通知书将陆续抵达全国各地。去年，清华大学的立体“二校门”通知书让无数学子羡慕不已，今年，北京大学全新改版的“大学堂”牌匾通知书经验登场。随北大本科生录取通知书已统计出的，还有来自不同时代的七位“北大新生”亲笔写就的七封信，将为莘莘学子送上来自北大的期许和祝愿。'
          },
      ],
      classInfo: {
          classHourId: 0,
          classesId: 0
      },
      activeName: 'qd'
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
    goToSign(){
        this.$router.push({path: '/course/class/sign', query: this.classInfo});
    },
    goToTest(){
        this.$router.push({path: '/course/class/test', query: this.classInfo});
    },
    goToWork(){
        this.$router.push({path: '/course/work/sendtostudent'});
    },
    goToDynamic(){
        this.$router.push({path: '/course/class/dynamic'});
    },
    getCourseListFuc(){
        this.loading = true
        let data = {
          institutionalId: this.institutionalId,
          classesId: this.classInfo.classesId,
          classHourId: this.classInfo.classHourId
        }
        this.$store.dispatch('classes/findClassesStudentByClassesIdAndClassHourId', data).then(response => {
          this.loading = false
          this.signData = response.data
        }).catch(() => {
          this.loading = false
        })
    },
    getTestListFuc(){
        this.loading = true
        let data = {
          institutionalId: this.institutionalId,
          classesId: this.classInfo.classesId,
          classHourId: this.classInfo.classHourId
        }
        this.$store.dispatch('classes/findClassExamById', data).then(response => {
          this.loading = false
          this.testData = response.data
           this.testData.map(item=>{
             item.avgScore = parseFloat(item.avgScore).toFixed(2)
           })
        }).catch(() => {
          this.loading = false
        })
    }
  },
  created(){
    this.classInfo = this.$route.query
    if(this.$route.query.type == 'test')
      this.activeName = 'cs'
    this.getCourseListFuc()
    this.getTestListFuc()
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
