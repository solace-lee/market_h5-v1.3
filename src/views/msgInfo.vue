<template>
  <div class="achievement">
    <!-- 头部 -->
    <div class="head">
      <div class="bg"></div>
      <div class="head-title">
        <div class="back" @click="$router.go(-1)">
          <img src="../../img/index/wallet/back-black.png" alt>
        </div>
        <div class="title">消息详情</div>
      </div>
    </div>

    <!-- 消息列表 -->
    <v-msginfo :msgInfoList="msgInfoList"></v-msginfo>
    <div class="msg-url">
      <div>消息链接:</div>
      <a href="msgInfoList.businessHandleUrl">{{msgInfoList.businessHandleUrl}}</a>
    </div>
  </div>
</template>

<script>
import MsgInfo from "@/components/msg/msgInfo.vue";
export default {
  components: {
    "v-msginfo": MsgInfo
  },
  data() {
    return {
      msgInfoList: {} //消息列表
    };
  },
  created() {
    this.getMsgInfoList();
  },

  mounted() {},
  methods: {
    // 获取消息列表
    getMsgInfoList() {
      console.log(this.id);

      this.$api
        .get(
          this.HOME +
            this.USER +
            "inside/message/getUserMsgDetail/" +
            this.$route.query.id
        )
        .then(res => {
          this.msgInfoList = res.data;
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
  .head {
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
  .msg-url {
    position: fixed;
    bottom: 2rem;
    left: 0;
    width: 100%;
    padding: 0 1.5rem;
    font-size: 1.2rem;
    color: #999;
    display: flex;
    div {
      flex: 1;
    }
    a {
      flex: 5;
      margin-left: 1rem;
      font-size: 1rem;
      color: #006fae;
      text-decoration: underline;
    }
  }
}
</style>
