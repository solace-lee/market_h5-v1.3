<template>
  <div style="height: 100%;">
    <!-- 头部搜索开始 -->
    <div class="head-search">
      <!-- <div class="site" @click="gomap">
        <div>
          <img class="locaImg" src="../../../img/index/search/dingwei.png">
          <span style="border: 0" class="city" v-if="city">{{city.substring(0, city.length-1)}}</span>
          <span v-if="district">{{district.substring(0, district.length-1)}}</span>
        </div>
      </div>-->
      <div class="search">
        <img class="searchImg" src="../../../img/index/search/search-2.png">
        <input type="text" placeholder="更多好货助力" @click="goseek">
      </div>
      <div class="msgBtn" @click="msg">
        <v-msg></v-msg>
        <!-- <img class="msgImg" src="../../../img/index/search/msg.png">
        <div class="onmsg" v-show="hasmsg">{{msgValue}}</div>-->
      </div>
    </div>
    <!--//	头部搜索结束-->
    <div class="categories_content">
      <!-- 一级分类 -->
      <div class="categories_list" ref="menuWrapper">
        <van-badge-group :active-key="activeKey">
          <van-badge
            :title="item.classifyName"
            @click="onClick"
            v-for="(item,index) in categoryList"
            :key="index"
          ></van-badge>
          <div style="height:9.7rem;"></div>
        </van-badge-group>
      </div>

      <!-- 二级分类 -->
      <div class="categories_box" ref="foodsWarpper">
        <div class="contentsbigBox">
          <div class="goods-item" v-for="(item2,index) in secondlist" :key="index">
            <div class="second-title">
              {{item2.classifyName}}
              <div class="second-title-img"></div>
            </div>

            <!-- 三级分类 -->
            <div class="contents">
              <div
                class="list"
                v-for="(item3,index) in item2.child"
                :key="index"
                @click="tochecklist(item3)"
              >
                <div class="imgbox">
                  <img :src="item3.classifyImgUrl" alt>
                </div>
                <div class="name">{{item3.classifyName}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <v-footer :foot="foot"></v-footer>
  </div>
</template>

<script>
import Scroll from "better-scroll";
import Footer from "@/common/_footer.vue";
import { localID } from "@/common/local.js";
import Msg from "@/components/msg/msgTip.vue";

export default {
  components: {
    "v-footer": Footer,
    "v-msg": Msg
  },
  data() {
    return {
      activeKey: 0,
      cut: [],
      categoryList: [],
      secondlist: [],
      category: [],
      id: "",
      foot: "",
      hasmsg: false, // 是否有消息
      msgValue: "99+", //消息数量
      district: "",
      city: "",
      province: "",
      all: {
        status: 200,
        msg: "OK",
        data: [
          {
            id: 1000,
            classifyName: "生态市场",
            classifyLevel: 1,
            classifyCode: "10000",
            classifyImgUrl:
              "https://new.zhulixc.com/api/upload/image/2019-04-24/png/d379ada641184f29b24c9ef46da682da-thumbnail.png",
            preClassifyId: 0,
            classifySort: 1,
            createTime: "2019-04-23T21:59:32.000+0000"
          },
          {
            id: 633,
            classifyName: "粮油副食",
            classifyLevel: 1,
            classifyCode: "00003",
            classifyImgUrl:
              "https://new.zhulixc.com/api/upload/image/2019-04-24/png/d379ada641184f29b24c9ef46da682da-thumbnail.png",
            preClassifyId: 0,
            classifySort: 2
          },
          {
            id: 74,
            classifyName: "营养保健",
            classifyLevel: 1,
            classifyCode: "00004",
            classifyImgUrl:
              "https://new.zhulixc.com/api/upload/image/2019-04-24/png/d379ada641184f29b24c9ef46da682da-thumbnail.png",
            preClassifyId: 0,
            classifySort: 3
          },
          {
            id: 404,
            classifyName: "个护化妆",
            classifyLevel: 1,
            classifyCode: "00006",
            classifyImgUrl:
              "https://new.zhulixc.com/api/upload/image/2019-04-24/png/d379ada641184f29b24c9ef46da682da-thumbnail.png",
            preClassifyId: 0,
            classifySort: 5
          },
          {
            id: 133,
            classifyName: "居家日用",
            classifyLevel: 1,
            classifyCode: "00007",
            classifyImgUrl:
              "https://new.zhulixc.com/api/upload/image/2019-04-24/png/d379ada641184f29b24c9ef46da682da-thumbnail.png",
            preClassifyId: 0,
            classifySort: 6
          },
          {
            id: 567,
            classifyName: "手机数码",
            classifyLevel: 1,
            classifyCode: "00011",
            classifyImgUrl:
              "https://new.zhulixc.com/api/upload/image/2019-04-24/png/d379ada641184f29b24c9ef46da682da-thumbnail.png",
            preClassifyId: 0,
            classifySort: 10
          }
        ]
      },
      a: {
        status: 200,
        msg: "OK",
        data: [
          {
            id: 2000,
            classifyCode: "100001",
            classifyName: "精品肉类",
            child: [
              {
                id: 4001,
                classifyName: "肉禽",
                classifyLevel: 2,
                classifyCode: "0000111",
                classifyImgUrl:
                  "https://new.zhulixc.com/api/upload/image/2019-05-18/jpg/2fe943a1da1543f8818e307347bfd056-thumbnail.jpg",
                preClassifyId: 2000,
                classifySort: 1,
                createTime: "2019-04-24T01:21:39.000+0000"
              }
            ]
          },
          {
            id: 4000,
            classifyCode: "100003",
            classifyName: "五谷杂粮",
            child: [
              {
                id: 4003,
                classifyName: "杂粮",
                classifyLevel: 3,
                classifyCode: "0000131",
                classifyImgUrl:
                  "https://new.zhulixc.com/api/upload/image/2019-05-18/jpg/71371646fb544eba94faa20624d8878a-thumbnail.jpg",
                preClassifyId: 4000,
                classifySort: 1,
                createTime: "2019-04-24T01:54:53.000+0000"
              }
            ]
          }
        ]
      },

      b: {
        status: 200,
        msg: "OK",
        data: [
          {
            id: 634,
            classifyName: "食用油",
            child: [
              {
                id: 645,
                classifyName: "其他油",
                classifyLevel: 3,
                classifyCode: "3537345",
                classifyImgUrl:
                  "https://new.zhulixc.com/api/upload/image/2019-05-18/jpg/354a4482e9624a49b6c50f3f374cf5ac-thumbnail.jpg",
                preClassifyId: 634,
                classifySort: 0
              }
            ]
          }
        ]
      },
      c: {
        status: 200,
        msg: "OK",
        data: [
          {
            id: 75,
            classifyName: "营养健康",
            child: [
              {
                id: 79,
                classifyName: "缓解疲劳",
                classifyLevel: 3,
                classifyCode: "7896753",
                classifyImgUrl:
                  "https://new.zhulixc.com/api/upload/image/2019-05-15/jpg/637d97294b344fcf9faa45f7c6c0c8aa-thumbnail.jpg",
                preClassifyId: 75,
                classifySort: 0
              }
            ]
          }
        ]
      },
      d: {
        status: 200,
        msg: "OK",
        data: [
          {
            id: 405,
            classifyName: "面部护肤",
            child: [
              {
                id: 412,
                classifyName: "套装",
                classifyLevel: 3,
                classifyCode: "6236732452",
                classifyImgUrl:
                  "https://new.zhulixc.com/api/upload/image/2019-05-17/jpg/54368d378e30414aa67b58510ccec1d6-thumbnail.jpg",
                preClassifyId: 405,
                classifySort: 0
              }
            ]
          }
        ]
      },
      e: {
        status: 200,
        msg: "OK",
        data: [
          {
            id: 157,
            classifyName: "家居家纺",
            child: [
              {
                id: 159,
                classifyName: "被子",
                classifyLevel: 3,
                classifyCode: "2466234",
                classifyImgUrl:
                  "https://new.zhulixc.com/api/upload/image/2019-05-15/jpg/f08e60aadb7a45339a639a03e4748428-thumbnail.jpg",
                preClassifyId: 157,
                classifySort: 0
              }
            ]
          }
        ]
      },
      f: {
        status: 200,
        msg: "OK",
        data: [
          {
            id: 568,
            classifyName: "手机",
            child: [
              {
                id: 569,
                classifyName: "智能手机",
                classifyLevel: 3,
                classifyCode: "22634",
                classifyImgUrl:
                  "https://new.zhulixc.com/api/upload/image/2019-05-17/jpg/a5fd8396d2e74f188c794e7ba2696c70-thumbnail.jpg",
                preClassifyId: 568,
                classifySort: 0
              }
            ]
          }
        ]
      }
    };
  },

  watch: {
    id() {}
  },

  mounted() {
    // 加载地点数据
    this.getdistrict();
  },

  created() {
    this.getcategoryList();
    this.foot = 1;
  },
  methods: {
    gomap() {
      this.$router.push({
        path: "/map?name=选择地区"
      });
    },

    goseek() {
      this.$router.push({
        path: "/Category2"
      });
    },

    msg() {
      this.$router.push({
        path: "/msg"
      });
    },

    getcategoryList() {
      this.$api
        .post(this.HOME + this.SEARCH + "commodityClassify/oneClassifyLevel")
        .then(res => {
          this.categoryList = res.data.data;
          this.categoryList = this.all.data; //隐藏
          this.id = this.categoryList[0].id;
          const index = window.sessionStorage.getItem("typeIndex") || false;
          if (index) {
            this.onClick(index);
          } else {
            this.getsecondlist(this.id);
          }
        });
    },
    getsecondlist(id) {
      this.$api
        .get(
          this.HOME +
            this.SEARCH +
            "commodityClassify/findByPreClassifyId?prcClassifyId=" +
            id
        )
        .then(res => {
          this.secondlist = res.data.data;
          if (id == 1000) {
            this.secondlist = this.a.data;
          } else if (id == 633) {
            this.secondlist = this.b.data;
          } else if (id == 74) {
            this.secondlist = this.c.data;
          } else if (id == 404) {
            this.secondlist = this.d.data;
          } else if (id == 133) {
            this.secondlist = this.e.data;
          } else if (id == 567) {
            this.secondlist = this.f.data;
          }
        });
    },
    onClick(key) {
      window.sessionStorage.setItem("typeIndex", key);
      this.activeKey = key;
      var id = this.categoryList[key].id;
      this.getsecondlist(id);
    },

    tochecklist(item) {
      this.$router.push({
        path: "/Category2?key=" + item.classifyName + "&id=" + item.id
      });
    },

    getdistrict() {
      var that = this;
      var mapObj = new AMap.Map("iCenter");

      if (sessionStorage.getItem("district")) {
        that.district = sessionStorage.getItem("district");
        that.city = sessionStorage.getItem("city");
        that.province = sessionStorage.getItem("province");
        localID(that.province, that.city, that.district).then(res => {
          sessionStorage.setItem("provinceId", res.provinceId);
          sessionStorage.setItem("cityId", res.cityId);
          sessionStorage.setItem("districtId", res.districtId);
          // that.getData();
        });
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
            localID(that.province, that.city, that.district).then(res => {
              sessionStorage.setItem("provinceId", res.provinceId);
              sessionStorage.setItem("cityId", res.cityId);
              sessionStorage.setItem("districtId", res.districtId);
              // that.getData();
            });
          }

          function onError(data) {
            // console.log(data);
          }
        });
      }
    }
  }
};
</script>

<style scoped lang="less">
.head-search {
  width: 100%;
  height: 4.7rem;
  background-color: #00ae87;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
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
      }
    }
  }
  /*搜索框*/
  .search {
    // flex: 1;
    width: 100%;
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
      width: 100%;
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
  .msgBtn {
    // padding-right: 1rem;
    position: relative;
    .msgImg {
      height: 1.5rem;
      width: 2rem;
    }
    .onmsg {
      position: absolute;
      top: -0.6rem;
      right: 0.2rem;
      background: red;
      height: 1.4rem;
      padding: 0 0.4rem;
      border-radius: 0.7rem;
      font-size: 1rem;
      color: #fff;
    }
  }
}

.categories_content {
  display: flex;
  height: calc(100vh - 9.7rem);
  margin-top: 4.7rem;
  width: 100%;
}
.categories_list {
  flex: 1;
  overflow: hidden;
  overflow-y: scroll;
}

.categories_box {
  flex: 3;
  // height: 100vh;
  overflow: hidden;
  overflow-y: scroll;
}
.contentsbigBox {
  // margin-left: 85px;
}

.titlebox {
  text-align: center;
}

.goods-item {
  margin-left: 8px;
  margin-top: 6px;
  /* display: flex; */
  padding: 5px 8px;
  background-color: #fff;
  .second-title {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 1.5rem;
    color: #666;
    width: 100%;
    height: 34px;
    line-height: 36px;
    font-weight: bold;
    border-bottom: 0.1rem solid #eee;
  }
}
a:hover,
a:focus {
  color: #00b28a;
  text-decoration: none;
}

.name {
  width: 95%;
  padding: 0.3rem 0;
  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 1.2rem;
  color: #999;
}

.contents {
  font-size: 0.9rem;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

.list {
  padding: 1rem 0;
  width: 32%;
  // margin: 0 0.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.imgbox {
  width: 7rem;
  margin: 0 0.3rem 0.5rem 0.3rem;
  height: 7rem;
  overflow: hidden;
  text-align: center;
}

.imgbox > img {
  width: 100%;
  height: 100%;
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
}
</style>