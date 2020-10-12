<template>
  <div class="dropdown">
    <!-- 下拉折叠 -->
    <div ref="profile" class="profile">
      <slot></slot>
    </div>
    <div class="dropdown-wrap" @click="handleDropdown">
      <div class="control">
        <div class="span">
          <i :class="!show?icon[0]:icon[1]"></i>
          <span>{{!show?showTag[0]:showTag[1]}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dropdown",
  components: {},
  props: {
    height: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      show: false,
      showTag: ["展开", "隐藏"],
      icon: ["el-icon-caret-bottom", "el-icon-caret-top"]
    };
  },
  watch: {
    show() {}
  },
  computed: {},
  methods: {
    handleDropdown() {
      if (!this.show) {
        console.log(this.$refs.profile.clientHeight);
        this.$refs.profile.style.height = this.height;
      } else {
        console.log(this.$refs.profile.clientHeight);
        this.$refs.profile.style.height = "0px";
      }

      this.show = !this.show;
    }
  }
};
</script>
<style lang="scss" scoped>
.dropdown{
  margin-bottom: 10px;
}
.dropdown-wrap {
  cursor: pointer;
  position: relative;
  padding-bottom: 16px;
}
.control {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding-bottom: 5px;
  text-align: center;
  background-image: linear-gradient(
    -180deg,
    rgba(255, 255, 255, 0) 0%,
    #fff 70%
  );
  border-top:1px solid #C0C4CC;
}
.profile {
  overflow: hidden;
  height: 0;
  transition: height 0.5s;
  margin-bottom: 10px;
}
.span{
  position: relative;
  width: 70px;
  margin: 0 auto;
  border-top:1px solid #fff;
  border-bottom:1px solid #C0C4CC;
  border-left:1px solid #C0C4CC;
  border-right:1px solid #C0C4CC;
  border-bottom-left-radius: 10%;
  border-bottom-right-radius: 10%;
  top: -1px;
}
</style>