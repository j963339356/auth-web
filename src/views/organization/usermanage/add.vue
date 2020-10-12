<template>
  <!-- 添加 -->
  <div>
    <el-dialog title="添加用户" :visible="visible" :before-close="handleClose">
      <el-form :model="form" ref="form" class="demo-form-inline" label-width="90px" :rules="rules">
        <el-row :gutter="gutter">
          <el-col :span="11">
            <el-form-item label="昵称" prop="nickname" required>
              <el-input v-model="form.nickname"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="是否激活" required>
              <el-select v-model="form.isactive" placeholder="是否激活">
                <el-option label="激活" value="1"></el-option>
                <el-option label="未激活" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="gutter">
          <el-col :span="11">
            <el-form-item label="账号" prop="username" required>
              <el-input v-model="form.username"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="密码" prop="password" required>
              <el-input type="password" v-model="form.password"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="gutter">
          <el-col :span="11">
            <el-form-item label="电话">
              <el-input v-model="form.phone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="邮箱">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="gutter">
          <el-col :span="11">
            <el-form-item label="有效期" prop="expirydate" required>
              <el-date-picker
                v-model="form.expirydate"
                type="date"
                placeholder="请选择日期"
                format="yyyy-MM-dd"
                @change="dateFormat"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addUser,validUser } from "@/api/usermanage";

export default {
  name: "add",
  components: {},
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    //表单校验方法
    var validateUsernamePassword = (rule, value, callback) => {
      let reg = /^[a-zA-Z0-9_]+$/
      if(!value){
        return callback(new Error('不能为空'))
      }
      else if( !reg.test(value) ){
        return callback(new Error('只能填写英文、数字、下划线'))
      }      
      callback()
    };
    var validateUsernameIsExist = (rule, value, callback) => {
      if(value){
        validUser(value).then(response =>{
          if(response.code == 200 && response.data===1){
            callback(new Error('用户已存在'))
          }
          else{
            callback()
          }
        })        
      }
    }
    return {
      isExistUsername: false,
      form: {
        username: "",
        password: "",
        nickname: "",
        profile: "",
        phone: "",
        email: "",
        age: "",
        isactive: "1",
        expirydate: ""
      },
      gutter: 100, //表单间距
      rules: {
        //校验
        nickname: [{ required: true, message: "昵称不能为空" }],
        username: [{ validator: validateUsernamePassword}, { validator: validateUsernameIsExist, trigger: 'blur'}],
        isactive: [{ required: true, message: "请选择是否激活" }],
        password: [{ validator: validateUsernamePassword }],
        expirydate: [{ required: true, message: "请选择有效期" }]
      }
    };
  },
  watch: {},
  computed: {},
  methods: {
    handleSave() {
      let _this = this
      this.$refs["form"].validate(valid => {
        if (valid) {
          //保存
          addUser(_this.form).then(response => {
            if (response.code == 200) {
              _this.$message({
                message: "添加成功",
                type: "success"
              });
            } else {
              _this.$message({
                message: "添加失败",
                type: "error"
              });
              console.log(response.message);
            }
            this.$emit("close", { close: false, query: true });
          });
        } else {
          console.log("验证未通过，请按要求填写表单!!");
          return false;
        }
      });
    },
    handleClose(done) {
      //取消
      this.$confirm("确认关闭？")
        .then(() => {
          done;
          this.$emit("close", { close: false, query: false });
        })
        .catch(_ => {
          console.log(_);
        })
        .finally(() => {
          
        });
    },
    dateFormat(val){
      this.form.expirydate = val
    }
  }
};
</script>
<style lang="scss" scoped>
</style>