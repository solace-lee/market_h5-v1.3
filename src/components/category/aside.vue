<template lang="html">
  <aside class="aside" v-if="datas">
    <ul>
      <li v-for="(k,i) in datas.aside" @click='changeTabIndex(i)'>
        <router-link :to="{path:'/category/'+k.title}" :class='{active:i==tabIndex}' >{{k.title}}</router-link>
      </li>

    </ul>

  </aside>
</template>

<script>
export default {
  data() {
    return {
      datas: []
    };
  },
  props: ["datas"],

  computed: {
    tabIndex() {
      return this.$store.state.category.tabIndex;
    }
  },
  created() {
  
  },
  methods: {
   

    changeTabIndex(i) {
      this.$http.get(this.HOME+"/product/FirstClassify").then(res => {
        console.log(res);

        var _self = this;
        _self.res = eval(res.data.data);
        var jsonLength = 0;
        var jsons = this;
        for (var item in res.data.data) {
          jsonLength++;
          jsons = res.data.data[item];
          for (var i = 0; i < jsons.length; i++) {
            console.log(jsons[i].classifyName);
          }
          console.log();
        }
        console.log(res.data.data);

        console.log(jsonLength);

        this.commodity=res.data.data.map(function (params,i) {
          return params;
          console.log(res.data)
        })
      });

      this.$store.commit("CHANGE_TABINDEX", i);
    }
  }
};
</script>

<style lang="less" scoped>
.aside {
  flex: 2.2;
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  background-color: gold;
  &::-webkit-scrollbar {
    display: none;
  }
  > ul {
    height: 100%;
    width: 100%;
    li {
      text-align: center;
      a {
        display: block;
        padding: 4vw 0;
        position: relative;
        font-size: 16px;
      }
      .active {
        position: relative;
        font-size: 22px;
        &::before {
          width: 3px;
          height: 28px;
          content: "";
          position: absolute;
          left: 0;
          top: 50%;
          margin-top: -14px;
          background-color: green;
        }
      }
    }
  }
}
</style>
