<template>
  <div class="remainder">
    <!-- 头部 -->
    <div class="head">
      <div class="bg"></div>
      <div class="head-title">
        <div class="back">
          <!-- <img src="../../../../img/index/wallet/back-black.png" alt=""> -->
        </div>
        <div class="title">余额提现</div>
      </div>
    </div>

    <!-- banner内容 -->
    <div class="car-head">
      <div class="car-head-container">
        <div class="car-area">
          <div class="car-img">
            <img src="../../../../img/index/wallet/remainder/gold.png" alt>
          </div>
          <div class="car-info">
            <div class="car-title">中国工商银行</div>
            <div class="car-number">{{balance}}</div>
          </div>
        </div>
        <div class="next-area">
          <div class="next-img">
            <img src="../../../../img/index/wallet/next.png" alt>
          </div>
        </div>
      </div>
    </div>

    <!-- 金额区 -->
    <div class="number-comtainer">
      <div class="number-area">
        <div class="info-area">
          <div class="info-left">提现金额</div>
          <div class="info-right">￥600.00</div>
        </div>
        <div class="info-area">
          <div class="info-left">手续费</div>
          <div class="info-right">￥6.00</div>
        </div>
        <div class="info-area">
          <div class="info-left">到账卡</div>
          <div class="info-right">工商银行(1974)</div>
        </div>
      </div>
    </div>

    <!-- 按钮区 -->
    <div class="remainder-btn">
      <div class="remainder-top">
        <div class="remainder-comfirm" @click="postcash">完成</div>
        <!-- <div class="remainder-info">资金明细
            <img src="../../../../img/index/wallet/next.png" alt="">
        </div>-->
      </div>
      <div class="remainder-bottom">
        <!-- 结算将创业基金和业绩自动转入我的余额 -->
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
      cash: 0 //结算金额
    };
  },

  watch: {},

  created() {
    this.getWallet();
  },

  mounted() {},
  methods: {
    // 获取钱包信息
    getWallet() {
      this.$http
        .get(this.HOME + this.USER + "/userAmount/1288")
        .then(res => {
          this.balance = res.data.data.amount;
          this.cash = res.data.data.amount;
        });
    },

    // 按下完成按钮
    postcash() {
      if (this.$route.query.name == "余额提现") {
        // console.log("成了");
        this.$router.replace({
          path: "/remainder"
        });
      }
    }
  }
};
</script>
<style scoped lang='less'>
.remainder {
  width: 100%;
  height: 100vh;
  background: #f2f2f2;
  position: relative;

  // 头部
  .head {
    width: 100%;
    height: 4.7rem;
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
      background: #fff;
      border-bottom: 1px solid #eee;
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
        color: #333;
      }
    }
  }

  // banner内容
  .car-head {
    width: 100%;
    height: 12.5rem;
    padding: 1.5rem;
    background: #fff;
    overflow: hidden;
    .car-head-container {
      width: 100%;
      display: flex;
      background: #fff;
      border-radius: 6px;
      justify-content: space-between;
      align-items: center;
      .car-area {
        display: flex;
        align-items: center;
        .car-img {
          height: 3.4rem;
          width: 3.4rem;
          img {
            height: 100%;
            width: 100%;
          }
        }
        .car-info {
          margin-left: 1.5rem;
          .car-title {
            font-size: 1.5rem;
            color: #333;
          }
          .car-number {
            font-size: 1.3rem;
            color: #666;
          }
        }
      }
      .next-area {
        width: 1.5rem;
        height: 100%;
        .next-img {
          height: 1.1rem;
          width: 0.6rem;
          margin-bottom: 1.2rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }

  // 金额区
  .number-comtainer {
    width: 100%;
    height: 12.1rem;
    padding: 1.5rem 0;
    background: #f2f2f2;
    overflow: hidden;
    .number-area {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      background: #fff;
      border-radius: 6px;
      padding: 1rem 1.5rem;
      overflow: hidden;
      justify-content: space-between;
      .info-area {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .info-left {
          font-size: 1.2rem;
          color: #999;
        }
        .info-right {
          font-size: 1.3rem;
          color: #333;
        }
      }
    }
  }

  // 按钮区
  .remainder-btn {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 22.4rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .remainder-top {
      display: flex;
      flex-direction: column;
      align-items: center;
      .remainder-comfirm {
        width: 28rem;
        height: 4.4rem;
        background: #fff;
        border: 1px solid #00ae87;
        color: #00ae87;
        font-size: 1.6rem;
        text-align: center;
        line-height: 4.4rem;
        border-radius: 6px;
      }
      .remainder-info {
        margin-top: 1.5rem;
        font-size: 1.4rem;
        img {
          height: 0.9rem;
          width: 0.6rem;
          margin-left: 0.6rem;
        }
      }
    }
    .remainder-bottom {
      font-size: 1.1rem;
      color: #999;
      margin-bottom: 1rem;
    }
  }
}
</style>
