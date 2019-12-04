<template>
  <div class="app-container">
    <el-form :rules="rules" ref="formData" :model="formData" label-width="120px" size="small">
        <el-form-item label="标题">
          <el-input v-model="formData.cName" style="width: 50%"/>
        </el-form-item>
        <el-form-item label="想法">
          <el-input type="textarea" :rows="10" v-model="formData.cName" style="width: 80%"/>
        </el-form-item>
        <el-form-item label="活动宣传图">
          <div class="components-container">
            <el-upload
              action="https://v0.api.upyun.com/xql-test-oss/wxapp/demo/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              ref="upload"
              :http-request="onUpload"
              >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </div>
        </el-form-item>
        <el-form-item>
          <template slot-scope="scope">
          <el-checkbox v-model="checked">保存到班级相册</el-checkbox>
          </template>
        </el-form-item>
        <el-form-item label="发送对象">
          <el-select v-model="formData.sendTo" multiple placeholder="请选择">
          <el-option v-for="item in classesData" :key="item.cid" :label="item.cname" :value="item.cid">
          </el-option>
        </el-select>
        </el-form-item>
        <el-row style="margin-top:20px; width:80%">
        <el-col :span="24" style="text-align:center;">
            <el-button type="primary" size="small" @click="addClassFuc()">确定</el-button>
            <el-button type="primary" size="small" @click="cancelFuc()">取消</el-button>
        </el-col>
        </el-row>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        formData:
          {
            cName: 'aa',
            sendTo: null
          },
        classesData: [],
        multipleSelection: [],
        classesId: 0,
        institutionalId: this.$store.getters.orgid,
        checked: false,
        dialogImageUrl: '',
        dialogVisible: false,
        imageList: [],
        rules: {
            name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
        },
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
        this.$store.dispatch('upyun/upload', param.file).then((response) => {
            this.dialogImageUrl = URL.createObjectURL(param.file);
            imageList.push(param.file.name)
            this.loading = false
            }).catch(() => {
            this.loading = false
        })
        },
      addClassFuc(){
        this.$router.push({path: '/course/class/add', params : {id : 1}});
      },
      classDetailFuc(){
        this.$router.push({path: '/course/class/detail', params : {id : 1}});
      },
      classAlbumFuc(){
        this.$router.push({path: '/course/class/album', params : {id : 1}});
      },
      studentDetailFuc(){
        this.$router.push({path: '/student/detail', params : {id : 1}});
      },
      getDetailFuc() {
        this.loading = true
        this.$store.dispatch('classes/findClassesInstitutionalPage',{institutionalId: this.institutionalId}).then((response) => {
            this.classesData = response.data
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
      }
    },
    created(){
      this.classesId = this.$route.query.id
      this.getDetailFuc()
    }
  }
</script>
