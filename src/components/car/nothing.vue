<template>
  <div class="nothing">
    <!-- <v-gologin></v-gologin> -->
    <div class="nothing-img">
      <img src="../../../img/index/car/noting.png" alt="">
    </div>
      <p class="noting-text">购物车是空的~</p>
      <div class="nothing-toshop">
        <router-link :to="{ name: '首页', params: {} }" class="nothing-toshop2" ><strong>再去逛逛</strong></router-link>
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
    margin-top:4.7rem;
    width: 100%;
    height: 100%;
    text-align: center;
    background-color: #fff;
    .nothing-img {
      width: 11rem;
      display:inline-block;
      text-align: center;
      background-color:#fff;
      margin:5rem 0rem 3rem 0rem;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .noting-text{
      font-size:1.6rem;
      color:#aaabab;
      margin-bottom:2rem;
    }
    .nothing-toshop{
        width: 100%;
        margin-bottom:5rem;
        .nothing-toshop2{
        font-size:1.2rem;
        background-color: #00ae87;
        padding:0.6rem 3rem;
        border-radius: 20rem;
        color:#fff;
        letter-spacing:0.1rem;
        }
    }
  }
</style>
