<template>
  <!-- 模块管理 -->
  <div>
    <!-- 查询条件 -->
    <el-form :inline="true" :model="queryData">
      <el-form-item label="模块名称">
        <el-input
          v-model="queryData.queryData.name"
          placeholder="请输入内容"
        ></el-input>
      </el-form-item>
      <el-form-item label="URL">
        <el-input
          v-model="queryData.queryData.url"
          placeholder="请输入内容"
        ></el-input>
      </el-form-item>
      <el-form-item label="是否激活">
        <el-select v-model="queryData.queryData.isactive" placeholder="是否激活">
          <el-option label="全部" value></el-option>
          <el-option label="已激活" :value="1"></el-option>
          <el-option label="未激活" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否隐藏">
        <el-select v-model="queryData.queryData.hidden" placeholder="是否隐藏">
          <el-option label="全部" value></el-option>
          <el-option label="显示" :value="1"></el-option>
          <el-option label="隐藏" :value="0"></el-option>
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
        prop="name"
        label="模块名称"
        show-overflow-tooltip
        align="center"
      ></el-table-column>
      <el-table-column
        prop="url"
        label="模块路径"
        show-overflow-tooltip
        align="center"
      ></el-table-column>
      <el-table-column        
        label="是否激活"
        show-overflow-tooltip
        align="center"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.isactive == 1 ? 'success' : 'danger'"
            disable-transitions
          >{{scope.row.isactive==1 ? '已激活' : '未激活'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column        
        label="是否隐藏"
        show-overflow-tooltip
        align="center"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.hidden == 1 ? 'success' : 'danger'"
            disable-transitions
          >{{scope.row.hidden==1 ? '显示' : '隐藏'}}</el-tag>
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
    <module-detail
      :visible="dialogAddVisible"
      :isEdit="false"
      @close="dialogCloce"
    />
    <!-- 弹窗-修改 -->
    <module-detail
      :visible="dialogEditVisible"
      :isEdit="true"
      @close="dialogCloce"
      ref="edit"
    />
  </div>
</template>

<script>
import { fetchList, deleteModule } from "@/api/module";
import { listAll } from "@/api/menu";
import ModuleDetail from "./moduleDetail";

export default {
  name: "Module",
  components: { ModuleDetail },
  props: [],
  data() {
    return {
      loading: true, //加载状态
      dialogAddVisible: false, //显示添加弹窗
      dialogEditVisible: false, //显示修改弹窗
      queryData: {
        //查询条件
        queryData: {
          name: "",
          url: "",
          isactive: "",
          hidden: ""
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
      menuList: []  //菜单列表
    };
  },
  watch: {},
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
        deleteModule(rows.id).then((response) => {
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
      this.$refs.edit.editGetModule();
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
    getMenuListAll(){ //获取所有菜单
      listAll().then((response)=>{
        this.menuList = response.data;
      })
    }
  },
  created() {
    this.query();
    this.getMenuListAll();
  },
  filters: {
    getMenuFilter(val,menuList){ //得到对应的所属菜单中文
      let menuName = menuList.find(function(item){
        return item.id==val;
      })
      if(menuName!=null){
        return menuName.title;
      }
    }
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