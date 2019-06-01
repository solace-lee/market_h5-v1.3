<template>
  <!-- gotoRouter:点击后路由跳转到与id名相同的route.name所对应的路径 -->
  <footer class="footer">
    <van-tabbar v-model="active">
      <van-tabbar-item icon="shop">
        <span>首&nbsp;页</span>
        <template slot="icon" slot-scope="props">
          <img src="../../img/index/foot/tab_home_nor.png" v-if="!props.active">
          <img src="../../img/index/foot/tab_home_p.png" alt="/" v-if="props.active">
        </template>
      </van-tabbar-item>
      <van-tabbar-item icon="shop">
        <span>分&nbsp;类</span>
        <template slot="icon" slot-scope="props">
          <img src="../../img/index/foot/tab_classify_nor.png" v-if="!props.active">
          <img src="../../img/index/foot/tab_classify_p.png" alt="/" v-if="props.active">
        </template>
      </van-tabbar-item>
      <van-tabbar-item v-if="num == 0">
        <span>购物车</span>
        <template slot="icon" slot-scope="props">
          <img src="../../img/index/foot/tab_shopping_nor.png" v-if="!props.active">
          <img src="../../img/index/foot/tab_shopping_p.png" alt="/" v-if="props.active">
        </template>
      </van-tabbar-item>
      <van-tabbar-item :info="num" v-if="num != 0">
        <span>购物车</span>
        <template slot="icon" slot-scope="props">
          <img src="../../img/index/foot/tab_shopping_nor.png" v-if="!props.active">
          <img src="../../img/index/foot/tab_shopping_p.png" alt="/" v-if="props.active">
        </template>
      </van-tabbar-item>
      <van-tabbar-item icon="shop">
        <span>我&nbsp;的</span>
        <template slot="icon" slot-scope="props">
          <img src="../../img/index/foot/tab_my_nor.png" v-if="!props.active">
          <img src="../../img/index/foot/tab_my_p.png" alt="/" v-if="props.active">
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </footer>
</template>

<script>
export default {
  props: {
    foot: Number,
    refresh:false
  },
  data() {
    return {
      active: 0,
      num: 0
    };
  },
  watch: {
    active() {
      // console.log(this.active+'active');
      if (this.active == 0) {
        this.$router.replace({ path: "/" });
        sessionStorage.setItem("active", this.active);
      }
      if (this.active == 1) {
        this.$router.replace({ path: "/category?name=商品分类" });
        sessionStorage.setItem("active", this.active);
      }
      if (this.active == 2) {
        // 购物车
        this.$router.replace({ path: "/car?name=购物车" });
        sessionStorage.setItem("active", this.active);
      }
      if (this.active == 3) {
        this.$router.replace({ path: "/user" });
        sessionStorage.setItem("active", this.active);
      }
    },
    refresh () {
      this.getCarNum()
    }
  },
  created() {
    // this.active=0
    this.getCarNum();
  },
  beforeDestroy() {
    sessionStorage.setItem('canback', 2)
  },
  mounted() {
    sessionStorage.setItem('canback', 1)
    this.active = sessionStorage.active
      ? JSON.parse(sessionStorage.getItem("active"))
      : 0;
    this.active = this.foot;
  },
  methods: {
    getCarNum() {
      let token = window.localStorage.getItem("token") || false;
      if (token) {
        this.$api
          .get(this.HOME + this.ORDER + "inside/cart/getCartCount")
          .then(res => {
            // console.log(res);
            if (res.data.status == 200) {
              this.num = res.data.data;
            }
          });
      } else {
        return;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.footer {
  height: 5rem;
}

.van-tabbar-item--active {
  color: #00ae87;
  // font-weight: 600;
}
.van-tabbar-item__text span {
  font-size: 1rem;
  line-height: 1rem;
}
.van-tabbar-item__icon {
  margin: 0;
}
.van-tabbar-item__icon img {
  height: 2rem;
  width: 2rem;
  margin-bottom: 0.1rem;
}
</style>