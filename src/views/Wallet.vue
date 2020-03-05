<template>
    <div id="container">
        <div class="wallet">
            <el-row style="margin-top: 20px">
                <el-col :span="24">
                    <el-row class="top">
                        <el-col :span="7" class="user">
                            <div class="avatar"><img :src="avatarUrl" alt></div>
                            <div class="info">
                                <div class="name">{{nickname}}</div>
                                <div class="bst-bind" v-if="!bstAddress" @click="bindBstAddress">点击绑定BST钱包账号</div>
                                <el-popover v-else placement="right" trigger="hover" width="250">
                                    <div>钱包地址：<strong>{{bstAddress}}</strong></div>
                                    <br/>
                                    <div>BST 余额：<strong style="color: #e85308">{{bstBalance}}</strong> BST
                                        <span style="cursor: pointer;margin-left: 8px" @click="getBstBalance(true)"><i
                                                class="el-icon-refresh-right"></i>刷新</span>
                                    </div>
                                    <br/>
                                    <el-button type="primary" style="width: 100%" @click="bindBstAddress">
                                        更换BST钱包账号
                                    </el-button>
                                    <div class="bst-bind" slot="reference">已绑定BST钱包账号</div>
                                </el-popover>
                            </div>
                        </el-col>
                        <el-col :span="10" class="balance">
                            <el-row>
                                <el-col :span="18">
                                    <div class="account-money">课程币余额</div>
                                    <span class="money-main">{{balanceMain}}</span>
                                    <span class="money-sub">{{balanceSub}}</span>
                                </el-col>
                                <el-col :span="6" style="line-height: 40px">
                                    <el-button type="primary" round size="mini" class="balance-btn" plain
                                               @click="openMoneyDialog('recharge')">充值
                                    </el-button>
                                </el-col>
                            </el-row>
                            <div class="action">
                                <!--<el-button type="success" round size="small" @click="openMoneyDialog('cash')"
                                           class="balance-btn" plain :disabled="balanceMain < 100">提现
                                </el-button>
                                <span class="warn" v-if="balanceMain < 100">*当前余额不足100课程币</span>-->
                                <el-button type="success" round size="small" class="balance-btn"
                                           plain :disabled="true">提现
                                </el-button>
                                <span class="warn">*该功能暂未开放</span>
                            </div>
                        </el-col>
                        <el-col :span="7" class="meta">
                            <div>1 课程币 = ￥1元</div>
                            <div>目前只支持BST交易</div>
                            <div>每次提现最小额度为100课程币</div>
                            <div>充值和提现必须绑定BST钱包账号</div>
                            <div>有问题请致电:
                                <el-link type="primary">400-966-0003</el-link>
                            </div>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
            <el-table :border="true" :data="walletLogsTable" :row-class-name="tableRowClassName">
                <el-table-column prop="time" label="时间" width="175px" align="center"></el-table-column>
                <el-table-column label="类型" width="100px" align="center">
                    <template v-slot="scope">
                        <span :class="scope.row.type | typeFilterTag">{{ scope.row.type | typeFilter }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="details" label="详情" width="300px"></el-table-column>
                <el-table-column prop="amount" label="课程币"></el-table-column>
                <el-table-column width="175px" align="center">
                    <template slot="header">状态<span style="cursor: pointer;margin-left: 8px"
                                                    @click="refreshLog"><i
                            class="el-icon-refresh-right"></i></span></template>
                    <template v-slot="scope">
                        <span :class="scope.row.status | statusFilterTag">{{ scope.row.status | statusFilter }}</span>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination layout="prev, pager, next" background :hide-on-single-page="true"
                           :total="pageSum*10" class="page" @current-change="getWalletLogs"
            ></el-pagination>
            <el-dialog :visible.sync="moneyDialogVisible" width="560px" class="recharge-dialog"
                       :title="dialogTitle" @close="moneyDialogVisible = false">
                <div v-if="dialogType === 'R'" class="trade-wrapper-list">
                    <div class="trade-wrapper" v-for="(value,index) in rechargeNumber" :key="index"
                         @click="rechargeChoose(value)"
                         :class="{active:rechargeMoney===value}">
                        <div class="trade-count">{{value}}<span class="trade-name">课程币</span></div>
                        <div class="bst-price">{{(value/bstPrice).toFixed(2)}} BST</div>
                    </div>
                    <div class="trade-wrapper trade-custom" :class="{active:rechargeCustom}"
                         @click="rechargeChoose(null)">
                        <div class="tips" v-if="!rechargeCustom">自定义课程币数量（1-5000）</div>
                        <template v-else>
                            <el-input ref="custom-input" v-model="rechargeMoney" :maxlength="4"
                                      @input="validRechargeCustom"></el-input>
                            <div v-if="!rechargeCustomValid" class="bst-price bst-price-error">单笔最多充值5000课程币</div>
                            <div v-else class="bst-price bst-price-custom">
                                <span v-if="!rechargeMoney">请输入充值数量</span>
                                <span v-else>{{(rechargeMoney/bstPrice).toFixed(2)}} BST</span>
                            </div>
                        </template>
                    </div>
                </div>
                <div v-else class="trade-wrapper-list">
                    <div class="trade-wrapper" v-for="(value,index) in expendNumber" :key="index"
                         @click="rechargeChoose(value)"
                         :class="{active:rechargeMoney===value}">
                        <div class="trade-count">{{value}}<span class="trade-name">课程币</span></div>
                        <div class="bst-price">{{(value/bstPrice).toFixed(2)}} BST</div>
                    </div>
                </div>
                <el-button v-if="dialogType === 'R'" slot="footer" type="primary" @click="recharge">提交</el-button>
                <el-button v-else slot="footer" type="primary" @click="toBst">提交</el-button>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {getPersonalInfo, updateBstAddress} from "@/api/profile";
    import {
        getBstBalance,
        getBstValue, getKey,
        getWalletInfo,
        getWalletLog,
        recharge,
        refreshRecharge,
        toBst
    } from "@/api/wallet";
    import {Message, MessageBox} from 'element-ui'
    import NodeRSA from 'node-rsa'
    import wsClient from 'socket.io-client'

    export default {
        name: "Wallet",
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
                    "Pending": "处理中..."
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
                bstBalance: 0,
                bstPrice: 0,
                balanceMain: 0,
                balanceSub: .00,
                pageSum: 1,
                walletLogsTable: [],
                moneyDialogVisible: false,
                dialogTitle: null,
                dialogType: null,
                rechargeNumber: [10, 20, 50, 100, 200, 500, 1000],
                expendNumber: [100, 200, 500],
                rechargeMoney: 100,
                rechargeCustom: false,
                rechargeCustomValid: true,
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
                    if (this.bstAddress) await this.getBstBalance();
                }
            },
            async getWalletInfo() {
                await this.refreshRecharge();
                let res = await getWalletInfo();
                if (res) {
                    let balance = res.wallet.balance.toString().split(".");
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
                let res = await getKey();
                let publicKey = res.publicKey;
                if (!publicKey) Message.error('请求错误');
                else this.$prompt('请输入您的BST钱包私钥', '绑定/更换BST钱包地址', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(async ({value}) => {
                    const rsa = new NodeRSA();
                    rsa.importKey(publicKey, 'pkcs8-public');
                    res = await updateBstAddress({address: rsa.encrypt(value, 'base64', 'utf8')});
                    if (res) {
                        Message.success(res.msg);
                        await this.getPersonalInfo();
                    }
                });
            },
            getBstBalance(refresh) {
                getBstBalance({refresh}).then(res => {
                    this.bstBalance = res.balance;
                });
            },
            getBstPrice() {
                getBstValue().then(res => {
                    if (res.code === 1000) this.bstPrice = res.price;
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
            rechargeChoose(money) {
                if (this.rechargeCustom && !money) return;
                this.rechargeMoney = money;
                if (typeof money === 'number') this.rechargeCustom = false;
                else {
                    this.rechargeCustom = true;
                    this.$nextTick(() => {
                        this.$refs['custom-input'].focus();
                    });
                }
            },
            validRechargeCustom() {
                this.rechargeCustomValid = true;
                let money = parseInt(this.rechargeMoney);
                if (isNaN(money) && this.rechargeMoney !== null)
                    this.rechargeMoney = null;
                else if (money < 1) this.rechargeMoney = null;
                else if (money > 5000) {
                    this.rechargeMoney = money.toString().substr(0, 3);
                    this.rechargeCustomValid = false;
                } else if ((this.rechargeMoney | 0) !== this.rechargeMoney)
                    this.rechargeMoney = money;
            },
            async recharge() {
                const loading = this.$loading({
                    lock: true,
                    text: '支付中，请稍等',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                await recharge({amount: this.rechargeMoney});
                const socket = wsClient.connect(`${location.host}`);
                socket.emit('recharge');
                socket.on('rechargeMessage', data => {
                    loading.close();
                    if (data.status === 1) {
                        Message.success(data.msg);
                        this.moneyDialogVisible = false;
                        this.getWalletInfo();
                        this.getWalletLogs(1);
                    } else {
                        Message.error('交易失败');
                        console.log(data.msg);
                    }
                });
            },
            async refreshLog() {
                await this.refreshRecharge();
                await this.getWalletInfo();
                await this.getWalletLogs(1);
            },
            async refreshRecharge() {
                await refreshRecharge();
            },
            async toBst() {
                let res = await toBst({amount: this.rechargeMoney});
                if (res) {
                    Message.success(res.msg);
                    this.moneyDialogVisible = false;
                    this.getWalletInfo();
                    this.getWalletLogs(1);
                }
            }
        },
        beforeCreate() {
            this.$emit('setHeader', 'wallet');
        },
        created() {
            this.getPersonalInfo();
            this.getWalletInfo();
            this.getWalletLogs(1);
            this.getBstPrice();
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
                        font-size: 14px;
                        color: #409eff;
                        cursor: pointer;
                    }
                }
            }

            .balance {
                padding: 10px 45px;
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
                }

                .balance-btn {
                    width: 80px;
                    vertical-align: middle;
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

        .recharge-dialog {
            text-align: center;

            .trade-wrapper-list {
                display: flex;
                display: -webkit-flex;
                flex-wrap: wrap;

                .trade-wrapper {
                    width: 150px;
                    height: 60px;
                    border: 1px solid #dcdfe6;
                    margin: 10px;
                    padding: 10px 0;
                    cursor: pointer;
                    color: #222;
                }

                .trade-custom {
                    width: 320px;

                    .tips {
                        margin-top: 20px;
                        color: #999;
                        letter-spacing: 0;
                    }

                    .el-input-number {
                        width: 100%;
                    }

                    input {
                        text-align: left;
                        border: 0;
                        height: 34px;
                        line-height: 34px;
                        font-size: 24px;
                        color: #222;
                    }
                }

                .active {
                    border: 1px solid #409EFF;
                    color: #409eff;

                    .bst-price {
                        color: #409eff;
                    }
                }

                .trade-count {
                    font-size: 24px;
                }

                .trade-name {
                    font-size: 14px;
                    margin-left: 5px;
                }

                .bst-price {
                    font-size: 14px;
                    color: #757575;
                    margin-top: 5px;
                }

                .bst-price-custom {
                    color: #757575 !important;
                    padding: 0 15px;
                    text-align: left;
                }

                .bst-price-error {
                    color: #e78b1f !important;
                    padding: 0 15px;
                    text-align: left;
                }
            }

            .el-dialog__footer {
                text-align: center;

                .el-button {
                    width: 200px;
                }
            }
        }

        .el-table {
            margin-bottom: 20px;

            .success {
                color: #67c23a
            }

            .warning {
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
