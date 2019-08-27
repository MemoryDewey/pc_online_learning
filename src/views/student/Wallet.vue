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
                            <el-button type="primary" round size="mini" class="balance-btn" plain>充值</el-button>
                            <div class="action">
                                <el-button type="success" round size="small"
                                           class="balance-btn" plain :disabled="balanceMain < 100">提现
                                </el-button>
                                <span class="warn" v-if="balanceMain < 100">*当前余额不足100元</span>
                            </div>
                        </el-col>
                        <el-col :span="7" class="meta">
                            <div>每次提现最小额度为￥100</div>
                            <div>提现会在 1-5 个工作日内到账</div>
                            <div>建议提现时间为每日9.00-17.00</div>
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
                           :total="pageSum*10" class="page" @current-chaneg="getWalletLogs"
            ></el-pagination>
            <el-dialog :visible.sync="rechargeDialogVisible" width="500px">

            </el-dialog>
        </div>
        <footer-wallet></footer-wallet>
    </div>
</template>

<script>
    import Header from "../../components/common/Header";
    import Footer from "../../components/common/Footer";
    import {getPersonalInfo, updateBstAddress} from "../../api/profile";
    import {getWalletInfo, getWalletLog} from "../../api/wallet";
    import {Message} from 'element-ui'

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
                    "Reject": "交易失败",
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
                balanceMain: 0,
                balanceSub: .00,
                pageSum: 1,
                walletLogsTable: [],
                rechargeDialogVisible: false
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
                    this.nickname = res.msg.nickname;
                    this.avatarUrl = res.msg.avatarUrl;
                    this.bstAddress = res.msg.bstAddress;
                }
            },
            async getWalletInfo() {
                let res = await getWalletInfo();
                if (res) {
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
                this.$prompt('请输入您的BST钱包地址', '绑定/更换BST钱包地址', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /^0x[a-fA-F0-9]{40}$/,
                    inputErrorMessage: '地址格式不正确'
                }).then(async ({value}) => {
                    let res = await updateBstAddress({address: value});
                    if (res) {
                        Message.success(res.msg);
                        await this.getPersonalInfo();
                    }
                });
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
                    font-size: 14px;
                    color: #969696;
                    margin-bottom: 5px;
                }
            }
        }

        .el-table {
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
            text-align: center;
            margin-top: 20px;
        }
    }
</style>
