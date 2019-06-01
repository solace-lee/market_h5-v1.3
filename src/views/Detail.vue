<template>
  <div class="detail">
    <div ref="viewBox">
      <!-- 头部 -->
      <div class="goback-out">
        <div class="goback-img" @click="$router.go(-1)">
          <img src="../../img/index/detail/back.png">
        </div>
      </div>
      <div class="head" ref="head">
        <div class="goback">
          <!-- <div class="goback-img" @click="$router.go(-1)">
            <img src="../../img/index/detail/back.png" />
          </div>-->
        </div>
        <div class="headtitle">
          <div class="title-content">
            <span :class="{spanactive:isA}" @click="goCommodity">商品</span>
            <span :class="{spanactive:isB}" @click="goRemark">评价</span>
            <span :class="{spanactive:isC}" @click="goDetails">详情</span>
          </div>
        </div>
        <div class="share">
          <!-- 分享按钮 -->
          <!-- <div class="share-img" @click="$router.go(-1)">
            <img src="../../img/index/detail/share.png" />
          </div>-->
        </div>
      </div>

      <!-- 商品 -->
      <div class="product-container">
        <!-- 商品大图轮播专区 -->
        <div class="swiper">
          <mt-swipe :auto="4000">
            <mt-swipe-item v-for="i in swipe" :key="i.imgId">
              <img :src="i.imgUrl" preview="0">
            </mt-swipe-item>
          </mt-swipe>
        </div>

        <!-- 商品基本描述 -->
        <div class="product-info">
          <div class="product-area">
            <div class="product-price">
              <div class="now-price" v-if="commodityArea == 4">
                <span>{{productInfo.discountPrice}}</span>积分
              </div>
              <div class="now-price" v-else>
                ￥
                <span>{{productInfo.discountPrice}}</span>
                <p v-if="productInfo.discountPrice!=productInfo.originalPrice">--￥</p>
                <span v-if="productInfo.discountPrice!=productInfo.originalPrice">{{productInfo.originalPrice}}</span>
              </div>

              <!-- <s class="old-price">￥{{productInfo.originalPrice}}</s> -->
            </div>
            <div class="product-describe">
              <p>{{productInfo.name}}</p>
            </div>
            <div class="product-other-info">
              <div class="fast-mail" v-if="productInfo.isFreePostage">包邮</div>
              <div class="fast-mail-no" v-if="!productInfo.isFreePostage">不包邮</div>
              <div class="salesVolume">销量{{productInfo.salesVolume}}</div>
              <div class="shop-city">{{province}}{{city}}</div>
            </div>
          </div>
        </div>

        <!-- 分割线 -->
        <div class="line"></div>

        <div class="chose">
          <!-- 库存 -->
          <div class="servers-container">
            <div class="server-bar">
              <span>库存</span>
              <span style="color: #333;margin-right: .6rem;">{{productInfo.quantity}}</span>
            </div>
          </div>

          <!-- 规格 -->
          <div class="servers-container" @click="standardBox=true">
            <div class="server-bar">
              <span>规格</span>
              <span class="item-area">
                <div style="color: #333;margin-right: .6rem;">{{infoName}}</div>
                <div class="el-icon-arrow-right"></div>
              </span>
            </div>
          </div>

          <!-- 服务按钮 -->
          <div class="servers-container">
            <div class="server-bar">
              <span>服务</span>
              <span>{{serverlist}}</span>
            </div>
          </div>

          <!-- 分割线 -->
          <div class="line"></div>

          <!-- 下单弹出层 -->
          <van-popup v-model="standardBox" position="bottom" :overlay="true">
            <div class="product-content">
              <div class="product-info">
                <div class="info-img">
                  <img :src="productInfo.imgUrl" alt>
                </div>
                <div class="topRight">
                  <p>{{productInfo.name}}</p>
                  <p v-if="commodityArea == 4">
                    <span>{{info[selectIndex].discountPrice}}</span>
                    <i>积分</i>
                  </p>

                  <p v-else>
                    <i>￥</i>
                    <span v-if="productInfo.commodityArea == 1">{{info[selectIndex].price}}</span>
                    <span v-else>{{info[selectIndex].discountPrice}}</span>
                  </p>
                  <p>库存 {{info[selectIndex].num}} 件</p>
                </div>
              </div>
              <div class="product-text">{{infoName}}</div>
              <div class="product-limit">
                <div
                  v-for="(item, index) in info"
                  :key="index"
                  @click="selectProduct(item, index)"
                  :class="selectIndex == index ? 'limit-item-select' : 'limit-item'"
                >
                  <div class="limit-title">{{item.linkValue}}</div>
                </div>
              </div>
              <div class="buy">
                <span>数量</span>
                <div>
                  <van-stepper v-model="value" :min="1" :max="info[selectIndex].num"/>
                </div>
              </div>
              <div class="btns">
                <button
                  :class="info[selectIndex].num==0?'tocar-null':'tocar'"
                  v-if="commodityArea != 4"
                  @click="addIntoCar"
                >加入购物车</button>
                <button
                  :class="info[selectIndex].num==0?'tobuy-null':'tobuy'"
                  v-if="commodityArea != 4"
                  @click="goOrder"
                >立即购买</button>
                <button class="tobuy" v-else @click="goOrder">立即兑换</button>
              </div>
            </div>
          </van-popup>

          <!-- 用户评价 -->
          <div class="evaluation-container">
            <div class="user-evaluation">
              <span>商品评价({{count}})</span>
              <!-- <span class="el-icon-arrow-right"></span> -->
            </div>

            <div class="not-evaluation" v-if="count == 0">
              <span>暂无评价！</span>
            </div>

            <!-- 评价详情 -->
            <div class="evaluation-detail" v-if="count != 0">
              <div class="evaluation-item">
                <div class="user-info">
                  <div class="user-img">
                    <img :src="evaluation.imgUrl" alt>
                  </div>
                  <div class="user-nickname">{{evaluation.nickname}}</div>
                </div>
                <div class="user-content">{{evaluation.content}}</div>
                <div
                  class="content-img"
                  v-if="evaluation.commentImg"
                  @click="showImg(evaluation.commentImg)"
                >
                  <img :src="evaluation.commentImg" alt>
                </div>
                <!-- <div class="user-createddate">{{i.createTime}}流星雨</div> 高度不够 -->
              </div>
              <p class="all-evaluation" @click="showAllEvaluation()">
                <button>
                  全部评价
                  <img src="../../img/index/detail/next.png">
                </button>
              </p>
            </div>
          </div>

          <!-- 分割线 -->
          <div class="line"></div>

          <!-- 店铺信息 -->
          <!-- <div class="store-information">
            <div class="store-title" @click="goshop(shopDetail.shopId)">
              <div class="store-img">
                <img :src="shopDetail.shopImgUrl">
              </div>
              <div class="store-name">{{shopDetail.shopName}}</div>
            </div>
            <div class="store-info" @click="goshop(shopDetail.shopId)">
              <div class="store-all-btn">全部宝贝</div> -->
              <!-- <div class="store-product-value">进店逛逛</div> -->
            <!-- </div>
          </div> -->

          <!-- 分割线 -->
          <!-- <div class="line"></div> -->

          <!-- 商品详细 -->
          <div class="details">
            <div class="details-title">产品详情</div>
            <div v-html="productInfo.commodityDetails"></div>
          </div>

          <!-- 底部栏 -->
          <div class="details-foot-bar">
            <div class="left-box">
              <div class="go-shop" v-if="productInfo.shopType == 2" @click="goshop(shopDetail.shopId)">
                <img src="../../img/index/detail/shop.png" alt>
                <span>店铺</span>
              </div>
              <div class="go-contact" @click="goKefu">
                <img src="../../img/index/detail/contact.png" alt>
                <span>联系卖家</span>
              </div>
            </div>
            <div class="buyBtn">
              <div
                class="add-to-car"
                v-if="commodityArea != 4 &&commodityArea != 9"
                @click="footBarBtn()"
              >加入购物车</div>
              <div
                class="toBuy"
                v-if="commodityArea != 4 &&commodityArea != 9"
                @click="footBarBtn()"
              >立即购买</div>
              <div class="toBuy" v-if="commodityArea == 4" @click="footBarBtn()">立即兑换</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 所有评价 -->
    <div class="evaluation-area" v-show="evaluateArea">
      <div class="content-list" ref="evaluation">
        <div class="head-back">
          <div class="goback-img" @click="clickHidenEvaluation">
            <img src="../../img/index/detail/back-black.png">
          </div>
          <div class="content-title">全部评价({{count}})</div>
        </div>
        <!-- 评论展示 -->
        <div class="aaa" ref="container">
          <div class="content-area"></div>
          <div class="content-info" v-for="(item,index) in comment" :key="index">
            <div class="user-are">
              <div class="user-img">
                <img :src="item.imgUrl" alt>
              </div>
            </div>
            <div class="content-container">
              <div class="content-user-info">
                <div class="user-name">{{item.nickname}}</div>
                <div class="create-time">{{item.createTime}}</div>
              </div>
              <div class="content-infomation">{{item.content}}</div>
              <div class="content-img" v-if="item.commentImg" @click="showImg(item.commentImg)">
                <img :src="item.commentImg" alt>
              </div>
              <div class="reply-area" v-show="item.contentReply">
                <div class="reply-title">卖家回复</div>
                <div class="content-reply">{{item.contentReply}}</div>
                <div class="create-time-reply">{{item.createTimeReply}}</div>
              </div>
            </div>
          </div>
          <div style="height: 2rem;"></div>
          <v-baseline v-if="nomore"></v-baseline>
          <div style="height: 2rem;"></div>
        </div>
      </div>
    </div>

    <!-- 查看评论大图 -->
    <div class="watchBigImg" v-show="bigImg" @click="hiddenImg">
      <div class="img-container">
        <img :src="imgSrc">
      </div>
    </div>

    <!-- 客服弹框 -->
    <div class="bar-server" v-show="kefu">
      <div class="server-container">
        <div class="infomation-area">
          <div class="keyvalue">{{shopDetail.contactPhone}}</div>
          <div class="keyname">
            <div @click="kefu=false">取消</div>
            <a :href="'tel:' + shopDetail.contactPhone">呼叫</a>
          </div>
        </div>
      </div>
    </div>

    <v-baseline></v-baseline>
    <div style="height: 8rem;"></div>
  </div>
</template>

<script>
import { MessageBox } from "mint-ui";
import Baseline from "@/common/_baseline.vue";
import { localName } from "@/common/local.js";
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
      token: "",
      cid: "", // 商品id
      name: "", //url传过来的名称
      scrollTop: 0, //初始滚动高度
      swipe: [], // 轮播图
      info: [
        {
          discountPrice: 0
        }
      ], // 商品内容
      checked: true,
      standardBox: false, //规格弹框
      value: 0, // 购买的数量
      count: "", // 商品评论总数
      productInfo: {}, // 商品详细
      serverlist: "", // 支持的服务
      evaluation: {}, // 商品评价
      shopDetail: {}, // 店铺信息
      shopAllValue: 0, // 店铺商品总数
      selectIndex: 0, // 选择的规格类型
      items: {}, // 选中的商品规格集合
      isready: false, //是否已加载好了数据
      kefu: false, //控制客服信息的显示隐藏
      phoneNum: 0, // 商家联系方式
      evaluateArea: false, //所有评价
      rows: 10, //每页显示多少条数据
      page: 1, //当前页
      lock: true, // 加载更多锁
      comment: [], // 数据
      totalCount: 0, // 总页数
      domlisten: null, //全部评价的DOM
      nomore: false,
      province: "", //省
      city: "", //市
      districtName: "", //区
      commodityArea: 9, // 商品标签0：普通商品 1：生态商品2：一村一品3：会员商品4：积分商品
      bigImg: false, // 评价大图展示
      imgSrc: "", // 评价的图片
      infoName: "" // 规格名
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },

  beforeDestroy() {
    // 销毁监听事件
    window.removeEventListener("scroll", this.handleScroll);
  },

  created() {
    // this.evaluateArea = false
    this.$previewRefresh(); //异步生成图片预览
    this.getuserId();
    this.getShose();
  },
  watch: {
    $route: function(to, from) {
      window.scrollTop = 0;
    },
    value() {
      this.value = parseInt(this.value);
      if (this.value > this.info[this.selectIndex].num) {
        this.value = 1;
        Toast("购买数量达到库存上限");
      }
    },

    // 每次更换规格后数量重置为1
    selectIndex() {
      this.value = 1;
    },

    evaluateArea() {
      if (!this.evaluateArea) {
        // 取消所有评价页面的监听
        this.domlisten = this.$refs.evaluation;
        this.domlisten.removeEventListener("scroll", this.evaluationScroll);
      }
    },

    scrollTop() {
      // console.log(this.scrollTop);
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
      // 头部背景色渐变
      this.$refs.head.style.opacity = this.scrollTop / 200;
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
    // 底部栏的按钮点击事件
    footBarBtn() {
      this.evaluateArea = false;
      this.standardBox = true;
    },

    // 监听滚动
    handleScroll() {
      this.scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
    },

    //点击关闭全部评价
    clickHidenEvaluation() {
      this.evaluateArea = false;
    },

    //点击查看全部评价
    clickShowEvaluation() {
      // 监听evaluation
      this.domlisten = this.$refs.evaluation;
      this.domlisten.addEventListener("scroll", this.evaluationScroll);
    },

    //监听全部评价的滚动方法
    evaluationScroll() {
      // 获取滚动高度并判断是否显示返回顶部按钮
      const boxscroll = this.$refs.evaluation.scrollTop;
      // 获取页面高度
      const insexHight = this.$refs.container.offsetHeight;
      // 获取屏幕高度
      const deviceHight = document.documentElement.clientHeight;
      // if (boxscroll > deviceHight) {
      //   this.showBackTop = true
      // } else {
      //   this.showBackTop = false
      // }
      // 判断是否要启动触底事件
      const allHeight = boxscroll + deviceHight + 200;
      if (allHeight > insexHight) {
        // 触发触底事件
        // console.log("触底了" + insexHight);
        this.getMore();
      }
    },

    // 加载更多评价数据
    getMore() {
      if (this.lock) {
        this.lock = false;
        if (this.page < Math.ceil(this.totalCount / this.rows)) {
          let config = {
            params: {
              commodityId: this.cid,
              rows: this.rows,
              page: ++this.page
            }
          };
          this.$http
            .get(
              this.HOME + this.COMMODITY + "comment/queryCommentDetailList",
              config
            )
            .then(res => {
              this.lock = true;
              this.comment = [...this.comment, ...res.data.data.data];
              this.totalCount = res.data.data.totalCount;
              this.page = res.data.data.currPage;
              this.rows = res.data.data.rows;
            })
            .catch(err => {
              this.lock = true;
              // 网络错误
            });
        } else {
          this.nomore = true;
          this.lock = true;
        }
      }
    },

    // 获取用户id
    getuserId() {
      this.token = localStorage.getItem("Token");
      this.cid = this.$route.query.id;
      this.name = this.$route.query.name;
      // console.log();
    },
    // 客服
    goKefu() {
      this.evaluateArea = false;
      this.kefu = !this.kefu;
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
      this.evaluateArea = false;
      this.$router.push({ path: "/indexS?shopId=" + shopid });
    },

    // 点击选中某个规格
    selectProduct(item, index) {
      this.selectIndex = index;
      this.items = item;
    },

    // 获取详情页
    getShose() {
      this.$api
        .get(this.HOME + this.COMMODITY + "getCommodityDetailInfo/" + this.cid)
        .then(res => {
          if (res.data.status == 504) {
            this.$router.replace({
              path: "/detailNull"
            });
            return;
          }
          // console.log(res);
          this.swipe = res.data.data.tbCommodityImgList; // 轮播图数据
          this.productInfo = res.data.data.commodity;
          this.commodityArea = res.data.data.commodity.commodityArea; // 商品类型
          this.info =
            res.data.data.mapLinkSpecification.linkCommoditySpecificationList; // 商品规格数据
          this.infoName = res.data.data.mapLinkSpecification.specificationName;
          // this.evaluation = res.data.data.comment; // 评论详情
          this.shopDetail = res.data.data.shopDetail; // 店铺信息
          this.shopAllValue = res.data.data.commodityCount; // 店铺商品总数
          this.count = res.data.data.commentTotalCount; // 商品评论总数
          const serverlist = res.data.data.linkCommodityServerList; // 支持的服务
          if (this.count == 0) {
            this.evaluation = [];
          } else {
            this.evaluation = res.data.data.comment;
          }
          // console.log(this.commodityArea);

          let j = "";
          serverlist.forEach(element => {
            if (j.length < 15) {
              j = j + element.serverName + " · ";
            }
          });
          j = j.substring(j.length - 1, 0);
          this.serverlist = j;
          this.isready = true;
          // 获取省市名
          this.getLocalName();
        });
    },

    // 获取省市区名
    getLocalName() {
      localName(
        this.shopDetail.provinceId,
        this.shopDetail.cityId,
        this.shopDetail.districtId
      )
        .then(res => {
          this.province = res.provinceName;
          this.city = res.cityName;
          this.districtName = res.districtName;
        })
        .catch(err => {
          console.log(err);
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
      if (this.info[this.selectIndex].num == 0) {
        Toast("库存不足请重新选择");
        return;
      }
      if (localStorage.getItem("Token") != null) {
        this.$router.push({ path: "/login" });
      } else {
        window.sessionStorage.setItem('detailId', this.$route.query.id)
        const config = {
          params: {
            commodityId: this.productInfo.commodityId,
            csLinkId: this.info[this.selectIndex].csLinkId, //twh,原this.info[this.selectIndex].specificationId
            number: this.value
          }
        };
        this.$api
          .get(this.HOME + this.ORDER + "inside/getDirect", config)
          .then(res => {
            // console.log(res);
            this.$set(res.data.data.direct, "toVenture", false);
            this.$set(res.data.data.direct, "leaveMsg", "");
            this.$set(res.data.data.direct, "commodityQuantity", this.value);
            let data = JSON.stringify(res.data.data.direct);

            window.sessionStorage.setItem("checkOrder", data);
            this.$router.replace({
              path: "/carConfirm"
            });
          });
      }
    },

    gojfOrder() {
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
        this.$router.replace({
          path:
            "/car/payintegral?name=积分订单" + "&cs_link_id=" + this.cs_link_id
        });
      } else {
        Toast("请选择规格");
        return;
      }
    },
    addIntoCar() {
      if (this.info[this.selectIndex].num == 0) {
        Toast("库存不足请重新选择");
        return;
      }
      window.sessionStorage.setItem('detailId', this.$route.query.id)
      //  mint-ui的弹出式提示框
      const config = {
        shopId: this.productInfo.shopId,
        // userId: this.token,
        commodityId: this.productInfo.commodityId,
        specificationId: this.info[this.selectIndex].csLinkId, //twh,原this.info[this.selectIndex].specificationId
        commodityQuantity: this.value,
        shopType: this.productInfo.shopType,
        commodityType: this.productInfo.commodityArea
      };

      const product = [
        {
          title: this.productInfo.name,
          price: this.info[this.selectIndex].discountPrice,
          value: this.value,
          size: this.info[this.selectIndex].linkValue
        }
      ];

      // MessageBox.confirm(
      //   `商品名称:${product[0].title}</br>` +
      //     `价格:${product[0].price}</br>` +
      //     `数量:${product[0].value}</br>` +
      //     `规格:${product[0].size}</br>`
      //        +`商品ID:${product[0].id}</br>`
      // ).then(
      //   action => {
      //点击成功执行这里的函数
      // this.$store.dispatch("setLocalCount", true);
      // this.$store.dispatch("addCarList", product);
      // console.log(config);

      this.$api
        .post(this.HOME + this.ORDER + "inside/cart/addCart", config)
        .then(res => {
          // console.log(res);
          let msg = "";
          if (res.data.status == 403) {
            this.$router.replace({ path: "/login" });
          } else if (res.data.msg == "OK") {
            msg = "已添加至购物车";
          } else {
            msg = res.data.msg;
          }
          Toast({
            message: msg,
            duration: 2000
          });
        });
      // },
      // function(err) {}
      // );
      this.standardBox = false;
    },

    // 查看评论大图
    showImg(url) {
      this.imgSrc = url;
      this.bigImg = true;
      // console.log(this.bigImg);
    },

    // 隐藏显示评论图
    hiddenImg() {
      this.bigImg = false;
    },

    // 查看所有评价
    showAllEvaluation() {
      this.evaluateArea = true;
      let config = {
        params: {
          commodityId: this.cid,
          rows: this.rows,
          page: 1
        }
      };
      this.$api
        .get(
          this.HOME + this.COMMODITY + "comment/queryCommentDetailList",
          config
        )
        .then(res => {
          this.comment = res.data.data.items;
          this.totalCount = res.data.data.totalCount;
          this.page = res.data.data.currPage;
          this.rows = res.data.data.rows;
          this.clickShowEvaluation();
        });
    }
  }
};
</script>
<!--<style>

</style>-->
<style lang="less" scoped>
@import "../assets/fz.less";
@import "../assets/index/style.css";
.van-stepper__input {
  margin-left: 0px;
}

.line {
  height: 1rem;
  background: #f2f2f2;
  width: 100%;
}

.details {
  padding: 0 1.5rem;
}

.goback-out {
  z-index: 12;
  position: fixed;
  top: 0.8rem;
  left: 1.3rem;
  .goback-img {
    height: 3.2rem;
    width: 3.2rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
}

// 头部
.head {
  opacity: 0;
  width: 100%;
  height: 4.7rem;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  .goback {
    width: 6rem;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 1rem;
    .goback-img {
      height: 3.2rem;
      width: 3.2rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .headtitle {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    .title-content {
      height: 100%;
      width: 60%;
      display: flex;
      color: #999;
      justify-content: space-around;
      span {
        text-align: center;
        line-height: 4.7rem;
        font-size: 1.5rem;
      }
      .spanactive {
        border-bottom: 2px solid #00ae87;
      }
    }
  }
  .share {
    width: 6rem;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 1rem;
    .share-img {
      height: 3.2rem;
      width: 3.2rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}

// 商品大图轮播专区
.swiper {
  width: 100%;
  height: 100vw;
  .mint-swipe {
    width: 100%;
    height: 100%;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
}

// 商品基本描述
.product-info {
  width: 100%;
  .product-area {
    display: flex;
    width: 100%;
    flex-direction: column;
    padding: 1.5rem;
    .product-price {
      display: flex;
      align-items: center;
      width: 100%;
      color: #00ae87;
      .now-price {
        font-size: 1.6rem;
        display: flex;
        align-items: center;
        span {
          font-size: 2.3rem;
          color: #00ae87;
        }
        p {
          margin: .4rem;
          margin-right: 0;
        }
      }
      .old-price {
        font-size: 1.2rem;
        margin-left: 0.8rem;
        padding-top: 0.6rem;
        color: #999;
      }
    }
    .product-describe {
      width: 100%;
      // margin: 1rem 0;
      font-size: 1.5rem;
      color: #2d2c2c;
      font-weight: bold;
      p {
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        /*! autoprefixer: off */
        -webkit-box-orient: vertical;
        /*! autoprefixer: on */
        overflow: hidden;
      }
    }
    .product-other-info {
      display: flex;
      width: 100%;
      text-align: center;
      font-size: 1.4rem;
      color: #999;
      margin-top: 1rem;
      .fast-mail {
        flex: 1;
        text-align: left;
        color: #ffc000;
      }
      .fast-mail-no {
        flex: 1;
        text-align: left;
      }
      .salesVolume {
        flex: 1;
      }
      .shop-city {
        text-align: end;
        flex: 1;
      }
    }
  }
}

// 服务
.servers-container {
  width: 100%;
  border-bottom: 1px solid #eee;
  .server-bar {
    font-size: 1.4rem;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 4.5rem;
    span {
      padding: 0 2rem;
      font-size: 1.4rem;
      color: #8a8686;
      white-space: pre-wrap;
    }
    .item-area {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }

  //服务弹出层
  .van-popup--bottom {
    border-radius: 1.5rem 1.5rem 0 0;
  }
  .servers-box {
    width: 100%;
    .servers-box-title {
      width: 100%;
      height: 4.2rem;
      line-height: 4.2rem;
      text-align: center;
      font-size: 1.4rem;
      color: #333;
    }
  }
  .servers-item {
    color: #666;
  }
  .servers-list {
    width: 100%;
    padding: 1.5rem;
    color: #666;
  }
  .servers-btn {
    width: 94%;
    height: 4.2rem;
    line-height: 4.2rem;
    border-radius: 2.1rem;
    text-align: center;
    font-size: 1.4rem;
    color: #fff;
    background: #00ae87;
    margin: 1rem auto;
  }
}

// 产品参数
.parameter-container {
  width: 100%;
  .parameter-bar {
    width: 100%;
    font-size: 1.5rem;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 4.5rem;
    span {
      padding: 0 2rem;
      font-size: 1.5rem;
      color: #666;
    }
  }
}

// 用户评价
.evaluation-container {
  width: 100%;
  // height: 11.6rem;

  // 商品评价标题
  .user-evaluation {
    width: 100%;
    font-size: 1.4rem;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 4rem;
    span {
      padding: 0 2rem;
      font-size: 1.4rem;
      color: #333;
    }
  }

  // 没有评价
  .not-evaluation {
    width: 100%;
    height: 7.6rem;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      font-size: 1.5rem;
      color: #999;
    }
  }

  // 评价详情
  .evaluation-detail {
    width: 100%;
    background-color: #fff;
    position: relative;
    .evaluation-item {
      width: 100%;
      display: flex;
      flex-direction: column;
      padding: 1rem 1.5rem;
      .user-info {
        display: flex;
        align-items: center;
        .user-img {
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          background: #999;
          overflow: hidden;
          img {
            height: 100%;
            width: 100%;
          }
        }
        .user-nickname {
          font-size: 1.2rem;
          color: #666;
          margin-left: 1rem;
        }
      }
      .user-content {
        margin-top: 0.5rem;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        font-size: 1.2rem;
        color: #171717;
        /*! autoprefixer: off */
        -webkit-box-orient: vertical;
        /*! autoprefixer: on */
        overflow: hidden;
      }
      .content-img {
        margin-top: 1rem;
        width: 6rem;
        height: 6rem;
        img {
          height: 100%;
          width: 100%;
          background: #8a8686;
        }
      }
      .user-createddate {
        margin-top: 0.5rem;
        font-size: 1.1rem;
        color: #999;
      }
    }
    .all-evaluation {
      position: absolute;
      top: -3.2rem;
      right: 1.5rem;
      width: 8rem;
      height: 3.6rem;
      button {
        width: 9.8rem;
        height: 2.6rem;
        padding: 0 0.5rem;
        color: #00ae87;
        background-color: #fff;
        font-size: 1.2rem;
        display: flex;
        align-items: center;
        img {
          height: 1.1rem;
          width: 0.6rem;
          margin-left: 0.6rem;
        }
      }
    }
  }
}

// 店铺信息
.store-information {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  .store-title {
    display: flex;
    align-items: center;
    .store-img {
      height: 4.7rem;
      width: 4.7rem;
      background: #999;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .store-name {
      margin-left: 1.5rem;
      font-size: 1.4rem;
      color: #2e2d2e;
    }
  }
  .store-info {
    display: flex;
    align-items: center;
    .store-product-value {
      font-size: 1.2rem;
      height: 2.4rem;
      width: 6.6rem;
      background: #00ae87;
      border-radius: 1.2rem;
      line-height: 2.4rem;
      color: #fff;
      text-align: center;
      margin-left: 2rem;
    }
    .store-all-btn {
      font-size: 1.2rem;
      height: 2.4rem;
      width: 6.6rem;
      border-radius: 1.2rem;
      line-height: 2.4rem;
      border: 1px solid #00ae87;
      color: #00ae87;
      text-align: center;
      margin-left: 2rem;
    }
  }
}

// 商品详细
.details {
  width: 100%;
  .details-title {
    width: 100%;
    font-size: 1.4rem;
    color: #666;
    padding: 1.5rem;
  }
  img {
    width: 100%;
    height: 100%;
  }
}

// 底部栏
.details-foot-bar {
  width: 100%;
  height: 5rem;
  background-color: #fff;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  .left-box {
    flex: 2;
    height: 100%;
    display: flex;
    .go-contact {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-top: 0.1rem solid #eee;
      border-right: 0.1rem solid #eee;
      img {
        width: 1.8rem;
        height: 1.8rem;
      }
      span {
        font-size: 1rem;
        color: #666;
        margin-top: 0.4rem;
      }
    }
    .go-shop {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-top: 0.1rem solid #eee;
      border-right: 0.1rem solid #eee;
      img {
        width: 1.8rem;
        height: 1.8rem;
      }
      span {
        font-size: 1rem;
        color: #666;
        margin-top: 0.4rem;
      }
    }
  }
  .buyBtn {
    flex: 3;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #00ae87;
    .add-to-car {
      height: 100%;
      flex: 1;
      text-align: center;
      line-height: 5rem;
      color: #fff;
      background: #00ae87;
    }
    .toBuy {
      height: 100%;
      flex: 1;
      background: #007e62;
      color: #fff;
      text-align: center;
      line-height: 5rem;
    }
  }
}

// 下单弹出层
.product-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 78vh;
  position: relative;
  .product-info {
    width: 100%;
    height: 10.8rem;
    display: flex;
    align-items: flex-end;
    .info-img {
      width: 8.9rem;
      height: 8.9rem;
      margin-left: 1.5rem;
      margin-top: 1.5rem;
      overflow: hidden;
    }
    img {
      width: 100%;
      height: 100%;
    }
    .topRight {
      width: 25.6rem;
      display: flex;
      flex-direction: column;
      margin-left: 1.5rem;
      padding-right: 1.5rem;
      p:nth-child(1) {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        /*! autoprefixer: off */
        -webkit-box-orient: vertical;
        /*! autoprefixer: on */
        overflow: hidden;
        margin-top: 6px;
        font-size: 1.6rem;
        color: #333333;
      }
      p:nth-child(2) {
        padding: 0.2rem 0;
        i {
          font-size: 1.2rem;
          color: #00ae87;
        }
        span {
          font-size: 1.8rem;
          color: #00ae87;
        }
      }
      p:nth-child(3) {
        font-size: 1.2rem;
        padding: 0.2rem 0;
        color: #999;
      }
    }
  }
  .product-text {
    font-size: 1.3rem;
    width: 100%;
    color: #333;
    padding: 1rem 0 0 1.5rem;
    border-top: 1px solid #eee;
    margin-top: 1.5rem;
  }
  .product-limit {
    font-size: 1.6rem;
    width: 100%;
    padding: 1rem 1.5rem 1rem 1.5rem;
    max-height: 28rem;
    overflow-y: scroll;
    display: flex;
    flex-wrap: wrap;
    .limit-item {
      height: 2.8rem;
      margin: 0.5rem;
      text-align: center;
      display: flex;
      align-items: center;
      font-size: 1.2rem;
      line-height: 2.8rem;
      border: 1px solid #eee;
      background: #f7f7f7;
      border-radius: 1.4rem;
      color: #333;
      .limit-title {
        margin: 0 1rem;
      }
    }
    .limit-item-select {
      height: 2.8rem;
      margin: 0.5rem;
      text-align: center;
      display: flex;
      align-items: center;
      font-size: 1.2rem;
      line-height: 2.8rem;
      border: 1px solid #00ae87;
      background: #e2fff8;
      border-radius: 1.4rem;
      color: #00ae87;
      .limit-title {
        margin: 0 1rem;
      }
    }
  }

  .buy {
    font-size: 1.6rem;
    padding: 1rem 1.5rem 2rem 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #333;
    span {
      font-size: 1.3rem;
      color: #333;
    }
  }
  .btns {
    width: 100%;
    font-size: 1.4rem;
    color: #fff;
    text-align: center;
    height: 5rem;
    display: flex;
    position: absolute;
    bottom: 0;
    left: 0;
    .tocar {
      flex: 1;
      height: 100%;
      background-color: #00ae87;
    }
    .tocar-null {
      flex: 1;
      height: 100%;
      background-color: #ccc;
      color: #eee;
    }
    .tobuy {
      flex: 1;
      height: 100%;
      background-color: #007e62;
    }
    .tobuy-null {
      flex: 1;
      height: 100%;
      background-color: #bbb;
      color: #ddd;
    }
  }
}

// 所有评价弹框
.evaluation-area {
  z-index: 13;
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  bottom: 5rem;
  background: #fff;
  .content-list {
    width: 100%;
    height: 100%;
    overflow: hidden;
    overflow-y: scroll;
    .head-back {
      height: 4.7rem;
      width: 100%;
      position: fixed;
      background: #fff;
      top: 0;
      left: 0;
      display: flex;
      border-bottom: 1px solid #eee;
      justify-content: center;
      align-items: center;
      .goback-img {
        position: fixed;
        top: 1.2rem;
        left: 2rem;
        width: 1rem;
        height: 1.7rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .content-title {
        font-size: 1.7rem;
        color: #333;
      }
    }
    .content-area {
      height: 4.7rem;
    }
    .content-info {
      width: 100%;
      padding: 0.6rem 1.5rem;
      display: flex;
      flex-direction: row;
      // border-bottom: 1px solid #eee;
      .user-are {
        .user-img {
          width: 3.3rem;
          height: 3.3rem;
          border-radius: 50%;
          overflow: hidden;
          background: #999;
          margin-top: 1rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .content-container {
        overflow: hidden;
        margin-left: 1rem;
        width: 100%;
        .content-user-info {
          display: flex;
          align-items: center;
          margin: 1rem 0;
          .user-name {
            font-size: 1.5rem;
            color: #333;
            margin-top: 0.6rem;
          }
          .create-time {
            margin-left: 2rem;
            margin-top: 1rem;
            font-size: 1.2rem;
            color: #999;
          }
        }

        .content-infomation {
          font-size: 1.3rem;
          color: #333;
        }
        .content-img {
          margin-top: 1rem;
          width: 6rem;
          height: 6rem;
          img {
            height: 100%;
            width: 100%;
            background: #8a8686;
          }
        }
        .reply-area {
          background: #f2f2f2;
          padding: 1rem;
          margin-top: 0.6rem;
          .reply-title {
            font-size: 1.1rem;
            color: #666;
            font-weight: bold;
          }
          .content-reply {
            font-size: 1.1rem;
            color: #666;
            margin-top: 0.6rem;
          }
          .create-time-reply {
            font-size: 0.8rem;
            color: #666;
            margin-top: 0.6rem;
          }
        }
      }
    }
  }
}

// 客服按钮
.bar-server {
  z-index: 14;
  position: fixed;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  .server-container {
    background: #fff;
    height: 10.5rem;
    width: 27rem;
    border-radius: 6px;
    overflow: hidden;
    // border: 1px solid rgba(0, 0, 0, 0.5);
    .infomation-area {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
      align-items: center;
      font-size: 1rem;
      color: #333;
      .keyvalue {
        height: 5.8rem;
        margin-top: 2rem;
        font-size: 1.7rem;
        color: #2d2c2c;
        font-weight: bold;
      }
      .keyname {
        height: 4.7rem;
        width: 100%;
        display: flex;
        align-items: center;
        div {
          flex: 1;
          line-height: 4.6rem;
          text-align: center;
          color: #00ae87;
          font-size: 1.6rem;
          border-top: 1px solid #eee;
          border-right: 1px solid #eee;
        }
        a {
          flex: 1;
          line-height: 4.6rem;
          text-align: center;
          color: #00ae87;
          font-size: 1.6rem;
          border-top: 1px solid #eee;
        }
      }
    }
  }
}

//查看评论大图
.watchBigImg {
  z-index: 15;
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  .img-container {
    width: 100%;
    height: 80%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: auto;
      height: auto;
      max-width: 100%;
      max-height: 100%;
    }
  }
  img {
    width: 100%;
    height: 80%;
  }
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

.price_symbol {
  font-size: 0.3rem;
}
.discountPrice {
  font-size: 0.8rem;
  color: #666;
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

span {
  color: #333;
  font-size: 1rem;
  /*display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;*/
}

// 分享
.share1 {
  margin: 0 0.5rem;
  width: 1rem;
  color: #999;
  font-size: 22px;
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
}

//颜色分类弹出层
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

input.van-stepper__input {
  margin-left: 0px;
}
</style>