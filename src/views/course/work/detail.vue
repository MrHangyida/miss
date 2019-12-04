<template>
  <div class="app-container">
    <div class="tag-style" style="margin-bottom:30px;width:100%;">作业名称：{{formData.ansName}}</div>
    <div v-html="formData.ansQuestion">

    </div>
  </div>
</template>
<script>

import Dropzone from '@/components/Dropzone'
import Tinymce from '@/components/Tinymce'

export default {
  components: { Dropzone , Tinymce },
  data() {
    return {
      formData: {
       ansQuestion: '',
        ansName: '',
        courseId: 3,
        teacherId: 1,
        ansStatus: 0,
        institutionalId: this.$store.getters.orgid
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
      },
      dialogFormVisible: false,
      content: '请输入作业内容'
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
    handleClick(tab, event) {
        console.log(tab, event);
    },
    getWorkDetailFuc(data){
      this.$store.dispatch('work/findTaskByIdAndCourseId',{courseId: data.courseId, id: data.id}).then((response) => {
          this.formData = response.data
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
    }
  },
  created(){
      if(this.$route.query.type == 'preview'){
        this.formData = this.$route.query
      }
      else if(this.$route.query.type == 'detail'){
        this.getWorkDetailFuc(this.$route.query)
      }
  }
}
</script>
