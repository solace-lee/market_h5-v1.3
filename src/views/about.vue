<template>
  <div class="about">
    <div class="head_area">
      <div class="back-img" @click="back">
        <img src="../../img/index/personal/back-black.png" alt>
      </div>
      <div class="title">关于</div>
      <div></div>
    </div>

    <div class="container">
      <img src="../../img/index/home/logo.png" alt="">
      <div class="name">助力乡村</div>
      <div class="version" v-if="versions">当前版本V{{versions}}</div>
      <!-- <div class="checkupdate" v-if="versions" @click="checkVersions">立即检查更新</div> -->
    </div>
    <div class="foot_name">广东承石网络科技有限公司提供技术支持</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      versions: '',
      localUrl: [],
    }
  },
  created() {
    // 监听版本更新
    this.localUrl = window.location.href.split(":");
    if (this.localUrl[0] == 'file') {
      mui.plusReady(() => {
      this.versions = plus.runtime.version
      this.checkVersions()
    })
    }
  },
  methods: {
    back() {
      this.$router.replace({
        path: '/user'
      })
    },

    // 版本更新
    checkVersions() {
      if (this.localUrl[0] == 'file') {
        mui.plusReady(() => {
          this.$api.get(this.HOME + this.AUTH + 'checkVersions')
            .then(res => {
              if (res.data.status == 200) {
                if (mui.os.ios) {
                  // 苹果系统不允许更新
                  return
                } else {
                  // 安卓系统更新
                  if (this.versions != res.data.data.versionNumber) {
                    plus.nativeUI.confirm("发现新版本(" + res.data.data.versionNumber + ")，是否立即安装", (event) => {
                      if (event.index == 0) {
                        this.download(res.data.data.download)
                      }
                    }, {}, ["立即更新", "取　　消"])
                  }
                }
              }
            })
        })
      }
    },

    // 下载更新版本
    download(url) {
      Toast('正在下载中……', 3000)
      let dtask = plus.downloader.createDownload(url, {}, (d,status) => {
        // Toast('下载成功')
        if (status == 200) {
          let path = d.filename
          plus.runtime.openFile(path)
        } else {//下载失败
          alert( "下载失败: " + status );
        }
      })
      dtask.start()
    },
  }
}
</script>
<style lang="less" scoped>
.about {
  height: 100vh;
  width: 100vw;
  background: #f2f2f2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  // position: relative;
}

.head_area {
  display: flex;
  justify-content: space-between;
  height: 4.7rem;
  width: 100%;
  align-items: center;
  padding: 0 1.5rem;
  background: #fff;
  .title {
    font-size: 1.6rem;
  }
}


.back-img {
  height: 1.6rem;
  width: 0.9rem;
  z-index: 100;
  top: 1.4rem;
  left: 1.6rem;
  img {
    height: 100%;
    width: 100%;
  }
}

.container {
  width: 100%;
  height: 100%;
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 8rem;
  img {
    height: 9rem;
    width: 9rem;
  }
  .name {
    font-size: 1.8rem;
    margin-top: 1rem;
  }
  .version {
    font-size: 1.5rem;
    color: #999;
    margin-top: 2rem;
  }
  .checkupdate {
    margin-top: 2rem;
    height: 4.4rem;
    width: 28rem;
    text-align: center;
    border: 1px solid #00ae87;
    border-radius: 6px;
    line-height: 4.4rem;
    color: #00ae87;
    font-weight: bold;
    letter-spacing: .4rem;
  }
}

.foot_name {
  color: #999;
  margin-bottom: 2rem;
}
</style>


