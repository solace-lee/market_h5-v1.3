<template lang="html">
     <div class="tmpl">
        <v-header></v-header>
        <div style='height:3.5rem'>
        </div>

        <div style='margin:5px;margin-top:20px'>
          <ul >
                
               <!-- <div v-if="item.walletDetailId"> &nbsp; {{item.count}} </div> -->
               <div v-if="profitDetails.detailsAmount" style="width: 100%;height:140px;font-size:6rem;line-height:140px;overflow:hidden;margin-left: 18%;color:#069682;">&nbsp;&nbsp;{{profitDetails.detailsAmount}}.00</div>
                     
                <div v-if="profitDetails.createTime" style="height: 42px;">&nbsp;&nbsp;日期&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="margin-left: 161px;">{{profitDetails.createTime}}</span></div>

               <div v-if="profitDetails.walletType==10"  style="height: 42px;">&nbsp;&nbsp;交易类型&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="margin-left: 205px;">养殖收益</span></div>
               <div v-if="profitDetails.walletType==11" style="height: 42px;">&nbsp;&nbsp;交易类型&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="margin-left: 205px;">推广收益</span></div>
               <div v-if="profitDetails.walletType==12" style="height: 42px;">&nbsp;&nbsp;交易类型&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="margin-left: 205px;">区域收益</span></div>
               <div v-if="profitDetails.walletType==13" style="height: 42px;">&nbsp;&nbsp;交易类型&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="margin-left: 235px;">结算</span></div>

               <div v-if="profitDetails.walletType==10 && profitDetails.count" style="height: 42px;">&nbsp;&nbsp;收获金蛋数量 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="margin-left: 205px;color:#069682;">{{profitDetails.count}}&nbsp;个 </span> </div>
               <div v-if="profitDetails.walletType==11 && profitDetails.count" style="height: 42px;">&nbsp;&nbsp;购买鸡苗数量 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="margin-left: 205px;color:#069682;">{{profitDetails.count}}&nbsp;只 </span> </div>
               <div v-if="profitDetails.walletType==12 && profitDetails.count" style="height: 42px;">&nbsp;&nbsp;购买鸡苗数量 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="margin-left: 205px;color:#069682;">{{profitDetails.count}}&nbsp;只</span> </div>

               <div v-if="profitDetails.transferBankAccount"style="height: 42px;">&nbsp;&nbsp;转账银行卡账号&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="margin-left: 174px;">{{profitDetails.transferBankAccount}}</span> </div>
               <div v-if="profitDetails.transferUserName"style="height: 42px;">&nbsp;&nbsp;转账银行卡持卡人&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="margin-left: 183px;">{{profitDetails.transferUserName}} </span></div>
               <div v-if="profitDetails.bankWaterBill"style="height: 42px;">&nbsp;&nbsp;转账银行流水号&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="margin-left: 174px;">{{profitDetails.bankWaterBill}}</span> </div>
               <div v-if="profitDetails.transferDate"style="height: 42px;">&nbsp;&nbsp;转账日期&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="margin-left: 174px;">{{profitDetails.transferDate}}</span> </div>
               
          </ul> 
        </div>
    </div>

    
       
</template>

<script>
import Footer from "@/common/_footer.vue";
import Header from "@/common/_header.vue";
import Baseline from "@/common/_baseline.vue";
import { formatDate } from "@/assets/js/data.js";
import { Toast } from "vant";
export default {
  components: {
    "v-footer": Footer,
    "v-baseline": Baseline,
    "v-header": Header
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  },
  data() {
    return {
      token: "",
      page: "",
      name: "",
      profitDetails: {}
    };
  },

  created() {
    this.profitDetails = this.$route.query.profitDetails;
    // alert(JSON.stringify(this.profitDetails));
  },

  methods: {
    formartDate(param) {
      let date = new Date(param);
    
      var Y = date.getFullYear() + "-";

      var M =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1) + "-"
          : date.getMonth() + 1 + "-";
      var D =
        date.getDate() < 10 ? "0" + date.getDate() + " " : date.getDate() + " ";
      var h =
        date.getHours() < 10
          ? "0" + date.getHours() + ":"
          : date.getHours() + ":";
      var m =
        date.getMinutes() < 10
          ? "0" + date.getMinutes() + ":"
          : date.getMinutes() + ":";
      var s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

      return Y + M + D + h + m + s;
    },

    onLoad() {
      console.log(!this.loading);
      if (!this.loading) {
        return;
      }
      this.loading = true;
      console.log(this.page);
    },
    onLoad2() {
      console.log(!this.loading2);
      if (!this.loading2) {
        return;
      }
      this.loading2 = true;
      console.log(this.page);
    }
  }
};
</script>
<style scoped lang='less'>
.head {
  width: 100%;
  height: 4rem;
}

.name {
  margin-top: -6%;
  background-color: #00ad8a;
  float: left;
  width: 50% !important;
}

.carry {
  background-color: #0bb794;
  color: #fff;
  font-size: 1.6rem;
  height: 4rem;
  width: 80%;
  margin-top: 20px;
  margin-left: 10%;
  position: fixed;
  bottom: 0;
  border-radius: 3rem;
}

.all {
  margin-top: 2px;
  height: 100pt;
  width: 100%;
  text-align: center;
  background-color: #fff;
  padding-top: 1rem;
  position: relative;
  p {
    font-size: 1rem;
  }
  div {
    width: 100%;
    position: relative;
    /*			padding-top: 1rem;*/
    span:nth-child(1) {
      font-size: 2rem;
      color: #ffffff;
    }
    span:nth-child(2) {
      margin-left: 0rem;
      font-size: 2rem;
      color: #ffffff;
    }
    span:nth-child(3) {
      background-color: #00ad8a;
      color: #fff;
      padding: 0.2rem 0.6rem;
      border-radius: 2.5rem;
      position: absolute;
      font-size: 0.6rem; // right: 4rem;
    }
  }
}
.wallet {
  width: 100%;
  height: 14rem;
  ul {
    width: 100%;
    height: 100%;
    li {
      width: 50%;
      height: 100%;
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
      margin-top: 0px;
      width: 1rem;
      margin-right: 0.3rem;
      vertical-align: middle;
    }
    span {
      vertical-align: middle;
      font-size: 1.3rem;
      color: #666;
    }
  }
  i {
    display: flex;
    justify-content: center;
    align-items: center;
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
  height: 6rem;
  line-height: 2rem;
  background-color: #fff; // border-top-right-radius: 8px;
  // border-top-left-radius: 8px;
  border-top: 1px solid #dadada; // margin-top: 10px;
}

.detail {
  width: 100%;
  background-color: #fff;
  .title {
    width: 100%;
    height: 3rem;
    padding: 0.6rem;
    line-height: 2rem;
    font-size: 1.6rem;
  }
  .detail_ {
    width: 100%;
    height: 4rem;
    padding: 0.4rem 0;
    border-top: 0.03rem solid #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.6rem;
    .left {
      .red {
        display: inline-block;
        width: 8rem;
        text-align: center;
        color: #cb2221;
      }
      .green {
        display: inline-block;
        width: 8rem;
        text-align: center;
        color: rgb(0, 173, 136);
      }
      p {
        font-size: 1rem;
        color: #999999;
        padding-left: 3rem;
      }
    }
    .jifen {
      padding-left: 2rem;
      color: #666666;
      p {
        padding: 0.3rem 0 0 0;
      }
    }
    .right {
      font-size: 1.4rem;
      padding-right: 1rem;
      height: 100%;
      display: flex;
      align-items: center;
    }
  }
}
</style>