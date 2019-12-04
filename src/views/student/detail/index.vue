<template>
  <div class="app-container">
    <div class="tag-style" style="margin-bottom:30px;width:100%;">基本信息</div>
    <el-row  class="basic-info">
        <el-col :span="4">
            <img :src="imagesUrl" style="width:150px;height:150px;"/>
        </el-col>
        <el-col :span="8">
            <el-row class="basic-info">
                <el-col :span="8">学号：{{studentId}} </el-col>
                <el-col :span="8">姓名：{{rName}}</el-col>
                <el-col :span="8" v-if="rSex == 1">性别：男</el-col>
                <el-col :span="8" v-if="rSex == 2">性别：女</el-col>
            </el-row>
            <el-row class="basic-info">
                <el-col :span="16">出生日期：{{rBirthday}} </el-col>
                <el-col :span="8">年龄：{{rAge}}</el-col>
            </el-row>
            <el-row class="basic-info">身份证号：{{rCardId}} </el-row>
            <el-row class="basic-info">家庭住址：{{rAddressDetails}}</el-row>
            <el-row class="basic-info">
                <el-col :span="16">就读阶段：{{rPeriod}}</el-col>
                <el-col :span="8">年级：{{rGrade}}</el-col>
            </el-row>
        </el-col>
        <el-col :span="6" :offset="6" v-if="detailType!='preview'">
       <div id="qrCode" ref="qrcode"></div>
       <div v-show="showbtn">
         <div v-if="mumbs==1">
            <el-input v-model="input1" style="width: 131px;" maxlength="4"></el-input>
          </div>
         <el-button @click="getcode" :disabled = "distrue" type="primary">{{buttonContent}}</el-button>
       </div>
        </el-col>
    </el-row>
    <div class="tag-style" style="margin-bottom:30px;width:100%;">家庭成员</div>
    <el-table :data="parentList" >
        <el-table-column  prop="pname" label="姓名">
        </el-table-column>
        <el-table-column  prop="pappellation" label="称谓">
        </el-table-column>
        <el-table-column  prop="pphone" label="手机号">
        </el-table-column>
      </el-table>
    <div class="tag-style" style="margin-bottom:30px;width:100%;"  v-if="detailType!='preview'">培训信息</div>
    <el-table :data="dataList" style="width: 100%" v-if="detailType!='preview'">
        <el-table-column  prop="classes.courseName" label="课程名称" >
        </el-table-column>
        <el-table-column label="班级名称" >
          <template slot-scope="scope">
            <el-tag size="small" @click="classTrainDetailFuc(scope.row)">{{ scope.row.classes.cname }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column  prop="classes.cstartTime" :formatter="dateFormat" label="开课时间" >
        </el-table-column>
        <el-table-column  prop="classes.cendTime" :formatter="dateFormat" label="结束时间" >
        </el-table-column>
        <el-table-column  prop="classes.cstatus" label="课程状态">
          <template slot-scope="scope">
            <div v-if="scope.row.classes.cstatus == '0'">开放</div>
            <div v-else>已结班</div>
          </template>
        </el-table-column>
        <el-table-column  label="操作">
            <template slot-scope="scope">
          <el-button @click="openDialog(scope.row)" type="text" size="small">
            转班
          </el-button>
          </template>
        </el-table-column>
      </el-table>

    <el-dialog title="转班操作" :visible.sync="dialogFormVisible" width="30%" center>
      <el-form label-width="180px" >
        <el-form-item label="转至" prop="classesId">
          <el-select v-model="classesId" filterable placeholder="请选择">
            <el-option v-for="item in classesDataTemp" :key="item.cid" :label="item.cname" :value="item.cid">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="shiftClasses">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

  import QRCode from 'qrcodejs2'
  import { parseTime } from '@/utils/index'

  export default {
    data() {
      return {
        dialogFormVisible:false,
        currRow:null,
        classesData: [],
        classesDataTemp: [],
        classesId:'',
        showbtn:true,
        mumbs:0,
        input1:"",
        distrue:false,
        buttonContent:'扫码关注该学生',
        imagesUrl:'https://v0.api.upyun.com/image-sgj',
        rPhone: '',
        rAge: '',
        rName: '',
        rSex: '',
        rBirthday: '',
        rCardId: '',
        rPeriod: '',
        rGrade: '',
        rAddressDetails: '',
        rAddressProvince: '',
        rAddressCity: '',
        rAddressArea: '',
        rHeight: '',
        rWeight: '',
        parentList: [],
        dataList: [],
        multipleSelection: [],
        InstitutionalId: this.$store.getters.orgid,
        studentId: 0,
        detailType: ''
      }
    },
    methods: {
        go2Training() {
            this.$router.push({path: '/student/training', params : {id : 1}});
        },
        getStudentDetail() {
          this.$store.dispatch('student/findStudentRAndParentsByRId', {InstitutionalId: this.InstitutionalId, studentId: this.studentId}).then((response) => {
            let birthday = response.data.rbirthday
            this.imagesUrl = 'http://image-sgj.test.upcdn.net'+response.data.cdn
            this.rPhone = response.data.rphone
            this.institutionalId = response.data.institutionalId
            this.rAge = response.data.rage
            this.rBirthday = new Date(birthday).getFullYear() + '-' +new Date(birthday).getDate()+ '-' +new Date(birthday).getDay()
            this.rName = response.data.rname
            this.rCardId = response.data.rcardId
            this.rPeriod = response.data.rperiod
            this.rAddressDetails = response.data.raddressDetails
            this.rAddressProvince = response.data.raddressProvince
            this.rAddressCity = response.data.raddressCity
            this.rAddressArea = response.data.raddressArea
            this.rHeight = response.data.rheight
            this.rWeight = response.data.rweight
            this.rGrade = response.data.rgrade
            this.parentList = response.data.parentList
            this.rSex = response.data.rsex
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        },
        getStudentClasses() {
          this.$store.dispatch('classes/findClassesStudent', {institutionalId: this.InstitutionalId, studentId: this.studentId}).then((response) => {
            if(response.code == 1&&response.data){
              //this.classList = response.data.map(item=> item.classes)
              this.dataList = response.data
            }
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        },
        getStudentQRCode() {
          this.$store.dispatch('student/sendQRcodeCode',{phone:this.rPhone}).then((response) => {
            this.mumbs = 1
            // that.qrcode(response.data)
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        },
        checkcode(){
          this.$store.dispatch('student/getStudentQRCode',{institutionalId: this.InstitutionalId, rid:this.studentId ,phone:this.rPhone,code:this.input1}).then((response) => {
            this.qrcode(response.data)
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        },
        qrcode (url) {
          let qrcode = new QRCode(this.$refs["qrcode"], {
            width: 132,
            height: 132,
            text: url, // 二维码地址
            colorDark : "#000",
            colorLight : "#fff",
          })
          this.showbtn = false
        },
        getcode(){
          var stime = 10
          var that = this
           that.getStudentQRCode()
        var tiem = setInterval(function() {
          if(stime ==0){
            clearInterval(tiem)
            that.distrue = false
            that.buttonContent = '扫码关注该学生'
          }else{
              that.distrue = true
             stime--
             that.buttonContent = stime
          }
          }, 1000);

        },
        dateFormat(row, column, cellValue, index){
          //const daterc = row[column.property]
          if(cellValue){
            return parseTime(cellValue, '{y}-{m}-{d}')
          }
        },
      shiftClasses(){
          //const { institutionalId, orgClassesId,classesId,studentId} = data
        let currRow=this.currRow;
        this.loading = true
        this.$store.dispatch('student/shiftClassesByStudentMySelfId',{institutionalId:this.institutionalId,studentId:this.studentId , orgClassesId:currRow.classes.cid,classesId:this.classesId}).then((response) => {
          if(response.code==1){
            this.getStudentClasses()
            this.loading = false
            this.dialogFormVisible = false;
          }else{
            this.$message.error(response.mess);
          }
        }).catch(() => {
          this.loading = false
        })
      },
      openDialog(row){
          if(row.classes.cstatus==1){
            this.$message.error("当前课程已结班")
            return false;
          }
          let cids=this.dataList.map(item =>item.classes.cid)
          this.classesDataTemp=this.classesData.filter(item =>cids.indexOf(item.cid)==-1)
        this.classesId='';
        this.dialogFormVisible = true;
        this.currRow = row;
      },
      getClassListFuc(){
        this.loading = true
        this.$store.dispatch('classes/findClassesInstitutional',{institutionalId: this.$store.getters.orgid}).then((response) => {
          //this.classesData = response.data
          this.classesData = response.data.filter(item =>item.cstatus==0)
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      },
      classTrainDetailFuc(row){
          return false;
       // this.$router.push({path: '/student/training', query : {type: 'detail'}});
      },
    },
    mounted () {
     // this.qrcode();
    },
    watch: {
      input1(newValue, oldValue) {
        if(newValue.length==4){
         this.checkcode()
        }

      },

    },
   computed: {
     // codelist(data) {
     //     var that = this
     //        var a  = that.input1+""+that.input2+""+that.input3+""+that.input4+""+that.input5+""+that.input6
     //        if(a.length>6){
     //            this.checkcode()
     //        }
     //   return a
     // }
   },
    created() {
      if(this.$route.query.type == 'preview'){
        this.studentId = '-'
        let birthday = this.$route.query.rBirthday
        this.imagesUrl = 'http://image-sgj.test.upcdn.net'+this.$route.query.cdn
        this.rPhone = this.$route.query.rPhone
        this.institutionalId = this.$route.query.institutionalId
        this.rAge = this.$route.query.rAge
        this.rBirthday = this.$route.query.rBirthday
        this.rName = this.$route.query.rName
        this.rCardId = this.$route.query.rCardId
        this.rPeriod = this.$route.query.rPeriod
        this.rAddressDetails = this.$route.query.rAddressDetails
        this.rAddressProvince = this.$route.query.rAddressProvince
        this.rAddressCity = this.$route.query.rAddressCity
        this.rAddressArea = this.$route.query.rAddressArea
        this.rHeight = this.$route.query.rHeight
        this.rWeight = this.$route.query.rWeight
        this.rGrade = this.$route.query.rGrade
        this.parentList = this.$route.query.parentList
        this.rSex = this.$route.query.rSex
        this.parentList = this.parentList.map(function(item){
          return {
            pname: item.pName,
            pappellation: item.pAppellation,
            pphone: item.pPhone
          }
        })
      }
      else if(this.$route.query.type == 'detail'){
        this.studentId = this.$route.query.studentId
        this.getStudentDetail()
        this.getStudentClasses()
      }
       this.detailType = this.$route.query.type
      this.getClassListFuc()
    }
  }
</script>

<style>
.basic-info{
  margin-bottom:10px;
}
</style>
