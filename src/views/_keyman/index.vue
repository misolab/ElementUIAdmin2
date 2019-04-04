<template>
  <section>
    <!--검색바-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input style="width: 100px" v-model="filters.name" placeholder="이름"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input style="width: 100px" v-model="filters.phone" placeholder="전화번호"></el-input>
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
          <el-button  size="medium" type="primary" @click="handleAdd">키맨 등록</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!--테이블-->
    <el-table
      :data="users"
      highlight-current-row
      v-loading="listLoading"
      style="width: 100%;"
    >
      <el-table-column align="center" type="index" label="번호" min-width="60"></el-table-column>
      <el-table-column align="center" prop="name" label="이름" min-width="100" sortable></el-table-column>
      <el-table-column align="center" prop="phone" label="전화번호" min-width="120"></el-table-column>
      <el-table-column align="center" prop="regDate" label="등록일" min-width="100" sortable></el-table-column>
      <el-table-column align="center" prop="parent" label="부모(키맨)" min-width="90" sortable></el-table-column>
      <el-table-column align="center" prop="memo" label="메모" min-width="100"></el-table-column>

      <el-table-column label width="140">
        <template scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">편집</el-button>
          <el-button type="danger" size="mini" @click="handleDel(scope.$index, scope.row)">삭제</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--페이징-->
    <el-col :span="24" class="toolbar">
      <el-pagination
        layout="prev, pager, next"
        :page-size="20"
        :total="total"
        style="float:right;"
      ></el-pagination>
    </el-col>

    <!-- 모달창 -->
    <el-dialog title="키맨 정보 수정" :visible.sync="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
        <el-form-item label="이름" prop="name">
          <el-input v-model="editForm.name" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="전화번호" prop="phone">
          <el-input v-model="editForm.phone" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="부모(키맨)" prop="parent">
          <el-input v-model="editForm.parent" auto-complete="off"></el-input>
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

    <el-dialog title="신규 키맨 등록" :visible.sync="addFormVisible" :close-on-click-modal="false">
      <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
        <el-form-item label="이름" prop="name">
          <el-input v-model="addForm.name" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="전화번호" prop="phone">
          <el-input v-model="addForm.phone" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="등록일" prop="regDate">
          <el-date-picker v-model="addForm.regDate" type="date" placeholder="날짜를 선택해주세요"></el-date-picker>
        </el-form-item>

        <el-form-item label="부모(키맨)" prop="parent">
          <el-input v-model="addForm.parent" auto-complete="off"></el-input>
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
  name: "keyman",
  data() {
    return {
      filters: {
        name: "",
        phone: "",
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
        name: "",
        phone: "",
        regDate: "",
        parent: "",
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
        name: "",
        phone: "",
        regDate: "",
        parent: "",
        memo: ""
      }
      //  ----------------------
    };
  },
  methods: {
    editSubmit() {
      console.log("addSubmit");
    },
    addSubmit() {
      console.log("addSubmit");
    },
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

    loadData() {
      this.total = 1000;
      this.users = [
        {
          num: 1,
          name: "한키맨",
          phone: "010-1111-2222",
          regDate: "2018-03-01",
          parent: "",
          memo: ""
        },
        {
          num: 2,
          name: "최키맨",
          phone: "010-3333-4444",
          regDate: "2018-03-02",
          parent: "한키맨",
          memo: ""
        },
        {
          num: 3,
          name: "박 키맨",
          phone: "010-5555-6666",
          regDate: "2018-03-01",
          parent: "",
          memo: "한키맨 큰아들"
        }
      ];
    }
  },
  components: {},
  mounted() {
    this.loadData();
  }
};
</script>

<style scoped>
</style>
