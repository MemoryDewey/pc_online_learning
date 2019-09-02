<template>
    <div id="container">
        <header-mall page="pointsMall"></header-mall>
        <div class="points-mall">
            <div class="banner">
                <div class="user-card clearfix">
                    <div class="user-box">
                        <div class="info">
                            <el-row>
                                <el-col :span="9">
                                    <div class="avatar"></div>
                                </el-col>
                                <el-col :span="15">
                                    <div class="info-detail">
                                        <div>默认用户名</div>
                                        <div style="color: #999">积分：<span style="color: #F56C6C">520</span></div>
                                        <div class="points-detail">积分明细</div>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                        <div class="operating">
                            <el-row>
                                <el-col :span="9">
                                    <div class="op-icon">
                                        <font-awesome-icon icon="map-marker-alt" size="lg"></font-awesome-icon>
                                    </div>
                                </el-col>
                                <el-col :span="15">
                                    <div class="op-text">管理收获地址</div>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="9">
                                    <div class="op-icon">
                                        <font-awesome-icon icon="exchange-alt" size="lg"></font-awesome-icon>
                                    </div>
                                </el-col>
                                <el-col :span="15">
                                    <div class="op-text">积分兑换记录</div>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </div>
            </div>
            <div class="main">
                <div class="mall-card-title clearfix"><span>免淘网热门兑换</span></div>
                <ul class="mall-card-list clearfix">
                    <li class="mall-card-item">
                        <el-card :body-style="{ padding: '0px'}" shadow="hover" class="mall-card">
                            <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                                 class="image" alt="">
                            <div class="detail">
                                <span class="title">好吃的汉堡</span>
                                <div class="price">
                                    <font-awesome-icon icon="database"></font-awesome-icon>
                                    <span>1000积分+￥100元</span>
                                </div>
                                <div class="inventory">
                                    <span>剩余库存1份</span>
                                    <div class="operating">
                                        <el-button type="primary" size="small">立即兑换</el-button>
                                    </div>
                                </div>
                            </div>
                        </el-card>
                    </li>
                    <li class="mall-card-item">
                        <el-card :body-style="{ padding: '0px'}" shadow="hover" class="mall-card">
                            <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                                 class="image" alt="">
                            <div class="detail">
                                <span class="title">好吃的汉堡</span>
                                <div class="price">
                                    <font-awesome-icon icon="database"></font-awesome-icon>
                                    <span>1000积分+￥100元</span>
                                </div>
                                <div class="inventory">
                                    <span>剩余库存1份</span>
                                    <div class="operating">
                                        <el-button type="primary" size="small">立即兑换</el-button>
                                    </div>
                                </div>
                            </div>
                        </el-card>
                    </li>
                    <li class="mall-card-item">
                        <el-card :body-style="{ padding: '0px'}" shadow="hover" class="mall-card">
                            <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                                 class="image" alt="">
                            <div class="detail">
                                <span class="title">好吃的汉堡</span>
                                <div class="price">
                                    <font-awesome-icon icon="database"></font-awesome-icon>
                                    <span>1000积分+￥100元</span>
                                </div>
                                <div class="inventory">
                                    <span>剩余库存1份</span>
                                    <div class="operating">
                                        <el-button type="primary" size="small">立即兑换</el-button>
                                    </div>
                                </div>
                            </div>
                        </el-card>
                    </li>
                    <li class="mall-card-item">
                        <el-card :body-style="{ padding: '0px'}" shadow="hover" class="mall-card">
                            <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                                 class="image" alt="">
                            <div class="detail">
                                <span class="title">好吃的汉堡</span>
                                <div class="price">
                                    <font-awesome-icon icon="database"></font-awesome-icon>
                                    <span>1000积分+￥100元</span>
                                </div>
                                <div class="inventory">
                                    <span>剩余库存1份</span>
                                    <div class="operating">
                                        <el-button type="primary" size="small">立即兑换</el-button>
                                    </div>
                                </div>
                            </div>
                        </el-card>
                    </li>
                    <li class="mall-card-item">
                        <el-card :body-style="{ padding: '0px'}" shadow="hover" class="mall-card">
                            <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                                 class="image" alt="">
                            <div class="detail">
                                <span class="title">好吃的汉堡</span>
                                <div class="price">
                                    <font-awesome-icon icon="database"></font-awesome-icon>
                                    <span>1000积分+￥100元</span>
                                </div>
                                <div class="inventory">
                                    <span>剩余库存1份</span>
                                    <div class="operating">
                                        <el-button type="primary" size="small">立即兑换</el-button>
                                    </div>
                                </div>
                            </div>
                        </el-card>
                    </li>
                    <li class="mall-card-item">
                        <el-card :body-style="{ padding: '0px'}" shadow="hover" class="mall-card">
                            <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                                 class="image" alt="">
                            <div class="detail">
                                <span class="title">好吃的汉堡</span>
                                <div class="price">
                                    <font-awesome-icon icon="database"></font-awesome-icon>
                                    <span>1000积分+￥100元</span>
                                </div>
                                <div class="inventory">
                                    <span>剩余库存1份</span>
                                    <div class="operating">
                                        <el-button type="primary" size="small">立即兑换</el-button>
                                    </div>
                                </div>
                            </div>
                        </el-card>
                    </li>
                </ul>
            </div>
        </div>
        <footer-mall></footer-mall>
    </div>
</template>

<script>
    import Header from "../../components/common/Header";
    import Footer from "../../components/common/Footer";

    export default {
        name: "PointsMall",
        components: {
            "header-mall": Header,
            "footer-mall": Footer
        }
    }
</script>

<style lang="less">
    .points-mall {
        text-align: left;

        .banner {
            width: 100%;
            height: 250px;
            background-color: #dcdfe6;


            .user-card {
                width: 1075px;
                margin: 0 auto;

                .user-box {
                    height: 200px;
                    width: 240px;
                    background-color: #fff;
                    margin: 25px 0;
                    position: relative;
                    float: right;
                    box-sizing: border-box;

                    .info {
                        height: 45%;
                        width: 100%;
                        border-bottom: 1px solid #ddd;

                        .avatar {
                            width: 50px;
                            height: 50px;
                            border: 1px solid #ddd;
                            border-radius: 50%;
                            margin: 19px;

                            img {
                                width: 100%;
                                height: 100%;
                            }
                        }

                        .info-detail {
                            font-size: 14px;
                            line-height: 20px;
                            margin: 15px;

                            .points-detail {
                                color: #409eff;
                                cursor: pointer;
                            }
                        }
                    }

                    .operating {
                        width: 100%;

                        .el-row {
                            margin-top: 20px;
                            cursor: pointer;

                            &:hover {
                                color: #409eff;
                            }
                        }

                        .op-icon {
                            text-align: center;
                        }

                        .op-text {
                            margin-left: 15px;
                            font-size: 16px;
                        }
                    }
                }
            }
        }

        .main {
            width: 1120px;
            margin: 0 auto;

            .mall-card-title {
                margin: 40px 30px 20px 15px;
                border-bottom: 1px solid #ddd;
                font-size: 22px;
                line-height: 22px;

                span {
                    position: relative;
                    display: inline-block;
                    padding-bottom: 20px;
                    color: #666;
                    border-bottom: 1px solid #409ef0;
                }
            }

            .mall-card-list {
                font-size: 14px;
                margin-left: auto;
                margin-right: auto;
                padding: 0;

                ul, li {
                    margin: 0;
                    padding: 0;
                    list-style: none;
                }

                .mall-card-item {
                    margin: 0 15px 20px;
                    width: 250px;
                    float: left;
                    position: relative;

                    .mall-card {
                        width: 235px;
                        height: 346px;

                        .image {
                            width: 235px;
                            height: 235px;
                            display: block;
                        }

                        .detail {
                            padding: 10px;

                            .title {
                                font-size: 16px;
                            }

                            .price {
                                margin: 9px 0;
                                font-size: 14px;
                                color: #999;

                                span {
                                    margin-left: 5px;
                                    color: #F56C6C
                                }
                            }

                            .inventory {
                                font-size: 14px;
                                color: #999;

                                .operating {
                                    font-size: 16px;
                                    float: right;

                                    .el-button--small {
                                        font-size: 13px;
                                        border-radius: 2px;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
