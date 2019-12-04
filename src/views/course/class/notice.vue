<template>
  <div class="app-container">
    <el-form :rules="rules" ref="formData" :model="formData" label-width="120px" size="small">
        <el-form-item label="标题" prop="title">
         <!-- <el-input v-model="formData.title" style="width: 50%"/>-->
          {{classInfo.cname+'课程提醒'}}
        </el-form-item>
         <el-form-item label="上课班级" prop="classTime">
          {{classInfo.cname}}
        </el-form-item>
         <el-form-item label="上课时间" prop="classTime">
          {{classInfo.classTime}}
        </el-form-item>
        <el-form-item label="上课地点" prop="classAddress">
          {{classInfo.classAddress}}
        </el-form-item>
        <el-form-item label="授课老师" prop="teacherName">
          {{classInfo.teacherName}}
        </el-form-item>
        <el-form-item label="通知内容" prop="options">
          <el-input type="textarea" :rows="10" v-model="formData.options" style="width: 80%"/>
        </el-form-item>
        <el-form-item>
          <template slot-scope="scope">
          <el-checkbox v-model="checked">保存到常用语</el-checkbox>
          <el-button @click="dialogFormVisible = true" type="text" size="small">
            常用语
          </el-button>
          </template>
        </el-form-item>
        <!--<el-form-item label="发送对象" prop="sendTo">
          <el-select v-model="formData.sendTo" multiple placeholder="请选择">
          <el-option v-for="item in classesData" :key="item.cid" :label="item.cname" :value="item.cid">
          </el-option>
        </el-select>
        </el-form-item>-->
        <el-row style="margin-top:20px; width:80%">
        <el-col :span="24" style="text-align:center;">
            <el-button type="primary" size="small" @click="saveMessageFuc()">确定</el-button>
            <el-button type="primary" size="small" @click="cancelFuc()">取消</el-button>
        </el-col>
        </el-row>
    </el-form>

    <el-dialog :visible.sync="dialogFormVisible" style="height:500px">
        <el-table :data="commonData" tooltip-effect="dark" style="width: 100%">
          <el-table-column label="常用语" prop="comLanguage">
              <template slot-scope="scope">
              <div v-html="scope.row.comLanguage"></div>
            </template>
          </el-table-column>
          <el-table-column width="100">
              <template slot-scope="scope">
              <el-button @click="checkCommonFuc(scope.row)" type="text" size="small">选择</el-button>
            </template>
          </el-table-column>
        </el-table>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        start:'1',
        studentId:0,
        name:"",
        classInfo: {
          classTime: '',
          cname: '',
          classAddress: '',
          teacherName: '',
          classHourId: 0,
          classesId: 0
        },
        formData:
          {
            sendTo: null,
            options: '',
          },
        classesData: [],
        multipleSelection: [],
        classesId: 0,
        institutionalId: this.$store.getters.orgid,
        checked: false,
        commonData: [],
        dialogFormVisible: false,
        rules: {
          //title: [{ required: true, trigger: 'blur', message: '标题不能为空'}],
         /* classTime: [{ required: true, trigger: 'blur', message: '上课时间不能为空'}],
          classAddress: [{ required: true, trigger: 'blur', message: '上课地点不能为空'}],
          teacherName: [{ required: true, trigger: 'blur', message: '授课老师不能为空'}],*/
          options: [{ required: true, trigger: 'blur', message: '通知内容不能为空'}],
          sendTo: [{ required: true, trigger: 'blur', message: '发送对象不能为空'}]
        }
      }
    },

    methods: {
      cancelFuc(){
       this.$router.back(-1);
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
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      saveCommonPhrasesFuc() {
        this.loading = true
        const data = {
          comLanguage: this.formData.options,
          institutionalId: this.institutionalId,
          useYn: 'Y'
        }
        this.$store.dispatch('classes/addCommonLanguage', data).then((response) => {
            this.classesData = response.data
            this.$router.push({path: '/course/class'});
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
      },
      sendMessageFuc() {
        this.$refs.formData.validate(valid => {
            if (valid) {
              this.loading = true
              const data = {
                institutionalId: this.institutionalId,
                classesId: this.classInfo.classesId,
                classHourId: this.classInfo.classHourId,
                title: this.classInfo.cname+"课程提醒",
                classTime: this.classInfo.classTime,
                teacherName: this.classInfo.teacherName,
                classPlace: this.classInfo.classAddress,
                options: this.formData.options,
              }
              this.$store.dispatch('classes/sendMessageByClassesIdAndHourId', data).then((response) => {
                this.classesData = response.data
                this.loading = false
                this.$router.push({path: '/course/class/detail', query : {id : this.classInfo.classesId}});
              }).catch((error) => {
                this.$message.error('发送课程提醒错误');
                this.loading = false
              })
            }
        })
      },
      saveMessageFuc(){
        if(this.checked){
          this.saveCommonPhrasesFuc()
        }
        this.sendMessageFuc()
      },
      getClassListFuc(){
          this.loading = true
          this.$store.dispatch('classes/findClassesInstitutionalPage',{institutionalId: this.institutionalId,studentId:this.studentId,name:this.name,start:this.start}).then((response) => {
              this.classesData = response.data
              this.loading = false
            }).catch(() => {
              this.loading = false
            })
      },
      getCommonListFuc(){
        this.$store.dispatch('classes/findCommonLanguage',{institutionalId: this.institutionalId, start:this.start,count:100,}).then((response) => {
            this.commonData = response.data
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
      },
      checkCommonFuc(data){

				var re1 = new RegExp("<.+?>","g");//匹配html标签的正则表达式，"g"是搜索匹配多个符合的内容
				var msg = data.comLanguage.replace(re1,'');//执行替换成空字符
        this.formData.options = msg
        this.dialogFormVisible = false
      },
    },
    created(){
        this.classInfo = this.$route.query
        console.log(this.classInfo)
        this.getClassListFuc()
        this.getCommonListFuc()
    }
  }
</script>
