<template>
  <!-- 添加菜单 -->
  <div>
    <el-dialog title="添加菜单" :visible="visible" :before-close="handleClose" width="40%">
      <el-form :model="menu" ref="menuFrom" label-width="150px" :rules="rules">
        <el-form-item label="编号" prop="id" required>
          <el-input v-model="menu.id" class="input-width"></el-input>
        </el-form-item>        
        <el-form-item label="菜单名称" prop="title" required>
          <el-input v-model="menu.title" class="input-width"></el-input>
        </el-form-item>
        <el-form-item label="所属模块" required>
          <el-select v-model="menu.moduleId" placeholder="请选择菜单">
            <el-option
              v-for="item in selectModuleList"
              :key="item.name"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上级菜单">
          <el-select v-model="menu.pid" placeholder="请选择菜单">
            <el-option
              v-for="item in selectMenuList"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="前端名称">
          <el-input v-model="menu.name" class="input-width"></el-input>
        </el-form-item>
        <el-form-item label="前端图标">
          <el-input v-model="menu.icon" class="input-width"></el-input>
          <i style="margin-left: 8px" :class="menu.icon"></i>
        </el-form-item>
        <el-form-item label="是否显示" required>
          <el-switch
            :active-value="1"
            :inactive-value="0"
            v-model="menu.hidden"            
          ></el-switch>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="menu.sort" class="input-width"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {fetchList, createMenu, updateMenu, getMenu} from '@/api/menu';
  import { fetchList as fetchModules } from '@/api/module';

//默认
const defaultMenu = {
  id: "",
  title: "",
  pid: "0",
  moduleId: 1,
  name: "",
  icon: "",
  hidden: 1,
  sort: 0,
};

export default {
  name: "MenuDetail",
  components: {},
  props: {
    visible: {
      //弹窗
      type: Boolean,
      required: true,
    },
    isEdit: {
      //添加或修改
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      gutter: 100, //表单间距
      id: null, //打开窗口时查询的id
      menu: Object.assign({}, defaultMenu),
      selectMenuList: [],
      selectModuleList: [],
      rules: {
        title: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
          {
            min: 2,
            max: 140,
            message: "长度在 2 到 140 个字符",
            trigger: "blur",
          },
        ],
        name: [
          { required: true, message: "请输入前端名称", trigger: "blur" },
          {
            min: 2,
            max: 140,
            message: "长度在 2 到 140 个字符",
            trigger: "blur",
          },
        ],
        icon: [
          { required: true, message: "请输入前端图标", trigger: "blur" },
          {
            min: 2,
            max: 140,
            message: "长度在 2 到 140 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    if(!this.isEdit) {
      this.menu = Object.assign({}, defaultMenu);
    }
  },
  watch: {
    visible: function(val){
      if(val){
        this.getSelectMenuList();
        this.getSelectModuleList();
      }
    }
  },
  computed: {},
  methods: {
    handleClose(done) {
      //取消
      this.$confirm("确认关闭？")
        .then(() => {
          done;
          this.$emit("close", { close: false, query: false });
        })
        .catch((_) => {
          console.log(_);
        })
        .finally(() => {});
    },
    getSelectModuleList() {
      //获取模块下拉列表
      fetchModules({queryData:{ isactive: 1}, pageSize: 100, pageNum: 1 }).then((response) => {
        this.selectModuleList = response.data.list;
        // this.selectMenuList.unshift({ id: "0", title: "无上级菜单" });
      });
    },
    getSelectMenuList() {
      //获取上级菜单下拉列表
      fetchList({queryData:{ pid: "0"}, pageSize: 100, pageNum: 1 }).then((response) => {
        this.selectMenuList = response.data.list;
        this.selectMenuList.unshift({ id: "0", title: "无上级菜单" });
      });
    },
    handleSave() {
      this.$refs["menuFrom"].validate((valid) => {
        if (valid) {
          this.$confirm("是否提交数据", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() => {
            if (this.isEdit) {
              updateMenu(this.menu.id, this.menu).then((response) => {
                this.$message({
                  message: "修改成功",
                  type: "success",
                  duration: 1000,
                });
                this.$emit("close", { close: false, query: true });
              });
            } else {
              createMenu(this.menu).then((response) => {
                this.$refs["menuFrom"].resetFields();
                this.resetForm("menuFrom");
                this.$message({
                  message: "提交成功",
                  type: "success",
                  duration: 1000,
                });
                this.$emit("close", { close: false, query: true });
              });
            }
          });
        } else {
          this.$message({
            message: "验证失败",
            type: "error",
            duration: 1000,
          });
          return false;
        }
      });
    },
    editGetMenu(){
        //如果是修改，就获取这个数据填到表中
        getMenu(this.id).then((response) => {
          this.menu = response.data;
        });
      
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.menu = Object.assign({}, defaultMenu);
      this.getSelectMenuList();
    },
  },
};
</script>
<style lang="scss" scoped>
.input-width {
  width: 300px;
}
</style>