<!-- 运营商入驻 -->
<template>
  <div class="opertor">
    <div class="op_head" v-show="postImage">
      <div>
        <van-icon name="arrow-left" @click="$router.go(-1)" class="nu_h_go"/>
      </div>
      <div class="op_h_text">运营商入驻信息填写</div>
      <div></div>
    </div>
    <div class="op_body" v-show="postImage">
      <div class="op_body2">
        <div class="op_b_header">
          <div class="op_b_header_left"></div>
          <strong>基本信息</strong>
        </div>
        <!-- <div class="op_b_box">
          <div class="f1">代理级别</div>
          <div class="f3">
            <van-radio-group v-model="form.agencyLevel">
              <van-radio :name="1" checked-color="#0bb794">是</van-radio>
              <van-radio :name="2" checked-color="#0bb794">否</van-radio>
            </van-radio-group>
          </div>
        </div>-->

        <div class="op_b_box">
          <div class="f1">联系人</div>
          <div class="f3">
            <input type="text" placeholder="请填写联系人姓名" v-model="form.contactName">
          </div>
        </div>

        <div class="op_b_box">
          <div class="f1">联系电话</div>
          <div class="f3">
            <input type="text" placeholder="请填写联系电话" v-model="form.contactPhone">
          </div>
        </div>

        <!-- <div class="op_b_box">
          <div class="f1">助力乡村账号</div>
          <div class="f3">
            <input type="text" placeholder="请填写助力乡村账号" v-model="form.userId">
          </div>
        </div>-->

        <div class="op_b_box">
          <div class="f1">邮箱地址</div>
          <div class="f3">
            <input type="text" placeholder="请填写邮箱账号" v-model="form.contactEmail">
          </div>
        </div>
        <div class="op_b_box">
          <div class="f3">
            <input type="text" placeholder="输入详细地址" v-model="form.address">
          </div>
        </div>
      </div>
      <div>
        <div class="op_b_header pt">
          <div class="op_b_header_left"></div>
          <strong>认证信息</strong>
        </div>
        <div class="op_b_box">
          <div class="f1">代理性质</div>
          <div class="f3">
            <van-radio-group v-model="form.agencyNature">
              <van-radio :name="1" checked-color="#0bb794">个人</van-radio>
              <van-radio :name="2" checked-color="#0bb794">企业</van-radio>
            </van-radio-group>
          </div>
        </div>

        <div class="op_b_box">
          <div class="f1" v-if="form.agencyNature != 2 ">真实姓名</div>
          <div class="f1" v-if="form.agencyNature == 2 ">法人代表</div>
          <div class="f3">
            <input type="text" placeholder="请填写姓名" v-model="form.agencyLegalName">
          </div>
        </div>

        <div class="op_b_box">
          <div class="f1" v-if="form.agencyNature == 2 ">法人身份证号</div>
          <div class="f1" v-if="form.agencyNature != 2 ">个人身份证号</div>
          <div class="f3">
            <input type="text" placeholder="请填写身份证号码" v-model="form.agencyPassport">
          </div>
        </div>
        <div class="op_b_box">
          <div class v-if="form.agencyNature == 2 ">法人身份证</div>
          <div class v-if="form.agencyNature != 2 ">个人身份证</div>
          <div class="f3">
            <div class="postImg" @click="goImg('法人身份证')">
              <div class="img" v-if="form.passportFrontUrl">
                <img :src="form.passportFrontUrl" alt>
              </div>
              <div class="img" v-if="form.passportBackUrl">
                <img :src="form.passportBackUrl" alt>
              </div>
              <div class="img" v-if="form.passportHandheldUrl">
                <img :src="form.passportHandheldUrl" alt>
              </div>
              <div class="p_i_button">
                <span class="text1" v-if="!imgNum()">上传图片</span>
                <span class="text2" v-if="imgNum()">已上传了{{imgNum()}}张图片</span>
                <van-icon name="arrow" class="i"/>
              </div>
            </div>
          </div>
        </div>

        <span v-if="form.agencyNature == 2 ">
          <div class="op_b_box">
            <div class="f1">公司名称</div>
            <div class="f3">
              <input type="text" placeholder="请填写公司名称" v-model="form.agencyCompany">
            </div>
          </div>

          <div class="op_b_box">
            <div class="f1">对公账号</div>
            <div class="f3">
              <input type="text" placeholder="请填写对公账号" v-model="form.bussinessAccount">
            </div>
          </div>

          <div class="op_b_box">
            <div class="f1">营业执照编号</div>
            <div class="f3">
              <input type="text" placeholder="请填写营业执照编号" v-model="form.bussinessLicense">
            </div>
          </div>
          <div class="op_b_box">
            <div class>
              <span>营业执照</span>
            </div>
            <div class="f3">
              <div class="postImg" @click="goImg('营业执照')">
                <div class="img">
                  <img :src="form.bussinessLicenseUrl" v-if="form.bussinessLicenseUrl" alt>
                </div>
                <div class="p_i_button">
                  <span class="text1" v-if="!form.bussinessLicenseUrl">上传图片</span>
                  <span class="text2" v-if="form.bussinessLicenseUrl">已上传了图片</span>
                  <van-icon name="arrow" class="i"/>
                </div>
              </div>
            </div>
          </div>
          <div class="op_b_box">
            <div class>打款凭证</div>
            <div class="f3">
              <div class="postImg" @click="goImg('打款凭证')">
                <div class="img">
                  <img :src="form.transferMoneyUrl" v-if="form.transferMoneyUrl" alt>
                </div>
                <div class="p_i_button">
                  <span class="text1" v-if="!form.transferMoneyUrl">上传图片</span>
                  <span class="text2" v-if="form.transferMoneyUrl">已上传了图片</span>
                  <van-icon name="arrow" class="i"/>
                </div>
              </div>
            </div>
          </div>
        </span>
        <div class="op_b_box m0">
          <div class="f1">代理地区</div>
          <div>
            <div class="p_i_button" @click="getAddress">
              <span class="text1" v-if="!subress">选择地区</span>
              <span class="text2" v-if="subress">{{subress}}</span>
              <van-icon name="arrow" class="i"/>
            </div>
          </div>
        </div>
        
        <div class="gf_pay">
          <button @click="postNewOp">提交</button>
          <!-- <button @click="postTotal">结算({{total | number}})</button> -->
        </div>

        <!-- 地区选择-弹出层开始-->
        <van-popup v-model="show" position="bottom" :overlay="true">
          <div class="popup_header">
            <strong>请选择</strong>
            <van-icon name="cross" @click="show =!show"/>
          </div>
          <div class="popup_list">
            <van-tabs v-model="active">
              <van-tab :title="provinceName? provinceName:'省会'">
                <div class="p_p_header">选择省会</div>
                <div v-for="(item,index) in provinceList" :key="index">
                  <div
                    class="p_p_list"
                    :class="{p_p_active:activeIndex == index}"
                    @click="goCity(index,item)"
                  >
                    <span>{{item.provinceName}}</span>
                    <img src="../../../img/index/car/yes.png" alt v-if="activeIndex == index">
                  </div>
                </div>
              </van-tab>

              <van-tab :title="cityName? cityName : '城市'" v-if="citychange" style="display:none">
                <div class="p_p_header">选择城市</div>
                <div v-for="(item,index) in cityList" :key="index">
                  <div
                    class="p_p_list"
                    :class="{p_p_active:activeIndex2 == index}"
                    @click="goDistrict(index,item)"
                  >
                    <span>{{item.cityName}}</span>
                    <img src="../../../img/index/car/yes.png" alt v-if="activeIndex2 == index">
                  </div>
                </div>
              </van-tab>

              <van-tab :title="districtName? districtName : '区域'" v-if="districtchange">
                <div class="p_p_header">选择区域</div>
                <div v-for="(item,index) in districtLite" :key="index">
                  <div
                    class="p_p_list"
                    :class="{p_p_active:activeIndex3 == index}"
                    @click="govillage(index,item)"
                  >
                    <span>{{item.districtName}}</span>
                    <img src="../../../img/index/car/yes.png" alt v-if="activeIndex3 == index">
                  </div>
                </div>
              </van-tab>

              <van-tab :title="villageName? villageName : '街道'" v-if="villagechange">
                <div class="p_p_header">选择街道</div>
                <div v-for="(item,index) in villageLite" :key="index">
                  <div
                    class="p_p_list"
                    :class="{p_p_active:activeIndex4 == index}"
                    @click="out(index,item)"
                  >
                    <span>{{item.villageName}}</span>
                    <img src="../../../img/index/car/yes.png" alt v-if="activeIndex4 == index">
                  </div>
                </div>
              </van-tab>
            </van-tabs>
          </div>
        </van-popup>
      </div>
    </div>
    <!-- 地区选择-弹出层结束-->

    <!-- 上传图片-弹出层开始-->
    <div class="opertorImg" v-if="!postImage">
      <div class="o_op_head">
        <div>
          <van-icon name="arrow-left" @click="postImage=!postImage" class="o_nu_h_go"/>
        </div>
        <div class="o_op_h_text">上传证件照</div>
        <div></div>
      </div>
      <div class="o_op_bpody" v-if="name == '法人身份证'">
        <div class="o_op_b_header">
          <div class="o_op_b_header_left"></div>
          <div class="o_op_b_header_center">请上传身份证图片</div>
          <div class="o_op_b_header_right" @click="imgChange('img1','zhengImgchange')">重新上传</div>
        </div>
        <div class="o_touxiang">
          <el-upload
            class="o_avatar-uploader"
            :action="actionurl"
            name="reportFile"
            :show-file-list="false"
            :on-success="handleAvatarSuccess1_1"
            :before-upload="beforeAvatarUpload1_1"
            :disabled="changes.zhengImgchange"
          >
            <img
              v-if="form.passportFrontUrl"
              :src="form.passportFrontUrl"
              class="o_avatar"
              id="img1"
            >
            <div v-else class="o_moren">
              <img src="../../../img/index/car/takePhoto.png">
            </div>
          </el-upload>
        </div>
        <div class="o_op_b_header">
          <div class="o_op_b_header_left"></div>
          <div class="o_op_b_header_center">请上传身份证反面面图片</div>
          <div class="o_op_b_header_right" @click="imgChange('img2','fangImgchange')">重新上传</div>
        </div>
        <div class="o_touxiang">
          <el-upload
            class="o_avatar-uploader"
            :action="actionurl"
            name="reportFile"
            :show-file-list="false"
            :on-success="handleAvatarSuccess1_2"
            :before-upload="beforeAvatarUpload1_2"
            :disabled="changes.fangImgchange"
          >
            <img v-if="form.passportBackUrl" :src="form.passportBackUrl" class="o_avatar" id="img2">
            <div v-else class="o_moren">
              <img src="../../../img/index/car/takePhoto.png">
            </div>
          </el-upload>
        </div>
        <div class="o_op_b_header">
          <div class="o_op_b_header_left"></div>
          <div class="o_op_b_header_center">请上传身份证手持图片</div>
          <div class="o_op_b_header_right" @click="imgChange('img3','handImgchange')">重新上传</div>
        </div>
        <div class="o_touxiang">
          <el-upload
            class="o_avatar-uploader"
            :action="actionurl"
            name="reportFile"
            :show-file-list="false"
            :on-success="handleAvatarSuccess1_3"
            :before-upload="beforeAvatarUpload1_3"
            :disabled="changes.handImgchange"
          >
            <img
              v-if="form.passportHandheldUrl"
              :src="form.passportHandheldUrl"
              class="o_avatar"
              id="img3"
            >
            <div v-else class="o_moren">
              <img src="../../../img/index/car/takePhoto.png">
            </div>
          </el-upload>
        </div>
        <div class="o_imgfooter">
          <button @click="goOpa(1)">提交</button>
        </div>
      </div>

      <div class="o_op_bpody o_h91vh" v-if="name == '营业执照'">
        <div class="o_op_b_header">
          <div class="o_op_b_header_left"></div>
          <div class="o_op_b_header_center">请上传营业执照图片</div>
          <div class="o_op_b_header_right" @click="imgChange('img4','ShopImgchange')">重新上传</div>
        </div>
        <div class="o_touxiang">
          <el-upload
            class="o_avatar-uploader"
            :action="actionurl"
            name="reportFile"
            :show-file-list="false"
            :on-success="handleAvatarSuccess2"
            :before-upload="beforeAvatarUpload2"
            :disabled="changes.ShopImgchange"
          >
            <img
              v-if="form.bussinessLicenseUrl"
              :src="form.bussinessLicenseUrl"
              class="o_avatar"
              id="img4"
            >
            <div v-else class="o_moren">
              <img src="../../../img/index/car/takePhoto.png">
            </div>
          </el-upload>
        </div>
        <div class="o_imgfooter">
          <button @click="goOpa(2)">提交</button>
        </div>
      </div>

      <div class="o_op_bpody o_h91vh" v-if="name == '打款凭证'">
        <div class="o_op_b_header">
          <div class="o_op_b_header_left"></div>
          <div class="o_op_b_header_center">请上传打款凭证图片</div>
          <div class="o_op_b_header_right" @click="imgChange('img5','moneyImgchange')">重新上传</div>
        </div>
        <div class="o_touxiang">
          <el-upload
            class="o_avatar-uploader"
            :action="actionurl"
            name="reportFile"
            :show-file-list="false"
            :on-success="handleAvatarSuccess3"
            :before-upload="beforeAvatarUpload3"
            :disabled="changes.moneyImgchange"
          >
            <img
              v-if="form.transferMoneyUrl"
              :src="form.transferMoneyUrl"
              class="o_avatar"
              id="img5"
            >
            <div v-else class="o_moren">
              <img src="../../../img/index/car/takePhoto.png">
            </div>
          </el-upload>
        </div>
        <div class="o_imgfooter">
          <button @click="goOpa(3)">提交</button>
        </div>
      </div>
    </div>
    <!-- 上传图片-弹出层结束-->
  </div>
</template>

<script>
import { localName } from "@/common/local.js";
import { Toast } from "mint-ui";
export default {
  created() {
    // this.getProvince()
    if (this.$route.query.type == 3) {
     this.editInfo()
    }
  },
  data() {
    return {
      form: {
        agencyLevel: 1, //代理性质
        contactName: "", //联系人姓名
        contactPhone: "", //电话
        contactEmail: "", //邮箱
        agencyNature: 1, //代理性质
        agencyCompany: "", //公司名称
        bussinessAccount: "", //对公账户
        // userId: 1432,
        agencyLegalName: "", // 法人代表
        agencyPassport: "", //法人身份证号码
        passportFrontUrl: "", //身份证1
        passportBackUrl: "", //身份证2
        passportHandheldUrl: "", //身份证3
        bussinessLicense: "",
        bussinessLicenseUrl: "", //营业执照
        transferMoneyUrl: "", //凭证
        provinceId: -1, //地址
        cityId: -1, //地址
        districtId: -1, //地址
        villageId: -1, //地址
        address: "" //地址
      },
      // 上传图片
      postImage: true,
      actionurl: this.HOME + this.UPLOAD + "uploadFile",
      radio: "1",
      checked: false,
      limit: 3, //限制图片上传的数量
      tempImgs: [],
      name: "",
      changes: {
        zhengImgchange: false,
        fangImgchange: false,
        handImgchange: false,
        ShopImgchange: false,
        moneyImgchange: false
      },
      // 弹窗-选择地区
      show: false,
      active: 0,
      // 接口数据
      provinceList: [],
      cityList: [],
      districtLite: [],
      villageLite: [],
      // tab文字变化
      provinceName: "",
      cityName: "",
      districtName: "",
      villageName: "",
      // 样式变化
      activeIndex: -1,
      activeIndex2: -1,
      activeIndex3: -1,
      activeIndex4: -1,
      // 控制显示与隐藏
      citychange: false,
      districtchange: false,
      villagechange: false
    };
  },
  // watch: {
  //   form:{
  //     handler(Val,oldVal){
  //       if(Val.agencyLevel !==1){
  //         Val.agencyLevel =1
  //         console.log('请输入1')
  //       }
  //     },
  //     deep: true,
  //   }
  // },
  methods: {
    // 修改入驻信息
    editInfo() {
       this.$api.get(this.HOME + this.USER + 'inside/getByUserId')
      .then(res => {
        if (res.data.status == 200) {
          const info = res.data.data
          this.form = info
          // this.form.shopName = info.shopName
          // this.form.firstClassifyId = info.firstClassifyId
          // this.form.secondClassifyId = info.secondClassifyId
          // this.form.thirdClassifyId = info.thirdClassifyId
          // this.form.firstClassifyName = info.firstClassifyName
          // this.form.secondClassifyName = info.secondClassifyName
          // this.form.thirdClassifyName = info.thirdClassifyName
          // this.form.shopNature = info.shopNature
          // this.form.contactName = info.contactName
          // this.form.contactPhone = info.contactPhone
          // this.form.provinceId = info.provinceId
          // this.form.cityId = info.cityId
          // this.form.districtId = info.districtId
          // this.form.addressDetail = info.addressDetail
          // this.form.bussinessLicenseUrl = info.bussinessLicenseUrl
          // this.form.shopImgUrl = info.shopImgUrl
          // this.form.agencyId = info.agencyId
          // this.shopId = info.shopId
          localName(this.form.provinceId, this.form.cityId, this.form.districtId)
            .then(res => {
              this.provinceName = res.provinceName;
              this.cityName = res.cityName;
              this.districtName = res.districtName;
            })
        }
      })
    },
    // 接口
    // 获取省份
    getProvince() {
      this.$api.get(this.LOCAL + "/api/getProvinceList").then(res => {
        if (res.status == 200) {
          this.provinceList = res.data;
        } else {
          alert(res.data.msg);
        }
      });
    },
    // 获取城市
    getCity(id) {
      this.form.cityId = -1;
      this.form.districtId = -1;
      this.form.villageId = -1;
      this.cityList = [];
      this.districtLite = [];
      this.villageLite = [];
      this.activeIndex2 = -1;
      this.activeIndex3 = -1;
      this.activeIndex4 = -1;
      this.$api.get(this.LOCAL + "/api/getCityList/" + id).then(res => {
        // console.log(res);
        if (res.status == 200) {
          this.cityList = res.data;
          this.active += 1;
        } else {
          alert(res.data.msg);
        }
      });
    },
    // 获取地区
    getDistrict(id) {
      this.districtId = -1;
      this.form.villageId = -1;
      this.districtLite = [];
      this.villageLite = [];
      this.activeIndex3 = -1;
      this.activeIndex4 = -1;
      this.$api.get(this.LOCAL + "/api/getDistrictList/" + id).then(res => {
        if (res.status == 200) {
          this.districtLite = res.data;
          this.active += 1;
        } else {
          alert(res.data.msg);
        }
      });
    },
    // 获取街道
    getVillage(id) {
      this.form.villageId = -1;
      this.activeIndex4 = -1;
      this.villageLite = [];
      this.$api.get(this.LOCAL + "/api/getVillage/" + id).then(res => {
        if (res.status == 200) {
          this.villageLite = res.data;
          this.active += 1;
        } else {
          alert(res.data.msg);
        }
      });
    },
    // 提交
    postForm() {
      let obj = this.form;
      let url = ''
      if (this.$route.query.type == 3) {
        this.form.shopId = this.shopId
        url = 'inside/agencyupdate'
      } else {
        url = 'inside/agencyinsert'
      }
      this.$api
        .post(this.HOME + this.USER + url, this.form)
        .then(res => {
          if (res.data.status === 200) {
            Toast("申请已提交");
            this.$router.replace({
              path: "/user"
            });
          } else {
            Toast(res.data.msg);
          }
        });
    },
    // 提交
    postNewOp() {
      if (!this.form.contactName) {
        Toast("请输入联系人姓名");
        return;
      } else if (!/^([0-9]|[a-zA-Z]){6,16}$/.test(this.form.contactPhone)) {
        Toast("请输入正确手机电话");
        return;
      } else if (
        !/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(
          this.form.contactEmail
        )
      ) {
        Toast("请输入正确邮箱");
        return;
      }

      if (this.form.agencyNature == 2) {
        if (!this.form.agencyLegalName) {
          Toast("请填写法人姓名");
          return;
        } else if (
          !/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(
            this.form.agencyPassport
          )
        ) {
          Toast("请正确填写法人身份证");
          return;
        }
        // else if (
        //   !this.form.passportFrontUrl ||
        //   !this.form.passportBackUrl ||
        //   !this.form.passportHandheldUrl
        // ) {
        //   Toast("请上传法人身份证图片");
        //   return;
        // }
        else if (
          !this.form.agencyCompany ||
          !this.form.bussinessAccount ||
          !this.form.bussinessLicense
        ) {
          Toast("请完善企业信息");
          return;
        } else if (
          !this.form.bussinessLicenseUrl ||
          !this.form.transferMoneyUrl
        ) {
          Toast("请上传凭证图片");
          return;
        } else if (
          this.form.provinceId == -1 ||
          this.form.cityId == -1 ||
          this.form.districtId == -1
        ) {
          Toast("请选择代理地区(省市区)");
          return;
        }
      } else {
        if (!this.form.agencyLegalName) {
          Toast("请填写真实姓名");
          return;
        } else if (
          !/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(
            this.form.agencyPassport
          )
        ) {
          Toast("请正确填写身份证");
          return;
        }
        // else if (
        //   !this.form.passportFrontUrl ||
        //   !this.form.passportBackUrl ||
        //   !this.form.passportHandheldUrl
        // ) {
        //   Toast("请上传身份证图片");
        //   return;
        // }
        else if (
          this.form.provinceId == -1 ||
          this.form.cityId == -1 ||
          this.form.districtId == -1
        ) {
          Toast("请选择代理地区(省市区)");
          return;
        }
      }
      this.postForm();
    },
    onSubmit() {
      // console.log("submit!");
    },

    delimg(i) {
      // console.log(i);
    },
    //
    // 上传图片
    goImg(val) {
      this.name = val;
      this.postImage = !this.postImage;
    },
    // 正面
    handleAvatarSuccess1_1(res, File) {
      // console.log(res);
      this.form.passportFrontUrl = res.path;
      this.changes.zhengImgchange = true;
    },
    beforeAvatarUpload1_1(file) {
      // const isLt2M = file.size / 1024 / 1024 < 0.5;
      // if (!isLt2M) {
      //   Toast("上传图片大小不能超过 500kb!");
      // }
      // return isLt2M;
    },
    // 反面
    handleAvatarSuccess1_2(res, file) {
      this.form.passportBackUrl = res.path;
      this.changes.fangImgchange = true;
    },
    beforeAvatarUpload1_2(file) {
      // console.log(file);
      // const isLt2M = file.size / 1024 / 1024 < 0.5;
      // if (!isLt2M) {
      //   Toast("上传图片大小不能超过 500kb!");
      // }
      // return isLt2M;
    },
    // 手持
    handleAvatarSuccess1_3(res, file) {
      this.form.passportHandheldUrl = res.path;
      this.changes.handImgchange = true;
    },
    beforeAvatarUpload1_3(file) {
      // const isLt2M = file.size / 1024 / 1024 < 0.5;
      // if (!isLt2M) {
      //   Toast("上传图片大小不能超过 500kb!");
      // }
      // return isLt2M;
    },
    imgNum() {
      let num = { a: "", b: "", c: "" };
      let num2 = 0;
      num.a = this.form.passportFrontUrl;
      num.b = this.form.passportBackUrl;
      num.c = this.form.passportBackUrl;
      for (var key in num) {
        if (num[key]) {
          num2 += 1;
        }
      }
      return num2;
    },
    // 营业执照
    handleAvatarSuccess2(res, reportFile) {
      this.form.bussinessLicenseUrl = res.path;
      this.changes.ShopImgchange = true;
    },
    beforeAvatarUpload2(file) {
      // const isLt2M = file.size / 1024 / 1024 < 0.5;
      // if (!isLt2M) {
      //   Toast("上传图片大小不能超过 500kb!");
      // }
      // return isLt2M;
    },
    // 打款凭证
    handleAvatarSuccess3(res, file) {
      this.form.transferMoneyUrl = res.path;
      this.changes.moneyImgchange = true;
    },
    beforeAvatarUpload3(file) {
      // const isLt2M = file.size / 1024 / 1024 < 0.5;
      // if (!isLt2M) {
      //   Toast("上传图片大小不能超过 500kb!");
      // }
      // return isLt2M;
    },
    // 重新上传
    imgChange(val, change) {
      // document.getElementById(val).click()
      if (this.changes[change]) {
        this.changes[change] = false;
        (function(val) {
          setTimeout(function() {
            document.getElementById(val).click();
          }, 10);
        })(val);
      } else {
        return;
      }
    },

    goOpa(num) {
      this.postImage = !this.postImage;
    },
    getAddress() {
      this.show = !this.show;
      this.getProvince();
    },
    goCity(i, val) {
      this.activeIndex = i;
      this.provinceName = val.provinceName;
      this.form.provinceId = val.provinceId;
      this.cityName = "";
      this.districtName = "";
      this.villageName = "";
      this.getCity(val.provinceId);
      this.citychange = true;
      // this.active += 1
    },
    goDistrict(i, val) {
      this.activeIndex2 = i;
      this.cityName = val.cityName;
      this.form.cityId = val.cityId;
      this.districtName = "";
      this.villageName = "";
      this.getDistrict(val.cityId);
      this.districtchange = true;
      // const that = this
      // setTimeout(function(){that.active += 1},0)
    },
    govillage(i, val) {
      this.activeIndex3 = i;
      this.districtName = val.districtName;
      this.form.districtId = val.districtId;
      this.villageName = "";
      this.getVillage(val.districtId);
      this.villagechange = true;
      // const that = this
      // setTimeout(function(){that.active += 1},0)
    },
    out(i, val) {
      this.activeIndex4 = i;
      this.villageName = val.villageName;
      this.form.villageId = val.villageId;
      this.show = !this.show;
    }
  },
  computed: {
    subress() {
      let a = "";
      if (!this.provinceName) {
        return a;
      } else if (!this.cityName) {
        return (a = this.provinceName);
      } else if (!this.districtName) {
        return (a = this.provinceName + "-" + this.cityName);
      } else if (!this.villageName) {
        return (a =
          this.provinceName + "-" + this.cityName + "-" + this.districtName);
      } else {
        return (a =
          this.provinceName +
          "-" +
          this.cityName +
          "-" +
          this.districtName +
          "-" +
          this.villageName);
      }
    }
  }
};
</script>
<style scoped lang="less">
.opertor {
  overflow: scroll;
  height: 100%;
  background-color: #f9f9f9;
  input[type="radio"] {
    background-color: red;
  }
  .op_head {
    width: 100%;
    height: 4.7rem;
    color: #fff;
    background-color: #00b28a;
    top: 0;
    z-index: 1001;
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
    .op_h_text {
      flex: 2;
      text-align: center;
    }
  }
  .op_body {
    width: 100%;
    height: 93vh;
    margin-top: 4.7rem;
    overflow: scroll;
    .op_b_header {
      width: 100%;
      font-size: 1.6rem;
      padding: 1.5rem 0rem 1.5rem 1.5rem;
      .op_b_header_left {
        display: inline-block;
        width: 0.3rem;
        height: 1.6rem;
        background-color: #00b28a;
        border-radius: 2rem;
        vertical-align: text-bottom;
        margin-right: 1rem;
      }
    }
    .pt {
      padding-top: 0.5rem !important;
    }
    .op_b_box {
      width: 100%;
      font-size: 1.5rem;
      padding: 1.5rem 0rem 1.5rem 1.5rem;
      margin-bottom: 1rem;
      background-color: #fff;
      display: flex;
      justify-content: flex-start;
      align-items: center;

      .f1 {
        flex: 1.5;
      }
      .f3 {
        flex: 3;
        input {
          width: 94%;
        }
        input::-webkit-input-placeholder {
          /* WebKit browsers */
          color: #ccc;
          text-align: right;
        }

        input:-moz-placeholder {
          /* Mozilla Firefox 4 to 18 */
          color: #ccc;
          text-align: right;
        }

        input::-moz-placeholder {
          /* Mozilla Firefox 19+ */
          color: #ccc;
          text-align: right;
        }

        input:-ms-input-placeholder {
          /* Internet Explorer 10+ */
          color: #ccc;
          text-align: right;
        }
        select {
          width: 60%;
          height: 3.6rem;
          font-size: 1.4rem;
          margin-bottom: 0.5rem;
        }
        .small {
          font-size: 1.2rem;
          margin-top: 2.6rem;
          background-color: #fff;
        }
        .van-radio-group {
          width: 100%;
          display: flex;
          justify-content: flex-end;
          .van-radio {
            display: inline-block;
            margin-right: 2rem;
          }
        }
        .postImg {
          display: flex;
          justify-content: flex-end;
          align-items: center;

          .img {
            width: 3rem;
            height: 2.5rem;
            padding-right: 0.5rem;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
        .p_i_button {
          background-color: #fff;
          height: 100%;
          text-align: right;
          padding-right: 1rem;
          .text1 {
            vertical-align: middle;
            color: #999;
          }
          .text2 {
            vertical-align: middle;
          }
          .i {
            vertical-align: middle;
          }
        }
      }
      .flex {
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }
    }
    .m0 {
      padding-right: 1rem;
      margin-bottom: 0.2rem;
    }
    .gf_pay {
      width: 100%;
      text-align: center;
      padding: 1rem 3rem;
      white-space: normal nowrap;
      background-color: #fff;
      color: #fff;
      button {
        width: 100%;
        height: 4.7rem;
        background-color: #0bb794;
        border-radius: 1rem;
        white-space: normal nowrap;
        font-size: 1.6rem;
      }
    }
    .xi {
      width: 100%;
      color: #b3b6b5;
      font-size: 1.3rem;
      text-align: center;
      .van-checkbox {
        .van-checkbox__icon {
          width: 1rem;
          height: 1rem;
          i {
            width: 1rem;
            height: 1rem;
          }
        }
        .van-checkbox__label {
          color: #b3b6b5;
          font-size: 1.2rem;
        }
      }
    }
  }
  // 地区选择-弹出层css
  .popup_header {
    width: 100%;
    padding: 1rem 0;
    text-align: center;
    font-size: 1.6rem;
    color: #333333;
    position: relative;
    i {
      position: absolute;
      top: 1rem;
      right: 1.5rem;
    }
  }
  .popup_list {
    /deep/ [class*="van-hairline"]::after {
      border: none;
    }
    /deep/.van-tabs__wrap {
      height: 3.4rem;
      padding-left: 1.5rem;
      border-bottom: 0.1rem solid #f2f2f2;
      .van-tab {
        -webkit-box-flex: none;
        -webkit-flex: none;
        flex: none;
        font-size: 1.5rem;
        margin-right: 1rem;
      }
      .van-tabs__line {
        height: 0.1rem;
        width: 30px;
        padding: 0;
        background-color: #00ae87;
      }
    }

    /deep/.van-tabs__content {
      height: 30rem;
      padding-left: 1.6rem;
      overflow: scroll;
      .p_p_header {
        font-size: 1.3rem;
        margin: 1.6rem 0rem;
      }
      .p_p_list {
        font-size: 1.5rem;
        margin-bottom: 2.4rem;
        color: #333333;
        position: relative;
        img {
          width: 5%;
          position: absolute;
          right: 3rem;
        }
      }
      .p_p_active {
        color: #00ae87;
      }
    }
  }

  // 上传图片-弹出层css
  .opertorImg {
    overflow: scroll;
    height: 100%;
    background-color: #f9f9f9;
    z-index: 9999;
    .o_op_head {
      width: 100%;
      height: 4.7rem;
      color: #fff;
      background-color: #00b28a;
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
        .o_nu_h_go {
          margin-left: 1rem;
          font-size: 2rem;
          display: inline-block;
          vertical-align: middle;
        }
      }
      .o_op_h_text {
        flex: 2;
        text-align: center;
      }
    }
    .o_op_bpody {
      width: 100%;
      height: 100%;
      margin-top: 4.7rem;
      overflow: scroll;
      position: relative;
      padding-bottom: 7.4rem;

      .o_op_b_header {
        width: 100%;
        font-size: 1.6rem;
        padding: 1.5rem 0rem 1.5rem 1.5rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding-right: 1rem;
        .o_op_b_header_left {
          display: inline-block;
          width: 0.3rem;
          height: 1.6rem;
          background-color: #00b28a;
          border-radius: 2rem;
          vertical-align: text-bottom;
          margin-right: 1rem;
        }
        .o_op_b_header_center {
          flex: 1;
        }
        .o_op_b_header_right {
          color: #00b28a;
          font-size: 1.2rem;
        }
      }
      .o_touxiang {
        overflow: hidden;
        border: 1px dashed #ddd;
        border-radius: 6px;
        margin: 5px;
        font-size: 12px;
        margin: 0 3rem;
        height: 18rem;
        .o_avatar-uploader {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 17rem;
          .o_avatar {
            width: 90%;
            height: auto;
          }
        }
        .o_tuxiang {
          width: 5rem;
          height: 6rem;
        }
        .o_moren {
          width: 100rem;
          padding: 10%;
        }
        /* } */
      }
      .o_imgfooter {
        position: absolute;
        bottom: 0.5rem;
        width: 100%;
        height: 4.4rem;
        padding: 0 4.6rem;
        color: #fff;
        font-size: 1.5rem;
        button {
          width: 100%;
          height: 100%;
          border-radius: 0.5rem;
          background-color: #00b28a;
        }
      }
    }
    .o_h91vh {
      height: 91.5vh;
    }
  }
}
</style>