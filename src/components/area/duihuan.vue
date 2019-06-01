<template>
  <div class="wrap" ref="indexPart">
    <!-- 头部 -->
    <div class="head">
      <div class="site">
        <div class="locaImg" @click="$router.go(-1)">
          <van-icon name="arrow-left"/>
        </div>
        <div class="title">{{title}}</div>
        <div class="other"></div>
      </div>
    </div>

    <!-- 顶部大图 -->
    <div class="top-show">
      <div class="top-img" @click="goUrl(f1.url)">
        <img :src="f1.titleImg">
      </div>
    </div>

    <!-- 积分信息部分 -->
    <div class="score">
      <div class="score-number">
        <div class="score-img">
          <img src="../../../img/index/score/a.png">
        </div>
        <div class="score-txt">
          <span>{{balance}}</span>积分
        </div>
      </div>
      <div class="score-btn">
        <div class="score-img">
          <img src="../../../img/index/score/b.png">
        </div>
        <div class="score-txt" @click="gofundinfo">积分记录</div>
      </div>
    </div>

    <!-- 间隔线 -->
    <div class="isline"></div>

    <!-- 新品热卖 -->
    <div class="hot-sales">
      <div class="hot-sales-container">
        <div class="hot-sales-title">
          <img class="hot-sales-img" :src="f2.titleImg">
          <div class="hot-sales-text">新品热卖</div>
        </div>
        <div class="hot-sales-item">
          <mt-swipe :auto="5000">
            <mt-swipe-item v-for="(i, index) in hotProduct" :key="index">
              <div class="item-container">
                <div class="hot-item" @click="godetail(i.id)">
                  <div class="hot-item-img">
                    <img :src="i.imgUrl" :alt="i.title">
                    <!-- <div class="nowPrice">价值￥{{i.originalPrice}}</div> -->
                  </div>
                  <div class="hot-title">{{i.name}}</div>
                  <div class="hot-btn">{{i.discountPrice}}积分速抢</div>
                </div>
                <div
                  class="hot-item"
                  @click="godetail(j.id)"
                  v-for="(j, int) in hotProduct"
                  :key="int+1"
                  v-if="index+1 == int"
                  style="border-left: 1px solid #ccc;"
                >
                  <div class="hot-item-img">
                    <img :src="j.imgUrl">
                    <!-- <div class="nowPrice">价值￥{{j.originalPrice}}</div> -->
                  </div>
                  <div class="hot-title">{{j.name}}</div>
                  <div class="hot-btn">{{j.discountPrice}}积分速抢</div>
                </div>
              </div>
            </mt-swipe-item>
          </mt-swipe>
        </div>
      </div>
    </div>

    <!-- 间隔线 -->
    <div class="isline"></div>

    <!-- 广告2 -->
    <div class="ad-f2">
      <div class="ad-img">
        <img :src="f3.titleImg">
      </div>
    </div>

    <!-- 精选换购 -->
    <div class="ad-title" style="background: #f2f2f2;">
      <div class="ad-img"></div>
      <div class="ad-title-txt">精选换购</div>
      <div class="ad-img"></div>
    </div>
    <!-- 产品展示区 -->
    <div class="hot-product-container">
      <div class="product-item" @click="godetail(i.id)" v-for="(i, index) in product" :key="index">
        <div class="itemImg">
          <img :src="i.imgUrl">
        </div>
        <div class="itemTitle">{{i.name}}</div>
        <div class="itemPrice">
          <div class="price">
            <div class="nowPrice">
              {{i.discountPrice}}
              <span>积分</span>
            </div>
            <div class="salesd">
              已换
              <span>{{i.salesVolume}}</span>笔
            </div>
          </div>
          <div class="hot-buy-btn">马上兑换</div>
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
import Header from "@/common/_header.vue";
import Baseline from "@/common/_baseline.vue";
export default {
  components: {
    "v-header": Header,
    "v-baseline": Baseline
  },

  data() {
    return {
      city: "",
      district: "",
      title: "积分兑换",
      product: [], //商品列表
      hotProduct: [], //热门商品列表
      hasmsg: true, // 是否有消息
      msgValue: "9", //消息数量
      hasCar: true, // 是否有购物车数量
      carValue: "9", // 购物车数量
      ad1: "",
      balance: 0, // 积分数量
      adList: [], //广告列表
      f1: [], // 一楼广告
      f2: [], // 一楼广告
      f3: [], // 一楼广告
      size: 8, // 热销乡味单页条数
      page: 1, //热销乡味当前页码
      lock: false, // 加载更多锁
      totalPages: 1, // 总页数
      showBackTop: false //返回顶部按钮
    };
  },

  beforeDestroy() {
    // 销毁监听事件
    // console.log('销毁了');
    window.removeEventListener("scroll", this.handleScroll);
  },

  mounted() {
    this.getData(); // 获取所有数据
    this.getWallet(); // 获取积分数据
    this.getPointAD(); // 获取页面广告
    // 监听滚动事件(李祖明)
    window.addEventListener("scroll", this.handleScroll);
  },

  methods: {
    // 获取积分商品所有数据
    getData() {
      this.district = sessionStorage.getItem("district");
      this.city = sessionStorage.getItem("city");
      this.province = sessionStorage.getItem("province");
      const obj = {
        params: {
          provinceName: this.province,
          cityName: this.city,
          districtName: this.district,
          commodityArea: 4
        }
      };
      this.$api
        .get(this.HOME + this.SEARCH + "commodity/findIntegralShopping", obj)
        .then(res => {
          this.product = res.data.data.commodityList;
        })
        .catch(err => {});

      // 其他商品
      const config = {
        params: {
          provinceName: this.province,
          cityName: this.city,
          districtName: this.district,
          commodityArea: 4,
          sort: 3
        }
      };
      this.$api
        .get(this.HOME + this.SEARCH + "commodity/findIntegralShopping", config)
        .then(res => {
          this.hotProduct = res.data.data.commodityList;
        })
        .catch(err => {});
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
            provinceName: this.province,
            cityName: this.city,
            districtName: this.district,
            commodityArea: 4,
            sort: 3,
            size: this.size,
            page: this.page
          }
        };
        this.$api
          .get(
            this.HOME + this.SEARCH + "commodity/findIntegralShopping",
            config
          )
          .then(res => {
            let arr = res.data.data.commodityList;
            this.totalPages = res.data.data.totalPages;
            this.page = res.data.data.pageNumber;
            if (this.totalPages <= this.page) {
              // Toast("已经到底啦！");
              // this.page = --this.page;
              this.lock = true;
              this.product = [...this.product, ...arr];
            } else {
              this.product = [...this.product, ...arr];
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

    // 获取积分详细
    getWallet() {
      this.$api
        .get(this.HOME + this.USER + "inside/integral/integralRecommend")
        .then(res => {
          this.balance = res.data.data.alreadyAmount;
        });
    },

    // 获取积分广告
    getPointAD() {
      this.districtId = sessionStorage.getItem("districtId") || null;
      let obj = {
        params: {
          districtId: this.districtId,
          code: sessionStorage.getItem('codeD')
        }
      };
      this.$api
        .get(this.HOME + this.SEARCH + "ads/findAdsList", obj)
        .then(res => {
          this.adList = res.data.data;
          this.f1 = this.adList.f1[0];
          this.f2 = this.adList.f2[0];
          this.f3 = this.adList.f3[0];
        });
    },

    // 去积分商品详情页
    godetail(id) {
      this.$router.push({
        path: "/detail?id=" + id
      });
    },

    // 积分明细
    gofundinfo() {
      this.$router.push({
        path: "/fundinfo?name=" + "积分明细"
      });
    },

    // 去广告页
    goUrl(url) {
      if (url != '#') {
        this.$router.push({
          path: url
        });
      }
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

  // 头部部分
  .head {
    width: 100%;
    height: 4.7rem;
    background-color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    .site {
      width: 100%;
      height: 4.7rem;
      display: flex;
      align-items: center;
      .locaImg {
        flex: 1;
        width: 0.9rem;
        height: 1.6rem;
        align-items: center;
        color: #333;
        font-size: 1.6rem;
        margin-bottom: 0.4rem;
        i {
          padding-left: 1rem;
        }
      }
      // 头部标题
      .title {
        flex: 1;
        color: #333;
        font-size: 1.8rem;
        text-align: center;
      }
      .other {
        flex: 1;
      }
    }
  }

  // 顶部大图
  .top-show {
    width: 100%;
    margin-top: 4.7rem;
    .top-img {
      width: 100%;
      height: 53vw;
      overflow: hidden;
      // background: #999;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  // 积分信息部分
  .score {
    width: 100%;
    height: 5.4rem;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    align-items: center;
    .score-number {
      flex: 1;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      .score-img {
        width: 1.8rem;
        height: 2rem;
        margin-right: 1rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .score-txt {
        color: #666;
        font-size: 1.6rem;
        padding-top: 0.4rem;
        span {
          color: #00ae87;
          font-size: 1.8rem;
          margin-right: 0.4rem;
        }
      }
    }
    .score-btn {
      flex: 1;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      border-left: 1px solid #eee;
      height: 80%;
      .score-img {
        width: 1.9rem;
        height: 2rem;
        margin-right: 1rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .score-txt {
        color: #666;
        font-size: 1.6rem;
        padding-top: 0.4rem;
      }
    }
  }

  // 新品热卖
  .hot-sales {
    width: 100%;
    height: 32rem;
    background: #f2f2f2;
    .hot-sales-container {
      width: 100%;
      padding: 0 1.5rem;
      .hot-sales-title {
        width: 100%;
        height: 5.8rem;
        border-radius: 6px 6px 0 0;
        overflow: hidden;
        position: relative;
        // background: #666;
        img {
          height: 100%;
          width: 100%;
        }
        .hot-sales-text {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 100%;
          text-align: center;
          line-height: 5.8rem;
          font-size: 2.4rem;
          color: #fff;
        }
      }
      .hot-sales-item {
        height: 26.2rem;
        width: 100%;
        background: #fff;
        .mint-swipe {
          width: 100%;
          // height: 21.3rem;
          img {
            width: 100%;
            height: 100%;
          }
          .item-container {
            height: 21.3rem;
            width: 100%;
            display: flex;
            // background: #f2f2f2;
            .hot-item {
              height: 22.5rem;
              padding: 0.5rem;
              width: 50%;
              display: flex;
              flex-direction: column;
              align-items: center;
              .hot-item-img {
                width: 100%;
                height: 13rem;
                position: relative;
                img {
                  width: 100%;
                  height: 100%;
                }
                .nowPrice {
                  position: absolute;
                  bottom: 1rem;
                  left: 1rem;
                  // width: 6.2rem;
                  padding: 0 .6rem;
                  height: 1.6rem;
                  background: #00ae87;
                  color: #fff;
                  font-size: 1.1rem;
                  border-radius: 0.8rem;
                  text-align: center;
                  line-height: 1.6rem;
                }
              }
              .hot-title {
                width: 100%;
                height: 4rem;
                font-size: 1.4rem;
                margin: .8rem 0;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                /*! autoprefixer: off */
                -webkit-box-orient: vertical;
                /*! autoprefixer: on */
              }
              .hot-btn {
                width: 12rem;
                height: 2.5rem;
                background: #00ae87;
                color: #fff;
                border-radius: 3px;
                font-size: 1.5rem;
                text-align: center;
                line-height: 2.5rem;
              }
            }
          }
        }
      }
    }
  }

  // 广告图位置
  .ad-f2 {
    width: 100%;
    height: 23.2vw;
    padding: 0 1.5rem;
    background: #f2f2f2;
    .ad-img {
      width: 100%;
      height: 23.2vw;
      border-radius: 11.6vw;
      // background: #999;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  // 标题的样式
  .ad-title {
    height: 4.6rem;
    display: flex;
    padding-left: 1.5rem;
    align-items: center;
    justify-content: center;
    background: #fff;
    .ad-img {
      width: 1.6rem;
      height: 0.3rem;
      border-radius: 0.15rem;
      background: #00ae87;
    }
    .ad-title-txt {
      font-size: 1.5rem;
      color: #333;
      padding: 0 0.7rem;
    }
  }

  // 精选换购产品展示区样式集中
  .hot-product-container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    padding: 0 1.5rem;
    background: #f2f2f2;
    .product-item {
      width: 49%;
      height: 26.4rem;
      overflow: hidden;
      background: #fff;
      display: flex;
      flex-direction: column;
      border-radius: 6px;
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
      .itemImg {
        width: 100%;
        height: 15.2rem;
        overflow: hidden;
        background: #666;
        border-radius: 6px 6px 0 0;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .itemTitle {
        font-size: 1.4rem;
        height: 4rem;
        color: #333;
        padding: 0 0.5rem;
        margin: 0.5rem 0;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        /*! autoprefixer: off */
        -webkit-box-orient: vertical;
        /*! autoprefixer: on */
      }
      .itemPrice {
        padding: 0 0.5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        .price {
          display: flex;
          padding: 0.5rem;
          width: 100%;
          justify-content: space-between;
          .nowPrice {
            font-size: 1.6rem;
            color: #ff0000;
            font-weight: bold;
            span {
              padding-left: 0.6rem;
              font-size: 1.2rem;
            }
          }
          .salesd {
            font-size: 1rem;
            color: #999;
            line-height: 1.8rem;
            margin-top: 0.2rem;
            margin-left: 0.2rem;
            span {
              font-size: 0.9rem;
            }
          }
        }
        .hot-buy-btn {
          width: 90%;
          height: 2.5rem;
          border-radius: 3px;
          text-align: center;
          line-height: 2.5rem;
          background: #00ae87;
          color: #fff;
          font-size: 1.2rem;
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
