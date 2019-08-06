<template>
    <div class="card-content manage-view">
        <!--课程列表顶部信息 S-->
        <div class="card-header">
            <div class="add-button" @click="openCreateForm()" style="width: 100px">发起项目申请</div>
            <div class="search-area">
                <searchBarMid @searchInfo="handleSearchInfo" :searchColumnArr="searchColumnArr"
                              :isSelectCom="isSelectCom" :searchOptionArr="searchOptionArr"></searchBarMid>
            </div>
        </div>

        <div class="flex-list">
            <div class="flex-list-header">
                <div class="flex-row">
                    <div class="flex-cell first">项目名</div>
                    <div class="flex-cell">支付事件号</div>
                    <div class="flex-cell">申请状态</div>
                    <div class="flex-cell">操作</div>
                </div>
            </div>
            <!--课程列表顶部信息 E-->
            <!--课程列表 S-->
            <!--课程不存在 S-->
            <div class="flex-list-no-data" v-if="applyRecords.length===0">
                <div class="status-box">
                    <div class="box-icon">
                        <span><font-awesome-icon icon="info-circle"></font-awesome-icon></span>
                    </div>
                    <div class="box-text">
                        <div>暂无申请信息</div>
                    </div>
                </div>
            </div>
            <!--课程不存在 E-->
            <!--课程存在 S-->
            <div class="flex-list-item" v-else v-for="apply in applyRecords" :key="apply['applyID']">
                <div class="flex-row head">
                    <!-- <div class="time">{{project.ProjectMembers[0]['joinTime']}}</div> -->
                </div>
                <div class="flex-row content">
                    <div class="flex-cell first cover">
                        <router-link :to="``">
                            <div class="title">{{apply.projectName}}</div>
                        </router-link>
                    </div>
                    <div class="flex-cell price">{{(apply.paymentID==undefined)?"暂无":apply.paymentID}}</div>
                    <div class="flex-cell state">{{myTotalOption.labelProjectApplyStatue[apply.applyStatue]}}</div>
                    <div class="flex-cell operating">
                        <a :class="{'btn-operate':true,mark:true,'btn-operate-disabled':apply.applyStatue!=='PENDING'}"
                           @click="redirectToPayment">
                            进行支付
                        </a>
                        <a :class="{'btn-operate':true,delete:true,'btn-operate-disabled':apply.applyStatue!=='PENDING'}"
                           @click="cancelApply(apply['applyID'])">
                            取消创建
                        </a>
                    </div>
                </div>
            </div>
            <!--课程存在 E-->
            <!--课程列表 E-->
            <!--分页 S-->
            <div class="sort-page" v-if="applyRecords.length>0">
                <el-pagination background layout="prev, pager, next"
                               :pager-count="10" @current-change="applyPageChanged"
                               :total="10*applyCount"
                               :current-page.sync="currentPage"
                >

                </el-pagination>
            </div>
        </div>
        <information-dialog @dialogClose="handleDialogClose" :infoArr="infoArr" :infoTableWidth="infoTableWidth"
                            :infoDialogVisible="infoDialogVisible" :infoTable="infoTable"></information-dialog>

        <el-dialog title="发起项目创建申请" :visible.sync="createFormVisible" width="600px" style="text-align: left">
            <el-form :model="createForm">
                <el-form-item label="项目名称">
                    <el-input v-model="createForm.projectName" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="项目费用（保证金）/单位(BST)">
                    <el-input v-model.number="createForm.projectFee" type="number" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="项目介绍">
                    <el-input v-model="createForm.projectIntro" type="text" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="项目领域">
                    <el-select v-model="createForm.projectField" placeholder="请选择操作类型">
                        <el-option
                                v-for="item in myTotalOption.optionProjectField"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="createFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitApply()">确 定</el-button>
            </div>
        </el-dialog>

    </div>

</template>

<script>
    import InformationDialog from '../../common/InformationDialog'
    import {Message, MessageBox, ElTabs} from 'element-ui'
    import {
        TotalOption,
    } from '../../../utils/constant/options';
    import SearchBar_mid from '../../common/SearchBarMid';
    import {
        cancelApply, createApply,
        getApplyRecord,
        getCreateRecord,
        getCreateRecordCount, getProjectMember,
        submitProjectScore
    } from "../../../api/project";

    export default {
        name: "Project",
        data() {
            return {
                projectCount: 1,
                applyCount: 1,
                activeName: 'first',
                projects: [],
                applyRecords: [],
                myTotalOption: [],
                infoDialogVisible: false,
                infoArr: [{title: 'defualt', value: 'default'}],
                infoTableWidth: 0,
                infoTable: [],
                createFormVisible: false,
                createForm: {
                    projectIntro: '',
                    projectName: '',
                    projectField: '',
                    projectFee: '',
                },
                // Search MID BAR
                searchColumnArr: [],
                isSelectCom: {},
                searchOptionArr: {},
                searchColumn: "",
                searchContent: "",
                currentPage: 1,
            }
        },
        methods: {
            handleDialogClose() {
                this.infoDialogVisible = false;
            },
            // 跳转至支付页面
            redirectToPayment() {
                this.$router.replace({path: '/profile/wallet'});
            },
            openCreateForm() {
                for (var key in this.createForm) {
                    this.createForm[key] = "";
                }
                this.createFormVisible = true;
            },
            memberInfo(item) {
                this.infoDialogVisible = true;
                this.infoArr = [];
                this.infoArr.push({'title': '项目ID', 'value': item.projectID});
                this.infoArr.push({'title': '成员类型', 'value': this.myTotalOption.labelMemberType[item.memberType]});
                this.infoArr.push({'title': '冻结金额', 'value': item.frozenBalance});
                this.infoArr.push({'title': '是否参与评分', 'value': item.boolRemark == 0 ? '否' : '是'});
                this.infoTableWidth = 0;
                this.infoTable = [];
            },
            //获取课程信息
            async getCreateApply(page) {
                var dict = {page}
                if (this.searchColumn != "" && this.serachContent != "") {
                    dict[this.searchColumn] = this.searchContent
                }
                let response = await getCreateRecord({dict});
                let responseCount = await getCreateRecordCount(dict);
                if (response) {
                    this.projectCount = responseCount.count % 10 === 0 ?
                        Math.floor(responseCount.count / 10) : Math.floor(responseCount.count / 10) + 1;
                    this.applyRecords = response.sqlres;
                }
            },
            //打开互评栏
            async openDialog(projectID) {
                try {
                    let res = await getProjectMember({projectID});
                    if (res.status == 0) throw "Query Failed!"
                    this.scoreForm.memberList = [];
                    var ind = 0;
                    for (var index in res.sqlres) {
                        // console.log(item)
                        var item = res.sqlres[index];
                        if (item.memberType == 1) {
                            ;
                        } else {
                            item.userID = item.memberID
                            item.memberDesignScore = 0
                            item.memberCodeScore = 0
                            item.memberAttitudeScore = 0
                            item.memberScore = 0
                            this.scoreForm.memberList.push(
                                item
                            );
                        }
                    }
                    console.log(this.scoreForm.memberList)
                    this.scoreForm.projectID = projectID;
                    this.scoreFormVisible = true;
                } catch (error) {
                    this.scoreFormVisible = false;
                    console.log(error);
                }
            },
            // 提交得分
            submitScore: async function () {
                try {
                    for (var index in this.scoreForm.memberList) {
                        this.scoreForm.memberList[index].designScore = this.scoreForm.memberList[index].memberDesignScore
                        this.scoreForm.memberList[index].codeScore = this.scoreForm.memberList[index].memberCodeScore
                        this.scoreForm.memberList[index].attitudeScore = this.scoreForm.memberList[index].memberAttitudeScore
                    }
                    let res = await submitProjectScore({
                        projectID: this.scoreForm.projectID,
                        memberList: this.scoreForm.memberList
                    });
                    if (!res) throw "Failed";
                    this.scoreFormVisible = false;
                    Message.success("操作成功");
                } catch (error) {
                    Message.error("操作失败，非法操作/数据或你已经完成评分!");
                    this.scoreFormVisible = false;
                    console.log(error);
                }
            },
            submitApply: async function () {
                try {
                    let res = await createApply({
                        'projectName': this.createForm.projectName,
                        'projectIntro': this.createForm.projectIntro,
                        'projectFee': this.createForm.projectFee,
                        'projectField': this.createForm.projectField,
                    });
                    if (!res) throw "Failed";
                    this.createFormVisible = false;
                    Message.success("操作成功");
                } catch (error) {
                    Message.error("操作失败!");
                    this.createFormVisible = false;
                    console.log(error);
                }
            },
            //取消报名
            async cancelApply(applyID) {
                MessageBox.confirm('确定取消创建该项目？相关的支付事件将被自动删除', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    try {
                        let response = await cancelApply({applyID});
                        if (response) {
                            Message.success(response.msg);
                            this.getAttendApply(1);
                        }
                    } catch (error) {
                        Message.error("操作失败!");
                    }
                }).catch(() => {
                    Message.info("已取消操作");
                })
            },
            // 页码改变（项目参加申请）
            applyPageChanged(val) {
                this.getCreateApply(val);
            },
            // SearchBarMid
            handleSearchInfo(dict) {
                this.searchColumn = dict.searchColumn
                this.searchContent = dict.searchContent
                if (dict.searchInstantly == true) {
                    this.getCreateApply(1)
                    this.currentPage = 1
                }
            },
        },

        components: {
            "information-dialog": InformationDialog,
            "searchBarMid": SearchBar_mid,
        },
        created() {
            this.myTotalOption = TotalOption;
            this.getCreateApply(1);
            // Search MID BAR
            this.searchColumnArr = [
                {'value': 'applyID', 'label': '申请ID'},
                {'value': 'projectField', 'label': '项目领域'},
                {'value': 'applyStatue', 'label': '申请状态'},
            ];
            this.isSelectCom = {
                'applyID': false,
                'projectField': true,
                'applyStatue': true,
            };
            this.searchOptionArr = {
                'projectField': TotalOption.optionProjectField,
                'applyStatue': TotalOption.optionProjectApplyStatue,
            };
            // Search MID BAR
        }
    }
</script>
