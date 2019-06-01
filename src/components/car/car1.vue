<template lang="html">
<!-- 购物车列表页 -->
<div class="wrap"> 
    <v-header class="header" style="background:#000;">
      <h1 slot="title" style="color: #fff;">列表页</h1>
    </v-header>
    <!-- 搜索框 -->
<div class="seek">
  <i class="class=mintui mintui-search"></i>
    <input type="text" placeholder="搜索你想购买的商品">
</div>
    <mt-navbar v-model="selected">
  <mt-tab-item id="1">综合</mt-tab-item>
  <mt-tab-item id="2">价格</mt-tab-item>
  <mt-tab-item id="3">最新</mt-tab-item>
  <mt-tab-item id="1">帅选</mt-tab-item>
</mt-navbar>  
<!-- tab-container -->
<mt-tab-container v-model="selected">
  <mt-tab-container-item id="1">
    <!-- <mt-cell v-for="n in 10" :title="'content ' + n" /> -->
  <router-link :to="{name:'详情页'}">
    <div class="group">
      <div class="group-left"><img src="../../static/12.jpg" alt=""></div>
      <div class="group-right">
        <span>2018夏 新款高圆圆 同款高腰雪纺中<br>长款碎花港味半身裙不规则印花</span>
        <div class="serve">
          <span>服务</span>
          <span>服务</span>
          <span>服务</span>
        </div>
        <div class="serve2">
          <span>￥</span>
          <span>80</span>
          <span>></span>
        </div>
      </div>
    </div>
  <router-link>
  </mt-tab-container-item>
  <mt-tab-container-item id="2">
    <mt-cell v-for="n in 4" :title="'content ' + n" />
  </mt-tab-container-item>
  <mt-tab-container-item id="3">
    <mt-cell v-for="n in 6" :title="'content ' + n" />
  </mt-tab-container-item>
</mt-tab-container>
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
      selected: 1
    };
  }
};
</script>

<style lang="less" scoped>
@import "../assets/fz.less";
@import "../assets/index/style.css";
@import "../assets/user/icon/carstyle.css";

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
    border: 1px solid #000;
    margin-top: 10px;
    position: relative;
    background-color: #fff;
    .group-left {
      width: 33%;
      height: 100%;
      // border: 1px solid #000;
      position: absolute;
      > img {
        width: 100%;
        height: 100%;
      }
    }
    .group-right {
      width: 65%;
      height: 100%;
      // border: 1px solid #000;
      position: absolute;
      right: 0;
      font-size: 15px;
      line-height: 20px;
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
      .serve {
        // border: 1px solid #000;
        margin-top: 15px;
        > span {
          border: 1px solid rgb(109, 2, 2);
          border-radius: 10px;
          display: inline-block;
          width: 20%;
          text-align: center;
          color: red;
        }
        > span:nth-of-type(2) {
          border: 1px solid green;
          border-radius: 10px;
          display: inline-block;
          width: 20%;
          text-align: center;
        }
      }
    }
  }
}
.serve2 {
  // border: 1px solid #000;
  margin-top: 18px;
  color: rgb(211, 16, 16);
  > span:nth-of-type(1) {
    font-size: 11px;
  }
  > span:nth-of-type(2) {
    font-size: 18px;
  }
  > span:nth-of-type(3) {
    font-size: 18px;
    position: absolute;
    right: 10px;
    color: #ccc;
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
  border-bottom: 3px solid red;
  color: red;
  margin-bottom: -3px;
}
</style>
