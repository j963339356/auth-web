<template>
  <!-- 添加菜单 -->
  <div>
    <el-dialog
      title="添加资源"
      :visible="visible"
      :before-close="handleClose"
      width="40%"
    >
      <el-form
        :model="resource"
        ref="resourceFrom"
        label-width="150px"
        :rules="rules"
      >
        <el-form-item label="编号" prop="id" required>
          <el-input v-model="resource.id" class="input-width"></el-input>
        </el-form-item>
        <el-form-item label="资源名称" prop="name" required>
          <el-input v-model="resource.name" class="input-width"></el-input>
        </el-form-item>
        <el-form-item label="资源代码" prop="code" required>
          <el-input v-model="resource.code" class="input-width"></el-input>
        </el-form-item>
        <el-form-item label="URL" prop="url" required>
          <el-input v-model="resource.url" class="input-width"></el-input>
        </el-form-item>
        <el-form-item label="所属菜单" required>
          <!-- <el-select v-model="resource.menuId" placeholder="所属菜单"> -->
          <!-- <el-option v-for="item in categoryOptions"
                         :key="item.id"
                         :label="item.title"
                         :value="item.id">
              </el-option> -->
          <!-- </el-select> -->
          <el-cascader
            v-model="resource.menuId"
            :options="categoryOptions"
            :props="{ checkStrictly: true, emitPath: false }"
            clearable
          ></el-cascader>
        </el-form-item>
        <el-form-item label="是否激活" required>
          <el-switch
            v-model="resource.isactive"
            :active-value="1"
            :inactive-value="0"
          ></el-switch>
        </el-form-item>
        <el-form-item label="请求类型">
          <el-select v-model="resource.request" placeholder="请选择菜单">
            <el-option label="POST" value="post"></el-option>
            <el-option label="GET" value="get"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            type="textarea"
            autosize
            placeholder="请输入内容"
            v-model="resource.description"
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
import { createResource, updateResource, getResource } from "@/api/resource";
import { listAll, fetchTreeList } from "@/api/menu";

//默认
const defaultResource = {
  id: "",
  name: "",
  code: null,
  url: "",
  menuId: "",
  isactive: 1,
  request: "get",
  description: "",
};

export default {
  name: "ResourceDetail",
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
      resource: Object.assign({}, defaultResource),
      categoryOptions: [],
      rules: {
        menuId: [
          { required: true, message: "请添加所属菜单", trigger: "blur" },
        ],
        name: [
          { required: true, message: "请输入资源名称", trigger: "blur" },
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
            message: "请输入资源代码，格式为/api/menu/listAll",
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
      this.resource = Object.assign({}, defaultResource); 
    }
    this.getSelectMenuList();      
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
    getSelectMenuList() {
      //获取菜单下拉列表
      fetchTreeList().then((response) => {
        // console.log(response.data);
        this.setCascader(this.categoryOptions, response.data);
        // this.categoryOptions.unshift({ id: 0, title: "无菜单" });
      });
    },
    setCascader(result, data) {
      data.forEach((element) => {
        let a = {};
        a["value"] = element.id;
        a["label"] = element.title;
        if (element.children.length > 0) {
          this.setCascader(a["children"] = [], element.children);
        }
        result.push(a);
      });
    },
    handleSave() {
      this.$refs["resourceFrom"].validate((valid) => {
        if (valid) {
          this.$confirm("是否提交数据", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() => {
            if (this.isEdit) {
              updateResource(this.resource.id, this.resource).then(
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
              createResource(this.resource).then((response) => {
                this.$refs["resourceFrom"].resetFields();
                this.resetForm("resourceFrom");
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
    editGetResource() {
      //如果是修改，就获取这个数据填到表中
      getResource(this.id).then((response) => {
        this.resource = response.data;
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.resource = Object.assign({}, defaultResource);
    },
  },
};
</script>
<style lang="scss" scoped>
.input-width {
  width: 300px;
}
</style>