<template>
  <div class="tips">
    <div class="msgBtn" @click="msg">
      <img class="msgImg" src="../../../img/index/home/msg.png">
      <div class="onmsg" v-show="hasmsg">{{num}}</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      hasmsg: false, //是否有消息显示
      num: "0" // 消息数量
    };
  },
  mounted() {
    const token = window.localStorage.getItem("token") || false;
    if (token) {
      this.getMsgNum();
    }
  },
  methods: {
    // 获取消息数量
    getMsgNum() {
      this.$api
        .get(this.HOME + this.USER + "inside/message/getMsgRow")
        .then(res => {
          this.num = res.data.data.row;
          if (this.num != 0) {
            this.hasmsg = true;
            if (this.num > 99) {
              this.num = "99+";
            }
          } else {
            this.hasmsg = false;
          }
        });
    },

    //去消息页
    msg() {
      this.$router.push({
        path: "/msg"
      });
    }
  }
};
</script>
<style lang="less" scoped>
.msgBtn {
  padding: 0 1rem;
  margin-right: 0.6rem;
  position: relative;
  .msgImg {
    height: 1.5rem;
    width: 2rem;
  }
  .onmsg {
    position: absolute;
    top: -0.6rem;
    right: 0.2rem;
    background: red;
    height: 1.4rem;
    padding: 0 0.4rem;
    border-radius: 0.7rem;
    font-size: 1rem;
    color: #fff;
  }
}
</style>

