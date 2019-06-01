<template>
  <div class="user_center">
    <header class="header_user">
      <div class="head_portrait" @click="userImg">
        <img :src="userInfo.imgUrl" v-if="userInfo.imgUrl" alt>
        <img src="../../img/index/personal/noneImg.png" alt v-if="!userInfo.imgUrl && showHeadImg">
      </div>
      <div class="user_name">{{userInfo.nickname}}</div>
    </header>

    <section class="order_container">
      <div class="my_order">
        <div class="all_orders" @click="allOrders(0)">
          <div class="all_orders_left">我的订单</div>
          <div class="all_orders_right">
            <div>
              <span>查看全部</span>
              <i class="el-icon-arrow-right"></i>
            </div>
          </div>
        </div>
        <div class="all_orders_state">
          <div @click="allOrders(1)">
            <img src="../../img/index/replacement/pendingPayment.png" alt>
            <p>待付款</p>
            <b
              style="background-color: red;color: #FFFFFF;border-radius: 5rem;position: relative;top: -75px;left: 12px;"
              v-if="arr1!=0"
            >&nbsp;{{arr1}}&nbsp;</b>
          </div>
          <div @click="allOrders(2)">
            <img src="../../img/index/replacement/toBeShipped.png" alt>
            <p>待发货</p>
            <b
              style="background-color: red;color: #FFFFFF;border-radius: 5rem;position: relative;top: -75px;left: 12px;"
              v-if="arr2!=0"
            >&nbsp;{{arr2}}&nbsp;</b>
          </div>
          <div @click="allOrders(3)">
            <img src="../../img/index/replacement/received.png" alt>
            <p>待收货</p>
            <b
              style="background-color: red;color: #FFFFFF;border-radius: 5rem;position: relative;top: -75px;left: 12px;"
              v-if="arr3!=0"
            >&nbsp;{{arr3}}&nbsp;</b>
          </div>
          <div @click="allOrders(4)">
            <img src="../../img/index/replacement/evaluated.png" alt>
            <p>待评价</p>
            <b
              style="background-color: red;color: #FFFFFF;border-radius: 5rem;position: relative;top: -75px;left: 12px;"
              v-if="arr4!=0"
            >&nbsp;{{arr4}}&nbsp;</b>
          </div>
          <div @click="goReplacement()">
            <img src="../../img/index/replacement/afterSale.png" alt>
            <p>退货/售后</p>
            <b
              style="background-color: red;color: #FFFFFF;border-radius: 5rem;position: relative;top: -75px;left: 12px;"
              v-if="arr5!=0"
            >&nbsp;{{arr5}}&nbsp;</b>
          </div>
        </div>
      </div>
    </section>

    <section style="padding: 0rem 1.5rem;box-size: border-box;">
      <div class="order_list">
        <router-link :to="{ path: '/wallet?name=我的钱包'}">
          <div class="my_wallet">
            <div class="my_wallet_left">
              <img src="../../img/index/replacement/wallet.png" alt>
              <span>我的钱包</span>
            </div>
            <div class="my_wallet_right">
              <i class="el-icon-arrow-right"></i>
            </div>
          </div>
        </router-link>
        <!-- <router-link :to="{ path: '/breedingHarvest?name=养殖收获'}">
          <div class="harvest">
            <div class="harvest_left">
              <img src="../../img/index/replacement/breed.png" alt>
              <span>养殖收获</span>
            </div>
            <div class="harvest_right">
              <i class="el-icon-arrow-right"></i>
            </div>
          </div>
        </router-link> -->
        
      </div>
      <div class="order_list">
        <router-link :to="{ path:'/UserErweiMa'}">
          <div class="my_wallet">
            <div class="my_wallet_left">
              <img src="../../img/index/replacement/code.png" alt>
              <span>推广二维码</span>
            </div>
            <div class="my_wallet_right">
              <i class="el-icon-arrow-right"></i>
            </div>
          </div>
        </router-link>
       
        <router-link :to="{ path: '/shopCenter?name=我的店铺&userType=' + isEnter }" v-if="isEnter != 1">
          <div class="harvest">
            <div class="harvest_left">
              <img src="../../img/index/replacement/shop.png" alt>
              <span>我的店铺</span>
            </div>
            <div class="harvest_right">
              <i class="el-icon-arrow-right"></i>
            </div>
          </div>
        </router-link>
        <router-link :to="{ path: '/myshop?name=我的店铺'}" v-else>
        <div class="harvest">
          <div class="harvest_left">
            <img src="../../img/index/replacement/shop.png" alt>
            <span>我要入驻</span>
          </div>
          <div class="harvest_right">
            <i class="el-icon-arrow-right"></i>
          </div>
        </div>
      </router-link>
      
      </div>
      <div class="order_list">
        <router-link :to="{ path: '/about'}">
          <div class="harvest">
            <div class="harvest_left">
              <img src="../../img/index/replacement/breed.png" alt>
              <span>关于</span>
            </div>
            <div class="harvest_right">
              <i class="el-icon-arrow-right"></i>
            </div>
          </div>
        </router-link>
      </div>
    </section>

    <v-footer :foot="foot"></v-footer>
  </div>
</template>

<script>
import Footer from "@/common/_footer.vue";
import Header from "@/common/_header.vue";

export default {
  components: {
    "v-footer": Footer
  },
  data() {
    return {
      userInfo: {},
      token: "",
      foot: "3",
      arr1: 0, // 待付款数量
      arr2: 0, // 待发货数量
      arr3: 0, // 待收货数量
      arr4: 0, // 待待评价
      arr5: 0, // 退货，售后数量
      isEnter: 1, // 是否提交入住
      showHeadImg: false // 是否显示默认头像
    };
  },
  created() {
    this.foot = 3
    this.getOrderMsg()
    this.getUserInfo()
  },

  methods: {
    // 获取订单数量
    getOrderMsg() {
      this.$api
        .get(this.HOME + this.USER + "inside/showOrderAmount")
        .then(res => {
          this.isEnter = res.data.data.isEnter;
          const obj = res.data.data;
          if (obj) {
            this.arr1 = obj.waitPay;
            this.arr2 = obj.waitShipments;
            this.arr3 = obj.waitReceiving;
            this.arr4 = obj.waitEvaluate;
            if (this.arr1 > 99) {
              this.arr1 = "99+";
            }
            if (this.arr2 > 99) {
              this.arr2 = "99+";
            }
            if (this.arr3 > 99) {
              this.arr3 = "99+";
            }
            if (this.arr4 > 99) {
              this.arr4 = "99+";
            }
          }
        });
    },

    //获取用户信息
    getUserInfo() {
      this.$api
        .get(this.HOME + this.AUTH + "verifyUser")
        .then(res => {
          if (!res.data.imgUrl) {
            this.showHeadImg = true
          }
          this.userInfo = {
            imgUrl: res.data.imgUrl,
            nickname: res.data.nickname,
            userId: res.data.userId,
            userType: res.data.userType
          };
        })
        .catch(err => {
          console.log(err);
          this.showHeadImg = true
        });
    },

    // 全部订单
    allOrders(status) {
      window.sessionStorage.setItem("allOrderStatus", status);
      this.$router.push({ path: "/allOrders" });
    },
    userImg() {
      this.$router.push({
        name: "Userdata"
      });
    },
    goReplacement() {
      window.sessionStorage.setItem("indexStatus", 1);
      this.$router.push({
        path: "/replacement?status=1"
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/fz.less";
@import "../assets/index/style.css";
@import "../assets/user/icon/carstyle.css";

a:hover,
a:focus {
  color: #23527c;
  text-decoration: none;
}

.van-tab.van-tab--active {
  color: #1bc6a3 !important;
}

.footer {
  background: #f2f2f2;
  // position: fixed;
  // bottom: 0;
  // height: 5rem;
  // left: 0;
}

.user_center {
  width: 100%;
  background: #f2f2f2;
  height: 100vh;
  .header_user {
    z-index: 2;
    width: 100%;
    height: 23rem;
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    -webkit-background-size: 100% 100%;
    background-image: url(../../img/index/replacement/header.png);
    overflow: hidden;
    background-size: 100% 100%;
    // position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    .head_portrait {
      width: 8.1rem;
      height: 8.1rem;
      position: absolute;
      left: 50%;
      top: 4.5rem;
      margin-left: -4.05rem;
      background-image: url(../../img/index/replacement/border.png);
      background-size: 100% 100%;
      img {
        border-radius: 50%;
        width: 6.7rem;
        height: 6.7rem;
        position: absolute;
        left: 0.7rem;
        top: 0.6rem;
      }
    }
    .user_name {
      height: 3rem;
      line-height: 3rem;
      margin-top: 12.5rem;
      color: #ffffff;
      font-size: 1.6rem;
    }
  }

  .order_container {
    width: 100%;
    height: 9.2rem;
    position: relative;
    margin-bottom: 1.5rem;
    .my_order {
      width: 34.5rem;
      height: 13rem;
      position: absolute;
      top: -3.8rem;
      left: 1.5rem;
      z-index: 2;
      border-radius: 4px;
      background: white;
      .all_orders {
        width: 100%;
        height: 4.5rem;
        padding: 0rem 1.5rem;
        box-sizing: border-box;
        .all_orders_left {
          width: 11.5rem;
          height: 4.5rem;
          float: left;
          font-size: 1.5rem;
          color: #333333;
          line-height: 4.5rem;
          border-bottom: 1px solid #f2f2f2;
        }
        .all_orders_right {
          width: 20rem;
          height: 4.5rem;
          float: left;
          line-height: 4.5rem;
          border-bottom: 1px solid #f2f2f2;
          div {
            float: right;
            span {
              font-size: 1.2rem;
              color: #999999;
            }
            i {
              font-size: 1.2rem;
              margin-left: 0.75rem;
            }
          }
        }
      }
      .all_orders_state {
        width: 100%;
        height: 8.5rem;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        padding: 2vw 1.5rem;
        box-sizing: border-box;
        > div {
          display: block;
          width: 20%;
          text-align: center;
          > span {
            margin-top: 2.3vw;
            display: block;
            text-align: center;
          }
          > img {
            margin-top: 7px;
            width: 25px;
            height: 25px;
          }
          p {
            margin-top: 2px;
            padding: 2.3vw 0;
            text-align: center;
            font-size: 1.2rem;
            color: #666666;
          }
        }
      }
    }
  }

  .mixin_wallet_icon() {
    width: 1.6rem;
    height: 1.6rem;
    position: absolute;
    top: 50%;
    margin-top: -0.8rem;
  }
  .mixin_wallet_font() {
    height: 1.6rem;
    line-height: 1.6rem;
    display: inline-block;
    color: #666666;
    font-size: 1.3rem;
    position: absolute;
    top: 50%;
    left: 2.4rem;
    margin-top: -0.7rem;
  }
  .order_list {
    width: 100%;
    background: white;
    margin-bottom: 1.5rem;
    border-radius: 4px;
    padding: 0rem 1.5rem;
    box-sizing: border-box;
    .my_wallet {
      width: 100%;
      height: 4.5rem;
      .my_wallet_left {
        float: left;
        width: 20rem;
        height: 4.5rem;
        position: relative;
        img {
          .mixin_wallet_icon();
        }
        span {
          .mixin_wallet_font();
        }
      }
      .my_wallet_right {
        float: right;
        width: 11.5rem;
        height: 4.5rem;
        font-size: 1.4rem;
        position: relative;
        i {
          position: absolute;
          top: 50%;
          right: 0rem;
          margin-top: -0.7rem;
        }
      }
    }
    .harvest {
      width: 100%;
      height: 4.5rem;
      border-top: 1px solid #f2f2f2;
      .harvest_left {
        float: left;
        width: 20rem;
        height: 4.5rem;
        position: relative;
        img {
          .mixin_wallet_icon();
        }
        span {
          .mixin_wallet_font();
        }
      }
      .harvest_right {
        float: right;
        width: 11.5rem;
        height: 4.5rem;
        font-size: 1.4rem;
        position: relative;
        i {
          position: absolute;
          top: 50%;
          right: 0rem;
          margin-top: -0.7rem;
        }
      }
    }
  }

  .main {
    width: 100%; // border: 1px solid #000;
    margin: 0 auto;
    border-radius: 10px;
    position: relative; // top: -80px;
    // 我的钱包
    .wallet {
      width: 94%;
      height: 14rem;
      margin-left: 12px;
      background-color: #ffffff;
      border-top-right-radius: 30px;
      border-top-left-radius: 30px;
      border-bottom-left-radius: 30px;
      border-bottom-right-radius: 30px;

      ul {
        width: 100%;
        height: 99%;
        li {
          width: 100%;
          height: 33.33333333333%;
          text-align: center;
          float: left;
          padding: 0.8rem 0;

          div {
            border-right: 1px solid #eee;
            span {
              display: block;
              padding-bottom: 0.4rem;
              font-size: 5.6rem;
            }
            span:lath-child {
              color: #1bc6a3;
            }
          }
        }
      }
    }
    .my-indent-left {
      display: flex;
      justify-content: space-between;
      width: 100%;
      div {
        img {
          width: 1rem;
          margin-right: 0.3rem;
          vertical-align: middle;
        }
        span {
          vertical-align: middle;
          font-size: 0.8rem;
          color: #666;
        }
      }
      i {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .my-indent-left:nth-last-child {
      margin-bottom: 1rem;
    }
    .my-indent {
      /*  boder-top-left-radius:50px;*/
      width: 94%;
      display: block;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      color: #333;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      margin-left: 12px;
      -webkit-box-pack: justify;
      -ms-flex-pack: justify;
      justify-content: space-between;
      padding: 0 5vw;
      height: 15vw;
      line-height: 15vw;
      background-color: #fff;
      border-top-right-radius: 30px;
      border-top-left-radius: 30px; // border: 1px solid #000;
      margin-bottom: -1px;
      .bd();
      &:active {
        background-color: rgb(224, 227, 230);
      }

      .my-indent-right {
        width: 5rem;
        span {
          display: inline-block;
          .fz(font-size, 28);
          color: rgba(0, 0, 0, 0.4);
          position: relative;
        }
        i {
          position: absolute;
          top: 0.9rem;
        }
      }
    }
    .my-pay {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      margin-left: 12px;
      width: 94%;
      padding: 2vw 0;
      background-color: #fff;
      border-bottom-left-radius: 30px;
      border-bottom-right-radius: 30px; // border: 1px solid #fff;
      .bd();

      > a {
        display: block;
        width: 33.33%;
        color: #999;
        text-align: center;

        > span {
          .fz(font-size, 50);
          margin-top: 2.3vw;
          display: block;
          text-align: center;
        }
        > img {
          margin-top: 7px;
          width: 25px;
          height: 25px;
        }
        p {
          margin-top: 2px;
          padding: 2.3vw 0;
          text-align: center;
          font-size: 1.4rem;
        }
      }
    }
    .my-indent2 {
      width: 100%;
      display: block;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      color: #333;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: justify;
      -ms-flex-pack: justify;
      justify-content: space-between;
      padding: 0 0.6rem;
      height: 2rem;
      line-height: 2rem;
      background-color: #fff; // border-top-right-radius: 8px;
      // border-top-left-radius: 8px;
      border-top: 1px solid #dadada; // margin-top: 10px;
    }
    .my-pay2 {
      display: -webkit-box;
      display: -ms-flexbox; // display: flex;
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      padding: 2vw 0;
      background-color: #fff; // border: 1px solid #000;
      // margin-top: 10px;
      // height: 30vw;
      // line-height: 30vw;
      .bd();

      > a {
        display: block;
        width: 33.33%;
        color: #999;
        text-align: center;
        margin-top: 1rem;

        > span {
          .fz(font-size, 50);
          margin-top: 2.3vw;
          display: block;
          text-align: center;
        }
        > img {
          width: 20px;
          height: 20px;
        }

        p {
          padding: 2.3vw 0;
          text-align: center;
        }
      }
    }

    .my-vip,
    .my-service,
    .my-settle {
      width: 100%; // border: 1px solid #fff;
      background-color: #fff;
      .mt();
      .bd();
      .bt();
      > a {
        background-color: #fff;
        display: block;
        width: 100%;
        display: -ms-flex;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        height: 15vw;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        padding: 0 6vw;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        &:active {
          background-color: rgb(224, 227, 230);
        }
        > div {
          -ms-flex: 2;
          -webkit-box-flex: 2;
          flex: 2;
          padding-top: 1.3vw;
        }

        .my-vip-top-div {
          padding-top: 0;
        }
        > p {
          -ms-flex: 10;
          -webkit-box-flex: 10;
          flex: 10;
          position: relative;

          &:active {
            background-color: rgb(224, 227, 230);
          }

          i {
            position: absolute;
            right: 0;
            top: 0.4vw;
          }
        }
      }
    }
  }
}

/*图标大小不一，重新定义*/

.icon-go {
  .fz(font-size, 36);
  &::before {
    color: #aba8a8;
  }
}

[class^="icon2-"],
[class*=" icon2-"] {
  .fz(font-size, 50);
}

.icon2-service {
  .fz(font-size, 34);
}
</style>