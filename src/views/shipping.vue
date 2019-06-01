<template>
  <!-- 收货地址页 -->
  <div class="wrap">
    <!-- 头部 -->
    <div class="head-head">
      <div class="head-title">
        <div class="back" @click="regression()">
          <img src="../../img/index/wallet/back-black.png" alt>
        </div>
        <div class="title">我的收货地址</div>
        <div class="add" @click="addAddress">
          <img src="../../img/index/wallet/remainder/add.png" alt>
        </div>
      </div>
    </div>

    <div class="head-line" style="width: 100%;height: 4.7rem;"></div>

    <!-- 地址显示区 -->
    <div class="address">
      <div class="address-area">
        <div class="address-item" v-for="(i, index) in addressList" :key="index">
          <div class="address-item-area">
            <div class="address-head">
              <div class="address-head-info">{{i.contact.substring(0,1)}}</div>
            </div>
            <div class="address-info" @click="chooseAddress(i)">
              <div class="address-first">
                <div class="address-name">{{i.contact}}</div>
                <div class="phone-num">{{i.phone}}</div>
                <div class="address-default" v-if="i.isDefault">默认地址</div>
              </div>
              <div
                class="address-text"
              >收货地址:{{i.provinceName}}{{i.cityName}}{{i.districtName}}{{i.detailAddress}}</div>
            </div>
            <div class="edit-address" @click="editAddress(i)">
              <div class="edit-text">编辑</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { RadioGroup } from "vant";
import { Toast } from "vant";
// Vue.use(RadioGroup);

export default {
  data() {
    return {
      addressList: [] // 收获地址列表
    };
  },
  watch: {},
  mounted() {
    this.getAddress();
  },
  methods: {
    // 获取地址信息
    getAddress() {
      this.$api
        .get(this.HOME + this.ORDER + "inside/address/findAddressByuserId")
        .then(res => {
          this.addressList = res.data.data;
        });
    },

    // 编辑地址信息
    editAddress(item) {
      const info = JSON.stringify(item);
      window.sessionStorage.setItem("editAddress", info);
      this.$router.push({
        path: "/editAddress?name=编辑地址&type="+this.$route.query.name
      });
    },

    // 添加地址
    addAddress() {
      this.$router.push({
      path: "/editAddress?name=添加收货地址&type="+this.$route.query.name
      });
    },
    // 下单页选择地址
    chooseAddress(item) {
      if (this.$route.query.name == "选择地址") {
        let i = JSON.stringify(item);
        window.sessionStorage.setItem("address", i);
        this.$router.replace({
          path: "/carConfirm"
        });
      } else if (this.$route.query.name == "选择退换货地址") {
        // 申请换货地址
        let i = JSON.stringify(item);
        window.sessionStorage.setItem("address", i);
        const id = this.$route.query.id;
        this.$router.replace({
          path: "/exchange?id=" + id
        });
      } else if (this.$route.query.name == "选择吃鸡地址") {
        // 申请换货地址
        let i = JSON.stringify(item);
        window.sessionStorage.setItem("address", i);
        this.$router.replace({
          path: "/eatChicken"
        });
      }
    },
    //返回
    regression () {
      if(this.$route.query.name == "收货地址") {
        this.$router.replace({path: '/Userdata'})
      } else if (this.$route.query.name == "选择地址") {
          this.$router.replace({
            path: "/carConfirm"
          });
        } else if (this.$route.query.name == "选择退换货地址") {
          // 申请换货地址
          const id = this.$route.query.id;
          this.$router.replace({
            path: "/exchange?id=" + id
          });
        } else if (this.$route.query.name == "选择吃鸡地址") {
          // 申请换货地址
          this.$router.replace({
            path: "/eatChicken"
          });
        }
    }
  }
};
</script>

<style lang='less' scoped>
.wrap {
  height: 100vh;
  width: 100vw;
  background: #f2f2f2;
}

// 头部
.head-head {
  width: 100%;
  height: 4.7rem;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
}
.head-title {
  height: 4.7rem;
  background: #f2f2f2;
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

// 地址显示区
.address {
  width: 100%;
  height: 100%;
  .address-area {
    display: flex;
    flex-direction: column;
    width: 100%;
    .address-item {
      width: 100%;
      padding: 1.5rem;
      height: 7.7rem;
      background: #fff;
      border-bottom: 1px solid #f2f2f2;
      .address-item-area {
        display: flex;
        width: 100%;
        height: 100%;
        align-items: center;
        .address-head {
          flex: 1;
          .address-head-info {
            height: 3.2rem;
            width: 3.2rem;
            background: #ccc;
            border-radius: 50%;
            color: #fff;
            text-align: center;
            line-height: 3.2rem;
          }
        }
        .address-info {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          flex: 5;
          .address-first {
            display: flex;
            align-items: center;
            .address-name {
              font-size: 1.4rem;
              color: #333;
            }
            .phone-num {
              font-size: 1rem;
              color: #999;
              margin-left: 1rem;
            }
            .address-default {
              font-size: 0.9rem;
              color: #fff;
              background: #00ae87;
              padding: 0 0.6rem;
              height: 1.3rem;
              line-height: 1.3rem;
              border-radius: 0.65rem;
              margin-left: 1rem;
            }
          }
          .address-text {
            font-size: 1.2rem;
            color: #333;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            /*! autoprefixer: off */
            -webkit-box-orient: vertical;
            /*! autoprefixer: on */
          }
        }
        .edit-address {
          flex: 1;
          border-left: 1px solid #ccc;
          height: 2rem;
          justify-content: center;
          display: flex;
          .edit-text {
            text-align: center;
            font-size: 1.2rem;
            color: #999;
            line-height: 2rem;
            margin-left: 1rem;
          }
        }
      }
    }
  }
}
</style>