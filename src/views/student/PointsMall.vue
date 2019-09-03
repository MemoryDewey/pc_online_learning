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
                                    <div class="avatar">
                                        <img :src="userPoint.avatar" alt>
                                    </div>
                                </el-col>
                                <el-col :span="15">
                                    <div class="info-detail">
                                        <div>{{userPoint.name}}</div>
                                        <div style="color: #999">积分：<span
                                                style="color: #F56C6C">{{userPoint.points}}</span></div>
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
                                    <div class="op-text" @click="addressDialogVisible = true">管理收获地址</div>
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
            <el-dialog width="600px" title="管理收货地址（最多添加3个收获地址）" @close="addressDialogVisible = false"
                       :visible.sync="addressDialogVisible" @opened="addrDialogOpen"
                       custom-class="address-dialog">
                <div class="no-address" v-if="false">
                    <font-awesome-icon icon="map-marked-alt"></font-awesome-icon>
                    <div class="info">您还没有收货地址哦~</div>
                </div>
                <el-card class="address-card">
                    <div class="clearfix" slot="header">
                        <div class="close"><el-button type="text" icon="el-icon-close"></el-button></div>
                        <div class="name">收货人</div>
                        <el-tag type="primary" size="small">默认地址</el-tag>
                    </div>
                    <el-row>
                        <el-col :span="12">
                            <label>收货人：</label>
                        </el-col>
                        <el-col :span="12">
                            <label>手机号码：</label>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <label>所在地区：</label>
                        </el-col>
                        <el-col :span="12">
                            <label>详细地址：</label>
                            <span></span>
                        </el-col>
                    </el-row>
                    <div class="operating">
                        <el-button type="text" size="medium">设为默认</el-button>
                        <el-button type="text" size="medium">编辑</el-button>
                    </div>
                </el-card>
                <el-card class="address-card">
                    <div class="clearfix" slot="header">
                        <div class="close"><el-button type="text" icon="el-icon-close"></el-button></div>
                        <div class="name">收货人</div>
                        <el-tag type="primary" size="small">默认地址</el-tag>
                    </div>
                    <el-row>
                        <el-col :span="12">
                            <label>收货人：</label>
                        </el-col>
                        <el-col :span="12">
                            <label>手机号码：</label>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <label>所在地区：</label>
                        </el-col>
                        <el-col :span="12">
                            <label>详细地址：</label>
                            <span></span>
                        </el-col>
                    </el-row>
                    <div class="operating">
                        <el-button type="text" size="medium">设为默认</el-button>
                        <el-button type="text" size="medium">编辑</el-button>
                    </div>
                </el-card>
                <el-card class="address-card">
                    <div class="clearfix" slot="header">
                        <div class="close"><el-button type="text" icon="el-icon-close"></el-button></div>
                        <div class="name">收货人</div>
                        <el-tag type="primary" size="small">默认地址</el-tag>
                    </div>
                    <el-row>
                        <el-col :span="12">
                            <label>收货人：</label>
                        </el-col>
                        <el-col :span="12">
                            <label>手机号码：</label>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <label>所在地区：</label>
                        </el-col>
                        <el-col :span="12">
                            <label>详细地址：</label>
                            <span></span>
                        </el-col>
                    </el-row>
                    <div class="operating">
                        <el-button type="text" size="medium">设为默认</el-button>
                        <el-button type="text" size="medium">编辑</el-button>
                    </div>
                </el-card>
                <template slot="footer">
                    <el-button type="primary" @click="addAddrDialogVis = true">添加收货地址</el-button>
                </template>
            </el-dialog>
            <el-dialog width="600px" title="添加收获地址" :visible.sync="addAddrDialogVis" custom-class="address-dialog"
                       @close="addAddrDialogClose" @opened="addAddrDialogOpen">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                    <el-form-item label="收货人" prop="name">
                        <el-input v-model="ruleForm.name" placeholder="请填写真实姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码" prop="phone">
                        <el-input v-model="ruleForm.phone" placeholder="请填写正确的11位手机号码"></el-input>
                    </el-form-item>
                    <el-form-item label="收货地区" required>
                        <el-col :span="8">
                            <el-select v-model="ruleForm.province" placeholder="请选择省份" value="" @change="getCity">
                                <el-option v-for="province in provinces" :key="province.code"
                                           :label="province.name" :value="province.code"></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="8">
                            <el-select v-model="ruleForm.city" placeholder="请选择城市" value="" @change="getArea">
                                <el-option v-for="city in cities" :key="city.code"
                                           :label="city.name" :value="city.code"></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="8">
                            <el-select v-model="ruleForm.area" placeholder="请选择区域" value="">
                                <el-option v-for="area in areas" :key="area.code"
                                           :label="area.name" :value="area.code"></el-option>
                            </el-select>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="详细地址" prop="detail">
                        <el-input type="textarea" v-model="ruleForm.detail"
                                  placeholder="无需重复填写省市区(长度在150个字符以内)"></el-input>
                    </el-form-item>
                    <el-form-item label="设为默认" style="text-align: left">
                        <el-switch v-model="ruleForm.default" :active-value="1" :inactive-value="0"></el-switch>
                    </el-form-item>
                </el-form>
                <template slot="footer">
                    <el-button type="primary" @click="addAddress('ruleForm')">添加收货地址</el-button>
                    <el-button @click="addAddrDialogVis = false">取消</el-button>
                </template>
            </el-dialog>
        </div>
        <footer-mall></footer-mall>
    </div>
</template>

<script>
    import Header from "../../components/common/Header";
    import Footer from "../../components/common/Footer";
    import {getPointInfo} from "../../api/point-mall";
    import regions from "china-citys"
    import {addAddress, getAddress} from "../../api/shipping-address";
    import {Message} from 'element-ui'

    export default {
        name: "PointsMall",
        components: {
            "header-mall": Header,
            "footer-mall": Footer
        },
        data() {
            const checkPhone = (rule, value, callback) => {
                const regPhone = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3-8])|(18[0-9])|166|198|199|(147))\d{8}$/;
                if (!value) callback(new Error('请填写收货人手机号码'));
                if (!value.match(regPhone)) callback(new Error('请填写11位正确的手机号码'));
                else callback();
            };
            return {
                userPoint: {name: null, points: 0, avatar: null},
                addressDialogVisible: false,
                addAddrDialogVis: false,
                ruleForm: {
                    name: '',
                    phone: '',
                    province: '',
                    city: '',
                    area: '',
                    detail: '',
                    default: 0
                },
                rules: {
                    name: [
                        {required: true, message: '请填写收货人姓名', trigger: 'blur'},
                        {min: 2, max: 10, message: '姓名长度在 2 到 10 个字符', trigger: 'blur'}
                    ],
                    phone: [
                        {validator: checkPhone, required: true, trigger: 'blur'}
                    ],
                    province: [
                        {required: true, message: '请选择省份', trigger: 'change'}
                    ],
                    city: [
                        {required: true, message: '请选择城市', trigger: 'change'}
                    ],
                    area: [
                        {required: true, message: '请选择区域', trigger: 'change'}
                    ],
                    detail: [
                        {required: true, message: '请填写详细收货地址', trigger: 'blur'},
                        {min: 5, max: 150, message: '收货地址长度在 5 到 150 个字符', trigger: 'blur'}
                    ]
                },
                provinces: [],
                cities: [],
                areas: []
            }
        },
        methods: {
            async getPointInfo() {
                let res = await getPointInfo();
                if (res) this.userPoint = {
                    name: res.info['UserInformation'].nickname,
                    avatar: res.info['UserInformation'].avatarUrl,
                    points: res.info.points
                }
            },
            addrDialogOpen(){
              this.getAddress();
            },
            addAddrDialogOpen() {
                this.provinces = regions.getProvinces();
                this.cities = [];
                this.areas = [];
            },
            addAddrDialogClose() {
                this.addAddrDialogVis = false;
                this.ruleForm.province = '';
                this.ruleForm.city = '';
                this.ruleForm.area = '';
            },
            getCity(province) {
                this.ruleForm.city = '';
                this.ruleForm.area = '';
                this.cities = regions.getCitysByProvince(province);
            },
            getArea(city) {
                this.ruleForm.area = '';
                this.areas = regions.getAreasByCity(city);
            },
            async getAddress() {
                let res = await getAddress();
            },
            async addAddress(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        let res = await addAddress(this.ruleForm);
                        if (res) {
                            Message.success(res.msg);
                            this.addAddrDialogClose();
                        }
                    } else return false;
                });
            }
        },
        async created() {
            await this.getPointInfo();
        }
    }
</script>

<style lang="less">
    .points-mall {
        text-align: left;

        .banner {
            width: 100%;
            height: 250px;
            background: url("../../assets/image/mall-banner.jpg") no-repeat #0f62db center;


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
                            border: 1px solid #fff;
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

        .address-dialog {
            text-align: center;

            .el-dialog__header {
                border-bottom: 1px solid #ddd;
            }

            .el-dialog__body {
                .no-address {
                    color: #999;

                    svg {
                        font-size: 120px;
                    }

                    .info {
                        margin-top: 20px;
                        font-size: 18px;
                    }
                }

                .address-card {
                    margin-bottom: 20px;
                    text-align: left;

                    .el-card__header {
                        border-bottom: none;
                        padding: 10px;
                        .name {
                            font-size: 16px;
                            float: left;
                        }
                        .close{
                            float: right;
                            .el-button{
                                padding: 0;
                            }
                        }
                        .el-tag{
                            margin-left: 8px;
                        }
                    }
                    .el-card__body{
                       padding: 0 20px 10px 10px;
                        label{
                            color: #999;
                        }
                        .el-row{
                            margin-bottom: 20px;
                        }
                        .operating{
                            text-align: right;
                        }
                    }
                }
            }

            .el-dialog__footer {
                text-align: center;
            }
        }
    }
</style>
