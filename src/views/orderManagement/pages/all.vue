<template>
  <div class="all-order">
    <div
      class="order_status_all"
      v-for="(item,index) in all_orders_list"
      :key="index"
      @click="orderDetails(item.orderId)"
    >
      <!-- 上面点击进入订单详情 -->
      <div class="order_number_apply" @click.stop="goShop(item.shopId)">
        <img src="../../../../img/index/replacement/shop.png">

        <!-- 店铺名 -->
        <span>{{item.shopName}}</span>

        <!-- 显示订单状态 -->
        <span v-if="item.orderStatus==1">待支付</span>
        <span v-if="item.orderStatus==2">待发货</span>
        <span v-if="item.orderStatus==3">待确认</span>
        <span v-if="item.orderStatus==4">待评价</span>
        <span v-if="item.orderStatus==5">待退货</span>
        <span v-if="item.orderStatus==6">已取消</span>
        <span v-if="item.orderStatus==7">取消中</span>
        <span v-if="item.orderStatus==8">保留</span>
        <span v-if="item.orderStatus==9">已评价</span>
        <span v-if="item.orderStatus==10">异常</span>
      </div>

      <!-- 点击进入订单详情 -->
      <div class="order_information_apply" v-for="(i, keys) in item.commodityVos" :key="keys">
        <div class="order_information_left_apply">
          <img :src="i.imgUrl">
        </div>
        <div class="order_information_right_apply">
          <div class="product-name">{{i.name}}</div>
          <div class="product-info">
            <span>{{i.specificationName}}</span>
            <span v-if="item.commodityArea!=4">x{{i.quantity}}&nbsp;&nbsp;￥{{i.orderAmount}}</span>
            <span v-else>x{{i.quantity}}&nbsp;&nbsp;{{i.orderAmount}}积分</span>
          </div>
          <div class="return-back">
            <div
              v-if="item.orderStatus==4&&!i.flag"
              @click.stop="orderChangeStatus(4,item.orderId,i)"
            >商品评价</div>
            <div
              v-if="item.orderStatus==4&&i.flag"
              @click.stop="orderChangeStatus(4,item.orderId,i)"
            >已评价</div>
            <!-- <div v-if="item.orderStatus==9">已评价</div> -->
            <div @click.stop="goBuy(i.commodityId)">再次购买</div>
          </div>
        </div>
      </div>

      <!-- 商品数量及价格 -->
      <div class="goods_total">
        <div>
          <span>共{{item.sumCommodity}}件商品</span>
          <span style="margin-left:1.5rem;">合计:￥</span>
          <!-- <span v-else style="margin-left:1.5rem;">合计:</span> -->
          <span class="price">{{item.sumAmount}}</span>
        </div>
      </div>

      <!-- 根据状态显示不同按钮 -->
      <div class="order_btn_apply">
        <!-- 待付款 -->
        <button
          v-if="item.orderStatus==1"
          @click.stop="orderChangeCancel(item.orderStatus,item.userId,item.orderId)"
        >取消订单</button>
        <button v-if="item.orderStatus==1" @click.stop="orderChangePayment(item)">去付款</button>

        <!-- 待发货 -->
        <button
          v-if="item.orderStatus==2&&item.commodityArea!=4"
          @click.stop="orderChangeCancel(item.orderStatus,item.userId,item.orderId)"
        >取消订单</button>

        <!-- 待收货 -->
        <!-- <button v-if="item.orderStatus==2" @click="orderChangeStatus(1)">查看物流</button> -->
        <!-- <button v-if="item.orderStatus==3" @click.stop="orderChangeStatus(2)">申请退货</button>
        <button v-if="item.orderStatus==3" @click.stop="orderChangeStatus(3)">申请换货</button>-->
        <button
          v-if="item.orderStatus==3"
          @click.stop="orderChangeReceiving(item.orderStatus,item.userId,item.orderId)"
        >确认收货</button>

        <!-- 交易完成 -->
        <!-- <button v-if="item.orderStatus==4" @click.stop="orderChangeStatus(4,item.orderId)">商品评价</button> -->
        <!-- <button v-if="item.orderStatus==4" @click.stop="orderChangeStatus(5)">再次购买</button> -->
        <el-button disabled v-if="item.orderStatus==9">已评价</el-button>
        <button v-if="item.orderStatus==6">已取消</button>
        <button v-if="item.orderStatus==7">取消中</button>
      </div>
    </div>

    <!-- 支付弹窗 -->
    <van-popup v-model="addshow" position="bottom">
      <div class="cc_pay">
        <div class="cc_pay_header">
          <div class="top">确认支付</div>
          <div class="center">￥{{amoutSum}}</div>
        </div>
        <div class="select">选择支付方式</div>
        <div class="cc_pay_body" @click="changePay(0, 1)">
          <img src="../../../../img/index/car/wx.png">
          <div>微信支付</div>
          <img class="cc_p_yes" src="../../../../img/index/car/yes.png" v-if="showYes == 0">
        </div>
        <div class="cc_pay_body" @click="changePay(1, 2)" v-if="!browser.isWX">
          <img src="../../../../img/index/car/zfb.png">
          <div>支付宝支付</div>
          <img class="cc_p_yes" src="../../../../img/index/car/yes.png" v-if="showYes == 1">
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { MessageBox } from "mint-ui";
import { Toast } from "vant";
export default {
  props: ["all_orders_list"],
  data() {
    return {
      addshow: false, // 支付弹窗
      amoutSum: 0, // 支付金额
      showYes: -1,
      orderNum: "", // 订单号
      pays: {}, // app获取的支付通道
      localUrl: [] // 当前地址
    };
  },

  created() {
    this.localUrl = window.location.href.split(":");
    if (this.localUrl[0] == 'file') {
      mui.plusReady(() => {
        this.getChannels() // 获取支付通道
      })
    }
  },


  methods: {
    // 弹窗支付
    changePay(i, id) {
      this.showYes = i;
      if (id === 1) {
        if (this.localUrl[0] == 'file') {
          // app端微信支付
          this.pay('WXPAY', this.orderNum)
        } else {
          // 其他微信支付
          this.wxPay(this.orderNum)
        }

        // 支付宝支付
      } else if (id === 2) {
        if (this.localUrl[0] == 'file') {
          // app端支付宝支付
          this.pay('ALIPAY', this.orderNum)
        } else {
          // 网页支付宝支付
          this.pay1(this.orderNum);
        }
      }
    },

    // app 支付获取支付通道
    getChannels() {
      let _this = this
      plus.payment.getChannels((channels) => {
        for (let i in channels) {
            let channel = channels[i]
            if (channel.id == 'qhpay' || channel.id == 'qihoo') { // 过滤掉不支持的支付通道：暂不支持360相关支付
              continue;
            }
            _this.pays[channel.id] = channel;
            // self.checkServices(channel);
          }
      }, function(e){
        alert("获取支付通道失败："+ e.message);
      });
    },

    // App支付
    pay(payWay, orderNum) {
      let paymentInfo = {}
      let api = ''
      let _this = this

      if (payWay === 'WXPAY') {
        // 微信支付
        // 根据订单数量更改接口地址
        api = 'inside/weChatPay/pay'
        this.pays.url = this.HOME + this.ORDER + api // 填写微信的数据请求访问地址
        paymentInfo = {
          type: 3,
          orderNum: orderNum
        }
      } else {
        // 支付宝支付
        // 根据订单数量更改接口地址
        api = 'inside/alipay/pay'
        this.pays.url = this.HOME + this.ORDER + api // 填写微信的数据请求访问地址
        paymentInfo = {
          type: 3,
          orderNum: orderNum
        }
      }

      this.$api.post(this.pays.url, paymentInfo)
      .then((res) => {
        console.log(_this.pays[payWay.toLowerCase()])
        let msg = res.data.data
        if (payWay === 'WXPAY') {
          msg.package = 'Sign=WXPay'
          delete msg['packageValue'];
        }

        console.log("msg " + JSON.stringify(msg))

        //hbuilder支付方法
        plus.payment.request(_this.pays[payWay.toLowerCase()], msg, function (result) {
          // 支付成功
          _this.$router.replace({
            path: '/caryes?status=ok'
          })
        }, function (error) {
          // 支付失败
          _this.$router.replace({
            path: '/caryes?status=er'
          })
        });
      }).catch((err) => {
        // console.log('err ' + JSON.stringify(err))
      })
    },

    // zfb
    pay1(num) {
      let obj = {
        orderNum: num
      };
      this.$api
        .post(this.HOME + this.ORDER + "inside/alipay/pay", obj)
        .then(res => {
          console.log(res);
          if (res.data.status == 200) {
            const zfb = document.getElementById('zfb')
            zfb.innerHTML = res.data.data; //此处form就是后台返回接收到的数据
            document.forms[0].submit();
          }
        });
    },

    //wx
    wxPay (num) {
      const openid = localStorage.getItem('openid') || false
          let config = {}
          if (openid) {
            config = {
              orderNum: num,
              openId: openid
            }
          } else {
            config = {
              orderNum: num
            }
          }
      this.$api
        .post(this.HOME + this.ORDER + 'inside/weChatPay/pay', config)
        .then(res => {
          if (res.data.status == 200) {
            window.location.replace(res.data.data)
          } else if (res.data.status == 201) {
             this.inhertPay(res.data.data)
          } else {
            Toast(res.data.msg);
          }
        })
        .catch((error) => {
          this.$router.replace({
            path: "/caryes?status=unpaid"
          });
        });
    },


  // 微信内部浏览器支付
  inhertPay(data) {
    let vm = this
    if (typeof WeixinJSBridge == "undefined"){
      if( document.addEventListener ){
        document.addEventListener('WeixinJSBridgeReady', vm.onBridgeReady(data), false);
      }else if (document.attachEvent){
        document.attachEvent('WeixinJSBridgeReady', vm.onBridgeReady(data)); 
        document.attachEvent('onWeixinJSBridgeReady', vm.onBridgeReady(data));
      }
    } else {
      vm.onBridgeReady(data);
    }
  },

  onBridgeReady(data) {
    // alert(JSON.stringify(data))
    // alert(data.timeStamp)
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest', {
          appId: data.appId, // 公众号名称，由商户传入
          timeStamp: data.timeStamp, // 时间戳，自1970年以来的秒数
          nonceStr: data.nonceStr, // 随机串
          package: data.prepayId,
          signType: "MD5", // 微信签名方式
          paySign: data.sign // 微信签名
        },
        function(res){
          // alert(JSON.stringify(res))
          if(res.err_msg == "get_brand_wcpay_request:ok" ){
            Toast.success('支付成功')
            this.$router.replace({
              path: '/wxyes'
            })
            // 使用以上方式判断前端返回,微信团队郑重提示：
            //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
          } else {
            Toast('支付失败')
          }
    });
  },


    // 进入订单详情
    orderDetails(id) {
      this.$router.push({
        path: "orderDetails?id=" + id
      });
    },

    // 取消订单
    orderChangeCancel(res, userId, orderId) {
      if (res == 1) {
        MessageBox.confirm("确定取消订单吗?").then(action => {
          var json = {
            orderId: orderId,
            orderStatus: 6
          };
          this.$api
            .post(this.HOME + this.ORDER + "inside/updateUserOrderStatus", json)
            .then(res => {
              if (res.data.status == 200) {
                this.$emit("getjson", 1);
                Toast("订单已取消");
              } else {
                Toast("取消订单失败，请重试");
              }
            })
            .catch(err => {
              console.log(err);
              Toast("取消订单失败，请检查网络后重试", 2000);
            });
        });
      } else if (res == 2) {
        MessageBox.confirm("确定取消订单吗?").then(action => {
          var json = {
            orderId: orderId,
            orderStatus: 7
          };
          this.$api
            .post(this.HOME + this.ORDER + "inside/updateUserOrderStatus", json)
            .then(res => {
              if (res.data.status == 200) {
                this.$emit("getjson", 1);
                Toast("订单已取消");
              } else {
                Toast("取消订单失败，请重试");
              }
            })
            .catch(err => {
              console.log(err);
              Toast("取消订单失败，请检查网络后重试", 2000);
            });
        });
      }
    },

    //去付款
    orderChangePayment(item) {
      this.orderNum = item.orderNum;
      this.amoutSum = item.cashAmount;
      this.addshow = true;
      console.log(item);
    },

    //申请退换货 评价 再次购买
    orderChangeStatus(res, index, info) {
      if (res == 1) {
        //查看物流
      } else if (res == 2) {
        //申请退货
        this.$router.push({ path: "/replacement?status=1" });
      } else if (res == 3) {
        //申请换货
        this.$router.push({ path: "/replacement?status=1" });
      } else if (res == 4) {
        //商品评价
        const arr = JSON.stringify(info);
        window.sessionStorage.setItem("order", arr);
        this.$router.push({ path: "commodityEvaluation?id=" + index });
      } else if (res == 5) {
        // 再次购买
        this.$router.push({
          path: "/detail?id=" + index
        });
      }
    },

    //再次购买
    goBuy(id) {
      this.$router.push({
        path: "/detail?id=" + id
      });
    },

    //确认收货
    orderChangeReceiving(res, userId, orderId) {
      if (res == 3) {
        MessageBox.confirm("确定收货吗?").then(action => {
          const json = {
            orderId: orderId,
            orderStatus: 4
          };
          this.$api
            .post(this.HOME + this.ORDER + "inside/userAffirm", json)
            .then(res => {
              if (res.data.status == 200) {
                Toast("确认收货成功");
                this.$emit("getjson", 3);
              } else {
                Toast(res.data.data.msg);
              }
            })
            .catch(err => {
              console.log(err);
            });
        });
      }
    },

    //  去商品详情页再次购买 暂时不需要
    goDetail(id) {
      this.$router.push({
        path: "/detail?id=" + id
      });
    },

    // 去店铺首页
    goShop(id) {
      this.$router.push({
        path:'indexS?shopId=' + id
      })
    }
  }
};
</script>

<style scoped lang="less">
.order_status_all {
  width: 100%;
  // height: 24rem;
  margin-top: 1.5rem;
  padding: 0px 1.5rem;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  background: white;
  border-radius: 6px;
  .mixin_list {
  }
  .order_number_apply {
    width: 100%;
    height: 3.75rem;
    line-height: 3.75rem;
    border-bottom: 1px solid #f6f6f6;
    position: relative;
    img {
      width: 1.6rem;
      height: 1.6rem;
      -vertical-align: middle;
      display: inline-block;
      position: absolute;
      top: 50%;
      left: 0rem;
      margin-top: -0.8rem;
    }
    span:nth-of-type(1) {
      height: 1.6rem;
      line-height: 1.6rem;
      font-size: 1.4rem;
      display: inline-block;
      position: absolute;
      top: 50%;
      left: 2.6rem;
      margin-top: -0.8rem;
    }
    span:nth-of-type(2) {
      height: 1.6rem;
      line-height: 1.6rem;
      font-size: 1.4rem;
      display: inline-block;
      position: absolute;
      top: 50%;
      right: 0rem;
      color: #00ae87;
      margin-top: -0.8rem;
    }
  }
  .order_information_apply {
    width: 100%;
    padding: 1.5rem 0;
    border-bottom: 1px solid #f6f6f6;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .order_information_left_apply {
      width: 8rem;
      height: 8rem;
      img {
        width: 8rem;
        height: 100%;
      }
    }
    .order_information_right_apply {
      width: 100%;
      height: 8rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding-left: 1.5rem;
      .product-name {
        font-size: 1.4rem;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        /*! autoprefixer: off */
        -webkit-box-orient: vertical;
        /*! autoprefixer: on */
        overflow: hidden;
      }
      .product-info {
        width: 100%;
        font-size: 1.2rem;
        color: #666666;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .return-back {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        div {
          padding: 0.2rem 0.6rem;
          border: 1px solid #eee;
          border-radius: 6px;
        }
      }
    }
  }
  .goods_total {
    width: 100%;
    height: 4rem;
    position: relative;
    div {
      height: 5rem;
      line-height: 5rem;
      position: absolute;
      top: 50%;
      right: 0rem;
      margin-top: -2rem;
      .price {
        font-size: 1.8rem;
        font-weight: bold;
      }
    }
  }
  .order_btn_apply {
    width: 100%;
    height: 5rem;
    padding: 1rem 0rem;
    box-sizing: border-box;
    button {
      float: right;
      height: 2.5rem;
      margin-left: 1rem;
      background: white;
      border-radius: 1.5rem;
      line-height: 2.5rem;
      padding: 0rem 0.8rem;
      box-sizing: border-box;
      border: 1px solid #dddddd;
      font-size: 1.3rem;
    }
  }
}

// 付款弹框
.cc_pay {
  padding: 0rem 0rem 20rem 0rem;
  border-top: 0.4rem solid #f4f4f4;
  .cc_pay_header {
    width: 100%;
    text-align: center;
    font-size: 1.5rem;
    margin: 3rem 0 0 0;
    .top {
      color: #333;
      font-weight: bold;
    }
    .center {
      font-size: 3.9rem;
      color: #00ae87;
      margin: 3rem 0 0 0;
    }
    .bottom {
      font-size: 1.3rem;
      color: #999;
    }
  }
  .select {
    width: 100%;
    height: 5rem;
    line-height: 4.5rem;
    font-size: 1.4rem;
    border-top: 0.1rem solid #f2f2f2;
    border-bottom: 1rem solid #f2f2f2;
    padding-left: 1.5rem;
  }
  .cc_pay_body {
    width: 100%;
    height: 4.6rem;
    line-height: 4.5rem;
    overflow: hidden;
    border-bottom: 0.1rem solid #f2f2f2;
    position: relative;
    padding-left: 1.5rem;
    img {
      width: 2.3rem;
      height: 2.3rem;
    }
    div {
      height: 90%;
      display: inline-block;
      background-color: #ffff;
      font-size: 1.4rem;
    }
    .cc_p_yes {
      width: 1.7rem;
      height: 1.2rem;
      margin-right: 1rem;
      position: absolute;
      top: 50%;
      right: 8%;
      transform: translateY(-50%);
    }
  }
}
</style>