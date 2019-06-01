<template>
  <div style="height: 100%;" ref="indexPart">
    <!-- 头部搜索开始 -->
    <div class="head-search">
      <div class="site" @click="$router.go(-1)">
        <div>
          <!--<van-icon name="location" />-->
          <img class="comeback" src="../../img/index/search/back.png">
        </div>
      </div>
      <div class="search">
        <img class="searchImg" v-show="!showClean" src="../../img/index/search/search.png">
        <input type="text" v-model="inputValue" autofocus="true" placeholder="更多好货助力">
        <img
          class="cancelImg"
          v-show="showClean"
          @click="cleanInput"
          src="../../img/index/search/delet.png"
        >
      </div>
      <div class="searchBtn">
        <div class="complate" v-show="showClean" @click="onSearch('完成')">搜索</div>
        <div class="complate" v-show="!showClean" @click="$router.go(-1)">取消</div>
      </div>
    </div>
    <!--//	头部搜索结束-->

    <!-- 搜索历史 -->
    <div class="history" v-show="!onResult">
      <div class="history-title">
        <div class="history-text">搜索历史</div>
        <div class="history-img" @click="deletHistory">
          <img src="../../img/index/search/clean.png" alt="删除历史记录">
        </div>
      </div>
      <div class="history-container">
        <!-- 历史记录列表最多显示15 -->
        <div
          class="history-item"
          @click="clickHistory(i)"
          v-for="(i,index) in historyList"
          :key="index"
        >
          <div class="history-item-name">{{i}}</div>
        </div>
      </div>
    </div>

    <!-- 搜索结果展示 -->
    <div class="result-container" v-show="onResult">
      <div class="not-result" v-if="resultNull">
        <div class="noresult-img">
          <img src="../../img/index/search/logo.png">
        </div>
        <div class="noresult-txt">亲~没有搜索到商品呢</div>
      </div>

      <div class="has-result">
        <!-- 筛选栏 -->
        <div class="result-select">
          <div class="select-container">
            <div :class="onsort == 0 ? 'sort-active' : 'sort'" @click="sorting">综合</div>
            <div :class="onsort == 3 ? 'new-active' : 'new'" @click="clickNew">新品</div>
            <div :class="onsort == 2 || onsort == 1 ? 'price-active' : 'price'" @click="clickPrice">
              价格
              <img src="../../img/index/search/down.png" v-show="onsort != 2 && onsort != 1">
              <img src="../../img/index/search/price.png" v-if="onsort == 2 && sortPrice">
              <img src="../../img/index/search/priceTop.png" v-if="onsort == 1 && !sortPrice">
            </div>
            <div class="select" @click="clickSelectBtn">
              筛选
              <img src="../../img/index/search/select.png">
            </div>
          </div>
        </div>

        <!-- 筛选功能 -->
        <div class="select-part" v-show="showSelect" @click="clickSelectBtn">
          <div class="select-area" v-on:click.stop="nothing">
            <!-- 价格区间 -->
            <div class="price-range">
              <div class="price-range-header">
                <div class="price-range-title">价格区间</div>
                <!-- <div class="local-region">广东省广州市白云区</div> -->
              </div>
              <div class="price-range-container">
                <input type="number" class="min-price" v-model="from" placeholder="最低价">
                <div class="link">——</div>
                <input type="number" class="max-price" v-model="to" placeholder="最高价">
              </div>
            </div>
            <!-- 地区 -->
            <div class="choose-region">
              <div class="choose-region-header">
                <div class="choose-region-title">地区</div>
                <div class="region-more-img">
                  <img src="../../img/index/search/bottom.png" alt="展开">
                </div>
              </div>
              <div class="choose-region-container">
                <div
                  :class="i.provinceId == provinceId? 'region-item-select':'region-item'"
                  v-for="(i, index) in provinceList"
                  :key="index"
                  @click="selectLocal(i.provinceId)"
                >
                  <div class="region-item-name">{{i.provinceName}}</div>
                </div>
              </div>
              <!-- 分类 -->
              <div class="choose-type">
                <div class="choose-type-header">
                  <div class="choose-type-title">分类</div>
                  <div class="type-more-img">
                    <img src="../../img/index/search/bottom.png" alt="展开">
                  </div>
                </div>
                <div class="choose-type-container">
                  <div
                    :class="i.id == thirdClassifyId? 'type-item-select':'type-item'"
                    v-for="(i, index) in categories"
                    :key="index"
                    @click="selectCate(i.id)"
                  >
                    <div class="type-item-name">{{i.name}}</div>
                  </div>
                </div>
              </div>
              <!-- 品牌 -->
              <div class="choose-brand" v-if="false">
                <div class="choose-brand-header">
                  <div class="choose-brand-title">品牌</div>
                  <div class="brand-more-img">
                    <img src="../../img/index/search/bottom.png" alt="展开">
                  </div>
                </div>
                <div class="choose-brand-container">
                  <div
                    :class="i.brandId==brand? 'brand-item-select' : 'brand-item'"
                    v-for="(i, index) in brandSearchVOS"
                    :key="index"
                    @click="selectBrand(i.brandId)"
                  >
                    <div class="brand-item-name">{{i.brandName}}</div>
                  </div>
                </div>
              </div>
              <!-- 按钮 -->
              <div class="btn-container">
                <div class="btn-btn">
                  <div class="btn-left" @click="resetBtn">重置</div>
                  <div class="btn-right" @click="confirm">确定</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 搜索结果展示区 -->
        <div class="result-content" v-if="!resultNull">
          <div
            class="result-item"
            v-for="(i, index) in resultList"
            :key="index"
            @click="onclickdetail(i.id)"
          >
            <div class="item-img">
              <img :src="i.imgUrl" :alt="i.name">
            </div>
            <div class="item-info">
              <div class="item-title">
                <span>生态商品</span>
                {{i.name}}
              </div>
              <div class="item-unit">
                <div class="unit">500G</div>
              </div>
              <div class="item-props">
                <!-- <div class="props-info">每200减20</div> -->
              </div>
              <div class="item-data">
                <div class="item-price">
                  <div class="item-now-price">
                    <span>￥</span>
                    {{i.discountPrice}}
                  </div>
                  <!-- <s class="item-original-price">￥{{i.originalPrice}}</s> -->
                  <div class="item-sold">已售{{i.salesVolume}}笔</div>
                </div>
                <div class="item-store">
                  <div class="store-name">{{i.shopName}}</div>
                  <div class="go-store">
                    <img src="../../img/index/search/next.png" alt>
                  </div>
                </div>
                <div class="item-local">白云</div>
              </div>
            </div>
          </div>

          <!-- 占位行 -->
          <div class="line"></div>
          <v-baseline></v-baseline>
          <div class="line"></div>
        </div>
      </div>
    </div>

    <!-- 返回顶部按钮 -->
    <div class="back-to-top" @click="backTop" v-show="showBackTop">
      <img src="../../img/index/home/bankToTop.png">
    </div>
  </div>
</template>

<script>
import Scroll from "better-scroll";
import Baseline from "@/common/_baseline.vue";

export default {
  components: {
    "v-baseline": Baseline
  },
  data() {
    return {
      activeKey: 0,
      cut: [],
      categoryList: [],
      secondlist: [],
      category: [],
      id: "",
      onInput: true,
      district: "",
      city: "",
      province: "",
      historyList: [],
      inputValue: "", // 绑定搜素的输入
      showClean: false, // 控制输入框的清除按钮
      resultList: [], //搜索结果
      onResult: false, //显示搜索结果
      resultNull: false, // 显示是否有搜索结果
      showSelect: false, // 筛选界面的显示
      onsort: 0, // 综合排序是否启用
      sortPrice: false, // 价格高低排序调节
      from: null, // 筛选中的最低价格
      to: null, // 筛选中的最高价格
      config: {}, // 全局筛选条件
      thirdClassifyId: null, // 选中的分类
      districtId: null, // 地区位置
      totalPages: 1, // 页数
      pageSize: 1, // 总页数
      showBackTop: false, // 返回顶部按钮
      lock: true, // 加载更多锁
      size: 12, // 单页长度
      brandSearchVOS: [], // 筛选品牌的数组
      categories: [], // 筛选分类的数组
      provinceList: [], // 筛选分类的省
      brand: "", // 选中的品牌
      provinceId: "" // 选中的城市
    };
  },

  watch: {
    // 监听输入的搜索内容
    inputValue() {
      if (this.inputValue.length != 0) {
        this.showClean = true;
      } else {
        this.showClean = false;
        this.onResult = false;
        this.config = {};
      }
    },
    beginPrice() {
      this.beginPrice = parseInt(this.beginPrice);
    },

    endPrice() {
      this.endPrice = parseInt(this.endPrice);
    },

    $route: function(to, from) {
      if (from.name == "详情页") {
        this.goHistory();
      } else if (from.name == "category") {
        this.readHistory();
        this.haskey();
      } else if (from.name == "ecosearch") {
        return;
      } else {
        this.cleanInput();
      }
      // console.log(from);
    }
  },

  beforeDestroy() {
    // 销毁监听事件
    // console.log("解除监听1");
    window.removeEventListener("scroll", this.handleScroll);
  },

  mounted() {
    // 读取历史记录
    this.readHistory();
    // 监听滚动事件
    window.addEventListener("scroll", this.handleScroll);
  },

  created() {
    // this.onSearch();
    // 监听是否有跳转过来的关键词
    this.haskey();
  },
  activated() {
    window.addEventListener("scroll", this.handleScroll);
  },
  deactivated() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    // 返回搜索页时定位到旧的高度
    goHistory() {
      const px = window.sessionStorage.getItem("scroll");
      setTimeout(() => {
        window.scrollTo(0, px);
      }, 0);
    },

    // 监听是否有跳转过来的关键词
    haskey() {
      const arr = this.$route.query.key;
      if (arr) {
        this.inputValue = arr;
        this.onSearch("完成");
      }
    },

    // 监听滚动事件
    handleScroll() {
      // 获取滚动高度并判断是否显示返回顶部按钮
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      // 获取屏幕高度
      const deviceHight = document.documentElement.clientHeight;
      // 获取页面高度
      const insexHight = this.$refs.indexPart.offsetHeight;
      if (scrollTop > deviceHight) {
        this.showBackTop = true;
      } else {
        this.showBackTop = false;
      }
      // 判断是否要启动触底事件
      const allHeight = scrollTop + deviceHight + 100;
      if (allHeight > insexHight) {
        // 触发触底事件
        // console.log("触底了");
        this.getMore();
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

    // 选中品牌
    selectBrand(brandId) {
      this.brand = brandId;
    },

    // 选中分类
    selectCate(cateId) {
      this.thirdClassifyId = cateId;
    },

    // 选中地区
    selectLocal(provinceId) {
      this.provinceId = provinceId;
    },

    // 加载更多数据
    getMore() {
      if (this.lock) {
        this.lock = false;
        // console.log(this.totalPages + "=" + this.pageSize);
        if (this.totalPages < this.pageSize) {
          this.config.page = ++this.totalPages;
          this.config.size = this.size;
          this.config.commodityArea = 1;
          const obj = {
            params: {
              ...this.config
            }
          };
          this.$api
            .get(
              this.HOME + this.SEARCH + "/commodity/findBysearchContent",
              obj
            )
            .then(res => {
              const result = res.data.data.commodityList;
              if (result.length != 0) {
                this.resultList = [...this.resultList, ...result];
                this.pageSize = res.data.data.totalPages;
                this.totalPages = res.data.data.pageNumber;
                this.saveHistory(this.inputValue);
                this.onResult = true;
                this.resultNull = false;
                this.lock = true;
              }
              // console.log(res.data.data.commodityList.length);
            })
            .catch(err => {
              this.lock = true;
              // 网络错误
            });
        }
      }
    },

    // 按下了筛选按钮
    clickSelectBtn() {
      this.showSelect = !this.showSelect;
    },

    // 按下了筛选条件中的确定按钮
    confirm() {
      // 重置综合排序功能
      // this.onsort = 0
      // 重置价格排序状态
      // this.sortPrice = false
      // 隐藏筛选条件功能
      this.showSelect = false;
      this.config.searchContent = this.inputValue.replace(/\s+/g,"");
      if (this.onsort && this.onsort != 0) {
        this.config.sort = this.onsort;
      } else if (this.onsort == 0) {
        this.config.sort = null;
      }
      let min = this.beginPrice || 0
      let max = this.endPrice || 0

      if (min > max) {
        const i = min;
        min = max;
        max = i;
      }
      this.config.thirdClassifyId = this.thirdClassifyId;
      this.config.districtId = this.districtId;
      this.config.from = this.from;
      this.config.to = this.to;
      this.config.page = 1;
      this.config.brandId = this.brand;
      this.config.provinceId = this.provinceId;
      // this.config.pageSize = 1
      this.onSearch();

      // console.log("按下了筛选条件中的确定按钮");
    },

    // 按下了筛选条件中的重置
    resetBtn() {
      this.config = {};
      this.thirdClassifyId = null;
      this.districtId = null;
      this.from = null;
      this.to = null;
      this.config.page = 1;
      this.brand = "";
      this.provinceId = "";
      // this.config.pageSize = 1
      // console.log("按下了筛选条件中的重置");
    },

    // 点击了综合排序功能
    sorting() {
      this.onsort = 0;
      this.lock = true;
      this.config.page = 1;
      // 重置价格排序状态
      this.sortPrice = false;
      this.onSearch();
      // console.log("点击了综合排序功能");
    },

    // 点击了按最新排序
    clickNew() {
      this.onsort = 3;
      this.lock = true;
      this.config.page = 1;
      // 重置价格排序状态
      this.sortPrice = false;
      this.onSearch();
      // console.log("点击了按最新排序");
    },

    // 点击了按价格排序
    clickPrice() {
      this.sortPrice = !this.sortPrice;
      this.lock = true;
      this.config.page = 1;
      if (this.sortPrice) {
        this.onsort = 2;
        this.onSearch();
      } else {
        this.onsort = 1;
        this.onSearch();
      }
      // console.log("点击了按价格排序");
    },

    // 不做任何操作
    nothing() {
      // console.log("阻止点击穿透");
    },

    // 搜索框输入的监听事件
    onSearch(key) {
      this.resultList = [];
      let condition = {};
      if (key == "完成") {
        this.config.searchContent = this.inputValue.replace(/\s+/g,"");
        this.config.sort = null;
        this.config.size = this.size;
        this.config.commodityArea = 1;
        this.config.thirdClassifyId = "";
        this.config.brandId = "";
        this.config.provinceId = "";
        condition = this.config;
      } else {
        this.config.sort = this.onsort;
        this.config.size = this.size;
        this.config.commodityArea = 1;
        // this.config.brandId = "";
        // this.config.thirdClassifyId = "";
        // this.config.provinceId = "";
        condition = this.config;
      }
      const obj = {
        params: {
          ...condition
        }
      };
      if (this.inputValue.replace(/\s+/g,"") != '') {
        this.saveHistory(this.inputValue.replace(/\s+/g,"")); // 不管有没有搜索结果都保存搜索历史
      }
      this.$api
        .get(this.HOME + this.SEARCH + "/commodity/findBysearchContent", obj)
        .then(res => {
          this.lock = true;
          let msg = res.data.data || false;
          if (!msg) {
            // 让没有结果的提示显示
            this.onResult = true;
            this.resultNull = true;
          }
          const result = res.data.data.commodityList;
          this.brandSearchVOS = res.data.data.brandSearchVOS;
          this.categories = res.data.data.categories;
          this.provinceList = res.data.data.provinceList;
          if (result.length != 0) {
            this.resultList = result;
            this.pageSize = res.data.data.totalPages;
            this.totalPages = res.data.data.pageNumber;
            // this.saveHistory(this.inputValue)
            this.onResult = true;
            this.resultNull = false;
          } else {
            // 让没有结果的提示显示
            this.onResult = true;
            this.resultNull = true;
          }
          // console.log(res.data.data.commodityList.length);
        })
        .catch(err => {
          // 网络错误
        });
      this.onResult = true;
      this.resultNull = true;
    },

    // 存储搜索历史记录
    saveHistory(value) {
      let history = localStorage.getItem("history") || null;
      let text = [];
      if (history) {
        text = history.split(",");
        let index = text.indexOf(value);
        if (index != -1) {
          text.splice(index, 1);
        }
        text.unshift(value);
        if (text.length > 15) {
          text.pop();
        }
      } else {
        text.push(value);
      }
      localStorage.setItem("history", text);
    },

    // 清空输入框
    cleanInput() {
      this.inputValue = "";
      this.onResult = false;
      this.config = {};
      this.historyList = localStorage.getItem("history").split(",") || "";
    },

    // 读取本地历史记录
    readHistory() {
      this.historyList = localStorage.getItem("history").split(",") || "";
      // console.log(this.historyList);
    },

    // 删除所有历史记录
    deletHistory() {
      localStorage.setItem("history", "");
      this.historyList = "";
      // console.log("删除了历史记录");
    },

    // 点击某条历史记录
    clickHistory(input) {
      this.inputValue = input;
      this.onSearch("完成");
    },

    gomap() {
      this.$router.push({
        path: "/map?name=选择地区"
      });
    },

    // 点击了商品详情页
    onclickdetail(id) {
      this.$router.push({
        path: "/detail?id=" + id
      });
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
  z-index: 10;
  .site {
    width: 5rem;
    height: 4.7rem;
    display: flex;
    justify-content: center;
    align-items: center;
    div {
      flex: 1;
      color: #fff;
      width: 4.2rem;
      .comeback {
        width: 0.8rem;
        height: 1.4rem;
        margin-left: 1.6rem;
        // margin-bottom: .2rem;
      }
    }
  }
  /*搜索框*/
  .search {
    height: 3rem;
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    vertical-align: middle;
    background-color: #66ceb7;
    border-radius: 1.5rem;
    margin: 0 1rem;
    .searchImg {
      position: absolute;
      height: 1.1rem;
      width: 1.1rem;
      left: 1rem;
      align-items: center;
    }
    .cancelImg {
      position: absolute;
      height: 1.1rem;
      width: 1.1rem;
      right: 1rem;
      align-items: center;
    }
    input {
      align-items: center;
      width: 90%;
      padding: 0.7rem 1.6rem 0.7rem 1.6rem;
      border: none;
      font-size: 1.4rem;
      color: #333;
      background-color: rgba(0, 0, 0, 0);
      margin-left: 1rem;
    }
    input::-webkit-input-placeholder {
      color: #fff;
      font-size: 1.4rem;
    }
  }
  .searchBtn {
    width: 6rem;
    .complate {
      height: 2rem;
      font-size: 1.4rem;
      color: #fff;
    }
  }
}

// 搜索历史记录
.history {
  margin-top: 4.7rem;
  width: 100%;
  .history-title {
    width: 100%;
    padding: 0 1.5rem;
    height: 4.2rem;
    font-size: 1.6rem;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .history-img {
      // background: #999;
      height: 1.5rem;
      width: 1.5rem;
      margin-bottom: 1rem;
      img {
        height: 100%;
        width: 100%;
      }
    }
  }
  .history-container {
    width: 100%;
    padding: 0 1.5rem;
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-between;
    .history-item {
      padding: 0.8rem 0.6rem;
      max-width: 100%;
      .history-item-name {
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        /*! autoprefixer: off */
        -webkit-box-orient: vertical;
        /*! autoprefixer: on */
        height: 2.6rem;
        background: #ececec;
        padding: 0 1rem;
        font-size: 1.4rem;
        line-height: 2.6rem;
        border-radius: 1.3rem;
      }
    }
  }
}

// 搜索结果展示区
.result-container {
  margin-top: 4.7rem;
  width: 100%;

  // 没有搜索结果展示区
  .not-result {
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    font-size: 1.4rem;
    color: #666;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .noresult-img {
      width: 15.4rem;
      height: 6.1rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .noresult-txt {
      font-size: 1.4rem;
      color: #999;
    }
  }

  // 存在搜索结果展示区
  .has-result {
    width: 100%;

    // 筛选栏
    .result-select {
      z-index: 10;
      width: 100%;
      height: 4.2rem;
      padding: 0 1.5rem;
      border-bottom: 0.1rem solid #eee;
      position: fixed;
      top: 4.7rem;
      background: #fff;
      .select-container {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 1.5rem;
        color: #333;
        font-weight: bold;
        .sort {
          color: #333;
        }
        .sort-active {
          color: #00ae87;
        }
        .new {
          color: #333;
        }
        .new-active {
          color: #00ae87;
        }
        .price {
          color: #333;
        }
        .price-active {
          color: #00ae87;
        }
        .price img {
          height: 1.4rem;
          width: 0.8rem;
          margin-bottom: 0.2rem;
        }
        .price-active img {
          height: 1.4rem;
          width: 0.8rem;
          margin-bottom: 0.2rem;
        }
        .select img {
          height: 1.5rem;
          width: 1.3rem;
        }
      }
    }

    //筛选功能
    .select-part {
      // display: none;
      z-index: 20;
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background: rgba(0, 0, 0, 0.5);
      .select-area {
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        // max-height: 100%;
        // min-height: 40rem;
        padding: 1.5rem;
        width: 80%;
        overflow: hidden;
        background: #fff;
        display: flex;
        flex-direction: column;
        // 价格区间
        .price-range {
          width: 100%;
          display: flex;
          flex-direction: column;
          .price-range-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .price-range-title {
              font-size: 1.8rem;
              font-weight: bold;
              color: #333;
            }
            .local-region {
              font-size: 1.5rem;
              color: #00ae87;
            }
          }
          .price-range-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            input {
              width: 40%;
              height: 2.3rem;
              background: #eee;
              border-radius: 1.65rem;
              margin: 0.6rem 0;
              text-align: center;
              color: #333;
              font-size: 1.3rem;
            }
            input::-webkit-input-placeholder {
              text-align: center;
              color: #999;
              font-size: 1.3rem;
            }
            .link {
              width: 1.2rem;
              overflow: hidden;
              color: #999;
            }
          }
        }
        // 地区
        .choose-region {
          margin-top: 1rem;
          width: 100%;
          display: flex;
          flex-direction: column;
          .choose-region-header {
            width: 100%;
            display: flex;
            justify-content: space-between;
            // align-items: center;
            .choose-region-title {
              font-size: 1.8rem;
              color: #333;
              font-weight: bold;
            }
            .region-more-img {
              width: 1.2rem;
              height: 0.7rem;
              img {
                width: 100%;
                height: 100%;
              }
            }
          }
          .choose-region-container {
            display: flex;
            flex-wrap: wrap;
            .region-item {
              height: 2.3rem;
              padding: 0 1.2rem;
              margin: 0.6rem;
              font-size: 1.3rem;
              line-height: 2.3rem;
              border-radius: 1.65rem;
              background: #eee;
              color: #333;
            }
            .region-item-select {
              height: 2.3rem;
              padding: 0 1.2rem;
              margin: 0.6rem;
              font-size: 1.3rem;
              line-height: 2.3rem;
              border-radius: 1.65rem;
              background: #00ae8870;
              color: #333;
            }
          }
        }

        // 分类
        .choose-type {
          margin-top: 1rem;
          width: 100%;
          display: flex;
          flex-direction: column;
          .choose-type-header {
            width: 100%;
            display: flex;
            justify-content: space-between;
            .choose-type-title {
              font-size: 1.8rem;
              color: #333;
              font-weight: bold;
            }
            .type-more-img {
              width: 1.2rem;
              height: 0.7rem;
              img {
                width: 100%;
                height: 100%;
              }
            }
          }
          .choose-type-container {
            display: flex;
            flex-wrap: wrap;
            .type-item {
              height: 2.3rem;
              padding: 0 1.2rem;
              margin: 0.6rem;
              font-size: 1.3rem;
              line-height: 2.3rem;
              border-radius: 1.65rem;
              background: #eee;
              color: #333;
            }
            .type-item-select {
              height: 2.3rem;
              padding: 0 1.2rem;
              margin: 0.6rem;
              font-size: 1.3rem;
              line-height: 2.3rem;
              border-radius: 1.65rem;
              background: #00ae8870;
              color: #333;
            }
          }
        }

        // 品牌
        .choose-brand {
          margin-top: 1rem;
          width: 100%;
          display: flex;
          flex-direction: column;
          margin-bottom: 6.4rem;
          .choose-brand-header {
            width: 100%;
            display: flex;
            justify-content: space-between;
            .choose-brand-title {
              font-size: 1.8rem;
              color: #333;
              font-weight: bold;
            }
            .brand-more-img {
              width: 1.2rem;
              height: 0.7rem;
              img {
                width: 100%;
                height: 100%;
              }
            }
          }
          .choose-brand-container {
            display: flex;
            flex-wrap: wrap;
            .brand-item {
              height: 2.3rem;
              padding: 0 1.2rem;
              margin: 0.6rem;
              font-size: 1.3rem;
              line-height: 2.3rem;
              border-radius: 1.65rem;
              background: #eee;
              color: #333;
            }
            .brand-item-select {
              height: 2.3rem;
              padding: 0 1.2rem;
              margin: 0.6rem;
              font-size: 1.3rem;
              line-height: 2.3rem;
              border-radius: 1.65rem;
              background: #00ae8870;
              color: #333;
            }
          }
        }

        // 按钮
        .btn-container {
          position: absolute;
          right: 0;
          bottom: 0;
          width: 100%;
          .btn-btn {
            display: flex;
            text-align: center;
            background: #fff;
            height: 4.4rem;
            font-size: 1.7rem;
            line-height: 4.4rem;
            .btn-left {
              flex: 1;
              color: #999;
              border-top: 0.1rem solid #eee;
            }
            .btn-right {
              flex: 1;
              height: 100%;
              background: #00ae87;
              color: #fff;
            }
          }
        }
      }
    }

    // 搜索结果展示区
    .result-content {
      width: 100%;
      margin-top: 8.9rem;
      .result-item {
        width: 100%;
        padding: 1.5rem;
        height: 18.2rem;
        overflow: hidden;
        display: flex;
        .item-img {
          height: 100%;
          width: 40.5%;
          // height: 14rem;
          // width: 14rem;
          // background: #666;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .item-info {
          height: 100%;
          width: 59.5%;
          overflow: hidden;
          padding-left: 1rem;
          display: flex;
          flex-direction: column;
          .item-title {
            height: 4rem;
            font-size: 1.4rem;
            color: #333;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            /*! autoprefixer: off */
            -webkit-box-orient: vertical;
            /*! autoprefixer: on */
            span {
              color: #fff;
              height: 1.5rem;
              background: #00ae87;
              padding: 0.2rem 0.6rem;
              border-radius: 0.75rem;
              font-size: 1.1rem;
              line-height: 1.5rem;
              margin-right: 0.6rem;
            }
          }
          .item-unit {
            margin-top: 0.6rem;
            color: #999;
            font-size: 1.2rem;
          }
          .item-props {
            height: 1.4rem;
            // margin: 0.6rem 0;
            display: flex;
            align-items: center;
            .props-info {
              font-size: 1rem;
              color: red;
              border: 0.1rem solid red;
              padding: 0.1rem 0.4rem;
              border-radius: 0.6rem;
            }
          }
          .item-data {
            display: flex;
            flex-direction: column;
            position: relative;
            margin: 1rem 0 1rem 0;
            .item-price {
              display: flex;
              align-items: center;
              .item-now-price {
                font-size: 2.3rem;
                color: #00ae87;
                font-weight: bold;
                span {
                  font-size: 1.2rem;
                }
              }
              .item-original-price {
                padding-left: 0.6rem;
                padding-top: 0.6rem;
                font-size: 1.2rem;
                color: #999;
              }
              .item-sold {
                font-size: 1rem;
                padding-left: 0.6rem;
                padding-top: 0.6rem;
                color: #999;
              }
            }
            .item-store {
              color: #999;
              display: flex;
              align-items: center;
              height: 1.8rem;
              .store-name {
                font-size: 1.2rem;
                max-width: 14rem;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                /*! autoprefixer: off */
                -webkit-box-orient: vertical;
                /*! autoprefixer: on */
              }
              .go-store {
                width: 0.4rem;
                height: 0.8rem;
                margin-left: 0.6rem;
                margin-bottom: 1.6rem;
                img {
                  width: 100%;
                  height: 100%;
                }
              }
            }
            .item-local {
              position: absolute;
              right: 1rem;
              bottom: 0;
              color: #999;
              line-height: 1.4rem;
              font-size: 1.2rem;
            }
          }
        }
      }
    }
  }
}

// 占位行样式
.line {
  height: 2rem;
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