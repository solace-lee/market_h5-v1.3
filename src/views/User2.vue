<template>
  <!-- 会员中心 -->
  <div class="vip">
    <v-header></v-header>

<!--     <h1>会员中心</h1> -->

    <div style="width: 100%;height: 4rem;"></div>
    <div>
      <div class="header-icon name">
        <span>头像</span>
        <el-upload class="avatar-uploader" :action="actionurl" :show-file-list="false" :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="form.img" :src="form.img" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <span>
          <i class="icon-go"></i>
        </span>
      </div>
      <div class="name">
        <span>昵称</span>
        <span>{{form.nickName}}</span>
        <span>
          <i class="icon-go"></i>
        </span>
      </div>
      <div class="name">
        <span>我的推荐码</span>
        <span>{{form.referralCode}}</span>
        <span>
          <i class="icon-go"></i>
        </span>
      </div>

      <div class="name" style="margin-top: 12px;" v-if="form.userName">
        <span>真实姓名</span>
        <span>{{form.userName}}</span>
        <span>
          <i class="icon-go"></i>
        </span>
      </div>
      <div class="name" @click="area" style="margin-top: 12px;" v-if="!form.userName">
        <span>真实姓名</span>
        <span></span>
        <span>
          <i class="icon-go"></i>
        </span>
      </div>
      <div class="name">
        <span>手机号码</span>
        <span>{{form.phone}}</span>
        <span>
          <i class="icon-go"></i>
        </span>
      </div>
      <div class="name" @click="area" v-if="!form.districtName">
        <span>所属区域</span>
        <span></span>
        <span>
          <i class="icon-go"></i>
        </span>
      </div>
      <div class="name" v-if="form.districtName">
        <span>所属区域</span>
        <span>{{form.provinceName}}
          {{form.cityName}}
          {{form.districtName}}</span>
        <span>
          <i class="icon-go"></i>
        </span>
      </div>
      <!--<div class="name" @click="" v-if="form.id">
        <span>身份证号码</span>
        <span></span>
        <span>
      <i class="icon-go"></i>
    </span>
      </div>
      <div class="name" @click="area" v-if="!form.id">
        <span>身份证号码</span>
        <span></span>
        <span>
      <i class="icon-go"></i>
    </span>
      </div>-->
      <!--<div class="name" @click="gobank('我的银行卡')">
        <span>我的银行卡</span>
        <span></span>
        <span>
      <i class="icon-go"></i>
    </span>
      </div>-->
      <div class="name" @click="shipping('收货地址')">
        <span>收货地址</span>
        <span></span>
        <span>
          <i class="icon-go"></i>
        </span>

      </div>
      <div class="name" @click='pwd' style="margin-top: 12px;">
        <span>修改密码</span>
        <span></span>
        <span>
          <i class="icon-go"></i>
        </span>
      </div>
      <div style="margin-top: 50px;line-height: 50px;">&nbsp;
      </div>
    </div>
    <van-popup v-model="show" :overlay="true">
      <div class="content">
        <div class="top">
          提示
        </div>
        <div class="guige">
          是否退出登录？
        </div>
        <div class="button">
          <button @click='quxiao'>取消</button><button @click='queding' style="background-color:#0BB794">确定</button>
        </div>

      </div>
    </van-popup>
    <div class="btns">
      <button @click="gologin">退出登录</button>
    </div>

    <!--<van-popup v-model="onoff">
      <div class="msg">
        <p>通过136****2359手机短信</p>
        <p @click='pwd'>找回密码</p>
      </div>
       <div class="cancel" @click='onoff=false'>取消</div> 
    </van-popup>-->
  </div>
</template>

<script>
import { Toast } from "vant";
import Header from "@/common/_header.vue";
export default {
  components: {
    "v-header": Header
  },
  data() {
    return {
      actionurl: this.$uploadurl,
      onoff: false,
      userId: "",
      name: "",
      token: "",
      headimg: "",
      show: false,
      form: {
        // img:'',
        // nickName:'',
      }
    };
  },
  created() {
    this.getname();
    setTimeout(() => {
      this.getUserMsg();
    }, 1000);
  },
  methods: {
    handleAvatarSuccess(res, file) {
      console.log(res.Data.url);
      this.form.img = res.Data.url;
      this.headimg = res.Data.url;
      this.Headimg();
    },
    beforeAvatarUpload(file) {
      console.log(file);
      // const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 1;
      if (!isLt2M) {
        Toast("上传图片大小不能超过 1MB!");
      }
      return isLt2M;
    },
    getname() {
      this.name = this.$route.query.name;
      console.log(this.name);
      this.token = localStorage.getItem("Token");
    },

    // 获取用户信息
    getUserMsg() {
      this.$http.get(this.HOME + "/user/info?token=" + this.token).then(res => {
        if (res.data.Status == 401) {
          Toast("由于长时间未登录，请重新登录！");
          setTimeout(() => {
            this.$router.push({
              path: "/login?name=登录"
            });
          }, 1000);
        } else {
          this.form = res.data.Data.userInfo;
          console.log(this.form);
        }
      });
    },
    // 找回密码
    pwd() {
      this.$router.push({
        path: "/Userpwd?name=修改密码"
      });
    },
    Headimg() {
      var obj = {};
      obj.img = this.headimg;
      obj.token = this.token;
      console.log(obj);
      this.$http.post(this.HOME + "/user/UpdateLogo", obj).then(res => {
        console.log(res);
        setTimeout(() => {
          Toast.success(res.data.Message);
        }, 1000);
      });
    },
    // 修改用户名
    amend(name) {
      this.$router.push({
        path: "/Useramend?name=" + name
      });
    },
    shipping(name) {
      this.$router.push({
        path: "/shipping?id=" + undefined + "&name=收货地址"
      });
    },
    // 我的银行卡
    gobank(name) {
      this.$router.push({
        path: "/bank?name=" + name
      });
    },
    area() {
      this.$router.push({
        path: "/User5?id=" + "&name=实名认证"
      });
    },
    quxiao() {
      this.show = false;
    },
    queding() {
      this.$http
        .get(this.HOME + "/user/logout?token=" + this.token)
        .then(res => {
          localStorage.removeItem("Token");
          localStorage.clear("openid");
          Toast.success("已退出登录");
          console.log(res);
          setTimeout(() => {
            this.$router.push({
              path: "/"
            });
          }, 1500);
        });
    },
    // 退出登录
    gologin() {
      this.show = true;
    }
  }
};
</script>

<style lang="less" scoped>
.van-popup {
  width: 60% !important;
  text-align: center;
  background-color: rgba(0, 0, 0, 0);
}

.content {
  width: 60vw;
  padding: 0rem !important;
  background-color: #ffffff;

  .top {
    padding-top: 8px;
    font-size: 1.6rem;
    height: 10vw;
    border-bottom: 1px solid #f2f2f2;
  }

  .guige {
    height: 20vw;
    padding: 0rem !important;
    font-size: 1.6rem;
    text-align: center;

    input {
      text-indent: 4px;
      letter-spacing: 10vw;
      font-size: 1.6rem;
      margin-left: 0px !important;
      width: 80vw;
      height: 4rem;
      border: 1px solid #f2f2f2;
    }
  }

  .button {
    margin-left: 0px !important;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  button {
    margin-left: 0px !important;
    height: 3rem;
    width: 80vw;
    font-size: 1.5rem;
    /*    color: #000000;*/
  }
}

.head {
  width: 100%;
  height: 4rem;
  background-color: #ffffff;
  display: flex;
  position: fixed;
  z-index: 100000;

  .site {
    width: 4rem;
    height: 100%;
    display: flex;
    position: absolute;
    color: #000;

    div {
      display: flex;
      justify-content: center;
      align-items: center;

      .van-icon-location {
        vertical-align: middle;
      }

      span {
        font-size: 1rem;
      }
    }
  }

  .title {
    // flex: 1;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    span {
      color: #fff;
      margin-right: 0.5rem;
    }

    span:nth-child(2) {
      position: absolute; // top: 0;
      right: 1rem;
    }
  }
}

.pwd {
  display: inline-block;
  font-size: 0.6rem;
  color: red;
  position: absolute;
  right: 1rem;
}

.head {
  width: 100%;
  height: 4rem;
}

.vip {
  width: 100%;
  height: 100%;

  input {
    border: none;
    /* border-bottom: 1px solid #ccc; */
    position: absolute;
    height: 52px;
  }

  a {
    width: 100%;
    height: 52px;
    display: block;
    /* border: 1px solid #ccc; */
    line-height: 52px;
    background-color: #fff;
    padding-left: 10px;
  }

  .name {
    height: 52px;
    display: block;
    border-bottom: 1px solid #eee;
    line-height: 52px;
    background-color: #fff;
    padding-left: 10px;
    display: flex;
    color: #666666;
    font-size: 1.6rem;

    span:nth-child(1) {
      // width: 5rem;
      text-align: right;
    }

    span:nth-child(2) {
      flex: 1;
      text-align: right;
      padding-right: 10px;
    }

    span:nth-child(3) {
      width: 2rem;
    }

    input[data-v-069209ba] {
      border-bottom: none;
      font-size: 0.9rem;
    }

    .xiugai {
      border: 1px solid #fff;
      width: 20px;
      height: 5%;
      position: absolute;
      line-height: 35px;
      right: 10px;
      top: 162px;
      font-size: 25px;
      color: #ccc;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .name:nth-child(1) {
    span:nth-child(2) {
      display: inline-block;

      img {
        width: 2rem;
        height: 2rem;
        border: 1px solid #ccc;
        border-radius: 50%;
      }
    }
  }
}

.header-icon {
  margin-top: 6pt;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .avatar-uploader {
    width: 3rem;
    height: 3rem;
    border: 1px solid #ccc;
    text-align: center;
    border-radius: 50%;
    position: absolute;
    right: 2rem;
    display: flex;

    img {
      width: 3.3rem;
      height: 3.3rem;
      border-radius: 50%;
      position: absolute;
      top: -2px;
      right: -2px;
    }

    .el-upload__input {
      opacity: 0 !important;
    }
  }

  /* img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  } */
  .van-uploader {
    flex: 1;
  }
}

.radio {
  width: 100%;
  height: 4rem;
  display: flex;
  justify-content: space-between;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  padding: 0 0.8rem;

  .van-radio-group {
    flex: 1;
    display: flex;
    justify-content: space-between;

    .van-radio:nth-child(2) {
      margin-left: 0.5rem;
      flex: 1;
    }
  }
}

.btns {
  width: 100%;
  height: 4rem;
  position: fixed;
  left: 0;
  bottom: 1rem;
  /* padding: 0 3rem; */
  text-align: center;

  button {
    width: 80%;
    height: 100%;
    font-size: 1.6rem;
    border-radius: 3rem;
    background-color: #0bb794;
    color: #fff;
  }
}

.van-popup {
  width: 90%;
  text-align: center;
  background-color: rgba(0, 0, 0, 0);

  .msg {
    width: 100%;
    height: 6rem;
    background-color: #fff;
    border-radius: 0.6rem;
    color: #006bdd;

    p {
      padding-top: 1rem;
    }

    span {
      padding-top: 1rem;
    }
  }

  .cancel {
    background-color: #fff;
    margin-top: 1rem;
    height: 2rem;
    text-align: center;
    line-height: 2rem;
    border-radius: 0.6rem;
    color: #006bdd;
  }
}

input[type="file"] {
  display: initial !important;
}
</style>