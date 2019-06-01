<template>
  <div class="car" ref="indexPart">
    <div class="carHeader pf" :class="{opacity:goodslist.length}" ref="c_header">
      <div class="flex" style="padding-left:1.4rem">
        <van-icon name="arrow-left" @click="$router.go(-1)" class="c_h_go"/>
      </div>
      <div class="headerLeft flex">购物车</div>
      <div class="headerRight flex">
        <div v-if="goodslist.length" class="headerEdit">
          <span v-if="carEdit" @click.stop="complete">完成</span>
          <span v-if="!carEdit" @click.stop="edit">管理</span>
        </div>
        <v-msg></v-msg>
      </div>
      <div></div>
    </div>
    <!-- 购物车列表 -->
    <div class="carList">
      <!-- 无商品的情况下 -->
      <div v-if="changeNothing">
        <v-nothing></v-nothing>
        <v-section5 :grous="grous"></v-section5>
        <v-baseline></v-baseline>
      </div>
      <!-- 有商品的情况下 -->
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh" id="refresh">
        <div class="cl_header" v-if="goodslist"></div>
        <div class="carHeader mb-30" v-if="goodslist.length">
          <div class="flex" style="padding-left:1.4rem">
            <van-icon name="arrow-left" @click="$router.go(-1)" class="c_h_go"/>
          </div>
          <div class="headerLeft flex">购物车</div>
          <div class="headerRight flex">
            <div v-if="goodslist" class="headerEdit">
              <span v-if="carEdit" @click.stop="complete">完成</span>
              <span v-if="!carEdit" @click.stop="edit">管理</span>
            </div>
            <v-msg></v-msg>
          </div>
          <div>
          </div>
        </div>

        <div class="goods" v-for="(item,index) in goodslist" :key="index">
          <div class="goods_merchants">
            <van-checkbox
              v-model="item.dos"
              class="goods_merchants_checkbox"
              checked-color="#00ae87"
              @change="merchants(index)"
            ></van-checkbox>
            <div>
              <img :src="item.shopImgUrl" alt="加载失败，请稍后">
              <span @click="goIndexS(item.shopId)">{{item.shopName}}</span>
              <van-icon name="arrow" @click="goIndexS(item.shopId)"/>
            </div>
          </div>
          <div class="something" v-for="(goodsitem,goodsindex) in item.cartList" :key="goodsindex">
            <van-checkbox
              v-model="goodsitem.dos"
              class="something_checkbox"
              checked-color="#00ae87"
              @change="somethingChecked(index)"
            ></van-checkbox>
            <div class="something_img" @click="goGoods(goodsitem.commodityId)">
              <img :src="goodsitem.imgUrl" alt>
            </div>
            <div class="something_goods">
              <div class="jieshao">
                <span class="area" v-if="goodsitem.commodityArea == 1">生态市场</span>
                <span class="area" v-else-if="goodsitem.commodityArea == 2">一村一品</span>
                <span class="area orange" v-else-if="goodsitem.commodityArea == 3">会员专区</span>
                {{goodsitem.name}}
              </div>
              <div class="something_goods_jieshao">
                <div class="span">{{goodsitem.linkValue}}</div>
              </div>
              <div class="something_goods_num">
                <div class="goods_num_m">
                  <span
                    v-if="goodsitem.commodityArea == 0 "
                  >￥{{(goodsitem.discountPrice*1000) * (goodsitem.commodityQuantity) /1000 | number}}</span>
                  <span
                    v-if="goodsitem.commodityArea == 1"
                    class="jjj"
                  >生态价:￥{{(goodsitem.price*1000) * (goodsitem.commodityQuantity) /1000 | number}}</span>
                  <span
                    v-if="goodsitem.commodityArea == 2 "
                  >￥{{(goodsitem.discountPrice*1000) * (goodsitem.commodityQuantity) /1000 | number}}</span>
                  <span
                    v-if="goodsitem.commodityArea == 3"
                    class="jjj2"
                  >会员价:￥{{(goodsitem.discountPrice*1000) * (goodsitem.commodityQuantity) /1000 | number}}</span>
                </div>
                <!-- 数量修改部分 -->
                <div class="goods_num_edit">
                  <button
                    @click="subNum(index,goodsindex,goodsitem.cartId,goodsitem.commodityQuantity)"
                  >-</button>

                  <input
                    type="number"
                    v-model="goodsitem.commodityQuantity"
                    class="num"
                    @input="input(index,goodsindex,goodsitem.cartId,goodsitem.commodityQuantity,goodsitem.num)"
                  >

                  <button
                    @click="addNum(index,goodsindex,goodsitem.cartId,goodsitem.commodityQuantity,goodsitem.num)"
                  >+</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 失效 -->
        <div v-if="failureList.length">
          <div class="cl_header" v-if="!goodslist.length"></div>
          <div class="carHeader mb-30" v-if="!goodslist.length"></div>
          <div class="goods">
            <div class="goods_merchants">
              <div class="goods_merchants_s">
                <div>失效宝贝{{count}}件</div>
                <div @click="zi_o()">清空失效宝贝</div>
              </div>
            </div>
            <div class="something" v-for="(goodsitem,goodsindex) in failureList" :key="goodsindex">
              <div class="something_tig">失效</div>
              <div class="something_img" @click="goGoods(goodsitem.commodityId)">
                <img :src="goodsitem.imgUrl" alt>
              </div>
              <div class="something_goods">
                <div class="jieshao">
                  <span class="area" v-if="goodsitem.commodityArea == 1">生态市场</span>
                  <span class="area" v-else-if="goodsitem.commodityArea == 2">一村一品</span>
                  <span class="area orange" v-else-if="goodsitem.commodityArea == 3">会员专区</span>
                  <span>{{goodsitem.name}}</span>
                </div>
                <div class="something_goods_jieshao">
                  <div></div>
                </div>
                <div class="something_goods_num">
                  <div class="goods_num_m">宝贝已经失效</div>
                  <!-- 数量修改部分 -->
                  <div class="goods_search" @click="searchGood(goodsitem.name)">
                    <div>找相似</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </van-pull-refresh>
      <!--  -->
    </div>
    <!-- 结算部分 -->
    <div class="goodsfooter" v-if="goodslist.length">
      <div class="gf_selectedAll flex">
        <van-checkbox v-model="togoAllChecked" checked-color="#00ae87" @change="togoAll">全选</van-checkbox>
      </div>
      <div class="flex">
        <div v-show="!carEdit" class="momey">
          <div>合计</div>
          <div class="gf_momey">
            <span style="font-size:1.2rem">￥</span>
            <span class="gf_momey_num"> {{total | number}}</span>
            <!-- <span style="font-size : 1.2rem">{{total | number2}}</span> -->
          </div>
        </div>
      </div>
      <div class="gf_pay flex" v-if="!carEdit" @click="postTotal">
        <div>结算({{all.length}})</div>
        <!-- <button @click="postTotal">结算({{total | number}})</button> -->
      </div>
      <div class="gf_pay flex" v-if="carEdit" @click.stop="carComplete">
        <div>删除</div>
      </div>
    </div>
    <!-- <v-carfooter></v-carfooter> -->
    <v-footer :foot="foot" :refresh="refresh"></v-footer>
    <!-- 返回顶部按钮 -->
    <!-- <div class="back-to-top" @click="backTop" v-show="showBackTop">
      <img src="../../img/index/home/bankToTop.png">
    </div> -->
  </div>
</template>

<script>
import Footer from "@/common/_footer.vue";
import Section5 from "@/components/index/section5.vue";
import Nothing from "@/components/car/nothing.vue";
import qs from "qs";
import { Toast } from "mint-ui";
import Msg from "@/components/msg/msgTip.vue";
import Baseline from "@/common/_baseline.vue";
import { Indicator } from "mint-ui";

export default {
  components: {
    "v-nothing": Nothing,
    "v-footer": Footer,
    "v-section5": Section5,
    "v-msg": Msg,
    "v-baseline": Baseline
  },
  created() {
    this.getdata();
    this.getYouLike();
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    // 销毁监听事件
    window.removeEventListener("scroll", this.handleScroll);
  },
  data() {
    return {
      foot: 2, //控制底部导航栏项(高亮)
      refresh: false,//控制底部导航栏项(数字变化)
      showBackTop: false,
      size: 6, // 猜你喜欢单页条数
      lock: false, // 加载更多锁
      grous: [], //猜你喜欢
      tanchuan: true,
      isLoading: false,
      togoAllChecked: false, //全选（结算位置）
      total: 0, //总价
      carEdit: false, //编辑状态
      goodslist: [], //商品列表
      failureList: [], //失效商品列表
      count: 0,
      showNumberKeyboard: false,
      all: [], //需要购买的商品数量
      page: 1,
      rows: 100,
      showBackTop: false,
      loading: false, //下拉刷新控制
      changeNothing:false, //控制是否是空购物车
    };
  },
  methods: {
    // 接口-获取购物车信息
    // this.goodslist = JSON.parse(res.body.data.items)
    getdata() {
      Indicator.open("努力加载中");
      this.$api
        .get(this.HOME + this.ORDER + "inside/cart/findCartByuserId", {
          params: { page: this.page, rows: this.rows }
        })
        .then(res => {
          if (res.data.status == 200) {
            if (res.data.data !== "") {
              res.data.data.items.forEach(item => {
                this.$set(item, "dos", this.togoAllChecked);
                this.$set(item, "leaveMsg", "");
                item.cartList.forEach(i => {
                  this.$set(i, "dos", this.togoAllChecked);
                  this.$set(i, "toVenture", false);
                });
              });
              Indicator.close();
              this.goodslist = res.data.data.items;
            } else {
              Indicator.close();
              this.goodslist = [];
            }
          } else {
            Indicator.close();
            this.goodslist = [];
          }
         this.getFailure(); 
        })
        .catch(error => {
          Indicator.close();
        });
    },
    // 接口-获取失效的商品
    getFailure() {
      this.changeNothing = false
      this.$api
        .get(
          this.HOME + this.ORDER + "inside/cart/findCartFailureVOCartFailureVO"
        )
        .then(res => {
          if (res.data.status == 200) {
            if (res.data.data.count != 0) {
              this.failureList = res.data.data.cartFailureVOList;
              this.count = res.data.data.count;
                this.changeNothing = false
            } else {
              this.failureList = []
              if(this.goodslist.length) {
                this.changeNothing = false
              } else {
                this.changeNothing = true
              }
            }
          } else {
            this.failureList = []
            if(this.goodslist.length) {
              this.changeNothing = false
            } else {
              this.changeNothing = true
            }
          }
        });
    },
    // 接口-提交订单
    postCar(obj) {
      let objList = {
        cartIdList: obj
      };
      this.$api
        .post(
          this.HOME + this.ORDER + "inside/cart/findDirectByCartId",
          objList
        )
        .then(res => {
          if (res.data.status == 200) {
            window.sessionStorage.setItem(
              "checkCarOrder",
              JSON.stringify(res.body.data)
            );
            this.$router.push({
              path: "/carConfirm"
            });
          } else {
            Toast({
              message: "去往支付失败",
              duration: 2000
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 接口-修改数量
    updataCartNum(caetId, num) {
      this.$api
        .get(this.HOME + this.ORDER + "inside/cart/updateCart", {
          params: { cartId: caetId, commodityQuantity: num }
        })
        .then(res => {
          if (res.data.status === 200) {
          }
        });
    },
    // 接口-删除商品
    delCar(allId) {
      let id = "";
      if (!allId.length) {
        return;
      } else {
        id = qs.stringify({ cartId: allId }, { indices: false });
      }
      this.$api
        .get(this.HOME + this.ORDER + "inside/cart/deleteCartByIds?" + id)
        .then(res => {
          if (res.data.status === 200) {
            Toast({
              message: "删除物品成功",
              duration: 2000
            });
            this.goodslist = [];
            this.getdata();
            this.total = 0
            this.carEdit = false;
            this.refresh = !this.refresh
          }
        });
    },
    // 去往商家店铺
    goIndexS(id) {
      this.$router.push({ path: "/indexS?shopId=" + id });
    },
    // 去往商品详情页
    goGoods(id) {
      this.$router.push({ path: "/detail?id=" + id });
    },
    // 头部上拉显示
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
      const allHeight = scrollTop + deviceHight + 10;
      if (allHeight > insexHight) {
        // 触发触底事件
        // console.log("触底了" + insexHight);
        // this.getMoreYouLike();
      }

      // 获取需要渐变的元素
      const header = this.$refs.c_header;
      // 需要出现的位置
      if (!this.goodslist.length) {
        header.style.opacity = 1;
        return;
      } else {
        header.style.opacity = scrollTop / 100;
      }

      // 获取屏幕高度
      // const deviceHight = document.documentElement.clientHeight
      // 获取页面高度
      // const insexHight = this.$refs.indexPart.offsetHeight
      // if (scrollTop > deviceHight) {
      //   this.showBackTop = true
      // } else {
      //   this.showBackTop = false
      // }
    },
    // 返回顶部
    backTop() {
      const scrollHight = document.documentElement.scrollTop;
      if (scrollHight > 50) {
        // document.documentElement.scrollTop = scrollHight - 40;
        window.scrollTo(0, scrollHight - 40)
        setTimeout(() => {
          this.backTop();
        }, 10);
      } else {
        // document.documentElement.scrollTop = 0;
        window.scrollTo(0, 0)
      }
    },
    // 下拉刷新
    onRefresh() {
      setTimeout(() => {
        this.$toast("刷新成功");
        this.isLoading = false;
        this.getdata();
      }, 500);
    },
    // 商家checkbox的状态
    merchants(i) {
      const checked = this.goodslist[i].dos;
      const checked2 = this.goodslist[i].cartList.every(item => item.dos);
      this.goodslist[i].cartList.forEach(item => {
        if (checked) {
          return (item.dos = true);
        } else if (checked2) {
          return (item.dos = false);
        }
      });
      this.getTotal();
    },
    // 商品checkbox的状态
    somethingChecked(i) {
      // 商家全选状态
      this.goodslist[i].dos = this.goodslist[i].cartList.every(
        item => item.dos
      );
      // 商家全选状态
      this.togoAllChecked = this.goodslist.every(item => item.dos);
      this.allNum();
      this.getTotal();
    },
    // 全选
    togoAll() {
      const togoAllChecked = this.togoAllChecked;
      const checked = this.goodslist.every(item => item.dos);
      this.goodslist.forEach(item => {
        if (togoAllChecked) {
          return (item.dos = true);
        } else if (checked) {
          return (item.dos = false);
        }
      });
      this.getTotal();
    },
    // 商品数量减1
    subNum(index, i, id, num) {
      if (this.goodslist[index].cartList[i].commodityQuantity <= 1) {
        return (this.goodslist[index].cartList[i].commodityQuantity = 1);
      } else {
        this.goodslist[index].cartList[i].commodityQuantity--;
      }
      this.updataCartNum(id, num - 1);
      this.getTotal();
    },
    // 商品数量加1
    addNum(index, i, id, num, sumNum) {
      if (this.goodslist[index].cartList[i].commodityQuantity >= sumNum) {
        return (this.goodslist[index].cartList[i].commodityQuantity = sumNum);
      } else {
        this.goodslist[index].cartList[i].commodityQuantity++;
      }
      this.updataCartNum(id, num + 1);
      this.getTotal();
    },
    input(index, i, id, val, sumNum) {
      if (val >= sumNum) {
        val = sumNum;
        this.goodslist[index].cartList[i].commodityQuantity = parseInt(val);
      } else if (val < 0) {
        val = parseInt(val);
        this.goodslist[index].cartList[i].commodityQuantity = parseInt(val);
      } else {
        this.goodslist[index].cartList[i].commodityQuantity = parseInt(val);
      }
      this.updataCartNum(id, val);
      this.getTotal();
    },
    // 计算总价
    getTotal() {
      // 每次需要清空，然后从新计算
      this.total = 0;
      this.goodslist.forEach(item => {
        item.cartList.forEach(item => {
          if (item.dos) {
            if (item.commodityArea == 1) {
              this.total += item.price * item.commodityQuantity;
            } else {
              this.total += item.discountPrice * item.commodityQuantity;
            }
          }
        });
      });
    },
    // 编辑状态
    edit() {
      this.carEdit = !this.carEdit;
    },
    // 完成状态
    complete() {
      this.carEdit = !this.carEdit;
    },
    // 需要购买商品的种类数
    allNum() {
      this.all = [];
      this.goodslist.forEach(item => {
        item.cartList.forEach(itme => {
          if (itme.dos) {
            this.all.push(item.name);
          }
        });
      });
    },
    // 删除商品
    carComplete() {
      let deleterCarId = [];
      this.goodslist.forEach(item => {
        item.cartList.forEach(item => {
          if (item.dos) {
            deleterCarId.push(item.cartId);
          }
        });
      });
      if (!deleterCarId.length) {
        Toast({
          message: "请选择物品",
          duration: 2000
        });
        return;
      } else {
        this.delCar(deleterCarId);
      }
    },
    // 删除失效商品
    zi_o() {
      let num = [];
      this.failureList.forEach(item => {
        num.push(item.cartId);
      });
      this.delCar(num);
    },
    // 找相似
    searchGood(val) {
      this.$router.push({
        path: "/Category2?key=" + val
      });
    },
    // 提交订单
    postTotal() {
      if (!this.allcarList.length) {
        Toast({
          message: "请选择物品",
          duration: 2000
        });
        return;
      } else {
        // let list = [];
        // this.allcarList.forEach(item => {
        //   item.cartList.filter(item => {
        //     list.push(item.cartId);
        //   });
        // });
        // this.postCar(list);
        window.sessionStorage.setItem(
          "checkCarOrder",
          JSON.stringify(this.allcarList)
        );
        this.$router.push({
          path: "/carConfirm"
        });
        // this.$store.commit("getOrders", this.allcarList);
      }
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
    //加载更多猜你喜欢事件
    // getMoreYouLike() {
    //  if (this.lock) {
    //     return;
    //   } else {
    //     this.lock = true;
    //     this.page = ++this.page;
    //     const config = {};
    //     config.districtId = this.districtId;
    //     config.size = this.size;
    //     config.page = this.page;
    //     const obj = {
    //       params: { ...config }
    //     };
    //     this.$api
    //       .get(this.HOME + this.SEARCH + "commodity/indexlike", obj)
    //       .then(res => {
    //         const arr = res.data.data;
    //         if (arr.length == 0) {
    //           // Toast("已经到底啦！");
    //           this.page = --this.page;
    //           // this.lock = false;
    //         } else {
    //           this.grous = [...this.grous, ...arr];
    //           this.lock = false;
    //         }
    //       })
    //       .catch(err => {
    //         console.log(err);
    //         this.lock = false;
    //       });
    //   }
    // },
    msg() {
      this.$router.push({
        path: "/msg"
      });
    }
  },

  filters: {
    // 过滤金额，保留2位小数
    number: function(data) {
      return data.toFixed(2);
      // return parseInt(data);
    },
    number2: function(data) {
      let num = parseFloat((data - parseInt(data)) * 100).toFixed(0);
      if (num < 10) {
        num = "0" + num;
        return num;
      } else {
        return num;
      }
    }
  },

  computed: {
    count1() {
      return this.$store.state.detail.count;
    },
    // 提交订单-数据
    allcarList() {
      // 格式化，脱离引用类型
      let allcarList = JSON.parse(JSON.stringify(this.goodslist));
      allcarList.forEach(item => {
        item.cartList = item.cartList.filter(item => item.dos);
      });
      allcarList = allcarList.filter(item => item.cartList.length);
      return allcarList;
    }
  }
  // mounted(){
  //   // 防止刷新页面数据为空
  //   if (this.$store.state.detail.count=="") {

  //     this.$store.commit('RESET_COUNT');

  //   }
  // }
};
</script>

<style lang="less" scoped>
body {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #ccc;
}
.car {
  // position: fixed;
  width: 100%;
  height: 95vh;
  background-color: #f6f6f6;
  font-family: "SourceHanSansCN-Regular";
  /deep/ .van-checkbox__icon .van-icon {
    border: 1px solid #b5b5b5;
  }

  /* 购物车头部-谭伟豪 */
  .pf {
    position: fixed;
    top: 0;
    left: 0;
  }
  .carHeader {
    width: 100%;
    height: 4.7rem;
    background-color: #00ae87;
    color: #fdfffd;
    z-index: 2000;
    padding: 1.4rem 0.6rem 1.2rem 0rem;
    display: flex;
    justify-content: center;
    align-items: center;
    .flex {
      flex: 1;
      .c_h_go {
        font-size: 2rem;
      }
    }
    .headerLeft {
      font-size: 1.7rem;
      text-align: center;
    }
    .headerRight {
      display: flex;
      justify-content: flex-end;
      align-items: "center";
      font-family: " SourceHanSansCN-Regular";
      z-index: 3;
      font-size: 1.4rem;
      background-color: #00ae87;
      .headerEdit {
        margin-right: 1.6rem;
        vertical-align: middle;
      }
      .tanchuan {
        color: black;
        text-align: center;
        position: absolute;
        right: 0.5rem;
        top: 2.5rem;
        background-color: #fff;
        padding: 0rem 2rem;
        box-shadow: 2px 3px 12px 1px #ccc;
      }
      .tanchuan::before {
        content: "123";
        position: absolute;
        font-size: 0;
        border: 8px solid transparent;
        border-bottom-color: #fff; /*这里的颜色一定要跟上面demo边框颜色一样*/
        right: 20%;
        top: -1.4rem;
      }
    }
  }
  .opacity {
    opacity: 0;
  }
  /* 购物列表*/
  .carList {
    // 修改 vant-下拉刷新样式
    // /deep/ #refresh {
    //   > .van-pull-refresh__track {
    //     > .van-pull-refresh__head {
    //     }
    //   }
    // }
    position: relative;
    width: 100%;
    background-color: #f6f6f6;
    padding-top: 0.01rem;
    padding-bottom: 4.7rem;
    .title {
      width: 100%;
      height: 3rem;
      display: flex;
      justify-content: center;
      align-items: center;
      p {
        font-size: 1.5rem;
        color: #00ae87;
        margin: 0rem 2rem;
      }
      span {
        width: 3.7rem;
        height: 0.2rem;
        background-color: #00ae87;
      }
    }
    .cl_header {
      width: 100%;
      height: 13.2rem;
      background-color: #00ae87;
      position: absolute;
      z-index: -1;
    }
    .mb-30 {
      margin-bottom: 3rem;
    }
    .goods {
      margin: 0rem 1.2rem 1.6rem 1.2rem;
      background-color: #fff;
      border-radius: 1rem;
      box-shadow: 0.1rem 0.4rem 0.6rem #e8e8e8;

      /* 商家 */
      .goods_merchants {
        display: flex;
        padding-top: 1rem;
        margin-bottom: 1rem;
        padding-left: 2rem;
        font-size: 1.2rem;
        font-weight: normal;
        font-stretch: normal;
        .goods_merchants_s {
          width: 100%;
          display: flex;
          justify-content: flex-start;
          div {
            flex: 1;
          }
          :last-child {
            text-align: right;
            padding-right: 1rem;
            color: #00ae87;
          }
        }
        .goods_merchants_checkbox {
          margin-right: 1.6rem;
        }
        i {
          display: inline-block;
          vertical-align: middle;
          margin-left: 1rem;
        }
        img {
          width: 2rem;
          height: 2rem;
          margin-right: 0.8rem;
        }
      }
      /* 商品 */
      .something {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 10rem;
        padding-bottom: 2rem;
        .something_checkbox {
          margin: 0 2rem;
          margin-right: 1.5rem;
        }
        .something_tig {
          margin: 0 2rem;
          margin-right: 0.4rem;
          background-color: #ccc;
          color: #fff;
          padding: 0.2rem 0.6rem;
          border-radius: 2rem;
        }
        .something_img {
          flex: 2;
          width: 9.2rem;
          // height: 8rem;
          height: 100%;
          margin-right: 1.6rem;
          background-size: contain;
          img {
            width: 100%;
            height: 100%;
            border-radius: 0.2rem;
          }
        }
        .something_goods {
          flex: 4;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .jieshao {
            font-size: 1.2rem;
            padding-right: 1rem;
            // 只显示1行
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            /*! autoprefixer: off */
            -webkit-box-orient: vertical;
            /*! autoprefixer: on */
            // display: flex;
            // align-items: center;
            .area {
              padding: 0rem 0.4rem;
              background-color: #00ae87;
              border-radius: 1rem;
              color: #fff;
              margin-right: 0.2rem;
              font-size: 1.1rem;
              height: 1.6rem;
              overflow: hidden;
              // line-height: 1.4rem;
            }
            .orange {
              background: #fd8320;
            }
          }
          .something_goods_jieshao {
            // flex: 1;
            width: 100%;
            // margin-top: 0.2rem;
            .span {
              display: inline-block;
              font-size: 1.1rem;
              padding: 0.3rem 0.6rem;
              color: #767676;
              background-color: #f2f2f2;
            }
          }
          .something_goods_num {
            // flex: 1;
            width: 100%;
            display: flex;
            font-size: 1.5rem;
            padding-right: 0.8rem;
            .goods_num_m {
              height: 100%;
              flex: 2;
              color: #00ae87;
              font-size: 1.3rem;
              display: flex;
              flex-direction: column-reverse;
              align-items: top;
              // span {
              // }
              .jjj {
                font-size: 1.2rem;
                color: #ff0000;
              }
              .jjj2 {
                font-size: 1.2rem;
                color: #fd8320;
              }
            }
            .goods_num_edit {
              flex: 1;
              display: flex;
              justify-content: center;
              align-items: flex-end;
              button {
                height: 90%;
                font-size: 1.8rem;
                background-color: #fff;
              }
              .num {
                margin: 0rem 0.5rem;
                width: 3rem;
                height: 2rem;
                font-size: 1.3rem;
                background-color: #eee;
                text-align: center;
              }
            }
            .goods_search {
              flex: 1;
              display: flex;
              justify-content: center;
              align-items: center;
              color: #00ae87;
              border: 0.1rem solid #00ae87;
              border-radius: 2rem;
              font-size: 1.4rem;
            }
          }
        }
      }
    }
    // 结算
  }
  .goodsfooter {
    width: 100%;
    min-height: 5rem;
    padding-left: 2rem;
    font-size: 1.6rem;
    background-color: #f6f6f6;
    display: flex;
    align-items: center;
    position: fixed;
    bottom: 5rem;
    .flex {
      flex: 1;
      margin: auto;
      .momey {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        text-align: right;
        font-size: 1.2rem;
      }
      .gf_momey {
        text-align: right;
        color: #00ae87;
        margin-right: 1.5rem;
        .gf_momey_num {
          display: inline-block;
          font-size: 1.6rem;
        }
      }
    }
    .gf_pay {
      text-align: center;
      background-color: #00ae87;
      white-space: normal nowrap;
      color: #fff;
      font-size: 1.3rem;
      height: 4.7rem;
      line-height: 4.7rem;
    }
  }
  // 返回顶部样式
  .back-to-top {
    position: fixed;
    right: 4rem;
    bottom: 6rem;
    height: 3.6rem;
    width: 3.6rem;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
