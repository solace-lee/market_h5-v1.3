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
      <div class="contents" v-html="shopAgreement" v-if="name=='商家入驻协议'">{{shopAgreement}}</div>
      <div class="contents" v-html="AgentAgreement" v-if="name=='运营商入驻协议'">{{AgentAgreement}}</div>

      <label class="mint-checklist-label">
        <span class="mint-checkbox">
          <input type="checkbox" v-model="checked" class="mint-checkbox-input" value="选项A">
          <span class="mint-checkbox-core"></span>
        </span>
        <span class="mint-checkbox-label">我已阅读并同意《用户协议》</span>
      </label>
      <button
        class="numebtn bgcred btn-group btn-group-justified"
        v-if="checked&&name=='商家入驻协议'"
        @click="ruzhu2()"
      >同意，下一步</button>
      <button
        class="numebtn bgcred btn-group btn-group-justified"
        v-if="checked&&name=='运营商入驻协议'"
        @click="ruzhu2Agent()"
      >同意，下一步</button>
      <button
        class="numebtn btn-group btn-group-justified"
        role="group"
        aria-label="..."
        v-if="!checked"
      >同意，下一步</button>
    </div>
  </div>
</template>

<script>
import Aside from "@/components/category/aside.vue";
import Header from "@/common/_header.vue";
import { Indicator } from "mint-ui";
export default {
  components: {
    "v-header": Header,
    "v-aside": Aside
  },
  data() {
    return {
      shopAgreement: "",
      AgentAgreement: "",
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
    this.getname(), this.getShopData();
    this.getAgentData();
  },
  methods: {
    // 获取name
    getname() {
      this.name = this.$route.query.name;
    },
    // 获取店铺入驻协议
    getShopData() {
      Indicator.open("努力加载中");
      // this.userId = JSON.parse(sessionStorage.getItem("userInfo")).userId;
      this.$api.get(this.LOCAL + "/api/getArticle/42").then(res => {
        if (res.status == 200) {
          this.shopAgreement = res.data.data.articleContent;
          Indicator.close();
        }
      })
      .catch(error => {
          Indicator.close();
        });
    },
    // 获取代理商协议
    getAgentData() {
      Indicator.open("努力加载中");
      // this.userId = JSON.parse(sessionStorage.getItem("userInfo")).userId;
      this.$api.get(this.LOCAL + "/api/getArticle/43").then(res => {
        if (res.status == 200) {
          this.AgentAgreement = res.data.data.articleContent;
          Indicator.close();
        }
      })
      .catch(error => {
          Indicator.close();
        });
    },
    ruzhu2() {
      this.$router.push({ path: "/newbusiness?name=商家入驻信息填写" });
    },
    ruzhu2Agent() {
      this.$router.push({ path: "/operator?name=运营商入驻信息填写" });
    }
  }
};
</script>
<style lang="less" scoped>
.head {
  width: 100%;
  height: 4.7rem;
  background-color: #1bc6a3;
  z-index: 10000;
  border-bottom: 1px solid #f2f2f2;
}
.op_body {
  padding-top: 4.7rem;
  // height: 100%;
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
    height: 78vh;
    overflow: scroll;
    padding: 0.5rem;
    background-color: #fff;
  }
  .mint-checklist-label {
    text-align: center;
    font-size: 1.5rem;
    color: #999;
    // position: fixed;
    bottom: 4.2rem;
    left: 50%;
    margin-top: 1rem;
    margin-bottom: 1.8rem;
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
    bottom: 1rem;
    left: 5%;
  }
  .numebtn.bgcred {
    background-color: #0bb794;
  }
}
</style>
