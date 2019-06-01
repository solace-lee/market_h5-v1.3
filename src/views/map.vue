<template>
  <div>
    <!-- 头部 -->
    <div class="headers">
      <div class="back_btn" @click="$router.go(-1)">
        <van-icon name="arrow-left" />
      </div>
      <div class="title">选择地区</div>
      <div class="back_btn"></div>
    </div>

    <div class="line" style="height:4.7rem;"></div>

    <!-- 隐藏区 -->
    <div class="part_area" ref="topArea" v-show="selectProvinceId == -1">

      <!-- 搜索 -->
      <div class="search_area">
        <div class="search">
          <img class="search_img" src="../../img/index/home/search.png">
          <input type="text" v-model="searchValue" value="searchValue" placeholder="请输入县区名"/>
          <img class="search_img" v-show="searchValue!=''" @click="cleanInput" src="../../img/index/personal/delet.png">
        </div>
        <div class="result_area" v-if="showSearchResult">
          <div class="result_list" v-for="(i, index) in searchResultList" :key="index" @click="searchChoose(i)">{{i.provinceName}}{{i.cityName}}{{i.districtName}}</div>
          <div class="no_result" v-show="noResult">抱歉，未能搜索到相关位置，请修改后重新输入</div>
        </div>
      </div>

      <!-- 当前位置 -->
      <div class="now_location">
        <div class="title_area">当前位置</div>
        <div class="get_location">
          <div class="icon_area">
            <img src="../../img/index/search/arrow.png" alt="">
          </div>
          <div class="location_info" @click="chooseAuto">
            <div class="province_name">{{province}}</div>
            <div class="city_name">{{city}}</div>
            <div class="district_name">{{district}}</div>
          </div>
          <div class="get_btn" @click="getAutoLocal">重新定位</div>
        </div>
      </div>

      <!-- 最近搜索 -->
      <div class="recent" v-if="history.length !== 0">
        <div class="recent_area">最近搜索</div>
        <div class="recent_list">
          <div class="recent_item" v-for="(i, index) in history" :key="index" @click="searchChoose(i)">{{i.provinceName}}{{i.cityName}}{{i.districtName}}</div>
        </div>
      </div>
      <div class="choose_title">选择省份/地区</div>

    </div>

    

    <!-- 选择区域 -->
      <div class="selet_area" v-show="selectProvinceId != -1">
        <div class="select_item" @click="handleClickProvince">{{selectProvince}}</div>
        <div class="select_item" v-if="selectCityId != -1" @click="handleClickCity">{{selectCity}}</div>
        <div class="select_item_green" v-else>请选择城市</div>
        <div class="select_item" v-if="selectDistrictId != -1">{{selectDistrict}}</div>
        <div class="select_item_green" v-if="selectDistrictId == -1 && selectCityId != -1">请选择县区</div>
      </div>

      <div class="select_comtainer" ref="bottomArea">

      <!-- 选择省 -->
      <div class="choose_area" v-show="selectProvinceId == -1">
        <!-- <div class="choose_title">选择省份/地区</div> -->
        <div class="choose_list">
          <div class="item_info" v-for="(i, index) in provinceList" :key="index" @click="selectedProvince(i)">
            <div class="info_left">
              <div class="info_title">{{i.initial}}</div>
              <div :class="selectProvinceId==i.provinceId ? 'info_name_active' : 'info_name'">{{i.provinceName}}</div>
            </div>
            <div class="choose">
              <img v-show="selectProvinceId==i.provinceId" src="../../img/index/search/check.png" alt="">
            </div>
          </div>
        </div>
      </div>

      <!-- 选择市 -->
      <div class="choose_area" v-show="selectProvinceId != -1 && selectCityId == -1">
        <div class="choose_list">
          <div class="item_info" v-for="(i, index) in cityList" :key="index" @click="selectedCity(i)">
            <div class="info_left">
              <div class="info_title">{{i.initial}}</div>
              <div :class="selectCityId==i.cityId ? 'info_name_active' : 'info_name'">{{i.cityName}}</div>
            </div>
            <div class="choose">
              <img v-show="selectCityId==i.cityId" src="../../img/index/search/check.png" alt="">
            </div>
          </div>
        </div>
      </div>

      <!-- 选择区域 -->
      <div class="choose_area" v-show="selectCityId != -1">
        <div class="choose_list">
          <div class="item_info" v-for="(i, index) in districtList" :key="index" @click="selectedDistrict(i)">
            <div class="info_left">
              <div class="info_title">{{i.initial}}</div>
              <div :class="selectDistrictId==i.districtId ? 'info_name_active' : 'info_name'">{{i.districtName}}</div>
            </div>
            <div class="choose">
              <img v-show="selectDistrictId==i.districtId" src="../../img/index/search/check.png" alt="">
            </div>
          </div>
        </div>
        <div class="ok_btn">
          <div class="btn_btn" @click="confirm">确定</div>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
import Header from "@/common/_header.vue";
import { Toast } from "vant";
import { localID } from "@/common/local.js";

export default {
  components: {
    "v-header": Header
  },
  data() {
    return {
      searchValue: '', // 搜索的地点
      searchResultList: [], // 搜索的结果列表
      history: [], // 历史记录列表
      showSearchResult: false, // 是否显示搜索结果
      noResult: false, // 没有搜索结果时展示
      // 自动定位
      province: '', // 省
      city: '', // 市
      district: '', // 区
      provinceId: '', // 省
      cityId: '', // 市
      districtId: '', // 区
      // 点选区域
      selectProvince: '', // 省
      selectCity: '', // 市
      selectDistrict: '', // 区
      selectProvinceId: -1, // 省
      selectCityId: -1, // 市
      selectDistrictId: -1, // 区
      provinceList: [], // 省列表
      cityList: [], // 市列表
      districtList: [], // 区列表
    }
  },
  watch: {
    searchValue() {
      if (this.searchValue == '') {
        this.showSearchResult = false
      } else {
        this.getSearchResult()
      }
      // 根据输入实时搜索
    }
  },
  created() {
    // 读取历史搜索
    this.getHistory()
    
    // 获取所有省份
    this.getProvinceList()
    const localUrl = window.location.href.split(":");
    if (localUrl[0] == 'file') {
      mui.plusReady(() => {
        this.amap()
      })
    } else {
      // 自动定位
      this.getAutoLocal()
    }
  },
  updated() {
    // 计算高度
      this.calcHight()
  },
  methods: {
    // app高德定位
    amap() {
      this.province = '正在定位请稍后……'
      this.city = ''
      this.district = ''
      Toast('正在获取当前位置')
      mui.plusReady(() => {
        plus.geolocation.getCurrentPosition((position) => {
          let info = position.address
          this.district = info.district
          this.city = info.city
          this.province = info.province
          this.getLocalID()
        }, (err) => {
          console.log('定位失败，请手动选择')
          this.province = '定位失败，请手动选择地区'
          this.city = ''
          this.district = ''
        })
      })
    },

    getLocalID() {
      localID(this.province, this.city, this.district).then(res => {
        this.provinceId = res.provinceId
        this.cityId = res.cityId
        this.districtId = res.districtId
        Toast('自动定位成功')
      });
    },

    // 计算高度
    calcHight() {
      let x = this.$refs.topArea.offsetHeight
      if (this.selectProvinceId != -1) {
        this.$refs.bottomArea.style.height= 'calc(100vh - 10.4rem - '+ x/10 + 'rem)'
      } else {
        this.$refs.bottomArea.style.height= 'calc(100vh - 4.7rem - '+ x/10 + 'rem)'
      }
      
      
    },
    getSearchResult() {
      // 获取搜索结果
      this.$api.get(this.LOCAL + '/api/getAddressList?name=' + this.searchValue)
      .then((res) => {
        this.searchResultList = res.data.data
        this.showSearchResult = true
        if (this.searchResultList.length == 0) {
          this.noResult = true
        } else {
          this.noResult = false
        }
      })
    },

    // 点中搜索结果
    searchChoose(item) {
      sessionStorage.setItem('province', item.provinceName)
      sessionStorage.setItem('provinceId', item.provinceId)
      sessionStorage.setItem('city', item.cityName)
      sessionStorage.setItem('cityId', item.cityId)
      sessionStorage.setItem('district', item.districtName)
      sessionStorage.setItem('districtId', item.districtId)
      let historyItem = {
        provinceName: item.provinceName,
        provinceId: item.provinceId,
        cityName: item.cityName,
        cityId: item.cityId,
        districtName: item.districtName,
        districtId: item.districtId,
      }
      this.saveHistory(historyItem)
      this.$router.go(-1)
    },

    // 存储搜索历史记录
    saveHistory(value) {
      let history = localStorage.getItem("location") || false;
      let text = [];
      if (history) {
        text = JSON.parse(history)
        text.forEach((element, index) => {
          if (element.districtId == value.districtId) {
            text.splice(index, 1)
          }
        })
        text.unshift(value);
        if (text.length > 5) {
          text.pop();
        }
      } else {
        text.push(value);
      }
      const item = JSON.stringify(text)
      localStorage.setItem("location", item);
    },

    // 获取搜索历史记录
    getHistory() {
      const history = localStorage.getItem('location') || false
      if (history) {
        this.history = JSON.parse(history)
      }
    },

    // 清除输入框
    cleanInput() {
      this.searchValue = ''
      this.showSearchResult = false
    },

    // 获取自动定位
    getAutoLocal() {
      const localUrl = window.location.href.split(":");
      if (localUrl[0] == 'file') {
        this.amap()
        return
      }
      this.province = '正在定位请稍后……'
      this.city = ''
      this.district = ''
      Toast('正在获取当前位置')
      let that = this
      let mapObj = new AMap.Map('iCenter')
      mapObj.plugin('AMap.Geolocation', function () {
        let geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000
        })
        geolocation.getCurrentPosition()
        AMap.event.addListener(geolocation, 'complete', onComplete)
        AMap.event.addListener(geolocation, 'error', onError)

        function onComplete (data) {
          // data是具体的定位信息
          that.province = data.addressComponent.province
          that.city = data.addressComponent.city
          that.district = data.addressComponent.district
          localID(that.province, that.city, that.district).then((res) => {
            that.provinceId = res.provinceId
            that.cityId = res.cityId
            that.districtId = res.districtId
            Toast('自动定位成功')
          })
        }
        function onError (data) {
          console.log('定位失败，请手动选择')
          this.province = '定位失败，请手动选择地区'
          this.city = ''
          this.district = ''
        }
      })
    },

    // 选择自动定位的地点
    chooseAuto() {
      if (!this.districtId) {
        Toast('当前区域不在运营区，请手动选择地区')
        return
      }
      sessionStorage.setItem('province', this.province)
      sessionStorage.setItem('city', this.city)
      sessionStorage.setItem('district', this.district)
      sessionStorage.setItem("provinceId", this.provinceId);
      sessionStorage.setItem("cityId", this.cityId);
      sessionStorage.setItem("districtId", this.districtId);
      this.$router.go(-1)
    },


    // 点选地区方法（获取省列表）
    getProvinceList() {
      this.$api.get(this.LOCAL + '/api/getProvinceList')
      .then((res) => {
          this.provinceList = res.data
          // 去除重复字母
          let keys = []
          this.provinceList.forEach((element, index) => {
            let obj = {}
            const key = element.initial
            if (keys.indexOf(key) != -1) {
              element.initial = ''
            } else {
              keys.push(key)
            }
          })
      })
    },

    // 选择省
    selectedProvince(item) {
      this.getCityList(item.provinceId)
      this.selectProvince = item.provinceName
      this.selectProvinceId = item.provinceId
    },

    // 点击选中的省份
    handleClickProvince() {
      this.selectProvince = ''
      this.selectProvinceId = -1
      this.selectCity = ''
      this.selectCityId = -1
      this.selectDistrict = ''
      this.selectDistrictId = -1
    },

    // 点击了选择的城市
    handleClickCity() {
      this.selectCity = ''
      this.selectCityId = -1
      this.selectDistrict = ''
      this.selectDistrictId = -1
    },

    // 获取城市列表
    getCityList(provinceId) {
      this.$api.get(this.LOCAL + '/api/getCityList/' + provinceId)
      .then((res) => {
        this.cityList = res.data
        // 去除重复字母
        let keys = []
        this.cityList.forEach((element, index) => {
          let obj = {}
          const key = element.initial
          if (keys.indexOf(key) != -1) {
            element.initial = ''
          } else {
            keys.push(key)
          }
        })
      })
    },

    // 选择市
    selectedCity(item) {
      this.getDistrictList(item.cityId)
      this.selectCity = item.cityName
      this.selectCityId = item.cityId
    },

    // 获取县区列表
    getDistrictList(cityId) {
      this.$api.get(this.LOCAL + '/api/getDistrictList/' + cityId)
      .then((res) => {
        this.districtList = res.data
        // 去除重复字母
        let keys = []
        this.districtList.forEach((element, index) => {
          let obj = {}
          const key = element.initial
          if (keys.indexOf(key) != -1) {
            element.initial = ''
          } else {
            keys.push(key)
          }
        })
      })
    },

    // 选择县区
    selectedDistrict(item) {
      this.selectDistrict = item.districtName
      this.selectDistrictId = item.districtId
    },

    // 确定
    confirm() {
      sessionStorage.setItem('province', this.selectProvince)
      sessionStorage.setItem('city', this.selectCity)
      sessionStorage.setItem('district', this.selectDistrict)
      sessionStorage.setItem("provinceId", this.selectProvinceId);
      sessionStorage.setItem("cityId", this.selectCityId);
      sessionStorage.setItem("districtId", this.selectDistrictId);
      this.$router.go(-1)
    }

  }
};
</script>
<style lang="less" scoped>
.headers {
  position: fixed;
  top: 0;
  left: 0;
  background: #fff;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4.7rem;
  font-size: 1.7rem;
  .back_btn {
    margin: 0 1rem;
  }
}

// 隐藏区
.part_area {
  width: 100%;
  // min-height: 20rem;

// 搜索
  .search_area {
    min-height: 4rem;
    width: 100%;
    padding: 0 1.5rem;
    .search {
      height: 3rem;
      width: 100%;
      background: #eee;
      border-radius: 1.5rem;
      display: flex;
      align-items: center;
      margin-top: 0.6rem;
      .search_img {
        width: 1.6rem;
        height: 1.6rem;
        margin: 0 1rem;
      }
      input {
        background: #00000000;
        color: #666;
        width: 100%;
        margin-right: 1rem;
      }
      input::-webkit-input-placeholder {
        color: #999;
      }
    }
    .result_area {
      width: 100%;
      padding: 1.5rem;
      border-bottom: 1px solid #eee;
      .result_list {
        height: 3rem;
        padding-left: 1.8rem;
      }
      .no_result {
        height: 3rem;
        color: red;
        padding-left: 1.8rem;
      }
    }
  }

  // 当前位置
  .now_location {
    width: 100%;
    padding: 1.5rem 1.5rem 1rem 1.5rem;
    .title_area {
      height: 2rem;
      font-size: 1.2rem;
      color: #999;
    }
    .get_location {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: .5rem 0;
      .icon_area {
        height: 2rem;
        width: 2rem;
        padding-bottom: .6rem;
        margin: 0 0.6rem;
        img {
          height: 100%;
          width: 100%;
        }
      }
      .location_info {
        display: flex;
        align-items: center;
        width: 100%;
        font-size: 1.4rem;
        color: #333;
      }
      .get_btn {
        width: 8rem;
        text-align: center;
        color: #00ae87;
        font-size: 1.4rem;
      }
    }
  }

  // 最近搜索
  .recent {
    width: 100%;
    background: #fff;
    border-top: 1.5rem solid #f2f2f2;
    border-bottom: 1px solid #f2f2f2;
    .recent_area {
      padding: 0 1.5rem;
      color: #999;
      font-size: 1.2rem;
      height: 4rem;
      line-height: 4rem;
    }
    .recent_list {
      width: 100%;
      padding: 1.5rem;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      .recent_item {
        font-size: 1.4rem;
        background: #eee;
        color: #333;
        padding: .2rem 1.2rem;
        margin: .3rem .6rem;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        /*! autoprefixer: off */
        -webkit-box-orient: vertical;
        /*! autoprefixer: on */
        overflow: hidden;

      }
    }
  }
  .choose_title {
    font-size: 1.2rem;
    color: #999;
    width: 100%;
    padding-left: 1.5rem;
    height: 4.4rem;
    line-height: 4.4rem;
    // margin-bottom: 1.5rem;
  }

}

.select_comtainer {
  overflow: hidden;
  position: relative;
}

// 选择区域
.selet_area {
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  color: #333;
  padding: 0 1.5rem;
  height: 5.7rem;
  line-height: 4.5rem;
  // margin-top: 4.7rem;
  border-bottom: 1px solid #f2f2f2;
  border-top: 1rem solid #f2f2f2;
  .select_item {
    margin-right: 2.2rem;
    border-bottom: 2px solid #00000000;
  }
  .select_item_green {
    margin-right: 2.2rem;
    color: #00ae87;
    border-bottom: 2px solid #00ae87;
  }
}
.choose_area {
  overflow-y: scroll;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 1.5rem;
  padding-top: 0;
  
  .choose_list {
    width: 100%;
    display: flex;
    flex-direction: column;
    .item_info {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .info_left {
        display: flex;
        align-items: center;
        height: 3.6rem;
        .info_title {
          margin-left: 1rem;
          margin-right: 1.5rem;
          width: 1rem;
          font-size: 1.2rem;
          color: #999;
        }
        .info_name {
          font-size: 1.5rem;
          color: #333;
        }
        .info_name_active {
          font-size: 1.5rem;
          color: #00ae87;
        }
      }
      .choose {
        height: 1rem;
        width: 1.4rem;
        img {
          height: 100%;
          width: 100%;
        }
      }
    }
  }
  .ok_btn {
    position: fixed;
    bottom: 2rem;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    .btn_btn {
      width: 28rem;
      height: 4.4rem;
      text-align: center;
      line-height: 4.4rem;
      color: #fff;
      background: #00ae87;
      border-radius: 6px;
      font-size: 1.6rem;
    }
  }
}
</style>