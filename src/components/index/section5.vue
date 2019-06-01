<template>
  <section class="section5">
    <div class="title">
      <img src="../../../img/index/home/leb.png" style="width:6px;height: 24px;margin-right: 10px;">
      <p style="font-size: 20px;color: #777777;width: 70%;">猜你喜欢</p>
    </div>

    <div class="section2-list">
      <div class="container1">
        <div v-for="(k,index) in grous" class="list" :key="index" v-show="index<6">
          <router-link :to="{path:'/detail?id='+k.id}">
            <img :src="k.imgUrl" :alt="k.name">
            <p class="diqu" v-if="k.brandName">{{k.brandName}}</p>
            <div class="goodstitle">
              <div class="item_name">{{k.name}}</div>
            </div>
            <p class="section2-list-price">
              <span style="font-weight:bold;">
                <span class="qian">￥</span>
                {{k.discountPrice}}
              </span>
              <!--s标签是添加删除线-->
              <span class="section2-list-intro">{{k.salesVolume}}人付款</span>
            </p>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { Lazyload } from "mint-ui";
export default {
  props: ["grous"],
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>

<style lang="less" scoped>
.section5 {
  width: 100%;
  overflow: hidden;
  position: relative;
  .title {
    margin-top: 1rem;
    width: 100%;
    height: 3.8rem;
    display: flex;
    // justify-content: center;
    padding-left: 1.5rem;
    align-items: center;
    background-color: #eeeeee;
    img {
      width: 100%;
    }
  }
}

.container1 {
  background: #eee;
  width: 100%;
  // padding: 0.5rem 1rem 0.25rem 1rem;
  display: flex;
  flex-wrap: wrap;
  // justify-content: space-between;
  .list {
    width: 45.5%;
    overflow: hidden;
    background-color: #ffffff;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.3);
    border-radius: 6px;
    margin: 0.6rem 0 0.6rem 3%;
    position: relative;
    img {
      width: 100%;
      height: 15.4rem;
    }
    .diqu {
      // width: 4.4rem;
      padding: 0 0.6rem;
      height: 1.9rem;
      background-color: #ba9078;
      font-size: 1.2rem;
      line-height: 2rem;
      font-weight: normal;
      text-align: center;
      color: #ffffff;
      position: absolute;
      left: 1.4rem;
      top: 14.8rem;
    }
    .goodstitle {
      width: 100%;
      height: 3.4rem;
      margin-top: 1.8rem;
      padding: 0 1rem;
      .item_name {
        font-size: 1.3rem;
        color: #333;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        /*! autoprefixer: off */
        -webkit-box-orient: vertical;
        /*! autoprefixer: on */
        overflow: hidden;
      }
    }
    .dazhe {
      margin-top: 8px;
      width: 5.7rem;
      height: 1.3rem;
      font-size: 0.9rem;
      border: solid 1px #ff0000;
      color: #ff0000;
      line-height: 1.2rem;
      text-align: center;
      margin-left: 1.2rem;
      // border-radius: 6px;
    }
    .section2-list-price {
      margin-top: 4px;
      font-size: 2rem;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #00ae87;
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;
      // position: relative;
      .qian {
        width: 8px;
        height: 9px;
        font-family: SourceHanSansCN-Regular;
        font-size: 1.2rem;
        font-weight: normal;
        font-stretch: normal;
        margin-left: 1.2rem;
        letter-spacing: 0px;
        color: #00ae87;
      }
      .section2-list-intro {
        // float: right;
        padding-top: 1.2rem;
        padding-right: 1.2rem;
        font-size: 1rem;
        color: #333;
      }
    }
  }
}
</style>