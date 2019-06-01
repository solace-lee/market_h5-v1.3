<template>
	<div class="tmpl">
		<div class="head">
			
		<mt-navbar v-model="selected">
        <mt-tab-item id="1">
          <span> 
            <div @click="" style="font-size: 16px;">
              品质推荐
            </div>
          </span>
        </mt-tab-item>
        <mt-tab-item id="2">
          <div @click="" style="font-size: 16px;">发现精彩</div>
        </mt-tab-item>
        </mt-navbar>
      
		</div>
		
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <div class="content1">
			
			<ul>
				<li v-for='(item,index) in grous' :key="index" style="width: 100%;background-color: #F2F2F2;">
					<router-link :to="{path:'/hotspotparticulars?flash='+item.flash_id+'&name='+item.title}">
						<div>
							<img :src="item.title_img" height="100%" width="100%" style="height: 18rem;">
							<div style="background-color: #000000;opacity: 0.5;margin-top: -14.5%;height: 4.28rem;">
								<h1 style="text-overflow:ellipsis;margin-top: 2px;text-indent:32px;color: white;font-size: 1.6rem;">{{item.content}}</h1>
								<!-- <p>{{item.commodity_details}}</p> -->

							</div>
							<div style="height: 10px;z-index: 1000000;"></div>
						</div>
					</router-link>
				</li>
			</ul>

		</div>

      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <div class="content">
			<ul>
				<li v-for='(item,index) in grous' :key="index">
					<router-link :to="{path:'/hotspotparticulars?flash='+item.flash_id+'&name='+item.title}">
						<div>
							<img :src="item.title_img">
							<div class='describe'>
								<h1>{{item.content}}</h1>
								<!-- <p>{{item.commodity_details}}</p> -->

							</div>
						</div>
					</router-link>
				</li>

		</ul>
		</div>

      </mt-tab-container-item>
    </mt-tab-container>
		
				<v-baseline></v-baseline>
		<v-footer :foot="foot"></v-footer>
	</div>
</template>

<script>
	import Header from "@/common/_header.vue";
	import Baseline from "@/common/_baseline.vue";
	import Footer from "@/common/_footer.vue";
	export default {
		components: {
			"v-header": Header,
			"v-baseline": Baseline,
			"v-footer": Footer,
		},
		data() {
			return {
				selected: "1",
				list: [],
				grous: [],
				page: 1,
				nomore: false,
				finished: false,
				loading: true,
				foot: '2',
			};
		},
		created() {
			this.foot = 2;
			this.getcommodity();
		},
		methods: {
			// 获取列表
			getcommodity() {
				this.$http
					.get(this.HOME + "/flash/GetFlashs?page=1&classify=12")
					.then(res => {
						this.grous = res.data.Data.List;
						console.log(this.grous);
					})
					.catch(err => {
						console.log(err.header);
					});

			},
			onLoad() {
				console.log(!this.loading)
				if(!this.loading) {
					console.log("111111111111111")
					return
				}
				this.loading = true;
				console.log(this.page)
				this.getlist()
			},
			tocommodityinfo(id) {
				console.log(123);
				//  this.$router.push({ path: "/category?name=" + "分类" });
				this.$router.push({
					path: "/detail?name=商品详情" + '&id=' + id
				});
			}
		}
	};
</script>
<style scoped lang="less">
	// 清除浮动
	.cleafix:after {
		content: ".";
		clear: both;
		display: block;
		height: 0;
		overflow: hidden;
		visibility: hidden;
	}
	.mint-navbar .mint-tab-item.is-selected {
    text-decoration: none;
    border-bottom: 3px solid #26a2ff;
    color: #26a2ff;
    margin-bottom: -3px;
    }
	.head {
		position: fixed;
		margin-bottom: 10px;
		width: 100%;
		height: 4rem;
		background-color: #FFFFFF;
		z-index: 10000;
	}
	
	.list {
		padding: 0 10px;
	}
	.content1{
		margin-top: 4.4rem;
	}
	.content {
		margin-top: 4rem;
		ul {
			width: 100%;
			// display: flex;
			li {
				border-radius: 8px;
				margin: 2%;
				width: 46%;
				float: left;
				div {
					padding: 0.5rem;
					img {
						border-radius: 8px;
						width: 96%;
						margin: 2%;
						height: 10rem;
					}
					.describe {
						width: 100%;
						h1 {padding-top: 1px;
							width: 100%;
							height: 31px;
							color: #000;
							/*font-weight: 700;*/
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 2;
							/*! autoprefixer: off */
							-webkit-box-orient: vertical;
							/*! autoprefixer: on */
						}
						p {
							width: 100%;
							font-size: 0.8rem;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
						}
						p {
							padding: 0.3rem 0;
							position: relative;
							span {
								color: #D42732;
							}
							span:nth-child(2) {
								font-size: 1.5rem;
							}
							span:nth-child(3) {
								display: inline-block;
								border: 1px solid #cb2221;
								border-radius: 0.4rem;
								text-align: center;
								color: #cb2221;
								width: 2.5rem;
								height: 1.2rem;
								position: absolute;
								right: 0.8rem;
								top: 0.5rem;
							}
						}
					}
				}
			}
		}
	}
	.group {
		width: 100%;
		height: 120px;
		display: flex;
		margin-top: 8px;
		background-color: #fff;
		.group-left {
			width: 30vw;
			height: 30vw;
			text-align: center;
			>img {
				padding-top: 2.5%;
				width: 95%;
				height: 95%;
			}
		}
		.group-right {
			position: relative;
			padding-left: 8px;
			width: 65%;
			/* height: 100%; */
			font-size: 14px;
			line-height: 20px;
			/* display: flex;
        justify-content: center;
        flex-direction: column; */
			.goodsname {
				color: #666;
				font-weight: 600;
				overflow: hidden;
				display: -webkit-box;
				-webkit-line-clamp: 1;
				/*! autoprefixer: off */
				-webkit-box-orient: vertical;
				/*! autoprefixer: on */
				word-break: break-all;
				span {
					font-size: 0.6rem;
					border: 1px solid #fc5753;
					color: #fc5753;
					padding: 0 0.2rem;
				}
			}
			.serve {
				position: absolute;
				left: 5px;
				height: 30%; // display: flex;
				// align-items: center;
				>span {
					background-color: #00ad8a;
					color: #fff;
					border-radius: 0.3rem;
					display: inline-block;
					padding: 2px 4px;
					font-size: 14px;
					line-height: 14px;
					text-align: center;
					margin: 2px;
					font-size: 12px;
				}
			}
			.serve2 {
				position: absolute;
				top: 4rem;
				left: 10px;
				display: flex;
				align-items: center;
				height: 30%;
				color: #ff8400;
				>span:nth-of-type(1) {
					font-size: 0.8rem;
				}
				>span:nth-of-type(2) {
					font-size: 1.2rem;
					left: 10px;
				}
				>span:nth-of-type(3) {
					margin-left: 1rem;
					width: 3rem;
					height: 1rem;
					display: flex;
					align-items: center;
					color: #fc5753;
					border: 1px solid #fc5753;
					border-radius: 0.3rem;
				}
			}
			.store {
				position: absolute;
				left: 10px;
				bottom: 0.5rem;
				font-size: 12px;
				span:nth-child(2) {
					color: #666666;
					margin-left: 0.4rem;
					font-size: 0.6rem;
				}
			}
		}
	}
</style>