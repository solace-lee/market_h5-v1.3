<template>
  <div class="achievement" ref="achievement">
    <!-- 头部 -->
    <div class="head-area">
      <div class="bg"></div>
      <div class="head-title">
        <div class="back" @click="$router.go(-1)">
          <img src="../../img/index/wallet/back-black.png" alt>
        </div>
        <div class="title">我的消息</div>
      </div>
    </div>

    <!-- 消息列表 -->
    <v-msg :msgList="msgList"></v-msg>
    <div class="line">到底了-.-</div>
  </div>
</template>

<script>
import Msg from "@/components/msg/msg.vue";
export default {
  components: {
    "v-msg": Msg
  },
  data() {
    return {
      msgList: [] //消息列表
    };
  },
  created() {
    this.getMsg();
  },

  mounted() {},
  methods: {
    // 获取消息列表
    getMsg() {
      this.$api
        .get(this.HOME + this.USER + "inside/message/getUserMsg")
        .then(res => {
          this.msgList = res.data.items;
        });
    }
  }
};
</script>
<style scoped lang='less'>
.achievement {
  width: 100%;
  height: 100vh;
  background: #f2f2f2;

  // 头部
  .head-area {
    width: 100%;
    height: 4.7rem;
    display: flex;
    flex-direction: column;
    .bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      img {
        height: 100%;
        width: 100%;
      }
    }
    .head-title {
      z-index: 20;
      height: 4.7rem;
      background: #fff;
      width: 100%;
      display: flex;
      justify-content: center;
      position: fixed;
      top: 0;
      left: 0;
      line-height: 4.7rem;
      .back {
        position: fixed;
        left: 1.5rem;
        top: 0;
        height: 1.6rem;
        width: 0.9rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .title {
        font-size: 1.8rem;
        color: #333;
      }
    }
  }

  // 到底了
  .line {
    height: 4rem;
    background: #f2f2f2;
    line-height: 4rem;
    font-size: 1.4rem;
    text-align: center;
  }
}
</style>
