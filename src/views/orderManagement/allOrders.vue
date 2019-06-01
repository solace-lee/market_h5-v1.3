<template>
  <div id="allOrders" ref="indexPart">
    <div class="head">
      <div class="head-title">
        <div class="site">
          <div @click="goback">
            <span style="width: 1rem;"></span>
            <van-icon name="arrow-left"/>
          </div>
        </div>
        <div class="title">
          <span>我的订单</span>
        </div>
      </div>
      <div class="bar-area" style="margin-top: 4.7rem;">
        <mt-navbar v-model="selected">
          <mt-tab-item id="0">
            <div style="font-size: 1.5rem;">全部</div>
          </mt-tab-item>
          <mt-tab-item id="1">
            <div style="font-size: 1.5rem">待付款</div>
          </mt-tab-item>
          <mt-tab-item id="2">
            <div style="font-size: 1.5rem">待发货</div>
          </mt-tab-item>
          <mt-tab-item id="3">
            <div style="font-size: 1.5rem">待收货</div>
          </mt-tab-item>
          <mt-tab-item id="4">
            <div style="font-size: 1.5rem">待评价</div>
          </mt-tab-item>
        </mt-navbar>
      </div>
    </div>

    <section>
      <!-- 内容区 -->
      <mt-tab-container>
        <mt-tab-container-item>
          <section class="order_decorate">
            <v-all :all_orders_list="all_orders_list" v-on:getjson="getJson"></v-all>
            <!-- 所有订单 -->
          </section>
        </mt-tab-container-item>
      </mt-tab-container>
    </section>

    <div class="not-result" v-if="resultNull">
      <div class="noresult-img">
        <img src="../../../img/index/search/logo.png">
      </div>
      <div class="noresult-txt">亲~还没有相关订单</div>
    </div>

    <!-- 返回顶部按钮 -->
    <div class="back-to-top" @click="backTop" v-show="showBackTop">
      <img src="../../../img/index/home/bankToTop.png">
    </div>
  </div>
</template>

<script>
import { MessageBox } from "mint-ui";
import { Toast } from "vant";
import ALL from "./pages/all.vue";
export default {
  components: {
    "v-all": ALL
  },
  data() {
    return {
      selected: null,
      num: 0,
      all_orders_list: [],
      page: 1, //猜你喜欢当前页码
      lock: false, // 加载更多锁
      showBackTop: false, //返回顶部按钮
      totalPage: 0, // 总页数
      resultNull: false, //没有订单时显示
      status: null, //备用订单状态
      rows: 10 // 每页条数
    };
  },

  beforeDestroy() {
    // 销毁监听事件
    // console.log('解除监听1');
    window.removeEventListener("scroll", this.handleScroll);
  },

  mounted() {
    // 监听滚动事件
    window.addEventListener("scroll", this.handleScroll);
    const body_s = document.getElementsByTagName("body")[0];
    body_s.style.background = "#f2f2f2";
    const index = this.$route.query.status;
    if (!index) {
      this.selected = window.sessionStorage.getItem("allOrderStatus");
      window.sessionStorage.removeItem("allOrderStatus");
    } else {
      this.selected = this.$route.query.status;
    }
  },
  watch: {
    selected(current, old) {
      document.documentElement.scrollTop = 0;
      window.sessionStorage.setItem("allOrderStatus", current);
      if (current==2) {
        this.status = 7
      } else {
        this.status = null
      }
      this.num = current;
      if (this.num==0) {
        this.num = null
      }
      this.lock = false;
      this.page = 1;
      this.lock = false;
      this.getJson();
    }
  },
  methods: {
    goback() {
      this.$router.replace({
        path: "/user"
      });
    },

    // 监听滚动事件
    handleScroll() {
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      // 获取滚动高度并判断是否显示返回顶部按钮
      if (scrollTop > 800) {
        this.showBackTop = true;
      } else {
        this.showBackTop = false;
      }
      // 获取页面高度
      const insexHight = this.$refs.indexPart.offsetHeight;
      // 获取屏幕高度
      const deviceHight = document.documentElement.clientHeight;
      // 判断是否要启动触底事件
      const allHeight = scrollTop + deviceHight + 200;
      if (allHeight > insexHight) {
        // 触发触底事件
        this.getMoreYouLike();
      }
    },

    //加载更多事件
    getMoreYouLike() {
      if (this.lock) {
        return;
      } else {
        this.lock = true;
        this.page = ++this.page;
        const config = {};
        config.orderStatus = this.num;
        config.status = this.status
        config.page = this.page;
        config.rows = this.rows
        this.$api
          .post(this.HOME + this.USER + "inside/showUserOrder", config)
          .then(res => {
            this.totalPage = res.data.data.totalPage;
            const arr = res.data.data.items;
            if (this.page > this.totalPage) {
              this.page = --this.page;
              // this.lock = false;
            } else {
              this.all_orders_list = [...this.all_orders_list, ...arr];
              this.lock = false;
            }
          })
          .catch(err => {
            console.log(err);
            this.lock = false;
          });
      }
    },

    //加载数据
    getJson() {
      const json = { 
        orderStatus: this.num,
        status: this.status,
        rows: 10
      };
      this.$api
        .post(this.HOME + this.USER + "inside/showUserOrder", json)
        .then(res => {
          this.all_orders_list = res.data.data.items || [];
          if (this.all_orders_list.length == 0) {
            this.resultNull = true;
          } else {
            this.resultNull = false;
          }
        })
        .catch(err => {});
    },
    // 返回顶部
    backTop() {
      const scrollHight = document.documentElement.scrollTop;
      if (scrollHight > 50) {
        // document.documentElement.scrollTop = scrollHight - 40;
        window.scrollTo(0, scrollHight - 40)
        setTimeout(() => {
          this.backTop();
        }, 10);
      } else {
        // document.documentElement.scrollTop = 0;
        window.scrollTo(0, 0)
      }
    }
  }
};
</script>
<style lang="less" scoped>
#allOrders {
  width: 100%;
  .mixin_list() {
    padding: 0px 1.5rem;
    box-sizing: border-box;
    background: white;
    border-radius: 0.4rem;
  }
  .order_decorate {
    height: 100%;
    padding: 0rem 1.5rem 1.5rem 1.5rem;
    box-sizing: border-box;
  }
  .head {
    width: 100%;
    height: 9.6rem;
    position: fixed;
    top: 0;
    z-index: 100;
  }
  .head-title {
    width: 100%;
    height: 4.7rem;
    background-color: #ffffff;
    display: flex;
    position: fixed;
    top: 0rem;
    z-index: 100;
    border-bottom: 1px solid #f2f2f2;
    font-size: 1.5rem;
    .site {
      width: 4rem;
      height: 100%;
      display: flex;
      position: absolute;
      color: #000;
      div {
        display: flex;
        justify-content: center;
        align-items: center;
        .van-icon-location {
          vertical-align: middle;
        }
        span {
          font-size: 1rem;
        }
      }
    }

    .title {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      span {
        color: #000;
        margin-right: 0.5rem;
      }
    }
  }

  .to_top {
    position: fixed;
    right: 4rem;
    bottom: 6rem;
    height: 3.6rem;
    width: 3.6rem;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .mint-navbar .mint-tab-item.is-selected {
    text-decoration: none;
    border-bottom: 3px solid #00ae87;
    color: #00ae87;
    margin-bottom: -3px;
  }

  section {
    margin-top: 5.2rem;
  }

  // 没有搜索结果展示区
  .not-result {
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    font-size: 1.4rem;
    color: #666;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .noresult-img {
      width: 15.4rem;
      height: 6.1rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .noresult-txt {
      font-size: 1.4rem;
      color: #999;
    }
  }

  // 返回顶部样式
  .back-to-top {
    position: fixed;
    right: 4rem;
    bottom: 6rem;
    height: 3.6rem;
    width: 3.6rem;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>