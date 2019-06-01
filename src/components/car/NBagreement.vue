<template lang="html">

<div class="wrap">   
      <v-header></v-header>
      <div class='head'></div>
    <div class="contents" v-html="shopAgreement" v-if='name=="商家入驻协议"'>
    </div>
      <div class="contents" v-html="AgentAgreement" v-if='name=="运营商入驻协议"'>
        运营商入驻协议
    </div>

    <label class="mint-checklist-label">
              <span class="mint-checkbox"><input type="checkbox" v-model="checked" class="mint-checkbox-input" value="选项A">
                <span class="mint-checkbox-core"></span>
              </span>
              <span class="mint-checkbox-label" >我已阅读并同意《用户协议》</span>
            </label>
         <button class="numebtn bgcred btn-group btn-group-justified" v-if="checked&&name=='商家入驻协议'" @click="ruzhu2()">同意，下一步</button>
          <button class="numebtn bgcred btn-group btn-group-justified" v-if="checked&&name=='运营商入驻协议'" @click="ruzhu2Agent()">同意，下一步</button>
         <button class="numebtn btn-group btn-group-justified" role="group" aria-label="..." v-if="!checked" >同意，下一步</button>
         
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
      shopAgreement: "",
      AgentAgreement:'',
      disabled: false,
      checked: false,
      name: "",
      userId: "",
     
    };
  },
//updated() {
//  $('body').find('body').css('font-size', '1.6rem');
//},
  created() {
    this.getname(),
    // this.getdata();
      setTimeout(() => {
        this.getShopData();
        this.getAgentData();
        
      }, 1000);
  },
  methods: {
  
    
    // 获取name
    getname() {
      this.name = this.$route.query.name;
    },
    // 获取店铺入驻协议
    getShopData() {
      // this.userId = JSON.parse(sessionStorage.getItem("userInfo")).userId;
      this.$http.get(this.HOME+"/sys/GetAgreement?type=1").then(res => {
        var url = res.data.Data;
        console.log(url);
        this.$http.get(url).then(res => {
          console.log("aaa",res);
          var xinshuju = res.data.split(8)
//        this.shopAgreement = res.data;
					this.shopAgreement = xinshuju
        });
        console.log(this.shopAgreement);
      });
    },
      // 获取代理商协议
    getAgentData() {
      // this.userId = JSON.parse(sessionStorage.getItem("userInfo")).userId;
      this.$http.get(this.HOME+"/sys/GetAgreement?type=2").then(res => {
        var url = res.data.Data;
        console.log(url);
        this.$http.get(url).then(res => {
          console.log(res);
          this.AgentAgreement = res.data;
        });
        console.log("555",this.AgentAgreement);
      });
    },
    ruzhu2() {
         this.$router.push({ path: "/ruzhu2?name=商家入驻信息填写" });
      },
    ruzhu2Agent() {
      console.log(1111);
      
      this.$router.push({ path: "/ruzhu2Agent?name=运营商入驻信息填写" });
    },
    },
   

   
  }

</script>
<style lang="less" scoped>
.head {
  width: 100%;
  height: 4rem;
  background-color: #1bc6a3;
  z-index: 10000;
  border-bottom: 1px solid #F2F2F2;
}
.wrap {
  width: 100%;
  height: 100%;
  background-color: #fff;
  .header {
    height: 60px;
  }
  h2 {
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;

    font-weight: 900;
  }
  .contents {
    padding: 0.5rem;
    padding-bottom: 6rem;
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
