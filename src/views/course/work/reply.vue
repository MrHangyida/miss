<template>
  <div class="app-container">
    <div class="tag-style" style="margin-bottom:30px;width:100%;">作业名称：{{formData.title}}</div>
    <div v-html="formData.question">

    </div>
    <div v-if="homeworks.length>0">
    <div class="tag-style" style="margin-bottom:30px;width:100%;">学生作业</div>
      <div v-for="homework in homeworks">
      <el-row style="font-size:14px">
        <el-col :span="3" style="text-align: center;">
            <img :src="imgUrl+homework.UserInfo.AvatarUrl+'!wx'" style="width:50px;height:50px;"/>
        </el-col>
        <el-col :span="3">
            {{homework.UserInfo.NickName}}
        </el-col>
        <el-col :span="18" style="text-align: right;">
            {{homework.DataTime}}
        </el-col>
      </el-row>
      <el-row style="margin-bottom:20px; font-size:14px">
        <el-col :offset="3" :span="21" style="text-align: left;">
            <div  v-html="homework.Content.Text_List[0]"></div>
        </el-col>
      </el-row>
      </div>
    </div>


  <!--<el-pagination  v-if="homeworks.length>0" background layout="prev, pager, next" :page-size="pager.page_size" :total="pager.total" style="margin-top: 20px;" @current-change="changePage">
  </el-pagination>-->
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
        title: '',
        question: ''
      },
      id: 0,
      imgUrl: this.$store.getters.upyun_url,
      homeworks: []
    }
  },
  methods: {
    getWorkDetailFuc(data){
      this.$store.dispatch('work/findItemClassTaskByItemId',{id: data.id, institutionalId: this.$store.getters.orgid}).then((response) => {
          this.formData = response.data
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
    },
    getStudentWorksFuc(data){
      this.$store.dispatch('work/getStudentHomework',{id: data.id}).then((response) => {
          console.log(response)
          this.homeworks = response.Data.HomeWorkList
          this.homeworks = this.homeworks.map(function(e){
              var content = JSON.parse(e.Content)
              e.Content = content
              return e
          });
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
    }
  },
  created(){
      this.getWorkDetailFuc(this.$route.query)
      this.getStudentWorksFuc(this.$route.query)
  }
}
</script>
