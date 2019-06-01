<template>
  <div class="newUser">
    <div class="box">
      <!-- 头部 -->
      <div class="nu_head">
        <div>
          <van-icon name="arrow-left" @click="$router.go(-1)" class="nu_h_go"/>
        </div>
        <div class="nu_h_text">注册</div>
        <div></div>
      </div>
      <!-- 头像 -->
      <div class="avater">
        <div>
          <img src="../../../img/index/newuser/logo.png" alt>
        </div>
      </div>
    </div>

    <div class="box2">
      <div class="form">
        <el-form :model="ReginForm" ref="ReginForm" :rules="rule" label-width="0">
          <div
            class="li"
            v-for="(item,index) in siYuan"
            :key="index"
            :class="{ active:index==isActive }"
            @click="changeValue(index)"
          >
            <i :class="item.class"></i>
            <input
              v-if="item.name==='用户名/手机号'"
              :type="item.type"
              v-model.number="ReginForm.userPhone"
              :placeholder="item.name"
            >
            <input
              v-if="item.name==='请输入密码'"
              :type="item.type"
              v-model="ReginForm.userPwd"
              :placeholder="item.name"
            >
            <input
              v-if="item.name==='请输入短信验证码'"
              class="auth_input"
              :type="item.type"
              v-model="ReginForm.code"
              :placeholder="item.name"
            >
            <input
              v-if="item.name==='请输入推荐码(选填)'"
              :type="item.type"
              v-model="ReginForm.referralCode"
              :placeholder="item.name"
            >
            <span v-if="item.name==='请输入短信验证码' ">
              <span class="time" v-show="sendAuthCode" @click="getAuthCode">获取验证码</span>
              <span class="time" v-show="!sendAuthCode">
                <span>剩余{{auth_time}}</span> 秒
              </span>
            </span>
          </div>
          <div class="city">
            <div class="c_text">
              <span>区域信息</span>
            </div>
            <div>
              <select name="选择省份" id="Province" v-model="ReginForm.provinceId" @change="getCity">
                <option :value="-1">省份</option>
                <option
                  v-for="(item,index) in provinceList"
                  :key="index"
                  :value="item.provinceId"
                >{{item.provinceName}}</option>
              </select>

              <span class="c_span"></span>

              <select name="选择城市" id="City" v-model="ReginForm.cityId" @change="getDistrict">
                <option :value="-1">城市</option>
                <option
                  v-for="(item,index) in cityList"
                  :key="index"
                  :value="item.cityId"
                >{{item.cityName}}</option>
              </select>

              <span class="c_span"></span>

              <select name="选择地区" id="District" v-model="ReginForm.districtId">
                <option :value="-1">地区</option>
                <option
                  v-for="(item,index) in districtLite"
                  :key="index"
                  :value="item.districtId"
                >{{item.districtName}}</option>
              </select>
            </div>
          </div>
          <el-form-item>
            <el-button type="success" class="btn" @click="submit">立即注册</el-button>
          </el-form-item>
        </el-form>
        <div class="nu_agreement">
          <div :class="{nu_checkbox:!checkBox,nu_checkbox2:checkBox}" @click="checkBox = !checkBox"></div>
          <div class="nu_a_text">
            <span>已阅读并同意以下协议</span>
            <span @click="checkAgreement(41,'《助力乡村注册协议》')">《助力乡村注册协议》</span>
            <span @click="checkAgreement(44,'《助力乡村法律声明协议》')">《助力乡村法律声明协议》</span>
            <span @click="checkAgreement(45,'《助力乡村隐私协议》')">《助力乡村隐私协议》</span>
          </div>
        </div>
      </div>
    <van-popup v-model="falseChange" position="right" >
      <div class="op_head">
      <div>
        <van-icon name="arrow-left" @click="falseChange = !falseChange" class="nu_h_go"/>
      </div>
      <div class="op_h_text">{{xyname}}</div>
      <div></div>
    </div>
    <div class="op_body" v-html="Agreement"></div>
    </van-popup>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import Utils from '@/http/utils.js'
import Header from "@/common/_header.vue";
import { Indicator } from "mint-ui";
import qs from "qs";
//import Yin from "@/views/yindaoye.vue";

export default {
  components: {
    "v-header": Header
  },
  data() {
    let confirmpasswordCheck = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("密码是必须的"));
      } else {
        return callback();
      }
    };
    let telCheck = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("电话号码是必须的"));
      } else if (!Number.isInteger(value)) {
        return callback(new Error("电话号码必须是数字"));
      } else if (value.toString().length !== 11) {
        return callback(new Error("电话号码必须是11位数字"));
      } else {
        callback();
      }
    };
    return {
      // 协议名称
      xyname:'《助力乡村注册协议》',
      // 协议内容
      Agreement:'',
      // 省市区数据
      provinceList: [],
      cityList: [],
      districtLite: [],
      falseChange: false,
      // 注册数据
      ReginForm: {
        userPhone: "",
        userPwd: "",
        referralCode: "",
        code: "",
        provinceId: -1,
        cityId: -1,
        districtId: -1
      },
      // 控制输入框的样式切换
      checkBox: true,
      isActive: -1,
      // action: "",
      // title: "",
      // referral_code: this.$route.query.referral,
      logining: false,
      sendAuthCode: true, //发送验证码倒计时转换
      auth_time: 0,
      verification: "", //绑定输入验证码框框
      rule: {
        password: [
          {
            required: true,
            message: "密码是必须的！",
            trigger: "blur"
          }
        ],
        tel: [
          {
            required: true,
            validator: telCheck,
            trigger: "blur"
          }
        ]
      },

      siYuan: [
        {
          class: "iconfont icon-geren11",
          name: "用户名/手机号",
          type: "text"
        },

        {
          class: "iconfont icon-yanzhengma2",
          name: "请输入短信验证码",
          type: "number"
        },
        {
          class: "iconfont icon-mima1",
          name: "请输入密码",
          type: "password"
        },
        {
          class: "getCode",
          name: "请输入推荐码(选填)",
          type: "text"
        }
      ]
    };
  },
  created() {
    this.getProvince();
    this.geCode();
  },

  methods: {
    //获取推广码
    geCode() {
      this.ReginForm.referralCode = this.$route.query.referralCode || "";
    },
    //
    changeValue(index) {
      this.isActive = index;
    },
    // 接口-手机验证码 
    getCode(tel) {
      this.$api
        .get(this.HOME + this.USER + "sms/sendCodeRegistered", {
          params: { phone: Utils.encrypt(tel) }
        })
        .then(res => {
          if (res.status == 200) {
            if (res.data.status == 200) {
              Toast("验证码已发送");
              //设置倒计时秒
              this.sendAuthCode = false;
              this.auth_time = 60;
              var auth_timetimer = setInterval(() => {
                this.auth_time--;
                if (this.auth_time <= 0) {
                  this.sendAuthCode = true;
                  clearInterval(auth_timetimer);
                }
              }, 1000);
            } else {
              Toast(res.data.msg);
            }
          } else {
            Toast("获取验证码失败");
            return;
          }
        });
    },
    // 获取省份
    getProvince() {
      this.$api.get(this.LOCAL + "/api/getProvinceList").then(res => {
        if (res.status == 200) {
          this.provinceList = res.data;
        } else {
          alert(res.error);
        }
      });
    },
    // 获取城市
    getCity() {
      this.ReginForm.cityId = -1;
      this.ReginForm.districtId = -1;
      this.cityList = [];
      this.districtLite = [];
      this.$api
        .get(this.LOCAL + "/api/getCityList/" + this.ReginForm.provinceId)
        .then(res => {
          if (res.status == 200) {
            this.cityList = res.data;
          } else {
            alert(res.error);
          }
        });
    },
    // 获取地区
    getDistrict() {
      this.ReginForm.districtId = -1;
      this.districtLite = [];
      this.$api
        .get(this.LOCAL + "/api/getDistrictList/" + this.ReginForm.cityId)
        .then(res => {
          if (res.status == 200) {
            this.districtLite = res.data;
          } else {
            alert(res.massage);
          }
        });
    },
    //  验证
    getAuthCode() {
      if (
        !/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/.test(
          this.ReginForm.userPhone
        )
      ) {
        Toast("请输入正确手机号码");
        return;
      } else {
        this.getCode(this.ReginForm.userPhone);
      }
    },
    // 接口注册-封装注册发送请求方法
    thisAjax() {
      // this.ReginForm.userPhone = Utils.encrypt(this.ReginForm.userPhone)
      let obj = {};
      obj.userPhone = Utils.encrypt(this.ReginForm.userPhone);
      obj.userPwd = Utils.encrypt(this.ReginForm.userPwd);
      obj.referralCode = this.ReginForm.referralCode;
      obj.code = this.ReginForm.code;
      obj.provinceId = this.ReginForm.provinceId;
      obj.cityId = this.ReginForm.cityId;
      obj.districtId = this.ReginForm.districtId;
      this.$api
        .post(this.HOME + this.USER + "register", obj)
        .then(res => {
          if (res.data.status === 200) {
            Toast("注册成功");
            const localUrl = window.location.href.split(":");
            if (localUrl[0] != 'file') {
              window.location.href = "https://fir.im/ha38"
            } else {
              this.$router.replace({
                path: "/user"
              })
            }
          } else {
            Toast(res.data.msg);
          }
        });
    },
    // 提交注册
    submit() {
      if (
        !/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/.test(
          this.ReginForm.userPhone
        )
      ) {
        Toast("请输入正确手机号码");
        return;
      }
      if (this.ReginForm.code == "") {
        Toast("请输入验证码");
        return;
      }
      if (
        this.ReginForm.userPwd.length < 6 ||
        this.ReginForm.userPwd.length > 16
      ) {
        // !/^([\x00-\xff]+){6,16}$/.test(this.ReginForm.userPwd)
        Toast("请填写6-16位以上的密码");
        return;
      } else if (this.ReginForm.provinceId == -1) {
        Toast("请选择省份");
      } else if (this.ReginForm.cityId == -1) {
        Toast("请选择城市");
      } else if (this.ReginForm.districtId == -1) {
        Toast("请选择地区");
      } else if(this.checkBox){
        Toast("请确认注册等协议");
        return
      } else {
        this.$refs.ReginForm.validate(valid => {
          if (valid) {
            this.thisAjax();
          } else {
            // console.log("submit err");
          }
        });
      }
    },
    checkAgreement (id,name) {
      this.xyname = name
      this.falseChange = !this.falseChange
      // Indicator.open();
      this.$api.get(this.LOCAL + "/api/getArticle/"+id).then(res => {
        if (res.status == 200) {
          // Indicator.close();
          this.Agreement = res.data.data.articleContent;
        } else {
          this.Agreement="网络超时"
          // Indicator.close();
        }
      }).catch(error => {
          // Indicator.close();
        });
    },
    reset() {
      this.$refs.ReginForm.resetFields();
    }
  }
};
</script>
<style scoped lang="less">
@import "../../../img/index/newuser/icon/icon.less";
.newUser {
  width: 100%;
  height: 100%;
  button {
    background-color: #ffffff;
    border: 1px solid #0bb794;
  }
  input {
    width: 100%;
  }
  .box {
    width: 100%;
    height: 50%;
    position: absolute;
    top: 0;
    left: 0;
    background-image: url(../../../img/index/newuser/bottom.png);
    background-repeat: no-repeat;
    background-size: 100% 146%;
    background-position: 0 0;
    .nu_head {
      width: 100%;
      height: 4.7rem;
      color: #fff;
      position:fixed;
      top: 0;
      z-index: 1000;
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
      .nu_h_text {
        text-align: center;
      }
    }
    .avater {
      width: 100%;
      height: 100%;
      padding-top: 2rem;
      div {
        width: 30%;
        margin: 1.6rem auto;
        img {
          width: 100%;
          height: 100%;
          display: block;
        }
      }
    }
  }
  .box2 {
    width: 100%;
    height: 74%;
    position: absolute;
    bottom: 0;
    background-image: url(../../../img/index/newuser/bottom2.png);
    background-size: 100% 100%;
    padding-top: 3rem;
    .van-popup {
    width: 100%;
    box-sizing: border-box;
      &--right {
        width: 100%;
        height: 100%;
      }
      .op_head {
        width: 100%;
        height: 4.7rem;
        color: #fff;
        background-color: #00b28a;
        position: fixed;
        top: 0;
        z-index: 1001;
        line-height: 4.7rem;
        font-size: 1.6rem;
        display: flex;
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
      }
      .op_body {
        padding-top: 4.7rem;
        height: 100%;
        overflow:scroll;
      }
    }
    .form {
      width: 100%;
      padding: 0rem 3.6rem;
      .li {
        width: 100%;
        height: 4rem;
        margin-top: 1rem;
        /* height: 3rem; */
        padding-left: 1rem;
        position: relative;
        line-height: 3.5rem;
        border: solid 1px #adadad;
        border-radius: 7px;
        font-size: 1.6rem;
        color: #999;
        white-space: nowrap;
        margin-bottom: 10px;
        i {
          vertical-align: middle;
          // line-height: 3.5rem;
          font-size: 2rem;
          width: 50%;
        }
        input {
          width: 80%;
          height: 95%;
          vertical-align: middle;
          border: none;
          padding: 0.2rem;
          font-size: 1.6rem;
          color: #343434;
          opacity: 0.5;
          background: none;
          /* width: 4rem; */
        }
        .getCode {
          width: 6%;
          height: 2rem;
          display: inline-block;
          background-image: url(../../../img/index/newuser/drawable-xhdpi/推荐码未点击.png);
          background-size: 100% 100%;
        }
        .auth_input {
          width: 50%;
          border-right: 1px solid #ccc;
          border-radius: 0px;
          vertical-align: middle;
        }
        .time {
          display: inline-block;
          padding-left: 0.8rem;
          color: #00ae87;
          font-size: 1.6rem;
        }
      }
      .active {
        border: solid 1px #0bb794;
        color: #0bb794;
        .getCode {
          width: 6%;
          height: 2rem;
          display: inline-block;
          background-image: url(../../../img/index/newuser/drawable-xhdpi/推荐码点击.png);
          background-size: 100% 100%;
        }
      }
      select {
        width: 27%;
        height: 2.2rem;
        line-height: 2.2rem;
        background: none;
        color: #999999;
        font-size: 1.3rem;
        text-align: center;
      }

      .city {
        font-size: 1.6rem;
        margin-bottom: 1.5rem;
        .c_text {
          color: #00ae87;
          margin-bottom: 0.4rem;
        }
        .c_span {
          display: inline-block;
          width: 1.2rem;
          height: 0.1rem;
          background-color: #999;
          vertical-align: middle;
        }
      }
    }

    .autoLogin {
      display: flex;
      justify-content: space-between;
      color: #c3c3c3;
      font-size: 1.2rem;
      font-weight: normal;
      font-family: SourceHanSansCN-Regular;
      margin-top: 12px;
      button {
        background: #fff;
      }
    }
    .btn {
      width: 100%;
      text-align: center;
      background-color: #0bb794;
      color: #fff;
      font-size: 1.5rem;
      border-radius: 5px;
    }
    .operation {
      position: absolute;
      right: 47px;
      top: 281px;
      /*font-size: 6.8rem;*/
      background-color: transparent;
      color: #c3c3c3;
      font-size: 1.2rem;
    }
    .nu_agreement {
      display: flex;
      justify-content: flex-start;
      align-items: left;
      .nu_checkbox {
        margin-top: 0.2rem;
        width: 2.2rem;
        height: 1.4rem;
        vertical-align: center;
        border: 1px solid #00ae87;
        background-image: url(../../../img/index/newuser/drawable-xhdpi/gou.png);
        background-size: 100% 100%;
      }
      .nu_checkbox2 {
        margin-top: 0.2rem;
        width: 2.2rem;
        height: 1.4rem;
        vertical-align: center;
        border: 1px solid #00ae87;
        background-size: 100% 100%;
      }
      .nu_a_text {
        color: #00ae87;
        font-size: 1.2rem;
        margin-left: 0.5rem;
        a{
          color: #00ae87;
        }
      }
    }
  }
}
</style>