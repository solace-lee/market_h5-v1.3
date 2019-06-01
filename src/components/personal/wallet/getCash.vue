<template>
  <div class="remainder">
    <!-- 头部 -->
    <div class="head">
      <div class="bg"></div>
      <div class="head-title">
        <div class="back" @click="$router.go(-1)">
          <img src="../../../../img/index/wallet/back-black.png" alt>
        </div>
        <div class="title">提现</div>
      </div>
    </div>

    <!-- banner内容 -->
    <div class="car-head" v-if="!noCard">
      <div class="car-head-container" @click="changecar">
        <div class="car-area">
          <!-- <div class="car-img">
            <img :src="cardInfo.bank_img" alt>
          </div> -->
          <div class="car-info">
            <div class="car-title">{{cardInfo.bankName}}</div>
            <div class="car-number">储蓄卡号:{{cardInfo.bankNum}}</div>
          </div>
        </div>
        <div class="next-area">
          <div class="next-img">
            <img src="../../../../img/index/wallet/next.png" alt>
          </div>
        </div>
      </div>
    </div>
    <!-- 没有银行卡 -->
    <div class="nocar-head" v-if="noCard">
      <div class="nocar-head-container" @click="addCard">
        <div class="nocar-area">
          <span>+</span>添加银行
        </div>
      </div>
    </div>

    <!-- 金额区 -->
    <div class="number-comtainer">
      <div class="number-area">
        <div class="number-title">提现金额</div>
        <div class="imput-area">
          <span>￥</span>
          <input type="number" v-model="cash" placeholder="请输入金额">
        </div>
        <div class="number-alert">
          <div class="alert-text" v-show="pass">金额已超过可提现额度或有误</div>
        </div>
      </div>
    </div>

    <!-- 按钮区 -->
    <div class="remainder-btn">
      <div class="remainder-top">
        <div class="remainder-comfirm" @click="postcash">提现</div>
        <!-- <div class="remainder-info">资金明细
            <img src="../../../../img/index/wallet/next.png" alt="">
        </div>-->
      </div>
      <div class="remainder-bottom">
        <!-- 结算将创业基金和业绩自动转入我的余额 -->
      </div>
    </div>

    <!-- 提现弹窗 +密码，二期再做 -->
    <div class="settlement-box" v-show="showSettlement">
      <div class="settlement-bg">
        <div class="settlement-area">
          <div class="settlement-title">
            <div class="box-title">请输入提取密码</div>
            <div class="second-img" @click="postcash">
              <img src alt>
            </div>
          </div>
          <div class="settlement-container">
            <div class="fund-text">提现</div>
            <div class="settlement-num">
              ￥
              <span>{{balance}}</span>
            </div>
            <div class="settlement-minnum">扣除￥手续费</div>
            <div class="btn-btn">
              <van-password-input :value="value" info @focus="showKeyboard = true"/>

              <!-- 数字键盘 -->
              <van-number-keyboard
                :show="showKeyboard"
                @input="onInput"
                @delete="onDelete"
                @blur="showKeyboard = false"
              />
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
            <div class="text1">提现申请已提交</div>
            <div class="text2">提现详情及状态请到余额明细中查看</div>
            <!-- <div class="text2">2.基金可以结算到余额也可以购买商品</div> -->
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
      showOkBox: false, // 显示结算已完成弹框
      cash: 0, //结算金额
      pass: false, //输入金额是否合法
      value: "", // 密码
      showKeyboard: true,
      cardInfo: {}, // 选择好后的银行卡信息
      carList: [], // 卡列表
      noCard: true // 没有卡
    };
  },

  watch: {
    cash() {
      if (this.cash > this.balance || this.cash <= 0) {
        this.pass = true;
      } else {
        this.pass = false;
      }
    }
  },

  mounted() {
    // 获取银行卡信息
    this.getCard();
    // 获取余额数
    this.getWallet();
  },
  methods: {
    // 获取余额数
    getWallet() {
      this.$api
        .get(this.HOME + this.USER + "inside/userAmount")
        .then(res => {
          this.balance = res.data.data.amount;
          this.cash = res.data.data.amount;
        });
    },

    // 获取银行卡信息
    getCard() {
      let card = JSON.parse(window.sessionStorage.getItem("cardInfo") || false);
      if (card) {
        this.cardInfo = card;
        this.noCard = false;
        // 删除缓存中选中银行卡
        window.sessionStorage.removeItem("cardInfo");
      } else {
        this.$api
          .get(this.HOME + this.USER + "inside/showUserBank")
          .then(res => {
            this.carList = res.data.data;
            if (this.carList.length == 0) {
              this.noCard = true;
            } else {
              this.noCard = false;
              //挑出默认卡
              this.carList.forEach((element, index) => {
                if (element.isDefault == 0 && element.status == 1) {
                  this.cardInfo = element;
                }
              });

              // 没有默认卡就选择第一张可用卡
              const isobj = JSON.stringify(this.cardInfo);
              if (isobj == "{}") {
                for (let i = 0; i < this.carList.length; i++) {
                  if (this.carList[i].status == 1) {
                    // console.log(this.carList[i]);
                    this.cardInfo = this.carList[i];
                    break;
                  }
                }
              }
            }
          });
      }
    },

    // 密码输入动作
    onInput(key) {
      this.value = (this.value + key).slice(0, 6);
      if (this.value.length == 6) {
        // console.log("够了");
        this.$router.replace({
          path: "/getCashSuccess?name=余额提现"
        });
      }
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    },

    // 按下提现按钮
    postcash() {
      if (this.balance != 0 && this.pass == false) {
        // 清除密码
        this.value = "";
        let config = {
          transferBankAccount: this.cardInfo.bankNum,
          transferUserName: this.cardInfo.userBankName,
          withdrawAmount: this.cash
        };
        this.$api
          .post(this.HOME + this.USER + "inside/withdrawAmount", config)
          .then(res => {
            console.log(res.data.status);
            if (res.data.status == 200 ) {
              this.showOkBox = true;
            } else {
              Toast("提现失败请重试");
            }
          });
      } else {
        Toast("输入有误请重新输入");
      }
    },

    // 更改卡
    changecar() {
      this.$router.push({
        path: "/chooseCar"
      });
    },

    //去添加银行卡
    addCard() {
      this.$router.push({
        path: "/addCard?name=添加银行卡"
      });
    },

    // 取消结算
    cancel() {
      this.showSettlement = false;
    },

    // 结算已完成按钮
    okbtn() {
      this.showOkBox = false;
      this.$router.go(-1);
    },

    // 确定结算
    comfirmBtm() {
      this.showSettlement = false;
      let config = {
        walletType: 13,
        detailsAmount: this.balance
      };
      this.$api
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
    height: 9.5rem;
    padding: 1.5rem;
    overflow: hidden;
    .car-head-container {
      width: 100%;
      display: flex;
      background: #fff;
      border-radius: 6px;
      padding: 1.5rem;
      justify-content: space-between;
      align-items: center;
      .car-area {
        display: flex;
        align-items: center;
        .car-img {
          height: 3.4rem;
          width: 3.4rem;
          border-radius: 50%;
          overflow: hidden;
          img {
            height: 100%;
            width: 100%;
          }
        }
        .car-info {
          // margin-left: 1.5rem;
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

  //没有银行卡
  .nocar-head {
    width: 100%;
    height: 9.5rem;
    padding: 1.5rem;
    overflow: hidden;
    .nocar-head-container {
      width: 100%;
      display: flex;
      border-radius: 6px;
      border: 1px dashed #ccc;
      padding: 1.5rem;
      height: 100%;
      align-items: center;
      .nocar-area {
        width: 100%;
        font-size: 1.4rem;
        display: flex;
        justify-content: center;
        align-items: center;
        line-height: 4rem;
        span {
          font-size: 2.5rem;
          margin: 0 0.6rem;
        }
      }
    }
  }

  // 金额区
  .number-comtainer {
    width: 100%;
    height: 14.2rem;
    padding: 0 1.5rem;
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
      .number-title {
        font-size: 1.5rem;
        color: #333;
      }
      .imput-area {
        display: flex;
        align-items: center;
        border-bottom: 1px solid #eee;
        span {
          font-size: 2.5rem;
          color: #333;
          margin-top: 1.5rem;
        }
        input {
          color: #333;
          font-size: 4rem;
          width: 80%;
        }
        input::-webkit-input-placeholder {
          color: #666;
          font-size: 4rem;
          // line-height: 2rem;
        }
      }
      .number-alert {
        color: #f8464d;
        font-size: 1.2rem;
        height: 1.7rem;
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

  // 提现弹窗
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
      margin-top: 6rem;
      width: 100%;
      height: 26.4rem;
      padding: 0 1.5rem;
      .settlement-area {
        background: #fff;
        height: 100%;
        width: 100%;
        border-radius: 6px;
        .settlement-title {
          height: 5rem;
          width: 100%;
          color: #333;
          border-radius: 6px 6px 0 0;
          display: flex;
          justify-content: center;
          position: relative;
          border-bottom: 1px solid #eee;
          align-items: center;
          padding: 0.5rem;
          .box-title {
            font-size: 2rem;
            line-height: 3.9rem;
          }
          .second-img {
            position: absolute;
            right: 1.5rem;
            width: 1rem;
            height: 1rem;
            background: #333;
            img {
              height: 100%;
              width: 100%;
            }
          }
        }
        .settlement-container {
          width: 100%;
          height: 21.4rem;
          display: flex;
          flex-direction: column;
          // justify-content: space-between;
          align-items: center;
          .fund-text {
            width: 100%;
            font-size: 1.4rem;
            color: #333;
            margin-top: 1rem;
            text-align: center;
          }
          .settlement-num {
            font-size: 4.5rem;
            color: #333;
            width: 100%;
            text-align: center;
            span {
              font-size: 6rem;
            }
          }
          .settlement-minnum {
            font-size: 1.2rem;
            color: #999;
          }
          .btn-btn {
            height: 6rem;
            width: 90%;
            padding: 1rem;
            // border-top: 1px solid #eee;
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
  .van-password-input {
    width: 100%;
    margin: 0;
  }
}
</style>
