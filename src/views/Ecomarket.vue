<template>
  <div class="wrap">
    <!-- 头部搜索 -->
    <div class="head">
      <div class="site">
        <div class="local">
          <div class="locaImg" @click="$router.go(-1)">
            <van-icon name="arrow-left"/>
          </div>
          <!-- <span
            @click="gomap"
            style="border: 0"
            class="city"
            v-if="city"
          >{{city.substring(0, city.length-1)}}</span>
          <span v-if="district">{{district.substring(0, district.length-1)}}</span>-->
        </div>
        <div class="title">{{title}}</div>
        <div class="msgBtn">
          <!-- <div class="shopCar" @click="gocar">
            <img class="shopCarImg" src="../../img/index/ecomarket/car-white.png">
            <div class="shopCarValue" v-show="hasCar">{{carValue}}</div>
          </div> -->
          <!-- <v-msg></v-msg> -->
        </div>
      </div>
      <div class="search">
        <img class="searchImg" src="../../img/index/ecomarket/search.png">
        <input type="text" placeholder="更多好货助力" @click="goseek">
      </div>
    </div>

    <!-- 轮播部分 -->
    <div class="swiper">
      <mt-swipe :auto="3000">
        <mt-swipe-item v-for="(i,index) in swiper" :key="index">
          <img :src="i.titleImg" :alt="i.title" @click="goUrl(i.url)">
        </mt-swipe-item>
      </mt-swipe>
    </div>

    <!-- 广告1 -->
    <div class="ad-f2" v-for="(i, index) in ad1" :key="index" v-show="index<1">
      <img :src="i.titleImg" @click="goUrl(i.url)">
    </div>

    <!-- 间隔线 -->
    <div class="isline"></div>

    <!-- 市场热卖 -->
    <div class="ad-f3">
      <div class="ad-title">
        <img src="../../img/index/ecomarket/hot.png">
        <div class="ad-title-txt">市场热卖</div>
        <div class="ad-title-entxt">HOT</div>
      </div>
      <!-- 展示区 -->
      <div class="ad-f3-container">
        <div class="ad-f3-container-left" @click="goUrl(f3[0].url)">
          <img :src="f3[0].titleImg">
        </div>
        <div class="ad-f3-container-right">
          <div class="ad-f3-container-right-item" @click="goUrl(f3[1].url)">
            <img :src="f3[1].titleImg">
          </div>
          <div class="ad-f3-container-right-item" @click="goUrl(f3[2].url)">
            <img :src="f3[2].titleImg">
          </div>
        </div>
      </div>
    </div>

    <!-- 间隔线 -->
    <div class="isline"></div>

    <!-- 今日特价 -->
    <div class="ad-f4">
      <div class="ad-title">
        <img src="../../img/index/ecomarket/sale.png">
        <div class="ad-title-txt">今日特价</div>
        <div class="ad-title-entxt">SALE</div>
      </div>
      <!-- 展示区 -->
      <div class="ad-f4-container">
        <div
          class="container-item"
          v-for="(i, index) in todaySale"
          :key="index"
          @click="godetail(i.commodityId)"
        >
          <div class="itemImg">
            <img :src="i.titleImg">
          </div>
          <div class="itemTitle">{{i.name}}</div>
          <div class="itemPrice">
            <div class="price">
              <div class="nowPrice">
                ￥
                <span>{{i.discountPrice}}</span>
              </div>
              <s class="originalPrice">￥{{i.originalPrice}}</s>
            </div>
            <img src="../../img/index/ecomarket/car1.png">
          </div>
        </div>
      </div>
    </div>

    <!-- 间隔线 -->
    <div class="isline"></div>

    <div class="product">
      <!-- 绿色生活 -->
      <div class="ad-f5">
        <div class="ad-title">
          <img src="../../img/index/ecomarket/green.png">
          <div class="ad-title-txt">绿色生活</div>
          <div class="ad-title-entxt">GREEN</div>
        </div>
        <!-- 大标题展示区 -->
        <div class="all-content" v-for="(i, count) in allProduct" :key="count">
          <div class="bannerTitle">
            <img :src="i.classifyImgUrl">
            <div class="content">
              <!-- <div class="bannerText">{{i.classifyName}}</div> -->
              <!-- <div class="otherText">满200立减30</div> -->
            </div>
          </div>
          <!-- 产品展示区 -->
          <div class="product-container">
            <div
              class="product-item"
              v-for="(j, index) in i.commodityList"
              :key="index"
              v-show="index<3"
              @click="godetail(j.id)"
            >
              <div class="itemImg">
                <img :src="j.imgUrl">
              </div>
              <div class="itemTitle">{{j.name}}</div>
              <div class="itemPrice">
                <div class="price">
                  <div class="nowPrice">
                    ￥
                    <span>{{j.discountPrice}}</span>
                  </div>
                </div>
                <img src="../../img/index/ecomarket/car2.png">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 间隔线 -->
    <div class="isline" style="background: #fff;"></div>
    <!-- 到底了 -->
    <!-- <v-baseline></v-baseline> -->
  </div>
</template>

<script>
import Header from "@/common/_header.vue";
import Msg from "@/components/msg/msgTip.vue";
// import Baseline from "@/common/_baseline.vue";
export default {
  components: {
    "v-header": Header,
    "v-msg": Msg
    // "v-baseline": Baseline
  },

  data() {
    return {
      city: "",
      district: "",
      title: "生态市场",
      swiper: [],
      hasmsg: false, // 是否有消息
      msgValue: "", //消息数量
      hasCar: false, // 是否有购物车数量
      carValue: "", // 购物车数量
      ad1: [],
      f3: [
        {
          titleImg: ""
        },
        {
          titleImg: ""
        },
        {
          titleImg: ""
        }
      ],
      f4: [],
      todaySale: [], //今日特价数据
      allProduct: [] // 所有商品数据
    };
  },

  mounted() {
    this.getdistrict(); // 获取地点信息及首次的数据加载
    this.getData(); // 获取所有数据
  },

  methods: {
    // 获取页面所有数据
    getData() {
      this.districtId = sessionStorage.getItem("districtId") || null;
      let obj = {
        params: {
          districtId: this.districtId,
          code: sessionStorage.getItem('codeA')
        }
      };
      this.$api
        .get(this.HOME + this.SEARCH + "ads/findAdsList", obj)
        .then(res => {
          this.swiper = res.data.data.f1;
          this.ad1 = res.data.data.f2;
          this.f3 = res.data.data.f3;
          this.todaySale = res.data.data.f4;
          // console.log(this.swiper);
        })
        .catch(err => {});
      const config = {
        params: {
          classifyCode: 10000,
          commodityArea: 1
        }
      };
      this.$api
        .get(this.HOME + this.SEARCH + "commodity/findByClassifyCode", config)
        .then(res => {
          this.allProduct = res.data.data;
        })
        .catch(err => {});
    },

    // 跳转到地区选择页
    gomap() {
      this.$router.push({
        path: "/map?name=选择地区"
      });
    },

    // 获取地点信息
    getdistrict() {
      var that = this;
      var mapObj = new AMap.Map("iCenter");
      // console.log(mapObj);
      mapObj.plugin("AMap.Geolocation", function() {
        var geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, //是否使用高精度定位，默认:true
          timeout: 10000, //超过10秒后停止定位，默认：无穷大
          maximumAge: 0, //定位结果缓存0毫秒，默认：0
          convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
          showButton: true, //显示定位按钮，默认：true
          buttonPosition: "LB", //定位按钮停靠位置，默认：'LB'，左下角
          buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
          showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
          panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
          zoomToAccuracy: true //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        });
        mapObj.addControl(geolocation);
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, "complete", onComplete); //返回定位信息
        AMap.event.addListener(geolocation, "error", onError); //返回定位出错信息
        function onComplete(data) {
          // console.log(data);
          if (sessionStorage.getItem("district")) {
            that.district = sessionStorage.getItem("district");
            that.city = sessionStorage.getItem("city");
            that.province = sessionStorage.getItem("province");
          } else {
            that.district = data.addressComponent.district;
            that.city = data.addressComponent.city;
            that.province = data.addressComponent.province;
            sessionStorage.setItem("province", that.province);
            sessionStorage.setItem("city", that.city);
            sessionStorage.setItem("district", that.district);
            var obj = {};
            obj.provinceName = that.province;
            obj.cityName = that.city;
            obj.districtName = that.district;
            that.$api
              .post(that.HOME + this.SEARCH + "ads/findecoregion", obj)
              .then(res => {
                this.swiper = res.data.data.f1;
              })
              .catch(err => {});
          }
        }
        function onError(data) {
          console.log(data);
        }
      });
    },

    // 跳转到商品详情
    godetail(id) {
      this.$router.push({
        path: "/detail?id=" + id
      });
    },

    // 跳转到购物车
    gocar() {
      this.$router.push({
        path: "/car"
      });
    },

    // 跳到搜索页面
    goseek() {
      this.$router.push({
        path: "/ecosearch"
      });
    },

    goUrl(url) {
      if (url != '#') {
        this.$router.push({
          path: url
        });
      }
    },

    // 跳到消息页面
    msg() {
      this.$router.push({
        path: "/msg"
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/fz.less";
@import "../assets/index/style.css";
.wrap {
  width: 100%;
  height: 100%;
  margin-bottom: 1.2rem;
  .isline {
    width: 100%;
    height: 1.2rem;
    background: #f2f2f2;
  }

  // 头部搜索部分
  .head {
    width: 100%;
    height: 9.4rem;
    background-color: #00ae87;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    .site {
      width: 100%;
      height: 4.7rem;
      display: flex;
      text-align: center;
      align-items: center;
      .local {
        flex: 1;
        max-width: 12.5rem;
        overflow: hidden;
        display: flex;
        align-items: center;
        color: #fff;
        font-size: 1.6rem;
        margin-bottom: 0.4rem;
        .locaImg {
          width: 0.9rem;
          height: 1.6rem;
          margin: 0.4rem 0.6rem 0 1rem;
        }
        .city {
          min-width: 2.4rem;
          margin: 0.5rem 0.5rem 0 0.5rem;
        }
        span {
          line-height: 1.4rem;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          /*! autoprefixer: off */
          -webkit-box-orient: vertical;
          /*! autoprefixer: on */
          padding-left: 0.5rem;
          border-left: 0.1rem solid #fff;
          font-size: 1.2rem;
          margin-top: 0.5rem;
        }
      }
    }
  }

  // 头部标题
  .title {
    flex: 1;
    color: #fff;
    font-size: 1.8rem;
  }

  //购物车按钮
  .shopCar {
    margin-right: 1.2rem;
    position: relative;
    .shopCarImg {
      height: 2rem;
      width: 2rem;
      padding-top: 0.2rem;
      margin-bottom: 0.4rem;
    }
    .shopCarValue {
      position: absolute;
      right: -1.5rem;
      top: -0.4rem;
      background: red;
      height: 1.4rem;
      padding: 0 0.4rem;
      border-radius: 0.7rem;
      margin-right: 0.9rem;
      font-size: 1rem;
      color: #fff;
    }
  }

  // 消息按钮
  .msgBtn {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    position: relative;
    .msgImg {
      height: 2rem;
      width: 2.1rem;
      padding-top: 0.5rem;
      margin: 0 1.4rem 0.4rem 1rem;
    }
    .onmsg {
      position: absolute;
      right: 0;
      top: -0.4rem;
      background: red;
      height: 1.4rem;
      // width: 1.4rem;
      padding: 0 0.4rem;
      border-radius: 0.7rem;
      margin-right: 0.9rem;
      font-size: 1rem;
      color: #fff;
    }
  }

  /*搜索框*/
  .search {
    height: 3rem;
    width: 90%;
    position: relative;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    vertical-align: middle;
    background-color: #fff;
    border-radius: 1.5rem;
    .searchImg {
      position: relative;
      height: 1.3rem;
      width: 1.3rem;
      left: 2rem;
      align-items: center;
    }
    input {
      align-items: center;
      width: 90%;
      padding: 0.4rem 0;
      border: none;
      border-radius: 1.5rem;
      font-size: 1.333rem;
      margin-left: 1rem;
      // background-color: #000;
    }
    input::-webkit-input-placeholder {
      padding-left: 2rem;
      color: #999;
      font-size: 1.2rem;
    }
  }

  // 轮播部分
  .swiper {
    background-size: 100% 100%;
    margin-top: 9.4rem;
    width: 100%;
    .mint-swipe {
      width: 100%;
      height: 44.8vw;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }

  // 广告图位置
  .ad-f2 {
    height: 30vw;
    width: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }

  // 标题的样式
  .ad-title {
    height: 4.6rem;
    display: flex;
    padding-left: 1.5rem;
    align-items: center;
    background: #fff;
    img {
      width: 0.9rem;
      height: 1.2rem;
    }
    .ad-title-txt {
      font-size: 1.5rem;
      color: #333;
      padding-left: 0.7rem;
    }
    .ad-title-entxt {
      font-size: 1.6rem;
      font-weight: bold;
      color: #ccc;
      padding-left: 0.7rem;
    }
  }

  .ad-f3 {
    width: 100%;
    height: 24.2rem;
    .ad-f3-container {
      display: flex;
      padding: 0 1.5rem;
      height: 18.1rem;
      justify-content: space-around;
      .ad-f3-container-left {
        // background: #999;
        border-radius: 6px;
        overflow: hidden;
        width: 39%;
        height: 18.1rem;
        img {
          height: 100%;
          width: 100%;
        }
      }
      .ad-f3-container-right {
        width: 59%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .ad-f3-container-right-item {
          width: 100%;
          height: 8.8rem;
          // background: #999;
          border-radius: 6px;
          overflow: hidden;
          img {
            height: 100%;
            width: 100%;
          }
        }
      }
    }
  }

  .ad-f4 {
    width: 100%;
    height: 23rem;
    background: #f2f2f2;
    .ad-f4-container {
      display: flex;
      overflow-x: auto;
      width: 100%;
      // padding-left: 1.5rem;
      background: #f2f2f2;
      .container-item {
        width: 11.6rem;
        height: 17.4rem;
        background: #fff;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border-radius: 6px;
        margin-left: 0.7rem;
        margin-top: 0.7rem;
        .itemImg {
          width: 11.6rem;
          height: 10.6rem;
          overflow: hidden;
          // background: #666;
          border-radius: 6px 6px 0 0;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .itemTitle {
          font-size: 1.4rem;
          color: #333;
          padding: 0 0.5rem;
          margin: 0.5rem 0;
          overflow: hidden;
          // height: 3rem;
          // line-height: 1.5rem;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          /*! autoprefixer: off */
          -webkit-box-orient: vertical;
          /*! autoprefixer: on */
        }
        .itemPrice {
          padding: 0 0.5rem;
          display: flex;
          justify-content: space-between;
          .price {
            display: flex;
            .nowPrice {
              font-size: 0.9rem;
              color: #00ae87;
              span {
                font-size: 1.5rem;
                font-weight: bold;
              }
            }
            .originalPrice {
              font-size: 0.9rem;
              line-height: 1rem;
              margin-top: 0.7rem;
              margin-left: 0.2rem;
            }
          }
          img {
            height: 1.6rem;
            width: 1.6rem;
            float: right;
          }
        }
      }
    }
  }

  // 大标题展示区样式集中
  .bannerTitle {
    width: 100%;
    height: 22.6vw;
    overflow: hidden;
    position: relative;
    justify-content: center;
    img {
      width: 100%;
      height: 100%;
    }
    .content {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: Center;
      // color: #fff;
      .bannerText {
        font-size: 2rem;
      }
      .otherText {
        font-size: 1.4rem;
      }
    }
  }

  // 产品展示区样式集中
  .product-container {
    display: flex;
    // justify-content: space-around;
    overflow-x: auto;
    width: 100%;
    height: 100%;
    background: #f2f2f2;
    .product-item {
      width: 10.5rem;
      height: 16.8rem;
      background: #fff;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border-radius: 6px;
      margin-top: 1.5rem;
      margin-left: 1.5rem;
      margin-bottom: 0.5rem;
      .itemImg {
        width: 100%;
        height: 10.5rem;
        overflow: hidden;
        // background: #fff;
        border-radius: 6px 6px 0 0;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .itemTitle {
        font-size: 1.4rem;
        color: #333;
        padding: 0 0.5rem;
        margin: 0.5rem 0;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        /*! autoprefixer: off */
        -webkit-box-orient: vertical;
        /*! autoprefixer: on */
      }
      .itemPrice {
        padding: 0 0.5rem;
        display: flex;
        justify-content: space-between;
        .price {
          display: flex;
          .nowPrice {
            font-size: 0.9rem;
            color: #000;
            span {
              font-size: 1.5rem;
              font-weight: bold;
            }
          }
          // .originalPrice {
          //   font-size: .9rem;
          //   line-height: 1rem;
          //   margin-top: .7rem;
          //   margin-left: .2rem;
          // }
        }
        img {
          height: 1.6rem;
          width: 1.6rem;
          float: right;
        }
      }
    }
  }
}
</style>
