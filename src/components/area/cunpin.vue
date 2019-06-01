<template>
  <div class="wrap" ref="indexPart">
    <!-- 头部搜索 -->
    <div class="head">
      <div class="site">
        <div class="local">
          <div class="locaImg" @click="$router.go(-1)">
            <van-icon name="arrow-left"/>
          </div>
          <span
            @click="gomap"
            style="border: 0"
            class="city"
            v-if="city"
          >{{city.substring(0, city.length-1)}}</span>
          <span @click="gomap" v-if="district">{{district.substring(0, district.length-1)}}</span>
        </div>
        <div class="title">{{title}}</div>
        <div class="msgBtn">
          <!-- <div class="shopCar" @click="gocar">
            <img class="shopcar" src="../../../img/index/cunpin/car-black.png">
            <div class="shopCarValue" v-show="hasCar">{{carValue}}</div>
          </div> -->
          <!-- <v-msg></v-msg> -->
          <!-- <img @click="msg" class="msgImg" src="../../../img/index/cunpin/msg.png">
          <div class="onmsg" v-show="hasmsg">{{msgValue}}</div> -->
        </div>
      </div>
      <div class="search">
        <img class="searchImg" src="../../../img/index/search/search-2.png">
        <input type="text" placeholder="天然野山鸡" @click="goseek">
      </div>
    </div>

    <!-- 轮播部分 -->
    <div class="swiper">
      <mt-swipe :auto="3000">
        <mt-swipe-item v-for="(i, index) in swiper" :key="index">
          <img :src="i.titleImg" :alt="i.title" @click="as(i.url)">
        </mt-swipe-item>
      </mt-swipe>
    </div>

    <!-- 间隔线 -->
    <div class="isline"></div>

    <div class="product">
      <!-- 热销乡味 -->
      <div class="ad-f5">
        <div class="ad-title">
          <div class="ad-title-txt">热销乡味</div>
          <div class="ad-title-entxt">尝遍故乡的鲜</div>
        </div>

        <!-- 产品展示区 -->
        <div class="product-container">
          <div
            class="product-item"
            v-for="(i, index) in onetambononeproduct"
            :key="index"
            @click="godetail(i.id)"
          >
            <div class="itemImg">
              <img :src="i.imgUrl">
            </div>
            <div class="itemTitle">{{i.name}}</div>
            <div class="itemPrice">
              <div class="price">
                <div class="nowPrice">
                  ￥
                  <span>{{i.discountPrice}}</span>
                </div>
                <s class="originalPrice">
                  ￥
                  <span>{{i.originalPrice}}</span>
                </s>
                <div class="sales">
                  {{i.salesVolume}}
                  <span>件已售</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 间隔线 -->
    <div class="isline" style="background: #fff;"></div>
    <!-- 到底了 -->
    <v-baseline></v-baseline>

    <!-- 返回顶部按钮 -->
    <div class="back-to-top" @click="backTop" v-show="showBackTop">
      <img src="../../../img/index/home/bankToTop.png">
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import Msg from "@/components/msg/msgTip.vue";
import Header from "@/common/_header.vue";
import Baseline from "@/common/_baseline.vue";
export default {
  components: {
    "v-header": Header,
    "v-baseline": Baseline,
    "v-msg": Msg
  },

  data() {
    return {
      city: "",
      district: "",
      districtId: "",
      title: "一村一品",
      swiper: [],
      hasmsg: false, // 是否有消息
      msgValue: "99", //消息数量
      hasCar: false, // 是否有购物车数量
      carValue: "9", // 购物车数量
      ad1: "",
      onetambononeproduct: [], //热销乡味数据
      size: 8, // 热销乡味单页条数
      page: 1, //热销乡味当前页码
      lock: false, // 加载更多锁
      totalPages: 1, // 总页数
      showBackTop: false //返回顶部按钮
    };
  },

  watch: {
    $route: function(to, from) {
      window.scrollTop = 0;
    }
  },

  beforeDestroy() {
    // 销毁监听事件
    // console.log('销毁了');
    window.removeEventListener("scroll", this.handleScroll);
  },

  mounted() {
    this.getdistrict(); // 获取地点信息
    // this.getData(); // 获取所有数据
    // 监听滚动事件(李祖明)
    window.addEventListener("scroll", this.handleScroll);
    const token = window.localStorage.getItem("token") || false;
    if (token) {
      this.getMsgNum();
    }
  },

  methods: {
    // 获取消息数量
    getMsgNum() {
      this.$api
        .get(this.HOME + this.USER + "inside/message/getMsgRow")
        .then(res => {
          this.msgValue = res.data.data.row;
          if (this.msgValue != 0) {
            this.hasmsg = true;
            if (this.msgValue > 99) {
              this.msgValue = "99+";
            }
          } else {
            this.hasmsg = false;
          }
        });
    },

    // 获取所有数据
    getData() {
      //获取商品数据
      this.districtId = sessionStorage.getItem("districtId") || null;
      const obj = {
        params: {
          districtId: this.districtId,
          commodityArea: 2
        }
      };
      this.$api
        .get(this.HOME + this.SEARCH + "commodity/onetambononeproduct", obj)
        .then(res => {
          this.onetambononeproduct = res.data.data.commodityList;
        })
        .catch(err => {});

      // 获取广告
      const config = {
        params: {
          districtId: this.districtId,
          code: sessionStorage.getItem('codeB')
        }
      };
      this.$api
        .get(this.HOME + this.SEARCH + "ads/findAdsList", config)
        .then(res => {
          this.swiper = res.data.data.f1;
          // console.log(this.swiper);
        })
        .catch(err => {});
    },

    // 跳转到商品详情
    godetail(id) {
      this.$router.push({
        path: "/detail?id=" + id
      });
    },

    // 跳转到地区选择页
    gomap() {
      this.$router.push({
        path: "/map?name=选择地区"
      });
    },

    // 跳转到购物车
    gocar() {
      this.$router.push({
        path: "/car"
      });
    },

    // 监听滚动事件
    handleScroll() {
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      // 获取滚动高度并判断是否显示返回顶部按钮
      if (scrollTop > 800) {
        this.showBackTop = true;
      } else {
        this.showBackTop = false;
      }
      // 获取页面高度
      const insexHight = this.$refs.indexPart.offsetHeight;
      // 获取屏幕高度
      const deviceHight = document.documentElement.clientHeight;
      // 判断是否要启动触底事件
      const allHeight = scrollTop + deviceHight + 200;
      if (allHeight > insexHight) {
        // 触发触底事件
        // console.log("触底了" + insexHight);
        this.getMore();
      }
    },

    // 加载更多
    getMore() {
      if (this.lock) {
        return;
      } else {
        this.lock = true;
        this.page = ++this.page;
        const config = {
          params: {
            districtId: this.districtId,
            commodityArea: 2,
            size: this.size,
            page: this.page
          }
        };
        this.$api
          .get(
            this.HOME + this.SEARCH + "commodity/onetambononeproduct",
            config
          )
          .then(res => {
            const arr = res.data.data.commodityList;
            this.totalPages = res.data.data.totalPages;
            this.page = res.data.data.pageNumber;
            if (this.totalPages <= this.page) {
              // Toast("已经到底啦！");
              // this.page = --this.page;
              this.onetambononeproduct = [...this.onetambononeproduct, ...arr];
              this.lock = true;
            } else {
              this.onetambononeproduct = [...this.onetambononeproduct, ...arr];
              this.lock = false;
            }
          })
          .catch(err => {
            console.log(err);
            this.lock = false;
          });
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
          // console.log('111');
        }, 10);
      } else {
        // document.documentElement.scrollTop = 0;
        window.scrollTo(0, 0)
      }
    },

    // 获取地点信息
    getdistrict() {
      this.district = sessionStorage.getItem("district");
      this.city = sessionStorage.getItem("city");
      this.province = sessionStorage.getItem("province");
      this.getData();
    },

    // 跳到搜索页面
    goseek() {
      this.$router.push({
        path: "/cunpinsearch"
      });
    },

    as(url) {
      if (url != '#') {
        this.$router.push({
          path: url
        });
      }
    },

    // 跳到消息页面
    msg() {
      this.$router.push({
        path: "/msg"
      });
    }
  }
};
</script>

<style lang="less" scoped>
.wrap {
  width: 100%;
  height: 100%;
  margin-bottom: 1.2rem;
  .isline {
    width: 100%;
    height: 1.2rem;
    background: #f2f2f2;
  }

  // 头部搜索部分
  .head {
    width: 100%;
    height: 9.4rem;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    .site {
      width: 100%;
      height: 4.7rem;
      display: flex;
      text-align: center;
      align-items: center;
      .local {
        flex: 1;
        max-width: 12.5rem;
        overflow: hidden;
        display: flex;
        align-items: center;
        color: #333;
        font-size: 1.6rem;
        margin-bottom: 0.4rem;
        .locaImg {
          width: 0.9rem;
          height: 1.6rem;
          margin: 0.4rem 0.6rem 0 1rem;
        }
        .city {
          min-width: 2.4rem;
          margin: 0.5rem 0.5rem 0 0.5rem;
        }
        span {
          line-height: 1.8rem;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          /*! autoprefixer: off */
          -webkit-box-orient: vertical;
          /*! autoprefixer: on */
          padding-left: 0.5rem;
          border-left: 0.1rem solid #fff;
          font-size: 1.2rem;
          margin-top: 0.5rem;
        }
      }
    }
  }

  // 头部标题
  .title {
    flex: 1;
    color: #00ae87;
    font-size: 1.8rem;
  }

  //购物车按钮
  .shopCar {
    margin-right: 1.2rem;
    position: relative;
    .shopCarImg {
      height: 2rem;
      width: 2rem;
      padding-top: 0.2rem;
      margin-bottom: 0.4rem;
    }
    .shopCarValue {
      position: absolute;
      right: -1.5rem;
      top: -0.4rem;
      background: red;
      height: 1.4rem;
      padding: 0 0.4rem;
      border-radius: 0.7rem;
      margin-right: 0.9rem;
      font-size: 1rem;
      color: #fff;
    }
  }

  // 消息按钮
  .msgBtn {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    position: relative;
    .shopcar {
      height: 2rem;
      width: 2rem;
      margin: 0 0.6rem;
      padding-top: 0.2rem;
      margin-bottom: 0.4rem;
    }
    .msgImg {
      height: 2rem;
      width: 2.1rem;
      padding-top: 0.5rem;
      margin: 0 1.4rem 0.4rem 0.6rem;
    }
    .onmsg {
      position: absolute;
      right: 0;
      top: -0.4rem;
      background: red;
      height: 1.4rem;
      // width: 1.4rem;
      padding: 0 0.4rem;
      border-radius: 0.7rem;
      margin-right: 0.9rem;
      font-size: 1rem;
      color: #fff;
    }
  }

  /*搜索框*/
  .search {
    height: 3rem;
    width: 90%;
    position: relative;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    vertical-align: middle;
    background-color: #dcdcdc;
    border-radius: 1.5rem;
    .searchImg {
      position: relative;
      height: 1.3rem;
      width: 1.3rem;
      left: 2rem;
      align-items: center;
    }
    input {
      align-items: center;
      width: 90%;
      padding: 0.4rem 0;
      border: none;
      border-radius: 1.5rem;
      font-size: 1.333rem;
      background-color: #dcdcdc;
      margin-left: 1rem;
    }
    input::-webkit-input-placeholder {
      padding-left: 2rem;
      color: #666;
      font-size: 1.2rem;
    }
  }

  // 轮播部分
  .swiper {
    background-size: 100% 100%;
    margin-top: 9.4rem;
    width: 100%;
    .mint-swipe {
      width: 100%;
      height: 31.2vw;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }

  // 标题的样式
  .ad-title {
    height: 4.6rem;
    display: flex;
    padding-left: 0.8rem;
    align-items: center;
    background: #f2f2f2;
    .ad-title-txt {
      font-size: 1.5rem;
      color: #333;
      padding-left: 0.7rem;
    }
    .ad-title-entxt {
      height: 1.2rem;
      font-size: 1rem;
      color: #999;
      padding-left: 0.7rem;
      margin-left: 0.7rem;
      border-left: 1px solid #999;
    }
  }

  // 产品展示区样式集中
  .product-container {
    display: flex;
    // justify-content: space-around;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    // padding: 0 .7rem;
    background: #f2f2f2;
    .product-item {
      width: 45.5%;
      height: 22.3rem;
      background: #fff;
      display: flex;
      flex-direction: column;
      border-radius: 6px;
      margin: 0.6rem 0 0.6rem 3%;
      .itemImg {
        width: 100%;
        height: 14rem;
        overflow: hidden;
        // background: #666;
        border-radius: 6px 6px 0 0;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .itemTitle {
        width: 100%;
        font-size: 1.4rem;
        color: #333;
        padding: 0 0.5rem;
        margin: 0.5rem 0;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        /*! autoprefixer: off */
        -webkit-box-orient: vertical;
        /*! autoprefixer: on */
      }
      .itemPrice {
        padding: 0 0.5rem;
        display: flex;
        .price {
          display: flex;
          flex-direction: column;
          .nowPrice {
            font-size: 1.6rem;
            color: #00ae87;
            span {
              font-size: 1.6rem;
              font-weight: bold;
            }
          }
          .originalPrice {
            font-size: 0.9rem;
            color: #999;
            line-height: 1rem;
            margin-top: 0.2rem;
            margin-left: 0.2rem;
          }
          .sales {
            font-size: 1rem;
            line-height: 1.1rem;
            margin-top: 0.2rem;
            margin-left: 0.2rem;
          }
        }
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
  // background: red;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
