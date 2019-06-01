<template>
  <div id="return_goods">
    <div class="head">
      <div class="site">
        <div @click="$router.go(-1)">
          <span style="width: 1rem;"></span>
          <van-icon name="arrow-left"/>
        </div>
      </div>
      <div class="title">
        <span>我要申诉</span>
      </div>
    </div>
    <div class="submission_info" @click="return_submit">提交</div>

    <!-- 商品详情 -->
    <section style="margin-top:4.7rem;">
      <div class="commodity_list">
        <div class="order_information">
          <div class="order_information_left">
            <img style="width: 8rem;height: 8rem;" :src="goods_list.imgUrl">
          </div>
          <div class="order_information_right">
            <div>{{goods_list.name}}</div>
            <div>
              <span>单价:</span>
              <span>￥{{goods_list.unitPrice}}</span>
              <span>数量:</span>
              <span>x{{goods_list.quantity}}</span>
            </div>
          </div>
        </div>
      </div>

      <div style="padding: 0rem 1.5rem;box-sizing:border-box;">
        <!-- 申诉原因 -->
        <div class="reason">
          <div class="reason_left">申诉原因</div>
          <div class="reason_right">
            <div style="position:absolute;top:50%;right: 0rem;margin-top:-16px;">
              <el-select
                v-model="return_reason"
                size="small"
                placeholder="请选择退货原因"
                style="width: 20rem;"
              >
                <el-option
                  v-for="item in options"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                ></el-option>
              </el-select>
            </div>
          </div>
        </div>

        <!-- 申请类型 -->
        <div class="reason">
          <div class="reason_left">申请类型</div>
          <div class="reason_right">
            <div style="position:absolute;top:50%;right: 0rem;margin-top:-16px;">
              <el-select
                v-model="return_type"
                size="small"
                placeholder="请选择申请类型"
                style="width: 20rem;"
              >
                <el-option
                  v-for="(item, index) in optionsType"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </div>
        </div>

        <!-- 申述描述 -->

        <div class="describe">
          <div class="describe_left">申诉描述</div>
          <div class="describe_right">
            <div>
              <el-input
                v-model="exchange_describe"
                placeholder="请输入申诉描述"
                type="textarea"
                :autosize="{ minRows: 1, maxRows: 8}"
                style="width: 20rem;"
              ></el-input>
            </div>
          </div>
        </div>

        <!-- 上传凭证 -->
        <div class="upload_credentials">
          <div class="upload_credentials_top">上传凭证</div>
          <div style="height:7.3rem;text-align: left;">
            <el-upload
              class="upload-demo"
              name="reportFile"
              :data="{'attach':'upload'}"
              :on-change="handleChange"
              :action="uploadUrl"
              :on-remove="handleAptiRemove"
              :file-list="fileList2"
              list-type="picture-card"
              :before-upload="beforeUpload"
              :on-success="handleAptiSuccess"
            >
              <div
                style="width: 100%;height: 100%;background: rgba(45,45,45,0);position: relative;"
              >
                <!-- <i class="el-icon-plus"></i> -->
                <div style="position: relative;width:100%;height:100%;">
                  <img
                    style="width: 20px;height: 17px;position: absolute;left: 18px;top: 10px;"
                    src="../../../img/index/replacement/camera.png"
                  >
                  <span
                    style="width: 100%;height: 12px;line-height: 12px;display: inline-block;position: absolute;left:0px;top: 35px;font-size: 11px;color: #999999;"
                  >最多3张</span>
                </div>

                <div
                  style="width: 100%;height: 100%;background: rgba(45,45,45,0);position: absolute;left: 0px;top:0px;z-index: 2;"
                  @click.stop="occlusion()"
                  v-if="upNumMax>=3"
                ></div>
              </div>
            </el-upload>
          </div>
        </div>

        <!-- <div class="explain"></div> -->
      </div>
    </section>

    <!-- 弹窗 -->
    <div class="showbox" v-show="showbox">
      <div class="showbox-container">
        <div class="yesimg">
          <img src="../../../img/index/replacement/complete.png" alt>
        </div>
        <div class="text1">您的申诉表单提交成功!</div>
        <div class="text2">我们会在3个工作日内尽快给您答复!</div>
        <div class="ok-btn">
          <div class="btn" @click="hidden">我知道了</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      theme: "申请退货",
      optionsType: [
        {
          value: 1,
          label: "退货退款"
        },
        {
          value: 2,
          label: "换货"
        }
      ],
      return_reason: "", // 申诉原因
      return_type: "", // 申诉类型
      exchange_describe: "", //申诉描述
      uploadUrl: "",
      fileList1: [],
      fileList2: [],
      upNumMax: 0,
      goods_list: {},
      options: [],
      showbox: false // 弹框显示
      // goods_count: 1
    };
  },
  created() {
    var body_s = document.getElementsByTagName("body")[0];
    body_s.style.background = "#f2f2f2";
    this.urlUp();
    this.getJson();
    this.getReason();
  },
  methods: {
    // 隐藏弹框
    hidden() {
      this.showbox = false;
      this.$router.replace({ path: "/replacement" });
    },

    //获取商品信息
    getJson() {
      const i = window.sessionStorage.getItem("representationInfo");
      this.goods_list = JSON.parse(i);
      window.sessionStorage.removeItem("representationInfo");
    },

    //退换货原因
    getReason() {
      this.$api
        .get(this.LOCAL + "/api/getDictData?type=reception_order_refund_case")
        .then(res => {
          console.log("退换货原因", res);
          this.options = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleChangeCount(value) {
      console.log(value);
    },

    //上传url
    urlUp() {
      this.uploadUrl = this.HOME + this.UPLOAD + "uploadFile";
    },

    //上传前设置
    beforeUpload(file) {
      const isPNG = file.type === "image/png" || file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isPNG) {
        this.$message.error("上传头像图片只能是 JPG或PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isPNG && isLt2M;
    },
    //上传成功
    handleAptiSuccess(res, file) {
      // console.log("------param-----", res, file);
      this.fileList1.push({
        url: res.path
      });
    },
    //删除上传
    handleAptiRemove(file, fileList) {
      console.log("handleStoreRemove:", file, fileList);
      this.upNumMax = fileList.length;
      let f = file.url;
      if (f) {
        let delIndex = "";
        this.fileList1.forEach(function(val, index, arr) {
          if (val.url == f) {
            delIndex = index;
          }
        });
        this.fileList1.splice(delIndex, 1);
      }
    },
    //遮挡上传
    occlusion() {
      this.$message.error("图片数量已达到上限");
    },
    //上传监听
    handleChange(file, fileList) {
      // console.log("change--u", file, fileList);
      this.upNumMax = fileList.length;
    },
    //提交
    return_submit() {
      if (this.return_reason == "") {
        Toast("请选择申诉原因");
        return;
      } else if (this.exchange_describe == "") {
        Toast("请输入申诉描述");
        return;
      } else if (this.fileList1.length == 0) {
        // Toast("请上传凭证");
        // return;
      } else if (this.return_type == "") {
        Toast("请选择申诉类型");
        return;
      }
      let picList = "";
      this.fileList1.forEach(function(val, index, arr) {
        // picList.push(val.url);
        if (index == arr.length - 1) {
          picList += val.url;
        } else {
          picList += val.url + ",";
        }
      });

      const json = {
        appealNum: "",
        accessory: picList,
        appealCauseType: this.return_reason,
        appealPhone: "",
        appealName: "",
        content: this.exchange_describe,
        shopId: this.goods_list.shopId,
        orderId: this.goods_list.orderId,
        commodityId: this.goods_list.commodityId,
        orderRefundId: this.goods_list.id,
        refundStatus: 8,
        appealType: this.return_type
      };
      // console.log("picList", json);
      // const i = JSON.stringify(json);
      this.$api
        .post(this.HOME + this.USER + "inside/insertOrderAppeal", json)
        .then(res => {
          if (res.data.status == 200) {
            this.showbox = true;
          } else {
            Toast("提交失败请重试");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style lang="less" scoped>
#return_goods {
  width: 100%;
  .mixin_crux() {
    font-size: 1.4rem;
    color: #333333;
    font-family: SourceHanSansCN-Regular;
  }
  .mixin_padding() {
    margin-top: 1.5rem;
    background: white;
    padding: 0rem 1.5rem;
    box-sizing: border-box;
    border-radius: 4px;
  }
  .head {
    width: 100%;
    height: 4.7rem;
    background-color: #ffffff;
    display: flex;
    position: fixed;
    top: 0px;
    z-index: 10;
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

  .commodity_list {
    width: 100%;
    border-radius: 4px;
    height: 11rem;
    background: white;
    padding: 1.5rem 3rem 0rem 3rem;
    box-sizing: border-box;
    .order_information {
      width: 100%;
      height: 9rem;
      .order_information_left {
        float: left;
        width: 8rem;
        height: 8rem;
      }
      .order_information_right {
        float: left;
        width: 23.5rem;
        height: 8rem;
        padding-left: 1rem;
        box-sizing: border-box;
        div:nth-of-type(1) {
          height: 4.16rem;
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
        div:nth-of-type(2) {
          height: 2.5rem;
          line-height: 2.5rem;
          font-size: 1.2rem;
          color: #666666;
          span:nth-of-type(1) {
          }
          span:nth-of-type(2) {
            margin-left: 1rem;
          }
          span:nth-of-type(3) {
            margin-left: 1.5rem;
          }
          span:nth-of-type(4) {
            margin-left: 1rem;
          }
        }
      }
    }
  }

  .reason {
    width: 100%;
    height: 4.3rem;
    .mixin_padding();
    .reason_left {
      float: left;
      width: 30%;
      height: 4.3rem;
      line-height: 4.3rem;
      .mixin_crux();
    }
    .reason_right {
      float: right;
      width: 70%;
      height: 4.3rem;
      position: relative;
    }
  }

  .describe {
    width: 100%;
    margin-top: 1.5rem;
    border-radius: 6px;
    background: #fff;
    padding: 1rem 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #333;
    font-size: 1.4rem;
  }
  .upload_credentials {
    width: 100%;
    height: 11.8rem;
    .mixin_padding();
    .upload_credentials_top {
      width: 100%;
      height: 4.5rem;
      line-height: 4.5rem;
      .mixin_crux();
    }
  }
  .explain {
    width: 100%;
    height: 1rem;
    margin: 4rem 0rem 3.4rem 0rem;
    font-size: 1.2rem;
    color: #999999;
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
    z-index: 10;
    font-size: 1.5rem;
  }
}

// 弹窗
.showbox {
  z-index: 16;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  .showbox-container {
    width: 34.5rem;
    height: 31.7rem;
    background: #fff;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    padding: 1.5rem 1.5rem 0 1.5rem;
    align-items: center;
    border-radius: 6px;
    .yesimg {
      height: 8.6rem;
      width: 8.6rem;
      img {
        height: 100%;
        width: 100%;
      }
    }
    .text1 {
      font-size: 1.9rem;
      color: #333;
    }
    .text2 {
      font-size: 1.4rem;
      color: #666;
    }
    .ok-btn {
      height: 7rem;
      width: 100%;
      border-top: 1px solid #eee;
      display: flex;
      justify-content: center;
      align-items: center;
      .btn {
        width: 10.5rem;
        height: 4rem;
        background: #00ae87;
        color: #fff;
        font-size: 1.8rem;
        border-radius: 2rem;
      }
    }
  }
}
</style>