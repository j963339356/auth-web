<template>
  <el-col :md="elMd" v-if="!isDropdown" class="text-center">
      <span class="item-link" @mouseover="over" @mouseout="out" @click="handleCommand(menu.items.command)">
        <i :class="menu.icon[0]" :title="menu.title" v-show="isActive"></i>
        <i :class="menu.icon[1]" :title="menu.title" v-show="!isActive"></i>
        {{menu.title}}
      </span>
  </el-col>
  <el-col :md="elMd" class="text-center" v-else>
    <el-dropdown trigger="click" @command="handleCommand">
      <span class="item-link" @mouseover="over" @mouseout="out" v-if="!isUseImg">
          <i :class="menu.icon[0]" :title="menu.title" v-show="isActive"></i>
          <i :class="menu.icon[1]" :title="menu.title" v-show="!isActive"></i>
        {{menu.title}}
      </span>
      <span class="item-link" @mouseover="over" @mouseout="out" v-else>
          <el-avatar size="small" :src="src" :title="menu.title" v-show="isActive"></el-avatar>
          <el-avatar size="large" :src="src" :title="menu.title" v-show="!isActive"></el-avatar>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          @click.native="$emit('itemEvent',item.command)"
          v-for="item in menu.items"
          :key="item.key"
          :command="item.command"
        >{{item.text}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-col>
</template>

<script>
export default {
  name: "RightItem",
  components: {},
  props: {
    //是否下拉框
    isDropdown: {
      type: Boolean,
      default: false
    },
    //是否是右上角用户图标
    isUseImg: {
      type: Boolean,
      default: false
    },
    //设置md距离
    elMd: {
      type: Number,
      required: true
    },
    //属性
    menu: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isActive: true,
      src: require('@/assets/logo.png')
    };
  },
  watch: {},
  computed: {},
  methods: {
    handleCommand(command) {
      //下拉列表点击事件，主要做路由跳转
      //判断是不是url，如果是则跳转
      let objExp = new RegExp(/\/\w+\/?.+/);
      if (objExp.test(command) == true && command != this.$route.path) {
        //路由跳转
        this.$router.push({ path: command });
      }
    },
    over() {
      //鼠标覆盖item，显示一个icon
      console.log(this.isActive);
      this.isActive = false;
    },
    out() {
      //鼠标移出item，显示另一个icon
      this.isActive = true;
    }
  }
};
</script>
<style lang="scss" scoped>
.text-center{
    text-align: center;
}
.item-link {
  cursor: pointer;
  text-decoration: none;
}
.item-link:hover{
  color: #fff
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-avatar--small{
  margin-top: 16px;
}
.el-avatar--large{
  margin-top: 9px;;
}
</style>