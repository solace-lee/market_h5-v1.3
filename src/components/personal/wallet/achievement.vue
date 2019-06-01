<template>
  <div class="achievement" ref="achievement">
    <!-- 头部 -->
    <div class="head">
      <div class="bg"></div>
      <div class="head-title">
        <div class="back" @click="$router.go(-1)">
          <img src="../../../../img/index/wallet/back-black.png" alt>
        </div>
        <div class="title">业绩</div>
      </div>
    </div>

    <!-- banner内容 -->
    <div class="point-head">
      <div class="point-head-img">
        <img src="../../../../img/index/wallet/achievement/banner.png" alt>
      </div>
    </div>

    <!-- 我的业绩 -->
    <div class="recommend-container">
      <div class="recommend-title">
        <div class="recommend-title-left">
          <div class="recommend-title-img">
            <img src="../../../../img/index/wallet/achievement/title-icon.png" alt>
          </div>
          <div class="recommend-title-text">我的业绩</div>
        </div>
        <div class="recommend-title-right">
          <div class="recommend-title-info" @click="getmore">明细</div>
          <div class="more-img">
            <img src="../../../../img/index/wallet/achievement/next.png" alt>
          </div>
        </div>
      </div>
      <div class="recommend-area">
        <div class="recommend-value">
          <div class="recommend-value-left">业绩总额</div>
          <div class="recommend-value-red">{{balance}}</div>
        </div>
        <div class="recommend-value" style="display: none;">
          <!-- 隐藏此功能 -->
          <div class="recommend-value-left">昨日收益</div>
          <div class="recommend-value-black">256.62</div>
        </div>
      </div>
      <div class="recommend-btn">
        <div class="recommend-btn-info">结算将业绩自动转入我的余额</div>
        <div class="recommend-button" @click="settlement">结算</div>
      </div>
    </div>

    <!-- 数据展示 -->
    <div class="show-area">
      <div class="show-container">
        <div class="show-list">
          <div class="show-img">
            <img src="../../../../img/index/wallet/achievement/all.png" alt>
          </div>
          <div class="show-right">
            <div class="show-num">58</div>
            <div class="show-title">推广总数</div>
          </div>
        </div>
        <div class="show-list">
          <div class="show-img">
            <img src="../../../../img/index/wallet/achievement/mouth.png" alt>
          </div>
          <div class="show-right">
            <div class="show-num">58</div>
            <div class="show-title">本月推广</div>
          </div>
        </div>
        <div class="show-list">
          <div class="show-img" style="height: 4.3rem;">
            <img src="../../../../img/index/wallet/achievement/shop.png" alt>
          </div>
          <div class="show-right">
            <div class="show-num">58</div>
            <div class="show-title">商店推广</div>
          </div>
        </div>
        <div class="show-list">
          <div class="show-img" style="height: 3rem;">
            <img src="../../../../img/index/wallet/achievement/game.png" alt>
          </div>
          <div class="show-right">
            <div class="show-num">58</div>
            <div class="show-title">游戏推广</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 结算弹窗 -->
    <div class="settlement-box" v-show="showSettlement">
      <div class="settlement-bg">
        <div class="settlement-area">
          <div class="settlement-title">
            <div class="box-title">创业基金结算</div>
            <div class="second-title">本炒作会把您的创业基金全部结算到我的余额</div>
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
      showSettlement: false, // 显示结算弹框
      showOkBox: false // 显示结算已完成弹框
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
        .get(this.HOME + this.USER + "inside/userPerformance")
        .then(res => {
          this.balance = res.data.data.userPerformance;
        });
    },

    // 去创业基金
    gofundinfo() {
      this.$router.push({
        path: "/fundinfo?name=" + "积分明细"
      });
    },

    // 按下了结算按钮
    settlement() {
      if (this.balance != 0) {
        this.showSettlement = true;
      } else {
        Toast("业绩不足", 2000);
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

    //去明细列表
    getmore() {
      this.$router.push({
        path: "/fundinfo?name=" + "业绩明细"
      });
    },

    // 确定结算
    comfirmBtm() {
      this.showSettlement = false;
      let config = {
        consumeAmount: this.balance
        // consumeAmount: 2
      };
      this.$api
        .post(this.HOME + this.USER + "inside/amountPerformance", config)
        .then(res => {
          if (res.data.status == 200) {
            this.balance = res.data.data.walletAmount;
            this.showOkBox = true;
            this.getWallet();
          } else {
            Toast('结算失败，请重试')
          }
          
        });
    }
  }
};
</script>
<style scoped lang='less'>
.achievement {
  width: 100%;
  height: 100vh;
  background: #f2f2f2;

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
  .point-head {
    width: 100%;
    height: 17rem;
    padding: 1.5rem;
    background: #f2f2f2;
    .point-head-img {
      width: 100%;
      height: 14rem;
      border-radius: 6px;
      overflow: hidden;
      img {
        height: 100%;
        width: 100%;
      }
    }
  }

  // 我的业绩
  .recommend-container {
    width: 100%;
    height: 21.8rem;
    padding: 0 1.5rem;
    background: #f2f2f2;
    .recommend-title {
      height: 4.4rem;
      width: 100%;
      border-radius: 6px 6px 0 0;
      background: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 1.5rem;
      border-bottom: 1px solid #eee;
      .recommend-title-left {
        display: flex;
        align-items: center;
        .recommend-title-img {
          height: 1.4rem;
          width: 1.6rem;
          margin-bottom: 0.8rem;
          img {
            height: 100%;
            width: 100%;
          }
        }
        .recommend-title-text {
          font-size: 1.6rem;
          color: #333;
          margin-left: 1.5rem;
          line-height: 4.4rem;
        }
      }
      .recommend-title-right {
        display: flex;
        align-items: center;
        .recommend-title-info {
          margin-right: 0.8rem;
          font-size: 1.2rem;
          color: #999;
          line-height: 4.4rem;
        }
        .more-img {
          height: 0.9rem;
          width: 0.5rem;
          margin-bottom: 1.3rem;
          img {
            height: 100%;
            width: 100%;
          }
        }
      }
    }
    .recommend-area {
      width: 100%;
      padding: 0 1.5rem;
      height: 3.9rem;
      border-bottom: 1px solid #eee;
      background: #fff;
      .recommend-value {
        height: 3.9rem;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        line-height: 3.9rem;
        .recommend-value-left {
          font-size: 1.6rem;
          color: #999;
        }
        .recommend-value-red {
          font-size: 2.2rem;
          color: #ff0000;
        }
        .recommend-value-black {
          font-size: 2.2rem;
          color: #333;
        }
      }
    }
    .recommend-btn {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      height: 9.6rem;
      background: #fff;
      border-radius: 0 0 6px 6px;
      .recommend-btn-info {
        font-size: 1.1rem;
        color: #999;
      }
      .recommend-button {
        height: 4.4rem;
        width: 28rem;
        background: #00b88f;
        border-radius: 6px;
        color: #fff;
        text-align: center;
        line-height: 4.4rem;
        font-size: 1.6rem;
      }
    }
  }

  // 数据展示
  .show-area {
    display: none; // 先隐藏此功能
    width: 100%;
    height: 25.1rem;
    padding: 1.5rem;
    background: #f2f2f2;
    .show-container {
      height: 22.1rem;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      border-radius: 6px;
      overflow: hidden;
      .show-list {
        height: 11.05rem;
        width: 50%;
        background: #fff;
        border: 1px solid #eee;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 2.5rem;
        .show-img {
          width: 4.5rem;
          height: 4.1rem;
          img {
            height: 100%;
            width: 100%;
          }
        }
        .show-right {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-left: 1.5rem;
          border-left: 1px solid #eee;
          .show-num {
            font-size: 3rem;
            color: #333;
          }
          .show-title {
            font-size: 1.2rem;
            color: #999;
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
