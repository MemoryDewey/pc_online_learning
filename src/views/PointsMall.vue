<template>
    <div id="container">
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
                                        <div class="points-detail" @click="pointDetailDialog = true">积分明细</div>
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
                                    <div class="op-text" @click="pointCommodityDialog = true">积分兑换记录</div>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </div>
            </div>
            <div class="main">
                <div class="mall-card-title clearfix"><span>免淘网热门兑换</span></div>
                <ul class="mall-card-list clearfix">
                    <li class="mall-card-item" v-for="commodity in commodities" :key="commodity.id">
                        <el-card shadow="hover" class="mall-card" :class="{'sell-out':commodity['inventory'] === 0}"
                                 :body-style="{ padding: '0px'}">
                            <el-image :src="commodity.cover" class="image" lazy>
                                <template slot="error">
                                    <img src="../assets/image/commodity-error.jpg" alt>
                                </template>
                            </el-image>
                            <div class="detail">
                                <span class="title">{{commodity.name}}</span>
                                <div class="price">
                                    <font-awesome-icon icon="database"></font-awesome-icon>
                                    <span>{{commodity.points}}积分{{commodity['cash']>0?`+${commodity['cash']} 课程币`:''}}</span>
                                </div>
                                <div class="inventory">
                                    <span>剩余库存{{commodity['inventory']}}份</span>
                                    <div class="operating">
                                        <el-button v-if="commodity['inventory'] === 0" type="info" size="small">库存不足
                                        </el-button>
                                        <el-button v-else-if="userPoint.points < commodity.points" type="info"
                                                   size="small">积分不足
                                        </el-button>
                                        <el-button v-else type="primary" size="small"
                                                   @click="convertCommodity(commodity)">立即兑换
                                        </el-button>
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
                <div class="no-address" v-if="addresses.length === 0">
                    <font-awesome-icon icon="map-marked-alt"></font-awesome-icon>
                    <div class="info">您还没有收货地址哦~</div>
                </div>
                <el-card v-else class="address-card" v-for="address of addresses" :key="address.id"
                         :shadow="address.default===1?'always':'never'">
                    <div class="clearfix" slot="header">
                        <div class="close">
                            <el-button type="text" icon="el-icon-close" @click="deleteAddress(address.id)"></el-button>
                        </div>
                        <div class="name">{{address.name}}</div>
                        <el-tag type="primary" size="small" v-if="address.default===1">默认地址</el-tag>
                    </div>
                    <el-row>
                        <el-col :span="12">
                            <label>收货人：</label><span>{{address.name}}</span>
                        </el-col>
                        <el-col :span="12">
                            <label>手机号码：</label><span>{{address.phone}}</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <label>所在地区：</label>
                            <span>{{getAddressArea(address.province,address.city,address.area)}}</span>
                        </el-col>
                        <el-col :span="12">
                            <label>详细地址：</label>
                            <span>{{address.detail}}</span>
                        </el-col>
                    </el-row>
                    <div class="operating">
                        <el-button v-if="address.default!==1" type="text" size="medium"
                                   @click="setDefault(address.id)">设为默认
                        </el-button>
                        <el-button type="text" size="medium" @click="updateAddrDialogOpen(address)">编辑</el-button>
                    </div>
                </el-card>
                <template slot="footer" v-if="addresses.length < 3">
                    <el-button type="primary" @click="addAddrDialogOpen">添加收货地址</el-button>
                </template>
            </el-dialog>
            <el-dialog width="600px" :title="isUpdateDialog?'更新收货地址':'添加收货地址'" :visible.sync="addAddrDialogVis"
                       custom-class="address-dialog" @close="addAddrDialogClose">
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
                    <el-form-item v-if="!isUpdateDialog" label="设为默认" style="text-align: left">
                        <el-switch v-model="ruleForm.default" :active-value="1" :inactive-value="0"></el-switch>
                    </el-form-item>
                </el-form>
                <template slot="footer">
                    <el-button type="primary" @click="addAddress('ruleForm')">{{isUpdateDialog?'更新收货地址':'添加收货地址'}}
                    </el-button>
                    <el-button @click="addAddrDialogVis = false">取消</el-button>
                </template>
            </el-dialog>
            <el-dialog width="600px" title="积分明细" :visible.sync="pointDetailDialog" custom-class="address-dialog"
                       @close="pointDetailDialog = false" @open="getPointDetail(1)">
                <el-table :data="pointDetail" style="width: 100%">
                    <el-table-column prop="createdAt" label="日期">
                    </el-table-column>
                    <el-table-column label="信息">
                        <template slot-scope="scope">{{scope.row.type==='IN'?'收入':'支出'}}</template>
                    </el-table-column>
                    <el-table-column label="数量">
                        <span slot-scope="scope" style="color: #F56C6C">{{`${scope.row.type==='IN'?'+ ':'- '}${scope.row.points}`}}</span>
                    </el-table-column>
                </el-table>
                <el-pagination :hide-on-single-page="true"
                               background slot="footer"
                               layout="prev, pager, next"
                               :total="pointDetailPage">
                </el-pagination>
            </el-dialog>
            <el-dialog width="600px" title="积分兑换记录" :visible.sync="pointCommodityDialog" custom-class="address-dialog"
                       @close="pointCommodityDialog = false" @open="getPointCommodity(1)">
                <el-table :data="pointCommodity" style="width: 100%">
                    <el-table-column prop="createdAt" label="日期">
                    </el-table-column>
                    <el-table-column label="商品信息" width="240px">
                        <template slot-scope="scope">{{scope.row['Commodity'].name}}</template>
                    </el-table-column>
                    <el-table-column label="数量">
                        <span slot-scope="scope" style="color: #F56C6C">{{`- ${scope.row.points}`}}</span>
                    </el-table-column>
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-row>
                                <el-col :span="4">快递公司：</el-col>
                                <el-col :span="20">
                                    {{props.row['expressInfo']?props.row['expressInfo']['com']:'暂无快递信息'}}
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="4">快递单号：</el-col>
                                <el-col :span="20">
                                    {{props.row['expressInfo']?props.row['expressInfo']['id']:'暂无快递信息'}}
                                </el-col>
                            </el-row>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination :hide-on-single-page="true"
                               background slot="footer"
                               layout="prev, pager, next"
                               :total="pointCommodityPage">
                </el-pagination>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {Message, MessageBox} from 'element-ui'
    import regions from "china-citys"
    import {
        convertCommodity,
        getCommodity,
        getPointCommodity,
        getPointDetail,
        getPointInfo
    } from "@/api/point-mall";
    import {addAddress, deleteAddress, getAddress, setDefualtAddress, updateAddress} from "@/api/shipping-address";

    export default {
        name: "PointsMall",
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
                pointDetailDialog: false,
                pointCommodityDialog: false,
                ruleForm: {
                    id: null,
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
                areas: [],
                addresses: [],
                isUpdateDialog: false,
                commodities: [],
                pointDetail: [],
                pointDetailPage: 0,
                pointCommodity: [],
                pointCommodityPage: 0
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
            addrDialogOpen() {
                this.getAddress();
            },
            addAddrDialogOpen() {
                this.resetForm();
                this.isUpdateDialog = false;
                this.addAddrDialogVis = true;
                this.provinces = regions.getProvinces();
                this.cities = [];
                this.areas = [];
            },
            updateAddrDialogOpen(address) {
                this.isUpdateDialog = true;
                this.provinces = regions.getProvinces();
                this.ruleForm.id = address.id;
                this.ruleForm.name = address.name;
                this.ruleForm.detail = address.detail;
                this.ruleForm.default = address.default;
                this.ruleForm.phone = address.phone;
                this.ruleForm.province = address.province.toString();
                this.cities = regions.getCitysByProvince(this.ruleForm.province);
                this.ruleForm.city = address.city.toString();
                this.areas = regions.getAreasByCity(this.ruleForm.city);
                this.ruleForm.area = address.area.toString();
                this.addAddrDialogVis = true;
            },
            addAddrDialogClose() {
                this.addAddrDialogVis = false;
            },
            resetForm() {
                this.ruleForm.default = 0;
                this.ruleForm.detail = '';
                this.ruleForm.city = '';
                this.ruleForm.name = '';
                this.ruleForm.phone = '';
                this.ruleForm.province = '';
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
            getAddressArea(province, city, area) {
                return regions.getProvinces(province.toString())[0].name + regions.getCitys(city.toString())[0].name +
                    regions.getAreas(area.toString())[0].name;
            },
            async getAddress() {
                let res = await getAddress();
                if (res) this.addresses = res.addresses;
            },
            async addAddress(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        let res;
                        if (this.isUpdateDialog) res = await updateAddress(this.ruleForm);
                        else res = await addAddress(this.ruleForm);
                        if (res) {
                            Message.success(res.msg);
                            await this.getAddress();
                            this.addAddrDialogClose();
                        }
                    } else return false;
                });
            },
            async setDefault(id) {
                let res = await setDefualtAddress({id});
                if (res) await this.getAddress();
            },
            deleteAddress(id) {
                MessageBox.confirm('确定删除改地址？', '删除地址', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(async () => {
                    let res = await deleteAddress({id});
                    if (res) await this.getAddress();
                });
            },
            async getCommodity() {
                let res = await getCommodity();
                if (res) this.commodities = res.commodities;
            },
            async getPointDetail(page) {
                let res = await getPointDetail({page});
                if (res) {
                    this.pointDetailPage = res.pageSum;
                    this.pointDetail = res.logs;
                }
            },
            async getPointCommodity(page) {
                let res = await getPointCommodity({page});
                if (res) {
                    this.pointCommodityPage = res.pageSum;
                    this.pointCommodity = res.logs;
                }
            },
            async convertCommodity(commodity) {
                const id = commodity.id, points = commodity.points, cash = commodity.cash;
                const msg = `确定花费${points}积分${cash > 0 ? `+${cash}元` : ''}兑换该产品？`;
                MessageBox.confirm(msg, '兑换产品', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(async () => {
                    let res = await convertCommodity({id});
                    if (res) {
                        Message.success(res.msg);
                        this.getCommodity();
                        this.getPointInfo();
                    }
                })
            }
        },
        beforeCreate() {
            this.$emit('setHeader', 'pointMall');
        },
        async created() {
            await this.getPointInfo();
            this.getCommodity();
        }
    }
</script>

<style lang="less">
    .points-mall {
        text-align: left;

        .banner {
            width: 100%;
            height: 250px;
            background: url("../assets/image/mall-banner.jpg") no-repeat #0f62db center;


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

                    .sell-out {
                        .image {
                            &:after {
                                position: absolute;
                                top: 0;
                                left: 0;
                                z-index: 1;
                                width: 100%;
                                height: 100%;
                                background: rgba(0, 0, 0, .5);
                                content: "";
                            }

                            &:before {
                                position: absolute;
                                z-index: 2;
                                width: 100%;
                                height: 100%;
                                background: url(../assets/image/sell-out.png);
                                content: "";
                            }
                        }
                    }

                    .mall-card {
                        width: 235px;
                        height: 346px;

                        .image {
                            width: 235px;
                            height: 235px;
                            display: block;
                            border-bottom: 1px solid #EBEEF5;
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

                        .close {
                            float: right;

                            .el-button {
                                padding: 0;
                            }
                        }

                        .el-tag {
                            margin-left: 8px;
                        }
                    }

                    .el-card__body {
                        padding: 0 20px 10px 10px;

                        label {
                            color: #999;
                        }

                        .el-row {
                            margin-bottom: 20px;
                        }

                        .operating {
                            text-align: right;
                        }
                    }
                }
            }

            .el-dialog__footer {
                text-align: center;
            }

            .el-table__expanded-cell[class*=cell] {
                padding-left: 10px;
            }
        }
    }
</style>
