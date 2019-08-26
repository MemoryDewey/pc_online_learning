<template>
    <div id="container">
        <header-wallet page="wallet"></header-wallet>
        <div class="wallet">
            <el-row style="margin-top: 20px">
                <el-col :span="24">
                    <el-row class="top">
                        <el-col :span="7" class="user">
                            <div class="avatar"><img src="/images/avatar/default.jpg" alt></div>
                            <div class="info">
                                <div class="name">虞子酱</div>
                                <div class="bst-bind" v-if="false">点击绑定BST钱包账号</div>
                                <el-tooltip v-else effect="light" placement="bottom" content="钱包地址:0x8bd235as4da5sd45asd5a">
                                    <div class="bst-bind">已绑定BST钱包账号</div>
                                </el-tooltip>
                            </div>
                        </el-col>
                        <el-col :span="10" class="balance">
                            <div class="account-money">账户余额</div>
                            <span class="money-main">0</span>
                            <span class="money-sub">.00元</span>
                            <el-button type="primary" round size="mini" class="balance-btn" plain>充值</el-button>
                            <div class="action">
                                <el-button type="success" round size="small" class="balance-btn" plain>提现</el-button>
                                <span class="warn">*当前余额不足</span>
                            </div>
                        </el-col>
                        <el-col :span="7" class="meta">
                            <div>每次提现最小额度为￥100</div>
                            <div>提现会在 1-3 个工作日内到账</div>
                            <div>建议提现时间为每日9.00-17.00</div>
                            <div>有问题请致电:400-966-0003</div>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
            <el-table :border="true">
                <el-table-column prop="time" label="时间" width="175px">

                </el-table-column>
                <el-table-column prop="type" label="类型" width="100px">

                </el-table-column>
                <el-table-column prop="" label="详情" width="300px">

                </el-table-column>
                <el-table-column prop="" label="金额">

                </el-table-column>
                <el-table-column prop="" label="状态" width="175px">

                </el-table-column>
            </el-table>
        </div>
        <footer-wallet></footer-wallet>
    </div>
</template>

<script>
    import Header from "../../components/common/Header";
    import Footer from "../../components/common/Footer";

    export default {
        name: "Wallet",
        components: {
            "header-wallet": Header,
            "footer-wallet": Footer
        }
    }
</script>

<style lang="less">
    .wallet{
        text-align: left;
        a{
            cursor: pointer;
            color: #333;
        }
        width: 960px;
        margin: 0 auto;
        .top{
            margin: 10px 0 40px 0;
            .user{
                padding: 20px 0 20px 0;
                .avatar{
                    position: absolute;
                    width: 80px;
                    height: 80px;
                    margin-right: 15px;
                    display: inline-block;
                    vertical-align: middle;
                    img{
                        width: 100%;
                        height: 100%;
                        border: 1px solid #ddd;
                        border-radius: 50%;
                    }
                }
                .info{
                    display: inline-block;
                    vertical-align: middle;
                    padding: 15px 0 0 95px;
                    .name{
                        font-size: 21px;
                        font-weight: 700;
                    }
                    .bst-bind{
                        padding-top: 5px;
                        font-size: 12px;
                        color: #969696;
                        cursor: pointer;
                    }
                }
            }
            .balance{
                padding: 10px 55px;
                border-left: 1px solid #e5e5e5;
                border-right: 1px solid #e5e5e5;
                .account-money{
                    margin-right: 20px;
                    font-size: 16px;
                    color: #969696;
                    display: inline-block;
                }
                .money-main{
                    font-size: 28px;
                }
                .money-sub{
                    font-size: 18px;
                    margin-right: 25px;
                }
                .balance-btn{
                    width: 80px;
                }
                .action{
                    margin-top: 20px;
                    .warn{
                        margin-left: 25px;
                        font-size: 13px;
                        color: #969696;
                    }
                }
            }
            .meta{
                padding: 10px 34px;
                div{
                    font-size: 13px;
                    color: #969696;
                    margin-bottom: 5px;
                }
            }
        }
    }
</style>
