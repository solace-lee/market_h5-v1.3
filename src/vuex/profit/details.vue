<template lang="html">
     <div class="tmpl">
        <v-header></v-header>
        <div style='height:3.5rem'>
        </div>
        <div style="display: inline-block;width: 100%">
            <div v-if="profitDetailsAll==null || profitDetailsAll==''"  style='margin-top:20px;text-align:center'>暂无数据</div>
          <div v-for="item in profitDetailsAll"  @click="getDetails(item)"  style='margin-top:1px;background-color:white;height: 78px;'>  
                
                 <div v-if="zheng"></div>
               <!-- <div v-if="item.walletDetailId"> &nbsp; {{item.count}} </div> -->
               <div v-if="item.detailsAmount>0" style="position: absolute;margin-top: 25px;right: 44px;;font-size: 2rem;color: #00AE87;"> &nbsp;
                <span>{{item.detailsAmount}}.00</span>&nbsp;
                <img style="position: absolute;right: -23px;height: 14px;margin-top:-22px" src="../../../../img/drawable-xxhdpi/icon_arrow.png"></div>  
                 <!-- 金额 -->
                 <div v-if="item.detailsAmount<0" style="position: absolute;margin-top: 25px;right: 44px;;font-size: 2rem;color: #8e8e8e;"> &nbsp;
                <span>{{item.detailsAmount}}.00</span>&nbsp;
                <img style="position: absolute;right: -23px;height: 14px;margin-top:-22px" src="../../../../img/drawable-xxhdpi/icon_arrow.png"></div>

               <div v-if="item.walletType==10" style="position: absolute;margin-top: 25px;color: rgb(51, 51, 51);font-size: 13px;"> &nbsp;<span> 养殖收益</span></div>
               <div v-if="item.walletType==11" style="color: rgb(51, 51, 51);font-size: 13px;position: absolute;margin-top: 23px;"> &nbsp; 推广收益 </div>
               <div v-if="item.walletType==12" style="position: absolute;margin-top: 17px;color: rgb(51, 51, 51);font-size: 13px;"> &nbsp; 区域收益 </div>
               <div v-if="item.walletType==13" style="color: rgb(51, 51, 51);font-size: 13px;position: absolute;margin-top: 13px"> &nbsp; 结算 </div>
               <div v-if="item.withdrawStatus==1" style="color: #F8464D;font-size: 12px;position: absolute;margin-top: 30px;"> &nbsp; 处理中 </div>
               <div v-if="item.withdrawStatus==2" style="color: rgb(51, 51, 51);font-size: 13px;position: absolute;margin-top: 30px;color: #999999"> &nbsp; 已完成 </div>
               <div v-if="item.createTime" style="position: absolute;margin-top: 45px;color: #999999"> &nbsp;{{item.createTime}} </div>  <!-- 时间 -->

               <!-- <div v-if="item.count"> &nbsp; {{item.count}} </div>
               <div v-if="item.transferBankAccount"> &nbsp; {{item.transferBankAccount}} </div>
               <div v-if="item.transferUserName"> &nbsp; {{item.transferUserName}} </div>
               <div v-if="item.bankWaterBill"> &nbsp; {{item.bankWaterBill}} </div>
               <div v-if="item.transferDate"> &nbsp; {{item.transferDate}} </div> -->
          </div> 
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
      profitDetailsAll: []
    };
  },
  created() {
    this.getProfitDetailsAll();
  },
  methods: {
    getProfitDetailsAll() {
      this.token = localStorage.getItem("Token");
      // this.token = "420cd138-392d-4bcc-af38-841d454f6428";
      // 获取基金详情
      let config = {
        headers: {
          token: this.token
        }
      };
      this.$http.get(this.GAMEAPI + "fund/detailsAll", config).then(res => {
        var arr = res.data.data;
        arr.forEach(val => {
          val.createTime = this.formartDate(val.createTime);
          val.transferDate = this.formartDate(val.transferDate);
          this.profitDetailsAll.push(val);
        });
        // alert(JSON.stringify(this.profitDetailsAll));
        this.loading = false;
      });
    },
    getDetails(object) {
      var name = "";
      if (object.walletType == 10) {
        name = "养殖收益";
      } else if (object.walletType == 11) {
        name = "推广收益";
      } else if (object.walletType == 12) {
        name = "区域收益";
      } else if (object.walletType == 13) {
        name = "结算";
      }
      // alert(JSON.stringify(object));
      this.$router.push({
        path: "/game/profit/detail?name=" + name,
        query: { profitDetails: object }
      });
    },
    formartDate(param) {
      if (!param) {
        return null;
      }
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
*{
  padding:0px;
  margin:0px;
}
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
