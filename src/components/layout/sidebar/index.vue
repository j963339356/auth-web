<template>
  <!-- 侧边栏 -->
  <div class="sidebar">
    <el-menu 
      mode="vertical"
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      background-color="#393D49"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
      
    >
      <li class="collapse" @click="toggleSideBar">|||</li>
      <sidebar-item :routes="routes"></sidebar-item>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import sidebarItem from './sidebarItem'

export default {
  name: "Sidebar",
  components: {
    sidebarItem
  },
  props: [],
  data() {
    return {};
  },
  watch: {},
  computed: {
    ...mapGetters([
      'sidebar',
      'routers'
    ]),
    routes() {
      // return this.$router.options.routes
      return this.routers
    },
    isCollapse() {
      console.log(this.sidebar.opened);
      return !this.sidebar.opened
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    }
  }
};
</script>
<style lang="scss" scoped>
</style>