<template>
  <div class="bankCard">
    <!-- 头部 -->
    <div class="head">
      <div class="head-title">
        <div class="back" @click="$router.go(-1)">
          <img src="../../../../img/index/wallet/back-black.png" alt>
        </div>
        <div class="title">选择银行卡</div>
        <div class="add" @click="addCard">
          <img src="../../../../img/index/wallet/remainder/add.png" alt>
        </div>
      </div>
    </div>

    <!-- banner内容 -->
    <div class="car-head">
      <div
        class="car-head-container"
        v-for="(i, index) in carList"
        :key="index"
        @click="thisCar(i,index)"
      >
        <div class="car-area">
          <div class="car-img">
            <img :src="i.bank_img" alt>
          </div>
          <div class="car-info">
            <div class="car-title">{{i.bankName}}</div>
            <div class="car-type-defalut" v-if="i.isDefault == 0">
              <span>默认储蓄卡</span>
            </div>
            <div class="car-type" v-else>储蓄卡</div>
            <div class="car-number">
              {{i.bankNum.slice(0,4)}}
              <span>&emsp;****&emsp;****&emsp;</span>
              {{i.bankNum.slice(-4)}}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 银行卡详情 -->
    <div class="cardinfo" v-if="showEdit">
      <div class="card-content">
        <!-- 标题 -->
        <div class="edit-head">银行卡详情</div>
        <div class="card-container-img">
          <!-- 卡图 -->
          <div class="car-head-container">
            <div class="car-area">
              <div class="car-img">
                <img :src="carInfo.bank_img" alt>
              </div>
              <div class="car-info">
                <div class="car-title">{{carInfo.bankName}}</div>
                <div class="car-type">储蓄卡</div>
                <div class="car-number">
                  {{carInfo.bankNum.slice(0,4)}}
                  <span>&emsp;****&emsp;****&emsp;</span>
                  {{carInfo.bankNum.slice(-4)}}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 功能区 -->
        <div class="edit-container">
          <div class="edit-area">
            <div class="delet-card" @click="deletCard">解除绑定</div>
            <div class="defult-card" v-if="carInfo.isDefault == 0">已设置成默认</div>
            <div class="defult-card" v-else @click="setDefult">设为默认</div>
            <div class="edit-card" @click="goEdit">编辑</div>
            <div class="back-card" @click="cancel">返回</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 确定弹窗 -->
    <div class="delet-box" v-if="okToDelet">
      <div class="delet-area">
        <div class="delet-title">确定删除尾号{{carInfo.bankNum.slice(-4)}}的储蓄卡吗？</div>
        <div class="delet-btn">
          <div class="delet-cancel" @click="cancelDelet">取消</div>
          <div class="delet-confirm" @click="okDelet">确定</div>
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
      carList: [], // 银行卡列表
      carInfo: {}, // 选中的卡详细
      showEdit: false, // 是否显示编辑
      okToDelet: false // 是否解除绑定
    };
  },

  created() {
    this.getWallet();
  },

  methods: {
    // 获取钱包信息
    getWallet() {
      this.$api
        .get(this.HOME + this.USER + "inside/showUserBank")
        .then(res => {
          this.carList = res.data.data;
        });
    },

    // 选中一张卡
    thisCar(carInfo) {
      this.carInfo = carInfo;
      this.showEdit = true;
    },

    // 取消选中
    cancel() {
      this.showEdit = false;
    },

    // 设置成默认
    setDefult() {
      let config = {
        bankId: this.carInfo.bankId,
        isDefault: 0
      };
      this.$api
        .post(this.HOME + this.USER + "inside/defaultBank", config)
        .then(res => {
          if (res.data.status == 200) {
            Toast("已设置为默认卡", 2000);
            this.showEdit = false;
            this.getWallet();
          } else {
            Toast("设置失败请重试", 2000);
          }
        });
    },

    // 点击了解除绑定按钮
    deletCard() {
      this.showEdit = false;
      this.okToDelet = true;
    },

    // 取消解除绑定
    cancelDelet() {
      this.okToDelet = false;
    },

    // 确定解除绑定
    okDelet() {
      let config = {
        bankId: this.carInfo.bankId
      };
      this.$api
        .post(
          this.HOME + this.USER + "inside/deleteBank/" + this.carInfo.bankId
        )
        .then(res => {
          if (res.data.status == 200) {
            Toast("已解绑", 2000);
            this.okToDelet = false;
            this.getWallet()
          } else {
            Toast("解绑失败请重试", 2000);
          }
        });
    },

    // 去编辑页
    goEdit() {
      const info = JSON.stringify(this.carInfo);
      window.sessionStorage.setItem("editCard", info);
      this.$router.push({
        path: "/addCard?name=编辑银行卡"
      });
    },

    //去添加银行卡
    addCard() {
      this.$router.push({
        path: "/addCard?name=添加银行卡"
      });
    }
  }
};
</script>
<style scoped lang='less'>
.bankCard {
  width: 100%;
  height: 100vh;
  background: #f2f2f2;

  // 头部
  .head {
    width: 100%;
    height: 4.7rem;
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
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
    margin-top: 4.7rem;

    .car-area {
      display: flex;
      width: 100%;
      height: 100%;
      .car-img {
        display: none;
        height: 3.5rem;
        width: 3.5rem;
        border-radius: 50%;
        background: #fff;
        overflow: hidden;
        img {
          height: 100%;
          width: 100%;
        }
      }
      .car-info {
        margin-left: 1.5rem;
        height: 100%;
        color: #fff;
        .car-title {
          font-size: 1.5rem;
        }
        .car-type-defalut {
          margin-top: 0.2rem;
          font-size: 1.2rem;
          color: #00ae87;
          span {
            background: #fff;
            padding: 0.2rem 0.6rem;
            border-radius: 0.6rem;
          }
        }
        .car-type {
          margin-top: 0.2rem;
          font-size: 1.3rem;
        }
        .car-number {
          margin-top: 2.5rem;
          font-size: 1.7rem;
        }
      }
    }
    .next-area {
      height: 1rem;
      width: 1.5rem;
      margin-bottom: 1rem;
      img {
        height: 100%;
        width: 100%;
      }
    }
  }

  .car-head-container:nth-child(2n) {
    background: linear-gradient(to left, #e9517e, #eb5c5e);
  }
  .car-head-container:nth-child(2n + 1) {
    background: linear-gradient(to left, #089cb6, #1cb48c);
  }

  .car-head-container {
    width: 100%;
    height: 11.5rem;
    border-radius: 6px;
    padding: 1.5rem;
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .car-head-container-active {
    width: 100%;
    height: 11.5rem;
    background: linear-gradient(to left, #e9517e, #eb5c5e);
    border-radius: 6px;
    padding: 1.5rem;
    display: flex;
    align-items: center;
    border: 1px solid #00ae87;
    margin-bottom: 1.5rem;
  }

  // 银行卡详情
  .cardinfo {
    position: fixed;
    height: 100vh;
    width: 100%;
    top: 0;
    left: 0;
    background: #f2f2f2;
    // padding: 0 1.5rem;
    .card-content {
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .edit-head {
        height: 4.7rem;
        line-height: 4.7rem;
        font-size: 1.8rem;
        color: #333;
      }

      // 卡图
      .card-container-img {
        width: 100%;
        display: flex;
        padding: 0 1.5rem;
        flex-direction: column;
        align-items: center;
        margin-top: 2rem;
        .car-head-container {
          width: 100%;
          height: 11.5rem;
          border-radius: 6px;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          margin-bottom: 1.5rem;
          .car-area {
            display: flex;
            width: 100%;
            height: 100%;
            .car-img {
              height: 3.5rem;
              width: 3.5rem;
              border-radius: 50%;
              background: #fff;
              overflow: hidden;
              img {
                height: 100%;
                width: 100%;
              }
            }
            .car-info {
              margin-left: 1.5rem;
              height: 100%;
              color: #fff;
              .car-title {
                font-size: 1.5rem;
              }
              .car-type {
                margin-top: 0.2rem;
                font-size: 1.3rem;
              }
              .car-number {
                margin-top: 2.5rem;
                font-size: 1.7rem;
              }
            }
          }
        }
      }

      // 功能区
      .edit-container {
        height: 18.2rem;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        .edit-area {
          height: 100%;
          width: 100%;
          text-align: center;
          background: #fff;
          font-size: 1.6rem;
          .delet-card {
            height: 4.8rem;
            line-height: 4.8rem;
            text-align: center;
            color: #ff0000;
            border-bottom: 1px solid #eee;
          }
          .defult-card {
            height: 4.8rem;
            line-height: 4.8rem;
            text-align: center;
            color: #999;
            border-bottom: 1px solid #eee;
          }
          .edit-card {
            height: 4.8rem;
            line-height: 4.8rem;
            text-align: center;
            color: #999;
            border-bottom: 1px solid #eee;
          }
          .back-card {
            height: 4.8rem;
            line-height: 4.8rem;
            text-align: center;
            color: #999;
          }
        }
      }
    }
  }

  // 确定弹窗
  .delet-box {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    .delet-area {
      height: 14rem;
      width: 32rem;
      text-align: center;
      background: #fff;
      border-radius: 0.6rem;
      .delet-title {
        height: 8.5rem;
        line-height: 8.5rem;
        font-size: 1.8rem;
        color: #333;
      }
      .delet-btn {
        height: 5.5rem;
        width: 100%;
        display: flex;
        line-height: 5.5rem;
        .delet-cancel {
          flex: 1;
          font-size: 1.6rem;
          color: #666;
          border-top: 1px solid #eee;
        }
        .delet-confirm {
          flex: 1;
          font-size: 1.6rem;
          color: #00ae87;
          border-left: 1px solid #eee;
          border-top: 1px solid #eee;
        }
      }
    }
  }
}
</style>
