<template>
  <div class="app-container">
    <el-row style="margin-bottom:20px;" v-if="conditionData.category&&conditionData.category.length>0">
    <el-col :span="3">课程大类</el-col>
    <el-col :span="21">
    <el-checkbox-group v-model="courseLargeId" @change="courseLargeIdGroupChange">
      <el-checkbox label="全部" :indeterminate="courseLargeIdIm" name="type" @change="courseLargeIdCaChange" style="width:5%;"></el-checkbox>
      <el-checkbox  style="width:5%;" v-for="item in conditionData.category"
                    :key="item.couCatId"
                    :label="item.couName"
                    :value="item.couCatId"/>
      <!--<el-checkbox label="名师培优" name="type"></el-checkbox>
      <el-checkbox label="名师提高" name="type"></el-checkbox>
      <el-checkbox label="试听" name="type"></el-checkbox>-->
    </el-checkbox-group>
    </el-col>
    </el-row>
    <el-row style="margin-bottom:20px;" v-if="conditionData.subject&&conditionData.subject.length>0">
    <el-col :span="3">科目</el-col>
    <el-col :span="21">
    <el-checkbox-group v-model="subjectId" @change="subjectIdGroupChange">
      <el-checkbox label="全部" :indeterminate="subjectIdIm" name="type" @change="subjectIdChange" style="width:5%;"></el-checkbox>
      <el-checkbox style="width:5%;" v-for="item in conditionData.subject"
                    :key="item.subjectId"
                    :label="item.name"
                    :value="item.subjectId"/>
      <!--<el-checkbox label="语文" name="type"></el-checkbox>
      <el-checkbox label="英语" name="type"></el-checkbox>
      <el-checkbox label="舞蹈" name="type"></el-checkbox>-->
    </el-checkbox-group>
    </el-col>
    </el-row>
    <el-row v-if="conditionData.SchoolYear&&conditionData.SchoolYear.length>0">
    <el-col :span="3" style="margin-bottom:20px;">学年</el-col>
    <el-col :span="21">
    <el-checkbox-group v-model="schoolYear" @change="schoolYearGroupChange">
      <el-checkbox label="全部" :indeterminate="schoolYearIm" name="type" @change="schoolYearChange" style="width:5%;"></el-checkbox>
      <el-checkbox style="width:5%;" v-for="item in conditionData.SchoolYear"
                    :key="item.syId"
                    :label="item.acadName"
                    :value="item.acadName"/>
     <!-- <el-checkbox label="2019" name="type"></el-checkbox>
      <el-checkbox label="2018" name="type"></el-checkbox>
      <el-checkbox label="2017" name="type"></el-checkbox>-->
    </el-checkbox-group>
    </el-col>
    </el-row>
    <el-row style="margin-bottom:20px;" v-if="conditionData.schoolSeason&&conditionData.schoolSeason.length>0">
    <el-col :span="3">学季</el-col>
    <el-col :span="21">
    <el-checkbox-group v-model="schoolSeason" @change="schoolSeasonGroupChange">
      <el-checkbox label="全部" :indeterminate="schoolSeasonIm" name="type" @change="schoolSeasonChange" style="width:5%;"></el-checkbox>
      <el-checkbox style="width:5%;"  v-for="item in conditionData.schoolSeason"
                    :key="item.ssId"
                    :label="item.seasName"
                    :value="item.seasName"/>
      <!--<el-checkbox label="春季" name="type"></el-checkbox>
      <el-checkbox label="夏季" name="type"></el-checkbox>-->
      <!-- <el-checkbox label="秋季" name="type"></el-checkbox>
      <el-checkbox label="暑假" name="type"></el-checkbox> -->
    </el-checkbox-group>
    </el-col>
    </el-row>
    <el-row style="margin-bottom:20px;">
    <el-col :span="3">所属状态分类</el-col>
    <el-col :span="21">
    <el-checkbox-group v-model="cStatus" @change="cStatusGroupChange">
      <el-checkbox label="全部" :indeterminate="cStatusIm" name="type" @change="cStatusChange" style="width:5%;"></el-checkbox>
      <el-checkbox label="开放" name="type" style="width:5%;"></el-checkbox>
      <el-checkbox label="关闭" name="type" style="width:5%;"></el-checkbox>
    </el-checkbox-group>
    </el-col>
    </el-row>
    <el-row style="margin-bottom:20px;">
        <el-col :span="12">
            <el-button type="primary" size="small" @click="addCourseFuc()">新建课程</el-button>
        </el-col>
        <el-col :span="6" :offset="6" style="text-align:right;">
            <el-input placeholder="请输入内容" v-model="searchName" size="small" style="width:150px;"></el-input>
            <el-button type="primary" size="small" @click="getListFuc()">搜索</el-button>
        </el-col>
    </el-row>
    <el-table ref="multipleTable" :data="formData" tooltip-effect="dark" style="width: 100%">
    <el-table-column label="课程名称" >
        <template slot-scope="scope">
            <el-tag size="small"  style="cursor:pointer;"  @click="courseDetailFuc(scope.$index)">{{ scope.row.name }}</el-tag>
        </template>
    </el-table-column>
    <el-table-column prop="courselargename" label="课程大类" >
    </el-table-column>
    <el-table-column prop="subjectname" label="科目" show-overflow-tooltip>
    </el-table-column>
    <el-table-column prop="schoolYear" label="学年" show-overflow-tooltip>
    </el-table-column>
    <el-table-column prop="schoolSeason" label="学季" show-overflow-tooltip>
    </el-table-column>
    <el-table-column prop="status" label="状态" show-overflow-tooltip>
      <template slot-scope="scope">
          <el-switch v-model="scope.row.status"  active-color="#13ce66" inactive-color="#cccccc" @change="changeSwitch(scope.row)">
          </el-switch>
        </template>
    </el-table-column>
    <el-table-column label="操作" show-overflow-tooltip>
        <template slot-scope="scope">
        <el-button  type="text" size="small" @click="updateCourseFuc(scope.$index)">编辑</el-button>
        <el-button type="text" size="small" @click="deleteCourseFuc(scope.$index)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination background layout="prev, pager, next" :page-size="pager.page_size" :total="pager.total" style="margin-top: 20px;" @current-change="changePage">
  </el-pagination>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        courseLargeIdIm: false,
        subjectIdIm: false,
        schoolYearIm: false,
        schoolSeasonIm: false,
        cStatusIm: false,
        courseLargeIdAl:false,
        subjectIdAl:false,
        schoolYearAl:false,
        schoolSeasonAl:false,
        cStatusAl:false,
         start:1,
        formData: [],
        courseLargeId:[],
        subjectId:[],
        schoolYear:[],
        schoolSeason:[],
        cStatus:[],
        multipleSelection: [],
        institutionalId: this.$store.getters.orgid,
        searchName: '',
        pager:{
          total: 0,
          page_size: 30,
        },
        conditionData:[]
      }
    },
    methods: {
      courseLargeIdCaChange(val){
        let _this=this;
        _this.courseLargeIdAl=val;
        if(val){
          if(_this.conditionData.category&&_this.courseLargeId){
            let conditionDataTemp= _this.conditionData.category.map((value,key,arr) => {return value.couName});
            conditionDataTemp.push("全部");
            _this.courseLargeId = conditionDataTemp;
          }
        }else{
          _this.courseLargeId = [];
        }

      },
      subjectIdChange(val){
        let _this=this;
        _this.subjectIdAl=val;
        if(val){
          if(_this.conditionData.subject&&_this.subjectId){
            let conditionDataTemp= _this.conditionData.subject.map((value,key,arr) => {return value.name});
            conditionDataTemp.push("全部");
            _this.subjectId = conditionDataTemp;
          }
        }else{
          _this.subjectId = [];
        }

      },
      schoolYearChange(val){
        let _this=this;
        _this.schoolYearAl=val;
        if(val){
          if(_this.conditionData.SchoolYear&&_this.schoolYear){
            let conditionDataTemp= _this.conditionData.SchoolYear.map((value,key,arr) => {return value.acadName});
            conditionDataTemp.push("全部");
            _this.schoolYear = conditionDataTemp;
          }
        }else{
          _this.schoolYear = [];
        }

      },
      schoolSeasonChange(val){
        let _this=this;
        _this.schoolSeasonAl=val;
        if(val){
          if(_this.conditionData.schoolSeason&&_this.schoolSeason){
            let conditionDataTemp= _this.conditionData.schoolSeason.map((value,key,arr) => {return value.seasName});
            conditionDataTemp.push("全部");
            _this.schoolSeason = conditionDataTemp;
          }
        }else{
          _this.schoolSeason = [];
        }

      },
      cStatusChange(val){
        let _this=this;
        _this.cStatusAl=val;
        if(val){
          let conditionDataTemp= [];
          conditionDataTemp.push("全部");
          conditionDataTemp.push("开放");
          conditionDataTemp.push("关闭");
          _this.cStatus = conditionDataTemp;
        }else{
          _this.cStatus = [];
        }

      },
      courseLargeIdGroupChange(val){
        let checkedLength=val.length;
        let index=val.indexOf("全部");
        let flag=false;
        if(index>-1){
          flag=true;
          checkedLength=checkedLength-1;
        }
        this.courseLargeIdIm= checkedLength>0;
        let length=0;
        if(this.conditionData.category){
          length=this.conditionData.category.length;
        }
        if(checkedLength==length){
          this.courseLargeIdIm=false;
          if(!flag){
            val.push("全部")
          }
          this.courseLargeIdAl=true;
        }else if (checkedLength==0){
          this.courseLargeIdAl=false;
          val.pop();
          val=[];
        }else{
          if(flag){
            val.splice(index,1)
          }
          this.courseLargeIdIm=true;
        }
      },
      subjectIdGroupChange(val){
        let checkedLength=val.length;
        let index=val.indexOf("全部");
        let flag=false;
        if(index>-1){
          flag=true;
          checkedLength=checkedLength-1;
        }
        this.subjectIdIm= checkedLength>0;
        let length=0;
        if(this.conditionData.subject){
          length=this.conditionData.subject.length;
        }
        if(checkedLength==length){
          this.subjectIdIm=false;
          if(!flag){
            val.push("全部")
          }
          this.subjectIdAl=true;
        }else if (checkedLength==0){
          this.subjectIdAl=false;
          val.pop();
          val=[];
        }else{
          if(flag){
            val.splice(index,1)
          }
          this.subjectIdIm=true;
        }
      },
      schoolYearGroupChange(val){
        let checkedLength=val.length;
        let index=val.indexOf("全部");
        let flag=false;
        if(index>-1){
          flag=true;
          checkedLength=checkedLength-1;
        }
        this.schoolYearIm= checkedLength>0;
        let length=0;
        if(this.conditionData.SchoolYear){
          length=this.conditionData.SchoolYear.length;
        }
        if(checkedLength==length){
          this.schoolYearIm=false;
          if(!flag){
            val.push("全部")
          }
          this.schoolYearAl=true;
        }else if (checkedLength==0){
          this.schoolYearAl=false;
          val.pop();
          val=[];
        }else{
          if(flag){
            val.splice(index,1)
          }
          this.schoolYearIm=true;
        }
      },
      schoolSeasonGroupChange(val){
        let checkedLength=val.length;
        let index=val.indexOf("全部");
        let flag=false;
        if(index>-1){
          flag=true;
          checkedLength=checkedLength-1;
        }
        this.schoolSeasonIm= checkedLength>0;
        let length=0;
        if(this.conditionData.schoolSeason){
          length=this.conditionData.schoolSeason.length;
        }
        if(checkedLength==length){
          this.schoolSeasonIm=false;
          if(!flag){
            val.push("全部")
          }
          this.schoolSeasonAl=true;
        }else if (checkedLength==0){
          this.schoolSeasonAl=false;
          val.pop();
          val=[];
        }else{
          if(flag){
            val.splice(index,1)
          }
          this.schoolSeasonIm=true;
        }
      },
      cStatusGroupChange(val){
        let checkedLength=val.length;
        let index=val.indexOf("全部");
        let flag=false;
        if(index>-1){
          flag=true;
          checkedLength=checkedLength-1;
        }
        this.cStatusIm= checkedLength>0;
        let length=2;
        if(checkedLength==length){
          this.cStatusIm=false;
          if(!flag){
            val.push("全部")
          }
          this.cStatusAl=true;
        }else if (checkedLength==0){
          this.cStatusAl=false;
          val.pop();
          val=[];
        }else{
          if(flag){
            val.splice(index,1)
          }
          this.cStatusIm=true;
        }
      },
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
        this.start = index
        this.getListFuc()
      },
      addCourseFuc(){
        let data = {type: 'add'}
        this.$router.push({path: '/course/add', data});
      },
      courseDetailFuc(index){
        let courseInfo = this.formData[index]
        this.$router.push({path: '/course/detail', query : courseInfo});
      },
      getListFuc(){
        let _this=this;
          this.loading = true
        let conditionDataTemp=[];
        if(this.conditionData.category&&_this.courseLargeId){
          conditionDataTemp= this.conditionData.category.filter(c=>{return _this.courseLargeId.indexOf(c.couName)>-1}).map((value,key,arr) => {return value.couCatId});
        }

        let subjectIdTemp=[];
        if(this.conditionData.subject&&_this.subjectId){
          subjectIdTemp= this.conditionData.subject.filter(c=>{return _this.subjectId.indexOf(c.name)>-1}).map((value,key,arr) => {return value.subjectId});
        }

        let schoolYearTemp=[];
        schoolYearTemp= [...this.schoolYear]
        if(schoolYearTemp&&schoolYearTemp.indexOf("全部")>-1){
          schoolYearTemp.pop();
        }
        let schoolSeasonTemp=[];
        schoolSeasonTemp= [...this.schoolSeason]
        if(schoolSeasonTemp&&schoolSeasonTemp.indexOf("全部")>-1){
          schoolSeasonTemp.pop();
        }
        //开放1 关闭0 全部 null
        let cStatusTemp=null;
        if(this.cStatus&&this.cStatus.length>0){
          if(this.cStatus.indexOf("全部")>-1){
            cStatusTemp=null;
          }else if(this.cStatus.indexOf("开放")>-1){
            cStatusTemp=1;
          }else if(this.cStatus.indexOf("关闭")>-1){
            cStatusTemp=0;
          }
        }


          let data = {
            courseLargeId:conditionDataTemp,
            campusId: this.institutionalId,
            subjectId: subjectIdTemp,
            schoolYear: schoolYearTemp,
            schoolSeason: schoolSeasonTemp,
            accomplishment: 0,
            cStatus: cStatusTemp,
            name: this.searchName,
            institutionalId: this.institutionalId,
           start:this.start
          }
          this.$store.dispatch('course/findCoursePage', data).then(response => {
            this.loading = false
            this.formData = response.data
            this.formData.map(item=>{
              item.courselargename = item.courseCategoryMaster.couName
              item.subjectname = item.subject.subjectName
            })
            for(let key in this.formData){
              if(this.formData[key].cstatus == 1){
                this.formData[key].status = true
              }
              else{
                this.formData[key].status = false
              }
            }
            this.pager.total = Number(response.total)
          }).catch(() => {
            this.loading = false
          })
      },
      updateCourseFuc(index){
        let data = this.formData[index]
        data.type = "modify"
        this.$router.push({path: '/course/add', query : data});
      },
      deleteCourseFuc(index){
        let data = this.formData[index]

        if(data.hasClasses == 'Y'){
            this.$confirm('该课程有关联班级信息，不可删除', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: false,
              showCancelButton: false,
              type: 'warning'
            });
            return;
        }
        var title = '删除后，将无法找回课程信息，确认删除吗？'
        this.$confirm(title, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.loading = true
          this.$store.dispatch('course/deleteCourseByCId', data).then(() => {
            this.$message({
                type: 'info',
                message: '删除成功'
            });
            this.loading = false
            this.formData.splice(index, 1);
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
      updateCourseStatusFuc(data){
        this.loading = true
        let cstatus = 0
        if(data.status == true)
          cstatus = 1

        this.$store.dispatch('course/updateCourseStatus',{institutionalId: this.institutionalId, courseId: data.courseId, cStatus:cstatus }).then((response) => {
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
      },
      changeSwitch(data){
        let _this = this

        let cstatus = 0
        if(data.status == true)
          cstatus = 1

        if(data.hasClosed == 'N' && cstatus==0){
            this.$confirm('还有班级未结课，不能关闭课程', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: false,
              showCancelButton: false,
              type: 'warning'
            });
            data.status = true
            return;
        }
        if(cstatus == 0){
          var title = '课程关闭后，新建班级将看不到此课程，确认要关闭吗？'
          this.$confirm(title, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            _this.updateCourseStatusFuc(data)
          }).catch(() => {
            data.status = true
            this.$message({
              type: 'info',
              message: '操作已取消'
            });
          });
        }
      },
      findConditionList(){
        this.$store.dispatch('course/findConditionList',{institutionalId: this.institutionalId}).then((response) => {
          this.loading = false
          this.conditionData = response.data
        }).catch(() => {
          this.loading = false
        })
      },
    },
    created(){
      this.findConditionList()
      this.getListFuc()
    }
  }
</script>
