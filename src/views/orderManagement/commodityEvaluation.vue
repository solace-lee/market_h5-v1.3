<template>
  <div id="allOrders">
    <div class="head">
      <div class="site">
        <div @click="$router.go(-1)">
          <span style="width: 1rem;"></span>
          <van-icon name="arrow-left"/>
        </div>
      </div>
      <div class="title">
        <span>{{theme}}</span>
      </div>
    </div>
    <div class="submission_info" @click="return_submit">提交</div>

    <section class="order_decorate">
      <div class="order_status_all">
        <div class="order_information_apply">
          <div class="order_information_left_apply">
            <img style="width: 8rem;height: 8rem;" :src="all_orders_list.imgUrl">
          </div>
          <div class="order_information_right_apply">
            <div>{{all_orders_list.name}}</div>
          </div>
        </div>
        <div class="describe_conformity">
          <div class="describe_conformity_left">描述相符</div>
          <div class="describe_conformity_right">
            <el-rate v-model="score_value" show-text></el-rate>
          </div>
        </div>
        <div class="experience">开始分享你的使用体验吧</div>
        <div class="feeling">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="亲，写点什么吧，你的意见对其他助力小伙伴有很大的帮助哦！"
            v-model="textarea"
          ></el-input>
        </div>
        <div class="upload_picture">
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            name="reportFile"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <div style="width: 60px;height: 60px;background: rgba(45,45,45,0);position: relative;">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <div style="position: relative;width:100%;height:100%;">
                <img
                  style="width: 20px;height: 17px;position: absolute;left: 18px;top: 10px;"
                  src="../../../img/index/replacement/camera.png"
                >
                <span
                  style="width: 100%;height: 12px;line-height: 12px;display: inline-block;position: absolute;left:0px;top: 35px;font-size: 11px;color: #999999;"
                >添加图片</span>
              </div>
            </div>
          </el-upload>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      theme: "商品评价",
      score_value: null,
      imageUrl: "",
      uploadImg: "",
      textarea: "",
      all_orders_list: {
        imageUrl: "",
        name: ""
      },
      orderId: 0 //订单ID
    };
  },
  created() {
    const body_s = document.getElementsByTagName("body")[0];
    body_s.style.background = "#f2f2f2";
    this.orderId = this.$route.query.id;
    this.urlUp();
  },

  mounted() {
    const obj = window.sessionStorage.getItem("order");
    this.all_orders_list = JSON.parse(obj);
    window.sessionStorage.removeItem("order");
  },
  methods: {
    return_submit() {
      if (this.score_value == 0 || this.score_value == null) {
        this.$message.error("请评分");
        return;
      } else if (this.textarea == "") {
        this.$message.error("请填写体验内容");
        return;
      } else if (this.textarea.length > 300) {
        this.$message.error("评价内容过多，不能超过300字");
        return;
      }
      var json = {
        content: this.textarea,
        commodityId: this.all_orders_list.commodityId,
        level: this.score_value,
        detailsId: this.all_orders_list.detailsId,
        commentImg: this.uploadImg,
        orderId: this.orderId
      };
      this.$api
        .post(this.HOME + this.USER + "inside/insertUserComment", json)
        .then(res => {
          if (res.data.status != 200) {
            Toast("评价失败请重试");
          } else {
            Toast("评价成功");
            this.$router.replace({ path: "/allOrders" });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //上传url
    urlUp() {
      // this.uploadUrl = "https://jsonplaceholder.typicode.com/posts/";
      this.uploadUrl = this.HOME + this.UPLOAD + "uploadFile";
      this.uploadImg = "";
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.uploadImg = res.path;
    },
    beforeAvatarUpload(file) {
      const isPNG = file.type === "image/png" || file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isPNG) {
        this.$message.error("上传头像图片只能是 JPG或PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isPNG && isLt2M;
    }
  }
};
</script>
<style lang="less" scoped>
#allOrders {
  width: 100%;
  .mixin_list() {
    padding: 0px 1.5rem;
    box-sizing: border-box;
    background: white;
    border-radius: 0.4rem;
  }
  .order_decorate {
    height: 100%;
    padding: 1.5rem 1.5rem 1.5rem 1.5rem;
    box-sizing: border-box;
  }
  .head {
    width: 100%;
    height: 4.7rem;
    background-color: #ffffff;
    display: flex;
    position: fixed;
    top: 0rem;
    z-index: 100;
    border-bottom: 1px solid #f2f2f2;
    font-size: 1.5rem;
    .site {
      width: 4.7rem;
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
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      span {
        color: #000;
        margin-right: 0.5rem;
      }
    }
  }
  .submission_info {
    width: 100%;
    height: 4.4rem;
    text-align: center;
    line-height: 4.4rem;
    margin-top: 1.5rem;
    background: white;
    position: fixed;
    bottom: 0;
    background: #0bb794;
    color: white;
    z-index: 99999;
    font-size: 1.5rem;
  }
  .order_status_all {
    width: 100%;
    height: 40.4rem;
    margin-top: 4.2rem;
    .mixin_list();
    padding: 1rem 1.5rem 0rem 1.5rem;
    .order_information_apply {
      width: 100%;
      height: 9rem;
      .order_information_left_apply {
        float: left;
        width: 8rem;
        height: 8rem;
      }
      .order_information_right_apply {
        float: left;
        width: 23.5rem;
        height: 8rem;
        padding-left: 1rem;
        box-sizing: border-box;
        div:nth-of-type(1) {
          height: 8rem;
          font-size: 1.4rem;
          /*超过两行省略号*/
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          /*! autoprefixer: off */
          -webkit-box-orient: vertical;
          /*! autoprefixer: on */
        }
      }
    }
    .describe_conformity {
      width: 100%;
      height: 3.5rem;
      margin-top: 1.5rem;
      border-bottom: 1px solid #f2f2f2;
      .describe_conformity_left {
        width: 30%;
        height: 3rem;
        float: left;
      }
      .describe_conformity_right {
        width: 70%;
        height: 3rem;
        float: right;
      }
    }
    .experience {
      width: 100%;
      height: 4rem;
      line-height: 4rem;
      border-bottom: 1px solid #f2f2f2;
    }
    .feeling {
      width: 100%;
      height: 12.5rem;
      border-bottom: 1px solid #f2f2f2;
      padding-top: 1rem;
      box-sizing: border-box;
    }
    .upload_picture {
      width: 100%;
      height: 8.5rem;
      padding-top: 1rem;
      box-sizing: border-box;
    }
  }
}
</style>