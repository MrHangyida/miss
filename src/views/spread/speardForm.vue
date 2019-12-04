<template>
  <div>
    <div class="yellowbox">
      <div class="titlediv">
        <p> XXX机构</p>
        <p> 邀请您填写信息</p>
      </div>
      <div class="title2">
        记录孩子学习和生活中的点滴
      </div>

    </div>
    <div class="contentbox">
      <div class="image1">
        <img src="../../assets/images/book2.png" alt="">
      </div>
      <div class="image2">
        <img src="../../assets/images/book.png" alt="">
      </div>
      <div class="formbox ">
       <div class="titlesp">
          <p>亲爱的家长</p>
         <span></span>
        </div>
        <p style="line-height: 25px;color: #333333;font-size: 13px;margin-top: -4px;">
          您好！感谢您关注时光机成长导航小程序，
          在这里您可以与千万家长一起搭建宝贝的成
          长时光机，见证宝贝的成长，全面掌握宝贝
          成长过程中德智体美劳五大核心素养的数据
          信息。现在需要您将个人信息 以及在XXXXXX
          机构学习的宝贝儿信息上传的到信息库，以保
          证更准确记录学生的成长数据。
        </p>
        <p style="font-size: 12px;">
          <el-radio v-model="radio" style="margin-right: 0;"></el-radio>请认真阅读<a href="">《隐私政策》</a>和<a href="">《用户服务协议》</a>
        </p>

      </div>
      <div class="formbox">
        <div class="lian1"><img src="../../assets/images/helf.png" alt=""></div>
        <div class="lian2"><img src="../../assets/images/helf.png" alt=""></div>
        <el-form :model="ruleForm" status-icon :rules="rules2" label-position='left' ref="ruleForm" label-width="82px"
          class="demo-ruleForm">
          <div class="titlesp">
             <p>家长信息</p>
            <span></span>
           </div>
          <div class="padding20">
            <el-form-item label="您的姓名" prop="pName">
              <el-input type="text" v-model="ruleForm.pName" auto-complete="off" style="width: 80%;"></el-input>
            </el-form-item>
            <span class="myline"></span>
          </div>
          <div class="padding20">
            <el-form-item label="手机号" prop="pPhone">
              <el-input type="text" v-model="ruleForm.pPhone" auto-complete="off" style="width: 80%;"></el-input>
            </el-form-item>
            <span class="myline"></span>
          </div>
          <div class="padding20">
            <el-form-item label="验证码" prop="phoneCode">
              <el-input type="text" v-model="ruleForm.phoneCode" auto-complete="off" style="width: 55%;"></el-input>
              <el-button size="mini" @click="getcode">{{codename}}</el-button>
            </el-form-item>
            <span class="myline"></span>
          </div>
          <div class="padding20">
            <el-form-item label="你是孩子的" prop="pAppellation">
              <el-select v-model="ruleForm.pAppellation" placeholder="请选择" style="width: 80%;">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <span class="myline"></span>
          </div>
        </el-form>

      </div>
      <div class="formbox" v-for="(item,index) in templatelist">
        <div class="lian3"><img src="../../assets/images/helf.png" alt=""></div>
        <div class="lian4"><img src="../../assets/images/helf.png" alt=""></div>
        <span class="el-icon-close deletedspan" @click="deleted(index)" v-if="index>0"></span>
        <!-- 孩子信息 -->
        <kidinfortemp :nameid="item" ref="name0"></kidinfortemp>
      </div>
      <div class="errorbox">
        <p class="iconspan"><span class="el-icon-warning"></span></p>
        <div>
          <p>1、请填写在xxx机构上课的孩子信息。</p>
          <p>2、机构后期会使用人脸识别技术进行签到请您上传宝宝正面近照。</p>
        </div>
      </div>
      <div class="footerbox">

        <div>
          <el-button @click="addkids()">添加孩子</el-button>
          <el-button type="primary" @click="Submission()">提交</el-button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import kidinfortemp from '@/views/spread/components/kidinfortemplate'
  export default {
    components: {},
    data() {
      var validatename = (rule, value, callback) => {
        if (value == '') {
          return callback(new Error('姓名不能为空'));
        } else {
          callback()
        }
      }
      var validatephone = (rule, value, callback) => {
        if (value == '') {
          return callback(new Error('手机号不能为空'));
        } else if(value){
          let MobileRegex =/^1[3|4|5|6|7|8][0-9]\d{8}$/;
          if (!MobileRegex.test(value)) {
            callback(new Error('手机号码格式不正确！'))
          } else {
            callback();
          }
        } else{
          callback()
        }
      }
      var validatecode = (rule, value, callback) => {
        if (value == '') {
          return callback(new Error('验证码不能为空'));
        } else {
          callback()
        }
      }
      var validatekids = (rule, value, callback) => {
        if (value == '') {
          return callback(new Error('关系不能为空'));
        } else {
          callback()
        }
      }
      return {
        num: 0,
        codename: '验证码',
        radio: 0,
        options: [{
          value: '父亲',
          label: '父亲',
        }, {
          value: '母亲',
          label: '母亲',
        }],
        value: '',
        ruleForm: {
          pName: "",
          pPhone: '',
          phoneCode: '',
          pAppellation: '',
        },
        rules2: {
          pName: [{
            validator: validatename,
            trigger: 'blur',
          }],
          pPhone: [{
            validator: validatephone,
            trigger: 'blur',
          }],
          phoneCode: [{
            validator: validatecode,
            trigger: 'blur',
          }],
          pAppellation: [{
            validator: validatekids,
            trigger: 'change',
          }],
        },
        templatelist: [{
          kid: 'name0',
          id: 'id0',
          rName:"",
          rBirthday:"",
          rPeriod:"",
          rSexLable:"",
          rGrade:"",
          classesId:10138
        }]
      }
    },
    components: {
      kidinfortemp,
    },
    watch: {

    },
    created() {

    },
    methods: {
      getcode() {
        var time = 60
        var that = this
        var times = setInterval(function() {
          time--
          console.log(time, "时间")
          that.codename = time + "s"
          if (time == 0) {
            that.codename = "验证码"
            clearInterval(times)
          }
        }, 1000)
      this.$store.dispatch('H5api/getcodefun', {phones:this.ruleForm.pPhone}).then(() => {
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
      },
      addkids() {
        this.num++
        var obj = {
          kid: 'name' + this.num,
          id: 'id' + this.num
        }
        this.templatelist.push(obj)
        console.log(this.templatelist)
      },
      deleted(index) {
        this.templatelist.splice(index, 1)
        console.log(this.templatelist)
      },
      Submission() {


        var flag = false
        var newflag = false
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
               flag =true
          } else {
            console.log('error submit!!');
            return false;
          }
        });
          var k = this.$refs['name0']
           var studentList = []
           var onoff = false
          for(let i=0;i<k.length;i++){
            if( k[i]){
               k[i].submit()
               if(flag&&k[i].flag){
                  onoff = true
                 if(k[i].nameid.rSexLable == '男')
                   k[i].nameid.rSex = 1
                 else
                   k[i].nameid.rSex = 2
                 studentList.push( k[i].nameid)
               }
            }
          }
          if(onoff){
            this.ruleForm.studentList = studentList
             this.ruleForm.institutionalId=18
            this.$store.dispatch('H5api/addstudent', this.ruleForm).then(() => {
              this.loading = false
            }).catch(() => {
              this.loading = false
            })
          }



      },

    }
  }
</script>


<style>
  .yellowbox {
    width: 100%;
    height: 319px;
    background-image: url(../../assets/images/yellowback.png);
    background-repeat: no-repeat;
    background-size: 100%;
  }

  .yellowbox .titlediv {
    font-size: 30px;
    width: 100%;
    color: #FFFFFF;
    padding-top: 40px;
    width: 100%;
    text-align: center;
  }

  .title2 {
    width: 62%;
    padding: 7px;
    border-radius: 14px;
    margin: 0 auto;
    color: #F2A240;
    font-size: 14px;
    margin-top: 5px;
    text-align: center;
    background-color: #FFFFFF;
  }

  .titlediv p {
    margin: 0;
    line-height: 45px;
  }

  .contentbox {
    position: relative;
    bottom: 140px;
  }

  .formbox {
    width: 83.2%;
    margin: 20px auto;
    position: relative;
    -webkit-box-shadow: 0 0 20px #FF8C00;
    box-shadow: 0 0 20px #FF8C00;
    z-index: 11;
    padding: 24px;
    background-color: #fff;
    border-radius: 12px;
  }

  .formbox .lian1 {
     position: absolute;
     top: -42px;
  }

  .lian1 img {
    height: 60px;
  }

  .lian2 img {
    height: 60px;
  }

  .formbox .lian2 {
       position: absolute;
       right: 23px;
       top: -42px;
  }



  .formbox .lian3 {
  position: absolute;
  top: -42px;
  }

  .lian3 img {
    height: 60px;
  }

  .lian4 img {
    height: 60px;
  }

  .formbox .lian4 {
   position: absolute;
   right: 23px;
   top: -42px;
  }

  .el-input__inner {
    border: none !important;
  }

  .myline {
    width: 100%;
    border: 0.5px solid #E5E5E5;
    z-index: 11;
    float: right;
  }

  .errorbox {
        color: #FF0000;
        padding: 20px 43px;
        border-top: 1px dashed #E5E5E5;
        font-size: 11px;

  }

  .errorbox p {
    margin: 0 !important;
  }

  .iconspan {
    float: left;
  }

  .errorbox div {
    width: 92%;
    margin-left: 20px;
    line-height: 20px;

  }

  .el-form-item {
    margin: inherit !important;
  }

  .image1 img {
    width: 75px;
    position: absolute;
    left: 36px;
    top: -33px;
    z-index: 22;
  }

  .image2 img {
    width: 121px;
    position: absolute;
    right: 6px;
    top: -44px;
    z-index: 22;
  }

  .deletedspan {
    font-size: 23px;
  }

  .padding20 {
    padding: 0 0 15px 0;
  }

  .footerbox{
    text-align: center;
  }
  .titlesp{
    position: relative;
    padding: 27px;
  }
  .titlesp p{
  color: #3D52F8;
      z-index: 21112;
      position: absolute;
      left: 0;
      top: 0px;
  }
  .titlesp span{
      width: 74px;
      height: 7px;
      background: #FDDF3C;
      position: absolute;
      left: 0;
      z-index: 1;
      top: 27px;
  }
</style>
