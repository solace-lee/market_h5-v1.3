<template>
  <div class="fund">
    <!-- 头部 -->
    <div class="head">
      <div class="bg">
        <img src="../../../../img/index/wallet/redbag/bg.png" alt>
      </div>
      <div class="head-title">
        <div class="back" @click="$router.go(-1)">
          <img src="../../../../img/index/wallet/back.png" alt>
        </div>
        <div class="title">优惠红包</div>
      </div>
    </div>

    <!-- 主体内容 -->
    <div class="fund-container">
      <div class="fund-area">
        <!-- 红包累计 -->
        <div class="redbag-show">
          <div class="redbag-title">
            <div class="redbag-info">红&nbsp;包&nbsp;累&nbsp;计</div>
          </div>
          <div class="redbag-next" @click="settlementInfo">
            <div class="redbag-text">明细</div>
            <div class="next-img">
              <img src="../../../../img/index/wallet/next.png" alt>
            </div>
          </div>
          <div class="radbag-value">
            <div class="redbag-data">
              <span>{{parseInt(balance)}}</span>
              .{{fixbalance}}元
            </div>
          </div>
        </div>

        <!-- 红包大派送 -->
        <div class="redbagimg">
          <div class="redimg">
            <img src="../../../../img/index/wallet/redbag/people.png">
          </div>
        </div>

        <!-- 红包说明 -->
        <div class="balance-area">
          <div class="text-bg">
            <div class="text1">领取说明</div>
            <div class="text2">1.新人用户注册立即赠送优惠体验大红包。</div>
            <div class="text2">2.用户邀请好友注册成功，可额外获得优惠体验大红包一份，多邀请多优惠。</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  components: {},
  data() {
    return {
      balance: 0, // 创业基金总额
      fixbalance: 0 // 红包小数部分
    };
  },
  watch: {
    balance() {
      this.fixbalance =
        (this.balance - parseInt(this.balance)).toFixed(2) * 100;
    }
  },
  created() {
    this.getWallet();
  },
  methods: {
    // 获取红包信息
    getWallet() {
      this.$api
        .get(this.HOME + this.USER + "inside/redPacket/redPacketAmount")
        .then(res => {
          this.balance = res.data.data.amount;
        });
    },

    // 点击明细
    settlementInfo() {
      this.$router.push({
        path: "/fundinfo?name=" + "红包明细"
      });
    }
  }
};
</script>
<style scoped lang='less'>
.fund {
  width: 100%;
  height: 100vh;
  background: #300453;
  position: absolute;
  // 头部
  .head {
    width: 100%;
    display: flex;
    flex-direction: column;
    .bg {
      position: absolute;
      top: 4.7rem;
      left: 0;
      bottom: 0;
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
  .fund-container {
    position: relative;
    top: 4.7rem;
    left: 0;
    width: 100%;
    padding: 1.5rem;
    .fund-area {
      display: flex;
      width: 100%;
      flex-direction: column;
      // 红包累计
      .redbag-show {
        width: 100%;
        position: relative;
        .redbag-title {
          margin: 0 auto;
          width: 14.4rem;
          height: 3.6rem;
          background-image: url("../../../../img/index/wallet/redbag/font-box.png");
          background-repeat: repeat-x;
          background-size: 25% 100%;
          .redbag-info {
            width: 100%;
            height: 100%;
            font-size: 1.6rem;
            color: #ffd0a3;
            font-weight: bold;
            line-height: 3.6rem;
            letter-spacing: 0.8rem;
            padding-left: 0.9rem;
          }
        }
        .redbag-next {
          position: absolute;
          right: 2rem;
          top: 0;
          height: 3.6rem;
          display: flex;
          align-items: center;
          .redbag-text {
            line-height: 3.6rem;
            font-size: 1.2rem;
            color: #666;
          }
          .next-img {
            margin-left: 1rem;
            margin-bottom: 1.3rem;
            width: 0.5rem;
            height: 0.9rem;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
        .radbag-value {
          width: 100%;
          height: 7.1rem;
          margin-top: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          .redbag-data {
            border: 1px solid #ccc;
            padding: 0 2rem;
            font-size: 3rem;
            color: #a50505;
            span {
              font-size: 5rem;
              font-weight: bold;
            }
          }
        }
      }

      // 红包大派送
      .redbagimg {
        margin-top: 3.5rem;
        width: 100%;
        height: 29rem;
        display: flex;
        justify-content: center;
        .redimg {
          height: 29rem;
          width: 100%;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }

      // 红包说明
      .balance-area {
        width: 100%;
        display: flex;
        justify-content: center;
        .text-bg {
          width: 31.5rem;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 6px;
          padding: 1.5rem;
          .text1 {
            color: #fff;
            font-size: 1.3rem;
            margin-bottom: 1rem;
          }
          .text2 {
            color: #ff854d;
            font-size: 1.2rem;
          }
        }
      }
    }
  }

  // 结算弹框
  .settlement-box {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    .settlement-bg {
      width: 100%;
      height: 34.5rem;
      padding: 0 1.5rem;
      .settlement-area {
        background: #fff;
        height: 100%;
        width: 100%;
        border-radius: 6px;
        .settlement-title {
          height: 8.8rem;
          width: 100%;
          background: #00ae87;
          color: #fff;
          border-radius: 6px 6px 0 0;
          display: flex;
          flex-direction: column;
          // justify-content: space-around;
          align-items: center;
          .box-title {
            font-size: 1.9rem;
            margin-top: 1.5rem;
          }
          .second-title {
            font-size: 1.3rem;
            color: rgba(255, 255, 255, 0.7);
            margin: 1rem 0;
          }
        }
        .settlement-container {
          width: 100%;
          height: 25.7rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .fund-text {
            width: 100%;
            font-size: 1.3rem;
            color: #999;
            padding: 2rem 1.5rem 0 1.5rem;
          }
          .settlement-num {
            font-size: 4rem;
            color: #333;
            width: 100%;
            text-align: center;
            span {
              font-size: 6rem;
            }
          }
          .btn-btn {
            height: 7rem;
            display: flex;
            justify-content: space-around;
            align-items: center;
            font-size: 1.8rem;
            border-top: 1px solid #eee;
            .cancel {
              width: 10.5rem;
              height: 4rem;
              border-radius: 2rem;
              border: 1px solid #eee;
              text-align: center;
              line-height: 4rem;
            }
            .comfirm {
              width: 10.5rem;
              height: 4rem;
              border-radius: 2rem;
              // border: 1px solid #00ae87;
              text-align: center;
              line-height: 4rem;
              background: #00ae87;
              color: #fff;
            }
          }
        }
        .settlement-finaly {
          width: 100%;
          height: 100%;
          text-align: center;
          padding-top: 2rem;
          position: relative;
          // display: flex;
          // flex-direction: column;
          // justify-content: space-between;
          // align-items: center;
          .yes-img {
            height: 8.6rem;
            width: 8.6rem;
            background: #999;
            border-radius: 50%;
            margin: 0 auto;
            img {
              height: 100%;
              width: 100%;
            }
          }
          .text1 {
            font-size: 1.9rem;
            color: #00ae87;
            margin-top: 1.5rem;
          }
          .text2 {
            margin-top: 1rem;
            font-size: 1.4rem;
            color: #666;
          }
          .okBtn {
            position: absolute;
            width: 100%;
            bottom: 0;
            left: 0;
            height: 7rem;
            display: flex;
            justify-content: center;
            align-items: center;
            border-top: 1px solid #eee;
            .okText {
              width: 10.5rem;
              height: 4rem;
              border-radius: 2rem;
              background: #00ae87;
              text-align: center;
              line-height: 4rem;
              color: #fff;
              font-size: 1.8rem;
            }
          }
        }
      }
    }
  }
}
</style>
