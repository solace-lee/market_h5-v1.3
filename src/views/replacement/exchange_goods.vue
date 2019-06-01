<template>
  <div id="exchange">
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
    <div class="submission_info" @click="exchange_submit">提交</div>

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
          <div class="goods_number_left">换货数量</div>
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
          <div class="reason_left">换货原因</div>
          <div class="reason_right">
            <div style="position:absolute;top:50%;right: 0rem;margin-top:-16px;">
              <el-select
                v-model="replacement_reason"
                size="small"
                placeholder="请选择换货原因"
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
        <div class="receiving_address">
          <div class="receiving_address_left">收货地址</div>
          <div class="receiving_address_right" @click="goChooseAddress">
            <div class="receiving_address_name">
              <span style="float: left;">{{address_list.contact}}</span>
              <span style="float: right;margin-right: 3rem;">{{address_list.phone}}</span>
            </div>
            <div class="address_info">{{address_list.provinceName}}{{address_list.cityName}}{{address_list.districtName}}{{address_list.detailAddress}}</div>
          </div>
          <div class="receiving_address_icon">
            <i
              style="position:absolute;top:50%;right:0rem;margin-top:-0.7rem;"
              class="el-icon-arrow-right"
            ></i>
          </div>
        </div>

        <div class="describe">
          <div class="describe_left">换货描述</div>
          <div class="describe_right">
            <div style="position:absolute;top:50%;right: 0rem;margin-top:-16px;">
              <el-input
                v-model="exchange_describe"
                placeholder="请输入换货描述"
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
                  style="width: 100%;height: 100%;background: rgba(45,45,45,0);position: absolute;left: 0rem;top:0rem;z-index: 2;"
                  @click.stop="occlusion()"
                  v-if="upNumMax>=3"
                ></div>
              </div>
            </el-upload>
          </div>
        </div>

        <div class="explain">仅限于更换同款相同价格的商品。如需申请换货请联系商家处理,具体查看规则内容</div>
      </div>
    </section>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      theme: "申请换货",
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
      replacement_reason: "",
      exchange_describe: "",
      goods_count: 1,
      uploadUrl: "",
      fileList1: [],
      fileList2: [],
      upNumMax: 0,
      goods_list: [],
      address_list: {}
    };
  },
  created() {
    var body_s = document.getElementsByTagName("body")[0];
    body_s.style.background = "#f2f2f2";
    this.urlUp();
    this.getJson();
    this.getReason();
  },
  mounted() {
    this.getAddress();
  },
  methods: {
    getJson() {
      let json = {
        detailsId: this.$route.query.id
      };
      this.axiosReq(
        this.HOME + this.USER + "inside/applyForRefund",
        "post",
        JSON.stringify(json)
      )
        .then(res => {
          console.log("售后申请服务", res);
          this.goods_list = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //换货地址
    getAddress() {
      let obj = window.sessionStorage.getItem("address") || false;
      if (obj) {
        const i = JSON.parse(obj);
        this.address_list = i;
        console.log(this.address_list);
        window.sessionStorage.removeItem("address");
      } else {
        this.$api
          .get(this.HOME + this.ORDER + "inside/address/getAddressByuserId")
          .then(res => {
            // console.log("换货地址", res);
            this.address_list = res.data.data;
          })
          .catch(err => {
            console.log(err);
          });
      }
    },

    // 选择换货地址
    goChooseAddress() {
      const id = this.$route.query.id;
      this.$router.replace({
        path: "/shipping?id=" + id + "&name=选择退换货地址"
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
      this.uploadUrl = this.HOME + "/api/upload/uploadFile";
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
      console.log("------param-----", res, file);
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
    exchange_submit() {
      if (this.replacement_reason == "") {
        this.$message.error("请选择换货原因");
        return;
      } else if (this.exchange_describe == "") {
        this.$message.error("请输入换货描述");
        return;
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
      console.log("picList", picList);
      var json = {
        orderId: this.goods_list.orderId,
        detailsId: this.goods_list.detailsId,
        cause: this.replacement_reason,
        refundType: 2,
        shopId: this.goods_list.shopId,
        // refundPrice: '',
        refundAmount: this.goods_count,
        picList: picList,
        refundDesc: this.exchange_describe,
        addressId: this.address_list.addressId,
        contact: this.address_list.contact,
        phone: this.address_list.phone
      };
      this.$api
        .post(this.HOME + this.USER + "inside/UserOrderRefund", json)
        .then(res => {
          this.$router.push({ path: "/replacement?status=2" });
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
#exchange {
  width: 100%;
  .mixin_crux() {
    font-size: 1.4rem;
    color: #333333;
    font-family: SourceHanSansCN-Regular;
  }
  .mixin_padding() {
    margin-top: 1.2rem;
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
  .receiving_address {
    width: 100%;
    height: 10.1rem;
    .mixin_padding();
    .receiving_address_left {
      width: 30%;
      height: 10.1rem;
      float: left;
      line-height: 5rem;
      .mixin_crux();
    }
    .receiving_address_right {
      width: 65%;
      height: 10.1rem;
      float: left;
      font-size: 1.3rem;
      color: #333333;
      .receiving_address_name {
        width: 100%;
        height: 4.5rem;
        line-height: 4.5rem;
      }
      .address_info {
        width: 100%;
        height: 5.6rem;
      }
    }
    .receiving_address_icon {
      width: 5%;
      height: 10.1rem;
      float: right;
      position: relative;
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
    height: 2rem;
    margin: 1rem 0rem 4.4rem 0rem;
    font-size: 1.2rem;
    color: #999999;
  }

  .submission_info {
    width: 100%;
    height: 4.4rem;
    text-align: center;
    line-height: 4.4rem;
    // margin-top: 1.5rem;
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