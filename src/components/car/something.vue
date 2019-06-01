<template lang="html">

	<div class="wrap">

		<v-gologin></v-gologin>
		<ul class="something" v-if='carList'>
			<li v-for="(k,i) in carList">

				<!--<router-link class="my-indent" :to="path:'/detail?id='+{k.id}"-->
				<div class="something-left" @click="toggle">
					<label class="true" :class="{false:!k.choseBool}">
              <input type="checkbox" v-model="k.choseBool">
            </label>
				</div>
				<router-link class="my-indent" :to="{ path:'/detail?id='+k.id}">
					<div class="something-middle">
						<img :src="k.imgPath">
					</div>
				</router-link>
				<ul class="something-right">
					<router-link class="my-indent" :to="{ path:'/detail?id='+k.id}">
						<p>{{k.title}}</p>
						<p style=".fz(font-size,26);color: rgb(168, 168, 168);">{{k.size}}</p>
						<p>售价：￥{{k.price}}x{{k.value}}</p>
						<p>总价：￥{{k.price*k.value}}</p>
					</router-link>
					<div class="something-right-bottom" @click="cut(i)">
						<span></span>
					</div>
				</ul>
			</li>
			
		</ul>
		<!--<ul class="something">
		<li v-for="(k,i) in list" class="something-right">
				<router-link class="my-indent" :to="{ path:'/detail?id='+k.id}">
						<p>{{k.name}}</p>
						<p style=".fz(font-size,26);color: rgb(168, 168, 168);">{{k.size}}</p>
						<p>售价：￥{{k.price}}x{{k.value}}</p>
						<p>总价：￥{{k.price*k.value}}</p>
					</router-link>
					<div class="something-right-bottom" @click="cut(i)">
						<span>11</span>
					</div>
			</li>
	  </ul>-->
	</div>
</template>

<script>
	// 提示登录组件
	import Gologin from '@/components/car/gologin.vue'
	import Util from '../../util/common'
	export default {
		data(){
			return {      
      list: [],
      }
		},
		components: {
			'v-gologin': Gologin
		},
		computed: {

			carList() {
				return this.$store.state.detail.carList;
				console.log(this.$store.state.detail.carList);
			},

		},

		mounted() {

			// 初始化先获取购物车商品列表 否则 页面刷新出Bug
			if(this.$store.state.detail.carList == "") {
				this.$store.commit('RESET_CARLIST')

			};
//			this.getSpecification();
		},
		methods: {
			cut(i) {
				// 点击垃圾桶，删除当前商品，这里用splice和filter都会bug,只能重置数组
				let newCarList = [];

				for(let k = 0; k < this.carList.length; k++) {
					if(k !== i) {
						newCarList.push(this.carList[k])
					}
				}

				//点击垃圾桶 把商品数量count-1
				this.$store.dispatch('setLocalCount', false);
				this.$store.dispatch('cutCarList', newCarList);
			},
			toggle() {

				setTimeout(() => {
					// 每点击一下都会改变choseBool的布尔值,所以要重置数组
					this.$store.dispatch('cutCarList', this.carList)

				}, 0);
			},
//			getSpecification() {
//				//  	foreach(k in this.$store.state.detail.carList)
//				//  	{
//				//    this.$http.get(this.HOME+"/Product/GetSpecification/" + k.id).then(res => {
//				//      // console.log(res);
//				//      this.Specification = res.data.Data[0];
//				//      var a=[];
//				//      a.push(this.Specification);
//				//      console.log(a);
//				//    });
//				//   }
//				var list=[];
//				this.$store.state.detail.carList.forEach(function(k, index) {
//					$.ajax({
//						type: "get",
//						url: "https://api.zhulixc.com/product/GetCommodity?cId=" + k.id,
//						success: function(res) {
//							this.Specification = res.Data.info;
//				      list.push(this.Specification);
//				      
//						}
//					});
//				});
//				this.list=list;
//				console.log(this.list);
//			},

		}
	}
</script>

<style lang="less" scoped>
	@import '../../assets/fz.less';
	.wrap {
		width: 100%;
		.something {
			margin-top: 2.4rem;
			width: 100%;
			>li {
				display: -ms-flex;
				display: -webkit-box;
				display: -ms-flexbox;
				display: flex;
				-webkit-box-align: center;
				-ms-flex-align: center;
				align-items: center;
				padding: 1vw;
				position: relative;
				height: 30vw;
				.bd();
				.something-left {
					/*-ms-flex: 2;
                -webkit-box-flex: 2;
                flex: 2;*/
					label {
						float: left;
						background: url("../../assets/car/images/t.svg") no-repeat center center/50% 50%;
						input {
							height: 14vw;
							width: 14vw;
							opacity: 0;
							filter: alpha(opacity=0);
						}
					}
					.false {
						background: url("../../assets/car/images/f.svg") no-repeat center center /50% 50%!important;
					}
				}
				.something-middle {
					-ms-flex: 3;
					-webkit-box-flex: 3;
					flex: 3;
					height: 26vw;
					width: 26vw;
					padding-left: 0vw;
					-webkit-box-sizing: border-box;
					box-sizing: border-box;
					img {
						display: block;
						width: 100%;
						height: 100%;
					}
				}
				.something-right {
					-ms-flex: 7;
					-webkit-box-flex: 7;
					flex: 7;
					/* height: 100%;*/
					display: -ms-flex;
					display: -webkit-box;
					display: -ms-flexbox;
					display: flex;
					/*! autoprefixer: off */
					-webkit-box-orient: vertical;
					/*! autoprefixer: on */
					-webkit-box-direction: normal;
					-ms-flex-flow: column wrap;
					flex-flow: column wrap;
					-webkit-box-pack: justify;
					-ms-flex-pack: justify;
					justify-content: space-between;
					padding-left: 4vw;
					-webkit-box-sizing: border-box;
					box-sizing: border-box;
					p {
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						/*! autoprefixer: off */
						-webkit-box-orient: vertical;
						/*! autoprefixer: on */
						.fz(font-size,
						32);
					}
					p:nth-child(3) {
						.fz(font-size,
						26);
						color: rgb(168, 168, 168);
					}
					p:last-of-type {
						.fz(font-size,
						32);
						color: rgb(199, 108, 28);
					}
					.something-right-bottom {
						>div {
							display: -ms-flex;
							display: -webkit-box;
							display: -ms-flexbox;
							display: flex;
							-webkit-box-align: center;
							-ms-flex-align: center;
							align-items: center;
							input {
								width: 6vw;
								text-align: center;
							}
							span {
								height: 7vw;
								line-height: 7vw;
								width: 8vw;
								display: inline-block;
								border: 0.2vw solid #f1f1f1;
								border-radius: 1vw;
								text-align: center;
								font-size: 20px;
								cursor: pointer;
							}
						}
						>span {
							position: absolute;
							right: 0;
							bottom: 0;
							width: 13vw;
							height: 13vw;
							background: url("../../assets/car/images/laji.svg") no-repeat center/50%;
						}
					}
				}
			}
		}
		label,
		span {
			&:active {
				-webkit-transform: scale(1.3);
				transform: scale(1.3);
			}
		}
		a:hover {
			text-decoration: none;
		}
	}
</style>