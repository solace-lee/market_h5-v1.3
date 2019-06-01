<template>
  <div class="tmpl">
    <div class="header-title">
      <div class="goback" @click="$router.go(-1)">
        <div class="back-img">
          <img src="../../img/index/personal/back-black.png" alt>
        </div>
      </div>
      <div class="title">我的推广二维码</div>
      <div class="right"></div>
    </div>

    <div class="box_x">
      <div class="user-info">
        <div class="user-img">
          <img :src="userinfo.imgUrl" alt>
        </div>
        <div class="user">
          <div class="username">{{userinfo.nickname}}</div>
          <div class="userlocal">{{localInfo.cityName}}&nbsp;{{localInfo.districtName}}</div>
        </div>
      </div>
      <div class="erweima">
        <!-- <canvas id="cavasimg" width="200px" height="200px"></canvas> -->
        <qrcode-vue :value="value" :size="size" ref="qccode" level="H"></qrcode-vue>
        <p>扫描二维码，可以自动进入注册页面</p>
        <!--<img :src="imgurl" width="70%" height="70%" v-if="imgurl"/>-->
      </div>
      <div class="btns">
        <button v-if="localUrl[0] == 'file'" @click="share('weixin','WXSceneSession')">分享给微信好友</button>
        <div style="display:none; margin-top:10px;">
          <div
            class="datasetconfig"
            data-title
            data-url
            :ata-pic="imgurl"
            data-sites="weibo,weixin,qzone"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import "../assets/js/jquery.share.min.js";
import wx from "weixin-js-sdk";
import QrcodeVue from "qrcode.vue";
import { localName } from "@/common/local.js";

export default {
  components: {
    QrcodeVue
  },
  data() {
    return {
      value: "",
      size: 200,
      token: "",
      imgurl: "",
      sites: ["weixin,", "weibo", "qzone"],
      userinfo: {},
      localInfo: {},
      form: {
        appId: "",
        nonceStr: "",
        signature: "",
        timestamp: ""
      },
      browserType: {}, // 浏览器标识
      localUrl: [], // 当前路径
      shares: null,
      shareWX: '',
      shareQQ: ''
    };
  },
  created() {
    this.browserType = this.browser;
    this.localUrl = window.location.href.split(":");
    // console.log(this.browser);
  },
  mounted() {
    this.getUrl();
    if (this.localUrl[0] == 'file') {
      let shares = {};
      plus.share.getServices(function(s) {
          for (var i in s) {
              var t = s[i];
              shares[t.id] = t;
          }
          // Toast("获取分享服务列表成功");
      }, function(e) {
          Toast("获取分享服务列表失败：" + e.message);
      });
      this.shares=shares;
    }
  },
  methods: {
    share(id,ex){
      var that=this;
      var s = null;
      if (!id || !(s = this.shares[id])) {
        Toast("无效的分享服务！");
        return;
      }
      if (s.authenticated) {
        // Toast("---已授权---");
        that.shareMessage(s, ex);
      } else {
        Toast("---未授权---");
        s.authorize(function() {
          that.shareMessage(s, ex);
        }, function(e) {
          Toast("认证授权失败");
        });
      }
    },
    shareMessage(s, ex) {
			var msg = {
				content: '品质好货，买的放心衣、食、住、行，生活可以更讲究!',
        href: this.value,
				title: '专注高品质特色产品的挖掘与推广--注册邀请',
				// thumbs: ['https://new.zhulixc.com/api/upload/image/2019-04-29/png/a48a7d8547d04408a5c84f3728611521-thumbnail.png'],
				pictures: ['https://new.zhulixc.com/api/upload/image/2019-04-29/png/a48a7d8547d04408a5c84f3728611521-thumbnail.png'],
				extra: {
					scene: ex
				}
			};
			s.send(msg, function() {
				Toast("分享成功!");
			}, function(e) {
				Toast("分享失败!");
			});
    },

    //获取当前地址
    getUrl() {
      let code = "";
      this.$api.get(this.HOME + this.AUTH + "verifyUser").then(res => {
        this.userinfo = res.data;
        code = this.userinfo.referralCode;
        if (this.userinfo.provinceId && this.userinfo.cityId) {
          if (this.userinfo.districtId) {
            this.getLocalName()
          }
        }
        this.value = this.HOME + this.ORDER + "wx/newuser?referralCode=" + code
        // console.log(this.value)
        this.ShareTo();
      });
    },

    // 获取地点名称
    getLocalName() {
      localName(
        this.userinfo.provinceId,
        this.userinfo.cityId,
        this.userinfo.districtId
      ).then(res => {
        this.localInfo = res;
      });
    },


    ShareTo() {
      var that = this;
      const url = window.location.href.split("#")
      that.$api
        .get(that.HOME + "/api/order/wx/getWxData?url=" + url[0]) // + encodeURIComponent(this.value)
        .then(res => {
          that.form = res.data.data;
          wx.config({
            debug: false,
            appId: that.form.appId, // 和获取Ticke的必须一样------必填，公众号的唯一标识
            timestamp: that.form.timestamp, // 必填，生成签名的时间戳
            nonceStr: that.form.nonceStr, // 必填，生成签名的随机串
            signature: that.form.signature, // 必填，签名，见附录1
            //需要分享的列表项:发送给朋友，分享到朋友圈，分享到QQ，分享到QQ空间
            jsApiList: ["onMenuShareAppMessage", "onMenuShareTimeline"]
          });
          //处理验证失败的信息
          wx.error(function(res) {
            // logUtil.printLog("验证失败返回的信息:", res);
          });
          //处理验证成功的信息
          wx.ready(() => {
            //分享到朋友圈
            wx.onMenuShareTimeline({
              title: "专注高品质特色产品的挖掘与推广--注册邀请", // 分享标题
              link: that.value, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: "https://new.zhulixc.com/api/upload/image/2019-04-29/png/a48a7d8547d04408a5c84f3728611521-thumbnail.png", // 分享图标
              success: function(res) {
                // 用户确认分享后执行的回调函数
                Toast("分享成功");
              },
              cancel: function(res) {
                // 用户取消分享后执行的回调函数
              }
            });
            //分享给朋友
            wx.onMenuShareAppMessage({
              title: "专注高品质特色产品的挖掘与推广--注册邀请", // 分享标题
              desc: "品质好货，买的放心衣、食、住、行，生活可以更讲究!", // 分享描述
              link: that.value, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: "https://new.zhulixc.com/api/upload/image/2019-04-29/png/a48a7d8547d04408a5c84f3728611521-thumbnail.png", // 分享图标
              type: "link", // 分享类型,music、video或link，不填默认为link
              dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
              success: function(res) {
                // 用户确认分享后执行的回调函数
                Toast("分享成功");
              },
              cancel: function(res) {
                // 用户取消分享后执行的回调函数
              }
            });
          });
        });
    }
  }
};
</script>
<style scoped lang="less">
.header-title {
  height: 4.7rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .goback {
    width: 5rem;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .back-img {
      height: 1.9rem;
      width: 0.9rem;
      img {
        height: 100%;
        width: 100%;
      }
    }
  }
  .title {
    font-size: 1.7rem;
    color: #333;
    line-height: 4.7rem;
  }
  .right {
    width: 5rem;
  }
}
.tmpl {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background: #f2f2f2;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.box_x {
  width: 90%;
  box-sizing: border-box;
  height: 80%;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 6px;
  justify-content: space-between;
  margin-top: 1rem;
  .user-info {
    margin: 3rem 0 0 3rem;
    width: 100%;
    height: 5.6rem;
    display: flex;
    align-items: center;
    .user-img {
      height: 5.6rem;
      width: 5.6rem;
      background: #999;
      border-radius: 50%;
      overflow: hidden;
      img {
        height: 100%;
        width: 100%;
      }
    }
    .user {
      margin-left: 1.5rem;
      height: 4.5rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .username {
        font-size: 1.5rem;
        color: #333;
      }
      .userlocal {
        font-size: 1.2rem;
        color: #999;
      }
    }
  }
  .erweima {
    display: flex;
    flex-direction: column;
    align-items: center;
    canvas {
      background: #999;
    }
    p {
      margin-top: 1rem;
      font-size: 1.5rem;
      color: #999;
    }
    img {
      width: 70%;
      height: 70%;
    }
  }
  .btns {
    width: 100%;
    height: 4.4rem;
    text-align: center;
    display: flex;
    button {
      flex: 1;
      height: 100%;
      background-color: #1bc6a3;
      color: #fff;
      width: 35%;
      font-size: 1.7rem;
      padding: 0.5rem 1rem;
      border-radius: 0 0 6px 6px;
    }
  }
}
</style>
