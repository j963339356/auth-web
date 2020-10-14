<template>
  <!-- 添加模块 -->
  <div>
    <el-dialog
      title="添加模块"
      :visible="visible"
      :before-close="handleClose"
      width="40%"
    >
      <el-form
        :model="modules"
        ref="modulesFrom"
        label-width="150px"
        :rules="rules"
      >
        <el-form-item label="模块名称" prop="name" required>
          <el-input v-model="modules.name" class="input-width"></el-input>
        </el-form-item>
        <el-form-item label="URL" prop="url" required>
          <el-input v-model="modules.url" class="input-width"></el-input>
        </el-form-item>
        <el-form-item label="是否激活" required>
          <el-switch
            v-model="modules.isactive"
            :active-value="1"
            :inactive-value="0"
          ></el-switch>
        </el-form-item>
        <el-form-item label="是否隐藏" required>
          <el-switch
            v-model="modules.hidden"
            :active-value="0"
            :inactive-value="1"
          ></el-switch>
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
import { createModule, updateModule, getModule } from "@/api/module";

//默认
const defaultModule = {
  name: "",
  url: "",
  isactive: 1,
  hidden: 1,
};

export default {
  name: "ModulesDetail",
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
    },
  },
  data() {
    return {
      gutter: 100, //表单间距
      id: null, //打开窗口时查询的id
      modules: Object.assign({}, defaultModule),
      categoryOptions: [],
      rules: {
        name: [
          { required: true, message: "请输入模块名称", trigger: "blur" },
          {
            min: 2,
            max: 140,
            message: "长度在 2 到 140 个字符",
            trigger: "blur",
          },
        ],
        url: [
          {
            required: true,
            message: "请输入模块URL，格式为/api/menu/listAll",
            trigger: "blur",
          },
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
    if (!this.isEdit) {
      this.modules = Object.assign({}, defaultModule); 
    }   
  },
  watch: {
    visible: function (val) {
    },
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
    handleSave() {
      this.$refs["modulesFrom"].validate((valid) => {
        if (valid) {
          this.$confirm("是否提交数据", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() => {
            if (this.isEdit) {
              updateModule(this.modules.id, this.modules).then(
                (response) => {
                  this.$message({
                    message: "修改成功",
                    type: "success",
                    duration: 1000,
                  });
                  this.$emit("close", { close: false, query: true });
                }
              );
            } else {
              createModule(this.modules).then((response) => {
                this.$refs["modulesFrom"].resetFields();
                this.resetForm("modulesFrom");
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
    editGetModule() {
      //如果是修改，就获取这个数据填到表中
      getModule(this.id).then((response) => {
        this.modules = response.data;
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.modules = Object.assign({}, defaultModule);
    },
  },
};
</script>
<style lang="scss" scoped>
.input-width {
  width: 300px;
}
</style>