<template>
  <!-- 会员中心 -->
  <div class="vip">
    <!-- 头部 -->
    <div class="head">
      <div class="bg"></div>
      <div class="head-title">
        <div class="back" @click="$router.replace({path: '/user'})">
          <img src="../../img/index/wallet/back-black.png" alt>
        </div>
        <div class="title">个人资料</div>
      </div>
    </div>

    <!--     <h1>会员中心</h1> -->
    <div style="width: 100%;height: 4.7rem;"></div>
    <div>
      <div class="header-icon name">
        <span>头像</span>
        <div class="up">
          <el-upload
            class="avatar-uploader"
            :action="actionurl"
            name="reportFile"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img style="margin: 0;" v-if="form.imgUrl" :src="form.imgUrl" class="avatar">
            <img style="margin: 0;" v-else src="../../img/index/personal/defult.png" class="avatar">
          </el-upload>
          <div class="gonext">
            <i class="icon-go"></i>
          </div>
        </div>
      </div>
      <div class="name" @click="changeNickName(form.nickname)">
        <span>昵称</span>
        <span>{{form.nickname}}</span>
        <span>
          <i class="icon-go"></i>
        </span>
      </div>
      <div class="name">
        <span>等级</span>
        <span>Lv{{form.userLevel}}助力乡村大使</span>
        <span>
          <!-- <i class="icon-go"></i> -->
        </span>
      </div>
      <div class="name" v-if="form.bindWx == 0" @click="bindWx">
        <span>绑定微信</span>
        <span v-if="browser.isWX || localUrl[0] == 'file'">未绑定</span>
        <span v-else>请在公众号或APP内绑定</span>
        <span>
          <i class="icon-go"></i>
        </span>
      </div>
      <div class="name" style="border-bottom: 1rem solid #eee;border-top: 1rem solid #eee;">
        <span>我的推荐码</span>
        <span>{{form.referralCode}}</span>
        <span>
          <!-- <i class="icon-go"></i> -->
        </span>
      </div>

      <div class="name" @click="showChangeTrueName = true" v-if="form.userName">
        <span>真实姓名</span>
        <span>{{form.userName}}</span>
        <span>
          <i class="icon-go"></i>
        </span>
      </div>
      <div class="name" @click="showChangePhoneNum = true">
        <span>手机号码</span>
        <span>{{phone}}</span>
        <span>
          <i class="icon-go"></i>
        </span>
      </div>
      <!-- <div class="name"  v-if="!form.districtName">
        <span>所属区域</span>
        <span></span>
        <span>
          <i class="icon-go"></i>
        </span>
      </div>-->
      <div class="name" @click="cancelSelect">
        <span>所属区域</span>
        <span>
          {{provinceName}}
          {{cityName}}
          {{districtName}}
        </span>
        <span>
          <i class="icon-go"></i>
        </span>
      </div>
      <div class="name" @click="shipping('收货地址')" style="border-bottom: 1rem solid #eee;">
        <span>收货地址</span>
        <span></span>
        <span>
          <i class="icon-go"></i>
        </span>
      </div>
      <div class="name" @click="changePassWord = true">
        <span>修改密码</span>
        <span></span>
        <span>
          <i class="icon-go"></i>
        </span>
      </div>
    </div>
    <van-popup v-model="show" :overlay="true">
      <div class="content">
        <div class="top">提示</div>
        <div class="guige">是否退出登录？</div>
        <div class="button">
          <button @click="quxiao">取消</button>
          <button @click="queding" style="color: #fff;background-color:#0BB794">确定</button>
        </div>
      </div>
    </van-popup>
    <!-- <button @click="gologin">退出登录</button> -->
    <div class="btns" v-if="!(browserType.isWX && form.bindWx == 1)">
      <button @click="gologin">退出登录</button>
    </div>

    <!-- 修改昵称 -->
    <div class="change-nickname" v-if="showChangeNickName">
      <div class="change-title">
        <div class="change-title">设置昵称</div>
        <div class="back-btn" @click="showChangeNickName = false">
          <img src="../../img/index/wallet/back-black.png" alt>
        </div>
      </div>
      <div class="change-nikename-area">
        <div class="change-container">
          <input type="text" v-model="newNickName" placeholder="请输入昵称">
          <div class="cancel-change" @click="deletNickname">
            <img src="../../img/index/personal/delet.png" alt>
          </div>
        </div>
        <div class="ok-btn">
          <div class="confirm-btn" @click="onclickChangeNickname">保存</div>
        </div>
      </div>
    </div>

    <!-- 实名认证 -->
    <div class="change-nickname" v-if="showChangeTrueName">
      <div class="change-title">
        <div class="change-title">实名认证</div>
        <div class="back-btn" @click="showChangeTrueName = false">
          <img src="../../img/index/wallet/back-black.png" alt>
        </div>
      </div>
      <div class="change-nikename-area">
        <div class="change-container">
          <input type="text" v-model="trueName" placeholder="真实姓名">
          <div class="cancel-change">
            <!-- <img src="../../img/index/personal/delet.png" alt=""/> -->
          </div>
        </div>
        <div class="change-container">
          <input type="number" v-model="trueID" placeholder="身份证号码">
          <div class="cancel-change">
            <!-- <img src="../../img/index/personal/delet.png" alt=""/> -->
          </div>
        </div>
        <div class="text">说明：实名认证后您的账号将更加安全，且可使用余额账户进行提现或支付</div>
        <div class="ok-btn">
          <div class="confirm-btn" @click="onclickTrueName">提交认证</div>
        </div>
      </div>
    </div>

    <!-- 更换手机号 -->
    <div class="change-nickname" v-if="showChangePhoneNum">
      <div class="change-title">
        <div class="change-title">更换手机号</div>
        <div class="back-btn" @click="showChangePhoneNum = false">
          <img src="../../img/index/wallet/back-black.png" alt>
        </div>
      </div>
      <div class="change-nikename-area">
        <div class="phone-container">
          <div class="change-head">+86</div>
          <div class="input-num">
            <input type="number" v-model="newPhoneNum" placeholder="新手机号码">
          </div>
          <div class="cancel-change" @click="cleanPhoneNum">
            <img src="../../img/index/personal/delet.png" alt>
          </div>
        </div>
        <div class="phone-container">
          <div class="input-num">
            <input type="number" v-model="code" placeholder="请输入短信验证码">
          </div>
          <div class="code-btn" v-show="sendAuthCode" @click="getCode">获得验证码</div>
          <div class="code-btn" v-show="!sendAuthCode">
            <span>剩余{{auth_time}}</span> 秒
          </div>
        </div>
        <div class="ok-btn">
          <div class="confirm-btn" @click="onclickPhoneNum">确认修改</div>
        </div>
      </div>
    </div>

    <!-- 修改密码 -->
    <div class="change-nickname" v-if="changePassWord">
      <div class="change-title">
        <div class="change-title">修改密码</div>
        <div class="back-btn" @click="changePassWord = false">
          <img src="../../img/index/wallet/back-black.png" alt>
        </div>
      </div>
      <div class="change-nikename-area">
        <div class="phone-container" style="margin-bottom: 1rem;">
          <div class="change-head-big">旧密码</div>
          <div class="input-num">
            <input type="password" v-model="oldPassWord" placeholder="请输入旧密码">
          </div>
          <div class="cancel-change" @click="cleanOldPW">
            <img src="../../img/index/personal/delet.png" alt>
          </div>
        </div>
        <div class="phone-container">
          <div class="change-head-big">新密码</div>
          <div class="input-num">
            <input type="password" v-model="newPassWord" placeholder="请输入新密码">
          </div>
          <div class="cancel-change" @click="cleanNewPW">
            <img src="../../img/index/personal/delet.png" alt>
          </div>
        </div>
        <div class="phone-container">
          <div class="change-head-big">确认密码</div>
          <div class="input-num">
            <input type="password" v-model="againNewPassWord" placeholder="请再次输入新密码">
          </div>
          <div class="cancel-change">
            <!-- <img src="../../img/index/personal/delet.png" alt=""/> -->
          </div>
        </div>
        <!-- <div class="text">说明：实名认证后您的账号将更加安全，且可使用余额账户进行提现或支付</div> -->
        <div class="ok-btn">
          <div class="confirm-btn" @click="onclickChangePassWord">确定</div>
        </div>
      </div>
    </div>

    <div class="choose_local" v-show="selecteShow">
      <div class="local_area">
      
      <div class="select_title">
        <div class="title">所属区域</div>
        <div class="cancel" @click="cancelSelect">
          <img src="../../img/index/personal/delet.png" alt="">
        </div>
      </div>

      <!-- 选择区域 -->
      <div class="selet_area" >
        <div class="select_item" v-if="selectProvinceId != -1" @click="handleClickProvince">{{selectProvince}}</div>
        <div class="select_item_green" v-else>请选择省份</div>
        <div class="select_item" v-if="selectCityId != -1" @click="handleClickCity">{{selectCity}}</div>
        <div class="select_item_green" v-if="selectCityId == -1 && selectProvinceId != -1">请选择城市</div>
        <div class="select_item" v-if="selectDistrictId != -1">{{selectDistrict}}</div>
        <div class="select_item_green" v-if="selectDistrictId == -1 && selectCityId != -1">请选择县区</div>
      </div>

      <div class="select_comtainer" ref="bottomArea">

      <!-- 选择省 -->
      <div class="choose_area" v-show="selectProvinceId == -1">
        <!-- <div class="choose_title">选择省份/地区</div> -->
        <div class="choose_list">
          <div class="item_info" v-for="(i, index) in provinceList" :key="index" @click="selectedProvince(i)">
            <div class="info_left">
              <div class="info_title">{{i.initial}}</div>
              <div :class="selectProvinceId==i.provinceId ? 'info_name_active' : 'info_name'">{{i.provinceName}}</div>
            </div>
            <div class="choose">
              <img v-show="selectProvinceId==i.provinceId" src="../../img/index/search/check.png" alt="">
            </div>
          </div>
        </div>
      </div>

      <!-- 选择市 -->
      <div class="choose_area" v-show="selectProvinceId != -1 && selectCityId == -1">
        <div class="choose_list">
          <div class="item_info" v-for="(i, index) in cityList" :key="index" @click="selectedCity(i)">
            <div class="info_left">
              <div class="info_title">{{i.initial}}</div>
              <div :class="selectCityId==i.cityId ? 'info_name_active' : 'info_name'">{{i.cityName}}</div>
            </div>
            <div class="choose">
              <img v-show="selectCityId==i.cityId" src="../../img/index/search/check.png" alt="">
            </div>
          </div>
        </div>
      </div>

      <!-- 选择区域 -->
      <div class="choose_area" v-show="selectCityId != -1">
        <div class="choose_list">
          <div class="item_info" v-for="(i, index) in districtList" :key="index" @click="selectedDistrict(i)">
            <div class="info_left">
              <div class="info_title">{{i.initial}}</div>
              <div :class="selectDistrictId==i.districtId ? 'info_name_active' : 'info_name'">{{i.districtName}}</div>
            </div>
            <div class="choose">
              <img v-show="selectDistrictId==i.districtId" src="../../img/index/search/check.png" alt="">
            </div>
          </div>
        </div>
        <div style="height:6rem;"></div>
        <div class="ok_btn">
          <div class="btn_btn" @click="confirm">确定</div>
        </div>
      </div>

    </div>

    </div>
    </div>
  </div>
</template>

<script>
import Utils from '@/http/utils.js'
import { Toast } from "vant";
import Header from "@/common/_header.vue";
import { localName } from "@/common/local.js";
import Qs from "qs";
export default {
  components: {
    "v-header": Header
  },
  data() {
    return {
      actionurl: this.HOME + this.UPLOAD + "uploadFile",
      onoff: false,
      userId: "",
      name: "",
      token: "",
      headimg: "",
      show: false,
      form: {}, // 用户个人信息
      showChangeNickName: false, // 是否显示修改昵称功能
      newNickName: "", // 新用户昵称
      showChangeTrueName: false, // 是否显示实名认证功能
      trueName: "", // 真实姓名
      trueID: "", // 身份证号码
      showChangePhoneNum: false, // 是否显示更改手机号码功能
      newPhoneNum: null, // 新手机号码
      code: "", // 验证码
      changePassWord: false, // 是否显示修改密码的界面
      oldPassWord: "", // 旧密码
      newPassWord: "", // 新密码
      againNewPassWord: "", // 确认新密码
      provinceName: "", //省
      cityName: "", // 市
      districtName: "", // 区
      sendAuthCode: true, // 控制获取验证码按钮的显示
      auth_time: 60, // 倒计时
      phone: '', // 手机号
      addressList: [], // 地址列表
      browserType: [], // 当前地址
      localUrl: [], // 当前地址
      status: '', // 状态码
      openid: '', // openid
      selectProvince: '', // 省
      selectCity: '', // 市
      selectDistrict: '', // 区
      selectProvinceId: -1, // 省
      selectCityId: -1, // 市
      selectDistrictId: -1, // 区
      provinceList: [], // 省列表
      cityList: [], // 市列表
      districtList: [], // 区列表
      selecteShow: false, // 选择区域显示隐藏
    };
  },
  created() {
    this.getUserMsg();
    this.getAddress();
    this.browserType = this.browser
    this.localUrl = window.location.href.split(':')
    this.status = this.$route.query.status || ''
    this.openid = this.$route.query.openid || ''
    this.unionid = this.$route.query.unionid || ''
    if (this.status == 503) {
      Toast('绑定微信失败')
    } else if (this.status == 200) {
      this.bind()
    }
    // 获取所有省份
    this.getProvinceList()
    },
  watch: {
    newNickName() {
      if (this.newNickName.length > 11) {
        this.newNickName = this.newNickName.slice(-11);
      }
    },
    trueName() {
      if (this.trueName.length > 8) {
        this.trueName = this.trueName.slice(-8);
      }
    }
  },
  methods: {
    // 点选地区方法（获取省列表）
    getProvinceList() {
      this.$api.get(this.LOCAL + '/api/getProvinceList')
      .then((res) => {
          this.provinceList = res.data
          // 去除重复字母
          let keys = []
          this.provinceList.forEach((element, index) => {
            let obj = {}
            const key = element.initial
            if (keys.indexOf(key) != -1) {
              element.initial = ''
            } else {
              keys.push(key)
            }
          })
      })
    },

    // 选择省
    selectedProvince(item) {
      this.getCityList(item.provinceId)
      this.selectProvince = item.provinceName
      this.selectProvinceId = item.provinceId
    },

    // 点击选中的省份
    handleClickProvince() {
      this.selectProvince = ''
      this.selectProvinceId = -1
      this.selectCity = ''
      this.selectCityId = -1
      this.selectDistrict = ''
      this.selectDistrictId = -1
    },

    // 点击了选择的城市
    handleClickCity() {
      this.selectCity = ''
      this.selectCityId = -1
      this.selectDistrict = ''
      this.selectDistrictId = -1
    },

    // 获取城市列表
    getCityList(provinceId) {
      this.$api.get(this.LOCAL + '/api/getCityList/' + provinceId)
      .then((res) => {
        this.cityList = res.data
        // 去除重复字母
        let keys = []
        this.cityList.forEach((element, index) => {
          let obj = {}
          const key = element.initial
          if (keys.indexOf(key) != -1) {
            element.initial = ''
          } else {
            keys.push(key)
          }
        })
      })
    },

     // 选择市
    selectedCity(item) {
      this.getDistrictList(item.cityId)
      this.selectCity = item.cityName
      this.selectCityId = item.cityId
    },

    // 获取县区列表
    getDistrictList(cityId) {
      this.$api.get(this.LOCAL + '/api/getDistrictList/' + cityId)
      .then((res) => {
        this.districtList = res.data
        // 去除重复字母
        let keys = []
        this.districtList.forEach((element, index) => {
          let obj = {}
          const key = element.initial
          if (keys.indexOf(key) != -1) {
            element.initial = ''
          } else {
            keys.push(key)
          }
        })
      })
    },

    // 选择县区
    selectedDistrict(item) {
      this.selectDistrict = item.districtName
      this.selectDistrictId = item.districtId
    },

    // 确定选择区域
    confirm() {
      const config = {
        provinceId: this.selectProvinceId,
        cityId: this.selectCityId,
        districtId: this.selectDistrictId
      }
      this.$api.post(this.HOME + this.USER + 'inside/updateUserData', config)
      .then(res => {
        if (res.data.status == 200) {
          Toast('区域选择成功')
          this.cancelSelect()
          this.getUserMsg()
        }
      })
    },

    //取消选择区域
    cancelSelect() {
      this.selecteShow = !this.selecteShow
    },

    // 绑定微信第二步
    bind() {
      const config = {
        openId: this.openid,
        wxUnionid: this.unionid
      }
      this.$api.post(this.HOME + this.USER + 'inside/bindingOpenId', config)
      .then(res => {
        if (res.data.status == 200) {
          Toast('绑定微信成功')
          this.getUserMsg()
        }
      })
    },

    // 绑定微信
    bindWx() {
      if (this.browserType.isWX) {
        // 公众号环境(未完成)
        window.location.href = this.HOME + this.USER + 'wxAuth/wxBindOpenId'

      } else if (this.localUrl[0] == 'file') {
        // app环境
        this.plusFunc()
      }

    },

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
              // console.log("登录认证成功", JSON.stringify(s));
              // alert(JSON.stringify(s))

              s.getUserInfo(function(e) {
                  let userInfo = s.userInfo
                  sessionStorage.setItem('unionid', userInfo.unionid)
                  const config = {
                    wxUnionid: userInfo.unionid,
                    headimgurl: userInfo.headimgurl,
                    nickname: userInfo.nickname
                  }
                  // alert(JSON.stringify(userInfo))
                  _this.$api.post(_this.HOME + _this.USER + 'inside/bindingOpenId', config)
                  .then(res => {
                    if (res.data.status == 200) {
                      localStorage.setItem("token", res.data.data);
                      Toast('绑定微信成功', 3000)
                      _this.getUserMsg()
                    } else if (res.data.data == 503) {
                      Toast('该微信已注册', 3000)
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


    handleAvatarSuccess(res, file) {
      // Toast(res.path);
      this.form.imgUrl = res.path;
      this.headimg = res.path;
      this.Headimg();
    },
    beforeAvatarUpload(file) {
      // Toast('上传前准备完成')
      // console.log(file);
      // const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 1;
      if (!isLt2M) {
        Toast("上传图片大小不能超过 1MB!");
      }
      return isLt2M;
    },

    // 获取用户信息
    getUserMsg() {
      this.$api.get(this.HOME + this.AUTH + "verifyUser").then(res => {
        this.form = res.data;
        this.phone = Utils.decrypt(this.form.userPhone)
        this.getlocalName();
      });
    },

    //根据ID集合获取地址信息
    getlocalName() {
      localName(
        this.form.provinceId,
        this.form.cityId,
        this.form.districtId
      ).then(res => {
        this.provinceName = res.provinceName;
        this.cityName = res.cityName;
        this.districtName = res.districtName;
      });
    },

    Headimg() {
      // 上传图片
      var obj = {};
      obj.imgUrl = this.headimg;
      this.$api
        .post(this.HOME + this.USER + "inside/updateUserData", obj)
        .then(res => {
          if (res.data.status == 200) {
            Toast.success("修改成功");
            this.form.imgUrl = this.headimg;
          } else {
            Toast("上传失败请重试");
          }

          // console.log(res);
        });
    },

    // 修改用户名
    changeNickName(name) {
      this.newNickName = this.form.nickname;
      this.showChangeNickName = true;
    },

    // 清空昵称修改输入框
    deletNickname() {
      this.newNickName = "";
    },

    //确定修改昵称
    onclickChangeNickname() {
      if (this.newNickName == "") {
        Toast("昵称不能为空");
      }
      // else {
      //   this.$api.get('https://new.zhulixc.com/api/game/wx/gamepay?orderNum=' + this.newNickName + '&userId=61')
      //   .then((res) => {
      //     window.location.replace(res.data.data)
      //     Toast(res.data.msg)
      //   })
      // }

      else {
        const config = {
          nickname: this.newNickName
        };
        this.$api
          .post(this.HOME + this.USER + "inside/updateUserData", config)
          .then(res => {
            Toast("昵称修改成功");
            this.showChangeNickName = false;
            this.form.nickname = this.newNickName;
            // 重新获取用户信息
            // this.getUserMsg();
          });
      }
    },

    //确定提交实名信息
    onclickTrueName() {
      if (this.trueID.length != 18) {
        Toast("身份证号输入有误");
      } else if (this.trueName.length == 0) {
        Toast("真实姓名不能为空");
      } else {
        const config = {
          userName: this.trueName,
          userPassport: this.trueID
        };
        this.$api
          .post(this.HOME + this.USER + "inside/bindingPassport", config)
          .then(res => {
            if (res.data.status == 200) {
              Toast("提交成功");
              this.showChangeTrueName = false;
              this.form.userName = this.trueName;
              // 重新获取用户信息
              // this.getUserMsg();
            } else {
              Toast("请重试");
            }
          });
      }
    },

    // 清除输入的电话号码
    cleanPhoneNum() {
      this.newPhoneNum = "";
    },

    // 获取验证码
    getCode() {
      let myreg = /^[1][0-9]{10}$/;
      if (!myreg.test(this.newPhoneNum)) {
        Toast("手机号码输入有误，请重新输入");
      } else {
        let config = {
          params: {
            phone: Utils.encrypt(this.newPhoneNum) //加密
          }
        };
        this.$api
          .get(this.HOME + this.USER + "sms/sendCodeBinDing", config)
          .then(res => {
            if (res.data.msg == "OK") {
              Toast("验证码已发送");
              this.sendAuthCode = false;
              //设置倒计时秒
              this.auth_time = 60;
              let auth_timetimer = setInterval(() => {
                this.auth_time--;
                if (this.auth_time <= 0) {
                  this.sendAuthCode = true;
                  clearInterval(auth_timetimer);
                }
              }, 1000);
            } else {
              Toast(res.data.msg);
            }
          });
      }
    },

    // 确认修改手机号
    onclickPhoneNum() {
      if (this.newPhoneNum == null) {
        Toast("请输入正确的手机号");
      } else if (this.newPhoneNum.length != 11) {
        Toast("手机号码输入有误，请重新输入");
      } else if (this.code.length == 0) {
        Toast("请输入验证码");
      } else {
        const config = {
          params: {
            phone: Utils.encrypt(this.newPhoneNum), //加密
            code: this.code
          }
        };
        this.$api
          .get(this.HOME + this.USER + "inside/updateUserPhone", config)
          .then(res => {
            if (res.data.msg == "OK") {
              Toast("号码已修改");
              this.showChangePhoneNum = false;
              this.form.userPhone = this.newPhoneNum;
              // 重新获取用户信息
              // this.getUserMsg();
            }
            Toast(res.data.msg);
          });
      }
    },

    // 清除旧密码
    cleanOldPW() {
      this.oldPassWord = "";
    },

    // 清除新密码
    cleanNewPW() {
      this.newPassWord = "";
      this.againNewPassWord = "";
    },

    // 确认修改密码
    onclickChangePassWord() {
      if (this.oldPassWord == this.newPassWord) {
        Toast("新密码不能和旧密码相同");
      } else if (this.newPassWord != this.againNewPassWord) {
        Toast("两次输入的密码不同，请重新输入");
      } else if (!/^([\x00-\xff]+){6}$/.test(this.newPassWord)) {
        Toast("请填写6位以上的密码");
      } else {
        const config = {
          userPwd: Utils.encrypt(this.oldPassWord),
          newPwd: Utils.encrypt(this.newPassWord)
        };
        this.$api
          .post(this.HOME + this.USER + "inside/updatePwdByUserId", config)
          .then(res => {
            if (res.data.status == 200) {
              Toast("密码已更改");
              localStorage.removeItem("token");
              setTimeout(() => {
                this.$router.push({
                  path: "/login"
                });
              }, 1500);
            } else {
              Toast(res.data.msg);
            }
          });
      }
    },

    getAddress() {
      this.$api
        .get(this.HOME + this.ORDER + "inside/address/findAddressByuserId")
        .then(res => {
          this.addressList = res.data.data;
        });
    },

    shipping(name) {
      if (this.addressList.length == 0) {
        this.$router.push({
          path: "/editAddress?name=添加收货地址&type=收货地址"
        });
      } else {
        this.$router.push({
          path: "/shipping?id=" + 0 + "&name=收货地址"
        });
      }
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
      this.$api.post(this.HOME + this.AUTH + "logout").then(res => {
        // console.log(res);
      });
      Toast.success("已退出登录");
      setTimeout(() => {
        this.$router.push({
          path: "/login"
        });
        if (this.localUrl[0] == 'file') {
          mui.plusReady(() => {
            plus.storage.removeItem('token')
          })
        }
        localStorage.removeItem("token");
      }, 1500);
    },
    // 退出登录
    gologin() {
      this.show = true;
    }
  }
};
</script>

<style lang="less" scoped>
.vip {
  height: 100vh;
  width: 100vw;
  background: #f2f2f2;
}
// 头部
.head {
  width: 100%;
  height: 4.7rem;
  display: flex;
  flex-direction: column;
  .bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    img {
      height: 100%;
      width: 100%;
    }
  }
  .head-title {
    height: 4.7rem;
    background: #f2f2f2;
    width: 100%;
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    line-height: 4.7rem;
    .back {
      position: fixed;
      left: 1.5rem;
      top: 0;
      height: 1.6rem;
      width: 0.9rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .title {
      font-size: 1.8rem;
      color: #333;
    }
  }
}

.van-popup {
  width: 60% !important;
  text-align: center;
  background-color: rgba(0, 0, 0, 0);
}

.content {
  width: 60vw;
  padding: 0rem !important;
  background-color: #ffffff;
  border-radius: 6px;
  overflow: hidden;

  .top {
    font-size: 1.6rem;
    height: 10vw;
    line-height: 10vw;
    border-bottom: 1px solid #f2f2f2;
  }

  .guige {
    height: 20vw;
    padding: 0rem !important;
    font-size: 1.6rem;
    text-align: center;
    line-height: 20vw;

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
    height: 4rem;
    justify-content: center;
    align-items: center;
  }

  button {
    margin-left: 0px !important;
    height: 4rem;
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
  z-index: 10;

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

  input {
    border: none;
    /* border-bottom: 1px solid #ccc; */
    // position: absolute;
    height: 4.5rem;
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
    display: block;
    border-bottom: 1px solid #eee;
    line-height: 4.5rem;
    background-color: #fff;
    padding-left: 15px;
    display: flex;
    color: #666666;
    font-size: 1.6rem;

    span:nth-child(1) {
      // width: 5rem;
      font-size: 1.4rem;
      color: #333;
      text-align: right;
    }

    span:nth-child(2) {
      flex: 1;
      text-align: right;
      padding-right: 10px;
      font-size: 1.4rem;
      color: #666;
    }

    span:nth-child(3) {
      width: 2rem;
      height: 4.5rem;
      text-align: center;
      padding-top: 0.2rem;
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
}

.header-icon {
  display: flex;
  height: 6.5rem;
  align-items: center;
  justify-content: space-between;
  padding-right: 1rem;
  .up {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 6rem;
    .avatar-uploader {
      width: 4.5rem;
      height: 4.5rem;
      border-radius: 50%;
      img {
        width: 4.5rem;
        height: 4.5rem;
        border-radius: 50%;
      }

      .el-upload__input {
        opacity: 0 !important;
      }
    }
    .gonext {
      width: 1rem;
    }
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
  height: 4.4rem;
  position: fixed;
  left: 0;
  bottom: 1.5rem;
  text-align: center;

  button {
    width: 80%;
    height: 100%;
    font-size: 1.6rem;
    border-radius: 0.6rem;
    background-color: #00b88f;
    // box-shadow: 1px 1px 3px #7af8dd;
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

//修改昵称
.change-nickname {
  z-index: 11;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: #f2f2f2;
  .change-title {
    height: 4.7rem;
    width: 100%;
    line-height: 4.7rem;
    .change-title {
      font-size: 1.7rem;
      color: #333;
      text-align: center;
    }
    .back-btn {
      position: fixed;
      left: 1.5rem;
      top: 0;
      height: 1.6rem;
      width: 0.9rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .change-nikename-area {
    width: 100%;
    .change-container {
      width: 100%;
      height: 4.5rem;
      display: flex;
      background: #fff;
      justify-content: flex-end;
      align-items: center;
      border-bottom: 1px solid #f2f2f2;
      input {
        width: 100%;
        background: rgba(0, 0, 0, 0);
        font-size: 1.4rem;
        color: #333;
        padding: 0 3rem 0 1.5rem;
      }
      .cancel-change {
        width: 1.5rem;
        height: 1.5rem;
        margin-right: 1rem;
        line-height: 1.5rem;
        img {
          height: 100%;
          width: 100%;
        }
      }
    }
    .text {
      font-size: 1.1rem;
      color: #999;
      padding: 1.5rem;
    }
    .ok-btn {
      margin-top: 3rem;
      height: 4.4rem;
      width: 100%;
      display: flex;
      justify-content: center;
      .confirm-btn {
        height: 100%;
        width: 28rem;
        border-radius: 6px;
        background: #00b88f;
        text-align: center;
        line-height: 4.4rem;
        font-size: 1.6rem;
        color: #fff;
      }
    }
  }
}

.phone-container {
  width: 100%;
  height: 4.5rem;
  display: flex;
  background: #fff;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f2f2f2;
  .change-head {
    text-align: center;
    // width: 6rem;
    flex: 1;
    border-right: 1px solid #ccc;
  }
  .change-head-big {
    text-align: left;
    padding-left: 1.5rem;
    // width: 6rem;
    flex: 2;
    border-right: 1px solid #ccc;
    font-size: 1.3rem;
    color: #333;
  }
  .input-num {
    flex: 5;
    padding: 0 1.5rem;
    font-size: 1.4rem;
    color: #333;
  }
  .cancel-change {
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 1rem;
    line-height: 1.5rem;
    img {
      height: 100%;
      width: 100%;
    }
  }
  .code-btn {
    color: #00ae87;
    font-size: 1.4rem;
    padding: 0 1rem;
    border-left: 1px solid #ccc;
  }
}

.choose_local {
  // overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  bottom: 0;
  // overflow-y: scroll;
  background: rgba(0, 0, 0, 0.6);
  padding-top: 40%;
}

.local_area {
  position: relative;
  width: 100%;
  height: 100%;
  background: #fff;
  border-radius: 6px 6px 0 0;
}

.select_title {
  width: 100%;
  height: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0 1.5rem;
  font-size: 1.5rem;
  color: #333;
  font-weight: bold;
  .cancel {
    width: 1.6rem;
    height: 1.6rem;
    margin-bottom: .8rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
}

// 选择区域
.selet_area {
  display: flex;
  // position: relative;
  border-radius: 6px 6px 0 0;
  align-items: center;
  font-size: 1.5rem;
  color: #333;
  padding: 0 1.5rem;
  height: 5.7rem;
  line-height: 4.5rem;
  // margin-top: 4.7rem;
  border-bottom: 1px solid #f2f2f2;
  // border-top: 1rem solid #f2f2f2;
  .select_item {
    margin-right: 2.2rem;
    border-bottom: 2px solid #00000000;
  }
  .select_item_green {
    margin-right: 2.2rem;
    color: #00ae87;
    border-bottom: 2px solid #00ae87;
  }
}
.choose_area {
  overflow-y: scroll;
  position: absolute;
  top: 9.7rem;
  left: 0;
  bottom: 0;
  // height: 100%;
  width: 100%;
  margin: 0;
  padding: 1.5rem;
  padding-top: 0;
  
  .choose_list {
    width: 100%;
    display: flex;
    flex-direction: column;
    .item_info {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .info_left {
        display: flex;
        align-items: center;
        height: 3.6rem;
        .info_title {
          margin-left: 1rem;
          margin-right: 1.5rem;
          width: 1rem;
          font-size: 1.2rem;
          color: #999;
        }
        .info_name {
          font-size: 1.5rem;
          color: #333;
        }
        .info_name_active {
          font-size: 1.5rem;
          color: #00ae87;
        }
      }
      .choose {
        height: 1rem;
        width: 1.4rem;
        img {
          height: 100%;
          width: 100%;
        }
      }
    }
  }
  .ok_btn {
    position: fixed;
    bottom: 2rem;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    .btn_btn {
      width: 28rem;
      height: 4.4rem;
      text-align: center;
      line-height: 4.4rem;
      color: #fff;
      background: #00ae87;
      border-radius: 6px;
      font-size: 1.6rem;
    }
  }
}
</style>
