<template>
  <div id="change" ref="indexPart">
    <div class="head">
      <div class="head-title">
        <div class="site">
          <div @click="$router.replace({path:'/user'})">
            <span style="width: 1rem;"></span>
            <van-icon name="arrow-left"/>
          </div>
        </div>
        <div class="title">
          <span>{{theme}}</span>
        </div>
      </div>
      <div style="width:100%;">
        <mt-navbar v-model="selected">
          <mt-tab-item id="1">
            <div style="font-size: 1.5rem;">售后申请</div>
          </mt-tab-item>
          <mt-tab-item id="2">
            <div style="font-size: 1.5rem">处理中</div>
          </mt-tab-item>
          <mt-tab-item id="3">
            <div style="font-size: 1.5rem">申请记录</div>
          </mt-tab-item>
        </mt-navbar>
      </div>
    </div>

    <section>
      <div style="margin-top:9.6rem;">
        <mt-tab-container v-model="selected">
          <mt-tab-container-item id="1">
            <section style="height: 100%;padding: 0rem 1.5rem 1.5rem 1.5rem;">
              <div class="commodity_list_apply" v-for="(item,index) in afterSale" :key="index">
                <div class="order_number_apply">
                  <img src="../../../img/index/replacement/shop.png">
                  <span>{{item.shopName}}</span>
                </div>

                <div class="order_information_apply">
                  <div class="order_information_left_apply">
                    <img style="width: 8rem;height: 8rem;" :src="item.imgUrl">
                  </div>
                  <div class="order_information_right_apply">
                    <div>{{item.name}}</div>
                    <div>
                      <span>{{item.specificationName}}</span>
                      <span>x{{item.quantity}}&nbsp;&nbsp;￥{{item.unitPrice}}</span>
                    </div>
                  </div>
                </div>
                <div class="order_btn_apply">
                  <!-- <div class="order_btn_apply_left">
                        <img src="../../../img/index/replacement/warning.png" />
                        <span>该商品已超过售后期</span>
                  </div>-->
                  <div class="order_btn_apply_right">
                    <button @click.stop="applyAfterSale(item.detailsId)">申请售后</button>
                  </div>
                </div>
              </div>
            </section>
          </mt-tab-container-item>

          <mt-tab-container-item id="2">
            <section style="height: 100%;padding: 0rem 1.5rem 1.5rem 1.5rem;">
              <div class="commodity_list" v-for="(item,index) in processing" :key="index">
                <div class="order_number">
                  <span>
                    订单编号{{item.orderNum}}
                    <i style="margin-left: 1rem;" class="el-icon-arrow-right"></i>
                  </span>
                  <span v-if="item.refundType==1">退货</span>
                  <span v-if="item.refundType==2">换货</span>
                </div>
                <div class="order-else" @click.stop="details_push(item)">
                  <div class="order_information">
                    <div class="order_information_left">
                      <img style="width: 8rem;height: 8rem;" :src="item.imgUrl">
                    </div>
                    <div class="order_information_right">
                      <div>{{item.name}}</div>
                      <div>
                        <span>{{item.specificationName}}</span>
                        <span>x{{item.quantity}}&nbsp;&nbsp;￥{{item.unitPrice}}</span>
                      </div>
                    </div>
                  </div>
                  <div class="to_examine" v-if="item.refundStatus==0">
                    <div class="order-info">
                      <span>审核中</span>
                      <span>你的服务单已申请成功，待审核中</span>
                      <span>
                        <i class="el-icon-arrow-right"></i>
                      </span>
                    </div>
                  </div>
                  <!-- <div class="to_examine" v-if="item.refundStatus==3">
                    <span>已拒绝</span>
                    <span>你的服务单因商品有损坏已被拒绝</span>
                    <span>
                      <i class="el-icon-arrow-right"></i>
                    </span>
                  </div>-->
                  <div class="to_examine" v-if="item.refundStatus==5">
                    <div class="order-info">
                      <span>待收货</span>
                      <span>卖家已发货,请尽快确认收货</span>
                      <span>
                        <i class="el-icon-arrow-right"></i>
                      </span>
                    </div>
                  </div>
                  <div class="to_examine" v-if="item.refundStatus==2">
                    <div class="order-info">
                      <span>已发货</span>
                      <span>买家已发货</span>
                      <span>
                        <i class="el-icon-arrow-right"></i>
                      </span>
                    </div>
                  </div>
                  <div class="to_examine" v-if="item.refundStatus==4">
                    <div class="order-info">
                      <span>已审核</span>
                      <span>待买家发货</span>
                      <span>
                        <i class="el-icon-arrow-right"></i>
                      </span>
                    </div>
                  </div>
                  <div class="to_examine" v-if="item.refundStatus==8">
                    <div class="order-info">
                      <span>申诉中</span>
                      <span>已收到您的申诉要求</span>
                      <span>
                        <i class="el-icon-arrow-right"></i>
                      </span>
                    </div>
                  </div>
                  <div class="to_examine" v-if="item.refundStatus==9">
                    <div class="order-info">
                      <span>已收货</span>
                      <span>卖家已收货,就发货了</span>
                      <span>
                        <i class="el-icon-arrow-right"></i>
                      </span>
                    </div>
                  </div>
                  <div class="order_btn">
                    <button
                      v-if="item.refundStatus==0"
                      @click.stop="operation(1,item.id,item.refundStatus)"
                    >取消申请</button>
                    <button v-if="item.refundStatus==3" @click.stop="operation(2)">申述</button>
                    <button
                      v-if="item.refundStatus==5"
                      @click.stop="operation(3,item.id,item.refundStatus)"
                    >确认收货</button>
                    <button v-if="item.refundStatus==8">已申诉</button>
                  </div>
                </div>
              </div>
            </section>
          </mt-tab-container-item>

          <mt-tab-container-item id="3">
            <section style="height: 100%;padding: 0rem 1.5rem 1.5rem 1.5rem;">
              <div class="commodity_list" v-for="(item,index) in applyRecord" :key="index">
                <div class="order_number">
                  <span>
                    订单编号{{item.orderNum}}
                    <i style="margin-left: 1rem;" class="el-icon-arrow-right"></i>
                  </span>
                  <span v-if="item.refundType==1">退货</span>
                  <span v-if="item.refundType==2">换货</span>
                </div>
                <div class="order-else">
                  <div class="order_information" @click="details_push(item)">
                    <div class="order_information_left">
                      <img style="width: 8rem;height: 8rem;" :src="item.imgUrl">
                    </div>
                    <div class="order_information_right">
                      <div>{{item.name}}</div>
                      <div>
                        <span>{{item.specificationName}}</span>
                        <span>x{{item.quantity}}&nbsp;&nbsp;￥{{item.unitPrice}}</span>
                      </div>
                    </div>
                  </div>
                  <div class="to_examine" v-if="item.refundStatus==7">
                    <div class="order-info">
                      <span>已取消</span>
                      <span>服务已取消,如有需要可重新提交服务单</span>
                      <span>
                        <i class="el-icon-arrow-right"></i>
                      </span>
                    </div>
                    <div class="applyAgain">
                      <!-- <div @click.stop="applyAfterSale(item.detailsId)">重新申请售后</div> -->
                    </div>
                  </div>
                  <div class="to_examine" v-if="item.refundStatus==1">
                    <div class="order-info">
                      <span>已完成</span>
                      <span>退货服务已完成</span>
                      <span>
                        <i class="el-icon-arrow-right"></i>
                      </span>
                    </div>
                  </div>
                  <div class="to_examine" v-if="item.refundStatus==6">
                    <div class="order-info">
                      <span>已完成</span>
                      <span>换货服务已完成</span>
                      <span>
                        <i class="el-icon-arrow-right"></i>
                      </span>
                    </div>
                  </div>
                  <div class="to_examine" v-if="item.refundStatus==10">
                    <div class="order-info">
                      <span>申诉已处理</span>
                      <span>您的申诉已处理完成</span>
                      <span>
                        <i class="el-icon-arrow-right"></i>
                      </span>
                    </div>
                  </div>
                  <div class="to_examine" v-if="item.refundStatus==3">
                    <div class="order-info">
                      <span>已拒绝</span>
                      <span>有需要请申述处理</span>
                      <span>
                        <i class="el-icon-arrow-right"></i>
                      </span>
                    </div>
                    <div class="applyAgain">
                      <div @click.stop="representations(item)">申述</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
      <v-baseline style="margin-bottom: 1rem;"></v-baseline>
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
import Baseline from "@/common/_baseline.vue";
export default {
  components: {
    "v-baseline": Baseline
  },
  data() {
    return {
      theme: "",
      selected: "1",
      afterSale: [],
      processing: [],
      applyRecord: [],
      resultNull: false, //没有订单时显示
      page: 1, //猜你喜欢当前页码
      lock: false, // 加载更多锁
      showBackTop: false, //返回顶部按钮
      totalPage: 0 // 总页数
    };
  },

  beforeDestroy() {
    // 销毁监听事件
    // console.log('解除监听1');
    window.removeEventListener("scroll", this.handleScroll);
  },

  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    this.theme = "售后申请";
    this.selected = window.sessionStorage.getItem("indexStatus") || 1;
    var body_s = document.getElementsByTagName("body")[0];
    body_s.style.background = "#f2f2f2";
    if (this.selected == 1) {
        this.theme = "售后申请";
        this.getAfterSale();
      } else if (this.selected == 2) {
        this.theme = "处理中";
        this.getProcessing();
      } else if (this.selected == 3) {
        this.theme = "申请记录";
        this.getRecord();
      }
  },
  watch: {
    selected(current, old) {
      document.documentElement.scrollTop = 0;
      this.page = 1;
      this.lock = false;
      window.sessionStorage.setItem("indexStatus", current);
      if (current == 1) {
        this.theme = "售后申请";
        this.getAfterSale();
      } else if (current == 2) {
        this.theme = "处理中";
        this.getProcessing();
      } else if (current == 3) {
        this.theme = "申请记录";
        this.getRecord();
      }
    }
  },
  methods: {
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
      let url = "";
      if (this.selected == 1) {
        url = "inside/selectUserOrderRefund";
      } else if (this.selected == 2) {
        url = "inside/selectInHandRefund";
      } else if (this.selected == 3) {
        url = "inside/refundRecord";
      }
      if (this.lock) {
        return;
      } else {
        this.lock = true;
        this.page = ++this.page;
        const config = {
          params: {
            page: this.page
          }
        };
        this.$api
          .get(this.HOME + this.USER + url, config)
          .then(res => {
            this.totalPage = res.data.data.totalPage;
            let arr = res.data.data.items;
            if (this.page > this.totalPage) {
              // Toast("已经到底啦！");
              this.page = --this.page;
              // this.lock = false;
            } else if (this.selected == 1) {
              this.afterSale = [...this.afterSale, ...arr];
              this.lock = false;
            } else if (this.selected == 2) {
              this.processing = [...this.processing, ...arr];
              this.lock = false;
            } else if (this.selected == 3) {
              this.applyRecord = [...this.applyRecord, ...arr];
              this.lock = false;
            }
            // console.log(arr);
          })
          .catch(err => {
            console.log(err);
            this.lock = false;
          });
      }
    },

    //售后申请
    getAfterSale() {
      const json = { detailsId: 2 };
      this.$api
        .get(this.HOME + this.USER + "inside/selectUserOrderRefund", json)
        .then(res => {
          // console.log("售后申请", res);
          this.afterSale = res.data.data.items;
          if (this.afterSale.length == 0) {
            this.resultNull = true;
          } else {
            this.resultNull = false;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //处理中
    getProcessing() {
      var json = {};
      this.$api
        .get(this.HOME + this.USER + "inside/selectInHandRefund", json)
        .then(res => {
          // console.log("处理中", res);
          this.processing = res.data.data.items;
          if (this.processing.length == 0) {
            this.resultNull = true;
          } else {
            this.resultNull = false;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //申请记录
    getRecord() {
      var json = {};
      this.$api
        .get(this.HOME + this.USER + "inside/refundRecord", json)
        .then(res => {
          // console.log("申请记录", res);
          this.applyRecord = res.data.data.items;
          if (this.applyRecord.length == 0) {
            this.resultNull = true;
          } else {
            this.resultNull = false;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    //申述
    representations(info) {
      const i = JSON.stringify(info);
      window.sessionStorage.setItem("representationInfo", i);
      this.$router.push({
        path: "/representations"
      });
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
    },

    // 去订单详情
    details_push(res) {
      const i = JSON.stringify(res);
      window.sessionStorage.setItem("representationInfo", i);
      this.$router.push({
        path: "returnDetails?id=" + res.id + "&status=" + res.refundStatus
      });
    },
    applyAfterSale(res) {
      this.$router.push({ path: "/serviceType?id=" + res });
    },
    operation(res, resId, resStatus) {
      if (res == 1) {
        MessageBox.confirm("确定取消申请吗?").then(action => {
          var json = { id: resId, refundStatus: 7 };
          this.$api
            .post(this.HOME + this.USER + "inside/updateRefundType", json)
            .then(res => {
              this.$message.success("取消成功");
              this.getProcessing();
            })
            .catch(err => {
              console.log(err);
            });
        });
      } else if (res == 2) {
      } else if (res == 3) {
        MessageBox.confirm("确定已收货吗?").then(action => {
          var json = { id: resId, refundStatus: 6 };
          this.$api
            .post(this.HOME + this.USER + "inside/updateRefundType", json)
            .then(res => {
              this.$message.success("已收货");
              this.getProcessing();
            })
            .catch(err => {
              console.log(err);
            });
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
#change {
  width: 100%;
  .mixin_list() {
    padding: 0px 1.5rem;
    box-sizing: border-box;
    background: white;
    border-radius: 0.4rem;
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
    border-bottom: 1px solid #f2f2f2;
    font-size: 1.5rem;
    .site {
      width: 4rem;
      height: 4.7rem;
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

  .commodity_list_apply {
    width: 100%;
    margin-top: 1.5rem;
    padding: 0 1.5rem;
    background: #fff;
    .order_number_apply {
      width: 100%;
      height: 3.75rem;
      line-height: 3.75rem;
      border-bottom: 1px solid #f6f6f6;
      position: relative;
      img {
        width: 1.6rem;
        height: 1.6rem;
        -vertical-align: middle;
        display: inline-block;
        position: absolute;
        top: 50%;
        left: 0rem;
        margin-top: -0.8rem;
      }
      span {
        height: 1.6rem;
        line-height: 1.6rem;
        font-size: 1.4rem;
        display: inline-block;
        position: absolute;
        top: 50%;
        left: 2.6rem;
        margin-top: -0.8rem;
      }
    }
    .order_information_apply {
      width: 100%;
      height: 9rem;
      margin-top: 1.5rem;
      display: flex;
      .order_information_left_apply {
        width: 8rem;
        height: 8rem;
      }
      .order_information_right_apply {
        width: 100%;
        height: 8rem;
        padding-left: 1rem;
        div:nth-of-type(1) {
          height: 4.16rem;
          font-size: 1.4rem;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          /*! autoprefixer: off */
          -webkit-box-orient: vertical;
          /*! autoprefixer: on */
        }
        div:nth-of-type(2) {
          height: 2.5rem;
          font-size: 1.2rem;
          color: #666666;
          display: flex;
          justify-content: space-between;
        }
      }
    }
    .order_btn_apply {
      width: 100%;
      padding-top: 1rem;
      box-sizing: border-box;
      display: flex;
      justify-content: flex-end;
      .order_btn_apply_left {
        img {
          width: 1.2rem;
          height: 1.2rem;
          display: inline-block;
          position: absolute;
          top: 50%;
          left: 0rem;
          margin-top: -0.5rem;
        }
        span {
          color: #999999;
          font-size: 1.2rem;
          display: inline-block;
          position: absolute;
          top: 50%;
          left: 2.2rem;
          margin-top: -0.6rem;
        }
      }
      .order_btn_apply_right {
        margin-bottom: 1rem;
        button {
          float: right;
          height: 2.5rem;
          background: white;
          border-radius: 1.5rem;
          line-height: 2.5rem;
          padding: 0rem 0.8rem;
          box-sizing: border-box;
          border: 1px solid #dddddd;
          font-size: 1.3rem;
        }
      }
    }
  }

  .commodity_list {
    width: 100%;
    margin-top: 1.5rem;
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: 6px;
    padding: 0 1.5rem;
    .order_number {
      width: 100%;
      height: 3.75rem;
      line-height: 3.75rem;
      border-bottom: 1px solid #f6f6f6;
      display: flex;
      justify-content: space-between;
      span:nth-of-type(1) {
        font-size: 1.4rem;
        color: #999999;
      }
      span:nth-of-type(2) {
        margin-right: 1rem;
        font-size: 1.4rem;
        color: #00ae87;
      }
    }
    .order-else {
      display: flex;
      flex-direction: column;
      .order_information {
        width: 100%;
        height: 9rem;
        margin-top: 1.5rem;
        display: flex;
        .order_information_left {
          width: 8rem;
          height: 8rem;
        }
        .order_information_right {
          width: 100%;
          height: 8rem;
          padding-left: 1rem;
          box-sizing: border-box;
          div:nth-of-type(1) {
            // height: 4.16rem;
            font-size: 1.4rem;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            /*! autoprefixer: off */
            -webkit-box-orient: vertical;
            /*! autoprefixer: on */
          }
          div:nth-of-type(2) {
            margin-top: 1rem;
            height: 2.5rem;
            font-size: 1.2rem;
            color: #666666;
            display: flex;
            justify-content: space-between;
          }
        }
      }
      .to_examine {
        width: 100%;
        display: flex;
        flex-direction: column;
        .order-info {
          width: 100%;
          background: #f2f2f2;
          display: flex;
          flex-direction: row;
          // justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          span:nth-of-type(1) {
            flex: 3;
            line-height: 4.5rem;
            font-size: 1.3rem;
            text-align: center;
          }
          span:nth-of-type(2) {
            flex: 8;
            font-size: 1.2rem;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            /*! autoprefixer: off */
            -webkit-box-orient: vertical;
            /*! autoprefixer: on */
          }
          span:nth-of-type(3) {
            flex: 1;
            i {
              font-size: 1.4rem;
              // margin-left: 0.6rem;
              text-align: center;
            }
          }
        }
        .applyAgain {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 1rem;
        }
      }
    }
    .order_btn {
      width: 100%;
      height: 3rem;
      // padding: 1.5rem 0rem;
      margin-bottom: 1rem;
      display: flex;
      justify-content: flex-end;
      button {
        height: 2.4rem;
        background: white;
        border-radius: 1.2rem;
        line-height: 2.4rem;
        padding: 0rem 0.8rem;
        box-sizing: border-box;
        border: 1px solid #dddddd;
        font-size: 1.3rem;
      }
    }
  }
}

.applyAgain {
  display: flex;
  width: 100%;
  justify-content: flex-end;
  div {
    margin-top: 0.6rem;
    padding: 0.2rem 1rem;
    border: 1px solid #999;
    border-radius: 1.2rem;
  }
}

#change .mint-navbar .mint-tab-item.is-selected {
  color: #00ae87;
  border-bottom: 3px solid #00ae87;
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