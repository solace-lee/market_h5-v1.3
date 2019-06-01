<template>
  <div class="msg">
    <div class="msg-container">
      <div
        class="msg-area"
        v-for="(i, index) in msgList"
        :key="index"
        @click="handleClickMsg(i.userMsgId)"
      >
        <div class="msg-head">
          <div class="msg-title">{{i.messageTitle}}</div>
          <div class="msg-date">{{i.createTime}}</div>
        </div>
        <div class="msg-info">
          <div class="msg-img">
            <img
              v-if="i.messageType == 7 || i.messageType == 8"
              src="../../../img/index/msg/order.png"
              alt
            >
            <img
              v-if="i.messageType == 1 || i.messageType == 2"
              src="../../../img/index/msg/msg.png"
              alt
            >
            <img
              v-if="i.messageType == 5 || i.messageType == 6"
              src="../../../img/index/msg/msg.png"
              alt
            >
            <img
              v-if="i.messageType == 3 || i.messageType == 4"
              src="../../../img/index/msg/sales.png"
              alt
            >
            <div class="hasmsg" v-if="i.msgStatus == 0"></div>
          </div>
          <div class="msg-detail">{{i.messageContent}}</div>
        </div>
        <div class="msg-bottom">
          <div class="msg-text">查看详情</div>
          <div class="msg-go">
            <img src="../../../img/index/msg/next.png" alt>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    msgList: {
      type: Array,
      defalut: []
    }
  },
  methods: {
    // 点击了消息
    handleClickMsg(id) {
      this.$router.push({
        path: "/msgInfo?id=" + id
      });
    }
  }
};
</script>
<style lang="less" scoped>
// 消息列表
.msg {
  width: 100%;
  // height: 17rem;
  padding: 0 1.5rem;
  background: #f2f2f2;
  .msg-container {
    width: 100%;
    // height: 14rem;
    border-radius: 6px;
    overflow: hidden;
    .msg-area {
      width: 100%;
      padding: 1.5rem 1.5rem 0 1.5rem;
      margin-top: 1.5rem;
      background: #fff;
      border-radius: 6px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .msg-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .msg-title {
          font-size: 1.5rem;
          color: #333;
        }
        .msg-date {
          font-size: 1.1rem;
          color: #99999999;
        }
      }
      .msg-info {
        display: flex;
        align-items: center;
        margin: 1rem 0;
        .msg-img {
          height: 4.5rem;
          width: 4.5rem;
          position: relative; // 用于未读消息定位
          img {
            height: 4.5rem;
            width: 4.5rem;
            border-radius: 50%;
          }
          .hasmsg {
            height: 1rem;
            width: 1rem;
            background: #ff0000;
            border-radius: 50%;
            position: absolute;
            top: 0;
            left: 3.5rem;
          }
        }
        .msg-detail {
          font-size: 1.4rem;
          color: #999;
          margin-left: 1rem;
        }
      }
      .msg-bottom {
        border-top: 1px solid #eee;
        display: flex;
        justify-content: space-between;
        height: 4rem;
        align-items: center;
        font-size: 1.3rem;
        color: #666;
        .msg-go {
          height: 2rem;
          width: 0.6rem;
          img {
            width: 0.6rem;
            height: 1rem;
          }
        }
      }
    }
  }
}
</style>

