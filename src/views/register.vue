<template>
  <div class="tmpl">
    <div class="box">
      <!-- 头部 -->
      <div class="head">
      <div class="site">
        <div @click="goHome">
          <van-icon name="arrow-left" />
        </div>
      </div>
    </div>

        <!-- 头像 -->
      <div class="avater">
        <div><img src="../assets/login/drawable-xhdpi/a.png" alt=""></div>
      </div>
    </div>

    <div class="box2">
      <div class="form" @click="download">
        <img src="../../img/index/home/download.png" alt="">
      </div>
    </div>

  </div>
</template>

<script>
  import { Toast } from "vant";

  export default {
    components: {
    },
    data() {
      return {
      browserType: {}, // 浏览器标识
      }
    },
    mounted() {
      
    },
    created() {
      this.browserType = this.browser
    },

    methods: {
      goHome() {
        this.$router.replace({
          path: '/login'
        })
      },

      download() {
        window.location.href = 'https://new.zhulixc.com/download/app/zhulixc.apk'
      }
    }
  };
</script>
<style scoped lang="less">
@import "../assets/login/icon/icon.less";
.tmpl {
width: 100%;
height: 100%;
}
.box{
  width: 100%;
  height: 65%;
  position: absolute;
  top: 0;
  left: 0;
   background-image: url(../assets/login/drawable-xhdpi/diban.png) ;
  background-repeat: no-repeat;
  background-size:  100% 146%;;
  background-position: 0 0;
.head{
  width: 76%;
  height: 4rem;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100000;
  display: flex;
  justify-items: center;
  padding:1rem;
   font-size:2rem;
    color:#fff;

  .site{
    font-size:2rem;
    color:#fff;
    flex:1;
  }
  }
  .avater{
    width:100%;
    height:100% ;
    div{
      width:38%;
      margin:3.5rem auto;
       img{
         width:100%;
         height:100%;
         display:block;
       }
    }
  }
}
.box2{
  width: 100%;
  height: 69%;
  position: absolute;
  bottom:0;
  left: 0;
  background-image: url(../assets/login/drawable-xhdpi/qqq.png) ;
  background-repeat: no-repeat;
  background-size:  100% 100%;
  background-position: 0 0;
  display: flex;
  justify-content: center;
  // align-items: center;
  
  .form {
    margin-top: 12rem;
      width: 30rem;
      height: 5rem;
      padding: 0 5rem;
      img {
        width: 100%;
        height: 100%;
      }
    }

}
</style>