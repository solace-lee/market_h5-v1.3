<template lang="html">
  <div class="car">
   <!-- <v-header></v-header>-->
<!--   <div class="head" style='width: 100%;height: 4rem;'></div>-->
    <!-- 用户名 -->
		
    <header class="header">
         <div class="m"v-if='userInfo.level==2' style="display: block;">
          <span v-if='userInfo.level==0'style="font-size: 14px;text-align: center;display:block;"><img style="height: 29px;margin-top: -10%;
    margin-left: -49%;width: 106px;border-radius: 0;" src="../../img/drawable-xxhdpi/common.png" alt=""></span>
          <span v-if='userInfo.level==1'style="font-size: 14px;text-align: center;display:block;"><img style="height: 29px;margin-top: -10%;
    margin-left: -49%;width: 106px;border-radius: 0;" src="../../img/drawable-xxhdpi/common.png" alt=""></span>
          <span v-if='userInfo.level==2'style="font-size: 14px;text-align: center;display:block;color: white;margin-top: 4px;"><img style="height: 29px;margin-top: -10%;
    margin-left: -49%;width: 115px;border-radius: 0;" src="../../img/drawable-xxhdpi/ambassador.png" alt=""></span>
         </div>
        
        
        <div class="msgs">
      
          <span @click="getQrCode"><van-icon name="qr"size="20px"/></span>&nbsp;
          <!--之前的-->
           <!--<router-link :to="{ path: '/agent?name=我的运营'}" v-if="userInfo.type ==4 || userInfo.type==6"> <van-icon name="shop-collect"  size="22px"/> </router-link>-->
        <!--<router-link :to="{ path: '/myshop?name=我的店铺'}" v-else><van-icon name="points-mall"  size="22px"/> </router-link>-->
          
         <router-link :to="{ path: '/myshop?name=我的店铺'}" v-if="userInfo.type ==4 || userInfo.type==6"> <van-icon name="shop-collect"  size="22px"/> </router-link>
        <router-link :to="{ path: '/agent?name=我的运营'}" v-else><van-icon name="points-mall"  size="22px"/> </router-link>
        </div>
       
      <router-link :to="{ path:'/User2?name=个人资料'}">
        <div class="header-icon">
          <div>
            <img :src="userInfo.img" v-if="userInfo.img" alt="">
            <img src="../../img/userImg/634095260664276696.png" alt="" v-if="!userInfo.img">
          </div>

        </div>
        <div class='arch'>

        </div>
        <div class='msg'>
          <!--<span v-if='userInfo.level==0'>普通会员</span>
          <span v-if='userInfo.level==1'>白金会员</span>
          <span v-if='userInfo.level==2'>钻石会员</span>-->
     
          <span style="color:#FFFFFF;font-size: 16px;margin-left: 5%;width:50%">{{userInfo.nickName}}</span>
          <br>
          <!--<span>推荐码：{{userInfo.referralCode}}</span>-->
        </div>

      </router-link>
    </header>
    <div class="main">
      <!--描述：我的订单与全部-->
      <router-link class="my-indent" :to="{ path:'/UserFf2?id='+login.userId+'&name=商品订单'}">
        <span class="my-indent-left">
          <div >
            <span style="    font-size: 1.6rem;margin: 32px;position: absolute;margin-top: -2%;margin-left: -1%;font-weight: bold;letter-spacing: 2px;">我的订单</span>
          </div>
        </span>
        <div class="my-indent-right" style="position: absolute;right: 1%;margin-top: -2%;">
          <span style="font-size: 1.4rem;margin-left: -19px;margin-right: 2px;">全部</span>
          <img  style="width: 4px; height: 10px;margin-left: 5px;margin-top: 0px; " src="../../img/drawable-xxhdpi/icon_Arrow_g.png"/>
        </div>
      </router-link>

      <section class="my-pay"style="margin-top: 1px;">
        <router-link :to="{ path:'/UserFf2?status=1'+'&name=待付款'}">

          <img src="../../img/userImg/personal_icon_pendingpayment.png" alt="">
          <p>待付款</p>
          <b style="background-color: red;color: #FFFFFF;border-radius: 5rem;position: relative;top: -75px;left: 12px;" v-if="arr1!=0">&nbsp;{{arr1}}&nbsp;</b>
        </router-link>
        <router-link :to="{ path:'/UserFf2?status=2'+'&name=待发货'}">
           
          <img src="../../img/userImg/personal_icon_pendingdelivery.png" alt="">
          <p>待发货</p>
          <b style="background-color: red;color: #FFFFFF;border-radius: 5rem;position: relative;top: -75px;left: 12px;" v-if="arr2!=0">&nbsp;{{arr2}}&nbsp;</b>
        </router-link>
        <router-link :to="{ path:'/UserFf2?status=3'+'&name=待收货'}">

          <img src="../../img/userImg/personal_icon_goodsreceipt.png" alt="">
          <p>待收货</p>
          <b style="background-color: red;color: #FFFFFF;border-radius: 5rem;position: relative;top: -75px;left: 12px;" v-if="arr3!=0">&nbsp;{{arr3}}&nbsp;</b>
        </router-link>
        <router-link :to="{ path:'/UserFf2?status=4'+'&name=完成'}">

          <img src="../../img/userImg/personal_icon_complete.png" alt="">
          <p>已完成</p>
          <b style="background-color: red;color: #FFFFFF;border-radius: 5rem;position: relative;top: -75px;left: 12px;" v-if="arr4!=0">&nbsp;{{arr4}}&nbsp;</b>
        </router-link>
      </section>

      <div class='wallet' style="margin-top: 5px;">
        
        <ul style="margin-top: 16px;">
          <li >
           <!--  <router-link :to="{path:'/User2?&name=个人资料'}">
              <div style="height: 43px;border-bottom: 0.5px solid #CCCCCC;">
                <span><img class="shezhiimg" src="../../img/drawable-xxhdpi/icon_shezhi.png"></span>
                <span style="font-size: 1.6rem;margin-top: 3px;width: 20%;margin-left: 33px;display: block;">设置</span>
              </div>
            </router-link> -->
            <router-link :to="{ path: '/wallet?name=我的钱包'}">
              <div style="height: 43px; border-bottom: 1px solid #CCCCCC;">
             <span><img class="wodeimg" src="../../img/drawable-xxhdpi/icon_wallet.png"></span>
                <span style="font-size: 1.6rem;margin-top: 0px;width: 72px;margin-left: 49px;">我的钱包</span>
              </div>
            </router-link>
          </li>
          <li style="border-bottom: 0.5px solid #CCCCCC;">
          <!--   <router-link :to="{ path: '/wallet?name=我的钱包'}">
              <div style="height: 43px; border-bottom: 1px solid #CCCCCC;">
             <span><img class="wodeimg" src="../../img/drawable-xxhdpi/icon_wallet.png"></span>
                <span style="font-size: 1.6rem;margin-top: 0px;width: 20%;margin-left: 49px;">我的钱包</span>
              </div>
            </router-link> -->
             <div @click="$router.push({path:'/harvest?name=收获'})">
              <span><img class="yzimg" src="../../img/drawable-xxhdpi/icon_shouyi.png"></span>
            <span style="font-size: 1.6rem;margin-left: 10px;display: block;width: 72px;margin-left:49px;">养殖收sad获</span>
            </div> 
          </li>
          <li>
          <!--   <div @click="$router.push({path:'/harvest?name=收获'})">
              <span><img class="yzimg" src="../../img/drawable-xxhdpi/icon_shouyi.png"></span>
            <span style="font-size: 1.6rem;margin-left: 10px;display: block;width: 20%;margin-left:49px;">养殖收获</span>
            </div> -->
            <router-link :to="{path:'/User2?&name=个人资料'}">
              <div style="height: 43px;">
                <span><img class="shezhiimg" src="../../img/drawable-xxhdpi/icon_shezhi.png"></span>
                <span style="font-size: 1.6rem;margin-top: 3px;width: 72px;margin-left: 33px;display: block;">设置</span>
              </div>
            </router-link>
          </li>
            
            
            <li>
          <!--   <div @click="$router.push({path:'/harvest?name=收获'})">
              <span><img class="yzimg" src="../../img/drawable-xxhdpi/icon_shouyi.png"></span>
            <span style="font-size: 1.6rem;margin-left: 10px;display: block;width: 20%;margin-left:49px;">养殖收获</span>
            </div> -->
             <router-link :to="{ path: '/myshop?name=我的店铺'}" ><van-icon name="points-mall"  size="22px"/> asas</router-link>
          </li>
            
            
        </ul>
      </div>
      <!--<router-link class="my-indent2" :to="{ path: '/wallet?name=我的钱包'}">
        <span class="my-indent-left">
          <div>
            <img src="../../img/userImg/personal_bg_wallet.png" alt="">
            <span>我的钱包</span>
          </div>
        </span>
      </router-link>
      <div class='wallet'>
        <ul>
          <li>
            <router-link :to="{ path: '/wallet?name=我的钱包'}">
              <div>
                <span>{{balance}}</span>
                <span>钱包</span>
              </div>
            </router-link>
          </li>
          <li>
            <router-link :to="{ path: '/wallet?name=积分'}">
              <div>
                <span>{{balance2}}</span>
                <span>积分</span>
              </div>
            </router-link>
          </li>
        </ul>
      </div>-->
      <!--<router-link class="my-indent2" :to="{ path: '/myshop?name=我的店铺'}">
        <span class="my-indent-left">
          <div>
            <img src="../../img/userImg/personal_bg_shop.png" alt="">
            <span>我的店铺</span>
          </div>
          <i class="icon-go"></i>
        </span>
      </router-link>
      <router-link class="my-indent2" :to="{ path:'/User2?&name=我的账号'}">
        <span class="my-indent-left">
          <div>
            <img src="../../img/userImg/personal_bg_data.png" alt="">
            <span>我的账号</span>
          </div>
          <i class="icon-go"></i>
        </span>
      </router-link>
      <router-link class="my-indent2" :to="{ path:'/UserPerformance?&name=我的业绩'}">
        <span class="my-indent-left">
          <div>
            <img src="../../img/userImg/personal_bg_achievement.png" alt="">
            <span>我的业绩</span>
          </div>
          <i class="icon-go"></i>
        </span>
      </router-link>
      <router-link class="my-indent2" :to="{ path:'/UserErweiMa?&name=我的二维码'}">
        <span class="my-indent-left">
          <div>
            <img src="../../img/userImg/personal_bg_two-dimensioncode1.png" alt="">
            <span>我的二维码</span>
          </div>
          <i class="icon-go"></i>
        </span>
      </router-link>
      <router-link class="my-indent2" :to="{ path:'/shipping?id='+login.userId+'&name=收货地址'}">
        <span class="my-indent-left">
          <div>
            <img src="../../img/userImg/personal_bg_receivingaddress.png" alt="">
            <span>收货地址</span>
          </div>
          <i class="icon-go"></i>
        </span>
      </router-link>-->
    </div>
    

    <v-footer :foot="foot"></v-footer>
    </div>
  </div>
</template>

<script>
// import * as mockData from '@/http/mock.js' //模拟数据
// import Baseline from "@/common/_baseline.vue";
import Footer from "@/common/_footer.vue";
import Header from "@/common/_header.vue";

export default {
  components: {
    "v-footer": Footer,
    // "v-baseline": Baseline,
    "v-header": Header
  },
  data() {
    return {
      userInfo: {},
      token: "",
      login: {},
      //  钱包
      balance: "",
      // 积分
      balance2: "",
      foot: "0",
      openid: "",
      arr1: 0,
      arr2: 0,
      arr3: 0,
      arr4: 0
    };
  },
  created() {
    this.foot = 3;
    this.getToken();
    this.getUsermsg();
    this.getorderlist();
console.log(999999998888888888888888888)
    //    setTimeout(() => {
    //      this.getWallet();
    //      this.getjifen();
    //    }, 1000);
  },

  methods: {
    getorderlist() {
      this.$http
        .get(
          this.HOME +
            "/order/getlist?token=" +
            this.token +
            "&page=" +
            this.page +
            "&rows=" +
            100 +
            "&status=" +
            1
        )
        .then(res => {
          console.log(res);
          this.arr1 = res.data.Data.List.length;
        });
      this.$http
        .get(
          this.HOME +
            "/order/getlist?token=" +
            this.token +
            "&page=" +
            this.page +
            "&rows=" +
            100 +
            "&status=" +
            2
        )
        .then(res => {
          console.log(res);
          this.arr2 = res.data.Data.List.length;
        });
      this.$http
        .get(
          this.HOME +
            "/order/getlist?token=" +
            this.token +
            "&page=" +
            this.page +
            "&rows=" +
            100 +
            "&status=" +
            3
        )
        .then(res => {
          console.log(res);
          this.arr3 = res.data.Data.List.length;
        });
      this.$http
        .get(
          this.HOME +
            "/order/getlist?token=" +
            this.token +
            "&page=" +
            this.page +
            "&rows=" +
            100 +
            "&status=" +
            4
        )
        .then(res => {
          console.log(res);
          this.arr4 = res.data.Data.List.length;
        });
    },
    getQrCode() {
//    this.$router.push({ path: "/UserErWeiMa" });
 this.$router.push({ path: "/myshop" });
    },
    getToken() {
      if (this.isWX()) {
        this.openid = localStorage.getItem("openid");
        console.log(this.openid);
        if (this.openid == null) {
          this.$router.push({ path: "/wx" });
        }
      } else {
        this.token = localStorage.getItem("Token");
        console.log(this.token);
        if (this.token == null) {
          this.$router.push({ path: "/login" });
        }
      }
    },
    // 聊天信息列表
    message() {
      console.log(2222);
      this.$router.push({ name: "message" });
    },
    gologin() {
      this.$router.push({ path: "/login?name=登录" });
    },
    // 获取用户信息
    getUsermsg() {
      this.$http.get(this.HOME + "/user/info?token=" + this.token).then(res => {
        console.log(res);
        this.userInfo = res.data.Data.userInfo;
        localStorage.setItem("userType", this.userInfo.type);
      });
    },
    // 获取钱包信息
    getWallet() {
      this.$http
        .get(
          this.HOME +
            "/user/GetUserCashInfo?token=" +
            this.token +
            "&page=" +
            this.page
        )
        .then(res => {
          console.log(res);
          this.balance = res.data.Data.balance;
        });
    },
    // 获取积分
    getjifen() {
      this.$http
        .get(
          this.HOME +
            "/user/GetUserIntegralInfo?token=" +
            this.token +
            "&page=" +
            this.page
        )
        .then(res => {
          console.log(res);
          this.balance2 = res.data.Data.balance;
        });
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/fz.less";
@import "../assets/index/style.css";
@import "../assets/user/icon/carstyle.css";

a:hover,
a:focus {
  color: #23527c;
  text-decoration: none;
}
.head {
  width: 100%;
  height: 3rem;
  z-index: 1;
}

.van-tab.van-tab--active {
  color: #1bc6a3 !important;
}

.msgs {
  position: fixed;
  top: 1rem;
  right: 1.5rem;
/*  z-index: 100000;*/
  .van-icon {
    font-size: 20px;
    color: green;
  }
}
.m {
    width: 28%;
  height:28px;
  position: fixed;

  top: 1rem;
  left: 8px;
/*  z-index: 100000;*/
 
  font-size: 2rem;
  border-top-right-radius: 30px;
  border-top-left-radius: 30px; 
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px; 
  
}

.car {
 height: 564px;
  width: 100%;
  padding-bottom: 14vw;
  background-color: #f2f2f2;
 
  .header {
    z-index:0;
    width: 100%;
    height: 21rem;
    background-image: url(../../img/drawable-xxhdpi/bg1.png);
    background-size: 100% 100%;
  -moz-background-size: 100% 100%;
  -webkit-background-size: 100% 100%;

    /* background-color: #1bc6a3;*/
  
   /*background-image: url(../../img/drawable-xxhdpi/bg.png);*/
    overflow:hidden;
   
    background-size: 100% 100%;
    position: relative;

    .msg {
      width: 100%;
      height: 5.6rem;
      text-align: center;
    /*  z-index: 100000;*/
      position: absolute;
      bottom: 1rem;

      span {
        display: inline-block;
      }
      span:nth-child(1) {
       
        width: 5rem;
        font-size: 0.9rem;
        color: #fff;
        border-radius: 0.4rem;
        text-align: center;
      }
      span:nth-child(3) {
        font-size: 1.1rem;
      }
      span:nth-child(5) {
        color: #1bc6a3;
        font-size: 0.9rem;
      }
    }

    img {
      border-radius: 50%;
      // border: 0.4vw solid #ffffff;
      // background-color: @cl;
      width: 7.5rem;
      height: 7.5rem;
      position: absolute;
      left: 50%;
      top: 42%;
      margin-left: -3rem;
      margin-top: -2.8rem;

     /* z-index: 10000;*/
    }
    span {
      .fz(font-size, 54);
      &::before {
        color: #ffffff;
      }
    }
    .username {
      padding-left: 10px;
      position: absolute;
      left: 85px;
      top: 18px;
      color: #fff;
      font-size: 14px;
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
    z-index:1;
    width: 100%; // border: 1px solid #000;
    margin: 0 auto;
    border-radius: 10px;
    position: relative; // top: -80px;
    margin-top: -10%;
    // 我的钱包
    .wallet {
      width: 94%;
      height: 164px;
      margin-left: 12px;
        background-color: #ffffff;
      border-top-right-radius: 22px;
      border-top-left-radius: 22px; 
       border-bottom-left-radius: 22px;
      border-bottom-right-radius: 22px; 
    
      ul {
        width: 100%;
        height: 166px;
        li {
          width: 100%;
          height: 33.33333333333%;
          text-align: center;
          float: left;
          padding: 0.8rem 0;
         
          
          div {
            border-right: 1px solid #eee;
            span {
              display: block;
              padding-bottom: 0.4rem;
              font-size: 5.6rem;
            }
            span:lath-child {
              color: #1bc6a3;
            }
          }
        }
      }
    }
    .my-indent-left {
      display: flex;
      justify-content: space-between;
      width: 100%;
      div {
        img {
          width: 1rem;
          margin-right: 0.3rem;
          vertical-align: middle;
        }
        span {
          vertical-align: middle;
          font-size: 0.8rem;
          color: #666;
        }
      }
      i {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .my-indent-left:nth-last-child {
      margin-bottom: 1rem;
    }
    .my-indent {
    /*  boder-top-left-radius:50px;*/
      width: 94%;
      display: block;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      color: #333;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      margin-left: 12px;
      -webkit-box-pack: justify;
      -ms-flex-pack: justify;
      justify-content: space-between;
      padding: 0 5vw;
      height: 10vw;
      line-height: 15vw;
      background-color: #fff;
      border-top-right-radius: 30px;
      border-top-left-radius: 30px; // border: 1px solid #000;
      margin-bottom: -1px;
      .bd();
      &:active {
        background-color: rgb(224, 227, 230);
      }

      .my-indent-right {
        width: 5rem;
        span {
          display: inline-block;
          .fz(font-size, 28);
          color: rgba(0, 0, 0, 0.4);
          position: relative;
        }
        i {
          position: absolute;
          top: 0.9rem;
        }
      }
    }
    .my-pay {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      margin-left: 12px;
      width: 94%;
      padding: 2vw 0;
      background-color: #fff;
      border-bottom-left-radius: 30px;
      border-bottom-right-radius: 30px; // border: 1px solid #fff;
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
        > img {
          margin-top: 7px;
          width: 25px;
          height: 25px;
          margin-left: 1%;
        }
        p {
          margin-top: 2px;
          padding: 2.3vw 0;
          text-align: center;
          font-size: 1.4rem;
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
      padding: 0 0.6rem;
      height: 2rem;
      line-height: 2rem;
      background-color: #fff; // border-top-right-radius: 8px;
      // border-top-left-radius: 8px;
      border-top: 1px solid #dadada; // margin-top: 10px;
    }
    .my-pay2 {
      display: -webkit-box;
      display: -ms-flexbox; // display: flex;
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      padding: 2vw 0;
      background-color: #fff; // border: 1px solid #000;
      // margin-top: 10px;
      // height: 30vw;
      // line-height: 30vw;
      .bd();

      > a {
        display: block;
        width: 33.33%;
        color: #999;
        text-align: center;
        margin-top: 1rem;

        > span {
          .fz(font-size, 50);
          margin-top: 2.3vw;
          display: block;
          text-align: center;
        }
        > img {
          width: 20px;
          height: 20px;
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
      width: 100%; // border: 1px solid #fff;
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

.car .main .my-indent-left div img[data-v-e0b47cf6] {
  width: 1.5rem;
  margin-right: 0.3rem;
  vertical-align: middle;
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
/*个人资料img*/
.shezhiimg{
  width: 31px;
    height: 27px;
    position: absolute;
    margin-left: -43%;
    margin-top: 4px;
}
.wodeimg{
     width: 30px;
    height: 25px;
    position: absolute;
    margin-left: -43%;
    margin-top: 1px;
}
.yzimg{
  width: 30px;
    height: 30px;
    position: absolute;
    margin-left:-43%;
    margin-top: -2px;
}
</style>