<template>
  <!-- 资源管理 -->
  <div>
    <!-- 查询条件 -->
    <el-form :inline="true" :model="queryData">
      <el-form-item label="菜单名称">
        <el-input
          v-model="queryData.queryData.title"
          placeholder="请输入内容"
        ></el-input>
      </el-form-item>
      <el-form-item label="菜单级数">
        <el-select v-model="queryData.queryData.level" placeholder="菜单级数">
          <el-option label="全部" value></el-option>
          <el-option label="一级菜单" :value="0"></el-option>
          <el-option label="二级菜单" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <div class="right">
        <el-form-item>
          <el-button type="primary" @click="query">查询</el-button>
        </el-form-item>
      </div>
    </el-form>

    <el-row>
      <el-button type="primary" @click="dialogAddVisible = true"
        >添加</el-button
      >
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
      <!-- <el-table-column type="selection" width="50" align="center"></el-table-column> -->
      <el-table-column
        prop="id"
        label="编号"
        show-overflow-tooltip
        align="center"
      ></el-table-column>
      <el-table-column
        prop="title"
        label="菜单名称"
        show-overflow-tooltip
        align="center"
      ></el-table-column>
      <el-table-column
        prop="level"
        label="菜单级数"
        show-overflow-tooltip
        align="center"
      >
        <template slot-scope="scope">{{
          scope.row.level | levelFilter
        }}</template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="前端名称"
        show-overflow-tooltip
        align="center"
      ></el-table-column>
      <el-table-column
        prop="icon"
        label="前端图标"
        show-overflow-tooltip
        align="center"
      >
        <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column
        prop="hidden"
        label="是否显示"
        show-overflow-tooltip
        align="center"
      >
        <template slot-scope="scope">
          <el-switch
            :active-value="1"
            :inactive-value="0"
            v-model="scope.row.hidden"
            @change="handleHiddenChange(scope.$index, scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column
        prop="sort"
        label="排序"
        show-overflow-tooltip
        align="center"
      ></el-table-column>
      <el-table-column label="查看下级" show-overflow-tooltip align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            :disabled="scope.row.level | disableNextLevel"
            @click="handleShowNextLevel(scope.$index, scope.row)"
            >查看下级
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250" align="center">
        <!-- fixed="right"  -->
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            @click="handleEdit(scope.$index, scope.row.id)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click.native.prevent="deleteRow(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px"></div>

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
    <resource-detail
      :visible="dialogAddVisible"
      :isEdit="false"
      @close="dialogCloce"
    />
    <!-- 弹窗-修改 -->
    <resource-detail
      :visible="dialogEditVisible"
      :isEdit="true"
      @close="dialogCloce"
      ref="edit"
    />
  </div>
</template>

<script>
import { fetchList, deleteMenu, updateHidden } from "@/api/menu";
import ResourceDetail from "./resourceDetail";

export default {
  name: "Resource",
  components: { ResourceDetail },
  props: [],
  data() {
    return {
      loading: true, //加载状态
      dialogAddVisible: false, //显示添加弹窗
      dialogEditVisible: false, //显示修改弹窗
      queryData: {
        //查询条件
        queryData: {
          title: null,
          level: 0,
          pid: "0",
        },
      },
      pageNation: {
        //分页
        pageNum: 1,
        pageSize: 10,
        pageSizes: [10, 20, 30, 40, 50],
        total: 0,
      },
      tableData: null, //表
      multipleSelection: [], //选择的数据
    };
  },
  watch: {
    'queryData.queryData.level': function(val){
      if(val===1||!val){this.queryData.queryData.pid=null}
    }
  },
  computed: {},
  methods: {
    query() {
      //查询
      this.loading = true;
      this.queryData.pageNum = this.pageNation.pageNum;
      this.queryData.pageSize = this.pageNation.pageSize;
      fetchList(this.queryData)
        .then((response) => {
          let data = response.data;
          this.tableData = data.list;
          this.pageNation.pageNum = data.pageNum;
          this.pageNation.total = data.total;
        })
        .finally(() => (this.loading = false));
    },
    deleteRow(index, rows) {
      //删除单条数据按钮
      this.$confirm("是否确认删除？").then(() => {
        deleteMenu(rows.id).then((response) => {
          if (response.code == 200) {
            this.$message({
              message: "删除成功",
              type: "success",
            });
            this.query();
          } else {
            this.$message({
              message: "删除失败",
              type: "error",
            });
            console.log(response.message);
          }
        });
      });
    },
    dialogCloce($event) {
      //添加弹窗关闭事件
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
    handleEdit(index, id) {
      //修改按钮
      this.dialogEditVisible = true;
      this.$refs.edit.id = id;
      this.$refs.edit.editGetMenu();
    },
    handleSelectionChange(val) {
      //多选
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
    handleHiddenChange(index, row) {  //修改是否显示状态
      updateHidden(row.id, { hidden: row.hidden }).then((response) => {
        this.$message({
          message: "修改成功",
          type: "success",
          duration: 1000,
        });
      });
    },
    handleShowNextLevel(index, row) { //显示下级菜单
      this.loading = true;
      fetchList({queryData:{pid: row.id}})
        .then((response) => {
          let data = response.data;
          this.tableData = data.list;
          this.pageNation.pageNum = data.pageNum;
          this.pageNation.total = data.total;
        })
        .finally(() => (this.loading = false));
    },
  },
  created() {
    this.query();
  },
  filters: {
    levelFilter(value) {
      if (value === 0) {
        return "一级";
      } else if (value === 1) {
        return "二级";
      }
    },
    disableNextLevel(value) {
      if (value === 0) {
        return false;
      } else {
        return true;
      }
    },
  },
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