<template>
  <div class="msginfo">
    <!-- 基本信息 -->
    <div class="msg-container">
      <div class="msg-title">
        <div class="title-left">发件人:</div>
        <div class="title-right">{{msgInfoList.sender}}</div>
      </div>
      <div class="msg-title">
        <div class="title-left">类&nbsp;&nbsp;&nbsp;&nbsp;型:</div>
        <div class="title-right" v-if="msgInfoList.messageType == 1">区审核</div>
        <div class="title-right" v-if="msgInfoList.messageType == 2">商品发货</div>
        <div class="title-right" v-if="msgInfoList.messageType == 3">已付款</div>
        <div class="title-right" v-if="msgInfoList.messageType == 4">创业基金到账</div>
        <div class="title-right" v-if="msgInfoList.messageType == 5">七天内未收货,自动确认收货</div>
        <div class="title-right" v-if="msgInfoList.messageType == 6">平台</div>
      </div>
      <div class="msg-title">
        <div class="title-left">时&nbsp;&nbsp;&nbsp;&nbsp;间:</div>
        <div class="title-right">{{msgInfoList.createTime}}</div>
      </div>
    </div>

    <!-- 内容区 -->
    <div class="container">
      <div class="area-top">{{msgInfoList.messageContent}}</div>
      <div class="area-bottom" v-if="msgInfoList.businessHandleUrl">
        <img :src="msgInfoList.businessHandleUrl" alt>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    msgInfoList: {
      type: Object,
      default: {}
    }
  },
  methods: {
    handleClickMsgInfo(id) {}
  }
};
</script>
<style lang="less" scoped>
.msginfo {
  width: 100%;
  padding: 0 1.5rem;
  // 基本信息
  .msg-container {
    margin-top: 1.5rem;
    border-radius: 6px;
    width: 100%;
    background: #fff;
    .msg-title {
      height: 4.4rem;
      padding: 0 1.5rem;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #f2f2f2;
      .title-left {
        font-size: 1.5rem;
        color: #999;
      }
      .title-right {
        margin-left: 1.5rem;
        font-size: 1.5rem;
        color: #333;
      }
    }
  }

  // 内容区
  .container {
    margin-top: 1.5rem;
    border-radius: 6px;
    width: 100%;
    background: #fff;
    .area-top {
      padding: 1.5rem 0;
    }
    .area-bottom {
      height: 17.7rem;
      width: 100%;
      background: #999;
      margin-bottom: 1.5rem;
    }
  }
}
</style>


