<template lang="html">
  <div class="detail">
    <div ref="viewBox">
      <div class="head">
        <div class="site">
          <div @click="$router.go(-1)">
            <van-icon name="arrow-left" />
          </div>
        </div>
        <div class="headtitle">
          <div style="margin-top: 3px;margin-left: 30px;">
            <span :class='{spanactive:isA}' @click='goCommodity'>商品</span>
            <span :class='{spanactive:isB}' @click='goRemark'>评价</span>
            <span :class='{spanactive:isC}' @click='goDetails'>详情</span>
          </div>
        </div>
      </div>
      <div style='width: 100%;height: 3rem;'></div>
      <!-- 商品 -->
      <div>
        <div class="swiper">
          <mt-swipe :auto="4000">
            <mt-swipe-item v-for="i in img" :key="i.img_id">
              <img :src="i.img_url" preview="0">
            </mt-swipe-item>
          </mt-swipe>

        </div>
        <section class="chose">
          <div class="chose-view">
            <h1 class="chose-view-title" v-if='info.integral!=null&&info.integral!=0'>
              <div class="title">
                <span style="margin-top: 12px;font-size: 1.8rem;">
                  {{info.name}}
                </span>
              </div>
              <div style="height:3.8rem;line-height: 3.8rem;font-size: 16px;">
                <span>￥</span>
                <span>
                  {{info.discount_price}}+{{info.integral}}<b style="font-size: 1.2rem;">积分</b>
                </span>
                 <span>
                  <del>原价￥{{info.original_price}}</del>
                </span>
                <span class="hotclass" v-if='info.commodity_area==3'>热</span>
                <span class="hotclass" v-if='info.commodity_area==4' style='color: #00ad8a;border: 1px solid #00ad8a'>市</span>
              </div>
              <span style="height: 0.4rem;">&nbsp;</span>
              <div class="jage">
                <span style="font-size: 1.5rem;">库存： {{info.quantity}}
                  <!-- {{$store.state.detail.id.commodity.quantity}} -->
                  件
                </span>
              </div>
            </h1>
            <h1 class="chose-view-title" v-if='info.integral==null||info.integral==0'>
              <div class="title">
                <span style="margin-top: 12px;font-size: 1.8rem;">
                  {{info.name}}
                </span>

              </div>

              <div style="height:3.8rem;line-height: 3.8rem;font-size: 16px;">
                <span>￥</span>
                <span>
                  {{info.discount_price}}
                </span>
                 <span>
                  <del>原价￥{{info.original_price}}</del>
                </span>
                <span class="hotclass" v-if='info.commodity_area==3'>热</span>
                <span class="hotclass" v-if='info.commodity_area==4' style='color: #00ad8a;border: 1px solid #00ad8a'>市</span>
              </div>
              <span class='integral' v-if='info.integral!=null'>{{info.integral}}积分</span>
              <div class="jage">
                <span style="font-size: 1.5rem;">库存： {{info.quantity}}
                  <!-- {{$store.state.detail.id.commodity.quantity}} -->
                  件
                </span>
              </div>
            </h1>

            <p class="chose-view-intro"></p>
          </div>

          <div>
            <div class="chos_fw" @click="show1=true">
              <span>服务</span>
              <span>
                {{info.server}}
              </span>
              <span class="el-icon-arrow-right"></span>
            </div>
            <!-- 服务弹层 -->
            <van-popup v-model="show2" position="bottom" :overlay="true">
              <div class="boxf">
                <h1 style="font-size: 1.6rem;height:5.6rem;margin:10px 0px 10px 0px ;border-bottom:1px solid #e5e5e5;;">服务</h1>
              
                <label class="mint-checklist-label boxf2" v-for="array in serverlist ">
                  <span class="mint-checkbox">
                    <van-checkbox v-model="checked" disabled>{{array}}</van-checkbox>
                    <span class="mint-checkbox-label ">
                    </span>
                  </span>
                </label>
                <button class="btn" @click="show2=false">完成</button>
              </div>
            </van-popup>
          </div>

          <div class="chos_fw " @click="show1=true">
            <span>规格</span>
            <div>

              <span></span>
              <span class="el-icon-arrow-right"></span>
            </div>
          </div>
          <!-- 规格弹出层 -->
          <van-popup v-model="show1" position="bottom" :overlay="true">
            <div class="content">
              <div class="top">
                <img :src="info.img_url" alt="" >
                <div class="topRight">
                  <p> {{info.name}}</p>
                  <p v-if="info.integral==null||info.integral==0">
                    <i>￥</i>
                    <span>{{amount}}</span>
                  </p>
                  <p v-else>
                    <i>积分</i>
                    <span>{{info.integral}}</span>
                  </p>
                  <p>库存 {{info.quantity}} 件</p>

                </div>
              </div>
              <div class="guige">
                <p>{{specification_name}}</p>
                <div style="height: 25vw;text-align: center;overflow-y: scroll;">
                  <p style="line-height: 30px;" :class='{green:flag==index}' v-for='(item,index) in Specification' :key="index" @click='addClass(index,item.commodity_id,item.cs_link_id,item.link_value,item.amount)'>{{item.link_value}}</p>
                </div>

              </div>
              <div class="buy" >
                <span>购买数量</span>
                <div style="border:1px solid #e5e5e5;">
                <van-stepper v-model="value" /></div>
              </div>
              <div class="btns">
<!--              	<button @click='addIntoCar'>购物车</button>-->
                <button @click='goOrder' v-if="info.integral==null||info.integral==0">确定</button>
                <button @click='gojfOrder' v-else>确定</button>
              </div>

            </div>
          </van-popup>
          <!-- 规格弹出层 -->
          <van-popup v-model="show2" position="bottom" :overlay="true">
            <div class="content">
              <div class="top">
                <img :src="info.img_url" alt="" >
                <div class="topRight">
                  <p> {{info.name}}</p>
                  <p v-if="info.integral==null||info.integral==0">
                    <i>￥</i>
                    <span>{{amount}}</span>
                  </p>
                  <p v-else>
                    <i>积分</i>
                    <span>{{info.integral}}</span>
                  </p>
                  <p>库存 {{info.quantity}} 件</p>

                </div>
              </div>
              <div class="guige">
                <p>{{specification_name}}</p>
                <div style="height: 25vw;text-align: center;overflow-y: scroll;">
                  <p style="line-height: 30px;" :class='{green:flag==index}' v-for='(item,index) in Specification' :key="index" @click='addClass(index,item.commodity_id,item.cs_link_id,item.link_value,item.amount,item.integral)'>{{item.link_value}}</p>
                </div>

              </div>
              <div class="buy" >
                <span>购买数量</span>
                <div style="border:1px solid #e5e5e5;">
                <van-stepper v-model="value" /></div>
              </div>
              <div class="btns">
              	<button @click='addIntoCar'>加入购物车</button>
<!--                <button @click='goOrder'>确定</button>-->
              </div>

            </div>
          </van-popup>

          <div class="chos_fw3">
            <span>用户评价({{count}})</span>
            <!-- <span class="el-icon-arrow-right"></span> -->
          </div>

           <div class="chos_fw4" v-if='count==0'>
             <div><span>暂无评价！</span></div>
           </div>
          <div class='chosfather' v-if="count>1">
            <div class="chos_fw4" v-for='(l,index) in comment' :key="index">
            <span>
              <img :src="l.img_url" alt="">
            </span>
            <span>{{l.nickname}}</span>
            <span>{{l.createddate}}</span>
            <span>{{l.content}}</span>
           
          </div>
           <p class='all'>
              <router-link :to="{path:'/search7?name=全部评论'+'&cid='+this.cid}">
                <button>查看全部评论</button>
              </router-link>
            </p>
          </div>
          <div class='chosfather' v-if="count==1">
            <div class="chos_fw4">
            <span>
              <img :src="str.img_url" alt="">
            </span>
            <span>{{str.nickname}}</span>
            <span>{{str.createddate}}</span>
            <span>{{str.content}}</span>
           
          </div>
           <p class='all'>
              <router-link :to="{path:'/search7?name=全部评论'+'&cid='+this.cid}">
                <button>查看全部评论</button>
              </router-link>
            </p>
          </div>

          </router-link>
          <div class="details">
            <h1 class="chose_h1">产品详情</h1>
            <div v-html='info.commodity_details' >
            </div>
          </div>
          <div class="buyGoodsBtn">
            <div class="left-box">
              <div class="gotoshop left-btn" @click='goshop(info.shop_id)'>
                <img src="../../img/userImg/mall_tab_bg_shop (4).png" alt="">
                <span>店铺</span>
              </div>
              <div class="shoucang left-btn" @click='goKefu'>
                <img src="../../img/userImg/mall_bg_customerservice.png" alt="">
                <span>客服</span>
              </div>
              <div class="shoucang left-btn" @click='examine1'>
                <img src="../../img/userImg/mall_bg_cart.png" alt="">
                <span>加入购物车</span>
              </div>
            </div>
            <div class="buyBtn">
              <div class="toBuy buybtn-btn" @click="examine" v-if="name==null||name=='商品详情'">
                立即购买
              </div>
              <div class="toBuy buybtn-btn" @click="examine" v-if="name=='积分兑换'">
                立即兑换
              </div>
            </div>
          </div>

        </section>
        <!-- <section class="content">
          <div class="img-wrap" v-for="k in contentImgs">
            <img :src="k.imgUrl">
          </div>
        </section> -->
      </div>
    </div>

    <v-baseline></v-baseline>
    <!-- <v-footer></v-footer> -->
  </div>
</template>

<script>
import { MessageBox } from "mint-ui";
import Baseline from "@/common/_baseline.vue";
import { Toast } from "vant";
import wx from "weixin-js-sdk";
import Header from "@/common/_header.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    "v-baseline": Baseline,
    "v-header": Header
  },
  data() {
    return {
      isA: true,
      isB: false,
      isC: false,
      isgray: true,
      isgreen: false,
      datas: "",
      token: "",
      box: "",
      flag: 0,
      // 商品id
      cid: "",
      name: "",
      scrollTop: 0,
      // 轮播图
      img: [],
      // 评论
      comment: [],
      // 商品内容
      info: {},
      checked: true,
      show1: false,
      show2: false,
      // 购买的数量
      value: 1,
      amount: "",
      count: "",
      link_value: "",
      title: "",
      imgPath: "",
      // 商品规格
      Specification: [],
      specification_name: "",
      serverlist: [],
      integral: "",
      str: ""
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  created() {
    this.$previewRefresh(); //异步生成图片预览
    this.getuserId();
    this.getShose();
    this.getSpecification();
    //  this.selectedList();
    //  this.unSelectedList();
  },
  watch: {
    $route: function(to, from) {
      window.scrollTop = 0;
    },
    scrollTop() {
      console.log(this.scrollTop);
      if (this.scrollTop > 426 && this.scrollTop < 750) {
        this.isB = true;
        this.isA = false;
        this.isC = false;
      } else if (this.scrollTop < 426) {
        this.isA = true;
        this.isB = false;
        this.isC = false;
      } else if (this.scrollTop > 750) {
        this.isA = false;
        this.isB = false;
        this.isC = true;
      }
    }
  },
  updated() {
    $(".details")
      .find("img")
      .attr("preview", "0");
    $(".details")
      .find("img")
      .css("width", "100%");
    $(".pswp__ui")
      .find(".pswp__top-bar")
      .css("top", "4rem");
  },
  computed: {
    carList() {
      return this.$store.state.detail.carList;
    }
  },
  methods: {
    //检查是否登录
    examine() {
      if (localStorage.getItem("Token") == null) {
        this.$router.push({ path: "/wx" });
      } else {
        this.show1 = true;
      }
    },
    examine1() {
      this.show2 = true;
    },
    handleScroll() {
      this.scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
    },
    // 获取用户id
    getuserId() {
      this.token = localStorage.getItem("Token");
      this.cid = this.$route.query.id;
      this.name = this.$route.query.name;
      console.log();
    },
    // 客服
    goKefu() {
      var username = JSON.parse(localStorage.getItem("userMsg")).Account;
      var to_username = "15622532417";
      var nickname = "15622532417";
      this.$router.push({
        path:
          "/Kefu?username=" +
          username +
          "&to_username=" +
          to_username +
          "&to_nickname=" +
          nickname
      });
    },
    // 商品
    ...mapActions(["addCarList", "setLocalCount"]),
    goCommodity() {
      this.isA = true;
      this.isB = false;
      this.isC = false;
      window.scrollTo(0, 0);
    },
    // 评论
    goRemark() {
      this.isB = true;
      this.isA = false;
      this.isC = false;
      window.scrollTo(0, 426);
    },
    // 详情
    goDetails() {
      this.isC = true;
      this.isB = false;
      this.isA = false;
      window.scrollTo(0, 750);
    },

    // 到店铺
    goshop(shopid) {
      this.$router.push({ path: "/indexS?shopId=" + shopid });
    },
    // 点击选中某个规格
    addClass(index, cid, csid, link_value, amount, integral) {
      console.log(index);
      this.flag = index;
      this.isgray = false;
      this.isgreen = true;
      this.cs_link_id = csid;
      this.amount = amount;
      this.link_value = link_value;
      //    this.integral=integral
    },

    // 获取详情页
    getShose() {
      this.$http
        .get(
          this.HOME +
          "/getCommodityDetailInfo/" + this.cid
        )
        .then(res => {
          // console.log(res);
          this.img = res.data.data.tbCommodityImgList; // 轮播图数据
          this.info = res.data.data.linkCommoditySpecificationList; // 商品规格数据
          this.str = res.data.data.comment; // 评论详情
          console.log(this.img);
          this.count = res.data.data.count; // 商品评论总数
          this.serverlist = res.data.data.linkCommodityServerList; // 支持的服务
          this.title = res.data.data.info.name; // 规格弹出层
          this.integral = res.data.data.info.integral; // 购买商品能获得的积分
          this.imgPath = res.data.data.info.img_url; // 规格上的图片
          console.log(this.imgPath);
          arr = str.split(",");
          // console.log(arr);
          console.log(this.img);
          console.log(this.info);
          console.log(this.comment);
          console.log(this.count);
          console.log(this.serverlist);
        });
    },
    // 获取商品规格
    getSpecification() {
      this.$http
        .get(this.HOME + "/getCommodityDetailInfo/" + this.cid)
        .then(res => {
          // console.log(res);
          this.Specification = res.data.Data;
          this.cs_link_id = res.data.Data[0].cs_link_id;
          this.link_value = res.data.Data[0].link_value;
          //      this.integral=res.data.Data[0].integral;
          this.specification_name = res.data.Data[0].specification_name;
          this.amount = res.data.Data[0].amount;
          this.Specification.forEach(el => {
            this.specification_name = el.specification_name;
          });
          console.log(1111);
          console.log(this.Specification);
        });
    },
    getTime(d) {
      var time = new Date(d);
      var y = time.getFullYear();
      var m = time.getMonth(+1);
      var d = time.getDate();
      return y + "-" + m + "-" + d;
    },
    goOrder() {
      var info = {};
      info.cs_link_id = this.cs_link_id;
      info.commodity_id = this.csid;
      info.value = this.value;
      info.amount = this.amount;
      info.link_value = this.link_value;
      info.specification_name = this.specification_name;
      info.commodity_id = this.cid;
      sessionStorage.setItem("info", JSON.stringify(info));
      if (this.cs_link_id) {
        this.$router.push({
          path: "/car/pay?name=确认订单" + "&cs_link_id=" + this.cs_link_id
        });
      } else {
        Toast("请选择规格");
        return;
      }
    },
    gojfOrder() {
      var info = {};
      info.integral = this.integral;
      info.cs_link_id = this.cs_link_id;
      info.commodity_id = this.csid;
      info.value = this.value;
      info.amount = this.amount;
      info.link_value = this.link_value;
      info.specification_name = this.specification_name;
      info.commodity_id = this.cid;
      sessionStorage.setItem("info", JSON.stringify(info));
      if (this.cs_link_id) {
        this.$router.push({
          path:
            "/car/payintegral?name=积分订单" + "&cs_link_id=" + this.cs_link_id
        });
      } else {
        Toast("请选择规格");
        return;
      }
    },
    addIntoCar() {
      //  mint-ui的弹出式提示框
      const product = [
        {
          title: this.title,
          value: this.value,
          price: this.amount,
          size: this.specification_name + "：" + this.link_value,
          id: this.cid,
          imgPath: this.imgPath,
          choseBool: false
        }
      ];

      MessageBox.confirm(
        `商品名称:${product[0].title}</br>` +
          `价格:${product[0].price}</br>` +
          `数量:${product[0].value}</br>` +
          `规格:${product[0].size}</br>`
        //        +`商品ID:${product[0].id}</br>`
      ).then(
        action => {
          //点击成功执行这里的函数
          this.$store.dispatch("setLocalCount", true);
          this.$store.dispatch("addCarList", product);

          Toast({
            message: "添加成功",
            duration: 1000
          });
        },
        function(err) {}
      );
      this.show2 = false;
    }
  }
};
</script>
<!--<style>
.details img{
   width: 100%;
}
</style>-->
<style lang="less" scoped>
@import "../assets/fz.less";
@import "../assets/index/style.css";
.van-stepper__input {
  margin-left: 0px;
}
.integral {
  border: 1px solid red;
  padding: 0.1rem 0.3rem;
  color: #cc2b35 !important;
  border-radius: 0.2rem;
}

.head {
  border-bottom: 1px solid #f2f2f2;
  width: 100%;
  height: 4rem;
  background-color: #ffffff;
  display: flex;
  position: fixed;
  z-index: 100000;
  justify-content: space-between;
  color: #000;
  .site {
    width: 3rem;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .headtitle {
    flex: 1;
    height: 100%;
    div {
      height: 100%;
      padding: 0 3rem;
      line-height: 3rem;
      span {
        display: inline-block;
        width: 25%;
        text-align: center;
        height: 100%;
        font-size: 1.6rem;
      }
      span:hover {
        color: #006bdd;
      }
      .spanactive {
        border-bottom: 2px solid #fff;
      }
    }
  }
} // .head {
//   width: 100%;
//   height: 3rem;
//   background-color: #1bc6a3;
//   position: fixed;
//   z-index: 100000;
//   .site {
//     width: 4rem;
//     height: 100%;
//     display: flex;
//     position: absolute;
//     color: #fff;
//     div {
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       .van-icon-location {
//         vertical-align: middle;
//       }
//       span {
//         font-size: 1rem;
//       }
//     }
//   }
//   .headtitle {
//     display: inline-block;
//     flex: 1;
//   }
// }

.content {
  width: 100%;
  background-color: #fff;
  .img-wrap {
    padding: 0 0.5rem;
    img {
      width: 100%;
    }
  }
}
.hotclass {
  padding: 0.1rem 0.3rem;
  color: #cc2b35;
  border: 1px solid #cc2b35;
}
.detail {
  overflow: hidden;
  width: 100%;
  padding-bottom: 14vw;
}

.buyGoodsBtn {
  width: 100%;
  height: 5rem;
  background-color: #f2f2f2;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
}

.left-box {
  width: 50%;
  height: 100%;
  display: flex;
}

.gotoshop i {
  color: #fc0;
}

.shoucang i {
  color: #cc2b35;
}

.left-btn {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 1.8rem;
    padding: 0.2rem 0;
  }
  span {
    padding: 0.1rem 0;
    font-size: 0.8rem;
  }
}

.left-btn:nth-child(2) {
  img {
    width: 1.8rem;
  }
}

.buyBtn {
  width: 50%;
  height: 100%;
  color: #fff;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 0.5rem;
}

.buybtn-btn {
  width: 50%;
  height: 3.5rem;
  line-height: 3.5rem;
  text-align: center;
  font-size: 1.4rem;
}

.toBuy {
  background-color: #00ad8a;
  width: 100%;
}

.goodsMsgBox {
  overflow-y: scroll;
  background-color: #fff;
  width: 100%;
  height: 70vh;
  padding-top: 1rem;
  border-radius: 10px 10px 0 0;
  border-top: 1px solid #ccc;
}

.title {
  width: 100%;
  display: flex;
  box-sizing: border-box;

  .price_symbol {
    font-size: 0.3rem;
  }
  .discountPrice {
    font-size: 0.8rem;
    color: #666;
  }
}

.img {
  // transform: translate(0.5rem, -1.5rem);
  width: 25%;
  height: 100%;
  img {
    width: 100%;
  }
}

.title-right {
  box-sizing: border-box;
  padding-left: 0.8rem;
  width: 65%;
  line-height: 2rem;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  p {
    font-size: 0.8rem;
  }
}

.titletext {
  widows: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.title-price {
  font-size: 1.2rem;
  color: #cd2a34;
}

.closeBtn {
  background-color: #eee;
  width: 1.5rem;
  height: 1.5rem;
  line-height: 1.5rem;
  border-radius: 50%;
  position: absolute;
  top: -0.5rem;
  right: 1rem;
  text-align: center;
  img {
    width: 80%;
    height: 80%;
  }
}

.commodity {
  padding: 2.5rem 0.5rem 0.5rem 0.5rem;
  border-top: 1px solid #eee;
}

.commodityTitle {
  font-size: 1rem;
  color: #000;
}

.commoditylist {
  padding: 1rem 0;
}

.commoditylist span {
  margin: 0.2rem;
  display: inline-block;
  height: 1.3rem;
  line-height: 1.3rem;
  padding: 0.3rem 0.7rem;
  border-radius: 1.3rem;
  background-color: #ccc;
  font-size: 0.8rem;
  letter-spacing: 0.1rem;
}

.commoditylist .acrive {
  background-color: #cc2b35;
  color: #fff;
}

.buyNum {
  display: flex;
  justify-content: flex-end;
  .van-stepper .van-stepper__input {
    margin-left: 0px !important;
  }
  input {
    margin-left: 0px !important;
  }
}

.goodsMsgBuyBtn {
  width: 90%;
  height: 4rem;
  margin: 0.5rem auto;
  div {
    width: 50%;
    height: 1.5rem;
    float: left;
    text-align: center;
    padding: 0.6rem 0;
    color: #fff;
    letter-spacing: 0.1rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  div:nth-child(1) {
    background-color: #ff6565;
    border-top-left-radius: 1.5rem;
    border-bottom-left-radius: 1.5rem;
  }
  div:nth-child(2) {
    background-color: #cd2a34;
    border-top-right-radius: 1.5rem;
    border-bottom-right-radius: 1.5rem;
  }
}

.chose-view .chose-view-title .title {
  font-size: 0.6rem;
  color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;

  padding: 0.2rem;
  span {
    color: #333;
    font-size: 1rem;
    /*display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;*/
  }
} // 分享
.share1 {
  margin: 0 0.5rem;
  width: 1rem;
  color: #999;
  font-size: 22px;
}

.chose-view-title {
  background-color: #fff; //   border: 1px solid #000;
  margin-bottom: 5px;
  padding-left: 10px;

  span:nth-of-type(1) {
    font-size: 10px;
    color: #ff8400;
  }
  span:nth-of-type(2) {
    font-size: 2rem;
    color: #ff8400;
    margin-left: -5px;
  }
  .jage {
    // border: 1px solid #000;
    height: 1.5rem;
    text-align: right;
    padding-right: 1rem;
    span {
      color: #666;
      font-size: 0.6rem;
    }
  }
}

.chose {
  background-color: #eee;
  width: 100%;

  /* line-height: 40px; */
  font-size: 0.6rem;
  color: rgba(172, 169, 169, 0.925);

  > span:nth-of-type(2) {
    //   border: 1px solid #000;
    font-size: 15px;
    color: #000;
  }
  > span:nth-of-type(3) {
    font-size: 15px; //    margin-left: 50px;
    //    border: 1px solid #000;
    position: absolute;
    right: 10px;
    top: 11px;
  }
}

.chos_fw {
  font-size: 1.4rem;
  margin-top: 1px;
  background-color: #fff;
  padding: 0 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
  span:nth-child(2) {
    flex: 1;
    padding-left: 1rem;
  }
}

.chos_fw3 {
  // border: 1px solid #000;
  background-color: #fff;
  margin-top: 4px;
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  color: #000;
  padding-left: 5px;
  position: relative;
  > span:nth-of-type(2) {
    font-size: 18px;
    color: #ccc; // margin-left: 210px;
    position: absolute;
    right: 10px;
    top: 11px;
  }
}
.chosfather {
  position: relative;
  padding-bottom: 2.6rem;
  background-color: #fff;
}
.chos_fw4 {
  width: 100%;
  height: 120px;
  border: 1px solid #eee;
  background-color: #fff;
  position: relative;
  div {
    font-size: 1rem;
    color: #333;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  .details {
    width: 100%;
    .img {
      width: 100%;
      height: 100%;
    }
  }
  > span:nth-of-type(1) {
    display: inline-block;
    width: 50px;
    height: 50px;
    border-radius: 30px;
    margin-left: 10px;
    margin-top: 10px;
    img {
      border-radius: 50%;
      width: 100%;
      height: 100%;
    }
  }

  > span:nth-of-type(3) {
    // border: 1px solid red;
    font-size: 14px;
    position: absolute;
    right: 5px;
    top: 23px;
  }
  > span:nth-of-type(4) {
    // border: 1px solid #000;
    position: absolute;
    top: 70px;
    width: 90%;
    left: 10px;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.all {
  width: 100%;
  text-align: center;
  position: absolute;
  left: 0;
  height: 3.6rem;
  button {
    padding: 2px 5px;
    border-radius: 10px;
    color: #0bb794;
    background-color: #fff;
    border: 1px solid #0bb794;
    font-size: 1.6rem;
  }
}

.chose_h1 {
  background-color: #fff;
  width: 100%;
  height: 45px;
  line-height: 45px;
  text-indent: 1em;
  margin-top: 5px;
  font-size: 1.6rem;
} //分享弹出层
.share_box {
  // width: 100%;
  height: 400px;
  border: 1px solid #000;
  width: 99%;
  height: 350px;
  display: flex;
  flex-direction: column;
  border-top-left-radius: 15px;
  border-top-right-radius: 10px;

  h1 {
    width: 100%;
    height: 50px; // text-align: center;
    line-height: 50px; // border: 1px solid red;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    text-indent: 1em;
    position: relative;
    .share_hide {
      // border: 1px solid #000;
      position: absolute;
      right: 10px;
      top: 10px;
    }
  }
  .share_box3 {
    width: 100%;
    height: 50px;

    display: flex;
    position: relative;
    top: 120px;
    align-items: center;
    justify-content: center;
    .btn {
      width: 90%;
      height: 50px; // background-color: #e24e56;
      color: #000; // margin-top: 50px;
      border-radius: 25px;
      position: absolute;
      bottom: 0;
      border: 1px solid #ccc;
    }
  }
  .share_box2 {
    // border: 1px solid #000;
    width: 100%;
    height: 120px;
    display: flex;
    align-items: center; // justify-content: center;
    flex-wrap: wrap; //  flex-direction: column;
    .box22 {
      // border: 1px solid #000;
      text-align: center;
      > img {
        display: block;
        width: 60px;
        height: 60px;
        border-radius: 30px;
        margin: 15px; // border: 1px solid #000;
      }
    }
  }
} //服务弹出层
.van-popup--bottom {
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}

.boxf {
  width: 100%;
  height: 22rem;
  width: 99%;
  display: flex;
  flex-direction: column;
  border-top-left-radius: 15px;
  border-top-right-radius: 10px;
  font-size: 0.6rem;
  h1 {
    width: 100%;
    height: 1.8rem;
    text-align: center;
    line-height: 1.8rem;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  .boxf2 {
    line-height: 1.6rem;
    font-size: 0.8rem;
    /* display: flex;
   align-items: center;  */
  }
  .p {
    padding-left: 1rem;
    display: inline;
  }
  .btn {
    width: 80%;
    height: 4.5rem;
    background-color: #0bb794;
    color: #fff;
    margin: 50px auto 0;
    border-radius: 2rem;
  }
} //颜色分类弹出层
.yardage {
  border: 1px solid #000;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  > div {
    width: 100%;
    height: 100px;
    border-bottom: 1px solid #ccc;
  }
  > .yardage2 {
    display: flex;
    align-items: center;
    margin: 10px;

    > div {
      // border: 1px solid #000;
      &:nth-of-type(1) {
        border: 1px solid #000;
        width: 80px;
        height: 80px;
        flex-grow: 1;
        > img {
          width: 100%;
          height: 100%;
        }
      }
      &:nth-of-type(2) {
        //  border: 1px solid #000;
        display: flex;
        flex-direction: column;
        flex-grow: 3; //  width: 150px;
        font-size: 12px;
        height: 30px;
        position: relative;
        text-indent: 2em; // top: 30px;
        > span {
          // position: absolute;
          // border: 1px solid #000;
          &:nth-of-type(1) {
            // border: 1px solid #000;
            position: absolute;
            top: 3px;
            left: 1px;
            color: #cd2a34;
            font-size: 8px;
          }
          &:nth-of-type(2) {
            // border: 1px solid #000;
            color: #cd2a34;
          }
          &:nth-of-type(5) {
            position: absolute;
            top: -35px;
            right: 20px;
          }
        }
      }
    }
  }
  .yardage3 {
    // border: 1px solid #000;
    text-indent: 1em;
    height: 60px;
    > button {
      // border: 1px solid #000;
      width: 50px;
      height: 20px;
      border-radius: 12.5px;
      margin-left: 25px;
      margin-top: 5px;
      font-size: 10px;
      &:active {
        background-color: #cd2a34;
        color: #fff;
      }
    }
  }
  .yardage4 {
    // border: 1px solid #000;
    text-indent: 1em;
    height: 60px;
    > button {
      // border: 1px solid #000;
      width: 50px;
      height: 20px;
      border-radius: 12.5px;
      margin-left: 25px;
      margin-top: 5px;
      font-size: 10px;
    }
  }
  .yardage5 {
    border-top: 1px solid #ccc;
    text-indent: 1em;
    display: flex;
    position: relative;
    padding-top: 20px;
    > .counter {
      // border: 1px solid #000;
      position: absolute;
      right: 10px;
    }
    .yardage_btn {
      // border: 1px solid #000;
      width: 100%;
      height: 60px;
      position: absolute;
      bottom: 0px;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      > button {
        // border: 1px solid #000;
        width: 140px;
        height: 50%;
        color: #fff;
        font-size: 14px;
        &:nth-of-type(1) {
          border-top-left-radius: 15px;
          border-bottom-left-radius: 15px;
          background-color: #ff6565;
        }
        &:nth-of-type(2) {
          border-top-right-radius: 15px;
          border-bottom-right-radius: 15px;
          background-color: #cd2a34;
        }
      }
    }
  }
} //  单选按钮修改
label {
  // border-bottom: 1px solid #ccc;
  height: 50px;
  line-height: 50px;
  display: flex;
  justify-content: space-between;
}

.mint-checkbox-core::after {
  top: 0px;
  left: 5px;
}

.mint-checkbox-input:checked + .mint-checkbox-core {
  background-color: #cd2a34;
  border-color: #cd2a34;
}

.mint-checkbox-core {
  width: 15px;
  height: 15px;
}
//  规格弹出层样式
.content {
  width: 100%;
  height: 60vh;
  .top {
    width: 100%;
    height: 9rem;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      margin-left: 1rem;
      width: 7rem;
      height: 7rem;
      border-radius: 6px;
    }
    .topRight {
      flex: 1;
      padding: 0.2rem 1rem 0 1rem;
      p:nth-child(1) {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        margin-top: 6px;
        font-size: 1.6rem;
        color: #333333;
      }
      p:nth-child(2) {
        color: #ff8400;
        padding: 0.2rem 0;
        i {
          font-size: 1.5rem;
        }
        span {
          font-size: 1.5rem;
        }
      }
      p:nth-child(3) {
        font-size: 1.5rem;
        padding: 0.2rem 0;
        color: #333333;
      }
    }
  }
  .guige {
    font-size: 1.6rem;
    width: 100%;
    padding: 0.3rem 0 0.3rem 0.5rem;
    p {
      font-size: 1.5rem;
      width: 100%;
      color: #333;
    }
    div {
      font-size: 1.4rem;
      width: 100%;
      padding: 0.5rem 0 0 0.5rem;
      span {
        font-size: 1.4rem;
        border-radius: 0.3rem;
        padding: 0.2rem 0.4rem;
      }
      .gray {
        font-size: 1.6rem;
        background-color: #eee;
        color: #333;
      }
      .green {
        font-size: 1.4rem;
        background-color: #0bb794;
        color: #fff;
      }
    }
  }

  .buy {
    font-size: 1.6rem;
    padding-top: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0.5rem 0 0.5rem;
    color: #333;
  }
  .btns {
    width: 100%;
    position: fixed;
    bottom: 2rem;
    font-size: 1.4rem;
    text-align: center;
    button {
      width: 80%;
      height: 3.6rem;
      background-color: #0bb794;
      color: #fff;
      border-radius: 1rem;
      font-size: 1.6rem;
    }
  }
}

input.van-stepper__input {
  margin-left: 0px;
}
</style>