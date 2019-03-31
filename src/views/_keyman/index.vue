<template>
  <div>
    <ToolBar>
      <!-- 검색조건 -->
      <div>
        <el-input style="width: 140px"></el-input>

        <!-- 등록 버튼 -->
        <el-button type="primary" icon="el-icon-plus" @click="showDialog()">등록</el-button>
      </div>
    </ToolBar>
    <!-- 리스트 -->
    <el-table :data="roleData" border ref="table" style="width: 100%">
      <el-table-column prop="key" label="角色key"></el-table-column>
      <el-table-column prop="name" label="角色名称"></el-table-column>
      <el-table-column prop="description" label="描述"></el-table-column>
      <el-table-column label="操作" :render-header="tableAction" width="120">
        <template slot-scope="scope">
          <el-button
            @click="editRole(scope.row)"
            type="primary"
            icon="el-icon-edit"
            size="small"
            circle
          ></el-button>
          <el-button
            @click="currentEditPermissions = scope.row"
            type="success"
            icon="el-icon-setting"
            size="small"
            circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 페이징 -->
    <el-pagination :page-size="20" :pager-count="11" layout="prev, pager, next" :total="1000"></el-pagination>

    <!-- 등록/수정 팝업 -->
    <el-dialog title="Tips" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <span>This is a message</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ToolBar from "@/components/ToolBar.vue";

export default {
  data() {
    return {
      dialogTitle: "키맨등록/수정",
      dialogVisible: false,
      roleData: [
        {
          id: 1,
          key: "SuperAdmin",
          name: "超级管理员",
          description: "具有最高权限,全站唯一"
        },
        {
          id: 2,
          key: "NormalAdmin",
          name: "普通管理员",
          description: "拥有所有权限,除权限管理权限"
        },
        { id: 4, key: "Admin", name: "一般管理员", description: "只有查看权限" }
      ]
    };
  },
  methods: {
    showDialog() {
      this.dialogVisible = true;
    },
    handleClose(done) {
      this.$confirm("Are you sure to close this dialog?")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  },
  components: {
    ToolBar
  }
};
</script>

<style scoped>
</style>
