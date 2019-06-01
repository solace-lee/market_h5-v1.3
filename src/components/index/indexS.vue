<template>
  <div class="shop-index" ref="indexPart">
    <div class="wrap-container">
      <!-- 头部 -->
      <div class="head-search">
        <div class="site" @click="$router.go(-1)">
          <div class="back-img">
            <img class="comeback" src="../../../img/index/search/back.png">
          </div>
        </div>
        <div class="search">
          <img class="searchImg" src="../../../img/index/shopIndex/search.png">
          <input type="text" v-model="inputValue" autofocus="true" placeholder="天然农家蜂蜜">
        </div>
        <div class="msgBtn" @click="msg">
          <!-- <img class="msgImg" src="../../../img/index/ecomarket/msg.png">
          <div class="onmsg" v-show="hasmsg">{{msgValue}}</div>-->
          <v-msg></v-msg>
        </div>
      </div>

      <!-- 店铺信息 -->
      <div class="shop-info">
        <div class="shop-title">
          <div class="shop-logo">
            <img v-if="shopInfomation.shopImgUrl" :src="shopInfomation.shopImgUrl" alt>
            <img v-else src="../../../img/index/shopIndex/default.png" alt>
          </div>
          <div class="shop-infomation">
            <div class="shop-name">{{shopInfomation.shopName}}</div>
            <div
              class="shop-address"
            >店铺地址：{{province}} {{city}}{{district}}{{shopInfomation.addressDetail}}</div>
          </div>
        </div>
      </div>
      <!-- 切换栏 -->
      <van-tabs v-model="active" sticky>
        <van-tab v-for="(item,index) in title" :title="item" :key="index"></van-tab>
      </van-tabs>
    </div>

    <!-- 没有数据时的提示 -->
    <div class="not-result" v-if="resultNull">
      <div class="noresult-img">
        <img src="../../../img/index/search/logo.png">
      </div>
      <div class="noresult-txt">亲~没有商品呢</div>
    </div>

    <!-- 综合 -->
    <div class="shop-product-list">
      <div
        class="shop-product-list-item"
        v-for="(item, index) in overallList"
        :key="index"
        @click="godetail(item.id)"
      >
        <div class="product-img">
          <img :src="item.imgUrl">
        </div>
        <div class="product-content">{{item.name}}</div>
        <div class="product-price">
          <div class="now-price">
            ￥
            <span>{{item.discountPrice}}</span>
          </div>
          <span class="old-price">{{item.salesVolume}}人付款</span>
        </div>
      </div>
    </div>

    <!-- 返回顶部按钮 -->
    <div class="back-to-top" @click="backTop" v-show="showBackTop">
      <img src="../../../img/index/home/bankToTop.png">
    </div>

    <div style="height: 2rem;"></div>
    <v-baseline v-if="nomore"></v-baseline>
    <div style="height: 2rem;"></div>
  </div>
</template>

<script>
import Baseline from "@/common/_baseline.vue";
import { Toast } from "vant";
import { localName } from "@/common/local.js";
import Msg from "@/components/msg/msgTip.vue";

export default {
  components: {
    "v-baseline": Baseline,
    "v-msg": Msg
  },
  data: function() {
    return {
      isA: false,
      isB: false,
      nomore: false,
      hasmsg: false, // 是否有消息
      msgValue: "99+", //消息数量
      inputValue: "", // 绑定搜素的输入
      active: 0,
      // 店铺详情
      shopInfomation: {},
      // 店铺标签页
      title: ["综合", "销量", "包邮"],
      // 全部商品列表
      overallList: [],
      page: 1, // 默认起始页数
      shopId: 0,
      token: "",
      sort: 1, //获取数据的默认排序方式
      resultNull: false, // 是否没有数据
      pageSize: 10, // 每页显示的数据量
      totalPages: 0, // 总页数
      showBackTop: false, //显示返回顶部按钮
      lock: true, // 加载更多锁
      province: "", // 省份
      city: "", //城市
      district: "" //区域
    };
  },
  created() {
    this.getShopId();
    this.getshopMsg();
    this.loadProduct();
  },

  beforeDestroy() {
    // 销毁监听事件
    // console.log('解除监听1');
    window.removeEventListener("scroll", this.handleScroll);
  },

  mounted() {
    // 监听滚动事件
    window.addEventListener("scroll", this.handleScroll);
  },

  watch: {
    active() {
      this.page = 1;
      if (this.active == 0) {
        this.sort = 3;
        this.page = 1;
        this.overallList = [];
        this.loadProduct();
      }
      if (this.active == 1) {
        this.sort = 1;
        this.page = 1;
        this.overallList = [];
        this.loadProduct();
      }
      if (this.active == 2) {
        this.sort = 2;
        this.page = 1;
        this.overallList = [];
        this.loadProduct();
      }
    }
  },
  methods: {
    getShopId() {
      this.shopId = this.$route.query.shopId;
    },

    // 监听滚动事件
    handleScroll() {
      // 获取滚动高度并判断是否显示返回顶部按钮
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      // 获取屏幕高度
      const deviceHight = document.documentElement.clientHeight;
      // 获取页面高度
      const insexHight = this.$refs.indexPart.offsetHeight;
      if (scrollTop > deviceHight) {
        this.showBackTop = true;
      } else {
        this.showBackTop = false;
      }
      // 判断是否要启动触底事件
      const allHeight = scrollTop + deviceHight + 100;
      if (allHeight > insexHight) {
        // 触发触底事件
        // console.log("触底了");
        this.getMore();
      }
    },

    // 返回顶部
    backTop() {
      const scrollHight = document.documentElement.scrollTop;
      if (scrollHight > 50) {
        // document.documentElement.scrollTop = scrollHight - 40;
        window.scrollTo(0, scrollHight - 40)
        setTimeout(() => {
          this.backTop();
        }, 10);
      } else {
        // document.documentElement.scrollTop = 0;
        window.scrollTo(0, 0)
      }
    },

    // 加载更多数据
    getMore() {
      if (this.lock) {
        this.lock = false;
        if (this.page <= this.totalPages) {
          let config = {
            params: {
              shopId: this.shopId,
              sort: this.sort,
              pageSize: this.pageSize,
              page: ++this.page
            }
          };
          let url = "";
          if (this.active == 2) {
            url = "commodity/findByShopIdAndPackageType";
          } else {
            url = "commodity/findByShopId";
          }
          this.$api
            .get(this.HOME + this.SEARCH + url, config)
            .then(res => {
              this.lock = true;
              this.resultNull = false;
              this.overallList = [
                ...this.overallList,
                ...res.data.data.commodityList
              ];
              this.totalPages = res.data.data.totalPages;
              // this.page = ++this.page;
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

    // 店铺信息(已挂载)
    getshopMsg() {
      this.token = localStorage.getItem("Token");
      this.$api
        .get(
          this.HOME +
            this.COMMODITY +
            "/shop/getShopByShopId?shopId=" +
            this.shopId
        )
        .then(res => {
          this.shopInfomation = res.data.data;
          this.getLocal();
        });
    },

    // 获取地点中文名
    getLocal() {
      localName(
        this.shopInfomation.provinceId,
        this.shopInfomation.cityId,
        this.shopInfomation.districtId
      ).then(res => {
        this.province = res.provinceName;
        this.city = res.cityName;
        this.district = res.districtName;
      });
    },

    shopMsg(id) {
      console.log(id);
      this.$router.push({
        path: "/shopMsg?shopId=" + id + "&name=店铺详情"
      });
    },

    // 去商品详情页
    godetail(id) {
      this.$router.push({
        path: "/detail?id=" + id
      });
    },

    //全部综合，最热商品列表信息
    loadProduct() {
      let url = "";
      if (this.active == 2) {
        url = "commodity/findByShopIdAndPackageType";
      } else {
        url = "commodity/findByShopId";
      }
      this.$api
        .get(this.HOME + this.SEARCH + url, {
          params: {
            shopId: this.shopId,
            sort: this.sort,
            pageSize: this.pageSize,
            page: this.page
          }
        })
        .then(res => {
          let msg = res.data.data || false;
          if (!msg) {
            // 让没有结果的提示显示
            this.resultNull = true;
          } else {
            this.resultNull = false;
            this.overallList = res.data.data.commodityList;
            this.totalPages = res.data.data.totalPages;
          }
        });
    },

    goKefu() {
      var username = JSON.parse(localStorage.getItem("UserObj")).Account;
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

    // 跳转到消息
    msg() {
      this.$router.push({
        path: "/msg"
      });
    }
  }
};
</script>

<style scoped lang="less">
.shop-index {
  background: #f2f2f2;
}

// 头部滚动部分
.wrap-container {
  z-index: 15;
  background: #00ae87;
  position: fixed;
  top: 0;
  left: 0;
  height: 14.7rem;
  width: 100%;
  /deep/.van-tabs__wrap {
    height: 4.4rem;
  }
}

.head-search {
  width: 100%;
  height: 4.7rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 10;
  .site {
    width: 5rem;
    height: 4.7rem;
    display: flex;
    justify-content: center;
    align-items: center;
    div {
      flex: 1;
      color: #fff;
      width: 4.2rem;
      .comeback {
        width: 0.8rem;
        height: 1.4rem;
        margin-left: 1.6rem;
        // margin-bottom: .2rem;
      }
    }
  }
  /*搜索框*/
  .search {
    height: 3rem;
    width: 100%;
    position: relative;
    display: flex;
    display: none;
    align-items: center;
    vertical-align: middle;
    background-color: #fff;
    border-radius: 1.5rem;
    margin: 0 1rem;
    .searchImg {
      position: absolute;
      height: 1.1rem;
      width: 1.1rem;
      left: 1rem;
      margin-top: 0.2rem;
      align-items: center;
    }
    input {
      align-items: center;
      width: 90%;
      padding: 0.7rem 1.6rem 0.7rem 1.6rem;
      border: none;
      font-size: 1.4rem;
      color: #666;
      background-color: rgba(0, 0, 0, 0);
      margin-left: 1rem;
    }
    input::-webkit-input-placeholder {
      color: #999;
      font-size: 1.2rem;
    }
  }
  .msgBtn {
    width: 5rem;
    padding: 0 1rem;
    position: relative;
    .msgImg {
      height: 1.5rem;
      width: 2rem;
    }
    .onmsg {
      position: absolute;
      top: -0.6rem;
      right: 0.2rem;
      background: red;
      height: 1.4rem;
      padding: 0 0.4rem;
      border-radius: 0.7rem;
      font-size: 1rem;
      color: #fff;
    }
  }
}

// 店铺信息
.shop-info {
  width: 100%;
  height: 5.6rem;
  color: #fff;
  .shop-title {
    z-index: 3;
    display: flex;
    width: 100%;
    height: 100%;
    .shop-logo {
      height: 3.5rem;
      width: 3.5rem;
      overflow: hidden;
      margin: 1rem 0 1rem 2rem;
      img {
        height: 100%;
        width: 100%;
      }
    }
    .shop-infomation {
      display: flex;
      flex-direction: column;
      margin: 1rem 0 1.5rem 1rem;
      .shop-name {
        font-size: 1.5rem;
        margin-bottom: 0.2rem;
      }
      .shop-address {
        font-size: 1.1rem;
      }
    }
  }
}

// 没有搜索结果展示区
.not-result {
  // z-index: -1;
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  font-size: 1.4rem;
  background: #fff;
  color: #666;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .noresult-img {
    width: 15.4rem;
    height: 6.1rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .noresult-txt {
    font-size: 1.4rem;
    color: #999;
  }
}

// 商品详情
// 综合
.shop-product-list {
  margin-top: 14.7rem;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 0.4rem;
  // border-bottom: 1rem solid #fff;
  .shop-product-list-item {
    width: 17.8rem;
    height: 26rem;
    background: #fff;
    margin-left: 0.4rem;
    margin-bottom: 0.4rem;
    display: flex;
    flex-direction: column;
    .product-img {
      height: 17.4rem;
      width: 17.8rem;
      background: #fff;
      img {
        height: 100%;
        width: 100%;
      }
    }
    .product-content {
      padding: 0.5rem 0.8rem 0 0.8rem;
      font-size: 1.5rem;
      color: #333;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      /*! autoprefixer: off */
      -webkit-box-orient: vertical;
      /*! autoprefixer: on */
    }
    .product-price {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 1rem;
      margin-left: 0.8rem;
      .now-price {
        color: #00ae87;
        font-weight: bold;
        span {
          font-size: 1.5rem;
        }
      }
      .old-price {
        font-size: 1.3rem;
        margin-right: 1rem;
      }
    }
  }
}

// 返回顶部样式
.back-to-top {
  position: fixed;
  right: 4rem;
  bottom: 6rem;
  height: 4.5rem;
  width: 4.5rem;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
}

.head {
  width: 100%;
  height: 4rem;
  background-color: #ffffff;
  display: flex;
  position: fixed;
  z-index: 100000;
  border-bottom: 1px solid #f2f2f2;
  .site {
    width: 4rem;
    height: 100%;
    display: flex;
    position: absolute;
    color: #000;
    div {
      display: flex;
      justify-content: center;
      align-items: center;
      .van-icon-location {
        vertical-align: middle;
      }
      span {
        font-size: 1rem;
      }
    }
  }
  .title {
    // flex: 1;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: #000000;
    span {
      color: #f2f2f2;
      margin-right: 0.5rem;
    }
    .van-icon-search {
      position: absolute;
      left: 21vw;
    }
    input {
      border: 1px solid #f2f2f2 !important;
      color: #f2f2f2;
      width: 60%;
      padding: 0.7rem 0 0.7rem 1.8rem;
      border: none;
      font-size: 1.5rem;
      border-radius: 0.8rem;
    }
  }
}

.swipe {
  height: 220px;
  width: 100%;
  img {
    width: 100%;
    height: 100%;
  }
}

.btns {
  width: 100%;
  height: 8vh;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #1bc6a3;
  button {
    width: 50%;
    background-color: #fff;
    p {
      width: 100%;
      img {
        width: 6vw;
      }
    }
  }
  .active {
    color: #1bc6a3;
  }
}

.van-list {
  padding: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .goodsBox {
    margin-top: 0.3rem;
    padding: 0.2rem 0;
    background-color: #fff;
    width: 49%;
    .goodsImg {
      width: 100%;
      height: 12rem;
      /* text-align: center; */
      img {
        height: 100%;
        width: 95%;
      }
    }
    p {
      /* padding: 0.3rem 0; */
      font-size: 0.9rem;
      color: #333;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      /*! autoprefixer: off */
      -webkit-box-orient: vertical;
      /*! autoprefixer: on */
      -webkit-line-clamp: 2;
    }
    .num {
      color: #ffcc00;
    }
    .tobuy {
      border-radius: 6px;
      border: 1.5px solid #cd2a34;
      color: #cd2a34;
      font-size: 0.8rem;
      padding: 0.1rem 0.5rem;
    }
  }
  .van-list__loading {
    width: 100vw !important;
  }
}

.shopcode {
  width: 100%;
  padding-top: 2rem;
  text-align: center;
  img {
    width: 60%;
  }
}
</style>