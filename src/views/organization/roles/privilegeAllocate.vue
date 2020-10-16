<template>
  <el-card class="card-container ">
      <div class="cotainer">
      <div v-for="modules in modulePrivilege" :key="modules.id">
        <el-row class="module-card table-layout">
            <el-col :span="8"><el-checkbox v-model="modules.checked" :indeterminate="moduleIndeterminage(modules)" @change="handleCheckAllMenu(modules)">{{modules.name}}</el-checkbox></el-col>
        </el-row>
        <div v-for="menu in menuPrivilegesByModule(modules)" :key="menu.id">
            <el-row class="menu-card table-layout">
                <el-col :span="8" :offset="1">
                    <el-checkbox v-model="menu.checked" :indeterminate="menuIsIndeterminate(menu)" @change="handleCheckAllMenu2(menu)">{{menu.name}}</el-checkbox>
                </el-col>
            </el-row>
            <div v-for="menu2 in menu2PrivilegesByMenu(menu)" :key="menu2.id">
                <el-row class="menu2-card table-layout">
                    <el-col :span="8" :offset="2">
                        <el-checkbox v-model="menu2.checked" :indeterminate="menu2IsIndeterminate(menu2)" @change="handleCheckAllResource(menu2)">{{menu2.name}}</el-checkbox>
                    </el-col>
                </el-row>
                <el-row style="padding: 14px; padding-left: 72px">
                    <el-col :span="8" v-for="resource in resourcePrivilegesByMenu2(menu2)" :key="resource.id">
                        <el-checkbox v-model="resource.checked" @change="handleCheckResource(resource)">{{resource.name}}</el-checkbox>
                    </el-col>
                </el-row>
            </div>
        </div>
      </div>  
      </div>      
  </el-card>
</template>

<script>
import { fetchPrivilegeAllocate } from '@/api/role';

export default {
  name:'PrivilegeAllocate',
  components: {},
  props: [],
  data() {
    return {
        roleId: "",    
        PrivilegeAllocate: [],  //获取的权限列表
        modulePrivilege: [], //模块
        menuPrivileges: [], //一级菜单
        menu2Privileges: [], //二级菜单
        resourcePrivileges: [], //权限
    };
  },
  watch: {},
  computed: {},
  methods: {
      menuPrivilegesByModule(val){
          //通过模块获取一级菜单
          return this.menuPrivileges.filter(item => item.moduleId == val.id);
      },
      menu2PrivilegesByMenu(val){
          //通过一级菜单获取二级菜单
          return this.menu2Privileges.filter(item => item.pid == val.id)
      },
      resourcePrivilegesByMenu2(val){
          //通过二级菜单获取资源
          return this.resourcePrivileges.filter(item => item.pid == val.id)
      },
      getPrivilegeAllocate(){
          //获取资源分配表格
          fetchPrivilegeAllocate().then(response => {
              let data = response.data;
              this.PrivilegeAllocate = data
              this.modulePrivilege = data.filter(item => item.type==0)
              this.menuPrivileges = data.filter(item => item.type==1)
              this.menu2Privileges = data.filter(item => item.type==2)
              this.resourcePrivileges = data.filter(item => item.type==3)
          })
      },
      moduleIndeterminage(modules){
          //模块菜单介于全选和非选中的状态
          let checks = false;
          for(let i=0; i<this.menuPrivileges.length; i++){
              if(this.menuPrivileges[i].pid==modules.id){
                  if(this.isMenuChecks(modules.id)==2){
                      checks = true
                  }
              }
          }
          return checks
      },
      menuIsIndeterminate(menu){
           //一级级菜单介于全选和非选中的状态
          let checks=false;
          for(let i=0; i< this.menu2Privileges.length; i++){
              if(this.menu2Privileges[i].pid==menu.id){
                //   console.log(this.isMenu2Checks(menu.id));
                  if(this.isMenu2Checks(menu.id)==2){
                    checks = true
                    break
                  }
              }
          }
          return checks
      },
      menu2IsIndeterminate(menu2){
          //二级菜单介于全选和非选中的状态
          return this.isResourceChecks(menu2.id)==2
      },
      handleCheckAllMenu(modules){
          //选取所有一级菜单
          for(let i=0; i<this.menuPrivileges.length; i++){
              if(this.menuPrivileges[i].pid==modules.id) {
                  this.menuPrivileges[i].checked = modules.checked
                  this.handleCheckAllMenu2(this.menuPrivileges[i],false)
              }
          }
      },
      handleCheckAllMenu2(menu,isNotcheck=true){
          //选取所有二级菜单
          for(let i=0; i<this.menu2Privileges.length; i++){
              if(this.menu2Privileges[i].pid==menu.id) {
                  this.menu2Privileges[i].checked = menu.checked
                  this.handleCheckAllResource(this.menu2Privileges[i],false)
              }
          }
          if(isNotcheck){ //点击直接使用默认为true需要验证，其他时候使用给false不进行验证       
            //根据验证选择一级菜单
            this.checkMenu(menu.id)
            //根据验证选择模块         
            this.checkModule(menu.moduleId)  
          }
      },
      handleCheckAllResource(menu2,isNotcheck=true){
          //选择所有资源
          for(let i=0; i<this.resourcePrivileges.length; i++){
              if(this.resourcePrivileges[i].pid==menu2.id) {
                  this.resourcePrivileges[i].checked = menu2.checked
              }
          } 
          if(isNotcheck){ //点击直接使用默认为true需要验证，其他时候使用给false不进行验证
            let menu = this.getMenuFromMenu2(menu2)          
            //根据验证选择一级菜单
            this.checkMenu(menu.id)
            //根据验证选择模块         
            this.checkModule(menu2.moduleId)  
          }
      },
      handleCheckResource(resource){
          //如果单选资源，需要改变上级是否被选择
          let moduleId = this.getModuleFromResource(resource)  
          let menu2 = this.getMenu2FromResource(resource)
          let menu = this.getMenuFromMenu2(menu2)
                          
          //判断二级菜单是否被选择
          let resourceChecks =  this.isResourceChecks(resource.pid)
          for(let i=0; i<this.menu2Privileges.length; i++){
              if(this.menu2Privileges[i].id==resource.pid){
                  if(resourceChecks==1 || resourceChecks==2){
                      this.menu2Privileges[i].checked = true
                  }else{
                      this.menu2Privileges[i].checked = false
                  }
              }
          }
          //根据验证选择一级菜单
          this.checkMenu(menu.id)
          //根据验证选择模块         
          this.checkModule(moduleId)     
      },
      isMenuChecks(moduleId){   //某个模块下一级菜单是否还有被选择的
        let checks = 0;
        for(let i=0; i<this.menuPrivileges.length; i++){
            if(this.menuPrivileges[i].moduleId==moduleId){
                let menu2Checks = this.isMenu2Checks(this.menuPrivileges[i].id);
                // console.log(this.menuPrivileges[i].name,menu2Checks);
                if(menu2Checks==1) checks++
                if(menu2Checks==2) checks = -100
            } 
        }
        if(checks==0){    //没有被选择的
            return 0
        }else if(checks==this.menuPrivileges.filter(item=>item.pid=moduleId).length){  //全选
            return 1
        }else{    //部分选择
            return 2
        }
      },
      isMenu2Checks(menuId){   //某个一级菜单下的二级菜单是否还有被选择的
        let checks = 0;
        for(let i=0; i<this.menu2Privileges.length; i++){
            if(this.menu2Privileges[i].pid==menuId){
                let resourceChecks = this.isResourceChecks(this.menu2Privileges[i].id);                
                // console.log(menuId,this.menu2Privileges[i].name,resourceChecks);
                if(resourceChecks==1) checks++
                if(resourceChecks==2) checks = -100
            }
        }
        if(checks==0){    //没有被选择的
              return 0
          }else if(checks==this.menu2Privileges.filter(item=>item.pid==menuId).length){  //全选
              return 1
          }else{    //部分选择
              return 2
          }
      },
      isResourceChecks(menu2Id){    //判断某个二级菜单是否应该被选择
          let checks=0
          for(let i=0; i<this.resourcePrivileges.length; i++){
              if(this.resourcePrivileges[i].checked && this.resourcePrivileges[i].pid==menu2Id){
                  checks++
              }
          }
          if(checks==0){    //没有被选择的
              return 0
          }else if(checks==this.resourcePrivileges.filter(item=>item.pid==menu2Id).length){  //全选
              return 1
          }else{    //部分选择
              return 2
          }
      },
      checkMenu(menuId){
        //根据验证选择一级菜单
        let menu2Checks = this.isMenu2Checks(menuId);
          for(let i=0; i<this.menuPrivileges.length; i++){
              if(this.menuPrivileges[i].id == menuId){
                  if(menu2Checks==1 || menu2Checks==2){
                      this.menuPrivileges[i].checked = true
                  }else{
                      this.menuPrivileges[i].checked = false
                  }
              }
          }     
      },
      checkModule(moduleId){
          //根据验证选择模块
          let moduleChecks = this.isMenuChecks(moduleId)
          for(let i=0; i<this.modulePrivilege.length; i++){
              if(this.modulePrivilege[i].id == moduleId){
                  if(moduleChecks==1||moduleChecks==2){
                      this.modulePrivilege[i].checked = true
                  }else{
                      this.modulePrivilege[i].checked = false
                  }
              }              
          }            
      },
      getMenu2FromResource(resource){//通过资源获取二级菜单
        let menu2=null;
        for(let i=0; i<this.menu2Privileges.length; i++){
            if(resource.pid == this.menu2Privileges[i].id ){
                menu2 = this.menu2Privileges[i]
                break
            }
        }
        return menu2
      },
      getMenuFromMenu2(menu2){  //通过二级菜单获取一级菜单
          let menu = null;
          for(let i=0; i<this.menuPrivileges.length; i++){
              if(this.menuPrivileges[i].id == menu2.pid){
                  menu = this.menuPrivileges[i]
                  break
              }
          }
          return menu
      },
      getModuleFromResource(resource){   //获取所属模块id
        let moduleId=null;
        for(let i=0; i<this.menu2Privileges.length; i++){
            if(this.menu2Privileges[i].id == resource.pid){
                moduleId = this.menu2Privileges[i].moduleId
                break
            }
        }
        return moduleId
      }    
  },
  created(){
      this.roleId = this.$route.query.roleId;
      this.getPrivilegeAllocate();
  },
  filters: {
      
  }
};
</script>
<style lang="scss" scoped>
    .card-container{
        width: 800px;
        margin: 0 auto;
        min-height: 500px;
    }
    .cotainer{
        min-height: 500px;
        border: 1px solid #b9c2db;
    }    
    .table-layout {
        padding: 10px;
        border-left: 1px solid #b9c2db;
        border-right: 1px solid #b9c2db;
        border-bottom: 1px solid #b9c2db;
    }
    .module-card{
        background: #a0c6df;
    }
    .menu-card{
        background: #b8cddb; 
    }
    .menu2-card{
        background: #d0dee7;
    }
</style>