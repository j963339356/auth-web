<template>
  <el-row :gutter="10" type="flex" justify="end">
    <!-- <Item :el-md="12" :isDropdown="true" :menu="skin" @itemEvent="changeSkinProperty"></Item> -->
    <Item :el-md="5" :isDropdown="false" :menu="home"></Item>
    <Item :el-md="5" :isDropdown="true" :menu="userInfo" :isUseImg="true"></Item>
  </el-row>
</template>

<script>
import Item from "./Item";

export default {
  name: "Right",
  components: {
    Item
  },
  props: {},
  data() {
    return {
      // theme: {
      //   skin: this.$store.getters.skin,
      //   colorPrimary: this.$store.getters.colorPrimary
      // },
      // skin: {
      //   title: "换肤",
      //   icon: ["el-icon-star-off", "el-icon-star-on"],
      //   items: [
      //     { command: "black", text: "黑色", color: "black" },
      //     { command: "red", text: "红色", color: "red" },
      //     { command: "blue", text: "蓝色", color: "#409EFF" }
      //   ]
      // },
      home: {
        title: "主页",
        icon: ["el-icon-s-home","el-icon-s-home"],
        items: { command: "/home" }
      },
      userInfo: {
        title: "用户",
        icon: ["el-icon-user", "el-icon-user-solid"],
        items: [
          { command: "/manage/home", text: "管理" },
          { command: "/logout", text: "退出" }
        ]
      }
    };
  },
  mounted() {
    // this.changeSkin();
  },
  computed: {},
  watch: {
    // theme: {
    //   //动态监听主题变化
    //   handler(newval, oldval) {
    //     this.changeSkin();
    //   },
    //   deep: true,
    //   immediate: true
    // }
  },
  methods: {
    // changeSkinProperty(command) {
    //   let _this = this;
    //   //改变皮肤
    //   this.skin.items.forEach(item => {
    //     if (item.command == command) {
    //       this.$store.commit("setting/CHANGE_SETTING", {
    //         key: "skin",
    //         value: item.color
    //       });
    //       _this.$store.state.setting.skin = item.color;
    //       this.theme.skin = item.color;
    //     }
    //   });
    // }
    // changeSkin() {
    //   let elHeader = document.getElementsByClassName("el-header");
    //   let elFooter = document.getElementsByClassName("el-footer");
    //   elHeader.forEach((item, index) => {
    //     item.style.backgroundColor = this.theme.skin;
    //   });
    //   elFooter.forEach((item, index) => {
    //     item.style.backgroundColor = this.theme.skin;
    //   });
    // }
  }
};
</script>
<style lang="scss" scoped>

</style>