<template>
  <div class="password">
    <div class="box">
      <!-- 头部 -->
      <div class="nu_head">
        <div>
          <van-icon name="arrow-left" @click="$router.go(-1)" class="nu_h_go"/>
        </div>
        <div class="nu_h_text">找回密码</div>
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
            :class="{ active:index==isActive ,error:index+1 == errorClass} "
            @click="changeValue(index)"
          >
            <i :class="item.class"></i>
            <input
              class="input"
              v-if="item.name==='用户名/手机号'"
              :type="item.type"
              v-model.number="ReginForm.userPhone"
              :placeholder="item.name"
            >
            <input
              class="input"
              v-if="item.name==='新密码'"
              :type="item.type"
              v-model="ReginForm.userPwd1"
              :placeholder="item.name"
            >
            <input
              class="input"
              v-if="item.name==='确认密码'"
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
            <span v-if="item.name==='请输入短信验证码' ">
              <span class="time" v-show="sendAuthCode" @click="getAuthCode">获取验证码</span>
              <span class="time" v-show="!sendAuthCode">
                <span>剩余{{auth_time}}</span> 秒
              </span>
            </span>
          </div>
          <el-form-item>
            <el-button type="success" class="btn" @click="submitForm">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import Utils from '@/http/utils.js'
import { Toast } from "vant";
import Header from "@/common/_header.vue";
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
      ReginForm: {
        userPhone: "",
        userPwd1: "",
        userPwd: "",
        code: ""
      },
      // 控制输入框的样式切换
      checkBox: true,
      isActive: -1,
      errorClass: -1,
      // action: "",
      // title: "",
      referral_code: this.$route.query.referral,
      logining: false,
      sendAuthCode: true, //发送验证码倒计时转换
      auth_time: 0,
      rule: {
        password: [
          {
            required: true,
            message: "密码",
            trigger: "blur"
          }
        ],
        userPhone: [
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
          class: "iconfont icon-mima1",
          name: "新密码",
          type: "password"
        },
        {
          class: "iconfont icon-mima1",
          name: "确认密码",
          type: "password"
        },
        {
          class: "iconfont icon-yanzhengma2",
          name: "请输入短信验证码",
          type: "text"
        }
      ]
    };
  },
  created() {},

  methods: {
    // 接口-手机验证码
    getCode(tel) {
      this.$api
        .get(this.HOME + this.USER + "sms/retrieve", {
          params: { phone: Utils.encrypt(tel) }
        })
        .then(res => {
          if (res.status === 200) {
            if (res.data.data) {
              Toast(res.data.data);
            } else {
              Toast(res.data.msg);
            }
          } else {
            Toast("获取验证码失败");
          }
        });
    },
    // 接口-提交
    postForm(obj) {
      this.$api
        .post(this.HOME + this.USER + "updatePwdByPhone", obj)
        .then(res => {
          if (res.data.status == 200) {
            Toast("修改成功");
            this.$router.replace({
              path: "/login"
            });
          } else {
            Toast(res.data.msg);
          }
        });
    },
    changeValue(index) {
      this.isActive = index;
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
        this.sendAuthCode = false;
        this.getCode(this.ReginForm.userPhone);
        //设置倒计时秒
        this.auth_time = 60;
        var auth_timetimer = setInterval(() => {
          this.auth_time--;
          if (this.auth_time <= 0) {
            this.sendAuthCode = true;
            clearInterval(auth_timetimer);
          }
        }, 1000);
      }
    },
    submitForm() {
      if (
        this.ReginForm.userPwd.length < 6 ||
        this.ReginForm.userPwd.length > 16
      ) {
        Toast("请填写6位到16位的密码");
        return;
      }
      if (this.ReginForm.userPwd == this.ReginForm.userPwd1) {
        const obj = {
          userPhone: Utils.encrypt(this.ReginForm.userPhone),
          code: this.ReginForm.code,
          userPwd: Utils.encrypt(this.ReginForm.userPwd)
        };
        // console.log(Utils.decrypt(obj.userPwd))
        this.postForm(obj);
      } else {
        Toast("新密码与确认密码不一致");
      }
      // this.$refs[formName].validate(valid => {
      //   if (valid) {
      //     alert("submit!");
      //   } else {
      //     console.log("error submit!!");
      //     return false;
      //   }
      // });
    },
    reset() {
      this.$refs.ReginForm.resetFields();
    }
  }
};
</script>
<style scoped lang="less">
@import "../../../img/index/newuser/icon/icon.less";
.password {
  width: 100%;
  height: 100%;
  button {
    background-color: #ffffff;
    border: 1px solid #0bb794;
    border-radius: 5px;
  }
  input {
    width: 100%;
  }
  .box {
    width: 100%;
    height: 65%;
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
  .box2 {
    width: 100%;
    height: 69%;
    position: absolute;
    bottom: 0;
    left: 0;
    background-image: url(../../../img/index/newuser/bottom2.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: 0 0;

    .form {
      width: 100%;
      padding: 0rem 4rem;
      margin-top: 5.4rem;
      box-sizing: border-box;
      .li {
        width: 100%;
        margin-top: 1rem;
        /* height: 3rem; */
        padding-left: 1rem;
        position: relative;
        line-height: 4rem;
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
          width: 50%;
          vertical-align: middle;
          background: none;
          border: none;
          font-family: SourceHanSansCN-Light;
          padding: 0.2rem;
          font-size: 1.6rem;
          color: #343434;
          opacity: 0.5;
          /* width: 4rem; */
        }
        .input {
          width: 80%;
        }
        .getCode {
          width: 6%;
          height: 2rem;
          display: inline-block;
          background-image: url(../../../img/index/newuser/drawable-xhdpi/推荐码未点击.png);
          background-size: 100% 100%;
        }

        .time {
          display: inline-block;
          padding-left: 1.6rem;
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
      .error {
        border: solid 1px #ff0000;
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
      height: 4.5rem;
      text-align: center;
      margin-top: 2.6rem;
      padding: 0 3rem;
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
  }
}
</style>