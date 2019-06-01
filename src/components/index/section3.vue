<template>
  <section class="section3">
    <div class="title">
      <img src="../../../img/index/home/leb.png" style="width:6px;height: 24px;margin-right: 10px;">
      <p style="font-size: 20px;color: #777777;width: 70%;">品牌推荐</p>
    </div>

    <div class="shangmian">
      <div v-for="(k,index) in brand" :key="index" v-show="index<2" class="jinyu">
        <router-link :to="{path:'/detail?id='+k.commodityId}">
          <div class="lb">
              <img :src="k.titleImg" :alt="k.title">
          </div>
          <span class="dianzan2">
            <img :src="dsrc" alt>
            <span class="dianzan3">库存{{k.quantity}}</span>
          </span>
        </router-link>
      </div>
    </div>

    <ul class="xiamian">
      <li v-for="(a,index) of brand" :key="index" class="liguojiu">
        <router-link :to="{path:'/detail?id='+a.id}">
          <p class="guojiu">
            <img :src="a.titleImg" alt="a.name">
          </p>
        </router-link>
      </li>
    </ul>
  </section>
</template>

<script>
import { Lazyload } from "mint-ui";

export default {
  props: [
    "brand" // 首页过来的品牌推荐数据
  ],
  data() {
    return {
      // brand: [], // 首页过来的品牌推荐数据
      section3: "",
      commodity: [],
      dsrc: require("../../../img/index/home/likeNum.png"),
      rsrc: require("../../../img/index/home/buyNum.png"),
      page: 1,
      rows: 10,
      k: 123456789
    };
  },
  created() {
    // this.getbrand();
    // console.log(this.brand);
    
  },
  methods: {
    //获取品牌推荐
    getbrand() {
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
          this.brand = res.data.data.f4;
          // console.log("ssssssssss", this.brand[0].name);
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
.section3 {
  padding-top: 0vw !important;
  background: #ffffff;
  .title {
    margin-top: 0pt;
    width: 100%;
    height: 45pt;
    display: flex;
    // justify-content: center;
    padding-left: 1.5rem;
    align-items: center;
    background: #ffffff;
    img {
      width: 100%;
    }
  }
  .shangmian {
    width: 100%;
    padding: 0.5rem 1.5rem 0.25rem 1.5rem;
    display: flex;
    justify-content: space-around;
    .jinyu {
      // background-color: #f2f2f2;
      // box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.3);
      border-radius: 6px;
      width: 48%;
      overflow: hidden;
      height: 9.2rem;
      display: flex;
      justify-content: space-between;
      position: relative;
      .lb {
        height: 100%;
        width: 100%;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .dianzan2 {
        position: absolute;
        left: .6rem;
        bottom: .5rem;
        display: flex;
        img {
          height: 1.2rem;
          width: 1.2rem
        }
        .dianzan3 {
          font-size: .9rem;
          line-height: 1.2rem;
          margin-left: .4rem;
        }
      }
    }
  }
}

.lb .diyi {
  margin-top: 0rem;
}

.renshu2 img,
.dianzan2 img {
  display: inline-block;
  width: 1.5rem;
  height: 1.1rem;
  margin-left: 0.6rem;
}

.renshu3,
.dianzan3 {
  font-size: 0.9rem;
  line-height: 1rem;
}

/*下面一部分*/
.xiamian {
  width: 100%;
  padding: 0.3rem 1.5rem 0.3rem 1.5rem;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  text-align: center;
  .liguojiu {
    width: 8.3rem;
    height: 12.4rem;
    overflow: hidden;
    border-radius: 6px;
    margin-top: 0.25rem;
    .guojiu {
      height: 100%;
      width: 100%;
      img {
        height: 100%;
        width: 100%;
      }
    }
  }
  .liguojiu:nth-child(1) {
    display: none;
  }

  .liguojiu:nth-child(2) {
    display: none;
  }
}
</style>