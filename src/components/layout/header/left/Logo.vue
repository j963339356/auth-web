<!-- logo按钮，点击会跳到首页 -->
<template>
    <a href="/">
      <img :src="logoimage" alt="主图标" />
      <p>{{title}}</p>
    </a>
</template>

<script>
const logoimage = require("@/assets/logo.png");

export default {
  name: "Logo",
  components: {},

  data() {
    return {
      title: "我的平台",
      logoimage: logoimage
    };
  },

  methods: {},

  computed: {},

  watch: {}
};
</script>
<style lang='scss' scoped>

</style>