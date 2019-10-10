<template>
    <div id="container">
        <header-wallet page="wallet"></header-wallet>
        <div class="wallet">
            <el-row style="margin-top: 20px">
                <el-col :span="24">
                    <el-row class="top">
                        <el-col :span="7" class="user">
                            <div class="avatar"><img :src="avatarUrl" alt></div>
                            <div class="info">
                                <div class="name">{{nickname}}</div>
                                <div class="bst-bind" v-if="!bstAddress" @click="bindBstAddress">点击绑定BST钱包账号</div>
                                <el-tooltip v-else effect="light" placement="bottom" :content="`钱包地址:${bstAddress}`">
                                    <div class="bst-bind" @click="bindBstAddress">已绑定BST钱包账号</div>
                                </el-tooltip>
                            </div>
                        </el-col>
                        <el-col :span="10" class="balance">
                            <div class="account-money">账户余额</div>
                            <span class="money-main">{{balanceMain}}</span>
                            <span class="money-sub">{{balanceSub}}元</span>
                            <!--<el-button type="primary" round size="mini" class="balance-btn" plain
                                       @click="openMoneyDialog('recharge')">充值
                            </el-button>-->
                            <div class="action">
                                <el-button type="primary" round size="mini" class="balance-btn" plain
                                           @click="openMoneyDialog('recharge')">充值
                                </el-button>
                                <!--<el-button type="success" round size="small" @click="openMoneyDialog('cash')"
                                           class="balance-btn" plain :disabled="balanceMain < 100">提现
                                </el-button>-->
                                <!--<span class="warn" v-if="balanceMain < 100">*当前余额不足100元</span>-->
                            </div>
                        </el-col>
                        <el-col :span="7" class="meta">
                            <div>每次充值最小额度为￥100</div>
                            <div>充值会在 1-5 个工作日内到账</div>
                            <div>建议充值时间为每日9.00-17.00</div>
                            <div>有问题请致电:
                                <el-link type="primary">400-966-0003</el-link>
                            </div>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
            <el-table :border="true" :data="walletLogsTable" :row-class-name="tableRowClassName">
                <el-table-column prop="createdAt" label="时间" width="175px" align="center"></el-table-column>
                <el-table-column label="类型" width="100px" align="center">
                    <template slot-scope="scope">
                        <span :class="scope.row.type | typeFilterTag">{{ scope.row.type | typeFilter }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="details" label="详情" width="300px"></el-table-column>
                <el-table-column prop="amount" label="金额"></el-table-column>
                <el-table-column label="状态" width="175px" align="center">
                    <template slot-scope="scope">
                        <span :class="scope.row.status | statusFilterTag">{{ scope.row.status | statusFilter }}</span>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination layout="prev, pager, next" background :hide-on-single-page="true"
                           :total="pageSum*10" class="page" @current-change="getWalletLogs"
            ></el-pagination>
            <el-dialog :visible.sync="moneyDialogVisible" width="500px" :title="dialogTitle"
                       @close="moneyDialogVisible = false">
                <el-form label-position="top" :model="dialogForm" :rules="dialogRules" ref="ruleForm">
                    <el-form-item label="金额" prop="amount">
                        <el-input-number v-model="dialogForm.amount" size="medium" :precision="2"
                                         :min="100"></el-input-number>
                    </el-form-item>
                    <el-form-item label="支付宝账号" prop="account">
                        <el-input v-model="dialogForm.account"></el-input>
                    </el-form-item>
                    <el-form-item label="支付宝实名" prop="name">
                        <el-input v-model="dialogForm.name"></el-input>
                    </el-form-item>
                    <el-form-item style="text-align: right">
                        <el-button type="primary" @click="submitMoneyDialog('ruleForm')">提交</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
            <el-dialog title="请用支付宝扫码支付" width="400px" :visible.sync="codeDialogVisible" center>
                <div class="code-img">
                    <img :src="'/images/pay/ali.png'" alt="">
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="payFinished">支 付 完 成</el-button>
                </span>
            </el-dialog>
        </div>
        <footer-wallet></footer-wallet>
    </div>
</template>

<script>
    import Header from "@/components/common/Header";
    import Footer from "@/components/common/Footer";
    import {getPersonalInfo, updateBstAddress} from "@/api/profile";
    import {getWalletInfo, getWalletLog, recharge, toCash} from "@/api/wallet";
    import {Message, MessageBox} from 'element-ui'
    import NodeRSA from 'node-rsa'

    export default {
        name: "Wallet",
        components: {
            "header-wallet": Header,
            "footer-wallet": Footer
        },
        filters: {
            typeFilter(type) {
                const typeMap = {
                    "Expend": "支出",
                    "Income": "收入"
                };
                return typeMap[type]
            },
            typeFilterTag(type) {
                const typeMap = {
                    "Expend": "danger",
                    "Income": "success"
                };
                return typeMap[type]
            },
            statusFilter(status) {
                const statusMap = {
                    "Accept": "交易成功",
                    "Reject": "审核未通过",
                    "Pending": "审核中"
                };
                return statusMap[status]
            },
            statusFilterTag(status) {
                const statusMap = {
                    "Accept": "success",
                    "Reject": "danger",
                    "Pending": "warning"
                };
                return statusMap[status]
            }
        },
        data() {
            return {
                nickname: null,
                avatarUrl: null,
                bstAddress: null,
                publicKey: null,
                balanceMain: 0,
                balanceSub: .00,
                pageSum: 1,
                walletLogsTable: [],
                moneyDialogVisible: false,
                dialogTitle: null,
                dialogType: null,
                dialogForm: {
                    amount: '', account: '', name: ''
                },
                dialogRules: {
                    amount: [
                        {required: true, message: '请输入金额', trigger: 'blur'}
                    ],
                    account: [
                        {required: true, message: '请输入支付宝账号', trigger: 'blur'}
                    ],
                    name: [
                        {required: true, message: '请输入支付宝实名姓名', trigger: 'blur'}
                    ],
                },
                codeDialogVisible: false
            }
        },
        methods: {
            tableRowClassName({row}) {
                if (row.type === 'Expend') {
                    return 'warning-row';
                } else if (row.type === 'Income') {
                    return 'success-row';
                }
                return '';
            },
            async getPersonalInfo() {
                let res = await getPersonalInfo();
                if (res) {
                    this.nickname = res.data.nickname;
                    this.avatarUrl = res.data.avatarUrl;
                    this.bstAddress = res.data.bstAddress;
                }
            },
            async getWalletInfo() {
                let res = await getWalletInfo();
                if (res) {
                    this.publicKey = res.key;
                    let balance = res.wallet.balance.split(".");
                    this.balanceMain = balance[0];
                    this.balanceSub = `.${balance[1]}`;
                }
            },
            async getWalletLogs(page) {
                let res = await getWalletLog({page});
                if (res) {
                    this.pageSum = res.pageSum;
                    this.walletLogsTable = res.logs;
                }
            },
            async bindBstAddress() {
                this.$prompt('请输入您的BST私钥，我们会为你妥善保存', '绑定/更换BST钱包地址', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(async ({value}) => {
                    const rsa = new NodeRSA();
                    rsa.importKey(this.publicKey, 'pkcs8-public');
                    let res = await updateBstAddress({address: rsa.encrypt(value, 'base64', 'utf8')});
                    if (res) {
                        Message.success(res.msg);
                        await this.getPersonalInfo();
                    }
                });
            },
            openMoneyDialog(type) {
                this.moneyDialogVisible = true;
                if (type === 'recharge') {
                    this.dialogType = 'R';
                    this.dialogTitle = "充值";
                } else {
                    this.dialogType = 'T';
                    this.dialogTitle = "提现"
                }
            },
            submitMoneyDialog(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let msg = `确认${this.dialogType === 'R' ? '充值' : '提现'}${this.dialogForm.amount}元
                        (支付宝账号${this.dialogForm.account})`;
                        MessageBox.confirm(msg, "充值/提现", {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消'
                        }).then(async () => {
                            if (this.dialogType === 'R') {
                                this.codeDialogVisible = true;
                            } else await this.toCash();
                        });
                    } else return false;
                });
            },
            async recharge() {
                let data = {
                    amount: this.dialogForm.amount,
                    aliPayInfo: {
                        account: this.dialogForm.account,
                        name: this.dialogForm.name
                    }
                };
                let res = await recharge(data);
                if (res) {
                    Message.success(res.msg);
                    this.getWalletInfo();
                    this.getWalletLogs(1);
                }
            },
            async toCash() {
                let data = {
                    amount: this.dialogForm.amount,
                    aliPayInfo: {
                        account: this.dialogForm.account,
                        name: this.dialogForm.name
                    }
                };
                let res = await toCash(data);
                if (res) {
                    Message.success(res.msg);
                    this.moneyDialogVisible = false;
                    this.getWalletInfo();
                    this.getWalletLogs(1);
                }
            },
            payFinished() {
                this.moneyDialogVisible = false;
                this.codeDialogVisible = false;
                this.recharge();
            }
        },
        created() {
            this.getPersonalInfo();
            this.getWalletInfo();
            this.getWalletLogs(1);
        }
    }
</script>

<style lang="less">
    .wallet {
        text-align: left;

        a {
            cursor: pointer;
            color: #333;
        }

        width: 960px;
        margin: 0 auto;

        .top {
            margin: 10px 0 40px 0;

            .user {
                padding: 20px 0 20px 0;

                .avatar {
                    position: absolute;
                    width: 80px;
                    height: 80px;
                    margin-right: 15px;
                    display: inline-block;
                    vertical-align: middle;

                    img {
                        width: 100%;
                        height: 100%;
                        border: 1px solid #ddd;
                        border-radius: 50%;
                    }
                }

                .info {
                    display: inline-block;
                    vertical-align: middle;
                    padding: 15px 0 0 95px;

                    .name {
                        font-size: 21px;
                        font-weight: 700;
                    }

                    .bst-bind {
                        padding-top: 5px;
                        font-size: 12px;
                        color: #969696;
                        cursor: pointer;
                    }
                }
            }

            .balance {
                padding: 10px 55px;
                border-left: 1px solid #e5e5e5;
                border-right: 1px solid #e5e5e5;

                .account-money {
                    margin-right: 20px;
                    font-size: 16px;
                    color: #969696;
                    display: inline-block;
                }

                .money-main {
                    font-size: 28px;
                }

                .money-sub {
                    font-size: 18px;
                    margin-right: 25px;
                }

                .balance-btn {
                    width: 80px;
                }

                .action {
                    margin-top: 20px;

                    .warn {
                        margin-left: 25px;
                        font-size: 13px;
                        color: #969696;
                    }
                }
            }

            .meta {
                padding: 10px 34px;

                div {
                    font-size: 13px !important;
                    color: #969696;
                    margin-bottom: 5px;
                }
            }
        }

        .el-table {
            margin-bottom: 20px;

            .success {
                color: #67c23a
            }

            .warn {
                color: #E6A23C
            }

            .danger {
                color: #F56C6C
            }

            .success-row {
                background: #f0f9eb;
            }

            .warning-row {
                background: oldlace;
            }
        }

        .page {
            margin-bottom: 20px;
            text-align: center;
        }

        .code-img {
            width: 100%;
            height: 100%;
            text-align: center;

            img {
                width: 250px;
                height: 250px;
            }
        }
    }
</style>
