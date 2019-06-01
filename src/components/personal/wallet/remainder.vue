<template>
  <div class="remainder">
    <!-- 头部 -->
    <div class="head">
      <div class="bg"></div>
      <div class="head-title">
        <div class="back" @click="$router.go(-1)">
          <img src="../../../../img/index/wallet/back.png" alt>
        </div>
        <div class="title">余额</div>
      </div>
    </div>

    <!-- banner内容 -->
    <div class="point-head">
      <div class="point-head-img">
        <img src="../../../../img/index/wallet/remainder/gold.png" alt>
      </div>
      <div class="remainder-title">账户余额(元)</div>
      <div class="remainder-number">{{balance}}</div>
    </div>

    <!-- 按钮区 -->
    <div class="remainder-btn">
      <div class="remainder-top">
        <div class="remainder-comfirm" @click="postcash">提现</div>
        <div class="remainder-info" @click="goremainderinfo">
          资金明细
          <img src="../../../../img/index/wallet/next.png" alt>
        </div>
      </div>
      <div class="remainder-bottom">结算将创业基金和业绩自动转入我的余额</div>
    </div>

    <!-- 结算弹窗
      <div class="settlement-box" v-show="showSettlement">
        <div class="settlement-bg">
          <div class="settlement-area">
            <div class="settlement-title">
              <div class="box-title">创业基金结算</div>
              <div class="second-title">本炒作会把您的创业基金全部结算到我的余额</div>
            </div>
            <div class="settlement-container">
              <div class="fund-text">结算额度</div>
              <div class="settlement-num">￥<span>{{balance}}</span></div>
              <div class="btn-btn">
                <div class="cancel" @click="cancel">取消</div>
                <div class="comfirm" @click="comfirmBtm">确定</div>
              </div>
            </div>
          </div>
        </div>
    </div>-->
    <!-- 已完成弹窗 -->
    <!-- <div class="settlement-box" v-show="showOkBox">
        <div class="settlement-bg">
          <div class="settlement-area">
            <div class="settlement-finaly">
             <div class="yes-img">
               <img src="" alt="">
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
    </div>-->
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
      token: "",
      showSettlement: false, // 显示结算弹框
      showOkBox: false // 显示结算已完成弹框
    };
  },
  created() {
    this.token = window.localStorage.getItem("token");
    this.getWallet();
  },

  mounted() {},
  methods: {
    // 获取钱包信息
    getWallet() {
      this.$http
        .get(this.HOME + this.USER + "inside/userAmount")
        .then(res => {
          this.balance = res.data.data.amount;
        });
    },

    // 去余额明细
    goremainderinfo() {
      this.$router.push({
        path: "/fundinfo?name=" + "余额明细"
      });
    },

    // 去提现
    postcash() {
      this.$router.push({
        path: "/getCash?name=" + "提现"
      });
    },

    // 按下了结算按钮
    settlement() {
      if (this.balance != 0) {
        this.showSettlement = true;
      }
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
        detailsAmount: this.balance,
        userId: 1288 // 解决登录后替换
      };
      this.$http
        .post(this.HOME + this.USER + "/accountUserVenture", config)
        .then(res => {
          this.balance = res.data.data.walletAmount;
          this.showOkBox = true;
          this.getWallet();
        });
    }
  }
};
</script>
<style scoped lang='less'>
.remainder {
  width: 100%;
  height: 100vh;
  background: #fff;
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
      background: #00ae87;
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

  // banner内容
  .point-head {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .point-head-img {
      width: 7.1rem;
      height: 7.1rem;
      margin-top: 4rem;
      img {
        height: 100%;
        width: 100%;
      }
    }
    .remainder-title {
      margin-top: 4rem;
      font-size: 1.2rem;
      color: #666;
    }
    .remainder-number {
      margin-top: 1rem;
      font-size: 5rem;
      color: #333;
      font-weight: bold;
      // font-family: 'DINPro-Medium';
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
        background: #00ae87;
        color: #fff;
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

  // // 结算弹框
  // .settlement-box {
  //   position: fixed;
  //   top: 0;
  //   left: 0;
  //   height: 100vh;
  //   width: 100vw;
  //   background: rgba(0, 0, 0, .5);
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  //   .settlement-bg {
  //     width: 100%;
  //     height: 34.5rem;
  //     padding: 0 1.5rem;
  //     .settlement-area {
  //       background: #fff;
  //       height: 100%;
  //       width: 100%;
  //       border-radius: 6px;
  //       .settlement-title {
  //         height: 8.8rem;
  //         width: 100%;
  //         background: #00ae87;
  //         color: #fff;
  //         border-radius: 6px 6px 0 0;
  //         display: flex;
  //         flex-direction: column;
  //         // justify-content: space-around;
  //         align-items: center;
  //         .box-title {
  //           font-size: 1.9rem;
  //           margin-top: 1.5rem;
  //         }
  //         .second-title {
  //           font-size: 1.3rem;
  //           color: rgba(255, 255, 255, .7);
  //           margin: 1rem 0;
  //         }
  //       }
  //       .settlement-container {
  //         width: 100%;
  //         height: 25.7rem;
  //         display: flex;
  //         flex-direction: column;
  //         justify-content: space-between;
  //         .fund-text {
  //           width: 100%;
  //           font-size: 1.3rem;
  //           color: #999;
  //           padding: 2rem 1.5rem 0 1.5rem;
  //         }
  //         .settlement-num {
  //           font-size: 4rem;
  //           color: #333;
  //           width: 100%;
  //           text-align: center;
  //           span {
  //             font-size: 6rem;
  //           }
  //         }
  //         .btn-btn {
  //           height: 7rem;
  //           display: flex;
  //           justify-content: space-around;
  //           align-items: center;
  //           font-size: 1.8rem;
  //           border-top: 1px solid #eee;
  //           .cancel {
  //             width: 10.5rem;
  //             height: 4rem;
  //             border-radius: 2rem;
  //             border: 1px solid #eee;
  //             text-align: center;
  //             line-height: 4rem;
  //           }
  //           .comfirm {
  //             width: 10.5rem;
  //             height: 4rem;
  //             border-radius: 2rem;
  //             // border: 1px solid #00ae87;
  //             text-align: center;
  //             line-height: 4rem;
  //             background: #00ae87;
  //             color: #fff;
  //           }
  //         }

  //       }
  //       .settlement-finaly {
  //         width: 100%;
  //         height: 100%;
  //         text-align: center;
  //         padding-top: 2rem;
  //         position: relative;
  //         // display: flex;
  //         // flex-direction: column;
  //         // justify-content: space-between;
  //         // align-items: center;
  //         .yes-img {
  //           height: 8.6rem;
  //           width: 8.6rem;
  //           background: #999;
  //           border-radius: 50%;
  //           margin: 0 auto;
  //           img {
  //             height: 100%;
  //             width: 100%;
  //           }
  //         }
  //         .text1 {
  //           font-size: 1.9rem;
  //           color: #00ae87;
  //           margin-top: 1.5rem;
  //         }
  //         .text2 {
  //           margin-top: 1rem;
  //           font-size: 1.4rem;
  //           color: #666;
  //         }
  //         .okBtn {
  //           position: absolute;
  //           width: 100%;
  //           bottom: 0;
  //           left: 0;
  //           height: 7rem;
  //           display: flex;
  //           justify-content: center;
  //           align-items: center;
  //           border-top: 1px solid #eee;
  //           .okText {
  //             width: 10.5rem;
  //             height: 4rem;
  //             border-radius: 2rem;
  //             background: #00ae87;
  //             text-align: center;
  //             line-height: 4rem;
  //             color: #fff;
  //             font-size: 1.8rem;
  //           }
  //         }
  //       }
  //     }
  //   }
  // }
}
</style>
