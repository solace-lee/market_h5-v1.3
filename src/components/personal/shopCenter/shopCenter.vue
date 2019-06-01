<template>
  <div class="shop-center">
    <!-- 头部 -->
    <div class="head-bg">
      <div class="head-bar">
        <div class="head-title">
          <div class="back" @click="$router.go(-1)">
            <img src="../../../../img/index/wallet/back-black.png" alt>
          </div>
          <div class="title" v-if="!type">我的店铺</div>
          <div class="title" v-if="type">区域管理</div>
          <div class="add">
            <!-- <img src="../../../../img/index/wallet/remainder/add.png" alt=""> -->
          </div>
        </div>
      </div>

      <!-- 显示区 -->
      <div class="show-container">
        <div class="show-top">
          <div class="show-top-title">收益</div>
          <div class="show-top-number" v-if="!type">
            <span>￥</span>
            {{myshopInfo.walletAmount}}
          </div>
          <div class="show-top-number" v-if="type">
            <span>￥</span>
            {{wallet}}
          </div>
          <div class="business-btn" @click="goBusiness">
            <div class="to-business">生意通</div>
            <div class="to-img">
              <img src="../../../../img/index/shopCenter/next.png" alt>
            </div>
          </div>
        </div>
        <!-- 框部分 -->
        <div class="box-area">
          <div class="box-container">
            <div :class="active == 0 ? 'box-left-active' : 'box-left'" @click="onclickMyshop">
              <div class="box-left-img">
                <img :src="active == 0 ? myshopActive : myshop" alt>
              </div>
              <div class="box-left-title">店铺信息</div>
              <div class="box-left-after" v-show="!type && myshopInfo.applyStatus == 1">(待审核)</div>
              <div class="box-left-after" v-show="type && mybillInfo.applyStatus == 1">(待审核)</div>
              <div class="box-left-after" v-show="!type && myshopInfo.applyStatus == 3">(审核未通过)</div>
              <div class="box-left-after" v-show="type && mybillInfo.applyStatus == 3">(审核未通过)</div>
            </div>
            <div :class="active == 1 ? 'box-right-active' : 'box-right'" @click="onclickMybill">
              <div class="box-right-img">
                <img :src="active == 1 ? mybillActive : mybill" alt>
              </div>
              <div class="box-right-title">账单详情</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 占位区 -->
    <div class="line"></div>

    <!-- 我的店铺 -->
    <div class="myshop" v-if="!type">
      <!-- 店铺信息内容区 -->
      <div class="myshop-area" v-show="active == 0">
        <div class="myshop-container">
          <div class="myshop-item">
            <div class="myshop-item-left">店铺名称</div>
            <div class="myshop-item-right">{{myshopInfo.shopName}}</div>
          </div>
          <div class="myshop-item">
            <div class="myshop-item-left">店铺性质</div>
            <div class="myshop-item-right" v-if="myshopInfo.shopNature==1">个人</div>
            <div class="myshop-item-right" v-if="myshopInfo.shopNature==2">企业</div>
          </div>
          <div class="myshop-item">
            <div class="myshop-item-left">店铺联系人</div>
            <div class="myshop-item-right">{{myshopInfo.contactName}}</div>
          </div>
          <div class="myshop-item">
            <div class="myshop-item-left">店铺电话</div>
            <div class="myshop-item-right">{{myshopInfo.contactPhone}}</div>
          </div>
          <div class="myshop-address">
            <div class="myshop-item-left">店铺地址</div>
            <div class="myshop-address-right">{{myshopInfo.addressDetail}}</div>
          </div>
        </div>
      </div>

      <div class="myshop-foot" v-show="active == 0">
        <div class="mybill-back" v-show="shopIsReady" @click="goChangeShopInfo">修改资料</div>
        <div class="foot-info">请通过电脑端登录http://admin.zhulixc.com进入商铺后台</div>
      </div>

      <!-- 账单详情内容区 -->
      <div class="mybill-area" v-show="active == 1">
        <div class="mybill-container">
          <div class="mybill-item" @click="goInfo(i)" v-for="(i, index) in myshopList" :key="index">
            <div class="mybill-item-top">
              <div class="mybill-item-left">
                <div class="mybill-item-img">
                  <img src="../../../../img/index/shopCenter/order.png" alt>
                </div>
                <div class="mybill-item-title">{{i.orderNum}}</div>
              </div>
              <div class="mybill-item-right" v-if="i.shopWalletType == 1">-{{i.detailsAmount}}</div>
              <div class="mybill-item-right" v-if="i.shopWalletType == 2">+{{i.detailsAmount}}</div>
            </div>
            <div class="mybill-item-bottom">
              <div class="mybill-date">{{i.createTime}}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 账单详情结算按钮 -->
      <div class="mybill-btn" v-show="active == 1">
        <div class="mybill-click" @click="clickSettlement">结算</div>
      </div>
    </div>

    <!-- 区域管理 -->
    <div class="myshop" v-if="type">
      <!-- 店铺信息内容区 -->
      <div class="myshop-area" v-show="active == 0">
        <div class="myshop-container">
          <div class="myshop-item">
            <div class="myshop-item-left">店铺名称</div>
            <div class="myshop-item-right">{{mybillInfo.agencyLegalName}}</div>
          </div>
          <div class="myshop-item">
            <div class="myshop-item-left">店铺性质</div>
            <div class="myshop-item-right" v-if="mybillInfo.agencyNature==1">个人</div>
            <div class="myshop-item-right" v-if="mybillInfo.agencyNature==2">企业</div>
          </div>
          <div class="myshop-item">
            <div class="myshop-item-left">店铺联系人</div>
            <div class="myshop-item-right">{{mybillInfo.contactName}}</div>
          </div>
          <div class="myshop-item">
            <div class="myshop-item-left">店铺电话</div>
            <div class="myshop-item-right">{{mybillInfo.contactPhone}}</div>
          </div>
          <div class="myshop-address">
            <div class="myshop-item-left">店铺地址</div>
            <div class="myshop-address-right">{{mybillInfo.address}}</div>
          </div>
        </div>
      </div>

      <div class="myshop-foot" v-show="active == 0">
        <div class="mybill-back" v-show="billIsReady" @click="goChangeBillInfo">修改资料</div>
        <div class="foot-info">请通过电脑端登录http://admin.zhulixc.com进入商铺后台</div>
      </div>

      <!-- 账单详情内容区 -->
      <div class="mybill-area" v-show="active == 1">
        <div class="mybill-container">
          <div
            class="mybill-item-area"
            @click="goInfo(i)"
            v-for="(i, index) in mybillList"
            :key="index"
          >
            <div class="mybill-item-top">
              <div class="mybill-item-left">
                <div class="mybill-item-img">
                  <img src="../../../../img/index/shopCenter/order.png" alt>
                </div>
                <div class="mybill-item-title">订单编号：{{i.orderNum}}</div>
              </div>
              <div class="mybill-item-right" v-if="i.agencyWalletType == 1">-{{i.detailsAmount}}</div>
              <div class="mybill-item-right" v-if="i.agencyWalletType == 2">+{{i.detailsAmount}}</div>
            </div>
            <div class="mybill-item-bottom">
              <div class="mybill-date-info">白云面包店</div>
              <div class="mybill-date">{{i.createTime}}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 账单详情结算按钮 -->
      <div class="mybill-btn" v-show="active == 1">
        <div class="mybill-click" @click="clickSettlement">结算</div>
      </div>
    </div>

    <!-- 结算弹窗 -->
    <div class="settlement-box" v-show="showSettlement">
      <div class="settlement-bg">
        <div class="settlement-area">
          <div class="settlement-title">
            <div class="box-title">收益结算</div>
            <div class="second-title">本操作会把您的收益全部结算到我的余额</div>
          </div>
          <div class="settlement-container">
            <div class="fund-text">结算额度</div>
            <div class="settlement-num" v-if="!type">
              ￥
              <span>{{myshopInfo.walletAmount}}</span>
            </div>
            <div class="settlement-num" v-if="type">
              ￥
              <span>{{wallet}}</span>
            </div>
            <div class="btn-btn">
              <div class="cancel" @click="cancel">取消</div>
              <div class="comfirm" @click="comfirmBtm">确定</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 推荐入驻弹窗 -->
    <div class="join-box" v-show="showJoin">
      <div class="join-bg">
        <div class="settlement-title">
          <div class="box-title" v-if="userType == 2">入驻成为区域运营商？</div>
          <div class="box-title" v-if="userType == 3">入驻成为商家？</div>
        </div>
        <div class="join-info">入驻区域运营商后将获得更多权益</div>
        <div class="btn-btn">
          <div class="cancel" @click="cancelJoin">取消</div>
          <div class="comfirm" @click="goJoin">去了解</div>
        </div>
      </div>
    </div>

    <!-- 已完成弹窗 -->
    <div class="settlement-box" v-show="showOkBox">
      <div class="settlement-bg">
        <div class="settlement-area">
          <div class="settlement-finaly">
            <div class="yes-img">
              <img src alt>
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
import { Toast } from "vant";
export default {
  components: {},
  data() {
    return {
      active: 0, // 激活的标签卡
      myshop: require("../../../../img/index/shopCenter/myshop.png"), //非激活状态图标路径
      myshopActive: require("../../../../img/index/shopCenter/myshop-active.png"), //激活状态图标路径
      mybill: require("../../../../img/index/shopCenter/mybill.png"), //非激活状态图标路径
      mybillActive: require("../../../../img/index/shopCenter/mybill-active.png"), //激活状态图标路径
      type: false, // 用户类型
      showSettlement: false, // 显示结算弹框
      showOkBox: false, // 显示结算已完成弹框
      balance: 0, //结算金额
      myshopInfo: {}, //我的店铺信息
      myshopList: [], //我的店铺流水明细
      mybillInfo: {}, //我的店铺信息
      mybillList: [], //我的店铺流水明细
      wallet: 0, // 区域运营商钱包总额
      shopIsReady: false, // 商店是否正在审核中
      billIsReady: false, // 区域运营商是否正在审核中
      userType: 0, // 用户类型 2是商家 3运营商 4既是商家也是运营商
      showJoin: false // 推荐入驻弹窗
    };
  },

  watch: {
    type() {
      if (this.type) {
        this.loadBillData();
      } else {
        this.loadShopData();
      }
    }
  },

  created() {
    this.userType = this.$route.query.userType;
    if (this.userType == 2) {
      this.type = false;
      this.loadShopData();
    } else if (this.userType == 3) {
      this.type = true;
      this.loadBillData();
    } else if (this.userType == 4) {
      this.type = false;
      this.loadShopData();
    }
  },

  methods: {
    // 加载店铺初始数据
    loadShopData() {
      // 商店信息
      this.$api.get(this.HOME + this.USER + "inside/queryShop").then(res => {
        this.myshopInfo = res.data.data;
        if (
          this.myshopInfo.applyStatus == 1 ||
          this.myshopInfo.applyStatus == 3
        ) {
          this.shopIsReady = true;
        } else {
          this.shopIsReady = false;
        }
      });

      // 流水明细
      this.$api
        .get(this.HOME + this.USER + "inside/showTransferAmount")
        .then(res => {
          this.myshopList = res.data.data.items;
        });
    },

    // 加载区域运营商初始数据
    loadBillData() {
      // 商店信息
      this.$api
        .get(this.HOME + this.USER + "inside/getByUserId")
        .then(res => {
          this.mybillInfo = res.data.data;
          this.mybillInfo.applyStatus = this.mybillInfo.agencyStatus
          if (
            this.mybillInfo.applyStatus == 1 ||
            this.mybillInfo.applyStatus == 3
          ) {
            this.billIsReady = true;
          } else {
            this.billIsReady = false;
          }
        });

      // 钱包总额
      this.$api
        .get(this.HOME + this.USER + "inside/agencyWalletAmount")
        .then(res => {
          this.wallet = res.data.data.walletAmount;
        });

      // 流水明细(等待补)
      this.$api
        .get(this.HOME + this.USER + "inside/showAgencyDetails")
        .then(res => {
          this.mybillList = res.data.data.items;
        });
    },

    // 按下了结算按钮
    clickSettlement() {
      if (this.type) {
        if (this.wallet == 0) {
          Toast("区域收益不足");
        } else {
          this.showSettlement = true;
        }
      } else {
        if (this.myshopInfo.walletAmount == 0) {
          Toast("店铺收益不足");
        } else {
          this.showSettlement = true;
        }
      }
    },

    // 去账单详情页
    goInfo(item) {
      // const i = JSON.stringify(item)
      // sessionStorage.setItem('shopCenter', i)
      // this.$router.push({
      //   path: "/fundinfo?name=店铺收益"
      // });
    },

    // 点击了生意通按钮
    goBusiness() {
      if (this.userType == 2) {
        this.type = false;
        this.showJoin = true;
      } else if (this.userType == 3) {
        this.type = true;
        this.showJoin = true;
      } else if (this.userType == 4) {
        this.type = !this.type;
      }
    },

    // 取消入驻
    cancelJoin() {
      this.showJoin = false;
    },

    // 确定入驻
    goJoin() {
      this.$router.push({
        path: "/myshop?userType=" + this.userType
      });
    },

    // 点击了店铺信息
    onclickMyshop() {
      this.active = 0;
    },

    // 点击了账单详情
    onclickMybill() {
      this.active = 1;
    },

    // 结算完成
    okbtn() {
      if (this.type) {
        this.loadBillData();
      } else {
        this.loadShopData();
      }
      this.showOkBox = false;
    },

    comfirmBtm() {
      // 确认结算
      // type=true为区域商结算
      if (this.type) {
        this.$api
          .post(this.HOME + this.USER + "inside/calculateAgencyWallet")
          .then(res => {
            if (res.data.status == 200) {
              this.showOkBox = true;
              this.showSettlement = false
            } else {
              Toast("结算失败，请稍后重试");
            }
          });
      } else {
        // 我的店铺结算
        this.$api
          .post(this.HOME + this.USER + "inside/calculateShopWallet")
          .then(res => {
            if (res.data.status == 200) {
              this.showOkBox = true;
              this.showSettlement = false
            } else {
              Toast("结算失败，请稍后重试");
            }
          });
      }
    },

    // 隐藏结算弹窗
    cancel() {
      this.showSettlement = false;
    },

    // 去店铺商家信息修改页
    goChangeShopInfo() {
      this.$router.push({
        path: "/newbusiness?type=3"
      });
    },

    // 去区域运营商信息修改页
    goChangeBillInfo() {
      this.$router.push({
        path: "/operator?type=3"
      });
    }
  }
};
</script>
<style scoped lang='less'>
.shop-center {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background: #f2f2f2;

  // 头部
  .head-bg {
    height: 23rem;
    width: 100%;
    background-image: url(../../../../img/index/replacement/header.png);
    background-size: 100% 100%;
    position: fixed;
    top: 0;
    left: 0;
    .head-bar {
      width: 100%;
      height: 4.7rem;
      display: flex;
      .head-title {
        height: 4.7rem;
        // background: #fff;
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
    }
    .show-container {
      width: 100%;
      height: 18.3rem;
      position: relative;
      .show-top {
        height: 10rem;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #fff;
        position: relative;
        .show-top-title {
          font-size: 1.6rem;
          margin: 1rem 0;
        }
        .show-top-number {
          font-size: 3rem;
          span {
            font-size: 1.8rem;
          }
        }
        .business-btn {
          position: absolute;
          right: 1rem;
          bottom: 2.5rem;
          font-size: 1rem;
          color: #02bf94;
          height: 2rem;
          width: 5.3rem;
          background: #fff;
          border-radius: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          .to-business {
            line-height: 2rem;
          }
          .to-img {
            width: 0.5rem;
            height: 0.9rem;
            margin-bottom: 0.6rem;
            margin-left: 0.5rem;
            img {
              height: 100%;
              width: 100%;
            }
          }
        }
      }
      .box-area {
        position: absolute;
        bottom: -1.5rem;
        left: 0;
        height: 8.4rem;
        width: 100%;
        // background: #fff;
        padding: 0 1.5rem;
        .box-container {
          background: #fff;
          height: 100%;
          width: 100%;
          border-radius: 6px;
          font-size: 1.5rem;
          overflow: hidden;
          display: flex;
          box-shadow: 1px 1px 5px #47ac96;
          .box-left {
            flex: 1;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background: #ddd;
            color: #999;
            .box-left-after {
              font-size: 1rem;
              color: #999;
            }
          }
          .box-left-active {
            flex: 1;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background: #fff;
            color: #00ae87;
            .box-left-after {
              font-size: 1rem;
              color: #333;
            }
          }
          .box-left-img {
            height: 2.2rem;
            width: 2.2rem;
            margin-bottom: 0.6rem;
            img {
              width: 100%;
              height: 100%;
            }
          }

          .box-right {
            flex: 1;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background: #ddd;
            color: #999;
          }
          .box-right-active {
            flex: 1;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background: #fff;
            color: #00ae87;
          }
          .box-right-img {
            height: 1.7rem;
            width: 2.3rem;
            margin-bottom: 0.6rem;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
  }

  //占位区
  .line {
    height: 23rem;
  }

  //店铺信息内容区
  .myshop-area {
    width: 100%;
    padding: 0 1.5rem;
    .myshop-container {
      width: 100%;
      background: #fff;
      padding: 1.5rem;
      padding-top: 5rem;
      .myshop-item {
        border-top: 1px solid #eee;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 4.5rem;
        .myshop-item-left {
          color: #666;
          font-size: 1.3rem;
        }
        .myshop-item-right {
          color: #333;
          font-size: 1.3rem;
        }
      }
      .myshop-address {
        border-top: 1px solid #eee;
        display: flex;
        justify-content: space-between;
        min-height: 4.5rem;
        padding-top: 1.5rem;
        .myshop-item-left {
          color: #666;
          font-size: 1.3rem;
        }
        .myshop-address-right {
          color: #333;
          font-size: 1.3rem;
          max-width: 15.7rem;
        }
      }
    }
  }

  .myshop-foot {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .foot-info {
      color: #999;
      font-size: 1rem;
      margin: 0.6rem 0;
    }
    .mybill-back {
      width: 28rem;
      height: 4.4rem;
      text-align: center;
      line-height: 4.4rem;
      background: #00ae87;
      color: #fff;
      border-radius: 6px;
    }
  }

  // 账单详情内容区
  .mybill-area {
    width: 100%;
    padding: 0 1.5rem;
    padding-bottom: 8rem;
    .mybill-container {
      width: 100%;
      background: #fff;
      padding: 1.5rem;
      padding-top: 5rem;
      .mybill-item {
        border-top: 1px solid #eee;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 7rem;
        padding: 1rem 0;
        .mybill-item-top {
          display: flex;
          height: 3rem;
          justify-content: space-between;
          align-items: center;
          .mybill-item-left {
            display: flex;
            align-items: center;
            .mybill-item-img {
              width: 1.4rem;
              height: 1.7rem;
              margin-bottom: 0.6rem;
              img {
                height: 100%;
                width: 100%;
              }
            }
            .mybill-item-title {
              font-size: 1.4rem;
              color: #333;
              line-height: 3rem;
              margin-left: 1rem;
            }
          }
          .mybill-item-right {
            font-size: 1.8rem;
            color: #00ae87;
          }
        }
        .mybill-item-bottom {
          display: flex;
          height: 2rem;
          line-height: 2rem;
          font-size: 1rem;
          color: #999;
          width: 100%;
          padding-left: 2.4rem;
        }
      }
      .mybill-item-area {
        border-top: 1px solid #eee;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 9rem;
        padding: 1rem 0;
        .mybill-item-top {
          display: flex;
          height: 3rem;
          justify-content: space-between;
          align-items: center;
          .mybill-item-left {
            display: flex;
            align-items: center;
            .mybill-item-img {
              width: 1.4rem;
              height: 1.7rem;
              margin-bottom: 0.6rem;
              img {
                height: 100%;
                width: 100%;
              }
            }
            .mybill-item-title {
              font-size: 1.4rem;
              color: #333;
              line-height: 3rem;
              margin-left: 1rem;
            }
          }
          .mybill-item-right {
            font-size: 1.8rem;
            color: #00ae87;
          }
        }
        .mybill-item-bottom {
          display: flex;
          flex-direction: column;
          height: 4rem;
          line-height: 2rem;
          width: 100%;
          padding-left: 2.4rem;
          .mybill-date-info {
            font-size: 1.2rem;
            color: #666;
          }
          .mybill-date {
            font-size: 1rem;
            color: #999;
          }
        }
      }
    }
  }

  // 账单详情结算按钮
  .mybill-btn {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 7rem;
    display: flex;
    justify-content: center;
    align-items: center;
    .mybill-click {
      width: 28rem;
      height: 4.4rem;
      text-align: center;
      line-height: 4.4rem;
      background: #00ae87;
      border-radius: 6px;
      color: #fff;
      font-size: 1.6rem;
    }
  }

  // 入驻弹窗
  .join-box {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 1.5rem;
    .join-bg {
      width: 100%;
      height: 22rem;
      background: #fff;
      border-radius: 6px;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      align-items: center;
      .settlement-title {
        height: 5rem;
        width: 100%;
        text-align: center;
        line-height: 5rem;
        background: #00ae87;
        color: #fff;
        font-size: 1.9rem;
      }
      .join-info {
        height: 10rem;
        text-align: center;
        font-size: 1.4rem;
        color: #666;
        width: 16rem;
        padding-top: 3rem;
      }
      .btn-btn {
        border-top: 1px solid #eee;
        height: 7rem;
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-size: 1.8rem;
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
          text-align: center;
          line-height: 4rem;
          background: #00ae87;
          color: #fff;
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
