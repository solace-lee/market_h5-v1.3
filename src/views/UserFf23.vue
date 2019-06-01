<template lang="html">
<div class="wrap"> 
    <v-header></v-header>
            <div class="head" style="width: 100%;height: 3.5rem;"></div>
    <!-- 搜索框 -->
<!-- <div class="seek">
  <i class="class=mintui mintui-search"></i>
    <input type="text" placeholder="搜索你想购买的商品">
</div> -->
<!-- 1 -->
<mt-navbar v-model="selected">
  <mt-tab-item id="0">全部订单</mt-tab-item>
  <mt-tab-item id="1">待付款</mt-tab-item>
  <mt-tab-item id="2">待发货</mt-tab-item>
  <mt-tab-item id="3">待收货</mt-tab-item>
  <mt-tab-item id="4">完成</mt-tab-item>
</mt-navbar>  
<!-- tab-container -->
<mt-tab-container v-model="selected" >
  <!-- 全部订单 -->
  <mt-tab-container-item id="0">
    <!-- <mt-cell v-for="n in 10" :title="'content ' + n" /> -->
    <!-- <div v-for="item1 in allorders1"> -->
   
    
  <!-- </div> -->
  
  </mt-tab-container-item>
  <!-- 待付款 -->
  <mt-tab-container-item id="1">     
     <router-link :to="{ name:'买家已付款'}">
      <h1 class="ff_di">
        <span  @click="indexS">小星星服装店&nbsp;&nbsp;</span>
        <span>进店&nbsp;&nbsp;></span> 
        <span>待付款</span>
      </h1>
    </router-link>
    <div class="group">
      <div class="group-left"><img src="../../static/12.jpg" alt=""></div>
      <div class="group-right">
        <span>2018夏 新款高圆圆 同款高腰港味半身裙不规则印花.....</span>
        <span>深蓝色,s</span>
        <div class="serve">
          <span>服务</span>
          <span>服务</span>
          <span>服务</span>
        </div>
        <div class="serve2">
          <span>￥</span>
          <span>80</span>
          <span>X1</span>
        </div>
      </div>
    </div>
    <h1 class="ff_di2">
        <span>共1件商品&nbsp;&nbsp;应付金额：</span>
        <span>￥80</span>
    </h1> 
    <div class="btn">
      <button style="border: 1px solid #ce2e37;
    color: #ce2e37;">取消订单</button>
      <button>立刻付款</button>
    </div> 
  </mt-tab-container-item>
  <!-- 待发货 -->
  <mt-tab-container-item id="2" v-for="item in allorders2" :key="item.id2">
    <!-- <mt-cell v-for="n in 6" :title="'content ' + n" /> -->
    <router-link :to="{ name:'订单详情'}">
      <h1 class="ff_di">
        <span>小星星服装店&nbsp;&nbsp;</span>
        <span>进店&nbsp;&nbsp;></span> 
        <span>待发货</span>
      </h1>
    </router-link>
       <div class="group">
      <div class="group-left"><img src="../../static/12.jpg" alt=""></div>
      <div class="group-right">
        <span>2018夏 新款高圆圆 同款高腰港味半身裙不规则印花.....</span>
        <span>深蓝色,s</span>
        <div class="serve">
          <span>服务</span>
          <span>服务</span>
          <span>服务</span>
        </div>
        <div class="serve2">
          <span>￥</span>
          <span>80</span>
          <span>X1</span>
        </div>
      </div>
    </div>
    <h1 class="ff_di2">
        <span>共1件商品&nbsp;&nbsp;应付金额：</span>
        <span>￥80</span>
    </h1> 
    <div class="btn">
      <button style="border: 1px solid #ccc;
    color: #ccc;">查看物流</button>
      <!-- <button>查看物流</button> -->
    </div> 
  </mt-tab-container-item>
  <!-- 待收货 -->
   <mt-tab-container-item id="3">
    <!-- <mt-cell v-for="n in 4" :title="'content ' + n" /> -->  
     <router-link :to="{ name:'买家已发货'}">
      <h1 class="ff_di">
        <span>小星星服装店&nbsp;&nbsp;</span>
        <span>进店&nbsp;&nbsp;></span> 
        <span>待收货</span>
      </h1>
    </router-link>
    <div class="group">
      <div class="group-left"><img src="../../static/12.jpg" alt=""></div>
      <div class="group-right">
        <span>2018夏 新款高圆圆 同款高腰港味半身裙不规则印花.....</span>
        <span>深蓝色,s</span>
        <div class="serve">
          <span>服务</span>
          <span>服务</span>
          <span>服务</span>
        </div>
        <div class="serve2">
          <span>￥</span>
          <span>80</span>
          <span>X1</span>
        </div>
      </div>
    </div>
    <h1 class="ff_di2">
        <span>共1件商品&nbsp;&nbsp;应付金额：</span>
        <span>￥80</span>
    </h1> 
    <div class="btn">
      <button style="border: 1px solid #ce2e37;
    color: #ce2e37;">确认收货</button>
      <button>查看物流</button>
    </div> 
  </mt-tab-container-item>
  <!-- 完成 -->
   <mt-tab-container-item id="4">
    <!-- <mt-cell v-for="n in 4" :title="'content ' + n" /> -->  
     <router-link :to="{ name:'交易完成'}">
      <h1 class="ff_di">
        <span>小星星服装店&nbsp;&nbsp;</span>
        <span>进店&nbsp;&nbsp;></span> 
        <span>交易完成</span>
      </h1>
    </router-link>
    <div class="group">
      <div class="group-left"><img src="../../static/12.jpg" alt=""></div>
      <div class="group-right">
        <span>2018夏 新款高圆圆 同款高腰港味半身裙不规则印花.....</span>
        <span>深蓝色,s</span>
        <div class="serve">
          <span>服务</span>
          <span>服务</span>
          <span>服务</span>
        </div>
        <div class="serve2">
          <span>￥</span>
          <span>80</span>
          <span>X1</span>
        </div>
      </div>
    </div>
    <h1 class="ff_di2">
        <span>共1件商品&nbsp;&nbsp;应付金额：</span>
        <span>￥80</span>
    </h1> 
    <div class="btn">
      <button style="border: 1px solid #ce2e37;
    color: #ce2e37;" @click="line5">评价</button>
      <button>查看物流</button>
    </div>
     <h1 class="ff_di">
        <span>小星星服装店&nbsp;&nbsp;</span>
        <span>进店&nbsp;&nbsp;></span> 
        <span>交易完成</span>
      </h1>
    </router-link>
    <div class="group">
      <div class="group-left"><img src="../../static/12.jpg" alt=""></div>
      <div class="group-right">
        <span>2018夏 新款高圆圆 同款高腰港味半身裙不规则印花.....</span>
        <span>深蓝色,s</span>
        <div class="serve">
          <span>服务</span>
          <span>服务</span>
          <span>服务</span>
        </div>
        <div class="serve2">
          <span>￥</span>
          <span>80</span>
          <span>X1</span>
        </div>
      </div>
    </div>
    <!-- <h1 class="ff_di2">
        <span>共1件商品&nbsp;&nbsp;应付金额：</span>
        <span>￥80</span>
    </h1>  -->
    <div class="group">
      <div class="group-left"><img src="../../static/12.jpg" alt=""></div>
      <div class="group-right">
        <span>2018夏 新款高圆圆 同款高腰港味半身裙不规则印花.....</span>
        <span>深蓝色,s</span>
        <div class="serve">
          <span>服务</span>
          <span>服务</span>
          <span>服务</span>
        </div>
        <div class="serve2">
          <span>￥</span>
          <span>80</span>
          <span>X1</span>
        </div>
      </div>
    </div>
    <h1 class="ff_di2">
        <span>共2件商品&nbsp;&nbsp;应付金额：</span>
        <span>￥160</span>
    </h1> 
    <div class="btn">
      <button @click="chose">再次购买</button>
      <button>查看物流</button>
    </div>  
  </mt-tab-container-item>
</mt-tab-container>
 <!-- 遮罩层 -->
<div class="box">
  <div class="pay">
    <img src="../../img/mall_btn_coupon.png" alt="">
    <span class="pay2">微信支付</span>
    <span class="pay3"></span>
    <span class="pay3"></span>
    <span class="pay3"></span>   
  </div>
</div>
  </div>

</template>

<script>
import Header from "@/common/_header.vue";
import Aside from "@/components/category/aside.vue";
// import category from "@/http/mock.js"; //模拟数据
export default {
  components: {
    "v-header": Header,
    "v-aside": Aside
  },

  data: function() {
    return {
      order:{
        userId:"",
        orderStatus:""
      },
       selected:"0",
       allorders1:[],
       allorders2:[],
       allorders3:[],
       allorders4:[],
       allorders5:[],
       allorders6:[]
    };
  },
  created(){
   this.getStatus(),
    this.all_orders1()
    // this.all_orders2(),
    // this.all_orders3(),
    // this.all_orders4(),
    // this.all_orders5(),
    // this.all_orders6()
  },
  methods: {
    getStatus(){
      var that = this
        var name, value;
        var str = location.href; //取得整个地址栏
        var num = str.indexOf("?")
        // console.log(num)
        // console.log(str)
        str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]

        var arr = str.split("&"); //各个参数放到数组里
        console.log(arr)
        for (var i = 0; i < arr.length; i++) {
          num = arr[i].indexOf("=");
          if (num > 0) {
            name = arr[i].substring(0, num);
            value = arr[i].substr(num + 1);
            this.order[name] = value;
          }
        }
        if (num > 0) {
         console.log(this.order)
         if(this.order.orderStatus){
          this.selected=this.order.orderStatus
         }
        }
    },
    toPay(){
      console.log("支付")
    },
  
    chose() {
      this.$router.push({ path: "/chose"});
    },
    // 店铺首页
    indexS(){
      this.$router.push({path:'/indexS'})
    },
    line5(){
      this.$router.push({path:"/line5"})
    },
    //获取未支付
     all_orders1(){
       this.$http.post(this.HOME+'/order/queryOrderByPage',{}).then(res=>{
         console.log(res)
         this.allorders1=res.data.data.data;
          // console.log(res.data.data)
       })
     } ,
    //  获取待发货
     all_orders2(){
       this.$http.post(this.HOME+'/order/queryOrderByPage',{orderStatus:2}).then(res=>{
         this.allorders2=res.data.data;
          // console.log(res.data.data)
       })
     } ,
    //  获取已收货
     all_orders3(){
       this.$http.post(this.HOME+'/order/queryOrderByPage',{orderStatus:3}).then(res=>{
         this.allorders3=res.data.data;
          // console.log(res.data.data)
       })
     } ,
    //  获取待收货
     all_orders4(){
       this.$http.post(this.HOME+'/order/queryOrderByPage',{orderStatus:4}).then(res=>{
         this.allorders4=res.data.data;
          // console.log(res.data.data)
       })
     } ,
     //获取完成
     all_orders5(){
       this.$http.post(this.HOME+'/order/queryOrderByPage',{orderStatus:5}).then(res=>{
         this.allorders5=res.data.data;
          // console.log(res.data.data)
       })
     } ,
     //获取退款
     all_orders6(){
       this.$http.post(this.HOME+'/order/queryOrderByPage',{orderStatus:6}).then(res=>{
         this.allorders6=res.data.data;
          // console.log(res.data.data)
       })
     } 
  }
};
</script>

<style lang="less" scoped>
@import "../assets/fz.less";
@import "../assets/index/style.css";
@import "../assets/user/icon/carstyle.css";
// 遮罩层
.box {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,.2);
  // -moz-opacity: 0.2;
  opacity: 0.8;
  z-index: 99999;
  display: flex;  
  display: none;
  .pay{
    // border: 1px solid #000;
    background-color: #595959;
    width: 120px;
    height: 100px;
     position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    >img{
      width: 35px;
      height: 35px;
      position: absolute;
    top: 35%;
    left: 50%;
    transform: translate(-50%, -50%);
    }
  .pay2{
    // border: 1px solid #000;
    position: absolute;
     top: 65%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    width: 70px;
    text-align: center;
    font-size: 12px;
  }
  .pay3{
    // border: 1px solid #000;
    width: 8px;
    height: 8px;
    background-color: #fff;
    display: inline-block;
    position: relative;
    border-radius: 4px;
    top: 80%;
    left: 37%;
    transform: translate(-50%, -50%);
  }
  }
}
// 遮罩层结束
.wrap {
  width: 100%;
  height: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  /*! autoprefixer: off */
  -webkit-box-orient: vertical;
  /*! autoprefixer: on */
  -webkit-box-direction: normal;
  -ms-flex-flow: column nowrap;
  flex-flow: column nowrap;
  .group {
    width: 100%;
    height: 18vh;
    border: 1px solid #ccc;
    position: relative;
    background-color: #fff;
    .group-left {
      width: 30%;
      height: 90%;
      // border: 1px solid #000;
      position: absolute;
      margin-top: 5px;
      margin-left: 5px;
      > img {
        width: 100%;
        height: 100%;
      }
    }
    .group-right {
      width: 65%;
      height: 100%;
      // border: 1px solid #000;
      // white-space: nowrap;  //超出文本省
      position: absolute;
      right: 0;
      display: flex;
      // flex-direction: column;
      flex-wrap: wrap;
      align-content: space-between;
      > span {
        // border: 1px solid #000;
        display: inline-block;
        width: 80%;
        font-size: 14px;
        margin-top: 3px;
      }
      > span:nth-of-type(1) {
        font-size: 14px;
        // border: 1px solid #000;
      }
      > span:nth-of-type(2) {
        font-size: 10px;
        // border: 1px solid #000;
      }
      .price {
        width: 100%;
        color: #ff6170;
        // border: 1px solid #000;
        font-size: 10px;
        position: absolute;
        // left: 10px;
        top: 60px;
        > span:nth-of-type(2) {
          margin-left: 99px;
          color: #999;
        }
      }
      // 服务
      .serve {
        // border: 1px solid #000;
        display: flex;
        justify-content: center;
        align-items: center;
        justify-content: space-between;
        // margin-top: 15px;
        width: 80%;
        position: relative;
        height: 29%;
        // top: 10%;
        > span {
          border: 1px solid #ce2e37;
          border-radius: 10px;
          display: inline-block;
          width: 30%;
          height: 18px;
          line-height:18px ;
          text-align: center;
          color: #ce2e37;
        }
      }
    }
  }
}
.serve2 {
  // border: 1px solid #000;
  width: 50px;
  height: 40px;
  color: #ce2e37;
  position: absolute;
  right: -10px;
  top: 10px;
  display: flex;
  > span:nth-of-type(1) {
    font-size: 11px;
  }
  > span:nth-of-type(2) {
    font-size: 18px;
  }
  > span:nth-of-type(3) {
    font-size: 10px;
    position: absolute;
    left: 25px;
    bottom: 5px;
    color: #999;
    // border: 1px solid #000;
  }
}
.car {
  width: 100%;
  padding-bottom: 14vw;
  background-color: #eee;
  h1 {
    width: 100%;
    height: 8vh;
    background: rgb(129, 123, 123);
    text-align: center;
    line-height: 8vh;
    color: #fff;
    // border: 1px solid #000;
  }
  .header {
    width: 100%;
    height: 40vw;
    background: url(../../static/carbg.png) center #ff6170;
    background-size: auto 100%;
    padding: 3.2vw 0;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    .header-icon {
      border: 0.4vw solid #ffffff;
      background-color: @cl;
      margin-left: 6vw;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      width: 14vw;
      height: 14vw;
      line-height: 16vw;
      text-align: center;
      border-radius: 50%;
      margin-top: 2vw;

      span {
        .fz(font-size, 54);
        &::before {
          color: #ffffff;
        }
      }
    }
    > span {
      margin-left: 3.2vw;
      .fz(font-size, 30);
      color: #ffffff;
      letter-spacing: 0.2vw;
      margin-top: 7vw;
    }
  }
  .main {
    width: 90%;
    // border: 1px solid #000;
    margin: 0 auto;
    border-radius: 10px;
    position: relative;
    top: -80px;
    .my-indent {
      width: 100%;
      display: block;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      color: #333;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: justify;
      -ms-flex-pack: justify;
      justify-content: space-between;
      padding: 0 5vw;
      height: 15vw;
      line-height: 15vw;
      background-color: #fff;
      border-top-right-radius: 8px;
      border-top-left-radius: 8px;
      // border: 1px solid #000;
      margin-bottom: -1px;
      .bd();
      &:active {
        background-color: rgb(224, 227, 230);
      }

      .my-indent-right {
        span {
          display: inline-block;
          .fz(font-size, 28);
          color: rgba(0, 0, 0, 0.4);
          position: relative;
        }
        i {
          position: relative;
          top: 0.8vw;
        }
      }
    }

    .my-pay {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      width: 100%;
      padding: 2vw 0;
      background-color: #fff;
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
      // border: 1px solid #fff;
      .bd();

      > a {
        display: block;
        width: 33.33%;
        color: #999;
        text-align: center;

        > span {
          .fz(font-size, 50);
          margin-top: 2.3vw;
          display: block;
          text-align: center;
        }

        p {
          padding: 2.3vw 0;
          text-align: center;
        }
      }
    }
    .my-indent2 {
      width: 100%;
      display: block;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      color: #333;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: justify;
      -ms-flex-pack: justify;
      justify-content: space-between;
      padding: 0 5vw;
      height: 15vw;
      line-height: 15vw;
      background-color: #fff;
      border-top-right-radius: 8px;
      border-top-left-radius: 8px;
      margin-top: 10px;
      // border: 1px solid #000;
    }
    .my-pay2 {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      width: 100%;
      padding: 2vw 0;
      background-color: #fff;
      // border: 1px solid #000;
      // margin-top: 10px;
      // height: 30vw;
      // line-height: 30vw;
      .bd();

      > a {
        display: block;
        width: 33.33%;
        color: #999;
        text-align: center;

        > span {
          .fz(font-size, 50);
          margin-top: 2.3vw;
          display: block;
          text-align: center;
        }

        p {
          padding: 2.3vw 0;
          text-align: center;
        }
      }
    }

    .my-vip,
    .my-service,
    .my-settle {
      width: 100%;
      // border: 1px solid #fff;
      background-color: #fff;
      .mt();
      .bd();
      .bt();
      > a {
        background-color: #fff;
        display: block;
        width: 100%;
        display: -ms-flex;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        height: 15vw;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        padding: 0 6vw;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        &:active {
          background-color: rgb(224, 227, 230);
        }
        > div {
          -ms-flex: 2;
          -webkit-box-flex: 2;
          flex: 2;
          padding-top: 1.3vw;
        }

        .my-vip-top-div {
          padding-top: 0;
        }
        > p {
          -ms-flex: 10;
          -webkit-box-flex: 10;
          flex: 10;
          position: relative;

          &:active {
            background-color: rgb(224, 227, 230);
          }

          i {
            position: absolute;
            right: 0;
            top: 0.4vw;
          }
        }
      }
    }
  }
}
/*图标大小不一，重新定义*/

.icon-go {
  .fz(font-size, 36);
  &::before {
    color: #aba8a8;
  }
}

[class^="icon2-"],
[class*=" icon2-"] {
  .fz(font-size, 50);
}

.icon2-service {
  .fz(font-size, 34);
}
.seek {
  width: 100%;
  height: 40px;
  // border: 1px solid #000;
  background-color: #eee;
  // text-align: center;
  margin: 0 auto;
  input {
    width: 90%;
    height: 80%;
    border: 1px solid #eee;
    margin-top: 0.5vh;
    margin-left: 2.5vh;
    border-radius: 10px;
    text-indent: 2em;
  }
  .mintui-search {
    font-size: 25px;
    color: #d9d9d9;
    border: 1px solid #eee;
    position: absolute;
    left: 25px;
    top: 52px;
  }
}
.mint-navbar {
  background-color: #fff;
  display: -webkit-box;
  display: -ms-flexbox;
  /* display: flex; */
  /* text-align: center; */
}
.mint-navbar .mint-tab-item.is-selected {
  border-bottom: 2px solid red;
  color: #ce2e37;
  margin-bottom: -3px;
}
.ff_di {
  width: 100%;
  height: 30px;
  background-color: #fff;
  margin-top: 5px;
  line-height: 30px;
  font-size: 14px;
  padding-left: 5px;
  > span:nth-of-type(2) {
    font-size: 12px;
    color: #999;
  }
  > span:nth-of-type(3) {
    font-size: 12px;
    color: #ce2e37;
    position: absolute;
    right: 10px;
  }
}
.ff_di2 {
  width: 100%;
  height: 30px;
  background-color: #fff;
  line-height: 30px;
  font-size: 14px;
  padding-left: 5px;
  > span:nth-of-type(1) {
    position: absolute;
    left: 50%;
  }
  > span:nth-of-type(2) {
    font-size: 12px;
    // color:red;
    position: absolute;
    right: 10px;
  }
}
.btn {
  width: 100%;
  height: 35px;
  // border: 1px solid #000;
  background-color: #fff;
  > button {
    width: 25%;
    height: 85%;
    background-color: #fff;
    border-radius: 5px;
    float: right;
    margin: 0 5px;
    color: #000;
  }
  > button:nth-of-type(2) {
    border: 1px solid #ccc;
  }
  header h1[data-v-416b7b2c] {
    font-size: 17px;
    letter-spacing: 0.2vw;
    font-weight: 600;
    margin-right: 80vw;
  }
}
</style>
