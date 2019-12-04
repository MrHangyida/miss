<template>
  <div class="app-container">
    <el-row>
      <el-col :span="8">
        <div class="num-style" style="text-align: center;font-weight:bold;">
        <div>在读学生数</div>
        <div class="num-style-text" style="margin-top:15px;">{{student_num}}</div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="num-style" style="text-align: center;font-weight:bold;">
        <div>开班数</div>
        <div  class="num-style-text" style="margin-top:15px;">{{classes_num}}</div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="num-style" style="text-align: center;font-weight:bold;">
        <div>举办活动数</div>
        <div  class="num-style-text" style="margin-top:15px;">{{activity_num}}</div>
        </div>
      </el-col>
    </el-row>

  <!--<div class="tag-style" style="margin-bottom:20px;margin-top:20px;width:100%;">
    近30日趋势图
    <div id="chart_example">
     
     </div>
  </div>-->
  <el-row style="margin-top: 30px;">
    <el-col :span="23">
  <div class="tag-style" style="margin-bottom:10px;width:100%; text-align: center;">今日课表</div>
    <el-table ref="multipleTable" :data="classHourData" tooltip-effect="dark" style="width: 100%">
    <el-table-column  label="课程名称"  prop="className" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="classHourTime" label="上课时间" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="classroom" label="上课教室" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="headTeacherName" label="助教老师" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="teacherName" label="授课老师" show-overflow-tooltip>
      </el-table-column>
    </el-table>
    </el-col>
  </el-row>
  <el-row style="margin-top: 30px;">
    <el-col :span="23">
    <div class="tag-style" style="margin-bottom:10px;width:100%; text-align: center;">系统日志</div>
    <el-table ref="multipleTable" :data="behaviorData" tooltip-effect="dark" style="width: 100%">
    <el-table-column  label="时间" prop="createTime"  show-overflow-tooltip>
    </el-table-column>
    <el-table-column prop="userName" label="操作人" show-overflow-tooltip>
    </el-table-column>
    <el-table-column prop="content" label="日志" show-overflow-tooltip>
    </el-table-column>
  </el-table>
    </el-col>
  </el-row>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import echarts from 'echarts'
export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data() {
    return {
        classHourData: [],
        multipleSelection: [],
        institutionalId: this.$store.getters.orgid,
        student_num: '-',
        classes_num: '-',
        activity_num: '-',
        behaviorData: []
      }
  },
  methods:{
      getTotalStudent(){
        this.loading = true
        this.$store.dispatch('dashboards/totalStudent',{institutionalId: this.institutionalId}).then((response) => {
            if(response.code == 1)
              this.student_num = response.total
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
      },

      getTotalClasses(){
        this.loading = true
        this.$store.dispatch('dashboards/totalClasses',{institutionalId: this.institutionalId}).then((response) => {
            if(response.code == 1)
              this.classes_num = response.total
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
      },

      getActivityCount(){
        this.loading = true
        this.$store.dispatch('activity/findActivityCount',{currentOrgId: this.institutionalId}).then((response) => {
            this.activity_num = response.data
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
      },
      getTodayHours(){
        this.loading = true
        this.$store.dispatch('dashboards/findTodayClassHourByInstitutionalId',{institutionalId: this.institutionalId,start:1,}).then((response) => {
            this.loading = false
            this.classHourData = response.data
          }).catch(() => {
            this.loading = false
          })
      },
      findBehaviorLog(){
        this.loading = true
        this.$store.dispatch('dashboards/findBehaviorLog',{institutionalId: this.institutionalId,rowCount:10,pageNumber:1}).then((response) => {
            this.loading = false
            this.behaviorData = response.data
          }).catch(() => {
            this.loading = false
          })
      }
  },
  mounted() {
     let this_ = this;
          let myChart = echarts.init(document.getElementById('chart_example'));
          let option = {
            color: ['#f44'],
            tooltip : {
              trigger: 'axis',
              axisPointer : {
                type : 'shadow'
              }
            },
            xAxis : [
              {
                type : 'category',
                data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月',],
                axisTick: {
                  alignWithLabel: true
                }
              }
            ],
            yAxis : [
              {
                type : 'value'
              }
            ],
            series : [
              {
                name:'每月花费',
                type:'bar',
                barWidth: '60%',
                data:[995,666,444,858,654,236,645,546,846,225,547,356]
              }
            ]
          };
          myChart.setOption(option);
          //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
          window.addEventListener('resize',function() {myChart.resize()});
  },
  created(){
    this.getTotalStudent()
    this.getTotalClasses()
    this.getActivityCount()
    this.getTodayHours()
    this.findBehaviorLog()

  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.num-style{
  width: 90%;
  background: #fff;
  height: 100px;
  padding: 10px;
}
.num-style-text{
  width: 100%;
  text-align: center;
}
</style>
