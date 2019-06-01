<template lang="html">
    <div class="group">
      <div class="group-left"><img src="../../static/12.jpg" alt=""></div>
      <div class="group-right">
       
        <span>2018夏 新款高圆圆 同款高腰港味半身裙不规则印花.....</span>
        <span>深蓝色,s</span>
        <div class="serve">
          <span>服务</span>
          <span>服务</span>
          <span>服务</span>
        </div>
        <div class="serve2">
          <span>￥</span>
          <span>80</span>
          <span>X1</span>
        </div>
      </div>
    </div>   
</template>

<script>
export default {
  components: {  
  }

   , data:function(){
      return {
          selected:1,
          
      }
    }
  }
  
</script>

<style lang="less" scoped>
  .group {
    width: 100%;
    height: 18vh;
    border: 1px solid #ccc;
    position: relative;
    background-color: #fff;
    .group-left {
      width: 30%;
      height: 90%;
      // border: 1px solid #000;
      position: absolute;
      margin-top: 5px;
      margin-left: 5px;
      > img {
        width: 100%;
        height: 100%;
      }
    }
    .group-right {
      width: 65%;
      height: 100%;
      // border: 1px solid #000;
      position: absolute;
      right: 0;
     display: flex;
      flex-direction: column;
      justify-content: space-between;
      > span {
        // border: 1px solid #000;
        display: inline-block;
        width: 80%;
        // font-size: 18px;
        height: 30px;
        display: flex;
        align-items: center;
        
      }
      > span:nth-of-type(1) {
        font-size: 13px;
        width: 80%;
        height: 30px;
        // border: 1px solid #000;
        // text-overflow:ellipsis;
        // white-space:nowrap;
        // overflow:hidden;
        // text-overflow:ellipsis;
        // white-space:nowrap;
        // overflow:hidden;
        margin-top: 5px;
      }
      > span:nth-of-type(2) {
        font-size: 10px;
        // border: 1px solid #000;
      }
      .price {
        width: 100%;
        color: #ff6170;
        // border: 1px solid #000;
        font-size: 10px;
        position: absolute;
        // left: 10px;
        top: 60px;
        > span:nth-of-type(2) {
          margin-left: 99px;
          color: #999;
        }
      }
      // 服务
      .serve {
        // border: 1px solid #000;
        display: flex;
        justify-content: center;
        align-items: center;
        justify-content: space-between;
        // margin-top: 15px;
        width: 80%;
        // position: relative;
        height: 45%;
        // top: 10%;
        > span {
          border: 1px solid #ce2e37;
          border-radius: 20px;
          display: inline-block;
          width: 30%;
          height: 40%;
          text-align: center;
          color: #ce2e37;
        }
      }
    }
  }

.serve2 {
  // border: 1px solid #000;
  width: 50px;
  height: 40px;
  color: #ce2e37;
  position: absolute;
  right: -3px;
  top: 10px;
  
  > span:nth-of-type(1) {
    font-size: 10px;
    // border: 1px solid #000;
    
    
  }
  > span:nth-of-type(2) {
    font-size: 20px;
    position: absolute;
    top: -5px;
    // border: 1px solid #000;
  }
  > span:nth-of-type(3) {
    font-size: 8px;
    position: absolute;
    left: 23px;
    bottom: 5px;
    color: #999;
    // border: 1px solid #000;
  }
}

</style>
