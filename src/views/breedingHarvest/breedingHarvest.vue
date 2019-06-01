<template>
  <div id="breed">
    <section class="golden_eggs">
      <div class="head">
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
      <div class="egg_number_title">金蛋数量</div>
      <div class="egg_number">{{value}}</div>
      <div class="harvest_quota">单个金蛋收获额度</div>
      <div class="harvest_money">￥55.00</div>
    </section>
    <section class="egg_count">
      <div class="egg_count_top">
        <div class="harvest_egg_left">
          <div>收获金蛋(个)</div>
          <div>可结算额度为￥{{55*egg_count}}.00</div>
        </div>
        <div class="harvest_egg_right">
          <el-input-number
            style="width: 130px;position:absolute;right:0rem;top:50%;margin-top:-16px;"
            size="small"
            v-model="egg_count"
            @change="handleChange"
            :min="1"
            :max="value"
            label="描述文字"
          ></el-input-number>
        </div>
      </div>
      <div class="egg_count_bottom">
        <div class="harvest_left">收获总额度</div>
        <div class="harvest_right">
          <span style="float: right;">￥{{55*egg_count}}.00</span>
        </div>
      </div>
    </section>
    <section class="chicken">
      <button @click="eat_chicken(2)">我要收益</button>
      <button @click="eat_chicken(1)">我要吃鸡</button>
    </section>

    <el-dialog :visible.sync="centerDialogVisible" width="90%" center>
      <span slot="title">
        <div style="background: rgb(0,174,135);padding: 20px 20px 10px;">
          <div style="font-size: 1.9rem;color:white;">养殖收获</div>
          <div
            style="font-size: 1.3rem;color:rgb(255,255,255);margin-top: 1rem;margin-bottom: 1rem;"
          >本操作会把你的养殖收获全部结算到我的余额</div>
        </div>
      </span>
      <div class="dialog_breed">
        <div class="dialog_egg">
          <span>收获金蛋</span>
          <span>x{{egg_count}}</span>
        </div>
        <div class="dialog_money">
          <span>收获金额</span>
          <span>￥{{55*egg_count}}</span>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false" round>取 消</el-button>
        <el-button type="primary" @click="harvestSure" round>确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog :visible.sync="centerDialogSure" width="90%" title center>
      <div class="dialog_complete">
        <div>
          <img src="../../../img/index/replacement/complete.png">
        </div>
        <div>收获已完成</div>
        <div>1.点击收获可以将养殖自己结算到余额</div>
        <div>2.点击吃鸡可以下单领取天然野生土鸡</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="harvestKnow" round>我知道了</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      theme: "收获",
      value: 0, // egg value
      egg_count: 0,
      centerDialogVisible: false,
      centerDialogSure: false
    };
  },

  created() {
    var body_s = document.getElementsByTagName("body")[0];
    body_s.style.background = "#f2f2f2";
    this.getData();
  },
  methods: {
    getData() {
      this.$api
        .get(this.HOME + this.USER + "fund/getGoldenEggs")
        .then(res => {
          this.value = res.data.data.data;
          console.log(res);
        });
    },
    handleChange(value) {},
    eat_chicken(res) {
      if (this.value == 0) {
        Toast("数量不足");
        return;
      }
      if (res == 1) {
        this.$router.push({ path: "/eatChicken" });
      } else if (res == 2) {
        this.centerDialogVisible = true;
      }
    },
    // 养殖收获结算
    harvestSure() {
      if (this.value == 0) {
        Toast("数量不足");
        return;
      }
      this.$api
        .get(
          this.HOME +
            this.USER +
            "inside/fund/breedHarvest/" +
            this.egg_count
        )
        .then(res => {
          if (res.data.status == 200) {
            // Toast("收获成功");
            this.getData();
            this.centerDialogVisible = false;
            this.centerDialogSure = true;
          } else {
            Toast("收获失败请稍后再试");
            this.getData();
            this.centerDialogVisible = false;
          }
        });
    },
    harvestKnow() {
      this.centerDialogSure = false;
    }
  }
};
</script>

<style lang="less" scoped>
#breed {
  width: 100%;
  .dialog_complete {
    .mixin_explain() {
      width: 100%;
      height: 3rem;
      line-height: 3rem;
      text-align: center;
    }
    div:nth-of-type(1) {
      width: 100%;
      height: 10rem;
      position: relative;
      img {
        width: 8rem;
        height: 8rem;
        position: absolute;
        top: 0rem;
        left: 50%;
        margin-left: -4rem;
      }
    }
    div:nth-of-type(2) {
      .mixin_explain();
      color: #00ae87;
      font-size: 1.9rem;
      font-weight: bold;
      margin-bottom: 1rem;
    }
    div:nth-of-type(3) {
      .mixin_explain();
    }
    div:nth-of-type(4) {
      .mixin_explain();
    }
  }
  .dialog_breed {
    width: 100%;
    height: 18%;
    color: rgb(51, 51, 51);
    .dialog_egg {
      width: 100%;
      height: 3rem;
      line-height: 3rem;
      span:nth-of-type(1) {
        float: left;
        font-size: 1.8rem;
      }
      span:nth-of-type(2) {
        float: right;
        font-size: 3rem;
      }
    }
    .dialog_money {
      width: 100%;
      height: 3rem;
      line-height: 3rem;
      margin-top: 1.5rem;
      span:nth-of-type(1) {
        float: left;
        font-size: 1.8rem;
      }
      span:nth-of-type(2) {
        float: right;
        font-size: 3.6rem;
      }
    }
  }

  .golden_eggs {
    width: 100%;
    height: 24rem;
    position: relative;
    background-image: url(../../../img/index/replacement/breed_head.png);
    background-size: 100% 100%;
    .head {
      width: 100%;
      height: 4rem;
      display: flex;
      position: absolute;
      top: 0rem;
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
    .mixin_egg() {
      width: 100%;
      height: 3rem;
      line-height: 3rem;
      text-align: center;
      position: absolute;
      color: #ffffff;
    }
    .egg_number_title {
      .mixin_egg();
      font-size: 1.8rem;
      top: 6rem;
    }
    .egg_number {
      .mixin_egg();
      font-size: 3rem;
      top: 10rem;
    }
    .harvest_quota {
      .mixin_egg();
      font-size: 1.2rem;
      top: 14rem;
    }
    .harvest_money {
      .mixin_egg();
      font-size: 1.5rem;
      top: 17rem;
    }
  }
  .egg_count {
    width: 100%;
    height: 11rem;
    padding: 0rem 1.5rem;
    box-sizing: border-box;
    background: white;
    .egg_count_top {
      width: 100%;
      height: 6rem;
      border-bottom: 1px solid #f2f2f2;
      .harvest_egg_left {
        width: 50%;
        height: 6rem;
        float: left;
        div:nth-of-type(1) {
          width: 100%;
          height: 3rem;
          line-height: 3rem;
          font-size: 1.5rem;
        }
        div:nth-of-type(2) {
          width: 100%;
          height: 3rem;
          line-height: 3rem;
          color: #999999;
          font-size: 1.3rem;
        }
      }
      .harvest_egg_right {
        width: 50%;
        height: 6rem;
        float: right;
        position: relative;
      }
    }
    .egg_count_bottom {
      width: 100%;
      height: 5rem;
      font-size: 1.5rem;
      line-height: 5rem;
      .harvest_left {
        width: 50%;
        height: 5rem;
        float: left;
      }
      .harvest_right {
        width: 50%;
        height: 5rem;
        float: right;
        color: #00ae87;
      }
    }
  }
  .chicken {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 20rem;
    font-size: 1.6rem;
    .mixin_btn() {
      width: 28rem;
      height: 4.5rem;
      position: absolute;
      border-radius: 5px;
    }
    button:nth-of-type(1) {
      .mixin_btn();
      top: 5rem;
      left: 50%;
      margin-left: -14rem;
      border: 1px solid #00ae87;
      color: #00ae87;
      background: #f2f2f2;
    }
    button:nth-of-type(2) {
      .mixin_btn();
      top: 11rem;
      left: 50%;
      margin-left: -14rem;
      background: #00ae87;
      color: white;
    }
  }
}
</style>
