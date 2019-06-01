<template>
  <div class="fund">
    <!-- 头部 -->
    <div class="head">
      <div class="bg">
        <img src="../../../../img/index/wallet/fund/bg.png" alt>
      </div>
      <div class="head-title">
        <div class="back" @click="$router.go(-1)">
          <img src="../../../../img/index/wallet/back.png" alt>
        </div>
        <div class="title">创业基金</div>
      </div>
    </div>

    <!-- 主体内容 -->
    <div class="fund-container">
      <div class="fund-area">
        <!-- 余额 -->
        <div class="balance-area">
          <div class="line">
            <img src="../../../../img/index/wallet/fund/line.png" alt>
          </div>
          <div class="bg-container">
            <div class="fund-title">基金余额(元)</div>
            <div class="balance-num">{{balance}}</div>
            <div class="text">结算将创业基金自动转入我的余额</div>
            <div class="settlement" @click="settlement">结算</div>
            <div class="settlement-info" @click="settlementInfo">
              <div class="settlement-btn">基金明细</div>
              <div class="settlement-go">
                <img src="../../../../img/index/wallet/fund/next.png" alt>
              </div>
            </div>
          </div>
        </div>

        <div class="other">
          <div class="other-container">
            <img src="../../../../img/index/wallet/fund/info.png" alt>
          </div>
        </div>
      </div>

      <!-- 结算弹窗 -->
      <div class="settlement-box" v-show="showSettlement">
        <div class="settlement-bg">
          <div class="settlement-area">
            <div class="settlement-title">
              <div class="box-title">创业基金结算</div>
              <div class="second-title">本操作会把您的创业基金全部结算到我的余额</div>
            </div>
            <div class="settlement-container">
              <div class="fund-text">结算额度</div>
              <div class="settlement-num">￥
                <span>{{balance}}</span>
              </div>
              <div class="btn-btn">
                <div class="cancel" @click="cancel">取消</div>
                <div class="comfirm" @click="comfirmBtm">确定</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 已完成弹窗 -->
      <div class="settlement-box" v-show="showOkBox">
        <div class="settlement-bg">
          <div class="settlement-area">
            <div class="settlement-finaly">
              <div class="yes-img">
                <img src="../../../../img/index/wallet/fund/true.png" alt>
              </div>
              <div class="text1">结算已完成</div>
              <div class="text2">1.参与推广活动可获得相应的基金奖励</div>
              <div class="text2">2.基金可以结算到余额也可以购买商品</div>
              <div class="okBtn">
                <div class="okText" @click="okbtn">我知道了</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { formatDate } from "../assets/js/data.js";
import { Toast } from "vant";
export default {
  components: {},
  // filters: {
  // 	formatDate(time) {
  // 		var date = new Date(time);
  // 		return formatDate(date, "yyyy-MM-dd hh:mm");
  // 	}
  // },
  data() {
    return {
      showSettlement: false, // 显示结算弹框
      showOkBox: false, // 显示结算已完成弹框
      balance: 0 // 创业基金总额
    };
  },
  created() {
    this.getWallet();
  },
  methods: {
    // 按下了结算按钮
    settlement() {
      if (this.balance != 0) {
        this.showSettlement = true;
      } else {
        Toast("基金余额不足", 2000);
      }
    },

    // 获取钱包信息
    getWallet() {
      this.$api
        .get(this.HOME + this.USER + "inside/ventureAmount")
        .then(res => {
          this.balance = res.data.data.walletAmount;
        });
    },

    // 取消结算
    cancel() {
      this.showSettlement = false;
    },

    // 结算已完成按钮
    okbtn() {
      this.showOkBox = false;
    },

    // 确定结算
    comfirmBtm() {
      this.showSettlement = false;
      let config = {
        walletType: 13,
        detailsAmount: this.balance
      };
      this.$api
        .post(this.HOME + this.USER + "inside/accountUserVenture", config)
        .then(res => {
          // console.log(res.data.status);

          if (res.data.status == 200) {
            this.balance = res.data.data.walletAmount;
            this.showOkBox = true;
            this.getWallet();
          } else {
            Toast("结算失败请重试", 2000);
          }
        });
    },

    // 点击基金明细
    settlementInfo() {
      this.$router.push({
        path: "/fundinfo?name=" + "基金明细"
      });
    },

    // 去创业基金
    gofund() {
      this.$router.push({
        path: "/fund"
      });
    }
  }
};
</script>
<style scoped lang='less'>
.fund {
  width: 100%;
  background: #f2f2f2;
  position: absolute;
  // 头部
  .head {
    width: 100%;
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
  .fund-container {
    position: relative;
    top: 24.8rem;
    // top: 20rem;
    left: 0;
    width: 100%;
    padding: 1.5rem;
    .fund-area {
      display: flex;
      width: 100%;
      flex-direction: column;
      border-radius: 6px;
      overflow: hidden;
      .balance-area {
        width: 100%;
        height: 27rem;
        display: flex;
        flex-direction: column;
        .line {
          left: 0;
          height: 1rem;
          width: 100%;
          img {
            height: 100%;
            width: 100%;
          }
        }
        .bg-container {
          background: #fff;
          height: 100%;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          border-radius: 0 0 6px 6px;
          .fund-title {
            color: #00ae87;
            font-size: 1.6rem;
            margin-top: 1rem;
          }
          .balance-num {
            color: #333;
            font-size: 5rem;
            margin: 2rem 0;
          }
          .text {
            color: #999;
            font-size: 1.1rem;
            margin-top: 1rem;
          }
          .settlement {
            color: #fff;
            font-size: 1.6rem;
            margin-top: 1rem;
            height: 4.4rem;
            width: 28rem;
            background: #00ae87;
            border-radius: 6px;
            text-align: center;
            line-height: 4.4rem;
          }
          .settlement-info {
            display: flex;
            margin-top: 1rem;
            .settlement-btn {
              font-size: 1.4rem;
              color: #333;
            }
            .settlement-go {
              height: 1.1rem;
              width: 0.6rem;
              margin-left: 0.6rem;
              margin-top: -0.2rem;
              img {
                height: 100%;
                width: 100%;
              }
            }
          }
        }
      }
      .other {
        width: 100%;
        padding: 1.5rem 0;
        .other-container {
          height: 23rem;
          width: 100%;
          border-radius: 6px;
          overflow: hidden;
          img {
            height: 100%;
            width: 100%;
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
    background: rgba(0, 0, 0, 0.7);
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
            font-size: 1.4rem;
            color: rgba(255, 255, 255, 0.9);
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
