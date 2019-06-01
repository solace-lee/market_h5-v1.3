<template>
  <div class="carYes">
    <div class="cy_head">
      <strong>支付</strong>
    </div>
    <div class="cy_body">
      <div class="cy_b_text">
        <van-icon name="passed" v-if="status == 'ok'"/>
        <span v-if="status == 'jf'">订单支付成功</span>
        <span v-if="status == 'un'">订单未支付</span>
        <span v-if="status == 'ok'">订单支付成功</span>
        <span v-if="status == 'er'">支付失败</span>
      </div>
      <!-- <div class="cy_b_list">
        <div class="flex">
          <span>订单金额：</span>
          <span class="right">￥15.00元</span>
        </div>
        <div  class="flex">
          <span>订单单号：</span>
          <span class="right">12345678912</span>
        </div>
        <div  class="flex">
          <span>快递单号</span>
          <span class="right">12345678912</span>
        </div>
        <div  class="flex">
          <span>订单交易时间：</span>
          <span class="right">2019-01-01</span>
        </div>
      </div>-->
      <div class="cy_b_goshop">
        <div class="m-r1">
          <button @click="goaAllOrders" class="button1">查看订单详情</button>
        </div>
        <div>
          <button @click="goShop" class="button2">继续购物</button>
        </div>
      </div>
    </div>
    <!-- <div class="cy_title">
      <span></span>
      <p>猜你喜欢</p>
      <span></span>
    </div>
    <v-carlovely></v-carlovely>-->
    <v-section5 :grous="grous"></v-section5>
  </div>
</template>

<script>
import carLovely from "@/components/car/carLovely.vue";
import Section5 from "@/components/index/section5.vue";
export default {
  components: {
    "v-section5": Section5,
    "v-carlovely": carLovely
  },
  created() {
    this.getData();
    this.getYouLike();
    // window.addEventListener("scroll", this.handleScroll);
  },
  // beforeDestroy() {
  //   // 销毁监听事件
  //   window.removeEventListener("scroll", this.handleScroll);
  // },
  data() {
    return {
      status: "",
      grous: [] //猜你喜欢
    };
  },
  methods: {
    getData() {
        let status = this.$route.query.status || " ";
        if (status == " ") {
          this.$router.replace({
            path: "/"
          });
      } else {
        this.status = status.slice(0,2)
      }
    },
    goaAllOrders() {
      window.sessionStorage.setItem("allOrderStatus", 0);
      this.$router.replace({
        path: "/allOrders"
      });
    },
    goShop() {
      this.$router.replace({
        path: "/"
      });
    },
    // 获取猜你喜欢的数据
    getYouLike() {
      this.districtId = sessionStorage.getItem("districtId") || "0";
      this.page = 1;
      const config = {};
      config.districtId = this.districtId;
      config.size = this.size;
      config.page = 1;
      const obj = {
        params: { ...config }
      };
      this.$api
        .get(this.HOME + this.SEARCH + "commodity/indexlike", obj)
        .then(res => {
          this.grous = res.data.data;
          this.lock = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //加载更多猜你喜欢事件
    // getMoreYouLike() {
    //  if (this.lock) {
    //     return;
    //   } else {
    //     this.lock = true;
    //     this.page = ++this.page;
    //     const config = {};
    //     config.districtId = this.districtId;
    //     config.size = this.size;
    //     config.page = this.page;
    //     const obj = {
    //       params: { ...config }
    //     };
    //     this.$api
    //       .get(this.HOME + this.SEARCH + "commodity/indexlike", obj)
    //       .then(res => {
    //         const arr = res.data.data;
    //         if (arr.length == 0) {
    //           // Toast("已经到底啦！");
    //           this.page = --this.page;
    //           // this.lock = false;
    //         } else {
    //           this.grous = [...this.grous, ...arr];
    //           this.lock = false;
    //         }
    //       })
    //       .catch(err => {
    //         console.log(err);
    //         this.lock = false;
    //       });
    //   }
    // },
    // 头部上拉显示
    // handleScroll() {
    //   // 获取滚动高度并判断是否显示返回顶部按钮
    //   const scrollTop =
    //     window.pageYOffset ||
    //     document.documentElement.scrollTop ||
    //     document.body.scrollTop;
    //   // 获取屏幕高度
    //   const deviceHight = document.documentElement.clientHeight;
    //   // 获取页面高度
    //   const insexHight = this.$refs.indexPart.offsetHeight;
    //   if (scrollTop > deviceHight) {
    //     this.showBackTop = true;
    //   } else {
    //     this.showBackTop = false;
    //   }
    //   // 判断是否要启动触底事件
    //   const allHeight = scrollTop + deviceHight + 10;
    //   if (allHeight > insexHight) {
    //     // 触发触底事件
    //     console.log("触底了" + insexHight);
    //     // this.getMoreYouLike();
    //   }

    //   // 获取需要渐变的元素
    //   const header = this.$refs.c_header;
    //   // 需要出现的位置
    //   if (!this.goodslist.length) {
    //     header.style.opacity = 1;
    //     return;
    //   } else {
    //     header.style.opacity = scrollTop / 110;
    //   }

    //   // 获取屏幕高度
    //   // const deviceHight = document.documentElement.clientHeight
    //   // 获取页面高度
    //   // const insexHight = this.$refs.indexPart.offsetHeight
    //   // if (scrollTop > deviceHight) {
    //   //   this.showBackTop = true
    //   // } else {
    //   //   this.showBackTop = false
    //   // }
    // }
  }
};
</script>

<style lang="less" scoped>
.carYes {
  width: 100%;
  height: 100vh;
  background-color: #f6f6f6;
  .cy_head {
    width: 100%;
    height: 4.7rem;
    background-color: #f2f2f2;
    z-index: 1000;
    text-align: center;
    line-height: 4.7rem;
    font-size: 1.6rem;
  }
  .cy_body {
    width: 100%;
    .cy_b_text {
      height: 9.4rem;
      background-color: #fff;
      text-align: center;
      padding: 3rem 0rem;
      font-size: 1.6rem;
      vertical-align: center;
      margin-bottom: 1rem;
      i {
        font-size: 3rem;
        color: #00ae87;
        display: inline-block;
        vertical-align: middle;
        margin-right: 1rem;
      }
      span {
        vertical-align: middle;
      }
    }
    .cy_b_list {
      width: 100%;
      background-color: #fff;
      margin-bottom: 2rem;
      .flex {
        border-bottom: 0.05rem solid #eee;
        color: #747473;
        padding: 1.5rem 1rem;
        display: flex;
        justify-content: flex-start;
        span {
          flex: 1;
          color: #999999;
        }
        .right {
          text-align: right;
          color: #333333;
        }
      }
    }
    .cy_b_text2 {
      height: 5rem;
      line-height: 5rem;
      background-color: #fcf2d8;
      text-align: center;
      color: #b5913a;
      margin-bottom: 1.4rem;
    }
    .cy_b_goshop {
      padding: 0rem 4.8rem;
      margin-bottom: 2.4rem;
      margin-top: 3rem;
      font-size: 1.6rem;
      div {
        width: 100%;
        height: 4.4rem;
        flex: 1;
        text-align: center;
        line-height: 4rem;
        margin-bottom: 1rem;
        .button1 {
          width: 100%;
          height: 100%;
          color: #00ae87;
          background: none;
          border: 0.1rem solid #00ae87;
          border-radius: 0.5rem;
        }
        .button2 {
          width: 100%;
          height: 100%;
          color: #fff;
          background-color: #00ae87;
          border-radius: 0.5rem;
        }
      }
    }
  }
  .cy_title {
    width: 100%;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    p {
      font-size: 1.5rem;
      color: #00ae87;
      margin: 0rem 2rem;
    }
    span {
      width: 3.7rem;
      height: 0.2rem;
      background-color: #00ae87;
    }
  }
  .cy_lovely {
    padding-left: 1rem;
    .cy_lovely_h {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .cy_lovely_hl {
        flex: 1;
        color: #979797;
      }
      .cy_lovely_hr {
        flex: 1.5;
        .span {
          height: 0.05rem;
          background-color: #979797;
        }
      }
    }
  }
}
</style>
