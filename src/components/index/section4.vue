<template>
  <section class="section2">
    <div class="title">
      <img src="../../../img/index/home/leb.png" style="width:6px;height: 24px;margin-right: 10px;">
      <p style="font-size: 20px;color: #777777;width: 70%;">新品推荐</p>
    </div>

    <div class="section2-list">
      <ul class="xinpin">
        <li v-for="(k,index) in commodity" :key="index" v-show="k.discountPrice">
          <router-link :to="{path:'/detail?id='+k.commodityId}">
            <img v-lazy="k.titleImg" :alt="k.name">
            <div class="goodstitle">
              <div class="title_name">{{k.name}}</div>
            </div>
            <p class="section2-list-price">
              <span style="font-size:1.8rem;font-weight:bold;">
                <span style="font-size:1.2rem;" class="qian">￥</span>
                {{k.discountPrice}}
              </span>
              <!-- <s class="section2-list-intro">￥{{k.originalPrice}}</s> -->
            </p>
          </router-link>
        </li>
      </ul>
    </div>
  </section>
</template>
<script>
import { Lazyload } from "mint-ui";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["section2", "commodity"],
  data() {
    return {
      page: "1",
      rows: "100",
      district: "",
      city: "",
      province: ""
    };
  },
  created() {
    // this.getcommodity();
    // 首页传值暂停使用
  },
  watch: {},
  computed: {
    ...mapGetters(["selectedList", "unSelectedList"])
  },
  methods: {
    ...mapActions(["addCarList"]),
    //品质推荐
    getcommodity() {
      this.district = sessionStorage.getItem("district");
      this.city = sessionStorage.getItem("city");
      this.province = sessionStorage.getItem("province");
      var obj = {};
      obj.provinceName = this.province;
      obj.cityName = this.city;
      obj.districtName = this.district;
      this.$http
        .post(this.HOME + "/ads/list", obj)
        .then(res => {
          this.commodity = res.data.data.f2;
        })
        .catch(err => {
          console.log(err.header);
        });
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/fz.less";
@import "../../assets/index/style.css";
.section2 {
  .title {
    margin-top: 1rem;
    width: 100%;
    height: 32pt;
    display: flex;
    padding-left: 1.5rem;
    align-items: center;
    img {
      width: 8rem;
    }
  }
}

.section2-list {
  overflow-x: scroll;
  width: 100%;
  ul {
    width: 100%;
    background: #f2f2f2;
    display: flex;
    li {
      margin-right: 1rem;
      width: 12rem;
      height: 19.4rem;
      border-radius: 6px;
      a,
      img {
        text-align: center;
        border-radius: 6px;
        display: block;
        width: 12rem;
        height: 12rem;
      }
      .goodstitle {
        width: 100%;
        height: 3.2rem;
        margin-top: 7px;
        padding: 0 1rem;
        overflow: hidden;
        .title_name {
          font-size: 1.3rem;
          line-height: 1.6rem;
          text-align: left;
          color: #333;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          /*! autoprefixer: off */
          -webkit-box-orient: vertical;
          /*! autoprefixer: on */
          overflow: hidden;
        }
      }
      p {
        overflow: hidden;
        text-overflow: ellipsis;
      }
      h2 {
        .fz(font-size, 32);
        color: #333;
      }

      .section2-list-intro {
        font-size: 0.9rem;
        margin-top: 5px;
        color: #666666;
      }

      .section2-list-price {
        height: 2.5rem;
        overflow: hidden;
        color: #00ae87;
        font-size: 1.8rem;
        margin-top: 0.6rem;
        display: flex;
        align-items: center;
        // font-family: PingFang SC;
        .qian {
          width: 0.6rem;
          height: 0.65rem;
          font-size: 0.9px;
          margin-left: 8px;
          color: #00ae87;
          font-weight: normal;
        }
      }
    }
  }
}
.section2-banner {
  display: block;
  width: 100vw;
  img {
    display: block;
    height: 24vw;
    width: 100%;
  }
}
.xinpin {
  margin-left: 1rem;
}
</style>
