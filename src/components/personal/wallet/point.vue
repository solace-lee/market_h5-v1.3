<template>
  <div class="point" ref="point">
    <!-- 头部 -->
    <div class="head">
      <div class="bg"></div>
      <div class="head-title">
        <div class="back" @click="$router.go(-1)">
          <img src="../../../../img/index/wallet/back.png" alt>
        </div>
        <div class="title">我的积分</div>
      </div>
    </div>

    <!-- 主体内容 -->
    <div class="point-head">
      <div class="point-head-img">
        <img src="../../../../img/index/wallet/point/banner.png" alt>
      </div>
      <div class="point-bar">
        <div class="point-bar-bg">
          <div class="point-info-area">
            <div class="point-info-left">
              <div class="point-img">
                <img src="../../../../img/index/wallet/point/icon.png" alt>
              </div>
              <div class="point-value">
                <div class="point-title">我的积分</div>
                <div class="point-num">{{balance}}</div>
              </div>
            </div>
            <div class="point-info-right" @click="gofundinfo">
              <div class="point-btn">积分明细</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 特别推荐 -->
    <div class="recommend-container">
      <div class="recommend-title">
        <div class="recommend-title-info">特别推荐</div>
      </div>
      <!-- <div class="recommend-area">
        <div
          class="recommend-item"
          v-for="(i, index) in product"
          :key="index"
          @click="godetail(i.commodityId)"
        >
          <div class="recommend-item-img">
            <img :src="i.imgUrl" alt>
          </div>
          <div class="recommend-item-title">{{i.name}}</div>
          <div class="recommend-item-price">
            <span>{{i.integral}}</span>积分起
          </div>
        </div>
      </div> -->
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
    </div>
  </div>
</template>

<script>
import { formatDate } from "../../../assets/js/data.js";
import { Toast } from "vant";
export default {
  components: {},
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  },
  data() {
    return {
      balance: 0, //积分总额
      product: [] //特别推荐数据
    };
  },
  created() {
    this.getWallet();
  },

  mounted() {},
  methods: {
    // 获取钱包信息
    getWallet() {
      this.$api
        .get(this.HOME + this.USER + "inside/integral/integralRecommend")
        .then(res => {
          this.balance = res.data.data.alreadyAmount;
          // this.product = res.data.data.integralCommodity;
        });
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
    },

    // 积分明细
    gofundinfo() {
      this.$router.push({
        path: "/fundinfo?name=" + "积分明细"
      });
    },

    //去推荐明细
    godetail(id) {
      this.$router.push({
        path: "/detail?id=" + id
      });
    }
  }
};
</script>
<style scoped lang='less'>
.point {
  width: 100%;
  height: 100vh;

  // 头部
  .head {
    width: 100%;
    height: 4.7rem;
    background: #fd8320;
    display: flex;
    flex-direction: column;
    .bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      img {
        height: 100%;
        width: 100%;
      }
    }
    .head-title {
      height: 4.7rem;
      width: 100%;
      display: flex;
      justify-content: center;
      position: fixed;
      top: 0;
      left: 0;
      line-height: 4.7rem;
      .back {
        position: fixed;
        left: 1.5rem;
        top: 0;
        height: 1.6rem;
        width: 0.9rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .title {
        font-size: 1.8rem;
        color: #fff;
      }
    }
  }

  // 主体内容
  .point-head {
    width: 100%;
    height: 22rem;
    background: #f2f2f2;
    .point-head-img {
      width: 100%;
      height: 16rem;

      img {
        height: 100%;
        width: 100%;
      }
    }
    .point-bar {
      width: 100%;
      padding: 0 1.5rem;
      .point-bar-bg {
        width: 100%;
        position: relative;
        .point-info-area {
          background: #fff;
          height: 6rem;
          width: 100%;
          border-radius: 6px;
          overflow: hidden;
          position: absolute;
          top: -1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 1.5rem;
          .point-info-left {
            display: flex;
            align-items: center;
            .point-img {
              height: 3rem;
              width: 3rem;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .point-value {
              padding-left: 1rem;
              display: flex;
              flex-direction: column;
              align-items: center;
              .point-title {
                font-size: 1.2rem;
                color: #333;
              }
              .point-num {
                font-size: 1.6rem;
                color: #fd8320;
              }
            }
          }
          .point-info-right {
            height: 2rem;
            width: 6.4rem;
            .point-btn {
              height: 100%;
              width: 100%;
              border: 1px solid #ccc;
              font-size: 1.2rem;
              color: #666;
              line-height: 2rem;
              text-align: center;
              border-radius: 6px;
            }
          }
        }
      }
    }
  }

  // 特别推荐
  .recommend-container {
    width: 100%;
    .recommend-title {
      height: 4.5rem;
      padding: 0 1.5rem;
      .recommend-title-info {
        font-size: 1.5rem;
        color: #333;
        line-height: 4.5rem;
      }
    }
    .recommend-area {
      width: 100%;
      padding: 0 1.5rem;
      display: flex;
      flex-wrap: wrap;
      .recommend-item {
        height: 16rem;
        width: 11.4rem;
        padding: 1.5rem;
        border: 1px solid #eee;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .recommend-item-img {
          height: 8rem;
          width: 8rem;
          overflow: hidden;
          // background: #999;
          img {
            height: 100%;
            width: 100%;
          }
        }
        .recommend-item-title {
          margin-top: 0.5rem;
          font-size: 1.3rem;
          color: #333;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          /*! autoprefixer: off */
          -webkit-box-orient: vertical;
          /*! autoprefixer: on */
        }
        .recommend-item-price {
          font-size: 1.1rem;
          color: #999;
          span {
            color: #fd8320;
            font-size: 1.6rem;
          }
        }
      }
    }
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
</style>
