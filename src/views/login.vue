<template>
  <div class="tmpl">
    <div class="box">
      <div class="head">
        <div class="site">
          <div @click="goIndex">
            <span style="width: 10px;"></span>
            <van-icon name="arrow-left"/>
          </div>
        </div>
        <div class="title">
          <!-- <span>登录{{code}}</span> -->
        </div>
        <div class="add">
          <span style="width: 10px;"></span>
          <!-- 跳转用户注册界面 -->
          <van-icon name="" @click="goNewUser"/>
        </div>
      </div>

      <!-- 头像 -->
      <div class="avater">
        <div>
          <img src="../assets/login/drawable-xhdpi/a.png" alt>
        </div>
      </div>
    </div>
    <div class="box2">
      <el-main>
        <el-form>
          <div class="bg"></div>
        </el-form>
      </el-main>
      <div class="form">
        <form>
          <ul>
            <li
              v-for="(item,index) in siYuan"
              :key="index"
              :class="{ active:index==isActive }"
              @click="changeValue(index)"
              class="li"
            >
              <!-- <li> -->
              <i :class="item.class"></i>
              <input
                v-if="item.name === '用户名/手机号'"
                :type="item.type"
                :placeholder="item.name"
                v-model="Account"
              >
              <input
                v-if="item.name === '请输入密码'"
                :type="item.type"
                :placeholder="item.name"
                v-model="Pwd"
              >
              <span class="arrow-down" v-if="index !== 1">
                <!-- <van-icon name="arrow-down"/> -->
              </span>
              <!-- <p>请输入真实的手机号码，否则无法找回密码</p> -->
            </li>
            <!-- <li>
							<i class="iconfont icon-mima1"></i>
							<input type="password" placeholder="请输入密码" v-model="Pwd">
            </li>-->
          </ul>

          <button class="btn" @click.prevent="loginBtn">登录</button>

          <div class="autoLogin">
            <div @click.stop="goRegister">忘记密码</div>
            <div class="operation" @click.stop="goNewUser">注册账号</div>
          </div>
        </form>

        <!-- 第三方账号登录 -->
      </div>
      <div class="bottom" v-if="browser.isWX || localUrl[0] == 'file'">
        <span @click="wechatRegister()">
          <img src="../../img/index/personal/wechat.png" alt>
          微信登录
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/common/_header.vue";
import Utils from '@/http/utils.js'
import { Toast } from "vant";
export default {
  components: {
    "v-header": Header
  },
  data() {
    return {
      Account: "",
      Pwd: "",
      openid: "",
      code: '', // 微信授权返回参数
      // 多选框
      list: ["记住密码"],
      result: ["记住密码"],
      // 控制输入框的样式切换
      isActive: -1,
      siYuan: [
        {
          class: "iconfont icon-geren11",
          name: "用户名/手机号",
          type: "text"
        },
        {
          class: "iconfont icon-mima1",
          name: "请输入密码",
          type: "password"
        }
      ],
      stauts: '', // 状态
      msg: '', // 信息
      openid: '', // openid
      localUrl: [], // 当前地址
      stop: 0, // 阻止微信自动登录
      unionid: '',
    };
  },
  created() {
  },

  mounted() {
    this.Account = localStorage.getItem("Account")
    this.status = this.$route.query.status || false
    this.unionid = this.$route.query.unionid || ''
    // this.data = this.$route.query.msg || false
    // alert(this.$route.query.status)
    this.openid = this.$route.query.data || false
    this.stop = this.$route.query.stop || 0
    this.localUrl = window.location.href.split(':')
    // alert(this.unionid)
    // 公众号内微信登录
    if (this.browser.isWX) {
      if (this.stop == 0) {
        if (this.openid) {
          this.wxLogin()
        } else {
          this.wechatLogin()
        }
      } else {
        Toast('微信登录异常请使用手机号码登录')
      }

    }
  },

  methods: {
    // 5+api预热(app微信登陆)
    plusFunc() {
      let _this = this;
      let auths = [];
      plus.oauth.getServices(function(services) {
          auths = services;
          var s;
          for (var i = 0; i < auths.length; i++) {
              if (auths[i].id == "weixin") {
                s = auths[i];
                break;
              }
          }
          // if (!s.authResult) {
          s.login(function(e) {
              console.log("登录认证成功", JSON.stringify(s));
              // alert(JSON.stringify(s))
              s.getUserInfo(function(e) {
                  let userInfo = s.userInfo
                  sessionStorage.setItem('unionid', userInfo.unionid)
                  const config = {
                    wxUnionid: userInfo.unionid
                  }
                  _this.$api.post(_this.HOME + _this.AUTH + 'login', config)
                  .then(res => {
                    if (res.data.status == 200) {
                      localStorage.setItem("token", res.data.data);
                      plus.storage.setItem('token', res.data.data)
                      Toast('已登录', 3000)
                      _this.$router.replace({
                        path: "/user"
                      });
                    } else if (res.data.status == 501) {
                      Toast(res.data.msg);
                      sessionStorage.setItem('userinfo', JSON.stringify(userInfo))
                      _this.$router.replace({
                        path: '/bindPhone'
                      })
                    } else {
                      Toast(res.data.msg);
                    }
                  })
              }, function(e) {
                  alert("获取用户信息失败：" + e.message + " - " + e.code);
              });
              // }
          }, function(e) {
              console.log("登录认证失败！",e);
          });
          // } else {
          //     Toast("已经登录认证！");
          // }
      }, function(e) {
          alert("获取登录服务列表失败：" + e.message + " - " + e.code);
      });
    },

    // 微信登录1
    wechatLogin() {
      window.location.href= this.HOME + this.USER + "wxAuth/snsapiBase"
      // window.location.href= "http://api.zhulixc.com/api/user/wxAuth/snsapiBase"
    },

    // 第一步使用微信来注册1
    wechatRegister() {
      // const localUrl = window.location.href.split(":");
      if (this.browser.isWX) {
        window.location.href = this.HOME + this.USER + 'wxAuth/wxLogin'
        // window.location.href= "http://api.zhulixc.com/api/user/wxAuth/wxLogin"
      } else if (this.localUrl[0] == 'file') {
        // app走app登录流程
        this.plusFunc()
      }
    },

    // 微信登录验证
    wxLogin() {
        localStorage.setItem('openid', this.openid)
        if (this.status == 201) {
          // 用户未注册
          // this.wechatRegister()
          Toast("该微信还未注册")
        } else if (this.status == 502) {
          // 未绑定手机号码
          Toast('未绑定手机号码',3000)
          this.$router.replace({
            path: "/bindPhone"
          })
        } else if (this.status == 200) {
          // 已登录拿token
          const config = {
            wxOpenid: this.openid,
            wxUnionid: this.unionid
          }
          this.$api.post(this.HOME + this.AUTH + 'login', config)
          .then(res => {
            // Toast(res.data.data)
            if (res.data.status == 200) {
              localStorage.setItem("token", res.data.data);
              Toast('已登录', 3000)
              this.$router.replace({
                path: "/user"
              })
            } else {
              Toast(res.data.msg);
            }
          })
        }
    },

    // 跳转用户注册界面-谭伟豪
    goNewUser() {
      this.$router.push({
        path: "/newuser"
      });
    },

    changeValue(index) {
      this.isActive = index;
    },

    //注册及密码找回页面跳转-谭伟豪

    goRegister() {
      this.$router.push({
        path: "/password"
      });
    },

    goIndex() {
      this.$router.replace({
        path: "/"
      });
    },

    // 登录
    loginBtn() {
      if (this.Account == "") {
        Toast("请输入手机号");
        return;
      } else if (this.Pwd.length < 6 || this.Pwd.length > 16) {
        Toast("请填写6-16位密码");
        return;
      }
      let json = {};
      json.userName = Utils.encrypt(this.Account)
      json.passWord = Utils.encrypt(this.Pwd)
      this.$api
        .post(this.HOME + this.AUTH + "login", json)
        .then(res => {
          if (res.data.status == 200) {
            localStorage.setItem("token", res.data.data);
            localStorage.setItem("Account", this.Account)
            if (this.localUrl[0] == 'file') {
              mui.plusReady(() => {
                plus.storage.setItem('token', res.data.data)
              })
            }
            this.$router.replace({
              path: "/user"
            });
          } else {
            Toast(res.data.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style scoped lang="less">
@import "../assets/login/icon/icon.less";
.tmpl {
  width: 100%;
  height: 100%;
}

.box {
  width: 100%;
  height: 65%;
  position: absolute;
  top: 0;
  left: 0;
  background-image: url(../assets/login/drawable-xhdpi/diban.png);
  background-repeat: no-repeat;
  background-size: 100% 146%;
  background-position: 0 0;
  .head {
    width: 100%;
    height: 4rem;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100000;
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    font-size: 2rem;
    color: #fff;
    .site {
      font-size: 2rem;
      color: #fff;
    }
    .title {
      font-size: 1.6rem;
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

ul {
  margin: 0;
  padding: 0;
}

li {
  list-style: none;
}

a {
  list-style: none;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
}

.box2 {
  width: 100%;
  height: 69%;
  position: absolute;
  bottom: 0;
  left: 0;
  background-image: url(../assets/login/drawable-xhdpi/qqq.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: 0 0;
  .form {
    width: 100%;
    padding: 1rem 4rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    // justify-content: center;
    align-items: center;
  }
  .li {
    width: 100%;
    // height: 3.7rem;
    margin-top: 1rem;
    /* height: 3rem; */
    padding-left: 1rem;
    // padding-top: 0.5rem;
    position: relative;
    line-height: 3rem;
    border: solid 1px #adadad;
    border-radius: 10px;
    font-size: 1.6rem;
    color: #c3c3c3;
    box-sizing: border-box;
    i {
      vertical-align: center;
      // line-height: 3.5rem;
      font-size: 2rem;
      width: 50%;
    }
    input {
      width: 75%;
      margin-left: 1rem;
      border: none;
      font-family: SourceHanSansCN-Light;
      margin-top: 0;
      padding: 0.2rem;
      font-size: 1.6rem;
      color: #343434;
      opacity: 0.8;
    }
    .arrow-down {
      position: absolute;
      top: 5px;
      right: 15px;
    }
  }

  .active {
    border: solid 1px #0bb794;
    color: #0bb794;
  }
  .autoLogin {
    display: flex;
    margin-top: 3rem;
    justify-content: space-between;
    color: #c3c3c3;
    font-size: 1.2rem;
    font-weight: normal;
    font-family: SourceHanSansCN-Regular;
    button {
      padding: 0.6rem;
      background-color: transparent;
      color: #c3c3c3;
      font-size: 1.2rem;
    }
  }
  .btn {
    width: 28rem;
    height: 4rem;
    text-align: center;
    margin-top: 2.5rem;
    padding: 0 3rem;
    background-color: #0bb794;
    color: #fff;
    font-size: 1.5rem;
    border-radius: 5px;
  }
  .bottom {
    display: flex;
    justify-content: center;
    align-items: center;
    justify-items: center;
    padding: 1rem 0rem 0 0rem;
    box-sizing: border-box;
    span {
      width: 28rem;
      height: 4rem;
      overflow: hidden;
      border: 1px solid #00ae47;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #00ae47;
      img {
        width: 2.4rem;
        height: 2rem;
        margin-right: 1rem;
      }
    }
  }
}
</style>
