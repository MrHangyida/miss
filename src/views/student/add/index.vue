<template>
  <div class="app-container">
    <el-form :rules="rules" ref="form" :model="formData" label-width="120px" size="small">
      <div class="tag-style" style="margin-bottom:30px;width:100%;">基本信息</div>

      <el-row>
        <el-col :span="12">
        <el-form-item label="姓名" prop="rName">
          <el-input v-model="formData.rName" />
        </el-form-item>
        <el-form-item label="年龄" prop="rAge">
          <el-input v-model="formData.rAge" />
        </el-form-item>
        <el-form-item label="性别"  prop="rSexLable">
          <el-radio-group v-model="formData.rSexLable">
            <el-radio label="男"/>
            <el-radio label="女"/>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="出生日期" prop="rBirthday">
          <el-col :span="11">
            <el-date-picker v-model="formData.rBirthday" type="date" placeholder="出生日期" style="width: 100%;" />
          </el-col>
        </el-form-item>
        <el-form-item label="身份证" prop="rCardId">
          <el-input v-model="formData.rCardId" />
        </el-form-item>

        <el-row>
          <el-col :span="12">
            <el-form-item label="学段" prop="rPeriod">
            <el-select v-model="formData.rPeriod" placeholder="学段" @change="changePeriod($event)">
              <el-option v-for="item in periodData" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="年级" prop="rGrade">
            <el-select v-model="formData.rGrade" placeholder="年级">
              <el-option v-for="item in gradeData" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="家庭住址">
          <el-select v-model="formData.rAddressProvince" placeholder="选择省" style="width:30%" @change="getCityFuc($event)">
              <el-option v-for="item in provinceData" :key="item.id" :label="item.town_name" :value="item.town_name">
              </el-option>
          </el-select>
          <el-select v-model="formData.rAddressCity" placeholder="选择市" style="width:30%" @change="getCountyFuc($event)">
              <el-option v-for="item in cityData" :key="item.id" :label="item.town_name" :value="item.town_name">
              </el-option>
          </el-select>
          <el-select v-model="formData.rAddressArea" placeholder="选择区" style="width:30%">
              <el-option v-for="item in countyData" :key="item.id" :label="item.town_name" :value="item.town_name">
              </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="formData.rAddressDetails" />
        </el-form-item>

      </el-col>
      <el-col :span="12">
        <el-form-item label="头像">
          <el-upload
          class="avatar-uploader"
          action="https://v0.api.upyun.com/"
          :show-file-list="false"
          :before-upload="beforeAvatarUpload"
          ref="upload"
          :http-request="onUpload"
          >
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        </el-form-item>
      </el-col>
      </el-row>
      <el-row class="tag-style">
        <el-col :span="22">家长信息 (必须添加一条爸爸或妈妈的联系方式)</el-col>
        <el-col :span="2"><el-button type="primary" class="tag-style-button" size="small" @click="dialogFormVisible = true">添加家长</el-button></el-col>
      </el-row>

      <el-table :data="parentList">
        <el-table-column fixed prop="pName" label="姓名">
        </el-table-column>
        <el-table-column fixed prop="pAppellation" label="称谓">
        </el-table-column>
        <el-table-column fixed prop="pPhone" label="手机号">
        </el-table-column>
        <el-table-column fixed="left" label="操作">
          <template slot-scope="scope">
            <el-button @click.native.prevent="deleteRow(scope.$index, parentList)" type="text" size="small">
            移除
          </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row style="margin-top:20px;">
      <el-col :span="24" style="text-align:center;">
        <el-button type="primary" size="small" @click="onSubmit()">确定添加</el-button>
         <el-button type="primary" size="small" @click="previewFuc()" class="el-button_f2aa44" >预览</el-button>
          <el-button type="primary" size="small" class="el-button_f2aa44" @click="cancelFuc()">取消</el-button>
      </el-col>
      </el-row>
    </el-form>

    <el-dialog title="添加家长" :visible.sync="dialogFormVisible" center>
      <el-form :model="form_add_parent" :rules="rules" ref="parentForm" label-width="120px" >
        <el-form-item label="姓名" prop="pName">
          <el-input v-model="form_add_parent.pName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="称谓" prop="pAppellation">
          <el-input v-model="form_add_parent.pAppellation" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="pPhone">
          <el-input v-model="form_add_parent.pPhone" autocomplete="off" maxlength="11" minlength="11"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelAddParent">取 消</el-button>
        <el-button type="primary" @click="addRow()">确 定</el-button>
      </div>
  </el-dialog>

  </div>
</template>
<script>

import Dropzone from '@/components/Dropzone'
import crypto from 'crypto'

export default {
  components: { Dropzone },
  data() {
    let idCardValidity = (rule, code, callback) => {
      if(!code){
        callback()
      }
      let city = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外 " };
      let tip = ""
      let pass = true

      if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
        tip = "身份证号格式错误"
        pass = false;
      } else if (!city[code.substr(0, 2)]) {
        tip = "地址编码错误"
        pass = false
      } else {
        // 18位身份证需要验证最后一位校验位
        if (code.length === 18) {
          code = code.split('')
          // ∑(ai×Wi)(mod 11)
          // 加权因子
          let factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
          // 校验位
          let parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]
          let sum = 0
          let ai = 0
          let wi = 0
          for (let i = 0; i < 17; i++) {
            ai = code[i]
            wi = factor[i]
            sum += ai * wi
          }
          let last = parity[sum % 11];
          if (parity[sum % 11] != code[17]) {
            tip = "校验位错误"
            pass = false
          }
        }
      }
      if (!pass) {
        callback(new Error(tip))
      } else {
        callback()
      }
    }

    return {
      disabled:false,
      formData: {
        rPhone: '',
        institutionalId: this.$store.getters.orgid,
        rAge: '',
        rName: '',
        rBirthday:'',
        rCardId: '',
        rPeriod: '',
        rGrade: '',
        rAddressDetails: '',
        rAddressProvince: '',
        rAddressCity: '',
        rAddressArea: '',
        rHeight: '',
        rWeight: '',
        cdn: '',
        pInstId: '',
        rSex: 1,
        rSexLable: ''
      },
      periodData:[
        { value: 0, label: '幼儿园' },
        { value: 1, label: '小学' },
        { value: 2, label: '初中' },
        { value: 3, label: '高中' }
      ],
      gradeData:[],
      allGradeData:[
        [{label: '小班' },{label: '中班' },{label: '大班' }],
        [{label: '一年级' },{ label: '二年级' },{ label: '三年级' },{ label: '四年级' },{ label: '五年级' },{ label: '六年级' }],
        [{label: '初一' },{label: '初二' },{label: '初三' }],
        [{label: '高一' },{label: '高二' },{label: '高三' }]
      ],
      provinceData:[],
      cityData:[],
      countyData:[],
      rules: {
        rName: [{ required: true, message: '请输入学生名称', trigger: 'blur' },
                 {  min:2,max: 10, message: '长度在 10 个字符', trigger: 'blur' }
        ],
        rAge: [
          { required: true, message: '请输入学生年龄', trigger: 'blur' },
          {
            pattern: /^(?:[1-9][0-9]?|1[01][0-9]|120)$/,
            message: '请输入正确年龄'
          }
          ],
        rBirthday: [{ required: true, message: '请选择出生日期', trigger: 'blur' }],
        rPeriod: [{ required: true, message: '请选择学段', trigger: 'blur' }],
        rSex: [{ required: true, message: '请选择性别', trigger: 'blur' }],
        pName:  [{ required: true, message: '请输入家长名称', trigger: 'blur' }],
        pAppellation:  [{ required: true, message: '请输入称谓', trigger: 'blur' }],
        pPhone:  [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            validator: function (rule, value, callback) {
              let MobileRegex =/^1[3|4|5|6|7|8][0-9]\d{8}$/;
              if (!MobileRegex.test(value)) {
                callback(new Error('手机号码格式不正确！'))
              } else {
                callback();
              }
            }, trigger: 'blur'
          }
          ],
        rCardId: [{ required: false, message: '请输入证件号', trigger: 'blur' },
          {
            pattern: /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/,
            message: '请输入正确的证件号'
          },
         /* { validator: idCardValidity, trigger: 'blur' }*/]
      },
      parentList: [],
        form_add_parent : {
          pName: '',
          pPhone: '',
          pAppellation: '',
          firstContactYn: 'N'
        },
      dialogFormVisible: false,
      imageUrl: ''
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if(this.parentList.length == 0){
            this.$message.error('必须添加一条爸爸或妈妈的联系方式!');
            return
          }
          this.loading = true
          this.formData.parentList = this.parentList
          this.formData.rPhone = this.parentList[0].pPhone
          this.parentList[0].firstContactYn = 'Y'
          if(this.formData.rSexLable == '男')
            this.formData.rSex = 1
          else
            this.formData.rSex = 2
          let path_url = 'student/addStudentRemarks'
          if(this.$route.query.type == 'modify'){
            path_url = 'student/updateStudentRemarksByRId'
          }
          this.$store.dispatch(path_url, this.formData).then(() => {
            this.$router.push({ path: this.redirect || '/student/list' })
            this.loading = false
          }).catch((e) => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    cancelAddParent(){
      this.dialogFormVisible = false;
      this.resetForm('parentForm');
    },
    addRow() {
     this.$refs['parentForm'].validate((valid) => {
               if (valid) {
                 this.parentList.push({
                     pName: this.form_add_parent.pName,
                     pPhone: this.form_add_parent.pPhone,
                     pAppellation: this.form_add_parent.pAppellation,
                     firstContactYn: 'N'
                     })
                 this.dialogFormVisible = false
                 this.$message({
                           message: '添加成功',
                           type: 'success'
                         });
                 this.resetForm('parentForm');
               } else {
                  this.dialogFormVisible = true
                 return false;
               }
             });
      // this.parentList.push({
      //     pName: this.form_add_parent.pName,
      //     pPhone: this.form_add_parent.pPhone,
      //     pAppellation: this.form_add_parent.pAppellation,
      //     firstContactYn: 'N'
      //     })

    },
    previewFuc() {

      this.$refs.form.validate(valid => {
        if (valid) {
          var data = this.formData
          data.parentList = this.parentList
          data.type = 'preview'
          var birthday = this.formData.rBirthday
          data.rBirthday = new Date(birthday).getFullYear() + '-' +new Date(birthday).getDate()+ '-' +new Date(birthday).getDay()
          let routeUrl = this.$router.resolve({path: '/student/detail', query : data})
          window.open(routeUrl .href, '_blank')
        } else {
          return false
        }
      })
    },
    cancelFuc() {
      this.$router.back(-1);

    },
    beforeAvatarUpload(file) {

      const isImage = (file.type === 'image/jpeg' || file.type ==='image/png');
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isImage) {
        this.$message.error('上传头像图片只能是 JPG或PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isImage && isLt2M;
    },
    onUpload(param){
      this.$store.dispatch('upyun/uploadStudentAvatar', {imagefile: param.file, orgId: this.formData.institutionalId}).then((response) => {
        this.imageUrl = URL.createObjectURL(param.file);
        var md5 = crypto.createHash("md5");
        md5.update(param.file.name);
        var name = md5.digest('hex');
        this.formData.cdn = response + name
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
    },
    changePeriod(prov){
      let datas = []
      this.formData.rGrade = ''
      this.formData.rPeriod = this.periodData[prov].label
      for (var val of this.allGradeData[prov]) {
          datas.push({label: val.label,value: val.label})
      }
      this.gradeData = datas
    },
    getProvinceFuc(){
      this.$store.dispatch('shared/findProvince').then((response) => {
        this.provinceData = response.data
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    getstuedetdetail(a,b){
      let data = {'InstitutionalId':a, 'studentId':b}
      this.$store.dispatch('student/findStudentRAndParentsByRId', data).then((response) => {
        this.parentList = response.data.parentList
        this.parentList.map(item=>{
          item.pName = item.pname
          item.pPhone = item.pphone
          item.pAppellation = item.pappellation
        })
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    getCityFuc(param){
      let pid = this.findParentIdFuc('province', param)
      let data = {"provinceCode": pid}
      this.$store.dispatch('shared/findCity', data).then((response) => {
        this.cityData = response.data
        this.formData.rAddressCity = ""
        this.formData.rAddressArea = ""
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    getCountyFuc(param){
      let pid = this.findParentIdFuc('city', param)
      let data = {"cityCode": pid}
      this.$store.dispatch('shared/findCounty', data).then((response) => {
        this.countyData = response.data
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    findParentIdFuc(type, value){
      let datas = []
      let parentId = 0
        if(type == 'province'){
          datas = this.provinceData
        }
        if(type == 'city'){
          datas = this.cityData
        }

        for(var key in datas){
          if(datas[key].town_name == value){
            parentId = datas[key].id
            break;
          }
        }
        return parentId
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  created(){

    this.getProvinceFuc()
    if(this.$route.query.type == 'modify'){
      this.formData.rPhone = this.$route.query.rphone
      this.formData.institutionalId = this.$route.query.institutionalId
      this.formData.rAge = this.$route.query.rage
      this.formData.rName = this.$route.query.rname
      this.formData.rBirthday = this.$route.query.rbirthday
      this.formData.rCardId = this.$route.query.rcardId
      this.formData.rPeriod = this.$route.query.rperiod
      this.formData.rGrade = this.$route.query.rgrade
      this.formData.rAddressDetails = this.$route.query.raddressDetails
      this.formData.rAddressProvince = this.$route.query.raddressProvince
      this.formData.rAddressCity = this.$route.query.raddressCity
      this.formData.rAddressArea = this.$route.query.raddressArea
      this.formData.rHeight = this.$route.query.rheight
      this.formData.rWeight = this.$route.query.rweight
      this.formData.cdn = this.$route.query.cdn
      this.formData.rId = this.$route.query.rid
      this.formData.rSex = this.$route.query.rsex
       this.getstuedetdetail(this.formData.institutionalId,this.formData.rId)
      this.disabled = true
      if(this.formData.rSex == 1)
        this.formData.rSexLable = '男'
      else
        this.formData.rSexLable = '女'
      //this.parentList = this.$route.query.parentList
      if(this.formData.cdn != null){
        this.imageUrl ='http://image-sgj.test.upcdn.net'+this.formData.cdn
      }
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
