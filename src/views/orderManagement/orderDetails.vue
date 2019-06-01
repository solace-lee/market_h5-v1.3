<template>
  <div id="allOrders">
    <div class="head">
      <div class="site">
        <div @click="$router.go(-1)">
          <span style="width: 1rem;"></span>
          <van-icon name="arrow-left"/>
        </div>
      </div>
      <div class="title">
        <span>{{theme}}</span>
      </div>
    </div>

    <!-- 订单状态 -->
    <div class="order_head_status" v-if="detailsList.length!=0">
      <span v-if="detailsList.orderStatus==1">待支付</span>
      <span v-if="detailsList.orderStatus==2">待发货</span>
      <span v-if="detailsList.orderStatus==3">待确认({{expressStauts}})</span>
      <span v-if="detailsList.orderStatus==4">待评价</span>
      <span v-if="detailsList.orderStatus==5">待退货</span>
      <span v-if="detailsList.orderStatus==6">已取消</span>
      <span v-if="detailsList.orderStatus==7">取消中</span>
      <span v-if="detailsList.orderStatus==8">保留</span>
      <span v-if="detailsList.orderStatus==9">已评价</span>
      <!-- <span>预计16天16小时后会收到货物</span> -->
      <span v-if="detailsList.orderStatus==1">如有需要，请支付</span>
      <span v-if="detailsList.orderStatus==2">处理中</span>
      <span v-if="detailsList.orderStatus==3">收到货物，请确认</span>
      <span v-if="detailsList.orderStatus==4">感谢您的支持</span>
      <span v-if="detailsList.orderStatus==5">处理中</span>
      <span v-if="detailsList.orderStatus==6"></span>
      <span v-if="detailsList.orderStatus==7">处理中</span>
      <span v-if="detailsList.orderStatus==8">保留</span>
      <span v-if="detailsList.orderStatus==9">感谢您的支持</span>
    </div>

    <!-- 快递信息 -->
    <div class="express-container" v-show="detailsList.orderStatus==3">
      <div class="express-area">
        <van-steps direction="vertical" :active="0">
          <van-step v-for="(i,index) in expressInfo" :key="index">
            <h3>{{i.status}}</h3>
            <p>{{i.time}}</p>
          </van-step>
        </van-steps>
      </div>
    </div>

    <!-- 商品信息 -->
    <section class="order_decorate" v-if="detailsList.length!=0" @click.stop="goShop(detailsList.shopId)">
      <div class="order_status_all">
        <div class="order_number_apply">
          <img src="../../../img/index/replacement/shop.png">
          <span>
            {{detailsList.shopName}}
            <i class="el-icon-arrow-right"></i>
          </span>
        </div>

        <!-- 订单详情 -->
        <div
          class="order_information_apply"
          v-for="(i, keys) in detailsList.commodityVos"
          :key="keys"
          @click="goDetail(i.commodityId)"
        >
          <div class="order_information_left_apply">
            <img style="width: 8rem;height: 8rem;" :src="i.imgUrl">
          </div>
          <div class="order_information_right_apply">
            <div class="product-name">{{i.name}}</div>
            <div class="product-info">
              <span>{{i.specificationName}}</span>
              <span v-if="detailsList.commodityArea != 4">x{{i.quantity}}&nbsp;&nbsp;￥{{i.orderAmount}}</span>
              <span v-else>x{{i.quantity}}&nbsp;&nbsp;{{i.orderAmount}}积分</span>
            </div>
            <div class="return-back">
              <div
                v-if="detailsList.orderStatus==4"
                @click.stop="orderChangeStatus(4,detailsList.orderId,i)"
              >商品评价</div>
              <div v-if="detailsList.orderStatus==9">已评价</div>
            </div>
          </div>
        </div>

        <!-- 商品数量及价格 -->
        <div class="goods_total">
          <div>
            <span>共{{detailsList.sumCommodity}}件商品</span>
            <span v-if="detailsList.commodityArea != 4" style="margin-left:1.5rem;">合计:￥</span>
            <span v-else style="margin-left:1.5rem;">合计:</span>
            <span style="font-size: 1.8rem;">{{detailsList.discountPrice}}<span v-if="detailsList.commodityArea == 4">积分</span></span>
          </div>
        </div>
        <div class="order_btn_apply">
          <div class="order_btn_apply_right">
            <button
              v-if="detailsList.orderStatus==3"
              @click.stop="orderChangeReceiving(detailsList.orderStatus,detailsList.userId,detailsList.orderId)"
            >确认收货</button>
            <button
              v-if="detailsList.orderStatus==1"
              @click.stop="orderChangePayment(detailsList)"
            >去付款</button>
          </div>
        </div>
      </div>
    </section>

    <!-- 商品规格 -->
    <section class="order_decorate" v-if="detailsList.length!=0">
      <div class="settlement_money">
        <div class="commodity_price">
          <span>商品价格</span>
          <span v-if="detailsList.commodityArea != 4">￥{{detailsList.discountPrice}}</span>
          <span v-else>{{detailsList.integralAmount}}积分</span>
        </div>
        <div class="freight">
          <span>运费</span>
          <span>￥{{detailsList.courierFees}}</span>
        </div>
        <div class="freight" v-if="detailsList.commodityArea != 4">
          <span>创业基金</span>
          <span>-￥{{detailsList.ventureAmount}}</span>
        </div>
        <div class="freight" v-if="detailsList.commodityArea != 4">
          <span>余额</span>
          <span>-￥{{detailsList.cashBalance}}</span>
        </div>
        <!-- <div class="freight">
          <span>现金</span>
          <span>￥-{{detailsList.cashAmount}}</span>
        </div> -->
        <div class="payment">
          <span>实付现金</span>
          <span v-if="detailsList.commodityArea != 4">￥{{detailsList.cashAmount}}</span>
          <span v-else>￥{{detailsList.courierFees}}</span>
        </div>
      </div>
    </section>

    <!-- 订单信息 -->
    <section class="order_decorate" v-if="detailsList.length!=0">
      <div class="order_number_info">
        <div class="order_number">
          <span>订单编号</span>
          <span>{{detailsList.orderNum}}</span>
          <span>
            <button class="tag-read" :data-clipboard-text="detailsList.orderNum" @click="copy">复制</button>
          </span>
        </div>
        <div class="order_date">
          <span>下单日期</span>
          <span>{{detailsList.createdDate}}</span>
        </div>
        <div class="payment_method" v-if="detailsList.orderStatus!=1">
          <span>支付方式</span>
          <span v-if="detailsList.paymentChannel==0">支付宝</span>
          <span v-if="detailsList.paymentChannel==1">微信</span>
        </div>
        <div class="payment_date" v-if="detailsList.orderStatus!=1">
          <span>支付日期</span>
          <span>{{detailsList.createdDate}}</span>
        </div>
        <div class="logistics_number" v-if="detailsList.orderStatus>2">
          <span>物流单号</span>
          <span>{{detailsList.trackingNum}}</span>
        </div>
        <div class="logistics_company" v-if="detailsList.orderStatus>2">
          <span>物流公司</span>
          <span>{{detailsList.sellerCourierName}}</span>
        </div>
        <div class="contact_seller" @click="goKefu">
          <img src="../../../img/index/replacement/phone.png">
          <span>联系卖家</span>
        </div>
      </div>
    </section>

    <!-- 地址信息 -->
    <section class="order_decorate" v-if="detailsList.length!=0">
      <div class="sir_address">
        <div class="sir_address_left">
          <img src="../../../img/index/replacement/address.png">
          <span>{{addressList.contact}}</span>
        </div>
        <div class="sir_address_right">
          <span>{{addressList.phone}}</span>
          <div>{{addressList.provinceName}}{{addressList.cityName}}{{addressList.districtName}}{{addressList.detailAddress}}</div>
        </div>
      </div>
    </section>

    <!-- 订单操作 -->
    <div class="details_btn" v-if="detailsList.length!=0">
      <!-- 待发货 -->
      <!-- 待付款 -->
      <button
        v-if="detailsList.orderStatus==1"
        @click="orderChangeCancel(detailsList.orderStatus,detailsList.userId,detailsList.orderId)"
      >取消订单</button>

      <button
        v-if="detailsList.orderStatus==2&&detailsList.commodityArea!=4"
        @click="orderChangeCancel(detailsList.orderStatus,detailsList.userId,detailsList.orderId)"
      >取消订单</button>

      <!-- 待发货 -->
      <!-- <button
        v-if="detailsList.orderStatus==2"
        @click="orderChangeCancel(detailsList.orderStatus,detailsList.userId,detailsList.orderId)"
      >取消订单</button>-->

      <!-- 待收货 -->
      <!-- <button v-if="detailsList.orderStatus==2" @click="orderChangeStatus(1)">查看物流</button>
      <button v-if="detailsList.orderStatus==3" @click="orderChangeStatus(2)">申请退货</button>
      <button v-if="detailsList.orderStatus==3" @click="orderChangeStatus(3)">申请换货</button>-->
      <button
        v-if="detailsList.orderStatus==3"
        @click="orderChangeReceiving(detailsList.orderStatus,detailsList.userId,detailsList.orderId)"
      >确认收货</button>

      <!-- 交易完成 -->
      <!-- <button
        v-if="detailsList.orderStatus==4"
        @click="orderChangeStatus(4,detailsList.detailsId)"
      >商品评价</button>-->
      <!-- <button v-if="detailsList.orderStatus==4" @click="orderChangeStatus(5)">再次购买</button> -->
      <el-button disabled v-if="detailsList.orderStatus==9">已评价</el-button>
      <button v-if="detailsList.orderStatus==6">已取消</button>
    </div>

    <!-- 客服弹框 -->
    <div class="bar-server" v-show="kefu">
      <div class="server-container">
        <div class="infomation-area">
          <div class="keyvalue">{{detailsList.contactPhone}}</div>
          <div class="keyname">
            <div @click="kefu=false">取消</div>
            <a :href="'tel:' + detailsList.contactPhone">呼叫</a>
          </div>
        </div>
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
          <img src="../../../img/index/car/wx.png">
          <div>微信支付</div>
          <img class="cc_p_yes" src="../../../img/index/car/yes.png" v-if="showYes == 0">
        </div>
        <div class="cc_pay_body" @click="changePay(1, 2)" v-if="!browser.isWX">
          <img src="../../../img/index/car/zfb.png">
          <div>支付宝支付</div>
          <img class="cc_p_yes" src="../../../img/index/car/yes.png" v-if="showYes == 1">
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import Clipboard from "clipboard";
import { MessageBox } from "mint-ui";
import { Toast } from "vant";
export default {
  data() {
    return {
      theme: "订单详情",
      showYes: -1,
      detailsList: [],
      addressList: {},
      kefu: false, // 联系卖家弹框
      expressInfo: [], //快递信息
      expressStauts: "", // 快递状态
      addshow: false, // 支付弹窗
      amoutSum: 0, // 支付金额
      orderNum: "", // 订单号
      pays: {}, // app获取的支付通道
      localUrl: [] // 当前地址
    };
  },
  created() {
    var body_s = document.getElementsByTagName("body")[0];
    body_s.style.background = "#f2f2f2";
    this.getJson();
    this.localUrl = window.location.href.split(":");
    if (this.localUrl[0] == 'file') {
      mui.plusReady(() => {
        this.getChannels() // 获取支付通道
      })
    }
    // this.getAddress();
    // this.getExpress()
  },
  methods: {
    //获取物流详情
    getExpress(id) {
      this.$api
        .get(this.HOME + this.ORDER + "kuaiDi?no=" + id + '&expressName=' + this.detailsList.sellerCourierName)
        .then(res => {
          console.log(123132123);
          
          this.expressInfo = res.data.data.result.list
          const status = parseInt(res.data.data.result.deliverystatus);
          switch (status) {
            case 0:
              this.expressStauts = "快递收件(揽件)";
              break;
            case 1:
              this.expressStauts = "在途中";
              break;
            case 2:
              this.expressStauts = "正在派件";
              break;
            case 3:
              this.expressStauts = "已签收";
              break;
            case 4:
              this.expressStauts = "派送失败";
              break;
            case 5:
              this.expressStauts = "疑难件";
              break;
            case 6:
              this.expressStauts = "退件签收";
              break;

            default:
              break;
          }
        });
    },

    // 订单详情
    getJson() {
      this.$api
        .get(
          this.HOME +
            this.USER +
            "inside/showOrderDetails/" +
            this.$route.query.id
        )
        .then(res => {
          this.detailsList = res.data.data;
          if (res.data.data.trackingNum) {
            this.getExpress(res.data.data.trackingNum);
          }
          //查询地址
          this.getAddress(this.detailsList.addressId);
        })
        .catch(err => {
          // console.log(err);
        });
    },

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
        // console.log(_this.pays[payWay.toLowerCase()])
        let msg = res.data.data
        if (payWay === 'WXPAY') {
          msg.package = 'Sign=WXPay'
          delete msg['packageValue'];
        }

        // console.log("msg " + JSON.stringify(msg))

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
        console.log('err ' + JSON.stringify(err))
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
          if (res.data) {
            const div = document.createElement("div");
            div.innerHTML = res.data; //此处form就是后台返回接收到的数据
            document.body.appendChild(div);
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


    // 去付款
    orderChangePayment(item) {
      this.orderNum = item.orderNum;
      if (this.detailsList.commodityArea == 4) {
        this.amoutSum = this.detailsList.courierFees
      } else {
        this.amoutSum = item.cashAmount;
      }
      this.addshow = true;
    },

    // 获取订单地址信息
    getAddress(id) {
      this.$api
        .get(
          this.HOME +
            this.ORDER +
            "inside/address/getAddressByAddressId?addressId=" +
            id
        )
        .then(res => {
          // console.log("address", res);
          this.addressList = res.data.data;
        })
        .catch(err => {
          // console.log(err);
        });
    },

    // 返回顶部
    backTop() {
      const scrollHight = document.documentElement.scrollTop;
      if (scrollHight > 50) {
        // document.documentElement.scrollTop = scrollHight - 40;
        window.scrollTo(0, scrollHight - 40)
        setTimeout(() => {
          this.backTop();
        }, 10);
      } else {
        // document.documentElement.scrollTop = 0;
        window.scrollTo(0, 0)
      }
    },

    // 复制模块
    copy() {
      var clipboard = new Clipboard(".tag-read");
      clipboard.on("success", e => {
        this.$message.success("复制成功");
        // 释放内存
        clipboard.destroy();
      });
      clipboard.on("error", e => {
        this.$message.error("该浏览器不支持自动复制");
        // 释放内存
        clipboard.destroy();
      });
    },

    // 返回？
    exchangeEvent() {
      this.$router.push({ path: "/replacement?status=1" });
    },

    //取消订单
    orderChangeCancel(res, userId, orderId) {
      if (res == 1) {
        MessageBox.confirm("确定取消订单吗?").then(action => {
          var json = {
            userId: userId,
            orderId: orderId,
            orderStatus: 6
          };
          this.$api
            .post(this.HOME + this.ORDER + "inside/updateUserOrderStatus", json)
            .then(res => {
              this.getJson(1);
            })
            .catch(err => {
              // console.log(err);
            });
        });
      } else if (res == 2) {
        MessageBox.confirm("确定取消订单吗?").then(action => {
          var json = {
            userId: userId,
            orderId: orderId,
            orderStatus: 7
          };
          this.$api
            .post(this.HOME + this.ORDER + "inside/updateUserOrderStatus", json)
            .then(res => {
              this.getJson(1);
            })
            .catch(err => {
              // console.log(err);
            });
        });
      }
    },

    //确认收货
    orderChangeReceiving(res, userId, orderId) {
      if (res == 3) {
        MessageBox.confirm("确定收货吗?").then(action => {
          var json = {
            orderId: orderId,
            orderStatus: 4
          };
          this.$api
            .post(this.HOME + this.ORDER + "inside/userAffirm", json)
            .then(res => {
              if (res.data.status == 200) {
                Toast("确认收货成功");
                this.getJson(3);
              } else {
                Toast(res.data.msg);
              }
            })
            .catch(err => {
              // console.log(err);
            });
        });
      }
    },
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
        //再次购买
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
    },

    // 客服
    goKefu() {
      this.kefu = !this.kefu;
    }
  }
};
</script>
<style lang="less" scoped>
#allOrders {
  width: 100%;
  .mixin_list() {
    padding: 0px 1.5rem;
    box-sizing: border-box;
    background: white;
    border-radius: 0.4rem;
  }

  //快递信息
  .express-container {
    width: 100%;
    padding: 1.5rem 1.5rem 0 1.5rem;
    overflow: hidden;
    .express-area {
      width: 100%;
      max-height: 22rem;
      background: #fff;
      border-radius: 6px;
      overflow-y: scroll;
    }
  }

  .order_decorate {
    height: 100%;
    padding: 0rem 1.5rem 1.5rem 1.5rem;
    box-sizing: border-box;
  }
  .head {
    width: 100%;
    height: 4.7rem;
    background-color: #ffffff;
    display: flex;
    position: fixed;
    top: 0rem;
    z-index: 100;
    border-bottom: 1px solid #f2f2f2;
    font-size: 1.5rem;
    .site {
      width: 4rem;
      height: 100%;
      display: flex;
      position: absolute;
      color: #000;
      div {
        display: flex;
        justify-content: center;
        align-items: center;
        .van-icon-location {
          vertical-align: middle;
        }
        span {
          font-size: 1rem;
        }
      }
    }

    .title {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      span {
        color: #000;
        margin-right: 0.5rem;
      }
    }
  }

  .order_head_status {
    width: 100%;
    height: 7rem;
    margin-top: 4.7rem;
    background: #00ae87;
    padding: 0rem 3rem;
    box-sizing: border-box;
    line-height: 7rem;
    color: #ffffff;
    span:nth-of-type(1) {
      float: left;
      font-size: 1.8rem;
    }
    span:nth-of-type(2) {
      float: right;
      font-size: 1.1rem;
    }
  }

  .order_status_all {
    width: 100%;
    // height: 24rem;
    margin-top: 1.5rem;
    .mixin_list();
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
        i {
          margin-left: 1rem;
        }
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
      }
    }
    .order_btn_apply {
      width: 100%;
      height: 5rem;
      padding: 1rem 0rem;
      box-sizing: border-box;
      position: relative;
      .order_btn_apply_right {
        float: right;
        width: 11.5rem;
        button {
          float: right;
          height: 2.5rem;
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
  }

  .settlement_money {
    width: 100%;
    // height: 11.2rem;
    .mixin_list();
    padding: 0.5rem 1.5rem 0rem 1.5rem;
    .mixin_price() {
      width: 100%;
      height: 3rem;
      line-height: 3rem;
    }
    .mixin_price_title() {
      float: left;
    }
    .mixin_price_num() {
      float: right;
    }
    .commodity_price {
      .mixin_price();
      span:nth-of-type(1) {
        .mixin_price_title();
      }
      span:nth-of-type(2) {
        .mixin_price_num();
      }
    }
    .freight {
      .mixin_price();
      span:nth-of-type(1) {
        .mixin_price_title();
      }
      span:nth-of-type(2) {
        .mixin_price_num();
      }
    }
    .payment {
      width: 100%;
      height: 4rem;
      line-height: 4rem;
      margin-top: 0.5rem;
      border-top: 1px solid #f2f2f2;
      span:nth-of-type(1) {
        .mixin_price_title();
      }
      span:nth-of-type(2) {
        .mixin_price_num();
        color: #00ae87;
      }
    }
  }

  .order_number_info {
    width: 100%;
    // height: 23.2rem;
    .mixin_list();
    padding: 0.5rem 1.5rem 0rem 1.5rem;
    .mixin_price() {
      width: 100%;
      height: 3rem;
      line-height: 3rem;
    }
    .mixin_price_title() {
      float: left;
      width: 28%;
      display: inline-block;
    }
    .mixin_price_num() {
      float: left;
      width: 72%;
      display: inline-block;
      font-size: 1.3rem;
    }
    .order_number {
      .mixin_price();
      span:nth-of-type(1) {
        .mixin_price_title();
      }
      span:nth-of-type(2) {
        .mixin_price_num();
        width: 52%;
      }
      span:nth-of-type(3) {
        width: 20%;
        height: 3rem;
        float: right;
        display: inline-block;
        position: relative;
        button {
          position: absolute;
          right: 0rem;
          top: 50%;
          margin-top: -0.85rem;
          height: 1.7rem;
          background: white;
          border-radius: 1.5rem;
          line-height: 1.7rem;
          padding: 0rem 0.8rem;
          box-sizing: border-box;
          border: 1px solid #dddddd;
          font-size: 1.3rem;
        }
      }
    }
    .order_date {
      .mixin_price();
      span:nth-of-type(1) {
        .mixin_price_title();
      }
      span:nth-of-type(2) {
        .mixin_price_num();
      }
    }
    .payment_method {
      .mixin_price();
      span:nth-of-type(1) {
        .mixin_price_title();
      }
      span:nth-of-type(2) {
        .mixin_price_num();
      }
    }
    .payment_date {
      .mixin_price();
      span:nth-of-type(1) {
        .mixin_price_title();
      }
      span:nth-of-type(2) {
        .mixin_price_num();
      }
    }
    .logistics_number {
      .mixin_price();
      span:nth-of-type(1) {
        .mixin_price_title();
      }
      span:nth-of-type(2) {
        .mixin_price_num();
      }
    }
    .logistics_company {
      .mixin_price();
      span:nth-of-type(1) {
        .mixin_price_title();
      }
      span:nth-of-type(2) {
        .mixin_price_num();
      }
    }
    .contact_seller {
      width: 100%;
      height: 4rem;
      line-height: 4rem;
      margin-top: 0.5rem;
      border-top: 1px solid #f2f2f2;
      position: relative;
      img {
        width: 1.6rem;
        height: 1.6rem;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-top: -0.8rem;
        margin-left: -4.35rem;
      }
      span {
        height: 1.6rem;
        line-height: 1.6rem;
        font-size: 1.3rem;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-top: -0.8rem;
        margin-left: -1.25rem;
      }
    }
  }

  .sir_address {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 1.5rem;
    background: #fff;
    border-radius: 6px;
    .sir_address_left {
      display: flex;
      align-items: center;
      img {
        width: 1.6rem;
        height: 2rem;
      }
      span {
        height: 1.6rem;
        line-height: 1.6rem;
        font-size: 1.3rem;
        margin-left: 1rem;
      }
    }
    .sir_address_right {
      margin-left: 1.5rem;
      span:nth-of-type(1) {
        width: 100%;
        display: inline-block;
      }
      div {
        margin-top: 0.6rem;
      }
    }
  }

  .details_btn {
    width: 100%;
    height: 6rem;
    background: white;
    margin-top: 5rem;
    button {
      float: right;
      height: 2.5rem;
      margin-top: 1.75rem;
      margin-right: 1rem;
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

// 客服按钮
.bar-server {
  z-index: 14;
  position: fixed;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  .server-container {
    background: #fff;
    height: 10.5rem;
    width: 27rem;
    border-radius: 6px;
    overflow: hidden;
    .infomation-area {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      font-size: 1rem;
      color: #333;
      overflow: hidden;
      .keyvalue {
        height: 5.8rem;
        margin-top: 2rem;
        font-size: 1.7rem;
        color: #2d2c2c;
        font-weight: bold;
      }
      .keyname {
        height: 4.7rem;
        width: 100%;
        display: flex;
        align-items: center;
        div {
          flex: 1;
          line-height: 4.6rem;
          text-align: center;
          color: #00ae87;
          font-size: 1.6rem;
          border-top: 1px solid #eee;
          border-right: 1px solid #eee;
        }
        a {
          flex: 1;
          line-height: 4.6rem;
          text-align: center;
          color: #00ae87;
          font-size: 1.6rem;
          border-top: 1px solid #eee;
        }
      }
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