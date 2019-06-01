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

    <!-- vip说明 -->
    <div class="vipCard">
      <div class="card">
        <img :src="f1.titleImg">
      </div>
    </div>

    <!-- 广告1 -->
    <div class="ad-f2" @click="goAd(f2.url)">
      <img :src="f2.titleImg">
    </div>

    <!-- 间隔线 -->
    <div class="isline"></div>

    <!-- 精品热卖 -->
    <div class="ad-title">
      <img src="../../../img/index/vipPart/point.png">
      <div class="ad-title-txt">精品热卖</div>
      <img src="../../../img/index/vipPart/point.png">
    </div>
    <!-- 产品展示区 -->
    <div class="product-container">
      <div
        class="product-item"
        v-for="(i, index) in hotSale"
        :key="index"
        v-if="index<4"
        @click="goProduct(i.commodityId)"
      >
        <div class="itemImg">
          <img :src="i.titleImg">
        </div>
        <div class="item-right">
          <div class="itemTitle">{{i.name}}</div>
          <div class="itemPrice">
            <div class="price">
              <div class="nowPrice">
                ￥
                <span>{{i.discountPrice}}</span>
              </div>
              <div class="originalPrice">
                市场价:
                <span>￥</span>
                {{i.originalPrice}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 间隔线 -->
    <div class="isline"></div>

    <!-- 广告2 -->
    <div class="ad-f2" @click="goAd(f4.url)">
      <img :src="f4.titleImg">
    </div>

    <!-- 会员商品 -->
    <div class="ad-title" style="background: #f2f2f2;">
      <img src="../../../img/index/vipPart/point.png">
      <div class="ad-title-txt">会员商品</div>
      <img src="../../../img/index/vipPart/point.png">
    </div>
    <!-- 产品展示区 -->
    <div class="hot-product-container">
      <div
        class="product-item"
        v-for="(i, index) in memberProduct"
        :key="index"
        @click="goProduct(i.id)"
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
            <div class="originalPrice">
              市场价：
              <span>￥</span>
              {{i.originalPrice}}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 间隔线 -->
    <div class="isline" style="background: #fff;"></div>
    <!-- 到底了 -->
    <v-baseline></v-baseline>
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
      title: "会员专区",
      swiper: [],
      hasmsg: true, // 是否有消息
      msgValue: "9", //消息数量
      hasCar: true, // 是否有购物车数量
      carValue: "9", // 购物车数量
      ad1: "",
      hotSale: [], //今日特价数据
      f1: [], // vip说明卡数据
      f2: [], // 2楼广告
      f4: [], // 4楼广告
      memberProduct: [], // 会员商品列表
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
    // 监听滚动事件(李祖明)
    window.addEventListener("scroll", this.handleScroll);
  },

  methods: {
    // 获取所有数据
    getData() {
      this.districtId = sessionStorage.getItem("districtId") || null;
      const config = {
        params: {
          districtId: this.districtId,
          code: sessionStorage.getItem('codeC')
        }
      };
      this.$api
        .get(this.HOME + this.SEARCH + "ads/findAdsList", config)
        .then(res => {
          this.f1 = res.data.data.f1[0];
          this.f2 = res.data.data.f2[0];
          this.hotSale = res.data.data.f3;
          this.f4 = res.data.data.f4[0];
          // console.log(this.f1);
        })
        .catch(err => {});

      // 商品列表
      const obj = {
        params: {
          commodityArea: 3
        }
      };
      this.$api
        .get(this.HOME + this.SEARCH + "commodity/findmembersarea", obj)
        .then(res => {
          if (res.data.data == '') {
            return
          } else {
            this.memberProduct = res.data.data.commodityList;
          }
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
        console.log("触底了" + insexHight);
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
            // sort: 3,
            size: this.size,
            page: this.page,
            commodityArea: 3
          }
        };
        this.$api
          .get(this.HOME + this.SEARCH + "commodity/findmembersarea", config)
          .then(res => {
            if (res.data.data == '') {
              return
            }
            let arr = res.data.data.commodityList;
            this.totalPages = res.data.data.totalPages;
            this.page = res.data.data.pageNumber;
            if (this.totalPages <= this.page) {
              // Toast("已经到底啦！");
              // this.page = --this.page;
              this.lock = true;
              this.memberProduct = [...this.memberProduct, ...arr];
            } else {
              this.memberProduct = [...this.memberProduct, ...arr];
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

    // 点击了广告
    goAd(url) {
      if (url != '#') {
        this.$router.push({
          path: url
        });
      }
    },

    //去商品详情页
    goProduct(id) {
      this.$router.push({
        path: "detail?id=" + id
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

  // vip说明部分
  .vipCard {
    width: 100%;
    // height: 59vw;
    margin-top: 4.7rem;
    padding: 1.5rem;
    .card {
      width: 100%;
      height: 56vw;
      border-radius: 6px;
      overflow: hidden;
      // background: #999;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  // 广告图位置
  .ad-f2 {
    width: 100%;
    height: 21.3vw;
    // background: #999;
    img {
      width: 100%;
      height: 100%;
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
    img {
      width: 0.9rem;
      height: 1.2rem;
    }
    .ad-title-txt {
      font-size: 1.7rem;
      color: #fd8320;
      font-weight: bold;
      padding: 0 0.7rem;
    }
  }

  // 产品展示区样式集中
  .product-container {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    background: #fff;
    .product-item {
      width: 50%;
      background: #fff;
      display: flex;
      border: 1px solid #eee;
      padding: 1rem;
      .itemImg {
        width: 40%;
        height: 9.8rem;
        overflow: hidden;
        // background: #666;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .item-right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 9.1rem;
        margin-left: 0.5rem;
        .itemTitle {
          font-size: 1.3rem;
          // color: #333;
          margin-top: 0.5rem;
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
          justify-content: space-between;
          .price {
            display: flex;
            flex-direction: column;
            .nowPrice {
              font-size: 0.8rem;
              color: #fd8320;
              span {
                font-size: 1.7rem;
                font-weight: bold;
              }
            }
            .originalPrice {
              font-size: 1.1rem;
              line-height: 1.2rem;
              span {
                font-size: 0.9rem;
              }
            }
          }
        }
      }
    }
  }

  // 会员商品产品展示区样式集中
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
      height: 22.7rem;
      background: #eee;
      display: flex;
      flex-direction: column;
      border-radius: 6px;
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
      .itemImg {
        width: 100%;
        height: 13.8rem;
        overflow: hidden;
        // background: #666;
        border-radius: 6px 6px 0 0;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .itemTitle {
        font-size: 1.4rem;
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
        .price {
          display: flex;
          flex-direction: column;
          .nowPrice {
            font-size: 0.8rem;
            color: #fd8320;
            span {
              font-size: 1.7rem;
              font-weight: bold;
            }
          }
          .originalPrice {
            font-size: 1.1rem;
            color: #999;
            line-height: 1.2rem;
            margin-top: 0.2rem;
            margin-left: 0.2rem;
            span {
              font-size: 0.9rem;
            }
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
