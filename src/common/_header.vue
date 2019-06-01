<template>
  <div class="head">
    <div class="site">
      <div  @click="$router.go(-1)" v-if="show"><!--&&name!='分类专区'-->
        <van-icon name="arrow-left" />
      </div>
    </div>
    <div class="title">
     <span v-text='title'></span>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      // 商品id
      commodity_id: "",
      title: "助力乡村",
      show: true,
      outShow: [
        "商品分类",
        "个人中心",
      ]
    };
  },
  props: {
    // title: {
    //   type: String,
    //   default: "助力乡村"
    // }
  },
  created() {
    this.getName();
  },
  methods: {
    changeShow() {
      const arr = this.outShow
      arr.forEach(element => {
        if (element == this.title) {
          this.show = false
        }
      });
    },

    getName() {
      if (this.title=="创业基金"){
        this.title=this.$route.query.name=null;
      }else{
        this.title = this.$route.query.name;        
      }
      this.commodity_id = this.$route.query.id;
      this.changeShow()
    },
    goIndex() {
      sessionStorage.setItem("active", 0);
      this.$router.push({ path: "/" });
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/fz.less";
@import "../assets/index/style.css";
.msg {
  position: absolute;
  top: 0;
  right: 0.5rem;
  width: 2rem;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 1.2rem;
  }
}
.head {
  width: 100%;
  height: 4.7rem;
  background-color: #ffffff;
  display: flex;
  position: fixed;
  z-index: 10;
  .site {
    width: 4.7rem;
    height: 100%;
    display: flex;
    position: absolute;
    color: #000;
    i{
      margin-left: 1rem;
      // margin-top: .8rem;
    }
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
    height: 4.7rem;
    width: 100%;
    background-color:#00B28A;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    span {
      color: #333333;
      margin-top: .5rem;
      margin-right: 0.5rem;
      font-size: 18px;
    }
  }
}
</style>



