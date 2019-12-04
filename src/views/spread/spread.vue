<template>
  <div class="bodywidth">
    <div class="header-box">
        <p><span class="el-icon-close "></span>公司简介</p>
    </div>
    <div class="twobox">
      <div class="imgbox">
        <img :src="logo" alt="">
      </div>
      <p>{{formData.orgName}}</p>
    </div>
    <div class="contentbox">
      <div>
        <div class="spanbox">
          <span class="span1"></span>
          <span class="span2"></span>
          <p>公司简介</p>
        </div>
         <p class="text-p text-conyent">
             {{formData.remarks}}
         </p>
         <p style="text-align: center;"><span class="el-icon-arrow-down"></span></p>
      </div>

      <div class="margin-top20">
       <div class="spanbox">
         <span class="span1"></span>
         <span class="span2"></span>
         <p>公司地址</p>
       </div>
           <p class="text-p">
               {{formData.address}}
           </p>
      </div>
      <div class="margin-top20">
       <div class="spanbox">
         <span class="span1"></span>
         <span class="span2"></span>
         <p>公司联系人</p>
       </div>
           <p class="text-p">
              {{formData.personName}}{{formData.personPhone}}
           </p>
      </div>
    </div>
    <div class="footerbox">
          <p> 分享到家长群,让家长时刻关注孩子在机构的学习情况。 </p>
          <el-button @click="showfenfun()">分享</el-button>
        <div style="z-index: 111111;" v-show="showfenxiang">
            <vshare :vshareConfig="vshareConfig"> </vshare>
         </div>
    </div>

  </div>
</template>

<script>


export default {
  components: {
  },
  data() {
    return {
        vshareConfig: {
                 shareList: [
                  'weixin'
                 ],
                 common : {
                  bdUrl:"http://edu.sgj.xyz/#/speardForm"
                 },
                 share : [{

                   }
                 ],
                 slide : [
                   //此处放置浮窗分享设置
                 ],
                 image : [
                   //此处放置图片分享设置
                 ],
                 selectShare : [
                   //此处放置划词分享设置
                 ]
               },
               showfenxiang:false,
               formData:{},
               logo:"",
                imagesUrl:'https://v0.api.upyun.com/image-sgj',
    }
  },
  watch: {

  },
  created() {
   this.getInfoFuc()
  },
  methods: {
    showfenfun(){
      this.showfenxiang =  !this.showfenxiang
    },
   getInfoFuc(){
     // this.loading = true
       this.$store.dispatch('H5api/findOrganById', {currentOrgId:3}).then((response) => {
         // console.log("ddddd",response)
         // this.loading = false
         this.formData = response.data
         if(response.data.logo != null && response.data.logo != '')
           this.logo =  this.$store.getters.upyun_url + response.data.logo
         console.log(this.formData,"fddddddddddddd")
         // if(response.data.logo != null && response.data.logo != '')
           // this.logo =  this.$store.getters.upyun_url + response.data.logo
       }).catch(() => {
         this.loading = false
       })
   },
  }
}
</script>

<style lang="scss">
 .bodywidth{
   width: 100%;
   height: 100%;
   background-image:url(../../assets/images/backimgse.png);
     background-repeat: repeat;
     background-size: 74% 50%;
 }
 .header-box{
       width: 100%;
       padding: 15px;
       height: auto;

 }
 .bdshare-button-style0-16 a, .bdshare-button-style0-16 .bds_more{
   //background-image: none !important;
 }
 .header-box p{
   text-align: center;
   font-weight: bold;
   font-size:18px;
   color: #333333;
 }
 .header-box span{
   float: left;
   margin-left: 8px;
   width: 18px;
   height: 18px;
 }
 .imgbox{
   width: 26%;
   height: 100px;
   margin: 0 auto;
 
    // background-color: #666666;
 }
 .imgbox img{
   width: 100%;
   height: 100px;
   border-radius: 10px;
   margin: 0 auto;
 }
 .imgbox p{
   width: 100%;
   text-align: center;
 }
 .twobox{
   width: 100%;
   text-align: center;
   margin-top: 30px;

 }
 .twobox p{
   font-size: 17px;
   color: #333333;
   font-weight: bold;
    margin-top: 30px;
 }
 .spanbox{
  position: relative;
 }
 .spanbox span{
   width: 15px;
   height: 15px;
 }
 .span1{
   position: absolute;
   background-color: #FFDAAD;
 }
 .span2{
   position: absolute;
   border: 1px solid #FF8C00;
   left: 7px;
   top: 7px;
   z-index: 111;
 }
 .spanbox P{
   padding-left: 30px;
   color: #333333;
   font-weight: bold;
   font-size: 15px;

 }
 .footerbox{
   width: 100%;
   padding: 12px 17px;
   position: fixed;
   bottom: 0;
   background-color: #FFFFFF;
   box-shadow: 0px -5px 10px rgba(0,0,0,0.1)
 }
 .footerbox button{
         float: right;
         width: 28%;
         margin-top: 15px;
         height: 28px;
         font-size: 13px;
         line-height: 5px;
   }
   .footerbox p{
     float: left;
         width: 72%;
         font-size: 13px;
         color: #333333;
         font-weight: bold;
   }
   .contentbox{
     margin-top: 33px;
     padding: 0 15px;
   }
   .text-p{
     color: #333333;
     font-size: 14px;
     line-height: 26px;
   }
   .text-conyent{
     // height: 135px;
   }
   .margin-top20{
      margin-top: 30px;
   }
</style>
