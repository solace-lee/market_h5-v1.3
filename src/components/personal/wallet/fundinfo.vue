<template>
  <div class="fundinfo" ref="indexPart">
    <!-- 头部 -->
    <div class="head">
      <div class="bg"></div>
      <div class="head-title">
        <div class="back" @click="showInfo = false" v-show="showInfo">
          <img src="../../../../img/index/wallet/back.png" alt>
        </div>
        <div class="back" @click="$router.go(-1)" v-show="!showInfo">
          <img src="../../../../img/index/wallet/back.png" alt>
        </div>
        <div class="title">{{title}}</div>
      </div>
    </div>

    <!-- 余额明细 -->
    <div class="income-comtainer" v-if="title == '余额明细'">
      <div class="income">
        <div class="income-list" @click="clickItem(i)" v-for="(i, index) of list" :key="index">
          <div class="income-info">
            <div class="income-name" v-show="i.walletType == 5">支付(购买)</div>
            <div class="income-name" v-show="i.walletType == 4">退款</div>
            <div class="income-name" v-show="i.walletType == 13">结算</div>
            <div class="income-name" v-show="i.walletType == 7">提现</div>
            <div class="income-date">{{i.creatTime}}</div>
          </div>
          <div class="income-value">
            <div class="income-num" v-show="i.walletType == 4 || i.walletType == 13">+{{i.dAmount}}</div>
            <div class="income-num-sub" v-show="i.walletType == 5">-{{i.dAmount}}</div>
            <div class="income-num-sub" v-show="i.walletType == 7">-{{i.dAmount}}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 基金明细 -->
    <div class="income-comtainer" v-if="title == '基金明细'">
      <div class="income">
        <div class="income-list" @click="clickItem(i)" v-for="(i, index) of list" :key="index">
          <div class="income-info">
            <div class="income-name" v-show="i.walletType == 10">养殖收益</div>
            <div class="income-name" v-show="i.walletType == 11">推广收益</div>
            <div class="income-name" v-show="i.walletType == 4">订单退款</div>
            <div class="income-name" v-show="i.walletType == 12">区域收益</div>
            <div class="income-name" v-show="i.walletType == 13">结算</div>
            <div class="income-name" v-show="i.walletType == 14">支付(购买)</div>
            <div class="income-date">{{i.createdDate}}</div>
          </div>
          <div class="income-value">
            <div class="income-num" v-show="i.walletType == 10">+{{i.detailsAmount}}</div>
            <div class="income-num" v-show="i.walletType == 11">+{{i.detailsAmount}}</div>
            <div class="income-num" v-show="i.walletType == 12">+{{i.detailsAmount}}</div>
            <div class="income-num" v-show="i.walletType == 4">+{{i.detailsAmount}}</div>
            <div class="income-num-sub" v-show="i.walletType == 13">-{{i.detailsAmount}}</div>
            <div class="income-num-sub" v-show="i.walletType == 14">-{{i.detailsAmount}}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 积分明细 -->
    <div class="income-comtainer" v-if="title == '积分明细'">
      <div class="income">
        <div class="income-list" @click="clickItem(i)" v-for="(i, index) of list" :key="index">
          <div class="income-info">
            <div class="income-name" v-if="i.walletType == 1">积分收益</div>
            <div class="income-name" v-if="i.walletType == 2">商品兑换</div>
            <div class="income-date">{{i.createdDate}}</div>
          </div>
          <div class="income-value">
            <div class="income-num" v-if="i.walletType == 1">+{{i.amount}}</div>
            <div class="income-num-sub" v-if="i.walletType == 2">-{{i.amount}}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 业绩明细 -->
    <div class="income-comtainer" v-if="title == '业绩明细'">
      <div class="income">
        <div class="income-list" @click="clickItem(i)" v-for="(i, index) of list" :key="index">
          <div class="income-info">
            <div class="income-name" v-show="i.incomeAmount">推广收益</div>
            <div class="income-name" v-show="i.consumeAmount">结算</div>
            <div class="income-date">{{i.createTime}}</div>
          </div>
          <div class="income-value">
            <div class="income-num" v-show="i.incomeAmount">+{{i.incomeAmount}}</div>
            <div class="income-num-sub" v-show="i.consumeAmount">-{{i.consumeAmount}}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 红包明细 -->
    <div class="income-comtainer" v-if="title == '红包明细'">
      <div class="income">
        <div class="income-list" @click="clickItem(i)" v-for="(i, index) of list" :key="index">
          <div class="income-info">
            <div class="income-name" v-if="i.walletType == 6">注册收益</div>
            <div class="income-name" v-if="i.walletType == 3">红包支付</div>
            <div class="income-date">{{i.creatTime}}</div>
          </div>
          <div class="income-value">
            <div class="income-num" v-if="i.walletType == 6">+{{i.dAmount}}</div>
            <div class="income-num-sub" v-if="i.walletType == 3">-{{i.dAmount}}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 点击某条列表，弹出详情 -->
    <div class="show-info" v-show="showInfo">
      <!-- 余额明细 -->
      <div class="income1-comtainer" v-if="title == '余额明细'">
        <div class="income1">
          <div class="income1-head">
            <div class="income1-name" v-show="item.walletType == 13 || item.walletType == 4">收入金额</div>
            <div class="income1-name" v-show="item.walletType == 5 || item.walletType == 7">支出金额</div>
            <div
              class="income1-number"
              v-show="item.walletType == 13 || item.walletType == 4"
            >{{item.dAmount}}</div>
            <div
              class="income1-number-sub"
              v-show="item.walletType == 5 || item.walletType == 7"
            >{{item.dAmount}}</div>
          </div>
          <div class="income1-value">
            <div class="income1-infomation">
              <div class="income1-list1">
                <div class="income1-list1-left">收益类型</div>
                <div
                  class="income1-list1-right"
                  v-show="item.walletType == 4 || item.walletType == 13"
                >收入</div>
                <div
                  class="income1-list1-right"
                  v-show="item.walletType == 5 || item.walletType == 7"
                >支出</div>
              </div>
              <div class="income1-list1">
                <div class="income1-list1-left">交易类型</div>
                <div class="income1-list1-right" v-show="item.walletType == 5">支付(购买)</div>
                <div class="income1-list1-right" v-show="item.walletType == 7">提现</div>
                <div class="income1-list1-right" v-show="item.walletType == 4">退款</div>
                <div class="income1-list1-right" v-show="item.walletType == 13">结算</div>
              </div>
              <div class="income1-list1">
                <div class="income1-list1-left">交易时间</div>
                <div class="income1-list1-right">{{item.creatTime}}</div>
              </div>
              <div class="income1-list1" v-if="item.orderNum">
                <div class="income1-list1-left">订单编号</div>
                <div class="income1-list1-right">{{item.orderNum}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 基金明细 -->
      <div class="income1-comtainer" v-if="title == '基金明细'">
        <div class="income1">
          <div class="income1-head">
            <div class="income1-name" v-show="item.walletType == 10 || item.walletType == 11">收入金额</div>
            <div class="income1-name" v-show="item.walletType == 12 || item.walletType == 4">收入金额</div>
            <div class="income1-name" v-show="item.walletType == 13 || item.walletType == 14">支付金额</div>
            <div
              class="income1-number"
              v-show="item.walletType == 10 || item.walletType == 11"
            >{{item.detailsAmount}}</div>
            <div class="income1-number" v-show="item.walletType == 12 || item.walletType == 4">{{item.detailsAmount}}</div>
            <div
              class="income1-number-sub"
              v-show="item.walletType == 13 || item.walletType == 14"
            >{{item.detailsAmount}}</div>
          </div>
          <div class="income1-value">
            <div class="income1-infomation">
              <div class="income1-list1">
                <div class="income1-list1-left">收益类型</div>
                <div
                  class="income1-list1-right"
                  v-show="item.walletType == 10 || item.walletType == 11"
                >收入</div>
                <div class="income1-list1-right" v-show="item.walletType == 12 || item.walletType == 4">收入</div>
                <div
                  class="income1-list1-righte"
                  v-show="item.walletType == 13 || item.walletType == 14"
                >支付</div>
              </div>
              <div class="income1-list1">
                <div class="income1-list1-left">交易类型</div>
                <div class="income1-list1-right" v-show="item.walletType == 10">养殖收益</div>
                <div class="income1-list1-right" v-show="item.walletType == 11">推广收益</div>
                <div class="income1-list1-right" v-show="item.walletType == 12">区域收益</div>
                <div class="income1-list1-right" v-show="item.walletType == 13">结算</div>
                <div class="income1-list1-right" v-show="item.walletType == 4">订单退款</div>
                <div class="income1-list1-right" v-show="item.walletType == 14">支付(购买)</div>
              </div>
              <div class="income1-list1">
                <div class="income1-list1-left">交易时间</div>
                <div class="income1-list1-right">{{item.createdDate}}</div>
              </div>
              <div class="income1-list1">
                <div class="income1-list1-left">订单编号</div>
                <div class="income1-list1-right">{{item.orderNum}}</div>
              </div>
              <!-- <div class="income1-list1">
									<div class="income1-list1-left">收获金蛋数量(个)</div>
									<div class="income1-list1-right">10</div>
              </div>-->
            </div>
          </div>
        </div>
      </div>

      <!-- 积分明细 -->
      <div class="income1-comtainer" v-if="title == '积分明细'">
        <div class="income1">
          <div class="income1-head">
            <div class="income1-name">收入金额</div>
            <div class="income1-number" v-if="item.walletType == 1">{{item.amount}}</div>
            <div class="income1-number-sub" v-if="item.walletType == 2">{{item.amount}}</div>
          </div>
          <div class="income1-value">
            <div class="income1-infomation">
              <div class="income1-list1">
                <div class="income1-list1-left">收益类型</div>
                <div class="income1-list1-right" v-if="item.walletType == 1">收入</div>
                <div class="income1-list1-right" v-if="item.walletType == 2">支出</div>
              </div>
              <div class="income1-list1">
                <div class="income1-list1-left">交易类型</div>
                <div class="income1-list1-right" v-if="item.walletType == 1">积分收益</div>
                <div class="income1-list1-right" v-if="item.walletType == 2">商品兑换</div>
              </div>
              <div class="income1-list1">
                <div class="income1-list1-left">交易时间</div>
                <div class="income1-list1-right">{{item.createdDate}}</div>
              </div>

              <div class="income1-list1">
                <div class="income1-list1-left">订单编号</div>
                <div class="income1-list1-right">{{item.orderNum}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 业绩明细 -->
      <div class="income1-comtainer" v-if="title == '业绩明细'">
        <div class="income1">
          <div class="income1-head">
            <div class="income1-name" v-show="item.incomeAmount">收入金额</div>
            <div class="income1-name" v-show="item.consumeAmount">支出金额</div>
            <div class="income1-number" v-show="item.incomeAmount">{{item.incomeAmount}}</div>
            <div class="income1-number-sub" v-show="item.consumeAmount">{{item.consumeAmount}}</div>
          </div>
          <div class="income1-value">
            <div class="income1-infomation">
              <div class="income1-list1">
                <div class="income1-list1-left">收益类型</div>
                <div class="income1-list1-right" v-show="item.incomeAmount">收入</div>
                <div class="income1-list1-right" v-show="item.consumeAmount">支出</div>
              </div>
              <div class="income1-list1">
                <div class="income1-list1-left">交易类型</div>
                <div class="income1-list1-right" v-show="item.incomeAmount">推广收益</div>
                <div class="income1-list1-right" v-show="item.consumeAmount">结算</div>
              </div>
              <div class="income1-list1">
                <div class="income1-list1-left">交易时间</div>
                <div class="income1-list1-right">{{item.createTime}}</div>
              </div>

              <div class="income1-list1">
                <div class="income1-list1-left">订单编号</div>
                <div class="income1-list1-right">{{item.orderNum}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 红包明细 -->
      <div class="income1-comtainer" v-if="title == '红包明细'">
        <div class="income1">
          <div class="income1-head">
            <div class="income1-name" v-show="item.walletType == 6">收入金额</div>
            <div class="income1-name" v-show="item.walletType == 3">支出金额</div>
            <div class="income1-number" v-show="item.walletType == 6">{{item.dAmount}}</div>
            <div class="income1-number-sub" v-show="item.walletType == 3">{{item.dAmount}}</div>
          </div>
          <div class="income1-value">
            <div class="income1-infomation">
              <div class="income1-list1">
                <div class="income1-list1-left">收益类型</div>
                <div class="income1-list1-right" v-show="item.walletType == 6">收入</div>
                <div class="income1-list1-right" v-show="item.walletType == 3">支付</div>
              </div>
              <div class="income1-list1">
                <div class="income1-list1-left">交易类型</div>
                <div class="income1-list1-right" v-show="item.walletType == 6">注册收益</div>
                <div class="income1-list1-right" v-show="item.walletType == 3">红包支付</div>
              </div>
              <div class="income1-list1">
                <div class="income1-list1-left">交易时间</div>
                <div class="income1-list1-right">{{item.creatTime}}</div>
              </div>

              <div class="income1-list1">
                <div class="income1-list1-left">订单编号</div>
                <div class="income1-list1-right">{{item.orderNum}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 返回顶部按钮 -->
    <div class="back-to-top" @click="backTop" v-show="showBackTop">
      <img src="../../../../img/index/home/bankToTop.png">
    </div>
  </div>
</template>

<script>
import { formatDate } from "../../../assets/js/data.js";
import { localName } from "@/common/local.js";
import { Toast } from "vant";
export default {
  components: {},
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  },
  data() {
    return {
      title: "", //头部标题
      list: [], //明细列表
      showInfo: false, //是否显示明细详情
      item: {}, //选中的数据
      showBackTop: false, //返回顶部按钮
      page: 1, // 当前页
      lock: false, // 加载锁
      totalPage: 1, // 总页数
    };
  },
  watch: {
    $route: function(to, from) {
      window.scrollTop = 0;
    }
  },
  created() {
    this.title = this.$route.query.name;
    this.gonext(this.$route.query.name);
  },
  beforeDestroy() {
    // 销毁监听事件
    // console.log('解除监听1');
    window.removeEventListener("scroll", this.handleScroll);
  },
   mounted() {
    // 监听滚动事件
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    // 根据页面进行内容分发
    gonext(name) {
      switch (name) {
        case "余额明细":
          this.getRemainderList();
          break;
        case "基金明细":
          this.getVentureList();
          break;
        case "积分明细":
          this.getPointList();
          break;
        case "提现明细":
          this.getCashList();
          break;
        case "业绩明细":
          this.getAchievementList();
          break;
        case "红包明细":
          this.getRedbagList();
          break;
      }
    },

     // 监听滚动事件
    handleScroll() {
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      // 获取滚动高度并判断是否显示返回顶部按钮
      // 获取页面高度
      const insexHight = this.$refs.indexPart.offsetHeight;
      // 获取屏幕高度
      const deviceHight = document.documentElement.clientHeight;
      if (scrollTop > deviceHight) {
        this.showBackTop = true;
      } else {
        this.showBackTop = false;
      }
      // 判断是否要启动触底事件
      const allHeight = scrollTop + deviceHight + 200;
      if (allHeight > insexHight) {
        // 触发触底事件
        // this.gonext();
      }
    },

    // 返回顶部
    backTop() {
      const scrollHight = document.documentElement.scrollTop;
      if (scrollHight > 50) {
        // document.documentElement.scrollTop = scrollHight - 40;
        window.scrollTo(0, scrollHight - 40)
        setTimeout(() => {
          this.backTop();
          // console.log('111');
        }, 10);
      } else {
        // document.documentElement.scrollTop = 0;
        window.scrollTo(0, 0)
      }
    },


    // 获取余额明细完成
    getRemainderList() {
      this.lock = true
      const config = {
        params: {
          page: this.page,
          rows: 20,
        }
      }
      this.$api
        .get(this.HOME + this.USER + "inside/showWalletDetails/1", config)
        .then(res => {
          this.list = res.data.data.items;
          this.totalPage = res.data.data.totalPage
          this.lock = false
        });
    },

    // 获取创业基金明细完成
    getVentureList() {
      this.$api
        .get(this.HOME + this.USER + "inside/showVentureWallet")
        .then(res => {
          this.list = res.data.data;
        });
    },

    // 获取积分明细完成
    getPointList() {
      this.$api
        .get(this.HOME + this.USER + "inside/integral/showIntegral")
        .then(res => {
          this.list = res.data.data;
        });
    },

    // 业绩明细完成
    getAchievementList() {
      this.$api
        .get(this.HOME + this.USER + "inside/performanceDetails")
        .then(res => {
          this.list = res.data.data;
        });
    },

    // 红包明细完成
    getRedbagList() {
      this.$api
        .get(this.HOME + this.USER + "inside/showWalletDetails/2")
        .then(res => {
          this.list = res.data.data;
        });
    },

    // 点中了某条收益列表
    clickItem(i) {
      this.item = i;
      this.showInfo = true;
      // this.$router.push({
      // 	path: '/Iteminfo?name=' + this.title
      // })
    }
  }
};
</script>
<style scoped lang='less'>
.fundinfo {
  width: 100%;
  background: #f2f2f2;
  position: absolute;
  // 头部
  .head {
    width: 100%;
    height: 4.7rem;
    background: #00ae87;
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    .bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      img {
        height: 100%;
        width: 100%;
      }
    }
    .head-title {
      height: 4.7rem;
      width: 100%;
      display: flex;
      justify-content: center;
      position: fixed;
      top: 0;
      left: 0;
      line-height: 4.7rem;
      .back {
        position: fixed;
        left: 1.5rem;
        top: 0;
        height: 1.6rem;
        width: 0.9rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .title {
        font-size: 1.8rem;
        color: #fff;
      }
    }
  }

  // 明细列表
  .income-comtainer {
    margin-top: 4.7rem;
    width: 100%;
    .income {
      width: 100%;
      padding: 0 1.5rem;
      .income-list {
        height: 6.8rem;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #ccc;
        .income-info {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .income-name {
            font-size: 1.6rem;
            color: #333;
          }
          .income-date {
            font-size: 1.1rem;
            color: #999;
          }
        }
        .income-value {
          .income-num {
            font-size: 1.8rem;
            color: #00ae87;
          }
          .income-num-sub {
            font-size: 1.8rem;
            color: #666;
          }
        }
      }
    }
  }

  //弹出详情
  .income1-comtainer {
    position: fixed;
    top: 4.7rem;
    left: 0;
    bottom: 0;
    right: 0;
    background: #f2f2f2;
    .income1 {
      height: 100%;
      width: 100%;
      padding: 0 1.5rem;
      display: flex;
      flex-direction: column;
      .income1-head {
        display: flex;
        justify-content: space-between;
        height: 7.8rem;
        align-items: center;
        border-bottom: 1px solid #ccc;
        .income1-name {
          font-size: 1.5rem;
          color: #999;
        }
        .income1-number {
          font-size: 2.5rem;
          color: #00ae87;
        }
        .income1-number-sub {
          font-size: 2.5rem;
          color: #666;
        }
      }
      .income1-value {
        width: 100%;
        padding: 1.5rem 0;
        border-bottom: 1px solid #ccc;
        .income1-infomation {
          width: 100%;
          .income1-list1 {
            display: flex;
            justify-content: space-between;
            height: 3rem;
            align-items: center;
          }
        }
      }
    }
  }
}

// 返回顶部样式
.back-to-top {
  position: fixed;
  right: 4rem;
  bottom: 6rem;
  height: 4.5rem;
  width: 4.5rem;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
