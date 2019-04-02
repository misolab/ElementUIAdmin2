<template>
  <section>
    <!-- 툴바 -->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.name" placeholder="이름"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="filters.keyman" placeholder="키맨"></el-input>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="filters.date"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="~"
            start-placeholder="Start"
            end-placeholder="End"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="loadData">검색</el-button>
          <el-button type="warning" v-on:click="loadData">초기화</el-button>
        </el-form-item>
        <el-form-item style="float:right;">
          <el-button type="primary" @click="handleAdd">신규 등록</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!-- 테이블 -->
    <el-table
      :data="users"
      highlight-current-row
      v-loading="listLoading"
      style="width: 100%;"
    >
      <el-table-column prop="sid" label="계약번호" width="100"></el-table-column>
      <el-table-column prop="regDate" label="계약일" width="120" sortable></el-table-column>
      <el-table-column prop="name" label="이름" width="100" sortable></el-table-column>
      <el-table-column prop="payment" label="금액" min-width="100" sortable></el-table-column>
      <el-table-column prop="rate" label="비율" min-width="100" sortable></el-table-column>
      <el-table-column prop="keyman" label="키맨" min-width="80" sortable></el-table-column>
      <el-table-column prop="memo" label="메모" min-width="100"></el-table-column>
      <el-table-column prop="orgId" label="원계약번호" width="100"></el-table-column>

      <el-table-column label width="150">
        <template scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">편집</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">삭제</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 페이징 -->
    <el-col :span="24" class="toolbar">
      <el-pagination
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :page-size="20"
        :total="total"
        style="float:right;"
      ></el-pagination>
    </el-col>

    <!-- 모달창 -->
  </section>
</template>

<script>
export default {
  name: "sales",
  data() {
    return {
        filters: {
            name: "",
            keyman: "",
            date: ""
        },
        users: [],
        total: 0,
        page: 1,
        listLoading: false,




    };
  },
  methods: {
      loadData(){
          this.total = 1000;
          this.users = [
              {sid: 1, regDate: "2018-03-01", name: "김고객",payment: "1,000", rate:"10%", keyman: "최키맨",memo: "", orgId:""},
              {sid: 2, regDate: "2018-03-10", name: "백고객",payment: "10,000", rate:"5%", keyman: "최키맨",memo: "", orgId:""},
              {sid: 3, regDate: "2018-03-15", name: "최고객",payment: "3,000", rate:"15%", keyman: "한키맨",memo: "", orgId:""},
              {sid: 4, regDate: "2018-03-20", name: "김고객",payment: "5,000", rate:"5%", keyman: "최키맨",memo: "금액 변경", orgId:"1번"},
          ];
      },
      handleAdd(){

      },
  },
  mounted() {
      this.loadData()
  }
};
</script>

<style scoped>
</style>
