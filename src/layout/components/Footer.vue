<template>
  <div class="footer">
  <div style="margin: 0 auto;width: 300px">
      <img class="pic-logo" src="@/assets/images/logo.png" alt="logo">
      <div class="mytextleft"><a style="color: #0099CC; font-size:12px;" href="http://www.sgj.xyz">时光机 </a> <span style="color: #999;font-size:12px;">提供技术支持</span> </div>
    </div>
  </div>
</template>

<script>
  export default {
    name:'Footer',
  }
</script>

<style lang="scss" scoped>
  .footer {
    position: fixed;
    bottom: 0px;
    width: 100%;
    height:30px;
    overflow: hidden;
    background: #FFF;
    box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
    margin-left:210px !important;

    .pic-logo {
      text-align: center;
      width: 30px;
      height: auto;
      float: left;
    }
    .mytextleft{
      float: left;
      margin-left: 15px;
    }


  }

</style>
