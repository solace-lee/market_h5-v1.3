<!-- 运营商入驻-身份证上传 -->
<template>
  <div class="opertorImg">
    <div class="o_op_head">
      <div>
        <van-icon name="arrow-left" @click="$router.go(-1)" class="nu_h_go"/>
      </div>
      <div class="o_op_h_text">上传证件照</div>
      <div></div>
    </div>
    <div class="o_op_bpody" v-if="name == '法人身份证'">
      <div class="o_op_b_header">
        <div class="o_op_b_header_left"></div>
        <div class="o_op_b_header_center">请上传法人身份证图片</div>
        <div class="o_op_b_header_right" @click="imgChange('img1','zhengImgchange')">重新上传</div>
      </div>
      <div class="o_touxiang">
        <el-upload
          class="o_avatar-uploader"
          :action="actionurl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess1_1"
          :before-upload="beforeAvatarUpload1_1"
          accept=".jpg, .jpeg, .png, .gif, .pdf, .doc, .docx, .xls, .xlsx, .JPG, .JPEG, .PBG, .GIF, .PDF, .DOC, .DOCX, .XLS, .XLSX"
          :disabled="changes.zhengImgchange"
        >
          <img v-if="form.zhengImg" :src="form.zhengImg" class="o_avatar" id="img1">
          <img class="moren" src="../../../img/index/car/takePhoto.png" v-else>
        </el-upload>
      </div>
      <div class="o_op_b_header">
        <div class="o_op_b_header_left"></div>
        <div class="o_op_b_header_center">请上传法人身份证反面面图片</div>
        <div class="o_op_b_header_right" @click="imgChange('img2','fangImgchange')">重新上传</div>
      </div>
      <div class="o_touxiang">
        <el-upload
          class="o_avatar-uploader"
          :action="actionurl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess1_2"
          :before-upload="beforeAvatarUpload1_2"
          :disabled="changes.fangImgchange"
        >
          <img v-if="form.fangImg" :src="form.fangImg" class="o_avatar" id="img2">
          <img class="o_moren" src="../../../img/index/car/takePhoto.png" v-else>
        </el-upload>
      </div>
      <div class="o_op_b_header">
        <div class="o_op_b_header_left"></div>
        <div class="o_op_b_header_center">请上传法人身份证手持图片</div>
        <div class="o_op_b_header_right" @click="imgChange('img3','handImgchange')">重新上传</div>
      </div>
      <div class="o_touxiang">
        <el-upload
          class="o_avatar-uploader"
          :action="actionurl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess1_3"
          :before-upload="beforeAvatarUpload1_3"
          accept=".jpg, .jpeg, .png, .gif, .pdf, .doc, .docx, .xls, .xlsx, .JPG, .JPEG, .PBG, .GIF, .PDF, .DOC, .DOCX, .XLS, .XLSX"
          :disabled="changes.handImgchange"
        >
          <img v-if="form.handImg" :src="form.handImg" class="o_avatar" id="img3">
          <img class="o_moren" src="../../../img/index/car/takePhoto.png" v-else>
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
          :show-file-list="false"
          :on-success="handleAvatarSuccess2"
          :before-upload="beforeAvatarUpload2"
          accept=".jpg, .jpeg, .png, .gif, .pdf, .doc, .docx, .xls, .xlsx, .JPG, .JPEG, .PBG, .GIF, .PDF, .DOC, .DOCX, .XLS, .XLSX"
          :disabled="changes.ShopImgchange"
        >
          <img v-if="ShopImg" :src="ShopImg" class="o_avatar" id="img4">
          <img class="o_moren" src="../../../img/index/car/takePhoto.png" v-else>
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
          :show-file-list="false"
          :on-success="handleAvatarSuccess3"
          :before-upload="beforeAvatarUpload3"
          accept=".jpg, .jpeg, .png, .gif, .pdf, .doc, .docx, .xls, .xlsx, .JPG, .JPEG, .PBG, .GIF, .PDF, .DOC, .DOCX, .XLS, .XLSX"
          :disabled="changes.moneyImgchange"
        >
          <img v-if="moneyImg" :src="moneyImg" class="o_avatar" id="img5">
          <img class="o_moren" src="../../../img/index/car/takePhoto.png" v-else>
        </el-upload>
      </div>
      <div class="o_imgfooter">
        <button @click="goOpa(3)">提交</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '营业执照',
      actionurl: this.$uploadurl,
      changes: {
        zhengImgchange: false,
        fangImgchange: false,
        handImgchange: false,
        ShopImgchange: false,
        moneyImgchange: false
      },
      form: {
        zhengImg: "",
        fangImg: "",
        handImg: "",
      },
      ShopImg: "",
      moneyImg: ""
    };
  },
  methods: {
    handleAvatarSuccess1_1(res, file) {
      console.log(res);
      this.form.zhengImg = res.Data.url;
      this.changes.zhengImgchange = true;
    },
    beforeAvatarUpload1_1(file) {
      // console.log(file);
      // const isLt2M = file.size / 1024 / 1024 < 0.5;
      // if (!isLt2M) {
      //   Toast("上传图片大小不能超过 500kb!");
      // }
      // return isLt2M;
    },
    // 反面
    handleAvatarSuccess1_2(res, file) {
      // console.log(res);
      this.form.fangImg = res.Data.url;
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
      console.log(res);
      this.form.handImg = res.Data.url;
      this.changes.handImgchange = true;
    },
    beforeAvatarUpload1_3(file) {
      // console.log(file);
      // const isLt2M = file.size / 1024 / 1024 < 0.5;
      // if (!isLt2M) {
      //   Toast("上传图片大小不能超过 500kb!");
      // }
      // return isLt2M;
    },
    // 营业执照
    handleAvatarSuccess2(res, file) {
      // console.log(res);
      this.ShopImg = res.Data.url;
      this.changes.ShopImgchange = true;
    },
    beforeAvatarUpload2(file) {
      // console.log(file);
      // const isLt2M = file.size / 1024 / 1024 < 0.5;
      // if (!isLt2M) {
      //   Toast("上传图片大小不能超过 500kb!");
      // }
      // return isLt2M;
    },
    // 打款凭证
    handleAvatarSuccess3(res, file) {
      console.log(res);
      this.moneyImg = res.Data.url;
      this.changes.moneyImgchange = true;
    },
    beforeAvatarUpload3(file) {
      // console.log(file);
      // const isLt2M = file.size / 1024 / 1024 < 0.5;
      // if (!isLt2M) {
      //   Toast("上传图片大小不能超过 500kb!");
      // }
      // return isLt2M;
    },
    imgChange(val, change) {
      // document.getElementById(val).click()
      if(this.changes[change]){
        this.changes[change] = false;
        (function(val) {
          setTimeout(function() {
            document.getElementById(val).click();
          }, 10);
        })(val);
      } else {
        return 
      }
    },
    goOpa (num) {
      if(num == 1){
        this.$store.commit('getformimg',this.form)
        this.$router.push({
          path:'/operator'
        })
      } else if(num == 2){
        this.$store.commit('getshopimg',this.ShopImg)
        this.$router.push({
          path:'/operator'
        })
      } else {
        this.$store.commit('getmoneyimg',this.moneyImg)
        this.$router.push({
          path:'/operator'
        })
      }
    }
  }
};
</script>
<style scoped lang="less">
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
        height: 100%;
        .o_avatar {
          width: 100%;
          height: 100%;
        }
      }
      .o_tuxiang {
        width: 5rem;
        height: 6rem;
      }
      .moren {
        width: 90%;
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
  .o_h91vh{
    height:91.5vh
  }
}
</style>