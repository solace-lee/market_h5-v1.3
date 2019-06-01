<template>
  <div class="zfbnm" id="zfbyes">
    <div @click="$router.go(-1)">123</div>
      <iframe
        style="height:100%; width:100%"
        id="zfbxx"
        name="zfbxx"
        frameborder="0"
        marginwidth="">
      </iframe>
  </div>
</template>

<script>
export default {
  components: {
  },
  created() {
    this.getData();
  },
  data() {
    return {
      url: "",
    };
  },
  methods: {
    getData() {
      // mui.init()
      // let url = sessionStorage.getItem("wxUrl") || ' '
      //   if (url == " ") {
      //   return this.$router.replace({
      //     path: "/"
      //   });
      // } else {
      //   this.url = url
      //   // window.location.replace(url) 
      //   mui.plusReady(function(url){
      //     var webWeiXinpay = plus.webview.create(url,"webWeiXinpay",{top:'0px',bottom:'0px',additionalHttpHeaders:{Referer:'https://new.zhulixc.com'}});
      //     webWeiXinpay.show();
      //   })
      // }
    },
    postData() {
    
    }
  }
};
</script>

<style lang="less" scoped>
.zfbnm{
  width: 100%;
  height: 100vh;
}
</style>