<template>
  <div class="carCconfirm">
    <!-- 头部 -->
    <div class="cc_head">
      <div>
        <van-icon name="arrow-left" @click="go" class="cc_h_go"/>
      </div>
      <div class="cc_h_text">确认订单</div>
      <div></div>
    </div>
    <!-- 身体部分- -->
    <div class="cc_body">
      <!-- 买家信息 -->
      <div class="cc_address" @click="goLocal()">
        <div class="ar_left">
          <van-icon name="location-o"/>
        </div>
        <div class="ar_center">
          <div class="firsr">
            <strong class="left">收货人：{{resslist.contact}}</strong>
            <span class="address-default" v-if="resslist.isDefault">默认</span>
            <strong class="right">{{resslist.phone}}</strong>
          </div>
          <div class="second">
            <strong>收货地址：</strong>
            <span>{{resslist.provinceName}}{{resslist.cityName}}{{resslist.districtName}}{{resslist.detailAddress}}</span>
          </div>
        </div>
        <div class="ar_right">
          <van-icon class="i" name="arrow"/>
        </div>
      </div>
      <!-- 商品-购物车部分 -->
      <span v-if="list.length">
        <!-- 隐藏用 -->
        <div class="cc_goods m-l-24" v-for="(item,index) in list" :key="index">
          <!-- 商品-商家 -->
          <div class="cc_goods_merchants">
            <div>
              <img :src="item.shopImgUrl" alt="加载失败，请稍刷新">
              <span @click="goIndexS(item.shopId)">{{item.shopName}}</span>
              <van-icon name="arrow" @click="goIndexS(item.shopId)"/>
            </div>
          </div>
          <!-- 商品-货物 -->
          <div
            class="cc_something"
            v-for="(goodsitem,goodsindex) in item.cartList"
            :key="goodsindex"
          >
            <div class="cc_something_img">
              <img :src="goodsitem.imgUrl" alt="加载失败，请稍刷新">
            </div>
            <div class="cc_something_goods">
              <div class="cc_g_top">
                <div class="name">
                  <span class="area" v-if="goodsitem.commodityArea == 1">生态市场</span>
                  <span class="area" v-else-if="goodsitem.commodityArea == 2">一村一品</span>
                  <span class="area orange" v-if="goodsitem.commodityArea == 3">会员专区</span>
                  <span>{{goodsitem.name}}</span>
                </div>
              </div>
              <div class="jj" v-if="goodsitem.commodityArea !== 4">
                <div
                  v-if="walletAmount>=(goodsitem.discountPrice*1000) * (goodsitem.commodityQuantity)/1000"
                  class="text"
                >使用基金￥{{numJJ(goodsitem) | number }}</div>
                <div
                  v-if="walletAmount<(goodsitem.discountPrice*1000) * (goodsitem.commodityQuantity)/1000"
                  class="text"
                >基金余额不足</div>
                <div class="chekbox">
                  <van-checkbox
                    class
                    v-model="goodsitem.toVenture"
                    checked-color="#00ae87"
                    :disabled="walletAmount<(goodsitem.discountPrice*1000) * (goodsitem.commodityQuantity)/1000"
                    @change="subJJ(goodsitem,index)"
                  ></van-checkbox>
                </div>
              </div>
              <div class="cc_g_bottom">
                <div class="size">
                  <span>规格：</span>
                  <span>{{goodsitem.linkValue}}</span>
                </div>
              </div>
              <div class="cc_g_express">
                <div class="money">
                  <span class="m1">￥</span>
                  <span
                    class="m2"
                  >{{(goodsitem.discountPrice*1000) * (goodsitem.commodityQuantity)/1000 |number }}</span>
                </div>
                <div class="num">
                  <span>X{{goodsitem.commodityQuantity}}</span>
                </div>
              </div>
            </div>
          </div>
          <!-- 买家留言 -->
          <div class="cc_box">
            <div class="f1">买家留言:</div>
            <div class="f3">
              <!--  v-model="goodsitem.leaveMsg" -->
              <input
                type="text"
                v-model="item.leaveMsg"
                placeholder="选填:填写内容已和卖家协商确定"
                maxlength="100"
              >
            </div>
          </div>
          <!-- 总金额 -->
          <div class="cc_someting_num">
            <div class="two">共{{allGoodNum(item.cartList)}}件商品</div>
            <div class="one">
              <span class="span">小计:</span>
              <span class="icon">￥</span>
              <span class="mon">{{goodsMoney(index)}}</span>
            </div>
          </div>
        </div>
      </span>

      <!--商品-直接购买部分  -->
      <div class="cc_goods m-l-24" v-if="!list.length">
        <!-- 商品-商家 -->
        <div class="cc_goods_merchants">
          <div>
            <img :src="li.shopImgUrl" alt="加载失败，请稍刷新">
            <span @click="goIndexS(item.shopId)">{{li.shopName}}</span>
            <van-icon name="arrow" @click="goIndexS(li.shopId)"/>
          </div>
        </div>
        <!-- 商品-货物 -->
        <div class="cc_something">
          <div class="cc_something_img">
            <img :src="li.imgUrl" alt="加载失败，请稍刷新">
          </div>
          <div class="cc_something_goods">
            <div class="cc_g_top">
              <div class="name">
                <span class="area" v-if="li.commodityArea == 1">生态市场</span>
                <span class="area" v-else-if="li.commodityArea == 2">一村一品</span>
                <span class="area orange" v-else-if="li.commodityArea == 3">会员专区</span>
                <span class="area orange" v-else-if="li.commodityArea == 4">积分商品</span>
                <span>{{li.name}}</span>
              </div>
            </div>
            <div class="jj" v-if="li.commodityArea !== 4">
              <div
                v-if="walletAmount>=(li.discountPrice*1000) * (li.commodityQuantity)/1000"
                class="text"
              >使用基金￥{{numJJ(li) | number }}</div>
              <div
                v-if="walletAmount<(li.discountPrice*1000) * (li.commodityQuantity)/1000"
                class="text"
              >基金余额不足</div>
              <div class="chekbox">
                <van-checkbox
                  class
                  v-model="li.toVenture"
                  checked-color="#00ae87"
                  :disabled="walletAmount<(li.discountPrice*1000) * (li.commodityQuantity)/1000"
                  @change="subJJ(li)"
                ></van-checkbox>
              </div>
            </div>
            <div class="cc_g_bottom">
              <div class="size">
                <span>规格：</span>
                <span>{{li.linkValue}}</span>
              </div>
              <!-- <div class="num">
                <span>X{{li.commodityQuantity}}</span>
              </div>
              <div class="money">
                <span class="m1">￥</span>
                <span class="m2">{{(li.discountPrice) * (li.commodityQuantity) | number }}</span>
              </div>-->
            </div>
            <div class="cc_g_express">
              <div class="money" v-if="li.commodityArea !== 4">
                <span class="m1">￥</span>
                <span class="m2">{{(li.discountPrice*1000) * (li.commodityQuantity)/1000 | number }}</span>
              </div>
              <div class="money" v-if="li.commodityArea == 4">
                <span class="m1">积分</span>
                <span class="m2">{{(li.discountPrice*1000) * (li.commodityQuantity)/1000}}</span>
              </div>
              <div class="num">
                <span>X{{li.commodityQuantity}}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 买家留言 -->
        <div class="cc_box">
          <div class="f1">买家留言:</div>
          <div class="f3">
            <input type="text" placeholder="选填:填写内容已和卖家协商确定" v-model="li.leaveMsg" maxlength="100">
          </div>
        </div>
        <!-- 总金额 -->
        <div class="cc_someting_num">
          <div class="two">共{{li.commodityQuantity}}件商品</div>
          <div class="one">
            <span class="span">小计:</span>
            <span class="icon" v-if="li.commodityArea !== 4">￥</span>
            <span class="mon">{{goodsMoney(-1)}}</span>
            <span class="icon" v-if="li.commodityArea == 4">积分</span>
          </div>
        </div>
      </div>

      <!-- 脚部 -->
      <div class="cc_footer">
        <div class="cc_f_box" @click="goExpress" v-if="false">
          <div class="f1">配送方式:</div>
          <div class="f3" v-if="expressName">
            <span>{{expressName}}</span>
            <span style="color:red" v-if="postage !== 0">运费￥{{postage}}</span>
            <van-icon class="i" name="arrow"/>
          </div>
          <div class="f3" v-if="!expressName">
            <span>请选择配送方式</span>
            <van-icon class="i" name="arrow"/>
          </div>
        </div>
        <div class="cc_f_box mb1" v-if="li.commodityArea == 4 ">
          <div class="f1" :class="{color:postage == 0 }">账户余额（￥{{isbalanceAll}}）</div>
          <div class="f3">
            <van-switch
              v-model="isbalanceChange"
              active-color="#07c160"
              inactive-color="#fff"
              size="20px"
              :disabled="postage == 0"
              @change="changeIsbalance"
            />
          </div>
        </div>
        <div class="cc_f_box mb1" v-if="li.commodityArea !== 4 ">
          <div class="f1">账户余额（￥{{isbalanceAll}}）</div>
          <div class="f3">
            <van-switch
              v-model="isbalanceChange"
              active-color="#07c160"
              inactive-color="#fff"
              size="20px"
              :disabled="isbalanceAll < orderAmount || isbalanceAll == 0"
              @change="changeIsbalance"
            />
          </div>
        </div>
        <!-- <div class="cc_f_box" v-if="isHongBaoS>10">
          <div class="f1" :class="{color:li.commodityArea == 4 }">使用红包</div>
          <div class="f3">
            <van-switch
              v-model="isHongBaoChange"
              active-color="#07c160"
              inactive-color="#fff"
              size="20px"
              :disabled="li.commodityArea == 4"
              @change="HongBaoChange"
            />
          </div>
        </div>-->
      </div>
    </div>

    <!-- 脚部提交订单 -->
    <div class="cc_submit">
      <div class="s_left">
        <div>
          <span v-if="li.commodityArea !== 4">订单总额:￥{{orderAmount | number}}</span>
          <span v-if="li.commodityArea == 4">订单总额:{{orderAmount}}积分</span>
          <span>快递费:￥{{postage | number}}</span>
        </div>
        <div>
          <span class="red">创业基金:￥{{ventureAmount | number}}</span>
          <span class="red">余&nbsp;&nbsp;&nbsp;&nbsp;额:￥{{cashBalance | number}}</span>
        </div>
      </div>
      <div class="s_right" @click="postComfirm">
        <span>提交订单</span>
      </div>
    </div>

    <!-- 快递选择弹窗 -->
    <van-popup v-model="expressShow" position="bottom" v-if="false">
      <div class="cc_pay2" v-if="false">
        <div class="cc_pay_header2">配送方式</div>
        <div
          class="cc_pay_body2"
          v-for="(item,index) in expressList"
          :key="index"
          @click="changeExpress(item)"
        >
          <div class="text">
            <div>{{item.kdName}}</div>
            <!-- <div class="right">运费￥{{item.kdPrice}}</div> -->
            <div class="right"></div>
            <div>
              <img src="../../../img/index/car/yes2.png" v-if="courierId == item.kuaidiId">
            </div>
          </div>
        </div>
      </div>
    </van-popup>
    <!-- 支付弹窗 -->
    <!-- :close-on-click-overlay="false" -->
    <van-popup v-model="addshow" position="bottom" cancel-text="取消">
      <div class="cc_pay">
        <div class="cc_pay_header">
          <div class="top">确认支付</div>
          <div class="center">￥{{amoutSum}}</div>
          <!-- <div class="bottom">使用红包￥{{isHongBaoAll}}</div> -->
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
        <div class="cc_pay_body3">
          <button @click="closeAdd()">取消</button>
        </div>
      </div>
    </van-popup>
    <div ref="zfb" >
    </div>
    <!-- <div class="zfbnm" id="zfbyes" v-show="zfb">
    <div class="cc_head">
      <div>
        <van-icon name="arrow-left" @click="go" class="cc_h_go"/>
      </div>
      <div class="cc_h_text">确认订单</div>
      <div></div>
    </div>
      <iframe
        @load="iframeUrl"
        style="height:100%; width:100%"
        id="zfbxx"
        ref="zfbxx"
        name="zfbxx"
        frameborder="0"
        marginwidth=""
        >
      </iframe>
    </div> -->
  </div>
</template>

<script>
import Header from "@/common/_header.vue";
import { Indicator } from "mint-ui";
import { Toast } from "mint-ui";
import wx from 'weixin-js-sdk';
import wxApi from '../../assets/js/wxapi.js';
export default {
  components: {
    "v-header": Header
  },
  created() {
    this.gatDate();
    this.allMoney();
    this.getIndex();
    this.localUrl = window.location.href.split(":");
    if (this.localUrl[0] == 'file') {
      mui.plusReady(() => {
        this.getChannels() // 获取支付通道
      })
    }
  },
  // 离开或刷新页面时，清空够买列表
  // destroyed: function() {
  //   window.sessionStorage.setItem("checkCarOrder", "");
  //   window.sessionStorage.setItem("checkOrder", "");
  // },
  data() {
    return {
      // zfb:false,
      courierId: 0, //快递id *
      postage: 0, //快递费 *
      expressList: [],
      expressName: "", //快递名称
      isbalance: 0, //是否余额
      isbalanceAll: 0, //余额
      isbalanceChange: false, //余额开关
      isHongBao: 0, // 红包 *
      isHongBaoS: 0, // 红包余额
      isHongBaoChange: false, // 红包开关
      userList: [], //用户信息
      walletAmount: 0, //jj
      integralAmountAll: 0, //总积分
      checked: false,
      orderAmount: 0, //订单总额
      cashAmount: 0, //使用现金多少
      cashBalance: 0, //使用余额多少
      ventureAmount: 0, //使用jj多少
      integralAmount: 0, //使用积分多少
      jjsss: 0, //控制
      //购物车商品
      list: [],
      //直接购买的（包含积分商品）
      li: {},
      resslist: {}, //默认地址
      addshow: false,
      expressShow: false,
      showYes: -1,
      zfb: "",
      // 返回的数据
      amoutSum: 0,
      isHongBaoAll: 0,
      orderNumList: [],
      pays: {}, // app获取的支付通道
      localUrl: [] // 当前地址
    };
  },

  methods: {
    // 获取url
    // iframeUrl () {
    //   let iframe1 = this.$refs.zfbxx;
    //   console.log(iframe1)
    //   let test = iframe1.contentWindow.location.href;
    //   console.log(test);
    // },
    // 初始化列表
    gatDate() {
      let list = JSON.parse(
        window.sessionStorage.getItem("checkCarOrder") || "[]"
      );
      let li = JSON.parse(window.sessionStorage.getItem("checkOrder") || "{}");
      if (list.length && JSON.stringify(li) === "{}") {
        list.forEach(item => {
          item.cartList.forEach(item => {
            item.toVenture = false;
            if (item.commodityArea == 1) {
              if (item.price > item.discountPrice) {
                item.price =
                  (item.price * 1000 + item.discountPrice * 1000) / 1000;
                item.discountPrice =
                  (item.price * 1000 - item.discountPrice * 1000) / 1000;
                item.price =
                  (item.price * 1000 - item.discountPrice * 1000) / 1000;
              }
            }
          });
        });
        this.list = list;
        window.sessionStorage.setItem("checkCarOrder", "");
        window.sessionStorage.setItem("checkOrder", "");
      } else if (!list.length && JSON.stringify(li) !== "{}") {
        li.toVenture = false;
        if (li.commodityArea == 1) {
          if (li.price > li.discountPrice) {
            li.price = (li.price * 1000 + li.discountPrice * 1000) / 1000;
            li.discountPrice =
              (li.price * 1000 - li.discountPrice * 1000) / 1000;
            li.price = (li.price * 1000 - li.discountPrice * 1000) / 1000;
          }
        }
        this.li = li;
        window.sessionStorage.setItem("checkCarOrder", "");
        window.sessionStorage.setItem("checkOrder", "");
      } else if (!list.length && JSON.stringify(li) === "{}") {
        this.$router.push({
          path: "/"
        });
      }
    },
    // 接口
    // 获取快递费
    getKdPrice(obj) {
      this.$api
        .get(this.LOCAL + "/api/getExpressPrice", {
          params: { id: obj.id, orderPrice: obj.orderPrice }
        })
        .then(res => {
          if (res.data.status == 200) {
            this.postage = res.data.data.kdPrice;
            this.expressName = res.data.data.kdName;
            this.courierId = res.data.data.kuaidiId;
            this.allMoney();
            this.changeIsbalance();
          } else {
            Toast({
              message: res.data.msg,
              duration: 2000
            });
          }
        });
    },
    // 提交-积分
    postConfirm(obj) {
      this.$api
        .post(this.HOME + this.ORDER + "inside/addIntegraOrder", obj)
        .then(res => {
          if (res.data.status == 201) {
            Indicator.close();
            this.$router.replace("/caryes?status=jf");
          } else if(res.data.status == 200) {
            Indicator.close();
            // this.isHongBaoAll = res.data.data.hongbao;
            this.amoutSum = res.data.data.amoutSum;
            this.orderNumList = res.data.data.orderNumList;
            this.addshow = !this.addshow;
          } else {
            Indicator.close();
            Toast(res.data.msg);
          }
        })
        .catch((error) =>  {
          Indicator.close();
        });
    },
    // 提交-用户提交
    postCar(obj) {
      this.$api
        .post(this.HOME + this.ORDER + "inside/addOrder", obj)
        .then(res => {
          if (res.data.status == 200) {
            Indicator.close();
            this.isHongBaoAll = res.data.data.hongbao;
            this.amoutSum = res.data.data.amoutSum;
            this.orderNumList = res.data.data.orderNumList;
            this.addshow = !this.addshow;
          } else if (res.data.status == 201) {
            Indicator.close();
            this.$router.replace("/caryes?status=jf");
            return;
          } else {
            Toast("订单异常");
            Indicator.close();
          }
        })
        .catch((error) =>  {
          Indicator.close();
        });
    },
    // zfb
    zfbPay(num) {
      Indicator.open();
      let obj = {
        orderNum: num
      };
      if (this.orderNumList.length == 1) {
        this.$api
          .post(this.HOME + this.ORDER + "inside/alipay/pay", obj)
          .then(res => {
            if (res.data.status == 200) {
              Indicator.close();
              const zfb = this.$refs.zfb
              zfb.innerHTML = res.data.data; //此处form就是后台返回接收到的数据
              document.forms[0].submit();
            } else {
              Indicator.close();
              Toast(res.data.msg);
            }
          })
          .catch((error) => {
            Indicator.close();
            this.closeAdd()
          });
      } else {
        let obj2 = {
          orderNum: num
        };
        this.$api
          .post(this.HOME + this.ORDER + "inside/alipay/payList", obj2)
          .then(res => {
            if (res.data.status == 200) {
              Indicator.close();
              const zfb = this.$refs.zfb
              zfb.innerHTML = res.data.data; //此处form就是后台返回接收到的数据
              document.forms[0].submit();
            } else {
              Indicator.close();
              Toast(res.data.msg);
            }
          })
          .catch((error) => {
            Indicator.close();
            this.closeAdd()
          });
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
        if (this.orderNumList.length == 1) {
          api = 'inside/weChatPay/pay'
        } else {
          api = 'inside/weChatPay/payList'
        }
        this.pays.url = this.HOME + this.ORDER + api // 填写微信的数据请求访问地址
        paymentInfo = {
          type: 3,
          orderNum: orderNum
        }
      } else {
        // 支付宝支付
        // 根据订单数量更改接口地址
        if (this.orderNumList.length == 1) {
          api = 'inside/alipay/pay'
        } else {
          api = 'inside/alipay/payList'
        }
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

  //wx
  wxPay (num) {
    let api = ''
    const openid = localStorage.getItem('openid') || false
    if (this.orderNumList.length == 1) {
      api = 'inside/weChatPay/pay'
    } else {
      api = 'inside/weChatPay/payList'
    }
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
    .post(this.HOME + this.ORDER + api, config)
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
      this.closeAdd()
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


    // 获取信息
    getIndex() {
      // 获取收货人地址及信息
      const p1 = new Promise((resolve, reject) => {
        this.$api
          .get(this.HOME + this.ORDER + "inside/address/getAddressByuserId")
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
      // 获取快递信息
      // const p2 = new Promise((resolve, reject) => {
      //   this.$api
      //     .get(this.LOCAL + "/api/getExpress")
      //     .then(res => {
      //       resolve(res);
      //     })
      //     .catch(err => {
      //       reject(err);
      //     });
      // });
      // 账户余额
      const p3 = new Promise((resolve, reject) => {
        this.$api
          .get(this.HOME + this.USER + "inside/showUserWallet")
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
      // 账户基金
      const p4 = new Promise((resolve, reject) => {
        this.$api
          .get(this.HOME + this.USER + "inside/ventureAmount")
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
      // 账户红包
      const p5 = new Promise((resolve, reject) => {
        this.$api
          .get(this.HOME + this.USER + "inside/redPacket/redPacketAmount")
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
      Promise.all([p1, p3, p4, p5]).then(res => {
        if (res[0].status == 200) {
          window.sessionStorage.removeItem('detailId');
          let address = window.sessionStorage.getItem("address") || false;
          if (address == false) {
            this.resslist = res[0].data.data;
          } else {
            this.resslist = JSON.parse(address || "{}");
            window.sessionStorage.removeItem("address");
          }
        } else {
          alert("获取地址失败");
        }
        // if (res[1].status == 200) {
        //   this.expressList = res[1].data.data;
        // }
        if (res[1].status == 200) {
          this.isbalanceAll = res[1].data.data.amount || 0;
          this.integralAmountAll = res[1].data.data.alreadyAmount || 0;
        }
        if (res[2].status == 200) {
          this.walletAmount = res[2].data.data.walletAmount || 0;
        }
        if (res[3].data.status == 200) {
          this.isHongBaoS = res[3].data.data.amount || 0;
        }
      });
    },
    // 计算单个商家总价
    goodsMoney(i) {
      let a = 0;
      if (i == -1) {
        a = (this.li.discountPrice * 1000 * this.li.commodityQuantity) / 1000;
      } else if (i == -2) {
        a =
          (this.li.discountPrice * 1000 * this.li.commodityQuantity -
            this.ventureAmount * 1000) /
          1000;
      } else {
        this.list[i].cartList.forEach(item => {
          a += (item.discountPrice * 1000 * item.commodityQuantity) / 1000;
        });
      }
      return a;
    },
    // 计算总价
    allMoney() {
      this.orderAmount = 0;
      let a = 0;
      if (this.list.length != 0) {
        this.list.forEach(item => {
          item.cartList.forEach(item => {
            a += (item.discountPrice * 1000 * item.commodityQuantity) / 1000;
          });
        });
        this.orderAmount = a - this.ventureAmount + this.postage;
      } else if (this.li.commodityArea === 4) {
        this.orderAmount = this.li.discountPrice * this.li.commodityQuantity;
        this.integralAmount = this.li.discountPrice * this.li.commodityQuantity;
      } else {
        this.orderAmount =
          this.li.discountPrice * this.li.commodityQuantity -
          this.ventureAmount +
          this.postage;
      }
    },
    // 是否使用余额
    changeIsbalance() {
      if (this.isbalanceChange) {
        this.isbalance = 1;
        this.isHongBaoChange = false;
        this.isHongBao = 0;
        if (this.li != null) {
          if (this.li.commodityArea === 4) {
            this.cashBalance = this.postage;
            return;
          } else {
            this.cashBalance = this.orderAmount;
          }
        } else {
          this.cashBalance = this.orderAmount;
        }
      } else {
        this.isbalance = 0;
        this.cashBalance = 0;
      }
    },
    // 使用基金
    subJJ(val, i) {
      if (val.toVenture) {
        if (val.commodityArea == 1) {
          val.price = (val.price* 1000 + val.discountPrice* 1000)/1000;
          val.discountPrice = (val.price* 1000 - val.discountPrice* 1000)/1000;
          val.price = (val.price* 1000 - val.discountPrice* 1000)/1000;
          this.ventureAmount =
            this.ventureAmount +
            (val.discountPrice * 1000 * val.commodityQuantity) / 1000;
        } else {
          this.ventureAmount =
            this.ventureAmount +
            (val.discountPrice * 1000 * val.commodityQuantity) / 1000;
        }
      } else {
        if (val.commodityArea == 1) {
          this.ventureAmount =
            this.ventureAmount -
            (val.discountPrice * 1000 * val.commodityQuantity) / 1000;
          val.price += val.discountPrice;
          val.discountPrice = val.price - val.discountPrice;
          val.price -= val.discountPrice;
        } else {
          this.ventureAmount =
            this.ventureAmount -
            (val.discountPrice * 1000 * val.commodityQuantity) / 1000;
        }
      }
      // if (this.list != []) {
      //   this.list.forEach(item => {
      //     item.cartList.forEach(item2 => {
      //       if (!item2.toVenture) {
      //         if (
      //           this.walletAmount - this.ventureAmount <
      //           item2.discountPrice * item2.commodityQuantity
      //         ) {
      //           item2.dos = true;
      //         } else {
      //           item2.dos = false;
      //         }
      //       }
      //     });
      //   });
      // }
      if (this.list.length) {
        this.sumCar(i);
      }
      this.allMoney();
      this.changeIsbalance();
    },
    // 使用红包
    HongBaoChange() {
      if (this.isHongBaoChange) {
        this.isbalanceChange = false;
        this.isbalance = 0;
        this.isHongBao = 1;
      } else {
        // this.isbalanceChange = true;
        // this.isbalance = 1;
        this.isHongBao = 0;
      }
    },
    //回退
    go() {
      if (this.list.length) {
        this.$router.replace({
          path: "/car?name=购物车"
        });
      } else {
        this.$router.replace({
          path: "/detail?id=" + this.li.commodityId
        });
      }
    },
    // 去往商家店铺
    goIndexS(id) {
      window.sessionStorage.setItem("checkCarOrder", JSON.stringify(this.list));
      window.sessionStorage.setItem("checkOrder", JSON.stringify(this.li));
      this.$router.push({ path: "/indexS?shopId=" + id });
    },
    // 去往地址详情页
    goLocal() {
      window.sessionStorage.setItem("checkCarOrder", JSON.stringify(this.list));
      window.sessionStorage.setItem("checkOrder", JSON.stringify(this.li));
      this.$router.push({
        path: "/shipping?name=选择地址"
      });
    },
    // 选择快递方式-弹窗
    goExpress() {
      this.expressShow = !this.expressShow;
    },
    // 选择快递方式-选择
    changeExpress(val) {
      let num = 0;
      if (this.list.length) {
        this.list.forEach(item => {
          item.cartList.forEach(item2 => {
            if (item2.isFreePostage == 0) {
              num +=
                (item2.discountPrice * 1000 * item2.commodityQuantity) / 1000;
            }
          });
        });
      } else {
        if (this.li.isFreePostage == 0) {
          num =
            (this.li.discountPrice * 1000 * this.li.commodityQuantity) / 1000;
        }
      }
      if (num == 0) {
        this.postage = 0;
        this.expressName = val.kdName;
        this.courierId = val.kuaidiId;
      } else {
        let obj = {
          id: val.kuaidiId,
          orderPrice: num
        };
        this.getKdPrice(obj);
      }
      this.expressShow = !this.expressShow;
    },
    // 计算-合计总数量
    allGoodNum(all) {
      let num = 0
      all.forEach(item => {
        num+=(item.commodityQuantity*1000)/1000
      })
      return num
    },
    // 计算-单个订单金额
    // 计算-每个商家使用多少现金
    // 显示创业基金的变化
    numJJ(val) {
      if (val.commodityArea == 1) {
        if (val.discountPrice < val.price) {
          return (val.discountPrice * 1000 * val.commodityQuantity) / 1000;
        } else {
          return (val.price * 1000 * val.commodityQuantity) / 1000;
        }
      } else {
        return (val.discountPrice * 1000 * val.commodityQuantity) / 1000;
      }
    },
    // 计算-单件商品总金额
    sumli(i) {
      let nums = 0;
      this.list[i].cartList.forEach(item => {
        nums += (item.discountPrice * 1000 * item.commodityQuantity) / 1000;
      });
      return nums;
    },
    //计算-每个商家使用多少现金
    sumCar(i) {
      let nums = 0;
      let objs = 0;
      this.list[i].cartList
        .filter(item => item.toVenture)
        .forEach(item => {
          objs += (item.discountPrice * 1000 * item.commodityQuantity) / 1000;
        });
      this.list[i].cartList.forEach(item => {
        nums += (item.discountPrice * 1000 * item.commodityQuantity) / 1000;
      });
      let num = (nums * 1000 - objs * 1000) / 1000;
      return num;
    },
    //计算-每个商家使用多少基金
    sumCarAmount(i) {
      let objs = 0;
      this.list[i].cartList
        .filter(item => item.toVenture)
        .forEach(item => {
          objs += (item.discountPrice * 1000 * item.commodityQuantity) / 1000;
        });
      return objs;
    },
    // 计算-对象封装
    ajax() {
      //积分
      let objAmount = {
        isHongBao: this.isHongBao, //是否使用订单
        isbalance: this.isbalance, //是否使用余额
        courierId: this.courierId, //快递id
        postage: this.postage, //快递费
        courierName: this.expressName, //快递名称
        orderInfoVO: [
          {
            shopId: this.li.shopId, //店铺id
            addressId: this.resslist.addressId, //地址id
            shopType: this.li.shopType, //店铺类型
            discountPrice: this.orderAmount, //订单总额
            leaveMsg: this.li.leaveMsg, //留言信息
            cashBalance: this.isbalance == 1 ? this.postage : 0, //使用余额多少
            integralAmount: this.integralAmount, //使用积分多少
            cashAmount: this.isbalance == 1 ? 0 : this.postage, //使用现金多少
            orderDetailsList: [
              {
                commodityId: this.li.commodityId, //商品id
                specificationId: this.li.csLinkId, //规格详细id
                specificationName: this.li.linkValue, //规格名称
                unitPrice: this.li.discountPrice, //商品价格
                quantity: this.li.commodityQuantity, //商品数量
                orderAmount:
                  (this.li.discountPrice * 1000 * this.li.commodityQuantity) /
                  1000, //单个商品总共金额
                toVenture: false //是否使用创业基金
              }
            ]
          }
        ]
      };
      //购买-直接购买
      let objShop = {
        isHongBao: this.isHongBao, //是否使用订单
        isbalance: this.isbalance, //是否使用余额
        courierId: this.courierId, //快递id
        postage: this.postage, //快递费
        courierName: this.expressName, //快递名称
        orderInfoVO: [
          {
            shopId: this.li.shopId, //店铺id
            addressId: this.resslist.addressId, //地址id
            shopType: this.li.shopType, //店铺类型
            discountPrice: this.goodsMoney(-1), //订单总额
            leaveMsg: this.li.leaveMsg, //留言信息
            cashBalance: this.isbalance == 1 ? this.goodsMoney(-2) : 0, //使用余额多少
            ventureAmount: this.ventureAmount, //使用基金多少
            cashAmount: this.isbalance == 1 ? 0 : this.goodsMoney(-2), //使用现金多少
            orderDetailsList: [
              {
                commodityId: this.li.commodityId, //商品id
                specificationId: this.li.csLinkId, //规格详细id
                specificationName: this.li.linkValue, //规格名称
                unitPrice: this.li.discountPrice, //商品价格
                quantity: this.li.commodityQuantity, //商品数量
                orderAmount:
                  (this.li.discountPrice * 1000 * this.li.commodityQuantity) /
                  1000, //单个商品总共金额
                toVenture: this.li.toVenture //是否使用创业基金
              }
            ]
          }
        ]
      };
      //购买-购物车购买
      let objCar = {
        isHongBao: this.isHongBao, //是否使用订单
        isbalance: this.isbalance, //是否使用余额
        courierId: this.courierId, //快递id
        postage: this.postage, //快递费
        courierName: this.expressName, //快递名称
        orderInfoVO: []
      };

      this.list.forEach((item, i) => {
        objCar.orderInfoVO.push({
          shopId: item.shopId, //店铺id
          addressId: this.resslist.addressId, //地址id
          shopType: item.shopType, //店铺类型
          discountPrice: this.goodsMoney(i), //订单总额
          leaveMsg: item.leaveMsg, //留言信息
          cashBalance: this.isbalance == 1 ? this.sumCar(i) : 0, //使用余额多少
          ventureAmount: this.sumCarAmount(i), //使用基金多少
          cashAmount: this.isbalance == 1 ? 0 : this.sumCar(i), //使用现金多少
          orderDetailsList: []
        });
        item.cartList.forEach((item2, index) => {
          objCar.orderInfoVO[i].orderDetailsList.push({
            commodityId: item2.commodityId, //商品id
            specificationId: item2.specificationId, //规格详细id
            specificationName: item2.linkValue, //规格名称
            unitPrice: item2.discountPrice, //商品价格
            quantity: item2.commodityQuantity, //商品数量
            orderAmount:
              (item2.discountPrice * 1000 * item2.commodityQuantity) / 1000, //单个商品总共金额
            toVenture: item2.toVenture //是否使用创业基金
          });
        });
      });
      if (this.list.length) {
        return objCar;
      } else {
        if (this.li.commodityArea == 4) {
          return objAmount;
        } else {
          return objShop;
        }
      }
    },
    // 弹窗支付
    changePay(i, id) {
      this.showYes = i;
      // 选择了微信
      if (id === 1) {
        let wxList = "";
        if (this.orderNumList.length == 1) {
          wxList = this.orderNumList[0];
        } else {
          wxList = this.orderNumList;
        }
        if (this.localUrl[0] == 'file') {
          // app端微信支付
          this.pay('WXPAY', wxList)
        } else {
          // 其他微信支付
          this.wxPay(wxList)
        }

      // 选择了支付宝
      } else if (id === 2) {
        let payList = "";
        if (this.orderNumList.length == 1) {
          payList = this.orderNumList[0];
        } else {
          payList = this.orderNumList;
        }
        if (this.localUrl[0] == 'file') {
          // app端支付宝支付
          this.pay('ALIPAY', payList)
        } else {
          // 网页支付宝支付
          this.zfbPay(payList);
        }
      }
    },
    //未支付
    closeAdd() {
      this.$router.replace({
        path: "/caryes?status=unpaid"
      });
    },
    // 支付
    postComfirm() {
      let obj = this.ajax();
      // if (this.expressName == "") {
      //   Toast({
      //     message: "请选择配送方式",
      //     duration: 2000
      //   });
      //   return;
      // }
      if (this.resslist == "" || this.resslist == {}) {
        Toast({
          message: "请添加配送地址",
          duration: 2000
        });
        return;
      }
      if (this.isbalanceChange) {
        if (this.li.commodityArea == 4) {
          if (this.integralAmountAll < this.orderAmount) {
            Toast({
              message: "用户积分不足",
              duration: 2000
            });
            return;
          } else {
            Indicator.open("努力加载中");
            this.postConfirm(obj);
          }
        } else {
          Indicator.open("努力加载中");
          this.postCar(obj);
        }
      } else {
        if (this.li.commodityArea == 4) {
          if (this.integralAmountAll < this.orderAmount) {
            Toast({
              message: "用户积分不足",
              duration: 2000
            });
            return;
          } else {
            Indicator.open("努力加载中");
            this.postConfirm(obj);
          }
        } else {
          Indicator.open("努力加载中");
          this.postCar(obj);
        }
      }
    },
    // 跳出支付
    goaAllOrders() {
      window.sessionStorage.setItem("allOrderStatus", 1);
      this.$router.push({
        path: "/allOrders"
      });
    }
  },

  filters: {
    // 过滤金额，保留2位小数
    number: function(data) {
      return data.toFixed(2);
    }
  }
};
</script>

<style lang="less" scoped>
.carCconfirm {
  overflow: scroll;
  width: 100%;
  height: 100vh;
  background-color: #f6f6f6;
  .color {
    color: #ccc;
  }
  .cc_head {
    width: 100%;
    height: 4.7rem;
    color: #333333;
    background-color: #f2f2f2;
    top: 0;
    z-index: 1001;
    line-height: 4.7rem;
    font-size: 1.6rem;
    display: flex;
    position: fixed;
    top: 0;
    div {
      flex: 1;
      .cc_h_go {
        margin-left: 1rem;
        font-size: 2rem;
        display: inline-block;
        vertical-align: middle;
      }
    }
    .cc_h_text {
      flex: 2;
      text-align: center;
    }
  }
  .cc_body {
    position: relative;
    padding: 14rem 0 4.7rem 0;
    width: 100%;
    background-color: #f6f6f6;
    .cc_address {
      width: 100%;
      background-color: #fff;
      padding: 1rem 0rem;
      display: flex;
      justify-content: center;
      align-items: center;
      position: fixed;
      top: 4.4rem;
      border-bottom: 0.6rem solid transparent;
      border-image: linear-gradient(to right, #00ae87, #00ad9f) 1 10;
      z-index: 1000;
      .ar_left {
        flex: 1;
        width: 100%;
        text-align: center;
        font-size: 1.6rem;
      }
      .ar_center {
        width: 100%;
        flex: 5;
        .firsr {
          width: 100%;
          font-size: 1.4rem;
          overflow: hidden;
          .right {
            font-size: 1.2rem;
            line-height: 2rem;
          }
          .address-default {
            font-size: 0.9rem;
            color: #fff;
            background: #00ae87;
            padding: 0 0.6rem;
            border-radius: 0.65rem;
          }
        }
        .second {
          font-size: 1.2rem;
          line-height: 2rem;
          padding: 0.4rem 0rem 0.4rem 0rem;
          /*超过两行省略号*/
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          /*! autoprefixer: off */
          -webkit-box-orient: vertical;
          /*! autoprefixer: on */
        }
        .third {
          color: #ff0036;
          font-size: 1rem;
        }
      }
      .ar_right {
        flex: 1;
        width: 100%;
        text-align: center;
        font-size: 1.6rem;
      }
    }
    .cc_goods {
      padding: 1rem 0rem 0rem 0rem;
      margin-bottom: 1rem;
      background-color: #fff;
      /* 商家 */
      .cc_goods_merchants {
        width: 100%;
        margin-bottom: 1rem;
        padding-left: 1.5rem;
        i {
          display: inline-block;
          vertical-align: text-top;
          margin-left: 1rem;
        }
        img {
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          margin-right: 1rem;
        }
      }
      /* 商品 */
      .cc_something {
        width: 100%;
        margin-bottom: 1rem;
        display: flex;
        background-color: #f2f2f2;
        padding: 1.4rem 1.5rem;
        .cc_something_img {
          width: 10rem;
          margin-right: 1rem;
          padding-top: 1rem;
          img {
            width: 10rem;
            height: 10rem;
          }
        }
        .cc_something_goods {
          width: 100%;
          .cc_g_top {
            width: 100%;
            display: flex;
            justify-content: center;
            margin-bottom: 1rem;
            font-size: 1.2rem;
            .name {
              width: 100px;
              flex: 2;
              font-size: 1.3rem;
              text-overflow: -o-ellipsis-lastline;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              /*! autoprefixer: off */
              -webkit-box-orient: vertical;
              /*! autoprefixer: on */
              .area {
                display: inline-block;
                padding: 0rem 0.4rem;
                background-color: #00ae87;
                border-radius: 1rem;
                color: #fff;
                margin-right: 0.2rem;
                font-size: 1.1rem;
                line-height: 1.4rem;
              }
              .orange {
                background: #fd8320;
              }
            }
          }
          .jj {
            width: 100%;
            min-height: 1rem;
            flex: 1;
            display: flex;
            justify-content: flex-start;
            .text {
              flex: 6;
              color: #fb5555;
              font-size: 1.3rem;
            }
            .chekbox {
              flex: 1;
              /deep/.van-icon {
                width: 1.2rem;
                height: 1.2rem;
                line-height: 1rem;
                border: 1px solid #b5b5b5;
              }
            }
          }
          .cc_g_express {
            width: 100%;
            display: flex;
            align-items: center;
            font-size: 1.3rem;
            .num {
              flex: 1;
              text-align: center;
              font-size: 1.4rem;
            }
            .money {
              flex: 3;
              letter-spacing: -1px;
              .m1 {
                font-size: 1.2rem;
                padding: 0rem;
              }
              .m2 {
                font-size: 1.6rem;
              }
            }
          }
          .cc_g_bottom {
            width: 100%;
            display: flex;
            justify-content: flex-start;
            color: #7c7a7a;
            margin-bottom: 0.5rem;
            .size {
              flex: 1;
              font-size: 1.3rem;
            }
          }
        }
      }
      .cc_box {
        width: 100%;
        font-size: 1.3rem;
        padding: 0.2rem 0rem 0.8rem 1.5rem;
        border-bottom: 1px solid #f2f2f2;
        background-color: #fff;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        .f1 {
          flex: 1.5;
        }
        .f3 {
          flex: 3;
          input {
            width: 94%;
          }
          input::-webkit-input-placeholder {
            /* WebKit browsers */
            color: #ccc;
            text-align: right;
          }
        }
      }
      .cc_someting_num {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: 1rem 1.5rem 1rem 0rem;
        .one {
          flex: 1;
          text-align: right;
          font-size: 0;
          line-height: 5%;
          .span {
            font-size: 1.2rem;
          }
          .icon {
            color: #00ae87;
            font-size: 1.2rem;
          }
          .mon {
            font-size: 1.9rem;
            color: #00ae87;
          }
        }
        .two {
          height: 100%;
          flex: 2;
          text-align: right;
        }
      }
    }
    .cc_f_box {
      // display: none;
      width: 100%;
      font-size: 1.3rem;
      padding: 1.5rem;
      margin-bottom: 1rem;
      background-color: #fff;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .f1 {
        flex: 2;
      }
      .f3 {
        flex: 3;
        text-align: right;
        i {
          margin-left: 1rem;
          display: inline-block;
          vertical-align: text-bottom;
        }
      }
    }
  }
  .cc_submit {
    width: 100%;
    min-height: 4.7rem;
    position: fixed;
    bottom: 0;
    background-color: #fff;
    display: flex;
    justify-content: flex-start;
    align-content: center;
    z-index: 1000;
    .s_left {
      width: 100%;
      flex: 3;
      text-align: right;
      font-size: 1.2rem;
      padding-top: 1rem;
      span {
        margin-right: 1.5rem;
      }
      .red {
        color: #ff0000;
      }
    }
    .s_right {
      width: 100%;
      flex: 1;
      color: #fff;
      text-align: center;
      line-height: 4.7rem;
      background-color: #00ae87;
    }
  }
  .van-hairline--top-bottom .van-actionsheet__header {
    font-size: 1.6rem;
  }
  .cc_pay {
    padding: 0rem 0rem 1rem 0rem;
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
    .cc_pay_body3 {
      width: 100%;
      height: 4.6rem;
      line-height: 4.5rem;
      margin-top: 20rem;
      padding: 0 1.5rem;
      font-size: 1.6rem;
      button {
        background-color: #00ae87;
        width: 100%;
        border-radius: 2.5rem;
        color: #fff;
      }
    }
  }
  .cc_pay2 {
    padding: 0rem 0rem 18rem 0rem;
    border-top: 0.4rem solid #f4f4f4;
    .cc_pay_header2 {
      width: 100%;
      text-align: center;
      font-size: 1.7rem;
      margin: 3rem 0;
    }
    .cc_pay_body2 {
      width: 100%;
      height: 4.5rem;
      line-height: 4.5rem;
      overflow: hidden;
      border-bottom: 0.1rem solid #999;
      .text {
        display: flex;
        justify-content: flex-start;
        height: 90%;
        background-color: #ffff;
        font-size: 1.4rem;
        padding: 0 1rem;
        div {
          flex: 1;
          img {
            margin-left: 2rem;
            width: 30%;
            height: 50%;
          }
        }
        .right {
          flex: 3;
          text-align: right;
        }
      }
    }
  }
  // 通用
  .m-l-24 {
    padding-left: 2.4rem;
  }
  .left {
    float: left;
  }
  .right {
    float: right;
  }
  .mb1 {
    margin-bottom: 0.2rem !important;
  }
  .zfbnm{
    background-color: #fff;
    width: 100%;
    height: 100vh;
    position: fixed;
    top:0;
    z-index: 9999;
  }
}
</style>
