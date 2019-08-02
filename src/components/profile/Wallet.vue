<template>
    <div class="flex-list">
        <!--课程列表顶部信息 S-->
        <template>
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="支付管理" name="first">
                    <div class="flex-list-header">
                        <div class="flex-row">
                            <div class="flex-cell first">项目信息/支付ID码</div>
                            <div class="flex-cell">支付金额</div>
                            <div class="flex-cell">支付状态/类型</div>
                            <div class="flex-cell">操作</div>
                        </div>
                    </div>
                    <!--课程列表顶部信息 E-->
                    <!--课程列表 S-->
                    <!--课程不存在 S-->
                    <div class="flex-list-no-data" v-if="paymentRecords.length===0">
                        <div class="status-box">
                            <div class="box-icon">
                        <span>
                            <font-awesome-icon icon="info-circle"></font-awesome-icon>
                        </span>
                            </div>
                            <div class="box-text">
                                <div>暂无支付信息</div>
                            </div>
                        </div>
                    </div>
                    <!--课程不存在 E-->
                    <!--课程存在 S-->
                    <div class="flex-list-item" v-else v-for="payment in paymentRecords"
                         :key="payment['paymentID']">
                        <div class="flex-row head">
                            <!-- <div class="time">{{project.ProjectMembers[0]['joinTime']}}</div> -->
                        </div>
                        <div class="flex-row content">
                            <div class="flex-cell first cover">
                                <el-image :src="genImage(payment)"></el-image>
                                <div class="title">项目编号/支付信息：{{genTitle(payment)}}<br/>支付ID号：{{payment['paymentID']}}
                                </div>
                            </div>
                            <div class="flex-cell price">{{payment.payAmount}}</div>
                            <div class="flex-cell state">
                                支付状态:{{myTotalOption.labelPaymentStatue[payment['payStatue']]}}<br/>支付类型:{{myTotalOption.labelPaymentType[payment['payType']]}}
                            </div>
                            <div class="flex-cell operating">
                                <a :class="[payment.payStatue!='0'?'btn-operate-disabled':'btn-operate']"
                                   @click="dealWithPayment(payment)">
                                    进行支付
                                </a>
                                <a class="btn-operate" @click="paymentInfo(payment)">
                                    支付详情
                                </a>
                            </div>
                        </div>
                    </div>
                    <!--课程存在 E-->
                    <!--课程列表 E-->
                    <!--分页 S-->
                    <div class="sort-page" v-if="paymentRecords.length>0">
                        <el-pagination background layout="prev, pager, next"
                                       :pager-count="10" @current-change="paymentPageChanged"
                                       :total="10*recordCount">
                        </el-pagination>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </template>
        <information-dialog @dialogClose="handleDialogClose" :infoArr="infoArr" :infoTableWidth="infoTableWidth"
                            :infoDialogVisible="infoDialogVisible" :infoTable="infoTable"></information-dialog>
    </div>
</template>


<script>
    import InformationDialog from '../common/InformationDialog'
    import {Message, MessageBox, ElTabs} from 'element-ui'
    import {TotalOption} from '../../utils/constant/options';
    import {getPaymentRecord, getPaymentCount, cancelApply} from '../../api/project'

    export default {
        name: "Wallet",
        data() {
            return {
                recordCount: 1,
                activeName: 'first',
                paymentRecords: [],
                myTotalOption: [],

                infoDialogVisible: false,
                infoArr: [{title: 'defualt', value: 'default'}],
                infoTableWidth: 0,
                infoTable: [],
            }
        },
        methods: {
            handleDialogClose() {
                this.infoDialogVisible = false;
            },
            genTitle(item) {
                let titleName = "N/A";
                // InvestProject
                // CreateApply
                // AttendApply
                if (null != item.InvestProject) {
                    titleName = item.InvestProject.projectID + '/' + item.InvestProject.projectName;
                } else if (null != item.CreateApply) {
                    titleName = item.CreateApply.applyID + '/' + item.CreateApply.projectName;
                } else if (null != item.AttendApply) {
                    titleName = item.AttendApply.projectID + '/' + item.AttendApply.projectName;
                } else if (null != item.courseInfo) {
                    titleName = item.courseInfo.courseName;
                }
                return titleName
            },
            genImage(item) {
                let src = "";
                if (null != item.AttendApply) src = item.AttendApply.projectPic;
                if (null != item.courseInfo) src = item.courseInfo.courseImage;
                return src;
            },
            paymentInfo(item) {
                this.infoDialogVisible = true;
                this.infoArr = []
                this.infoArr.push({'title': '支付人用户ID', 'value': item.PaymentSender.userID});
                this.infoArr.push({'title': '关联事件', 'value': item.relateEvent});
                this.infoArr.push({'title': '投资项目编号', 'value': item.objectID != null ? item.objectID : '无'});
                this.infoArr.push({'title': '事件区块ID', 'value': item.txHash != null ? item.txHash : '无'});
                this.infoArr.push({'title': '区块日志编号', 'value': item.logIndex != null ? item.logIndex : '无'});
                this.infoTableWidth = 0;
                this.infoTable = [];
            },
            //获取课程信息
            async getPayment(page) {
                let response = await getPaymentRecord({page});
                let responseCount = await getPaymentCount();
                if (response){
                    this.recordCount = responseCount.count % 10 === 0 ?
                        Math.floor(responseCount.count / 10) : Math.floor(responseCount.count / 10) + 1;
                    this.paymentRecords = response.sqlres;
                }
            },

            //进行支付
            async cancelApply(applyID) {
                MessageBox.confirm('确定取消报名该项目？相关的支付事件将被自动删除', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    let response = await cancelApply({applyID});
                    if (response){
                        Message.success(response.msg);
                        this.getAttendApply(1);
                    }
                }).catch(() => {
                    Message.info("已取消操作");
                })
            },

            // 进行支付
            dealWithPayment: async function (dealItem) {
                let TID = dealItem.payType + dealItem.paymentID;
                var sendDict = {};
                sendDict["from"] = this.$store.state.web3.coinbase;
                sendDict["gas"] = 100000;
                // 将Finney单位的金额转为Wei单位
                sendDict["value"] = await this.$store.state.web3.web3Instance().utils.toWei(dealItem.payAmount.toString(), 'finney');
                TID = this.$store.state.web3.web3Instance().utils.fromAscii(TID);
                this.$store.state.contractInstance().methods.submitPayment(TID)
                    .send(sendDict)
                    .on('receipt', receipt => {
                        Message.success('支付成功')
                    })
                    .on('error', error => {
                        Message.error('支付失败！')
                    })
            },
            //页码改变
            paymentPageChanged(val) {
                this.getPayment(val);
            },
        },
        components: {
            "information-dialog": InformationDialog,
        },
        created() {
            this.myTotalOption = TotalOption;
            this.getPayment(1);
        }

    }
</script>
