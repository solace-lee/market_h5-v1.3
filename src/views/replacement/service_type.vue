<template>
  <div id="service_type">
    <div class="head">
      <div class="site">
        <div @click="$router.go(-1)">
          <span style="width: 1rem;"></span>
          <van-icon name="arrow-left"/>
        </div>
      </div>
      <div class="title">
        <span>{{theme}}</span>
      </div>
    </div>

    <section style="margin-top:4rem;">
      <div class="commodity_list">
        <div class="order_information">
          <div class="order_information_left">
            <img style="width: 8rem;height: 8rem;" :src="type_list.imgUrl">
          </div>
          <div class="order_information_right">
            <div>{{type_list.name}}</div>
            <div>
              <span>单价:</span>
              <span>￥{{type_list.unitPrice}}</span>
              <span>数量:</span>
              <span>x{{type_list.quantity}}</span>
            </div>
          </div>
        </div>

        <!-- <div class="goods_number">
                    <div class="goods_number_left">申请数量</div>
                    <div class="goods_number_right">
                        <div style="float:right;position:relative;top:50%;margin-top:-16px;">
                            <el-input-number v-model="goods_count" @change="handleChangeCount" :min="1" :max="10" label="描述文字" size="small"></el-input-number>
                        </div>
                    </div>
        </div>-->
      </div>

      <div style="padding: 0rem 1.5rem;box-sizing:border-box;">
        <div class="return_exchange">
          <div class="return_goods" @click="goods_push(1)">
            <div class="return_goods_left">
              <div class="return_goods_top">
                <img src="../../../img/index/replacement/returnGoods.png">
                <span>退货</span>
              </div>
              <div class="return_goods_bottom">商品存在质量问题,需要退货</div>
            </div>
            <div class="return_goods_right">
              <i class="el-icon-arrow-right"></i>
            </div>
          </div>
          <div class="exchange_goods" @click="goods_push(2)">
            <div class="exchange_goods_left">
              <div class="exchange_goods_top">
                <img src="../../../img/index/replacement/exchangeGoods.png">
                <span>换货</span>
              </div>
              <div class="exchange_goods_bottom">已收到货,需要更换已收到的商品</div>
            </div>
            <div class="exchange_goods_right">
              <i class="el-icon-arrow-right"></i>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      theme: "售后申请服务",
      goods_count: 1,
      type_list: []
    };
  },
  created() {
    var body_s = document.getElementsByTagName("body")[0];
    body_s.style.background = "#f2f2f2";
    this.getJson();
    this.init();
  },
  methods: {
    init() {},
    // 获取页面数据
    getJson() {
      let json = {
        detailsId: this.$route.query.id
      };
      this.$api
        .post(
          this.HOME + this.USER + "inside/applyForRefund",
          JSON.stringify(json)
        )
        .then(res => {
          console.log("售后申请服务", res);
          this.type_list = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleChangeCount(value) {
      console.log(value);
    },
    goods_push(value) {
      if (value == 1) {
        this.$router.push({ path: "returnGoods?id=" + this.$route.query.id });
      } else if (value == 2) {
        this.$router.push({ path: "exchange?id=" + this.$route.query.id });
      }
    }
  }
};
</script>
<style lang="less" scoped>
#service_type {
  width: 100%;
  .mixin_crux() {
    font-size: 1.4rem;
    color: #333333;
    font-family: SourceHanSansCN-Regular;
  }
  .mixin_padding() {
    margin-top: 1.5rem;
    background: white;
    padding: 0rem 1.5rem;
    box-sizing: border-box;
    border-radius: 4px;
  }
  .head {
    width: 100%;
    height: 4rem;
    background-color: #ffffff;
    display: flex;
    position: fixed;
    top: 0px;
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

  .commodity_list {
    width: 100%;
    border-radius: 4px;
    height: 10.5rem;
    background: white;
    padding: 1.5rem 3rem 0rem 3rem;
    box-sizing: border-box;
    .order_information {
      width: 100%;
      height: 9rem;
      -border-bottom: 0.1rem solid #f2f2f2;
      .order_information_left {
        float: left;
        width: 8rem;
        height: 8rem;
      }
      .order_information_right {
        float: left;
        width: 23.5rem;
        height: 8rem;
        padding-left: 1rem;
        box-sizing: border-box;
        div:nth-of-type(1) {
          height: 4.16rem;
          font-size: 1.4rem;
          /*超过两行省略号*/
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
          line-height: 2.5rem;
          font-size: 1.2rem;
          color: #666666;
          span:nth-of-type(1) {
          }
          span:nth-of-type(2) {
            margin-left: 1rem;
          }
          span:nth-of-type(3) {
            margin-left: 1.5rem;
          }
          span:nth-of-type(4) {
            margin-left: 1rem;
          }
        }
      }
    }
    .goods_number {
      width: 100%;
      height: 5.5rem;
      background: white;
      .goods_number_left {
        width: 30%;
        height: 5.5rem;
        float: left;
        line-height: 5.5rem;
        .mixin_crux();
      }
      .goods_number_right {
        width: 70%;
        height: 5.5rem;
        float: right;
      }
    }
  }

  .return_exchange {
    width: 34.5rem;
    height: 14rem;
    .mixin_padding();
    .return_goods {
      width: 100%;
      height: 7rem;
      border-bottom: 0.1rem solid #f2f2f2;
      .return_goods_left {
        width: 85%;
        height: 7rem;
        float: left;
        .return_goods_top {
          width: 100%;
          height: 3.5rem;
          position: relative;
          img {
            width: 1.6rem;
            height: 1.6rem;
            display: inline-block;
            position: absolute;
            top: 50%;
            left: 0rem;
            margin-top: -0.7rem;
          }
          span {
            color: #333333;
            font-size: 1.4rem;
            display: inline-block;
            position: absolute;
            top: 50%;
            left: 2.6rem;
            margin-top: -0.8rem;
          }
        }
        .return_goods_bottom {
          width: 100%;
          height: 3.5rem;
          font-size: 1.1rem;
          color: #999999;
          text-indent: 3rem;
          line-height: 3.5rem;
        }
      }
      .return_goods_right {
        width: 15%;
        height: 7rem;
        float: right;
        position: relative;
        i {
          position: absolute;
          top: 50%;
          margin-top: -0.7rem;
          right: 0rem;
        }
      }
    }
    .exchange_goods {
      width: 100%;
      height: 7rem;
      .exchange_goods_left {
        width: 85%;
        height: 7rem;
        float: left;
        .exchange_goods_top {
          width: 100%;
          height: 3.5rem;
          position: relative;
          img {
            width: 1.6rem;
            height: 1.6rem;
            display: inline-block;
            position: absolute;
            top: 50%;
            left: 0rem;
            margin-top: -0.7rem;
          }
          span {
            color: #333333;
            font-size: 1.4rem;
            display: inline-block;
            position: absolute;
            top: 50%;
            left: 2.6rem;
            margin-top: -0.8rem;
          }
        }
        .exchange_goods_bottom {
          width: 100%;
          height: 3.5rem;
          line-height: 3.5rem;
          font-size: 1.1rem;
          color: #999999;
          text-indent: 3rem;
        }
      }
      .exchange_goods_right {
        width: 15%;
        height: 7rem;
        float: right;
        position: relative;
        i {
          position: absolute;
          top: 50%;
          margin-top: -0.7rem;
          right: 0rem;
        }
      }
    }
  }
}
</style>