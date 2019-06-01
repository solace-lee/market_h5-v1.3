<template lang="html">
	<section class="carLovely">
		<!--<img src="../../assets/首页切图与标注/" alt="" />-->
		
		<div class="section2-list">
			<div class="container1">
				<div v-for="(k,index) in grous" class="list">
					<router-link :to="{path:'/detail?id='+k.brandId}">
						<img :src="k.imgUrl" :alt="k.name" />
					<h2 class="goodstitle">{{k.name}}</h2>
					<!-- <p class="dazhe" v-if="k.packageType">{{k.packageType}}</p> -->
					<!-- <p style="height:2.1rem;" v-else></p> -->
					<p class="section2-list-price">
						<span style="font-weight:bold;"> <span class="qian">￥</span>{{k.discountPrice}}</span>
						<!--s标签是添加删除线-->
						<span class="section2-list-intro">{{k.salesVolume}}人付款</span>
						<!-- <span class="buyBtn" @click="addCarList(commodity)"> -->
           	<!-- <img src="../../../img/首页切图与标注/drawable-xhdpi/品质推荐/新品推介/首页_新品推介_购物车@2x.png" alt="" /> -->
           </span>
					</p> 
					</router-link>
				</div>
			</div> 
		</div>
	</section>
</template>

<script>
import { Lazyload } from "mint-ui";
export default {
  data() {
    return {
      grous: [],
      page: 1,
      showBackTop:false
    };
  },
  created() {
    this.getguess();
  },
  beforeDestroy() {
    // 销毁监听事件
    console.log('解除监听1');
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    getguess() { 
      this.district = sessionStorage.getItem("district");
      this.city = sessionStorage.getItem("city");
      this.province = sessionStorage.getItem("province");
      var obj = {};
      obj.provinceName = this.province;
      obj.cityName = this.city;
      obj.districtName = this.district;
      var token = localStorage.getItem("Token");
      console.log(token);
      this.$http.post(this.HOME+ this.SEARCH + "commodity/indexlike", obj).then(res => {
        this.grous = res.data.data;
      });
    },
    // 下拉刷新
    handleScroll () {
      // 获取滚动高度并判断是否显示返回顶部按钮
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      // 获取屏幕高度
      const deviceHight = document.documentElement.clientHeight
      // 获取页面高度
      const insexHight = this.$refs.indexPart.offsetHeight
      if (scrollTop > deviceHight) {
        this.showBackTop = true
      } else {
        this.showBackTop = false
      }
      // 判断是否要启动触底事件
      const allHeight = scrollTop + deviceHight + 100
      if (allHeight > insexHight) {
        // 触发触底事件
        console.log('触底了');
        // this.getMore()
      }
    },
  }
};
</script>

<style lang="less" scoped>
// @import "../../assets/fz.less";
// @import "../../assets/index/style.css";
// 清除浮动
// .cleafix:after {
//   content: ".";
//   clear: both;
//   display: block;
//   height: 0;
//   overflow: hidden;
//   visibility: hidden;
// }

.carLovely {
  width: 100%;
  overflow: hidden;
  position: relative;
  
}

.container1 {
  width: 100%;
  // padding: 0.5rem 1rem 0.25rem 1rem;
  display: flex;
  flex-wrap: wrap;
  // justify-content: space-between;
  .list {
    width: 45.5%;
    overflow: hidden;
    background-color: #ffffff;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.3);
    border-radius: 6px;
    margin: 0.6rem 0 .6rem 3%;
    position: relative;
    img {
      width: 100%;
      height: 15.4rem;
    }
    .diqu {
      // width: 4.4rem;
      padding: 0 .6rem;
      height: 1.9rem;
      background-color: #ba9078;
      font-size: 1.2rem;
      line-height: 2rem;
      font-weight: normal;
      text-align: center;
      color: #ffffff;
      position: absolute;
      left: 1.4rem;
      top: 14.8rem;
    }
    .goodstitle {
      width: 100%;
      height: 27px;
      font-family: SourceHanSansCN-Regular;
      font-size: 1.3rem;
      font-weight: normal;
      font-stretch: normal;
      box-sizing: border-box;
      margin-top: 2rem;
      padding: 0 1rem;
      letter-spacing: 0px;
      color: #333333;
      /*超过两行省略号*/
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      /*! autoprefixer: off */
      -webkit-box-orient: vertical;
      /*! autoprefixer: on */
    }
    .dazhe {
      margin-top: 8px;
      width: 5.7rem;
      height: 1.3rem;
      font-size: 0.9rem;
      border: solid 1px #ff0000;
      color: #ff0000;
      line-height: 1.2rem;
      text-align: center;
      margin-left: 1.2rem;
      // border-radius: 6px;
    }
    .section2-list-price {
      margin-top: 4px;
      font-size: 2rem;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #00ae87;
      display: flex;
      justify-content: space-between;
      margin-bottom: .5rem;
      // position: relative;
      .qian {
        width: 8px;
        height: 9px;
        font-family: SourceHanSansCN-Regular;
        font-size: 1.2rem;
        font-weight: normal;
        font-stretch: normal;
        margin-left: 1.2rem;
        letter-spacing: 0px;
        color: #00ae87;
      }
      .section2-list-intro {
        // float: right;
        padding-top: 1.2rem;
        padding-right: 1.2rem;
        font-size: 1rem;
        color: #333 ;
      }
      // .buyBtn {
      //   position: absolute;
      //   right: 0.7rem;
      //   bottom: 0.2rem;
      //   img {
      //     width: 1.5rem;
      //     height: 1.3rem;
      //     margin-right: 10px;
      //   }
      // }
    }
  }
  // .list:nth-child(2n){
  // 	margin-left: .6rem
  // }
  // .list:nth-child(1n){
  // 	margin-right: .6rem
  // }
}
</style>