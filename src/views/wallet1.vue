<template>
	<div class="tmpl">
		<v-header></v-header>
		<div id="whneirong"">
			
		</div>
		<div class="head"></div>
		<div v-if='name=="账户明细"'>
			<div class="all" style="background-color: #00AD88;">
				<p style="color: white;padding-top: 25px;font-size: 1.6rem;">账户余额</p>
				<div><span>￥</span>
					<span>{{balance}}</span>
				</div>
			</div>

			<div class="detail" >
				<div class="title" style="font-size: 1.6rem;">账户明细</div>
				<van-list v-model="loading" :finished="finished" @load="onLoad">
					<div class="detail_" v-for="(item,index) in detail" :key="index">
						<div>
							<div class="left">
								<span class="red" v-if="item.wallet_type==1">{{item.Type}}</span>
								<span class="green" v-if="item.wallet_type==2">{{item.Type}}</span>
								<span>
                                    <i v-if="item.wallet_type==1">+</i>
                                    <i v-if="item.wallet_type==2">-</i>{{item.detail_amount}}元</span>

							</div>
						</div>
						<div class="right">
							<p>{{item.createddate|formatDate}}</p>
						</div>

					</div>
				</van-list>
				<v-baseline v-if="nomore"></v-baseline>
			</div>
			<!--<div>
		    <button class="carry" @click='getCarry(balance)'>结算</button>
	        </div>-->
		</div>

	<div v-if='name=="我的积分"'>
		<div class="all" style="background-color: #00AD88;">
				<p style="color: white;padding-top: 25px;font-size: 1.6rem;">您当前积分</p>
				<div>
				<span>￥{{balance2}}</span>
			</div>
		</div>
		<div class="detail">
			<div class="title">积分明细</div>
			<van-list v-model="loading2" :finished="finished2" @load="onLoad2">
				<div class="detail_" v-for="(i,index) in jifenlist" :key="index">
					<div>
						<div class="left">
							<span class="green" v-if="i.wallet_type=='1'">返现{{i.amount}}</span>
							<span class="red" v-if="i.wallet_type=='2'">支付{{i.amount}}</span>
							<span class="red" v-if="i.wallet_type=='3'">结算{{i.amount}}</span>
							<span class="green" v-if="i.wallet_type=='4'">收入{{i.amount}}</span>
						</div>
					</div>
					<div class="right">
						<span>{{i.createddate}}</span>
					</div>

				</div>
			</van-list>
			<v-baseline v-if="nomore2"></v-baseline>
		</div>
	</div>
    
	<div v-if='name=="创业基金"' id="bigdiv" style="height: 80%">
		<div class="all">
		<!-- <router-link :to="{path:'/chuanyejj?&name=Chuanyejj'}"> -->
			   <img @click="onimg" style="height: 62px;position: fixed;right: 0px;top: 49px;"src="../../img/drawable-xxhdpi/icon_help.png" />
	   <!--  </router-link> -->
				 
				<p style="color: white;padding-top: 25px;font-size: 1.6rem;">创&nbsp;业&nbsp;基&nbsp;金</p>

				<div style="margin-top:12px ;">
					<span v-if="walletAmount==null||walletAmount==''" style="font-size:30px;"></span>
          <span v-else>{{walletAmount}}</span>
				</div>
				<div id="funddetails" @click="$router.push({path:'/game/profit/details?name=明细'})">
			<span id="funddetailsfont" style="margin-top: -58px;margin-left: 5px;position: absolute;">明细&nbsp;</span>
		</div>
			</div>

			<div class="detail">
				<!--<div class="title">基金明细</div>-->
				<!--<van-list v-model="loading" :finished="finished" @load="onLoad">-->
					<!--<div class="detail_" v-for="(item,index) in detail1" :key="index">-->
						<!--<div>-->
							<!--<div class="left">-->
						    <!--<span class="green" v-if="item.wallet_type=='1'">返现+{{item.details_amount}}</span>-->
							<!--<span class="red" v-if="item.wallet_type=='2'">支付-{{item.details_amount}}</span>							-->
							<!--<span class="red" v-if="item.wallet_type=='3'">结算-{{item.details_amount}}</span>-->
							<!--<span class="green" v-if="item.wallet_type=='4'">收入+{{item.details_amount}}</span>-->
							<!--</div>-->
						<!--</div>-->
						<!--<div class="right">-->
							<!--<p>{{item.createddate}}</p>-->
						<!--</div>-->

					<!--</div>-->
				<!--</van-list>-->
				<!--<v-baseline v-if="nomore"></v-baseline>-->
        <!--<router-link :to="{ path: '/wallet1?name=创业基金'}">-->
          <!--<div style="margin-top: 15px;">-->
            <!--<span><img src='../../img/userCenter/jijing.png'width="40%"/></span>-->
            <!--&lt;!&ndash; <span style="margin-top: 20px;"><van-icon name="debit-pay" info="" color='00a0e9'/></span>&ndash;&gt;-->
            <!--<span style="font-size: 1.6rem;font-weight: 600;margin-top: 6px;">创业基金</span>-->
          <!--</div>-->
        <!--</router-link>-->
        <div id="middleDiv">
            <div class="subFunction" id="harvest" @click="$router.push({path:'/harvest?name=收获'})">
              <img class="harvest" src="../../img/fund/icon_reap.png" style="width: 24px;" >&nbsp;&nbsp;&nbsp;收获
              <span style="float: right;margin-right: 8px">></span>
            </div>

          <div class="subFunction" id="settlement" @click="$router.push({path:'/settlement?name=结算'})">
            <img class="settlement" src="../../img/fund/icon_Settlement.png" style="width: 24px;" >&nbsp;&nbsp;&nbsp;结算
            <span style="float: right;margin-right: 8px">></span>
          </div>
        </div>




			</div>
			<!--<div style="">-->
		    <!--<button class="carry" @click='getCarry(balance)'>结算</button>-->
      <!--</div>-->

      <div id="foot"></div>
	</div>

	</div>
</template>

<script>
	// import Footer from "@/common/_footer.vue";
	import Header from "@/common/_header.vue";
	import Baseline from "@/common/_baseline.vue";
//	import { formatDate } from "../assets/js/data.js";
	import { Toast } from 'vant';
  import RouterLink from "vant/es/mixins/router-link";
  // import chuanyejj from "@/views/chuanyejj.vue";
	export default {
		components: {
      RouterLink,
			"v-header": Header,
			"v-baseline": Baseline
		},
		filters: {
			formatDate(time) {
				var date = new Date(time);
				return formatDate(date, "yyyy-MM-dd hh:mm");
			}
		},
		data() {
			return {
				nomore: false,
				finished: false,
				loading: true,
				nomore2: false,
				finished2: false,
				loading2: true,
				// 结算弹框
				show: false,
				// 结算金额
				amount: "",
				name: "",
				token: "",
				page: 1,
				detail: [],
				detail1:[],
				balance: "",
				balance1: "",
				jifenlist: [],
				balance2: "",
        walletAmount:""
			};
		},
		created() {
		  this.getAmountCount();
			this.getname();
			setTimeout(() => {
				this.getWallet();
				this.getWallet1();
				this.getjifen();
			}, 1000);
		},
		methods: {

      getAmountCount(){
        this.token= localStorage.getItem("Token");

        // this.token = this.$route.query.token;
        console.log(this.token);
        let config = {
          headers: {
            token: this.token
          }
        }
        const url = this.GAMEAPI+"userVentureWallet/queryByUserId";
        this.$http.get(url,config)
          .then(function(response) {
            console.log(JSON.stringify(response));
            // alert(response.body.data);
            if(response.body.success == true) {
              // alert('aaaaaaaa');
              // console.log(response.data);
              this.walletAmount=response.body.data.walletAmount;
              // alert(response.success);
            } else {
              Toast(response.data.Message);
            }

          })
      },

			getname() {
				this.name = this.$route.query.name;
				this.token = localStorage.getItem("Token");
			},
			// 获取钱包信息
			getWallet() {
				this.$http
					.get(this.HOME + "/user/getwalletdetails/1?token=" + this.token + "&page=" + this.page)
					.then(res => {
						console.log(res);
						this.balance = res.data.Data.balance;
						var arr = res.data.Data.detail;
						if(arr.length == 10) {
							this.page++;
						} else {
							this.nomore = true;
							this.finished = true;
							console.log("已加载全部");
						}
						arr.forEach(val => {
							console.log(val.createddate);
							var str = "";
							str = val.createddate;
							var num = parseInt(str.replace(/[^0-9]/gi, ""));
							val.createddate = num;
							this.detail.push(val);
						});
						this.loading = false;
					});
			},
			getWallet1() {
				this.$http
					.get(this.HOME + "/user/getwalletdetails/4?token=" + this.token + "&page=" + this.page)
					.then(res => {
						
						console.log(res);
						this.balance1 = res.data.Data.balance;
						console.log(111111111111111);
						console.log(this.balance1);
						var arr = res.data.Data.detail;
						if(arr.length == 10) {
							this.page++;
						} else {
							this.nomore = true;
							this.finished = true;
							console.log("已加载全部");
						}
						arr.forEach(val => {
							console.log(val.createddate);
							this.detail1.push(val);
						});
						this.loading = false;
					});
			},
			// 获取积分
			getjifen() {
				this.$http
					.get(
						this.HOME + "/user/getwalletdetails/5?token=" + this.token + "&page=" + this.page
					)
					.then(res => {
						console.log(res);
						this.balance2 = res.data.Data.balance;
						var arr = res.data.Data.detail;
						if(arr.length == 10) {
							this.page++;
						} else {
							this.nomore2 = true;
							this.finished2 = true;
							console.log("已加载全部");
						}
						arr.forEach(val => {
							this.jifenlist.push(val);
						});
						this.loading2 = false;
						console.log(11111111111112);
						console.log(this.jifenlist)
					});
			},
			gobank(name) {
				this.$router.push({
					path: "/bank?name=" + name
				});
			},
			// 结算
			getCarry(balance) {
				this.$router.push({
					path: "/wallet1Carry?name=结算" + '&balance=' + this.balance1 + '&title=' + "基金" + '&type=4' 
				});
			},
			onLoad() {
				console.log(!this.loading);
				if(!this.loading) {
					return;
				}
				this.loading = true;
				console.log(this.page);
				this.getWallet();
			},
			onLoad2() {
				console.log(!this.loading2);
				if(!this.loading2) {
					return;
				}
				this.loading2 = true;
				console.log(this.page);
				this.getjifen();
			},
			onimg(){
				
				console.log("yanjiu222")
				this.$router.push({ path: "/chuanyejj?name=chuanyejj" });
			}
             

		}
			}
	;
	       
</script>
<style scoped lang='less'>
  
	.head {
		width: 100%;
		height: 4rem;
	}
	
	.name {
		margin-top: -6%;
		background-color: #00ad8a;
		float: left;
		width: 50% !important;
	}
	
	.carry {
		background-color: #0BB794;
		color: #fff;
		font-size: 1.6rem;
		height: 4rem;
		width: 80%;
		margin-top: 20px;
		margin-left: 10%;
		position:fixed;
		bottom: 0;
        border-radius: 3rem;


	}
	
	.all {
		margin-top: 2px;
		height: 185pt;
		width: 100%;
		text-align: center;
	
		background-image: url(../../img/drawable-xxhdpi/bg2.png);
		background-size: 100% 100%;
  -moz-background-size: 100% 100%;
  -webkit-background-size: 100% 100%;

		padding-top: 1rem;
		position: relative;
		p {
			font-size: 1rem;
		}
		div {
			width: 100%;
			position: relative;
/*			padding-top: 1rem;*/
			span:nth-child(1) {
				font-size: 2rem;
				color: #ffffff;
			}
			span:nth-child(2) {
				margin-left: 0rem;
				font-size: 2rem;
				color: #FFFFFF;
			}
			span:nth-child(3) {
				background-color: #00ad8a;
				color: #fff;
				padding: 0.2rem 0.6rem;
				border-radius: 2.5rem;
				position: absolute;
				font-size: 0.6rem; // right: 4rem;
			}
		}
	}
	      .wallet {
        width: 100%;
        height: 14rem;
        ul {
          width: 100%;
          height: 100%;
          li {
            width: 50%;
            height: 100%;
            text-align: center;
            float: left;
            padding: 0.8rem 0;
            div {
              border-right: 1px solid #eee;
              span {
              	
                display: block;
                padding-bottom: 0.4rem;
                font-size: 5.6rem;
              }
              span:lath-child {
                color: #1bc6a3;
              }
            }
          }
        }
      }
	.my-indent-left {
		display: flex;
		justify-content: space-between;
		width: 100%;
		div {
			img {
				margin-top: 0px;
				width: 1rem;
				margin-right: 0.3rem;
				vertical-align: middle;
			}
			span {
				vertical-align: middle;
				font-size: 1.3rem;
				color: #666;
			}
		}
		i {
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
	
	.my-indent2 {
		width: 100%;
		display: block;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		color: #333;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: justify;
		-ms-flex-pack: justify;
		justify-content: space-between;
		padding: 0 0.6rem;
		height: 6rem;
		line-height: 2rem;
		background-color: #fff; // border-top-right-radius: 8px;
		// border-top-left-radius: 8px;
		border-top: 1px solid #dadada; // margin-top: 10px;
	}
	
	.detail {
		width: 100%;
    height: 109px;
		background-color: #fff;
		.title {
			width: 100%;
			height: 3rem;
			padding: 0.6rem;
			line-height: 2rem;
			font-size: 1.6rem;
		}
		.detail_ {
			width: 100%;
			height: 4rem;
			padding: 0.4rem 0;
			border-top: 0.03rem solid #ccc;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 1.6rem;
			.left {
				.red {
					
					display: inline-block;
					width: 8rem;
					text-align: center;
					color: #cb2221;
				}
				.green {
					display: inline-block;
					width: 8rem;
					text-align: center;
					color: rgb(0, 173, 136);
				}
				p {
					font-size: 1rem;
					color: #999999;
					padding-left: 3rem;
				}
			}
			.jifen {
				padding-left: 2rem;
				color: #666666;
				p {
					padding: 0.3rem 0 0 0;
				}
			}
			.right {
				font-size: 1.4rem;
				padding-right: 1rem;
				height: 100%;
				display: flex;
				align-items: center;
			}
		}
	}

  #middleDiv{
    margin-top: 6px;
  }

  #funddetails{
    padding-left: 100px;
    
  }

  #funddetailsfont{
    font-size: 10px;
    color:#BFBFBFF;
    margin-left:6rem;
  }

  #harvest{
    padding-left:10px;
    
  }

  #settlement{
    padding-left: 10px;
  }

  .subFunction{
    line-height: 50px;
    vertical-align: center;
    height: 20%;
  }

  #foot{
    margin-top: 6px;
    width: 100%;
    background-color: #fff;
  }

  #bigdiv{
    height: 100%;
  }
 
</style>
