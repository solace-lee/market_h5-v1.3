<template>
  <div class="remainder">
    <!-- 头部 -->
    <div class="head">
      <div class="head-title">
        <div class="back" @click="$router.go(-1)">
          <img src="../../../../img/index/wallet/back-black.png" alt>
        </div>
        <div class="title">{{title}}</div>
        <div class="add"></div>
      </div>
    </div>

    <!-- 内容区 -->
    <div class="car-head">
      <div class="add-card">
        <div class="add-card-title" v-if="title == '添加银行卡'">请填写你的银行卡资料</div>
        <div class="add-card-title" v-if="title == '编辑银行卡'">请修改你的银行卡资料</div>
        <div class="add-card-area">
          <!-- 卡号 -->
          <div class="bank-item">
            <div class="item-title">卡号</div>
            <input class="item-info" type="number" v-model="bankNum" placeholder="请输入银行卡号">
            <div class="next-img"></div>
          </div>
          <!-- 开户行 -->
          <div class="bank-item">
            <div class="item-title">开户行</div>
            <input class="item-info" v-model="transferBankName" placeholder="请输入卡号所属支行名">
            <div class="next-img">
              <!-- <img src="" alt="" /> -->
            </div>
          </div>
          <!-- 姓名 -->
          <div class="bank-item">
            <div class="item-title">姓名</div>
            <input class="item-info" v-model="userBankName" placeholder="请输入本人姓名">
            <div class="next-img"></div>
          </div>
          <!-- 银行名 -->
          <div class="bank-item">
            <div class="item-title">银行名称</div>
            <input class="item-info" disabled v-model="bankName" placeholder="请输入卡号所属银行">
            <div class="next-img">
              <!-- <img src="" alt="" /> -->
            </div>
          </div>
        </div>
        <div class="car-confirm">
          <div class="ok-btn" @click="clickAddCard">完成</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
var BIN = require("bankcardinfo");
export default {
  components: {},
  data() {
    return {
      editCard: {}, // 选中的卡
      title: "", // 标题名称
      bankName: "", // 银行名
      transferBankName: "", // 支行名称
      userBankName: "", //姓名
      bankNum: "" //卡号
    };
  },
  watch: {
    bankNum() {
      if (this.bankNum.length > 14) {
        this.getBankName();
      }
    }
  },

  mounted() {
    if (this.$route.query.name == "添加银行卡") {
      this.title = "添加银行卡";
    } else if (this.$route.query.name == "编辑银行卡") {
      this.title = "编辑银行卡";
      const info = JSON.parse(window.sessionStorage.getItem("editCard"));
      this.editCard = info;
      this.bankName = info.bankName;
      this.transferBankName = info.transferBankName;
      this.userBankName = info.userBankName;
      this.bankNum = info.bankNum;
      this.getBankName()
    }
  },

  methods: {
    // 获取银行名
    getBankName() {
      BIN.getBankBin(this.bankNum)
        .then(res => {
          this.bankName = res.bankName;
          if (res.cardType == "CC") {
            Toast("不支持添加信用卡，请重新输入", 3000);
            this.bankNum = "";
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取钱包信息
    clickAddCard() {
      if (this.bankNum.length < 15) {
        Toast("输入的卡号有误");
      } else if (this.transferBankName.length == 0) {
        Toast("请输入正确的开户行");
      } else if (this.userBankName.length == 0) {
        Toast("请输入姓名");
      } else if (this.bankName.length == 0) {
        Toast("无法匹配银行名称，请检查银行卡号");
      } else {
        if (this.title == "添加银行卡") {
          const config = {
            bankName: this.bankName,
            bankNum: this.bankNum,
            transferBankName: this.transferBankName,
            userBankName: this.userBankName
          };
          this.$api
            .post(this.HOME + this.USER + "inside/insertBank", config)
            .then(res => {
              if (res.data.status == 200) {
                Toast("添加成功");
                this.$router.replace({
                  path: "/bankCard"
                });
              } else {
                Toast(res.data.msg);
              }
            });
        } else if (this.title == "编辑银行卡") {
          const config = {
            bankName: this.bankName,
            bankNum: this.bankNum,
            transferBankName: this.transferBankName,
            userBankName: this.userBankName,
            bankId: this.editCard.bankId
          };
          this.$api
            .post(this.HOME + this.USER + "inside/updateBank", config)
            .then(res => {
              if (res.data.status == 200) {
                Toast("修改成功");
                this.$router.replace({
                  path: "/bankCard"
                });
              } else {
                Toast(res.data.msg);
              }
            });
        }
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

  // 头部
  .head {
    width: 100%;
    height: 4.7rem;
    display: flex;
    // position: fixed;
    // top: 0;
    // left: 0;
  }
  .head-title {
    height: 4.7rem;
    background: #fff;
    width: 100%;
    display: flex;
    justify-content: space-between;
    line-height: 4.7rem;
    .back {
      height: 1.6rem;
      width: 4rem;
      padding: 0 1.5rem;
      margin-left: 0.6rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .title {
      font-size: 1.8rem;
      color: #333;
    }
    .add {
      height: 1.6rem;
      width: 4rem;
      padding: 0 1.2rem;
      margin-right: 0.6rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  // banner内容
  .car-head {
    width: 100%;
    padding: 1.5rem;
    .add-card {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      .add-card-title {
        font-size: 1.5rem;
        color: 999;
        height: 3rem;
        line-height: 2rem;
      }
      .add-card-area {
        display: flex;
        flex-direction: column;
        background: #fff;
        .bank-item {
          display: flex;
          height: 4.5rem;
          // justify-content: space-between;
          align-items: center;
          padding: 0 1.5rem;
          .item-title {
            flex: 2;
            font-size: 1.5rem;
            color: #333;
          }
          .item-info {
            flex: 5;
            font-size: 1.5rem;
            color: #666;
            background: #fff;
          }
          .item-info::-webkit-input-placeholder {
            font-size: 1.5rem;
            color: #ccc;
          }
          .next-img {
            flex: 1;
            height: 1.1rem;
            width: 0.6rem;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
    .car-confirm {
      height: 4.4rem;
      width: 100%;
      margin: 2rem 0;
      display: flex;
      justify-content: center;
      .ok-btn {
        height: 100%;
        width: 28rem;
        background: #00b88f;
        color: #fff;
        font-size: 1.6rem;
        line-height: 4.4rem;
        border-radius: 6px;
        text-align: center;
      }
    }
  }
}
</style>
