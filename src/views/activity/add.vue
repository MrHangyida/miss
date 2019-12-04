<template>
  <div class="app-container">
    <el-form :rules="rules" ref="form" :model="formData" label-width="120px" size="small">
   <div class="tag-style" style="margin-bottom:30px;width:100%;">基本信息</div>
      <el-row>
        <el-col :span="20">
        <el-form-item label="活动名称" prop="activityName">
          <el-input v-model="formData.activityName" />
        </el-form-item>
        <el-form-item label="活动时间" prop="startTime">
            <el-date-picker v-model="formData.startTime" type="date" placeholder="开始时间" />
          -
            <el-date-picker :picker-options="pickerOptions" v-model="formData.endTime" type="date" placeholder="结束时间" />
        </el-form-item>
        <el-form-item label="活动地址" required>
            <el-select v-model="formData.provinceId" placeholder="选择省" style="width:25%" @change="getCityFuc($event)">
                <el-option v-for="item in provinceData" :key="item.id" :label="item.town_name" :value="item.town_name">
                </el-option>
            </el-select>
            <el-select v-model="formData.cityId" placeholder="选择市" style="width:25%" @change="getCountyFuc($event)">
                <el-option v-for="item in cityData" :key="item.id" :label="item.town_name" :value="item.town_name">
                </el-option>
            </el-select>
            <el-select v-model="formData.countyId" placeholder="选择区" style="width:25%">
                <el-option v-for="item in countyData" :key="item.id" :label="item.town_name" :value="item.town_name">
                </el-option>
            </el-select>
            <el-form-item prop="address" style="margin-top:20px;">
              <el-input v-model="formData.address" placeholder="请填写详细地址"/>
            </el-form-item>
        </el-form-item>

        <el-form-item label="活动类型" prop="actType">
          <div v-if="actTypes==''">
            <el-button type="text" style="margin-right:20px;" @click="dialogTypeOpen(1)">添加活动类型</el-button>
          </div>
           <div v-else>
            <el-button type="text" style="margin-right:20px;" @click="dialogTypeOpen(1)">{{actTypes}}</el-button>
          </div>
        </el-form-item>
        <el-form-item label="活动人数" prop="numberOfPeople">
          <el-input v-model="formData.numberOfPeople" />
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="学段" prop="period">
            <el-select v-model="formData.period" placeholder="学段" @change="changePeriod($event)">
              <el-option v-for="item in periodData" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="年级" prop="schoolYear">
            <el-select v-model="formData.schoolYear" placeholder="年级">
              <el-option v-for="item in gradeData" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="活动联系人" prop="contacts">
          <el-input v-model="formData.contacts" />
        </el-form-item>
        <el-form-item label="联系电话" prop="contactNumber">
          <el-input v-model="formData.contactNumber" />
        </el-form-item>
        <el-form-item label="活动宣传图" prop="activeimges">
          <div class="components-container">
            <el-upload
              action="https://v0.api.upyun.com/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              ref="upload"
              :http-request="onUpload"
              :file-list="uploadList"
              >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </div>
        </el-form-item>
        <el-form-item label="活动描述" prop="remarks">
          <el-input type="textarea" v-model="formData.remarks" />
        </el-form-item>
        <el-form-item label="活动内容" prop="content">
          <div>
            <tinymce v-model="formData.content" :height="500" :width="800"/>
            </div>
            <div class="editor-content" v-html="formData.content" style="display:none;">
            </div>
        </el-form-item>
      </el-col>
      </el-row>
      <div class="tag-style" style="margin-bottom:30px;width:100%;">活动设置</div>

      <el-form-item label="活动范围" prop="isPublic">
      <el-row>
      <el-col :span="12">
        <el-radio v-model="formData.isPublic" label=1>公开活动</el-radio>
        <el-radio v-model="formData.isPublic" label=0>内部活动</el-radio>
      </el-col>
      </el-row>
      </el-form-item>
      <el-form-item label="是否审核" prop="review">
      <el-row>
      <el-col :span="12">
        <el-radio v-model="formData.review" label=1>是&emsp;&emsp;&emsp;</el-radio>
        <el-radio v-model="formData.review" label=0>否</el-radio>
      </el-col>
      </el-row>
      </el-form-item>
      <el-form-item label="发送对象" prop="classesId" v-if="formData.isPublic == 0">
        <el-select v-model="formData.classIds" filterable placeholder="请选择">
        <el-option v-for="item in classesData" :key="item.cid" :label="item.cname" :value="item.cid">
        </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="报名信息" prop="titles">
        <el-row><el-button type="text" style="margin-right:20px;font-size:14px;" @click="dialogTitleFormVisible = true">添加</el-button></el-row>
        <el-row width="300" v-for="(item, index) in activityTitles">
            <el-col :span="2">{{item.name}}</el-col>
            <el-col  :span="2" v-if="item.type=='input'"><input/></el-col>
            <el-col  :span="4" v-if="item.type=='radio'"><el-radio v-model="radio" label="1">男</el-radio><el-radio v-model="radio" label="2">女</el-radio></el-col>
            <el-col :span="2" :offset="2">
            <el-button v-if="index > 2" @click.native.prevent="deleteTitleFuc(index)" type="text" size="small">
              移除
            </el-button>
            </el-col>
        </el-row>
      </el-form-item>
      <el-row style="margin-top:50px;">
      <el-col :span="20" style="text-align:center;">
        <el-button type="primary" size="small" class="el-button_fc8433" @click="addActivityFuc()">提交</el-button>
      </el-col>
      </el-row>
    </el-form>

    <el-dialog title="选择活动类型" :visible.sync="dialogTypeFormVisible">
      <!--<div style="color: #000;">最多选择5个类别</div>-->
      <div v-for="types in activityTypes">
        <el-radio-group v-model="checkedTypes">
          <div style="margin-top: 20px;"></div>
          <!--<el-row>全选</el-row>-->
          <div></div>
          <el-radio v-for="item in types.dictDetailsSet" :label="item.codeName" :key="item.codeValue" style="width:15%;">{{item.codeName}}</el-radio>
        </el-radio-group>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTypeFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeActivityTypeFuc()">确 定</el-button>
      </div>
    </el-dialog>

     <el-dialog title="添加报名信息" :visible.sync="dialogTitleFormVisible">
      <el-form :model="form_add_title" :rules="rules" ref="titleForm"  label-width="120px" >
        <el-form-item label="报名信息" prop="name">
          <el-input v-model="form_add_title.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTitleFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addTitleFuc()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>

import Dropzone from '@/components/Dropzone'
import Tinymce from '@/components/Tinymce'
import { validPhone } from '@/utils/validate'
import crypto from 'crypto'

export default {
  components: { Dropzone , Tinymce },
  data() {
    const validatePhone = (rule, value, callback) => {
       if (!validPhone(value)){
          callback(new Error('请输入电话号码'))
      }else  if (!validPhone(value)){
        callback(new Error('请输入正确的11位手机号码'))
      }else {
          callback()
      }
    }
    const validateActivityTime = (rule, value, callback) => {
       if (this.formData.startTime == ''){
          callback(new Error('活动开始时间不能为空'))
      }else  if (this.formData.endTime == ''){
        callback(new Error('活动结束时间不能为空'))
      }else  if (this.formData.endTime < this.formData.startTime){
        callback(new Error('开始时间不能大于结束时间'))
      }else {
          callback()
      }
    }
    return {
      formData: {
        activityName: '',
        isPublic: '1',
        review:'1',
        actType: 'ss',
        qualityType: 'XKSY',
        startTime: '',
        endTime: '',
        numberOfPeople: '',
        isStart: 1,
        provinceId: '',
        cityId: '',
        countyId: '',
        address: '',
        schoolYear: '',
        period: '',
        contacts: '',
        contactNumber: '',
        content: '',
        remarks: '',
        classIds: '',
        currentOrgId: this.$store.getters.orgid,
        coverPicture: '',
        pictures: [],
        titles: ['姓名', '性别', '联系电话'],
        rGrade: '',
        activeimges:"",
        firstFlag:false,
      },
      rules: {
        activityName: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        startTime: [{ required: true, message: '请输入正确的活动时间', trigger: 'blur', validator: validateActivityTime}],
        contactNumber: [{ required: true, trigger: 'blur', validator: validatePhone, message: '请填写正确的手机号'}],
        actType: [{ required: true, message: '请选择活动类型', trigger: 'blur' }],
        numberOfPeople: [{ required: true, message: '请输入活动人数', trigger: 'blur' }],
        period: [{ required: true, message: '请选择学段', trigger: 'change' }],
        schoolYear: [{ required: true, message: '请选择年级', trigger: 'change' }],
        contacts: [{ required: true, message: '请输入联系人信息', trigger: 'blur' }],
        remarks: [{ required: true, message: '请输入活动描述', trigger: 'blur' }],
        content: [{ required: true, message: '请输入活动内容', trigger: 'blur' }],
        provinceId:[{ required: true, message: '请选择省份', trigger: 'change' }],
        cityId:[{ required: true, message: '请选择市', trigger: 'change' }],
        countyId:[{ required: true, message: '请选择区域', trigger: 'change' }],
        address:[{ required: true, message: '请输入详细地址', trigger: 'blur' }],
        activeimges:[{ required: true, message: '请上传宣传图', trigger: 'change' }]
      },
      dialogImageUrl: '',
      dialogVisible: false,
      imageList: [],
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
      classesData: [],
      institutionalId: this.$store.getters.orgid,
      activityId: 0,
      dialogTypeFormVisible: false,
      dialogTitleFormVisible: false,
      checkedTypes: '',
      activityTypes: [],
      actTypes: '',
      uploadList: [],
      activityTitles:[{name: '姓名', type:'input'}, {name: '性别', type:'radio'},{name: '联系电话', type:'input'}],
      form_add_title: {
        name: '项目1'
      },
      radio: '1',
       pickerOptions: {
        disabledDate: (time) => {
          // 设置可选择的日期为今天之后的一个月内
          const curDate = (new Date()).getTime()
          // 这里算出一个月的毫秒数,这里使用30的平均值,实际中应根据具体的每个月有多少天计算
          const day = 10 * 24 * 3600 * 1000
          const dateRegion = curDate + day
          return time.getTime() < Date.now() - 8.64e7 || time.getTime() > dateRegion
        }
      }
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    handleRemove(file, fileList) {
      this.imageList = []
      for(var item in fileList){
        this.imageList.push(fileList[item].name)
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    onUpload(param){
      this.$store.dispatch('upyun/uploadActivityImage', {imagefile: param.file, orgId: this.institutionalId}).then((response) => {
        this.dialogImageUrl = URL.createObjectURL(param.file)
          var md5 = crypto.createHash("md5");
          md5.update(param.file.name);
          var name = md5.digest('hex');
          this.imageList.push(response + name)
          this.loading = false
        }).catch(() => {
          this.loading = false
      })
    },
    changePeriod(prov){
      let datas = []
      //如果是详情页面，而且是第一次change，不需要触发学年的赋值，防止把回显数据清掉
      if(!this.firstFlag){
        this.formData.schoolYear = ''
      }
      this.firstFlag=false;

      this.formData.period = this.periodData[prov].label
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
    getCityFuc(param){
      let pid = this.findParentIdFuc('province', param)
      let data = {"provinceCode": pid}
      this.$store.dispatch('shared/findCity', data).then((response) => {
        this.cityData = response.data
        this.formData.cityId = ""
        this.formData.countyId = ""
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
    getClassListFuc(){
        this.loading = true
        this.$store.dispatch('classes/findClassesInstitutional',{institutionalId: this.institutionalId}).then((response) => {
            this.classesData = response.data
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
    },
    addActivityFuc(){
      if(this.imageList.length==0)
        this.formData.activeimges = ''
      else
        this.formData.activeimges = 'images'
      if(this.imageList.length==0){
          this.$message.error('请上传活动宣传图');
      }else{
        this.$refs["form"].validate((valid) => {
            if (valid) {
             this.formData.coverPicture = this.imageList[0]
             this.formData.pictures = this.imageList
             if(this.$route.query.type == 'modify'){
               this.modifyActivityFuc()
               return
             }
             this.$store.dispatch('activity/saveActivity', this.formData).then((response) => {
                 this.$router.push({ path: this.redirect || '/activity/activity' })
                 this.loading = false
               }).catch(() => {
                 this.loading = false
               })
            } else {

              return false;
            }
          });
        }


    },
    modifyActivityFuc(){
      this.formData.activityId = this.activityId
      this.$store.dispatch('activity/updateActivityByActivityId', this.formData).then((response) => {
          this.$router.push({ path: this.redirect || '/activity/activity' })
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
    },
    findActivityTypeFuc(){
      this.$store.dispatch('shared/findDictByDictCode', {dictCode: 'activity'}).then((response) => {
          this.activityTypes = response.data[0].dictGroupBeanSet
          this.loading = false
        }).catch(() => {
          this.loading = false
      })
    },
    changeActivityTypeFuc(){
/*      this.actTypes = ''
      this.formData.actType = ''
      for(var item in this.checkedTypes){
        this.actTypes += this.checkedTypes[item] + ' '
        this.formData.actType += this.checkedTypes[item] + ';'
      }
      this.formData.actType = this.formData.actType.substring(0, this.formData.actType.length-1)
      this.dialogTypeFormVisible = false*/
      this.actTypes = this.checkedTypes
      this.formData.actType = this.checkedTypes
      this.dialogTypeFormVisible = false
    },
    getDetailFuc(){
      this.$store.dispatch('activity/findDetailsByActivityId', {activityId: this.activityId}).then((response) => {
        this.firstFlag=true;
        this.formData = response.data
        this.formData.review=this.formData.review+"";
        this.imageList = this.formData.images
        for(var item in this.formData.images){
            this.uploadList.push({name: this.formData.images[item], url: 'http://image-sgj.test.upcdn.net' + this.formData.images[item]})
        }
        console.log(this.uploadList);
        this.activityTitles = []

        for(var item in this.formData.titles){
          this.activityTitles.push({name: this.formData.titles[item], type: 'input'})
        }

        this.actTypes = this.formData.actType
        this.checkedTypes = this.formData.actType.split(';')
        this.formData.isPublic = this.formData.isPublic+""
        this.formData.classIds = this.formData.classIds
        this.formData.currentOrgId = this.formData.orgId
        this.formData.startTime = new Date(this.formData.startTime)
        this.formData.endTime = new Date(this.formData.endTime)
        this.loading = false
        let period=this.formData.period;
        let periodVal=this.periodData.filter(item =>item.label==period)[0].value;
        this.changePeriod(periodVal);
      }).catch(() => {
        this.loading = false
      })
    },
    addTitleFuc(){
      this.formData.titles.push(this.form_add_title.name)
      this.activityTitles.push({name: this.form_add_title.name, type: 'input'})
      this.dialogTitleFormVisible = false
    },
    deleteTitleFuc(index){
      this.formData.titles.splice(index-3, 1)
      this.activityTitles.splice(index, 1)
    },
    dialogTypeOpen(flag){
      if(flag){
        this.checkedTypes=this.actTypes;
        this.dialogTypeFormVisible = true;
      }
    }
  },
  created(){
    this.getProvinceFuc()
    this.getClassListFuc()
    this.findActivityTypeFuc()
    if(this.$route.query.type == 'modify'){
      this.activityId = this.$route.query.activityId
      this.getDetailFuc()
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>
