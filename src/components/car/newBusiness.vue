<!-- 商家入驻 -->
<template>
  <div class="newBusiness">
    <div class="op_head" v-show="postImage">
      <div>
        <van-icon name="arrow-left" @click="$router.go(-1)" class="nu_h_go"/>
      </div>
      <div class="op_h_text">商家入驻信息填写</div>
      <div></div>
    </div>

    <div class="op_body" v-show="postImage">
      <div class="op_body2">
        <div class="op_b_box">
          <div class>店铺头像</div>
          <div class="f3">
            <div class="postImg" @click="goImg('头像')">
              <div class="img">
                <img :src="form.shopImgUrl" v-if="form.shopImgUrl" alt>
              </div>
              <div class="p_i_button">
                <van-icon name="arrow" class="i"/>
              </div>
            </div>
          </div>
        </div>

        <div class="op_b_box">
          <div class="f1">店铺名称</div>
          <div class="f3">
            <input type="text" placeholder="填写店铺名称" v-model="form.shopName">
          </div>
        </div>

        <div class="op_b_box m0">
          <div class="f1">店铺分类</div>
          <div class="f3">
            <div class="p_i_button" @click="getClass">
              <span class="text1" v-if="!addClass">选择分类</span>
              <span class="text2" v-if="addClass">{{addClass}}</span>
              <van-icon name="arrow" class="i"/>
            </div>
          </div>
        </div>

        <div class="op_b_box">
          <div class="f3">
            <input type="text" placeholder="输入详细地址" v-model="form.addressDetail">
          </div>
        </div>

        <div class="op_b_box">
          <div class="f1">店铺性质</div>
          <div class="f3">
            <van-radio-group v-model="form.shopNature">
              <van-radio :name="1" checked-color="#0bb794">个人</van-radio>
              <van-radio :name="2" checked-color="#0bb794">企业</van-radio>
            </van-radio-group>
          </div>
        </div>

        <span v-show="form.shopNature == 2" class="qwe">
          <div class="op_b_box">
            <div class="f1">公司名称</div>
            <div class="f3">
              <input type="text" placeholder="请填写公司名称" v-model="form.companyName">
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
        </span>

        <div class="op_b_box">
          <div class="f1">联系人姓名</div>
          <div class="f3">
            <input type="text" placeholder="请填写姓名" v-model="form.contactName">
          </div>
        </div>

        <div class="op_b_box">
          <div class="f1">联系电话</div>
          <div class="f3">
            <input type="text" placeholder="请填写联系电话" v-model="form.contactPhone">
          </div>
        </div>

        <div class="op_b_box m0">
          <div class="f1">入驻地区</div>
          <div>
            <div class="p_i_button" @click="getAddress">
              <span class="text1" v-if="!subress">选择地区</span>
              <span class="text2" v-if="subress">{{subress}}</span>
              <van-icon name="arrow" class="i"/>
            </div>
          </div>
        </div>
        

        <div class="gf_pay">
          <button @click="postNew">提交</button>
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
        <!-- 地区选择-弹出层结束-->

        <!-- 商品分类选择-弹出层开始-->
        <van-popup v-model="classShow" position="bottom" :overlay="true">
          <div class="class_header">
            <strong>选择分类</strong>
            <van-icon name="cross" @click="classShow =!classShow"/>
          </div>
          <div class="class_list">
            <van-tabs v-model="classActive">
              <van-tab title="一级分类">
                <div>
                  <div class="p_p_list">
                    <div class="list_body">
                      <div v-for="(item,index) in classOneList" :key="index">
                        <span
                          :class="{l_active:activeOne == index}"
                          @click="goTwo(index,item)"
                        >{{item.classifyName}}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </van-tab>

              <van-tab title="二级分类">
                <div>
                  <div class="p_p_list">
                    <div class="list_body">
                      <div v-for="(item,index) in classTwoList" :key="index">
                        <span
                          :class="{l_active:activeTwo == index}"
                          @click="goThree(index,item)"
                        >{{item.classifyName}}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </van-tab>

              <van-tab title="三级分类">
                <div>
                  <div class="p_p_list">
                    <div class="list_body" v-for="(item,index) in classThreeList" :key="index">
                      <div v-for="(item2,index2) in item" :key="index2">
                        <span
                          :class="{l_active:activeThree == item2.id}"
                          @click="classOut(index2,item2)"
                        >{{item2.classifyName}}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </van-tab>
            </van-tabs>
          </div>
        </van-popup>
        <!-- 商品分类选择-弹出层结束-->
      </div>
    </div>

    <!-- 上传图片-弹出层开始-->
    <div class="opertorImg" v-if="!postImage">
      <div class="o_op_head">
        <div>
          <van-icon name="arrow-left" @click="postImage=!postImage" class="o_nu_h_go"/>
        </div>
        <div class="o_op_h_text">上传照片</div>
        <div></div>
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

      <div class="o_op_bpody o_h91vh" v-if="name == '头像'">
        <div class="o_op_b_header">
          <div class="o_op_b_header_left"></div>
          <div class="o_op_b_header_center">请上传头像图片</div>
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
            <img v-if="form.shopImgUrl" :src="form.shopImgUrl" class="o_avatar" id="img5">
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
import { Toast } from "mint-ui";
import { localName } from "@/common/local.js";

export default {
  created() {
    // this.getProvince()
    // 修改入驻信息
    if (this.$route.query.type == 3) {
     this.editInfo()
    }
  },
  data() {
    return {
      form: {
        shopName: "", //店铺名称
        firstClassifyId: -1, //1级id
        secondClassifyId: -1, //2级id
        thirdClassifyId: -1, //3级id
        firstClassifyName: "", //1级名称
        secondClassifyName: "", //2级名称
        thirdClassifyName: "", //3级名称
        shopNature: 1, //个人还是企业
        contactName: "", //联系人
        contactPhone: "", //联系电话
        provinceId: -1, //省id
        cityId: -1, //市id
        districtId: -1, //区id
        addressDetail: "", //详细
        companyName:"",//公司名称
        bussinessLicenseUrl: "", //营业执照路径
        shopImgUrl: "", //头像路径
        agencyId: 0 //代理id
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
      // 地区-弹窗
      show: false,
      active: 0,
      // 地区-接口数据
      provinceList: [],
      cityList: [],
      districtLite: [],
      villageLite: [],
      // 地区-tab文字变化
      provinceName: "",
      cityName: "",
      districtName: "",
      villageName: "",
      // 地区-样式变化
      activeIndex: -1,
      activeIndex2: -1,
      activeIndex3: -1,
      activeIndex4: -1,
      // 地区-控制显示与隐藏
      citychange: false,
      districtchange: false,
      villagechange: false,

      //分类-弹窗
      classShow: false,
      classActive: 0,

      // 分类-接口数据
      classOneList: [],
      classTwoList: [],
      classThreeList: [],
      // 分类-样式变化
      activeOne: -1,
      activeTwo: -1,
      activeThree: -1
    };
  },
  watch: {
    form() {}
  },
  methods: {
    // 修改入驻信息
    editInfo() {
       this.$api.get(this.HOME + this.USER + 'inside/shop/getByUserId')
      .then(res => {
        if (res.data.status == 200) {
          const info = res.data.data
          this.form.shopName = info.shopName
          this.form.firstClassifyId = info.firstClassifyId
          this.form.secondClassifyId = info.secondClassifyId
          this.form.thirdClassifyId = info.thirdClassifyId
          this.form.firstClassifyName = info.firstClassifyName
          this.form.secondClassifyName = info.secondClassifyName
          this.form.thirdClassifyName = info.thirdClassifyName
          this.form.shopNature = info.shopNature
          this.form.contactName = info.contactName
          this.form.contactPhone = info.contactPhone
          this.form.provinceId = info.provinceId
          this.form.cityId = info.cityId
          this.form.districtId = info.districtId
          this.form.addressDetail = info.addressDetail
          this.form.bussinessLicenseUrl = info.bussinessLicenseUrl
          this.form.shopImgUrl = info.shopImgUrl
          this.form.agencyId = info.agencyId
          this.shopId = info.shopId
          localName(this.form.provinceId, this.form.cityId, this.form.districtId)
            .then(res => {
              this.provinceName = res.provinceName;
              this.cityName = res.cityName;
              this.districtName = res.districtName;
            })
        }
      })
    },
    // 获取省份
    getProvince() {
      this.$api.get(this.LOCAL + "/api/getProvinceList").then(res => {
        // console.log(res);
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
      this.villageLite = [];
      this.$http.get(this.LOCAL + "/api/getVillage/" + id).then(res => {
        if (res.status == 200) {
          this.villageLite = res.data;
          this.active += 1;
        } else {
          alert(res.data.msg);
        }
      });
    },
    // 获取一级分类
    getOne() {
      this.$api
        .post(this.HOME + this.SEARCH + "commodityClassify/oneClassifyLevel")
        .then(res => {
          if (res.status === 200) {
            this.classOneList = res.data.data;
          } else {
            alert("获取一级分类失败");
          }
        });
    },
    // 获取二级分类
    getTwoOrThree(id) {
      this.classTwoList = [];
      this.classThreeList = [];
      let ids = id;
      this.$api
        .post(
          this.HOME +
            this.SEARCH +
            "commodityClassify/findByPreClassifyId?prcClassifyId=" +
            id
        )
        .then(res => {
          // console.log(res);
          if (res.status === 200) {
            this.classTwoList = res.data.data;
            res.data.data.forEach(item => {
              if (item.child.length) {
                this.classThreeList.push(item.child);
              }
            });
          } else {
            alert("获取二三级分类失败");
          }
        })
        .catch(error => {
          // console.log(error);
        });
    },
    // 提交
    postForm() {
      let url = ''
      if (this.$route.query.type == 3) {
        this.form.shopId = this.shopId
        url = 'inside/shop/update'
      } else {
        url = 'inside/shop/insertShop'
      }
      this.$api
        .post(this.HOME + this.USER + url, this.form)
        .then(res => {
          if (res.data.status == 200) {
            Toast("申请已提交");
            this.$router.replace({
              path: "/user"
            });
          } else {
            Toast(res.data.msg);;
          }
        })
        .catch(error => {
          // console.log(error);
        });
    },
    onSubmit() {
      // console.log("submit!");
    },

    delimg(i) {
      // console.log(i);
    },
    // 上传图片
    goImg(val) {
      this.name = val;
      this.postImage = !this.postImage;
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
    // 头像
    handleAvatarSuccess3(res, file) {
      this.form.shopImgUrl = res.path;
      this.changes.moneyImgchange = true;
    },
    beforeAvatarUpload3(file) {
      // const isLt2M = file.size / 1024 / 1024 < 0.5;
      // if (!isLt2M) {
      //   Toast("上传图片大小不能超过 500kb!");
      // }
      // return isLt2M;
    },
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
    // 地址-打开弹窗
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
    },
    // 商品分类打开弹窗
    getClass() {
      this.getOne();
      this.classShow = !this.classShow;
    },
    goTwo(i, val) {
      this.activeOne = i;
      this.form.firstClassifyName = val.classifyName;
      this.form.firstClassifyId = val.id;
      this.getTwoOrThree(val.id);
      this.classActive = 1;
    },
    goThree(i, val) {
      this.activeTwo = i;
      this.form.secondClassifyName = val.classifyName;
      this.form.secondClassifyId = val.id;
      this.classActive = 2;
    },
    classOut(i, val) {
      this.activeThree = val.id;
      this.form.thirdClassifyName = val.classifyName;
      this.form.thirdClassifyId = val.id;
      this.classShow = !this.classShow;
    },
    postNew() {
      if (!this.form.shopName && !this.form.contactName) {
        Toast("请输入店铺名称或姓名");
        return;
      } else if (!/^([0-9]|[a-zA-Z]){6,16}$/.test(this.form.contactPhone)) {
        Toast("请输入正确手机号码");
        return;
      } else if (
        this.form.firstClassifyId === -1 ||
        this.form.secondClassifyId === -1 ||
        this.form.thirdClassifyId === -1
      ) {
        Toast("请选择商品分类");
        return;
      } else if (
        this.form.provinceId === -1 ||
        this.form.cityId === -1 ||
        this.form.districtId === -1
      ) {
        Toast("请选择地区");
        return;
      }
      if (this.shopNature == 2) {
        if (!this.form.companyName) {
          Toast("请输入店铺名称、姓名、公司名称");
          return;
        } else if (!this.form.bussinessLicenseUrl) {
          Toast("请上传营业执照");
          return;
        }
      }
      this.postForm();
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
    },
    addClass() {
      let a = "";
      if (!this.form.firstClassifyName) {
        return a;
      } else if (!this.form.secondClassifyName) {
        return (a = this.form.firstClassifyName);
      } else if (!this.form.thirdClassifyName) {
        return (a =
          this.form.firstClassifyName + "-" + this.form.secondClassifyName);
      } else {
        return (a =
          this.form.firstClassifyName +
          "-" +
          this.form.secondClassifyName +
          "-" +
          this.form.thirdClassifyName);
      }
    }
  }
};
</script>
<style scoped lang="less">
.qwe {
  transition: all 2s;
}
.newBusiness {
  overflow: scroll;
  height: 100%;
  background-color: #f2f2f2;
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
    .pt {
      padding-top: 0.5rem !important;
    }
    .op_b_box {
      width: 100%;
      font-size: 1.5rem;
      padding: 1.5rem 0rem 1.5rem 1.5rem;
      margin-bottom: 0.1rem;
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
      margin-bottom: 0.2rem;
    }
    .gf_pay {
      position: fixed;
      bottom: 1rem;
      width: 100%;
      text-align: center;
      padding: 1rem 3rem;
      white-space: normal nowrap;
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
      height: 40rem;
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
  // 选分类
  .class_header {
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
  .class_list {
    /deep/.van-tabs__line {
      width: 100%;
      background-color: #00ae87;
    }
    /deep/.van-tabs__content {
      height: 40rem;
    }
    .p_p_list {
      margin: 1.5rem 0 2.4rem 0;
      padding-left: 1.5rem;
      color: #333333;
      .list_body {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
        div {
          width: 33.333%;
          height: 3rem;
          line-height: 3rem;
          text-align: center;
          margin-bottom: 1rem;
          overflow: hidden;
          padding: 0 1rem;
          span {
            display: inline-block;
            width: 100%;
            height: 100%;
            border-radius: 1.5rem;
            border: solid 0.1rem #f2f2f2;
          }
          .l_active {
            background-color: #e2fff8;
            border-color: #00ae87;
            color: #00ae87;
          }
        }
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