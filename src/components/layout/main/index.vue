<template>
  <!-- 后台模板内容页面main -->
  <div class="main">
    <Breadcrumb />
    <div class="main-cotainer">
      <transition name="fade-transform" mode="out-in">         
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/breadcrumb'

export default {
  name: "Main",
  components: {
    Breadcrumb
  },
  props: [],
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {},
};
</script>
<style lang="scss" scoped>
</style>