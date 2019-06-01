<template lang="html">
  <!-- 商品列表页 -->
  <div class="wrap">
   <div class="header-father">
      <div class="head" style="border-bottom:1px solid #7777774a;">
        <div class="site">
          <div @click='goup'>
          	<span style="width: 10px;"></span>
            <van-icon name="arrow-left" color='#000' />
            
          </div>
        </div>
        <div class="search">
          <van-icon name="search" />
          <input type="text" placeholder="搜索你想购买的商品" v-model="name">
        </div>
      </div>
      <div style="margin-top: 0px;width: 100%;position: fixed;">
      <mt-navbar v-model="selected">
        <mt-tab-item id="1">
          <span>
            <div @click="getAllList" style="font-size: 1.4rem;">
              综合
            </div>
          </span>
        </mt-tab-item>
        <mt-tab-item id="2">
          <div @click="checkPrice" style="font-size: 1.4rem;">
      
            <span>价格</span>
            <span class="el-icon-caret-bottom icon5" v-if="sort==0"></span>
            <span class="el-icon-caret-top icon5" v-if="sort==1"></span>
            <span class="el-icon-caret-bottom icon6" v-if="sort==2"></span>
          </div>
        </mt-tab-item>
        <mt-tab-item id="3" >
          <div @click="getNew" style="font-size: 1.4rem;">最新</div>
        </mt-tab-item>
        <mt-tab-item id="4">
          <div @click="shuaixuan" style="font-size: 1.4rem;">筛选
            <span class="el-icon-arrow-down icon4"></span>
          </div>
        </mt-tab-item>
      </mt-navbar>
      </div>
   </div>
    <div style='height: 5.5rem;margin-top: 24px;'></div>

    <van-list v-model="loading" :finished="finished" @load="onLoad">
      <div class="list" >
        <div class="group" v-for='item in grabble' :key="item.grabble" >
          <div class="group-left"@click="tocommodityinfo(item.commodity_id)">
            <img :src="item.img_url" alt="">
          </div>
          <div class="group-right">
            <div class="goodsname"@click="tocommodityinfo(item.commodity_id)">
              <span v-if='item.commodity_area==3'>热</span>
              <span v-if='item.commodity_area==4' style='color: #00ad8a;border: 1px solid #00ad8a'>市</span>
              {{item.name}}
            </div>
            <div class="serve"@click="tocommodityinfo(item.commodity_id)">
              <span v-for='value in item.server'>{{value}}</span>
            </div>
            <div class="serve2"@click="tocommodityinfo(item.commodity_id)">
              <span>￥</span>
              <span>{{item.discount_price}}</span>
              <span v-if='item.integral'>{{item.integral}}积分</span>
            </div>
            <div class="store" @click='goshop(item.shop_id)'>
              <span>{{item.shop_name}}</span>
              <span>进店></span>
            </div>
          </div>

        </div>
      </div>
    </van-list>

    <van-popup v-model="show" position='right' :overlay="true">
      <div class="describe">
        <div class="show-title">
          价格区间
        </div>
        <div class="num">
          <input type="number" v-model="num1" placeholder="最低价格">
          <span>-</span>
          <input type="number" v-model="num2" placeholder="最高价格">
        </div>
      </div>
      <div class="describe cleafix">
        <div class="show-title">
          <span>品牌</span>
          <span></span>
        </div>
        <ul>
          <li v-for='(item,index) in brandlist' v-bind:class="{green:flag==index }" @click='getbrandId(index,item.brand_id)' :key="index">{{item.brand_name}}</li>
          
        </ul>
      </div>
      <!-- <div class="describe">
        <div class="show-title">
          发货地区
        </div>
        <select class='select'>
          <option>广东省</option>
          <option>江西省</option>

        </select>
        <select class='select'>
          <option>广州市</option>
        </select>
        <select class='select'>
          <option>天河区</option>
        </select>
      </div> -->
      <div class="btns">
        <button>重置</button>
        <button @click='confirmNum'>确认</button>
      </div>

    </van-popup>

    <v-baseline v-if="nomore"></v-baseline>
  </div>

</template>

<script>
  import Baseline from "@/common/_baseline.vue";
  export default {
    components: {
      "v-baseline": Baseline
    },

    data() {
      return {
        flag:'y',
        selected: "1",
        count: 0,
        isLoading: false,
        loading: true,
        finished: false,
        show: false,
        nomore: false,
        grabble: [],
        num1: "",
        num2: "",
        id: "",
        samllNum: "",
        bigNum: "",
        sort: 0,
        page: 1,
        rows: 6,
        // 品牌id
        brand: '',
        brandlist:'',
        brand_id:'',
        // 第三级分类
        classify: '',
        beginAmount:"",
        endAmount:"",
        name: '',

      };
    },
    watch: {
      name() {
        console.log("搜索");
        this.grabble = [];
        this.page = 1;
        this.sort = 0;
        this.id = "";
        this.loading = true;
        this.finished = false;
        this.brand = "";
        this.bigNum = this.num2 = "";
        this.samllNum = this.num1 = "";
        this.getlist();
      }
    },
    created() {
      this.getId();
       this.getlist();
       this.getbrand();
    },
    methods: {
      getbrandId(index,brand_id){
        this.flag = index;
        if(this.flag==0){
          this.flag = false;
        }
        this.brand_id = brand_id;
        console.log(this.brand );
      },
      // 清空
      clearNum() {
        this.grabble = [];
        this.loading = true;
        this.finished = false;
        this.brand = "";
        this.page = 1;
        this.sort = 0;
        this.id = "";
        this.bigNum = this.num2 = "";
        this.samllNum = this.num1 = "";
        this.show = false;
      },
      // 到店铺
    goshop(shopid) {
      this.$router.push({ path: "/indexS?shopId=" + shopid });
    },
      // 筛选
      confirmNum() {
        this.grabble = [];
        this.page = 1;
        this.sort = 0;
        this.id = "";
        this.loading = true;
        this.finished = false;
        this.brand = this.brand_id;
        this.beginAmount = this.num1;
        this.endAmount = this.num2;
        this.show = false;
        this.getlist();
        this.num1 = ''
        this.num2 ='' 
        this.flag ='y'
      },
      // 打开筛选
      shuaixuan() {
        this.show = true;
      },
      // 获取id?
      getId() {
        if (this.$route.query.id) {
          this.classify= this.$route.query.id;
          this.getlist();
        }
        if (this.$route.query.brandId) {
          this.brand = this.$route.query.brandId;
          this.getlist();
        }
      },
      // 获取列表
      getlist() {
        this.nomore = false;
        this.grabble=[];
        this.$http
          .post(this.HOME+"/Product/GetCommodity", {
            page: this.page,
            rows: this.rows,
            brand: this.brand,
            classify: this.classify,
            name: this.name,
            sort:this.sort,
            endAmount:this.endAmount,
            beginAmount:this.beginAmount,

          }).then(res => {
            console.log(res);
            var arr = res.data.Data.List;
            if (arr.length==this.rows) {
              this.page++;
              
            } else {
           this.nomore = true;
              this.finished = true;
              console.log("已加载全部");
            }
            var strArr = [];
            arr.forEach(val => {
              console.log(val);
              console.log(val.server);
              var str = val.server;
              strArr = str.split(',')
              val.server = strArr
              this.grabble.push(val);
            });

            this.loading = false;
          });
      },
      //  综合列表
      getAllList() {
        this.grabble = [];
        this.page = 1;
        this.loading = true;
        this.finished = false;
        this.brand = "";
        this.id = "";
        this.bigNum = this.num2 = "";
        this.samllNum = this.num1 = "";
        this.sort = 0;
        this.getlist();
      },
      onLoad() {
        console.log(!this.loading);
        if (!this.loading) {
          this.loading = false;
          console.log("111111111111111");
          return;
        }
        this.loading = true;
        console.log(this.page);
        this.getlist();
      },
      getNew() {
        this.grabble = [];
        this.page = 1;
        this.loading = true;
        this.finished = false;
        this.brand = "";
        this.id = "";
        this.bigNum = this.num2 = "";
        this.samllNum = this.num1 = "";
        this.sort = 4;
        this.getlist();
      },
      // 获取品牌
      getbrand(){
        this.$http.get(this.HOME+'/brand/getbrand').then(res=>{
          console.log(res);
          this.brandlist = res.data.Data;
          
        })
      },
      // 根据价钱查询
      checkPrice() {
        this.grabble = [];
        this.page = 1;
        this.loading = true;
        this.finished = false;
        this.brand = "";
        this.id = "";
        this.bigNum = this.num2 = "";
        this.samllNum = this.num1 = "";
        if (this.sort == 0) {
          this.sort = 1;
        } else if (this.sort == 1) {
          this.sort = 2;
        } else if (this.sort == 2) {
          this.sort = 0;
        } else {
          this.sort = 0;
        }
        this.getlist();
      },

      // 访问详情页
      tocommodityinfo(id) {
        console.log(id);
        this.$router.push({ path: "/detail?id=" + id });
      },
      goup() {
        this.$router.go(-1);
      }
    }
  };
</script>

<style lang="less" scoped>
  @import "../assets/fz.less";
  @import "../assets/index/style.css";
  @import "../assets/user/icon/carstyle.css";
  // 清除浮动
  .cleafix:after {
    content: ".";
    clear: both;
    display: block;
    height: 0;
    overflow: hidden;
    visibility: hidden;
  }

  .select {
    height: 2rem;

  }
  .green{
    color:#fff;
    background-color: #0BB794 !important;
  }

.mint-navbar .mint-tab-item {
    width: 25%;
    padding: 17px 0;
    font-size: 15px;
}
.mint-navbar .mint-tab-item.is-selected {
    border-bottom: 3px solid #0BB794;
    color: #0BB794;
    margin-bottom: -3px;
    width: 25% !important;
}
.header-father{
  width: 100%;
  position: fixed;
  z-index: 10000;
}
  .head {
    width: 100%;
    height: 4rem;
    background-color: #FFFFFF;
    display: flex;
    
    .site {
      width: 4rem;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      div {
        display: flex;
        justify-content: center;
        align-items: center;
        .van-icon-location {
          vertical-align: middle;
        }
        span {
          font-size: 1rem;
          color: #000000;
        }
      }
    }
    /*搜索框*/
    .search {
    	margin-left: 6%;
      flex: 1;
      position: relative;
      display: flex;
      align-items: center;
      vertical-align: middle;
      .van-icon-search {
        position: absolute;
        top: 1.4rem;
        left: 2rem;
        align-items: center;
      }
      input {
      	align-items: center;
        width: 80%;
        padding: 0.7rem 0 0.7rem 3rem;
        border: none;
        font-size: 1.4rem;
        border-radius: 3rem;
        background-color: #EBEBEB;
      }
    }
  }

  // 筛选
  .wrap>.van-popup {
    border-radius: 8px;
    overflow: hidden;
    width: 80%;
    height: 100%;
    z-index:1000000 !important;
    padding: .5rem;
    .describe {
      width: 100%;
      padding-bottom: 1rem;
      .show-title {
        width: 100%;
        padding: .6rem .3rem;
        font-size: 1.6rem;

      }
      .num {
        width: 100%;
        input {
          width: 40%;
          text-align: center;
          background-color: #EEEEEE;
          font-size: 1.4rem;
          padding: .4rem;
          color: #999999;
          margin-left: 0;
          border-radius: .3rem;
        }

      }
      ul {
        width: 100%;
        overflow: scroll;
        li {
          float: left;
          padding: .3rem;
          margin: .3rem;
          background-color: #EEEEEE;
          font-size: 1.3rem;
          border-radius: .3rem
        }
      }
    }
    .btns {

      width: 100%;
      position: absolute;
      bottom: 0;
      button {
        width: 49%;
        height: 4rem;
        font-size:1.6rem;
      }
      button:nth-child(1) {
        background-color: #fff;
        color: #666666;
      }
      button:nth-child(2) {
        background-color: #FF8400;
        color: #fff;
      }
    }
  }


  .price-box {
    height: 3rem;
    width: 20rem;
    display: flex;
    >div {
      width: 4rem;
      height: 1.5rem;
      /* line-height: 1.5rem; */
      overflow: hidden;
      text-align: center;
    }
    .num {
      width: 8rem;
      padding: 0;
      border: 1px solid #ccc;
      border-radius: 8px;
      input {
        margin-left: 0;
        width: 100%;
        height: 1.5rem;
      }
      input::-webkit-input-placeholder {
        padding-left: 0.2rem;
        color: #aab2bd;
        line-height: 1.5rem;
        font-size: 12px;
      }
    }
  }

  .btn {
    margin-top: 0.5rem;
    display: flex;
    span {
      text-align: center;
      flex: 1;
      height: 2.5rem;
      line-height: 2.5rem;
      /* padding: 2px 5px; */
      color: #fff;
    }
    .btn1 {
      background-color: #ff6565;
      border-radius: 2.5rem 0 0 2.5rem;
    }
    .btn2 {
      background-color: #cd2a34;
      border-radius: 0 2.5rem 2.5rem 0;
    }
  }

  .wrap {
    width: 100%;
    height: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    /*! autoprefixer: off */
    -webkit-box-orient: vertical;
    /*! autoprefixer: on */
    -webkit-box-direction: normal;
    -ms-flex-flow: column nowrap;
    flex-flow: column nowrap;

    .list {
      padding: 0 10px;
    }
    .group {
    	
      width: 100%;
      /* height: 120px;  */
      display: flex;
      margin-top: 8px;
      padding: .5rem;

      background-color: #fff;

      .group-left {
        width: 33vw;
        height: 33vw;
        text-align: center;

        >img {
        	border-radius: 6px;
          padding-top: 2.5%;
          width: 95%;
          height: 95%;
        }
      }
      .group-right {
      	  	margin-top: 4px;
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
          /* height: 40%; */
          font-size: 1.6rem;
          color: #666;
          font-weight: 600;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
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
            font-size: 12px
          }
        }
      }
    }
  }
  .serve2 {

    height: 3.6rem;
    border: 1px solid #fff;
    display: flex;
    align-items: center;

    color: #ff8400;
    >span:nth-of-type(1) {
      font-size: 0.8rem;
    }
    >span:nth-of-type(2) {
      font-size: 1.8rem;
      left: 10px;
    }
    >span:nth-of-type(3) {
      margin-left: 1rem;
      height: 1rem;
      display: flex;
      align-items: center;
      color: #fc5753;
      border: 1px solid #fc5753;
      border-radius: 0.3rem;
      padding: .1rem .2rem;
    }
  }

  .store {
    position: absolute;
    left: 10px;
    bottom: 0;
    height: 2.2rem;
    span:nth-child(2) {
      color: #666666;
      margin-left: .4rem;
      font-size: .6rem;
    }
  }

  .car {
    width: 100%;
    padding-bottom: 14vw;
    background-color: #eee;
    h1 {
      width: 100%;
      height: 8vh;
      background: rgb(129, 123, 123);
      text-align: center;
      line-height: 8vh;
      color: #fff; // border: 1px solid #000;
    }
    .header {
      width: 100%;
      height: 40vw;
      background: url(../../static/carbg.png) center #ff6170;
      background-size: auto 100%;
      padding: 3.2vw 0;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      .header-icon {
        border: 0.4vw solid #ffffff;
        background-color: @cl;
        margin-left: 6vw;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        width: 14vw;
        height: 14vw;
        line-height: 16vw;
        text-align: center;
        border-radius: 50%;
        margin-top: 2vw;

        span {
          .fz(font-size, 54);
          &::before {
            color: #ffffff;
          }
        }
      }
      >span {
        margin-left: 3.2vw;
        .fz(font-size, 30);
        color: #ffffff;
        letter-spacing: 0.2vw;
        margin-top: 7vw;
      }
    }
    .main {
      width: 90%; // border: 1px solid #000;
      margin: 0 auto;
      border-radius: 10px;
      position: relative;
      top: -80px;
      .my-indent {
        width: 100%;
        display: block;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        color: #333;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        padding: 0 5vw;
        height: 15vw;
        line-height: 15vw;
        background-color: #fff;
        border-top-right-radius: 8px;
        border-top-left-radius: 8px; // border: 1px solid #000;
        margin-bottom: -1px;
        .bd();
        &:active {
          background-color: rgb(224, 227, 230);
        }

        .my-indent-right {
          span {
            display: inline-block;
            .fz(font-size, 28);
            color: rgba(0, 0, 0, 0.4);
            position: relative;
          }
          i {
            position: relative;
            top: 0.8vw;
          }
        }
      }

      .my-pay {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        width: 100%;
        padding: 2vw 0;
        background-color: #fff;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px; // border: 1px solid #fff;
        .bd();

        >a {
          display: block;
          width: 33.33%;
          color: #999;
          text-align: center;

          >span {
            .fz(font-size, 50);
            margin-top: 2.3vw;
            display: block;
            text-align: center;
          }

          p {
            padding: 2.3vw 0;
            text-align: center;
          }
        }
      }
      .my-indent2 {
        width: 100%;
        display: block;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        color: #333;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        padding: 0 5vw;
        height: 15vw;
        line-height: 15vw;
        background-color: #fff;
        border-top-right-radius: 8px;
        border-top-left-radius: 8px;
        margin-top: 10px; // border: 1px solid #000;
      }
      .my-pay2 {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        width: 100%;
        padding: 2vw 0;
        background-color: #fff; // border: 1px solid #000;
        // margin-top: 10px;
        // height: 30vw;
        // line-height: 30vw;
        .bd();

        >a {
          display: block;
          width: 33.33%;
          color: #999;
          text-align: center;

          >span {
            .fz(font-size, 50);
            margin-top: 2.3vw;
            display: block;
            text-align: center;
          }

          p {
            padding: 2.3vw 0;
            text-align: center;
          }
        }
      }

      .my-vip,
      .my-service,
      .my-settle {
        width: 100%; // border: 1px solid #fff;
        background-color: #fff;
        .mt();
        .bd();
        .bt();
        >a {
          background-color: #fff;
          display: block;
          width: 100%;
          display: -ms-flex;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          height: 15vw;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          -webkit-box-pack: justify;
          -ms-flex-pack: justify;
          justify-content: space-between;
          padding: 0 6vw;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          &:active {
            background-color: rgb(224, 227, 230);
          }
          >div {
            -ms-flex: 2;
            -webkit-box-flex: 2;
            flex: 2;
            padding-top: 1.3vw;
          }

          .my-vip-top-div {
            padding-top: 0;
          }
          >p {
            -ms-flex: 10;
            -webkit-box-flex: 10;
            flex: 10;
            position: relative;

            &:active {
              background-color: rgb(224, 227, 230);
            }

            i {
              position: absolute;
              right: 0;
              top: 0.4vw;
            }
          }
        }
      }
    }
  }

  .seek {
    min-height: 42px;
  }

  .mint-navbar {
    background-color: #fff;
    display: -webkit-box;
    display: -ms-flexbox;
    /* display: flex; */
    /* text-align: center; */
  }

  .mint-navbar .mint-tab-item.is-selected {
    border-bottom: 3px solid #0BB794;
    color: #0BB794;
    margin-bottom: -3px;
  }
</style>