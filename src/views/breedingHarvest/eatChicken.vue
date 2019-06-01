<template>
  <div id="service_type">
    <div class="head">
      <div class="site">
        <div @click="$router.replace({path: '/breedingHarvest'})">
          <span style="width: 1rem;"></span>
          <van-icon name="arrow-left"/>
        </div>
      </div>
      <div class="title">
        <span>{{theme}}</span>
      </div>
    </div>
    <div class="submission_info" @click="chicken_submit">提交</div>
    <section style="margin-top:5.5rem;">
      <div class="order_decorate">
        <div class="eating_chicken">
          <div class="eating_chicken_left">我要吃鸡</div>
          <div class="eating_chicken_right">
            <div class="chicken_significant">{{info}}</div>
            <div class="chicken_price">
              <span>单价:</span>
              <span>￥55.00</span>
              <span style="margin-left: 1.5rem;">数量:</span>
              <span>{{value}}</span>
            </div>
          </div>
        </div>

        <div class="goods_number">
          <div class="goods_number_left">吃鸡数量</div>
          <div class="goods_number_right">
            <div style="position:absolute;top:50%;right: 0rem;margin-top:-16px;">
              <el-input-number
                v-model="goods_count"
                @change="handleChangeCount"
                :min="2"
                :max="value"
                label="描述文字"
                size="small"
              ></el-input-number>
            </div>
          </div>
        </div>

        <div class="receiving_address">
          <div class="receiving_address_left">收货地址</div>
          <div class="receiving_address_right" @click="goChooseAddress">
            <div class="receiving_address_name">
              <span style="float: left;">{{address_list.contact}}</span>
              <span style="float: right;margin-right: 3rem;">{{address_list.phone}}</span>
            </div>
            <div class="address_info">{{address_list.provinceName}}{{address_list.cityName}}{{address_list.districtName}}{{address_list.detailAddress}}</div>
          </div>
          <div class="receiving_address_icon">
            <i
              style="position:absolute;top:50%;right:0rem;margin-top:-0.7rem;"
              class="el-icon-arrow-right"
            ></i>
          </div>
        </div>

        <div class="leaving_message">
          <div class="leaving_message_title">亲~留个言吧</div>
          <div class="message_content">
            <el-input
              type="textarea"
              :rows="5"
              placeholder="亲们，请发表你们意见吧，请输入不超过200字的评论吧。"
              v-model="textarea"
            ></el-input>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      theme: "吃鸡",
      goods_count: 1,
      address_list: {},
      textarea: "",
      value: 0,
      info: "" //商铺信息
    };
  },
  created() {
    var body_s = document.getElementsByTagName("body")[0];
    body_s.style.background = "#f2f2f2";
    this.getAddress();
    this.getData();
  },
  methods: {
    handleChangeCount(value) {
      console.log(value);
    },
    // 获取吃鸡数量
    getData() {
      // 查询鸡数
      this.$api
        .get(this.HOME + this.USER + "fund/getGoldenEggs")
        .then(res => {
          this.value = res.data.data.data;
          // console.log(res);
        });
      // 查询商品信息
      this.$api
        .get(this.HOME + this.ORDER + "inside/selectEggsOrder")
        .then(res => {
          this.info = res.data.data.name;
          // console.log(res);
        });
    },
    //收货地址
    getAddress() {
      let obj = window.sessionStorage.getItem("address") || false;
      if (obj) {
        const i = JSON.parse(obj);
        this.address_list = i;
        console.log(i);

        window.sessionStorage.removeItem("address");
      } else {
        this.$api
          .get(this.HOME + this.ORDER + "inside/address/getAddressByuserId")
          .then(res => {
            // console.log("换货地址", res);
            this.address_list = res.data.data;
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    // 选择换货地址
    goChooseAddress() {
      this.$router.replace({
        path: "/shipping?name=选择吃鸡地址"
      });
    },

    //确定吃鸡
    chicken_submit() {
      if (this.value == 0) {
        Toast("数量不足");
      } else if (this.value < 2) {
        Toast("最少吃鸡数量2只");
      } else {
        const config = {
          leaveMsg: this.textarea,
          addressId: this.address_list.addressId
        };
        this.$api
          .post(
            this.HOME +
              this.ORDER +
              "inside/goldenEggsOrder/" +
              this.goods_count,
            config
          )
          .then(res => {
            if (res.data.status == 200) {
              Toast("吃鸡成功");
              this.$router.replace({
                path: "/breedingHarvest"
              });
            } else {
              Toast("吃鸡失败请重试");
            }
          });
      }
    }
  }
};
</script>
<style lang="less" scoped>
#service_type {
  width: 100%;
  .order_decorate {
    height: 100%;
    padding: 0rem 1.5rem 1.5rem 1.5rem;
    box-sizing: border-box;
  }
  .mixin_crux() {
    font-size: 1.4rem;
    color: #333333;
    font-family: SourceHanSansCN-Normal;
  }
  .mixin_padding() {
    margin-top: 1.5rem;
    background: white;
    padding: 1rem 1.5rem 0rem 1.5rem;
    box-sizing: border-box;
    border-radius: 4px;
  }
  .submission_info {
    width: 100%;
    height: 4.4rem;
    text-align: center;
    line-height: 4.4rem;
    margin-top: 1.5rem;
    background: white;
    position: fixed;
    bottom: 0;
    background: #0bb794;
    color: white;
    z-index: 99999;
    font-size: 1.5rem;
  }

  .head {
    width: 100%;
    height: 4.7rem;
    background-color: #00ae87;
    display: flex;
    position: fixed;
    top: 0px;
    z-index: 100;
    border-bottom: 1px solid #f2f2f2;
    font-size: 1.5rem;
    .site {
      width: 4.7rem;
      height: 100%;
      display: flex;
      position: absolute;
      color: #ffffff;
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
        color: #ffffff;
        margin-right: 0.5rem;
      }
    }
  }

  .eating_chicken {
    width: 100%;
    height: 11rem;
    .mixin_padding();
    margin-top: 0rem;
    .eating_chicken_left {
      width: 30%;
      height: 10rem;
      float: left;
      .mixin_crux();
    }
    .eating_chicken_right {
      width: 70%;
      height: 10rem;
      float: right;
      .chicken_significant {
        width: 100%;
        height: 6rem;
        font-size: 1.4rem;
      }
      .chicken_price {
        width: 100%;
        height: 4rem;
        font-size: 1.2;
      }
    }
  }

  .goods_number {
    width: 100%;
    height: 5.5rem;
    .mixin_padding();
    padding: 0rem 1.5rem;
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
      position: relative;
    }
  }

  .receiving_address {
    width: 100%;
    height: 10.1rem;
    .mixin_padding();
    padding: 0rem 1.5rem;
    .receiving_address_left {
      width: 30%;
      height: 10.1rem;
      float: left;
      line-height: 5rem;
      .mixin_crux();
    }
    .receiving_address_right {
      width: 65%;
      height: 10.1rem;
      float: left;
      font-size: 1.3rem;
      color: #333333;
      .receiving_address_name {
        width: 100%;
        height: 4.5rem;
        line-height: 4.5rem;
      }
      .address_info {
        width: 100%;
        height: 5.6rem;
      }
    }
    .receiving_address_icon {
      width: 5%;
      height: 10.1rem;
      float: right;
      position: relative;
    }
  }

  .leaving_message {
    width: 100%;
    height: 20rem;
    .mixin_padding();
    .leaving_message_title {
      width: 100%;
      height: 4rem;
      .mixin_crux();
    }
    .message_content {
      width: 100%;
      height: 15rem;
    }
  }
}
</style>