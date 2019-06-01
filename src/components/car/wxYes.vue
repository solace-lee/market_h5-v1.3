<template>
  <div class="wxYes">
    <div class="cy_head">
      <strong>微信支付</strong>
    </div>
    <div class="cy_body">
      <div class="cy_b_text">
        <div><img src="../../../img/index/car/weixinzhifu.png" class="img"></div>
      </div>
      <div class="text">请确认微信支付是否已完成</div>
      <div class="cy_b_goshop">
        <div class="m-r1">
          <button @click="goaAllOrders" class="button1">是，我已经支付</button>
        </div>
        <div class="m-r1">
          <button @click="goShop" class="button1 button2">返回首页</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import carLovely from "@/components/car/carLovely.vue";
import { Toast } from "mint-ui";
export default {
  components: {
  },
  created() {
    this.getData();
  },
  data() {
    return {
      status: "",
    };
  },
  methods: {
    getData() {
      let status = this.$route.query.outTradeNo || " ";
        if (status == " ") {
          this.$router.replace({
            path: "/"
          });
      } else {
        this.status = status
      }
    },
    goaAllOrders() {
      this.$api
      .get(this.HOME+this.ORDER+'inside/weChatPay/orderReturn',{params:{outTradeNo:this.status}})
      .then(res => {
        if(res.data.status == 200) {
          this.$router.replace({
            path: "/caryes?status=ok"
          });
        } else {
          Toast(res.data.msg)
        }
      })
      .catch((error) =>  {
        this.$router.replace({
          path: "/caryes?status=unpaid"
        });
      });
    },
    goShop() {
      this.$router.replace({
        path: "/"
      });
    }
  }
};
</script>

<style lang="less" scoped>
.wxYes {
  width: 100%;
  height: 90vh;
  .cy_head {
    width: 100%;
    height: 4.7rem;
    background-color: #fff;
    z-index: 1000;
    text-align: center;
    line-height: 4.7rem;
    font-size: 1.8rem;
  }
  .cy_body {
    width: 100%;
    height: 100%;
    .cy_b_text {
      width: 100%;
      text-align: center;
      margin-top:1rem;
      .img{
        width: 10rem;
      }
    }
    .text{
      width: 100%;
      text-align:center;
      font-size:1.6rem;
      margin-top:2rem;
      color:#00ae87;
    }
    .cy_b_goshop {
      width: 100%;
      padding: 0rem 4.8rem;
      margin-bottom: 2.4rem;
      margin-top: 2rem;
      font-size: 1.6rem;
      .m-r1 {
        width: 100%;
        height: 4.4rem;
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
          color: #fff;
          background-color: #00ae87;
        }
      }
    }
  }
}
</style>
