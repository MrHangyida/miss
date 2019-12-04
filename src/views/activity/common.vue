<script type="text/javascript">
  let endTimeGlobal = null;
  function setEndTime(endTimeGlobal) {
    this.endTimeGlobal=endTimeGlobal;
  }
  function getEndTime() {
    return this.endTimeGlobal;
  }
  // 暴露出这些属性和方法
  export default {
    endTimeGlobal,
    setEndTime,
    getEndTime
  }
</script>
