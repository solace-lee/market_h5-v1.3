<template>
  <div class="tmpl">
    <v-header></v-header>
    <div class="head"></div>
    <van-list v-model="loading" :finished="finished" @load="onLoad">
      <div class="list">
        <div class="group" v-for="(item,index) in list" :key="index">
          <div class="group-left" @click="tocommodityinfo(item.commodity_id)">
            <img :src="item.img_url" alt="">
          </div>
          <div class="group-right">
            <div class="goodsname" @click="tocommodityinfo(item.commodity_id)">
              {{item.name}}
            </div>
            <div class="serve" @click="tocommodityinfo(item.commodity_id)">
              <span v-for="(i,index) in item.server" :key="index">{{i}}</span>
            </div>
            <div class="serve2 cleafix" @click="tocommodityinfo(item.commodity_id)">
              <span>￥</span>
              <span>{{item.discount_price}}</span>
              <!-- <span>10积分</span> -->
            </div>
            <router-link :to="{path:'/indexS?shopId='+item.shop_id+'&name='+item.shop_name}">
              <div class="store cleafix">
                <span>{{item.shop_name}}</span>
                <span>进店></span>
              </div>
            </router-link>

          </div>

        </div>
      </div>
    </van-list>
    <v-baseline v-if="nomore"></v-baseline>

  </div>
</template>

<script>
  import Header from "@/common/_header.vue";
  import Baseline from "@/common/_baseline.vue";
  export default {
    components: {
      "v-header": Header,
      "v-baseline": Baseline,
    },
    data() {
      return {
        list: [],
        page: 1,
        nomore: false,
        finished: false,
        loading: true,
      };
    },
    created() {
      this.getlist();
    },
    methods: {
      // 获取列表
      getlist() {
        this.$http.get(this.HOME+"/Product/area?area=3&page=" + this.page).then(res => {
          console.log(res);
          var arr = res.data.Data.List;
          if (arr.length == 10) {
            this.serverpage++;
            console.log('加载');

          } else {
            this.nomore = true;
            this.finished = true;
            console.log('已加载全部');

          }
          var strArr = [];
          arr.forEach(val => {
            var str = val.server;
            strArr = str.split(",");
            for (let i = 0; i < strArr.length; i++) {
              console.log(strArr);
              val.server = strArr;
            }
            this.list.push(val);
          });
          this.loading = false;
        });
      },
      onLoad() {
        console.log(!this.loading)
        if (!this.loading) {
          console.log("111111111111111")
          return
        }
        this.loading = true;
        console.log(this.page)
        this.getlist()
      },
      tocommodityinfo(id) {
        console.log(123);
        //  this.$router.push({ path: "/category?name=" + "分类" });
        this.$router.push({ path: "/detail?name=商品详情"+'&id='+id });
      }
    }
  };
</script>
<style scoped lang="less">
  // 清除浮动
  .cleafix:after {
    content: ".";
    clear: both;
    display: block;
    height: 0;
    overflow: hidden;
    visibility: hidden;
  }

  .head {
    width: 100%;
    height: 4rem;
    background-color: #FFFFFF;
    z-index: 10000;
  }

  .list {
    padding: 0 10px;
  }

  .group {
    width: 100%;
    height: 120px;
    display: flex;
    margin-top: 8px;

    background-color: #fff;

    .group-left {
      width: 30vw;
      height: 30vw;
      text-align: center;

      >img {
        padding-top: 2.5%;
        width: 95%;
        height: 95%;
      }
    }
    .group-right {
      position: relative;
      padding-left: 8px;
      width: 65%;
      /* height: 100%; */
      font-size: 14px;
      line-height: 20px;
      /* display: flex;
        justify-content: center;
        flex-direction: column; */
      .goodsname {
        color: #666;
        font-weight: 600;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        /*! autoprefixer: off */
        -webkit-box-orient: vertical;
        /*! autoprefixer: on */
        word-break: break-all;
        span {
          font-size: 0.6rem;
          border: 1px solid #fc5753;
          color: #fc5753;
          padding: 0 0.2rem;
        }
      }
      .serve {
        position: absolute;
        left: 5px;
        height: 30%; // display: flex;
        // align-items: center;
        >span {
          background-color: #00ad8a;
          color: #fff;
          border-radius: 0.3rem;
          display: inline-block;
          padding: 2px 4px;
          font-size: 14px;
          line-height: 14px;
          text-align: center;
          margin: 2px;
          font-size: 12px;
        }
      }

      .serve2 {
        position: absolute;
        top: 4rem;
        left: 10px;
        display: flex;
        align-items: center;
        height: 30%;
        color: #ff8400;
        >span:nth-of-type(1) {
          font-size: 0.8rem;
        }
        >span:nth-of-type(2) {
          font-size: 1.2rem;
          left: 10px;
        }
        >span:nth-of-type(3) {
          margin-left: 1rem;
          width: 3rem;
          height: 1rem;
          display: flex;
          align-items: center;
          color: #fc5753;
          border: 1px solid #fc5753;
          border-radius: 0.3rem;
        }
      }
      .store {
        position: absolute;
        left: 10px;
        bottom: 0.5rem;
        font-size: 12px;
        span:nth-child(2) {
          color: #666666;
          margin-left: 0.4rem;
          font-size: 0.6rem;
        }
      }
    }
  }
</style>