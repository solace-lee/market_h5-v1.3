<template lang="html">

  <div class="nothing">
    <!-- <v-gologin></v-gologin> -->

    <div class="nothing-img">
      <img src="../../../img/index/car/noting.png" alt="">
    </div>
      <p class="noting-text">购物车是空的</p>
      <div>
        <router-link :to="{ name: '首页', params: {} }" class="nothing-toshop">在去逛逛</router-link>
      </div>
  </div>


</template>

<script>
import Gologin from '@/components/car/gologin.vue'
export default {
  components: {
    'v-gologin': Gologin
  }
}
</script>

<style lang="less" scoped>
  .nothing {
    width: 100%;
    height: 28rem;
    text-align: center;
    background-color: #fff;
    .nothing-img {
      width: 14rem;
      width: 14rem;
      display:inline-block;
      text-align: center;
      background-color:#fff;
      margin:4rem 0rem 2rem 0rem;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .noting-text{
      margin-bottom:1rem;
      color:#ccc
    }
    .nothing-toshop{
        width: 100%;
        background-color: #00ae87;
        padding:0.4rem 1rem;
        border-radius: 20rem;
        color:#fff;
        margin:2rem 0rem 1rem 0rem;
    }
  }
</style>
