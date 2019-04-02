<template>
    <div>

        <el-row>
            <el-col :span="12" style="padding: 10px">
                <el-card style="border-radius: 0">
                    <div slot="header">
                        <el-button style="float: right; position: relative; top: 10px;">완료</el-button>
                        <span>04/04 정산 금액</span>
                        <h1>350,000 원</h1>
                    </div>

                    <div class="demo" style="padding: 10px">
                        <div style="padding: 10px; margin: 20px 0px 20px 0px;">
                            <h3>김고객</h3>
                            <div>
                                <span style="font-size: large; font-weight: bold">1,000,000 X 10%</span>
                                <el-input placeholder="+추가정산" style="width: 180px; margin: 0 10px 0 10px;"></el-input>
                                =
                                <el-button plain type="primary" style="float: right">100,000 원</el-button>
                            </div>
                        </div>

                        <div style="padding: 10px; margin: 20px 0px 20px 0px;">
                            <h3>박고객</h3>
                            <div>
                                <span style="font-size: large; font-weight: bold">5,000,000 X 5%</span>
                                <el-input placeholder="+추가정산" style="width: 180px; margin: 0 10px 0 10px;"></el-input>
                                =
                                <el-button plain type="primary" style="float: right">250,000 원</el-button>
                            </div>
                        </div>
                    </div>
                </el-card>
            </el-col>

            <el-col :span="12" style="padding: 10px">
                <el-card style="border-radius: 0">
                    <div slot="header">
                        <span>총 정산금액</span>
                        <h1>12,345,678,900 원</h1>
                    </div>
                    <div class="demo">
                        <div id="chartPie" style="width:100%; height:400px;"></div>

                        <el-table :data="users" style="width: 100%" @cell-click="dialogTableVisible=true">
                            <el-table-column label="이름" prop="name" width="150" align="center"></el-table-column>
                            <el-table-column label="건수" prop="count" width="100" align="center"></el-table-column>
                            <el-table-column label="정산금액" prop="payment" width="200" align="center"></el-table-column>
                        </el-table>
                    </div>
                </el-card>
            </el-col>
        </el-row>

        <el-dialog title="정산 이력" :visible.sync="dialogTableVisible">
            <el-timeline>
                <el-timeline-item timestamp="2018/4/12" placement="top">
                    <el-card>
                        <h4>김 고객 300,000 원 </h4>
                        <p>연락처 제공 - 2018/4/2</p>
                    </el-card>
                </el-timeline-item>
                <el-timeline-item timestamp="2018/4/3" placement="top">
                    <el-card>
                        <h4>이 고객 10,00,000 원 </h4>
                        <p>연락처 제공 - 2018/3/30</p>
                    </el-card>
                </el-timeline-item>
                <el-timeline-item timestamp="2018/4/2" placement="top">
                    <el-card>
                        <h4>박 고객 1,500,000 원 </h4>
                        <p>연락처 제공 - 2018/3/30</p>
                    </el-card>
                </el-timeline-item>
            </el-timeline>
        </el-dialog>

    </div>


</template>

<script>
    import echarts from "echarts";


    export default {
        name: "index",
        data() {
            return {
                chartPie: null,
                users:[
                    {count:33, payment:'335,000', value: 335, name: '김KM'},
                    {count:31, payment:'310,000', value: 310, name: '한KM'},
                    {count:23, payment:'234,000', value: 234, name: '도옥현'},
                    {count:13, payment:'135,000', value: 135, name: '최용일'},
                    {count:154, payment:'1,548,000', value: 1548, name: '최KM'}
                ],
                dialogTableVisible: false,
            }
        },
        methods: {
            drawPieChart() {
                this.chartPie = echarts.init(document.getElementById('chartPie'));
                this.chartPie.setOption({
                    title: {
                        text: 'KM별 고객 계약 금액',
                        subtext: '구성원 수입',
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    series: [
                        {
                            name: '계약 금액',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '50%'],
                            data: this.users,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 0,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                });
            },
        },
        mounted: function () {
            this.drawPieChart()
        },
        updated: function () {
            this.drawPieChart()
        }

    }
</script>

<style scoped lang="scss">

</style>
