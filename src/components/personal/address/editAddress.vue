<template>
  <div class="address">
    <!-- 头部 -->
    <div class="head">
      <div class="head-title">
        <div class="back" @click="$router.go(-1)">
          <img src="../../../../img/index/wallet/back-black.png" alt>
        </div>
        <div class="title">{{title}}</div>
        <div class="add"></div>
      </div>
    </div>

    <!-- 内容区 -->
    <div class="car-head">
      <div class="add-card">
        <div class="add-card-title" v-if="title == '添加收货地址'">请填写你的收获地址</div>
        <div class="add-card-title" v-if="title == '编辑地址'">请修改你的收货地址</div>
        <div class="add-card-area">
          <!-- 收货人 -->
          <div class="bank-item">
            <div class="item-title">收货人</div>
            <input class="item-info" v-model="contact" placeholder="收货人">
            <div class="next-img">
              <!-- <img src="" alt="" /> -->
            </div>
          </div>
          <!-- 手机号码 -->
          <div class="bank-item">
            <div class="item-title">手机号码</div>
            <input class="item-info" v-model="phone" type="number" placeholder="手机号码">
            <div class="next-img">
              <!-- <img src="" alt="" /> -->
            </div>
          </div>
          <!-- 所在地区 -->
          <div class="bank-item">
            <div class="item-title">所在地区</div>
            <div class="f3">
              <div class="item-info" @click="getAddress">
                <span class="text1" v-if="!address">选择地区</span>
                <span class="text2" v-if="address">{{address}}</span>
                <van-icon name="arrow" class="i-vant"/>
              </div>
            </div>
            <div class="next-img"></div>
          </div>
          <!-- 详细地址 -->
          <div class="bank-item">
            <div class="item-title">详细地址</div>
            <input class="item-info" v-model="detailAddress" placeholder="详细地址如街道、门牌号、小区、楼号等">
            <div class="next-img"></div>
          </div>
          <!-- 设置默认、删除区 -->
          <div class="other-item">
            <div class="item-title">设置为默认地址</div>
            <div class="other-title">
              <van-switch
                v-model="isDefault"
                size="2.4rem"
                active-color="#00ae87"
                inactive-color="#eee"
              />
            </div>
          </div>
          <div class="other-item" @click="deleteAddress" v-if="title == '编辑地址'">
            <div class="item-title" style="color: #ff0000;">删除收货地址</div>
            <div class="other-title"></div>
          </div>
        </div>
        <div class="car-confirm">
          <div class="ok-btn" @click="clickAddress">保存</div>
        </div>
      </div>
    </div>

    <!-- 地区选择-弹出层开始-->
    <van-popup v-model="show" position="bottom" :overlay="true">
      <div class="popup_header">
        <strong>请选择</strong>
        <van-icon name="cross" @click="show =!show"/>
      </div>
      <div class="popup_list">
        <van-tabs v-model="active">
          <van-tab :title="provinceName? provinceName:'省会'">
            <div class="p_p_header">选择省会</div>
            <div v-for="(item,index) in provinceList" :key="index">
              <div
                class="p_p_list"
                :class="{p_p_active:activeIndex == index}"
                @click="goCity(index,item)"
              >
                <span>{{item.provinceName}}</span>
                <img src="../../../../img/index/car/yes.png" alt v-if="activeIndex == index">
              </div>
            </div>
          </van-tab>

          <van-tab :title="cityName? cityName : '城市'" v-if="citychange" style="display:none">
            <div class="p_p_header">选择城市</div>
            <div v-for="(item,index) in cityList" :key="index">
              <div
                class="p_p_list"
                :class="{p_p_active:activeIndex2 == index}"
                @click="goDistrict(index,item)"
              >
                <span>{{item.cityName}}</span>
                <img src="../../../../img/index/car/yes.png" alt v-if="activeIndex2 == index">
              </div>
            </div>
          </van-tab>

          <van-tab :title="districtName? districtName : '区域'" v-if="districtchange">
            <div class="p_p_header">选择区域</div>
            <div v-for="(item,index) in districtLite" :key="index">
              <div
                class="p_p_list"
                :class="{p_p_active:activeIndex3 == index}"
                @click="govillage(index,item)"
              >
                <span>{{item.districtName}}</span>
                <img src="../../../../img/index/car/yes.png" alt v-if="activeIndex3 == index">
              </div>
            </div>
          </van-tab>

          <van-tab :title="villageName? villageName : '街道'" v-if="villagechange">
            <div class="p_p_header">选择街道</div>
            <div v-for="(item,index) in villageLite" :key="index">
              <div
                class="p_p_list"
                :class="{p_p_active:activeIndex4 == index}"
                @click="out(index,item)"
              >
                <span>{{item.villageName}}</span>
                <img src="../../../../img/index/car/yes.png" alt v-if="activeIndex4 == index">
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Toast } from "vant";
import { Switch } from "vant";
import { Area } from "vant";
export default {
  components: {},
  data() {
    return {
      editAddress: {}, // 选中的地址
      title: "", // 标题名称
      isDefault: false, // 是否默认
      detailAddress: "", // 地址
      contact: "", //姓名
      phone: "", //手机号
      provinceName: "", //省名称
      provinceId: -1, // 省ID
      cityName: "", //市名称
      cityId: -1, // 市ID
      districtName: "", //区名称
      districtId: -1, // 区ID
      villageId: -1, // 街道ID
      villageName: "", //街道名称
      areaList: [], // 地区列表
      // 弹窗-选择地区
      show: false,
      active: 0,
      // 接口数据
      provinceList: [],
      cityList: [],
      districtLite: [],
      villageLite: [],
      // tab文字变化
      villageName: "",
      // 样式变化
      activeIndex: -1,
      activeIndex2: -1,
      activeIndex3: -1,
      activeIndex4: -1,
      // 控制显示与隐藏
      citychange: false,
      districtchange: false,
      villagechange: false
    };
  },

  created() {
    if (this.$route.query.name == "添加收货地址") {
      this.title = "添加收货地址";
    } else if (this.$route.query.name == "编辑地址") {
      this.title = "编辑地址";
      const info = JSON.parse(window.sessionStorage.getItem("editAddress"));
      this.editAddress = info;
      this.contact = info.contact;
      this.detailAddress = info.detailAddress;
      this.phone = info.phone;
      this.isDefault = info.isDefault;
      this.provinceName = info.provinceName;
      this.provinceId = info.provinceId;
      this.cityName = info.cityName;
      this.cityId = info.cityId;
      this.districtName = info.districtName;
      this.districtId = info.districtId;
    }
  },

  methods: {
    // 删除地址
    deleteAddress() {
      // console.log(this.editAddress.addressId);
      const id = this.editAddress.addressId;
      this.$api
        .get(
          this.HOME +
            this.ORDER +
            "inside/address/deleteUserAddress?addressId=" +
            id
        )
        .then(res => {
          Toast("删除成功");
          if (this.$route.query.type == '选择地址') {
            this.$router.replace({
              path: "/shipping?name=选择地址"
            });
          } else if (this.$route.query.type == '选择吃鸡地址') {
            this.$router.replace({
              path: "/shipping?name=选择吃鸡地址"
            });
          } else {
            this.$router.replace({
              path: "/shipping?name=收货地址"
            });
          }
        });
    },

    // 添加修改收货地址
    clickAddress() {
      if (this.phone.length != 11) {
        Toast("请输入正确的手机号码");
      }
      // let myreg = /^[1][0-9]{10}$/;
      // if (!myreg.test(this.phone)) {
      //   Toast("手机号码输入有误，请重新输入");
      // }
      else if (this.contact.length == 0) {
        Toast("请输入收货人");
      } else if (this.address.length == 0) {
        Toast("请选择所在地区");
      } else if (this.detailAddress.length == 0) {
        Toast("请填写详细地址");
      } else {
        let config = {};
        let url = "";
        if (this.title == "编辑地址") {
          config = {
            addressId: this.editAddress.addressId,
            provinceId: this.provinceId,
            cityId: this.cityId,
            districtId: this.districtId,
            detailAddress: this.detailAddress,
            isDefault: this.isDefault,
            contact: this.contact,
            phone: this.phone,
            provinceName: this.provinceName,
            cityName: this.cityName,
            districtName: this.districtName
          };
          url = "inside/address/updateUserAddress";
        } else if (this.title == "添加收货地址") {
          config = {
            provinceId: this.provinceId,
            cityId: this.cityId,
            districtId: this.districtId,
            detailAddress: this.detailAddress,
            isDefault: this.isDefault,
            contact: this.contact,
            phone: this.phone,
            provinceName: this.provinceName,
            cityName: this.cityName,
            districtName: this.districtName
          };
          url = "inside/address/insertUserAddress";
        }
        this.$api.post(this.HOME + this.ORDER + url, config).then(res => {
          if (res.data.status == 200) {
            if (this.title == "添加收货地址") {
              Toast("添加地址成功", 2000);
            } else {
              Toast("修改地址成功", 2000);
            }
            this.$router.replace({
              path: "/shipping?name=" + this.$route.query.type
            });
          } else {
            Toast(res.data.msg);
          }
        });
      }
    },

    // 获取省份
    getProvince() {
      this.$api.get(this.LOCAL + "/api/getProvinceList").then(res => {
        if (res.status == 200) {
          this.provinceList = res.data;
        } else {
          alert(res.body.msg);
        }
      });
    },
    // 获取城市
    getCity(id) {
      this.cityId = -1;
      this.districtId = -1;
      this.villageId = -1;
      this.cityList = [];
      this.districtLite = [];
      this.villageLite = [];
      this.$api.get(this.LOCAL + "/api/getCityList/" + id).then(res => {
        if (res.status == 200) {
          this.cityList = res.data;
        } else {
          alert(res.body.msg);
        }
      });
    },
    // 获取地区
    getDistrict(id) {
      this.districtId = -1;
      this.villageId = -1;
      this.districtLite = [];
      this.villageLite = [];
      this.$api.get(this.LOCAL + "/api/getDistrictList/" + id).then(res => {
        if (res.status == 200) {
          this.districtLite = res.data;
          this.active += 1;
        } else {
          alert(res.body.msg);
        }
      });
    },
    // 获取街道
    getVillage(id) {
      this.villageId = -1;
      this.villageLite = [];
      this.$api.get(this.LOCAL + "/api/getVillage/" + id).then(res => {
        if (res.status == 200) {
          this.villageLite = res.data;
          this.active += 1;
        } else {
          alert(res.body.msg);
        }
      });
    },

    getAddress() {
      this.show = !this.show;
      this.getProvince();
    },
    goCity(i, val) {
      this.activeIndex = i;
      this.provinceName = val.provinceName;
      this.provinceId = val.provinceId;
      this.cityName = "";
      this.districtName = "";
      this.villageName = "";
      this.getCity(val.provinceId);
      this.citychange = true;
      this.active += 1;
    },
    goDistrict(i, val) {
      this.activeIndex2 = i;
      this.cityName = val.cityName;
      this.cityId = val.cityId;
      this.districtName = "";
      this.villageName = "";
      this.getDistrict(val.cityId);
      this.districtchange = true;
      const that = this;
      // setTimeout(function() {
      //   that.active += 1;
      // }, 500);
    },
    govillage(i, val) {
      this.activeIndex3 = i;
      this.districtName = val.districtName;
      this.districtId = val.districtId;
      this.villageName = "";
      this.getVillage(val.districtId);
      this.villagechange = true;
      const that = this;
      // setTimeout(function() {
      //   that.active += 1;
      // }, 500);
    },
    out(i, val) {
      this.activeIndex4 = i;
      this.villageName = val.villageName;
      this.villageId = val.villageId;
      this.show = !this.show;
    }
  },

  computed: {
    address() {
      let a = "";
      if (!this.provinceName) {
        return a;
      } else if (!this.cityName) {
        return (a = this.provinceName);
      } else if (!this.districtName) {
        return (a = this.provinceName + "-" + this.cityName);
      } else if (!this.villageName) {
        return (a =
          this.provinceName + "-" + this.cityName + "-" + this.districtName);
      } else {
        return (a =
          this.provinceName +
          "-" +
          this.cityName +
          "-" +
          this.districtName +
          "-" +
          this.villageName);
      }
    }
  }
};
</script>
<style scoped lang='less'>
.address {
  width: 100%;
  height: 100vh;
  background: #f2f2f2;

  // 头部
  .head {
    width: 100%;
    height: 4.7rem;
    display: flex;
    // position: fixed;
    // top: 0;
    // left: 0;
  }
  .head-title {
    height: 4.7rem;
    background: #fff;
    width: 100%;
    display: flex;
    justify-content: space-between;
    line-height: 4.7rem;
    .back {
      height: 1.6rem;
      width: 4rem;
      padding: 0 1.5rem;
      margin-left: 0.6rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .title {
      font-size: 1.8rem;
      color: #333;
    }
    .add {
      height: 1.6rem;
      width: 4rem;
      padding: 0 1.2rem;
      margin-right: 0.6rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  // banner内容
  .car-head {
    width: 100%;
    // padding: 1.5rem;
    .add-card {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      .add-card-title {
        font-size: 1.5rem;
        color: #999;
        height: 4.5rem;
        line-height: 4.5rem;
        margin-left: 1.5rem;
      }
      .add-card-area {
        display: flex;
        flex-direction: column;
        background: #fff;
        .bank-item {
          display: flex;
          height: 4.5rem;
          // justify-content: space-between;
          align-items: center;
          padding: 0 1.5rem;
          border-bottom: 1px solid #f2f2f2;
          .item-title {
            display: none;
            flex: 2;
            font-size: 1.5rem;
            color: #333;
          }
          .item-info {
            flex: 5;
            font-size: 1.5rem;
            color: #333;
          }
          .item-info::-webkit-input-placeholder {
            font-size: 1.5rem;
            color: #999;
          }
          .next-img {
            flex: 1;
            height: 1.1rem;
            width: 0.6rem;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }

    // 设置默认、删除区
    .other-item {
      display: flex;
      height: 5.5rem;
      justify-content: space-between;
      align-items: center;
      padding: 0 1.5rem;
      border-top: 1rem solid #f2f2f2;
      .other-title {
        height: 2.4rem;
      }
    }

    .car-confirm {
      height: 4.4rem;
      width: 100%;
      margin: 2rem 0;
      display: flex;
      justify-content: center;
      .ok-btn {
        height: 100%;
        width: 28rem;
        background: #00b88f;
        color: #fff;
        font-size: 1.6rem;
        line-height: 4.4rem;
        border-radius: 6px;
        text-align: center;
      }
    }
  }

  // 地区选择-弹出层css
  .popup_header {
    width: 100%;
    padding: 1rem 0;
    text-align: center;
    font-size: 1.6rem;
    color: #333333;
    position: relative;
    i {
      position: absolute;
      top: 1rem;
      right: 1.5rem;
    }
  }
  .popup_list {
    /deep/ [class*="van-hairline"]::after {
      border: none;
    }
    /deep/.van-tabs__wrap {
      height: 3.4rem;
      padding-left: 1.5rem;
      border-bottom: 0.1rem solid #f2f2f2;
      .van-tab {
        -webkit-box-flex: none;
        -webkit-flex: none;
        flex: none;
        font-size: 1.5rem;
        margin-right: 1rem;
      }
      .van-tabs__line {
        height: 0.1rem;
        width: 30px;
        padding: 0;
        background-color: #00ae87;
      }
    }

    /deep/.van-tabs__content {
      height: 30rem;
      padding-left: 1.6rem;
      overflow: scroll;
      .p_p_header {
        font-size: 1.3rem;
        margin: 1.6rem 0rem;
      }
      .p_p_list {
        font-size: 1.5rem;
        margin-bottom: 2.4rem;
        color: #333333;
        position: relative;
        img {
          width: 5%;
          position: absolute;
          right: 3rem;
        }
      }
      .p_p_active {
        color: #00ae87;
      }
    }
  }

  // 地址选择栏的样式
  .f3 {
    width: 100%;
    .item-info {
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: space-between;
      .text1 {
        font-size: 1.3rem;
        color: #999;
      }
      .text2 {
        font-size: 1.3rem;
        color: #333;
      }
    }
  }
}
</style>
