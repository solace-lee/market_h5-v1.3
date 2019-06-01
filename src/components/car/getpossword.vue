<template>
	<div class="tmpl">
		<div class="box">
			<!-- 头部 -->
				<div class="head"  v-if="name=='注册'">
				<div class="site">
					<div @click="$router.go(-1)">
						<van-icon name="arrow-left" />
					</div>
				</div>
				<div class="title" style="width: 8.5rem;">
					<span>注册</span>
				</div>
				
			</div> 

			<!-- 忘记密码 -->
				<div class="head" v-if="name=='忘记密码？'||action=='forget'">
				<div class="site">
					<div @click="$router.go(-1)">
						<van-icon name="arrow-left" />
					</div>
				</div>
				<div class="title" style="width: 10rem;">
					<span>忘记密码</span>
				</div>
				
			</div> 
				<!-- 头像 -->
					 <div class="avater">
        <div><img src="../../../img/index/newuser/导航_logo.png" alt=""></div>
      </div>
		</div>
			
			
			
			<div class="box2">
			<div class="form" v-if="name=='注册'||action=='share'">
				<el-main>
					<el-form :model="ReginForm" ref="ReginForm" :rules="rule" class="regform" label-width="0">
						<div class="bg"></div>
						<div style="white-space:nowrap;margin-bottom:10px;" class="li" v-for="(item,index) in siYuan" :key="index" :class="{ active:index==isActive }"  @click="changeValue(index)">
							<i :class="item.class"></i>
							<input  v-if="item.name==='请输入密码'" :type="item.type" v-model="ReginForm.password" :placeholder="item.name" />
							<input  v-if="item.name==='用户名/手机号'" :type="item.type" v-model.number="ReginForm.tel" :placeholder="item.name" />
							<input v-if="item.name==='请输入短信验证码' " class="auth_input" type="text" v-model="item.verification" placeholder="请输入短信验证码" />
							<span  v-if="item.name==='请输入短信验证码' ">
							<span style="position:absolute;right:20px;top:4px;color: #00ae87;font-size:1.4rem;" v-show="sendAuthCode" class="auth_text auth_text_blue" @click="getAuthCode">获取验证码</span>
							<span style="position:absolute;right:20px;top:4px;font-size:1.4rem;"  v-show="!sendAuthCode" class="auth_text"> <span class="auth_text_blue">剩余{{auth_time}} </span> 秒</span>
							</span>
						</div>
						<el-form-item>
							<el-button style="margin-top: 20px" type="success" class="btn" @click="submit">
								立即注册
							</el-button>
						</el-form-item>
					</el-form>
				</el-main>
				<p style="width: 80%;margin-top:5rem;margin-left: 10%;color:#fff;font-size:1.2rem;">
					<span style="opacity: 0.8;">注册即代表同意</span>
					<router-link :to="{ path: '/zhuce?name=注册协议'}"  style="opacity: 0.8;color:#fff;">《助力乡村注册协议》</router-link>
					<router-link :to="{ path: '/zhuce?name=法律声明协议'}" style="opacity: 0.8;color:#fff;">《助力乡村法律声明协议》</router-link>
					<router-link :to="{ path: '/zhuce?name=隐私协议'}" style="opacity: 0.8;color:#fff;">《助力乡村隐私协议》</router-link>
				</p>
			</div>
			
			<div class="form" v-if="name=='忘记密码？'||action=='forget'">
				<el-main>
					<el-form :model="ReginForm" ref="ReginForm" :rules="rule" class="regform" label-width="0">
						<div class="bg"></div>

						<div style="white-space:nowrap;margin-bottom:10px;" class="li" v-for="(item,index) in siYuan2" :key="index" :class="{ active:index==isActive }"  @click="changeValue(index)">
							<i :class="item.class"></i>
							<input  v-if="item.name==='新密码'" :type="item.type" v-model="ReginForm.password" :placeholder="item.name" />
							<input  v-if="item.name==='用户名/手机号'" :type="item.type" v-model.number="ReginForm.tel" :placeholder="item.name" />
							<input  v-if="item.name==='确认密码'" :type="item.type" v-model.number="ReginForm.password1" :placeholder="item.name" />
							<input v-if="item.name==='请输入短信验证码' " class="auth_input" type="text" v-model="verification" placeholder="请输入短信验证码" />
							<span  v-if="item.name==='请输入短信验证码' ">
							<span style="position:absolute;right:20px;top:4px;color: #00ae87;font-size:1.4rem;" v-show="sendAuthCode" class="auth_text auth_text_blue" @click="getAuthCode">获取验证码</span>
							<span style="position:absolute;right:20px;top:4px;font-size:1.4rem;"  v-show="!sendAuthCode" class="auth_text"> <span class="auth_text_blue">剩余{{auth_time}} </span> 秒</span>
							</span>
						</div>
						<el-form-item>
							<el-button type="success" class="btn" round @click.native.prevent="amend">
								确定
							</el-button>
						</el-form-item>
					</el-form>
				</el-main>
			</div>
	
		</div>
	</div>
</template>

<script>
	import { Toast } from "vant";
	import Header from "@/common/_header.vue";
	//import Yin from "@/views/yindaoye.vue";

	export default {
		components: {
			"v-header": Header
		},
		data() {
			let confirmpasswordCheck = (rule, value, callback) => {
				if(value === "") {
					return callback(new Error("密码是必须的"));
				} else {
					return callback();
				}
			};
			let telCheck = (rule, value, callback) => {
				if(value === "") {
					return callback(new Error("电话号码是必须的"));
				} else if(!Number.isInteger(value)) {
					return callback(new Error("电话号码必须是数字"));
				} else if(value.toString().length !== 11) {
					return callback(new Error("电话号码必须是11位数字"));
				} else {
					callback();
				}
			};
			return {
				selectProvince: "",
				selectCity: "",
          selectDistrict: "",
          name: "找回密码",
				ReginForm: {
					password: "",
					password1: "",
					tel: ""
				},
				// 控制输入框的样式切换
				isActive:-1,
				action: "",
				title: "",
				referral_code: this.$route.query.referral,
				logining: false,
				sendAuthCode: true,
				auth_time: 0,
				verification: "", //绑定输入验证码框框
				rule: {
					password: [{
						required: true,
						message: "密码是必须的！",
						trigger: "blur"
					}],
					tel: [{
						required: true,
						validator: telCheck,
						trigger: "blur"
					}]
				},
				
				siYuan:[
					{
						class:"iconfont icon-geren11",
						name:"用户名/手机号",
						type:"text"

					},
					{
						class:"iconfont icon-mima1",
						name:"请输入密码",
						type:"password"

					},
					{
						class:"iconfont icon-yanzhengma2",
						name:"请输入短信验证码",
						type:"text"

					}
				],
				siYuan2:[
					{
						class:"iconfont icon-geren11",
						name:"用户名/手机号",
						type:"text"

					},
					{
						class:"iconfont icon-mima1",
						name:"新密码",
						type:"password"

					},
					{
						class:"iconfont icon-mima1",
						name:"确认密码",
						type:"password"

					},
					{
						class:"iconfont icon-yanzhengma2",
						name:"请输入短信验证码",
						type:"text",
						model:"verification"

					}
				]
			};
		},
		mounted() {
			this.action = this.$route.query.action;
			if(this.action == "share") {
				this.title = "分享注册"; // 后面修改没有效果
			}
		},
		created() {
			this.getProvince();
			//this.getCity();
			// this.checkReferralCode();
		},

		methods: {
			// checkReferralCode(){
			//   if(this.referral_code==''||this.referral_code==null){
			//
			//   }
			// },
          changeValue(index){
       this.isActive=index;
  },
			getProvince() {
				$.ajax({
					url: this.GAMEAPI + "area/getProvince",
					type: "get",
					contentType: "application/json",
					success: function(obj) {
						if(obj.success == true) {
							$("#province").append("<option value='-1'>-请选择省-</option>");
							console.log(obj.data);
							$.each(obj.data, function(index, item) {
								$("#province").append(
									//此处向select中循环绑定数据
									"<option value=" +
									item.provinceId +
									">" +
									item.provinceName +
									"</option>"
								);
							});
						} else {
							alert("获取省份失败");
						}
					}
				});
			},
			getCity() {
				$("#city").empty();
				$("#district").empty();
				var options = this.selectProvince;
				console.log(options);
				$.ajax({
					url: this.GAMEAPI + "area/getCity/" + options,
					type: "get",
					contentType: "application/json",
					success: function(obj) {
						$("#city").append("<option value='-1'>-请选择市-</option>");
						if(obj.success == true) {
							console.log(obj.data);
							$.each(obj.data, function(index, item) {
								$("#city").append(
									//此处向select中循环绑定数据
									"<option value=" +
									item.cityId +
									">" +
									item.cityName +
									"</option>"
								);
							});
						} else {
							alert("获取市失败");
						}
					}
				});
			},

			getDistrict() {
				var options = this.selectCity;
				$("#district").empty();
				console.log(options);
				$.ajax({
					url: this.GAMEAPI + "area/getDistrict/" + options,
					type: "get",
					contentType: "application/json",
					success: function(obj) {
						if(obj.success == true) {
							// alert(obj.data);
							$("#district").append("<option value='-1'>-请选择区-</option>");
							console.log(obj.data);
							$.each(obj.data, function(index, item) {
								$("#district").append(
									//此处向select中循环绑定数据
									"<option value=" +
									item.districtId +
									">" +
									item.districtName +
									"</option>"
								);
							});
						} else {
							alert("获取区失败");
						}
					}
				});
			},
			//  验证
			getAuthCode() {
				const verification = this.ReginForm.tel;
				const url = this.HOME + "/user/getbindsms/" + this.ReginForm.tel;
				console.log("url", url);
				if(this.ReginForm.tel == "") {
					Toast("请输入您的电话号码！");
				} else {
					$.ajax({
						type: "get",
						url: url,
						success: function(response) {
							if(response.Message == "") {
								Toast("发送成功,请注意查收！");
							} else {
								Toast(response.Message);
							}
						}
					});
				}
				//				this.$http.get(url).then(function(response) {
				//					console.log("请求成功", response)
				//				}, function(error) {
				//					console.log("请求失败", error);
				//				})
				this.sendAuthCode = false;
				//设置倒计时秒
				this.auth_time = 60;
				var auth_timetimer = setInterval(() => {
					this.auth_time--;
					if(this.auth_time <= 0) {
						this.sendAuthCode = true;
						clearInterval(auth_timetimer);
					}
				}, 1000);
			},
			getAuthCode1() {
				const verification = this.ReginForm.tel;
				const url = this.HOME + "/user/getresetsms/" + this.ReginForm.tel;
				console.log("url", url);
				if(this.ReginForm.tel == "") {
					Toast("请输入您的电话号码！");
				} else {
					$.ajax({
						type: "get",
						url: url,
						success: function(response) {
							if(response.Message == "") {
								Toast("发送成功,请注意查收！");
							} else {
								Toast(response.Message);
							}
						}
					});
				}
				//				this.$http.get(url).then(function(response) {
				//					console.log("请求成功", response)
				//				}, function(error) {
				//					console.log("请求失败", error);
				//				})
				this.sendAuthCode = false;
				//设置倒计时秒
				this.auth_time = 60;
				var auth_timetimer = setInterval(() => {
					this.auth_time--;
					if(this.auth_time <= 0) {
						this.sendAuthCode = true;
						clearInterval(auth_timetimer);
					}
				}, 1000);
			},
			// 封装注册发送请求方法
			thisAjax() {
				//{"userAccount": 138001111555,"userPwd":123456,"provinceId": 22,"cityId": 22,"districtId": 22}
				var obj = {};
				obj.userPwd = this.ReginForm.password;
				obj.userAccount = this.ReginForm.tel;
				// obj.regCode = this.verification;
				obj.referralCode = this.referral_code;
				// obj.wx_openid = localStorage.getItem("openid");
				obj.provinceId = this.selectProvince;
				obj.cityId = this.selectCity;
				obj.districtId = this.selectDistrict;

				console.log(obj);
				//  手机注册
				//emulateJSON:true设置后post可跨域
				// const url = this.GAMEAPI+"user/registerRecommend/"+this.verification;
				const url = this.GAMEAPI + "user/registerRecommend/" + this.verification;

				this.$http.post(url, obj).then(
					function(response) {
						if(response.body.success == true) {
							// alert('adsdfefresdf');
							console.log(response.data);
							this.$router.push({
								path: "/yindaoye"
							}); // setTimeout(() => {
							// 	this.$router.push({
							// 		path: "/login?name=登录"
							// 	});
							// }, 1000)
							// this.$imoption.user =  this.Account;
							// this.$imoption.pwd = this.Pwd;
							// this.$imoption.appKey = "1176180515146684#vhapp";
							// this.$imoption.success = res => {
							//   this.accence_token = res.access_token;
							//   this.myNickName = res.user.nickname;
							//   this.addListen();
							// };
							// this.$imconn.open(this.$imoption);
						} else {
							Toast(response.data.Message);
						}
						//						this.$router.push({
						//							path: "/login?name=登录"
						//						})
						//					this.$router.push('/');
					},
					function(error) {
						alert("请认真填写数据！", error);
					}
				);
			},
			amend() {
				if(this.ReginForm.password1 != this.ReginForm.password) {
					Toast("两次密码输入不一致");
					return;
				} else if(this.pwd == "") {
					Toast("密码不能为空");
					return;
				}
				var obj = {};
				obj.NewPwd = this.ReginForm.password;
				console.log(obj);
				obj.code = this.verification;
				obj.Phone = this.ReginForm.tel;
				obj.Token = localStorage.getItem("Token");
				this.$http
					.post(this.HOME + "/user/resetpwd/" + this.verification, obj)
					.then(res => {
						if(res.data.Status == 200) {
							Toast(res.data.Message);
							setTimeout(() => {
								this.$router.push({
									path: "/login?name=登录"
								});
							}, 1000);
							// this.$imoption.user =  this.Account;
							// this.$imoption.pwd = this.Pwd;
							// this.$imoption.appKey = "1176180515146684#vhapp";
							// this.$imoption.success = res => {
							//   this.accence_token = res.access_token;
							//   this.myNickName = res.user.nickname;
							//   this.addListen();
							// };
							// this.$imconn.open(this.$imoption);
						} else {
							Toast(res.data.Message);
						}
					});
			},
			// ...
			submit() {
				this.$refs.ReginForm.validate(valid => {
					if(valid) {
						this.logining = true;
						this.thisAjax();
						console.log("开始写入后台数据！");
					} else {
						console.log("submit err");
					}
				});
			},
			reset() {
				this.$refs.ReginForm.resetFields();
			},
			tologin() {
				//已经注册过跳转到登入界面
				this.$router.push("/login");
			}
		}
	};
</script>
<style scoped lang="less">
@import "../../../img/index/newuser/icon/icon.less";
	button {
		background-color: #ffffff;
		border: 1px solid #0bb794;
		border-radius: 5px;
	}
	

	.submitBtn {
		display: block;
		margin: 0 auto;
		border-radius: 10px;
		width: 100%;
		background-color: #0bb794;
	}
	
	.to {
		color: #fa5555;
		cursor: pointer;
	}
	
	input {
		width: 100%;
	}
	
	.code {
		width: 30%;
	}
	
	.login-text {
		text-align: center;
		margin-bottom: 20px;
	}
	
	// .el-main {
	// 	display: block;
	// 	-webkit-box-flex: 1;
	// 	-ms-flex: 1;
	// 	flex: 1;
	// 	-ms-flex-preferred-size: auto;
	// 	flex-basis: auto;
	// 	box-sizing: border-box;
	// 	padding: 0px;
	// 	padding-top: 20px;
	// }
	
	
	select {
		width: 25%;
	}

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
   background-image: url(../../../img/index/newuser/底板.png) ;
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
  .title{
		font-size:1.6rem;
		width: 8rem;
		margin:0 auto;
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
  background-image: url(../../../img/index/newuser/底板_配图.png) ;
  background-repeat: no-repeat;
  background-size:  100% 100%;
	background-position: 0 0;
	
	.form {
			width: 100%;
			padding: 1rem 1rem;
			box-sizing: border-box;
		}
		.li {
			width: 100%;
			margin-top: 1rem;
			/* height: 3rem; */
			padding-left: 2rem;
			position: relative;
			line-height: 3rem;
			border: solid 1px #adadad;
			border-radius: 7px;
			font-size: 1.6rem;
			color: #c3c3c3;
				i{
				vertical-align: center;
				// line-height: 3.5rem;
				font-size: 2rem;
				width: 50%;
			}
			input {
				width:50%;
				vertical-align: middle;
				border: none;
				font-family: SourceHanSansCN-Light;
				padding: 0.2rem;
				font-size: 1.6rem;
				color: #343434;
				opacity: 0.5;
				/* width: 4rem; */
			}
		}
		.active{
			border: solid 1px #0bb794;	 
			color:   #0bb794;
}
		.autoLogin {
			display: flex;
			justify-content: space-between;
			color: #c3c3c3;
			font-size: 1.2rem;
			font-weight: normal;
			font-family: SourceHanSansCN-Regular;
			margin-top: 12px;
			button {
				background: #fff;
			}
		}
		.btn {
			width: 100%;
			height: 4rem;
			text-align: center;
			margin-top: 2.5rem;
			padding: 0 3rem;
			background-color: #0bb794;
			color: #fff;
			font-size: 1.5rem;
			border-radius: 5px;
		}
		.operation {
			position: absolute;
			right: 47px;
			top: 281px;
			/*font-size: 6.8rem;*/
			background-color: transparent;
			color: #c3c3c3;
			font-size: 1.2rem;
		}

}
</style>