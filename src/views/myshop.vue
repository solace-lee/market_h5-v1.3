<template>
  <div class="tmpl">
    <div class="box">
      <div class="head">
        <div class="site">
          <div @click="$router.replace({path:'/user'})">
            <span style="width: 10px;"></span>
            <van-icon name="arrow-left"/>
          </div>
        </div>
        <div class="title">店铺入驻</div>
        <div class="add">
          <!-- <img src="../../img/index/myshop/contant.png">
          <span style="width: 10px;" class="kefu">客服</span> -->
        </div>
      </div>

      <!-- 头像 -->
    </div>
    <div style="width: 100%;height: 4rem;"></div>
    <!-- 没有店铺 -->
    <div class="box" v-if="shopId==0" key="1">
      <div class="img">
        <!--<img src="../../img/userImg/comm_bg_empty.png" alt="">-->
        <img src="../../img/index/myshop/banner.png" style="width: 100%; height: 100%;margin: 0;">
      </div>
      <p class="ruzhu">
        <img src="../../img/index/myshop/ruzhuliucheng.png">
      </p>

      <div class="diyibu">
        <div class="tupian">
          <img src="../../img/index/myshop/zhucetubiao.png">
        </div>
        <div class="wenzi">
          <p class="diyibuzi">第一步</p>
          <p class="zhuce">注册账号</p>
          <p class="shuru">输入姓名、身份证、手机号、店铺资源等...</p>
        </div>
      </div>

      <div class="diyibu">
        <div class="tupian">
          <img src="../../img/index/myshop/renzhengtubiao.png">
        </div>
        <div class="wenzi">
          <p class="diyibuzi">第二步</p>
          <p class="zhuce">店铺认证</p>
          <p class="shuru">进行店铺审核认证</p>
        </div>
      </div>

      <div class="diyibu">
        <div class="tupian">
          <img src="../../img/index/myshop/zizhitubiao.png">
        </div>
        <div class="wenzi">
          <p class="diyibuzi">第三步</p>
          <p class="zhuce">提交资质</p>
          <p class="shuru">上传你的身份证、资质等信息</p>
        </div>
      </div>

      <div class="diyibu">
        <div class="tupian">
          <img src="../../img/index/myshop/dengdaishenghe.png">
        </div>
        <div class="wenzi">
          <p class="diyibuzi">第四步</p>
          <p class="zhuce">等待审核</p>
          <p class="shuru">等待平台认证</p>
        </div>
      </div>

      <!--入驻后您可获得-->
      <p class="ruzhu">
        <img src="../../img/index/myshop/a.png">
      </p>
      <!--入驻后您可获得-->
      <div class="diyibu dierbu">
        <div class="wenzi">
          <p class="diyibuzi">独家经营权</p>
          <p class="zhuce">可获得周边经营权</p>
        </div>
        <div class="tupian">
          <img src="../../img/index/myshop/pingtai.png">
        </div>
      </div>
      <div class="diyibu dierbu">
        <div class="wenzi">
          <p class="diyibuzi">资源整合平台</p>
          <p class="zhuce">平台提供全面多元化资源</p>
        </div>
        <div class="tupian">
          <img src="../../img/index/myshop/shouyi.png">
        </div>
      </div>
      <div class="diyibu dierbu">
        <div class="wenzi">
          <p class="diyibuzi">多方面收益</p>
          <p class="zhuce">具有多方面的收益</p>
        </div>
        <div class="tupian">
          <img src="../../img/index/myshop/zhengfu.png">
        </div>
      </div>
      <div class="diyibu dierbu">
        <div class="wenzi">
          <p class="diyibuzi">政府扶持项目</p>
          <p class="zhuce">政府大力扶持加快农村发展</p>
        </div>
        <div class="tupian">
          <img src="../../img/index/myshop/dujia.png">
        </div>
      </div>

      <div style="height: 15rem;"></div>
      <div class="btns" v-if="userType != 2">
        <button @click="ruzhu('商家入驻协议')">店铺入驻</button>
      </div>
      <br>
      <div class="btns" v-if="userType != 3">
        <button @click="ruzhu('运营商入驻协议')">运营商入驻</button>
      </div>
      <div class="line"></div>
    </div>

    

    <!-- 店铺信息 -->
    <div class="box" v-if="shopId!=0">
      <div class="userImg">
        <img :src="userInfo.shop_img_url" alt>
      </div>
      <div class="money">
        <span>收益：</span>
        <span>￥{{balance}}</span>
        <div>
          <button class="btn" @click="myYunying('我的运营')" v-if="userType == 6">生意通</button>
          <button @click="ruzhu('运营商入驻协议')" style class="btn" v-else>生意通</button>
        </div>
      </div>
      <div class="btnFather">
        <button :class="{'activeA':isA,'activeB':isB}" @click="getShopMsg">店铺信息</button>
        <button :class="{'activeA':isB,'activeB':isA}" @click="getDetails">钱包详情</button>
      </div>
      <!-- 店铺信息 -->
      <div class="shopmsg" v-if="onoff">
        <ul>
          <li>
            <span>店铺名称:</span>
            <span>{{userInfo.shop_name}}</span>
          </li>
          <li>
            <span>店铺性质:</span>
            <span>{{userInfo.nature}}</span>
          </li>

          <li>
            <span>店铺分类:</span>
            <span>{{userInfo.firstClassify}} / {{userInfo.secondClassify}} / {{userInfo.thirdClassify}}</span>
          </li>
          <li>
            <span>店铺联系人:</span>
            <span>{{userInfo.contact_name}}</span>
          </li>
          <li>
            <span>联系电话:</span>
            <span>{{userInfo.contact_phone}}</span>
          </li>
          <li>
            <span>店铺地址:</span>
            <span>{{userInfo.province}}{{userInfo.city}}{{userInfo.district}}{{userInfo.Village}}{{userInfo.address_detail}}</span>
          </li>
          <li></li>
          <li>
            <span style="width: 90vw">
              请通过电脑端登录
              <a @click="copyText">https://admin.zhulixc.com</a>进入商铺后台
            </span>
          </li>
          <!--<li>
          	<input type="text" value="https://admin.zhulixc.com" id="copyObj" style="opacity: 0;">
          </li>-->
        </ul>
      </div>
      <!-- 钱包详情 -->
      <div v-if="!onoff">
        <!--      <van-list v-model="loading" :finished="finished" @load="onLoad">-->
        <div class="detail_" v-for="(item,index) in list" :key="index">
          <div>
            <div class="left" style="font-size: 1.6rem;">
              <span class="red" v-if="item.order_num==null">结算-{{item.details_amount}}</span>
              <span class="green" v-if="item.order_num!=null">收入+{{item.transfer_amount}}</span>
              <!--<span class="green" v-if="item.wallet_type=='1'">返现+{{item.details_amount}}</span>
							<span class="red" v-if="item.wallet_type=='2'">支付-{{item.details_amount}}</span>							
							<span class="red" v-if="item.wallet_type=='3'">结算-{{item.details_amount}}</span>
              <span class="green" v-if="item.wallet_type=='4'">收入+{{item.details_amount}}</span>-->
            </div>
          </div>
          <div class="right">
            <p>{{item.createddate}}</p>
          </div>
        </div>

        <!--				</van-list>-->
        <div class="footer">
          <button class="carry" @click="getCarry(balance)">结算</button>
        </div>
        <v-baseline></v-baseline>
      </div>
      <!--<div class="btnFather" >
                <button @click='ruzhu("代理商入驻协议")'>代理入驻</button>
      </div>-->
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import Header from "@/common/_header.vue";
import Baseline from "@/common/_baseline.vue";
export default {
  components: {
    "v-header": Header,
    "_v-baseline": Baseline,
    get "v-baseline"() {
      return this["_v-baseline"];
    },
    set "v-baseline"(value) {
      this["_v-baseline"]=value;
    },
  },
  data() {
    return {
      nomore: false,
      finished: false,
      loading: true,
      isA: true,
      isB: false,
      onoff: true,
      token: "",
      userInfo: {},
      shopId: "",
      page: 1,
      row: 10,
      list: [],
      balance: "",
      wallet_amount: "",
      userType: 0
    };
  },
  created() {
    this.userType = this.$route.query.userType
    // this.getDetail();
    // this.getShopMsg();
    // this.userType = localStorage.getItem("userType");
  },

  methods: {
    //	 CopyUrl(){
    //    let url = document.querySelector('#copyObj');
    //    url.select(); // 选择对象
    //    document.execCommand("Copy");
    //  },
    copyText() {
      let copyInput = document.createElement("INPUT");
      copyInput.type = "https://admin.zhulixc.com";
      copyInput.style.width = "1px";
      copyInput.style.height = "1px";
      copyInput.style.border = 0;
      copyInput.style.outline = 0;
      document.body.appendChild(copyInput);
      copyInput.value = "https://admin.zhulixc.com";
      copyInput.select();
      const result = document.execCommand("Copy");
      document.body.removeChild(copyInput);
      //Toast('网址复制成功，请到电脑端登录！');
      return result;
    },
    //前往我的运营
    myYunying(name) {
      this.$router.push({
        path: "/agent?name=" + name
      });
    },
    // 去运营商入驻协议
    ruzhu(name) {
      this.$router.push({
        path: "/OPagreement?name=" + name
      });
    },
    getShopMsg() {
      this.onoff = true;
      this.isA = true;
      this.isB = false;
      this.$http
        .get(this.HOME + "/shop/getshopinfo?token=" + this.token)
        .then(res => {
          console.log(res);
          this.userInfo = res.data.Data.Info;
          this.shopId = res.data.Data.Info.shop_id;
          this.wallet_amount = res.data.Data.Wallet.wallet_amount;
        });
    },
    // 钱包详情
    getDetails() {
      this.onoff = false;
      this.isA = false;
      this.isB = true;
      this.$http
        .get(
          this.HOME +
            "/user/getwalletdetails/2?token=" +
            this.token +
            "&page=" +
            this.page +
            "&rows=" +
            this.row
        )
        .then(res => {
          console.log(res);
          this.list = res.data.Data.detail;
        });
    },
    getDetail() {
      this.onoff = false;
      this.isA = false;
      this.isB = true;
      this.$http
        .get(
          this.HOME +
            "/user/getwalletdetails/2?token=" +
            this.token +
            "&page=" +
            this.page +
            "&rows=" +
            this.row
        )
        .then(res => {
          this.balance = res.data.Data.balance;
          this.loading = false;
        });
    },
    onLoad() {
      if (!this.loading) {
        return;
      }
      this.loading = true;
      this.getDetails();
    },
    getCarry(balance) {
      this.$router.push({
        //					path: "/Carry?name=结算" + '&balance=' + balance
        path:
          "/wallet1Carry?name=结算" +
          "&balance=" +
          this.balance +
          "&title=" +
          "店铺" +
          "&type=2"
      });
    }
  }
};
</script>
<style scoped lang="less">
.footer {
  position: fixed;
  left: 0px;
  bottom: 20px;
  width: 100%;
  height: 50px;
  z-index: 9999;
}

.detail_ {
  width: 100%;
  height: 4rem;
  padding: 0.4rem 0;
  border-top: 0.03rem solid #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.6rem;
  .left {
    .red {
      display: inline-block;
      width: 8rem;
      text-align: center;
      color: #cb2221;
    }
    .green {
      display: inline-block;
      width: 8rem;
      text-align: center;
      color: rgb(0, 173, 136);
    }
    p {
      font-size: 1rem;
      color: #999999;
      padding-left: 3rem;
    }
  }
  .jifen {
    padding-left: 2rem;
    color: #666666;
    p {
      padding: 0.3rem 0 0 0;
    }
  }
  .right {
    font-size: 1.4rem;
    padding-right: 1rem;
    height: 100%;
    display: flex;
    align-items: center;
  }
}

.carry {
  background-color: #00ad8a;
  color: #fff;
  border-radius: 3rem;
  font-size: 1.6rem;
  height: 4rem;
  width: 80%;
  margin-top: 20px;
  margin-left: 10%;
}

.box {
  margin-top: -6rem;
  width: 100vw;
  -background-color: #fff;
  height: 100rem;
  .img {
    width: 100%;
    padding-top: 10rem;
    text-align: center;
    img {
      width: 13rem;
    }
  }
  p {
    width: 100%;
    text-align: center;
    color: #999999;
    padding: 1rem 0 2rem 0;
  }
  .btns {
    // margin-top: 15rem;
    padding: 0 3rem;
    button {
      width: 100%;
      padding: 0.7rem 0;
      color: #fff;
      background-color: #00ad8a;
      border-radius: 0.8rem;
    }
  }
  .btns2 {
    margin-top: 0rem;
  }
}

.head {
  border-bottom: 1px solid #f2f2f2;
}

.box {
  .userImg {
    width: 100%;
    height: 8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 4rem;
      height: 4rem; // border: 1px solid #ccc;
    }
  }
  .money {
    padding: 0.6rem 1rem;
    font-size: 1.6rem;
    color: #666;
    span:nth-child(2) {
      font-size: 1.6rem;
      color: #fd8e00;
    }
  }
  .btnFather {
    width: 100%;
    height: 3rem;
    display: flex;
    justify-content: space-between;
    button {
      width: 50%;
      border: 1px solid #00ad8a;
      font-size: 1.6rem;
    }
  }
}

.activeA {
  background-color: #00ad8a;
  color: #fff;
}

.activeB {
  -background-color: #fff;
  color: #00ad8a;
}

.shopmsg {
  width: 100%;
  ul {
    margin: 2rem;
    li {
      padding-right: 0.5rem;
      height: 3rem;
      display: flex;
      justify-content: space-between;
      line-height: 2rem;
      span {
        // display: inline-block;
        width: 25%;
        text-align: left;
        font-size: 1.5rem;
      }
      span:nth-child(2) {
        flex: 1;
        text-align: left;
        padding-left: 1rem;
      }
    }
  }
}

.detail_ {
  width: 100%;
  padding: 0.4rem 0;
  border-top: 0.07rem solid #ccc;
  display: flex;
  justify-content: space-between;
  .left {
    color: #999999;
    span {
      display: block;
      padding: 0 0.8rem;
    }
    span:nth-child(1) {
      font-size: 1.6rem;
      padding-bottom: 0.2rem;
    }
  }
  .right {
    padding-right: 1rem;
    height: 100%;
    line-height: 2rem;
    color: #ff8400;
  }
}

.tmpl {
  width: 100%;
  height: 100%;
}

.box {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  /*background-image: url(../assets/login/drawable-xhdpi/底板.png);*/
  // background-repeat: no-repeat;
  // background-size: 100% 146%;
  // background-position: 0 0;
  .head {
    background: #00ae87;
    width: 100%;
    height: 4.7rem;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    display: flex;
    font-size: 2rem;
    color: #fff;
    .site {
      flex: 1;
      font-size: 1.8rem;
      text-align: center;
      line-height: 5rem;
      color: #fff;
    }
    .title {
      height: 100%;
      flex: 5;
      text-align: center;
      line-height: 4.7rem;
      font-size: 1.6rem;
    }
    .add {
      flex: 1;
    }
  }
  .avater {
    width: 100%;
    height: 100%;
    div {
      width: 38%;
      margin: 3.5rem auto;
      img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
  }
}



.kefu {
  width: 24.5px;
  height: 11.5px;
  font-family: SourceHanSansCN-Regular;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #f5f4f4;
}

.ruzhu {
  width: 185px;
  height: 33.5px;
  margin-top: 2.5rem;
}

.ruzhu img {
  width: 185px;
  height: 33.5px;
}

.diyibu {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3.5rem;
}
.dierbu {
  height: 8rem;
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-around;
  padding: 0 3rem;
}
.diyibu .tupian {
  /*display: inline-block;*/
  /*margin-right: 40px;*/
  margin-left: 80px;
  margin-right: 2rem;
}

.diyibu .wenzi {
  height: 50.5px;
  display: inline-block;
}

.diyibu .tupian img {
  width: 31px;
  height: 28.5px;
}

.diyibu .wenzi .diyibuzi {
  width: 60px;
  height: 12px;
  font-size: 13px;
  text-align: left;
  padding: 0;
  color: #c0750b;
}

.diyibu .wenzi .zhuce {
  width: 90px;
  height: 15px;
  font-size: 15px;
  text-align: left;
  color: #c0750b;
  padding: 0;
  margin-top: 7px;
  font-family: SourceHanSansCN-Bold;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 4px;
  color: #222222;
}

.diyibu .wenzi .shuru {
  width: 240px;
  height: 9px;
  font-size: 9px;
  text-align: left;
  font-family: SourceHanSansCN-Regular;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 2px;
  color: #222222;
  padding: 0;
  margin-top: 9px;
}

.dierbu .tupian {
  // float: right;
  /*display: inline-block;*/
  // margin-right: 80px;
}

.dierbu .tupian img {
  width: 8rem;
  height: 7rem;
  box-shadow: 0px 5px 3px 0px rgba(31, 31, 31, 0.16);
}

.dierbu .wenzi {
  /*width:100%;*/
  height: 5rem;
}

.dierbu .wenzi .diyibuzi {
  width: 100%;
  height: 18px;
  font-size: 18px;
  text-align: left;
  padding: 0;
  color: #4c4c4c;
}

.dierbu .wenzi .zhuce {
  width: 90px;
  height: 18px;
  font-family: SourceHanSansCN-Regular;
  font-size: 11px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #4c4c4c;
}

.line {
  height: 4rem;
  width: 100%;
  background: #fff;
}
</style>