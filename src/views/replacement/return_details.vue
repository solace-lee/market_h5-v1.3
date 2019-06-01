<template>
  <div id="return_details">
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

    <section style="margin-top:4.7rem;" v-if="!show">
      <div class="order_number">
        <div class="order_number_top">
          <span v-if="details_list.length!=0">
            <i style="font-size: 1.8rem;margin-right: 5px;" class="el-icon-document"></i>
            订单编号:{{details_list[0].orderNum}}
          </span>
          <span v-if="details_list.length!=0&&details_list[0].refundStatus==0">待商家处理</span>
          <span v-if="details_list.length!=0&&details_list[0].refundStatus==1">已退款</span>
          <span v-if="details_list.length!=0&&details_list[0].refundStatus==2">用户已发货</span>
          <span v-if="details_list.length!=0&&details_list[0].refundStatus==3">已拒绝</span>
          <span v-if="details_list.length!=0&&details_list[0].refundStatus==4">审核通过</span>
          <span v-if="details_list.length!=0&&details_list[0].refundStatus==5">商家已发货</span>
          <span v-if="details_list.length!=0&&details_list[0].refundStatus==6">买家确认收货</span>
          <span v-if="details_list.length!=0&&details_list[0].refundStatus==7">取消售后</span>
          <span v-if="details_list.length!=0&&details_list[0].refundStatus==8">申诉</span>
          <span v-if="details_list.length!=0&&details_list[0].refundStatus==9">卖家确认收货</span>
        </div>

        <!-- 申请流程 -->
        <div class="order_number_bottom" v-if="details_list[0].refundType==1">
          <el-steps :active="step_active" finish-status="success">
            <el-step title="提交申请"></el-step>
            <el-step title="审核"></el-step>
            <el-step title="买家发货"></el-step>
            <!-- <el-step title="等待卖家收货"></el-step> -->
            <el-step title="完成"></el-step>
          </el-steps>
        </div>
        <div class="order_number_bottom" v-if="details_list[0].refundType==2">
          <el-steps :active="step_active" finish-status="success">
            <el-step title="提交申请"></el-step>
            <el-step title="审核"></el-step>
            <el-step title="买家发货"></el-step>
            <el-step title="卖家收货"></el-step>
            <el-step title="卖家发货"></el-step>
            <el-step title="买家收货"></el-step>
          </el-steps>
        </div>
      </div>

      <!-- 提示信息 -->
      <div class="empty_box" v-if="details_list[0].refundType==1">
        <div class="active_tip" v-if="step_active==1">你的服务单已经提交成功，待审核中。</div>
        <div class="active_tip" v-if="step_active==2">你的退货单已经通过审核,请尽发货并录入物流信息</div>
        <div class="active_tip" v-if="step_active==3">等待卖家收货</div>
        <div class="active_tip" v-if="step_active==4">完成</div>
        <div class="active_tip" v-if="step_active==5 || step_active==6">完成</div>
      </div>
      <div class="empty_box" v-if="details_list[0].refundType==2">
        <div class="active_tip" v-if="step_active==1">你的服务单已经提交成功，待审核中。</div>
        <div class="active_tip" v-if="step_active==2">你的退货单已经通过审核,请尽发货并录入物流信息</div>
        <div class="active_tip" v-if="step_active==3">等待卖家收货</div>
        <div class="active_tip" v-if="step_active==4">等待卖家发货</div>
        <div class="active_tip" v-if="step_active==5">等待买家收货</div>
        <div class="active_tip" v-if="step_active==6">完成</div>
      </div>
      <section
        style="padding: 0rem 1.5rem;box-sizing: border-box;"
        v-if="step_active!=2&&details_list.length!=0"
      >
        <!-- 退款金额 -->
        <div class="refund_amount" v-if="details_list[0].refundType==1">
          <span>退款金额</span>
          <span>￥{{details_list[0].refundPrice}}</span>
        </div>

        <!-- 商品信息 -->
        <div class="commodity_list">
          <div class="goods_info">商品信息</div>
          <div class="order_information">
            <div class="order_information_left">
              <img style="width: 80px;height: 80px;" :src="details_list[0].imgUrl">
            </div>
            <div class="order_information_right">
              <div>{{details_list[0].name}}</div>
              <div>
                <span>单价:</span>
                <span>￥{{details_list[0].unitPrice}}</span>
                <span>数量:</span>
                <span>x{{details_list[0].quantity}}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 退货信息 -->
        <div class="return_info">
          <div class="return_title">退货信息</div>
          <div class="apply_info">
            <div class="apply_time">
              <span>申请时间:</span>
              <span>{{details_list[0].createTime}}</span>
            </div>
            <div class="apply_type">
              <span>服务类型:</span>
              <span v-if="details_list[0].refundType==1">申请退货退款</span>
              <span v-if="details_list[0].refundType==2">申请换货</span>
            </div>
            <div class="apply_reason">
              <span>申请原因:</span>
              <span>{{details_list[0].refundDesc}}</span>
            </div>
          </div>
          <div class="return_business">
            <span>商家退回:</span>
            <span v-if="details_list[0].refundType==1">退回给商家</span>
            <span v-if="details_list[0].refundType==2">用户换货</span>
          </div>
          <div class="apply_contacts">
            <div class="apply_contacts_top">
              <span>联系人:</span>
              <span>{{details_list[0].contact}}</span>
            </div>
            <div class="apply_contacts_bottom">
              <span>联系人电话:</span>
              <span>{{details_list[0].phone}}</span>
            </div>
          </div>
        </div>
      </section>
      <!-- 操作部分 -->
      <div class="service_type" v-if="step_active!=2">
        <button @click="cancelApply" v-if="details_list[0].refundStatus==0">取消申请</button>
        <button @click="Apply" v-if="details_list[0].refundStatus==5">确认收货</button>
      </div>

      <section style="padding: 0rem 1.5rem;box-sizing: border-box;" v-if="step_active==2">
        <div class="logistics_information">
          <div class="input_information">录入物流信息</div>
          <div class="courier_company">
            <div class="courier_company_left">快递公司</div>
            <div class="courier_company_right">
              <div style="position:absolute;top:50%;right: 0rem;margin-top:-16px;">
                <el-select
                  v-model="services_company"
                  placeholder="请选择快递公司"
                  size="small"
                  style="width: 18rem;"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.kuaidiId"
                    :label="item.kdName"
                    :value="item.kuaidiId"
                  ></el-option>
                </el-select>
              </div>
            </div>
          </div>
          <div class="courier_number">
            <div class="courier_number_left">快递单号</div>
            <div class="courier_number_right">
              <div style="position:absolute;top:50%;right: 0rem;margin-top:-16px;">
                <el-input
                  v-model="courier_number"
                  placeholder="请输入快递单号"
                  size="small"
                  style="width: 18rem;"
                ></el-input>
              </div>
            </div>
          </div>
          <!-- <div class="upload_logistics">
                        <div class="upload_logistics_top">上传物流单</div>
                        <div class="upload_logistics_bottom">
                            <el-upload class="upload-demo" name="reportFile" :data="{'attach':'upload'}" :on-change="handleChange" :action="uploadUrl" :on-remove="handleAptiRemove" :file-list="fileList2" list-type="picture-card" :before-upload="beforeUpload" :on-success="handleAptiSuccess">
                                <div style="width: 100%;height: 100%;background: rgba(45,45,45,0);position: relative;">
                                <div style="position: relative;width:100%;height:100%;">
                                    <img style="width: 20px;height: 17px;position: absolute;left: 18px;top: 10px;" src="../../../img/index/replacement/camera.png" />
                                    <span style="width: 100%;height: 12px;line-height: 12px;display: inline-block;position: absolute;left:0px;top: 35px;font-size: 11px;color: #999999;">最多3张</span>
                                </div>
                                <div style="width: 100%;height: 100%;background: rgba(45,45,45,0);position: absolute;left: 0px;top:0px;z-index: 2;" @click.stop="occlusion()" v-if="upNumMax>=3">
                                </div>
                                </div>
                            </el-upload>
                        </div>
          </div>-->
        </div>
      </section>
      <div class="submission_info" @click="examine_submit" v-if="step_active==2">提交</div>
    </section>

    <!-- 申诉详情 -->
    <div class="state-container" v-if="show">
      <!-- 详情区域 -->
      <div class="state-area">
        <div class="state-content">
          <div class="state-info">
            <div class="state-title">商品信息</div>
            <div class="state-detail">
              <div class="state-img">
                <img :src="goods_list.imgUrl" alt>
              </div>
              <div class="state">
                <div class="state-name">{{goods_list.name}}</div>
                <div class="state-price">
                  <div class="state-now">
                    单价：￥
                    <span>{{goods_list.unitPrice}}</span>
                  </div>
                  <div class="state-num">
                    数量：x
                    <span>{{goods_list.quantity}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="state-list">
            <div class="list-title">申诉信息</div>
            <div class="list-area">
              <div class="list-left">申诉时间:</div>
              <div class="list-right">{{details_list.createTime}}</div>
            </div>
            <div class="list-area">
              <div class="list-left">申诉类型:</div>
              <div class="list-right" v-if="details_list.appealType == 1">退货退款</div>
              <div class="list-right" v-if="details_list.appealType == 2">换货</div>
            </div>
            <div class="list-area">
              <div class="list-left">申诉状态:</div>
              <div class="list-right" v-if="details_list.appealResultType == 0">待处理</div>
              <div class="list-right" v-if="details_list.appealResultType == 1">受理中</div>
              <div class="list-right" v-if="details_list.appealResultType == 2">直接退款</div>
              <div class="list-right" v-if="details_list.appealResultType == 3">退货退款</div>
              <div class="list-right" v-if="details_list.appealResultType == 2">协调</div>
            </div>
            <div class="list-area">
              <div class="list-left">申诉原因:</div>
              <div class="list-right" v-if="details_list.appealCauseType == 1">发货原因，如少发，错发</div>
              <div class="list-right" v-if="details_list.appealCauseType == 2">商品受损，有污渍等</div>
              <div class="list-right" v-if="details_list.appealCauseType == 3">商品与图片描述不一致</div>
              <div class="list-right" v-if="details_list.appealCauseType == 4">商品已过保质期</div>
              <div class="list-right" v-if="details_list.appealCauseType == 5">其他原因</div>
            </div>
            <!-- <div class="list-area black-line">
              <div class="list-left">商品退回:</div>
              <div class="list-right"></div>
            </div>-->
            <div class="list-area">
              <div class="list-left">申诉描述:</div>
              <div class="list-right">{{details_list.content}}</div>
            </div>
            <div class="list-area">
              <div class="list-left">申诉凭证:</div>
              <div class="list-imges">
                <div class="images" v-for="(i,index) in picList" :key="index">
                  <img :src="i" alt>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 取消申诉 -->
      <div class="cancle-area">
        <div class="cancle-btn" @click="cancel">取消申诉</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import { MessageBox } from "mint-ui";
export default {
  data() {
    return {
      theme: "",
      step_active: 1,
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      services_company: "",
      courier_number: "",
      uploadUrl: "",
      fileList1: [],
      fileList2: [],
      upNumMax: 0,
      details_list: [{
        refundType: 80
      }],
      show: false, // false为普通详情， true为申述详情
      goods_list: {}, // 商品详情
      picList: [], //凭证图片列表
    };
  },
  created() {
    var body_s = document.getElementsByTagName("body")[0];
    body_s.style.background = "#f2f2f2";
    if (this.$route.query.status == 8) {
      // 申诉详情
      this.getInfo();
      this.getOrderInfo();
      this.theme = "申述详情";
      this.show = true;
    } else {
      // 其他详情
      this.urlUp();
      this.getJson();
      this.getCourierCompany();
      this.theme = "服务单详情";
      this.show = false;
    }
  },
  methods: {
    //获取申诉商品信息
    getOrderInfo() {
      const i = window.sessionStorage.getItem("representationInfo");
      this.goods_list = JSON.parse(i);
      // window.sessionStorage.removeItem("representationInfo");
    },

    // 申诉详情
    getInfo() {
      this.$api
        .get(
          this.HOME +
            this.USER +
            "inside/selectUserAppeal/" +
            this.$route.query.id
        )
        .then(res => {
          this.details_list = res.data.data;
          this.picList = res.data.data.accessory.split(",");
          console.log(this.picList);
        });
    },

    //取消申诉
    cancel() {
      this.$api
        .post(
          this.HOME + this.USER + "inside/updateAppeal/" + this.$route.query.id
        )
        .then(res => {
          console.log(res);
          if (res.data.status == 200) {
            Toast("取消成功");
            this.$router.replace({
              path: "replacement"
            });
          } else {
            Toast("取消失败请重试");
          }
        });
    },

    // 其他详情
    getJson() {
      const status = this.$route.query.status
      let url =''
      if (status == 2 || status == 3) {
        url = "inside/refundRecordDetails/" + this.$route.query.id
      } else if (status == 5 || status == 8) {
        url = "inside/refundRecordDetails/" + this.$route.query.id
      } else {
        url = "inside/refundRecordDetails/" + this.$route.query.id
      }
      this.$api
        .get(this.HOME + this.USER + url)
        .then(res => {
          // console.log("售后申请", res);
          if (res.data.data[0].refundType == 1) {
            if (res.data.data[0].refundStatus == 0) {
              this.step_active = 1;
            } else if (res.data.data[0].refundStatus == 4) {
              this.step_active = 2;
            } else if (res.data.data[0].refundStatus == 2) {
              this.step_active = 3;
            } else if (res.data.data[0].refundStatus == 9) {
              this.step_active = 5;
            } else if (res.data.data[0].refundStatus == 1) {
              this.step_active = 5;
            }
          } else if (res.data.data[0].refundType == 2) {
            if (res.data.data[0].refundStatus == 0) {
              this.step_active = 1;
            } else if (res.data.data[0].refundStatus == 4) {
              this.step_active = 2;
            } else if (res.data.data[0].refundStatus == 2) {
              this.step_active = 3;
            } else if (res.data.data[0].refundStatus == 9) {
              this.step_active = 4;
            } else if (res.data.data[0].refundStatus == 5) {
              this.step_active = 5;
            } else if (res.data.data[0].refundStatus == 6) {
              this.step_active = 6;
            }
          }
          this.details_list = res.data.data;
          // console.log(this.details_list);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getCourierCompany() {
      this.$api
        .get(this.LOCAL + "/api/getExpress")
        .then(res => {
          this.options = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    examine_submit() {
      if (this.services_company == "") {
        this.$message.error("请选择快递公司");
        return;
      } else if (this.courier_number == "") {
        this.$message.error("请选择快递单号");
        return;
      }

      this.options.forEach((element,index) => {
        if (element.kuaidiId == this.services_company ) {
          // this.uKuaidiName = element.kdName
          this.confirm_pass(element.kdName)
        }
      })
    },

    confirm_pass (name) {
      var json = {
        id: this.details_list[0].id,
        refundStatus: 2,
        uKuaidiName: name,
        kuaiDiId: this.services_company,
        sendTrackingNum: this.courier_number
      };
      this.$api
        .post(this.HOME + this.USER + "inside/insertLogistics", json)
        .then(res => {
          console.log("物流提交", res);
          if (res.data.status == 200) {
            this.getJson();
          }
        })
        .catch(err => {
          console.log(err);
        });
      
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
      if (res.result == 1) {
        this.fileList1.push({
          url: res.data.img
        });
      } else {
        //   Toast(res.msg);
      }
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
    //取消申请
    cancelApply() {
      if (this.details_list[0].refundStatus == 0) {
        MessageBox.confirm("确定取消申请吗?").then(action => {
          var json = { id: this.details_list[0].id, refundStatus: 7 };
          this.$api
            .post(this.HOME + this.USER + "inside/updateRefundType", json)
            .then(res => {
              this.$message.success("取消成功");
              this.$router.replace({
                path: "replacement?status=2"
              });
            })
            .catch(err => {
              console.log(err);
            });
        });
      } else if (this.details_list[0].refundStatus == 2) {
        MessageBox.confirm("确定已收货吗?").then(action => {
          var json = { id: this.details_list[0].id, refundStatus: 6 };
          this.axiosReq(
            this.HOME + this.USER + "inside/updateRefundType",
            "post",
            json
          )
            .then(res => {
              this.$message.success("已收货");
              this.getJson();
            })
            .catch(err => {
              console.log(err);
            });
        });
      }
    },
    Apply() {
      const config = {
        Id: this.details_list[0].id,
        orderStatus: 6
      };
      console.log(config);
      this.$api
        .post(this.HOME + this.USER + "inside/updateRefundType", config)
        .then(res => {
          if (res.data.data.status == 200) {
            Toast("确认收货成功");
            this.getInfo()
          }
          Toast("确认失败请重试");
        });
    }
  }
};
</script>
<style lang="less" scoped>
#return_details {
  width: 100%;
  .mixin_title() {
    font-size: 1.4rem;
    color: #333333;
    font-family: SourceHanSansCN-Regular;
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

  .order_number {
    width: 100%;
    height: 12.5rem;
    background: white;
    .order_number_top {
      width: 100%;
      height: 4.5rem;
      line-height: 4.5rem;
      span:nth-of-type(1) {
        float: left;
        margin-left: 1.5rem;
        font-size: 1.2rem;
        color: rgb(51, 51, 51);
        font-family: MicrosoftYaHei;
      }
      span:nth-of-type(2) {
        float: right;
        margin-right: 1.3rem;
        font-size: 1.4rem;
        color: rgb(51, 51, 51);
        font-family: MicrosoftYaHei;
      }
    }
    .order_number_bottom {
      width: 100%;
      height: 7.2rem;
      padding: 0rem 1.5rem;
      box-sizing: border-box;
    }
  }

  .empty_box {
    width: 100%;
    height: 3.5rem;
    position: relative;
    .active_tip {
      width: 34.5rem;
      height: 5.5rem;
      line-height: 5.5rem;
      border-radius: 4px;
      background: rgb(0, 174, 135);
      color: white;
      position: absolute;
      top: -2rem;
      left: 1.5rem;
      z-index: 2;
      // padding: 1rem 1.5rem 0rem 1.5rem;
      text-align: center;
      box-sizing: border-box;
      font-size: 1.2rem;
    }
  }
  .refund_amount {
    width: 100%;
    height: 4.3rem;
    line-height: 4.3rem;
    margin-top: 1.5rem;
    background: white;
    padding: 0px 1.5rem;
    box-sizing: border-box;
    border-radius: 4px;
    span:nth-of-type(1) {
      float: left;
      .mixin_title();
    }
    span:nth-of-type(2) {
      float: right;
      color: #00ae87;
      font-size: 1.5rem;
    }
  }

  .commodity_list {
    width: 100%;
    border-radius: 4px;
    height: 15.5rem;
    background: white;
    margin-top: 1.5rem;
    padding: 0rem 1.5rem;
    box-sizing: border-box;
    .goods_info {
      width: 100%;
      height: 4.4rem;
      line-height: 4.4rem;
      border-bottom: 1px solid #f2f2f2;
      .mixin_title();
    }
    .order_information {
      width: 100%;
      height: 9rem;
      margin-top: 1.5rem;
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

  .return_info {
    width: 100%;
    height: 25.4rem;
    margin-top: 1.5rem;
    background: white;
    padding: 0rem 1.5rem;
    box-sizing: border-box;
    border-radius: 4px;
    .return_title {
      width: 100%;
      height: 4.4rem;
      line-height: 4.4rem;
      border-bottom: 1px solid #f2f2f2;
      .mixin_title();
    }
    .mixin_apply_title() {
      color: #bbbbbb;
      font-size: 1.2rem;
    }
    .mixin_apply_info() {
      margin-left: 1rem;
      font-size: 1.3rem;
      color: #373737;
    }
    .apply_info {
      width: 100%;
      height: 9.5rem;
      border-bottom: 1px solid #f2f2f2;
      .apply_time {
        width: 100%;
        height: 3.16rem;
        line-height: 3.16rem;
        span:nth-of-type(1) {
          .mixin_apply_title();
        }
        span:nth-of-type(2) {
          .mixin_apply_info();
        }
      }
      .apply_type {
        width: 100%;
        height: 3.16rem;
        line-height: 3.16rem;
        span:nth-of-type(1) {
          .mixin_apply_title();
        }
        span:nth-of-type(2) {
          .mixin_apply_info();
        }
      }
      .apply_reason {
        width: 100%;
        height: 3.16rem;
        line-height: 3.16rem;
        span:nth-of-type(1) {
          .mixin_apply_title();
        }
        span:nth-of-type(2) {
          .mixin_apply_info();
        }
      }
    }
    .return_business {
      width: 100%;
      height: 4rem;
      line-height: 4rem;
      border-bottom: 1px solid #f2f2f2;
      span:nth-of-type(1) {
        .mixin_apply_title();
      }
      span:nth-of-type(2) {
        .mixin_apply_info();
      }
    }
    .apply_contacts {
      width: 100%;
      height: 7rem;
      .apply_contacts_top {
        width: 100%;
        height: 3.5rem;
        line-height: 3.5rem;
        span:nth-of-type(1) {
          .mixin_apply_title();
        }
        span:nth-of-type(2) {
          .mixin_apply_info();
        }
      }
      .apply_contacts_bottom {
        width: 100%;
        height: 3.5rem;
        line-height: 3.5rem;
        span:nth-of-type(1) {
          .mixin_apply_title();
        }
        span:nth-of-type(2) {
          .mixin_apply_info();
        }
      }
    }
  }

  .service_type {
    width: 100%;
    height: 6rem;
    background: white;
    margin-top: 1.5rem;
    position: relative;
    button {
      height: 2.5rem;
      background: white;
      border-radius: 1.5rem;
      line-height: 2.5rem;
      padding: 0rem 0.8rem;
      box-sizing: border-box;
      border: 1px solid #dddddd;
      font-size: 1.3rem;
      position: absolute;
      top: 50%;
      right: 2rem;
      margin-top: -1.25rem;
    }
  }

  // 步骤2
  .submission_info {
    width: 100%;
    height: 3.4rem;
    text-align: center;
    line-height: 3.4rem;
    margin-top: 1.5rem;
    background: white;
    position: fixed;
    bottom: 0;
    background: #0bb794;
    color: white;
    z-index: 99999;
    font-size: 1.5rem;
  }
  .logistics_information {
    width: 100%;
    height: 12.5rem;
    background: white;
    margin-top: 1.5rem;
    padding: 0rem 1.5rem;
    box-sizing: border-box;
    border-radius: 0.4rem;
    .mixin_courier() {
      width: 100%;
      height: 4rem;
      border-bottom: 1px solid #f2f2f2;
    }
    .mixin_courier_title() {
      font-size: 1.4rem;
      color: #333333;
    }
    .input_information {
      .mixin_courier();
      line-height: 4rem;
      .mixin_courier_title();
    }
    .courier_company {
      .mixin_courier();
      .courier_company_left {
        float: left;
        width: 25%;
        .mixin_courier_title();
        line-height: 4rem;
      }
      .courier_company_right {
        float: right;
        width: 75%;
        height: 4rem;
        position: relative;
      }
    }
    .courier_number {
      width: 100%;
      height: 4rem;
      .courier_number_left {
        float: left;
        width: 25%;
        .mixin_courier_title();
        line-height: 4rem;
      }
      .courier_number_right {
        float: right;
        width: 75%;
        height: 4rem;
        position: relative;
      }
    }
    .upload_logistics {
      width: 100%;
      height: 11rem;
      .upload_logistics_top {
        width: 100%;
        height: 3.5rem;
        .mixin_courier_title();
        line-height: 3.5rem;
      }
      .upload_logistics_bottom {
        width: 100%;
        height: 7.5rem;
      }
    }
  }
}

//申诉详情
.state-container {
  margin-top: 4.7rem;
  width: 100%;
  height: 100%;
  // padding: 1.5rem;
  .state-area {
    padding: 1.5rem;
    width: 100%;
    .state-content {
      // background: #fff;
      // padding: 1.5rem;
      .state-info {
        background: #fff;
        padding: 0 1.5rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .state-title {
          height: 4.4rem;
          line-height: 4.4rem;
          border-bottom: 1px solid #eee;
          color: #333;
          font-size: 1.4rem;
        }
        .state-detail {
          display: flex;
          align-items: center;
          height: 11rem;
          width: 100%;
          padding: 1.5rem 0;
          .state-img {
            height: 100%;
            width: 8rem;
            img {
              width: 8rem;
              height: 8rem;
            }
          }
          .state {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width: 100%;
            height: 100%;
            margin-left: 1rem;
            .state-name {
              font-size: 1.4rem;
              color: #666;
              /*超过两行省略号*/
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 4;
              /*! autoprefixer: off */
              -webkit-box-orient: vertical;
              /*! autoprefixer: on */
            }
            .state-price {
              font-size: 1.2rem;
              color: #666;
              display: flex;
              align-items: center;
              .state-num {
                margin-left: 1.5rem;
              }
            }
          }
        }
      }
      .state-list {
        width: 100%;
        background: #fff;
        margin-top: 1.5rem;
        border-radius: 6px;
        padding: 0 1.5rem;
        .list-title {
          height: 4.4rem;
          line-height: 4.4rem;
          border-bottom: 1px solid #eee;
          color: #333;
          font-size: 1.4rem;
        }
        .list-area {
          display: flex;
          align-items: center;
          font-size: 1.3rem;
          .list-left {
            flex: 1;
            color: #999;
            line-height: 4rem;
          }
          .list-right {
            flex: 4;
            color: #333;
            /*超过两行省略号*/
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            /*! autoprefixer: off */
            -webkit-box-orient: vertical;
            /*! autoprefixer: on */
          }
          .list-imges {
            flex: 4;
            display: flex;
            .images {
              width: 6rem;
              height: 6rem;
              margin: 0 0 2rem 1rem;
              img {
                height: 6rem;
                width: 6rem;
              }
            }
          }
        }
        .black-line {
          border-top: 1px solid #eee;
          border-bottom: 1px solid #eee;
        }
      }
    }
  }
  .cancle-area {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 6rem;
    background: #fff;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .cancle-btn {
      margin-right: 3rem;
      width: 8.2rem;
      height: 3rem;
      border: 1px solid #00ae87;
      color: #00ae87;
      border-radius: 1.5rem;
      line-height: 3rem;
      text-align: center;
      font-size: 1.3rem;
    }
  }
}
</style>