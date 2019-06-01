<template lang="html">
  <div class="newUser">
    <div class="nu_head">
      <div><van-icon name="arrow-left"  @click="$router.go(-1)" class="nu_h_go"/></div>
      <div class="nu_h_text">用户注册</div>
      <div></div>
    </div>

    <div class="nu_body">
      <div class="nu_b_img">
        <img src="../../../img/index/car/助力乡村LOGO@2x.png" alt="">
      </div>
      <div class="nu_b_form">
        <div>
          <img src="../../../img/index/car/手机@2x.png" alt="">
          <input type="text" placeholder="请输入手机号码">
        </div>
        <div class="nu_b_f_code">
          <img src="../../../img/index/car/验证@2x.png" alt="">
          <input type="text" placeholder="请输入手机短信验证码">
          <van-button
            plain
            type="primary"
            size="small"
            v-if="!showBtn"
            @click="getCode">
          获取验证码
          </van-button>
          <van-button  plain disabled  type="primary" size="small" v-if="showBtn">{{count}}S后获取</van-button>  
        </div>
        <div>
          <img src="../../../img/index/car/密码锁@2x.png" alt="">
          <input type="password" placeholder="请输入6位以上的密码">
        </div>
        <div>
          <img src="../../../img/index/car/推荐(1)@2x.png" alt="">
          <input type="text" placeholder="请输入推荐码(选填)">
        </div>
        <div class="nu_b_f_city">
          <select name="请选择省份" id="">
            <option value="广东省">省份</option>
            <option value="广东省">广东省</option>
            <option value="广东省">广东省</option>
          </select>
          <select name="请选择城市" id="" class="select">
            <option value="广州市">城市</option>
            <option value="广州市">广州市</option>
            <option value="广州市">广州市</option>
          </select>
          <select name="请选择地区" id="">
            <option value="白云区">地区</option>
            <option value="白云区">白云区</option>
            <option value="白云区">白云区</option>
          </select>
        </div>
        <div class="nu_b_f_protocol">
          <input type="checkbox" class="nu_b_f_p_checkbox">
          <span>已阅读并同意以下协议</span>
          <a href="">《助力乡村注册协议》</a>
          <a href="">《助力乡村法律声明协议》</a>
          <a href="">《助力乡村隐私协议》</a>
        </div>
      </div>
    </div>

    <div class="gf_pay">
      注册
    </div>
  </div>  
  
</template>

<script>
export default {
  components:{
    
  },
  data () {
   return {
     showBtn:false,
     count:0,
     time:null
   }
  },
  methods:{
    getCode () {
      const TIME_COUNT = 45;
    if (!this.timer) {
       this.count = TIME_COUNT;
       this.showBtn = true;
       this.timer = setInterval(() => {
       if (this.count > 0 && this.count <= TIME_COUNT) {
         this.count--;
        } else {
         this.showBtn = false;
         clearInterval(this.timer);
         this.timer = null;
        }
       }, 1000)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.newUser{
  width: 100%;
  height: 90vh;
  .nu_head {
    width: 100%;
    height: 4.7rem;
    background-color:#00b28a;
    color:#fff;
    top:0;
    z-index: 1000;
    line-height:4.7rem;
    font-size:1.6rem;
    display: flex;
    position:fixed;
    top:0;
    // justify-content: center;
    // align-items: center;
    div{
      flex:1;
      .nu_h_go{
        margin-left:1rem;
        font-size:2rem;
        display: inline-block;
        vertical-align:middle;
      }
    }
    .nu_h_text{
      text-align:center;
    }
  }
  .nu_body{
    width: 100%;
    margin-top:4.7rem;
    .nu_b_img{
    display:flex;
    justify-content: center;
    text-align:center;
      img{
        display: inline-block;
        width: 17rem;
        height:7rem;
        margin:5rem 0rem;
      }
    }
    .nu_b_form{
      width: 100%;
      padding:0rem 6rem 0rem 4rem;
      display:flex;
      flex-direction:column;
      justify-content: center;
      div{
        width: 100%;
        padding-bottom:1rem;
        border-bottom:1px solid #aaaaaa;
        margin-top:1rem;
         img{
           display: inline-block;
           width: 1.5rem;
           height:2rem;
           margin-right:0.5rem;
           vertical-align:text-bottom;
         }
         input{
           font-family: "思源黑体 CN";
           font-size:1.3rem;
           color:#7e7c7c;
         }
      }
      .nu_b_f_code{
        display:flex;
        padding-bottom:0.5rem;
        img{
           display: inline-block;
           width: 1.5rem;
           height:2.3rem;
           margin-right:0.5rem;
           vertical-align:text-bottom;
         }
        .van-button{
           background-color: #fff;
           border:0.1rem solid #00b28a;
           color:#00b28a;
           border-radius: 2rem;
           font-size:1.2rem;
         }
      }
      .nu_b_f_city{
        border:none;
        display:flex;
        justify-content: center;
        
        select{
          display: inline-block;
          padding-right:1rem;
          option{
            font-size:1.2rem;
          }
        }
        .select{
          margin: 0rem 6%;
        }
      }
      .nu_b_f_protocol{
        border:none;
        margin-bottom:4rem;
        .nu_b_f_p_checkbox[type="checkbox"]{
          width: 1.4rem;
          height: 1.4rem;
          margin:0;
          vertical-align:text-bottom;
        }
        .nu_b_f_p_checkbox[type="checkbox"]:after{
            width: 100%;
            height: 100%;
            content: " ";
            background-image:url("../../../img/index/car/未勾选状态.png");
            background-size:contain;
          }
        .nu_b_f_p_checkbox[type="checkbox"]:checked:after{
          content: " ";
          background-image:url("../../../img/index/car/勾选状态.png");
          background-size:contain;
        }
        span{
          font-size:1.2rem;
        }
        a{
          font-size:1.2rem;
          color:green;
        }
      }
    }
    
  }
  .gf_pay{
    margin:0rem 6rem 0rem 4rem;
    text-align: center;
    background-color: #0bb794;
    padding:1rem 0rem;
    border-radius: 20rem;
    color:#fff;
  }
}
  
</style>