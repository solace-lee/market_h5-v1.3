<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="this.$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!this.$route.meta.keepAlive"></router-view>
    <!-- <v-loading v-show="fetchLoading"></v-loading> -->
  </div>
</template>

<script>
// import Loading from "@/common/_loading";
import { Toast } from "vant";

export default {
  name: "app",
  components: {
    // "v-loading": Loading
  },
  data() {
    return {
      msg: "" // 显示错误信息
    };
  },
  watch: {
    fetchLoading() {
      this.msg = this.fetchLoading;
      if (this.msg == true) {
        return;
      } else {
        Toast(this.msg, 2000);
        setTimeout(() => {
          this.msg = "";
        }, 1000);
      }
    }
  },
  computed: {
    fetchLoading() {
      return this.$store.state.detail.fetchLoading;
    }
  },
  created() {
    // const localUrl = window.location.href.split(":");
    // if (localUrl == 'file') {
    //   mui.plusReady(() => {
    //     const x = plus.storage.getItem('token') || ''
    //     Toast(plus.storage.getItem('token'))
    //     if (x == '') {
    //       return
    //     } else {
    //       localStorage.setItem('token', x)
    //       alert('拿到了token：' + x)
    //     }
    //   })
    // }
  }
};
</script>

<style lang="less">
@import "./assets/css/app.less";
.main {  
  background-color: #00ae87;
  padding-top: 20px;
  padding-top: constant(safe-area-inset-top);
}

.mui-bar.mui-bar-nav {
  background-color: #00ae87;
  box-shadow: none;
  top: 20px;
  top: constant(safe-area-inset-top);
}

.mui-bar.mui-bar-nav .mui-title {
  color: #FFFFFF;
}


html,
body,
#app {
  width: 100%;
  // height: 100vh;
  // overflow: hidden;

  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  /* overflow:hidden; */
  /* overflow-y: scroll; */
}
body,
dd,
dl,
dt,
fieldset,
form,
h1,
h2,
h3,
h4,
h5,
h6,
html,
img,
legend,
li,
ol,
p,
ul {
  margin: 0;
  padding: 0;
  -moz-user-select: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
}

button,
fieldset,
img,
input {
  border: none;
  padding: 0;
  margin: 0;
  outline-style: none;
}

ul,
li {
  background-color: #ffffff;
}
ol,
ul {
  list-style: none;
}

input {
  padding-top: 0;
  padding-bottom: 0;
  font-family: "SimSun", "宋体";
}

input,
select {
  vertical-align: middle;
}

// input,
// select,
// textarea {
//     font-size: 18px;
//     margin: 0;
//     margin-left: 10px;
// }
textarea {
  resize: none;
}

/*防止拖动*/
img {
  border: 0;
  vertical-align: middle;
}

/*  去掉图片低测默认的3像素空白缝隙*/
table {
  border-collapse: collapse;
}

// 店铺主页tab栏
.shop-index .van-tabs {
}
.shop-index .van-tabs__line {
  background: #00ae87;
}

i {
  font-style: normal;
}
body {
  font-family: PingFangSC-Light, helvetica, "Heiti SC";
  color: #666;
  // background: #f2f2f2;
}

a {
  color: #666;
  text-decoration: none;
}

a:hover {
  text-decoration: none;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  text-decoration: none;
  font-weight: normal;
  font-size: 100%;
  font-family: PingFangSC-Light, helvetica, "Heiti SC";
}

.ac {
  text-align: center;
}

.mint-searchbar-inner .mintui-search {
  font-size: 22px;
  color: #d9d9d9;
}
.mint-searchbar-inner {
  border-radius: 5px;
}
.car .main .my-indent[data-v-21974e90] {
  border-bottom-color: #fff;
  //  border: 1px solid #000;
}
.mint-search {
  height: 8vh;
}
header h1[data-v-416b7b2c] {
  margin-right: 44vw;
}
.van-checkbox--checked {
  border-color: #cd2a34;
  background-color: #cd2a34;
}
// .el-rate__icon {
//     font-size: 28px;
// }

.van-badge {
  min-height: 4.4rem;
  width: 8.5rem;
  padding: 1.5rem 0.8rem 1.5rem 0.8rem;
}

.van-badge__text {
  font-size: 1.3rem;
  color: #666;
}

// .van-tab {
//     background: #00ae87;
//     .van-ellipsis {
//         color: #fff;
//     }
// }
// .van-hairline{
//     border: 2rem solid #000;
// }

.van-badge--select {
  border-left: 0.4rem solid #01ae86;
  // border-image: -webkit-linear-gradient(#6ebb23,#01ae86) 30 30;
  // border-image: -moz-linear-gradient(#6ebb23,#01ae86) 30 30;
  // border-left: linear-gradient(#6ebb23,#01ae86);
}

//加入购物车的按钮
.van-sku-actions {
  width: 90%;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}
.van-button--bottom-action {
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  background-color: #ff6565;
}
.van-button--bottom-action.van-button--primary {
  background-color: #cd2a34;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
}
.van-sku-row__item--disabled {
  border-radius: 10px;
}
.van-sku-row__item--active {
  border-radius: 10px;
  background-color: #cd2a34;
  color: #fff;
}
.van-sku-row__item {
  display: inline-block;
  padding: 5px 9px;
  margin: 0 10px 10px 0;
  height: 28px;
  min-width: 52px;
  line-height: 16px;
  font-size: 12px;
  color: #000;
  text-align: center;
  border: 1px solid #999;
  border-radius: 10px;
  box-sizing: border-box;
}
// .el-input__inner {
//     height: 30px;
//     width: 87%;
//     border: 1px solid #fff;
//     background-color:#ccc;
// }
// .el-input-number__decrease:hover:not(.is-disabled)~.el-input .el-input__inner:not(.is-disabled), .el-input-number__increase:hover:not(.is-disabled)~.el-input .el-input__inner:not(.is-disabled) {
//     border-color: #fff;
// }
// .el-message-box {
//     width: 304px;
// }
.van-button--primary {
  color: #fff;
  background-color: #f21536;
  border: 1px solid #f2143f;
  border-radius: 5px;
}
// 修改登录页面的多选框样式开始
.van-checkbox-group {
  display: flex;
  justify-content: space-between;
  color: #c3c3c3;
  font-size: 1.2rem;
  font-weight: normal;
  font-family: SourceHanSansCN-Regular;
  #checkbox {
    color: #c3c3c3;
    font-size: 1.2rem;
    margin-left: 12px;
    .van-checkbox__label {
      font-size: 1.2rem;
      z-index: 1000;
      color: inherit !important;
    }
  }
}
// 修改登录页面的多选框样式结束

// 商品详情页服务弹框
.servers-item .van-checkbox__label {
  color: #666;
}
.servers-item .van-checkbox__icon--checked .van-icon {
  color: #00ae87;
  border-color: #00ae87;
  background: #fff;
}

.mint-msgbox-confirm {
  color: #00ae87;
}

// 商品详情页弹框溢出
.chose .van-popup {
  overflow-y: initial;
}
</style>
