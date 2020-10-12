<!--后台管理页面-->
<template>
  <div :class="classObj">
    <Header></Header>
    <Sidebar></Sidebar>
    <Main></Main>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/layout/header/index';
import Sidebar from '@/components/layout/sidebar/index';
import Main from '@/components/layout/main/index';
import Footer from '@/components/layout/footer/index';

export default {
  name:'Layout',
  components: {
    Header,
    Sidebar,
    Main,
    Footer
  },
  props: [],
  data() {
    return {
    };
  },
  watch: {},
  computed: {
    classObj() {
      return {        
        hideSidebar: !this.$store.getters.sidebar.opened
      }
    }
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
    
</style>