<template>
  <div class="wallet" ref="wallet">
    <!-- 头部 -->
    <div class="head">
      <div class="bg">
        <img src="../../img/index/wallet/bg.png" alt>
      </div>
      <div class="head-title">
        <div class="back" @click="$router.go(-1)">
          <img src="../../img/index/wallet/back.png" alt>
        </div>
        <div class="title">我的钱包</div>
      </div>
      <div class="user-area">
        <div class="user-img">
          <img :src="userinfo.imgUrl" alt>
        </div>
        <div class="user-info">
          <div class="user-name">{{userinfo.nickname}}</div>
          <div class="user-moblie" v-if="phone">{{phone}}</div>
        </div>
      </div>
    </div>

    <!-- 主体内容 -->
    <div class="wallet-container">
      <div class="wallet-area">
        <!-- 余额 -->
        <div class="balance-area" @click="goremainder">
          <div class="balance-item-left">
            <div class="balace-img">
              <img src="../../img/index/wallet/balance.png" alt>
            </div>
            <div class="balance-title">我的余额</div>
          </div>
          <div class="balance-item-right">
            <div class="balance-info">￥{{balance.toFixed(2)}}</div>
            <div class="balance-go">
              <img src="../../img/index/wallet/next.png" alt>
            </div>
          </div>
        </div>
        <!-- 业绩 -->
        <!-- <div class="balance-area" @click="goachievement">
          <div class="balance-item-left">
            <div class="balace-img">
              <img src="../../img/index/wallet/achievement.png" alt>
            </div>
            <div class="balance-title">业绩</div>
          </div>
          <div class="balance-item-right"> -->
            <!-- <div class="balance-info">￥1256.00</div> -->
            <!-- <div class="balance-go">
              <img src="../../img/index/wallet/next.png" alt>
            </div>
          </div>
        </div> -->
        <!-- 创业基金 -->
        <!-- <div class="balance-area" @click="gofund">
          <div class="balance-item-left">
            <div class="balace-img">
              <img src="../../img/index/wallet/fund.png" alt>
            </div>
            <div class="balance-title">养殖收益</div>
          </div>
          <div class="balance-item-right"> -->
            <!-- <div class="balance-info">￥1256.00</div> -->
            <!-- <div class="balance-go">
              <img src="../../img/index/wallet/next.png" alt>
            </div>
          </div>
        </div> -->
        <!-- 积分 -->
        <div class="balance-area" @click="gopoint">
          <div class="balance-item-left">
            <div class="balace-img">
              <img src="../../img/index/wallet/point.png" alt>
            </div>
            <div class="balance-title">我的积分</div>
          </div>
          <div class="balance-item-right">
            <!-- <div class="balance-info">￥1256.00</div> -->
            <div class="balance-go">
              <img src="../../img/index/wallet/next.png" alt>
            </div>
          </div>
        </div>
        <!-- 红包 -->
        <!-- <div class="balance-area" @click="goredbag">
          <div class="balance-item-left">
            <div class="balace-img">
              <img src="../../img/index/wallet/redbag.png" alt>
            </div>
            <div class="balance-title">红包</div>
          </div>
          <div class="balance-item-right">
            <div class="balance-go">
              <img src="../../img/index/wallet/next.png" alt>
            </div>
          </div>
        </div> -->

        <!-- 银行卡 -->
        <div class="balance-area bankline" @click="goBankCard">
          <div class="balance-item-left">
            <div class="balace-img">
              <img src="../../img/index/wallet/bankCard.png" alt>
            </div>
            <div class="balance-title">银行卡</div>
          </div>
          <div class="balance-item-right">
            <div class="balance-info" style="color:#ff0000;" v-if="carList.length==0">未绑定</div>
            <div class="balance-go">
              <img src="../../img/index/wallet/next.png" alt>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from "../assets/js/data.js";
import Utils from '@/http/utils.js'
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
      balance: 0, // 余额
      userinfo: {}, //用户信息
      carList: {}, // 银行卡列表
      phone: '' // 手机号
    };
  },
  created() {
    this.getWallet();
  },

  mounted() {},
  methods: {
    // 获取钱包信息
    getWallet() {
      // 获取个人信息
      this.$api.get(this.HOME + this.AUTH + "verifyUser").then(res => {
        this.userinfo = res.data;
        this.phone = Utils.decrypt(this.userinfo.userPhone)
      });
      // 获取余额
      this.$api
        .get(this.HOME + this.USER + "inside/userAmount")
        .then(res => {
          this.balance = res.data.data.amount;
        });
      // 查看是否绑定过银行卡
      this.$api
        .get(this.HOME + this.USER + "inside/showUserBank")
        .then(res => {
          this.carList = res.data.data;
          // console.log(this.carList);
        });
    },

    // 去业绩页
    goachievement() {
      this.$router.push({
        path: "/achievement"
      });
    },

    // 去创业基金
    gofund() {
      this.$router.push({
        path: "/fund"
      });
    },

    // 去积分页
    gopoint() {
      this.$router.push({
        path: "/point"
      });
    },

    // 去红包页
    goBankCard() {
      this.$router.push({
        path: "/bankCard"
      });
    },

    // 去银行卡页
    goredbag() {
      this.$router.push({
        path: "/redbag"
      });
    },

    // 去余额页
    goremainder() {
      this.$router.push({
        path: "/remainder"
      });
    }
  }
};
</script>
<style scoped lang='less'>
.wallet {
  width: 100%;
  height: 100vh;
  background: #f2f2f2;

  // 头部
  .head {
    width: 100%;
    height: 14rem;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    // justify-content: flex-start;
    .bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 14rem;
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
      position: relative;
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
    .user-area {
      display: flex;
      // align-items: flex-start;
      z-index: 1;
      .user-img {
        // background: #80dac8;
        width: 4.8rem;
        height: 4.8rem;
        border-radius: 50%;
        margin-left: 3rem;
        margin-top: 2.8rem;
        overflow: hidden;
        border: 2px solid #80dac8;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .user-info {
        margin-left: 1.5rem;
        margin-top: 3.2rem;
        color: #fff;
        font-size: 1.6rem;
        .user-name {
          font-size: 1.6rem;
        }
        .user-moblie {
          height: 2rem;
          line-height: 2rem;
          margin-top: 0.2rem;
          // font-size: 1.2rem;
        }
      }
    }
  }

  // 主体内容
  .wallet-container {
    width: 100%;
    padding: 1.5rem;
    .wallet-area {
      display: flex;
      width: 100%;
      flex-direction: column;
      border-radius: 6px;
      overflow: hidden;
      .balance-area {
        width: 100%;
        height: 5.2rem;
        background: #fff;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #eee;
        .balance-item-left {
          margin-left: 1.5rem;
          display: flex;
          align-items: center;
          .balace-img {
            height: 2.1rem;
            width: 2.1rem;
            img {
              height: 100%;
              width: 100%;
            }
          }
          .balance-title {
            font-size: 1.5rem;
            color: #333;
            margin-left: 1.5rem;
          }
        }
        .balance-item-right {
          margin-right: 1.5rem;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          .balance-info {
            font-size: 1.5rem;
            color: #333;
            margin-right: 1.5rem;
          }
          .balance-go {
            height: 1.1rem;
            width: 0.6rem;
            margin-bottom: 1rem;
            img {
              height: 100%;
              width: 100%;
            }
          }
        }
      }
    }
  }
}

.bankline {
  margin-top: .8rem
}
</style>
