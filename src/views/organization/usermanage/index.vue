<template>
  <!-- 用户管理 -->
  <div class="padding-container">
    <!-- 功能按钮 -->
    <el-form :inline="true" :model="queryData" class="demo-form-inline">
      <el-form-item label="昵称">
        <el-input v-model="queryData.queryData.nickName" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="是否激活">
        <el-select v-model="queryData.queryData.isactive" placeholder="是否激活">
          <el-option label="全部" value></el-option>
          <el-option label="激活" value="1"></el-option>
          <el-option label="未激活" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="queryData.queryData.username" placeholder="请输入内容"></el-input>
      </el-form-item>
      <div class="right">
        <el-form-item>
          <el-button type="primary" @click="query">查询</el-button>
        </el-form-item>
      </div>
    </el-form>

    <el-row>
      <el-button type="primary" @click="dialogAddVisible = true">添加</el-button>
      <!-- <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>-->
    </el-row>
    <!-- 表格 -->
    <el-table
      ref="multipleTable"
      highlight-current-row
      stripe
      border
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      v-loading="loading"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="50" align="center"></el-table-column>
      <el-table-column prop="nickname" label="昵称" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column prop="email" label="邮箱" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column prop="phone" label="电话" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column prop="username" label="账号" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column prop="isactive" label="是否激活" show-overflow-tooltip align="center">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.isactive == 1 ? 'success' : 'danger'"
            disable-transitions
          >{{scope.row.isactive==1 ? '已激活' : '未激活'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="expirydate" label="有效期" show-overflow-tooltip align="center">
        <template slot-scope="scope">
          <span
            :style="{color: isExpire(scope.row.expirydate) ? 'red' : ''}"
          >{{scope.row.expirydate ? scope.row.expirydate.substr(0,10) : ""}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="400" align="center">
        <!-- fixed="right"  -->
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleRole(scope.$index, scope.row)">角色分配</el-button>
          <el-button size="mini" type="primary" @click="handleAuth(scope.$index, scope.row)">权限分配</el-button>
          <el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click.native.prevent="deleteRow(scope.$index, tableData)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
    </div>

    <!-- 分页 -->
    <div class="block">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNation.pageNum"
        :page-sizes="pageNation.pageSizes"
        :page-size="pageNation.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageNation.total"
      ></el-pagination>
    </div>

    <!-- 弹窗-添加 -->
    <add :visible="dialogAddVisible" @close="dialogCloce" />
    <!-- 弹窗-修改 -->
    <edit :visible="dialogEditVisible" @close="dialogCloce" ref="edit" />
  </div>
</template>

<script>
import { getUserList, delUser } from "@/api/usermanage";
import add from "./add";
import edit from "./edit";

export default {
  name: "Organization",
  components: { add, edit },
  props: [],
  data() {
    return {
      loading: true, //加载状态
      dialogAddVisible: false, //显示添加弹窗
      dialogEditVisible: false, //显示修改弹窗
      queryData: {
        //查询条件
        queryData: {
          username: null,
          isactive: null,
          expirydate: null
        }
      },
      pageNation: {
        //分页
        pageNum: 1,
        pageSize: 10,
        pageSizes: [10, 20, 30, 40, 50],
        total: 0
      },
      tableData: null, //表
      multipleSelection: [] //选择的数据
    };
  },
  watch: {},
  computed: {},
  methods: {
    query() {  //查询
      this.loading = true;
      this.queryData.pageNum = this.pageNation.pageNum;
      this.queryData.pageSize = this.pageNation.pageSize;
      getUserList(this.queryData)
        .then(response => {
          let data = response.data;
          this.tableData = data.list;
          this.pageNation.pageNum = data.pageNum;
          this.pageNation.total = data.total;
        })
        .finally(() => (this.loading = false));
    },
    deleteRow(index, rows) {  //删除单条数据按钮
      this.$confirm("是否确认删除？").then(() => {
        delUser(rows[index].id).then(response => {
          if (response.code == 200) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.query()
          } else {
            this.$message({
              message: "删除失败",
              type: "error"
            });
            console.log(response.message);
          }
        });
      });
    },
    dialogCloce($event) {  //添加弹窗关闭事件
      this.dialogAddVisible = $event.close;
      this.dialogEditVisible = $event.close;
      if ($event.query) this.query();
    },
    // handleRole(index, row) {
    //   //角色分配按钮
    // },
    // handleAuth(index, row) {
    //   //权限分配按钮
    // },
    handleEdit(index, row) {  //修改按钮
      this.dialogEditVisible = true;
      let form = JSON.parse(JSON.stringify(row));
      form.isactive = form.isactive.toString();
      this.$refs.edit.form = form;
    },    
    handleSelectionChange(val) { //多选
      this.multipleSelection = val;
    },
    //分页
    handleSizeChange(val) {
      //选择每页多少条时
      this.pageNation.pageSize = val;
      this.query();
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      // 当前页改变时
      this.pageNation.pageNum = val;
      this.query();
      // console.log(`当前页: ${val}`);
    },
    isExpire(expirydate) {
      //是否过期
      if (expirydate && new Date(expirydate.substr(0, 10)) < new Date())
        return true;
      else return false;
    }
  },
  created() {
    this.query();
  }
};
</script>
<style lang="scss" scoped>
.el-row {
  padding-bottom: 10px;
}
.right {
  float: right;
}
</style>