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
        <span>{{theme}}</span>
      </div>
    </div>
    <div class="submission_info" @click="return_submit">提交</div>

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
        <div class="goods_number">
          <div class="goods_number_left">退货数量</div>
          <div class="goods_number_right">
            <div style="position:absolute;top:50%;right: 0rem;margin-top:-16px;">
              <el-input-number
                v-model="goods_count"
                @change="handleChangeCount"
                :min="1"
                :max="goods_list.quantity"
                label="描述文字"
                size="small"
              ></el-input-number>
            </div>
          </div>
        </div>
        <div class="reason">
          <div class="reason_left">退货原因</div>
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
                  :value="item.dictLabel"
                ></el-option>
              </el-select>
            </div>
          </div>
        </div>

        <div class="return_money">
          <div class="return_money_top">
            <span>退款金额</span>
            <span>￥{{goods_count*goods_list.unitPrice}}</span>
          </div>
          <div class="return_money_bottom">
            <span>最多￥{{goods_list.unitPrice*goods_list.quantity}}，含邮费￥0.00</span>
          </div>
        </div>

        <div class="describe">
          <div class="describe_left">退货描述</div>
          <div class="describe_right">
            <div style="position:absolute;top:50%;right: 0rem;margin-top:-16px;">
              <el-input
                v-model="exchange_describe"
                placeholder="请输入退货描述"
                size="small"
                style="width: 18rem;"
              ></el-input>
            </div>
          </div>
        </div>

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

        <div class="explain"></div>
      </div>
    </section>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      theme: "申请退货",
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      return_reason: "",
      exchange_describe: "",
      uploadUrl: "",
      fileList1: [],
      fileList2: [],
      upNumMax: 0,
      goods_list: [],
      goods_count: 1
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
    getJson() {
      let json = {
        detailsId: this.$route.query.id
      };
      this.$api
        .post(
          this.HOME + this.USER + "inside/applyForRefund",
          JSON.stringify(json)
        )
        .then(res => {
          console.log("售后申请服务", res);
          this.goods_list = res.data.data;
          //   this.goods_list = {};
          //   this.goods_list.imgUrl = "";
          //   this.goods_list.unitPrice = "";
          //   this.goods_list.quantity = "";
          //   this.goods_list.name = "";
          //   this.goods_list.quantity = 0;
        })
        .catch(err => {
          console.log(err);
        });
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
      // this.uploadUrl = "https://jsonplaceholder.typicode.com/posts/";
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
      console.log("change--u", file, fileList);
      this.upNumMax = fileList.length;
    },
    //提交
    return_submit() {
      if (this.return_reason == "") {
        this.$message.error("请选择退货原因");
        return;
      } else if (this.exchange_describe == "") {
        this.$message.error("请输入退货描述");
        return;
      } else if (this.fileList1.length == 0) {
        this.$message.error("请上传凭证");
        // return;
      }
      // var picList = [];
      var picList = "";
      this.fileList1.forEach(function(val, index, arr) {
        // picList.push(val.url);
        if (index == arr.length - 1) {
          picList += val.url;
        } else {
          picList += val.url + ",";
        }
      });

      var json = {
        orderId: this.goods_list.orderId,
        detailsId: this.goods_list.detailsId,
        cause: this.return_reason,
        refundType: 1,
        refundPrice: this.goods_list.unitPrice * this.goods_count,
        refundAmount: this.goods_count,
        picList: picList,
        refundDesc: this.exchange_describe,
        shopId: this.goods_list.shopId
        // detailAddress: '',
        // contact: '',
        // phone: ''
      };
      // console.log("picList", json);
      // const i = JSON.stringify(json);
      this.$api
        .post(this.HOME + this.USER + "inside/UserOrderRefund", json)
        .then(res => {
          this.$router.replace({ path: "/replacement?status=2" });
          this.$message.success("提交成功");
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

  .goods_number {
    width: 100%;
    height: 5.5rem;
    .mixin_padding();
    .goods_number_left {
      width: 30%;
      height: 5.5rem;
      float: left;
      line-height: 5.5rem;
      .mixin_crux();
    }
    .goods_number_right {
      width: 70%;
      height: 5.5rem;
      float: right;
      position: relative;
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

  .return_money {
    width: 100%;
    height: 8.5rem;
    .mixin_padding();
    .return_money_top {
      width: 100%;
      height: 4.2rem;
      line-height: 4.2rem;
      border-bottom: 1px solid #f2f2f2;
      span:nth-of-type(1) {
        float: left;
        .mixin_crux();
        text-indent: 0px;
      }
      span:nth-of-type(2) {
        float: right;
        font-size: 1.5rem;
        color: #00ae87;
      }
    }
    .return_money_bottom {
      width: 100%;
      height: 4.2rem;
      line-height: 4.2rem;
      span:nth-of-type(1) {
        float: right;
        font-size: 1.1rem;
        color: #999999;
      }
    }
  }

  .describe {
    width: 100%;
    height: 4.3rem;
    .mixin_padding();
    .describe_left {
      float: left;
      width: 30%;
      height: 4.3rem;
      line-height: 4.3rem;
      .mixin_crux();
    }
    .describe_right {
      float: right;
      width: 70%;
      height: 4.3rem;
      position: relative;
    }
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
    z-index: 99999;
    font-size: 1.5rem;
  }
}
</style>