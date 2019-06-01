<template>
	<div class="tmpl">
		<div class="box">
			
			<div class="bg"></div>
			<div class="form" v-if="name=='注册'">
				<form>
					<ul>
						<li>
							<label>
                <img src="../../img/login_img/personal_login_bg_phonenumber.png" alt="">

              </label>
							<input type="text" placeholder="请输入手机号222" v-model="form.user_account">

						</li>
						<li>
							<label>
                <img src="../../img/login_img/personal_login_bg_Password.png" alt="" >
              </label>
							<input type="password" placeholder="请输入6位以上密码" v-model="form.user_pwd">
						</li>
						<li>
							<label>
                <img src="../../img/login_img/personal_login_bg_Password.png" alt="">
              </label>
							<input type="text" placeholder="请输入手机验证码" v-model="form.auth_code">
							<button @click="send" :disabled="disabled">获取验证码</button>
						</li>
						<li>
							<label>
                  <img src="../../img/login_img/personal_login_bg_recommendationcode.png" alt="">
                </label>
							<input type="text" placeholder="请输入推荐码(选填)" v-model="referral_code">

						</li>

					</ul>
					<div class="btn">
						<button @click="register">注册</button>
					</div>

				</form>
			</div>
			<div class="form" v-if="name=='忘记密码？'">
				<form>
					<ul>
						<li>
							<label>
                <img src="../../img/login_img/personal_login_bg_phonenumber.png" alt="">

              </label>
							<input type="text" placeholder="请输入手机号">

						</li>
						<li>
							<label>
                <img src="../../img/login_img/personal_login_bg_verificationCode.png" alt="">
              </label>
							<input type="text" placeholder="请输入手机验证码">
							<button @click="send">获取验证码</button>
						</li>
						<li>
							<label>
                <img src="../../img/login_img/personal_login_bg_Password.png" alt="">
              </label>
							<input type="text" placeholder="新密码">
						</li>
						<li>
							<label>
                <img src="../../img/login_img/personal_login_bg_Password.png" alt="">
              </label>
							<input type="text" placeholder="确认密码">
						</li>

					</ul>
					<div class="btn">
						<button v-if="name=='注册'">注册</button>
						<button v-if="name=='忘记密码？'">确定</button>
					</div>
				</form>
			</div>
		</div>

	</div>
</template>

<script>
	import Header from "@/common/_header.vue";
	export default {
		components: {
			"v-header": Header
		},
		data() {
			return {
				name: '',
				btn: '获取验证',
				time: "",
				disabled: false,
				form: {
					user_account: "",
					user_pwd: '',
					auth_code: '',
					referral_code:'',
				}
			};
		},
		created() {
			this.getName();
		},
		methods: {
			send() {
				let _this = this

				_this.disabled = true
				_this.time = 60
				let it = setInterval(() => {

					_this.time--
						if(_this.time == 0) {
							//  时间走完
							_this.btn = '获取验证'
							_this.disabled = false
							clearInterval(it) //用了定时器一定要清楚
						} else {
							_this.btn = `重新发送${_this.time}S`
							// this.btn='59s'
							_this.disabled = true

						}
				}, 1000)
			},
			register() {
				var obj = {};
				obj.Account = this.form.Account;
				obj.Pwd = this.form.Pwd;
				obj.Code=this.from.referral_code;
				this.$http.post(this.HOME + "/user/login", obj).then(res => {
                  // Toast('手机号或密码错误');
				}).catch(err => {
					// Toast('手机号或密码错误');
				});
			},
			getName() {
				this.name = this.$route.query.name;
			}

		}
	};
</script>
<style scoped lang="less">
	.head {
		width: 100%;
		height: 4rem;
	}
	
	ul {
		margin: 0;
		padding: 0;
	}
	
	li {
		list-style: none;
	}
	
	a {
		list-style: none;
	}
	
	* {
		box-sizing: border-box;
	}
	
	body {
		margin: 0;
		padding: 0;
	}
	
	.box {
		width: 100%;
		height: 1000px;
		background-color: #fff;
	}
	
	.box .bg {
		width: 100%;
		height: 12rem;
		background-image: url("../../img/login_img/login.jpg");
		background-size: 50% 50%;
		background-position: center center;
		background-repeat: no-repeat;
		display: block;
	}
	
	.box .form {
		width: 100%;
		padding-top: 1rem;
	}
	
	.box .form ul li {
		width: 100%;
		height: 4rem;
		padding-left: 2.5rem;
		position: relative;
		//  
		button {
			// width: 20%;
			font-size: .6rem;
			background-color: #0BB794;
			color: #fff;
			padding: .4rem;
		}
	}
	
	.box .form ul li p {
		font-size: 0.2rem;
		color: #ccc;
		position: absolute;
		top: 0.9rem;
		left: 1.6rem;
	}
	
	.box .form ul li label img {
		max-width: 1rem;
		display: inline-block;
		vertical-align: middle;
	}
	
	.box .form ul li input {
		margin-left: 1rem;
		height: 60%;
		width: 50%;
		vertical-align: middle;
		color: #999999;
		border: none;
		padding: 0.2rem;
		font-size: 18px;
		/* width: 4rem; */
	}
	
	.box .form ul .hand img {
		max-width: 0.4rem;
	}
	
	.box .form ul .hand input {
		margin-left: 0rem;
	}
	
	.box .form ul .hand button {
		width: 1.8rem;
		height: 1rem;
		background-color: #0bb794;
		color: #fff;
		border: none;
	}
	
	.btn {
		width: 100%;
		text-align: center;
		margin-top: 1rem;
		padding: 0 3rem;
	}
	
	.btn button {
		width: 100%;
		height: 3rem;
		border-radius: 0.6rem;
		border: none;
		color: #fff;
		letter-spacing: 0.05rem;
		// font-size: 0.28rem;
		background-color: #0bb794;
	}
</style>