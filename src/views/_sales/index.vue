<template>
  <section>
    <!-- 툴바 -->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input style="width: 100px" v-model="filters.name" placeholder="이름"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input style="width: 100px" v-model="filters.keyman" placeholder="전화번호"></el-input>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            style="width: 240px; font-size: 10px"
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
          <el-button size="medium" plain type="primary" v-on:click="loadData">검색</el-button>
          <el-button size="medium" plain type="warning" v-on:click="loadData">초기화</el-button>
        </el-form-item>
        <el-form-item style="float:right;">
          <el-button size="medium" type="primary" @click="handleAdd">계약 등록</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!-- 테이블 -->
    <el-table :data="users" highlight-current-row v-loading="listLoading" style="width: 100%;">
      <el-table-column align="center" prop="sid" label="계약" min-width="60"></el-table-column>
      <el-table-column align="center" prop="regDate" label="계약일" min-width="100" sortable></el-table-column>
      <el-table-column align="center" prop="name" label="이름" min-width="80"></el-table-column>
      <el-table-column align="center" prop="payment" label="금액" min-width="100" sortable></el-table-column>
      <el-table-column align="center" prop="rate" label="비율" min-width="80" sortable></el-table-column>
      <el-table-column align="center" prop="keyman" label="키맨" min-width="80" sortable></el-table-column>
      <el-table-column align="center" prop="memo" label="메모" min-width="100"></el-table-column>
      <el-table-column align="center" prop="orgId" label="원계약" min-width="60"></el-table-column>

      <el-table-column label min-width="140">
        <template scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">편집</el-button>
          <el-button type="danger" size="mini" @click="handleDel(scope.$index, scope.row)">삭제</el-button>
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
    <el-dialog title="계약 내용 수정" :visible.sync="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
        <el-form-item label="계약일" prop="regDate">
          <el-date-picker v-model="editForm.regDate" type="date" placeholder="날짜를 선택해주세요"></el-date-picker>
        </el-form-item>

        <el-form-item label="이름" prop="name">
          <el-input v-model="editForm.name" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="금액" prop="payment">
          <el-input v-model="editForm.payment" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="비율" prop="rate">
          <el-input v-model="editForm.rate" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="메모">
          <el-input type="textarea" v-model="editForm.memo"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">취소</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">저장</el-button>
      </div>
    </el-dialog>

    <el-dialog title="신규 계약 등록" :visible.sync="addFormVisible" :close-on-click-modal="false">
      <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
        <el-form-item label="계약일" prop="regDate">
          <el-date-picker v-model="addForm.regDate" type="date" placeholder="날짜를 선택해주세요"></el-date-picker>
        </el-form-item>

        <el-form-item label="이름" prop="name">
          <el-input v-model="addForm.name" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="금액" prop="payment">
          <el-input v-model="addForm.payment" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="비율" prop="rate">
          <el-input v-model="addForm.rate" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="메모">
          <el-input type="textarea" v-model="addForm.memo"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">취소</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">저장</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import util from "../../utils/util";

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

      //  ------  add -------
      addFormVisible: false,
      addLoading: false,
      addFormRules: {
        name: [
          { required: true, message: "이름을 입력해주세요", trigger: "blur" }
        ],
        phone: [
          {
            required: true,
            message: "전화번호를 입력해주세요",
            trigger: "blur"
          }
        ],
        regDate: [
          { required: true, message: "등록일을 선택해주세요", trigger: "blur" }
        ]
      },
      // 신규 입력정보
      addForm: {
        regDate: "",
        name: "",
        payment: "",
        rate: "",
        memo: ""
      },
      //  ----------------------

      //  ------  edit  -------
      editFormVisible: false,
      editLoading: false,
      editFormRules: {
        name: [
          { required: true, message: "이름을 입력해주세요", trigger: "blur" }
        ],
        phone: [
          {
            required: true,
            message: "전화번호를 입력해주세요",
            trigger: "blur"
          }
        ],
        regDate: [
          { required: true, message: "등록일을 선택해주세요", trigger: "blur" }
        ]
      },
      editForm: {
        regDate: "",
        name: "",
        payment: "",
        rate: "",
        memo: ""
      }
      //  ----------------------
    };
  },
  methods: {
    handleAdd: function() {
      console.log("handleAdd");
      this.addFormVisible = true;
      this.addForm.regDate = util.formatDate.format(new Date(), "yyyy-MM-dd");
    },
    handleEdit: function(index, row) {
      console.log("handleEdit");
      this.editFormVisible = true;
      this.editForm = Object.assign({}, row);

      console.log(this.editForm);
    },
    handleDel: function(index, row) {
      this.$confirm("본 계약 내용을 삭제하시겠습니까?", "확인", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning"
      }).then(() => {});
    },
    loadData() {
      this.total = 1000;
      this.users = [
        {
          sid: 1,
          regDate: "2018-03-01",
          name: "김고객",
          payment: "1,000",
          rate: "10%",
          keyman: "최키맨",
          memo: "",
          orgId: ""
        },
        {
          sid: 2,
          regDate: "2018-03-10",
          name: "백고객",
          payment: "10,000",
          rate: "5%",
          keyman: "최키맨",
          memo: "",
          orgId: ""
        },
        {
          sid: 3,
          regDate: "2018-03-15",
          name: "최고객",
          payment: "3,000",
          rate: "15%",
          keyman: "한키맨",
          memo: "",
          orgId: ""
        },
        {
          sid: 4,
          regDate: "2018-03-20",
          name: "김고객",
          payment: "5,000",
          rate: "5%",
          keyman: "최키맨",
          memo: "금액 변경",
          orgId: "1번"
        }
      ];
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>

<style scoped>
</style>
