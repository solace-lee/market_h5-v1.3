<!--<template>
  <div>

  </div>
</template>

<script>
let Base64 = require("js-base64").Base64;

export default {
  data() {
    return {};
  },
  //  created () {
  //  // 检测会员有没有登录
  //  if(localStorage.getItem("Token")){
  //    let ua = window.navigator.userAgent.toLowerCase()
  //    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
  //      // 跳转到微信授权页面
  //      window.location.href = this.HOME+'/wx/login'
  //    }
  //  }else{
  //    // 如果有token 但是vuex中没有用户登录信息则做登录操作
  //    this.login()
  //  }
  //},
  //methods: {
  //  login () {
  //    let url = this.HOME+'/wx/login'
  //    // 通过cookie中保存的token 获取用户信息
  //    this.$http.get(url).then(response => {
  //      response = response.data
  //      if(response){
  //        // 保存用户登录状态(Vuex)
  //        this.$store.commit('user', response)
  //        setTimeout(() => {
  //          this.goBeforeLoginUrl() // 页面恢复(进入用户一开始请求的页面)
  //        }, 2000)
  //      }else{
  //        this.$alert('服务器撸猫去惹 :(', 'wrong')
  //        if(holdno.cookie.get('user')){
  //          // 跳转到微信授权页面
  //          window.location.href = this.HOME+'/wx/login'
  //        }
  //      }
  //    })
  //  }
  //}
  created() {
    this.login();
  },
  methods: {
    login() {
    	console.log(11);
		      this.$http
        .get(
          "https://api.zhulixc.com/wx/login?url=" +
            encodeURIComponent(Base64.encode("https://h5.zhulixc.com/#/login"))
        )
        .then(res => {
          console.log(res.data);
          window.location.replace(res.data);
          //window.location.replace("https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + res.data + "&redirect_uri="
          // + encodeURIComponent("https://h5.zhulixc.com/#/wx?redirect_uri=" + 'https://api.zhulixc.com/wx/login') + "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect");
        });

      //  	let code = this.getUrlParam(location.href, 'code');
      //  	let redirect_uri = this.getUrlParam(location.href, 'redirect_uri');
      //  	console.log({
      //  		url:redirect_uri
      //  	});
      //  	if (redirect_uri != "") {
      //
      //    	 this.$http.get(this.HOME+'/wx/login?code='+code).then(res=>{
      //        console.log(res.data)
      ////       window.location.replace(res.data)
      //    });
      //  	}
      //  	else {
      //  	}
    },
    getUrlParam(c, b) {
      var d = new RegExp("[?&]" + b + "=([^&]+)", "g");
      var g = d.exec(c);
      var a = "";
      if (g != null) {
        try {
          a = decodeURIComponent(decodeURIComponent(g[1]));
        } catch (f) {
          try {
            a = decodeURIComponent(g[1]);
          } catch (f) {
            a = g[1];
          }
        }
      }
      return a;
    }
  }
};
</script>

<style scoped>
</style>-->
<template>
    <div class="tmpl">
        <iframe id="iframe" :src="content" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe> 
    </div>
</template>
<script>
let Base64 = require("js-base64").Base64;
export default {
  components: {},
  data() {
    return {
      content: "",
      height: "",
      width: ""
    };
  },
  created() {
    this.getUrl();
  },
  methods: {
    getUrl() {
      let url64 = encodeURIComponent(
        Base64.encode("https://h5.zhulixc.com/#/login")
      );
      window.location.replace(this.HOME + "/wx/login?url=" + url64);
      //  	this.$http.get(this.HOME+'/wx/login?url='+url64).then(res=>{
      //  		console.log(res.data)
      //  		this.content = res.data;
      //  		window.location.href=res.data;

      // 	const oIframe = document.getElementById('iframe');
      // 	oIframe.window.location.replace(res.data);
      //  	})

      //  	location.href = this.content
      //    	this.$axios.get(this.$route.query.url).then(res=>{
      //      console.log(res.data);
      //      console.log('000000000');
      //     this.content = res.data;
      //    })
    }
  },
  mounted() {
    const oIframe = document.getElementById("iframe");
    const deviceWidth = document.documentElement.clientWidth;
    const deviceHeight = document.documentElement.clientHeight;
    oIframe.style.width = deviceWidth + "px";
    oIframe.style.height = deviceHeight - 80 + "px";
  }
};
</script>

<style scoped lang="less">
</style>
