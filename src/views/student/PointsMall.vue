<template>
    <div id="container">
        <header-mall page="pointsMall"></header-mall>
        <div class="points-mall">
            <div class="banner">
                <div class="user-card clearfix">
                    <div class="user-box">
                        <div class="info"></div>
                        <div class="operating"></div>
                    </div>
                </div>
            </div>
            <div class="main">
                <div class="mall-card-title clearfix"><span>免淘网热销</span></div>
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
        .banner {
            width: 100%;
            height: 250px;
            background-color: #dcdfe6;


            .user-card {
                width: 1075px;
                margin: 0 auto;
                .user-box{
                    height: 200px;
                    width: 240px;
                    background-color: #fff;
                    margin: 25px 0;
                    position: relative;
                    float: right;
                    box-sizing: border-box;
                    .info{
                        height: 40%;
                        border-bottom: 1px solid #ddd;
                    }
                    .operating{
                        height: 60%;
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
                text-align: left;
                font-size: 22px;
                line-height: 22px;

                span {
                    position: relative;
                    display: inline-block;
                    padding-bottom: 20px;
                    color: #666;
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
                        text-align: left;

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
