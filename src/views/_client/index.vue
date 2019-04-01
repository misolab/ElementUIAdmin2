<template>
    <section>
        <!-- 검색바 -->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.name" placeholder="이름"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="filters.phone" placeholder="전화번호"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-date-picker
                            v-model="filters.date"
                            type="daterange"
                            align="right"
                            unlink-panels
                            range-separator="~"
                            start-placeholder="Start"
                            end-placeholder="End">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getUsers">검색</el-button>
                    <el-button type="warning" v-on:click="getUsers">초기화</el-button>
                </el-form-item>
                <el-form-item style="float:right;">
                    <el-button type="primary" @click="handleAdd">신규 등록</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!-- 테이블 -->
        <el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">

            <el-table-column type="index" label="번호" width="60">
            </el-table-column>
            <el-table-column prop="name" label="이름" width="100" sortable>
            </el-table-column>
            <el-table-column prop="phone" label="전화번호" width="180" sortable>
            </el-table-column>
            <el-table-column prop="regDate" label="등록일" width="120" sortable>
            </el-table-column>
            <el-table-column prop="count" label="건수" width="80" sortable>
            </el-table-column>
            <el-table-column prop="payment" label="금액" min-width="100" sortable>
            </el-table-column>
            <el-table-column prop="keyman" label="키맨" min-width="80" sortable>
            </el-table-column>
            <el-table-column prop="memo" label="메모" min-width="100">
            </el-table-column>

            <el-table-column label="" width="150">
                <template scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">편집</el-button>
                    <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">삭제</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 페이징 -->
        <el-col :span="24" class="toolbar">
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
            </el-pagination>
        </el-col>

        <!-- 모달창 -->
        <el-dialog title="고객 편집" :visible.sync="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
                <el-form-item label="이름" prop="name">
                    <el-input v-model="editForm.name" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="전화번호" prop="phone">
                    <el-input v-model="editForm.phone" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="등록일" prop="regDate">
                    <el-date-picker v-model="editForm.regDate" type="date" placeholder="날짜를 선택해주세요"></el-date-picker>
                </el-form-item>

                <el-form-item label="키맨" prop="keyman">
                    <el-input v-model="editForm.keyman" auto-complete="off"></el-input>
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


        <el-dialog title="신규 등록" :visible.sync="addFormVisible" :close-on-click-modal="false">
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

                <el-form-item label="키맨" prop="keyman">
                    <el-input v-model="addForm.keyman" auto-complete="off"></el-input>
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
    import util from '../../utils/util'
    import {addUser, batchRemoveUser, editUser, removeUser} from '../../api/api';

    export default {
        name: "client",
        data() {
            return {
                filters: {
                    name: '',
                    phone: '',
                    date: ''
                },
                users: [],
                sels: [],//列表选中列
                total: 0,
                page: 1,
                listLoading: false,


                //  ------  add -------
                addFormVisible: false,
                addLoading: false,
                addFormRules: {
                    name: [{ required: true, message: '이름을 입력해주세요', trigger: 'blur' }],
                    phone: [{ required: true, message: '전화번호를 입력해주세요', trigger: 'blur' }],
                    regDate: [{ required: true, message: '등록일을 선택해주세요', trigger: 'blur' }],
                    keyman: [{ required: true, message: '키맨을 입력해주세요', trigger: 'blur' }]
                },
                // 신규고객 입력정보
                addForm: {
                    name: '',
                    phone: "",
                    regDate: '',
                    keyman: '',
                    memo: ''
                },
                //  ----------------------


                //  ------  edit  -------
                editFormVisible: false,
                editLoading: false,
                editFormRules: {
                    name: [{ required: true, message: '이름을 입력해주세요', trigger: 'blur' }],
                    phone: [{ required: true, message: '전화번호를 입력해주세요', trigger: 'blur' }],
                    regDate: [{ required: true, message: '등록일을 선택해주세요', trigger: 'blur' }],
                    keyman: [{ required: true, message: '키맨을 입력해주세요', trigger: 'blur' }]
                },
                editForm: {
                    name: '',
                    phone: '',
                    regDate: '',
                    keyman: '',
                    memo: ''
                },
                //  ----------------------
            }
        },
        methods: {
            getUsers() {
                let para = {
                    page: this.page,
                    name: this.filters.name
                };
                // this.listLoading = true;

                    this.total = 1000;
                    this.users = [{num:1, name:"김고객", phone:"010-1111-2222",regDate:"2018-03-01", count:10, payment:"1000", keyman:"도옥현", memo:"메모..메모..메모..메모..메모.." }];

                // getUserListPage(para).then((res) => {
                //     this.total = res.data.total;
                //     this.users = res.data.users;
                //     this.listLoading = false;
                // });
            },
            //  등록 모달
            handleAdd: function () {
                console.log("handleAdd")
                this.addFormVisible = true;
                this.addForm.regDate = util.formatDate.format(new Date(), 'yyyy-MM-dd')
            },

            selsChange: function (sels) {
                this.sels = sels;
            },


            handleDel: function (index, row) {
                this.$confirm('삭제하시겠습니까?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;

                    let para = { id: row.id };
                    removeUser(para).then((res) => {
                        this.listLoading = false;

                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getUsers();
                    });
                }).catch(() => {

                });
            },

            handleEdit: function (index, row) {
                console.log("handleEdit")
                this.editFormVisible = true;
                this.editForm = Object.assign({}, row);

                console.log(this.editForm)
            },

            // 편집 저장
            editSubmit: function () {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('저장 하시겠습니까?', '提示', {}).then(() => {
                            this.editLoading = true;

                            let para = Object.assign({}, this.editForm);
                            para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
                            editUser(para).then((res) => {
                                this.editLoading = false;

                                this.$message({
                                    message: '提交成功',
                                    type: 'success'
                                });
                                this.$refs['editForm'].resetFields();
                                this.editFormVisible = false;
                                this.getUsers();
                            });
                        });
                    }
                });
            },
            // 등록 저장
            addSubmit: function () {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.addLoading = true;
                            //NProgress.start();
                            let para = Object.assign({}, this.addForm);
                            para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
                            addUser(para).then((res) => {
                                this.addLoading = false;
                                //NProgress.done();
                                this.$message({
                                    message: '提交成功',
                                    type: 'success'
                                });
                                this.$refs['addForm'].resetFields();
                                this.addFormVisible = false;
                                this.getUsers();
                            });
                        });
                    }
                });
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getUsers();
            },


        },
        mounted() {
            this.getUsers();
        }

    }
</script>

<style scoped>

</style>
