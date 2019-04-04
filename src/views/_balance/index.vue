<template>
    <div>

        <el-row>
            <el-col :span="12" style="padding: 10px">
                <el-card style="border-radius: 0">
                    <div slot="header">
                        <el-button style="float: right; position: relative; top: 10px;">완료</el-button>
                        <span>04/04 정산 금액</span>
                        <h1>₩ 1,350,000</h1>
                    </div>

                    <div class="demo">

                        <div style="margin: 20px 0px 20px 0px;">
                            <h3>김고객</h3>
                            <div>
                                <span style="font-size: medium; font-weight: bold">1,000,000 의 10% +</span>
                                <el-input size="small" v-model="temp_0" placeholder="추가정산" style="width: 80px; margin: 0 5px 0 5px;"></el-input>=
                                <el-button size="small" plain type="primary" style="float: right">100,000 원</el-button>
                            </div>
                        </div>

                        <div style="margin: 20px 0px 20px 0px;">
                            <h3>박고객</h3>
                            <div>
                                <span style="font-size: medium; font-weight: bold">1,000,000 의 10% +</span>
                                <el-input size="small" v-model="temp_1" placeholder="추가정산" style="width: 80px; margin: 0 5px 0 5px;"></el-input>=
                                <el-button size="small" plain type="primary" style="float: right">100,000 원</el-button>
                            </div>
                        </div>

                        <div style="margin: 20px 0px 20px 0px;">
                            <h3>김고객</h3>
                            <div>
                                <span style="font-size: medium; font-weight: bold">1,000,000 의 10% +</span>
                                <el-input size="small" v-model="temp_0" placeholder="추가정산" style="width: 80px; margin: 0 5px 0 5px;"></el-input>=
                                <el-button size="small" plain type="primary" style="float: right">100,000 원</el-button>
                            </div>
                        </div>

                        <div style="margin: 20px 0px 20px 0px;">
                            <h3>박고객</h3>
                            <div>
                                <span style="font-size: medium; font-weight: bold">1,000,000 의 10% +</span>
                                <el-input size="small" v-model="temp_1" placeholder="추가정산" style="width: 80px; margin: 0 5px 0 5px;"></el-input>=
                                <el-button size="small" plain type="primary" style="float: right">100,000 원</el-button>
                            </div>
                        </div>

                    </div>
                </el-card>
            </el-col>

            <el-col :span="12" style="padding: 10px">
                <el-card style="border-radius: 0">
                    <div slot="header">
                        <span>총 정산금액</span>
                        <h1>₩ 12,345,678,900</h1>
                    </div>
                    <div class="demo">
                        <div id="chartPie" style="width:100%; height:300px;"></div>

                        <el-table :data="users" style="width: 100%" @cell-click="dialogTableVisible=true">
                            <el-table-column label="이름" prop="name" min-width="100" align="center"></el-table-column>
                            <el-table-column label="건수" prop="count" min-width="100" align="center"></el-table-column>
                            <el-table-column label="정산금액" prop="payment" min-width="100" align="center"></el-table-column>
                        </el-table>
                    </div>
                </el-card>
            </el-col>
        </el-row>

        <el-dialog title="정산 이력" :visible.sync="dialogTableVisible">
            <el-timeline>
                <el-timeline-item timestamp="2018/4/12" placement="top">
                    <el-card>
                        <h3>김 고객 300,000 원 </h3>
                        <p>고객 등록일 - 2018/4/2</p>
                    </el-card>
                </el-timeline-item>
                <el-timeline-item timestamp="2018/4/3" placement="top">
                    <el-card>
                        <h3>이 고객 10,00,000 원 </h3>
                        <p>고객 등록일 - 2018/3/30</p>
                    </el-card>
                </el-timeline-item>
                <el-timeline-item timestamp="2018/4/2" placement="top">
                    <el-card>
                        <h3>박 고객 1,500,000 원 </h3>
                        <p>고객 등록일 - 2018/3/30</p>
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
                temp_1:"",
                temp_0:"",
                chartPie: null,
                users:[
                    {count:33, payment:'335,000', value: 335, name: '김KM'},
                    {count:31, payment:'310,000', value: 310, name: '한KM'},
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
