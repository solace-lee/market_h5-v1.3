<template>
  <div class="detail-null">
    <!-- 头部 -->
    <div class="head">
      <div class="bg"></div>
      <div class="head-title">
        <div class="back" @click="$router.go(-1)">
          <img src="../../img/index/wallet/back.png" alt>
        </div>
        <div class="title">商品过期不存在</div>
      </div>
    </div>

    <div class="container">
      <div class="area">
        <div class="null-img">
          <img src="../../img/index/detail/detailnull.png" alt>
        </div>
        <div class="text">商品过期不存在</div>
      </div>
    </div>

    <v-section5 :grous="grous"></v-section5>
    <!-- 猜你喜欢 -->
  </div>
</template>

<script>
import { formatDate } from "../assets/js/data.js";
import Section5 from "@/components/index/section5.vue";
import { Toast } from "vant";
export default {
  components: {
    "v-section5": Section5
  },

  data() {
    return {
      grous: [] // 猜你喜欢数据
    };
  },

  created() {
    this.getYouLike();
  },

  methods: {
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
    }
  }
};
</script>
<style scoped lang='less'>
.detail-null {
  width: 100%;
  height: 100vh;
  background: #fff;
  position: relative;

  // 头部
  .head {
    width: 100%;
    height: 4.7rem;
    display: flex;
    flex-direction: column;
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
      background: #00ae87;
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

  // 内容区
  .container {
    height: 25.6rem;
    width: 100%;
    // background: #f2f2f2;
    // margin: 0;
    .area {
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .null-img {
        height: 11rem;
        width: 11rem;
        background: #f2f2f2;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .text {
        margin-top: 3rem;
        font-size: 1.6rem;
        color: #999;
      }
    }
  }
}
</style>
