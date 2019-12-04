<template>
  <div class="app-container">
    <div v-for="item in albumData">
    <el-tag style="width:100%;">{{item.instDtmStr}}</el-tag>
      <div style="margin-top:10px; margin-bottom: 30px;display: flex;flex-direction:row;flex-wrap:wrap;justify-content:flex-start;">
        <div v-for="(jitm,index) in item.urlany" @click="showImage(jitm, item.type)" style="position: relative;">
            <img :src="imgUrl+jitm+'!wx'" style="width:150px;height:150px;"/>
            <img v-if="item.type=='video'" :src="imgUrl + '/mp-b/static/icon-bf@3x.png'" style="width:60px;height:60px;position: absolute; top:45px;left:45px"/>
        </div>
      </div>
    </div>


  <el-pagination background layout="prev, pager, next" :page-size="pager.page_size" :total="pager.total" style="margin-top: 20px;" @current-change="changePage">
  </el-pagination>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        classesId: 0,
        institutionalId: this.$store.getters.orgid,
        albumData: [],
        imgUrl: this.$store.getters.upyun_url,
        pager:{
          total: 0,
          page_size:30
        },
        start: 1
      }
    },

    methods: {
      changePage(a){
        this.start = a
        this.getAlbumListFuc()
      },
      getAlbumListFuc() {
        this.loading = true
        this.$store.dispatch('classes/findClassesDynamicByCId',{institutionalId: this.institutionalId, classesId: this.classesId, start: this.start}).then((response) => {
            this.albumData = response.data
            for (let i=0;i< this.albumData.length;i++) {
              if(this.albumData[i].cdnMaster.url == null || this.albumData[i].cdnMaster.url=='' || this.albumData[i].cdnMaster.url=='undefined'){
                this.albumData.splice(i,1)
              }
              if(this.albumData[i].cdnMaster.url.indexOf(";")!=-1){
                 this.albumData[i].urlany = this.albumData[i].cdnMaster.url.split(";")
                 this.albumData[i].type = 'image'
              }else{
                this.albumData[i].urlany=[]
                var imageurl = ''
                var type = ''
                if(this.albumData[i].cdnMaster.url.split(".")[1]=='mp4'){
                  imageurl = this.albumData[i].cdnMaster.url.split(".")[0]+'.jpg'
                  imageurl = imageurl.replace('/video/', '/video_thumb/');
                  type = 'video'
                }
                else{
                  imageurl = this.albumData[i].cdnMaster.url
                  type = 'image'
                }
                this.albumData[i].urlany.push(imageurl)
                this.albumData[i].type = type
              }
            }
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
      },
      showImage(item, type){
        if(type == 'video'){ 
          item = item.replace('.jpg', '.mp4')
          item = item.replace('/video_thumb/', '/video/')
        }
        window.open(this.imgUrl + item, '_blank')
      }
    },
    created(){
      this.classesId = this.$route.query.id
      this.getAlbumListFuc()
    }
  }
</script>
<style>
    img{
        margin-right:20px;
    }
</style>
