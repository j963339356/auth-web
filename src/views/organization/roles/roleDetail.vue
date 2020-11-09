<template>
  <!-- 添加角色 -->
  <div>
    <el-dialog
      title="添加角色"
      :visible="visible"
      :before-close="handleClose"
      width="40%"
    >
      <el-form
        :model="role"
        ref="roleFrom"
        label-width="150px"
        :rules="rules"
      >
        <el-form-item label="角色名称" prop="name" required>
          <el-input v-model="role.name" class="input-width"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sort" required>
          <el-input v-model="role.sort" class="input-width"></el-input>
        </el-form-item>
        <el-form-item label="是否激活" required>
          <el-switch
            v-model="role.isactive"
            :active-value="1"
            :inactive-value="0"
          ></el-switch>
        </el-form-item>
        <el-form-item label="角色类型">
          <el-select v-model="role.type" placeholder="请选择菜单">
            <el-option label="普通角色" :value="1"></el-option>
            <el-option label="管理员角色" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            type="textarea"
            autosize
            placeholder="请输入内容"
            v-model="role.description"
            class="input-width"
          ></el-input>
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
import { createRole, updateRole, getRole } from "@/api/role";

//默认
const defaultRole = {
  name: "",
  type: 1,
  sort: 0,
  isactive: 1,
  description: "",
};

export default {
  name: "RoleDetail",
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
      role: Object.assign({}, defaultRole),
      rules: {
        sort: [
          { required: true, message: "请填写排序，默认填0", trigger: "blur" },
        ],
        name: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
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
      this.role = Object.assign({}, defaultRole); 
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
      this.$refs["roleFrom"].validate((valid) => {
        if (valid) {
          this.$confirm("是否提交数据", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() => {
            if (this.isEdit) {
              updateRole(this.role.id, this.role).then(
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
              createRole(this.role).then((response) => {
                this.$refs["roleFrom"].resetFields();
                this.resetForm("roleFrom");
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
    editGetRole() {
      //如果是修改，就获取这个数据填到表中
      getRole(this.id).then((response) => {
        this.role = response.data;
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.role = Object.assign({}, defaultRole);
    },
  },
};
</script>
<style lang="scss" scoped>
.input-width {
  width: 300px;
}
</style>