<template>
  <div class="remainder">
    <!-- 头部 -->
    <div class="head">
      <div class="head-title">
        <div class="back" @click="$router.go(-1)">
          <img src="../../../../img/index/wallet/back-black.png" alt>
        </div>
        <div class="title">选择银行卡</div>
        <div class="add" @click="addCar">
          <img src="../../../../img/index/wallet/remainder/add.png" alt>
        </div>
      </div>
    </div>

    <!-- banner内容 -->
    <div class="car-head">
      <div
        :class="selected == index ? 'car-head-container-active' : 'car-head-container'"
        v-for="(i, index) in carList"
        :key="index"
        @click="thisCar(i,index)"
      >
        <div class="car-area">
          <!-- <div class="car-img">
            <img :src="i.bank_img" alt>
          </div> -->
          <div class="car-info">
            <div class="car-title">{{i.bankName}}</div>
            <div class="car-number">储蓄卡尾号{{i.bankNum.slice(-4)}}</div>
          </div>
        </div>
        <div class="next-area" v-show="selected == index">
          <img src="../../../../img/index/wallet/remainder/check.png" alt>
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
      selected: 0, // 选中的卡
      carList: [] // 银行卡列表
    };
  },

  mounted() {
    this.getWallet();
    this.selected = window.sessionStorage.getItem('chooseCar') || 0
  },

  methods: {
    // 获取钱包信息
    getWallet() {
      this.$api
        .get(this.HOME + this.USER + "inside/showUserBank")
        .then(res => {
          this.carList = res.data.data;
          const ischoose = window.sessionStorage.getItem('chooseCar') || false
          if (!ischoose) {
            this.carList.forEach((element, index) => {
              if (element.isDefault == 0) {
                this.selected = index;
              }
            });
          }
        });
    },

    // 选中一张卡
    thisCar(carInfo, index) {
      if (carInfo.status == 1) {
        window.sessionStorage.setItem('chooseCar', index)
        this.selected = index;
        const card = JSON.stringify(carInfo);
        window.sessionStorage.setItem("cardInfo", card);
        this.$router.go(-1);
      } else {
        Toast("当前卡已被禁用,请重新选择");
      }
    },

    // 添加银行卡
    addCar() {
      this.$router.push({
        path: "/addCard?name=添加银行卡"
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
      align-items: center;
      width: 100%;
      height: 100%;
      .car-img {
        height: 3.5rem;
        width: 3.5rem;
        border-radius: 50%;
        overflow: hidden;
        img {
          height: 100%;
          width: 100%;
        }
      }
      .car-info {
        // margin-left: 1.5rem;
        height: 100%;
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
      height: 1rem;
      width: 1.5rem;
      margin-bottom: 1rem;
      img {
        height: 100%;
        width: 100%;
      }
    }
  }

  .car-head-container {
    width: 100%;
    height: 6.5rem;
    background: #fff;
    border-radius: 6px;
    padding: 1.5rem;
    background: #fff;
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .car-head-container-active {
    width: 100%;
    height: 6.5rem;
    background: #fff;
    border-radius: 6px;
    padding: 1.5rem;
    background: #fff;
    display: flex;
    align-items: center;
    border: 1px solid #00ae87;
    margin-bottom: 1.5rem;
  }
}
</style>
