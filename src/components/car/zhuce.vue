<template>
  <div class="wrap">
    <div class="op_head">
      <div>
        <van-icon name="arrow-left" @click="$router.go(-1)" class="nu_h_go"/>
      </div>
      <div class="op_h_text">{{name}}</div>
      <div></div>
    </div>
    <div class="op_body">
      <div class="contents" v-html="userAgreement" v-if="name=='注册协议'">{{userAgreement}}</div>
      <div class="contents" v-html="lawAgreement" v-if="name=='法律声明协议'">{{lawAgreement}}</div>
      <div class="contents" v-html="privacyAgreement" v-if="name=='隐私协议'">{{privacyAgreement}}</div>
    </div>
  </div>
</template>

<script>
import Aside from "@/components/category/aside.vue";
import Header from "@/common/_header.vue";
export default {
  components: {
    "v-header": Header,
    "v-aside": Aside
  },
  data() {
    return {
      userAgreement: "",
      lawAgreement: "",
      privacyAgreement: "",
      disabled: false,
      checked: false,
      name: "",
      userId: ""
    };
  },
  //updated() {
  //  $('body').find('body').css('font-size', '1.6rem');
  //},
  created() {
    this.getname(),
      // this.getdata();
    this.getUserData();
    this.getLawData();
    this.getPrivacyData();
  },
  methods: {
    // 获取name
    getname() {
      this.name = this.$route.query.name;
    },
    // 获取店铺入驻协议
    getUserData() {
      // this.userId = JSON.parse(sessionStorage.getItem("userInfo")).userId;
      this.$api.get(this.LOCAL + "/api/getArticle/41").then(res => {
        if (res.status == 200) {
          this.userAgreement = res.data.data.articleContent;
        }
      }).catch(error => {
          Indicator.close();
        });
    },
    // 获取代理商协议
    getLawData() {
      // this.userId = JSON.parse(sessionStorage.getItem("userInfo")).userId;
      this.$api.get(this.LOCAL + "/api/getArticle/44").then(res => {
        if (res.status == 200) {
          this.lawAgreement = res.data.data.articleContent;
        }
      }).catch(error => {
          Indicator.close();
        });
    },
    getPrivacyData() {
      // this.userId = JSON.parse(sessionStorage.getItem("userInfo")).userId;
      this.$api.get(this.LOCAL + "/api/getArticle/45").then(res => {
        if (res.status == 200) {
          this.privacyAgreement = res.data.data.articleContent;
        }
      }).catch(error => {
          Indicator.close();
        });
    }
  }
};
</script>
<style lang="less" scoped>
.head {
  width: 100%;
  height: 4rem;
  background-color: #1bc6a3;
  z-index: 10000;
  border-bottom: 1px solid #f2f2f2;
}
.wrap {
  width: 100%;
  height: 100vh;
  background-color: #f1f1f1;
  .op_head {
    width: 100%;
    height: 4.7rem;
    color: #fff;
    background-color: #00b28a;
    top: 0;
    z-index: 1001;
    line-height: 4.7rem;
    font-size: 1.6rem;
    display: flex;
    position: fixed;
    top: 0;
    // justify-content: center;
    // align-items: center;
    div {
      flex: 1;
      .nu_h_go {
        margin-left: 1rem;
        font-size: 2rem;
        display: inline-block;
        vertical-align: middle;
      }
    }
    .op_h_text {
      flex: 2;
      text-align: center;
    }
    .op_body {
      padding-top: 4rem;
    }
  }
  h2 {
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;

    font-weight: 900;
  }
  .contents {
    overflow: scroll;
    padding: 0.5rem;
    background-color: #fff;
  }
  .mint-checklist-label {
    text-align: center;
    font-size: 1.5rem;
    color: #999;
    /*    position: fixed;*/
    bottom: 4.2rem;
    left: 50%;
    margin-bottom: 18px;
    white-space: nowrap;
    /*    transform: translate(-50%);*/
  }
  .mint-checkbox-input:checked + .mint-checkbox-core {
    background-color: #0bb794;
    border-color: #0bb794;
  }
  .numebtn {
    /* border: 1px solid #000; */
    width: 90%;
    height: 4rem;
    color: #fff;
    background-color: #999;
    font-size: 1.6rem;
    border-radius: 3rem;
    /*    position: fixed;*/
    bottom: 1rem;
    left: 5%;
  }
  .numebtn.bgcred {
    background-color: #0bb794;
  }
}
</style>
