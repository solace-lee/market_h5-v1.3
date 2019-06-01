<template>
  <div>
    <div class="title">
      <img src="../../../img/index/home/leb.png" style="width:6px;height: 24px;margin-right: 10px;">
      <p style="font-size: 20px;color: #777777;width: 70%;">品质推荐</p>
    </div>
    <section class="section5">
      <div class="guess">
        <div class="container1">
          <div class="shadow" v-for="(item,index) of quality" :key="index" v-show="index<1">
            <div class="first">
              <router-link class="big" :to="{path:'/detail?id='+ item.commodityId}">
                <div class="item_name">{{item.name}}</div>
                <div class="text1"></div>
                <p class="section2-list-price">
                  <span class="aabb">
                    <span class="qian">￥</span>
                    {{item.discountPrice}}
                  </span>
                  <!-- <s class="section2-list-intro">
                    <s class="qian2">￥</s>
                    {{item.originalPrice}}
                  </s> -->
                  <!-- <span class="btn2">
                    <img :src="buyBtn">
                  </span> -->
                </p>
              </router-link>
            </div>
            <div class="right">
              <router-link :to="{path:'/detail?id='+item.commodityId}">
                <img :src="item.titleImg" alt>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="content">
        <ul class="ppoo">
          <li v-for="(item,index) of quality" :key="index" class="ppaa" v-show="index<4">
            <router-link :to="{path:'/detail?id='+item.commodityId}">
              <img :src="item.titleImg">
              <p class="re">
                <img :src="hotSales" alt>
              </p>
              <div class="describe">
                <div class="text2">{{item.name}}</div>

                <p style="margin-top: 5px;">
                  <span class="yans">
                    <span class="yanss3">￥</span>
                    {{item.discountPrice}}
                  </span>
                  <!-- <s class="yans2">￥{{item.originalPrice}}</s> -->
                  <!-- <span class="btn3">
                    <img :src="buyBtn">
                  </span> -->
                </p>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </section>
    <div style="height: 20px;background:#eee;"></div>
  </div>
</template>

<script>
import Util from "../../util/common";
import { Lazyload } from "mint-ui";
export default {
  props: {
    quality: {
      default: [
        {
          commodityId: 0,
          name: "",
          title: "",
          discountPrice: "",
          originalPrice: ""
        }
      ]
    }
  },
  data() {
    return {
      hotSales: require("../../../img/index/home/hot.png"), // 热销图标
      grous: [],
      buyBtn: require("../../../img/index/home/buy.png"), //立即购买图标
      page: 1
    };
  },
  created() {},
  methods: {
    getguess() {
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
          this.quality = res.data.data.f3;
          // console.log(this.quality);
        })
        .catch(err => {
          console.log(err.header);
        });
    }
  }
};
</script>

<style lang="less" scoped>
// @import "../../assets/fz.less";
// @import "../../assets/index/style.css";
.title {
  margin-top: 1rem;
  width: 100%;
  height: 4.8rem;
  display: flex;
  background: #fff;
  // justify-content: center;
  padding-left: 1.5rem;
  align-items: center;
  /*background-color:#eee;*/
  img {
    width: 50%;
    height: 50%;
  }
}

// 清除浮动
.cleafix:after {
  content: ".";
  clear: both;
  display: block;
  height: 0;
  overflow: hidden;
  visibility: hidden;
}

.section5 {
  background: #fff;
  width: 100%;
  overflow: hidden;
  position: relative;
}


.guess {
  width: 100%;
  margin-bottom: 0.4rem;
  .container1 {
    width: 100%;
    padding: 0.5rem 1.5rem 0 1.5rem;
    // display: flex;
    .shadow {
      box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.3);
      border-radius: 6px;
      display: flex;
      .first {
        width: 55%;
        height: 9.3rem;
        background: #eee;
        border-radius: 6px 0 0 6px;
        padding-top: 1.5rem;
        position: relative;
        .big {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          .item_name {
            padding: 0 .6rem;
            width: 100%;
            font-size: 1.3rem;
            line-height: 1.6rem;
            color: #000;
            text-align: left;
            overflow: hidden;
            text-overflow: ellipsis;
            /*! autoprefixer: off */
            -webkit-box-orient: vertical;
            /*! autoprefixer: on */
            display: -webkit-box;
            -webkit-line-clamp: 2;
          }
          .text1 {
            font-size: 1rem;
            text-align: center;
            color: #353535;
            margin: 0rem 0 0.6rem 0;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            /*! autoprefixer: off */
            -webkit-box-orient: vertical;
            /*! autoprefixer: on */
            overflow: hidden;
          }
          .section2-list-price {
            color: #00ae87;
            font-size: 1.8rem;
            width: 100%;
            font-weight: bold;
            display: flex;
            align-items: center;
            .aabb {
              margin-right: .2rem;
              .qian {
                color: #00ae87;
                font-size: 1.2rem;
                margin-left: 0.4rem;
                margin-right: 0.4rem;
                font-weight: normal;
              }
            }
            .section2-list-intro {
              color: #666;
              font-size: 0.9rem;
            }
            .btn2 {
              position: absolute;
              right: 0.6rem;
              img {
                width: 7rem;
                height: 2.2rem;
              }
            }
          }
        }
      }
      .right {
        background: #ffffff;
        width: 45%;
        height: 9.3rem;
        border-radius: 0 6px 6px 0;
        margin-left: 0;
        padding-top: 0;
        position: relative;
        img {
          width: 100%;
          height: 9.3rem;
          border-radius: 0 6px 6px 0;
        }
        .jun {
          img {
            position: absolute;
            left: -18px;
            top: -5px;
            width: 3.5rem;
            height: 3rem;
          }
        }
      }
    }
  }
}
.content {
  width: 100%;
  padding: 0 1.5rem 0 0.8rem;
  flex-direction: row;
  margin-top: 0.1rem;
}
.ppoo {
  display: flex;
  // justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
}
.ppaa {
  width: 31.2%;
  height: 18rem;
  overflow: hidden;
  margin: 1.6% 0;
  margin-left: 2%;
  background: #eee;
  position: relative;
  border-radius: 6px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
}
.ppaa .re {
  width: 2.3rem;
  height: 2.2rem;
  position: absolute;
  left: 11px;
  top: 0;
}

.describe {
  line-height: 1.7rem;
  .text2 {
    width: 100%;
    padding: 0 .6rem;
    font-size: 1.3rem;
    line-height: 1.6rem;
    margin: .8rem 0;
    color: #333333;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    /*! autoprefixer: off */
    -webkit-box-orient: vertical;
    /*! autoprefixer: on */
  }
}

.content .ppaa .re img {
  width: 2.2rem;
  height: 2.3rem;
}
.content ul .ppaa img {
  width: 100%;
  height: 10.4rem;
  overflow: hidden;
}

.content ul .ppaa .describe .btn3 img {
  float: right;
  width: 7rem;
  height: 2.2rem;
}

li:nth-child(1) {
  display: none;
}

.yans {
  margin-left: 0.7rem;
  margin-top: 1.5rem;
  width: 25.5px;
  height: 12px;
  font-size: 1.8rem;
  font-weight: bold;
  line-height: 12px;
  color: #00ae87;
}
.yans2 {
  width: 25px;
  height: 7px;
  font-size: 0.9rem;
  letter-spacing: 0px;
  color: #666666;
}
.yanss3 {
  font-size: 1.2rem;
}
a:hover {
  text-decoration: none;
}
.btn3 img {
  margin-top: 0.4rem;
}
</style>