<template>
<!-- 首页 -->
  <div>
    <Header></Header>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from '@/components/layout/header/index';

export default {
  name:'Section',
  components: {
    Header
  },
  props: [],
  data() {
    return {
    };
  },
  watch: {},
  computed: {},
  methods: {},
};
</script>
<style lang="scss" scoped>
    
</style>