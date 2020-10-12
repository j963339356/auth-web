<template>
  <div class="navbar">
    <div class="left">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="(route,index) in breadcrumbList" :key="index">
            <span v-if="index==breadcrumbList.length-1">{{route.meta.title}}</span>
            <a v-else @click="handleClick(route)">{{route.meta.title}}</a>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>

<script>
export default {
  name: "Breadcrumb",
  components: {},
  props: [],
  data() {
    return {
        breadcrumbList: null
    };
  },
  watch: {
      $route(newRoute,oldRoute){
          this.getBreadcrumb()
      }
  },
  computed: {},
  methods: {
      getBreadcrumb(){
          //获取面包屑级别
          let routes = this.$route.matched.filter(item => {
              if(item.meta&&item.meta.title){               
                  return true
              }
            });
          //判断第一个面包屑是不是主页,如果不是在前面加上主页
          if(routes[0].path!='/home'){
            routes = [{path:'/home',meta: { title: '主页'}}].concat(routes)
          }
            // console.log(routes);            
          this.breadcrumbList = routes;
      },
      handleClick(item){
          if(item.redirect){
              this.$router.push(item.redirect)
              return
          }
        //   console.log(this.$route);
          if(item.meta&&item.meta.isDirect){
              return
          }
          this.$router.push(item.path)
      }
  },
  created(){
      this.getBreadcrumb()
  }
};
</script>
<style lang="scss" scoped>
.navbar{
  height: 50px;  
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #dcdfe6;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}
.navbar>.left{
    padding: 20px;
}

</style>