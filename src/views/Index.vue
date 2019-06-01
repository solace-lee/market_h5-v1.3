<template>
  <div class="index" ref="indexPart">
    <!-- 头部搜索开始 -->
    <div class="head">
      <div class="site" @click="gomap">
        <!-- 定位 -->
        <!--@click='gomap'-->
        <div>
          <!--<van-icon name="location" />-->
          <img class="locaImg" src="../../img/index/home/dingwei.png">
          <span style="border: 0" class="city" v-if="city">{{city.substring(0, city.length-1)}}</span>
          <span v-if="district">{{district.substring(0, district.length-1)}}</span>
        </div>
      </div>
      <div class="search">
        <img class="searchImg" src="../../img/index/home/search.png">
        <input type="text" placeholder="输入商品名称或关键词" @click="goseek">
      </div>
      <!-- <div class="msgBtn" @click="msg">
        <img class="msgImg" src="../../img/index/home/msg.png">
        <div class="onmsg" v-show="hasmsg">{{msgValue}}</div>
      </div>-->
      <v-msg></v-msg>
    </div>
    <!--//	头部搜索结束-->
    <div class="content">

    
    <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh"> -->
      <div v-if="show">
        <div class="swiper">
          <mt-swipe :auto="3000">
            <!--<img src="../assets/首页切图与标注/"/>-->
            <mt-swipe-item v-for="(i, index) in swiper" :key="index">
              <img :src="i.titleImg" :alt="i.title" @click="as(i.url)">
            </mt-swipe-item>
          </mt-swipe>
        </div>
        <div class="monopolyArea">
          <!-- <div class="beijing">
            <img src="../../img/index/home/bg.png" alt>
          </div> -->
          <ul>
            <li @click="cunpin" v-if="partB.titleImg">
              <img :src="partB.titleImg" alt>
              <p>{{partB.title}}</p>
            </li>
            <li @click="cunpin" v-else>
              <img src="../../img/index/home/2.png" alt>
              <p>{{partB.title}}</p>
            </li>
            <li @click="classify" v-if="partA.titleImg">
              <img :src="partA.titleImg" alt>
              <p>{{partA.title}}</p>
            </li>
            <li @click="classify" v-else>
              <img src="../../img/index/home/1.png" alt>
              <p>{{partA.title}}</p>
            </li>
            <li @click="member" v-if="partC.titleImg">
              <img :src="partC.titleImg" alt>
              <p>{{partC.title}}</p>
            </li>
            <li @click="member" v-else>
              <img src="../../img/index/home/3.png" alt>
              <p>{{partC.title}}</p>
            </li>
            <li @click="duihuan" v-if="partD.titleImg">
              <img :src="partD.titleImg" alt>
              <p>{{partD.title}}</p>
            </li>
            <li @click="duihuan" v-else>
              <img src="../../img/index/home/4.png" alt>
              <p>{{partD.title}}</p>
            </li>
          </ul>
        </div>

        <v-section4 :section4="datas.section4" :commodity="newProduct"></v-section4>
        <!-- 新品推荐 -->
        <!--<v-section6></v-section6>-->
        <v-section2 :section2="datas.section2" :quality="quality"></v-section2>
        <!-- 品质推荐 -->
        <v-section3 :brand="brand"></v-section3>
        <!-- 品牌推荐 -->
        <v-section5 :grous="grous"></v-section5>
        <!-- 猜你喜欢 -->
        <div class="line"></div>
        <v-baseline></v-baseline>
      </div>
    <!-- </van-pull-refresh> -->
    </div>

    <!-- 返回顶部按钮 -->
    <div class="back-to-top" @click="backTop" v-show="showBackTop">
      <img src="../../img/index/home/bankToTop.png">
    </div>
    <v-footer :foot="foot"></v-footer>
  </div>
</template>

<script>
import Section2 from "@/components/index/section2.vue";
import Section3 from "@/components/index/section3.vue";
import Section4 from "@/components/index/section4.vue";
import Section5 from "@/components/index/section5.vue";
import Baseline from "@/common/_baseline.vue";
import Msg from "@/components/msg/msgTip.vue";
import Footer from "@/common/_footer.vue";
import { localID } from "@/common/local.js";
import { Toast } from "vant";
// import AMap from 'AMap';
// import Bus from '../bus.js';

export default {
  props: ["aaa"],
  components: {
    // 'v-swiper': Swiper,
    "v-section2": Section2,
    "v-section3": Section3,
    "v-section4": Section4,
    "v-section5": Section5,
    "v-baseline": Baseline,
    "v-footer": Footer,
    "v-msg": Msg
  },
  data() {
    return {
      datas: "",
      toggle: false,
      loading: true,
      isLoading: false,
      hasmsg: false, // 是否有消息
      msgValue: "", //消息数量
      swiper: [],
      newProduct: [], // 新品推荐数据
      quality: [], // 品质推荐数据
      brand: [], // 品牌推荐数据
      districtId: 0, // 区域ID
      shop_id: "",
      show: true,
      type: "tab",
      district: "",
      city: "",
      province: "",
      address_detail: null,
      // center: { lng: 116.40387397, lat: 39.91488908 }
      content: "",
      token: "",
      user_id: "",
      foot: "",
      number: "",
      grous: [], // 猜你喜欢的数据
      size: 12, // 猜你喜欢单页条数
      page: 1, //猜你喜欢当前页码
      lock: false, // 加载更多锁
      showBackTop: false, //返回顶部按钮
      partA: "", // 聚合A
      partB: "", // 聚合B
      partC: "", // 聚合C
      partD: "" // 聚合D
    };
  },

  created() {
    this.foot = 0;
    this.getData();
    // 监听版本更新
    const checkUpdate = sessionStorage.getItem('checkupdate') || false
      if (checkUpdate) {
        return
      } else {
        this.checkVersions()
        sessionStorage.setItem('checkupdate', 2)
      }
  },
  watch: {
    $route: function(to, from) {
      window.scrollTop = 0;
    }
  },

  beforeDestroy() {
    // 销毁监听事件
    // console.log('解除监听1');
    window.removeEventListener("scroll", this.handleScroll);
  },

  mounted() {
    // 监听滚动事件
    window.addEventListener("scroll", this.handleScroll);
    // app login status keep
    const localUrl = window.location.href.split(":");
    if (localUrl[0] == 'file') {
      mui.plusReady(() => {
        // alert(plus.storage.getItem('token'))
        if (plus.storage.getItem('token')) {
          localStorage.setItem('token', plus.storage.getItem('token'))
        } else {
          // alert('没有token')
        }
      })
      // 测试高德定位
      this.amap()
    } else {
      // 加载地点数据
      this.getdistrict();
    }
  },

  methods: {
    // 版本更新
    checkVersions() {
      const localUrl = window.location.href.split(":");
      if (localUrl[0] == 'file') {
        mui.plusReady(() => {
          const versions = plus.runtime.version
          // alert(versions)
          this.$api.get(this.HOME + this.AUTH + 'checkVersions')
            .then(res => {
              if (res.data.status == 200) {
                if (mui.os.ios) {
                  // 苹果系统不允许更新
                  return
                } else {
                  // 安卓系统更新
                  if (versions != res.data.data.versionNumber) {
                    plus.nativeUI.confirm("发现新版本(" + res.data.data.versionNumber + ")，是否立即安装", (event) => {
                      if (event.index == 0) {
                        // alert(res.data.data.download)
                        this.download(res.data.data.download)
                      }
                    }, {}, ["立即更新", "取　　消"])
                  }
                }

              }
            })
        })
      }
    },

    // 下载更新版本
    download(url) {
      Toast('正在下载中……', 3000)
      let dtask = plus.downloader.createDownload(url, {}, (d,status) => {
        // Toast('下载成功')
        if (status == 200) {
          let path = d.filename
          plus.runtime.openFile(path)
        } else {//下载失败
          alert( "下载失败: " + status );
        }
      })
      dtask.start()
    },

    // app高德定位
    amap() {
      if (sessionStorage.getItem("district")) {
        this.district = sessionStorage.getItem("district");
        this.city = sessionStorage.getItem("city");
        this.province = sessionStorage.getItem("province");
        this.getLocalID()
      } else {
          mui.plusReady(() => {
          plus.geolocation.getCurrentPosition((position) => {
            let info = position.address
            this.district = info.district
            this.city = info.city
            this.province = info.province
            this.getLocalID()
          })
        })
      }
    },

    getLocalID() {
      localID(this.province, this.city, this.district).then(res => {
        sessionStorage.setItem("provinceId", res.provinceId);
        sessionStorage.setItem("cityId", res.cityId);
        sessionStorage.setItem("districtId", res.districtId);
        this.getData();
      });
    },

    // 监听滚动事件
    handleScroll() {
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      // 获取滚动高度并判断是否显示返回顶部按钮
      // 获取页面高度
      const insexHight = this.$refs.indexPart.offsetHeight;
      // 获取屏幕高度
      const deviceHight = document.documentElement.clientHeight;
      // alert('insexHight2=' + insexHight + "&&" + deviceHight)
      if (scrollTop > deviceHight) {
        this.showBackTop = true;
      } else {
        this.showBackTop = false;
      }
      // 判断是否要启动触底事件
      const allHeight = scrollTop + deviceHight + 200;
      if (allHeight > insexHight) {
        // 触发触底事件
        // this.getMoreYouLike();
      }
    },

    //加载更多猜你喜欢事件
    getMoreYouLike() {
      if (this.lock) {
        return;
      } else {
        this.lock = true;
        this.page = ++this.page;
        const config = {};
        config.districtId = this.districtId;
        config.size = this.size;
        config.page = this.page;
        const obj = {
          params: { ...config }
        };
        this.$api
          .get(this.HOME + this.SEARCH + "commodity/indexlike", obj)
          .then(res => {
            const arr = res.data.data;
            if (arr.length == 0) {
              // Toast("已经到底啦！");
              this.page = --this.page;
              // this.lock = false;
            } else {
              this.grous = [...this.grous, ...arr];
              this.lock = false;
            }
          })
          .catch(err => {
            console.log(err);
            this.lock = false;
          });
      }
    },

    // 返回顶部
    backTop() {
      const scrollHight = document.documentElement.scrollTop;
      if (scrollHight > 50) {
        // document.documentElement.scrollTop = scrollHight - 40;
        window.scrollTo(0, scrollHight - 40)
        setTimeout(() => {
          this.backTop();
          // console.log('111');
        }, 10);
      } else {
        // document.documentElement.scrollTop = 0;
        window.scrollTo(0, 0)
      }
    },

    toggle1() {
      this.toggle = !this.toggle;
    },
    onRefresh() {
      setTimeout(() => {
        // this.$toast('刷新成功');
        this.isLoading = false;
      }, 500);
    },
    // 获取代理商信息
    getGetAgencyInfo() {
      this.token = localStorage.getItem("Token");
      this.$http
        .get(this.HOME + "/agency/GetAgencyInfo?token=" + this.token)
        .then(res => {
          // console.log(res);
          this.user_id = res.data.Data.Info.user_id;
        });
    },

    getdistrict() {
      var that = this;
      var mapObj = new AMap.Map("iCenter");

      if (sessionStorage.getItem("district")) {
        that.district = sessionStorage.getItem("district");
        that.city = sessionStorage.getItem("city");
        that.province = sessionStorage.getItem("province");
        that.getLocalID()
      } else {
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
            that.district = data.addressComponent.district;
            that.city = data.addressComponent.city;
            that.province = data.addressComponent.province;
            sessionStorage.setItem("province", that.province);
            sessionStorage.setItem("city", that.city);
            sessionStorage.setItem("district", that.district);
            that.getLocalID()
          }

          function onError(data) {
            // console.log(data);
            Toast("定位失败请稍后再试");
          }
        });
      }
    },
    loginEasemob() {
      this.$api.get(this.HOME + this.SEARCH + "user/getmessages").then(res => {
        this.number = res.data.Data.length;
      });
    },
    gomap() {
      this.$router.push({
        path: "/map?name=选择地区"
      });
    },
    loadmap() {
      const map = new AMap.Map("container", {
        zoom: 9
      });
    },
    duihuan() {
      this.$router.push({
        path:
          "/duihuan?name=" + this.partD.title
      });
    },
    member() {
      this.$router.push({
        path:
          "/member?name=" + this.partC.title
      });
    },
    cunpin() {
      this.$router.push({
        path:
          "/cunpin?name=" + this.partB.title
      });
    },
    classify() {
      this.$router.push({
        path:
          "/Ecomarket?name=" + this.partA.title
      });
    },

    // 跳转到商品详情页
    as(url) {
      if (url != '#') {
        this.$router.push({
          path: url
        });
      }
    },
    getdata() {
      this.$api.get(this.HOME + this.SEARCH + "shop/getshopinfo").then(res => {
        this.shop_id = res.data.Data.Info.shop_id;
      });
    },

    // 获取广告代码
    getData() {
      let code = "";
      this.$api.get(this.HOME + this.SEARCH + "ads/findAdsCode").then(res => {
        code = res.data.data[0].code;
        this.getAD(code);
      });
      // 获取猜你喜欢数据
      this.getYouLike();
    },

    // 获取首页广告数据
    getAD(code) {
      this.districtId = sessionStorage.getItem("districtId") || null;
      let obj = {
        params: {
          districtId: this.districtId,
          code: code
        }
      };
      this.$api
        .get(this.HOME + this.SEARCH + "ads/findAdsList", obj)
        .then(res => {
          this.swiper = res.data.data.f1;
          this.newProduct = res.data.data.f6;
          this.quality = res.data.data.f7;
          this.brand = res.data.data.f8;
          this.partA = res.data.data.f2[0];
          sessionStorage.setItem('codeA', res.data.data.f2[0].typeCode)
          this.partB = res.data.data.f3[0];
          sessionStorage.setItem('codeB', res.data.data.f3[0].typeCode)
          this.partC = res.data.data.f4[0];
          sessionStorage.setItem('codeC', res.data.data.f4[0].typeCode)
          this.partD = res.data.data.f5[0];
          sessionStorage.setItem('codeD', res.data.data.f5[0].typeCode)
        })
        .catch(err => {
          // console.log(err.header);
        });
    },

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
    },
    ruzhuIndex() {
      var Token = localStorage.getItem("Token");

      if (Token == null) {
        this.$router.push({
          path: "/login?name=登录"
        });
      } else if (this.shop_id != "") {
        this.$router.push({
          path: "/ruzhu3?name=商家入驻审核情况"
        });
      } else if (this.user_id != 0) {
        this.$router.push({
          path: "/ruzhu3Agent?name=代理商入驻审核情况"
        });
      } else {
        this.$router.push({
          path: "/ruzhuIndex?name=入驻"
        });
      }
    },
    goseek() {
      this.$router.push({
        path: "/Category2"
      });
    },
    car() {
      this.$router.push({
        path: "/car?name=" + "购物车"
      });
    },
    msg() {
      this.$router.push({
        path: "/msg"
      });
    },
    user2() {
      this.$router.push({
        path: "/User2?name=" + "设置"
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import "../assets/fz.less";
@import "../assets/index/style.css";
.service {
  height: 6.5rem;
  width: 100%;
  background-color: red;
  ul {
    display: -webkit-flex;
    display: -ms-flex;
    display: flex;
    height: 9.7rem;
    width: 100%;
    background-color: red;
    li {
      flex: 1;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      span {
        font-size: 0.8rem;
        width: 100%;
        display: inline-block;
        text-align: center;
      }
      i {
        display: flex;
        align-items: flex-end;
        justify-content: center;
        width: 100%;
        height: 4rem;
        padding-bottom: 0.6rem;
        line-height: 6rem;
        text-align: center;
        > img {
          display: block;
          width: 60%;
        }
      }
    }
  }
}

.dropup,
.dropdown {
  position: relative;
  margin: auto 0;
}

.site {
  font-size: 1px;
}

.swiper {
  margin-top: 4.7rem;
  width: 100%;
  .mint-swipe {
    width: 100%;
    height: 50vw;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
}

.line {
  height: 2rem;
}

.head {
  width: 100%;
  height: 4.7rem;
  background-color: #00ae87;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
  .site {
    // width: 50%;
    height: 4.7rem;
    display: flex;
    justify-content: center;
    align-items: center;
    /*      color: #fff;*/
    div {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      color: #fff;
      font-size: 1.2rem;
      .locaImg {
        width: 1.8rem;
        height: 2rem;
        margin-left: 1.6rem;
      }
      .city {
        min-width: 2.4rem;
        margin: 0 0.5rem 0 0.5rem;
      }
      span {
        line-height: 1.2rem;
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
      }
    }
  }
  /*搜索框*/
  .search {
    flex: 1;
    height: 3rem;
    // max-width: 20.6rem;
    position: relative;
    display: flex;
    align-items: center;
    vertical-align: middle;
    .searchImg {
      position: absolute;
      height: 1.1rem;
      width: 1.1rem;
      left: 2rem;
      align-items: center;
    }
    input {
      align-items: center;
      width: 90%;
      padding: 0.7rem 0.4rem 0.7rem 3rem;
      border: none;
      font-size: 1.333rem;
      border-radius: 1.5rem;
      background-color: #fff;
      margin-left: 1rem;
    }
    input::-webkit-input-placeholder {
      color: #999;
      font-size: 1.2rem;
    }
  }

 
  // .msgBtn {
  //   padding: 0 1rem;
  //   position: relative;
  //   .msgImg {
  //     height: 1.5rem;
  //     width: 2rem;
  //   }
  //   .onmsg {
  //     position: absolute;
  //     top: -0.6rem;
  //     right: 0.2rem;
  //     background: red;
  //     height: 1.4rem;
  //     padding: 0 0.4rem;
  //     border-radius: 0.7rem;
  //     font-size: 1rem;
  //     color: #fff;
  //   }
  // }
  /*入驻*/
  // .enter {
  //   width: 2rem;
  //   height: 100%;
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  //   img {
  //     width: 1.2rem;
  //   }
  // }
}
/*专区*/

.content {
  overflow-y: scroll;
  height: calc(100vh - 5rem);
}

.beijing {
  width: 100%;
  height: .7rem;
  z-index: 100;
  position: absolute;
  top: -1.4rem;;
  left: 0;
}
.beijing img {
  height: 100%;
  width: 100%;
}

.monopolyArea {
  width: 100%;
  height: 100%;
  z-index: 100;
  background: #fff;
  // position: relative;
  ul {
    width: 100%;
    height: 100%;
    display: flex;
    background-size: 100% 100%;
    align-items: center;
    li {
      z-index: 199;
      margin-bottom: 10px;
      margin-top: 10px;
      width: 25%;
      text-align: center;
      img {
        width: 50%;
        height: 50%;
      }
      p {
        margin-top: 8px;
        font-size: 1.6rem;
        color: #847e7e;
      }
    }
  }
}

.index {
  width: 100%;
  height: 100%;
  background-color: #f2f2f2;
  display: flex;
  flex-direction: column;
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

// WEBPACK FOOTER // // src/views/Index.vue